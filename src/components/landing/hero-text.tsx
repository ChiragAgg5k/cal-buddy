"use client";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { motion } from "framer-motion";

export function HeroText() {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="text-3xl font-bold leading-snug tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none"
      >
        Meet Cal Buddy:
        <Highlight className="">Your Smart Calendar Assistant</Highlight>
      </motion.h1>
    </HeroHighlight>
  );
}
