import { Compare } from "@/components/ui/compare";

import React from "react";
import { Cover } from "@/components/ui/cover";

const data = [
  {
    title: "🚀 Mission",
    description:
      "We aim to provide a safe sandbox for developers to host any kind of projects, applications, or production grade distributed services. Our mission is to utilize the existing devices as distributed node servers leveraging their computing power over complex data-centers.",
  },
  {
    title: "👀 Vision",
    description:
      "We aim to provide a safe sandbox for developers to host any kind of projects, applications, or production grade distributed services. Our mission is to utilize the existing devices as distributed node servers leveraging their computing power over complex data-centers.",
  },
];

export const metadata = {
  title: 'Company | Ming | Building distributed system for Open Source Cloud.',
  description: "We are trying to provide a platform that empowers incentivizing unused computer devices as secure and efficient cloud environments through distributed system powered by web3.",
  icons: {
    icon: 'https://ik.imagekit.io/lexy/Ming/3.png'
  }
}

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl p-6 pt-0 sm:pt-2 lg:px-8">
      <div className="mt-0">
        <p className="text-lg font-semibold text-gray-400 text-center">
          🛠️ By Developer for Developers.
        </p>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center relative z-20 py-2 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          Building distributed system <br /> for <Cover>Open Cloud.</Cover>
        </h1>
      </div>

      <Compare
        firstImage="https://ik.imagekit.io/lexy/Ming/Screenshot%202024-08-22%20235522.png?updatedAt=1724385377079"
        secondImage="https://ik.imagekit.io/lexy/Ming/Screenshot%202024-08-22%20235919.png?updatedAt=1724385570143"
        firstImageClassName="object-cover object-left-top"
        secondImageClassname="object-cover object-left-top"
        className="h-[200px] w-[100%] md:h-[300px] mt-6"
        slideMode="hover"
      />

      {data.map((d: any, index) => {
        return (
          <div key={index} className="text-justify mx-auto mt-5 max-w-[90vw] lg:max-w-[30vw] sm:max-w-[60vw]">
            <h1 className="font-semibold text-md">{d.title}</h1>
            <p className="border-t-[1px] mt-1 pt-1">{d.description}</p>
          </div>
        );
      })}
    </div>
  );
}