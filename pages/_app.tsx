import "../styles/globals.css";
import React from "react";
import type { AppProps } from "next/app";
import 'remixicon/fonts/remixicon.css'

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;
