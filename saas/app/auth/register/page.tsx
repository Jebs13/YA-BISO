"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [route, setRoute] = useState("");

  const routes = [
    {
      id: "3mois",
      emoji: "⚡",
      title: "Route 3 mois",
      sub: "Objectif Urgence",
      desc: "5$/semaine · Frais & syllabus",
    },
    {
      id: "6mois",
      emoji: "🚀",
      title: "Route 6 mois",
      sub: "Objectif Lancement",
      desc: "10$/semaine · Lancer un business",
    },
    {
      id: "12mois",
      emoji: "🌳",
      title: "Route 12 mois",
      sub: "Objectif Vision",
      desc: "25$/semaine · Grand projet",
    },
  ];

  const handleNext = () => {
    if (step < 2) setStep(step + 1);
    else router.push("/dashboard");
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

          {/* Barre de progression */}
          <div className="flex gap-2 mb-8 mt-6">
            {[1, 2].map((n) => (
              <div
                key={n}
                className={`flex-1 h-1.5 rounded ${
                  step >= n ? "bg-yb-orange" : "bg-gray-200"
                }`}
              />
            ))}
          </div>

          {step === 1 && (
            <div>
              <h1
                className="text-2xl text-yb-brun mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Crée ton compte
              </h1>
              <p className="text-yb-texte-doux text-sm mb-8">
                Étape 1/2 — Infos de base
              </p>

              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-yb-texte-doux uppercase tracking-wider mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex: Marie Kabongo"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-yb-brun focus:outline-none focus:border-yb-vert transition"
                    required
                  />
                </div>

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
                    Code PIN (4 à 6 chiffres)
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
                  onClick={handleNext}
                  className="w-full bg-yb-vert text-white py-4 rounded-lg font-semibold hover:bg-yb-vert-clair transition"
                >
                  Continuer →
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1
                className="text-2xl text-yb-brun mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Choisis ta route
              </h1>
              <p className="text-yb-texte-doux text-sm mb-8">
                Étape 2/2 — Quel est ton objectif ?
              </p>

              <div className="space-y-3 mb-6">
                {routes.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setRoute(r.id)}
                    className={`w-full text-left p-4 rounded-lg border-2 transition ${
                      route === r.id
                        ? "border-yb-orange bg-yb-orange/5"
                        : "border-gray-200 bg-white hover:border-yb-vert/40"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-3xl">{r.emoji}</span>
                      <div className="flex-1">
                        <div className="flex items-baseline gap-2">
                          <span
                            className="text-yb-brun font-bold"
                            style={{ fontFamily: "var(--font-playfair)" }}
                          >
                            {r.title}
                          </span>
                          <span className="text-yb-orange text-xs font-semibold">
                            {r.sub}
                          </span>
                        </div>
                        <p className="text-yb-texte-doux text-xs mt-1">
                          {r.desc}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border border-gray-200 text-yb-brun py-4 rounded-lg font-semibold hover:border-yb-brun transition"
                >
                  ← Retour
                </button>
                <button
                  onClick={handleNext}
                  disabled={!route}
                  className="flex-1 bg-yb-orange text-white py-4 rounded-lg font-semibold hover:bg-[#BF360C] transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Rejoindre Ya Biso 🎉
                </button>
              </div>
            </div>
          )}

          <p className="text-center text-yb-texte-doux text-sm mt-8">
            Déjà un compte ?{" "}
            <Link
              href="/auth/login"
              className="text-yb-orange font-semibold hover:underline"
            >
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}