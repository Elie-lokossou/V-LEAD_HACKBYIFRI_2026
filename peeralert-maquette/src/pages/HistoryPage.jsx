import { HISTORY } from "../data/history.js";
import { useApp } from "../context/AppContext.jsx";

export default function HistoryPage() {
    const { currentUser } = useApp();
    
    // Valeurs par défaut sécurisées
    const myPoints = currentUser?.points ?? 0;
    const myName = currentUser?.full_name ?? "Étudiant";

    return (
        <div className="page-inner" style={{ animation: "fadeIn .3s ease" }}>
            <div className="ph a1">
                <div className="ph-title">Historique</div>
                <div className="ph-sub">Toutes les sessions d'entraide de {myName}</div>
            </div>
            
            <div className="a1" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 22 }}>
                {[
                    [myPoints, "Points gagnés"], 
                    ["4", "Sessions"], 
                    ["3/4", "Validées"]
                ].map(([v, l]) => (
                    <div key={l} className="stat">
                        <div className="stat-val">{v}</div>
                        <div className="stat-lbl">{l}</div>
                    </div>
                ))}
            </div>

            {HISTORY.map((h, i) => (
                <div key={h.id} className="card" style={{ padding: 20, marginBottom: 12, opacity: 0, animation: `fadeUp .4s ${i * .07}s ease both` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div>
                            <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                                <div className="tag tag-blue">{h.subject}</div>
                                <div className={`tag ${h.role === "aidant" ? "tag-green" : "tag-warn"}`}>
                                    {h.role === "aidant" ? "Aidant" : "Demandeur"}
                                </div>
                            </div>
                            <div style={{ fontWeight: 700, fontSize: 15, color: "var(--t1)", marginBottom: 3 }}>{h.notion}</div>
                            <div style={{ fontSize: 12.5, color: "var(--t4)" }}>{h.date}</div>
                        </div>
                        {h.ok ? (
                            <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 24, color: "var(--b500)" }}>+{h.pts}</div>
                        ) : (
                            <div className="tag tag-gray">Non validé</div>
                        )}
                    </div>
                    {h.ok ? (
                        <div>
                            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: "var(--t3)", marginBottom: 5 }}>
                                <span>Score quiz</span><span style={{ fontWeight: 700, color: "var(--t1)" }}>{h.quiz} %</span>
                            </div>
                            <div className="prog"><div className="prog-fill" style={{ width: `${h.quiz}%` }} /></div>
                        </div>
                    ) : (
                        <div style={{ fontSize: 12.5, color: "var(--danger)", background: "var(--danger-bg)", borderRadius: "var(--r8)", padding: "6px 12px" }}>
                            Quiz non réussi (score : {h.quiz} %) — aucun point attribué
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
