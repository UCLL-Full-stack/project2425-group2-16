// Import the global CSS file for the entire app
import "../styles/third_badboy.css";
import '@styles/globals.css';
// import "../styles/other.css";

import type { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import React from "react";

const App = ({ Component, pageProps }: AppProps) => {
  return (
      <Component {...pageProps} />
  );
};

export default appWithTranslation(App);