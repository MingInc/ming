"use client";

import Link from "next/link";

export function FocusCards() {

  const cards = [
    {
      title: "Sunya - Scan. Detect. Secure.",
      src: "https://images.unsplash.com/photo-1698423846501-cc5c25d07e85?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Smart Contracts analysis using AI and large datasets of vulnerabilities, so your business can focus on other things."
    },
    {
      title: "Lypto - Unified Wallet & Payments.",
      src: "https://images.unsplash.com/photo-1726137569807-c0ce211ccbec?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "For personal, a non-custodial wallet. For business, we offer payment processor, POS (Stablecoins as Digital Assets). "
    },
    {
      title: "iSendMoney - Borderless, No Hidden Fees.",
      src: "https://images.unsplash.com/photo-1580048915913-4f8f5cb481c4?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Borderless P2P remittance platform built on top of Blockchain and AI agents on customer support, dispute handling, etc."
    },
    {
      title: "Rose - Global Device Storage.",
      src: "https://images.unsplash.com/photo-1480843669328-3f7e37d196ae?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Store your data over blockchain with privacy. We make sure of secure, accessible storage for your data as strong as NFTs."
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mx-auto w-full mb-15">
      {cards.map((card, index) => (
        <div key={index}>
          <img
            key={card.title}
            className="h-70 object-cover w-full"
            src={card.src}
          />
          <p className="text-lg font-medium mt-2">{card.title}</p>
          <p className="mt-1 mb-2">
            {card.description}
          </p>
          <Link className="text-[#27ca60] underline" href="">Learn More</Link>
        </div>
      ))}
    </div>
  );
}
