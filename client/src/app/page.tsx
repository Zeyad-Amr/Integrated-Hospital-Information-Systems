"use client";

import { useScroll } from "framer-motion";

import Link from "next/link";

// components
import ScrollProgress from "@/core/components/scroll-progress";

// ----------------------------------------------------------------------

export default function HomePage() {
  const { scrollYProgress } = useScroll();
  return (
    <div>
      <ScrollProgress scrollYProgress={scrollYProgress} />

      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-center">
            Hello, We are {""}
            <span className="text-blue-500">Team Khaleha 3la Allah</span>
          </h1>
          <h2 className="text-4xl font-bold text-center">
            Welcome to <span className="text-blue-500">our GP.</span>
          </h2>
          <Link href="/test"> Go to Test Page</Link>
        </div>
      </main>
    </div>
  );
}
