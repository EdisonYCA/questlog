import { Geist, Geist_Mono } from "next/font/google";
import styled from "styled-components";
import Navbar from "@/components/landing/Navbar";
import Image from "next/image";

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
    <>
      <Navbar />
      <HomePageContainer>
        <HeroSection className="relative flex items-center justify-center">
          <HeroImgWrapper>
            <Image 
              src="/images/ffflurry.svg"
              alt="Hero Background"
              layout="fill"
              objectFit="cover"
              priority
            />
          </HeroImgWrapper>

          <TitleAndButton className="absolute z-10 flex flex-col items-center text-center">
            <HeroTitle className="text-6xl font-bold">
              Turn everyday routines into epic adventures with our AI-powered journal.
            </HeroTitle>
            <button className="mt-5 flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              Try QuestLog
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </TitleAndButton>
        </HeroSection>
      </HomePageContainer>
    </>
  );
}

const HomePageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #150a18;
`;

const HeroSection = styled.section`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TitleAndButton = styled.div`
  width: 60%;
  max-width: 700px;
  padding: 30px;
`;

const HeroTitle = styled.h1`
  color: #DF2A88;
  text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.6);
  line-height: 1.3;
`;

const HeroImgWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
`;