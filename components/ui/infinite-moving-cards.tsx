"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className,
}: {
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);
  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }
  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards",
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse",
        );
      }
    }
  };
  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  const items = [
    {
      src: "https://cdn.prod.website-files.com/66d6deeea9786f5f00ec11bb/66d6e8219a9583e431956d97_SNF%20Linear%20-%20Gradient%20Light.svg"
    },
    {
      src: "https://ethglobal.b-cdn.net/organizations/qctg9/square-logo/default.png"
    },
    {
      src: "https://ethglobal.b-cdn.net/organizations/xrzks/square-logo/default.png"
    },
    {
      src: "https://ethglobal.b-cdn.net/organizations/4hzt5/square-logo/default.png"
    },
    {
      src: "https://ethglobal.b-cdn.net/organizations/9zj01/square-logo/default.png"
    },
    {
      src: "https://ethglobal.notion.site/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fcef58126-a807-4ed3-8297-23a275135ebd%2Fcolor-512px.png?table=block&id=c14c487a-545d-4590-9081-1c705fa17916&spaceId=6594f729-d57b-4ace-a6ca-ef7eca93bb9d&width=660&userId=&cache=v2"
    },
  ];


  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 max-w-7xl overflow-hidden",
        className,
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]",
        )}
      >
        {items.map((item, idx) => (
          <li
            className="relative shrink-0 rounded-2xl px-8 py-6 "
            key={idx}
          >
            <Image 
              src={item.src} 
              width={400} 
              height={60} 
              alt="Starknet logo"
              className="h-[50px] w-full object-contain"
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
