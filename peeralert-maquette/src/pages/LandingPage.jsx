import { useState, useEffect } from "react";
import { I } from "../utils/icons.jsx";

export default function LandingPage({ setPage }) {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 36);
        window.addEventListener("scroll", fn);
        return () => window.removeEventListener("scroll", fn);
    }, []);

    const features = [
        { icon: I.Zap, title: "Alertes en temps réel", desc: "Lancez une alerte académique en 30 secondes. Les pairs disponibles et compétents vous répondent immédiatement." },
        { icon: I.Users, title: "Matching intelligent", desc: "Algorithme par paliers : même filière, puis filières proches, puis niveaux supérieurs. Au moins un expert confirmé par session." },
        { icon: I.Trophy, title: "Gamification fondée", desc: "Les points ne sont attribués qu'après validation par quiz IA. Seule une aide réellement effectuée est récompensée." },
        { icon: I.Brain, title: "PeerBuddy", desc: "Compagnon de bien-être académique disponible 24h/7j. Stress, procrastination, burn-out : réponses empathiques et actionnables." },
        { icon: I.BarChart, title: "Intelligence pédagogique", desc: "Le tableau de bord institutionnel révèle les notions les plus problématiques. Renforcement ciblé des cours concernés." },
        { icon: I.Shield, title: "Sécurité & confidentialité", desc: "Données chiffrées, authentification sécurisée. Accès exclusif aux étudiants de l'établissement." },
    ];

    const steps = [
        { n: "01", t: "Créer votre profil", d: "Filière, niveau, disponibilités hebdomadaires. Deux minutes suffisent." },
        { n: "02", t: "Lancer une alerte", d: "Matière, notion précise, créneau, nombre de participants et lien WhatsApp de groupe." },
        { n: "03", t: "L'algorithme agit", d: "Les pairs disponibles et compétents reçoivent une notification ciblée. Au moins un expert par session est garanti." },
        { n: "04", t: "Session d'entraide", d: "Rejoignez le groupe WhatsApp ou la session en présentiel. L'aide arrive en moins de dix minutes." },
        { n: "05", t: "Validation par quiz IA", d: "À la clôture, quiz simultané pour l'apprenant et l'aidant. Les points reflètent les performances réelles." },
    ];

    return (
        <div style={{ background: scrolled ? "var(--white)" : "transparent", minHeight: "100vh" }}>
            {/* NAV */}
            <div style={{
                position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, transition: "all .3s",
                background: scrolled ? "rgba(255,255,255,.95)" : "transparent",
                backdropFilter: scrolled ? "blur(20px)" : "none",
                borderBottom: scrolled ? "1px solid var(--line)" : "none",
                padding: "16px 48px", display: "flex", alignItems: "center", justifyContent: "space-between"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 30, height: 30, background: scrolled ? "var(--b500)" : "rgba(255,255,255,.2)", borderRadius: "var(--r8)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .3s" }}>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                    </div>
                    <span style={{ fontFamily: "DM Serif Display,serif", fontSize: 19, color: scrolled ? "var(--t1)" : "white", letterSpacing: ".01em" }}>PeerAlert</span>
                </div>
                <div style={{ display: "flex", gap: 10 }}>
                    <button className={`btn ${scrolled ? "btn-ghost" : "btn-outline-w"}`} onClick={() => setPage("login")}>Connexion</button>
                    <button className={`btn ${scrolled ? "btn-dark" : "btn-white"}`} onClick={() => setPage("register")}>Commencer — gratuit</button>
                </div>
            </div>

            {/* HERO */}
            <div className="hero-bg" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden", paddingTop: 80 }}>
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .08, pointerEvents: "none" }} viewBox="0 0 1440 900">
                    <line x1="0" y1="300" x2="1440" y2="300" stroke="white" strokeWidth=".6" />
                    <line x1="0" y1="600" x2="1440" y2="600" stroke="white" strokeWidth=".6" />
                    <line x1="300" y1="0" x2="300" y2="900" stroke="white" strokeWidth=".6" />
                    <line x1="720" y1="0" x2="720" y2="900" stroke="white" strokeWidth=".6" />
                    <line x1="1140" y1="0" x2="1140" y2="900" stroke="white" strokeWidth=".6" />
                    <circle cx="720" cy="450" r="320" fill="none" stroke="white" strokeWidth=".8" />
                    <circle cx="720" cy="450" r="180" fill="none" stroke="white" strokeWidth=".5" />
                </svg>

                <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 48px 64px", position: "relative", zIndex: 1, textAlign: "center" }}>
                    <div className="a1" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", borderRadius: "var(--rpill)", padding: "6px 16px", color: "rgba(255,255,255,.8)", fontSize: 12.5, fontWeight: 500, marginBottom: 28, letterSpacing: ".03em" }}>
                        ⚡ Déjà 247 étudiants s'entraident sur PeerAlert
                    </div>
                    <h1 className="a2" style={{ fontFamily: "DM Serif Display,serif", fontSize: "clamp(38px,5.5vw,68px)", color: "white", lineHeight: 1.12, maxWidth: 820, marginBottom: 22, letterSpacing: "-.01em" }}>
                        Tu bloques sur un exercice ?<br />
                        <span style={{ fontStyle: "italic", color: "var(--b200)" }}>Un pair peut t'aider — maintenant.</span>
                    </h1>
                    <p className="a3" style={{ fontSize: "clamp(15px,1.8vw,18px)", color: "rgba(255,255,255,.65)", maxWidth: 580, lineHeight: 1.7, marginBottom: 40 }}>
                        PeerAlert connecte les étudiants de l'IFRI/UAC en temps réel. Lance une alerte en 30 secondes, trouve un Expert parmi tes pairs, et débloques-toi avant ton prochain cours.
                    </p>
                    <div className="a4" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 72 }}>
                        <button className="btn btn-white btn-lg" onClick={() => setPage("register")}>Rejoindre PeerAlert</button>
                        <button className="btn btn-outline-w btn-lg" onClick={() => setPage("login")}>Comment ça marche ?</button>
                    </div>

                    <div className="a5" style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", maxWidth: 820 }}>
                        <div className="hcard" style={{ minWidth: 220, textAlign: "left" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                                <div className="online" />
                                <span style={{ fontSize: 12, color: "rgba(255,255,255,.6)", fontWeight: 500 }}>Alerte active</span>
                            </div>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,.45)", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 4 }}>Algorithmique</div>
                            <div style={{ color: "white", fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Récursivité</div>
                            <div style={{ fontSize: 12, color: "rgba(255,255,255,.55)" }}>3 pairs disponibles · 18h00</div>
                        </div>
                        <div className="hcard" style={{ minWidth: 180, textAlign: "center" }}>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,.45)", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>Classement</div>
                            <div className="bdg bdg-expert" style={{ marginBottom: 10, justifyContent: "center" }}>Expert</div>
                            <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 32, color: "white" }}>287</div>
                            <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginTop: 2 }}>points — top 3</div>
                        </div>
                        <div className="hcard" style={{ minWidth: 220, textAlign: "left" }}>
                            <div style={{ fontSize: 11, color: "rgba(255,255,255,.45)", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>PeerBuddy</div>
                            <div style={{ fontSize: 13, color: "rgba(255,255,255,.8)", lineHeight: 1.55, borderLeft: "2px solid var(--b300)", paddingLeft: 10, fontStyle: "italic" }}>
                                "Commencez par deux minutes — l'élan vient toujours après les premières lignes."
                            </div>
                        </div>
                    </div>
                </div>

                <svg viewBox="0 0 1440 72" style={{ width: "100%", display: "block", fill: "var(--white)", marginBottom: -1 }}>
                    <path d="M0,36 C480,72 960,0 1440,36 L1440,72 L0,72 Z" />
                </svg>
            </div>

            {/* STATS */}
            <div style={{ background: "var(--white)", padding: "60px 48px" }}>
                <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 48, textAlign: "center" }}>
                    {[["500+", "Étudiants actifs"], ["< 10 min", "Mise en relation"], ["92 %", "Satisfaction"], ["3×", "Moins de retards"]].map(([v, l]) => (
                        <div key={l}>
                            <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 46, color: "var(--b700)", animation: "countUp .6s ease" }}>{v}</div>
                            <div style={{ color: "var(--t3)", fontSize: 14, marginTop: 4 }}>{l}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* HOW IT WORKS */}
            <div style={{ background: "var(--b025)", padding: "80px 48px", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
                <div style={{ maxWidth: 680, margin: "0 auto" }}>
                    <div style={{ marginBottom: 52 }}>
                        <span className="accent-line" />
                        <h2 style={{ fontFamily: "DM Serif Display,serif", fontSize: 36, color: "var(--t1)", lineHeight: 1.2 }}>De la difficulté<br />à la compréhension en 5 étapes</h2>
                    </div>
                    <div style={{ position: "relative", paddingLeft: 24 }}>
                        <div style={{ position: "absolute", left: 21, top: 22, bottom: 22, width: 1.5, background: "linear-gradient(180deg,var(--b400),var(--b150))" }} />
                        {steps.map((s, i) => (
                            <div key={i} style={{ display: "flex", gap: 20, marginBottom: 32, opacity: 0, animation: `fadeUp .45s ${i * .1}s ease both` }}>
                                <div className="sdot" style={{ marginTop: 0, flexShrink: 0, marginLeft: -2 }}>{s.n}</div>
                                <div style={{ paddingTop: 10 }}>
                                    <div style={{ fontWeight: 700, fontSize: 16, color: "var(--t1)", marginBottom: 5 }}>{s.t}</div>
                                    <div style={{ color: "var(--t3)", fontSize: 14, lineHeight: 1.65 }}>{s.d}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* FEATURES */}
            <div style={{ padding: "80px 48px", background: "var(--white)" }}>
                <div style={{ maxWidth: 1100, margin: "0 auto" }}>
                    <div style={{ marginBottom: 52 }}>
                        <span className="accent-line" />
                        <h2 style={{ fontFamily: "DM Serif Display,serif", fontSize: 36, color: "var(--t1)" }}>Tout ce dont vous avez besoin<br />pour réussir ensemble</h2>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
                        {features.map((f, i) => (
                            <div key={i} className="card" style={{ padding: 26, opacity: 0, animation: `fadeUp .45s ${i * .08}s ease both`, borderTop: "2px solid var(--b400)" }}>
                                <div className="feat-icon">{f.icon}</div>
                                <div style={{ fontWeight: 700, fontSize: 16, color: "var(--t1)", marginBottom: 8 }}>{f.title}</div>
                                <div style={{ color: "var(--t3)", fontSize: 14, lineHeight: 1.65 }}>{f.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* BADGES */}
            <div style={{ background: "var(--b900)", padding: "72px 48px" }}>
                <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
                    <h2 style={{ fontFamily: "DM Serif Display,serif", fontSize: 34, color: "white", marginBottom: 12 }}>Progressez. Soyez reconnu.</h2>
                    <p style={{ color: "rgba(255,255,255,.55)", fontSize: 15, marginBottom: 48, maxWidth: 520, margin: "0 auto 48px", lineHeight: 1.65 }}>
                        Chaque aide réellement effectuée est récompensée. Les points ne s'accumulent que si vous avez prouvé votre contribution par quiz IA.
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
                        {[["Novice", "0–49 pts", "Bienvenue dans la communauté", "bdg-novice"], ["Actif", "50–149 pts", "Participation régulière", "bdg-actif"], ["Expert", "150–299 pts", "La communauté vous fait confiance", "bdg-expert"], ["Mentor", "300+ pts", "Pilier reconnu de PeerAlert", "bdg-mentor"]].map(([n, p, d, cls]) => (
                            <div key={n} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: "var(--r16)", padding: 24, textAlign: "center" }}>
                                <div className={`bdg ${cls}`} style={{ justifyContent: "center", marginBottom: 12, display: "flex" }}>{n}</div>
                                <div style={{ color: "var(--b200)", fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{p}</div>
                                <div style={{ color: "rgba(255,255,255,.45)", fontSize: 12.5, lineHeight: 1.55 }}>{d}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div style={{ background: "var(--b050)", padding: "80px 48px", textAlign: "center", borderTop: "1px solid var(--b100)" }}>
                <h2 style={{ fontFamily: "DM Serif Display,serif", fontSize: 40, color: "var(--t1)", marginBottom: 16, lineHeight: 1.2 }}>Prêt à rejoindre<br />la communauté PeerAlert ?</h2>
                <p style={{ color: "var(--t3)", fontSize: 16, marginBottom: 36, maxWidth: 440, margin: "0 auto 36px", lineHeight: 1.65 }}>Gratuit pour tous les étudiants. Disponible à l'IFRI / UAC dès maintenant.</p>
                <button className="btn btn-dark btn-lg" onClick={() => setPage("register")}>Créer mon compte gratuitement</button>
            </div>

            {/* FOOTER */}
            <footer style={{ background: "#0a1628", color: "white", padding: "80px 48px 0", borderTop: "1px solid rgba(255,255,255,0.05)", position: "relative", zIndex: 1 }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 64, paddingBottom: 80 }}>
                    
                    {/* ZONE 1 - LOGO & TECH */}
                    <div style={{ gridColumn: "span 2", minWidth: 300 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                            <div style={{ width: 32, height: 32, background: "var(--b500)", borderRadius: "var(--r8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                            </div>
                            <span style={{ fontFamily: "DM Serif Display,serif", fontSize: 24, letterSpacing: ".01em" }}>PeerAlert</span>
                        </div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: "var(--b300)", marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.1em" }}>L'entraide étudiante structurée</div>
                        <p style={{ color: "rgba(255,255,255,.45)", fontSize: 14, maxWidth: 340, lineHeight: 1.6, marginBottom: 28 }}>
                            Plateforme de mise en relation en temps réel pour l'accompagnement académique entre pairs de l'IFRI.
                        </p>
                        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                            <span style={{ background: "#161b22", color: "#58a6ff", padding: "4px 10px", borderRadius: "6px", fontSize: 11, border: "1px solid rgba(255,255,255,0.1)", fontWeight: 600 }}>React</span>
                            <span style={{ background: "#161b22", color: "#3fb950", padding: "4px 10px", borderRadius: "6px", fontSize: 11, border: "1px solid rgba(255,255,255,0.1)", fontWeight: 600 }}>Supabase</span>
                            <span style={{ background: "#161b22", color: "#bc8cff", padding: "4px 10px", borderRadius: "6px", fontSize: 11, border: "1px solid rgba(255,255,255,0.1)", fontWeight: 600 }}>Vite</span>
                        </div>
                    </div>

                    {/* ZONE 2 - PRODUIT */}
                    <div>
                        <h4 style={{ fontSize: 11, fontWeight: 800, color: "white", marginBottom: 24, textTransform: "uppercase", letterSpacing: "0.2em" }}>Produit</h4>
                        <div className="footer-links">
                            <a href="#">Fonctionnalités</a>
                            <a href="#">Comment ça marche ?</a>
                            <a href="#">Lancer une alerte</a>
                            <a href="#">Voir le classement</a>
                        </div>
                    </div>

                    {/* ZONE 3 - À PROPOS */}
                    <div>
                        <h4 style={{ fontSize: 11, fontWeight: 800, color: "white", marginBottom: 24, textTransform: "uppercase", letterSpacing: "0.2em" }}>À propos</h4>
                        <div className="footer-links">
                            <a href="#">Équipe V-LEAD</a>
                            <a href="#">IFRI / UAC</a>
                            <a href="#">Cahier des charges</a>
                            <a href="https://github.com" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>GitHub du projet <span style={{ fontSize: 10 }}>↗</span></a>
                        </div>
                    </div>

                    {/* ZONE 4 - CONTACT */}
                    <div>
                        <h4 style={{ fontSize: 11, fontWeight: 800, color: "white", marginBottom: 24, textTransform: "uppercase", letterSpacing: "0.2em" }}>Contact & Légal</h4>
                        <div className="footer-links">
                            <a href="https://ifri.uac.bj" target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>ifri.uac.bj <span style={{ fontSize: 10 }}>↗</span></a>
                            <a href="#">Signaler un bug</a>
                            <a href="#">Projet académique 2026</a>
                            <a href="#">HackByIFRI 2026</a>
                        </div>
                    </div>
                </div>

                {/* SÉPARATEUR GRADIENT */}
                <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, var(--b500), transparent)", opacity: 0.3 }}></div>

                {/* BARRE COPYRIGHT */}
                <div style={{ background: "#060e1a", padding: "28px 48px", margin: "0 -48px" }}>
                    <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
                        <div style={{ color: "rgba(255,255,255,.3)", fontSize: 12.5 }}>
                            © 2026 PeerAlert · Équipe V-LEAD · IFRI/UAC
                        </div>
                        <div style={{ color: "rgba(255,255,255,.3)", fontSize: 12.5, display: "flex", alignItems: "center", gap: 6 }}>
                            Fait avec <span style={{ color: "#ef4444" }}>❤️</span> par des étudiants pour étudiants
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
