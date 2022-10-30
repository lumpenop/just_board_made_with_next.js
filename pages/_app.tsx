import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavBar from "../components/nav.bar";
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <div>
        <NavBar />
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
}
