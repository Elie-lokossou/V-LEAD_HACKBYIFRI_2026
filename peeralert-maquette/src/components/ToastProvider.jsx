import { createContext, useContext, useState, useCallback } from "react";
import { I } from "../utils/icons.jsx";

const ToastContext = createContext(null);

export function useToast() {
    return useContext(ToastContext);
}

const ICONS = {
    success: { icon: I.Check, bg: "var(--success-bg)", border: "var(--success-line)", color: "var(--success)" },
    error: { icon: I.X, bg: "var(--danger-bg)", border: "var(--danger-line)", color: "var(--danger)" },
    info: { icon: I.Info, bg: "var(--b050)", border: "var(--b150)", color: "var(--b500)" },
    warn: { icon: I.Alert, bg: "var(--warn-bg)", border: "var(--warn-line)", color: "var(--warn)" },
};

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const toast = useCallback((msg, type = "info", duration = 4000) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, msg, type, visible: true }]);
        setTimeout(() => {
            setToasts(prev => prev.map(t => t.id === id ? { ...t, visible: false } : t));
            setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 350);
        }, duration);
        return id;
    }, []);

    const dismiss = useCallback((id) => {
        setToasts(prev => prev.map(t => t.id === id ? { ...t, visible: false } : t));
        setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 350);
    }, []);

    return (
        <ToastContext.Provider value={toast}>
            {children}
            <div style={{
                position: "fixed", bottom: 24, right: 24, zIndex: 9999,
                display: "flex", flexDirection: "column", gap: 10, alignItems: "flex-end",
                pointerEvents: "none",
            }}>
                {toasts.map(t => {
                    const style = ICONS[t.type] || ICONS.info;
                    return (
                        <div key={t.id} style={{
                            background: style.bg,
                            border: `1px solid ${style.border}`,
                            borderRadius: "var(--r12)",
                            padding: "12px 16px",
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            boxShadow: "var(--sh-md)",
                            maxWidth: 340,
                            pointerEvents: "auto",
                            transform: t.visible ? "translateX(0)" : "translateX(120%)",
                            opacity: t.visible ? 1 : 0,
                            transition: "all .3s cubic-bezier(.4,0,.2,1)",
                        }}>
                            <span style={{ width: 16, height: 16, color: style.color, flexShrink: 0 }}>{style.icon}</span>
                            <span style={{ fontSize: 13.5, fontWeight: 500, color: "var(--t1)", lineHeight: 1.45, flex: 1 }}>{t.msg}</span>
                            <button onClick={() => dismiss(t.id)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--t3)", padding: 2, display: "flex", flexShrink: 0 }}>
                                <span style={{ width: 14, height: 14 }}>{I.X}</span>
                            </button>
                        </div>
                    );
                })}
            </div>
        </ToastContext.Provider>
    );
}
