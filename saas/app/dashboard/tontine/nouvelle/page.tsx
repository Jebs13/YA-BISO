"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Mode = "choix" | "creer" | "rejoindre";

export default function NouvelleTontinePage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("choix");

  return (
    <div className="min-h-screen bg-yb-creme">
      <div className="kente-line" />

      {/* ═══════════ HEADER ═══════════ */}
      <header className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-yb-brun hover:text-yb-orange transition"
          >
            <span className="text-lg">←</span>
            <span className="text-sm font-medium">Retour</span>
          </Link>
          <Link
            href="/"
            className="text-xl text-yb-or"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Ya <span className="text-yb-orange">Biso</span>
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-10">
        {/* ═══════════ ÉCRAN 1 : CHOIX ═══════════ */}
        {mode === "choix" && (
          <>
            <div className="text-center mb-10">
              <div className="inline-block bg-yb-or text-yb-brun text-xs font-bold px-3 py-1 rounded uppercase tracking-widest mb-4">
                Étape 2 / 4
              </div>
              <h1
                className="text-yb-brun text-3xl lg:text-4xl mb-3"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Rejoindre ou créer une tontine
              </h1>
              <p className="text-yb-texte-doux text-sm max-w-md mx-auto leading-relaxed">
                Choisissez comment démarrer votre parcours Ya Biso. Vous pourrez
                toujours changer plus tard.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Créer */}
              <button
                onClick={() => setMode("creer")}
                className="group bg-white rounded-2xl p-6 border-2 border-transparent hover:border-yb-orange shadow-sm hover:shadow-lg transition text-left"
              >
                <div className="w-14 h-14 rounded-xl bg-yb-orange/10 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition">
                  🚀
                </div>
                <h2
                  className="text-yb-brun text-xl mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Créer une tontine
                </h2>
                <p className="text-yb-texte-doux text-sm leading-relaxed mb-4">
                  Vous êtes le leader. Invitez vos amis, définissez la route et
                  lancez votre communauté.
                </p>
                <span className="text-yb-orange text-sm font-semibold group-hover:underline">
                  Créer →
                </span>
              </button>

              {/* Rejoindre */}
              <button
                onClick={() => setMode("rejoindre")}
                className="group bg-white rounded-2xl p-6 border-2 border-transparent hover:border-yb-vert shadow-sm hover:shadow-lg transition text-left"
              >
                <div className="w-14 h-14 rounded-xl bg-yb-vert/10 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition">
                  🫂
                </div>
                <h2
                  className="text-yb-brun text-xl mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  Rejoindre une tontine
                </h2>
                <p className="text-yb-texte-doux text-sm leading-relaxed mb-4">
                  Ya Biso vous trouve automatiquement une communauté alignée sur
                  votre objectif.
                </p>
                <span className="text-yb-vert text-sm font-semibold group-hover:underline">
                  Rejoindre →
                </span>
              </button>
            </div>

            {/* Info matching auto */}
            <div className="mt-8 bg-yb-vert/5 border border-yb-vert/20 rounded-xl p-5 flex gap-4">
              <span className="text-2xl flex-shrink-0">💡</span>
              <div>
                <p className="text-yb-brun text-sm font-semibold mb-1">
                  Pas d'amis à inviter ? Pas de souci.
                </p>
                <p className="text-yb-texte-doux text-xs leading-relaxed">
                  Contrairement au likelemba traditionnel, Ya Biso vous met en
                  contact avec d'autres jeunes qui ont choisi la même route que
                  vous. Même objectif, même rythme, même communauté.
                </p>
              </div>
            </div>
          </>
        )}

        {/* ═══════════ ÉCRAN 2 : CRÉER ═══════════ */}
        {mode === "creer" && (
          <CreerForm onBack={() => setMode("choix")} onSuccess={() => router.push("/dashboard")} />
        )}

        {/* ═══════════ ÉCRAN 3 : REJOINDRE ═══════════ */}
        {mode === "rejoindre" && (
          <RejoindreForm onBack={() => setMode("choix")} onSuccess={() => router.push("/dashboard")} />
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   FORMULAIRE : CRÉER UNE TONTINE
   ══════════════════════════════════════════════════════════ */
function CreerForm({
  onBack,
  onSuccess,
}: {
  onBack: () => void;
  onSuccess: () => void;
}) {
  const [nom, setNom] = useState("Groupe Avenir 🌱");
  const [membres, setMembres] = useState(10);
  const [cotisation, setCotisation] = useState(10);
  const [route, setRoute] = useState("6mois");

  const routes = [
    { id: "3mois", emoji: "⚡", title: "3 mois", sub: "Urgence", cot: 5 },
    { id: "6mois", emoji: "🚀", title: "6 mois", sub: "Lancement", cot: 10 },
    { id: "12mois", emoji: "🌳", title: "12 mois", sub: "Vision", cot: 25 },
  ];

  const gain = membres * cotisation;

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-yb-texte-doux text-sm mb-6 hover:text-yb-orange transition"
      >
        <span>←</span> Retour aux options
      </button>

      <div className="mb-8">
        <div className="inline-block bg-yb-or text-yb-brun text-xs font-bold px-3 py-1 rounded uppercase tracking-widest mb-4">
          Créer une tontine
        </div>
        <h1
          className="text-yb-brun text-2xl lg:text-3xl mb-2"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Lancez votre communauté
        </h1>
        <p className="text-yb-texte-doux text-sm">
          Configurez votre tontine en 1 minute. Les membres recevront une
          invitation automatique.
        </p>
      </div>

      <div className="space-y-5">
        {/* Nom */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <label className="block text-[11px] font-semibold text-yb-texte-doux uppercase tracking-wider mb-2">
            Nom du groupe
          </label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            placeholder="Ex: Groupe Avenir"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-yb-creme text-yb-brun font-semibold focus:outline-none focus:border-yb-orange transition"
          />
        </div>

        {/* Route */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <label className="block text-[11px] font-semibold text-yb-texte-doux uppercase tracking-wider mb-3">
            Choisir la route
          </label>
          <div className="grid grid-cols-3 gap-2">
            {routes.map((r) => (
              <button
                key={r.id}
                onClick={() => {
                  setRoute(r.id);
                  setCotisation(r.cot);
                }}
                className={`p-3 rounded-lg border-2 transition text-center ${
                  route === r.id
                    ? "border-yb-orange bg-yb-orange/5"
                    : "border-gray-200 hover:border-yb-vert/40"
                }`}
              >
                <div className="text-2xl mb-1">{r.emoji}</div>
                <p className="text-yb-brun text-xs font-bold">{r.title}</p>
                <p className="text-yb-texte-doux text-[10px]">{r.sub}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Paramètres */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-5">
          <div>
            <div className="flex justify-between items-baseline mb-3">
              <label className="text-[11px] font-semibold text-yb-texte-doux uppercase tracking-wider">
                Nombre de membres
              </label>
              <span
                className="text-yb-brun text-lg font-bold"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {membres}
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={20}
              value={membres}
              onChange={(e) => setMembres(Number(e.target.value))}
              className="w-full accent-yb-vert"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>5</span>
              <span>20</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-baseline mb-3">
              <label className="text-[11px] font-semibold text-yb-texte-doux uppercase tracking-wider">
                Cotisation / semaine
              </label>
              <span
                className="text-yb-brun text-lg font-bold"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                ${cotisation}
              </span>
            </div>
            <input
              type="range"
              min={5}
              max={50}
              step={5}
              value={cotisation}
              onChange={(e) => setCotisation(Number(e.target.value))}
              className="w-full accent-yb-orange"
            />
            <div className="flex justify-between text-[10px] text-gray-400 mt-1">
              <span>$5</span>
              <span>$50</span>
            </div>
          </div>
        </div>

        {/* Récap */}
        <div className="bg-gradient-to-br from-yb-vert to-yb-vert-clair rounded-2xl p-6 text-yb-creme">
          <p className="text-yb-creme/70 text-xs mb-2">Vous recevrez à votre tour</p>
          <p
            className="text-yb-or text-4xl font-black mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            ${gain.toLocaleString("fr-FR")}
          </p>
          <div className="space-y-1.5 text-xs text-yb-creme/85">
            <div className="flex justify-between">
              <span>Membres</span>
              <span className="font-semibold">{membres}</span>
            </div>
            <div className="flex justify-between">
              <span>Cotisation hebdomadaire</span>
              <span className="font-semibold">${cotisation}</span>
            </div>
            <div className="flex justify-between">
              <span>Durée du cycle</span>
              <span className="font-semibold">{membres} semaines</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="flex-1 border border-gray-200 text-yb-brun py-4 rounded-xl font-semibold hover:border-yb-brun transition"
          >
            ← Retour
          </button>
          <button
            onClick={onSuccess}
            className="flex-1 bg-yb-orange text-white py-4 rounded-xl font-semibold hover:bg-[#BF360C] transition shadow-lg shadow-yb-orange/20"
          >
            Créer la tontine 🎉
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   FORMULAIRE : REJOINDRE UNE TONTINE
   ══════════════════════════════════════════════════════════ */
function RejoindreForm({
  onBack,
  onSuccess,
}: {
  onBack: () => void;
  onSuccess: () => void;
}) {
  const [route, setRoute] = useState("6mois");
  const [enRecherche, setEnRecherche] = useState(false);
  const [trouve, setTrouve] = useState(false);

  const routes = [
    {
      id: "3mois",
      emoji: "⚡",
      title: "3 mois",
      sub: "Objectif Urgence",
      cot: 5,
      membres: 5,
      desc: "Frais & syllabus",
    },
    {
      id: "6mois",
      emoji: "🚀",
      title: "6 mois",
      sub: "Objectif Lancement",
      cot: 10,
      membres: 8,
      desc: "Lancer un business",
    },
    {
      id: "12mois",
      emoji: "🌳",
      title: "12 mois",
      sub: "Objectif Vision",
      cot: 25,
      membres: 12,
      desc: "Grand projet",
    },
  ];

  const handleRecherche = () => {
    setEnRecherche(true);
    setTimeout(() => {
      setEnRecherche(false);
      setTrouve(true);
    }, 2000);
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-yb-texte-doux text-sm mb-6 hover:text-yb-orange transition"
      >
        <span>←</span> Retour aux options
      </button>

      <div className="mb-8">
        <div className="inline-block bg-yb-or text-yb-brun text-xs font-bold px-3 py-1 rounded uppercase tracking-widest mb-4">
          Rejoindre une tontine
        </div>
        <h1
          className="text-yb-brun text-2xl lg:text-3xl mb-2"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Trouvez votre communauté
        </h1>
        <p className="text-yb-texte-doux text-sm">
          Ya Biso vous met automatiquement en contact avec des jeunes qui ont
          choisi la même route que vous.
        </p>
      </div>

      {!trouve ? (
        <div className="space-y-5">
          {/* Routes */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <label className="block text-[11px] font-semibold text-yb-texte-doux uppercase tracking-wider mb-3">
              Quelle est votre route ?
            </label>
            <div className="space-y-2">
              {routes.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setRoute(r.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition flex items-center gap-4 ${
                    route === r.id
                      ? "border-yb-orange bg-yb-orange/5"
                      : "border-gray-200 hover:border-yb-vert/40"
                  }`}
                >
                  <span className="text-3xl flex-shrink-0">{r.emoji}</span>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span
                        className="text-yb-brun font-bold"
                        style={{ fontFamily: "var(--font-playfair)" }}
                      >
                        Route {r.title}
                      </span>
                      <span className="text-yb-orange text-xs font-semibold">
                        {r.sub}
                      </span>
                    </div>
                    <p className="text-yb-texte-doux text-xs mt-0.5">
                      {r.cot}$/semaine · {r.membres} membres · {r.desc}
                    </p>
                  </div>
                  {route === r.id && (
                    <span className="text-yb-orange text-xl">✓</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Recherche */}
          {enRecherche ? (
            <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center">
              <div className="inline-block w-12 h-12 border-4 border-yb-orange border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-yb-brun text-sm font-semibold">
                Recherche d'une communauté alignée…
              </p>
              <p className="text-yb-texte-doux text-xs mt-1">
                Nous cherchons des jeunes avec le même objectif que vous.
              </p>
            </div>
          ) : (
            <button
              onClick={handleRecherche}
              className="w-full bg-yb-vert text-white py-4 rounded-xl font-semibold hover:bg-yb-vert-clair transition shadow-lg shadow-yb-vert/20"
            >
              🔍 Trouver ma communauté
            </button>
          )}

          <div className="bg-yb-or/10 border border-yb-or/30 rounded-xl p-4 flex gap-3">
            <span className="text-xl flex-shrink-0">⚡</span>
            <p className="text-yb-texte-doux text-xs leading-relaxed">
              <strong className="text-yb-brun">Rapide et sécurisé.</strong> Ya
              Biso vous place dans un groupe dont le rythme correspond au vôtre.
              Aucun engagement avant validation.
            </p>
          </div>
        </div>
      ) : (
        /* ═══════ RÉSULTAT ═══════ */
        <div className="space-y-5">
          <div className="bg-gradient-to-br from-yb-vert to-yb-vert-clair rounded-2xl p-6 text-center text-yb-creme">
            <div className="text-4xl mb-3">🎉</div>
            <p className="text-yb-creme/70 text-xs mb-1">
              Communauté trouvée !
            </p>
            <h2
              className="text-yb-creme text-2xl mb-2"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Groupe Ubuntu
            </h2>
            <p className="text-yb-creme/80 text-sm">
              6 membres · Route 6 mois · Cotisation 10$/semaine
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p className="text-[11px] font-semibold text-yb-texte-doux uppercase tracking-wider mb-3">
              Membres du groupe
            </p>
            <div className="space-y-2">
              {[
                { nom: "Grâce M.", ville: "Lemba", emoji: "👩" },
                { nom: "Josué K.", ville: "Ngaliema", emoji: "🧑" },
                { nom: "Ruth B.", ville: "Gombe", emoji: "👩" },
                { nom: "Samuel T.", ville: "Limete", emoji: "🧑" },
                { nom: "Deborah N.", ville: "Matete", emoji: "👩" },
                { nom: "Vous", ville: "Kinshasa", emoji: "⭐" },
              ].map((m, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0"
                >
                  <div className="text-xl">{m.emoji}</div>
                  <div className="flex-1">
                    <p
                      className={`text-sm ${
                        m.nom === "Vous"
                          ? "text-yb-orange font-semibold"
                          : "text-yb-brun"
                      }`}
                    >
                      {m.nom}
                    </p>
                    <p className="text-[10px] text-gray-400">{m.ville}</p>
                  </div>
                  {m.nom === "Vous" && (
                    <span className="text-[10px] font-semibold bg-yb-orange/10 text-yb-orange px-2 py-1 rounded">
                      Vous
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <p className="text-[11px] font-semibold text-yb-texte-doux uppercase tracking-wider mb-3">
              Récapitulatif
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-yb-texte-doux">Votre cotisation</span>
                <span className="text-yb-brun font-semibold">
                  $10/semaine
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-yb-texte-doux">Premier versement</span>
                <span className="text-yb-brun font-semibold">
                  Dans 6 semaines
                </span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-2 mt-2">
                <span className="text-yb-texte-doux font-semibold">
                  Vous recevrez
                </span>
                <span className="text-yb-orange font-bold text-base">
                  $60
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setTrouve(false)}
              className="flex-1 border border-gray-200 text-yb-brun py-4 rounded-xl font-semibold hover:border-yb-brun transition"
            >
              ← Chercher un autre
            </button>
            <button
              onClick={onSuccess}
              className="flex-1 bg-yb-orange text-white py-4 rounded-xl font-semibold hover:bg-[#BF360C] transition shadow-lg shadow-yb-orange/20"
            >
              Rejoindre ✓
            </button>
          </div>
        </div>
      )}
    </div>
  );
}