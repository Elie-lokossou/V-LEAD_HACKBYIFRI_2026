import { useState } from "react";
import { I } from "../utils/icons.jsx";
import { useApp } from "../context/AppContext.jsx";

export default function LaunchPage({ setPage }) {
    const { addAlert } = useApp();
    
    // Form state
    const [form, setForm] = useState({
        subject: "",
        notion: "",
        date: "",
        timeOnly: "",
        spots: 3,
        whatsapp: ""
    });

    const today = new Date().toISOString().split('T')[0];
    const maxDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const timeSlots = [];
    for (let h = 6; h <= 23; h++) {
        const hh = String(h).padStart(2, '0');
        timeSlots.push(`${hh}:00`);
        if (h < 23) timeSlots.push(`${hh}:30`);
    }

    const isFormValid = form.subject && form.notion.trim() && form.date && form.timeOnly && form.whatsapp.trim().startsWith("https://chat.whatsapp.com/");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isFormValid) return;
        
        // Format displayed time for cards: "Lun 10 Mars · 18h00" (approx simplified version)
        const d = new Date(form.date);
        const dayName = d.toLocaleDateString('fr-FR', { weekday: 'short' });
        const day = d.getDate();
        const month = d.toLocaleDateString('fr-FR', { month: 'short' });
        const displayTime = `${dayName.charAt(0).toUpperCase() + dayName.slice(1)} ${day} ${month} · ${form.timeOnly.replace(':', 'h')}`;

        addAlert({ 
            ...form, 
            time: displayTime, // For display
            rawTime: `${form.date}T${form.timeOnly}`, // Stored ISO format
            type: "Aide académique" 
        });
        setPage("dashboard");
    };

    return (
        <div className="page-inner" style={{ animation: "fadeIn .3s ease", maxWidth: 640, margin: "0 auto" }}>
            <div className="ph a1" style={{ textAlign: "center", marginBottom: 32 }}>
                <div className="ph-title" style={{ fontSize: 32 }}>Lancer une alerte</div>
                <div className="ph-sub">Décrivez votre blocage pour trouver de l'aide rapidement</div>
            </div>

            <form className="card a3" style={{ padding: 32 }} onSubmit={handleSubmit}>
                <div className="ai">
                    <div style={{ marginBottom: 24 }}>
                        <label className="lbl">1. Matière</label>
                        <select className="inp" value={form.subject} onChange={e => setForm({...form, subject: e.target.value})} required>
                            <option value="">— Sélectionner la matière —</option>
                            {["Algorithmique", "Mathématiques", "Réseaux", "Programmation Web", "Bases de données", "Physique", "Cybersécurité"].map(m => <option key={m} value={m}>{m}</option>)}
                        </select>
                    </div>

                    <div style={{ marginBottom: 24 }}>
                        <label className="lbl">2. Notion précise</label>
                        <input className="inp" placeholder="Ex : Récursivité sur les arbres binaires" value={form.notion} onChange={e => setForm({...form, notion: e.target.value})} required />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
                        <div>
                            <label className="lbl">3. Date & Heure</label>
                            <div style={{ display: "flex", gap: 8 }}>
                                <input 
                                    className="inp" 
                                    type="date" 
                                    min={today} 
                                    max={maxDate} 
                                    value={form.date} 
                                    onChange={e => setForm({...form, date: e.target.value})} 
                                    required 
                                    style={{ flex: 1 }}
                                />
                                <select 
                                    className="inp" 
                                    value={form.timeOnly} 
                                    onChange={e => setForm({...form, timeOnly: e.target.value})} 
                                    required 
                                    style={{ flex: 1 }}
                                >
                                    <option value="">Heure</option>
                                    {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="lbl">4. Participants max (1-5)</label>
                            <div style={{ display: "flex", gap: 8 }}>
                                {[1, 2, 3, 4, 5].map(n => (
                                    <button type="button" key={n} className={`btn ${form.spots === n ? "btn-dark" : "btn-ghost"}`} style={{ flex: 1, justifyContent: "center", fontWeight: 700, fontSize: 14, padding: "10px 0", borderRadius: "var(--r8)" }} onClick={() => setForm({...form, spots: n})}>{n}</button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div style={{ marginBottom: 32 }}>
                        <label className="lbl">5. Lien groupe WhatsApp (Obligatoire)</label>
                        <input className="inp" placeholder="https://chat.whatsapp.com/..." value={form.whatsapp} onChange={e => setForm({...form, whatsapp: e.target.value})} required style={{ borderColor: form.whatsapp && !form.whatsapp.startsWith("https://chat.whatsapp.com/") ? "var(--danger)" : "" }} />
                        {form.whatsapp && !form.whatsapp.startsWith("https://chat.whatsapp.com/") && (
                            <div style={{ fontSize: 12, color: "var(--danger)", marginTop: 6, fontWeight: 500 }}>Le lien doit commencer par https://chat.whatsapp.com/</div>
                        )}
                    </div>

                    <div style={{ background: "var(--s2)", border: "1px solid var(--line)", borderRadius: "var(--r12)", padding: 16, marginBottom: 24, display: "flex", gap: 12, alignItems: "center" }}>
                        <div style={{ fontSize: 20 }}>💡</div>
                        <div style={{ fontSize: 13, color: "var(--t3)", lineHeight: 1.5 }}>
                            Ton alerte sera envoyée aux étudiants disponibles de ta filière ayant déjà validé cette notion.
                        </div>
                    </div>

                    <button type="submit" className="btn btn-dark" style={{ width: "100%", justifyContent: "center", padding: "16px 0", fontSize: 16, borderRadius: "var(--r12)" }} disabled={!isFormValid}>
                        Lancer l'alerte
                    </button>
                </div>
            </form>
        </div>
    );
}
