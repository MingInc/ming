"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "localhost to https",
    href: "/docs/primitives/alert-dialog",
    description:
      "Developer projects are important and in-demand, try us to host your apps, functions, etc.",
  },
  {
    title: "Discussions",
    href: "/docs/primitives/hover-card",
    description:
      "Our amazing minds discuss here on new ideas, issues, milestones, etc.",
  },
  {
    title: "Node Discovery",
    href: "/docs/primitives/tabs",
    description:
      "We have a dictionary of nodes interconnected and transparent.",
  },
  {
    title: "Governance & Voting",
    href: "/docs/primitives/tooltip",
    description:
      "We let community decide on behalf of major decisions on DAO.",
  },
];

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>For developers</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <Image
                      src="https://ik.imagekit.io/lexy/Ming/3.png?updatedAt=1724359838994"
                      width={50}
                      height={50}
                      alt="Ming."
                    />
                    <div className="mb-2 mt-4 text-md font-medium">
                      Getting Started
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Learn to use our platform and help us build a community
                      for an Open Cloud for developers.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs/installation" title="Installation">
                We offer SDK for developer to host their projects on Cloud.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Host a Node">
                Be the backbone of Ming Community by hosting a node.
              </ListItem>
              <ListItem href="/docs" title="Community Contribution">
                Our codebase is Open Source and we love pull requests.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Platform</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/company" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Company
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
