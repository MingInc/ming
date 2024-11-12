// import { Button } from "@/components/ui/button"
import { Button } from "@/components/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { useAuth, useStripe } from "@/hooks";

// const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export function Pricing() {
  const [loading, setLoading] = useState<boolean>(false);
  const { authState } = useAuth()
  const stripe = useStripe()

  const handleCheckout = async () => {
    setLoading(true);

    try {
      // Make a request to your backend to create a checkout session
      const response = await fetch("http://localhost:3000/api/v1/user/create-checkout-session", {
        method: "POST",
        body: JSON.stringify({
          userUid: authState.user.uid
        })
      });

      const { sessionUrl,sessionId } = await response.json();

      console.log(sessionUrl)
      // Redirect to Stripe Checkout
      if(stripe){
        const result = await stripe?.redirectToCheckout({
          sessionId: sessionId
        });
  
        console.log("result :", result)
  
        if (result?.error) {
          console.error(result.error.message);
        }
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className=" w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter">
            Try Our Product for Free
          </h1>
          <p className="text-muted-foreground max-w-[700px] mx-auto">
            Experience the full power of our platform with our generous free
            plan. No credit card required.
          </p>
        </div>

        <div className="grid grid-cols-[1fr_1fr] gap-2">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl">Free Plan</CardTitle>
              <CardDescription>
                Perfect for individuals and small teams
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl font-bold">
                $0{" "}
                <span className="text-xl font-normal text-muted-foreground">
                  /month
                </span>
              </div>
              <ul className="space-y-2">
                {[
                  "Unlimited projects",
                  "100GB storage (Theoritically)",
                  "Basic analytics",
                  "24/7 support",
                  "Host a node",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {/* <Button className="w-full" size="lg">
              Get Started for Free
            </Button> */}
            </CardFooter>
          </Card>

          <Card className="w-full">
            <CardHeader>
              <CardTitle className="text-2xl">Premium Plan</CardTitle>
              <CardDescription>
                Ideal for growing teams and advanced features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-4xl font-bold">
                $19{" "}
                <span className="text-xl font-normal text-muted-foreground">
                  /month
                </span>
              </div>
              <ul className="space-y-2">
                {[
                  "Unlimited projects",
                  "1TB storage (Theoretically)",
                  "Advanced analytics & reports",
                  "Priority 24/7 support",
                  "Host a node",
                  "Team collaboration features",
                  "Custom branding options",
                  "API access for integrations",
                  "Unlimited team members",
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckIcon className="mr-2 h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className=" flex items-end">
              <Button className="" size="lg" onClick={handleCheckout} disabled={loading}>
              Upgrade Plan
            </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          No credit card required. Upgrade will be available soon.
        </div>
      </div>
    </div>
  );
}
