"use client";

import Link from "next/link";
import { useState } from "react";

/* ══════════════════════════════════════════════════════════
   DONNÉES — Score & Badges (statique pour la démo)
   ══════════════════════════════════════════════════════════ */

const SCORE = 72;

const PALIERS = [
  { emoji: "🥉", name: "Débutant", min: 0, max: 49, credit: 50, color: "vert" },
  { emoji: "🥈", name: "Fiable", min: 50, max: 74, credit: 90, color: "or" },
  { emoji: "🥇", name: "Expert", min: 75, max: 89, credit: 150, color: "orange" },
  { emoji: "💎", name: "Ambassadeur", min: 90, max: 100, credit: 300, color: "vert" },
];

const BADGES = [
  {
    id: 1,
    emoji: "🎯",
    name: "Premier pas",
    desc: "Compte créé et KYC validé",
    condition: "Créer un compte",
    obtenu: true,
    date: "15/09/2026",
  },
  {
    id: 2,
    emoji: "🥉",
    name: "Débutant",
    desc: "Score atteint : 30+",
    condition: "3 cotisations à l'heure",
    obtenu: true,
    date: "30/09/2026",
  },
  {
    id: 3,
    emoji: "🥈",
    name: "Fiable",
    desc: "Score atteint : 70+",
    condition: "7 cotisations consécutives",
    obtenu: true,
    date: "07/10/2026",
  },
  {
    id: 4,
    emoji: "🎁",
    name: "Bénéficiaire",
    desc: "Premier tour reçu",
    condition: "Recevoir son premier versement",
    obtenu: true,
    date: "04/10/2026",
  },
  {
    id: 5,
    emoji: "💳",
    name: "Emprunteur",
    desc: "Premier crédit obtenu",
    condition: "Recevoir un premier micro-crédit",
    obtenu: true,
    date: "25/09/2026",
  },
  {
    id: 6,
    emoji: "🔄",
    name: "Rembourseur",
    desc: "Premier crédit remboursé",
    condition: "Rembourser un crédit à temps",
    obtenu: false,
    progress: 33,
  },
  {
    id: 7,
    emoji: "🥇",
    name: "Expert",
    desc: "Score atteint : 85+",
    condition: "Cycle complété sans incident",
    obtenu: false,
    progress: 84,
  },
  {
    id: 8,
    emoji: "💎",
    name: "Ambassadeur",
    desc: "Score atteint : 95+",
    condition: "Parrainer 3 amis",
    obtenu: false,
    progress: 0,
  },
  {
    id: 9,
    emoji: "🔥",
    name: "Série parfaite",
    desc: "10 cotisations d'affilée",
    condition: "Aucun retard pendant 10 semaines",
    obtenu: false,
    progress: 70,
  },
];

const HISTORIQUE_SCORE = [
  { date: "07/10/2026", event: "Cotisation à l'heure", points: +2, newScore: 72 },
  { date: "04/10/2026", event: "Réception tour 4", points: 0, newScore: 70 },
  { date: "01/10/2026", event: "Remboursement crédit", points: +5, newScore: 70 },
  { date: "30/09/2026", event: "Cotisation à l'heure", points: +2, newScore: 65 },
  { date: "23/09/2026", event: "Cotisation à l'heure", points: +2, newScore: 63 },
  { date: "16/09/2026", event: "Cotisation à l'heure", points: +2, newScore: 61 },
  { date: "15/09/2026", event: "Inscription Ya Biso", points: +20, newScore: 20 },
];

/* ══════════════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════════════ */

function getPalierActuel(score: number) {
  return PALIERS.find((p) => score >= p.min && score <= p.max) ?? PALIERS[0];
}

function getNextPalier(score: number) {
  return PALIERS.find((p) => p.min > score);
}

/* ══════════════════════════════════════════════════════════
   PAGE PRINCIPALE
   ══════════════════════════════════════════════════════════ */

export default function ScorePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState<"apercu" | "badges" | "historique">("apercu");

  const palierActuel = getPalierActuel(SCORE);
  const nextPalier = getNextPalier(SCORE);
  const pointsRestants = nextPalier ? nextPalier.min - SCORE : 0;

  // Nombre de badges obtenus
  const badgesObtenus = BADGES.filter((b) => b.obtenu).length;
  const badgesTotal = BADGES.length;

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
          <SidebarItem
            icon="📊"
            label="Historique"
            href="/dashboard/historique"
          />
          <SidebarItem
            icon="🏆"
            label="Score & Badges"
            active
            href="/dashboard/score"
          />
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
                Score & Badges
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

          {/* HERO SCORE */}
          <section className="bg-gradient-to-br from-yb-vert to-yb-vert-clair rounded-2xl p-6 lg:p-8 mb-6">
            <div className="flex items-center justify-between mb-6">
              <span className="inline-block bg-yb-or text-yb-brun text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                {palierActuel.emoji} Niveau {palierActuel.name}
              </span>
              <span className="text-yb-creme/60 text-[11px]">
                Mis à jour aujourd'hui
              </span>
            </div>

            {/* Gros score circulaire */}
            <div className="flex items-center gap-6 mb-6">
              <div className="relative flex-shrink-0">
                <svg
                  width="120"
                  height="120"
                  viewBox="0 0 120 120"
                  className="-rotate-90"
                >
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="rgba(255,255,255,0.15)"
                    strokeWidth="10"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="52"
                    fill="none"
                    stroke="#F9A825"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${(SCORE / 100) * 2 * Math.PI * 52} ${
                      2 * Math.PI * 52
                    }`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span
                    className="text-yb-or text-4xl font-black leading-none"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {SCORE}
                  </span>
                  <span className="text-yb-creme/60 text-[10px] mt-1">
                    sur 100
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <p className="text-yb-creme/70 text-xs mb-1">
                  Votre score de fiabilité
                </p>
                <p
                  className="text-yb-creme text-xl font-bold mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Très bon niveau
                </p>
                <p className="text-yb-creme/70 text-[11px] leading-relaxed">
                  Vous êtes dans le top 30% des jeunes épargnants Ya Biso à
                  Kinshasa.
                </p>
              </div>
            </div>

            {/* Progression vers palier suivant */}
            {nextPalier && (
              <div className="bg-white/10 backdrop-blur rounded-xl p-4 border border-white/10">
                <div className="flex justify-between items-baseline mb-2">
                  <p className="text-yb-creme/75 text-xs">
                    Prochain palier : {nextPalier.emoji} {nextPalier.name}
                  </p>
                  <p className="text-yb-or text-xs font-bold">
                    {SCORE} / {nextPalier.min}
                  </p>
                </div>
                <div className="h-2 bg-white/15 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-yb-vert to-yb-or rounded-full transition-all"
                    style={{
                      width: `${(SCORE / nextPalier.min) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-yb-creme/70 text-[11px] mt-2">
                  Encore <strong className="text-yb-or">{pointsRestants} points</strong>{" "}
                  pour débloquer un crédit jusqu'à ${nextPalier.credit}
                </p>
              </div>
            )}
          </section>

          {/* STATS RAPIDES */}
          <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            <StatBox
              icon="🏆"
              label="Badges"
              value={`${badgesObtenus}/${badgesTotal}`}
            />
            <StatBox icon="🔥" label="Série actuelle" value="7 sem." />
            <StatBox icon="📈" label="Points gagnés" value="+35" />
            <StatBox icon="⚠️" label="Retards" value="0" />
          </section>

          {/* TABS */}
          <div className="flex gap-2 mb-5 overflow-x-auto">
            {(
              [
                { id: "apercu", label: "📊 Aperçu" },
                { id: "badges", label: "🏆 Badges" },
                { id: "historique", label: "📜 Historique" },
              ] as { id: "apercu" | "badges" | "historique"; label: string }[]
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition ${
                  tab === t.id
                    ? "bg-yb-vert text-white shadow"
                    : "bg-white text-yb-texte-doux border border-gray-100 hover:border-yb-vert/30"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* TAB : APERÇU */}
          {tab === "apercu" && (
            <ApercuTab score={SCORE} />
          )}

          {/* TAB : BADGES */}
          {tab === "badges" && <BadgesTab />}

          {/* TAB : HISTORIQUE */}
          {tab === "historique" && <HistoriqueTab />}
        </div>
      </main>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   TAB 1 : APERÇU — Comment le score est calculé
   ══════════════════════════════════════════════════════════ */
function ApercuTab({ score }: { score: number }) {
  const criteres = [
    {
      icon: "✅",
      label: "Régularité des cotisations",
      desc: "Vous avez cotisé à l'heure 7 fois sur 7",
      poids: 40,
      score: 40,
      color: "vert",
    },
    {
      icon: "🎁",
      label: "Tours reçus",
      desc: "1 tour reçu sans incident",
      poids: 15,
      score: 15,
      color: "vert",
    },
    {
      icon: "💳",
      label: "Historique de crédit",
      desc: "1 crédit en cours · 1 remboursement à temps",
      poids: 20,
      score: 12,
      color: "or",
    },
    {
      icon: "📅",
      label: "Ancienneté",
      desc: "Membre depuis 22 jours",
      poids: 10,
      score: 5,
      color: "or",
    },
    {
      icon: "👥",
      label: "Parrainage",
      desc: "0 ami invité pour le moment",
      poids: 10,
      score: 0,
      color: "gris",
    },
    {
      icon: "⚡",
      label: "Bonus (activité, KYC)",
      desc: "KYC validé + compte actif",
      poids: 5,
      score: 0,
      color: "gris",
    },
  ];

  return (
    <section className="space-y-5 mb-6">
      {/* Détail du score */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3
          className="text-yb-brun text-lg mb-1"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Comment votre score est calculé
        </h3>
        <p className="text-yb-texte-doux text-xs mb-6">
          Votre score est la somme pondérée de 6 critères. Total actuel :{" "}
          <strong className="text-yb-brun">{score} / 100</strong>
        </p>

        <div className="space-y-4">
          {criteres.map((c, i) => (
            <div key={i}>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-lg flex-shrink-0">{c.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-yb-brun text-sm font-semibold truncate">
                    {c.label}
                  </p>
                  <p className="text-[11px] text-yb-texte-doux truncate">
                    {c.desc}
                  </p>
                </div>
                <span
                  className={`text-xs font-bold whitespace-nowrap ${
                    c.color === "vert"
                      ? "text-yb-vert"
                      : c.color === "or"
                      ? "text-yb-orange"
                      : "text-gray-400"
                  }`}
                >
                  {c.score} / {c.poids}
                </span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    c.color === "vert"
                      ? "bg-yb-vert"
                      : c.color === "or"
                      ? "bg-yb-or"
                      : "bg-gray-300"
                  }`}
                  style={{ width: `${(c.score / c.poids) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comment gagner des points */}
      <div className="bg-yb-vert/5 border border-yb-vert/20 rounded-2xl p-6">
        <h4
          className="text-yb-brun text-base mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Actions qui font gagner des points
        </h4>
        <div className="space-y-2">
          {[
            { icon: "✓", text: "Cotisation à l'heure", points: "+2 pts" },
            { icon: "✓", text: "Remboursement crédit à temps", points: "+5 pts" },
            { icon: "✓", text: "Cycle complété sans incident", points: "+10 pts" },
            { icon: "✓", text: "Parrainer un ami actif", points: "+15 pts" },
          ].map((r, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-yb-vert/20 text-yb-vert text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                {r.icon}
              </span>
              <p className="text-yb-texte-doux text-xs flex-1">{r.text}</p>
              <span className="text-yb-vert text-xs font-bold whitespace-nowrap">
                {r.points}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Avertissement */}
      <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
        <h4
          className="text-red-800 text-base mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          ⚠️ Actions qui font perdre des points
        </h4>
        <div className="space-y-2">
          {[
            { text: "Retard de cotisation (1-7 jours)", points: "-3 pts" },
            { text: "Défaut de paiement (8+ jours)", points: "-10 pts" },
            { text: "Défaut de remboursement crédit", points: "-20 pts" },
            { text: "Abandon avec crédit actif", points: "-50 pts" },
          ].map((r, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="w-5 h-5 rounded-full bg-red-100 text-red-600 text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                !
              </span>
              <p className="text-red-800 text-xs flex-1">{r.text}</p>
              <span className="text-red-600 text-xs font-bold whitespace-nowrap">
                {r.points}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   TAB 2 : BADGES
   ══════════════════════════════════════════════════════════ */
function BadgesTab() {
  const obtenus = BADGES.filter((b) => b.obtenu);
  const nonObtenus = BADGES.filter((b) => !b.obtenu);

  return (
    <section className="space-y-6 mb-6">
      {/* Badges obtenus */}
      <div>
        <h3
          className="text-yb-brun text-lg mb-4 flex items-center gap-2"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          <span>🏆 Badges obtenus</span>
          <span className="bg-yb-vert/10 text-yb-vert text-xs font-bold px-2 py-0.5 rounded-full">
            {obtenus.length}
          </span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {obtenus.map((b) => (
            <BadgeCard key={b.id} badge={b} />
          ))}
        </div>
      </div>

      {/* Badges à débloquer */}
      <div>
        <h3
          className="text-yb-brun text-lg mb-4 flex items-center gap-2"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          <span>🔒 À débloquer</span>
          <span className="bg-gray-100 text-gray-500 text-xs font-bold px-2 py-0.5 rounded-full">
            {nonObtenus.length}
          </span>
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {nonObtenus.map((b) => (
            <BadgeCard key={b.id} badge={b} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BadgeCard({ badge }: { badge: (typeof BADGES)[0] }) {
  return (
    <div
      className={`rounded-2xl p-4 border-2 transition ${
        badge.obtenu
          ? "bg-white border-yb-vert/30 shadow-sm"
          : "bg-gray-50 border-gray-200"
      }`}
    >
      <div
        className={`text-4xl mb-3 text-center ${
          !badge.obtenu ? "grayscale opacity-40" : ""
        }`}
      >
        {badge.emoji}
      </div>
      <p
        className={`text-center text-sm font-bold mb-1 ${
          badge.obtenu ? "text-yb-brun" : "text-gray-500"
        }`}
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {badge.name}
      </p>
      <p className="text-[10px] text-center text-yb-texte-doux leading-relaxed mb-3">
        {badge.desc}
      </p>

      {badge.obtenu ? (
        <div className="text-center">
          <span className="inline-block bg-yb-vert/10 text-yb-vert text-[9px] font-bold px-2 py-1 rounded-full">
            ✓ Obtenu
          </span>
          <p className="text-[9px] text-gray-400 mt-1">{badge.date}</p>
        </div>
      ) : (
        <div>
          <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mb-1.5">
            <div
              className="h-full bg-gradient-to-r from-yb-vert to-yb-or rounded-full"
              style={{ width: `${badge.progress ?? 0}%` }}
            />
          </div>
          <p className="text-[9px] text-center text-gray-500">
            {badge.progress ?? 0}% · {badge.condition}
          </p>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   TAB 3 : HISTORIQUE
   ══════════════════════════════════════════════════════════ */
function HistoriqueTab() {
  return (
    <section className="mb-6">
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {HISTORIQUE_SCORE.map((h, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 px-5 py-4 ${
              i !== HISTORIQUE_SCORE.length - 1
                ? "border-b border-gray-50"
                : ""
            }`}
          >
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                h.points > 0
                  ? "bg-yb-vert/10 text-yb-vert"
                  : h.points === 0
                  ? "bg-yb-or/10 text-yb-orange"
                  : "bg-red-50 text-red-500"
              }`}
            >
              {h.points > 0 ? `+${h.points}` : h.points === 0 ? "—" : h.points}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-yb-brun text-sm font-semibold truncate">
                {h.event}
              </p>
              <p className="text-[11px] text-gray-400">{h.date}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-[10px] text-yb-texte-doux">Score</p>
              <p
                className="text-yb-brun text-sm font-bold"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {h.newScore}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-yb-or/10 border border-yb-or/30 rounded-xl p-4 flex gap-3">
        <span className="text-xl flex-shrink-0">💡</span>
        <p className="text-yb-texte-doux text-xs leading-relaxed">
          <strong className="text-yb-brun">Votre score est recalculé chaque semaine.</strong>{" "}
          Toutes les cotisations à l'heure rapportent +2 points. Continuez comme
          ça pour atteindre le palier Expert à 85 points.
        </p>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   HELPERS COMPOSANTS
   ══════════════════════════════════════════════════════════ */

function StatBox({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
      <div className="text-2xl mb-1">{icon}</div>
      <p className="text-[10px] uppercase tracking-wider font-semibold text-yb-texte-doux mb-1">
        {label}
      </p>
      <p
        className="text-yb-brun text-lg font-bold"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        {value}
      </p>
    </div>
  );
}

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