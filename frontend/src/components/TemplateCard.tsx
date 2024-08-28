"use client";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";

export default function TemplateCard() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={50}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-50 lg:h-40 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-center"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4 gap-2">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      <i className="ri-git-pull-request-line"></i> {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-sm"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-2 py-1 text-sm rounded-sm font-bold bg-black text-white flex items-center gap-1"
                  >
                    <i className="ri-cloud-line"></i> {active.ctaText}
                  </motion.a>
                </div>
                <p className="px-4 text-sm font-medium text-neutral-700"><i className="ri-information-2-line"></i> Description</p>

                <div className="mt-2 relative px-4 h-44 overflow-y-scroll">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-sm h-30 md:h-40 pb-10 flex flex-col items-start gap-4 dark:text-neutral-400 overflow-y-scroll border p-1 px-2"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>

                <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }} className="mx-4 flex items-center gap-2 text-sm mb-4">
                        <p className="p-1 px-2 bg-black text-white flex items-center gap-1"><i className="ri-github-fill"></i>Github</p>
                        <p className="border p-1 px-2"><i className="ri-global-line"></i> View Demo</p>
                    </motion.div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-2xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-3 mt-4 mb-3">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={index}
            onClick={() => setActive(card)}
            className="flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer border"
          >
            <div className="flex gap-1 flex-col w-full">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={100}
                  height={20}
                  src={card.src}
                  alt={card.title}
                  className="h-20 w-full rounded-lg object-cover object-center rounded-br-none rounded-bl-none"
                />
              </motion.div>
              <div className="flex text-left items-start flex-col pb-2 pl-2">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium text-neutral-800 dark:text-neutral-200 md:text-left text-sm"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-neutral-600 dark:text-neutral-400 md:text-left text-sm mb-2"
                >
                  {card.description}
                </motion.p>

                <div className="flex items-center gap-2">
                  <motion.a
                    href="https://github.com/13x54n/ming-dev/tree/main"
                    target="_blank"
                    className="text-sm"
                  >
                    <i className="ri-github-fill"></i> GitHub
                  </motion.a>
                  <motion.a
                    href="https://github.com/13x54n/ming-dev/tree/main"
                    target="_blank"
                    className="text-sm"
                  >
                    <i className="ri-global-line"></i> View Demo
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description:
      "dApp powered by Next.js and ArgentX as wallet provider and authentication.",
    title: "Starknet dApp Boilerplate",
    src: "https://imgs.search.brave.com/C5-CJjr5DxuqdNaww1lg89FFzLtjRAONjqRNmhyMMrI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/dGJzdGF0LmNvbS93/cC91cGxvYWRzLzIw/MjQvMDIvc3Rhcmtu/ZXQtZXRoZXJldW0t/MTIwMHg2NzUuanBl/Zz9pc1NhZmFyaT1m/YWxzZSZpc01vYmls/ZT1mYWxzZQ",
    ctaText: "Deploy",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Lana Del Rey, an iconic American singer-songwriter, is celebrated for
          her melancholic and cinematic music style. Born Elizabeth Woolridge
          Grant in New York City, she has captivated audiences worldwide with
          her haunting voice and introspective lyrics. <br /> <br /> Her songs
          often explore themes of tragic romance, glamour, and melancholia,
          drawing inspiration from both contemporary and vintage pop culture.
          With a career that has seen numerous critically acclaimed albums, Lana
          Del Rey has established herself as a unique and influential figure in
          the music industry, earning a dedicated fan base and numerous
          accolades. Lana Del Rey, an iconic American singer-songwriter, is
          celebrated for her melancholic and cinematic music style. Born
          Elizabeth Woolridge Grant in New York City, she has captivated
          audiences worldwide with her haunting voice and introspective lyrics.{" "}
          <br /> <br /> Her songs often explore themes of tragic romance,
          glamour, and melancholia, drawing inspiration from both contemporary
          and vintage pop culture. With a career that has seen numerous
          critically acclaimed albums, Lana Del Rey has established herself as a
          unique and influential figure in the music industry, earning a
          dedicated fan base and numerous accolades. Lana Del Rey, an iconic
          American singer-songwriter, is celebrated for her melancholic and
          cinematic music style. Born Elizabeth Woolridge Grant in New York
          City, she has captivated audiences worldwide with her haunting voice
          and introspective lyrics. <br /> <br /> Her songs often explore themes
          of tragic romance, glamour, and melancholia, drawing inspiration from
          both contemporary and vintage pop culture. With a career that has seen
          numerous critically acclaimed albums, Lana Del Rey has established
          herself as a unique and influential figure in the music industry,
          earning a dedicated fan base and numerous accolades.
        </p>
      );
    },
  },
  {
    description:
      "Flash loan dApp with premium UX powered by Shadcn & Acernity.",
    title: "Flash Loan",
    src: "https://imgs.search.brave.com/VMf709cBvBavWmkjmI3SKp8Yv9hg805SLL8EXEkIdAM/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA5LzA0LzM2LzA3/LzM2MF9GXzkwNDM2/MDc0N19BcllMcUUz/bjZIeWk0SkZleEF2/WUtEZTlNajZKQmEx/cS5qcGc",
    ctaText: "Deploy",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Babu Maan, a legendary Punjabi singer, is renowned for his soulful
          voice and profound lyrics that resonate deeply with his audience. Born
          in the village of Khant Maanpur in Punjab, India, he has become a
          cultural icon in the Punjabi music industry. <br /> <br /> His songs
          often reflect the struggles and triumphs of everyday life, capturing
          the essence of Punjabi culture and traditions. With a career spanning
          over two decades, Babu Maan has released numerous hit albums and
          singles that have garnered him a massive fan following both in India
          and abroad.
        </p>
      );
    },
  },

  {
    description: "NFT Marketplace built on top of Solana & Ethereum.",
    title: "NFT Marketplace",
    src: "https://imgs.search.brave.com/EKCGSgGaGW4mo0QxL9h4GW5744lyTx2QRYogjKQJvXk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pYS5h/Y3Mub3JnLmF1L2Nv/bnRlbnQvZGFtL2lh/L2FydGljbGUvaW1h/Z2VzLzIwMjEvY3J5/cHRvcHVua3MuSlBH",
    ctaText: "Deploy",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Metallica, an iconic American heavy metal band, is renowned for their
          powerful sound and intense performances that resonate deeply with
          their audience. Formed in Los Angeles, California, they have become a
          cultural icon in the heavy metal music industry. <br /> <br /> Their
          songs often reflect themes of aggression, social issues, and personal
          struggles, capturing the essence of the heavy metal genre. With a
          career spanning over four decades, Metallica has released numerous hit
          albums and singles that have garnered them a massive fan following
          both in the United States and abroad.
        </p>
      );
    },
  },
  {
    description:
      "Powered by ArgentX & Alchemy for account abstraction and meta-transactions.",
    title: "Abstract Wallet for ArgentX",
    src: "https://imgs.search.brave.com/9H_FVKou5oNX7uH9ZliZZPkcZe07fLVeAn_bnuL1PpA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuY3RmYXNzZXRz/Lm5ldC9xNXVsazRi/cDY1cjcvMmlHZnJt/c0JQc015RlNMenFu/dGtZUy84ZTAxZDZj/Y2VmY2RmOGM0ZTdi/NDE2NDAwMzNkMTFh/ZC9Db2luYmFzZV93/YWxsZXRfX0RlRmlf/dHV0b3JpYWwucG5n/P3c9NzY4JmZtPXBu/Zw",
    ctaText: "Deploy",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Himesh Reshammiya, a renowned Indian music composer, singer, and
          actor, is celebrated for his distinctive voice and innovative
          compositions. Born in Mumbai, India, he has become a prominent figure
          in the Bollywood music industry. <br /> <br /> His songs often feature
          a blend of contemporary and traditional Indian music, capturing the
          essence of modern Bollywood soundtracks. With a career spanning over
          two decades, Himesh Reshammiya has released numerous hit albums and
          singles that have garnered him a massive fan following both in India
          and abroad.
        </p>
      );
    },
  },
];
