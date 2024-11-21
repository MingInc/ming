import mongoose from "mongoose";
import { stripe } from "..";
import { stripeWebhookSecret } from "../constants";
import { addCorsHeaders } from "../helpers/CorsHeader";
import { Payment } from "../models/Payment.Schema";
import { UserModel } from "../models/User.models";

export async function handleStripePayment(req: Request) {
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

export async function handleWebHook(req: Request) {
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

export async function getPaymentById(req: Request) {
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
