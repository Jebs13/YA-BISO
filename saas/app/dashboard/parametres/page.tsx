"use client";

import Link from "next/link";
import { useState } from "react";

type Tab = "profil" | "securite" | "notifications" | "paiement" | "danger";

export default function ParametresPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("profil");

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
            href="/dashboard/score"
          />
          <SidebarItem
            icon="⚙️"
            label="Paramètres"
            active
            href="/dashboard/parametres"
          />
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
                Paramètres
              </h1>
            </div>
            <Link href="/dashboard/profil" className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-yb-vert text-white font-bold flex items-center justify-center">
                AB
              </div>
            </Link>
          </header>

          {/* PROFIL HEADER */}
          <section className="bg-gradient-to-br from-yb-vert to-yb-vert-clair rounded-2xl p-6 lg:p-8 mb-6 flex items-center gap-5">
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-full bg-yb-or text-yb-brun text-2xl font-black flex items-center justify-center border-4 border-white/20">
                AB
              </div>
              <button className="absolute -bottom-1 -right-1 bg-white rounded-full w-7 h-7 flex items-center justify-center shadow-lg text-xs hover:bg-yb-or transition">
                ✏️
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-yb-creme text-xl font-bold truncate"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Alpha BOKOLE K.
              </p>
              <p className="text-yb-creme/70 text-sm truncate">
                +243 099 123 456 · Airtel Money
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-white/15 backdrop-blur text-yb-creme text-[10px] font-semibold px-2 py-1 rounded-full">
                  🥈 Fiable · 72/100
                </span>
                <span className="bg-white/15 backdrop-blur text-yb-creme text-[10px] font-semibold px-2 py-1 rounded-full">
                  ✓ KYC validé
                </span>
              </div>
            </div>
          </section>

          {/* TABS */}
          <div className="flex gap-2 mb-5 overflow-x-auto">
            {(
              [
                { id: "profil", label: "👤 Profil" },
                { id: "securite", label: "🔒 Sécurité" },
                { id: "notifications", label: "🔔 Notifications" },
                { id: "paiement", label: "📱 Paiement" },
                { id: "danger", label: "⚠️ Zone sensible" },
              ] as { id: Tab; label: string }[]
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold whitespace-nowrap transition ${
                  tab === t.id
                    ? t.id === "danger"
                      ? "bg-red-500 text-white shadow"
                      : "bg-yb-vert text-white shadow"
                    : t.id === "danger"
                    ? "bg-white text-red-500 border border-red-200 hover:border-red-400"
                    : "bg-white text-yb-texte-doux border border-gray-100 hover:border-yb-vert/30"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* ═══════ TAB : PROFIL ═══════ */}
          {tab === "profil" && <ProfilTab />}

          {/* ═══════ TAB : SÉCURITÉ ═══════ */}
          {tab === "securite" && <SecuriteTab />}

          {/* ═══════ TAB : NOTIFICATIONS ═══════ */}
          {tab === "notifications" && <NotificationsTab />}

          {/* ═══════ TAB : PAIEMENT ═══════ */}
          {tab === "paiement" && <PaiementTab />}

          {/* ═══════ TAB : DANGER ═══════ */}
          {tab === "danger" && <DangerTab />}
        </div>
      </main>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   TAB 1 : PROFIL
   ══════════════════════════════════════════════════════════ */
function ProfilTab() {
  const [nom, setNom] = useState("Alpha BOKOLE K.");
  const [email, setEmail] = useState("alpha.bokole@gmail.com");
  const [ville, setVille] = useState("Kinshasa");
  const [commune, setCommune] = useState("Lemba");

  return (
    <section className="space-y-5 mb-6">
      {/* Informations personnelles */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3
          className="text-yb-brun text-lg mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Informations personnelles
        </h3>

        <div className="space-y-4">
          <Field
            label="Nom complet"
            value={nom}
            onChange={setNom}
            placeholder="Ex: Alpha Bokole"
          />
          <Field
            label="Adresse email"
            value={email}
            onChange={setEmail}
            placeholder="exemple@email.com"
            type="email"
          />
          <div className="grid grid-cols-2 gap-3">
            <Field
              label="Ville"
              value={ville}
              onChange={setVille}
              placeholder="Kinshasa"
            />
            <Field
              label="Commune"
              value={commune}
              onChange={setCommune}
              placeholder="Lemba"
            />
          </div>
        </div>
      </div>

      {/* Objectif personnel */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3
          className="text-yb-brun text-lg mb-1"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Mon objectif personnel
        </h3>
        <p className="text-yb-texte-doux text-xs mb-4">
          Cela nous aide à personnaliser votre expérience.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[
            { id: "urgence", emoji: "⚡", label: "Frais & urgent", sub: "Route 3 mois" },
            { id: "business", emoji: "🚀", label: "Lancer business", sub: "Route 6 mois" },
            { id: "vision", emoji: "🌳", label: "Grand projet", sub: "Route 12 mois" },
          ].map((o) => (
            <button
              key={o.id}
              className="p-4 rounded-xl border-2 border-gray-200 hover:border-yb-orange transition text-center"
            >
              <div className="text-2xl mb-1">{o.emoji}</div>
              <p className="text-yb-brun text-xs font-bold">{o.label}</p>
              <p className="text-yb-texte-doux text-[10px] mt-0.5">{o.sub}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="flex-1 border border-gray-200 text-yb-brun py-3 rounded-xl font-semibold hover:border-yb-brun transition">
          Annuler
        </button>
        <button className="flex-1 bg-yb-orange text-white py-3 rounded-xl font-semibold hover:bg-[#BF360C] transition">
          Enregistrer ✓
        </button>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   TAB 2 : SÉCURITÉ
   ══════════════════════════════════════════════════════════ */
function SecuriteTab() {
  const [pinActuel, setPinActuel] = useState("");
  const [pinNouveau, setPinNouveau] = useState("");
  const [pinConfirm, setPinConfirm] = useState("");
  const [doubleAuth, setDoubleAuth] = useState(true);

  return (
    <section className="space-y-5 mb-6">
      {/* Changer PIN */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3
          className="text-yb-brun text-lg mb-1"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Changer mon code PIN
        </h3>
        <p className="text-yb-texte-doux text-xs mb-4">
          Votre PIN protège l'accès à votre compte et vos transactions.
        </p>

        <div className="space-y-4">
          <Field
            label="PIN actuel"
            value={pinActuel}
            onChange={setPinActuel}
            placeholder="••••"
            type="password"
          />
          <Field
            label="Nouveau PIN"
            value={pinNouveau}
            onChange={setPinNouveau}
            placeholder="4 à 6 chiffres"
            type="password"
          />
          <Field
            label="Confirmer le nouveau PIN"
            value={pinConfirm}
            onChange={setPinConfirm}
            placeholder="Répéter le PIN"
            type="password"
          />
        </div>

        <button className="w-full mt-5 bg-yb-vert text-white py-3 rounded-xl font-semibold hover:bg-yb-vert-clair transition">
          Mettre à jour le PIN
        </button>
      </div>

      {/* Double authentification */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <ToggleRow
          icon="🔐"
          title="Double authentification (2FA)"
          desc="Un code vous sera demandé à chaque connexion depuis un nouvel appareil."
          value={doubleAuth}
          onChange={setDoubleAuth}
        />
      </div>

      {/* Sessions actives */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3
          className="text-yb-brun text-lg mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Sessions actives
        </h3>

        <div className="space-y-3">
          <SessionRow
            device="📱 Samsung Galaxy S21"
            location="Kinshasa, RDC"
            date="Maintenant"
            current
          />
          <SessionRow
            device="💻 Chrome · Windows"
            location="Kinshasa, RDC"
            date="Il y a 2 heures"
          />
        </div>

        <button className="w-full mt-5 border border-red-200 text-red-500 py-3 rounded-xl font-semibold hover:bg-red-50 transition">
          Déconnecter toutes les autres sessions
        </button>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   TAB 3 : NOTIFICATIONS
   ══════════════════════════════════════════════════════════ */
function NotificationsTab() {
  const [rappelCotisation, setRappelCotisation] = useState(true);
  const [rappelTour, setRappelTour] = useState(true);
  const [rappelCredit, setRappelCredit] = useState(true);
  const [notifScore, setNotifScore] = useState(true);
  const [sms, setSms] = useState(true);
  const [promos, setPromos] = useState(false);

  return (
    <section className="space-y-5 mb-6">
      {/* Rappels importants */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3
          className="text-yb-brun text-lg mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Rappels importants
        </h3>

        <div className="space-y-3">
          <ToggleRow
            icon="💰"
            title="Rappel avant cotisation"
            desc="Notification 24h avant chaque cotisation."
            value={rappelCotisation}
            onChange={setRappelCotisation}
          />
          <ToggleRow
            icon="🎁"
            title="Quand c'est votre tour"
            desc="Alerte quand votre versement arrive."
            value={rappelTour}
            onChange={setRappelTour}
          />
          <ToggleRow
            icon="💳"
            title="Remboursement crédit"
            desc="Rappel avant chaque échéance de crédit."
            value={rappelCredit}
            onChange={setRappelCredit}
          />
        </div>
      </div>

      {/* Activité */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3
          className="text-yb-brun text-lg mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Activité de compte
        </h3>

        <div className="space-y-3">
          <ToggleRow
            icon="🏆"
            title="Évolution de mon score"
            desc="Vous serez alerté quand votre score change."
            value={notifScore}
            onChange={setNotifScore}
          />
          <ToggleRow
            icon="📢"
            title="Actualités et promos Ya Biso"
            desc="Nouveaux paliers, offres spéciales, bonus."
            value={promos}
            onChange={setPromos}
          />
        </div>
      </div>

      {/* Canal */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3
          className="text-yb-brun text-lg mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Canal de notification
        </h3>

        <div className="space-y-3">
          <ToggleRow
            icon="📱"
            title="SMS"
            desc="Envoyé sur +243 099 123 456"
            value={sms}
            onChange={setSms}
          />
          <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
            <span className="text-xl flex-shrink-0">🔔</span>
            <div className="flex-1">
              <p className="text-yb-brun text-sm font-semibold">
                Notifications push
              </p>
              <p className="text-[11px] text-yb-texte-doux">
                Via l'application mobile Ya Biso
              </p>
            </div>
            <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded whitespace-nowrap">
              Bientôt
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   TAB 4 : PAIEMENT
   ══════════════════════════════════════════════════════════ */
function PaiementTab() {
  const [operateur, setOperateur] = useState("Airtel Money");
  const [telephone, setTelephone] = useState("099 123 456");

  const operateurs = [
    { id: "Airtel Money", emoji: "🔴", sub: "099 · 098 · 097" },
    { id: "Orange Money", emoji: "🟠", sub: "089 · 088 · 084" },
    { id: "M-Pesa", emoji: "🔵", sub: "082 · 081 · 080" },
  ];

  return (
    <section className="space-y-5 mb-6">
      {/* Numéro principal */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3
              className="text-yb-brun text-lg mb-1"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Numéro principal
            </h3>
            <p className="text-yb-texte-doux text-xs">
              C'est ici que vous recevez vos versements.
            </p>
          </div>
          <span className="bg-yb-vert/10 text-yb-vert text-[10px] font-bold px-2 py-1 rounded-full">
            ✓ Vérifié
          </span>
        </div>

        <label className="block text-[11px] font-semibold text-yb-texte-doux uppercase tracking-wider mb-3">
          Opérateur
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

        <Field
          label="Numéro Mobile Money"
          value={telephone}
          onChange={setTelephone}
          placeholder="099 123 456"
          type="tel"
        />

        <button className="w-full mt-5 bg-yb-orange text-white py-3 rounded-xl font-semibold hover:bg-[#BF360C] transition">
          Mettre à jour le numéro
        </button>
      </div>

      {/* Numéro secondaire */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3
              className="text-yb-brun text-base mb-1"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Numéro de secours
            </h3>
            <p className="text-yb-texte-doux text-xs">
              Utilisé si votre numéro principal est indisponible.
            </p>
          </div>
        </div>

        <div className="bg-yb-gris rounded-xl p-4 flex items-center gap-3 mb-4">
          <span className="text-xl">📞</span>
          <div className="flex-1">
            <p className="text-yb-brun text-sm font-semibold">
              Aucun numéro de secours
            </p>
            <p className="text-[11px] text-yb-texte-doux">
              Ajoutez-en un pour plus de sécurité
            </p>
          </div>
        </div>

        <button className="w-full border border-yb-vert/30 text-yb-brun py-3 rounded-xl font-semibold hover:border-yb-vert transition">
          + Ajouter un numéro de secours
        </button>
      </div>

      {/* Historique paiements */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3
          className="text-yb-brun text-lg mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Comment vos paiements sont traités
        </h3>

        <div className="space-y-3">
          <InfoRow
            icon="🔒"
            title="Escrow automatique"
            desc="Vos fonds restent chez votre opérateur, jamais chez Ya Biso."
          />
          <InfoRow
            icon="📊"
            title="100% traçable"
            desc="Chaque transaction est enregistrée et certifiable."
          />
          <InfoRow
            icon="⚡"
            title="Décaissement en 24h"
            desc="Versement sur votre Mobile Money sous 24h après validation."
          />
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   TAB 5 : ZONE SENSIBLE
   ══════════════════════════════════════════════════════════ */
function DangerTab() {
  const [confirmText, setConfirmText] = useState("");
  const canDelete = confirmText === "SUPPRIMER";

  return (
    <section className="space-y-5 mb-6">
      {/* Info générale */}
      <div className="bg-yb-or/10 border border-yb-or/30 rounded-2xl p-5">
        <div className="flex gap-3">
          <span className="text-2xl flex-shrink-0">⚠️</span>
          <div>
            <p className="text-yb-brun text-sm font-bold mb-1">
              Attention — Actions irréversibles
            </p>
            <p className="text-yb-texte-doux text-xs leading-relaxed">
              Les actions ci-dessous sont définitives. Assurez-vous de bien
              comprendre les conséquences avant de continuer.
            </p>
          </div>
        </div>
      </div>

      {/* Quitter la tontine */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3
          className="text-yb-brun text-lg mb-1"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Quitter Groupe Avenir
        </h3>
        <p className="text-yb-texte-doux text-xs leading-relaxed mb-4">
          Vous quitterez immédiatement le groupe. Votre épargne de $410 sera
          bloquée pendant 30 jours avant d'être restituée. Votre score Ya Biso
          baissera de 15 points.
        </p>

        <button className="w-full border border-red-300 text-red-500 py-3 rounded-xl font-semibold hover:bg-red-50 transition">
          Quitter le groupe
        </button>
      </div>

      {/* Désactiver le compte */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <h3
          className="text-yb-brun text-lg mb-1"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Désactiver mon compte
        </h3>
        <p className="text-yb-texte-doux text-xs leading-relaxed mb-4">
          Votre compte sera désactivé temporairement. Vous pourrez le réactiver
          à tout moment en vous reconnectant. Votre historique et votre score
          sont conservés.
        </p>

        <button className="w-full border border-yb-orange/40 text-yb-orange py-3 rounded-xl font-semibold hover:bg-yb-orange/5 transition">
          Désactiver temporairement
        </button>
      </div>

      {/* Suppression définitive */}
      <div className="bg-white rounded-2xl p-6 border-2 border-red-200 shadow-sm">
        <h3
          className="text-red-600 text-lg mb-1"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Supprimer définitivement mon compte
        </h3>
        <p className="text-yb-texte-doux text-xs leading-relaxed mb-4">
          <strong className="text-red-600">
            Cette action est irréversible.
          </strong>{" "}
          Toutes vos données, votre historique, votre score et votre épargne
          seront définitivement effacés. Si vous avez un crédit en cours, vous
          devez d'abord le rembourser.
        </p>

        <label className="block text-[11px] font-semibold text-yb-texte-doux uppercase tracking-wider mb-2">
          Tapez "SUPPRIMER" pour confirmer
        </label>
        <input
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          placeholder="SUPPRIMER"
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-yb-creme text-yb-brun font-semibold focus:outline-none focus:border-red-400 transition mb-4"
        />

        <button
          disabled={!canDelete}
          className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold hover:bg-red-600 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Supprimer définitivement mon compte
        </button>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   COMPOSANTS HELPERS
   ══════════════════════════════════════════════════════════ */

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="block text-[11px] font-semibold text-yb-texte-doux uppercase tracking-wider mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-yb-brun text-sm focus:outline-none focus:border-yb-orange transition"
      />
    </div>
  );
}

function ToggleRow({
  icon,
  title,
  desc,
  value,
  onChange,
}: {
  icon: string;
  title: string;
  desc: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
      <span className="text-xl flex-shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-yb-brun text-sm font-semibold">{title}</p>
        <p className="text-[11px] text-yb-texte-doux">{desc}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`relative w-12 h-7 rounded-full transition flex-shrink-0 ${
          value ? "bg-yb-vert" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow transition-all ${
            value ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function SessionRow({
  device,
  location,
  date,
  current,
}: {
  device: string;
  location: string;
  date: string;
  current?: boolean;
}) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-yb-brun text-sm font-semibold truncate">
            {device}
          </p>
          {current && (
            <span className="bg-yb-vert/10 text-yb-vert text-[9px] font-bold px-2 py-0.5 rounded-full">
              CET APPAREIL
            </span>
          )}
        </div>
        <p className="text-[11px] text-yb-texte-doux">
          {location} · {date}
        </p>
      </div>
      {!current && (
        <button className="text-red-400 text-xs hover:text-red-600 transition">
          Déconnecter
        </button>
      )}
    </div>
  );
}

function InfoRow({
  icon,
  title,
  desc,
}: {
  icon: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-50 last:border-0">
      <span className="text-xl flex-shrink-0">{icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-yb-brun text-sm font-semibold">{title}</p>
        <p className="text-[11px] text-yb-texte-doux leading-relaxed">
          {desc}
        </p>
      </div>
      <span className="text-yb-vert text-sm flex-shrink-0">✓</span>
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