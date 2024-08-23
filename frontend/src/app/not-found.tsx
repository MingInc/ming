import BackgroundBeamsWithCollision from "@/components/ui/BackgroundBeamsWithCollision";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div>
      <div>
        <BackgroundBeamsWithCollision>
          <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center text-black dark:text-white font-sans tracking-tight">
            Are you lost?
            <br />
            <div className="relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]">
              <div className="absolute left-0 top-[1px] bg-clip-text bg-no-repeat text-transparent bg-gradient-to-r py-4 from-purple-500 via-violet-500 to-pink-500 [text-shadow:0_0_rgba(0,0,0,0.1)]">
                <span className="">404 Page Not Found!</span>
              </div>
              <div className="relative bg-clip-text text-transparent bg-no-repeat bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 py-4">
                <span className="">404 Page Not Found!</span>
              </div>
            </div>
          </h2>
        </BackgroundBeamsWithCollision>
        <div className="flex items-center justify-center flex-wrap gap-4 mt-6 text-sm font-semibold text-gray-400">
          <Link href="/">Go to Homepage</Link>
          <p>*</p>
          <Link href="/">Join our community</Link>
          <p>*</p>
          <Link href="/company">About Us</Link>
        </div>
      </div>
    </div>
  );
}
