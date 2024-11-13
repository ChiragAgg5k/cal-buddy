"use client";

import { motion, useAnimation } from "framer-motion";

const DURATION = 0.3;

const calculateDelay = (i: number) => {
  if (i === 0) return 0.1;

  return i * DURATION + 0.1;
};

const GitPullRequestIcon = () => {
  const controls = useAnimation();

  return (
    <div
      className="cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center"
      onMouseEnter={() => controls.start("animate")}
      onMouseLeave={() => controls.start("normal")}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.circle
          cx="18"
          cy="18"
          r="3"
          transition={{
            duration: DURATION,
            delay: calculateDelay(0),
            opacity: { delay: calculateDelay(0) },
          }}
          variants={{
            normal: { pathLength: 1, opacity: 1, transition: { delay: 0 } },
            animate: {
              pathLength: [0, 1],
              opacity: [0, 1],
            },
          }}
          animate={controls}
        />
        <motion.circle
          cx="6"
          cy="6"
          r="3"
          transition={{
            duration: DURATION,
            delay: calculateDelay(2),
            opacity: { delay: calculateDelay(2) },
          }}
          variants={{
            normal: { pathLength: 1, opacity: 1, transition: { delay: 0 } },
            animate: {
              pathLength: [0, 1],
              opacity: [0, 1],
            },
          }}
          animate={controls}
        />
        <motion.path
          d="M13 6h3a2 2 0 0 1 2 2v7"
          transition={{
            duration: DURATION,
            delay: calculateDelay(1),
            opacity: { delay: calculateDelay(1) },
          }}
          variants={{
            normal: {
              pathLength: 1,
              pathOffset: 0,
              opacity: 1,
              transition: { delay: 0 },
            },
            animate: {
              pathLength: [0, 1],
              opacity: [0, 1],
              pathOffset: [1, 0],
            },
          }}
          animate={controls}
        />
        <motion.line
          x1="6"
          x2="6"
          y1="9"
          y2="21"
          transition={{
            duration: DURATION,
            delay: calculateDelay(3),
            opacity: { delay: calculateDelay(3) },
          }}
          variants={{
            normal: { opacity: 1, pathLength: 1, transition: { delay: 0 } },
            animate: {
              opacity: [0, 1],
              pathLength: [0, 1],
            },
          }}
          animate={controls}
        />
      </svg>
    </div>
  );
};

export { GitPullRequestIcon };
