"use client";

import { useState } from "react";
import NewUserDashboard from "./components/NewUserDashboard";
import ActiveUserDashboard from "./components/ActiveUserDashboard";

export default function DashboardPage() {
  // 👇 Change ici pour tester : true = nouvel utilisateur, false = utilisateur actif
  const [isNewUser, setIsNewUser] = useState(false);

  return (
    <>
      {/* Bouton flottant pour basculer entre les 2 vues (démo) */}
      <button
        onClick={() => setIsNewUser(!isNewUser)}
        className="fixed bottom-4 right-4 z-50 bg-yb-brun text-yb-or text-xs font-semibold px-4 py-2 rounded-full shadow-lg border border-yb-or/30 hover:bg-yb-or hover:text-yb-brun transition"
      >
        {isNewUser ? "👤 Voir utilisateur actif" : "🆕 Voir nouvel utilisateur"}
      </button>

      {isNewUser ? <NewUserDashboard /> : <ActiveUserDashboard />}
    </>
  );
}