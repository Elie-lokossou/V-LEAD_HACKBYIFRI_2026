import { useEffect } from "react";
import { I } from "../utils/icons.jsx";
import { useApp } from "../context/AppContext.jsx";

export default function Shell({ page, setPage, children }) {
    const { unreadCount, userRole } = useApp();

    const studentNav = [
        { id: "dashboard", label: "Tableau de bord", icon: I.Home, s: "nav" },
        { id: "alerts", label: "Alertes", icon: I.Alert, s: "nav" },
        { id: "launch", label: "Lancer une alerte", icon: I.Plus, s: "nav" },
        { id: "history", label: "Historique", icon: I.History, s: "com" },
        { id: "leaderboard", label: "Classement", icon: I.Trophy, s: "com" },
        { id: "chatbot", label: "PeerBuddy", icon: I.Brain, s: "com" },
        { id: "notifs", label: "Notifications", icon: I.Bell, s: "acc" },
        { id: "profile", label: "Mon profil", icon: I.User, s: "acc" },
    ];

    const adminNav = [
        { id: "admin", label: "Administration", icon: I.Shield, s: "nav" },
        { id: "students", label: "Étudiants", icon: I.Users, s: "nav" },
        { id: "sys-alerts", label: "Alertes du système", icon: I.Alert, s: "nav" },
        { id: "stats", label: "Statistiques", icon: I.BarChart, s: "nav" },
        { id: "notifs", label: "Notifications", icon: I.Bell, s: "acc" },
        { id: "profile", label: "Mon profil admin", icon: I.User, s: "acc" },
    ];

    const currentNav = userRole === "admin" ? adminNav : studentNav;

    const handleNav = (id) => setPage(id);

    const NavItem = ({ n }) => (
        <button key={n.id} className={`nav-item${page === n.id ? " active" : ""}`} onClick={() => handleNav(n.id)} style={{ position: "relative" }}>
            <span style={{ width: 18, height: 18 }}>{n.icon}</span>
            {n.label}
            {n.id === "notifs" && unreadCount > 0 && (
                <span style={{
                    marginLeft: "auto",
                    background: "var(--b300)",
                    color: "white",
                    fontSize: 10.5,
                    fontWeight: 700,
                    borderRadius: "var(--rpill)",
                    padding: "2px 7px",
                    minWidth: 20,
                    textAlign: "center",
                    animation: "pulseDot 2s infinite",
                }}>{unreadCount}</span>
            )}
        </button>
    );

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <aside className="sidebar">
                <div className="logo-wrap">
                    <div className="logo-mark">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                    </div>
                    <span className="logo-text">PeerAlert</span>
                </div>

                <div className="nav-section">Navigation</div>
                {currentNav.filter(n => n.s === "nav").map(n => <NavItem key={n.id} n={n} />)}

                {userRole !== "admin" && (
                    <>
                        <div className="nav-section" style={{ marginTop: 8 }}>Communauté</div>
                        {currentNav.filter(n => n.s === "com").map(n => <NavItem key={n.id} n={n} />)}
                    </>
                )}

                <div className="nav-section" style={{ marginTop: 8 }}>Compte</div>
                {currentNav.filter(n => n.s === "acc").map(n => <NavItem key={n.id} n={n} />)}

                <div className="sidebar-bottom">
                    <button className="nav-item" onClick={() => setPage("landing")} style={{ color: "rgba(255,255,255,.35)" }}>
                        <span style={{ width: 18, height: 18 }}>{I.LogOut}</span>Déconnexion
                    </button>
                </div>
            </aside>

            {/* Mobile bottom nav */}
            <nav className="bnav">
                {(userRole === "admin" 
                    ? [currentNav[0], currentNav[1], currentNav[3], currentNav[5]] 
                    : [currentNav[0], currentNav[1], currentNav[5], currentNav[7]]
                ).map(n => (
                    <button key={n.id} className={`bni${page === n.id ? " active" : ""}`} onClick={() => handleNav(n.id)}>
                        {n.icon}
                        <span>{n.label.split(" ")[0]}</span>
                    </button>
                ))}
            </nav>

            <main className="main" style={{ position: "relative", flex: 1 }}>
                <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
                    {children}
                </div>
            </main>
        </div>
    );
}
