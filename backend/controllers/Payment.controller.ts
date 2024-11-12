import { stripe } from "..";
import { addCorsHeaders } from "../helpers/CorsHeader";
import { UserModel } from "../models/User.models";

export async function handleStripePayment(req: Request) {
  try {
    const data = await req.json();
    const session = await stripe.checkout.sessions.create({
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
      success_url: `http://localhost:5173?success=true`,
      cancel_url: `http://localhost:5173?canceled=true`,
      metadata: {
        userUid: data.userUid,
      },
    });
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
        process.env.WEBHOOK_SECRET as string // Ensure this secret matches the one in Stripe Dashboard
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

          return addCorsHeaders(
            new Response(
              JSON.stringify({
                message: "User premium status updated successfully.",
                user,
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
