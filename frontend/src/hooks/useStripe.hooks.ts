import { useEffect, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";

// Define the type for the hook return value
type StripePromise = Stripe | null;

/**
 * Custom React hook that asynchronously loads and returns the Stripe instance.
 * It initializes Stripe using the publishable key from environment variables
 * and ensures that the Stripe instance is cleaned up when the component unmounts.
 *
 * @returns {StripePromise} A promise that resolves to a Stripe instance or `null` if Stripe fails to load.
 * The returned value can be used to create Stripe Elements, handle payments, etc.
 */
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
