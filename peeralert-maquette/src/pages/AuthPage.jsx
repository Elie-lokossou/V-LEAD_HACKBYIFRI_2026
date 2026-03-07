import { useState } from "react";
import { I } from "../utils/icons.jsx";
import { useApp } from "../context/AppContext.jsx";
import { supabase } from "../lib/supabase.js";

export default function AuthPage({ setPage }) {
    const { setUserRole } = useApp();
    const [showPw, setShowPw] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        
        if (!email.trim() || password.length < 8) {
            setErrorMsg("L'email est requis et le mot de passe doit faire au moins 8 caractères.");
            return;
        }

        setLoading(true);

        try {
            // 1. Authentification réelle
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            // 2. Récupération du rôle dans la table profiles
            const { data: profile, error: profileError } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', authData.user.id)
                .single();

            const role = profile?.role || "student";
            setUserRole(role);

            // 3. Navigation
            if (role === "admin") {
                setPage("admin");
            } else {
                setPage("dashboard");
            }

        } catch (err) {
            console.error("Auth error:", err);
            let msg = err.message;
            if (msg === "Invalid login credentials") {
                msg = "Email ou mot de passe incorrect.";
            } else if (msg === "Email not confirmed") {
                msg = "Veuillez confirmer votre email avant de vous connecter.";
            }
            setErrorMsg(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: "100vh", background: "var(--s1)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
            <div style={{ width: "100%", maxWidth: 440 }}>
                <div className="a1" style={{ textAlign: "center", marginBottom: 28 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 8 }}>
                        <div style={{ width: 34, height: 34, background: "var(--b700)", borderRadius: "var(--r8)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
                        </div>
                        <span style={{ fontFamily: "DM Serif Display,serif", fontSize: 22, color: "var(--t1)" }}>PeerAlert</span>
                    </div>
                    <p style={{ color: "var(--t3)", fontSize: 14 }}>Bon retour parmi nous.</p>
                </div>

                <div className="card a2" style={{ padding: 40 }}>
                    <form className="ai" onSubmit={handleSubmit}>
                        {errorMsg && (
                            <div style={{ background: "var(--danger-bg)", border: "1px solid var(--danger-line)", borderRadius: "var(--r8)", padding: 12, marginBottom: 16, fontSize: 13, color: "var(--danger)", fontWeight: 500 }}>
                                {errorMsg}
                            </div>
                        )}

                        <div style={{ marginBottom: 16 }}>
                            <label className="lbl">Email institutionnel</label>
                            <input className="inp" type="email" placeholder="nom.prenom@ecole.bj" value={email} onChange={e => setEmail(e.target.value)} required />
                        </div>
                        <div style={{ marginBottom: 8, position: "relative" }}>
                            <label className="lbl">Mot de passe</label>
                            <input className="inp" type={showPw ? "text" : "password"} placeholder="Ton mot de passe" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} style={{ paddingRight: 40 }} />
                            <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 11, top: 31, background: "none", border: "none", cursor: "pointer", color: "var(--t4)", width: 18, height: 18 }}>
                                {showPw ? I.EyeOff : I.Eye}
                            </button>
                        </div>
                        
                        <div style={{ textAlign: "right", marginBottom: 24 }}>
                            <span style={{ fontSize: 13, color: "var(--b400)", cursor: "pointer", fontWeight: 500 }}>Mot de passe oublié ?</span>
                        </div>

                        <button type="submit" className="btn btn-dark" style={{ width: "100%", justifyContent: "center", padding: "12px 0" }} disabled={loading}>
                            {loading ? "Vérification..." : "Se connecter"}
                        </button>
                    </form>
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 24, color: "var(--t4)", fontSize: 12.5 }}>
                    <span style={{ width: 14, height: 14 }}>{I.Shield}</span>
                    <span>Tes données sont protégées et réservées à l'IFRI/UAC</span>
                </div>

                <div style={{ textAlign: "center", marginTop: 14 }}>
                    <span style={{ fontSize: 13, color: "var(--t4)", cursor: "pointer" }} onClick={() => setPage("landing")}>Retour à l'accueil</span>
                </div>
            </div>
        </div>
    );
}
