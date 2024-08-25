"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "@/firebase.config";
import { toast } from "sonner";

const provider = new GoogleAuthProvider();

export default function RegisterForm() {
  const [auth, setAuth] = useState<any>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  useEffect(() => {
    const app = initializeApp(firebaseConfig);

    const authInstance = getAuth(app);

    setAuth(authInstance);
  }, []);

  const handleOnRegister = () => {
    // @dev Ensure auth is initialized
    if (!auth) return;
    if (password !== confirmPassword) {
      return toast("Oops, something went wrong!", {
        description: "Password & Confirm Password didn't match!",
      });
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // User Signed up
        const user = userCredential.user;
        toast("You signed up successfully!", {
          description: `Welcome to Ming, ${user.email?.split("@")[0]}.`,
        });
      })
      .catch((error) => {
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  const handleGoogleSignUp = () => {
    if (!auth) return;

    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        if (user.email)
          toast("You signed up successfully!", {
            description: `Welcome to Ming, ${user.email?.split("@")[0]}.`,
          });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorMessage);
      });
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="awesome@domain.dev"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              placeholder="********"
              type="password"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirm-password"
              placeholder="********"
              type="password"
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            onClick={() => handleOnRegister()}
          >
            Create an account
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => handleGoogleSignUp()}
          >
            Sign up with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
