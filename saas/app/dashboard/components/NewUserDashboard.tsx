"use client";

import Link from "next/link";
import { useState } from "react";

export default function NewUserDashboard() {
  const [membres, setMembres] = useState(10);
  const [cotisation, setCotisation] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const gain = membres * cotisation;

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
          <SidebarItem icon="🫂" label="Ma tontine" locked />
          <SidebarItem icon="💳" label="Crédit" locked />
          <SidebarItem icon="📊" label="Historique" locked />
          <SidebarItem icon="🏆" label="Score & Badges" locked />
          <SidebarItem icon="⚙️" label="Paramètres" locked/>
        </nav>

        <div className="p-4 border-t border-white/10">
          <button className="w-full text-red-400 hover:text-red-300 text-sm font-medium py-2 transition">
            ⏻ Déconnexion
          </button>
        </div>
      </aside>

      {/* Overlay mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ═══════════ CONTENU PRINCIPAL ═══════════ */}
      <main className="flex-1 min-w-0">
        {/* Header mobile burger */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden fixed top-4 left-4 z-20 bg-yb-brun text-yb-or rounded-lg p-2 shadow-lg"
        >
          ☰
        </button>

        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-8">
          {/* ═══════ HEADER ═══════ */}
          <header className="flex items-start justify-between mb-8">
            <div>
              <h1
                className="text-yb-brun text-2xl lg:text-3xl mb-1"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Bonjour, Alpha 👋
              </h1>
              <p className="text-yb-texte-doux text-sm">
                Prêt à construire votre avenir financier ?
              </p>
            </div>
            <Link
              href="/dashboard/profil"
              className="relative flex-shrink-0"
            >
              <div className="w-12 h-12 rounded-full bg-yb-vert text-white font-bold flex items-center justify-center">
                AK
              </div>
              <span className="absolute -bottom-1 -right-1 bg-yb-or text-yb-brun text-[10px] rounded-full w-5 h-5 flex items-center justify-center shadow">
                ✏️
              </span>
            </Link>
          </header>

          {/* Barre progression profil */}
          <div className="bg-white rounded-xl p-4 mb-6 border border-gray-100 shadow-sm">
            <div className="flex justify-between items-baseline mb-2">
              <p className="text-yb-brun text-sm font-semibold">
                Profil complété à 25%
              </p>
              <p className="text-yb-texte-doux text-xs">1/4 étapes</p>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-yb-orange rounded-full transition-all"
                style={{ width: "25%" }}
              />
            </div>
          </div>

          {/* ═══════ HERO ═══════ */}
          <section className="bg-gradient-to-br from-yb-vert to-yb-vert-clair rounded-2xl p-6 lg:p-8 mb-6">
            <h2
              className="text-yb-creme text-2xl lg:text-3xl mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Bienvenue sur Ya Biso 🌱
            </h2>
            <p className="text-yb-creme/75 text-sm mb-6 leading-relaxed">
              Construisez votre historique financier en 4 étapes simples.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <p className="text-yb-creme/65 text-xs mb-1">
                  Solde disponible
                </p>
                <p
                  className="text-yb-or text-3xl font-black"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  $0.00
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-xl p-4">
                <p className="text-yb-creme/65 text-xs mb-1">
                  Score Ya Biso
                </p>
                <p
                  className="text-yb-or text-3xl font-black"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  0<span className="text-lg opacity-60">/100</span>
                </p>
              </div>
            </div>

            <div className="mt-4 h-2 bg-white/15 rounded-full overflow-hidden">
              <div className="h-full w-0 bg-yb-or rounded-full" />
            </div>
          </section>

          {/* ═══════ CHECKLIST ═══════ */}
          <section className="mb-6">
            <h3
              className="text-yb-brun text-lg mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Vos 4 premières étapes
            </h3>

            <div className="space-y-3">
              {/* Étape 1 */}
              <div className="bg-yb-vert/10 border border-yb-vert/20 rounded-xl p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-yb-vert text-white flex items-center justify-center text-lg flex-shrink-0">
                  ✓
                </div>
                <div className="flex-1">
                  <p className="text-yb-brun text-sm font-semibold">
                    Compte créé
                  </p>
                  <p className="text-yb-texte-doux text-xs">
                    Votre compte Ya Biso est actif.
                  </p>
                </div>
              </div>

              {/* Étape 2 */}
              <div className="bg-white border border-yb-orange/30 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 shadow-sm">
                <div className="w-10 h-10 rounded-full border-2 border-yb-orange text-yb-orange flex items-center justify-center text-lg flex-shrink-0">
                  2
                </div>
                <div className="flex-1">
                  <p className="text-yb-brun text-sm font-semibold">
                    Rejoindre ou créer une tontine
                  </p>
                  <p className="text-yb-texte-doux text-xs">
                    Choisissez une route et trouvez votre communauté.
                  </p>
                </div>
                <Link
                  href="/dashboard/tontine/nouvelle"
                  className="bg-yb-orange text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#BF360C] transition whitespace-nowrap"
                >
                  Commencer →
                </Link>
              </div>

              {/* Étape 3 */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center gap-4 opacity-40 cursor-not-allowed">
                <div className="w-10 h-10 rounded-full border-2 border-gray-300 text-gray-400 flex items-center justify-center text-lg flex-shrink-0">
                  3
                </div>
                <div className="flex-1">
                  <p className="text-yb-brun text-sm font-semibold">
                    Faire votre première cotisation
                  </p>
                  <p className="text-yb-texte-doux text-xs">
                    Disponible après l'étape 2.
                  </p>
                </div>
                <span className="text-gray-400 text-lg">🔒</span>
              </div>

              {/* Étape 4 */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 flex items-center gap-4 opacity-40 cursor-not-allowed">
                <div className="w-10 h-10 rounded-full border-2 border-gray-300 text-gray-400 flex items-center justify-center text-lg flex-shrink-0">
                  4
                </div>
                <div className="flex-1">
                  <p className="text-yb-brun text-sm font-semibold">
                    Recevoir votre premier tour
                  </p>
                  <p className="text-yb-texte-doux text-xs">
                    Disponible après l'étape 3.
                  </p>
                </div>
                <span className="text-gray-400 text-lg">🔒</span>
              </div>
            </div>
          </section>

          {/* ═══════ SIMULATEUR ═══════ */}
          <section className="bg-white rounded-2xl p-6 border border-yb-orange/20 shadow-sm mb-6">
            <h3
              className="text-yb-brun text-lg mb-1"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Simulez votre épargne
            </h3>
            <p className="text-yb-texte-doux text-xs mb-5">
              Voyez combien vous pouvez recevoir à votre tour.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-[11px] font-semibold text-yb-texte-doux uppercase tracking-wider mb-2">
                  Membres
                </label>
                <input
                  type="number"
                  min={5}
                  max={20}
                  value={membres}
                  onChange={(e) =>
                    setMembres(Math.max(5, Number(e.target.value) || 5))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-yb-creme text-yb-brun font-semibold focus:outline-none focus:border-yb-orange transition"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-yb-texte-doux uppercase tracking-wider mb-2">
                  Cotisation / sem.
                </label>
                <input
                  type="number"
                  min={1}
                  value={cotisation}
                  onChange={(e) =>
                    setCotisation(Math.max(1, Number(e.target.value) || 1))
                  }
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 bg-yb-creme text-yb-brun font-semibold focus:outline-none focus:border-yb-orange transition"
                />
              </div>
            </div>

            <div className="bg-yb-vert rounded-xl p-4 text-center">
              <p className="text-yb-creme/70 text-xs mb-1">
                Vous recevrez à votre tour
              </p>
              <p
                className="text-yb-or text-3xl font-black"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                ${gain.toLocaleString("fr-FR")}
              </p>
            </div>
          </section>

          {/* ═══════ BLOC SÉCURITÉ ═══════ */}
          <section className="mb-6">
            <h3
              className="text-yb-brun text-lg mb-4"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Pourquoi Ya Biso est sûr ?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="text-2xl mb-2">🔒</div>
                <p className="text-yb-brun text-sm font-semibold mb-1">
                  Escrow automatique
                </p>
                <p className="text-yb-texte-doux text-xs leading-relaxed">
                  Aucun trésorier humain, fonds sécurisés.
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="text-2xl mb-2">📊</div>
                <p className="text-yb-brun text-sm font-semibold mb-1">
                  Traçabilité totale
                </p>
                <p className="text-yb-texte-doux text-xs leading-relaxed">
                  Chaque transaction enregistrée et certifiable.
                </p>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                <div className="text-2xl mb-2">🏦</div>
                <p className="text-yb-brun text-sm font-semibold mb-1">
                  Reconnu par les banques
                </p>
                <p className="text-yb-texte-doux text-xs leading-relaxed">
                  Votre historique ouvre les portes du crédit.
                </p>
              </div>
            </div>
          </section>

          {/* ═══════ CTA ═══════ */}
          <section className="text-center pb-8">
            <Link
              href="/dashboard/tontine/nouvelle"
              className="inline-block bg-yb-orange text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#BF360C] transition shadow-lg shadow-yb-orange/20"
            >
              Créer ou rejoindre une tontine →
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
  locked,
}: {
  icon: string;
  label: string;
  active?: boolean;
  locked?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
        locked
          ? "opacity-40 cursor-not-allowed"
          : active
          ? "bg-yb-vert text-white shadow"
          : "text-yb-creme/85 hover:bg-white/5 cursor-pointer"
      }`}
    >
      <span className="text-lg">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
      {locked && <span className="ml-auto text-xs">🔒</span>}
    </div>
  );
}