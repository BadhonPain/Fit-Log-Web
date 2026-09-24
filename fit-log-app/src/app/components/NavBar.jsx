"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NavBar = ({ planCount = 0, savedCount = 0 }) => {
  const pathname = usePathname();

  const isActive = (path) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <nav className="bg-dark-bg border-b border-dark-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="FitLog logo" width={28} height={28} />
            <span className="text-white font-bold text-lg tracking-wide">
              FITLOG
            </span>
          </Link>

          
          <div className="hidden sm:flex items-center gap-1">
            <Link
              href="/"
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isActive("/")
                  ? "bg-accent text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Workout
            </Link>
            <Link
              href="/my-plan"
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                isActive("/my-plan")
                  ? "bg-accent text-black"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              My Plan
            </Link>
          </div>

          {/* Right — Status Badges */}
          <div className="flex items-center gap-3">
            <Link
              href="/my-plan"
              className="bg-accent text-black text-xs font-bold px-3 py-1 rounded-full"
            >
              Plan {planCount}
            </Link>
            <Link
              href="/my-plan"
              className="border border-accent text-accent text-xs font-bold px-3 py-1 rounded-full"
            >
              Saved {savedCount}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <div className="sm:hidden flex items-center ml-3">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-sm text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow-lg bg-dark-card rounded-box w-40 mt-2 border border-dark-border"
              >
                <li>
                  <Link
                    href="/"
                    className={
                      isActive("/")
                        ? "text-accent font-semibold"
                        : "text-zinc-300"
                    }
                  >
                    Workout
                  </Link>
                </li>
                <li>
                  <Link
                    href="/my-plan"
                    className={
                      isActive("/my-plan")
                        ? "text-accent font-semibold"
                        : "text-zinc-300"
                    }
                  >
                    My Plan
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;