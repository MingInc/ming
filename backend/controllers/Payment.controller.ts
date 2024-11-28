import mongoose from "mongoose";
import { stripe } from "..";
import { stripeWebhookSecret } from "../constants";
import { addCorsHeaders } from "../helpers/CorsHeader";
import { Payment } from "../models/Payment.Schema";
import { UserModel } from "../models/User.models";

/**
 * Handles the creation of a Stripe checkout session for a payment.
 *
 * This function processes the payment request, creates a Stripe checkout session, and saves the payment details in the database.
 * It expects a `userUid` from the request body to associate the payment with a user. The payment amount is set to $20 (2000 cents),
 * and the user is redirected to a success or cancel URL depending on the outcome of the payment. The session ID and session URL are
 * returned to the client to initiate the Stripe payment process.
 *
 * @param {Request} req - The HTTP request object containing the payment data (userUid and other relevant data).
 * @returns {Promise<Response>} A Promise that resolves to a Response object with the Stripe session URL and session ID,
 *                             or an error message if the payment creation fails.
 */
export async function handleStripePayment(req: Request): Promise<Response> {
  try {
    const data = await req.json();
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Example Product",
            },
            unit_amount: 2000, // Amount in cents (e.g. 2000 = $20)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/dashboard/billing?success=true`,
      cancel_url: `http://localhost:5173/dashboard/billing?canceled=true`,
      metadata: {
        userUid: data.userUid,
        // planId: data.planId,
      },
    });

    console.log("request data :", data);
    console.log("session data :", session);
    // Save payment details in the database before redirecting to the checkout session
    const paymentData = {
      userId: data.userUid, // User UID
      stripePaymentId: session.id, // Stripe session ID
      amount: 2000, // Payment amount (2000 cents = $20)
      currency: "usd", // Currency used for the payment
      status: "pending", // Default status, will update on successful payment
      paymentMethod: "stripe", // Payment method (can be expanded to support more)
      description: "Payment for Example Product", // Payment description
      // planId: data.planId, // Plan ID, if applicable
    };

    console.log("payment Data :", paymentData);

    const payment = new Payment(paymentData);
    await payment.save();

    return addCorsHeaders(
      new Response(
        JSON.stringify({
          sessionUrl: session.url,
          sessionId: session.id,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      )
    );
  } catch (error) {
    return addCorsHeaders(
      new Response(
        JSON.stringify({
          message: "Error during payment " + error,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      )
    );
  }
}

/**
 * Handles incoming Stripe webhook events, processes the `checkout.session.completed` event,
 * and updates the user’s premium status and payment details in the database.
 *
 * This function verifies the webhook signature to ensure the request is from Stripe, then processes
 * the event. If the event type is `checkout.session.completed`, it updates the user's premium status
 * to `true` and marks the associated payment as successful. If any other event is received, it returns
 * an appropriate response indicating the event type is unhandled. If an error occurs, it returns a 500
 * Internal Server Error response with the error details.
 *
 * @param {Request} req - The HTTP request object containing the raw Stripe webhook payload and signature.
 * @returns {Promise<Response>} A Promise that resolves to a Response object containing the status of
 *                             the webhook processing, including the user and payment details or an error message.
 */
export async function handleWebHook(req: Request): Promise<Response> {
  try {
    const data = await req.text();

    const sig = req.headers.get("stripe-signature") as string;

    let event;
    // Construct the event using the webhook secret and the request body.
    try {
      event = await stripe.webhooks.constructEventAsync(
        data, //paylod
        sig,
        stripeWebhookSecret // Ensure this secret matches the one in Stripe Dashboard
      );
    } catch (err) {
      console.log("Webhook signature verification failed.", err);
      return addCorsHeaders(
        new Response(
          JSON.stringify({
            message: "Webhook signature verification failed.",
            error: err,
          }),
          {
            headers: { "Content-Type": "application/json" },
            status: 400,
          }
        )
      );
    }

    // Handle the event type 'checkout.session.completed'
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      console.log("session :", session);

      // Extract userUid from session metadata
      const userUid = session?.metadata?.userUid;

      if (userUid) {
        // Find the user in the database
        const user = await UserModel.findOne({ userUid: userUid });

        if (user) {
          // Update user premium status to true
          user.premium = true;
          await user.save();

          // Find the payment in the database by the Stripe session ID
          const payment = await Payment.findOneAndUpdate(
            {
              stripePaymentId: session.id,
            },
            {
              status: "succeded",
            },
            {
              new: true,
            }
          );

          return addCorsHeaders(
            new Response(
              JSON.stringify({
                message:
                  "User premium status updated successfully and payment update",
                user,
                payment,
              }),
              {
                headers: { "Content-Type": "application/json" },
                status: 200,
              }
            )
          );
        } else {
          return addCorsHeaders(
            new Response(
              JSON.stringify({
                message: "User not found for userUid: " + userUid,
              }),
              {
                headers: { "Content-Type": "application/json" },
                status: 404,
              }
            )
          );
        }
      } else {
        return addCorsHeaders(
          new Response(
            JSON.stringify({
              message: "UserUid not found in session metadata.",
            }),
            {
              headers: { "Content-Type": "application/json" },
              status: 400,
            }
          )
        );
      }
    }

    return addCorsHeaders(
      new Response(
        JSON.stringify({
          message: "Unhandled event type.",
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      )
    );
  } catch (error) {
    return addCorsHeaders(
      new Response(
        JSON.stringify({
          message: "Error processing webhook.",
          error: error,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 500,
        }
      )
    );
  }
}

/**
 * Retrieves the payment records for a specific user by user ID.
 *
 * This function accepts a request that contains a user ID as a query parameter. It queries the `Payment` model to
 * fetch all payment records associated with that user. If no payments are found, it returns a 404 error with a message
 * indicating no payments were found for the user. If payments are found, it returns a 200 success response with the
 * payment details. In case of an error during the query process, a 500 error response is returned with the error message.
 *
 * @param {Request} req - The HTTP request object containing the user ID in the query parameters.
 * @returns {Promise<Response>} A Promise that resolves to a Response object containing the payment data or an error message.
 */
export async function getPaymentById(req: Request): Promise<Response> {
  try {
    const id = new URL(req.url).searchParams.get("id");

    const payments = await Payment.find({
      userId: id,
    }).exec();

    if (payments.length === 0) {
      return addCorsHeaders(
        new Response(
          JSON.stringify({
            message: "No payments found for this user.",
          }),
          {
            status: 404,
          }
        )
      );
    }
    return addCorsHeaders(
      new Response(
        JSON.stringify({
          message: "Payments fetched successfully.",
          payments,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        }
      )
    );
  } catch (error) {
    return addCorsHeaders(
      new Response(
        JSON.stringify({
          message: "Error get payment by id.",
          error: error,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 500,
        }
      )
    );
  }
}
