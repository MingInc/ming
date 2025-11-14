import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Tooltip } from "@/components/ui/tooltip-card";
import WorldMap from "@/components/ui/world-map";
import { AnimatedStat } from "@/components/ui/animated-stat";
import Link from "next/link";
import { FocusCards } from "@/components/ui/focus-cards";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      {/* Container switches from column on mobile/tablet to row on desktop */}
      <div className="mx-auto flex min-h-screen flex-col md:flex-col lg:flex-row">
        {/* Sidebar: fixed/sticky on desktop, full width on mobile/tablet */}
        <aside className="lg:basis-[42.857%] lg:shrink-0 lg:self-start lg:sticky lg:top-0 lg:h-screen bg-black border-b border-zinc-200 dark:border-zinc-800 lg:border-b-0 lg:border-r p-4 sm:p-6 md:p-8">
          <div className="max-w-prose">
            <div className="flex flex-row items-center gap-2">
              <p className="text-base tracking-tight text-zinc-300">
                Ming Open Web HQ
              </p>
            </div>
            <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-20 text-zinc-200 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"><span className="text-zinc-200 font-medium">Igniting the possibilities of <Tooltip
              containerClassName="text-neutral-400 dark:text-neutral-400"
              content="Web3 refers to an evolving concept for the next generation of the internet, envisioned as a more decentralized, user-centric, and transparent digital ecosystem built on technologies like blockchain, smart contracts, and digital assets. It aims to shift control of data, online interactions, and digital assets from centralized corporations to individual users, enabling greater ownership and privacy."
            >Web 3.0</Tooltip> and <Tooltip
              containerClassName="text-neutral-400 dark:text-neutral-400"
              content="Artificial intelligence (AI) refers to the ability of machines or computer systems to perform tasks that typically require human intelligence, such as learning, reasoning, problem-solving, perception, language understanding, and decision-making."
            >AI</Tooltip> integrations.</span></div>
            <ul className="mt-4 sm:mt-5 md:mt-6 space-y-2 text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 mb-4">
              <li>
                "Bridging people with borderless Web3 innovations."
              </li>
            </ul>

            <WorldMap
              dots={[
                {
                  start: {
                    lat: 64.2008,
                    lng: -149.4937,
                  }, // Alaska (Fairbanks)
                  end: {
                    lat: 34.0522,
                    lng: -118.2437,
                  }, // Los Angeles
                },
                {
                  start: { lat: 64.2008, lng: -149.4937 }, // Alaska (Fairbanks)
                  end: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                },
                {
                  start: { lat: -15.7975, lng: -47.8919 }, // Brazil (Brasília)
                  end: { lat: 38.7223, lng: -9.1393 }, // Lisbon
                },
                {
                  start: { lat: 51.5074, lng: -0.1278 }, // London
                  end: { lat: 28.6139, lng: 77.209 }, // New Delhi
                },
                {
                  start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                  end: { lat: 43.1332, lng: 131.9113 }, // Vladivostok
                },
                {
                  start: { lat: 28.6139, lng: 77.209 }, // New Delhi
                  end: { lat: -1.2921, lng: 36.8219 }, // Nairobi
                },
              ]}
            />

            <ul className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg flex items-center gap-3 sm:gap-4 text-[#27ca60]">
              <li>
                <Link href="/web3-sovereignty" >Contact</Link>
              </li>
              <li>
                <Link href="/ecosystem-integrations">Social</Link>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main content: scrollable on desktop, normal flow on mobile/tablet */}
        <main className="lg:basis-[57.143%] lg:h-screen lg:overflow-y-auto p-6 md:p-8">
          <div className="prose prose-zinc max-w-none dark:prose-invert">
            <DirectionAwareHover imageUrl="https://images.unsplash.com/photo-1559445368-b8a993676d7a?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
              <p className="font-bold text-xl">Fast, Secure, Low-Cost Global Payments — Powered by Blockchain & Stablecoins</p>
              <p className="font-normal text-sm">Experience instant cross-border transactions with fees under $0.01, built on secure, stablecoin-optimized blockchains like Arc, Ethereum, and Solana. Enjoy sub-second finality, EVM compatibility, and the stability of pegged digital assets — all designed to make your payments faster, safer, and radically more affordable.</p>
            </DirectionAwareHover>
            {/* Productivity section */}
            <section className="mt-6">

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative rounded-2xl bg-[#D2FD9C] p-8">
                  <GlowingEffect
                    blur={0}
                    borderWidth={3}
                    spread={80}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />
                  <AnimatedStat value={300000000000} prefix="$" suffix="B" />
                  <div className="mt-4 text-center text-[#364314]">Total Stablecoins Market Cap as of 2025.</div>
                </div>
                <div className="relative rounded-2xl bg-[#D2FD9C] p-8">
                  <GlowingEffect
                    blur={0}
                    borderWidth={3}
                    spread={80}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                  />
                  <AnimatedStat value={800000000} suffix="M" />
                  <div className="mt-4 text-center text-[#364314]">Weekly Active Users on AI Tools.</div>
                </div>
              </div>
            </section>

            <h2 className="text-center max-w-7xl mt-6 sm:mt-8 md:mt-10 mb-6 sm:mb-8 pl-2 sm:pl-4 md:pl-6 mx-auto text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
              Our Products.
            </h2>
            <FocusCards />
          </div>
        </main>
      </div>
    </div>
  );
}
