import Landing from "@/components/Landing";

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
    </main>
  );
}
