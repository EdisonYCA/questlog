import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { StateContext } from "@/context/StateContent";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <StateContext>
      <main className={inter.className}>
        <Component {...pageProps} />
      </main>
    </StateContext>
  );
}
