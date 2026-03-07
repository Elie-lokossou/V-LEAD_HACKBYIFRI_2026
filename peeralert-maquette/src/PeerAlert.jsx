import { useState, useEffect, useRef } from "react";

// ─── STYLE INJECTION ────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');
:root {
  --navy:#0E1F45;--blue:#1D4ED8;--blue2:#2563EB;--sky:#38BDF8;
  --teal:#0D9488;--amber:#F59E0B;--amber2:#FCD34D;
  --green:#10B981;--red:#EF4444;--purple:#7C3AED;
  --bg:#EDF1FA;--surface:#FFFFFF;--s2:#F7F9FE;--s3:#EEF3FF;
  --border:#E1E8F4;--text:#0E1C38;--t2:#4A5878;--muted:#8999B8;
  --sh:0 2px 16px rgba(14,31,69,.08);--shl:0 8px 40px rgba(14,31,69,.14);
  --r:16px;--rsm:10px;--rxl:24px;
}
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{font-family:'Plus Jakarta Sans',sans-serif;background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased;overflow-x:hidden;}
h1,h2,h3,h4,h5,.sora{font-family:'Sora',sans-serif;}
::-webkit-scrollbar{width:5px;height:5px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:3px;}

@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
@keyframes slideR{from{opacity:0;transform:translateX(-16px)}to{opacity:1;transform:translateX(0)}}
@keyframes slideL{from{opacity:0;transform:translateX(20px)}to{opacity:1;transform:translateX(0)}}
@keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
@keyframes gradBG{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
@keyframes typDot{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-6px);opacity:1}}
@keyframes pulse{0%{transform:scale(1);opacity:.6}100%{transform:scale(1.9);opacity:0}}
@keyframes spinSlow{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes shimmer{0%{background-position:-300px 0}100%{background-position:calc(300px + 100%) 0}}
@keyframes starPop{0%{transform:scale(0) rotate(-30deg);opacity:0}60%{transform:scale(1.2) rotate(5deg);opacity:1}100%{transform:scale(1) rotate(0deg);opacity:1}}
@keyframes countBounce{0%{transform:scale(0.7);opacity:0}70%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
@keyframes orb1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(60px,-40px) scale(1.1)}66%{transform:translate(-30px,50px) scale(.9)}}
@keyframes orb2{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-50px,30px) scale(1.05)}66%{transform:translate(40px,-60px) scale(.95)}}

.au1{animation:fadeUp .5s ease both}
.au2{animation:fadeUp .5s .1s ease both}
.au3{animation:fadeUp .5s .2s ease both}
.au4{animation:fadeUp .5s .3s ease both}
.au5{animation:fadeUp .5s .45s ease both}
.au6{animation:fadeUp .5s .6s ease both}
.ai{animation:fadeIn .4s ease both}

.glass{background:rgba(255,255,255,.72);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.85);}
.glass-d{background:rgba(14,31,69,.18);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,.15);}

.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:11px 24px;border-radius:50px;border:none;font-family:'Sora',sans-serif;font-weight:600;font-size:14px;cursor:pointer;transition:all .22s ease;white-space:nowrap;letter-spacing:.01em;}
.btn-navy{background:var(--navy);color:white;}
.btn-navy:hover{background:#16316e;transform:translateY(-2px);box-shadow:0 8px 20px rgba(14,31,69,.3);}
.btn-blue{background:var(--blue2);color:white;}
.btn-blue:hover{background:var(--blue);transform:translateY(-2px);box-shadow:0 8px 20px rgba(37,99,235,.3);}
.btn-amber{background:var(--amber);color:var(--navy);font-weight:700;}
.btn-amber:hover{background:var(--amber2);transform:translateY(-2px);box-shadow:0 8px 20px rgba(245,158,11,.35);}
.btn-ghost{background:transparent;color:var(--navy);border:1.5px solid var(--border);}
.btn-ghost:hover{border-color:var(--blue2);background:rgba(37,99,235,.05);}
.btn-ghost-w{background:transparent;color:white;border:1.5px solid rgba(255,255,255,.4);}
.btn-ghost-w:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.7);}
.btn-sm{padding:7px 16px;font-size:12px;}
.btn-lg{padding:15px 36px;font-size:16px;}
.btn-xs{padding:5px 12px;font-size:11px;}

.card{background:var(--surface);border-radius:var(--r);border:1px solid var(--border);box-shadow:var(--sh);}

.inp{background:var(--s2);border:1.5px solid var(--border);border-radius:var(--rsm);padding:11px 15px;font-family:'Plus Jakarta Sans',sans-serif;font-size:14.5px;color:var(--text);outline:none;width:100%;transition:all .2s;}
.inp:focus{border-color:var(--blue2);background:white;box-shadow:0 0 0 3px rgba(37,99,235,.1);}
select.inp{appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%238999B8' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;padding-right:36px;}
textarea.inp{resize:vertical;min-height:80px;}
.lbl{font-family:'Sora',sans-serif;font-size:12px;font-weight:600;color:var(--t2);letter-spacing:.04em;text-transform:uppercase;margin-bottom:6px;display:block;}

/* SIDEBAR */
.sidebar{width:252px;background:white;border-right:1px solid var(--border);position:fixed;top:0;left:0;height:100vh;display:flex;flex-direction:column;padding:22px 14px;z-index:200;overflow-y:auto;}
.sidebar-logo{font-family:'Sora',sans-serif;font-weight:800;font-size:21px;color:var(--navy);display:flex;align-items:center;gap:10px;margin-bottom:28px;padding:0 8px;}
.nav-item{display:flex;align-items:center;gap:12px;padding:11px 13px;border-radius:12px;cursor:pointer;font-family:'Sora',sans-serif;font-weight:500;font-size:13.5px;color:var(--t2);transition:all .2s;margin-bottom:2px;position:relative;border:none;background:transparent;width:100%;text-align:left;}
.nav-item:hover{background:var(--s2);color:var(--navy);}
.nav-item.active{background:rgba(14,31,69,.08);color:var(--navy);font-weight:700;}
.nav-notif{position:absolute;top:8px;right:10px;width:7px;height:7px;background:var(--amber);border-radius:50%;border:2px solid white;}

/* MAIN */
.main{flex:1;margin-left:252px;padding:28px 32px;min-height:100vh;}
.page-wrap{animation:fadeIn .3s ease;}

/* BOTTOM NAV */
.bnav{display:none;position:fixed;bottom:0;left:0;right:0;background:rgba(255,255,255,.96);backdrop-filter:blur(20px);border-top:1px solid var(--border);padding:8px 4px 16px;z-index:200;justify-content:space-around;}
.bni{display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;padding:4px 10px;color:var(--muted);font-size:10px;font-weight:600;font-family:'Sora',sans-serif;border-radius:10px;transition:all .2s;border:none;background:transparent;}
.bni.active{color:var(--navy);}
.bni svg{width:21px;height:21px;}

/* ALERT CARD */
.ac{background:white;border-radius:var(--r);padding:18px;border:1px solid var(--border);box-shadow:var(--sh);transition:all .25s;cursor:pointer;}
.ac:hover{transform:translateY(-3px);box-shadow:var(--shl);border-color:var(--blue2);}

/* TAGS / CHIPS */
.tag{display:inline-flex;align-items:center;gap:5px;padding:4px 11px;border-radius:50px;font-size:12px;font-weight:700;font-family:'Sora',sans-serif;}
.tag-blue{background:rgba(37,99,235,.1);color:var(--blue);}
.tag-green{background:#D1FAE5;color:#065F46;}
.tag-amber{background:#FEF3C7;color:#92400E;}
.tag-red{background:#FEE2E2;color:#DC2626;}
.tag-purple{background:#EDE9FE;color:#5B21B6;}
.tag-gray{background:#F3F4F6;color:#374151;}

.chip{background:rgba(14,31,69,.07);color:var(--navy);border:1px solid rgba(14,31,69,.12);padding:7px 14px;border-radius:50px;font-size:13px;font-weight:600;cursor:pointer;transition:all .2s;white-space:nowrap;font-family:'Plus Jakarta Sans',sans-serif;}
.chip:hover,.chip.on{background:var(--navy);color:white;border-color:var(--navy);}

/* BUBBLE */
.bbl-bot{background:white;border:1px solid var(--border);border-radius:18px 18px 18px 4px;padding:13px 17px;max-width:80%;box-shadow:var(--sh);animation:slideR .3s ease;font-size:14px;line-height:1.6;color:var(--text);}
.bbl-usr{background:var(--navy);color:white;border-radius:18px 18px 4px 18px;padding:13px 17px;max-width:80%;margin-left:auto;animation:slideL .3s ease;font-size:14px;line-height:1.6;}

/* QUIZ */
.qopt{background:var(--s2);border:2px solid var(--border);border-radius:var(--rsm);padding:14px 18px;cursor:pointer;transition:all .2s;font-size:14.5px;text-align:left;width:100%;margin-bottom:10px;font-family:'Plus Jakarta Sans',sans-serif;color:var(--text);}
.qopt:hover{border-color:var(--blue2);background:rgba(37,99,235,.05);}
.qopt.sel{border-color:var(--blue2);background:rgba(37,99,235,.08);color:var(--navy);font-weight:600;}
.qopt.ok{border-color:var(--green);background:#D1FAE5;color:#065F46;font-weight:600;}
.qopt.ko{border-color:var(--red);background:#FEE2E2;color:#991B1B;}

/* BADGES */
.bdg{display:inline-flex;align-items:center;gap:5px;padding:4px 12px;border-radius:50px;font-size:11px;font-weight:700;font-family:'Sora',sans-serif;}
.bdg-n{background:#E0E7FF;color:#3730A3;}
.bdg-a{background:#D1FAE5;color:#065F46;}
.bdg-e{background:#FEF3C7;color:#92400E;}
.bdg-m{background:#FCE7F3;color:#9D174D;}

/* PROGRESS */
.prog{background:var(--border);border-radius:50px;height:8px;overflow:hidden;}
.prog-f{height:100%;border-radius:50px;background:linear-gradient(90deg,var(--blue2),var(--teal));transition:width .6s ease;}

/* AVATAR */
.av{border-radius:50%;background:linear-gradient(135deg,var(--blue2),var(--navy));display:flex;align-items:center;justify-content:center;color:white;font-family:'Sora',sans-serif;font-weight:700;flex-shrink:0;}

/* NOTIF */
.ni{display:flex;gap:13px;padding:15px;border-radius:var(--r);border:1px solid var(--border);background:white;transition:all .2s;cursor:pointer;margin-bottom:8px;}
.ni:hover{border-color:var(--blue2);}
.ni.unread{border-left:3px solid var(--blue2);}

/* ONLINE */
.odot{width:10px;height:10px;background:var(--green);border-radius:50%;border:2px solid white;position:relative;flex-shrink:0;}
.odot::after{content:'';position:absolute;top:-3px;left:-3px;right:-3px;bottom:-3px;border-radius:50%;background:var(--green);animation:pulse 2s infinite;opacity:.4;}

/* HERO */
.hero{background:linear-gradient(140deg,#060D1E 0%,#0D1B3E 35%,#0E2060 65%,#1232A0 100%);background-size:300% 300%;animation:gradBG 12s ease infinite;min-height:100vh;position:relative;overflow:hidden;}
.orb{position:absolute;border-radius:50%;filter:blur(80px);}

/* LANDING SECTIONS */
.lsec{padding:88px 40px;max-width:1240px;margin:0 auto;}
.feat-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;margin-top:48px;}
.feat-card{background:white;border-radius:20px;padding:28px;border:1px solid var(--border);transition:all .3s;position:relative;overflow:hidden;}
.feat-card:hover{transform:translateY(-6px);box-shadow:var(--shl);}
.feat-card::before{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:linear-gradient(90deg,var(--blue2),var(--teal));}

.how-step{display:flex;gap:20px;align-items:flex-start;padding:18px 0;position:relative;}
.how-num{width:50px;height:50px;border-radius:14px;background:var(--navy);color:white;display:flex;align-items:center;justify-content:center;font-family:'Sora',sans-serif;font-weight:800;font-size:17px;flex-shrink:0;box-shadow:0 4px 12px rgba(14,31,69,.25);}

/* STAT CARD */
.statw{background:var(--navy);color:white;border-radius:var(--r);padding:20px;}

/* RANK ROW */
.rkrow{display:flex;align-items:center;gap:13px;padding:13px 16px;border-radius:var(--r);background:white;border:1px solid var(--border);margin-bottom:8px;transition:all .2s;}
.rkrow:hover{border-color:var(--blue2);}
.rkrow.me{border:2px solid var(--blue2);background:rgba(37,99,235,.03);}

/* PART ROW */
.prow{display:flex;align-items:center;gap:12px;padding:11px 15px;border-radius:var(--rsm);background:var(--s2);border:1px solid var(--border);margin-bottom:8px;}

/* GRAD TEXT */
.gtext{background:linear-gradient(120deg,#60A5FA,#34D399);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}

/* FLOATING CARD */
.fl-card{border-radius:16px;padding:16px 20px;animation:floatY 3s ease-in-out infinite;}
.fl-card:nth-child(2){animation-delay:1s;}
.fl-card:nth-child(3){animation-delay:2s;}

/* SCROLL CHIPS */
.chips-row{display:flex;gap:8px;overflow-x:auto;padding-bottom:4px;scrollbar-width:none;}
.chips-row::-webkit-scrollbar{display:none;}

/* TYPING */
.td{width:8px;height:8px;background:var(--muted);border-radius:50%;animation:typDot 1.2s infinite;}
.td:nth-child(2){animation-delay:.2s;}
.td:nth-child(3){animation-delay:.4s;}

/* DIVIDER */
.div{height:1px;background:var(--border);margin:18px 0;}

/* SESSION TIMER */
.timer-circle{width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,var(--navy),var(--blue2));display:flex;align-items:center;justify-content:center;color:white;font-family:'Sora',sans-serif;font-weight:700;font-size:22px;box-shadow:0 4px 20px rgba(37,99,235,.35);}

@media(max-width:768px){
  .sidebar{display:none !important;}
  .main{margin-left:0;padding:0;padding-bottom:76px;}
  .bnav{display:flex;}
  .desk{display:none !important;}
}
@media(min-width:769px){
  .mob{display:none !important;}
}
`;

function injectCSS() {
  if (document.getElementById("pa-css")) return;
  const el = document.createElement("style");
  el.id = "pa-css";
  el.innerHTML = CSS;
  document.head.appendChild(el);
}

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Ic = {
  Home: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Bell: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>,
  User: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  History: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="12 8 12 12 14 14"/><path d="M3.05 11a9 9 0 1 0 .5-4.5M3 4v4h4"/></svg>,
  Chat: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>,
  Trophy: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 21 12 17 16 21"/><line x1="12" y1="17" x2="12" y2="11"/><path d="M7 4H4a2 2 0 000 4c0 5.5 3.5 9.3 8 10 4.5-.7 8-4.5 8-10a2 2 0 000-4h-3"/><line x1="7" y1="4" x2="17" y2="4"/></svg>,
  Alert: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  Plus: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Send: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Check: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  X: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Star: () => <svg viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Book: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
  Zap: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  Brain: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 017 4.5v.1A2.5 2.5 0 014.5 7a2.5 2.5 0 000 5 2.5 2.5 0 002.5 2.5v.1A2.5 2.5 0 019.5 17h5a2.5 2.5 0 002.5-2.4v-.1A2.5 2.5 0 0119.5 12a2.5 2.5 0 000-5 2.5 2.5 0 00-2.5-2.4V4.5A2.5 2.5 0 0014.5 2h-5z"/></svg>,
  Clock: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  Users: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  Shield: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Eye: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  EyeOff: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>,
  ChevRight: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>,
  Heart: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>,
  Settings: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>,
  LogOut: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const ALERTS = [
  { id:1, subject:"Algorithmique", notion:"Récursivité", type:"Exercice bloquant", time:"18h00–19h30", spots:3, spotsTaken:1, author:"Kaylhia T.", level:"L1", filiere:"IA", urgent:true, hasExpert:false },
  { id:2, subject:"Mathématiques", notion:"Intégrales par parties", type:"Compréhension du cours", time:"20h00–21h00", spots:2, spotsTaken:1, author:"Charles A.", level:"L1", filiere:"Cybersécurité", urgent:false, hasExpert:true },
  { id:3, subject:"Réseaux", notion:"Protocoles TCP/IP", type:"Schéma difficile", time:"Demain 14h", spots:4, spotsTaken:2, author:"Elvina A.", level:"L1", filiere:"SEIoT", urgent:false, hasExpert:true },
  { id:4, subject:"Programmation Web", notion:"Hooks React", type:"Exercice bloquant", time:"Ce soir 21h", spots:3, spotsTaken:0, author:"John E.", level:"L1", filiere:"Internet & Multimédia", urgent:true, hasExpert:false },
];
const HISTORY = [
  { id:1, subject:"Algorithmique", notion:"Tableaux dynamiques", role:"aidant", date:"28 Feb 2026", pts:42, quizScore:85, validated:true },
  { id:2, subject:"Mathématiques", notion:"Dérivées", role:"demandeur", date:"25 Feb 2026", pts:28, quizScore:70, validated:true },
  { id:3, subject:"Réseaux", notion:"Adressage IP", role:"aidant", date:"20 Feb 2026", pts:35, quizScore:90, validated:true },
  { id:4, subject:"Bases de données", notion:"Jointures SQL", role:"demandeur", date:"15 Feb 2026", pts:0, quizScore:40, validated:false },
];
const NOTIFS = [
  { id:1, type:"alert", title:"Nouvelle alerte : Algorithmique", msg:"Kaylhia T. cherche de l'aide sur la récursivité", time:"Il y a 5 min", read:false },
  { id:2, type:"badge", title:"🎉 Badge débloqué !", msg:"Tu es maintenant Actif ! Continue comme ça.", time:"Il y a 2h", read:false },
  { id:3, type:"quiz", title:"Quiz validé ✅", msg:"Session avec Charles A. confirmée — +42 points", time:"Hier", read:true },
  { id:4, type:"alert", title:"Nouvelle alerte : Réseaux", msg:"Elvina A. cherche de l'aide sur TCP/IP", time:"Hier", read:true },
  { id:5, type:"chatbot", title:"PeerBuddy 🧠", msg:"Ton check-in du matin : comment tu te sens aujourd'hui ?", time:"Ce matin", read:false },
];
const LEADERBOARD = [
  { rank:1, name:"Nabrothe K.", filiere:"Génie Logiciel", pts:412, badge:"mentor", sessions:23 },
  { rank:2, name:"Charles A.", filiere:"Cybersécurité", pts:287, badge:"expert", sessions:15 },
  { rank:3, name:"Victoria T.", filiere:"IA", pts:234, badge:"expert", sessions:12 },
  { rank:4, name:"John E.", filiere:"Internet & Multimédia", pts:183, badge:"expert", sessions:10 },
  { rank:5, name:"Elvina A.", filiere:"SEIoT", pts:127, badge:"actif", sessions:7 },
  { rank:6, name:"Kaylhia T.", filiere:"IA", pts:84, badge:"actif", sessions:4, me:true },
  { rank:7, name:"Ange M.", filiere:"GL", pts:61, badge:"actif", sessions:3 },
  { rank:8, name:"Fadil O.", filiere:"Cybersécurité", pts:32, badge:"novice", sessions:2 },
];

// ─── CHATBOT KNOWLEDGE BASE ───────────────────────────────────────────────────
const KB = {
  stress: [
    "Je comprends ce stress 😔 — l'examen approche et la pression monte. Commence par une technique simple : inspire 4 secondes, retiens 4s, expire 6s. Répète 5 fois. Ça calme le système nerveux en moins de 3 minutes. Tu peux le faire maintenant, avant de continuer à réviser.",
    "Le stress académique, c'est réel et légitime. Ce qui aide : isoler la source exacte du stress. Est-ce le manque de temps ? La difficulté du contenu ? La peur d'échouer ? Si tu identifies précisément ce qui te stresse, on peut trouver une stratégie ciblée ensemble.",
    "Respire. Sérieusement. Quand tu te sens dépassé, ton cerveau est en mode survie — il n'absorbe plus bien. 5 minutes de marche rapide, même dans le couloir, peuvent réinitialiser ton état mental. Essaie ça, puis reviens au travail.",
    "Le stress n'est pas ton ennemi : c'est un signal que tu tiens à ta réussite. Mais au-delà d'un certain seuil, il bloque tout. Essaie la méthode des petits blocs : 25 min de travail, 5 min de pause. Et rappelle-toi : tu as déjà surmonté des situations difficiles avant.",
  ],
  burn: [
    "Le burn-out étudiant se reconnaît à l'épuisement même après avoir dormi, la perte de sens, l'irritabilité. Si tu ressens tout ça depuis plus de 2 semaines, parle à quelqu'un en dehors de tes cours — un ami de confiance, un conseiller, ou un parent.",
    "Quand tout semble vide ou trop lourd, c'est souvent signe que tu as besoin d'une vraie pause — pas 5 minutes, mais une demi-journée sans cours, sans révisions. Accorder cette pause n'est pas de la paresse, c'est de l'intelligence.",
    "Le burn-out, c'est quand ton réservoir est à sec. Avant de continuer, il faut recharger. Qu'est-ce qui te redonne de l'énergie ? (Musique, sport, amis, sommeil ?) Note 3 choses et planifie-les cette semaine, sérieusement dans ton agenda.",
  ],
  procrast: [
    "La procrastination, c'est souvent de l'évitement émotionnel : la tâche te stresse ou t'ennuie. Technique : engage-toi pour juste 2 minutes. Pose ton téléphone, ouvre le cours. Rien d'autre. Souvent, les 2 minutes deviennent 20.",
    "Ton cerveau fuit les tâches floues. Reformule 'réviser les réseaux' en 'relire les pages 12-24 sur TCP/IP et faire les 3 exercices'. Concrète, bornée. Bien plus facile à démarrer.",
    "Bloque les distractions avec intention : mode avion pendant 25 minutes, téléphone dans une autre pièce. Ce n'est pas une question de volonté, c'est une question de setup. Rends le travail plus facile que la distraction.",
    "La méthode Pomodoro marche bien contre la procrastination : 25 min travail → 5 min pause, 4 fois → grande pause de 20 min. Chaque Pomodoro terminé est une mini-victoire qui motive le suivant.",
  ],
  temps: [
    "Pour mieux gérer ton temps : chaque dimanche soir, planifie la semaine entière en blocs de 90 min maximum. Inclus les repas, le transport, le sport. Ce que tu n'écris pas dans ton agenda n'existe pas.",
    "Priorise avec la matrice Eisenhower : sépare tes tâches en Urgent+Important / Important+Non-Urgent / Urgent+Non-Important / Ni l'un ni l'autre. Concentre-toi sur la 2e case — les révisions régulières avant que ça devienne urgent.",
    "Chaque soir, écris juste 3 choses prioritaires pour le lendemain. Pas 10, juste 3. Si tu fais ces 3 choses, ta journée est réussie.",
    "Le temps perdu en transition (entre les cours, dans les transports) est sous-estimé. Utilise ces moments pour relire des flashcards, écouter un résumé audio, ou simplement souffler.",
  ],
  motiv: [
    "La motivation ne vient pas avant l'action — elle vient pendant. Commence, même sans envie. L'élan arrive après les premières minutes. C'est prouvé neurologiquement : l'action génère la dopamine qui motive.",
    "Rappelle-toi pourquoi tu es là. Pas les réponses génériques — ta vraie raison personnelle. Écris-la sur un post-it et colle-la sur ton bureau. Relie chaque révision à cette raison.",
    "Célèbre chaque petite victoire : un exercice résolu, un chapitre compris, une session PeerAlert terminée. Le cerveau qui réussit veut recommencer. Ne minimise pas tes progrès.",
    "Entoure-toi de personnes qui travaillent. L'environnement social est le meilleur levier de motivation. Une bibliothèque, un groupe de travail — la dynamique collective te porte.",
  ],
  exam: [
    "Pour les révisions d'examen : la répétition espacée > relire ses notes. Essaie Anki ou des flashcards papier. Revois une notion J+1, J+3, J+7, J+14 pour une mémorisation durable.",
    "La nuit avant un examen : dors. Pas de révision intensive. Ton cerveau consolide les apprentissages pendant le sommeil. Une bonne nuit vaut mieux que 4h de bachotage anxieux.",
    "Le jour de l'examen : mange quelque chose (le glucose = carburant du cerveau), arrive en avance, évite les camarades anxieux juste avant. Concentre-toi sur ta propre préparation.",
    "Technique active de révision : enseigne la notion à quelqu'un (ou à voix haute seul). Si tu peux l'expliquer simplement, tu l'as vraiment comprise. C'est la méthode Feynman.",
  ],
  reussite: [
    "La réussite académique n'est pas une question de talent — c'est une question de méthode et de régularité. Travailler un peu chaque jour bat largement les sessions marathon de dernière minute.",
    "Tu es capable de plus que tu ne le crois. Les difficultés que tu rencontres aujourd'hui sont normales — elles font partie de l'apprentissage. Chaque blocage surmonté te rend plus fort.",
    "Garde en tête : tous les étudiants qui te semblent brillants ont aussi leurs moments de doute. La différence, c'est qu'ils continuent malgré tout.",
  ],
  general: [
    "Je suis PeerBuddy, ton compagnon de bien-être académique 🧠 Je suis là pour t'aider à traverser les moments difficiles — stress, fatigue, manque de motivation. Comment tu te sens aujourd'hui ?",
    "Tu n'es pas seul(e) dans ce parcours. Des milliers d'étudiants traversent les mêmes défis. Et avec PeerAlert, tu as aussi des pairs prêts à t'aider sur les notions difficiles.",
    "Prends soin de toi autant que de tes révisions. Le bien-être mental est aussi important que les notes. Qu'est-ce qui te ferait du bien là, maintenant ?",
    "Je t'entends 💙 Ce que tu vis est réel. Continue de me parler — chaque problème partagé est un problème à moitié résolu.",
  ],
};

function getBotReply(msg) {
  const m = msg.toLowerCase();
  if (m.match(/stress|stressé|anxieux|angoiss|pression|peur|paniq/)) return KB.stress[Math.floor(Math.random()*KB.stress.length)];
  if (m.match(/burnout|burn.out|épuisé|vide|plus envie|ras.le.bol|fatigué/)) return KB.burn[Math.floor(Math.random()*KB.burn.length)];
  if (m.match(/procrast|flemme|remet|plus tard|distracti|réseaux sociaux|téléphone/)) return KB.procrast[Math.floor(Math.random()*KB.procrast.length)];
  if (m.match(/temps|organisat|planning|agenda|plan|emploi/)) return KB.temps[Math.floor(Math.random()*KB.temps.length)];
  if (m.match(/motiv|courag|envie|plus la force|abandon|renon/)) return KB.motiv[Math.floor(Math.random()*KB.motiv.length)];
  if (m.match(/exam|partiel|ds|contrôl|révise|révision|mémoris/)) return KB.exam[Math.floor(Math.random()*KB.exam.length)];
  if (m.match(/bien|super|ça va|content|heureux|confiant|réuss/)) return KB.reussite[Math.floor(Math.random()*KB.reussite.length)];
  return KB.general[Math.floor(Math.random()*KB.general.length)];
}

// ─── SHARED LAYOUT ────────────────────────────────────────────────────────────
function AppShell({ page, setPage, children }) {
  const nav = [
    { id:"dashboard", label:"Accueil", icon:<Ic.Home/> },
    { id:"alerts", label:"Alertes", icon:<Ic.Alert/> },
    { id:"history", label:"Historique", icon:<Ic.History/> },
    { id:"leaderboard", label:"Classement", icon:<Ic.Trophy/> },
    { id:"chatbot", label:"PeerBuddy", icon:<Ic.Brain/> },
    { id:"notifs", label:"Notifs", icon:<Ic.Bell/> },
    { id:"profile", label:"Profil", icon:<Ic.User/> },
  ];
  return (
    <div style={{display:"flex",minHeight:"100vh"}}>
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div style={{width:34,height:34,background:"linear-gradient(135deg,#1D4ED8,#0E1F45)",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <Ic.Zap style={{width:18,height:18,color:"white"}}/>
          </div>
          PeerAlert
        </div>
        {nav.map(n => (
          <button key={n.id} className={`nav-item${page===n.id?" active":""}`} onClick={()=>setPage(n.id)}>
            <span style={{width:20,height:20}}>{n.icon}</span>
            {n.label}
            {n.id==="notifs" && <span className="nav-notif"/>}
          </button>
        ))}
        <div style={{marginTop:"auto"}}>
          <div className="div"/>
          <button className="nav-item" onClick={()=>setPage("landing")}>
            <span style={{width:20,height:20}}><Ic.LogOut/></span>
            Déconnexion
          </button>
        </div>
      </aside>
      {/* BOTTOM NAV (mobile) */}
      <nav className="bnav">
        {[nav[0],nav[1],nav[4],nav[6],nav[2]].map(n=>(
          <button key={n.id} className={`bni${page===n.id?" active":""}`} onClick={()=>setPage(n.id)}>
            {n.icon}
            {n.label}
          </button>
        ))}
      </nav>
      {/* MAIN */}
      <main className="main">{children}</main>
    </div>
  );
}

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
function LandingPage({ setPage }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const feats = [
    { icon:"⚡", title:"Alertes en temps réel", desc:"Lance une alerte académique en 30 secondes. Des pairs disponibles et compétents te répondent immédiatement.", color:"#EEF2FF" },
    { icon:"🎯", title:"Matching intelligent", desc:"Algorithme par paliers : même filière → filières proches → niveaux supérieurs. Toujours au moins un expert par session.", color:"#F0FDF4" },
    { icon:"🏆", title:"Gamification motivante", desc:"Gagne des points uniquement si tu aides vraiment. Quiz de validation IA pour les deux parties après chaque session.", color:"#FFFBEB" },
    { icon:"🧠", title:"PeerBuddy — Chatbot Psy", desc:"Ton compagnon de bien-être académique disponible 24h/7j. Stress, procrastination, burn-out : réponses empathiques et actionnables.", color:"#FDF4FF" },
    { icon:"📊", title:"Intelligence pédagogique", desc:"L'admin voit en temps réel les notions les plus problématiques. Renforcement ciblé des cours qui en ont besoin.", color:"#FFF7F0" },
    { icon:"🔒", title:"Sécurisé & privé", desc:"Données chiffrées, authentification sécurisée. Uniquement accessible aux étudiants de l'établissement.", color:"#F0F9FF" },
  ];

  const steps = [
    { n:"01", t:"Crée ton profil", d:"Filière, niveau, disponibilités hebdomadaires. 2 minutes chrono." },
    { n:"02", t:"Lance une alerte", d:"Matière, notion précise, créneau, nombre de participants et ton lien WhatsApp." },
    { n:"03", t:"L'algorithme trouve tes pairs", d:"Les étudiants disponibles ET compétents reçoivent une notification ciblée. Au moins 1 expert par session garanti." },
    { n:"04", t:"Session d'entraide", d:"Rejoins la session WhatsApp ou en présentiel. L'aide arrive en moins de 10 minutes." },
    { n:"05", t:"Quiz de validation IA", d:"À la fin, quiz simultané pour toi (apprenant) et l'aidant. Les points sont attribués selon vos performances réelles." },
  ];

  return (
    <div style={{background:"white"}}>
      {/* FIXED NAV */}
      <div style={{position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"14px 40px",display:"flex",alignItems:"center",justifyContent:"space-between",background:scrolled?"rgba(255,255,255,0.95)":"transparent",backdropFilter:scrolled?"blur(20px)":"none",borderBottom:scrolled?"1px solid #E1E8F4":"none",transition:"all .3s"}}>
        <div style={{fontFamily:"Sora",fontWeight:800,fontSize:20,color:scrolled?"var(--navy)":"white",display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,background:"linear-gradient(135deg,#60A5FA,#1D4ED8)",borderRadius:9,display:"flex",alignItems:"center",justifyContent:"center"}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
          </div>
          PeerAlert
        </div>
        <div style={{display:"flex",gap:10}}>
          <button className="btn btn-ghost-w" style={{color:scrolled?"var(--navy)":"white",borderColor:scrolled?"var(--border)":"rgba(255,255,255,.4)"}} onClick={()=>setPage("login")}>Connexion</button>
          <button className="btn btn-amber" onClick={()=>setPage("register")}>Commencer — c'est gratuit</button>
        </div>
      </div>

      {/* HERO */}
      <div className="hero" style={{paddingTop:80}}>
        <div className="orb" style={{width:600,height:600,background:"#1D4ED8",top:-200,right:-200,animation:"orb1 15s ease-in-out infinite"}}/>
        <div className="orb" style={{width:400,height:400,background:"#0D9488",bottom:-100,left:-100,animation:"orb2 18s ease-in-out infinite"}}/>
        <div className="orb" style={{width:300,height:300,background:"#7C3AED",top:"40%",left:"30%",animation:"orb1 20s 5s ease-in-out infinite",opacity:.15}}/>

        <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"80px 40px 60px",position:"relative",zIndex:1,textAlign:"center"}}>
          <div className="au1" style={{display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,.1)",border:"1px solid rgba(255,255,255,.2)",borderRadius:50,padding:"7px 18px",color:"rgba(255,255,255,.85)",fontSize:13,fontWeight:600,marginBottom:32,fontFamily:"Plus Jakarta Sans"}}>
            ✨ Hackathon HackByIFRI 2026 · Meilleure app éducative
          </div>
          <h1 className="au2 sora" style={{fontSize:"clamp(36px,6vw,72px)",fontWeight:900,color:"white",lineHeight:1.1,maxWidth:800,marginBottom:24}}>
            L'entraide académique<br/><span className="gtext">structurée, en temps réel</span>
          </h1>
          <p className="au3" style={{fontSize:"clamp(15px,2vw,19px)",color:"rgba(255,255,255,.72)",maxWidth:580,lineHeight:1.65,marginBottom:40}}>
            Plus jamais seul face à un blocage. PeerAlert connecte les étudiants qui ont besoin d'aide avec ceux qui peuvent en donner — en moins de 10 minutes.
          </p>
          <div className="au4" style={{display:"flex",gap:12,flexWrap:"wrap",justifyContent:"center",marginBottom:64}}>
            <button className="btn btn-amber btn-lg" onClick={()=>setPage("register")}>
              🚀 Rejoindre PeerAlert
            </button>
            <button className="btn btn-ghost-w btn-lg" onClick={()=>setPage("login")}>
              Voir la démo →
            </button>
          </div>

          {/* Floating UI cards */}
          <div className="au5" style={{display:"flex",gap:16,flexWrap:"wrap",justifyContent:"center",maxWidth:800}}>
            <div className="glass fl-card" style={{borderRadius:16,padding:"14px 18px",minWidth:220}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
                <div className="av" style={{width:36,height:36,fontSize:14}}>KT</div>
                <div>
                  <div style={{fontFamily:"Sora",fontWeight:700,fontSize:13,color:"var(--navy)"}}>Alerte envoyée</div>
                  <div style={{fontSize:12,color:"var(--t2)"}}>il y a 2 min</div>
                </div>
              </div>
              <div className="tag tag-blue" style={{marginBottom:8}}>📘 Algorithmique</div>
              <div style={{fontSize:13,color:"var(--text)",fontWeight:500}}>Récursivité — exercice bloquant</div>
              <div style={{marginTop:8,display:"flex",gap:6}}>
                <div className="odot" style={{width:8,height:8,marginTop:5}}/>
                <span style={{fontSize:12,color:"var(--green)",fontWeight:600}}>3 pairs disponibles</span>
              </div>
            </div>
            <div className="glass fl-card" style={{borderRadius:16,padding:"14px 18px",minWidth:200,animationDelay:"1s"}}>
              <div style={{textAlign:"center"}}>
                <div style={{fontSize:28,marginBottom:6}}>🏆</div>
                <div className="bdg bdg-e" style={{marginBottom:8}}>Expert</div>
                <div style={{fontFamily:"Sora",fontWeight:700,fontSize:18,color:"var(--navy)"}}>287 pts</div>
                <div style={{fontSize:12,color:"var(--t2)"}}>Top 3 cette semaine</div>
              </div>
            </div>
            <div className="glass fl-card" style={{borderRadius:16,padding:"14px 18px",minWidth:220,animationDelay:"2s"}}>
              <div style={{marginBottom:8}}>
                <div style={{fontFamily:"Sora",fontWeight:600,fontSize:12,color:"var(--t2)",marginBottom:4}}>PeerBuddy 🧠</div>
                <div style={{fontSize:13,color:"var(--text)",lineHeight:1.5,borderLeft:"3px solid var(--blue2)",paddingLeft:10}}>
                  "Commence par juste 2 minutes — l'élan vient toujours après les premières lignes."
                </div>
              </div>
              <div style={{fontSize:11,color:"var(--muted)"}}>Ton compagnon de bien-être</div>
            </div>
          </div>
        </div>

        {/* Wave */}
        <svg viewBox="0 0 1440 80" style={{width:"100%",display:"block",fill:"white",marginBottom:-2}}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"/>
        </svg>
      </div>

      {/* STATS */}
      <div style={{background:"white",padding:"60px 40px"}}>
        <div style={{maxWidth:1000,margin:"0 auto",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:40,textAlign:"center"}}>
          {[["500+","Étudiants actifs"],["<10min","Temps de mise en relation"],["92%","Taux de satisfaction"],["3x","Moins de retards accumulés"]].map(([n,l])=>(
            <div key={l}>
              <div style={{fontFamily:"Sora",fontWeight:900,fontSize:48,color:"var(--navy)",animation:"countBounce .6s ease"}}>{n}</div>
              <div style={{color:"var(--t2)",fontSize:15,marginTop:4}}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{background:"var(--s2)",padding:"80px 40px"}}>
        <div style={{maxWidth:700,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:52}}>
            <div style={{fontFamily:"Sora",fontWeight:700,fontSize:13,color:"var(--blue2)",letterSpacing:".1em",textTransform:"uppercase",marginBottom:12}}>COMMENT ÇA MARCHE</div>
            <h2 className="sora" style={{fontSize:36,fontWeight:800,color:"var(--navy)",lineHeight:1.2}}>De la difficulté<br/>à la compréhension en 5 étapes</h2>
          </div>
          <div style={{position:"relative"}}>
            <div style={{position:"absolute",left:25,top:24,bottom:24,width:2,background:"linear-gradient(180deg,var(--blue2),var(--teal))",borderRadius:1}}/>
            {steps.map((s,i)=>(
              <div key={i} className="how-step" style={{opacity:0,animation:`fadeUp .5s ${i*.1}s ease both`}}>
                <div className="how-num">{s.n}</div>
                <div style={{paddingTop:12}}>
                  <div style={{fontFamily:"Sora",fontWeight:700,fontSize:17,color:"var(--navy)",marginBottom:6}}>{s.t}</div>
                  <div style={{color:"var(--t2)",fontSize:14.5,lineHeight:1.6}}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="lsec">
        <div style={{textAlign:"center",marginBottom:52}}>
          <div style={{fontFamily:"Sora",fontWeight:700,fontSize:13,color:"var(--blue2)",letterSpacing:".1em",textTransform:"uppercase",marginBottom:12}}>FONCTIONNALITÉS</div>
          <h2 className="sora" style={{fontSize:36,fontWeight:800,color:"var(--navy)"}}>Tout ce dont tu as besoin<br/>pour réussir ensemble</h2>
        </div>
        <div className="feat-grid">
          {feats.map((f,i)=>(
            <div key={i} className="feat-card" style={{opacity:0,animation:`fadeUp .5s ${i*.1}s ease both`}}>
              <div style={{width:52,height:52,background:f.color,borderRadius:14,display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,marginBottom:18}}>{f.icon}</div>
              <h3 className="sora" style={{fontSize:17,fontWeight:700,color:"var(--navy)",marginBottom:8}}>{f.title}</h3>
              <p style={{color:"var(--t2)",fontSize:14.5,lineHeight:1.65}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* GAMIFICATION SECTION */}
      <div style={{background:"var(--navy)",padding:"80px 40px"}}>
        <div style={{maxWidth:900,margin:"0 auto",textAlign:"center"}}>
          <h2 className="sora" style={{fontSize:34,fontWeight:800,color:"white",marginBottom:16}}>Progresse. Sois reconnu(e).</h2>
          <p style={{color:"rgba(255,255,255,.65)",fontSize:16,marginBottom:48,maxWidth:560,margin:"0 auto 48px"}}>Chaque aide vraiment réalisée est récompensée. Les points ne s'accumulent que si tu as réellement aidé — prouvé par quiz IA.</p>
          <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:16}}>
            {[["⬜","Novice","0–49 pts","Bienvenue dans la communauté"],["🟩","Actif","50–149 pts","Tu aides régulièrement"],["🟨","Expert","150–299 pts","La communauté te fait confiance"],["💜","Mentor","300+ pts","Tu es un pilier de PeerAlert"]].map(([e,n,p,d])=>(
              <div key={n} className="glass-d" style={{borderRadius:16,padding:24,textAlign:"center"}}>
                <div style={{fontSize:32,marginBottom:10}}>{e}</div>
                <div style={{fontFamily:"Sora",fontWeight:700,fontSize:16,color:"white",marginBottom:4}}>{n}</div>
                <div style={{color:"var(--amber)",fontSize:13,fontWeight:700,marginBottom:8}}>{p}</div>
                <div style={{color:"rgba(255,255,255,.55)",fontSize:13}}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{background:"linear-gradient(135deg,#EEF4FF,#E0F2FE)",padding:"80px 40px",textAlign:"center"}}>
        <h2 className="sora" style={{fontSize:40,fontWeight:900,color:"var(--navy)",marginBottom:16}}>Prêt(e) à rejoindre<br/><span style={{color:"var(--blue2)"}}>la communauté PeerAlert ?</span></h2>
        <p style={{color:"var(--t2)",fontSize:17,marginBottom:36,maxWidth:480,margin:"0 auto 36px"}}>Gratuit pour les étudiants. Disponible à l'IFRI/UAC dès maintenant.</p>
        <button className="btn btn-navy btn-lg" onClick={()=>setPage("register")}>Créer mon compte gratuitement</button>
      </div>

      {/* FOOTER */}
      <div style={{background:"var(--navy)",padding:"32px 40px",textAlign:"center"}}>
        <div style={{fontFamily:"Sora",fontWeight:800,fontSize:18,color:"white",marginBottom:8}}>PeerAlert</div>
        <div style={{color:"rgba(255,255,255,.4)",fontSize:13}}>© 2026 V-LEAD · IFRI/UAC Bénin · HackByIFRI 2026</div>
      </div>
    </div>
  );
}

// ─── AUTH PAGES ───────────────────────────────────────────────────────────────
function AuthPage({ setPage, mode }) {
  const [view, setView] = useState(mode);
  const [showPw, setShowPw] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ nom:"",prenom:"",pseudo:"",filiere:"",uni:"",niveau:"",email:"",pw:"" });

  const filieres = ["Internet et Multimédia","Génie Logiciel","Cybersécurité","Intelligence Artificielle","SEIoT"];

  return (
    <div style={{minHeight:"100vh",background:"linear-gradient(135deg,var(--bg) 0%,#E0EAFF 100%)",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{width:"100%",maxWidth:460}}>
        <div style={{textAlign:"center",marginBottom:32}} className="au1">
          <div style={{fontFamily:"Sora",fontWeight:800,fontSize:24,color:"var(--navy)",marginBottom:6,display:"flex",alignItems:"center",justifyContent:"center",gap:10}}>
            <div style={{width:38,height:38,background:"linear-gradient(135deg,#1D4ED8,#0E1F45)",borderRadius:11,display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
            </div>
            PeerAlert
          </div>
          <p style={{color:"var(--t2)",fontSize:15}}>{view==="login"?"Content de te revoir 👋":"Rejoins la communauté 🚀"}</p>
        </div>

        <div className="card au2" style={{padding:32}}>
          {/* Tabs */}
          <div style={{display:"flex",background:"var(--s2)",borderRadius:12,padding:4,marginBottom:28}}>
            {["login","register"].map(t=>(
              <button key={t} onClick={()=>{setView(t);setStep(1);}} style={{flex:1,padding:"9px 0",borderRadius:9,border:"none",fontFamily:"Sora",fontWeight:600,fontSize:13.5,cursor:"pointer",transition:"all .2s",background:view===t?"white":"transparent",color:view===t?"var(--navy)":"var(--muted)",boxShadow:view===t?"0 2px 8px rgba(0,0,0,.1)":"none"}}>
                {t==="login"?"Connexion":"Inscription"}
              </button>
            ))}
          </div>

          {view==="login" ? (
            <div className="ai">
              <div className="form-g" style={{marginBottom:18}}>
                <label className="lbl">Email ou pseudonyme</label>
                <input className="inp" placeholder="ex: elielokossou7@gmail.com" type="email"/>
              </div>
              <div className="form-g" style={{marginBottom:8,position:"relative"}}>
                <label className="lbl">Mot de passe</label>
                <input className="inp" type={showPw?"text":"password"} placeholder="••••••••" style={{paddingRight:42}}/>
                <button onClick={()=>setShowPw(!showPw)} style={{position:"absolute",right:12,top:32,background:"none",border:"none",cursor:"pointer",color:"var(--muted)"}}>
                  {showPw?<Ic.EyeOff/>:<Ic.Eye/>}
                </button>
              </div>
              <div style={{textAlign:"right",marginBottom:24}}>
                <span style={{fontSize:13,color:"var(--blue2)",cursor:"pointer",fontWeight:600}}>Mot de passe oublié ?</span>
              </div>
              <button className="btn btn-navy" style={{width:"100%",justifyContent:"center",padding:"13px 0"}} onClick={()=>setPage("dashboard")}>
                Se connecter →
              </button>
              <div style={{textAlign:"center",marginTop:20,fontSize:13,color:"var(--t2)"}}>
                Pas encore de compte ? <span style={{color:"var(--blue2)",cursor:"pointer",fontWeight:600}} onClick={()=>setView("register")}>Créer un compte</span>
              </div>
            </div>
          ) : (
            <div className="ai">
              {/* Step indicator */}
              <div style={{display:"flex",gap:8,marginBottom:24}}>
                {[1,2].map(s=>(
                  <div key={s} style={{flex:1,height:4,borderRadius:2,background:step>=s?"var(--blue2)":"var(--border)",transition:"background .3s"}}/>
                ))}
              </div>
              <div style={{fontFamily:"Sora",fontSize:13,color:"var(--t2)",marginBottom:18}}>Étape {step} sur 2</div>

              {step===1 && (
                <div>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:14}}>
                    <div><label className="lbl">Nom</label><input className="inp" placeholder="LOKOSSOU"/></div>
                    <div><label className="lbl">Prénom(s)</label><input className="inp" placeholder="John Elie"/></div>
                  </div>
                  <div style={{marginBottom:14}}><label className="lbl">Pseudonyme</label><input className="inp" placeholder="ex: jlokossou_ifri"/></div>
                  <div style={{marginBottom:14}}><label className="lbl">Email</label><input className="inp" type="email" placeholder="ton@email.com"/></div>
                  <div style={{marginBottom:14,position:"relative"}}>
                    <label className="lbl">Mot de passe</label>
                    <input className="inp" type={showPw?"text":"password"} placeholder="Min. 8 caractères" style={{paddingRight:42}}/>
                    <button onClick={()=>setShowPw(!showPw)} style={{position:"absolute",right:12,top:32,background:"none",border:"none",cursor:"pointer",color:"var(--muted)"}}>
                      {showPw?<Ic.EyeOff/>:<Ic.Eye/>}
                    </button>
                  </div>
                  <button className="btn btn-blue" style={{width:"100%",justifyContent:"center",padding:"13px 0"}} onClick={()=>setStep(2)}>
                    Continuer →
                  </button>
                </div>
              )}
              {step===2 && (
                <div>
                  <div style={{marginBottom:14}}><label className="lbl">Université</label><input className="inp" placeholder="ex: IFRI / UAC" defaultValue="IFRI / UAC"/></div>
                  <div style={{marginBottom:14}}>
                    <label className="lbl">Filière</label>
                    <select className="inp">
                      <option value="">-- Choisir --</option>
                      {filieres.map(f=><option key={f}>{f}</option>)}
                    </select>
                  </div>
                  <div style={{marginBottom:14}}>
                    <label className="lbl">Niveau</label>
                    <select className="inp">
                      {["L1","L2","L3","M1","M2"].map(n=><option key={n}>{n}</option>)}
                    </select>
                  </div>
                  <div style={{marginBottom:20}}>
                    <label className="lbl">Numéro de téléphone</label>
                    <input className="inp" placeholder="+229 01 XX XX XX XX"/>
                  </div>
                  <div style={{display:"flex",gap:10}}>
                    <button className="btn btn-ghost" style={{flex:1,justifyContent:"center"}} onClick={()=>setStep(1)}>← Retour</button>
                    <button className="btn btn-navy" style={{flex:2,justifyContent:"center",padding:"13px 0"}} onClick={()=>setPage("dashboard")}>
                      Créer mon compte ✓
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div style={{textAlign:"center",marginTop:16}}>
          <span style={{fontSize:13,color:"var(--muted)",cursor:"pointer"}} onClick={()=>setPage("landing")}>← Retour à l'accueil</span>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function DashboardPage({ setPage }) {
  return (
    <div className="page-wrap">
      {/* Mobile header */}
      <div className="mob" style={{background:"white",padding:"20px 20px 14px",borderBottom:"1px solid var(--border)",marginBottom:0}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div>
            <div style={{fontFamily:"Sora",fontWeight:800,fontSize:18,color:"var(--navy)"}}>Bonjour, Kaylhia 👋</div>
            <div style={{fontSize:13,color:"var(--t2)"}}>IA · L1 · IFRI</div>
          </div>
          <button style={{position:"relative",background:"none",border:"none",cursor:"pointer",color:"var(--t2)"}} onClick={()=>setPage("notifs")}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
            <span style={{position:"absolute",top:-2,right:-2,width:8,height:8,background:"var(--amber)",borderRadius:"50%",border:"2px solid white"}}/>
          </button>
        </div>
      </div>

      <div style={{padding:"0 20px",maxWidth:900,margin:"0 auto"}}>
        {/* Desktop greeting */}
        <div className="desk" style={{marginBottom:28}}>
          <h1 className="sora" style={{fontSize:28,fontWeight:800,color:"var(--navy)"}}>Bonjour, Kaylhia 👋</h1>
          <p style={{color:"var(--t2)",marginTop:4}}>Intelligence Artificielle · L1 · IFRI/UAC</p>
        </div>

        {/* Stats row */}
        <div className="au1" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:24,marginTop:20}}>
          {[["84","Points totaux","🎯"],["4","Sessions aidées","🤝"],["3","Alertes lancées","⚡"]].map(([v,l,e])=>(
            <div key={l} className="card" style={{padding:18,textAlign:"center"}}>
              <div style={{fontSize:22,marginBottom:6}}>{e}</div>
              <div style={{fontFamily:"Sora",fontWeight:800,fontSize:26,color:"var(--navy)"}}>{v}</div>
              <div style={{fontSize:12,color:"var(--t2)",marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>

        {/* Badge progress */}
        <div className="card au2" style={{padding:20,marginBottom:20}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:12}}>
            <div>
              <div style={{fontFamily:"Sora",fontWeight:700,fontSize:15,color:"var(--navy)"}}>Progression vers Expert</div>
              <div style={{fontSize:13,color:"var(--t2)",marginTop:2}}>84 / 150 points — encore 66 pts</div>
            </div>
            <div className="bdg bdg-a">Actif</div>
          </div>
          <div className="prog"><div className="prog-f" style={{width:"56%"}}/></div>
          <div style={{display:"flex",justifyContent:"space-between",marginTop:8,fontSize:12,color:"var(--muted)"}}>
            <span>Novice (0)</span><span style={{color:"var(--amber)",fontWeight:700}}>→ Actif (84 pts)</span><span>Expert (150)</span>
          </div>
        </div>

        {/* Quick action */}
        <div className="au3" style={{background:"linear-gradient(135deg,var(--navy),#1D4ED8)",borderRadius:18,padding:22,marginBottom:20,position:"relative",overflow:"hidden",cursor:"pointer"}} onClick={()=>setPage("launch")}>
          <div style={{position:"absolute",top:-30,right:-30,width:120,height:120,background:"rgba(255,255,255,.08)",borderRadius:"50%"}}/>
          <div style={{position:"absolute",bottom:-20,right:20,width:80,height:80,background:"rgba(255,255,255,.06)",borderRadius:"50%"}}/>
          <div style={{fontFamily:"Sora",fontWeight:800,fontSize:19,color:"white",marginBottom:6}}>⚡ Lancer une alerte</div>
          <div style={{color:"rgba(255,255,255,.7)",fontSize:14,marginBottom:16}}>Tu as un blocage ? Trouve de l'aide en moins de 10 minutes.</div>
          <span style={{background:"var(--amber)",color:"var(--navy)",padding:"8px 18px",borderRadius:50,fontFamily:"Sora",fontWeight:700,fontSize:13,display:"inline-block"}}>
            Créer une alerte →
          </span>
        </div>

        {/* PeerBuddy strip */}
        <div className="au4 card" style={{padding:18,marginBottom:20,display:"flex",alignItems:"center",gap:16,cursor:"pointer",border:"1px solid #E0E7FF"}} onClick={()=>setPage("chatbot")}>
          <div style={{width:48,height:48,borderRadius:16,background:"linear-gradient(135deg,#7C3AED,#1D4ED8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>🧠</div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"Sora",fontWeight:700,fontSize:14,color:"var(--navy)"}}>PeerBuddy — Ton psychologue virtuel</div>
            <div style={{fontSize:13,color:"var(--t2)",marginTop:2}}>Comment tu te sens aujourd'hui ?</div>
          </div>
          <Ic.ChevRight/>
        </div>

        {/* Recent alerts */}
        <div className="au5">
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
            <div style={{fontFamily:"Sora",fontWeight:700,fontSize:16,color:"var(--navy)"}}>Alertes disponibles</div>
            <span style={{fontSize:13,color:"var(--blue2)",cursor:"pointer",fontWeight:600}} onClick={()=>setPage("alerts")}>Voir tout →</span>
          </div>
          {ALERTS.slice(0,2).map(a=>(
            <div key={a.id} className="ac" style={{marginBottom:12}} onClick={()=>setPage("alerts")}>
              <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:10}}>
                <div>
                  <div className="tag tag-blue" style={{marginBottom:8}}>{a.subject}</div>
                  <div style={{fontFamily:"Sora",fontWeight:700,fontSize:15,color:"var(--navy)"}}>{a.notion}</div>
                  <div style={{fontSize:13,color:"var(--t2)",marginTop:3}}>{a.type}</div>
                </div>
                {a.urgent && <div className="tag tag-red">🔴 Urgent</div>}
              </div>
              <div style={{display:"flex",gap:16,fontSize:12,color:"var(--t2)",marginBottom:12}}>
                <span>⏰ {a.time}</span>
                <span>👥 {a.spotsTaken}/{a.spots} places</span>
                <span>📚 {a.filiere}</span>
              </div>
              {!a.hasExpert && <div style={{background:"#FEF3C7",borderRadius:8,padding:"6px 12px",fontSize:12,color:"#92400E",fontWeight:600,marginBottom:10}}>⚠️ Aucun expert confirmé — il vous faut au moins 1 personne maîtrisant la notion</div>}
              <div style={{display:"flex",gap:8}}>
                <button className="btn btn-blue btn-sm" style={{flex:1,justifyContent:"center"}}>Accepter</button>
                <button className="btn btn-ghost btn-sm">Décliner</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── ALERTS PAGE ──────────────────────────────────────────────────────────────
function AlertsPage({ setPage }) {
  const [filter, setFilter] = useState("Tout");
  const [view, setView] = useState("list"); // list | detail
  const [selected, setSelected] = useState(null);
  const subjects = ["Tout","Algorithmique","Mathématiques","Réseaux","Prog. Web"];

  if (view==="detail" && selected) {
    const a = selected;
    return (
      <div className="page-wrap" style={{padding:20,maxWidth:600,margin:"0 auto"}}>
        <button className="btn btn-ghost btn-sm" style={{marginBottom:18}} onClick={()=>{setView("list");setSelected(null);}}>← Retour</button>
        <div className="card" style={{padding:24,marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
            <div>
              <div className="tag tag-blue" style={{marginBottom:10}}>{a.subject}</div>
              <h2 className="sora" style={{fontSize:22,fontWeight:800,color:"var(--navy)",marginBottom:6}}>{a.notion}</h2>
              <div style={{fontSize:14,color:"var(--t2)"}}>{a.type}</div>
            </div>
            {a.urgent && <div className="tag tag-red">🔴 Urgent</div>}
          </div>
          <div className="div"/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:16}}>
            {[["⏰","Créneau",a.time],["👥","Places",`${a.spotsTaken}/${a.spots} pris`],["📚","Filière",a.filiere],["🎓","Niveau",a.level]].map(([e,l,v])=>(
              <div key={l} style={{background:"var(--s2)",borderRadius:10,padding:"12px 14px"}}>
                <div style={{fontSize:12,color:"var(--t2)",fontWeight:600,marginBottom:4}}>{e} {l}</div>
                <div style={{fontFamily:"Sora",fontWeight:700,fontSize:14,color:"var(--navy)"}}>{v}</div>
              </div>
            ))}
          </div>
          {!a.hasExpert && (
            <div style={{background:"#FEF3C7",border:"1px solid #FCD34D",borderRadius:10,padding:14,marginBottom:16,fontSize:13,color:"#92400E"}}>
              <div style={{fontWeight:700,marginBottom:4}}>⚠️ Expert non encore confirmé</div>
              Au moins une personne maîtrisant la notion est requise pour démarrer la session. En acceptant, indique si tu maîtrises cette notion.
            </div>
          )}
          <div style={{marginBottom:16}}>
            <div className="lbl">Je rejoins en tant que :</div>
            <div style={{display:"flex",gap:10}}>
              <label style={{flex:1,border:"2px solid var(--green)",borderRadius:10,padding:"12px 14px",cursor:"pointer",background:"#D1FAE5",display:"flex",alignItems:"center",gap:10}}>
                <input type="radio" name="role" defaultChecked/>
                <div>
                  <div style={{fontWeight:700,fontSize:13,color:"#065F46"}}>✅ Aidant expert</div>
                  <div style={{fontSize:12,color:"#065F46"}}>Je maîtrise cette notion</div>
                </div>
              </label>
              <label style={{flex:1,border:"2px solid var(--border)",borderRadius:10,padding:"12px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:10}}>
                <input type="radio" name="role"/>
                <div>
                  <div style={{fontWeight:700,fontSize:13,color:"var(--navy)"}}>🤝 Aidant apprenant</div>
                  <div style={{fontSize:12,color:"var(--t2)"}}>Je peux aider partiellement</div>
                </div>
              </label>
            </div>
          </div>
          <button className="btn btn-blue" style={{width:"100%",justifyContent:"center",padding:"13px 0"}} onClick={()=>setPage("session")}>
            Rejoindre la session →
          </button>
        </div>
      </div>
    );
  }

  const filtered = filter==="Tout" ? ALERTS : ALERTS.filter(a=>a.subject===filter);

  return (
    <div className="page-wrap">
      <div className="mob" style={{background:"white",padding:"18px 20px 12px",borderBottom:"1px solid var(--border)",marginBottom:0}}>
        <div style={{fontFamily:"Sora",fontWeight:800,fontSize:18,color:"var(--navy)"}}>Alertes disponibles</div>
      </div>
      <div style={{padding:"20px",maxWidth:700,margin:"0 auto"}}>
        <div className="desk au1" style={{marginBottom:24}}>
          <h1 className="sora" style={{fontSize:26,fontWeight:800,color:"var(--navy)"}}>Alertes disponibles</h1>
          <p style={{color:"var(--t2)",marginTop:4}}>Aide tes pairs et gagne des points</p>
        </div>

        {/* Filters */}
        <div className="chips-row au2" style={{marginBottom:20}}>
          {subjects.map(s=>(
            <button key={s} className={`chip${filter===s?" on":""}`} onClick={()=>setFilter(s)}>{s}</button>
          ))}
        </div>

        {/* Alert cards */}
        {filtered.map((a,i)=>(
          <div key={a.id} className="ac" style={{marginBottom:14,opacity:0,animation:`fadeUp .4s ${i*.08}s ease both`}} onClick={()=>{setSelected(a);setView("detail");}}>
            <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:10}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:8,flexWrap:"wrap"}}>
                  <div className="tag tag-blue">{a.subject}</div>
                  {a.urgent && <div className="tag tag-red">🔴 Urgent</div>}
                  {a.hasExpert && <div className="tag tag-green">✅ Expert confirmé</div>}
                </div>
                <div style={{fontFamily:"Sora",fontWeight:700,fontSize:16,color:"var(--navy)",marginBottom:4}}>{a.notion}</div>
                <div style={{fontSize:13,color:"var(--t2)"}}>{a.type}</div>
              </div>
            </div>
            {!a.hasExpert && (
              <div style={{background:"#FEF3C7",borderRadius:8,padding:"6px 12px",fontSize:12,color:"#92400E",fontWeight:600,marginBottom:10}}>
                ⚠️ Expert requis — Accepte si tu maîtrises cette notion
              </div>
            )}
            <div style={{display:"flex",gap:20,fontSize:12,color:"var(--t2)",marginBottom:14,flexWrap:"wrap"}}>
              <span>⏰ {a.time}</span>
              <span>👥 {a.spotsTaken}/{a.spots} places</span>
              <span>👤 {a.author}</span>
              <span>📚 {a.level} {a.filiere}</span>
            </div>
            <div style={{display:"flex",gap:8}}>
              <button className="btn btn-blue btn-sm" style={{flex:1,justifyContent:"center"}} onClick={(e)=>{e.stopPropagation();setSelected(a);setView("detail");}}>Voir & Accepter</button>
              <button className="btn btn-ghost btn-sm" onClick={(e)=>e.stopPropagation()}>Ignorer</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LAUNCH ALERT ─────────────────────────────────────────────────────────────
function LaunchPage({ setPage }) {
  const [step, setStep] = useState(1);
  const steps = ["Contenu","Logistique","Confirmation"];

  return (
    <div className="page-wrap">
      <div className="mob" style={{background:"white",padding:"18px 20px 12px",borderBottom:"1px solid var(--border)"}}>
        <div style={{fontFamily:"Sora",fontWeight:800,fontSize:18,color:"var(--navy)"}}>Lancer une alerte</div>
      </div>
      <div style={{padding:20,maxWidth:560,margin:"0 auto"}}>
        <div className="desk" style={{marginBottom:24}}>
          <h1 className="sora" style={{fontSize:26,fontWeight:800,color:"var(--navy)"}}>Lancer une alerte</h1>
        </div>

        {/* Step progress */}
        <div className="au1" style={{marginBottom:28}}>
          <div style={{display:"flex",gap:0,marginBottom:10}}>
            {steps.map((s,i)=>(
              <div key={s} style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center"}}>
                <div style={{width:32,height:32,borderRadius:"50%",background:step>i+1?"var(--green)":step===i+1?"var(--blue2)":"var(--border)",color:"white",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"Sora",fontWeight:700,fontSize:13,transition:"all .3s",zIndex:1}}>
                  {step>i+1?"✓":i+1}
                </div>
                <div style={{fontSize:11,color:step===i+1?"var(--blue2)":"var(--muted)",marginTop:5,fontWeight:600}}>{s}</div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",height:3,borderRadius:2,background:"var(--border)",marginTop:-26,marginBottom:26}}>
            <div style={{width:`${((step-1)/2)*100}%`,background:"var(--green)",borderRadius:2,transition:"width .4s ease"}}/>
          </div>
        </div>

        <div className="card au2" style={{padding:24}}>
          {step===1 && (
            <div className="ai">
              <div style={{marginBottom:16}}>
                <label className="lbl">Matière *</label>
                <select className="inp">
                  <option value="">-- Choisir la matière --</option>
                  {["Algorithmique","Mathématiques","Réseaux","Programmation Web","Bases de données","Physique","Anglais","Cybersécurité"].map(m=><option key={m}>{m}</option>)}
                </select>
              </div>
              <div style={{marginBottom:16}}>
                <label className="lbl">Notion précise *</label>
                <input className="inp" placeholder="ex: Récursivité sur les arbres binaires"/>
              </div>
              <div style={{marginBottom:16}}>
                <label className="lbl">Type de difficulté *</label>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
                  {["Exercice bloquant","Compréhension du cours","Schéma difficile","Méthode inconnue"].map(t=>(
                    <label key={t} style={{cursor:"pointer",display:"flex",gap:10,padding:"11px 14px",border:"1.5px solid var(--border)",borderRadius:10,alignItems:"center",fontSize:13}}>
                      <input type="radio" name="dtype"/><span>{t}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div style={{marginBottom:20}}>
                <label className="lbl">Description (optionnel)</label>
                <textarea className="inp" placeholder="Décris ton blocage plus précisément..." style={{minHeight:80}}/>
              </div>
              <button className="btn btn-blue" style={{width:"100%",justifyContent:"center",padding:"13px 0"}} onClick={()=>setStep(2)}>Suivant →</button>
            </div>
          )}

          {step===2 && (
            <div className="ai">
              <div style={{marginBottom:16}}>
                <label className="lbl">Créneau proposé *</label>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:10}}>
                  {["Ce soir 18h","Ce soir 20h","Demain matin","Demain après-midi"].map(t=>(
                    <label key={t} style={{cursor:"pointer",display:"flex",gap:10,padding:"11px 14px",border:"1.5px solid var(--border)",borderRadius:10,alignItems:"center",fontSize:13}}>
                      <input type="radio" name="slot"/><span>{t}</span>
                    </label>
                  ))}
                </div>
                <input className="inp" placeholder="Ou précise un horaire : ex. Demain 15h–16h30"/>
              </div>
              <div style={{marginBottom:16}}>
                <label className="lbl">Nombre max de participants</label>
                <div style={{display:"flex",gap:8}}>
                  {[2,3,4,5].map(n=>(
                    <button key={n} className="btn btn-ghost btn-sm" style={{flex:1,justifyContent:"center",fontFamily:"Sora",fontWeight:700,fontSize:15}}>{n}</button>
                  ))}
                </div>
              </div>
              <div style={{marginBottom:16}}>
                <label className="lbl">Lien WhatsApp du groupe</label>
                <input className="inp" placeholder="https://chat.whatsapp.com/..."/>
                <div style={{fontSize:12,color:"var(--muted)",marginTop:6}}>💡 Crée un groupe WhatsApp et partage le lien d'invitation</div>
              </div>
              <div style={{marginBottom:20}}>
                <label className="lbl">Limite hebdomadaire</label>
                <div style={{fontSize:13,color:"var(--t2)",background:"var(--s2)",borderRadius:10,padding:12}}>
                  Tu peux recevoir max <strong>5 alertes par semaine</strong>. Il t'en reste <strong style={{color:"var(--green)"}}>3 cette semaine.</strong>
                </div>
              </div>
              <div style={{display:"flex",gap:10}}>
                <button className="btn btn-ghost" style={{flex:1,justifyContent:"center"}} onClick={()=>setStep(1)}>← Retour</button>
                <button className="btn btn-blue" style={{flex:2,justifyContent:"center",padding:"13px 0"}} onClick={()=>setStep(3)}>Confirmer →</button>
              </div>
            </div>
          )}

          {step===3 && (
            <div className="ai">
              <div style={{textAlign:"center",marginBottom:24}}>
                <div style={{fontSize:48,marginBottom:12}}>📋</div>
                <h3 className="sora" style={{fontSize:19,fontWeight:700,color:"var(--navy)",marginBottom:8}}>Récapitulatif de ton alerte</h3>
                <p style={{fontSize:14,color:"var(--t2)"}}>Vérifie les informations avant d'envoyer</p>
              </div>
              {[["📘 Matière","Algorithmique"],["🎯 Notion","Récursivité sur les arbres binaires"],["❓ Difficulté","Exercice bloquant"],["⏰ Créneau","Ce soir 18h00–19h30"],["👥 Participants max","3 personnes"],["📱 WhatsApp","Lien configuré"]].map(([l,v])=>(
                <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"10px 0",borderBottom:"1px solid var(--border)",fontSize:14}}>
                  <span style={{color:"var(--t2)"}}>{l}</span>
                  <span style={{fontWeight:600,color:"var(--navy)"}}>{v}</span>
                </div>
              ))}
              <div style={{background:"#D1FAE5",borderRadius:10,padding:12,marginTop:16,marginBottom:20,fontSize:13,color:"#065F46",fontWeight:600}}>
                ✅ L'algorithme cherchera en priorité des étudiants de ta filière (IA) maîtrisant la récursivité
              </div>
              <div style={{display:"flex",gap:10}}>
                <button className="btn btn-ghost" style={{flex:1,justifyContent:"center"}} onClick={()=>setStep(2)}>← Modifier</button>
                <button className="btn btn-amber" style={{flex:2,justifyContent:"center",padding:"13px 0"}} onClick={()=>setPage("dashboard")}>
                  🚀 Envoyer l'alerte
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── ACTIVE SESSION ───────────────────────────────────────────────────────────
function SessionPage({ setPage }) {
  const [time, setTime] = useState(82*60);
  useEffect(() => {
    const t = setInterval(() => setTime(p => Math.max(0,p-1)), 1000);
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(time/60)).padStart(2,"0");
  const ss = String(time%60).padStart(2,"0");

  const participants = [
    { init:"NA", name:"Nabrothe K.", role:"aidant", expert:true, filiere:"Génie Logiciel", pts:287 },
    { init:"KT", name:"Kaylhia T.", role:"demandeur", expert:false, filiere:"IA", pts:84, me:true },
    { init:"CA", name:"Charles A.", role:"aidant", expert:false, filiere:"Cybersécurité", pts:183 },
  ];

  return (
    <div className="page-wrap">
      <div className="mob" style={{background:"white",padding:"18px 20px 12px",borderBottom:"1px solid var(--border)"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div className="odot"/>
          <div>
            <div style={{fontFamily:"Sora",fontWeight:700,fontSize:15,color:"var(--navy)"}}>Session active — Algorithmique</div>
            <div style={{fontSize:12,color:"var(--t2)"}}>Récursivité · 3 participants</div>
          </div>
        </div>
      </div>
      <div style={{padding:20,maxWidth:640,margin:"0 auto"}}>
        <div className="desk" style={{marginBottom:20,display:"flex",alignItems:"center",gap:14}}>
          <div className="odot"/>
          <div>
            <h2 className="sora" style={{fontSize:22,fontWeight:800,color:"var(--navy)"}}>Session — Algorithmique · Récursivité</h2>
          </div>
        </div>

        {/* Timer + status */}
        <div className="card au1" style={{padding:20,marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div>
              <div style={{fontFamily:"Sora",fontWeight:700,fontSize:14,color:"var(--navy)",marginBottom:4}}>Temps restant</div>
              <div style={{fontFamily:"Sora",fontWeight:800,fontSize:36,color:"var(--blue2)"}}>{mm}:{ss}</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div className="tag tag-green" style={{marginBottom:8}}>● Session active</div>
              <div style={{fontSize:12,color:"var(--t2)"}}>Démarré à 18h05</div>
            </div>
          </div>
          <div className="prog" style={{marginTop:16}}>
            <div className="prog-f" style={{width:`${(time/(90*60))*100}%`,background:"linear-gradient(90deg,var(--blue2),var(--teal))"}}/>
          </div>
        </div>

        {/* Expert status */}
        <div className="au2" style={{background:"#D1FAE5",border:"1px solid #6EE7B7",borderRadius:12,padding:14,marginBottom:16,display:"flex",gap:10,alignItems:"center"}}>
          <span style={{fontSize:20}}>✅</span>
          <div style={{fontSize:13,color:"#065F46"}}>
            <strong>Expert confirmé présent :</strong> Nabrothe K. maîtrise la récursivité. La session peut démarrer.
          </div>
        </div>

        {/* Participants */}
        <div className="card au3" style={{padding:20,marginBottom:16}}>
          <div style={{fontFamily:"Sora",fontWeight:700,fontSize:15,color:"var(--navy)",marginBottom:14}}>Participants ({participants.length}/3)</div>
          {participants.map(p=>(
            <div key={p.name} className="prow">
              <div className="av" style={{width:40,height:40,fontSize:15}}>{p.init}</div>
              <div style={{flex:1}}>
                <div style={{fontFamily:"Sora",fontWeight:700,fontSize:14,color:"var(--navy)",display:"flex",alignItems:"center",gap:8}}>
                  {p.name}
                  {p.me && <span style={{fontSize:11,background:"#EEF2FF",color:"var(--blue)",padding:"2px 8px",borderRadius:50,fontWeight:700}}>Moi</span>}
                </div>
                <div style={{fontSize:12,color:"var(--t2)"}}>{p.filiere} · {p.pts} pts</div>
              </div>
              <div style={{display:"flex",flexDirection:"column",alignItems:"flex-end",gap:4}}>
                {p.expert && <div className="tag tag-green" style={{fontSize:11}}>Expert ✓</div>}
                <div className={`tag ${p.role==="aidant"?"tag-blue":"tag-amber"}`} style={{fontSize:11}}>
                  {p.role==="aidant"?"Aidant":"Demandeur"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp */}
        <div className="card au4" style={{padding:18,marginBottom:16,background:"#F0FDF4",border:"1px solid #6EE7B7"}}>
          <div style={{fontFamily:"Sora",fontWeight:700,fontSize:14,color:"#065F46",marginBottom:6}}>📱 Groupe WhatsApp créé</div>
          <div style={{fontSize:13,color:"#065F46",marginBottom:12}}>La session d'entraide se déroule dans le groupe WhatsApp. Clique pour rejoindre.</div>
          <button className="btn" style={{background:"#25D366",color:"white",gap:8}}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            Rejoindre le groupe
          </button>
        </div>

        {/* End session */}
        <button className="btn btn-amber" style={{width:"100%",justifyContent:"center",padding:"14px 0",fontSize:15}} onClick={()=>setPage("quiz")}>
          ✅ Terminer la session → Quiz de validation
        </button>
      </div>
    </div>
  );
}

// ─── QUIZ PAGE ────────────────────────────────────────────────────────────────
function QuizPage({ setPage }) {
  const [role, setRole] = useState(null); // 'apprenant' | 'aidant'
  const [q, setQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [timer, setTimer] = useState(45);

  const quizA = [
    { q:"Qu'est-ce qu'un cas de base en récursivité ?", opts:["La condition qui arrête les appels récursifs","Le premier appel à la fonction","Le résultat final de la fonction","L'argument passé en paramètre"], ans:0 },
    { q:"Que se passe-t-il si une fonction récursive n'a pas de cas de base ?", opts:["Elle retourne 0","Elle s'exécute une seule fois","Elle génère un dépassement de pile (stack overflow)","Elle s'arrête automatiquement"], ans:2 },
    { q:"Quelle est la complexité de la récursion sur un tableau de taille n ?", opts:["O(1)","O(n)","O(n²)","O(log n)"], ans:1 },
  ];
  const quizE = [
    { q:"Détecte l'erreur dans ce code récursif :\nfact(n) { return n * fact(n) }", opts:["Le cas de base manque","La multiplication est incorrecte","Le paramètre est mal typé","Il n'y a pas d'erreur"], ans:0 },
    { q:"Transforme une récursion terminale en itération : laquelle de ces structures est équivalente ?", opts:["Une boucle while avec un accumulateur","Un tableau dynamique","Une structure switch","Une liste chaînée"], ans:0 },
    { q:"Quelle structure de données est implicitement utilisée par les appels récursifs ?", opts:["File (queue)","Tas (heap)","Pile (stack)","Arbre binaire"], ans:2 },
  ];
  const quiz = role==="aidant" ? quizE : quizA;

  useEffect(() => {
    if (!role || done || revealed) return;
    const t = setInterval(() => {
      setTimer(p => {
        if (p<=1) { setRevealed(true); return 0; }
        return p-1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [role, q, done, revealed]);

  const handleSelect = (i) => {
    if (revealed) return;
    setSelected(i);
  };

  const handleConfirm = () => {
    const correct = selected === quiz[q].ans;
    if (correct) setScore(s=>s+1);
    setRevealed(true);
  };

  const handleNext = () => {
    if (q < quiz.length-1) {
      setQ(q+1); setSelected(null); setRevealed(false); setTimer(45);
    } else {
      setDone(true);
    }
  };

  const pts = role==="aidant" ? Math.round((score/quiz.length)*60) : Math.round((score/quiz.length)*30);

  if (!role) return (
    <div className="page-wrap" style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{maxWidth:440,width:"100%"}}>
        <div className="card au1" style={{padding:32,textAlign:"center"}}>
          <div style={{fontSize:48,marginBottom:16}}>🎯</div>
          <h2 className="sora" style={{fontSize:22,fontWeight:800,color:"var(--navy)",marginBottom:8}}>Quiz de validation</h2>
          <p style={{fontSize:14,color:"var(--t2)",marginBottom:28,lineHeight:1.6}}>La session est terminée. Réponds au quiz pour valider vos points. Anti-triche activé : 45s max/question, copier-coller désactivé.</p>
          <div style={{display:"flex",gap:12,flexDirection:"column"}}>
            <button className="btn btn-blue" style={{justifyContent:"center",padding:"14px 0"}} onClick={()=>{setRole("apprenant");setTimer(45);}}>
              Je suis le Demandeur (Apprenant)
            </button>
            <button className="btn btn-navy" style={{justifyContent:"center",padding:"14px 0"}} onClick={()=>{setRole("aidant");setTimer(45);}}>
              Je suis l'Aidant (Expert)
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (done) return (
    <div className="page-wrap" style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{maxWidth:440,width:"100%"}}>
        <div className="card au1" style={{padding:32,textAlign:"center"}}>
          <div style={{fontSize:56,marginBottom:16,animation:"starPop .5s ease"}}>{score===quiz.length?"🏆":score>=2?"🎉":"📚"}</div>
          <h2 className="sora" style={{fontSize:24,fontWeight:800,color:"var(--navy)",marginBottom:8}}>
            {score===quiz.length?"Parfait !":score>=2?"Bien joué !":"Continue d'apprendre !"}
          </h2>
          <div style={{fontFamily:"Sora",fontWeight:700,fontSize:18,color:"var(--t2)",marginBottom:6}}>{score}/{quiz.length} bonnes réponses</div>
          <div style={{fontFamily:"Sora",fontWeight:900,fontSize:52,color:"var(--amber)",marginBottom:4,animation:"countBounce .6s ease"}}>+{pts}</div>
          <div style={{fontSize:14,color:"var(--t2)",marginBottom:24}}>points ajoutés à ton profil</div>
          <div className="prog" style={{marginBottom:24}}>
            <div className="prog-f" style={{width:`${(score/quiz.length)*100}%`}}/>
          </div>
          <button className="btn btn-navy" style={{width:"100%",justifyContent:"center",padding:"13px 0"}} onClick={()=>setPage("dashboard")}>
            Retour au tableau de bord
          </button>
        </div>
      </div>
    </div>
  );

  const cur = quiz[q];
  const timerPct = (timer/45)*100;

  return (
    <div className="page-wrap" style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{maxWidth:540,width:"100%"}}>
        <div className="au1" style={{marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
            <div style={{fontFamily:"Sora",fontWeight:700,fontSize:13,color:"var(--t2)"}}>Question {q+1}/{quiz.length}</div>
            <div style={{fontFamily:"Sora",fontWeight:700,fontSize:13,color:timer<15?"var(--red)":"var(--t2)"}}>⏱ {timer}s</div>
          </div>
          <div style={{background:"var(--border)",borderRadius:50,height:6,overflow:"hidden"}}>
            <div style={{width:`${timerPct}%`,height:"100%",background:timer<15?"var(--red)":"var(--blue2)",borderRadius:50,transition:"width 1s linear"}}/>
          </div>
        </div>

        <div className="card au2" style={{padding:24}}>
          <div style={{display:"flex",gap:8,marginBottom:20}}>
            <div style={{background:role==="aidant"?"var(--navy)":"var(--blue2)",color:"white",padding:"4px 12px",borderRadius:50,fontSize:11,fontWeight:700,fontFamily:"Sora"}}>
              {role==="aidant"?"Quiz Expert 🎓":"Quiz Apprenant 📚"}
            </div>
            <div style={{background:"#FEF3C7",color:"#92400E",padding:"4px 12px",borderRadius:50,fontSize:11,fontWeight:700,fontFamily:"Sora"}}>Algorithmique · Récursivité</div>
          </div>

          <h3 className="sora" style={{fontSize:17,fontWeight:700,color:"var(--navy)",marginBottom:20,lineHeight:1.5,whiteSpace:"pre-line"}}>{cur.q}</h3>

          {cur.opts.map((o,i)=>{
            let cls = "qopt";
            if (revealed) {
              if (i===cur.ans) cls+=" ok";
              else if (i===selected && i!==cur.ans) cls+=" ko";
            } else if (i===selected) cls+=" sel";
            return <button key={i} className={cls} onClick={()=>handleSelect(i)}>{String.fromCharCode(65+i)}. {o}</button>;
          })}

          {!revealed ? (
            <button className="btn btn-blue" style={{width:"100%",justifyContent:"center",padding:"12px 0",marginTop:4}} onClick={handleConfirm} disabled={selected===null}>
              Confirmer ma réponse
            </button>
          ) : (
            <div>
              <div style={{background:selected===cur.ans?"#D1FAE5":"#FEE2E2",borderRadius:10,padding:12,marginBottom:12,fontSize:13,fontWeight:600,color:selected===cur.ans?"#065F46":"#991B1B"}}>
                {selected===cur.ans?"✅ Bonne réponse !":"❌ Mauvaise réponse. La bonne réponse est surlignée en vert."}
              </div>
              <button className="btn btn-navy" style={{width:"100%",justifyContent:"center",padding:"12px 0"}} onClick={handleNext}>
                {q<quiz.length-1?"Question suivante →":"Voir mes résultats"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── HISTORY PAGE ─────────────────────────────────────────────────────────────
function HistoryPage() {
  return (
    <div className="page-wrap">
      <div className="mob" style={{background:"white",padding:"18px 20px 12px",borderBottom:"1px solid var(--border)"}}>
        <div style={{fontFamily:"Sora",fontWeight:800,fontSize:18,color:"var(--navy)"}}>Historique</div>
      </div>
      <div style={{padding:20,maxWidth:640,margin:"0 auto"}}>
        <div className="desk" style={{marginBottom:24}}>
          <h1 className="sora" style={{fontSize:26,fontWeight:800,color:"var(--navy)"}}>Historique des sessions</h1>
        </div>

        {/* Stats summary */}
        <div className="au1" style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12,marginBottom:24}}>
          {[["105","pts gagnés","🎯"],["4","sessions","🤝"],["3/4","validées","✅"]].map(([v,l,e])=>(
            <div key={l} className="card" style={{padding:16,textAlign:"center"}}>
              <div style={{fontSize:20,marginBottom:4}}>{e}</div>
              <div style={{fontFamily:"Sora",fontWeight:800,fontSize:20,color:"var(--navy)"}}>{v}</div>
              <div style={{fontSize:11,color:"var(--t2)",marginTop:2}}>{l}</div>
            </div>
          ))}
        </div>

        {HISTORY.map((h,i)=>(
          <div key={h.id} className="card" style={{padding:18,marginBottom:12,opacity:0,animation:`fadeUp .4s ${i*.08}s ease both`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
              <div>
                <div style={{display:"flex",gap:8,alignItems:"center",marginBottom:6}}>
                  <div className="tag tag-blue">{h.subject}</div>
                  <div className={`tag ${h.role==="aidant"?"tag-green":"tag-amber"}`}>
                    {h.role==="aidant"?"Aidant 🤝":"Demandeur 📚"}
                  </div>
                </div>
                <div style={{fontFamily:"Sora",fontWeight:700,fontSize:15,color:"var(--navy)",marginBottom:3}}>{h.notion}</div>
                <div style={{fontSize:12,color:"var(--muted)"}}>📅 {h.date}</div>
              </div>
              <div style={{textAlign:"right"}}>
                {h.validated ? (
                  <div style={{fontFamily:"Sora",fontWeight:800,fontSize:22,color:"var(--amber)"}}>+{h.pts} pts</div>
                ) : (
                  <div className="tag tag-gray">Non validé</div>
                )}
              </div>
            </div>
            {h.validated && (
              <div>
                <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"var(--t2)",marginBottom:4}}>
                  <span>Score quiz</span><span style={{fontWeight:700,color:"var(--navy)"}}>{h.quizScore}%</span>
                </div>
                <div className="prog">
                  <div className="prog-f" style={{width:`${h.quizScore}%`}}/>
                </div>
              </div>
            )}
            {!h.validated && (
              <div style={{fontSize:12,color:"var(--red)",background:"#FEE2E2",borderRadius:8,padding:"6px 10px"}}>
                ❌ Quiz non réussi (score: {h.quizScore}%) — aucun point attribué
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── PROFILE PAGE ─────────────────────────────────────────────────────────────
function ProfilePage({ setPage }) {
  const days = ["Lun","Mar","Mer","Jeu","Ven","Sam","Dim"];
  const slots = {Lun:["18h-20h"],Mar:[],Mer:["14h-16h","18h-20h"],Jeu:[],Ven:["16h-22h"],Sam:["10h-12h","14h-18h"],Dim:["10h-14h"]};

  return (
    <div className="page-wrap">
      <div className="mob" style={{background:"white",padding:"18px 20px 12px",borderBottom:"1px solid var(--border)"}}>
        <div style={{fontFamily:"Sora",fontWeight:800,fontSize:18,color:"var(--navy)"}}>Mon profil</div>
      </div>
      <div style={{padding:20,maxWidth:640,margin:"0 auto"}}>
        <div className="desk" style={{marginBottom:24}}>
          <h1 className="sora" style={{fontSize:26,fontWeight:800,color:"var(--navy)"}}>Mon profil</h1>
        </div>

        {/* Profile card */}
        <div className="card au1" style={{padding:24,marginBottom:16}}>
          <div style={{display:"flex",gap:16,alignItems:"center",marginBottom:20}}>
            <div className="av" style={{width:64,height:64,fontSize:22,background:"linear-gradient(135deg,#7C3AED,#1D4ED8)"}}>KT</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"Sora",fontWeight:800,fontSize:19,color:"var(--navy)"}}>Kaylhia T.</div>
              <div style={{fontSize:13,color:"var(--t2)",marginTop:2}}>Intelligence Artificielle · L1 · IFRI/UAC</div>
              <div style={{display:"flex",gap:8,marginTop:8}}>
                <div className="bdg bdg-a">Actif</div>
                <div style={{fontSize:12,color:"var(--muted)",display:"flex",alignItems:"center",gap:4}}>📅 Membre depuis Jan 2026</div>
              </div>
            </div>
          </div>

          {/* Score progress */}
          <div style={{background:"var(--s2)",borderRadius:12,padding:16,marginBottom:0}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
              <div style={{fontFamily:"Sora",fontWeight:700,fontSize:14,color:"var(--navy)"}}>Progression vers Expert</div>
              <div style={{fontFamily:"Sora",fontWeight:700,fontSize:14,color:"var(--amber)"}}>84 pts</div>
            </div>
            <div className="prog"><div className="prog-f" style={{width:"56%"}}/></div>
            <div style={{fontSize:12,color:"var(--muted)",marginTop:6}}>66 points pour atteindre Expert</div>
          </div>
        </div>

        {/* Badges */}
        <div className="card au2" style={{padding:20,marginBottom:16}}>
          <div style={{fontFamily:"Sora",fontWeight:700,fontSize:15,color:"var(--navy)",marginBottom:14}}>Badges & Progression</div>
          {[["⬜","Novice","0–49 pts",true],["🟩","Actif","50–149 pts",true],["🟨","Expert","150–299 pts",false],["💜","Mentor","300+ pts",false]].map(([e,n,p,unlocked])=>(
            <div key={n} style={{display:"flex",gap:12,padding:"12px 0",borderBottom:"1px solid var(--border)",alignItems:"center",opacity:unlocked?1:.45}}>
              <span style={{fontSize:24}}>{e}</span>
              <div style={{flex:1}}>
                <div style={{fontFamily:"Sora",fontWeight:700,fontSize:14,color:"var(--navy)"}}>{n}</div>
                <div style={{fontSize:12,color:"var(--t2)"}}>{p}</div>
              </div>
              {unlocked && <div className="tag tag-green">✓ Débloqué</div>}
            </div>
          ))}
        </div>

        {/* Disponibilités */}
        <div className="card au3" style={{padding:20,marginBottom:16}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:14}}>
            <div style={{fontFamily:"Sora",fontWeight:700,fontSize:15,color:"var(--navy)"}}>Mes disponibilités</div>
            <button className="btn btn-ghost btn-xs">Modifier</button>
          </div>
          {days.map(d=>(
            <div key={d} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 0",borderBottom:"1px solid var(--border)"}}>
              <div style={{width:36,fontFamily:"Sora",fontWeight:600,fontSize:13,color:"var(--t2)"}}>{d}</div>
              <div style={{flex:1,display:"flex",gap:6,flexWrap:"wrap"}}>
                {slots[d].length>0 ? slots[d].map(s=>(
                  <span key={s} style={{background:"rgba(37,99,235,.1)",color:"var(--blue2)",padding:"3px 10px",borderRadius:50,fontSize:12,fontWeight:600}}>{s}</span>
                )) : <span style={{fontSize:12,color:"var(--muted)"}}>Non disponible</span>}
              </div>
            </div>
          ))}
        </div>

        {/* Settings */}
        <div className="card au4" style={{padding:16,marginBottom:16}}>
          <div style={{fontFamily:"Sora",fontWeight:700,fontSize:15,color:"var(--navy)",marginBottom:12}}>Paramètres</div>
          {[["Limite alertes/semaine","5 alertes"],["Matières prioritaires","Algorithmique, IA"],["Notifications push","Activées"],["Compte connecté","kvictoria@gmail.com"]].map(([l,v])=>(
            <div key={l} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 0",borderBottom:"1px solid var(--border)"}}>
              <span style={{fontSize:14,color:"var(--text)"}}>{l}</span>
              <span style={{fontSize:13,color:"var(--blue2)",fontWeight:600,cursor:"pointer"}}>{v} ✎</span>
            </div>
          ))}
        </div>

        <button className="btn btn-ghost" style={{width:"100%",justifyContent:"center",padding:"12px 0",color:"var(--red)",borderColor:"#FEE2E2"}} onClick={()=>setPage("landing")}>
          Se déconnecter
        </button>
      </div>
    </div>
  );
}

// ─── NOTIFICATIONS PAGE ───────────────────────────────────────────────────────
function NotifsPage({ setPage }) {
  const icons = { alert:"⚡", badge:"🏆", quiz:"✅", chatbot:"🧠" };
  return (
    <div className="page-wrap">
      <div className="mob" style={{background:"white",padding:"18px 20px 12px",borderBottom:"1px solid var(--border)"}}>
        <div style={{fontFamily:"Sora",fontWeight:800,fontSize:18,color:"var(--navy)"}}>Notifications</div>
      </div>
      <div style={{padding:20,maxWidth:600,margin:"0 auto"}}>
        <div className="desk" style={{marginBottom:24,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <h1 className="sora" style={{fontSize:26,fontWeight:800,color:"var(--navy)"}}>Notifications</h1>
          <span style={{fontSize:13,color:"var(--blue2)",cursor:"pointer",fontWeight:600}}>Tout marquer lu</span>
        </div>
        {NOTIFS.map((n,i)=>(
          <div key={n.id} className={`ni${!n.read?" unread":""}`} style={{opacity:0,animation:`fadeUp .4s ${i*.07}s ease both`}}
            onClick={()=>{ if(n.type==="alert") setPage("alerts"); if(n.type==="chatbot") setPage("chatbot"); }}>
            <div style={{width:44,height:44,borderRadius:12,background:!n.read?"rgba(37,99,235,.1)":"var(--s2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:20,flexShrink:0}}>
              {icons[n.type]}
            </div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"Sora",fontWeight:700,fontSize:14,color:"var(--navy)",marginBottom:3}}>
                {n.title}
                {!n.read && <span style={{display:"inline-block",width:6,height:6,background:"var(--blue2)",borderRadius:"50%",marginLeft:8,verticalAlign:"middle"}}/>}
              </div>
              <div style={{fontSize:13,color:"var(--t2)",lineHeight:1.4}}>{n.msg}</div>
              <div style={{fontSize:11,color:"var(--muted)",marginTop:4}}>{n.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LEADERBOARD PAGE ────────────────────────────────────────────────────────
function LeaderboardPage() {
  const [period, setPeriod] = useState("semaine");
  const bdgMap = { mentor:"bdg-m", expert:"bdg-e", actif:"bdg-a", novice:"bdg-n" };
  const bdgLbl = { mentor:"Mentor 💜", expert:"Expert 🟨", actif:"Actif 🟩", novice:"Novice ⬜" };
  const medals = ["🥇","🥈","🥉"];

  return (
    <div className="page-wrap">
      <div className="mob" style={{background:"white",padding:"18px 20px 12px",borderBottom:"1px solid var(--border)"}}>
        <div style={{fontFamily:"Sora",fontWeight:800,fontSize:18,color:"var(--navy)"}}>Classement</div>
      </div>
      <div style={{padding:20,maxWidth:600,margin:"0 auto"}}>
        <div className="desk" style={{marginBottom:24}}>
          <h1 className="sora" style={{fontSize:26,fontWeight:800,color:"var(--navy)"}}>Classement communauté</h1>
        </div>

        {/* Period filter */}
        <div className="au1" style={{display:"flex",gap:8,marginBottom:20}}>
          {["semaine","mois","global"].map(p=>(
            <button key={p} className={`chip${period===p?" on":""}`} onClick={()=>setPeriod(p)} style={{textTransform:"capitalize"}}>{p}</button>
          ))}
        </div>

        {/* Top 3 podium */}
        <div className="au2 card" style={{padding:20,marginBottom:20,background:"linear-gradient(135deg,#F8FAFF,#EEF4FF)"}}>
          <div style={{display:"flex",justifyContent:"center",alignItems:"flex-end",gap:12}}>
            {[LEADERBOARD[1],LEADERBOARD[0],LEADERBOARD[2]].map((u,i)=>{
              const heights=["80px","96px","72px"],order=["🥈","🥇","🥉"];
              return (
                <div key={u.rank} style={{textAlign:"center",flex:1}}>
                  <div style={{fontFamily:"Sora",fontWeight:700,fontSize:13,color:"var(--navy)",marginBottom:6}}>{u.name.split(" ")[0]}</div>
                  <div className="av" style={{width:44,height:44,fontSize:15,margin:"0 auto 6px"}}>{u.name[0]+u.name.split(" ")[1][0]}</div>
                  <div style={{fontSize:13,fontWeight:700,color:"var(--amber)",marginBottom:4}}>{u.pts} pts</div>
                  <div style={{background:i===1?"var(--amber)":i===0?"#CBD5E1":"#CD7F32",borderRadius:"10px 10px 0 0",height:heights[i],display:"flex",alignItems:"flex-end",justifyContent:"center",paddingBottom:8}}>
                    <span style={{fontSize:24}}>{order[i]}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Full list */}
        {LEADERBOARD.map((u,i)=>(
          <div key={u.rank} className={`rkrow au${Math.min(i+3,6)}${u.me?" me":""}`} style={{opacity:0,animation:`fadeUp .4s ${i*.06}s ease both`}}>
            <div style={{width:28,fontFamily:"Sora",fontWeight:800,fontSize:15,color:i<3?"var(--amber)":"var(--muted)",textAlign:"center"}}>
              {i<3?medals[i]:u.rank}
            </div>
            <div className="av" style={{width:40,height:40,fontSize:15}}>{u.name[0]+u.name.split(" ")[1][0]}</div>
            <div style={{flex:1}}>
              <div style={{fontFamily:"Sora",fontWeight:700,fontSize:14,color:"var(--navy)",display:"flex",gap:8,alignItems:"center"}}>
                {u.name}
                {u.me && <span style={{fontSize:11,background:"#EEF2FF",color:"var(--blue2)",padding:"2px 7px",borderRadius:50}}>Moi</span>}
              </div>
              <div style={{fontSize:12,color:"var(--t2)"}}>{u.filiere} · {u.sessions} sessions</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{fontFamily:"Sora",fontWeight:700,fontSize:15,color:"var(--navy)"}}>{u.pts} pts</div>
              <div className={`bdg ${bdgMap[u.badge]}`} style={{marginTop:4}}>{bdgLbl[u.badge]}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CHATBOT PAGE ──────────────────────────────────────────────────────────────
function ChatbotPage() {
  const [msgs, setMsgs] = useState([
    { id:1, from:"bot", text:"Salut Kaylhia ! 👋 Je suis PeerBuddy, ton compagnon de bien-être académique. Je suis là pour toi 24h/7j — stress, procrastination, motivation, burn-out. Comment tu te sens aujourd'hui ?", time:"Maintenant" }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  const suggestions = [
    { label:"😰 Je suis stressé(e)", cat:"stress" },
    { label:"😴 Je procrastine", cat:"procrast" },
    { label:"🔋 Besoin de motivation", cat:"motiv" },
    { label:"⏰ Gérer mon temps", cat:"temps" },
    { label:"🥱 Je suis épuisé(e)", cat:"burn" },
    { label:"📝 Révisions exam", cat:"exam" },
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:"smooth" });
  }, [msgs, typing]);

  const sendMsg = (text) => {
    if (!text.trim()) return;
    const newMsg = { id:Date.now(), from:"user", text, time:"Maintenant" };
    setMsgs(p=>[...p, newMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      const reply = getBotReply(text);
      setMsgs(p=>[...p, { id:Date.now()+1, from:"bot", text:reply, time:"Maintenant" }]);
    }, 900 + Math.random()*600);
  };

  return (
    <div className="page-wrap" style={{display:"flex",flexDirection:"column",height:"100vh",overflow:"hidden"}}>
      {/* Header */}
      <div style={{background:"white",borderBottom:"1px solid var(--border)",padding:"16px 20px",flexShrink:0,zIndex:10}}>
        <div style={{display:"flex",alignItems:"center",gap:14,maxWidth:680,margin:"0 auto"}}>
          <div style={{position:"relative"}}>
            <div style={{width:48,height:48,borderRadius:16,background:"linear-gradient(135deg,#7C3AED,#1D4ED8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:24,flexShrink:0}}>🧠</div>
            <div className="odot" style={{position:"absolute",bottom:0,right:0}}/>
          </div>
          <div style={{flex:1}}>
            <div style={{fontFamily:"Sora",fontWeight:800,fontSize:17,color:"var(--navy)"}}>PeerBuddy</div>
            <div style={{fontSize:12,color:"var(--green)",fontWeight:600,display:"flex",alignItems:"center",gap:5}}>
              <span style={{width:6,height:6,background:"var(--green)",borderRadius:"50%",display:"inline-block"}}/>
              En ligne · Psychologue virtuel
            </div>
          </div>
          <div style={{fontSize:12,color:"var(--t2)",textAlign:"right"}}>
            <div style={{fontFamily:"Sora",fontWeight:600}}>Sans API externe</div>
            <div>Réponses intégrées</div>
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div style={{flex:1,overflowY:"auto",padding:"20px",maxWidth:680,width:"100%",margin:"0 auto",paddingBottom:4}}>
        {/* Suggestions */}
        <div style={{textAlign:"center",marginBottom:20}}>
          <div style={{fontSize:13,color:"var(--muted)",marginBottom:10}}>Sujets fréquents :</div>
          <div className="chips-row" style={{justifyContent:"center",flexWrap:"wrap",gap:8}}>
            {suggestions.map(s=>(
              <button key={s.cat} className={`chip${activeCategory===s.cat?" on":""}`}
                onClick={()=>{ setActiveCategory(s.cat); sendMsg(s.label.replace(/[^\w\s()éèêëàâùûîïôœ'-]/g,"").trim()); }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {msgs.map(m=>(
            <div key={m.id} style={{display:"flex",gap:10,flexDirection:m.from==="user"?"row-reverse":"row",alignItems:"flex-end"}}>
              {m.from==="bot" && (
                <div style={{width:32,height:32,borderRadius:10,background:"linear-gradient(135deg,#7C3AED,#1D4ED8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,flexShrink:0}}>🧠</div>
              )}
              <div className={m.from==="bot"?"bbl-bot":"bbl-usr"}>{m.text}</div>
              {m.from==="user" && (
                <div className="av" style={{width:32,height:32,fontSize:12,flexShrink:0}}>KT</div>
              )}
            </div>
          ))}

          {typing && (
            <div style={{display:"flex",gap:10,alignItems:"flex-end"}}>
              <div style={{width:32,height:32,borderRadius:10,background:"linear-gradient(135deg,#7C3AED,#1D4ED8)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>🧠</div>
              <div className="bbl-bot" style={{padding:"14px 18px"}}>
                <div style={{display:"flex",gap:5,alignItems:"center"}}>
                  <div className="td"/>
                  <div className="td"/>
                  <div className="td"/>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef}/>
        </div>
      </div>

      {/* Input area */}
      <div style={{background:"white",borderTop:"1px solid var(--border)",padding:"14px 20px",flexShrink:0}}>
        <div style={{display:"flex",gap:10,maxWidth:680,margin:"0 auto",alignItems:"flex-end"}}>
          <textarea
            ref={inputRef}
            className="inp"
            value={input}
            onChange={e=>setInput(e.target.value)}
            onKeyDown={e=>{ if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); sendMsg(input); } }}
            placeholder="Dis-moi comment tu te sens..."
            style={{resize:"none",minHeight:44,maxHeight:100,lineHeight:1.5,paddingTop:12}}
            rows={1}
          />
          <button
            className="btn btn-navy"
            style={{height:44,width:44,borderRadius:12,flexShrink:0,padding:0,justifyContent:"center"}}
            onClick={()=>sendMsg(input)}
            disabled={!input.trim()}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
          </button>
        </div>
        <div style={{textAlign:"center",fontSize:11,color:"var(--muted)",marginTop:8,maxWidth:680,margin:"6px auto 0"}}>
          PeerBuddy ne remplace pas un professionnel de santé. En cas de détresse sérieuse, contacte un conseiller de ton université.
        </div>
      </div>
    </div>
  );
}

// ─── MAIN APP ──────────────────────────────────────────────────────────────────
export default function PeerAlert() {
  const [page, setPage] = useState("landing");

  useEffect(() => { injectCSS(); }, []);

  const nav = (p) => setPage(p);

  if (page==="landing") return <LandingPage setPage={nav}/>;
  if (page==="login") return <AuthPage setPage={nav} mode="login"/>;
  if (page==="register") return <AuthPage setPage={nav} mode="register"/>;
  if (page==="session") return <SessionPage setPage={nav}/>;
  if (page==="quiz") return <QuizPage setPage={nav}/>;
  if (page==="launch") return (
    <AppShell page="launch" setPage={nav}>
      <LaunchPage setPage={nav}/>
    </AppShell>
  );
  if (page==="chatbot") return (
    <AppShell page="chatbot" setPage={nav}>
      <ChatbotPage/>
    </AppShell>
  );

  return (
    <AppShell page={page} setPage={nav}>
      {page==="dashboard" && <DashboardPage setPage={nav}/>}
      {page==="alerts" && <AlertsPage setPage={nav}/>}
      {page==="history" && <HistoryPage/>}
      {page==="profile" && <ProfilePage setPage={nav}/>}
      {page==="notifs" && <NotifsPage setPage={nav}/>}
      {page==="leaderboard" && <LeaderboardPage/>}
    </AppShell>
  );
}
