// Import the global CSS file for the entire app
import "../styles/third_badboy.css";
// import "../styles/other.css";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
