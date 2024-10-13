"use client";

import { ThemeMode } from "@/lib/themeModeUtil";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Calendar, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Link as ScrollLink } from "react-scroll";

type NavLink = {
  to: string;
  label: string;
};

const navLinks: NavLink[] = [
  { to: "features", label: "Features" },
  { to: "demo", label: "Demo" },
  { to: "pricing", label: "Pricing" },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      {navLinks.map((link) => (
        <ScrollLink
          key={link.to}
          to={link.to}
          spy={true}
          smooth={true}
          offset={-64} // Adjust this value based on your header height
          duration={500}
          onClick={() => setIsMenuOpen(false)}
          className={`
            font-medium hover:underline underline-offset-4 cursor-pointer dark:text-white
            ${
              isMobile
                ? "text-lg text-white hover:text-white-600 mb-4"
                : "text-sm text-gray-800 hover:text-black-600"
            }
          `}
        >
          {link.label}
        </ScrollLink>
      ))}
      <SignedOut>
        <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
          <p
            className={`
              font-medium hover:underline underline-offset-4 hover:cursor-pointer dark:text-white
              ${
                isMobile
                  ? "text-lg text-white hover:text-white-600 mb-4"
                  : "text-sm text-gray-800 hover:text-black-600"
              }
            `}
          >
            Sign In
          </p>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <Link
          href="/dashboard"
          className={`
            font-medium hover:underline underline-offset-4
            ${
              isMobile
                ? "text-lg text-white hover:text-black-600 mb-4"
                : "text-sm text-gray-800 hover:text-black-600"
            }
          `}
        >
          Dashboard
        </Link>
      </SignedIn>
    </>
  );

  return (
    <header
      className={`dark:bg-gray-800 bg-white px-4 lg:px-6 h-16 flex items-center fixed top-0 w-full z-50 shadow-sm 
      `}
    >
      <Link className="flex items-center justify-center" href="#">
        <Calendar className="h-6 w-6 text-black-600" />
        <span className="ml-2 text-xl font-bold text-black leading-snug tracking-tighter dark:text-white">
          Cal Buddy
        </span>
      </Link>

      <button
        className="ml-auto sm:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={
          isMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"
        }
      >
        {isMenuOpen ? (
          <X className="h-6 w-6 text-black-600" />
        ) : (
          <Menu className="h-6 w-6 text-black-600" />
        )}
      </button>

      {isMenuOpen && (
        <nav className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 flex flex-col items-center justify-center sm:hidden">
          <NavLinks isMobile />
        </nav>
      )}

      <nav className="ml-auto hidden sm:flex gap-4 sm:gap-6">
        <NavLinks />
      </nav>
      <ThemeMode />
    </header>
  );
}
