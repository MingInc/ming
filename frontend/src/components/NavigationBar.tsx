"use client";

import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { NavigationMenuDemo } from "./Menus";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function NavigationBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b-[1px]">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 py-3 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <img
              alt=""
              src="https://ik.imagekit.io/lexy/Ming/3.png?updatedAt=1724359838994"
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex">
          <NavigationMenuDemo />
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/login"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-40 w-full overflow-y-auto bg-white px-6 py-3 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <img
                onClick={() => setMobileMenuOpen(false)}
                alt=""
                src="https://ik.imagekit.io/lexy/Ming/3.png?updatedAt=1724359838994"
                className="h-8 w-auto"
              />
              <span className="text-md font-semibold">Ming</span>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-8 flow-root">
            <div className="-my-6">
              <p className="text-2xl mt-4 mb-5 font-semibold">
                Building distributed system for an Open Cloud for developers.
              </p>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>For Developers</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      <button className="w-full text-left text-sm font-medium text-gray-500 flex gap-2 ml-2">
                        <i className="ri-cpu-line"></i>Installation
                      </button>
                      <button className="w-full text-left text-sm font-medium text-gray-500 flex gap-2 ml-2">
                        <i className="ri-terminal-box-line"></i> Host a Node
                      </button>
                      <button className="w-full text-left text-sm font-medium text-gray-500 flex gap-2 ml-2">
                        <i className="ri-git-repository-line"></i>Community
                        Contribution
                      </button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Platform</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      <button className="w-full text-left text-sm font-medium text-gray-500 flex gap-2 ml-2">
                        <i className="ri-window-line"></i>locahost to https
                      </button>
                      <button className="w-full text-left text-sm font-medium text-gray-500 flex gap-2 ml-2">
                        <i className="ri-community-line"></i> Discussion
                      </button>
                      <button className="w-full text-left text-sm font-medium text-gray-500 flex gap-2 ml-2">
                        <i className="ri-node-tree"></i>Node Discovery
                      </button>
                      <button className="w-full text-left text-sm font-medium text-gray-500 flex gap-2 ml-2">
                        <i className="ri-chat-poll-line"></i>Governance & Voting
                      </button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>Company</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2">
                      <button className="w-full text-left text-sm font-medium text-gray-500 flex gap-2 ml-2">
                        <i className="ri-ancient-gate-line"></i>About us
                      </button>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div
                className="mt-10 text-center bg-black"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link
                  href="/login"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-gray-50"
                >
                  Log in
                </Link>
              </div>

              <div className="flex gap-3 items-center justify-center text-2xl mt-8">
                <Link href="">
                  <i className="ri-github-fill"></i>
                </Link>
                <Link href="">
                  <i className="ri-discord-fill"></i>
                </Link>
                <Link href="">
                  <i className="ri-twitter-x-line"></i>
                </Link>
              </div>
              <p className="text-center mt-3 font-medium text-gray-500 text-sm">
                Ming, MIT License.
                <br /> Distributed System for Open Source Cloud.
              </p>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
