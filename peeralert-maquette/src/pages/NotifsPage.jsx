import { useEffect, useState } from "react";
import { I } from "../utils/icons.jsx";
import { useApp } from "../context/AppContext.jsx";
import { useToast } from "../components/ToastProvider.jsx";

export default function NotifsPage({ setPage }) {
    const { notifs, clearNotifs, currentUser } = useApp();
    const toast = useToast();
    const [filter, setFilter] = useState("Toutes");
    const iconFor = { alert: I.Bell, badge: I.Trophy, quiz: I.Check, buddy: I.Brain };

    // Valeurs par défaut sécurisées
    const myName = (currentUser?.full_name ?? "Étudiant").split(" ")[0];

    useEffect(() => {
        const t = setTimeout(clearNotifs, 500);
        return () => clearTimeout(t);
    }, [clearNotifs]);

    const types = ["Toutes", "Alertes", "Récompenses", "Système", "Non lues"];
    
    const getFilteredNotifs = () => {
        if (filter === "Toutes") return notifs;
        if (filter === "Alertes") return notifs.filter(n => n.type === "alert");
        if (filter === "Récompenses") return notifs.filter(n => n.type === "badge" || n.type === "quiz");
        if (filter === "Système") return notifs.filter(n => n.type === "buddy");
        if (filter === "Non lues") return notifs.filter(n => !n.read);
        return notifs;
    };

    const filtered = getFilteredNotifs();

    return (
        <div className="page-inner" style={{ animation: "fadeIn .3s ease" }}>
            <div className="ph a1">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 20 }}>
                    <div>
                        <div className="ph-title">Notifications</div>
                        <div className="ph-sub">Gérez vos alertes et vos accomplissements, {myName}</div>
                    </div>
                    <button className="btn btn-ghost btn-sm" onClick={() => toast("Notifications marquées comme lues", "success")}>Tout marquer lu</button>
                </div>

                {/* Filters */}
                <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 10, scrollbarWidth: "none" }}>
                    {types.map(t => {
                        const count = t === "Toutes" ? notifs.length : 
                                      t === "Non lues" ? notifs.filter(n => !n.read).length :
                                      t === "Alertes" ? notifs.filter(n => n.type === "alert").length :
                                      t === "Récompenses" ? notifs.filter(n => n.type === "badge" || n.type === "quiz").length :
                                      notifs.filter(n => n.type === "buddy").length;
                        return (
                            <button key={t} className={`chip${filter === t ? " on" : ""}`} onClick={() => setFilter(t)} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                {t}
                                {count > 0 && <span style={{ background: filter === t ? "rgba(255,255,255,.2)" : "var(--b100)", color: filter === t ? "white" : "var(--b600)", padding: "1px 6px", borderRadius: "var(--rpill)", fontSize: 10, fontWeight: 700 }}>{count}</span>}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {filtered.map((n, i) => (
                    <div key={n.id} className={`ni${!n.read ? " unread" : ""}`} style={{ opacity: 0, animation: `fadeUp .4s ${i * .05}s ease both`, transition: "all .3s" }} onClick={() => n.type === "alert" ? setPage("alerts") : null}>
                        <div style={{ width: 44, height: 44, borderRadius: "var(--r12)", background: !n.read ? "var(--b100)" : "var(--s2)", display: "flex", alignItems: "center", justifyContent: "center", color: !n.read ? "var(--b500)" : "var(--t4)", flexShrink: 0 }}>
                            <span style={{ width: 20, height: 20 }}>{iconFor[n.type] || I.Bell}</span>
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--t1)", marginBottom: 2 }}>{n.title}</div>
                            <div style={{ fontSize: 13, color: "var(--t3)", lineHeight: 1.5 }}>{n.msg}</div>
                            <div style={{ fontSize: 11, color: "var(--t4)", marginTop: 6 }}>{n.time}</div>
                        </div>
                    </div>
                ))}
                {filtered.length === 0 && (
                    <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--t4)" }}>
                        <div style={{ fontSize: 40, marginBottom: 16 }}>🍃</div>
                        <div style={{ fontWeight: 600 }}>Aucune notification pour le moment</div>
                    </div>
                )}
            </div>
        </div>
    );
}
