import { Globe2Icon, LandmarkIcon, ReceiptIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      {/* Container switches from column on mobile/tablet to row on desktop */}
      <div className="mx-auto flex min-h-screen flex-col md:flex-col lg:flex-row">
        {/* Sidebar: fixed/sticky on desktop, full width on mobile/tablet */}
        <aside className="lg:basis-[42.857%] lg:shrink-0 lg:self-start lg:sticky lg:top-0 lg:h-screen bg-black border-b border-zinc-200 dark:border-zinc-800 lg:border-b-0 lg:border-r p-4 sm:p-6 md:p-8">
          <div className="max-w-prose">
            <div className="flex flex-row items-center gap-2">
            <h1 className="text-base sm:text-lg md:text-xl font-semibold tracking-tight text-zinc-300">
              Lypto
            </h1>
            <p className="text-base tracking-tight text-zinc-300">
              by Ming Open Web HQ
            </p>
            </div>
            <p className="mt-6 sm:mt-8 md:mt-10 lg:mt-20 text-zinc-200 text-2xl sm:text-3xl md:text-4xl lg:text-5xl"><span className="text-zinc-200 font-medium">Empower Your Business</span>: Accept <Link href="https://www.usdc.com/learn/what-is-a-stablecoin" target="_blank" className="text-[#27ca60]">USDC</Link>/<Link href="https://eurc.com" target="_blank" className="text-[#27ca60]">EURC</Link>, Process Globally, Thrive Locally.</p>
            <ul className="mt-4 sm:mt-5 md:mt-6 space-y-2 text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400">
              <li>
                Bridging people and businesses with borderless Web3 innovations.
              </li>
            </ul>

            <p className="mt-4 sm:mt-5 md:mt-6 text-[#27ca60] text-sm sm:text-base md:text-lg">Our Offerings</p>
            <div className="mt-4 sm:mt-5 md:mt-6 flex flex-row items-stretch gap-2 sm:gap-3">
              <div className="aspect-square basis-1/3 flex-1 min-w-0 flex items-center justify-center flex-col gap-1 sm:gap-2 rounded-md bg-[#08a941] p-3 sm:p-4">
                <LandmarkIcon className="w-8 h-8  text-[#f3f3f3]" />
                <span className="text-[#f3f3f3] text-center text-sm sm:text-base md:text-lg">
                  Stable Value
                  <br /> Protection
                </span>
              </div>
              <div className="aspect-square basis-1/3 flex-1 min-w-0 flex items-center justify-center flex-col gap-1 sm:gap-2 rounded-md bg-[#08a941] p-3 sm:p-4">
                <Globe2Icon className="w-8 h-8  text-[#f3f3f3]" />
                <span className="text-[#f3f3f3] text-center text-sm sm:text-base md:text-lg">
                  Universal<br/>Loyalty Points
                </span>
              </div>
              <div className="aspect-square basis-1/3 flex-1 min-w-0 flex items-center justify-center flex-col gap-1 sm:gap-2 rounded-md bg-[#08a941] p-3 sm:p-4">
                <ReceiptIcon className="w-8 h-8  text-[#f3f3f3]" />
                <span className="text-[#f3f3f3] text-center text-sm sm:text-base md:text-lg">
                  Borderless<br/> Transactions
                </span>
              </div>
            </div>

            <ul className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg flex items-center gap-3 sm:gap-4 text-[#27ca60]">
              <li>
                <Link href="/web3-sovereignty" className="hover:text-[#D2FD9C]">Contact</Link>
              </li>
              <li>
                <Link href="/ecosystem-integrations" className="hover:text-[#D2FD9C]">Social</Link>
              </li>
            </ul> 
          </div>
        </aside>

        {/* Main content: scrollable on desktop, normal flow on mobile/tablet */}
        <main className="lg:basis-[57.143%] lg:h-screen lg:overflow-y-auto p-6 md:p-8">
          <div className="prose prose-zinc max-w-none dark:prose-invert">
            <Image src="https://images.unsplash.com/photo-1743529628081-6777a326a4e5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="rounded-2xl"  alt="Ming Open Web HQ" width={1000} height={1000} />

            {/* Productivity section */}
            <section className="mt-6">
              <p className="text-center text-lg font-medium text-zinc-600 mb-10">Earn stable loyalty points on every purchase. <br/>Spend anywhere and get instant discounts on your everyday purchases.</p>
              <hr className="border-dashed" />
              <h2 className="mt-10 text-center text-4xl sm:text-5xl font-semibold tracking-tight text-[#364314]">
                Your business is built to scale.
              </h2>

              <p className="mt-2 text-center text-sm text-zinc-500">
                Maximize your productivity with Lypto designed to streamline your payments globally and locally.
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl bg-[#D2FD9C] p-8">
                  <div className="text-7xl text-center font-medium text-[#364314]">2x</div>
                  <div className="mt-4 text-center text-[#364314]">Double Your Sales</div>
                </div>
                <div className="rounded-2xl bg-[#D2FD9C] p-8">
                  <div className="text-7xl text-center font-medium text-[#364314]">1.5%</div>
                  <div className="mt-4 text-center text-[#364314]">Cashback on Every Purchase</div>
                </div>
              </div>
            </section>
            
          </div>
        </main>
      </div>
    </div>
  );
}
