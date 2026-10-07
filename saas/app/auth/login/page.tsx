"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-yb-creme flex flex-col">
      <div className="kente-line" />
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <Link
            href="/"
            className="block text-center text-yb-brun text-3xl mb-2"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Ya <span className="text-yb-orange">Biso</span>
          </Link>
          <p className="text-center text-yb-texte-doux text-sm mb-10">
            Content de te revoir 👋
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-yb-texte-doux uppercase tracking-wider mb-2">
                Numéro de téléphone
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+243 8XX XXX XXX"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-yb-brun focus:outline-none focus:border-yb-vert transition"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-yb-texte-doux uppercase tracking-wider mb-2">
                Code PIN
              </label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="••••"
                maxLength={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-yb-brun focus:outline-none focus:border-yb-vert transition"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-yb-orange text-white py-4 rounded-lg font-semibold hover:bg-[#BF360C] transition"
            >
              Se connecter
            </button>
          </form>

          <p className="text-center text-yb-texte-doux text-sm mt-8">
            Pas encore de compte ?{" "}
            <Link
              href="/auth/register"
              className="text-yb-orange font-semibold hover:underline"
            >
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}