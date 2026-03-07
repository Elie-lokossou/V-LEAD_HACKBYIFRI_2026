import { useState, useMemo } from "react";
import { LEADERBOARD } from "../data/leaderboard.js";
import { useApp } from "../context/AppContext.jsx";

const MEDALS = ["🥇", "🥈", "🥉"];

export default function LeaderboardPage() {
    const { currentUser } = useApp();
    const [period, setPeriod] = useState("semaine");
    const bdgC = { mentor: "bdg-mentor", expert: "bdg-expert", actif: "bdg-actif", novice: "bdg-novice" };
    
    // LOGIQUE DYNAMIQUE : On construit le classement à partir des données réelles
    const rankedList = useMemo(() => {
        const myName = currentUser?.full_name ?? "Étudiant";
        const myPoints = currentUser?.points ?? 0;

        // 1. On prépare la liste en injectant l'utilisateur connecté à la place du mock "me"
        let list = LEADERBOARD.map(u => {
            if (u.me || u.name === currentUser?.full_name) {
                return { ...u, name: myName, pts: myPoints, isMe: true };
            }
            return { ...u, isMe: false };
        });

        // 2. On trie par points (décroissant)
        list.sort((a, b) => b.pts - a.pts);

        // 3. On réattribue les rangs après le tri
        return list.map((u, i) => ({ ...u, rank: i + 1 }));
    }, [currentUser]);

    const me = rankedList.find(u => u.isMe);
    const myPoints = currentUser?.points ?? 0;
    const myName = currentUser?.full_name ?? "Étudiant";

    return (
        <div className="page-inner" style={{ animation: "fadeIn .3s ease" }}>
            <div className="ph a1">
                <div className="ph-title">Classement</div>
                <div className="ph-sub">Communauté PeerAlert — IFRI/UAC</div>
            </div>

            {/* Period tabs */}
            <div className="chips-row a2" style={{ marginBottom: 26 }}>
                {["semaine", "mois", "global"].map(p => (
                    <button key={p} className={`chip${period === p ? " on" : ""}`} onClick={() => setPeriod(p)} style={{ textTransform: "capitalize" }}>{p}</button>
                ))}
            </div>

            {/* ── PODIUM DYNAMIQUE ─────────────────────────── */}
            <div className="card a2" style={{ padding: "32px 28px 0", marginBottom: 22, background: "linear-gradient(160deg, var(--b025) 0%, var(--white) 100%)", overflow: "hidden", position: "relative" }}>
                <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, background: "var(--b100)", borderRadius: "50%", opacity: .4 }} />
                
                <div style={{ textAlign: "center", marginBottom: 18, position: "relative", zIndex: 1 }}>
                    <div style={{ fontSize: 11.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--t4)", marginBottom: 4 }}>Top contributeurs</div>
                    <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 20, color: "var(--t1)" }}>
                        Période : <span style={{ color: "var(--b500)", textTransform: "capitalize" }}>{period}</span>
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 0, position: "relative", zIndex: 1 }}>
                    {/* 2nd */}
                    {rankedList[1] && (
                        <div style={{ flex: 1, textAlign: "center", maxWidth: 200 }}>
                            <div style={{ fontSize: 24, marginBottom: 6 }}>🥈</div>
                            <div style={{ fontWeight: 600, fontSize: 13, color: "var(--t2)", marginBottom: 6 }}>{rankedList[1].name.split(" ")[0]}</div>
                            <div className="av" style={{ width: 50, height: 50, fontSize: 17, margin: "0 auto 8px", border: "3px solid var(--b200)" }}>
                                {rankedList[1].name[0] + (rankedList[1].name.split(" ")[1]?.[0] || "")}
                            </div>
                            <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 18, color: "var(--b500)", marginBottom: 8 }}>{rankedList[1].pts} pts</div>
                            <div style={{ background: "linear-gradient(180deg,var(--b300),var(--b400))", height: 90, borderRadius: "var(--r8) var(--r8) 0 0", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 10 }}>
                                <span style={{ fontFamily: "DM Serif Display,serif", fontSize: 28, color: "white", opacity: .7 }}>2</span>
                            </div>
                        </div>
                    )}

                    {/* 1st */}
                    {rankedList[0] && (
                        <div style={{ flex: 1, textAlign: "center", maxWidth: 200, zIndex: 2 }}>
                            <div style={{ fontSize: 28, marginBottom: 4 }}>🥇</div>
                            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--t1)", marginBottom: 6 }}>{rankedList[0].name.split(" ")[0]}</div>
                            <div className="av" style={{ width: 58, height: 58, fontSize: 19, margin: "0 auto 8px", border: "3px solid var(--b400)", boxShadow: "0 0 0 4px var(--b100)" }}>
                                {rankedList[0].name[0] + (rankedList[0].name.split(" ")[1]?.[0] || "")}
                            </div>
                            <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 22, color: "var(--b600)", marginBottom: 8, fontWeight: 700 }}>{rankedList[0].pts} pts</div>
                            <div className={`bdg ${bdgC[rankedList[0].badge]}`} style={{ justifyContent: "center", marginBottom: 8, display: "flex" }}>
                                {rankedList[0].badge.charAt(0).toUpperCase() + rankedList[0].badge.slice(1)}
                            </div>
                            <div style={{ background: "linear-gradient(180deg,var(--b700),var(--b900))", height: 120, borderRadius: "var(--r8) var(--r8) 0 0", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 12 }}>
                                <span style={{ fontFamily: "DM Serif Display,serif", fontSize: 36, color: "white", opacity: .8 }}>1</span>
                            </div>
                        </div>
                    )}

                    {/* 3rd */}
                    {rankedList[2] && (
                        <div style={{ flex: 1, textAlign: "center", maxWidth: 200 }}>
                            <div style={{ fontSize: 22, marginBottom: 8 }}>🥉</div>
                            <div style={{ fontWeight: 600, fontSize: 13, color: "var(--t2)", marginBottom: 6 }}>{rankedList[2].name.split(" ")[0]}</div>
                            <div className="av" style={{ width: 46, height: 46, fontSize: 15, margin: "0 auto 8px", border: "3px solid var(--b150)" }}>
                                {rankedList[2].name[0] + (rankedList[2].name.split(" ")[1]?.[0] || "")}
                            </div>
                            <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 16, color: "var(--b400)", marginBottom: 8 }}>{rankedList[2].pts} pts</div>
                            <div style={{ background: "linear-gradient(180deg,var(--b150),var(--b200))", height: 66, borderRadius: "var(--r8) var(--r8) 0 0", display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 8 }}>
                                <span style={{ fontFamily: "DM Serif Display,serif", fontSize: 22, color: "var(--b700)", opacity: .7 }}>3</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* ── LISTE DYNAMIQUE ─────────────────────────── */}
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {rankedList.map((u, i) => (
                    <div key={u.rank} className={`rkrow${u.isMe ? " me" : ""}`} style={{ opacity: 0, animation: `fadeUp .4s ${i < 10 ? i * 0.05 : 0}s ease both` }}>
                        <div style={{ width: 30, fontFamily: "DM Serif Display,serif", fontSize: 15, color: u.rank <= 3 ? "var(--b500)" : "var(--t4)", textAlign: "center", flexShrink: 0 }}>
                            {u.rank <= 3 ? MEDALS[u.rank - 1] : u.rank}
                        </div>
                        <div className="av" style={{ width: 38, height: 38, fontSize: 14 }}>
                            {u.name[0] + (u.name.split(" ")[1]?.[0] || "")}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: 13.5, color: "var(--t1)", display: "flex", gap: 7, alignItems: "center" }}>
                                {u.name}
                                {u.isMe && <span style={{ fontSize: 10.5, background: "var(--b100)", color: "var(--b500)", padding: "1px 8px", borderRadius: "var(--rpill)", fontWeight: 700 }}>Moi</span>}
                            </div>
                            <div style={{ fontSize: 12, color: "var(--t3)" }}>{u.filiere} · {u.sess || u.sessions || 0} sessions</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 18, color: u.isMe ? "var(--b600)" : "var(--t1)" }}>
                                {u.pts}
                            </div>
                            <div className={`bdg ${bdgC[u.badge]}`} style={{ marginTop: 4 }}>{u.badge.charAt(0).toUpperCase() + u.badge.slice(1)}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Sticky banner de ma position */}
            {me && (
                <div style={{ position: "sticky", bottom: 16, marginTop: 20 }}>
                    <div style={{ background: "var(--b800)", borderRadius: "var(--r12)", padding: "12px 18px", display: "flex", alignItems: "center", gap: 12, boxShadow: "var(--sh-lg)" }}>
                        <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 16, color: "var(--b200)", width: 30, textAlign: "center" }}>{me.rank}</div>
                        <div className="av" style={{ width: 34, height: 34, fontSize: 12 }}>
                            {myName.split(" ").filter(Boolean).map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                        </div>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13.5, fontWeight: 700, color: "white" }}>{myName} (Vous)</div>
                            <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>
                                {me.rank > 1 ? `encore ${rankedList[me.rank-2].pts - myPoints} pts pour dépasser ${rankedList[me.rank-2].name.split(" ")[0]}` : "Félicitations, vous êtes en tête !"}
                            </div>
                        </div>
                        <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 20, color: "var(--b200)" }}>{myPoints} pts</div>
                    </div>
                </div>
            )}
        </div>
    );
}
