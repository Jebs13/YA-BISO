"use client";

import Link from "next/link";
import { useState } from "react";

/* ══════════════════════════════════════════════════════════
   DONNÉES — Transactions (statique pour la démo)
   ══════════════════════════════════════════════════════════ */

type TxType = "cotisation" | "reception" | "credit" | "remboursement";

type Transaction = {
  id: string;
  date: string;
  dateISO: string;
  desc: string;
  detail: string;
  montant: number;
  type: TxType;
  groupe?: string;
};

const TRANSACTIONS: Transaction[] = [
  {
    id: "TX-001",
    date: "07/10/2026",
    dateISO: "2026-10-07",
    desc: "Cotisation Groupe Avenir",
    detail: "Semaine 4 · Tour de Patrick",
    montant: -11,
    type: "cotisation",
    groupe: "Groupe Avenir",
  },
  {
    id: "TX-002",
    date: "04/10/2026",
    dateISO: "2026-10-04",
    desc: "Réception tour 4",
    detail: "Groupe Avenir · Votre tour",
    montant: 100,
    type: "reception",
    groupe: "Groupe Avenir",
  },
  {
    id: "TX-003",
    date: "01/10/2026",
    dateISO: "2026-10-01",
    desc: "Remboursement crédit",
    detail: "Versement 1/4 · Micro-crédit",
    montant: -34.5,
    type: "remboursement",
  },
  {
    id: "TX-004",
    date: "30/09/2026",
    dateISO: "2026-09-30",
    desc: "Cotisation Groupe Avenir",
    detail: "Semaine 3 · Tour de Grâce",
    montant: -11,
    type: "cotisation",
    groupe: "Groupe Avenir",
  },
  {
    id: "TX-005",
    date: "25/09/2026",
    dateISO: "2026-09-25",
    desc: "Micro-crédit reçu",
    detail: "Crédit approuvé · Airtel Money",
    montant: 90,
    type: "credit",
  },
  {
    id: "TX-006",
    date: "23/09/2026",
    dateISO: "2026-09-23",
    desc: "Cotisation Groupe Avenir",
    detail: "Semaine 2 · Tour de Marie",
    montant: -11,
    type: "cotisation",
    groupe: "Groupe Avenir",
  },
  {
    id: "TX-007",
    date: "16/09/2026",
    dateISO: "2026-09-16",
    desc: "Cotisation Groupe Avenir",
    detail: "Semaine 1 · Tour de Marie",
    montant: -11,
    type: "cotisation",
    groupe: "Groupe Avenir",
  },
  {
    id: "TX-008",
    date: "15/09/2026",
    dateISO: "2026-09-15",
    desc: "Inscription Ya Biso",
    detail: "Compte activé · KYC validé",
    montant: 0,
    type: "cotisation",
  },
];

/* ══════════════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════════════ */

function formatMontant(m: number) {
  if (m === 0) return "—";
  const sign = m > 0 ? "+" : "";
  return `${sign}$${Math.abs(m).toFixed(2)}`;
}

function getTypeMeta(t: TxType) {
  switch (t) {
    case "cotisation":
      return {
        emoji: "💰",
        label: "Cotisation",
        color: "orange" as const,
      };
    case "reception":
      return {
        emoji: "🎁",
        label: "Réception",
        color: "vert" as const,
      };
    case "credit":
      return {
        emoji: "💳",
        label: "Crédit reçu",
        color: "vert" as const,
      };
    case "remboursement":
      return {
        emoji: "🔄",
        label: "Remboursement",
        color: "orange" as const,
      };
  }
}

/* ══════════════════════════════════════════════════════════
   PAGE PRINCIPALE
   ══════════════════════════════════════════════════════════ */

type FiltreType = "tous" | "cotisation" | "reception" | "credit" | "remboursement";

export default function HistoriquePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filtre, setFiltre] = useState<FiltreType>("tous");
  const [recherche, setRecherche] = useState("");

  // Filtrage
  const transactionsFiltrees = TRANSACTIONS.filter((t) => {
    const matchType = filtre === "tous" || t.type === filtre;
    const matchSearch =
      recherche === "" ||
      t.desc.toLowerCase().includes(recherche.toLowerCase()) ||
      t.detail.toLowerCase().includes(recherche.toLowerCase()) ||
      t.id.toLowerCase().includes(recherche.toLowerCase());
    return matchType && matchSearch;
  });

  // Stats
  const totalRecu = TRANSACTIONS.filter((t) => t.montant > 0).reduce(
    (s, t) => s + t.montant,
    0
  );
  const totalEnvoye = TRANSACTIONS.filter((t) => t.montant < 0).reduce(
    (s, t) => s + Math.abs(t.montant),
    0
  );
  const nbTransactions = TRANSACTIONS.length;

  const filtres: { id: FiltreType; label: string; emoji: string }[] = [
    { id: "tous", label: "Tout", emoji: "📋" },
    { id: "cotisation", label: "Cotisations", emoji: "💰" },
    { id: "reception", label: "Réceptions", emoji: "🎁" },
    { id: "credit", label: "Crédits", emoji: "💳" },
    { id: "remboursement", label: "Remboursements", emoji: "🔄" },
  ];

  return (
    <div className="min-h-screen bg-yb-creme flex">
      {/* SIDEBAR */}
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
          <SidebarItem icon="🏠" label="Dashboard" href="/dashboard" />
          <SidebarItem icon="🫂" label="Ma tontine" href="/dashboard/tontine" />
          <SidebarItem icon="💳" label="Crédit" href="/dashboard/credit" />
          <SidebarItem icon="📊" label="Historique" active href="/dashboard/historique" />
          <SidebarItem icon="🏆" label="Score & Badges" />
          <SidebarItem icon="⚙️" label="Paramètres" />
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

      {/* CONTENU */}
      <main className="flex-1 min-w-0">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-20 bg-yb-brun text-yb-or rounded-lg p-2 shadow-lg"
        >
          ☰
        </button>

        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
          {/* HEADER */}
          <header className="flex items-center justify-between mb-6">
            <div>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 text-yb-texte-doux text-sm hover:text-yb-orange transition mb-2"
              >
                <span>←</span> Retour au dashboard
              </Link>
              <h1
                className="text-yb-brun text-2xl lg:text-3xl"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Historique
              </h1>
            </div>
            <Link href="/dashboard/profil" className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-yb-vert text-white font-bold flex items-center justify-center">
                AB
              </div>
              <span className="absolute -bottom-1 -right-1 bg-yb-or text-yb-brun text-[10px] rounded-full w-5 h-5 flex items-center justify-center shadow">
                ✏️
              </span>
            </Link>
          </header>

          {/* HERO STATS */}
          <section className="bg-gradient-to-br from-yb-vert to-yb-vert-clair rounded-2xl p-6 lg:p-8 mb-6">
            <p className="text-yb-creme/70 text-xs mb-1">
              Solde net sur la période
            </p>
            <p
              className="text-yb-or text-4xl lg:text-5xl font-black mb-6"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              +${(totalRecu - totalEnvoye).toFixed(2)}
            </p>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/10">
                <p className="text-yb-creme/60 text-[10px] mb-1">Total reçu</p>
                <p className="text-yb-creme text-base font-bold">
                  +${totalRecu.toFixed(0)}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/10">
                <p className="text-yb-creme/60 text-[10px] mb-1">Total envoyé</p>
                <p className="text-yb-creme text-base font-bold">
                  -${totalEnvoye.toFixed(0)}
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-3 border border-white/10">
                <p className="text-yb-creme/60 text-[10px] mb-1">
                  Transactions
                </p>
                <p className="text-yb-creme text-base font-bold">
                  {nbTransactions}
                </p>
              </div>
            </div>
          </section>

          {/* BARRE RECHERCHE + EXPORT */}
          <section className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-4">
            <div className="flex gap-3 items-center">
              <div className="flex-1 relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  🔍
                </span>
                <input
                  type="text"
                  value={recherche}
                  onChange={(e) => setRecherche(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-gray-200 bg-yb-creme text-yb-brun text-sm focus:outline-none focus:border-yb-orange transition"
                />
              </div>
              <button className="bg-yb-vert text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-yb-vert-clair transition whitespace-nowrap">
                📥 Export PDF
              </button>
            </div>
          </section>

          {/* FILTRES */}
          <section className="mb-5 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {filtres.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFiltre(f.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                    filtre === f.id
                      ? "bg-yb-orange text-white shadow"
                      : "bg-white text-yb-texte-doux border border-gray-100 hover:border-yb-orange/30"
                  }`}
                >
                  <span>{f.emoji}</span>
                  <span>{f.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* LISTE TRANSACTIONS */}
          <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
            {transactionsFiltrees.length === 0 ? (
              <div className="p-12 text-center">
                <div className="text-5xl mb-3 opacity-30">🔍</div>
                <p className="text-yb-brun text-sm font-semibold mb-1">
                  Aucune transaction trouvée
                </p>
                <p className="text-yb-texte-doux text-xs">
                  Essayez un autre filtre ou mot-clé.
                </p>
              </div>
            ) : (
              transactionsFiltrees.map((t, i) => {
                const meta = getTypeMeta(t.type);
                const isPositive = t.montant > 0;
                const isNeutral = t.montant === 0;

                return (
                  <div
                    key={t.id}
                    className={`flex items-center gap-3 px-5 py-4 ${
                      i !== transactionsFiltrees.length - 1
                        ? "border-b border-gray-50"
                        : ""
                    } hover:bg-yb-gris/40 transition cursor-pointer`}
                  >
                    {/* Icône */}
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg flex-shrink-0 ${
                        meta.color === "vert"
                          ? "bg-yb-vert/10"
                          : "bg-yb-orange/10"
                      }`}
                    >
                      {meta.emoji}
                    </div>

                    {/* Détails */}
                    <div className="flex-1 min-w-0">
                      <p className="text-yb-brun text-sm font-semibold truncate">
                        {t.desc}
                      </p>
                      <p className="text-[11px] text-gray-400 truncate mt-0.5">
                        {t.date} · {t.detail}
                      </p>
                    </div>

                    {/* Montant + statut */}
                    <div className="text-right flex-shrink-0">
                      <p
                        className={`text-sm font-bold whitespace-nowrap ${
                          isNeutral
                            ? "text-gray-400"
                            : isPositive
                            ? "text-yb-vert"
                            : "text-yb-brun"
                        }`}
                      >
                        {formatMontant(t.montant)}
                      </p>
                      <span
                        className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded mt-0.5 ${
                          isNeutral
                            ? "bg-gray-100 text-gray-500"
                            : meta.color === "vert"
                            ? "bg-yb-vert/10 text-yb-vert"
                            : "bg-yb-orange/10 text-yb-orange"
                        }`}
                      >
                        {meta.label}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </section>

          {/* TÉLÉCHARGER PDF CTA */}
          <section className="bg-yb-brun rounded-2xl p-6 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-yb-or/20 flex items-center justify-center text-2xl flex-shrink-0">
                📄
              </div>
              <div className="flex-1">
                <p
                  className="text-yb-creme text-base font-bold mb-1"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Relevé Ya Biso officiel
                </p>
                <p className="text-yb-creme/70 text-xs leading-relaxed">
                  Téléchargez votre historique complet au format PDF. Ce
                  document est reconnu par nos banques partenaires comme preuve
                  de fiabilité.
                </p>
              </div>
              <button className="w-full sm:w-auto bg-yb-orange text-white px-6 py-3 rounded-lg font-semibold text-sm hover:bg-[#BF360C] transition whitespace-nowrap">
                Télécharger PDF
              </button>
            </div>
          </section>

          {/* HISTORIQUE PAR MOIS */}
          <section>
            <h3
              className="text-yb-brun text-lg mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Résumé par mois
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { mois: "Octobre 2026", recu: 100, envoye: 45.5, nb: 3 },
                { mois: "Septembre 2026", recu: 90, envoye: 33, nb: 5 },
              ].map((m, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm"
                >
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-yb-brun text-sm font-bold">
                      {m.mois}
                    </p>
                    <span className="text-[10px] font-semibold text-yb-texte-doux bg-yb-gris px-2 py-1 rounded">
                      {m.nb} tx
                    </span>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="text-yb-texte-doux">Reçu</span>
                      <span className="text-yb-vert font-semibold">
                        +${m.recu.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-yb-texte-doux">Envoyé</span>
                      <span className="text-yb-orange font-semibold">
                        -${m.envoye.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs border-t border-gray-100 pt-1.5 mt-1.5">
                      <span className="text-yb-brun font-semibold">Net</span>
                      <span
                        className={`font-bold ${
                          m.recu - m.envoye >= 0
                            ? "text-yb-vert"
                            : "text-yb-brun"
                        }`}
                      >
                        {m.recu - m.envoye >= 0 ? "+" : ""}$
                        {(m.recu - m.envoye).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   HELPERS COMPOSANTS
   ══════════════════════════════════════════════════════════ */

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
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
        active
          ? "bg-yb-vert text-white shadow"
          : "text-yb-creme/85 hover:bg-white/5 cursor-pointer"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
  if (href) return <Link href={href}>{content}</Link>;
  return content;
}