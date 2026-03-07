import { useState, useEffect } from "react";
import { AppProvider, useApp } from "./context/AppContext.jsx";
import { ToastProvider, useToast } from "./components/ToastProvider.jsx";
import { I } from "./utils/icons.jsx";
import Shell from "./components/Shell.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import AlertsPage from "./pages/AlertsPage.jsx";
import LaunchPage from "./pages/LaunchPage.jsx";
import SessionPage from "./pages/SessionPage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import HistoryPage from "./pages/HistoryPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import NotifsPage from "./pages/NotifsPage.jsx";
import LeaderboardPage from "./pages/LeaderboardPage.jsx";
import ChatbotPage from "./pages/ChatbotPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import AdminStudentsPage from "./pages/AdminStudentsPage.jsx";
import AdminAlertsPage from "./pages/AdminAlertsPage.jsx";
import AdminStatsPage from "./pages/AdminStatsPage.jsx";

function SessionStickyCard({ setPage }) {
    const { activeSession, cancelActiveSession, confirmActiveSession } = useApp();
    const [timeLeft, setTimeLeft] = useState(100); // Percentage for progress bar
    const toast = useToast();

    useEffect(() => {
        if (!activeSession || activeSession.confirmed) return;

        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 0) {
                    clearInterval(interval);
                    cancelActiveSession();
                    toast("Session expirée — tu n'as pas confirmé", "error");
                    return 0;
                }
                return prev - 0.5; // Decrease over time
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [activeSession, cancelActiveSession, toast]);

    if (!activeSession || activeSession.confirmed) return null;

    return (
        <div style={{ position: "fixed", bottom: 24, right: 24, width: 300, background: "white", borderRadius: "var(--r12)", boxShadow: "0 12px 40px rgba(0,0,0,.15)", padding: 20, zIndex: 9999, border: "1.5px solid var(--b100)", animation: "rise .4s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div>
                    <div style={{ fontSize: 11, color: "var(--b500)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".05em" }}>Session à venir</div>
                    <div style={{ fontWeight: 700, fontSize: 15, color: "var(--t1)", marginTop: 2 }}>{activeSession.notion}</div>
                </div>
                <div className={`tag ${activeSession.role === "expert" ? "tag-green" : "tag-blue"}`} style={{ fontSize: 10 }}>{activeSession.role === "expert" ? "Expert" : "Apprenant"}</div>
            </div>

            <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--t3)", marginBottom: 6 }}>
                    <span>Confirmation requise</span>
                    <span>{activeSession.time}</span>
                </div>
                <div className="prog" style={{ height: 6 }}><div className="prog-fill" style={{ width: `${timeLeft}%`, transition: "width 1s linear" }} /></div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
                <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: "center" }} onClick={() => setPage("quiz")}>Confirmer</button>
                <button className="btn btn-ghost btn-sm" onClick={cancelActiveSession}>Annuler</button>
            </div>
        </div>
    );
}

function AppInner() {
    const { currentUser, authLoading } = useApp();
    const [page, setPage] = useState("landing");
    const nav = p => setPage(p);

    // Auto-redirect on load if session exists
    useEffect(() => {
        if (!authLoading && currentUser) {
            setPage(currentUser.role === "admin" ? "admin" : "dashboard");
        }
    }, [authLoading, currentUser]);

    if (authLoading) return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--s1)", gap: 20 }}>
            <div style={{ position: "relative", width: 60, height: 60 }}>
                <div className="td" style={{ position: "absolute", top: 0, left: 26, animation: "typeDot 1s infinite" }} />
                <div className="td" style={{ position: "absolute", top: 26, left: 0, animation: "typeDot 1s infinite .2s" }} />
                <div className="td" style={{ position: "absolute", top: 26, left: 52, animation: "typeDot 1s infinite .4s" }} />
                <div className="td" style={{ position: "absolute", bottom: 0, left: 26, animation: "typeDot 1s infinite .6s" }} />
            </div>
            <div style={{ fontFamily: "DM Serif Display, serif", fontSize: 20, color: "var(--b700)", letterSpacing: ".02em" }}>PeerAlert</div>
            <div style={{ fontSize: 13, color: "var(--t4)", fontWeight: 500 }}>Synchronisation de votre profil...</div>
        </div>
    );

    if (page === "landing") return <LandingPage setPage={nav} />;
    if (page === "login") return <AuthPage setPage={nav} mode="login" />;
    if (page === "register") return <AuthPage setPage={nav} mode="register" />;
    if (page === "session") return <SessionPage setPage={nav} />;
    if (page === "quiz") return <QuizPage setPage={nav} />;

    return (
        <Shell page={page} setPage={nav}>
            {page === "dashboard" && <DashboardPage setPage={nav} />}
            {page === "alerts" && <AlertsPage setPage={nav} />}
            {page === "launch" && <LaunchPage setPage={nav} />}
            {page === "history" && <HistoryPage />}
            {page === "profile" && <ProfilePage setPage={nav} />}
            {page === "notifs" && <NotifsPage setPage={nav} />}
            {page === "leaderboard" && <LeaderboardPage />}
            {page === "chatbot" && <ChatbotPage />}
            {page === "admin" && <AdminPage setPage={nav} />}
            {page === "students" && <AdminStudentsPage />}
            {page === "sys-alerts" && <AdminAlertsPage />}
            {page === "stats" && <AdminStatsPage />}
            <SessionStickyCard setPage={nav} />
        </Shell>
    );
}

export default function App() {
    return (
        <AppProvider>
            <ToastProvider>
                <AppInner />
            </ToastProvider>
        </AppProvider>
    );
}
