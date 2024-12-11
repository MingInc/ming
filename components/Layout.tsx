import React, { ReactNode } from "react";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout = ({ children, title = "Ming Open Web Headquarters" }: Props) => (
  <div className="relative min-h-screen flex flex-col justify-center items-center bg-hero bg-cover">
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="description"
        content="Ming Open Web Headquarters - is a Saas tailored for building secure on-chain applications."
      />
      <meta property="og:title" content={`${title}`} />
      <meta
        property="og:description"
        content="Ming Open Web Headquarters - is a Saas tailored for building secure on-chain applications."
      />
      <meta property="og:url" content="https://minginc.xyz/" />
      <meta property="og:type" content="website" />
      <link
        rel="icon"
        href="https://ik.imagekit.io/lexy/Ming/3.png?updatedAt=1724359838994"
        sizes="any"
      />
    </Head>
    {children}
  </div>
);

export default Layout;
