import { useState, useEffect } from "react";
import { I } from "../utils/icons.jsx";
import { useApp } from "../context/AppContext.jsx";
import { useToast } from "../components/ToastProvider.jsx";

const joinQuizExpert = [
    { q: "Quelle est la complexité temporelle moyenne d'une recherche binaire ?", opts: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], ans: 2 },
    { q: "Lequel de ces langages est principalement utilisé pour le développement système ?", opts: ["JavaScript", "Python", "C++", "PHP"], ans: 2 },
    { q: "Qu'est-ce qu'une clé primaire dans une base de données ?", opts: ["Un identifiant unique pour chaque ligne", "La première colonne d'un tableau", "Un mot de passe", "Une clé pour ouvrir la base"], ans: 0 },
];

const validationQuizApprenant = [
    { q: "Qu'est-ce qu'une fonction récursive ?", opts: ["Une fonction qui s'appelle elle-même", "Une fonction qui ne finit jamais", "Une fonction sans paramètres", "Une fonction mathématique uniquement"], ans: 0 },
    { q: "Pourquoi le 'cas de base' est-il indispensable ?", opts: ["Pour accélérer le calcul", "Pour éviter une boucle infinie", "Pour définir le nom de la fonction", "C'est optionnel"], ans: 1 },
    { q: "Dans quel cas la récursion est-elle souvent utilisée ?", opts: ["Parcourir une liste simple", "Structures arborescentes (arbres, graphes)", "Additionner deux nombres", "Afficher du texte"], ans: 1 },
];

const validationQuizExpert = [
    { q: "Quelle est la différence entre récursion terminale et non-terminale ?", opts: ["L'une utilise plus de mémoire", "L'appel récursif est la dernière opération", "L'une est itérative", "Aucune différence"], ans: 1 },
    { q: "Comment le compilateur optimise-t-il une récursion terminale ?", opts: ["Il la transforme en boucle", "Il utilise un thread séparé", "Il ignore la fonction", "Il double la pile"], ans: 0 },
    { q: "Quelle structure de données est implicitement utilisée pour la récursion ?", opts: ["Une file (FIFO)", "Une pile (LIFO)", "Un arbre", "Un graphe"], ans: 1 },
    { q: "Quelle est la complexité spatiale d'une récursion sans optimisation terminale ?", opts: ["O(1)", "O(log N)", "O(N)", "O(N²)"], ans: 2 },
    { q: "Quel est le risque majeur d'une récursion trop profonde ?", opts: ["Dépassement de pile (Stack Overflow)", "Fuite de mémoire", "Division par zéro", "Erreur de segmentation"], ans: 0 },
];

export default function QuizPage({ setPage }) {
    const { activeSession, confirmActiveSession, setActiveSession, addPoints } = useApp();
    const toast = useToast();
    
    const isValidation = activeSession?.isValidation;
    const role = activeSession?.role;

    const [q, setQ] = useState(0);
    const [sel, setSel] = useState(null);
    const [revealed, setRevealed] = useState(false);
    const [score, setScore] = useState(0);
    const [done, setDone] = useState(false);
    const [timer, setTimer] = useState(30);

    const quiz = isValidation 
        ? (role === "expert" ? validationQuizExpert : validationQuizApprenant)
        : joinQuizExpert;

    useEffect(() => {
        if (!activeSession || (!isValidation && role !== "expert") || done || revealed) return;
        const t = setInterval(() => setTimer(p => {
            if (p <= 1) { setRevealed(true); return 0; }
            return p - 1;
        }), 1000);
        return () => clearInterval(t);
    }, [activeSession, q, done, revealed, isValidation, role]);

    const confirm = () => { if (sel === quiz[q].ans) setScore(s => s + 1); setRevealed(true); };
    
    const next = () => {
        if (q < quiz.length - 1) { 
            setQ(q + 1); setSel(null); setRevealed(false); setTimer(30); 
        } else { 
            setDone(true); 
            if (!isValidation) confirmActiveSession();
        }
    };

    if (!activeSession) {
        setTimeout(() => setPage("dashboard"), 0);
        return null;
    }

    if (!isValidation && role !== "expert") {
        return (
            <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
                <div style={{ maxWidth: 420, width: "100%" }}>
                    <div className="card ar" style={{ padding: 32, textAlign: "center" }}>
                        <div style={{ width: 64, height: 64, borderRadius: "50%", background: "var(--success-bg)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--success)", margin: "0 auto 20px" }}>
                            <span style={{ width: 32, height: 32 }}>{I.Check}</span>
                        </div>
                        <h2 style={{ fontFamily: "DM Serif Display,serif", fontSize: 24, color: "var(--t1)", marginBottom: 12 }}>Tu es inscrit !</h2>
                        <p style={{ fontSize: 14, color: "var(--t3)", marginBottom: 28, lineHeight: 1.6 }}>Ta présence est confirmée pour la session sur "<strong>{activeSession.notion}</strong>". Rejoins maintenant le groupe WhatsApp pour discuter avec l'expert.</p>
                        
                        <a href="https://whatsapp.com" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px 0", marginBottom: 12, textDecoration: "none" }} onClick={confirmActiveSession}>
                             Rejoindre le groupe WhatsApp
                        </a>
                        <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }} onClick={() => setPage("dashboard")}>Retour au tableau de bord</button>
                    </div>
                </div>
            </div>
        );
    }

    if (done) {
        let pts = 0;
        if (isValidation) {
            if (role === "expert") {
                const map = { 5: 60, 4: 50, 3: 35, 2: 20, 1: 10, 0: 0 };
                pts = map[score] || 0;
            } else {
                const map = { 3: 30, 2: 20, 1: 10, 0: 0 };
                pts = map[score] || 0;
            }
        }

        const handleFinishValidation = () => {
            if (isValidation && pts > 0) {
                addPoints(pts);
                toast(`🎉 +${pts} points ajoutés !`, "success");
            }
            setActiveSession(null);
            setPage("dashboard");
        };

        return (
            <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
                <div style={{ maxWidth: 420, width: "100%" }}>
                    <div className="card ar" style={{ padding: 32, textAlign: "center" }}>
                        {isValidation ? (
                            <>
                                <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 24, color: "var(--t1)", marginBottom: 12 }}>Session validée !</div>
                                <div style={{ fontSize: 14, color: "var(--t3)", marginBottom: 18 }}>Score au quiz : {score}/{quiz.length}</div>
                                <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 48, color: "var(--b500)", marginBottom: 8 }}>+{pts}</div>
                                <div style={{ fontSize: 13, color: "var(--t3)", marginBottom: 24 }}>Points d'apprentissage ajoutés à ton profil.</div>
                                <button className="btn btn-dark" style={{ width: "100%", justifyContent: "center", padding: "12px 0" }} onClick={handleFinishValidation}>Terminer</button>
                            </>
                        ) : (
                            <>
                                {score >= 2 ? (
                                    <>
                                        <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
                                        <h3 style={{ fontFamily: "DM Serif Display,serif", fontSize: 24, color: "var(--t1)", marginBottom: 12 }}>Excellent !</h3>
                                        <p style={{ fontSize: 15, color: "var(--t3)", marginBottom: 28, lineHeight: 1.6 }}>Tu as validé ton niveau. Tu peux rejoindre la session en tant qu'Expert.</p>
                                        <a href={activeSession.whatsapp || "https://whatsapp.com"} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "14px 0", textDecoration: "none" }} onClick={() => setPage("dashboard")}>
                                            Accéder au groupe WhatsApp
                                        </a>
                                    </>
                                ) : (
                                    <>
                                        <div style={{ fontSize: 48, marginBottom: 16 }}>⏳</div>
                                        <h3 style={{ fontFamily: "DM Serif Display,serif", fontSize: 24, color: "var(--t1)", marginBottom: 12 }}>Niveau insuffisant</h3>
                                        <p style={{ fontSize: 15, color: "var(--t3)", marginBottom: 28, lineHeight: 1.6 }}>
                                            Tu as répondu à {score}/3 questions correctement. Tu n'as pas encore le niveau Expert sur ce sujet. Pas de panique — tout le monde progresse !
                                        </p>
                                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                            <button className="btn btn-dark" style={{ width: "100%", justifyContent: "center", padding: "14px 0" }} onClick={() => { setActiveSession({...activeSession, role: 'learner', confirmed: true}); setQ(0); setScore(0); setDone(false); setRevealed(false); setSel(null); }}>Rejoindre en tant qu'Apprenant</button>
                                            <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center" }} onClick={() => { setActiveSession(null); setPage("dashboard"); }}>Abandonner</button>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    const cur = quiz[q];
    return (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div style={{ maxWidth: 520, width: "100%" }}>
                <div style={{ textAlign: "center", marginBottom: 24 }}>
                    <h2 style={{ fontFamily: "DM Serif Display,serif", fontSize: 22, color: "var(--t1)" }}>
                        {isValidation ? "Quiz de validation" : "Mini-quiz Expert"}
                    </h2>
                    <p style={{ fontSize: 13, color: "var(--t3)" }}>
                        {isValidation ? "Vérifions ce que tu as retenu de cette session" : "Prouve ta maîtrise pour confirmer ta présence"}
                    </p>
                </div>
                <div className="a1" style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                        <span style={{ fontSize: 12.5, color: "var(--t3)", fontWeight: 600 }}>Question {q + 1} / {quiz.length}</span>
                        <span style={{ fontSize: 12.5, color: timer < 10 ? "var(--danger)" : "var(--t3)", fontWeight: 700 }}>{timer} s</span>
                    </div>
                    <div className="prog">
                        <div style={{ width: `${(timer / 30) * 100}%`, height: "100%", borderRadius: "var(--rpill)", background: timer < 10 ? "var(--danger)" : "var(--b400)", transition: "width 1s linear" }} />
                    </div>
                </div>
                <div className="card a2" style={{ padding: 26 }}>
                    <h3 style={{ fontWeight: 700, fontSize: 16.5, color: "var(--t1)", marginBottom: 20, lineHeight: 1.5 }}>{cur.q}</h3>
                    {cur.opts.map((o, i) => {
                        let cls = "qopt";
                        if (revealed) { if (i === cur.ans) cls += " ok"; else if (i === sel && i !== cur.ans) cls += " ko"; }
                        else if (i === sel) cls += " sel";
                        return <button key={i} className={cls} onClick={() => !revealed && setSel(i)}>{String.fromCharCode(65 + i)}. {o}</button>;
                    })}
                    {!revealed ? (
                        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px 0", marginTop: 4 }} onClick={confirm} disabled={sel === null}>Confirmer la réponse</button>
                    ) : (
                        <button className="btn btn-dark" style={{ width: "100%", justifyContent: "center", padding: "12px 0", marginTop: 4 }} onClick={next}>
                            {q < quiz.length - 1 ? "Question suivante" : (isValidation ? "Valider mes points" : "Confirmer ma présence")}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
