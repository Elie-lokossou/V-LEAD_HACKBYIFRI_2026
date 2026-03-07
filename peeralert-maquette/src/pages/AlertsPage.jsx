import { useState, useEffect } from "react";
import { I } from "../utils/icons.jsx";
import { useApp } from "../context/AppContext.jsx";
import { useToast } from "../components/ToastProvider.jsx";

const QUIZ_QUESTIONS = [
    { q: "Quelle est la complexité temporelle moyenne d'une recherche binaire ?", opts: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], ans: 2 },
    { q: "Lequel de ces langages est principalement utilisé pour le développement système ?", opts: ["JavaScript", "Python", "C++", "PHP"], ans: 2 },
    { q: "Qu'est-ce qu'une clé primaire dans une base de données ?", opts: ["Un identifiant unique pour chaque ligne", "La première colonne d'un tableau", "Un mot de passe", "Une clé pour ouvrir la base"], ans: 0 },
];

export default function AlertsPage({ setPage }) {
    const { alerts, acceptAlert, dismissAlert, acceptedAlerts, setActiveSession, currentUser } = useApp();
    const toast = useToast();
    const [tab, setTab] = useState("available"); 
    const [filter, setFilter] = useState("Tout");
    const [detail, setDetail] = useState(null);
    const [role, setRole] = useState("expert");
    const [quizAlert, setQuizAlert] = useState(null);
    const [quizState, setQuizState] = useState({ active: false, step: 0, score: 0, finished: false });
    const [confirmFinish, setConfirmFinish] = useState(null);
    
    // Utilisation systématique de currentUser
    const fullName = currentUser?.full_name ?? "Étudiant";
    const userId = currentUser?.id;

    // Identification des alertes de l'utilisateur (par nom ou par ID unique)
    const myAlerts = alerts.filter(a => 
        a.author === "Moi" || 
        a.author === fullName || 
        (a.user_id && a.user_id === userId) ||
        a.id === "demo-session-1"
    );

    const availableAlerts = alerts.filter(a => 
        a.author !== "Moi" && 
        a.author !== fullName && 
        (!a.user_id || a.user_id !== userId) &&
        a.id !== "demo-session-1"
    );

    const canJoinAsLearner = detail ? (detail.expert || (detail.taken < detail.spots - 1)) : true;

    useEffect(() => {
        if (!canJoinAsLearner) setRole("expert");
    }, [canJoinAsLearner]);

    const subjects = ["Tout", "Algorithmique", "Mathématiques", "Réseaux", "Prog. Web", "Physique", "Bases de données", "Cybersécurité"];
    const uniqueSubjects = subjects.filter(s => s === "Tout" || (tab === "available" ? availableAlerts : myAlerts).some(a => a.subject.startsWith(s)));
    const filtered = (tab === "available" ? availableAlerts : myAlerts).filter(a => filter === "Tout" || a.subject.startsWith(filter));

    const handleAccept = (a) => {
        if (role === "expert") {
            setQuizAlert(a);
            setQuizState({ active: true, step: 0, score: 0, finished: false });
        } else {
            acceptAlert(a.id, role, () => {
                toast(`Session rejointe — ${a.notion} 🎉`, "success");
            });
            setDetail(null);
        }
    };

    const handleQuizAnswer = (idx) => {
        const isCorrect = idx === QUIZ_QUESTIONS[quizState.step].ans;
        const newScore = isCorrect ? quizState.score + 1 : quizState.score;
        
        if (quizState.step < 2) {
            setQuizState({ ...quizState, step: quizState.step + 1, score: newScore });
        } else {
            if (newScore >= 2) {
                acceptAlert(quizAlert.id, "expert", () => {
                    toast(`Excellent ! Tu as validé ton niveau.`, "success");
                });
            }
            setQuizState({ ...quizState, finished: true, score: newScore });
        }
    };

    const handleLearnerJoinAfterFail = () => {
        acceptAlert(quizAlert.id, "learner", () => {
            toast(`Session rejointe en tant qu'Apprenant.`, "success");
        });
        setQuizAlert(null);
        setQuizState({ active: false, step: 0, score: 0, finished: false });
        setDetail(null);
    };

    const handleDismiss = (id) => {
        dismissAlert(id);
        toast("Alerte ignorée", "info", 2000);
        setDetail(null);
    };

    const triggerValidation = (a) => {
        setActiveSession({
            ...a,
            isValidation: true,
            role: a.role || "learner",
            notion: a.notion,
            subject: a.subject
        });
        setPage("quiz");
    };

    return (
        <div className="page-inner" style={{ animation: "fadeIn .3s ease" }}>
            {/* MODALS */}
            {confirmFinish && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(7,21,58,.6)", backdropFilter: "blur(4px)", zIndex: 1100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
                    <div className="card" style={{ maxWidth: 400, width: "100%", padding: 32, textAlign: "center", animation: "rise .4s ease" }}>
                        <div style={{ fontSize: 42, marginBottom: 16 }}>🏁</div>
                        <h3 style={{ fontFamily: "DM Serif Display,serif", fontSize: 22, color: "var(--t1)", marginBottom: 12 }}>La session est-elle terminée ?</h3>
                        <p style={{ fontSize: 14, color: "var(--t3)", marginBottom: 28, lineHeight: 1.6 }}>En confirmant, tu vas accéder au quiz de validation pour obtenir tes points.</p>
                        <div style={{ display: "flex", gap: 10 }}>
                            <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center" }} onClick={() => triggerValidation(confirmFinish)}>Confirmer</button>
                            <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => setConfirmFinish(null)}>Annuler</button>
                        </div>
                    </div>
                </div>
            )}

            {quizState.active && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(7,21,58,.6)", backdropFilter: "blur(4px)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
                    <div className="card" style={{ maxWidth: 440, width: "100%", padding: 28, animation: "rise .4s ease" }}>
                        {!quizState.finished ? (
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
                                <button className="btn btn-ghost btn-sm" style={{ width: "100%", border: "none", marginTop: 20 }} onClick={() => setQuizState({ active: false, step: 0, score: 0, finished: false })}>Annuler</button>
                            </div>
                        ) : (
                            <div style={{ textAlign: "center" }}>
                                {quizState.score >= 2 ? (
                                    <>
                                        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                                        <h3 style={{ fontFamily: "DM Serif Display,serif", fontSize: 24, color: "var(--t1)", marginBottom: 12 }}>Excellent !</h3>
                                        <p style={{ fontSize: 15, color: "var(--t3)", marginBottom: 28, lineHeight: 1.6 }}>Tu as validé ton niveau. Tu peux rejoindre la session en tant qu'Expert.</p>
                                        <a href={quizAlert.whatsapp || "https://whatsapp.com"} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px 0", textDecoration: "none" }} onClick={() => { setQuizState({ active: false, step: 0, score: 0, finished: false }); setDetail(null); }}>
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
                                            <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }} onClick={() => setQuizState({ active: false, step: 0, score: 0, finished: false })}>Abandonner</button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {detail ? (
                <div style={{ animation: "fadeIn .3s ease", maxWidth: 720, margin: "0 auto" }}>
                    <button className="btn btn-ghost btn-sm" style={{ marginBottom: 20 }} onClick={() => setDetail(null)}>
                        <span style={{ width: 14, height: 14 }}>{I.ChevL}</span>Retour aux alertes
                    </button>
                    <div className="card" style={{ padding: 28, marginBottom: 14 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                            <div>
                                <div style={{ display: "flex", gap: 8, marginBottom: 10, flexWrap: "wrap" }}>
                                    <div className="tag tag-blue">{detail.subject}</div>
                                    {detail.urgent && <div className="tag tag-red">🔴 Urgent</div>}
                                    {detail.expert && <div className="tag tag-green">✓ Expert confirmé</div>}
                                </div>
                                <h2 style={{ fontFamily: "DM Serif Display,serif", fontSize: 26, color: "var(--t1)", marginBottom: 6 }}>{detail.notion}</h2>
                                <div style={{ fontSize: 14, color: "var(--t3)" }}>{detail.type || "Aide académique"}</div>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                <div className="av" style={{ width: 44, height: 44, fontSize: 16 }}>
                                    {(detail.author || "User").split(" ").filter(Boolean).map(p => p[0]).join("").toUpperCase().slice(0, 2)}
                                </div>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: 13, color: "var(--t1)" }}>{detail.author}</div>
                                    <div style={{ fontSize: 12, color: "var(--t4)" }}>{detail.level} · {detail.filiere}</div>
                                </div>
                            </div>
                        </div>
                        <div className="divider" />
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                            {[["🕐 Créneau", detail.time], ["👥 Places", `${detail.taken}/${detail.spots} occupées`], ["🏫 Filière", detail.filiere], ["📚 Niveau", detail.level]].map(([l, v]) => (
                                <div key={l} style={{ background: "var(--s2)", borderRadius: "var(--r8)", padding: "12px 14px", border: "1px solid var(--line)" }}>
                                    <div style={{ fontSize: 11.5, color: "var(--t4)", fontWeight: 600, marginBottom: 3, textTransform: "uppercase", letterSpacing: ".05em" }}>{l}</div>
                                    <div style={{ fontWeight: 600, fontSize: 14, color: "var(--t1)" }}>{v}</div>
                                </div>
                            ))}
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <label className="lbl">Je rejoins en tant que</label>
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                                <label onClick={() => setRole("expert")} style={{ cursor: "pointer", display: "flex", gap: 10, padding: "14px", border: role === "expert" ? "2.5px solid var(--success-line)" : "1.5px solid var(--line)", borderRadius: "var(--r12)", alignItems: "flex-start", background: role === "expert" ? "var(--success-bg)" : "white" }}>
                                    <input type="radio" name="role" checked={role === "expert"} onChange={() => setRole("expert")} style={{ marginTop: 2 }} />
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 13.5, color: role === "expert" ? "var(--success)" : "var(--t1)" }}>Aidant expert</div>
                                        <div style={{ fontSize: 12, color: role === "expert" ? "var(--success)" : "var(--t3)", opacity: .8, marginTop: 2 }}>Je maîtrise cette notion</div>
                                    </div>
                                </label>
                                <label onClick={() => canJoinAsLearner && setRole("learner")} style={{ cursor: "pointer", display: "flex", gap: 10, padding: "14px", border: role === "learner" ? "2.5px solid var(--b400)" : "1.5px solid var(--line)", borderRadius: "var(--r12)", alignItems: "flex-start", background: role === "learner" ? "var(--b050)" : "white", opacity: canJoinAsLearner ? 1 : 0.5 }}>
                                    <input type="radio" name="role" checked={role === "learner"} onChange={() => setRole("learner")} disabled={!canJoinAsLearner} style={{ marginTop: 2 }} />
                                    <div>
                                        <div style={{ fontWeight: 700, fontSize: 13.5, color: role === "learner" ? "var(--b600)" : "var(--t1)" }}>Aidant apprenant</div>
                                        <div style={{ fontSize: 12, color: role === "learner" ? "var(--b600)" : "var(--t3)", marginTop: 2 }}>Aide partielle possible</div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        {acceptedAlerts.has(detail.id) ? (
                            <div style={{ background: "var(--success-bg)", border: "1px solid var(--success-line)", borderRadius: "var(--r8)", padding: "14px", textAlign: "center", fontSize: 14, color: "var(--success)", fontWeight: 700 }}>
                                ✓ Vous avez déjà rejoint cette session
                            </div>
                        ) : (
                            <div style={{ display: "flex", gap: 10 }}>
                                <button className="btn btn-primary" style={{ flex: 1, justifyContent: "center", padding: "13px 0", fontSize: 14.5 }} onClick={() => handleAccept(detail)}>
                                    Rejoindre la session →
                                </button>
                                <button className="btn btn-ghost" style={{ padding: "13px 18px" }} onClick={() => handleDismiss(detail.id)}>
                                    Ignorer
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <>
                    {/* TABS & FILTERS */}
                    <div style={{ display: "flex", background: "var(--s2)", padding: 4, borderRadius: "var(--r12)", marginBottom: 28, width: "fit-content" }}>
                        <button onClick={() => { setTab("available"); setFilter("Tout"); }} style={{ padding: "10px 24px", borderRadius: "var(--r10)", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", background: tab === "available" ? "white" : "transparent", color: tab === "available" ? "var(--t1)" : "var(--t4)", boxShadow: tab === "available" ? "var(--sh-sm)" : "none", transition: ".2s", display: "flex", alignItems: "center", gap: 10 }}>
                            Disponibles <span style={{ background: tab === "available" ? "var(--b100)" : "var(--line)", color: tab === "available" ? "var(--b600)" : "var(--t4)", padding: "2px 8px", borderRadius: 20, fontSize: 11 }}>{availableAlerts.length}</span>
                        </button>
                        <button onClick={() => { setTab("mine"); setFilter("Tout"); }} style={{ padding: "10px 24px", borderRadius: "var(--r10)", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", background: tab === "mine" ? "white" : "transparent", color: tab === "mine" ? "var(--t1)" : "var(--t4)", boxShadow: tab === "mine" ? "var(--sh-sm)" : "none", transition: ".2s", display: "flex", alignItems: "center", gap: 10 }}>
                            Lancées <span style={{ background: tab === "mine" ? "var(--b100)" : "var(--line)", color: tab === "mine" ? "var(--b600)" : "var(--t4)", padding: "2px 8px", borderRadius: 20, fontSize: 11 }}>{myAlerts.length}</span>
                        </button>
                    </div>

                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 22 }}>
                        <div>
                            <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 28, color: "var(--t1)" }}>
                                {tab === "available" ? "Alertes disponibles" : "Mes alertes lancées"}
                            </div>
                            <div style={{ fontSize: 14, color: "var(--t3)", marginTop: 4 }}>
                                {tab === "available" 
                                    ? "Aidez vos pairs et gagnez des points d'expertise" 
                                    : "Suivez l'état de vos demandes d'entraide"}
                            </div>
                        </div>
                        <button className="btn btn-dark btn-sm" onClick={() => setPage("launch")}>
                            <span style={{ width: 14, height: 14 }}>{I.Plus}</span>Lancer une alerte
                        </button>
                    </div>

                    <div className="chips-row a2" style={{ marginBottom: 22 }}>
                        {uniqueSubjects.map(s => (
                            <button key={s} className={`chip${filter === s ? " on" : ""}`} onClick={() => setFilter(s)}>{s}</button>
                        ))}
                    </div>

                    {filtered.length === 0 ? (
                        <div className="card" style={{ padding: 60, textAlign: "center" }}>
                            <div style={{ fontSize: 48, marginBottom: 16 }}>{tab === "available" ? "🔍" : "📋"}</div>
                            <div style={{ fontWeight: 700, fontSize: 18, color: "var(--t1)", marginBottom: 8 }}>
                                {tab === "available" ? "Aucune alerte pour cette matière" : "Tu n'as pas encore lancé d'alerte"}
                            </div>
                            <button className="btn btn-dark" style={{ justifyContent: "center", margin: "0 auto" }} onClick={() => setPage("launch")}>
                                Lancer une alerte
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 14 }}>
                            {filtered.map((a, i) => {
                                const accepted = acceptedAlerts.has(a.id);
                                const isActive = a.taken >= a.spots || a.status === "active";

                                return (
                                    <div key={a.id} className="ac" style={{ opacity: 0, animation: `fadeUp .4s ${Math.min(i, .6) * .1}s ease both`, display: "flex", flexDirection: "column" }} onClick={() => tab === "available" && !accepted && setDetail(a)}>
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                                            <div>
                                                <div style={{ fontSize: 12, color: "var(--b500)", fontWeight: 700, marginBottom: 4 }}>{a.subject}</div>
                                                <div style={{ fontWeight: 700, fontSize: 17, color: "var(--t1)" }}>{a.notion}</div>
                                            </div>
                                            <div className={`bdg ${isActive ? "bdg-actif" : "bdg-novice"}`} style={{ padding: "4px 10px" }}>
                                                {isActive ? "Active ●" : "En attente"}
                                            </div>
                                        </div>
                                        <div style={{ display: "flex", gap: 12, fontSize: 12.5, color: "var(--t4)", marginBottom: 18 }}>
                                            <span>👥 {a.taken}/{a.spots} inscrits</span>
                                            <span>🕐 {a.time}</span>
                                        </div>
                                        {tab === "mine" ? (
                                            <div style={{ marginTop: "auto" }}>
                                                {isActive ? (
                                                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                                        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", background: "var(--success)", borderColor: "var(--success-line)" }} onClick={() => setConfirmFinish(a)}>
                                                            ✅ Valider la session
                                                        </button>
                                                        <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }} onClick={() => setPage("session")}>Voir la session →</button>
                                                    </div>
                                                ) : (
                                                    <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }} onClick={() => { dismissAlert(a.id); toast("Alerte annulée", "info"); }}>Annuler l'alerte</button>
                                                )}
                                            </div>
                                        ) : (
                                            accepted && (
                                                <div style={{ background: "var(--success-bg)", border: "1px solid var(--success-line)", borderRadius: "var(--r8)", padding: "8px 14px", fontSize: 13, color: "var(--success)", fontWeight: 600, textAlign: "center", marginTop: "auto" }}>
                                                    ✓ Session rejointe
                                                </div>
                                            )
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
