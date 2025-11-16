import { DirectionAwareHover } from "@/components/ui/direction-aware-hover";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Tooltip } from "@/components/ui/tooltip-card";
import WorldMap from "@/components/ui/world-map";
import { AnimatedStat } from "@/components/ui/animated-stat";
import Link from "next/link";
import { FocusCards } from "@/components/ui/focus-cards";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import Divider from "@/components/ui/divider";
import Image from "next/image";

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
                <Link href="mailto:ming.env@gmail.com" target="_blank" >Contact</Link>
              </li>
              <li>
                <Link target="_blank" href="https://www.linkedin.com/company/minghq">Social</Link>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main content: scrollable on desktop, normal flow on mobile/tablet */}
        <main className="lg:basis-[57.143%] lg:h-screen lg:overflow-y-auto ">
          <div className="p-6 md:p-8 prose prose-zinc max-w-none dark:prose-invert">
            <DirectionAwareHover imageUrl="https://images.unsplash.com/photo-1559445368-b8a993676d7a?q=80&w=3131&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D">
              <p className="font-bold text-xl">Fast, Secure, Low-Cost Global Payments — Powered by Blockchain & Stablecoins</p>
              <p className="font-normal text-sm">Experience instant cross-border transactions with fees under $0.01, built on secure, stablecoin-optimized blockchains like Arc, Ethereum, and Solana. Enjoy sub-second finality, EVM compatibility, and the stability of pegged digital assets — all designed to make your payments faster, safer, and radically more affordable.</p>
            </DirectionAwareHover>
            {/* Productivity section */}
            <section className="mt-6 mb-15">
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
                  <div className="mt-2 text-center text-[#364314]">Total Stablecoins Market Cap as of 2025.</div>
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
                  <div className="mt-2 text-center text-[#364314]">Weekly Active Users on AI Tools.</div>
                </div>
              </div>
            </section>

            <Divider />

            <h2 className="text-center max-w-7xl mt-6 sm:mt-8 md:mt-10 mb-3 pl-2 sm:pl-4 md:pl-6 mx-auto text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-4xl font-bold text-[#394508] font-sans">
              Our Products.
            </h2>
            <p className="text-center mb-10 text-[#5D5D5D]">
              Our suite of custom build contributions to more open web with Blockchain and AI.
            </p>
            <FocusCards />

            <div className="mt-10  bg-[#D2FD9C] rounded-md flex flex-col antialiased items-center justify-center relative my-10 overflow-hidden">
              <h2 className="text-center max-w-7xl mt-6 sm:mt-8 md:mt-10 mb-3 pl-2 sm:pl-4 md:pl-6 mx-auto text-3xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-bold text-[#394508] font-sans">
                Supported By Leaders.
              </h2>
              <p className="text-center text-[#5D5D5D] max-w-xl">
                From hackathon project to founding a business, we are supported by the industry experts and foundation for our growth and contributions.
              </p>
              <InfiniteMovingCards
                direction="right"
                speed="fast"
              />
            </div>

          </div>
          <div className="flex flex-wrap justify-between bg-[#EDEDED] p-6 md:p-8 py-12">
            <div>
              <Image src="https://avatars.githubusercontent.com/u/179059125?s=200&v=4" width={70} height={70} className="mb-8" />
              <p>Ming Open Web Headquarters</p>
            </div>
            <div>
              <p className="text-[#5D5D5D]">Contact</p>
              <ul>
                <li><Link target="_blank" href="mailto:ming.env@gmail.com">ming.env@gmail.com</Link></li>
                <li><Link target="_blank" href="https://www.instagram.com/ming.openweb.hq/">
                  Instagram
                </Link>
                </li>
                <li><Link target="_blank" href="https://x.com/MingHQs">
                  X
                </Link>
                </li>
                <li><Link target="_blank" href="https://www.linkedin.com/company/minghq">
                  LinkedIn
                </Link>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
