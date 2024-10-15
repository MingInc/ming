import React, { ReactNode } from "react";
import Navbar from "./Navbar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-container">
      <header>
        {/* this is topbar */}
        <div className="bg-black text-white text-sm py-1 font-medium px-[3vw]">
          <i className="ri-notification-2-line"></i> We received a Seed Grant
          from{" "}
          <a
            href="https://x.com/starknetfndn"
            className="font-semibold hover:underline"
            target="_blank"
          >
            Starknet Foundation
          </a>
          .
        </div>
        <Navbar />
      </header>
      <main className="layout-main border-t-[0.5px]">{children}</main>
      <footer className="layout-footer mb-3">
        <div>
          <div className="flex gap-3 items-center justify-center text-xl mt-6">
            <a href="https://github.com/MingInc" target="_blank">
              <i className="ri-github-fill"></i>
            </a>
            <a href="https://discord.gg/YUcVRgwF" target="_blank">
              <i className="ri-discord-fill"></i>
            </a>
            <a href="https://x.com/MingIncHQ" target="_blank">
              <i className="ri-twitter-x-line"></i>
            </a>
          </div>
          <p className="text-center mt-3 font-medium text-gray-500 text-sm">
            Ming, MIT License.
            <br /> Distributed System for Open Source Cloud.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
