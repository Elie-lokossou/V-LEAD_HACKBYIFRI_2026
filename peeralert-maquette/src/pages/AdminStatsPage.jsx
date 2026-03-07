import { I } from "../utils/icons.jsx";

export default function AdminStatsPage() {
    const topSubjects = [
        { name: "Algorithmique", val: 84, color: "var(--danger)" },
        { name: "Bases de données", val: 62, color: "var(--amber)" },
        { name: "Mathématiques", val: 45, color: "var(--success)" },
        { name: "Réseaux", val: 38, color: "var(--b500)" },
    ];

    const participations = [
        { filiere: "Intelligence Artificielle", tau: "92%", alertes: 456, experts: 42 },
        { filiere: "Génie Logiciel", tau: "85%", alertes: 312, experts: 38 },
        { filiere: "Cybersécurité", tau: "78%", alertes: 218, experts: 15 },
        { filiere: "Réseaux & IOT", tau: "64%", alertes: 156, experts: 12 },
    ];

    return (
        <div className="page-inner" style={{ animation: "fadeIn .3s ease", maxWidth: "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontFamily: "DM Serif Display,serif", fontSize: 28, color: "var(--t1)", marginBottom: 4 }}>Statistiques & Rapports</h1>
                    <div style={{ fontSize: 14, color: "var(--t3)" }}>Analyse globale des performances de la plateforme</div>
                </div>
                <button className="btn btn-dark btn-sm" onClick={() => alert("Exportation CSV lancée")}>
                    <span style={{ width: 14, height: 14 }}>{I.Plus}</span> Exporter les données (CSV)
                </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 24 }}>
                {/* ACTIVITÉ HEBDOMADAIRE */}
                <div className="card" style={{ padding: 28 }}>
                    <div style={{ fontWeight: 800, fontSize: 16, color: "var(--t1)", marginBottom: 28 }}>Activité par semaine (Nombre d'alertes)</div>
                    <div style={{ height: 180, display: "flex", alignItems: "flex-end", gap: 12, paddingBottom: 20 }}>
                        {[32, 45, 28, 65, 52, 74, 98, 85, 112, 94].map((h, i) => (
                            <div key={i} style={{ flex: 1, position: "relative", height: "100%", display: "flex", alignItems: "flex-end" }}>
                                <div style={{ width: "100%", height: `${(h/112)*100}%`, background: "linear-gradient(to top, var(--b600), var(--b300))", borderRadius: "4px 4px 0 0" }} />
                                <div style={{ position: "absolute", bottom: -20, left: "50%", transform: "translateX(-50%)", fontSize: 9, color: "var(--t4)", fontWeight: 700 }}>S{i+1}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* TOP MATIÈRES */}
                <div className="card" style={{ padding: 28 }}>
                    <div style={{ fontWeight: 800, fontSize: 16, color: "var(--t1)", marginBottom: 24 }}>Matières les plus sollicitées (%)</div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                        {topSubjects.map(s => (
                            <div key={s.name}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 13, fontWeight: 700 }}>
                                    <span>{s.name}</span>
                                    <span style={{ color: s.color }}>{s.val}%</span>
                                </div>
                                <div className="prog" style={{ height: 8, background: "var(--s3)" }}>
                                    <div className="prog-fill" style={{ width: `${s.val}%`, background: s.color }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* TABLEAU PARTICIPATION */}
            <div className="card" style={{ padding: 28 }}>
                <div style={{ fontWeight: 800, fontSize: 16, color: "var(--t1)", marginBottom: 20 }}>Participation par filière</div>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                        <tr style={{ borderBottom: "1px solid var(--line)" }}>
                            {["Filière", "Taux Participation", "Total Alertes", "Nombre Experts"].map(h => (
                                <th key={h} style={{ padding: "12px 10px", fontSize: 11, fontWeight: 700, color: "var(--t4)", textTransform: "uppercase" }}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {participations.map(p => (
                            <tr key={p.filiere} style={{ borderBottom: "1px solid var(--line)" }}>
                                <td style={{ padding: "14px 10px", fontWeight: 600, fontSize: 14 }}>{p.filiere}</td>
                                <td style={{ padding: "14px 10px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                        <div style={{ width: 60, height: 6, background: "var(--s3)", borderRadius: 10 }}>
                                            <div style={{ width: p.tau, height: "100%", background: "var(--b500)", borderRadius: 10 }} />
                                        </div>
                                        <span style={{ fontSize: 13, fontWeight: 700 }}>{p.tau}</span>
                                    </div>
                                </td>
                                <td style={{ padding: "14px 10px", fontSize: 14 }}>{p.alertes}</td>
                                <td style={{ padding: "14px 10px", fontSize: 14 }}>{p.experts}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
