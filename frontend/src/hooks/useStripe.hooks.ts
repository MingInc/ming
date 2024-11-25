import { useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";

// Define the type for the hook return value
type StripePromise = Stripe | null;

export const useStripe = (): StripePromise => {
  const [stripe, setStripe] = useState<StripePromise>(null);

  useEffect(() => {
    const initializeStripe = async () => {
      // Load Stripe asynchronously
      const stripeInstance = await loadStripe(
        import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string
      );

      // Set Stripe instance to state
      setStripe(stripeInstance);
    };

    initializeStripe(); // Call async function to load Stripe

    // Clean up Stripe instance when the component unmounts
    return () => {
      setStripe(null);
    };
  }, []); // Empty dependency array ensures this runs once

  return stripe;
};
