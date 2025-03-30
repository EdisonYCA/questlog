import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-green-400 flex items-center justify-center">
      <h1 className="text-4xl font-bold">✅ Tailwind is working!</h1>
    </div>
  );
}