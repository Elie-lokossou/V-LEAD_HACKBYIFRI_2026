import { useState } from "react";
import { I } from "../utils/icons.jsx";

export default function AdminAlertsPage() {
    const [filter, setFilter] = useState("Toutes");

    const alerts = [
        { id: 1, subject: "Algorithmique", notion: "Récursivité terminale", author: "Victoria T.", parts: 3, status: "Active", date: "Aujourd'hui, 14:20" },
        { id: 2, subject: "Bases de données", notion: "Jointures SQL", author: "Samuel B.", parts: 5, status: "Terminée", date: "Hier, 10:15" },
        { id: 3, subject: "Mathématiques", notion: "Algèbre linéaire", author: "Alice M.", parts: 2, status: "Ouverte", date: "Aujourd'hui, 15:45" },
        { id: 4, subject: "Réseaux", notion: "Modèle OSI", author: "Francis O.", parts: 8, status: "Active", date: "Aujourd'hui, 11:30" },
        { id: 5, subject: "IA", notion: "Réseaux de neurones", author: "Chantal D.", parts: 12, status: "Terminée", date: "2 mars, 09:00" },
    ];

    const filtered = alerts.filter(a => filter === "Toutes" || a.status === filter);

    const getStatusStyle = (status) => {
        switch(status) {
            case "Active": return { background: "var(--success-bg)", color: "var(--success)" };
            case "Ouverte": return { background: "var(--b100)", color: "var(--b600)" };
            case "Terminée": return { background: "var(--s3)", color: "var(--t3)" };
            default: return {};
        }
    };

    return (
        <div className="page-inner" style={{ animation: "fadeIn .3s ease", maxWidth: "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontFamily: "DM Serif Display,serif", fontSize: 28, color: "var(--t1)", marginBottom: 4 }}>Alertes du Système</h1>
                    <div style={{ fontSize: 14, color: "var(--t3)" }}>Surveillance des flux d'entraide en temps réel</div>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                    {["Toutes", "Ouvertes", "Active", "Terminée"].map(f => (
                        <button key={f} className={`btn ${filter === f ? "btn-dark" : "btn-ghost"} btn-sm`} onClick={() => setFilter(f)}>{f}</button>
                    ))}
                </div>
            </div>

            <div className="card" style={{ overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                        <tr style={{ background: "var(--s2)", borderBottom: "1px solid var(--line)" }}>
                            {["Matière", "Notion", "Auteur", "Parts.", "Statut", "Date", "Actions"].map(h => (
                                <th key={h} style={{ padding: "16px 20px", fontSize: 12, fontWeight: 700, color: "var(--t4)", textTransform: "uppercase", letterSpacing: ".05em" }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map(a => (
                            <tr key={a.id} style={{ borderBottom: "1px solid var(--line)" }}>
                                <td style={{ padding: "16px 20px", fontWeight: 700, fontSize: 14, color: "var(--t1)" }}>{a.subject}</td>
                                <td style={{ padding: "16px 20px", fontSize: 13, color: "var(--t2)" }}>{a.notion}</td>
                                <td style={{ padding: "16px 20px", fontSize: 13 }}>{a.author}</td>
                                <td style={{ padding: "16px 20px", fontSize: 13 }}>{a.parts}</td>
                                <td style={{ padding: "16px 20px" }}>
                                    <span style={{ padding: "4px 10px", borderRadius: "var(--rpill)", fontSize: 11, fontWeight: 700, ...getStatusStyle(a.status) }}>
                                        {a.status}
                                    </span>
                                </td>
                                <td style={{ padding: "16px 20px", fontSize: 13, color: "var(--t4)" }}>{a.date}</td>
                                <td style={{ padding: "16px 20px" }}>
                                    <button className="btn btn-ghost btn-xs" style={{ color: "var(--danger)" }} onClick={() => alert("Alerte supprimée")}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
