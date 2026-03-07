import { useState, useEffect, useMemo } from "react";
import { I } from "../utils/icons.jsx";
import { supabase } from "../lib/supabase.js";

export default function AdminStudentsPage() {
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("Toutes");
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [rawStudents, setRawStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .neq('role', 'admin') // Exclure les admins
                .order('points', { ascending: false });

            if (error) throw error;
            
            // On affiche uniquement les étudiants actifs
            setRawStudents((data || []).filter(s => s.role !== 'revoked'));
        } catch (err) {
            console.error("Error fetching students:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleRevoke = async (id, name) => {
        if (!confirm(`Voulez-vous vraiment révoquer l'accès de ${name} ?`)) return;
        
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ role: 'revoked' })
                .eq('id', id);

            if (error) throw error;
            
            // Retirer de la liste immédiatement (UI optimiste)
            setRawStudents(prev => prev.filter(s => s.id !== id));
            if (selectedStudent?.id === id) setSelectedStudent(null);
        } catch (err) {
            console.error("Error revoking student:", err);
            alert("Erreur lors de la révocation.");
        }
    };

    // Extraction dynamique des filières pour le dropdown
    const filiereOptions = useMemo(() => {
        const set = new Set(rawStudents.map(s => s.filiere).filter(Boolean));
        return ["Toutes", ...Array.from(set).sort()];
    }, [rawStudents]);

    // Filtrage en temps réel sur le nom et la filière
    const filtered = rawStudents.filter(s => 
        (filter === "Toutes" || s.filiere === filter) &&
        (
            (s.full_name?.toLowerCase().includes(search.toLowerCase())) || 
            (s.filiere?.toLowerCase().includes(search.toLowerCase()))
        )
    );

    const formatDate = (dateStr) => {
        if (!dateStr) return "-";
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    };

    const getBadgeStyle = (pts) => {
        if (pts >= 300) return "bdg-mentor";
        if (pts >= 150) return "bdg-expert";
        if (pts >= 50) return "bdg-actif";
        return "bdg-novice";
    };

    const getBadgeLabel = (pts) => {
        if (pts >= 300) return "Mentor";
        if (pts >= 150) return "Expert";
        if (pts >= 50) return "Actif";
        return "Novice";
    };

    if (loading) return (
        <div className="page-inner" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "400px" }}>
            <div style={{ textAlign: "center" }}>
                <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 16 }}>
                    <div className="td" />
                    <div className="td" />
                    <div className="td" />
                </div>
                <div style={{ fontSize: 16, color: "var(--t3)", fontWeight: 500 }}>Chargement des étudiants...</div>
            </div>
        </div>
    );

    return (
        <div className="page-inner" style={{ animation: "fadeIn .3s ease", maxWidth: "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
                <div>
                    <h1 style={{ fontFamily: "DM Serif Display,serif", fontSize: 28, color: "var(--t1)", marginBottom: 4 }}>Gestion des Étudiants</h1>
                    <div style={{ fontSize: 14, color: "var(--t3)" }}>{rawStudents.length} étudiants inscrits au total</div>
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                    <div style={{ position: "relative" }}>
                        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", width: 14, height: 14, opacity: 0.4 }}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                        </span>
                        <input className="inp" placeholder="Rechercher un nom ou une filière..." style={{ paddingLeft: 34, width: 280 }} value={search} onChange={e => setSearch(e.target.value)} />
                    </div>
                    <select className="inp" style={{ width: 180 }} value={filter} onChange={e => setFilter(e.target.value)}>
                        {filiereOptions.map(opt => <option key={opt}>{opt}</option>)}
                    </select>
                </div>
            </div>

            {rawStudents.length === 0 ? (
                <div className="card" style={{ padding: 64, textAlign: "center" }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>👥</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "var(--t1)" }}>Aucun étudiant inscrit pour le moment.</div>
                </div>
            ) : filtered.length === 0 ? (
                <div className="card" style={{ padding: 64, textAlign: "center" }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: "var(--t1)" }}>Aucun résultat pour votre recherche.</div>
                </div>
            ) : (
                <div className="card" style={{ overflow: "hidden" }}>
                    <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                        <thead>
                            <tr style={{ background: "var(--s2)", borderBottom: "1px solid var(--line)" }}>
                                {["Étudiant", "Filière", "Niveau", "Points", "Badge", "Activité", "Actions"].map(h => (
                                    <th key={h} style={{ padding: "16px 20px", fontSize: 12, fontWeight: 700, color: "var(--t4)", textTransform: "uppercase", letterSpacing: ".05em" }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filtered.map(s => (
                                <tr key={s.id} style={{ borderBottom: "1px solid var(--line)", cursor: "pointer", transition: ".2s" }} onClick={() => setSelectedStudent(s)} className="row-hover">
                                    <td style={{ padding: "16px 20px" }}>
                                        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                            <div className="av" style={{ width: 32, height: 32, fontSize: 12 }}>{s.full_name?.[0]}</div>
                                            <div style={{ fontWeight: 600, fontSize: 14, color: "var(--t1)" }}>{s.full_name}</div>
                                        </div>
                                    </td>
                                    <td style={{ padding: "16px 20px", fontSize: 13, color: "var(--t2)" }}>{s.filiere}</td>
                                    <td style={{ padding: "16px 20px", fontSize: 13, color: "var(--t3)" }}>{s.level}</td>
                                    <td style={{ padding: "16px 20px", fontWeight: 700, color: "var(--b600)" }}>{s.points || 0}</td>
                                    <td style={{ padding: "16px 20px" }}>
                                        <span className={`bdg ${getBadgeStyle(s.points || 0)}`}>{getBadgeLabel(s.points || 0)}</span>
                                    </td>
                                    <td style={{ padding: "16px 20px", fontSize: 13, color: "var(--t4)" }}>{formatDate(s.created_at)}</td>
                                    <td style={{ padding: "16px 20px" }}>
                                        <button className="btn btn-ghost btn-xs" style={{ color: "var(--danger)", borderColor: "var(--danger-line)" }} onClick={(e) => { e.stopPropagation(); handleRevoke(s.id, s.full_name); }}>Révoquer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* MODAL DÉTAILS */}
            {selectedStudent && (
                <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 20 }} onClick={() => setSelectedStudent(null)}>
                    <div className="card" style={{ maxWidth: 450, width: "100%", padding: 32, animation: "rise .3s ease" }} onClick={e => e.stopPropagation()}>
                        <div style={{ textAlign: "center", marginBottom: 24 }}>
                            <div className="av" style={{ width: 80, height: 80, fontSize: 32, margin: "0 auto 16px" }}>{selectedStudent.full_name?.[0]}</div>
                            <h2 style={{ fontFamily: "DM Serif Display,serif", fontSize: 24, marginBottom: 4 }}>{selectedStudent.full_name}</h2>
                            <div style={{ color: "var(--t3)", fontSize: 14 }}>{selectedStudent.email || "Email non renseigné"}</div>
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
                            <div style={{ background: "var(--s2)", padding: 12, borderRadius: "var(--r8)" }}>
                                <div style={{ fontSize: 11, color: "var(--t4)", textTransform: "uppercase" }}>Filière</div>
                                <div style={{ fontWeight: 700 }}>{selectedStudent.filiere} ({selectedStudent.level})</div>
                            </div>
                            <div style={{ background: "var(--s2)", padding: 12, borderRadius: "var(--r8)" }}>
                                <div style={{ fontSize: 11, color: "var(--t4)", textTransform: "uppercase" }}>Points</div>
                                <div style={{ fontWeight: 700, color: "var(--b600)" }}>{selectedStudent.points || 0} pts</div>
                            </div>
                        </div>
                        <div style={{ display: "flex", gap: 12 }}>
                            <button className="btn btn-dark btn-sm" style={{ flex: 1 }} onClick={() => setSelectedStudent(null)}>Fermer</button>
                            <button className="btn btn-outline btn-sm" style={{ color: "var(--danger)", borderColor: "var(--danger-line)" }} onClick={() => handleRevoke(selectedStudent.id, selectedStudent.full_name)}>Révoquer l'accès</button>
                        </div>
                    </div>
                </div>
            )}

            <style>{`
                .row-hover:hover { background: var(--b025); }
            `}</style>
        </div>
    );
}
