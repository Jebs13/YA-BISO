"use client";

import Link from "next/link";
import { useState } from "react";

/* ══════════════════════════════════════════════════════════
   LOGIQUE MÉTIER — Calcul du crédit selon le score
   ══════════════════════════════════════════════════════════ */

const SCORE = 72;
const EPARGNE = 410;
const TAUX_INTERET = 0.15;

type Palier = {
  min: number;
  max: number;
  emoji: string;
  name: string;
  creditMax: number;
  color: string;
};

const PALIERS: Palier[] = [
  { min: 0, max: 49, emoji: "🥉", name: "Débutant", creditMax: 50, color: "vert" },
  { min: 50, max: 74, emoji: "🥈", name: "Fiable", creditMax: 90, color: "or" },
  { min: 75, max: 89, emoji: "🥇", name: "Expert", creditMax: 150, color: "orange" },
  { min: 90, max: 100, emoji: "💎", name: "Ambassadeur", creditMax: 300, color: "vert" },
];

function getPalier(score: number): Palier {
  return PALIERS.find((p) => score >= p.min && score <= p.max) ?? PALIERS[0];
}

function getCreditMax(score: number, epargne: number): number {
  const palier = getPalier(score);
  const limiteEpargne = epargne * 1.5;
  return Math.min(palier.creditMax, limiteEpargne);
}

/* ══════════════════════════════════════════════════════════
   PAGE PRINCIPALE
   ══════════════════════════════════════════════════════════ */

type Tab = "demande" | "actif" | "paliers";

export default function CreditPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("demande");
  const [showModal, setShowModal] = useState(false);
  const [creditActif, setCreditActif] = useState<{
    montant: number;
    duree: number;
    telephone: string;
    operateur: string;
  } | null>(null);

  const palier = getPalier(SCORE);
  const creditMax = getCreditMax(SCORE, EPARGNE);

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
          <SidebarItem icon="💳" label="Crédit" active href="/dashboard/credit" />
          <SidebarItem icon="📊" label="Historique" />
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
                Micro-crédit
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

          {/* HERO ÉLIGIBILITÉ */}
          <section className="bg-gradient-to-br from-yb-brun to-yb-brun-clair rounded-2xl p-6 lg:p-8 mb-6 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                <span className="inline-block bg-yb-or text-yb-brun text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {palier.emoji} Niveau {palier.name}
                </span>
                <div className="bg-white/10 backdrop-blur rounded-lg px-3 py-1.5 border border-white/10">
                  <p className="text-yb-creme/60 text-[10px]">Votre score</p>
                  <p className="text-yb-or text-sm font-bold">
                    {SCORE}
                    <span className="text-[10px] opacity-60">/100</span>
                  </p>
                </div>
              </div>

              <p className="text-yb-creme/70 text-xs mb-1">
                Vous pouvez emprunter jusqu'à
              </p>
              <p
                className="text-yb-or text-5xl lg:text-6xl font-black mb-4"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                ${creditMax}
              </p>

              <div className="bg-white/5 backdrop-blur rounded-xl p-4 mb-5 border border-white/10">
                <p className="text-yb-creme/60 text-[10px] uppercase tracking-wider font-semibold mb-2">
                  Comment ce montant est calculé
                </p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-yb-creme/70">
                      Palier {palier.name} ({SCORE} pts)
                    </span>
                    <span className="text-yb-creme font-semibold">
                      ${palier.creditMax}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-yb-creme/70">
                      Limite épargne (150%)
                    </span>
                    <span className="text-yb-creme font-semibold">
                      ${(EPARGNE * 1.5).toFixed(0)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-1.5 mt-1.5">
                    <span className="text-yb-or font-semibold">
                      Plafond retenu (le plus bas)
                    </span>
                    <span className="text-yb-or font-bold">${creditMax}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowModal(true)}
                disabled={!!creditActif}
                className="w-full bg-yb-orange text-white py-4 rounded-xl font-semibold hover:bg-[#BF360C] transition shadow-lg shadow-yb-orange/30 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {creditActif ? "Crédit déjà actif" : "Demander un crédit →"}
              </button>
            </div>
            <div className="absolute -right-20 -bottom-20 w-64 h-64 rounded-full bg-yb-or/5" />
          </section>

          {/* INFO */}
          <div className="bg-yb-or/10 border border-yb-or/30 rounded-xl p-4 mb-6 flex gap-3">
            <span className="text-xl flex-shrink-0">💡</span>
            <p className="text-yb-texte-doux text-xs leading-relaxed">
              <strong className="text-yb-brun">
                Plus votre score augmente, plus votre plafond grandit.
              </strong>{" "}
              Chaque cotisation à l'heure vous rapproche du palier suivant.
            </p>
          </div>

          {/* TABS */}
          <div className="flex gap-2 mb-5 overflow-x-auto">
            {(
              [
                { id: "demande", label: "💰 Simulateur" },
                { id: "actif", label: "📄 Crédit actif" },
                { id: "paliers", label: "🏆 Paliers" },
              ] as { id: Tab; label: string }[]
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

          {tab === "demande" && (
            <SimulateurTab
              creditMax={creditMax}
              palier={palier}
              onDemande={() => setShowModal(true)}
            />
          )}

          {tab === "actif" && <CreditActifTab creditActif={creditActif} />}

          {tab === "paliers" && <PaliersTab score={SCORE} />}
        </div>
      </main>

      {/* MODAL DEMANDE (4 étapes) */}
      {showModal && (
        <ModalDemande
          creditMax={creditMax}
          palier={palier}
          onClose={() => setShowModal(false)}
          onConfirm={(montant, duree, telephone, operateur) => {
            setCreditActif({ montant, duree, telephone, operateur });
            setShowModal(false);
            setTab("actif");
          }}
        />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   TAB 1 : SIMULATEUR
   ══════════════════════════════════════════════════════════ */
function SimulateurTab({
  creditMax,
  palier,
  onDemande,
}: {
  creditMax: number;
  palier: Palier;
  onDemande: () => void;
}) {
  const [montant, setMontant] = useState(Math.min(50, creditMax));
  const [duree, setDuree] = useState(30);

  const interets = montant * TAUX_INTERET;
  const total = montant + interets;
  const nbEcheances = duree === 15 ? 2 : duree === 30 ? 4 : 8;

  return (
    <section className="space-y-5 mb-6">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-baseline justify-between mb-3">
          <label className="text-[11px] font-semibold text-yb-texte-doux uppercase tracking-wider">
            Montant souhaité
          </label>
          <span
            className="text-yb-orange text-2xl font-black"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            ${montant}
          </span>
        </div>
        <input
          type="range"
          min={20}
          max={creditMax}
          step={5}
          value={montant}
          onChange={(e) => setMontant(Number(e.target.value))}
          className="w-full accent-yb-orange"
        />
        <div className="flex justify-between text-[10px] text-gray-400 mt-1">
          <span>$20</span>
          <span>
            Plafond {palier.emoji} {palier.name} : ${creditMax}
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <label className="block text-[11px] font-semibold text-yb-texte-doux uppercase tracking-wider mb-3">
          Durée de remboursement
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { d: 15, label: "15 jours", sub: "Rapide" },
            { d: 30, label: "30 jours", sub: "Standard" },
            { d: 60, label: "60 jours", sub: "Confort" },
          ].map((o) => (
            <button
              key={o.d}
              onClick={() => setDuree(o.d)}
              className={`p-3 rounded-lg border-2 transition text-center ${
                duree === o.d
                  ? "border-yb-orange bg-yb-orange/5"
                  : "border-gray-200 hover:border-yb-vert/40"
              }`}
            >
              <p className="text-yb-brun text-xs font-bold">{o.label}</p>
              <p className="text-yb-texte-doux text-[10px] mt-0.5">{o.sub}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <p className="text-[11px] font-semibold text-yb-texte-doux uppercase tracking-wider mb-4">
          Récapitulatif
        </p>
        <div className="space-y-3">
          <Row label="Montant emprunté" value={`$${montant}`} />
          <Row label="Taux d'intérêt" value="15%" />
          <Row label="Intérêts" value={`$${interets.toFixed(2)}`} />
          <Row
            label="Total à rembourser"
            value={`$${total.toFixed(2)}`}
            bold
          />
        </div>

        <div className="mt-5 p-4 bg-yb-vert/5 border border-yb-vert/20 rounded-xl flex gap-3">
          <span className="text-lg flex-shrink-0">🔒</span>
          <p className="text-yb-texte-doux text-xs leading-relaxed">
            <strong className="text-yb-brun">
              ${montant} de garantie bloqués.
            </strong>{" "}
            Ce montant de votre épargne reste verrouillé jusqu'au remboursement
            complet.
          </p>
        </div>

        <div className="mt-5">
          <p className="text-[10px] text-yb-texte-doux uppercase tracking-wider font-semibold mb-3">
            Échéancier prévu ({nbEcheances} versements)
          </p>
          <div className="space-y-2">
            {Array.from({ length: nbEcheances }).map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center text-xs py-2 border-b border-gray-50 last:border-0"
              >
                <span className="text-yb-texte-doux">
                  Versement {i + 1}/{nbEcheances}
                </span>
                <span className="text-yb-brun font-semibold">
                  ${(total / nbEcheances).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onDemande}
          className="w-full mt-6 bg-yb-orange text-white py-4 rounded-xl font-semibold hover:bg-[#BF360C] transition shadow-lg shadow-yb-orange/20"
        >
          Demander ce crédit →
        </button>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   TAB 2 : CRÉDIT ACTIF
   ══════════════════════════════════════════════════════════ */
function CreditActifTab({
  creditActif,
}: {
  creditActif: {
    montant: number;
    duree: number;
    telephone: string;
    operateur: string;
  } | null;
}) {
  if (!creditActif) {
    return (
      <section className="bg-white rounded-2xl p-10 border border-gray-100 shadow-sm text-center mb-6">
        <div className="text-5xl mb-4 opacity-30">📄</div>
        <p className="text-yb-brun text-base font-semibold mb-1">
          Aucun crédit actif
        </p>
        <p className="text-yb-texte-doux text-xs">
          Faites une demande depuis l'onglet Simulateur.
        </p>
      </section>
    );
  }

  const interets = creditActif.montant * TAUX_INTERET;
  const total = creditActif.montant + interets;
  const nbEcheances =
    creditActif.duree === 15 ? 2 : creditActif.duree === 30 ? 4 : 8;

  return (
    <section className="space-y-5 mb-6">
      <div className="bg-gradient-to-br from-yb-vert to-yb-vert-clair rounded-2xl p-6 text-yb-creme">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-yb-creme/70 text-xs mb-1">
              Crédit actif — 1er cycle
            </p>
            <p
              className="text-yb-or text-3xl font-black"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              ${creditActif.montant}
            </p>
          </div>
          <span className="bg-white/15 backdrop-blur text-yb-creme text-[10px] font-semibold px-3 py-1 rounded-full">
            ● En cours
          </span>
        </div>

        <div className="mb-5">
          <div className="flex justify-between items-baseline mb-2">
            <p className="text-yb-creme/75 text-xs">Remboursement</p>
            <p className="text-yb-creme text-sm font-bold">
              $0.00 / ${total.toFixed(2)}
            </p>
          </div>
          <div className="h-2 bg-white/15 rounded-full overflow-hidden">
            <div className="h-full w-0 bg-yb-or rounded-full" />
          </div>
          <p className="text-yb-creme/60 text-[10px] mt-2">
            0% remboursé · {nbEcheances} versements à venir
          </p>
        </div>

        <button className="w-full bg-yb-orange text-white py-3 rounded-lg font-semibold text-sm hover:bg-[#BF360C] transition">
          Rembourser maintenant
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <p className="text-[11px] font-semibold text-yb-texte-doux uppercase tracking-wider mb-4">
          Détails du crédit
        </p>
        <div className="space-y-3">
          <Row
            label="Montant initial"
            value={`$${creditActif.montant.toFixed(2)}`}
          />
          <Row label="Intérêts (15%)" value={`$${interets.toFixed(2)}`} />
          <Row label="Total dû" value={`$${total.toFixed(2)}`} />
          <Row label="Déjà remboursé" value="$0.00" />
          <Row
            label="Reçu sur"
            value={`${creditActif.operateur} · ${creditActif.telephone}`}
          />
          <Row
            label="Reste à rembourser"
            value={`$${total.toFixed(2)}`}
            bold
          />
        </div>
      </div>

      <div className="bg-yb-or/10 border border-yb-or/30 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <span className="text-2xl flex-shrink-0">🔒</span>
          <div>
            <p className="text-yb-brun text-sm font-semibold mb-1">
              Garantie bloquée : ${creditActif.montant}
            </p>
            <p className="text-yb-texte-doux text-xs leading-relaxed">
              Ce montant de votre épargne reste verrouillé jusqu'au
              remboursement complet. Il sera automatiquement débloqué.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   TAB 3 : PALIERS
   ══════════════════════════════════════════════════════════ */
function PaliersTab({ score }: { score: number }) {
  return (
    <section className="space-y-5 mb-6">
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3
          className="text-yb-brun text-lg mb-1"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Votre progression
        </h3>
        <p className="text-yb-texte-doux text-xs mb-6">
          Score actuel : <strong className="text-yb-brun">{score}/100</strong>
        </p>

        <div className="space-y-3">
          {PALIERS.map((p, i) => {
            const isCurrent = score >= p.min && score <= p.max;
            const isDone = score > p.max;
            const isNext = !isCurrent && !isDone && p.min > score;

            return (
              <div
                key={i}
                className={`rounded-xl p-4 border-2 flex items-center gap-4 ${
                  isDone
                    ? "bg-yb-vert/5 border-yb-vert/20"
                    : isCurrent
                    ? "bg-yb-or/10 border-yb-or/50 shadow"
                    : isNext
                    ? "bg-white border-yb-orange/30"
                    : "bg-gray-50 border-gray-200 opacity-60"
                }`}
              >
                <div className="text-3xl flex-shrink-0">{p.emoji}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p
                      className="text-yb-brun text-sm font-bold"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      {p.name}
                    </p>
                    {isCurrent && (
                      <span className="bg-yb-orange text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                        ACTUEL
                      </span>
                    )}
                    {isNext && (
                      <span className="bg-yb-orange/20 text-yb-orange text-[9px] font-bold px-2 py-0.5 rounded-full">
                        PROCHAIN
                      </span>
                    )}
                  </div>
                  <p className="text-yb-texte-doux text-xs mt-0.5">
                    Score {p.min}–{p.max} · Crédit jusqu'à{" "}
                    <strong className="text-yb-orange">${p.creditMax}</strong>
                  </p>
                </div>
                {isDone && <span className="text-yb-vert text-lg">✓</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-yb-vert/5 border border-yb-vert/20 rounded-2xl p-6">
        <h4
          className="text-yb-brun text-base mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Comment gagner des points ?
        </h4>
        <div className="space-y-3">
          {[
            { icon: "✓", text: "Cotisation à l'heure : +2 points / semaine" },
            { icon: "✓", text: "Cycle complété sans incident : +10 points" },
            { icon: "✓", text: "Remboursement crédit à temps : +5 points" },
            { icon: "⚠️", text: "Retard de cotisation : -3 points" },
            { icon: "❌", text: "Défaut de remboursement : -20 points" },
          ].map((r, i) => (
            <div key={i} className="flex gap-3 items-start">
              <span
                className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  r.icon === "✓"
                    ? "bg-yb-vert/20 text-yb-vert"
                    : r.icon === "⚠️"
                    ? "bg-yb-or/20 text-yb-orange"
                    : "bg-red-100 text-red-500"
                }`}
              >
                {r.icon}
              </span>
              <p className="text-yb-texte-doux text-xs leading-relaxed flex-1">
                {r.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   MODAL DE DEMANDE — 4 ÉTAPES
   ══════════════════════════════════════════════════════════ */
function ModalDemande({
  creditMax,
  palier,
  onClose,
  onConfirm,
}: {
  creditMax: number;
  palier: Palier;
  onClose: () => void;
  onConfirm: (
    montant: number,
    duree: number,
    telephone: string,
    operateur: string
  ) => void;
}) {
  const [etape, setEtape] = useState(1);
  const [montant, setMontant] = useState(Math.min(50, creditMax));
  const [duree, setDuree] = useState(30);
  const [telephone, setTelephone] = useState("");
  const [operateur, setOperateur] = useState("Airtel Money");
  const [signature, setSignature] = useState("");

  const interets = montant * TAUX_INTERET;
  const total = montant + interets;

  // Détection automatique de l'opérateur selon le préfixe
  function detectOperateur(num: string) {
    const clean = num.replace(/\D/g, "");
    const local = clean.startsWith("243") ? clean.slice(3) : clean;
    if (local.startsWith("09")) return "Airtel Money";
    if (local.startsWith("089") || local.startsWith("088")) {
      return "Orange Money";
    }
    if (local.startsWith("084") || local.startsWith("085")) {
      return "Orange Money";
    }
    if (
      local.startsWith("082") ||
      local.startsWith("081") ||
      local.startsWith("080")
    ) {
      return "M-Pesa";
    }
    return "";
  }

  function formatPhone(num: string) {
    const clean = num.replace(/\D/g, "").slice(0, 9);
    const p1 = clean.slice(0, 3);
    const p2 = clean.slice(3, 6);
    const p3 = clean.slice(6, 9);
    return [p1, p2, p3].filter(Boolean).join(" ");
  }

  const handlePhoneChange = (value: string) => {
    const formatted = formatPhone(value);
    setTelephone(formatted);
    const detected = detectOperateur(value);
    if (detected) setOperateur(detected);
  };

  const isPhoneValid = telephone.replace(/\D/g, "").length === 9;

  const operateurs = [
    { id: "Airtel Money", emoji: "🔴", sub: "099 · 098 · 097" },
    { id: "Orange Money", emoji: "🟠", sub: "089 · 088 · 084" },
    { id: "M-Pesa", emoji: "🔵", sub: "082 · 081 · 080" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-yb-creme rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* En-tête */}
        <div className="bg-yb-brun p-5 rounded-t-2xl flex items-center justify-between">
          <div>
            <p className="text-yb-creme/60 text-[10px] uppercase tracking-wider">
              Demande de crédit
            </p>
            <p
              className="text-yb-or text-lg"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Étape {etape} / 4
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-yb-creme/60 hover:text-yb-creme text-xl w-8 h-8 rounded-full hover:bg-white/10 transition"
          >
            ✕
          </button>
        </div>

        {/* Barre progression */}
        <div className="flex gap-1.5 px-5 pt-4">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className={`flex-1 h-1.5 rounded ${
                etape >= n ? "bg-yb-orange" : "bg-gray-200"
              }`}
            />
          ))}
        </div>

        <div className="p-5">
          {/* ═══ ÉTAPE 1 : MONTANT + DURÉE ═══ */}
          {etape === 1 && (
            <>
              <h3
                className="text-yb-brun text-xl mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Combien voulez-vous emprunter ?
              </h3>
              <p className="text-yb-texte-doux text-xs mb-6">
                Votre plafond {palier.emoji} {palier.name} :{" "}
                <strong className="text-yb-orange">${creditMax}</strong>
              </p>

              <div className="bg-white rounded-xl p-5 mb-4 border border-gray-100">
                <div className="flex items-baseline justify-between mb-3">
                  <span className="text-xs text-yb-texte-doux">Montant</span>
                  <span
                    className="text-yb-orange text-3xl font-black"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    ${montant}
                  </span>
                </div>
                <input
                  type="range"
                  min={20}
                  max={creditMax}
                  step={5}
                  value={montant}
                  onChange={(e) => setMontant(Number(e.target.value))}
                  className="w-full accent-yb-orange"
                />
                <div className="flex justify-between text-[10px] text-gray-400 mt-1">
                  <span>$20</span>
                  <span>${creditMax}</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 mb-4 border border-gray-100">
                <span className="block text-xs text-yb-texte-doux mb-3">
                  Durée
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { d: 15, label: "15 j" },
                    { d: 30, label: "30 j" },
                    { d: 60, label: "60 j" },
                  ].map((o) => (
                    <button
                      key={o.d}
                      onClick={() => setDuree(o.d)}
                      className={`py-3 rounded-lg border-2 text-xs font-bold transition ${
                        duree === o.d
                          ? "border-yb-orange bg-yb-orange/5 text-yb-orange"
                          : "border-gray-200 text-yb-texte-doux"
                      }`}
                    >
                      {o.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-yb-vert/5 rounded-xl p-4 border border-yb-vert/20 mb-5">
                <div className="flex justify-between text-xs py-1">
                  <span className="text-yb-texte-doux">Montant emprunté</span>
                  <span className="text-yb-brun font-semibold">${montant}</span>
                </div>
                <div className="flex justify-between text-xs py-1">
                  <span className="text-yb-texte-doux">Intérêts (15%)</span>
                  <span className="text-yb-brun font-semibold">
                    ${interets.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between border-t border-yb-vert/20 pt-2 mt-1">
                  <span className="text-yb-brun font-semibold text-sm">
                    Total à rembourser
                  </span>
                  <span
                    className="text-yb-orange text-base font-bold"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setEtape(2)}
                className="w-full bg-yb-orange text-white py-4 rounded-xl font-semibold hover:bg-[#BF360C] transition"
              >
                Continuer →
              </button>
            </>
          )}

          {/* ═══ ÉTAPE 2 : NUMÉRO MOBILE MONEY ═══ */}
          {etape === 2 && (
            <>
              <h3
                className="text-yb-brun text-xl mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Où envoyer l'argent ?
              </h3>
              <p className="text-yb-texte-doux text-xs mb-6">
                Le montant sera envoyé sur ce numéro Mobile Money dans les 24h.
              </p>

              <label className="block text-[11px] font-semibold text-yb-texte-doux uppercase tracking-wider mb-3">
                Votre opérateur
              </label>
              <div className="grid grid-cols-3 gap-2 mb-5">
                {operateurs.map((op) => (
                  <button
                    key={op.id}
                    onClick={() => setOperateur(op.id)}
                    className={`p-3 rounded-lg border-2 transition text-center ${
                      operateur === op.id
                        ? "border-yb-orange bg-yb-orange/5"
                        : "border-gray-200 hover:border-yb-vert/40"
                    }`}
                  >
                    <div className="text-xl mb-1">{op.emoji}</div>
                    <p className="text-yb-brun text-[11px] font-bold">
                      {op.id.replace(" Money", "")}
                    </p>
                    <p className="text-yb-texte-doux text-[9px] mt-0.5">
                      {op.sub}
                    </p>
                  </button>
                ))}
              </div>

              <div className="bg-white rounded-xl p-5 mb-4 border border-gray-100">
                <label className="block text-[11px] font-semibold text-yb-texte-doux uppercase tracking-wider mb-2">
                  Numéro Mobile Money
                </label>
                <div className="flex items-center gap-2">
                  <span className="bg-yb-creme px-3 py-3 rounded-lg text-yb-brun text-sm font-semibold border border-gray-200 whitespace-nowrap">
                    🇨🇩 +243
                  </span>
                  <input
                    type="tel"
                    value={telephone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="099 123 456"
                    inputMode="numeric"
                    className="flex-1 min-w-0 px-4 py-3 rounded-lg border border-gray-200 bg-white text-yb-brun font-semibold text-base focus:outline-none focus:border-yb-orange transition"
                  />
                </div>

                {operateur && isPhoneValid && (
                  <div className="mt-3 flex items-center gap-2 text-xs">
                    <span className="w-5 h-5 rounded-full bg-yb-vert text-white text-[10px] flex items-center justify-center">
                      ✓
                    </span>
                    <span className="text-yb-vert font-semibold">
                      {operateur} détecté
                    </span>
                  </div>
                )}

                {telephone && !isPhoneValid && (
                  <p className="mt-3 text-[11px] text-yb-orange">
                    ⚠️ Le numéro doit contenir 9 chiffres
                  </p>
                )}
              </div>

              <div className="bg-yb-or/10 border border-yb-or/30 rounded-xl p-4 mb-5 flex gap-3">
                <span className="text-xl flex-shrink-0">🔒</span>
                <p className="text-yb-texte-doux text-xs leading-relaxed">
                  <strong className="text-yb-brun">
                    Envoi sécurisé via Mobile Money.
                  </strong>{" "}
                  Vous recevrez un SMS de confirmation avant le déblocage des
                  fonds.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setEtape(1)}
                  className="flex-1 border border-gray-200 text-yb-brun py-4 rounded-xl font-semibold hover:border-yb-brun transition"
                >
                  ← Retour
                </button>
                <button
                  onClick={() => setEtape(3)}
                  disabled={!isPhoneValid}
                  className="flex-1 bg-yb-orange text-white py-4 rounded-xl font-semibold hover:bg-[#BF360C] transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continuer →
                </button>
              </div>
            </>
          )}

          {/* ═══ ÉTAPE 3 : VÉRIFICATION ═══ */}
          {etape === 3 && (
            <>
              <h3
                className="text-yb-brun text-xl mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Vérification de vos informations
              </h3>
              <p className="text-yb-texte-doux text-xs mb-6">
                Vérifiez bien le numéro avant de signer.
              </p>

              <div className="space-y-3 mb-5">
                <CheckItem
                  icon="✓"
                  label="Identité vérifiée"
                  sub="KYC validé le 15/09/2026"
                />
                <CheckItem
                  icon="✓"
                  label={`Score ${SCORE}/100 — Palier ${palier.name}`}
                  sub="Éligible au crédit"
                />
                <CheckItem
                  icon="✓"
                  label={`Épargne disponible : $${EPARGNE}`}
                  sub="Utilisable comme garantie"
                />
                <CheckItem
                  icon="📱"
                  label={`${operateur} : +243 ${telephone}`}
                  sub="Numéro de réception des fonds"
                />
              </div>

              <div className="bg-yb-or/10 border border-yb-or/30 rounded-xl p-4 mb-5">
                <div className="flex gap-3">
                  <span className="text-xl flex-shrink-0">🔒</span>
                  <p className="text-yb-texte-doux text-xs leading-relaxed">
                    <strong className="text-yb-brun">
                      ${montant} de votre solde sera bloqué
                    </strong>{" "}
                    dès la réception du crédit. Il sera libéré au remboursement
                    complet.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setEtape(2)}
                  className="flex-1 border border-gray-200 text-yb-brun py-4 rounded-xl font-semibold hover:border-yb-brun transition"
                >
                  ← Retour
                </button>
                <button
                  onClick={() => setEtape(4)}
                  className="flex-1 bg-yb-orange text-white py-4 rounded-xl font-semibold hover:bg-[#BF360C] transition"
                >
                  Continuer →
                </button>
              </div>
            </>
          )}

          {/* ═══ ÉTAPE 4 : SIGNATURE ═══ */}
          {etape === 4 && (
            <>
              <h3
                className="text-yb-brun text-xl mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Signature électronique
              </h3>
              <p className="text-yb-texte-doux text-xs mb-6">
                Tapez votre nom complet pour accepter les conditions.
              </p>

              <div className="bg-white rounded-xl p-5 border border-gray-100 mb-4">
                <p className="text-yb-texte-doux text-xs leading-relaxed mb-4">
                  Je, soussigné(e), m'engage à rembourser un montant total de{" "}
                  <strong className="text-yb-orange">
                    ${total.toFixed(2)}
                  </strong>{" "}
                  en {duree === 15 ? 2 : duree === 30 ? 4 : 8} versements sur{" "}
                  {duree} jours. Les fonds seront envoyés sur mon compte{" "}
                  <strong className="text-yb-brun">
                    {operateur} (+243 {telephone})
                  </strong>
                  . Je reconnais que ${montant} de mon épargne reste bloqué comme
                  garantie jusqu'au remboursement complet.
                </p>

                <label className="block text-[10px] text-yb-texte-doux uppercase tracking-wider font-semibold mb-2">
                  Votre nom complet
                </label>
                <input
                  type="text"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="Ex: Alpha Bokole"
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-yb-creme text-yb-brun font-semibold focus:outline-none focus:border-yb-orange transition italic"
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setEtape(3)}
                  className="flex-1 border border-gray-200 text-yb-brun py-4 rounded-xl font-semibold hover:border-yb-brun transition"
                >
                  ← Retour
                </button>
                <button
                  onClick={() =>
                    onConfirm(montant, duree, `+243 ${telephone}`, operateur)
                  }
                  disabled={signature.trim().length < 3}
                  className="flex-1 bg-yb-orange text-white py-4 rounded-xl font-semibold hover:bg-[#BF360C] transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Confirmer ✓
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   HELPERS
   ══════════════════════════════════════════════════════════ */
function CheckItem({
  icon,
  label,
  sub,
}: {
  icon: string;
  label: string;
  sub: string;
}) {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-100 flex items-center gap-3">
      <span className="w-6 h-6 rounded-full bg-yb-vert text-white text-xs flex items-center justify-center flex-shrink-0">
        {icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-yb-brun text-sm font-semibold truncate">{label}</p>
        <p className="text-[10px] text-yb-texte-doux truncate">{sub}</p>
      </div>
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

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <div
      className={`flex justify-between items-center gap-3 py-2 ${
        bold ? "border-t border-gray-100 pt-3 mt-2" : ""
      }`}
    >
      <span
        className={`text-xs ${
          bold ? "text-yb-brun font-semibold" : "text-yb-texte-doux"
        }`}
      >
        {label}
      </span>
      <span
        className={`text-right ${
          bold
            ? "text-yb-orange text-lg font-black"
            : "text-yb-brun text-sm font-semibold"
        }`}
        style={bold ? { fontFamily: "var(--font-playfair)" } : {}}
      >
        {value}
      </span>
    </div>
  );
}