import { useEffect, useState, useRef } from "react";
import { I } from "../utils/icons.jsx";
import { useApp } from "../context/AppContext.jsx";
import { useToast } from "../components/ToastProvider.jsx";
import { LEADERBOARD } from "../data/leaderboard.js";

function getGreeting() {
    const h = new Date().getHours();
    if (h < 12) return "Bonjour";
    if (h < 18) return "Bon après-midi";
    return "Bonsoir";
}

// Animated counter hook
function useCountUp(target, duration = 900) {
    const [val, setVal] = useState(0);
    useEffect(() => {
        let start = 0;
        const step = () => {
            start += target / (duration / 16);
            if (start >= target) { setVal(target); return; }
            setVal(Math.floor(start));
            requestAnimationFrame(step);
        };
        const t = setTimeout(() => requestAnimationFrame(step), 300);
        return () => clearTimeout(t);
    }, [target, duration]);
    return val;
}

// Live online counter
function useLiveCount(base = 24) {
    const [count, setCount] = useState(base);
    useEffect(() => {
        const t = setInterval(() => {
            setCount(c => c + Math.floor(Math.random() * 3) - 1);
        }, 4000);
        return () => clearInterval(t);
    }, []);
    return Math.max(18, count);
}

const QUIZ_QUESTIONS = [
    { q: "Quelle est la complexité temporelle moyenne d'une recherche binaire ?", opts: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], ans: 2 },
    { q: "Lequel de ces langages est principalement utilisé pour le développement système ?", opts: ["JavaScript", "Python", "C++", "PHP"], ans: 2 },
    { q: "Qu'est-ce qu'une clé primaire dans une base de données ?", opts: ["Un identifiant unique pour chaque ligne", "La première colonne d'un tableau", "Un mot de passe", "Une clé pour ouvrir la base"], ans: 0 },
];

export default function DashboardPage({ setPage }) {
    const { alerts, acceptAlert, dismissAlert, acceptedAlerts, userPoints, currentUser } = useApp();
    const toast = useToast();
    const top3 = LEADERBOARD.slice(0, 3);
    
    // Safety check for numerical values
    const pointsSafe = Number(userPoints) || 0;
    const pts = useCountUp(pointsSafe);
    
    // User info from profile
    const fullName = currentUser?.full_name || "Étudiant";
    const filiere = currentUser?.filiere || "Non renseignée";
    const level = currentUser?.level || "";

    const sessions = useCountUp(4, 600);
    const launched = useCountUp(3, 750);
    const online = useLiveCount(24);
    
    // Filter alerts: current user identified by full_name or id
    const myAlerts = alerts.filter(a => a.author === "Moi" || a.author === fullName).slice(0, 3);
    const recentAlerts = alerts.filter(a => a.author !== "Moi" && a.author !== fullName).slice(0, 3);

    const [modalAlert, setModalAlert] = useState(null);
    const [quizState, setQuizState] = useState({ active: false, step: 0, score: 0, finished: false });

    // Reset quiz when modal changes
    useEffect(() => {
        if (!modalAlert) setQuizState({ active: false, step: 0, score: 0, finished: false });
    }, [modalAlert]);

    const handleConfirmJoin = (role) => {
        if (role === "expert") {
            setQuizState({ active: true, step: 0, score: 0, finished: false });
        } else {
            acceptAlert(modalAlert.id, role, () => {
                toast(`Vous avez rejoint la session "${modalAlert.notion}" — Préparez-vous !`, "success");
            });
            setModalAlert(null);
        }
    };

    const handleQuizAnswer = (idx) => {
        const isCorrect = idx === QUIZ_QUESTIONS[quizState.step].ans;
        const newScore = isCorrect ? quizState.score + 1 : quizState.score;
        
        if (quizState.step < 2) {
            setQuizState({ ...quizState, step: quizState.step + 1, score: newScore });
        } else {
            if (newScore >= 2) {
                acceptAlert(modalAlert.id, "expert", () => {
                    toast(`Excellent ! Tu as validé ton niveau.`, "success");
                });
            }
            setQuizState({ ...quizState, finished: true, score: newScore });
        }
    };

    const handleLearnerJoinAfterFail = () => {
        acceptAlert(modalAlert.id, "learner", () => {
            toast(`Session rejointe en tant qu'Apprenant.`, "success");
        });
        setModalAlert(null);
    };

    return (
        <div style={{ animation: "fadeIn .3s ease" }}>
            {/* ROLE MODAL */}
            {modalAlert && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(7,21,58,.6)", backdropFilter: "blur(4px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
                    <div className="card" style={{ maxWidth: 440, width: "100%", padding: 28, animation: "rise .4s ease" }}>
                        {!quizState.active ? (
                            <>
                                <div style={{ textAlign: "center", marginBottom: 24 }}>
                                    <div style={{ fontSize: 32, marginBottom: 12 }}>🤝</div>
                                    <h3 style={{ fontFamily: "DM Serif Display,serif", fontSize: 22, color: "var(--t1)", marginBottom: 8 }}>Rejoindre la session</h3>
                                    <p style={{ fontSize: 14, color: "var(--t3)" }}>Choisissez votre rôle pour l'aide sur "<strong>{modalAlert.notion}</strong>"</p>
                                </div>

                                {/* Expert Rule Check */}
                                {!(modalAlert.expert || (modalAlert.taken < modalAlert.spots - 1)) && (
                                    <div style={{ background: "var(--warn-bg)", border: "1px solid var(--warn-line)", borderRadius: "var(--r8)", padding: 12, marginBottom: 18, fontSize: 13, color: "var(--warn)" }}>
                                        ⚠️ <strong>Expert requis :</strong> C'est la dernière place et aucun expert n'est encore présent. Vous devez maîtriser la notion.
                                    </div>
                                )}

                                <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                                    <button className="btn btn-primary" style={{ justifyContent: "flex-start", padding: "16px 20px", borderRadius: "var(--r12)", height: "auto" }} onClick={() => handleConfirmJoin("expert")}>
                                        <div style={{ textAlign: "left" }}>
                                            <div style={{ fontWeight: 700, fontSize: 15 }}>Je suis Expert</div>
                                            <div style={{ fontSize: 12, opacity: .8, fontWeight: 400 }}>Je maîtrise cette notion et je peux l'expliquer</div>
                                        </div>
                                    </button>
                                    
                                    <button 
                                        className="btn btn-ghost" 
                                        style={{ justifyContent: "flex-start", padding: "16px 20px", borderRadius: "var(--r12)", height: "auto" }} 
                                        disabled={!(modalAlert.expert || (modalAlert.taken < modalAlert.spots - 1))}
                                        onClick={() => handleConfirmJoin("learner")}
                                    >
                                        <div style={{ textAlign: "left" }}>
                                            <div style={{ fontWeight: 700, fontSize: 15 }}>Je suis Aidant / Apprenant</div>
                                            <div style={{ fontSize: 12, color: "var(--t3)", fontWeight: 400 }}>J'ai compris globalement mais j'ai des doutes</div>
                                        </div>
                                    </button>
                                </div>

                                <button className="btn btn-ghost btn-sm" style={{ width: "100%", border: "none" }} onClick={() => setModalAlert(null)}>Annuler</button>
                            </>
                        ) : !quizState.finished ? (
                            <div>
                                <div style={{ textAlign: "center", marginBottom: 24 }}>
                                    <div style={{ fontSize: 12, color: "var(--t4)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em", marginBottom: 8 }}>Vérification Expert · {quizState.step + 1} / 3</div>
                                    <h3 style={{ fontWeight: 700, fontSize: 17, color: "var(--t1)", lineHeight: 1.4 }}>{QUIZ_QUESTIONS[quizState.step].q}</h3>
                                </div>
                                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                    {QUIZ_QUESTIONS[quizState.step].opts.map((o, i) => (
                                        <button key={i} className="qopt" onClick={() => handleQuizAnswer(i)}>{o}</button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div style={{ textAlign: "center" }}>
                                {quizState.score >= 2 ? (
                                    <>
                                        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                                        <h3 style={{ fontFamily: "DM Serif Display,serif", fontSize: 24, color: "var(--t1)", marginBottom: 12 }}>Excellent !</h3>
                                        <p style={{ fontSize: 15, color: "var(--t3)", marginBottom: 28, lineHeight: 1.6 }}>Tu as validé ton niveau. Tu peux rejoindre la session en tant qu'Expert.</p>
                                        <a href={modalAlert.whatsapp || "https://whatsapp.com"} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px 0", textDecoration: "none" }} onClick={() => setModalAlert(null)}>
                                            Accéder au groupe WhatsApp
                                        </a>
                                    </>
                                ) : (
                                    <>
                                        <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
                                        <h3 style={{ fontFamily: "DM Serif Display,serif", fontSize: 24, color: "var(--t1)", marginBottom: 12 }}>Niveau insuffisant</h3>
                                        <p style={{ fontSize: 15, color: "var(--t3)", marginBottom: 28, lineHeight: 1.6 }}>
                                            Tu as répondu à {quizState.score}/3 questions correctement. Tu n'as pas encore le niveau Expert sur ce sujet. Pas de panique — tout le monde progresse !
                                        </p>
                                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                            <button className="btn btn-dark" style={{ width: "100%", justifyContent: "center", padding: "14px 0" }} onClick={handleLearnerJoinAfterFail}>Rejoindre en tant qu'Apprenant</button>
                                            <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }} onClick={() => setModalAlert(null)}>Abandonner</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── WELCOME BANNER ─────────────────────────── */}
            <div style={{
                background: "linear-gradient(130deg, var(--b900) 0%, var(--b700) 55%, var(--b500) 100%)",
                padding: "32px 36px 40px",
                position: "relative",
                overflow: "hidden",
            }}>
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .06, pointerEvents: "none" }} viewBox="0 0 800 200">
                    {[0, 100, 200, 300, 400, 500, 600, 700, 800].map(x => <line key={x} x1={x} y1="0" x2={x} y2="200" stroke="white" strokeWidth=".6" />)}
                    {[0, 50, 100, 150, 200].map(y => <line key={y} x1="0" y1={y} x2="800" y2={y} stroke="white" strokeWidth=".6" />)}
                </svg>

                <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 28 }}>
                    <div>
                        <div style={{ fontSize: 13, color: "rgba(255,255,255,.5)", fontWeight: 600, letterSpacing: ".04em", textTransform: "uppercase", marginBottom: 6 }}>
                            {getGreeting()}, {(currentUser?.full_name || "Étudiant").split(" ")[0]} 👋
                        </div>
                        <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 30, color: "white", lineHeight: 1.2, marginBottom: 8 }}>
                            Tableau de bord
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ fontSize: 13.5, color: "rgba(255,255,255,.55)" }}>
                                {filiere} · {level} · IFRI/UAC
                            </div>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, color: "rgba(255,255,255,.4)", borderLeft: "1px solid rgba(255,255,255,.15)", paddingLeft: 10 }}>
                                <span style={{ width: 7, height: 7, background: "#4ade80", borderRadius: "50%", display: "inline-block", animation: "pulseDot 2s infinite" }} />
                                {online} étudiants en ligne
                            </span>
                        </div>
                    </div>
                </div>

                {/* Animated stats - 4 columns */}
                <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
                    {[
                        [I.Trophy, pts, "Points totaux", "var(--b200)"],
                        [I.Users, sessions, "Sessions aidées", "rgba(255,255,255,.5)"],
                        [I.Zap, launched, "Alertes lancées", "rgba(255,255,255,.5)"],
                    ].map(([ic, v, l, iconCol]) => (
                        <div key={l} style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", borderRadius: "var(--r12)", padding: "16px 18px", backdropFilter: "blur(10px)" }}>
                            <div style={{ width: 20, height: 20, color: iconCol, marginBottom: 10 }}>{ic}</div>
                            <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 30, color: "white", transition: "all .3s" }}>{v}</div>
                            <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.45)", marginTop: 3 }}>{l}</div>
                        </div>
                    ))}
                    {/* Badge Stat Card */}
                    <div style={{ background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.12)", borderRadius: "var(--r12)", padding: "16px 18px", backdropFilter: "blur(10px)" }}>
                        <div style={{ width: 20, height: 20, color: "#60a5fa", marginBottom: 10 }}>⚡</div>
                        <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 24, color: "white", transition: "all .3s" }}>
                            {pointsSafe >= 300 ? "Mentor" : pointsSafe >= 150 ? "Expert" : pointsSafe >= 50 ? "Actif" : "Novice"}
                        </div>
                        <div style={{ fontSize: 12.5, color: "rgba(255,255,255,.45)", marginTop: 3 }}>{pointsSafe} / {pointsSafe >= 300 ? 500 : pointsSafe >= 150 ? 300 : pointsSafe >= 50 ? 150 : 50} pts</div>
                        <div className="prog" style={{ height: 4, background: "rgba(255,255,255,.1)", marginTop: 8 }}>
                            <div className="prog-fill" style={{ width: `${(pointsSafe / (pointsSafe >= 300 ? 500 : pointsSafe >= 150 ? 300 : pointsSafe >= 50 ? 150 : 50)) * 100}%`, background: "#60a5fa" }} />
                        </div>
                    </div>
                </div>

                <svg viewBox="0 0 800 36" style={{ position: "absolute", bottom: -1, left: 0, right: 0, width: "100%", fill: "var(--s1)" }}>
                    <path d="M0,18 C200,36 600,0 800,18 L800,36 L0,36 Z" />
                </svg>
            </div>

            {/* ── RESTRUCTURED GRID BODY ────────────────── */}
            <div style={{ padding: "28px 24px", display: "grid", gridTemplateColumns: "1fr 320px", gap: 22, alignItems: "start" }}>

                {/* LEFT COLUMN */}
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>

                    {/* Progress */}
                    <div className="card a2" style={{ padding: 22 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                            <div>
                                <div style={{ fontWeight: 700, fontSize: 15, color: "var(--t1)", marginBottom: 2 }}>Progression vers {pointsSafe >= 150 ? "Mentor" : pointsSafe >= 50 ? "Expert" : "Actif"}</div>
                                <div style={{ fontSize: 13, color: "var(--t3)" }}>{pointsSafe} / {pointsSafe >= 150 ? 300 : pointsSafe >= 50 ? 150 : 50} points</div>
                            </div>
                            <div className={`bdg ${pointsSafe >= 300 ? "bdg-mentor" : pointsSafe >= 150 ? "bdg-expert" : pointsSafe >= 50 ? "bdg-actif" : "bdg-novice"}`}>
                                {pointsSafe >= 300 ? "Mentor" : pointsSafe >= 150 ? "Expert" : pointsSafe >= 50 ? "Actif" : "Novice"}
                            </div>
                        </div>
                        <div className="prog"><div className="prog-fill" style={{ width: `${(pointsSafe / (pointsSafe >= 300 ? 500 : pointsSafe >= 150 ? 300 : pointsSafe >= 50 ? 150 : 50)) * 100}%`, transition: "width 1s ease" }} /></div>
                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 7, fontSize: 11.5, color: "var(--t4)" }}>
                            <span>Novice · 0</span>
                            <span style={{ color: "var(--b500)", fontWeight: 600 }}>{pointsSafe} pts ←</span>
                            <span>{pointsSafe >= 150 ? "Mentor · 300" : pointsSafe >= 50 ? "Expert · 150" : "Actif · 50"}</span>
                        </div>
                    </div>

                    {/* Recent alerts — INTERACTIVE */}
                    <div className="a3">
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div style={{ fontWeight: 700, fontSize: 15.5, color: "var(--t1)" }}>Alertes disponibles</div>
                                <span style={{ background: "var(--b100)", color: "var(--b600)", padding: "2px 9px", borderRadius: "var(--rpill)", fontSize: 12, fontWeight: 700 }}>{alerts.filter(a => a.author !== "Moi").length}</span>
                            </div>
                            <span style={{ fontSize: 13, color: "var(--b400)", cursor: "pointer", fontWeight: 600 }} onClick={() => setPage("alerts")}>Voir tout →</span>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {recentAlerts.map((a, i) => (
                                <div key={a.id} className="ac" style={{ opacity: 0, animation: `fadeUp .4s ${i * .07}s ease both` }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                                        <div>
                                            <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 8 }}>
                                                <div className="tag tag-blue">{a.subject}</div>
                                                {a.urgent && <div className="tag tag-red">Urgent</div>}
                                                {a.expert && <div className="tag tag-green">Expert ✓</div>}
                                            </div>
                                            <div style={{ fontWeight: 700, fontSize: 15, color: "var(--t1)", marginBottom: 2 }}>{a.notion}</div>
                                            <div style={{ fontSize: 12.5, color: "var(--t3)" }}>{a.type}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", gap: 12, fontSize: 12, color: "var(--t4)", marginBottom: 12 }}>
                                        <span>🕐 {a.time}</span><span>👥 {a.taken}/{a.spots}</span><span>{a.level} · {a.filiere}</span>
                                    </div>
                                    {acceptedAlerts.has(a.id) ? (
                                        <div style={{ background: "var(--success-bg)", border: "1px solid var(--success-line)", borderRadius: "var(--r8)", padding: "8px 14px", fontSize: 13, color: "var(--success)", fontWeight: 600 }}>
                                            ✓ Session rejointe
                                        </div>
                                    ) : (
                                        <div style={{ display: "flex", gap: 8 }}>
                                            <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: "center" }} onClick={() => setModalAlert(a)}>Accepter</button>
                                            <button className="btn btn-ghost btn-sm" onClick={() => { dismissAlert(a.id); toast("Alerte ignorée", "info", 2000); }}>Ignorer</button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN */}
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {/* Quick actions - NOW AT THE TOP */}
                    <div className="card a4" style={{ padding: 18, borderTop: "2px solid var(--b800)" }}>
                        <div style={{ fontWeight: 700, fontSize: 14, color: "var(--t1)", marginBottom: 12 }}>Actions rapides</div>
                        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                            {[
                                [I.Plus, "Lancer une alerte", "launch", "btn-dark"],
                                [I.History, "Voir l'historique", "history", "btn-ghost"],
                                [I.Bell, "Notifications", "notifs", "btn-ghost"],
                            ].map(([ic, label, p, cls]) => (
                                <button key={label} className={`btn ${cls} btn-sm`} style={{ justifyContent: "flex-start", gap: 10 }} onClick={() => setPage(p)}>
                                    <span style={{ width: 15, height: 15 }}>{ic}</span>{label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Mini leaderboard */}
                    <div className="card a3" style={{ padding: 18 }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--t1)" }}>🏆 Top 3 communauté</div>
                            <span style={{ fontSize: 12, color: "var(--b400)", cursor: "pointer", fontWeight: 600 }} onClick={() => setPage("leaderboard")}>Voir →</span>
                        </div>
                        {top3.map((u, i) => (
                            <div key={u.rank} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 0", borderBottom: i < 2 ? "1px solid var(--line)" : "none" }}>
                                <div style={{ width: 22, fontFamily: "DM Serif Display,serif", fontSize: 14, color: i === 0 ? "var(--b500)" : "var(--t4)", textAlign: "center", flexShrink: 0 }}>{u.rank}</div>
                                <div className="av" style={{ width: 30, height: 30, fontSize: 11, flexShrink: 0 }}>{u.name[0] + u.name.split(" ")[1][0]}</div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                    <div style={{ fontWeight: 600, fontSize: 12.5, color: "var(--t1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.name}</div>
                                    <div style={{ fontSize: 11, color: "var(--t4)" }}>{u.pts} pts</div>
                                </div>
                                <div className={`bdg ${u.badge === "mentor" ? "bdg-mentor" : u.badge === "expert" ? "bdg-expert" : "bdg-actif"}`} style={{ fontSize: 10 }}>
                                    {u.badge.charAt(0).toUpperCase() + u.badge.slice(1)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
