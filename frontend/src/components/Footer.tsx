import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <div>
      <div className="flex gap-3 items-center justify-center text-xl mt-6">
        <Link href="https://github.com/MingInc" target="_blank">
          <i className="ri-github-fill"></i>
        </Link>
        <Link href="https://discord.gg/YUcVRgwF" target="_blank">
          <i className="ri-discord-fill"></i>
        </Link>
        <Link href="https://x.com/MingEnv_" target="_blank">
          <i className="ri-twitter-x-line"></i>
        </Link>
      </div>
      <p className="text-center mt-3 font-medium text-gray-500 text-sm">
        Ming, MIT License.
        <br /> Distributed System for Open Source Cloud.
      </p>
    </div>
  );
}
