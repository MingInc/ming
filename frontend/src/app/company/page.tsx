import { Compare } from "@/components/ui/compare";

import React from "react";
import { Cover } from "@/components/ui/cover";

export default function Page() {
  return (
    <div className="mx-auto max-w-7xl p-6 lg:px-8">
      <div className="mt-0">
        <p className="text-lg font-semibold text-gray-400 text-center">🛠️ By Developer for Developers.</p>
        <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center relative z-20 py-2 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
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
    </div>
  );
}
