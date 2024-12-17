"use client";

import { motion, useAnimation } from "framer-motion";

const RefreshIcon = () => {
  const controls = useAnimation();

  return (
    <div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
      onClick={() => controls.start("rotate")}
    >
      <motion.svg
        className="mr-2"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
        variants={{
          normal: {
            rotate: "0deg",
          },
          animate: {
            rotate: "-50deg",
          },
          rotate: {
            rotate: "180deg",
          },
        }}
        animate={controls}
      >
        <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
        <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
        <path d="M16 16h5v5" />
      </motion.svg>
      Clear Activity
    </div>
  );
};

export { RefreshIcon };
