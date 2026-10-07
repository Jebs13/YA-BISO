"use client";

import Link from "next/link";
import { useState } from "react";

const transactions = [
  { date: "07/10/2026", desc: "Cotisation Groupe Avenir", montant: "-$11.00", statut: "paid" },
  { date: "04/10/2026", desc: "Réception tour 4", montant: "+$100.00", statut: "received" },
  { date: "01/10/2026", desc: "Remboursement crédit", montant: "-$34.50", statut: "paid" },
  { date: "28/09/2026", desc: "Cotisation Groupe Avenir", montant: "-$11.00", statut: "paid" },
  { date: "25/09/2026", desc: "Micro-crédit reçu", montant: "+$90.00", statut: "received" },
];

const membres = [
  { nom: "Marie K.", statut: "paid" },
  { nom: "Vous", statut: "you" },
  { nom: "Patrick M.", statut: "wait" },
  { nom: "Esther L.", statut: "wait" },
  { nom: "David N.", statut: "paid" },
];

export default function ActiveUserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-yb-creme flex">
      {/* ═══════════ SIDEBAR ═══════════ */}
      <aside
       className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-yb-brun z-40 flex flex-col transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
       >
        <div className="kente-line" />

        <div className="p-6">
          <Link
            href="/"
            className="text-2xl text-yb-or"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Ya <span className="text-yb-orange">Biso</span>
          </Link>
        </div>

        <nav className="flex-1 px-3 space-y-1">
          <SidebarItem icon="🏠" label="Dashboard" active />
          <SidebarItem icon="🫂" label="Ma tontine" />
          <SidebarItem icon="💳" label="Crédit" href="/dashboard/credit" />
          <SidebarItem icon="📊" label="Historique" href="/dashboard/historique" />
          <SidebarItem icon="🏆" label="Score & Badges" href="/dashboard/score" />
          <SidebarItem icon="🏆" label="Paramètres" href="/dashboard/parametres" />
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="w-full text-red-400 hover:text-red-300 text-sm font-medium py-2 transition">
            ⏻ Déconnexion
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ═══════════ CONTENU ═══════════ */}
      <main className="flex-1 min-w-0">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-20 bg-yb-brun text-yb-or rounded-lg p-2 shadow-lg"
        >
          ☰
        </button>

        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
          {/* ═══════ HEADER ═══════ */}
          <header className="flex items-start justify-between mb-6">
            <div>
              <h1
                className="text-yb-brun text-2xl lg:text-3xl mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Bonjour, Jean-Baptiste 👋
              </h1>
              <p className="text-yb-texte-doux text-sm">
                Voici l'état de votre épargne aujourd'hui.
              </p>
            </div>
            <Link href="/dashboard/profil" className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-yb-vert text-white font-bold flex items-center justify-center">
                JB
              </div>
              <span className="absolute -bottom-1 -right-1 bg-yb-or text-yb-brun text-[10px] rounded-full w-5 h-5 flex items-center justify-center shadow">
                ✏️
              </span>
            </Link>
          </header>

          {/* Bandeau alerte */}
          <div className="bg-yb-orange/10 border border-yb-orange/30 rounded-xl p-4 mb-6 flex items-center gap-3">
            <span className="text-2xl">⭐</span>
            <div className="flex-1">
              <p className="text-yb-brun text-sm font-semibold">
                C'est votre tour cette semaine
              </p>
              <p className="text-yb-texte-doux text-xs">
                Vous recevrez $100 le 10/10/2026
              </p>
            </div>
          </div>

          {/* ═══════ HERO SOLDE ═══════ */}
          <section className="bg-gradient-to-br from-yb-vert to-yb-vert-clair rounded-2xl p-6 lg:p-8 mb-6">
            <div className="flex items-start justify-between mb-2">
              <p className="text-yb-creme/70 text-xs">
                Solde disponible
              </p>
              <span className="bg-white/15 backdrop-blur text-yb-creme text-[10px] font-semibold px-3 py-1 rounded-full">
                🥈 Fiable
              </span>
            </div>
            <p
              className="text-yb-or text-5xl lg:text-6xl font-black mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              $410.00
            </p>

            <div className="mb-6">
              <div className="flex justify-between items-baseline mb-2">
                <p className="text-yb-creme/75 text-xs">
                  Score de fiabilité
                </p>
                <p
                  className="text-yb-or text-lg font-bold"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  72<span className="text-sm opacity-60">/100</span>
                </p>
              </div>
              <div className="h-2 bg-white/15 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yb-vert to-yb-or rounded-full"
                  style={{ width: "72%" }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button className="bg-yb-orange text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#BF360C] transition">
                💰 Cotiser maintenant
              </button>
              <button className="border border-yb-creme/40 text-yb-creme py-3 rounded-lg font-semibold text-sm hover:border-yb-or hover:text-yb-or transition">
                📈 Demander un crédit
              </button>
            </div>
          </section>

          {/* ═══════ GRILLE 3 CARTES ═══════ */}
          <section className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="bg-white rounded-xl p-4 border-l-4 border-yb-vert shadow-sm">
              <div className="text-2xl mb-2">🫂</div>
              <p className="text-yb-brun text-xs font-semibold mb-1">
                Tontine active
              </p>
              <p className="text-yb-texte-doux text-[11px]">
                Groupe Avenir
              </p>
              <p className="text-gray-500 text-[10px] mt-1">
                10 membres · Tour 4/10
              </p>
              <p className="text-yb-orange text-xs font-bold mt-2">
                $100/sem.
              </p>
            </div>
            <div className="bg-white rounded-xl p-4 border-l-4 border-yb-or shadow-sm">
              <div className="text-2xl mb-2">⏰</div>
              <p className="text-yb-brun text-xs font-semibold mb-1">
                Prochain versement
              </p>
              <p className="text-yb-texte-doux text-[11px]">
                Dans 3 jours
              </p>
              <p className="text-gray-500 text-[10px] mt-1">
                Vous recevrez
              </p>
              <p className="text-yb-vert text-xs font-bold mt-2">+$100</p>
            </div>
            <div className="bg-white rounded-xl p-4 border-l-4 border-yb-orange shadow-sm">
              <div className="text-2xl mb-2">💳</div>
              <p className="text-yb-brun text-xs font-semibold mb-1">
                Micro-crédit
              </p>
              <p className="text-yb-texte-doux text-[11px]">
                Jusqu'à $90
              </p>
              <p className="text-gray-500 text-[10px] mt-1">
                Taux 15%
              </p>
              <p className="text-yb-orange text-xs font-bold mt-2">
                Disponible
              </p>
            </div>
          </section>

          {/* ═══════ OBJECTIF ═══════ */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-[11px] font-semibold text-yb-texte-doux uppercase tracking-wider mb-1">
                  Mon objectif
                </p>
                <h3
                  className="text-yb-brun text-lg"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Projet Agriculture 🌱
                </h3>
              </div>
              <button className="text-yb-texte-doux text-xs hover:text-yb-orange transition">
                Modifier ✏️
              </button>
            </div>

            <div className="flex items-baseline justify-between mb-2">
              <p className="text-yb-brun text-sm font-bold">$100 atteint</p>
              <p className="text-yb-texte-doux text-xs">sur $500</p>
            </div>
            <div className="h-3 bg-gray-100 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-yb-vert to-yb-or rounded-full"
                style={{ width: "20%" }}
              />
            </div>
            <p className="text-yb-texte-doux text-xs">
              Il vous reste <strong>$400</strong> — encore 4 cycles estimés.
            </p>
          </section>

          {/* ═══════ GRAPHIQUE ═══════ */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <h3
              className="text-yb-brun text-lg mb-1"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Évolution de votre épargne
            </h3>
            <p className="text-yb-texte-doux text-xs mb-5">
              8 dernières semaines
            </p>

            <div className="w-full overflow-x-auto">
              <svg viewBox="0 0 400 200" className="w-full h-48">
                {/* Grille */}
                {[0, 50, 100, 150].map((y) => (
                  <line
                    key={y}
                    x1="30"
                    y1={y + 30}
                    x2="390"
                    y2={y + 30}
                    stroke="#F5F0EB"
                    strokeWidth="1"
                  />
                ))}
                {/* Aire sous la courbe */}
                <polyline
                  points="30,180 80,176 130,172 180,143 230,139 280,135 330,131 380,30 380,180 30,180"
                  fill="rgba(27, 94, 32, 0.08)"
                />
                {/* Courbe */}
                <polyline
                  points="30,180 80,176 130,172 180,143 230,139 280,135 330,131 380,30"
                  fill="none"
                  stroke="#1B5E20"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Points */}
                {[
                  [30, 180], [80, 176], [130, 172], [180, 143],
                  [230, 139], [280, 135], [330, 131], [380, 30],
                ].map(([x, y], i) => (
                  <circle key={i} cx={x} cy={y} r="3.5" fill="#F9A825" stroke="#1B5E20" strokeWidth="2" />
                ))}
                {/* Labels semaines */}
                {["S1", "S2", "S3", "S4", "S5", "S6", "S7", "S8"].map((s, i) => (
                  <text
                    key={s}
                    x={30 + i * 50}
                    y="195"
                    fontSize="10"
                    fill="#5D4037"
                    textAnchor="middle"
                  >
                    {s}
                  </text>
                ))}
              </svg>
            </div>
          </section>

          {/* ═══════ PROCHAIN PALIER ═══════ */}
          <section className="bg-gradient-to-br from-yb-brun to-yb-brun-clair rounded-2xl p-6 mb-6 text-yb-creme">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">🏆</span>
              <h3
                className="text-xl text-yb-or"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Débloquez plus de crédit
              </h3>
            </div>
            <p className="text-yb-creme/80 text-sm mb-4">
              Complétez encore <strong>1 cycle</strong> pour débloquer un
              crédit jusqu'à <strong>$150</strong>.
            </p>
            <div className="flex justify-between items-baseline mb-2">
              <p className="text-yb-creme/60 text-xs">Progression</p>
              <p className="text-yb-or text-xs font-bold">72%</p>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-yb-vert to-yb-or rounded-full"
                style={{ width: "72%" }}
              />
            </div>
            <button className="text-yb-or text-sm font-semibold hover:underline">
              Voir les paliers →
            </button>
          </section>

          {/* ═══════ GROUPE CETTE SEMAINE ═══════ */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
            <h3
              className="text-yb-brun text-lg mb-1"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Groupe Avenir — Semaine 4
            </h3>
            <p className="text-yb-texte-doux text-xs mb-4">
              Statut des cotisations du groupe
            </p>

            <div className="space-y-2 mb-4">
              {membres.map((m) => (
                <div
                  key={m.nom}
                  className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                        m.statut === "you" ? "bg-yb-orange" : "bg-yb-vert"
                      }`}
                    >
                      {m.nom[0]}
                    </div>
                    <span
                      className={`text-sm ${
                        m.statut === "you"
                          ? "text-yb-orange font-semibold"
                          : "text-yb-brun"
                      }`}
                    >
                      {m.nom}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      m.statut === "paid"
                        ? "bg-yb-vert/10 text-yb-vert"
                        : m.statut === "you"
                        ? "bg-yb-orange/10 text-yb-orange"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {m.statut === "paid"
                      ? "✓ Cotisé"
                      : m.statut === "you"
                      ? "⭐ Bénéficiaire"
                      : "⏳ En attente"}
                  </span>
                </div>
              ))}
            </div>

            <button className="text-yb-orange text-sm font-semibold hover:underline">
              Voir le groupe complet →
            </button>
          </section>

          {/* ═══════ BADGES ═══════ */}
          <section className="mb-6">
            <h3
              className="text-yb-brun text-lg mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Vos badges
            </h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-yb-vert/10 border border-yb-vert/20 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">🥉</div>
                <p className="text-yb-brun text-xs font-semibold">Débutant</p>
                <p className="text-yb-vert text-[10px] mt-1">Obtenu</p>
              </div>
              <div className="bg-yb-or/15 border border-yb-or/30 rounded-xl p-4 text-center">
                <div className="text-3xl mb-2">🥈</div>
                <p className="text-yb-brun text-xs font-semibold">Fiable</p>
                <p className="text-yb-orange text-[10px] mt-1">Obtenu</p>
              </div>
              <div className="bg-gray-100 border border-gray-200 rounded-xl p-4 text-center opacity-50">
                <div className="text-3xl mb-2 grayscale">🥇</div>
                <p className="text-yb-brun text-xs font-semibold">Expert</p>
                <p className="text-gray-500 text-[10px] mt-1">Score 80+</p>
              </div>
            </div>
          </section>

          {/* ═══════ TRANSACTIONS ═══════ */}
          <section className="mb-8">
            <h3
              className="text-yb-brun text-lg mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Transactions récentes
            </h3>

            <div className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm">
              {transactions.map((t, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-4 py-3 ${
                    i !== transactions.length - 1
                      ? "border-b border-gray-50"
                      : ""
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-yb-brun text-sm font-medium truncate">
                      {t.desc}
                    </p>
                    <p className="text-gray-400 text-[11px]">{t.date}</p>
                  </div>
                  <p
                    className={`text-sm font-bold whitespace-nowrap ${
                      t.montant.startsWith("+")
                        ? "text-yb-vert"
                        : "text-yb-brun"
                    }`}
                  >
                    {t.montant}
                  </p>
                  <span
                    className={`text-[10px] font-semibold px-2 py-1 rounded whitespace-nowrap ${
                      t.statut === "received"
                        ? "bg-yb-vert/10 text-yb-vert"
                        : "bg-yb-orange/10 text-yb-orange"
                    }`}
                  >
                    {t.statut === "received" ? "Reçu ✓" : "Payé →"}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/dashboard/historique"
              className="inline-block mt-3 text-yb-orange text-sm font-semibold hover:underline"
            >
              Voir tout l'historique →
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
}

/* ═══════════ HELPER SIDEBAR ITEM ═══════════ */
function SidebarItem({
  icon,
  label,
  active,
  href,
}: {
  icon: string;
  label: string;
  active?: boolean;
  href?: string;
}) {
  const content = (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition cursor-pointer ${
        active
          ? "bg-yb-vert text-white shadow"
          : "text-yb-creme/85 hover:bg-white/5"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}