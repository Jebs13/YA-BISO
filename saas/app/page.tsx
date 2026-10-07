import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-yb-creme">
      <Navbar />

      {/* ══════════════ HERO ══════════════ */}
      <section className="pt-28 md:pt-32 pb-16 px-6 bg-yb-brun relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-yb-orange text-white text-xs font-semibold px-3 py-1 rounded tracking-widest uppercase mb-6">
              Kinshasa · Fintech Africaine
            </span>
            <h1
              className="text-4xl md:text-6xl text-yb-creme leading-tight mb-6 font-black"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              La tontine <em className="not-italic text-yb-or">numérique</em> qui
              ouvre les portes des banques
            </h1>
            <p className="text-yb-creme/70 text-base md:text-lg max-w-lg leading-relaxed mb-10">
              Ya Biso transforme votre épargne collective en historique
              financier reconnu. Cotisez ensemble, construisez votre crédibilité,
              accédez au crédit dont vous avez besoin.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/auth/register"
                className="bg-yb-orange text-white px-8 py-3 rounded font-semibold hover:bg-[#BF360C] transition"
              >
                Commencer maintenant
              </Link>
              <a
                href="#fonctionnement"
                className="border border-yb-creme/40 text-yb-creme px-8 py-3 rounded font-medium hover:border-yb-or hover:text-yb-or transition"
              >
                Voir comment ça marche
              </a>
            </div>
          </div>

          {/* Mockup téléphone simplifié */}
          <div className="flex justify-center">
            <div className="w-64 bg-black rounded-[36px] p-3 shadow-2xl border border-white/10">
              <div className="bg-yb-creme rounded-[28px] overflow-hidden">
                <div className="bg-yb-vert p-4">
                  <p className="text-white/70 text-xs">Bonjour,</p>
                  <p className="text-white font-bold">Alpha BOKOLE K.</p>
                  <p className="text-white/60 text-[10px] mt-2">
                    Solde disponible
                  </p>
                  <p
                    className="text-yb-or text-3xl font-black"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    $100.00
                  </p>
                </div>
                <div className="p-3 space-y-2">
                  <div className="bg-white rounded-lg p-3 border-l-4 border-yb-orange">
                    <p className="text-[10px] text-yb-texte-doux font-semibold uppercase">
                      Groupe Avenir — Actif
                    </p>
                    <p className="text-[10px] text-gray-500">
                      10 membres · $10/sem.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border-l-4 border-yb-vert">
                    <p className="text-[10px] text-yb-texte-doux font-semibold uppercase">
                      Prochain tour : VOUS
                    </p>
                    <p className="text-[10px] text-gray-500">
                      Dans 3 jours · $100
                    </p>
                  </div>
                  <div className="bg-yb-vert rounded-lg p-3 flex items-center gap-3">
                    <p
                      className="text-yb-or text-3xl font-black"
                      style={{ fontFamily: "var(--font-playfair)" }}
                    >
                      72
                    </p>
                    <div>
                      <p className="text-white/70 text-[9px]">
                        Score de fiabilité
                      </p>
                      <p className="text-white text-[10px] font-semibold">
                        Très bon
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ STATS ══════════════ */}
      <section className="bg-yb-vert py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { num: "$0", label: "Frais d'inscription" },
            { num: "24h", label: "Délai de décaissement" },
            { num: "100%", label: "Traçabilité des transactions" },
          ].map((s) => (
            <div key={s.label}>
              <p
                className="text-yb-or text-5xl font-black"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {s.num}
              </p>
              <p className="text-yb-creme/75 text-sm mt-2">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ PROBLÈME ══════════════ */}
      <section id="probleme" className="py-20 px-6 bg-yb-gris">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block bg-yb-or text-yb-brun text-xs font-bold px-3 py-1 rounded tracking-widest uppercase mb-4">
            Le problème
          </span>
          <h2
            className="text-3xl md:text-4xl text-yb-brun mb-4 max-w-2xl"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Les jeunes de Kinshasa sont exclus du système bancaire
          </h2>
          <p className="text-yb-texte-doux max-w-2xl mb-12 leading-relaxed">
            Les banques exigent des preuves que les étudiants et jeunes
            entrepreneurs ne peuvent pas fournir. Résultat : des projets viables
            ne voient jamais le jour, faute de financement.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "📋",
                title: "Pas d'historique de crédit",
                desc: "Sans dossier bancaire préalable, aucune banque ne peut évaluer votre fiabilité.",
              },
              {
                icon: "💼",
                title: "Revenus informels",
                desc: "Petits boulots, activités ponctuelles — rien qui correspond aux critères bancaires.",
              },
              {
                icon: "🏦",
                title: "Montants trop faibles",
                desc: "Besoin de 200$ ? Les frais de dossier dépassent souvent le montant demandé.",
              },
              {
                icon: "🤝",
                title: "Tontine sans traçabilité",
                desc: "La tontine papier existe mais ne génère aucune preuve utilisable ailleurs.",
              },
            ].map((p) => (
              <div
                key={p.title}
                className="bg-white rounded-lg p-6 border-t-4 border-yb-orange"
              >
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3
                  className="text-yb-brun text-lg mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {p.title}
                </h3>
                <p className="text-yb-texte-doux text-sm leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FONCTIONNEMENT ══════════════ */}
      <section id="fonctionnement" className="py-20 px-6 bg-yb-creme">
        <div className="max-w-5xl mx-auto">
          <span className="inline-block bg-yb-or text-yb-brun text-xs font-bold px-3 py-1 rounded tracking-widest uppercase mb-4">
            Comment ça marche
          </span>
          <h2
            className="text-3xl md:text-4xl text-yb-brun mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            De la cotisation à l'historique bancaire
          </h2>
          <p className="text-yb-texte-doux max-w-2xl mb-12 leading-relaxed">
            Ya Biso numérise et sécurise la tontine traditionnelle, tout en
            transformant chaque cotisation en preuve de fiabilité financière.
          </p>

          <div className="space-y-8">
            {[
              {
                n: 1,
                title: "Créez ou rejoignez un groupe",
                desc: "Formez une tontine de 5 à 20 personnes. Chaque membre choisit sa cotisation (ex. 10$/semaine) et l'ordre des tours est tiré au sort automatiquement.",
              },
              {
                n: 2,
                title: "Cotisez chaque semaine via Mobile Money",
                desc: "Les paiements (Airtel Money, Orange Money) sont enregistrés automatiquement sur votre compte Ya Biso. Aucun trésorier humain — zéro risque de détournement.",
                highlight: "10 membres × 10$/semaine = 100$ par tour",
              },
              {
                n: 3,
                title: "Recevez votre tour sur votre compte",
                desc: "Quand c'est votre semaine, les 100$ sont versés directement sur votre compte personnel Ya Biso — traçable et certifiable.",
              },
              {
                n: 4,
                title: "Votre score de fiabilité monte",
                desc: "Chaque cotisation réussie améliore votre score. Ce score devient votre passeport pour accéder au micro-crédit.",
              },
            ].map((s) => (
              <div key={s.n} className="flex gap-5 items-start">
                <div
                  className="w-12 h-12 rounded-full bg-yb-vert text-white flex items-center justify-center flex-shrink-0 text-xl font-bold"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {s.n}
                </div>
                <div>
                  <h3
                    className="text-yb-brun text-lg mb-1"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {s.title}
                  </h3>
                  <p className="text-yb-texte-doux text-sm leading-relaxed">
                    {s.desc}
                  </p>
                  {s.highlight && (
                    <span className="inline-block bg-yb-or/20 text-yb-brun font-semibold text-xs px-3 py-1 rounded mt-2">
                      {s.highlight}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ ROUTES (le concept clé) ══════════════ */}
      <section id="routes" className="py-20 px-6 bg-yb-brun">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block bg-yb-or text-yb-brun text-xs font-bold px-3 py-1 rounded tracking-widest uppercase mb-4">
            3 routes au choix
          </span>
          <h2
            className="text-3xl md:text-4xl text-yb-creme mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Choisis la route qui correspond à ta faim
          </h2>
          <p className="text-yb-creme/70 max-w-2xl mb-12 leading-relaxed">
            À l'ouverture de Ya Biso, tu ne vois pas un formulaire compliqué. Tu
            vois 3 choix clairs, chacun aligné sur ton objectif.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                emoji: "⚡",
                title: "Route 3 mois",
                sub: "Objectif Urgence",
                desc: "Pour payer ses frais, ses syllabus. Cotisation 5$/semaine. Groupe de 5 étudiants.",
                color: "border-yb-orange",
              },
              {
                emoji: "🚀",
                title: "Route 6 mois",
                sub: "Objectif Lancement",
                desc: "Pour le jeune entrepreneur qui veut lancer son petit business. Cotisation 10$/semaine.",
                color: "border-yb-or",
              },
              {
                emoji: "🌳",
                title: "Route 12 mois",
                sub: "Objectif Vision",
                desc: "Pour construire un grand projet sur un an. Cotisation 25$/semaine. Groupe élargi.",
                color: "border-yb-vert-clair",
              },
            ].map((r) => (
              <div
                key={r.title}
                className={`bg-white/5 border ${r.color} border-t-4 rounded-lg p-6 backdrop-blur`}
              >
                <div className="text-4xl mb-3">{r.emoji}</div>
                <h3
                  className="text-yb-creme text-xl mb-1"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {r.title}
                </h3>
                <p className="text-yb-or text-sm font-semibold mb-3">
                  {r.sub}
                </p>
                <p className="text-yb-creme/65 text-sm leading-relaxed">
                  {r.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ FONCTIONNALITÉS ══════════════ */}
      <section id="fonctionnalites" className="py-20 px-6 bg-yb-creme">
        <div className="max-w-6xl mx-auto">
          <span className="inline-block bg-yb-or text-yb-brun text-xs font-bold px-3 py-1 rounded tracking-widest uppercase mb-4">
            Fonctionnalités
          </span>
          <h2
            className="text-3xl md:text-4xl text-yb-brun mb-12"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Tout ce que Ya Biso fait pour toi
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "💰",
                title: "Tontine digitale sécurisée",
                desc: "Groupes, tirage au sort automatique, cotisations Mobile Money — sans trésorier.",
              },
              {
                icon: "👤",
                title: "Compte individuel séparé",
                desc: "Ton argent du tour va sur ton compte personnel, distinct du pot collectif.",
              },
              {
                icon: "⭐",
                title: "Score de fiabilité",
                desc: "Construit automatiquement à partir de ta régularité de cotisation.",
              },
              {
                icon: "📈",
                title: "Micro-crédit progressif",
                desc: "Crédits croissants selon ton score. Jusqu'à 150% de ton épargne.",
              },
              {
                icon: "🔒",
                title: "Garantie bloquée automatiquement",
                desc: "Ton solde de garantie est verrouillé à l'activation du crédit.",
              },
              {
                icon: "🏦",
                title: "Passeport vers les banques",
                desc: "Ton relevé Ya Biso reconnu par nos partenaires bancaires.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="bg-white rounded-lg p-6 border border-yb-vert/10 shadow-sm hover:shadow-md transition"
              >
                <div className="w-12 h-12 rounded-lg bg-yb-vert/10 flex items-center justify-center text-2xl mb-4">
                  {f.icon}
                </div>
                <h3
                  className="text-yb-brun text-lg mb-2"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {f.title}
                </h3>
                <p className="text-yb-texte-doux text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ CTA FINAL ══════════════ */}
      <section
        id="securite"
        className="py-20 px-6 bg-gradient-to-br from-yb-vert to-yb-brun text-center relative overflow-hidden"
      >
        <h2
          className="text-3xl md:text-5xl text-yb-creme mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Prêt à construire ton avenir financier ?
        </h2>
        <p className="text-yb-creme/70 max-w-xl mx-auto mb-10 leading-relaxed">
          Rejoins Ya Biso et transforme ta tontine en porte d'entrée vers le
          crédit bancaire.
        </p>
        <Link
          href="/auth/register"
          className="inline-block bg-yb-orange text-white px-10 py-4 rounded font-semibold hover:bg-[#BF360C] transition"
        >
          Rejoindre la liste d'attente
        </Link>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <footer className="bg-[#1A0F0A] py-8 px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p
          className="text-yb-or text-xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Ya Biso
        </p>
        <p className="text-yb-creme/40 text-sm">
          Kinshasa, RDC · 2026 Tous les droits sont réservés
        </p>
        <p className="text-yb-creme/25 text-xs">
          La tontine numérique qui ouvre les portes des banques
        </p>
      </footer>
    </main>
  );
}