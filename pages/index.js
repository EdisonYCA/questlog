import { useState } from 'react';
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/landing/Navbar";
import Image from "next/image";
import Link from 'next/link';
import { useStateContext } from '@/context/StateContent';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const { user } = useStateContext();
  const [isHovered, setIsHovered] = useState(false);

  const navigation = [
    { name: "Home", href: "/", current: true },
    { name: "Login", href: "/login", current: false },
    { name: "Sign Up", href: "/signup", current: false },
  ];

  return (
    <div className="min-h-screen bg-[#150A18]">
      {/* Enhanced background grid with diagonal lines */}
      <div className="fixed inset-0 bg-[linear-gradient(#711142_1px,transparent_1px),linear-gradient(90deg,#711142_1px,transparent_1px)] bg-[size:35px_35px] opacity-10" />
      <div className="fixed inset-0 bg-[linear-gradient(45deg,#711142_1px,transparent_1px)] bg-[size:35px_35px] opacity-5" />
      
      <Navbar navLinks={navigation} />

      <main className="relative">
        {/* Hero section */}
        <div className="relative isolate overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl font-mono">
                Your Digital Quest Journal
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-300 font-mono">
                Track your adventures, organize your tasks, and level up your productivity in a cyberpunk-inspired interface.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                {!user ? (
                  <>
                    <Link
                      href="/signup"
                      className="relative group"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <div className="absolute -inset-1 bg-gradient-to-r from-[#FF2E63] to-[#08F7FE] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                      <button className="relative px-8 py-4 bg-[#1F1225] rounded-lg leading-none flex items-center">
                        <span className="text-[#FF2E63] group-hover:text-[#08F7FE] transition-colors duration-200 font-mono">Get Started</span>
                      </button>
                    </Link>
                    <Link href="/login" className="text-sm font-semibold leading-6 text-[#FF2E63] font-mono">
                      Sign in <span aria-hidden="true">→</span>
                    </Link>
                  </>
                ) : (
                  <Link
                    href="/dashboard"
                    className="relative group"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-[#FF2E63] to-[#08F7FE] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                    <button className="relative px-8 py-4 bg-[#1F1225] rounded-lg leading-none flex items-center">
                      <span className="text-[#FF2E63] group-hover:text-[#08F7FE] transition-colors duration-200 font-mono">Go to Dashboard</span>
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Features section */}
        <div className="relative py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:text-center">
              <h2 className="text-base font-semibold leading-7 text-[#FF2E63] font-mono">Level Up Your Productivity</h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl font-mono">
                Everything you need to track your journey
              </p>
              <p className="mt-6 text-lg leading-8 text-gray-300 font-mono">
                Transform your daily tasks into epic quests with our feature-rich digital journal.
              </p>
            </div>
            <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
              <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                {/* Feature 1 */}
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF2E63]">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
                    </svg>
                  </div>
                  <dt className="text-base font-semibold leading-7 text-white font-mono">
                    Digital Journal
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-300 font-mono">
                    Record your daily adventures and achievements in a beautifully designed digital space.
                  </dd>
                </div>

                {/* Feature 2 */}
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF2E63]">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                    </svg>
                  </div>
                  <dt className="text-base font-semibold leading-7 text-white font-mono">
                    Task Management
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-300 font-mono">
                    Organize your quests and tasks with our intuitive task management system.
                  </dd>
                </div>

                {/* Feature 3 */}
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF2E63]">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                    </svg>
                  </div>
                  <dt className="text-base font-semibold leading-7 text-white font-mono">
                    Progress Tracking
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-300 font-mono">
                    Monitor your progress and celebrate achievements with our gamified tracking system.
                  </dd>
                </div>

                {/* Feature 4 */}
                <div className="relative pl-16">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF2E63]">
                    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  </div>
                  <dt className="text-base font-semibold leading-7 text-white font-mono">
                    Rewards System
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-300 font-mono">
                    Earn rewards and unlock achievements as you complete your daily quests.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
