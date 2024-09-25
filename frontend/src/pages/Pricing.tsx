// import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckIcon } from "lucide-react"

export default function Pricing() {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <div className="max-w-3xl w-full space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter">Try Our Product for Free</h1>
          <p className="text-muted-foreground max-w-[700px] mx-auto">
            Experience the full power of our platform with our generous free plan. No credit card required.
          </p>
        </div>
        
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl">Free Plan</CardTitle>
            <CardDescription>Perfect for individuals and small teams</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-4xl font-bold">$0 <span className="text-xl font-normal text-muted-foreground">/month</span></div>
            <ul className="space-y-2">
              {[
                "Unlimited projects",
                "100GB storage (Theoritically)",
                "Basic analytics",
                "24/7 support",
                "Host a node"
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
        
        <div className="text-center text-sm text-muted-foreground">
          No credit card required. Upgrade will be available soon.
        </div>
      </div>
    </div>
  )
}