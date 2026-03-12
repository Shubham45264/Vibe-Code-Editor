import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4 py-8 md:py-16">
      {/* Hero Image */}
      <div className="relative w-full max-w-[500px] aspect-video mb-10">
        <Image
          src="/hero.svg"
          alt="Developer Illustration"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Main Content Section */}
      <div className="relative w-full max-w-4xl flex flex-col items-center text-center">
        {/* Headline */}
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-[900] tracking-tight leading-[1.1] mb-6">
          <span className=" z-20 text-6xl mt-5 font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-red-500 to-pink-500 dark:from-rose-400 dark:via-red-400 dark:to-pink-400 tracking-tight leading-[1.3]">
            Vibe Code With Intelligence
          </span>
          <br />

        </h1>

        {/* Description */}
        <p className="text-sm md:text-base lg:text-lg text-zinc-400 max-w-2xl leading-relaxed mb-10">
          VibeCode Editor is a powerful and intelligent code editor that enhances
          your coding experience with advanced features and seamless integration.
        </p>

        {/* CTA Button */}
        <Link href="/dashboard">
          <Button
            variant="brand"
            size="lg"
            className="h-12 px-8 rounded-full text-base font-bold shadow-[0_8px_20px_rgba(233,63,63,0.3)] hover:shadow-[0_12px_30px_rgba(233,63,63,0.4)] transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
          >
            Get Started
            <ArrowUpRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>
    </div>


  );
}
