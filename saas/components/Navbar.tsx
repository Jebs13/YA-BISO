"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "#probleme", label: "Problème" },
    { href: "#fonctionnement", label: "Fonctionnement" },
    { href: "#fonctionnalites", label: "Fonctionnalités" },
    { href: "#routes", label: "Routes" },
    { href: "#securite", label: "Sécurité" },
  ];

  return (
    <>
      <div className="kente-line" />
      <nav className="fixed top-1.5 left-0 right-0 z-50 bg-yb-brun h-16 flex items-center justify-between px-6 shadow-lg">
        <Link
          href="/"
          className="text-yb-or text-2xl tracking-wide"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Ya <span className="text-yb-orange">Biso</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-yb-creme text-sm font-medium opacity-85 hover:opacity-100 hover:text-yb-or transition"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <Link
              href="/auth/register"
              className="bg-yb-orange text-white px-5 py-2 rounded font-semibold text-sm hover:bg-[#BF360C] transition"
            >
              Rejoindre
            </Link>
          </li>
        </ul>

        {/* Mobile burger */}
        <button
          className="md:hidden text-yb-or text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="fixed top-[70px] left-0 right-0 z-40 bg-yb-brun md:hidden shadow-xl">
          <ul className="flex flex-col p-4 gap-4">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-yb-creme text-base font-medium"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/auth/register"
                className="inline-block bg-yb-orange text-white px-5 py-2 rounded font-semibold"
              >
                Rejoindre
              </Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}