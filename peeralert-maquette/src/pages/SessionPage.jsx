import { useState, useEffect } from "react";
import { I } from "../utils/icons.jsx";
import { useApp } from "../context/AppContext.jsx";

export default function SessionPage({ setPage }) {
    const { activeSession, setActiveSession } = useApp();
    const [time, setTime] = useState(82 * 60);
    useEffect(() => {
        const t = setInterval(() => setTime(p => Math.max(0, p - 1)), 1000);
        return () => clearInterval(t);
    }, []);
    const mm = String(Math.floor(time / 60)).padStart(2, "0");
    const ss = String(time % 60).padStart(2, "0");

    const participants = [
        { init: "NK", name: "N. Kouelo", role: "aidant", expert: true, filiere: "Génie Logiciel", pts: 287 },
        { init: "KT", name: "K. Tovihouande", role: "demandeur", expert: false, filiere: "IA", pts: 84, me: true },
        { init: "CD", name: "C. Dako", role: "aidant", expert: false, filiere: "Cybersécurité", pts: 183 },
    ];

    const handleFinishSession = () => {
        // Victoria (KT) is the user in this simulation
        const me = participants.find(p => p.me);
        const myRole = me.expert ? "expert" : "learner"; 
        
        setActiveSession({
            ...(activeSession || {}),
            isValidation: true,
            role: myRole,
            notion: activeSession?.notion || "Récursivité",
            subject: activeSession?.subject || "Algorithmique"
        });
        setPage("quiz");
    };

    return (
        <div className="page-inner" style={{ animation: "fadeIn .3s ease" }}>
            <div className="ph a1">
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div className="online" />
                    <div>
                        <div className="ph-title" style={{ fontSize: 24 }}>Session active</div>
                        <div className="ph-sub">Algorithmique · Récursivité · 3 participants</div>
                    </div>
                </div>
            </div>

            {/* Timer */}
            <div className="card a2" style={{ padding: 22, marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                    <div>
                        <div style={{ fontSize: 12.5, color: "var(--t3)", marginBottom: 4 }}>Temps restant</div>
                        <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 42, color: "var(--b600)", letterSpacing: "-.02em" }}>{mm}:{ss}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                        <div className="tag tag-green" style={{ marginBottom: 8 }}>Session active</div>
                        <div style={{ fontSize: 12, color: "var(--t4)" }}>Démarrée à 18h05</div>
                    </div>
                </div>
                <div className="prog"><div className="prog-fill" style={{ width: `${(time / (90 * 60)) * 100}%` }} /></div>
            </div>

            {/* Expert confirmed */}
            <div className="a3" style={{ background: "var(--success-bg)", border: "1px solid var(--success-line)", borderRadius: "var(--r12)", padding: 14, marginBottom: 14, display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ width: 18, height: 18, color: "var(--success)", flexShrink: 0 }}>{I.Check}</span>
                <div style={{ fontSize: 13, color: "var(--success)" }}><strong>Expert confirmé :</strong> N. Kouelo maîtrise la récursivité. La session peut démarrer.</div>
            </div>

            {/* Participants */}
            <div className="card a4" style={{ padding: 20, marginBottom: 14 }}>
                <div style={{ fontWeight: 700, fontSize: 14.5, color: "var(--t1)", marginBottom: 14 }}>Participants ({participants.length}/3)</div>
                {participants.map(p => (
                    <div key={p.name} className="prow">
                        <div className="av" style={{ width: 38, height: 38, fontSize: 14 }}>{p.init}</div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: 13.5, color: "var(--t1)", display: "flex", alignItems: "center", gap: 8 }}>
                                {p.name}
                                {p.me && <span style={{ fontSize: 10.5, background: "var(--b100)", color: "var(--b500)", padding: "2px 8px", borderRadius: "var(--rpill)", fontWeight: 700 }}>Moi</span>}
                            </div>
                            <div style={{ fontSize: 12, color: "var(--t3)" }}>{p.filiere} · {p.pts} pts</div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-end" }}>
                            {p.expert && <div className="tag tag-green">Expert</div>}
                            <div className={`tag ${p.role === "aidant" ? "tag-blue" : "tag-warn"}`}>{p.role === "aidant" ? "Aidant" : "Demandeur"}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* WhatsApp */}
            <div className="card a5" style={{ padding: 18, marginBottom: 16, borderLeft: "3px solid #25D366" }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: "var(--t1)", marginBottom: 4 }}>Groupe WhatsApp configuré</div>
                <div style={{ fontSize: 13, color: "var(--t3)", marginBottom: 12, lineHeight: 1.5 }}>La session d'entraide se déroule dans le groupe WhatsApp. Cliquez pour rejoindre.</div>
                <button className="btn" style={{ background: "#25D366", color: "white", gap: 8 }}>
                    <span style={{ width: 16, height: 16 }}>{I.WA}</span>Rejoindre le groupe
                </button>
            </div>

            <button className="btn btn-dark" style={{ width: "100%", justifyContent: "center", padding: "13px 0", fontSize: 14 }} onClick={handleFinishSession}>
                Terminer la session — Quiz de validation
            </button>
        </div>
    );
}
