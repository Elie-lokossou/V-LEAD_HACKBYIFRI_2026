import { useState } from "react";
import { I } from "../utils/icons.jsx";
import { useToast } from "../components/ToastProvider.jsx";
import { useApp } from "../context/AppContext.jsx";

export default function ProfilePage({ setPage }) {
    const toast = useToast();
    const { currentUser, userRole } = useApp();

    // On récupère les dispo de currentUser ou on utilise le mock par défaut
    const [days, setDays] = useState(currentUser?.availability || {
        Lun: ["18h–20h"], Mar: [], Mer: ["14h–16h", "18h–20h"],
        Jeu: [], Ven: ["16h–22h"], Sam: ["10h–12h", "14h–18h"], Dim: ["10h–14h"],
    });

    const [notifSettings, setNotifSettings] = useState(currentUser?.notif_settings || {
        "Algorithmique": true,
        "Mathématiques": true,
        "Réseaux": false,
        "Programmation Web": true,
        "Bases de données": false,
        "Physique": false,
        "Cybersécurité": true
    });

    const [frequency, setFrequency] = useState(currentUser?.notif_frequency || "Immédiate");

    const badges = [
        { id: "novice", name: "Novice", pts: 0, icon: "🌱", color: "#86efac", desc: "Bienvenue dans la communauté" },
        { id: "actif", name: "Actif", pts: 50, icon: "⚡", color: "#3b82f6", desc: "Participation régulière" },
        { id: "expert", name: "Expert", pts: 150, icon: "🎯", color: "#f97316", desc: "La communauté vous fait confiance" },
        { id: "mentor", name: "Mentor", pts: 300, icon: "👑", color: "#fbbf24", desc: "Pilier reconnu de PeerAlert" },
    ];

    const currentPts = Number(currentUser?.points) || 0;
    const nextBadge = badges.find(b => b.pts > currentPts) || badges[badges.length - 1];
    const currentBadge = [...badges].reverse().find(b => b.pts <= currentPts) || badges[0];

    const toggleSubject = (sub) => {
        setNotifSettings(prev => ({ ...prev, [sub]: !prev[sub] }));
        toast(`Préférence mise à jour pour ${sub}`, "info", 2000);
    };

    if (userRole === "admin") {
        return (
            <div className="page-inner" style={{ animation: "fadeIn .3s ease" }}>
                <div className="ph a1"><div className="ph-title">Mon profil admin</div></div>
                
                <div className="card a1" style={{ maxWidth: 600, margin: "0 auto", overflow: "hidden" }}>
                    <div style={{ height: 120, background: "var(--b900)", position: "relative" }}>
                        <div style={{ position: "absolute", bottom: -40, left: 32 }}>
                            <div className="av" style={{ width: 84, height: 84, fontSize: 28, border: "4px solid var(--white)", boxShadow: "var(--sh-md)", background: "var(--b700)" }}>
                                {(currentUser?.full_name || "Admin").split(" ").filter(Boolean).map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                            </div>
                        </div>
                    </div>
                    
                    <div style={{ padding: "54px 32px 32px" }}>
                        <div style={{ marginBottom: 28 }}>
                            <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 26, color: "var(--t1)" }}>{currentUser?.full_name || "Administration IFRI/UAC"}</div>
                            <div style={{ fontSize: 14, color: "var(--t3)", fontWeight: 600, marginTop: 4 }}>Administrateur système</div>
                        </div>
                        
                        <div style={{ display: "flex", flexDirection: "column", gap: 14, padding: "20px 0", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", marginBottom: 28 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--t2)", fontSize: 14 }}>
                                <span style={{ width: 16, height: 16 }}>{I.Mail || <I.User/>}</span>
                                <span>{currentUser?.email || "admin@ifri.uac.bj"}</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--t2)", fontSize: 14 }}>
                                <span style={{ width: 16, height: 16 }}>{I.Home}</span>
                                <span>IFRI / UAC Bénin</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--t2)", fontSize: 14 }}>
                                <span style={{ width: 16, height: 16 }}>{I.History}</span>
                                <span>Connecté depuis : Mars 2026</span>
                            </div>
                        </div>
                        
                        <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", padding: "12px 0", color: "var(--danger)", borderColor: "var(--danger-line)", marginTop: 24 }} onClick={() => setPage("landing")}>
                            <span style={{ width: 15, height: 15 }}>{I.LogOut}</span>Se déconnecter
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="page-inner" style={{ animation: "fadeIn .3s ease" }}>
            <div className="ph a1"><div className="ph-title">Mon profil</div></div>

            {/* 2-column grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 20, alignItems: "start" }}>

                {/* ── LEFT COLUMN ──────────────────────────── */}
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                    {/* Profile hero card */}
                    <div className="card a1" style={{ overflow: "hidden" }}>
                        <div style={{ height: 100, background: "linear-gradient(135deg,var(--b900),var(--b600))", position: "relative" }}>
                            <div style={{ position: "absolute", right: 20, top: 20, opacity: .1 }}>
                                <span style={{ width: 100, height: 100, display: "block" }}>{I.Shield}</span>
                            </div>
                            
                            {/* Overlapping Avatar */}
                            <div style={{ position: "absolute", bottom: -40, left: 24, cursor: "pointer" }} className="group">
                                <div className="av" style={{ width: 84, height: 84, fontSize: 28, border: "4px solid var(--white)", boxShadow: "var(--sh-md)", position: "relative" }}>
                                    {(currentUser?.full_name || "Étudiant").split(" ").filter(Boolean).map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,.4)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: ".2s" }} className="av-hover">
                                        <span style={{ width: 24, height: 24, color: "white" }}>{I.Plus}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: "54px 24px 24px" }}>
                            <div style={{ marginBottom: 20 }}>
                                <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 26, color: "var(--t1)", lineHeight: 1.2 }}>{currentUser?.full_name || "Étudiant"}</div>
                                <div style={{ fontSize: 14, color: "var(--t3)", marginTop: 4 }}>{currentUser?.filiere || "Filière non renseignée"} · {currentUser?.level || ""} · IFRI/UAC</div>
                            </div>

                            {/* Badge Highlight */}
                            <div style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--s2)", padding: "12px 16px", borderRadius: "var(--r12)", border: "1px solid var(--line)", marginBottom: 20 }}>
                                <div style={{ fontSize: 32 }}>{currentBadge.icon}</div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 12, fontWeight: 700, color: "var(--t4)", textTransform: "uppercase", letterSpacing: ".05em" }}>Badge Actuel</div>
                                    <div style={{ fontWeight: 700, fontSize: 16, color: "var(--t1)" }}>{currentBadge.name}</div>
                                </div>
                                <div className="bdg bdg-actif">{currentPts} pts</div>
                            </div>

                            {/* Progress to next */}
                            <div>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13 }}>
                                    <span style={{ fontWeight: 600, color: "var(--t2)" }}>Progression vers {nextBadge.name}</span>
                                    <span style={{ fontWeight: 700, color: "var(--b500)" }}>{currentPts} / {nextBadge.pts} pts</span>
                                </div>
                                <div className="prog" style={{ height: 10 }}><div className="prog-fill" style={{ width: `${(currentPts / nextBadge.pts) * 100}%` }} /></div>
                                <div style={{ fontSize: 12, color: "var(--t4)", marginTop: 8 }}>Encore {Math.max(0, nextBadge.pts - currentPts)} points pour débloquer le badge {nextBadge.name}.</div>
                            </div>
                        </div>
                    </div>

                    {/* Interactive Settings */}
                    <div className="card a2" style={{ padding: 24 }}>
                        <div style={{ fontWeight: 700, fontSize: 17, color: "var(--t1)", marginBottom: 20, display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ width: 20, height: 20, color: "var(--b500)" }}>{I.Bell}</span>
                            Préférences de notifications
                        </div>
                        
                        <div style={{ marginBottom: 24 }}>
                            <label className="lbl">Fréquence des alertes</label>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                                {["Immédiate", "Résumé journalier"].map(f => (
                                    <button key={f} className={`btn ${frequency === f ? "btn-dark" : "btn-ghost"} btn-sm`} onClick={() => setFrequency(f)} style={{ justifyContent: "center" }}>{f}</button>
                                ))}
                            </div>
                        </div>

                        <label className="lbl">Matières à suivre</label>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                            {Object.entries(notifSettings).map(([sub, enabled]) => (
                                <div key={sub} onClick={() => toggleSubject(sub)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", background: enabled ? "var(--b050)" : "var(--s2)", border: `1px solid ${enabled ? "var(--b200)" : "var(--line)"}`, borderRadius: "var(--r8)", cursor: "pointer", transition: ".2s" }}>
                                    <span style={{ fontSize: 13, fontWeight: enabled ? 600 : 400, color: enabled ? "var(--b600)" : "var(--t3)" }}>{sub}</span>
                                    <div style={{ width: 32, height: 18, background: enabled ? "var(--b500)" : "var(--t4)", borderRadius: 20, position: "relative", transition: ".3s" }}>
                                        <div style={{ position: "absolute", top: 2, left: enabled ? 16 : 2, width: 14, height: 14, background: "white", borderRadius: "50%", transition: ".3s" }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── RIGHT COLUMN ─────────────────────────── */}
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

                    {/* Badges Grid */}
                    <div className="card a2" style={{ padding: 20 }}>
                        <div style={{ fontWeight: 700, fontSize: 15, color: "var(--t1)", marginBottom: 16 }}>Tous les badges</div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                            {badges.map(b => {
                                const isUnlocked = currentPts >= b.pts;
                                return (
                                    <div key={b.id} style={{ textAlign: "center", padding: "16px 10px", borderRadius: "var(--r12)", border: "1px solid var(--line)", background: isUnlocked ? "var(--s2)" : "transparent", opacity: isUnlocked ? 1 : 0.4, position: "relative" }} title={isUnlocked ? b.desc : `${b.pts - currentPts} pts restants`}>
                                        {!isUnlocked && <div style={{ position: "absolute", top: 8, right: 8, fontSize: 12 }}>🔒</div>}
                                        <div style={{ fontSize: 32, marginBottom: 8 }}>{b.icon}</div>
                                        <div style={{ fontWeight: 700, fontSize: 13, color: "var(--t1)" }}>{b.name}</div>
                                        <div style={{ fontSize: 11, color: "var(--t4)", marginTop: 4 }}>{b.pts} pts</div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Disponibilités */}
                    <div className="card a3" style={{ padding: 20 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                            <div style={{ fontWeight: 700, fontSize: 15, color: "var(--t1)" }}>Disponibilités</div>
                            <button className="btn btn-ghost btn-xs">Modifier</button>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            {Object.entries(days).map(([d, slots]) => (
                                <div key={d} style={{ display: "flex", alignItems: "center", gap: 10, paddingBottom: 8, borderBottom: "1px solid var(--line)" }}>
                                    <div style={{ width: 36, fontSize: 12, fontWeight: 700, color: "var(--t3)" }}>{d}</div>
                                    <div style={{ flex: 1, display: "flex", gap: 4, flexWrap: "wrap" }}>
                                        {slots.length > 0 ? slots.map(s => (
                                            <span key={s} style={{ background: "var(--b100)", color: "var(--b600)", padding: "2px 8px", borderRadius: "var(--rpill)", fontSize: 11, fontWeight: 600 }}>{s}</span>
                                        )) : <span style={{ fontSize: 11, color: "var(--t4)" }}>—</span>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Settings List */}
                    <div className="card a4" style={{ padding: 18 }}>
                        <div style={{ fontWeight: 700, fontSize: 14.5, color: "var(--t1)", marginBottom: 12 }}>Compte</div>
                        {[["Compte", currentUser?.email || "non connecté"]].map(([l, v]) => (
                            <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0" }}>
                                <span style={{ fontSize: 13.5, color: "var(--t1)" }}>{l}</span>
                                <span style={{ fontSize: 13, color: "var(--b400)", fontWeight: 500 }}>{v}</span>
                            </div>
                        ))}
                    </div>

                    <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", padding: "12px 0", color: "var(--danger)", borderColor: "var(--danger-line)", marginTop: 10 }} onClick={() => setPage("landing")}>
                        <span style={{ width: 15, height: 15 }}>{I.LogOut}</span>Se déconnecter
                    </button>
                </div>
            </div>

            <style>{`
                .group:hover .av-hover { opacity: 1 !important; }
                .av { transition: .3s; }
                .card { transition: .3s; }
                @keyframes shimmer {
                    0% { filter: brightness(1); transform: scale(1); }
                    50% { filter: brightness(1.5); transform: scale(1.1); }
                    100% { filter: brightness(1); transform: scale(1); }
                }
            `}</style>
        </div>
    );
}
