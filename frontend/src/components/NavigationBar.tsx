"use client";

import { useEffect, useState } from "react";
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
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { firebaseConfig } from "@/firebase.config";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function NavigationBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<any>();
  const [isUserSignedIn, setIsUserSignedIn] = useState<boolean>(true);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const authInstance = getAuth(app);

    const _user = authInstance.currentUser;

    if (_user) {
      setUser(user);
      setIsUserSignedIn(true);
    }
  }, []);

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
          {isUserSignedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                    {/* <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut> */}
                  </DropdownMenuItem>
                  {/* <DropdownMenuItem>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Billing</span>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </DropdownMenuItem> */}
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                    {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                {/* <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Users className="mr-2 h-4 w-4" />
                    <span>Team</span>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <UserPlus className="mr-2 h-4 w-4" />
                      <span>Invite users</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Email</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <MessageSquare className="mr-2 h-4 w-4" />
                          <span>Message</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <PlusCircle className="mr-2 h-4 w-4" />
                          <span>More...</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem>
                    <Plus className="mr-2 h-4 w-4" />
                    <span>New Team</span>
                    <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Github className="mr-2 h-4 w-4" />
                  <span>GitHub</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LifeBuoy className="mr-2 h-4 w-4" />
                  <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                  <Cloud className="mr-2 h-4 w-4" />
                  <span>API</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
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
                      <Link
                        href="https://ming-2.gitbook.io/ming/getting-started/installation"
                        target="_blank"
                        className="w-full text-left text-sm font-medium text-gray-500 flex gap-2 ml-2"
                      >
                        <i className="ri-cpu-line"></i>Installation
                      </Link>
                      <Link
                        href="https://ming-2.gitbook.io/ming/distributed-server/host-a-node"
                        target="_blank"
                        className="w-full text-left text-sm font-medium text-gray-500 flex gap-2 ml-2"
                      >
                        <i className="ri-terminal-box-line"></i> Host a Node
                      </Link>
                      <Link
                        href="https://ming-2.gitbook.io/ming/resources/community-contribution"
                        target="_blank"
                        className="w-full text-left text-sm font-medium text-gray-500 flex gap-2 ml-2"
                      >
                        <i className="ri-git-repository-line"></i>Community
                        Contribution
                      </Link>
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
                        <i className="ri-globe-line"></i> localhost to https
                      </button>
                      <button className="w-full text-left text-sm font-medium text-gray-500 flex gap-2 ml-2">
                        <i className="ri-chat-3-line"></i> Discussion
                      </button>
                      <button className="w-full text-left text-sm font-medium text-gray-500 flex gap-2 ml-2">
                        <i className="ri-instance-line"></i>Node Discovery
                      </button>
                      <button className="w-full text-left text-sm font-medium text-gray-500 flex gap-2 ml-2">
                        <i className="ri-government-line"></i> Governance &
                        Voting
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
                      <Link
                        href="/company"
                        onClick={() => setMobileMenuOpen(false)}
                        className="w-full text-left text-sm font-medium text-gray-500 flex gap-2 ml-2"
                      >
                        <i className="ri-home-line"></i>About us
                      </Link>
                      <Link
                        href="mailto:ming.env@gmail.com"
                        target="_blank"
                        className="w-full text-left text-sm font-medium text-gray-500 flex gap-2 ml-2"
                      >
                        <i className="ri-mail-line"></i>ming.env@gmail.com
                      </Link>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              {isUserSignedIn ? (
                <div className="flex flex-col gap-2 mt-4">
                  <div className="flex items-center text-sm gap-2 mb-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">Hello, not.so.lexy</p>
                      <p className="text-gray-500">not.so.lexy@gmail.com</p>
                    </div>
                  </div>
                  <button className="w-full items-center text-left text-sm font-medium text-gray-500 flex gap-1 ml-2">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </button>
                  <button className="w-full text-left text-sm font-medium text-gray-500 flex gap-1 ml-2 items-center">
                    <Settings className="mr-2 h-4 w-4" /> Settings
                  </button>
                  <button className="w-full text-left text-sm font-medium text-gray-500 flex gap-1 ml-2 items-center">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </button>
                  <button className="w-full text-left text-sm font-medium text-gray-500 flex gap-1 ml-2 items-center">
                    <LifeBuoy className="mr-2 h-4 w-4" /> Support
                  </button>
                  <button className="w-full text-left text-sm font-medium text-gray-500 flex gap-1 ml-2 items-center">
                    <Cloud className="mr-2 h-4 w-4" /> API
                  </button>
                  <button className="w-full items-center text-left text-sm font-medium text-gray-500 flex gap-1 ml-2">
                    <LogOut className="mr-2 h-4 w-4" /> Log out
                  </button>
                </div>
              ) : (
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
              )}

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
