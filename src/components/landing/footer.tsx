import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 px-4 md:px-6 border-t flex flex-col items-center justify-center space-y-2 sm:space-y-0 sm:flex-row sm:justify-between">
      <div className="text-center">
        <p className="text-sm">© {currentYear} Cal Buddy. All rights reserved.</p>
      </div>

      <nav className="flex gap-4 sm:gap-6 text-sm">
        <Link
          href="https://github.com/ChiragAgg5k/cal-buddy/blob/master/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
          className={`
            font-medium transition-all duration-300 ease-in-out
            relative overflow-hidden group
          `}
        >
          <span className="relative z-10">Terms of Service</span>
          <span
            className="absolute bottom-0 left-0 w-full h-[0.08rem] bg-foreground 
              transform -translate-x-full group-hover:translate-x-0 
              transition-transform duration-300 ease-in-out"
          />
        </Link>
        <Link
          href="https://github.com/ChiragAgg5k/cal-buddy/blob/master/LICENSE"
          target="_blank"
          rel="noopener noreferrer"
          className={`
            font-medium transition-all duration-300 ease-in-out
            relative overflow-hidden group
          `}
        >
          <span className="relative z-10">Privacy</span>
          <span
            className="absolute bottom-0 left-0 w-full h-[0.08rem] bg-foreground 
              transform -translate-x-full group-hover:translate-x-0 
              transition-transform duration-300 ease-in-out"
          />
        </Link>
      </nav>
    </footer>
  );
}
