"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "Dashboard" },
  { href: "/quizzes", label: "All Quizzes" },
  { href: "/quizzes/create", label: "Create Quiz" },
  { href: "/my-submissions", label: "My Submissions" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-extrabold text-xl text-blue-700">
            <svg width={28} height={28} fill="none" viewBox="0 0 24 24">
              <circle cx={12} cy={12} r={10} fill="#2563eb" />
              <text x="12" y="17" textAnchor="middle" fontSize="13" fill="#fff" fontWeight="bold">QZ</text>
            </svg>
            QuizCraft
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6 items-center">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition px-2 py-1 rounded ${
                  pathname === link.href
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-blue-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/logout"
              className="ml-4 px-4 py-2 rounded bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition"
            >
              Logout
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex items-center px-2 py-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-7 h-7 text-blue-700" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 8h16M4 16h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t shadow">
          <div className="flex flex-col gap-2 px-4 py-3">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium px-2 py-2 rounded ${
                  pathname === link.href
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-blue-50"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/logout"
              className="mt-2 px-4 py-2 rounded bg-red-50 text-red-600 font-semibold hover:bg-red-100 transition"
              onClick={() => setMenuOpen(false)}
            >
              Logout
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}