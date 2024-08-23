import Landing from "@/components/Landing";
import Link from "next/link";

export const metadata = {
  title: 'Ming | Building distributed system for Open Source Cloud.',
  description: "We are trying to provide a platform that empowers incentivizing unused computer devices as secure and efficient cloud environments through distributed system powered by web3.",
  icons: {
    icon: 'https://ik.imagekit.io/lexy/Ming/3.png'
  }
}

export default function Home() {
  return (
    <main className="mx-auto max-w-7xl p-6 py-3 lg:px-8">
      <Landing/>

      <div className="flex gap-3 items-center justify-center text-xl mt-6">
        <Link href=""><i className="ri-github-fill"></i></Link>
        <Link href=""><i className="ri-discord-fill"></i></Link>
        <Link href=""><i className="ri-twitter-x-line"></i></Link>
      </div>
      <p className="text-center mt-3 font-medium text-gray-500 text-sm">Ming, MIT License.<br/> Distributed System for Open Source Cloud.</p>
    </main>
  );
}
