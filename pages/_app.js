import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { StateContext } from "@/context/StateContent";
import { AuthContextProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <StateContext>
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </StateContext>
    </AuthContextProvider>
  );
}
