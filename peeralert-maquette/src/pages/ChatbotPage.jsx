import { useState, useEffect, useRef } from "react";
import { I } from "../utils/icons.jsx";
import { getBotReply, SUGGESTIONS } from "../utils/chatbot.js";

export default function ChatbotPage() {
    const [msgs, setMsgs] = useState([
        { id: 1, from: "bot", text: "Bonjour, je suis PeerBuddy — ton compagnon de bien-être académique. Je suis là pour t'écouter sans jugement et t'encourager. Comment te sens-tu aujourd'hui ? Qu'est-ce qui occupe tes pensées ?" }
    ]);
    const [input, setInput] = useState("");
    const [typing, setTyping] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, typing]);

    const send = (text) => {
        if (!text.trim()) return;
        setMsgs(p => [...p, { id: Date.now(), from: "user", text }]);
        setInput(""); setTyping(true);
        setTimeout(() => {
            setTyping(false);
            setMsgs(p => [...p, { id: Date.now() + 1, from: "bot", text: getBotReply(text) }]);
        }, 900 + Math.random() * 600);
    };

    const suggestions = [
        { label: "Je suis stressé", msg: "Je suis stressé par les examens" },
        { label: "Procrastination", msg: "J'ai du mal à arrêter de procrastiner" },
        { label: "Motivation", msg: "Je n'ai plus de motivation" },
        { label: "Gestion du temps", msg: "Je veux mieux gérer mon temps" },
        { label: "Épuisement", msg: "Je suis épuisé et à bout" },
        { label: "Révisions", msg: "Comment réviser efficacement pour l'examen" },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>
            {/* Header */}
            <div style={{ background: "var(--white)", borderBottom: "1px solid var(--line)", padding: "14px 28px", flexShrink: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, maxWidth: 820, margin: "0 auto" }}>
                    <div style={{ position: "relative" }}>
                        <div style={{ width: 44, height: 44, borderRadius: "var(--r12)", background: "var(--b800)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", flexShrink: 0 }}>
                            <span style={{ width: 22, height: 22 }}>{I.Brain}</span>
                        </div>
                        <div className="online" style={{ position: "absolute", bottom: 0, right: 0, border: "2px solid var(--white)" }} />
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: 16, color: "var(--t1)" }}>PeerBuddy</div>
                        <div style={{ fontSize: 12, color: "var(--success)", fontWeight: 500 }}>En ligne · Soutien & Motivation</div>
                    </div>
                </div>
            </div>

            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "20px 28px", maxWidth: 820, width: "100%", margin: "0 auto" }}>
                {/* Suggestions */}
                <div style={{ marginBottom: 22 }}>
                    <div style={{ fontSize: 12.5, color: "var(--t4)", marginBottom: 12, textAlign: "center" }}>Quelques idées pour commencer...</div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                        {SUGGESTIONS.map(s => (
                            <button key={s} className="btn btn-ghost btn-sm" style={{ fontSize: 12.5, padding: "12px 14px", height: "auto", textAlign: "left", justifyContent: "flex-start", lineHeight: 1.4 }} onClick={() => send(s)}>{s}</button>
                        ))}
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {msgs.map(m => (
                        <div key={m.id} style={{ display: "flex", gap: 10, flexDirection: m.from === "user" ? "row-reverse" : "row", alignItems: "flex-end" }}>
                            {m.from === "bot" && (
                                <div style={{ width: 30, height: 30, borderRadius: "var(--r8)", background: "var(--b800)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "white" }}>
                                    <span style={{ width: 16, height: 16 }}>{I.Brain}</span>
                                </div>
                            )}
                            <div className={m.from === "bot" ? "bubble-bot" : "bubble-usr"}>{m.text}</div>
                            {m.from === "user" && (
                                <div className="av" style={{ width: 30, height: 30, fontSize: 11, flexShrink: 0 }}>KT</div>
                            )}
                        </div>
                    ))}
                    {typing && (
                        <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
                            <div style={{ width: 30, height: 30, borderRadius: "var(--r8)", background: "var(--b800)", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                                <span style={{ width: 16, height: 16 }}>{I.Brain}</span>
                            </div>
                            <div className="bubble-bot" style={{ padding: "14px 18px" }}>
                                <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
                                    <span className="td" /><span className="td" /><span className="td" />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={bottomRef} />
                </div>
            </div>

            {/* Input */}
            <div style={{ background: "var(--white)", borderTop: "1px solid var(--line)", padding: "14px 28px", flexShrink: 0 }}>
                <div style={{ display: "flex", gap: 10, maxWidth: 820, margin: "0 auto", alignItems: "flex-end" }}>
                    <textarea
                        className="inp"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); } }}
                        placeholder="Écrivez votre message..."
                        style={{ resize: "none", minHeight: 44, maxHeight: 100, lineHeight: 1.5, paddingTop: 12 }}
                        rows={1}
                    />
                    <button
                        className="btn btn-dark"
                        style={{ height: 44, width: 44, borderRadius: "var(--r8)", padding: 0, justifyContent: "center", flexShrink: 0 }}
                        onClick={() => send(input)} disabled={!input.trim()}
                    >
                        <span style={{ width: 16, height: 16 }}>{I.Send}</span>
                    </button>
                </div>
                <div style={{ textAlign: "center", fontSize: 11.5, color: "var(--t4)", marginTop: 8, maxWidth: 820, margin: "6px auto 0" }}>
                    PeerBuddy ne remplace pas un professionnel de santé. En cas de détresse, contactez le service de soutien de votre établissement.
                </div>
            </div>
        </div>
    );
}
