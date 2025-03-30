import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { AuthContextProvider } from "@/context/AuthContext";
import { StateProvider } from '@/context/StateContext';

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <StateProvider>
        <main className={inter.className}>
          <Component {...pageProps} />
        </main>
      </StateProvider>
    </AuthContextProvider>
  );
}
