import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { supabase } from "../lib/supabase.js";
import { ALERTS } from "../data/alerts.js";
import { NOTIFS } from "../data/notifications.js";

const AppContext = createContext(null);
export const useApp = () => useContext(AppContext);

// Live alert feed
const LIVE_ALERTS = [
    { id: 100, subject: "Physique", notion: "Lois de Newton", type: "Exercice bloquant", time: "Dans 30 min", spots: 2, taken: 0, author: "S. Bello", level: "L1", filiere: "SEIoT", urgent: true, expert: false },
    { id: 101, subject: "Bases de données", notion: "Jointures SQL", type: "Compréhension du cours", time: "Ce soir 21h", spots: 3, taken: 1, author: "F. Omar", level: "L1", filiere: "Génie Logiciel", urgent: false, expert: true },
    { id: 102, subject: "Cybersécurité", notion: "Chiffrement RSA", type: "Schéma difficile", time: "Demain 10h", spots: 2, taken: 0, author: "A. Mensah", level: "L2", filiere: "Cybersécurité", urgent: false, expert: false },
];

export function AppProvider({ children }) {
    const [alerts, setAlerts] = useState([...ALERTS]);
    const [notifs, setNotifs] = useState([...NOTIFS]);
    const [acceptedAlerts, setAcceptedAlerts] = useState(new Set());
    const [liveAlertIndex, setLiveAlertIndex] = useState(0);
    const [userRole, setUserRole] = useState("student");
    const [activeSession, setActiveSession] = useState(null);
    const [userPoints, setUserPoints] = useState(0);
    const [currentUser, setCurrentUser] = useState(null);
    const [authLoading, setAuthLoading] = useState(true);

    const refreshProfile = useCallback(async (userId) => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();
            
            if (error) throw error;

            if (data) {
                setCurrentUser(data);
                setUserRole(data.role || "student");
                setUserPoints(data.points || 0);
            }
            return data;
        } catch (err) {
            console.error("Error refreshing profile:", err);
            // Fallback to minimal user info if profile fetch fails
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setCurrentUser({ id: user.id, email: user.email, full_name: user.email.split('@')[0] });
            }
        }
    }, []);

    useEffect(() => {
        let mounted = true;

        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!mounted) return;
            if (session) {
                refreshProfile(session.user.id).finally(() => setAuthLoading(false));
            } else {
                setAuthLoading(false);
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!mounted) return;
            if (session) {
                refreshProfile(session.user.id);
            } else {
                setCurrentUser(null);
                setUserRole("student");
                setUserPoints(0);
                setAuthLoading(false);
            }
        });

        return () => {
            mounted = false;
            subscription.unsubscribe();
        };
    }, [refreshProfile]);

    const addPoints = useCallback((pts) => {
        setUserPoints(prev => prev + pts);
        // Sync with DB if connected
        if (currentUser) {
            supabase.from('profiles')
                .update({ points: (currentUser.points || 0) + pts })
                .eq('id', currentUser.id)
                .then(() => refreshProfile(currentUser.id));
        }
    }, [currentUser, refreshProfile]);

    // Unread count
    const unreadCount = notifs.filter(n => !n.read).length;

    // Mark all notifs as read
    const clearNotifs = useCallback(() => {
        setNotifs(prev => prev.map(n => ({ ...n, read: true })));
    }, []);

    // Accept alert
    const acceptAlert = useCallback((alertId, role, onSuccess) => {
        setAcceptedAlerts(prev => new Set([...prev, alertId]));
        const a = alerts.find(x => x.id === alertId);
        if (a) {
            setAlerts(prev => prev.map(al => al.id === alertId ? { 
                ...al, 
                taken: al.taken + 1,
                expert: role === "expert" ? true : al.expert 
            } : al));
            
            // Set as active session
            setActiveSession({
                id: alertId,
                role: role,
                notion: a.notion,
                subject: a.subject,
                time: a.time,
                confirmed: false
            });

            const roleLabel = role === "expert" ? "Aidant expert" : "Aidant apprenant";
            const newNotif = {
                id: Date.now(),
                type: "quiz",
                title: `Session rejointe — ${a.subject}`,
                msg: `Vous avez rejoint la session sur "${a.notion}" en tant qu'${roleLabel.toLowerCase()}`,
                time: "À l'instant",
                read: false,
            };
            setNotifs(prev => [newNotif, ...prev]);
        }
        onSuccess?.();
    }, [alerts]);

    // Cancel session
    const cancelActiveSession = useCallback(() => {
        if (!activeSession) return;
        setAlerts(prev => prev.map(a => a.id === activeSession.id ? { ...a, taken: Math.max(0, a.taken - 1) } : a));
        setAcceptedAlerts(prev => {
            const n = new Set(prev);
            n.delete(activeSession.id);
            return n;
        });
        setActiveSession(null);
    }, [activeSession]);

    // Confirm session
    const confirmActiveSession = useCallback(() => {
        setActiveSession(prev => prev ? { ...prev, confirmed: true } : null);
    }, []);

    // Dismiss alert
    const dismissAlert = useCallback((alertId) => {
        setAlerts(prev => prev.filter(a => a.id !== alertId));
    }, []);

    // Add new alert
    const addAlert = useCallback((newAlert) => {
        setAlerts(prev => [{
            ...newAlert,
            id: Date.now(),
            taken: 0,
            author: "Moi", // Mocked author
            level: "L1",
            filiere: "Intelligence Artificielle",
            expert: false // A new help request starts with no expert
        }, ...prev]);
        
        // Add a notification for the created alert
        const newNotif = {
            id: Date.now() + 2,
            type: "alert",
            title: "Alerte lancée !",
            msg: `Votre demande sur "${newAlert.notion}" est maintenant visible par la communauté.`,
            time: "À l'instant",
            read: false,
        };
        setNotifs(prev => [newNotif, ...prev]);
    }, []);

    // Live simulation — new alert every 35s
    useEffect(() => {
        const timer = setInterval(() => {
            const next = LIVE_ALERTS[liveAlertIndex % LIVE_ALERTS.length];
            const newAlert = { ...next, id: Date.now() };
            setAlerts(prev => [newAlert, ...prev]);
            // Add notif
            setNotifs(prev => [{
                id: Date.now() + 1,
                type: "alert",
                title: `Nouvelle alerte — ${newAlert.subject}`,
                msg: `${newAlert.author} cherche de l'aide sur "${newAlert.notion}"`,
                time: "À l'instant",
                read: false,
            }, ...prev]);
            setLiveAlertIndex(i => i + 1);
        }, 35000);
        return () => clearInterval(timer);
    }, [liveAlertIndex]);

    return (
        <AppContext.Provider value={{ alerts, notifs, unreadCount, acceptAlert, addAlert, dismissAlert, clearNotifs, acceptedAlerts, userRole, setUserRole, activeSession, setActiveSession, cancelActiveSession, confirmActiveSession, userPoints, addPoints, currentUser, authLoading }}>
            {children}
        </AppContext.Provider>
    );
}
