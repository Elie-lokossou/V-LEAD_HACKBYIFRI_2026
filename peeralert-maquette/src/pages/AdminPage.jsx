import { useState, useEffect } from "react";
import { I } from "../utils/icons.jsx";
import { supabase } from "../lib/supabase.js";
import { useApp } from "../context/AppContext.jsx";

export default function AdminPage({ setPage }) {
    const [now, setNow] = useState(new Date());
    const { alerts } = useApp();
    const [statsReal, setStatsReal] = useState({
        students: 0,
        totalAlerts: 0,
        resolved: "94%", 
        active: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 1000);
        fetchDashboardStats();
        return () => clearInterval(timer);
    }, [alerts]);

    const fetchDashboardStats = async () => {
        try {
            // 1. Compte des étudiants réels depuis profiles
            const { count: studentsCount, error: err1 } = await supabase
                .from('profiles')
                .select('*', { count: 'exact', head: true })
                .neq('role', 'admin')
                .neq('role', 'revoked');

            // 2. Calcul des alertes actives depuis le contexte
            const activeCount = alerts.filter(a => a.status === "active" || a.taken >= a.spots).length;

            setStatsReal({
                students: studentsCount || 0,
                totalAlerts: alerts.length,
                resolved: "94%", 
                active: activeCount
            });
        } catch (err) {
            console.error("Dashboard stats error:", err);
        } finally {
            setLoading(false);
        }
    };

    const stats = [
        { label: "Étudiants", val: statsReal.students, ic: I.Users, trend: "+12% ↑", bg: "#eff6ff", col: "#2563eb", border: "#dbeafe" },
        { label: "Alertes", val: statsReal.totalAlerts, ic: I.Zap, trend: "+5% ↑", bg: "#f5f3ff", col: "#7c3aed", border: "#ede9fe" },
        { label: "Résolues", val: statsReal.resolved, ic: I.Check, trend: "stable", bg: "#f0fdf4", col: "#16a34a", border: "#dcfce7" },
        { label: "En cours", val: statsReal.active, ic: I.Clock, trend: "▲ urgent", bg: "#fff7ed", col: "#ea580c", border: "#ffedd5" },
    ];

    const criticals = [
        { name: "Algorithmique", perc: 84, trend: "+12%", color: "var(--danger)" },
        { name: "Bases de données", perc: 62, trend: "+5%", color: "var(--amber)" },
        { name: "Mathématiques", perc: 45, trend: "-2%", color: "var(--success)" },
        { name: "Réseaux", perc: 30, trend: "stable", color: "var(--b500)" },
    ];

    const pendingAlerts = alerts.filter(a => a.taken < a.spots && !a.expert).slice(0, 3);

    return (
        <div className="page-inner" style={{ animation: "fadeIn .3s ease", padding: 0, maxWidth: "none" }}>
            {/* HEADER */}
            <div style={{
                background: "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
                padding: "32px 40px",
                borderRadius: "var(--r16)",
                marginBottom: 32,
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)"
            }}>
                <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                        <div style={{ width: 36, height: 36, background: "rgba(255,255,255,0.1)", borderRadius: "var(--r10)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(10px)" }}>
                            <span style={{ width: 20, height: 20, color: "var(--b300)" }}>{I.Shield}</span>
                        </div>
                        <h1 style={{ fontFamily: "DM Serif Display,serif", fontSize: 28, letterSpacing: "0.01em" }}>Administration IFRI/UAC</h1>
                    </div>
                    <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>Pilotage pédagogique · Année 2025-2026</div>
                </div>

                <div style={{ textAlign: "right", display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.9)", background: "rgba(255,255,255,0.05)", padding: "6px 14px", borderRadius: "var(--rpill)", border: "1px solid rgba(255,255,255,0.1)" }}>
                        {now.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })} · {now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <button className="btn btn-primary" style={{ background: "#3b82f6", border: "none", boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)" }} onClick={() => setPage("students")}>
                        <span style={{ width: 16, height: 16 }}>{I.Users}</span> Gérer Étudiants
                    </button>
                </div>
            </div>

            {/* STATS CARDS */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 32 }}>
                {stats.map(s => (
                    <div key={s.label} className="card" style={{ padding: 24, background: s.bg, border: `1px solid ${s.border}`, transition: "transform 0.2s" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                            <div style={{ width: 40, height: 40, background: "white", borderRadius: "var(--r10)", display: "flex", alignItems: "center", justifyContent: "center", color: s.col, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                                <span style={{ width: 22, height: 22 }}>{s.ic}</span>
                            </div>
                            <div style={{ fontSize: 12, fontWeight: 700, color: s.trend.includes("+") || s.trend.includes("▲") ? "var(--danger)" : "var(--t4)", background: "white", padding: "4px 8px", borderRadius: "var(--rpill)", border: "1px solid rgba(0,0,0,0.05)" }}>
                                {s.trend}
                            </div>
                        </div>
                        <div style={{ fontSize: 32, fontFamily: "DM Serif Display,serif", color: "#1e293b", marginBottom: 4 }}>{loading ? "..." : s.val}</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "#64748b", textTransform: "uppercase", letterSpacing: ".05em" }}>{s.label}</div>
                    </div>
                ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 24 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    {/* ACTIVITY CHART */}
                    <div className="card" style={{ padding: 28, background: "#fcfdfe" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
                            <div style={{ fontWeight: 800, fontSize: 17, color: "var(--t1)" }}>Activité des 7 derniers jours</div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "linear-gradient(to top, #3b82f6, #93c5fd)" }} />
                                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--t3)" }}>Alertes lancées</span>
                            </div>
                        </div>
                        <div style={{ height: 220, display: "flex", alignItems: "flex-end", gap: 16, padding: "0 10px 30px", borderBottom: "1px solid var(--line)" }}>
                            {[40, 65, 30, 85, 55, 95, 70].map((h, i) => (
                                <div key={i} style={{ flex: 1, position: "relative", height: "100%", display: "flex", alignItems: "flex-end" }}>
                                    <div style={{
                                        width: "100%",
                                        height: `${h}%`,
                                        background: "linear-gradient(to top, #2563eb, #60a5fa)",
                                        borderRadius: "6px 6px 2px 2px",
                                        transition: "height 0.3s ease"
                                    }} />
                                    <div style={{ position: "absolute", bottom: -28, left: "50%", transform: "translateX(-50%)", fontSize: 11, color: "var(--t4)", fontWeight: 700 }}>
                                        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"][i]}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* PENDING ALERTS */}
                    <div className="card" style={{ padding: 28 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                            <div style={{ fontWeight: 800, fontSize: 17, color: "var(--t1)" }}>Alertes sans réponse (en attente)</div>
                            <span className="pulse" style={{ fontSize: 11, color: "white", fontWeight: 800, background: statsReal.active > 5 ? "var(--danger)" : "var(--b500)", padding: "5px 12px", borderRadius: "var(--rpill)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{statsReal.active} actives</span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {pendingAlerts.length === 0 ? (
                                <div style={{ textAlign: "center", padding: 20, color: "var(--t4)" }}>Aucune alerte critique en attente.</div>
                            ) : pendingAlerts.map(a => (
                                <div key={a.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", background: "white", borderRadius: "var(--r12)", border: "1px solid var(--line)", boxShadow: "0 2px 4px rgba(0,0,0,0.02)" }}>
                                    <div style={{ width: 40, height: 40, background: "var(--s1)", borderRadius: "var(--r10)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "var(--b600)", fontSize: 13 }}>
                                        {a.level}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 700, fontSize: 15, color: "var(--t1)", marginBottom: 2 }}>{a.notion}</div>
                                        <div style={{ fontSize: 13, color: "var(--t3)", fontWeight: 500 }}>{a.subject} · {a.time}</div>
                                    </div>
                                    <button className="btn btn-outline btn-sm" style={{ borderColor: "var(--b200)", color: "var(--b600)" }} onClick={() => setPage("sys-alerts")}>
                                        Détails
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                    {/* CRITICAL SUBJECTS */}
                    <div className="card" style={{ padding: 28 }}>
                        <div style={{ fontWeight: 800, fontSize: 17, color: "var(--t1)", marginBottom: 24 }}>🔥 Matières critiques cette semaine</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            {criticals.map(s => (
                                <div key={s.name}>
                                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, alignItems: "center" }}>
                                        <span style={{ fontSize: 14, fontWeight: 700, color: "var(--t2)" }}>{s.name}</span>
                                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                            <span style={{ fontSize: 13, fontWeight: 800, color: s.color }}>{s.trend}</span>
                                            <span style={{ fontSize: 12, fontWeight: 700, color: "var(--t4)", background: "var(--s1)", padding: "2px 6px", borderRadius: "4px" }}>{s.perc}%</span>
                                        </div>
                                    </div>
                                    <div className="prog" style={{ height: 10, background: "#f1f5f9" }}>
                                        <div className="prog-fill" style={{ width: `${s.perc}%`, background: s.color, borderRadius: "var(--rpill)" }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RECOMMENDATION */}
                    <div className="card" style={{ padding: 24, background: "#fffdf0", border: "1px solid #fef3c7", position: "relative", overflow: "hidden" }}>
                        <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                            <div style={{ fontSize: 28 }}>💡</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontWeight: 800, fontSize: 15, color: "#92400e", marginBottom: 6 }}>Recommandation IA</div>
                                <p style={{ fontSize: 13.5, color: "#b45309", lineHeight: 1.55, margin: 0, fontWeight: 600 }}>
                                    Le pic d'alertes suggère un besoin de renforcement sur les notions de base.
                                </p>
                            </div>
                        </div>
                        <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
                            <button className="btn btn-sm" style={{ background: "#d97706", color: "white", border: "none" }}>Analyser</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
