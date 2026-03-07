import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════
   DESIGN SYSTEM
   Palette : Blanc pur + spectre complet du bleu
   Typo    : DM Serif Display (titres) + DM Sans (corps)
   Aucun emoji — icônes SVG uniquement
═══════════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap');

:root {
  /* BLEU — du plus foncé au plus clair */
  --b900: #07153A;
  --b800: #0B1D4F;
  --b700: #0D2466;
  --b600: #1035A0;
  --b500: #1549C8;
  --b400: #2563EB;
  --b300: #3B82F6;
  --b200: #93C5FD;
  --b150: #BFDBFE;
  --b100: #DBEAFE;
  --b050: #EFF6FF;
  --b025: #F8FBFF;

  /* BLANC & SURFACES */
  --white: #FFFFFF;
  --s1: #FAFCFF;
  --s2: #F4F8FF;
  --s3: #EEF4FF;

  /* TEXTE */
  --t1: #07153A;
  --t2: #2D4070;
  --t3: #5A71A4;
  --t4: #8FA3C8;

  /* SÉPARATEURS */
  --line: #E0EAFF;
  --line2: #C8D9F5;

  /* ÉTATS */
  --success: #0E7A50;
  --success-bg: #E9FBF3;
  --success-line: #6EDDB2;
  --warn: #7A4E0E;
  --warn-bg: #FEF8EC;
  --warn-line: #F5C842;
  --danger: #B01A1A;
  --danger-bg: #FFF0F0;
  --danger-line: #F5AAAA;

  /* OMBRES */
  --sh-xs: 0 1px 4px rgba(7,21,58,.06);
  --sh-sm: 0 2px 12px rgba(7,21,58,.08);
  --sh-md: 0 6px 28px rgba(7,21,58,.10);
  --sh-lg: 0 16px 56px rgba(7,21,58,.13);

  /* RAYONS */
  --r4: 4px; --r8: 8px; --r12: 12px; --r16: 16px; --r24: 24px; --rpill: 999px;
}

*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
html { scroll-behavior:smooth; }
body { font-family:'DM Sans', sans-serif; background:var(--s1); color:var(--t1); -webkit-font-smoothing:antialiased; overflow-x:hidden; }
h1,h2,h3,h4,h5,.serif { font-family:'DM Serif Display', serif; }
::-webkit-scrollbar { width:4px; height:4px; }
::-webkit-scrollbar-track { background:transparent; }
::-webkit-scrollbar-thumb { background:var(--b150); border-radius:2px; }

/* ANIMATIONS */
@keyframes fadeUp   { from { opacity:0; transform:translateY(20px) } to { opacity:1; transform:translateY(0) } }
@keyframes fadeIn   { from { opacity:0 } to { opacity:1 } }
@keyframes slideR   { from { opacity:0; transform:translateX(-14px) } to { opacity:1; transform:translateX(0) } }
@keyframes slideL   { from { opacity:0; transform:translateX(14px)  } to { opacity:1; transform:translateX(0) } }
@keyframes rise     { from { opacity:0; transform:translateY(28px) scale(.97) } to { opacity:1; transform:translateY(0) scale(1) } }
@keyframes shimmer  { 0%{opacity:.6} 50%{opacity:1} 100%{opacity:.6} }
@keyframes countUp  { from { opacity:0; transform:scale(.75) } to { opacity:1; transform:scale(1) } }
@keyframes pulseDot { 0%,100%{transform:scale(1);opacity:.7} 50%{transform:scale(1.5);opacity:1} }
@keyframes typeDot  { 0%,60%,100%{transform:translateY(0);opacity:.35} 30%{transform:translateY(-5px);opacity:1} }
@keyframes timerShrink { from{stroke-dashoffset:0} to{stroke-dashoffset:283} }
@keyframes gradShift { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
@keyframes lineGrow  { from{transform:scaleX(0)} to{transform:scaleX(1)} }

.a1{animation:fadeUp .45s .00s ease both}
.a2{animation:fadeUp .45s .07s ease both}
.a3{animation:fadeUp .45s .14s ease both}
.a4{animation:fadeUp .45s .21s ease both}
.a5{animation:fadeUp .45s .28s ease both}
.a6{animation:fadeUp .45s .35s ease both}
.ai{animation:fadeIn .35s ease both}
.ar{animation:rise   .5s ease both}

/* BUTTONS */
.btn { display:inline-flex; align-items:center; justify-content:center; gap:7px; padding:10px 22px; border-radius:var(--rpill); border:none; font-family:'DM Sans',sans-serif; font-weight:600; font-size:13.5px; cursor:pointer; transition:all .2s ease; white-space:nowrap; letter-spacing:.01em; }
.btn-primary   { background:var(--b500); color:var(--white); }
.btn-primary:hover  { background:var(--b600); transform:translateY(-1px); box-shadow:0 6px 18px rgba(21,73,200,.28); }
.btn-dark      { background:var(--b800); color:var(--white); }
.btn-dark:hover     { background:var(--b900); transform:translateY(-1px); box-shadow:0 6px 18px rgba(7,21,58,.3); }
.btn-outline   { background:transparent; color:var(--b500); border:1.5px solid var(--b300); }
.btn-outline:hover  { background:var(--b050); border-color:var(--b400); }
.btn-ghost     { background:transparent; color:var(--t2); border:1.5px solid var(--line2); }
.btn-ghost:hover    { background:var(--s3); color:var(--b500); border-color:var(--b200); }
.btn-white     { background:var(--white); color:var(--b700); }
.btn-white:hover    { background:var(--b050); }
.btn-outline-w { background:transparent; color:var(--white); border:1.5px solid rgba(255,255,255,.35); }
.btn-outline-w:hover{ background:rgba(255,255,255,.1); border-color:rgba(255,255,255,.7); }
.btn-sm  { padding:7px 16px; font-size:12.5px; }
.btn-lg  { padding:14px 34px; font-size:15px; }
.btn-xs  { padding:5px 12px; font-size:11.5px; }
.btn:disabled { opacity:.45; cursor:not-allowed; transform:none !important; box-shadow:none !important; }

/* CARDS */
.card  { background:var(--white); border-radius:var(--r16); border:1px solid var(--line); box-shadow:var(--sh-sm); }
.card-s{ background:var(--white); border-radius:var(--r12); border:1px solid var(--line); box-shadow:var(--sh-xs); }

/* INPUTS */
.inp { background:var(--s2); border:1.5px solid var(--line2); border-radius:var(--r8); padding:10px 14px; font-family:'DM Sans',sans-serif; font-size:14px; color:var(--t1); outline:none; width:100%; transition:all .2s; }
.inp:focus { border-color:var(--b400); background:var(--white); box-shadow:0 0 0 3px rgba(37,99,235,.1); }
.inp::placeholder { color:var(--t4); }
select.inp { appearance:none; background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='11' height='7' viewBox='0 0 11 7'%3E%3Cpath d='M1 1l4.5 4.5L10 1' stroke='%235A71A4' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E"); background-repeat:no-repeat; background-position:right 13px center; padding-right:34px; }
textarea.inp { resize:vertical; min-height:78px; }
.lbl { font-family:'DM Sans',sans-serif; font-size:12px; font-weight:600; color:var(--t3); letter-spacing:.05em; text-transform:uppercase; margin-bottom:6px; display:block; }

/* SIDEBAR */
.sidebar { width:240px; background:var(--b900); position:fixed; top:0; left:0; height:100vh; display:flex; flex-direction:column; padding:24px 14px; z-index:200; overflow-y:auto; }
.logo-wrap { display:flex; align-items:center; gap:10px; padding:2px 10px 0; margin-bottom:32px; }
.logo-mark { width:32px; height:32px; background:var(--b500); border-radius:var(--r8); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.logo-text { font-family:'DM Serif Display',serif; font-size:20px; color:var(--white); letter-spacing:.01em; }
.nav-item { display:flex; align-items:center; gap:11px; padding:10px 12px; border-radius:var(--r8); cursor:pointer; font-size:13.5px; font-weight:500; color:rgba(255,255,255,.5); transition:all .18s; margin-bottom:2px; border:none; background:transparent; width:100%; text-align:left; position:relative; }
.nav-item:hover { background:rgba(255,255,255,.06); color:rgba(255,255,255,.85); }
.nav-item.active { background:var(--b500); color:var(--white); font-weight:600; }
.nav-item svg { width:18px; height:18px; flex-shrink:0; }
.nav-dot { position:absolute; top:9px; right:10px; width:6px; height:6px; background:var(--b200); border-radius:50%; }
.nav-section { font-size:10.5px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:rgba(255,255,255,.22); padding:16px 12px 6px; }
.sidebar-bottom { margin-top:auto; border-top:1px solid rgba(255,255,255,.08); padding-top:14px; }

/* MAIN */
.main { margin-left:240px; min-height:100vh; background:var(--s1); }
.page-inner { padding:32px 36px; max-width:960px; margin:0 auto; }

/* PAGE HEADER */
.ph { margin-bottom:28px; }
.ph-title { font-family:'DM Serif Display',serif; font-size:28px; color:var(--t1); }
.ph-sub { font-size:14px; color:var(--t3); margin-top:4px; }

/* TAGS */
.tag { display:inline-flex; align-items:center; gap:4px; padding:3px 10px; border-radius:var(--rpill); font-size:11.5px; font-weight:600; }
.tag-blue  { background:var(--b100); color:var(--b600); }
.tag-green { background:var(--success-bg); color:var(--success); }
.tag-warn  { background:var(--warn-bg); color:var(--warn); }
.tag-red   { background:var(--danger-bg); color:var(--danger); }
.tag-gray  { background:var(--s3); color:var(--t3); }

/* CHIPS */
.chip { background:var(--white); border:1.5px solid var(--line2); color:var(--t2); padding:6px 16px; border-radius:var(--rpill); font-size:13px; font-weight:500; cursor:pointer; transition:all .18s; white-space:nowrap; }
.chip:hover { border-color:var(--b300); color:var(--b500); }
.chip.on { background:var(--b800); border-color:var(--b800); color:var(--white); }

/* BADGE PILLS */
.bdg { display:inline-flex; align-items:center; gap:5px; padding:4px 11px; border-radius:var(--rpill); font-size:11px; font-weight:700; letter-spacing:.04em; }
.bdg-novice  { background:var(--s3); color:var(--t3); border:1px solid var(--line2); }
.bdg-actif   { background:var(--b100); color:var(--b600); border:1px solid var(--b150); }
.bdg-expert  { background:var(--b700); color:var(--white); }
.bdg-mentor  { background:var(--b900); color:var(--white); }

/* PROGRESS BAR */
.prog { background:var(--b100); border-radius:var(--rpill); height:6px; overflow:hidden; }
.prog-fill { height:100%; border-radius:var(--rpill); background:linear-gradient(90deg,var(--b400),var(--b600)); transition:width .7s cubic-bezier(.4,0,.2,1); }

/* AVATAR */
.av { border-radius:50%; background:linear-gradient(135deg,var(--b400),var(--b700)); display:flex; align-items:center; justify-content:center; color:var(--white); font-weight:700; flex-shrink:0; font-family:'DM Sans',sans-serif; }

/* ONLINE DOT */
.online { width:9px; height:9px; background:#2BB573; border-radius:50%; border:2px solid var(--white); flex-shrink:0; animation:pulseDot 2s infinite; }

/* ALERT CARD */
.ac { background:var(--white); border-radius:var(--r16); padding:20px; border:1px solid var(--line); box-shadow:var(--sh-xs); transition:all .22s; cursor:pointer; }
.ac:hover { border-color:var(--b300); box-shadow:var(--sh-md); transform:translateY(-2px); }

/* BUBBLE */
.bubble-bot { background:var(--white); border:1px solid var(--line); border-radius:var(--r16) var(--r16) var(--r16) 4px; padding:12px 16px; max-width:78%; box-shadow:var(--sh-xs); animation:slideR .28s ease; font-size:13.5px; line-height:1.65; color:var(--t1); }
.bubble-usr { background:var(--b600); color:var(--white); border-radius:var(--r16) var(--r16) 4px var(--r16); padding:12px 16px; max-width:78%; margin-left:auto; animation:slideL .28s ease; font-size:13.5px; line-height:1.65; }

/* QUIZ OPTION */
.qopt { background:var(--s2); border:1.5px solid var(--line); border-radius:var(--r8); padding:13px 16px; cursor:pointer; transition:all .18s; font-size:14px; text-align:left; width:100%; margin-bottom:9px; font-family:'DM Sans',sans-serif; color:var(--t1); }
.qopt:hover { border-color:var(--b300); background:var(--b050); }
.qopt.sel { border-color:var(--b400); background:var(--b050); color:var(--b600); font-weight:600; }
.qopt.ok  { border-color:var(--success-line); background:var(--success-bg); color:var(--success); font-weight:600; }
.qopt.ko  { border-color:var(--danger-line); background:var(--danger-bg); color:var(--danger); }

/* DIVIDER */
.divider { height:1px; background:var(--line); margin:18px 0; }

/* NOTIF ITEM */
.ni { display:flex; gap:14px; padding:14px 16px; border-radius:var(--r12); border:1px solid var(--line); background:var(--white); cursor:pointer; transition:all .18s; margin-bottom:8px; }
.ni:hover { border-color:var(--b200); box-shadow:var(--sh-xs); }
.ni.unread { border-left:3px solid var(--b400); }

/* RANK ROW */
.rkrow { display:flex; align-items:center; gap:12px; padding:12px 16px; border-radius:var(--r12); background:var(--white); border:1px solid var(--line); margin-bottom:7px; transition:all .18s; }
.rkrow:hover { border-color:var(--b200); }
.rkrow.me { border:1.5px solid var(--b400); background:var(--b050); }

/* PART ROW */
.prow { display:flex; align-items:center; gap:12px; padding:11px 14px; border-radius:var(--r8); background:var(--s2); border:1px solid var(--line); margin-bottom:8px; }

/* STAT CARD */
.stat { background:var(--white); border-radius:var(--r12); border:1px solid var(--line); padding:18px 20px; }
.stat-val { font-family:'DM Serif Display',serif; font-size:32px; color:var(--t1); }
.stat-lbl { font-size:12.5px; color:var(--t3); margin-top:3px; }

/* SECTION ACCENT LINE */
.accent-line { display:block; width:40px; height:3px; border-radius:2px; background:var(--b500); margin-bottom:16px; }

/* CHIPS ROW SCROLL */
.chips-row { display:flex; gap:8px; overflow-x:auto; padding-bottom:2px; scrollbar-width:none; }
.chips-row::-webkit-scrollbar { display:none; }

/* TYPING */
.td { width:7px; height:7px; background:var(--b200); border-radius:50%; display:inline-block; animation:typeDot 1.1s infinite; }
.td:nth-child(2) { animation-delay:.18s; }
.td:nth-child(3) { animation-delay:.36s; }

/* BOTTOM NAV */
.bnav { display:none; position:fixed; bottom:0; left:0; right:0; background:var(--white); border-top:1px solid var(--line); padding:8px 0 18px; z-index:200; justify-content:space-around; }
.bni { display:flex; flex-direction:column; align-items:center; gap:3px; cursor:pointer; padding:4px 10px; color:var(--t4); font-size:10px; font-weight:600; border-radius:var(--r8); border:none; background:transparent; transition:all .18s; }
.bni.active { color:var(--b500); }
.bni svg { width:20px; height:20px; }

/* HERO GRADIENT */
.hero-bg { background:linear-gradient(145deg, var(--b900) 0%, var(--b700) 40%, var(--b500) 75%, var(--b400) 100%); background-size:200% 200%; animation:gradShift 14s ease infinite; }

/* FEATURE ICON BOX */
.feat-icon { width:44px; height:44px; background:var(--b050); border:1px solid var(--b100); border-radius:var(--r12); display:flex; align-items:center; justify-content:center; margin-bottom:16px; }
.feat-icon svg { width:22px; height:22px; stroke:var(--b500); }

/* HERO CARD */
.hcard { background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.15); border-radius:var(--r16); backdrop-filter:blur(16px); padding:18px 20px; }

/* STEP DOT */
.sdot { width:44px; height:44px; border-radius:var(--r12); background:var(--b800); color:var(--white); display:flex; align-items:center; justify-content:center; font-family:'DM Serif Display',serif; font-size:18px; flex-shrink:0; }

/* TOP STRIPE */
.top-stripe { height:3px; border-radius:0 0 0 0; background:linear-gradient(90deg,var(--b500),var(--b300),var(--b500)); background-size:200% 100%; animation:gradShift 4s ease infinite; }

@media(max-width:768px){
  .sidebar { display:none !important; }
  .main { margin-left:0 !important; padding-bottom:76px; }
  .bnav { display:flex; }
  .page-inner { padding:18px 16px; }
  .desk { display:none !important; }
}
@media(min-width:769px){ .mob { display:none !important; } }
`;

function injectCSS() {
  if (document.getElementById("pa2-css")) return;
  const el = document.createElement("style");
  el.id = "pa2-css"; el.innerHTML = CSS;
  document.head.appendChild(el);
}

/* ───── ICONS ─────────────────────────────────────────── */
const I = {
  Home: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>,
  Bell: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" /></svg>,
  User: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>,
  History: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="12 8 12 12 14 14" /><path d="M3.05 11a9 9 0 100 2M3 4v4h4" /></svg>,
  Chat: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>,
  Trophy: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="8 21 12 17 16 21" /><line x1="12" y1="17" x2="12" y2="11" /><path d="M7 4H4a2 2 0 000 4c0 5.5 3.5 9.3 8 10 4.5-.7 8-4.5 8-10a2 2 0 000-4h-3" /><line x1="7" y1="4" x2="17" y2="4" /></svg>,
  Alert: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>,
  Plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
  Send: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>,
  Check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>,
  X: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>,
  Book: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>,
  Zap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  Brain: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 007 4.5v.1A2.5 2.5 0 014.5 7a2.5 2.5 0 000 5 2.5 2.5 0 002.5 2.5v.1A2.5 2.5 0 009.5 17h5a2.5 2.5 0 002.5-2.4v-.1A2.5 2.5 0 0019.5 12a2.5 2.5 0 000-5 2.5 2.5 0 00-2.5-2.4V4.5A2.5 2.5 0 0014.5 2h-5z" /></svg>,
  Clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>,
  Users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>,
  Shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  Eye: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
  EyeOff: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>,
  ChevR: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>,
  ChevL: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>,
  Settings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></svg>,
  LogOut: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>,
  BarChart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>,
  Star: <svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
  Medal: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="15" r="7" /><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" /><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
  Info: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>,
  WA: <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>,
};

/* ───── MOCK DATA ─────────────────────────────────────── */
const ALERTS = [
  { id: 1, subject: "Algorithmique", notion: "Récursivité", type: "Exercice bloquant", time: "18h00–19h30", spots: 3, taken: 1, author: "K. Tovihouande", level: "L1", filiere: "Intelligence Artificielle", urgent: true, expert: false },
  { id: 2, subject: "Mathématiques", notion: "Intégrales par parties", type: "Compréhension du cours", time: "20h00–21h00", spots: 2, taken: 1, author: "C. Dako", level: "L1", filiere: "Cybersécurité", urgent: false, expert: true },
  { id: 3, subject: "Réseaux", notion: "Protocoles TCP/IP", type: "Schéma difficile", time: "Demain 14h", spots: 4, taken: 2, author: "E. Adjati", level: "L1", filiere: "SEIoT", urgent: false, expert: true },
  { id: 4, subject: "Programmation Web", notion: "Hooks React", type: "Exercice bloquant", time: "Ce soir 21h", spots: 3, taken: 0, author: "J. Lokossou", level: "L1", filiere: "Internet & Multimédia", urgent: true, expert: false },
];
const HISTORY = [
  { id: 1, subject: "Algorithmique", notion: "Tableaux dynamiques", role: "aidant", date: "28 Fév 2026", pts: 42, quiz: 85, ok: true },
  { id: 2, subject: "Mathématiques", notion: "Dérivées", role: "demandeur", date: "25 Fév 2026", pts: 28, quiz: 70, ok: true },
  { id: 3, subject: "Réseaux", notion: "Adressage IP", role: "aidant", date: "20 Fév 2026", pts: 35, quiz: 90, ok: true },
  { id: 4, subject: "Bases de données", notion: "Jointures SQL", role: "demandeur", date: "15 Fév 2026", pts: 0, quiz: 40, ok: false },
];
const NOTIFS = [
  { id: 1, type: "alert", title: "Nouvelle alerte — Algorithmique", msg: "K. Tovihouande cherche de l'aide sur la récursivité", time: "Il y a 5 min", read: false },
  { id: 2, type: "badge", title: "Badge débloqué", msg: "Vous êtes désormais Actif. Continuez ainsi.", time: "Il y a 2h", read: false },
  { id: 3, type: "quiz", title: "Session validée", msg: "Session avec C. Dako confirmée — +42 points", time: "Hier", read: true },
  { id: 4, type: "alert", title: "Nouvelle alerte — Réseaux", msg: "E. Adjati cherche de l'aide sur TCP/IP", time: "Hier", read: true },
  { id: 5, type: "buddy", title: "PeerBuddy", msg: "Votre check-in quotidien — comment vous sentez-vous ?", time: "Ce matin", read: false },
];
const LEADERBOARD = [
  { rank: 1, name: "N. Kouelo", filiere: "Génie Logiciel", pts: 412, badge: "mentor", sess: 23 },
  { rank: 2, name: "C. Dako", filiere: "Cybersécurité", pts: 287, badge: "expert", sess: 15 },
  { rank: 3, name: "V. Tovihouande", filiere: "Intelligence Artificielle", pts: 234, badge: "expert", sess: 12 },
  { rank: 4, name: "J. Lokossou", filiere: "Internet & Multimédia", pts: 183, badge: "expert", sess: 10 },
  { rank: 5, name: "E. Adjati", filiere: "SEIoT", pts: 127, badge: "actif", sess: 7 },
  { rank: 6, name: "K. Tovihouande", filiere: "IA", pts: 84, badge: "actif", sess: 4, me: true },
  { rank: 7, name: "A. Mensah", filiere: "GL", pts: 61, badge: "actif", sess: 3 },
  { rank: 8, name: "F. Omar", filiere: "Cybersécurité", pts: 32, badge: "novice", sess: 2 },
];

/* ───── CHATBOT KB ─────────────────────────────────────── */
const KB = {
  stress: ["Je comprends cette pression. Une technique immédiate : inspirez 4 secondes, retenez 4s, expirez 6s — répétez 5 fois. Cela active le système parasympathique et réduit le cortisol en moins de 3 minutes. Vous pouvez le faire maintenant, avant de reprendre vos révisions.", "Le stress académique est un signal, pas un ennemi. Il indique que la réussite vous tient à cœur. Identifiez précisément sa source : manque de temps, difficulté du contenu, ou peur de l'échec ? Chaque cause appelle une stratégie distincte.", "Quand la surcharge s'installe, le cerveau bascule en mode survie et n'absorbe plus. Cinq minutes de marche, même dans un couloir, peuvent réinitialiser votre état cognitif. Essayez, puis revenez au travail."],
  burn: ["Le burn-out étudiant se reconnaît à l'épuisement persistant malgré le sommeil, la perte de sens et l'irritabilité. Si ces symptômes durent plus de deux semaines, parlez à quelqu'un de confiance en dehors du cadre académique.", "Quand tout semble vide ou trop lourd, c'est souvent le signe que votre réservoir est à sec. Une pause réelle — pas cinq minutes, mais une demi-journée sans cours ni révisions — n'est pas de la paresse, c'est de l'intelligence stratégique.", "Qu'est-ce qui vous redonne de l'énergie concrètement ? Sport, musique, liens sociaux, sommeil ? Identifiez trois éléments ressourçants et planifiez-les sérieusement dans votre agenda cette semaine."],
  procrast: ["La procrastination est presque toujours de l'évitement émotionnel. Technique de démarrage : engagez-vous pour exactement 2 minutes. Posez le téléphone, ouvrez le cours. L'élan arrive après les premières minutes — c'est prouvé neurologiquement.", "Votre cerveau fuit les tâches floues. Reformulez 'réviser les réseaux' en 'relire les pages 12 à 24 sur TCP/IP et faire les exercices 3 et 4'. Une tâche concrète et bornée est incomparablement plus facile à démarrer.", "La méthode Pomodoro contre la procrastination : 25 minutes de travail, 5 minutes de pause, quatre fois, puis une grande pause. Chaque session terminée est une victoire qui motive la suivante."],
  temps: ["Planification hebdomadaire : chaque dimanche soir, réservez des blocs de 90 minutes maximum dans votre agenda. Incluez les repas, les transports, le sport. Ce qui n'est pas écrit n'existe pas dans le temps.", "Priorisez avec la matrice d'Eisenhower. Concentrez-vous sur la case Important + Non-Urgent — les révisions régulières avant qu'elles deviennent urgentes. C'est là que se construit la réussite durable.", "Chaque soir, notez trois priorités pour le lendemain. Pas dix — trois. Si vous les accomplissez, votre journée est un succès."],
  motiv: ["La motivation ne précède pas l'action — elle en résulte. Commencez, même sans envie. L'élan arrive pendant les premières minutes, porté par la dopamine générée par l'action elle-même.", "Rappelez-vous votre raison personnelle d'être ici. Pas une réponse générique — votre motivation profonde. Notez-la sur une feuille et reliez chaque session de révision à cette raison.", "Célébrez chaque petite victoire : un exercice résolu, un chapitre compris, une session PeerAlert terminée. Le cerveau qui réussit veut recommencer."],
  exam: ["Pour les révisions : la répétition espacée surpasse la relecture passive. Revoyez une notion à J+1, J+3, J+7, J+14. Chaque rappel renforce la trace mémorielle de manière exponentielle.", "La nuit avant un examen : dormez. Le cerveau consolide les apprentissages pendant le sommeil. Une nuit complète vaut mieux que quatre heures de bachotage anxieux.", "Technique Feynman : expliquez la notion à voix haute, comme si vous l'enseigniez à quelqu'un. Si vous ne pouvez pas, c'est précisément là que se situe votre lacune."],
  general: ["Je suis PeerBuddy, votre compagnon de bien-être académique. Je suis disponible 24h/7j pour vous aider à traverser les moments difficiles — stress, fatigue, procrastination, manque de motivation. Comment vous sentez-vous aujourd'hui ?", "Vous n'êtes pas seul dans ce parcours. Des milliers d'étudiants traversent les mêmes défis. Et avec PeerAlert, des pairs compétents sont prêts à vous aider sur les notions difficiles.", "Je vous entends. Ce que vous traversez est réel et légitime. Chaque problème partagé est un problème à moitié résolu. Dites-moi ce qui vous pèse."],
};

function getBotReply(msg) {
  const m = msg.toLowerCase();
  if (/stress|anxi|angois|pression|peur|paniqu/.test(m)) return KB.stress[Math.floor(Math.random() * 3)];
  if (/burnout|burn.out|épuis|vide|ras.le.bol|fatigué/.test(m)) return KB.burn[Math.floor(Math.random() * 3)];
  if (/procrast|flemm|remet|plus tard|distract|téléphone/.test(m)) return KB.procrast[Math.floor(Math.random() * 3)];
  if (/temps|organis|planning|agenda|emploi/.test(m)) return KB.temps[Math.floor(Math.random() * 3)];
  if (/motiv|courag|envie|plus la force|abandon/.test(m)) return KB.motiv[Math.floor(Math.random() * 3)];
  if (/exam|partiel|révise|révision|mémoris/.test(m)) return KB.exam[Math.floor(Math.random() * 3)];
  return KB.general[Math.floor(Math.random() * 3)];
}

/* ───── SHELL ──────────────────────────────────────────── */
function Shell({ page, setPage, children }) {
  const nav = [
    { id: "dashboard", label: "Tableau de bord", icon: I.Home },
    { id: "alerts", label: "Alertes", icon: I.Alert },
    { id: "launch", label: "Lancer une alerte", icon: I.Plus },
    { id: "history", label: "Historique", icon: I.History },
    { id: "leaderboard", label: "Classement", icon: I.Trophy },
    { id: "chatbot", label: "PeerBuddy", icon: I.Brain },
    { id: "notifs", label: "Notifications", icon: I.Bell },
    { id: "profile", label: "Mon profil", icon: I.User },
  ];
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside className="sidebar">
        <div className="logo-wrap">
          <div className="logo-mark"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg></div>
          <span className="logo-text">PeerAlert</span>
        </div>
        <div className="nav-section">Navigation</div>
        {nav.slice(0, 3).map(n => (
          <button key={n.id} className={`nav-item${page === n.id ? " active" : ""}`} onClick={() => setPage(n.id)}>
            <span style={{ width: 18, height: 18 }}>{n.icon}</span>{n.label}
          </button>
        ))}
        <div className="nav-section" style={{ marginTop: 8 }}>Communauté</div>
        {nav.slice(3, 6).map(n => (
          <button key={n.id} className={`nav-item${page === n.id ? " active" : ""}`} onClick={() => setPage(n.id)}>
            <span style={{ width: 18, height: 18 }}>{n.icon}</span>{n.label}
          </button>
        ))}
        <div className="nav-section" style={{ marginTop: 8 }}>Compte</div>
        {nav.slice(6).map(n => (
          <button key={n.id} className={`nav-item${page === n.id ? " active" : ""}`} onClick={() => setPage(n.id)}>
            <span style={{ width: 18, height: 18 }}>{n.icon}</span>{n.label}
            {n.id === "notifs" && <span className="nav-dot" />}
          </button>
        ))}
        <div className="sidebar-bottom">
          <button className="nav-item" onClick={() => setPage("landing")} style={{ color: "rgba(255,255,255,.35)" }}>
            <span style={{ width: 18, height: 18 }}>{I.LogOut}</span>Déconnexion
          </button>
        </div>
      </aside>
      <nav className="bnav">
        {[nav[0], nav[1], nav[5], nav[7], nav[3]].map(n => (
          <button key={n.id} className={`bni${page === n.id ? " active" : ""}`} onClick={() => setPage(n.id)}>
            {n.icon}<span>{n.label.split(" ")[0]}</span>
          </button>
        ))}
      </nav>
      <main className="main">{children}</main>
    </div>
  );
}

/* ───── LANDING ────────────────────────────────────────── */
function LandingPage({ setPage }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 36);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const features = [
    { icon: I.Zap, title: "Alertes en temps réel", desc: "Lancez une alerte académique en 30 secondes. Les pairs disponibles et compétents vous répondent immédiatement." },
    { icon: I.Users, title: "Matching intelligent", desc: "Algorithme par paliers : même filière, puis filières proches, puis niveaux supérieurs. Au moins un expert confirmé par session." },
    { icon: I.Trophy, title: "Gamification fondée", desc: "Les points ne sont attribués qu'après validation par quiz IA. Seule une aide réellement effectuée est récompensée." },
    { icon: I.Brain, title: "PeerBuddy", desc: "Compagnon de bien-être académique disponible 24h/7j. Stress, procrastination, burn-out : réponses empathiques et actionnables." },
    { icon: I.BarChart, title: "Intelligence pédagogique", desc: "Le tableau de bord institutionnel révèle les notions les plus problématiques. Renforcement ciblé des cours concernés." },
    { icon: I.Shield, title: "Sécurité & confidentialité", desc: "Données chiffrées, authentification sécurisée. Accès exclusif aux étudiants de l'établissement." },
  ];

  const steps = [
    { n: "01", t: "Créer votre profil", d: "Filière, niveau, disponibilités hebdomadaires. Deux minutes suffisent." },
    { n: "02", t: "Lancer une alerte", d: "Matière, notion précise, créneau, nombre de participants et lien WhatsApp de groupe." },
    { n: "03", t: "L'algorithme agit", d: "Les pairs disponibles et compétents reçoivent une notification ciblée. Au moins un expert par session est garanti." },
    { n: "04", t: "Session d'entraide", d: "Rejoignez le groupe WhatsApp ou la session en présentiel. L'aide arrive en moins de dix minutes." },
    { n: "05", t: "Validation par quiz IA", d: "À la clôture, quiz simultané pour l'apprenant et l'aidant. Les points reflètent les performances réelles." },
  ];

  return (
    <div style={{ background: scrolled ? "var(--white)" : "transparent", minHeight: "100vh" }}>
      {/* NAV */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, transition: "all .3s",
        background: scrolled ? "rgba(255,255,255,.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--line)" : "none",
        padding: "16px 48px", display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, background: scrolled ? "var(--b500)" : "rgba(255,255,255,.2)", borderRadius: var_("--r8"), display: "flex", alignItems: "center", justifyContent: "center", transition: "all .3s" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
          </div>
          <span style={{ fontFamily: "DM Serif Display,serif", fontSize: 19, color: scrolled ? "var(--t1)" : "white", letterSpacing: ".01em" }}>PeerAlert</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className={`btn ${scrolled ? "btn-ghost" : "btn-outline-w"}`} onClick={() => setPage("login")}>Connexion</button>
          <button className={`btn ${scrolled ? "btn-dark" : "btn-white"}`} onClick={() => setPage("register")}>Commencer — gratuit</button>
        </div>
      </div>

      {/* HERO */}
      <div className="hero-bg" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden", paddingTop: 80 }}>
        {/* Geometric lines */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .08, pointerEvents: "none" }} viewBox="0 0 1440 900">
          <line x1="0" y1="300" x2="1440" y2="300" stroke="white" strokeWidth=".6" />
          <line x1="0" y1="600" x2="1440" y2="600" stroke="white" strokeWidth=".6" />
          <line x1="300" y1="0" x2="300" y2="900" stroke="white" strokeWidth=".6" />
          <line x1="720" y1="0" x2="720" y2="900" stroke="white" strokeWidth=".6" />
          <line x1="1140" y1="0" x2="1140" y2="900" stroke="white" strokeWidth=".6" />
          <circle cx="720" cy="450" r="320" fill="none" stroke="white" strokeWidth=".8" />
          <circle cx="720" cy="450" r="180" fill="none" stroke="white" strokeWidth=".5" />
        </svg>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 48px 64px", position: "relative", zIndex: 1, textAlign: "center" }}>
          <div className="a1" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.18)", borderRadius: var_("--rpill"), padding: "6px 16px", color: "rgba(255,255,255,.8)", fontSize: 12.5, fontWeight: 500, marginBottom: 28, letterSpacing: ".03em" }}>
            HACKBYIFRI 2026 — Intégration numérique dans l'apprentissage
          </div>
          <h1 className="a2" style={{ fontFamily: "DM Serif Display,serif", fontSize: "clamp(38px,5.5vw,68px)", color: "white", lineHeight: 1.12, maxWidth: 820, marginBottom: 22, letterSpacing: "-.01em" }}>
            L'entraide académique<br />
            <span style={{ fontStyle: "italic", color: "var(--b200)" }}>structurée, en temps réel</span>
          </h1>
          <p className="a3" style={{ fontSize: "clamp(15px,1.8vw,18px)", color: "rgba(255,255,255,.65)", maxWidth: 560, lineHeight: 1.7, marginBottom: 40 }}>
            Plus jamais seul face à un blocage. PeerAlert connecte les étudiants en difficulté avec ceux qui peuvent aider — en moins de dix minutes.
          </p>
          <div className="a4" style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginBottom: 72 }}>
            <button className="btn btn-white btn-lg" onClick={() => setPage("register")}>Rejoindre PeerAlert</button>
            <button className="btn btn-outline-w btn-lg" onClick={() => setPage("login")}>Voir la démonstration</button>
          </div>

          {/* Preview cards */}
          <div className="a5" style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center", maxWidth: 820 }}>
            <div className="hcard" style={{ minWidth: 220, textAlign: "left" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <div className="online" />
                <span style={{ fontSize: 12, color: "rgba(255,255,255,.6)", fontWeight: 500 }}>Alerte active</span>
              </div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.45)", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 4 }}>Algorithmique</div>
              <div style={{ color: "white", fontWeight: 600, fontSize: 15, marginBottom: 4 }}>Récursivité</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.55)" }}>3 pairs disponibles · 18h00</div>
            </div>
            <div className="hcard" style={{ minWidth: 180, textAlign: "center" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.45)", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>Classement</div>
              <div className="bdg bdg-expert" style={{ marginBottom: 10, justifyContent: "center" }}>Expert</div>
              <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 32, color: "white" }}>287</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginTop: 2 }}>points — top 3</div>
            </div>
            <div className="hcard" style={{ minWidth: 220, textAlign: "left" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,.45)", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>PeerBuddy</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,.8)", lineHeight: 1.55, borderLeft: "2px solid var(--b300)", paddingLeft: 10, fontStyle: "italic" }}>
                "Commencez par deux minutes — l'élan vient toujours après les premières lignes."
              </div>
            </div>
          </div>
        </div>

        <svg viewBox="0 0 1440 72" style={{ width: "100%", display: "block", fill: "var(--white)", marginBottom: -1 }}>
          <path d="M0,36 C480,72 960,0 1440,36 L1440,72 L0,72 Z" />
        </svg>
      </div>

      {/* STATS */}
      <div style={{ background: "var(--white)", padding: "60px 48px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: 48, textAlign: "center" }}>
          {[["500+", "Étudiants actifs"], ["< 10 min", "Mise en relation"], ["92 %", "Satisfaction"], ["3×", "Moins de retards"]].map(([v, l]) => (
            <div key={l}>
              <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 46, color: "var(--b700)", animation: "countUp .6s ease" }}>{v}</div>
              <div style={{ color: "var(--t3)", fontSize: 14, marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div style={{ background: "var(--b025)", padding: "80px 48px", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ marginBottom: 52 }}>
            <span className="accent-line" />
            <h2 style={{ fontFamily: "DM Serif Display,serif", fontSize: 36, color: "var(--t1)", lineHeight: 1.2 }}>De la difficulté<br />à la compréhension en 5 étapes</h2>
          </div>
          <div style={{ position: "relative", paddingLeft: 24 }}>
            <div style={{ position: "absolute", left: 21, top: 22, bottom: 22, width: 1.5, background: "linear-gradient(180deg,var(--b400),var(--b150))" }} />
            {steps.map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 20, marginBottom: 32, opacity: 0, animation: `fadeUp .45s ${i * .1}s ease both` }}>
                <div className="sdot" style={{ marginTop: 0, flexShrink: 0, marginLeft: -2 }}>{s.n}</div>
                <div style={{ paddingTop: 10 }}>
                  <div style={{ fontWeight: 700, fontSize: 16, color: "var(--t1)", marginBottom: 5 }}>{s.t}</div>
                  <div style={{ color: "var(--t3)", fontSize: 14, lineHeight: 1.65 }}>{s.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div style={{ padding: "80px 48px", background: "var(--white)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 52 }}>
            <span className="accent-line" />
            <h2 style={{ fontFamily: "DM Serif Display,serif", fontSize: 36, color: "var(--t1)" }}>Tout ce dont vous avez besoin<br />pour réussir ensemble</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
            {features.map((f, i) => (
              <div key={i} className="card" style={{ padding: 26, opacity: 0, animation: `fadeUp .45s ${i * .08}s ease both`, borderTop: "2px solid var(--b400)" }}>
                <div className="feat-icon">{f.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 16, color: "var(--t1)", marginBottom: 8 }}>{f.title}</div>
                <div style={{ color: "var(--t3)", fontSize: 14, lineHeight: 1.65 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BADGES SECTION */}
      <div style={{ background: "var(--b900)", padding: "72px 48px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "DM Serif Display,serif", fontSize: 34, color: "white", marginBottom: 12 }}>Progressez. Soyez reconnu.</h2>
          <p style={{ color: "rgba(255,255,255,.55)", fontSize: 15, marginBottom: 48, maxWidth: 520, margin: "0 auto 48px", lineHeight: 1.65 }}>
            Chaque aide réellement effectuée est récompensée. Les points ne s'accumulent que si vous avez prouvé votre contribution par quiz IA.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {[["Novice", "0–49 pts", "Bienvenue dans la communauté", "bdg-novice"], ["Actif", "50–149 pts", "Participation régulière", "bdg-actif"], ["Expert", "150–299 pts", "La communauté vous fait confiance", "bdg-expert"], ["Mentor", "300+ pts", "Pilier reconnu de PeerAlert", "bdg-mentor"]].map(([n, p, d, cls]) => (
              <div key={n} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: var_("--r16"), padding: 24, textAlign: "center" }}>
                <div className={`bdg ${cls}`} style={{ justifyContent: "center", marginBottom: 12, display: "flex" }}>{n}</div>
                <div style={{ color: "var(--b200)", fontSize: 13, fontWeight: 700, marginBottom: 8 }}>{p}</div>
                <div style={{ color: "rgba(255,255,255,.45)", fontSize: 12.5, lineHeight: 1.55 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "var(--b050)", padding: "80px 48px", textAlign: "center", borderTop: "1px solid var(--b100)" }}>
        <h2 style={{ fontFamily: "DM Serif Display,serif", fontSize: 40, color: "var(--t1)", marginBottom: 16, lineHeight: 1.2 }}>Prêt à rejoindre<br />la communauté PeerAlert ?</h2>
        <p style={{ color: "var(--t3)", fontSize: 16, marginBottom: 36, maxWidth: 440, margin: "0 auto 36px", lineHeight: 1.65 }}>Gratuit pour tous les étudiants. Disponible à l'IFRI / UAC dès maintenant.</p>
        <button className="btn btn-dark btn-lg" onClick={() => setPage("register")}>Créer mon compte gratuitement</button>
      </div>

      {/* FOOTER */}
      <div style={{ background: "var(--b900)", padding: "28px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: "DM Serif Display,serif", fontSize: 17, color: "white" }}>PeerAlert</span>
        <span style={{ color: "rgba(255,255,255,.3)", fontSize: 12.5 }}>© 2026 V-LEAD · IFRI / UAC Bénin · HackByIFRI 2026</span>
      </div>
    </div>
  );
}

function varr(v) { return `var(${v})`; }
function var_(v) { return `var(${v})`; }

/* ───── AUTH ──────────────────────────────────────────── */
function AuthPage({ setPage, mode }) {
  const [tab, setTab] = useState(mode);
  const [step, setStep] = useState(1);
  const [showPw, setShowPw] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "var(--s1)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 440 }}>
        <div className="a1" style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 8 }}>
            <div style={{ width: 34, height: 34, background: "var(--b700)", borderRadius: var_("--r8"), display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
            </div>
            <span style={{ fontFamily: "DM Serif Display,serif", fontSize: 22, color: "var(--t1)" }}>PeerAlert</span>
          </div>
          <p style={{ color: "var(--t3)", fontSize: 14 }}>{tab === "login" ? "Bon retour parmi nous." : "Rejoignez la communauté."}</p>
        </div>

        <div className="card a2" style={{ padding: 30 }}>
          <div style={{ display: "flex", background: "var(--s2)", borderRadius: var_("--r8"), padding: 3, marginBottom: 24 }}>
            {["login", "register"].map(t => (
              <button key={t} onClick={() => { setTab(t); setStep(1); }} style={{ flex: 1, padding: "8px 0", borderRadius: "calc(var(--r8) - 1px)", border: "none", fontFamily: "DM Sans,sans-serif", fontWeight: 600, fontSize: 13.5, cursor: "pointer", transition: "all .2s", background: tab === t ? "var(--white)" : "transparent", color: tab === t ? "var(--t1)" : "var(--t4)", boxShadow: tab === t ? "var(--sh-xs)" : "none" }}>
                {t === "login" ? "Connexion" : "Inscription"}
              </button>
            ))}
          </div>

          {tab === "login" ? (
            <div className="ai">
              <div style={{ marginBottom: 16 }}>
                <label className="lbl">Email ou pseudonyme</label>
                <input className="inp" type="email" placeholder="exemple@ifri.uac.bj" />
              </div>
              <div style={{ marginBottom: 8, position: "relative" }}>
                <label className="lbl">Mot de passe</label>
                <input className="inp" type={showPw ? "text" : "password"} placeholder="••••••••" style={{ paddingRight: 40 }} />
                <button onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 11, top: 31, background: "none", border: "none", cursor: "pointer", color: "var(--t4)", width: 18, height: 18 }}>
                  {showPw ? I.EyeOff : I.Eye}
                </button>
              </div>
              <div style={{ textAlign: "right", marginBottom: 22 }}>
                <span style={{ fontSize: 13, color: "var(--b400)", cursor: "pointer", fontWeight: 500 }}>Mot de passe oublié ?</span>
              </div>
              <button className="btn btn-dark" style={{ width: "100%", justifyContent: "center", padding: "12px 0" }} onClick={() => setPage("dashboard")}>
                Se connecter
              </button>
              <div style={{ textAlign: "center", marginTop: 18, fontSize: 13, color: "var(--t3)" }}>
                Pas encore de compte ? <span style={{ color: "var(--b400)", cursor: "pointer", fontWeight: 600 }} onClick={() => setTab("register")}>Créer un compte</span>
              </div>
            </div>
          ) : (
            <div className="ai">
              <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
                {[1, 2].map(s => (
                  <div key={s} style={{ flex: 1, height: 3, borderRadius: 2, background: step >= s ? "var(--b500)" : "var(--line)", transition: "background .3s" }} />
                ))}
              </div>
              <p style={{ fontSize: 12.5, color: "var(--t3)", marginBottom: 18 }}>Étape {step} sur 2</p>

              {step === 1 && <div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
                  <div><label className="lbl">Nom</label><input className="inp" placeholder="LOKOSSOU" /></div>
                  <div><label className="lbl">Prénom</label><input className="inp" placeholder="John Elie" /></div>
                </div>
                <div style={{ marginBottom: 14 }}><label className="lbl">Pseudonyme</label><input className="inp" placeholder="ex: jlokossou_ifri" /></div>
                <div style={{ marginBottom: 14 }}><label className="lbl">Email universitaire</label><input className="inp" type="email" placeholder="votre@email.com" /></div>
                <div style={{ marginBottom: 20, position: "relative" }}>
                  <label className="lbl">Mot de passe</label>
                  <input className="inp" type={showPw ? "text" : "password"} placeholder="8 caractères minimum" style={{ paddingRight: 40 }} />
                  <button onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 11, top: 31, background: "none", border: "none", cursor: "pointer", color: "var(--t4)", width: 18, height: 18 }}>
                    {showPw ? I.EyeOff : I.Eye}
                  </button>
                </div>
                <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px 0" }} onClick={() => setStep(2)}>Continuer</button>
              </div>}

              {step === 2 && <div>
                <div style={{ marginBottom: 14 }}><label className="lbl">Université</label><input className="inp" defaultValue="IFRI / UAC" /></div>
                <div style={{ marginBottom: 14 }}>
                  <label className="lbl">Filière</label>
                  <select className="inp">
                    <option value="">— Sélectionner —</option>
                    {["Internet et Multimédia", "Génie Logiciel", "Cybersécurité", "Intelligence Artificielle", "SEIoT"].map(f => <option key={f}>{f}</option>)}
                  </select>
                </div>
                <div style={{ marginBottom: 14 }}>
                  <label className="lbl">Niveau</label>
                  <select className="inp">{["L1", "L2", "L3", "M1", "M2"].map(n => <option key={n}>{n}</option>)}</select>
                </div>
                <div style={{ marginBottom: 20 }}><label className="lbl">Téléphone</label><input className="inp" placeholder="+229 01 XX XX XX XX" /></div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => setStep(1)}>Retour</button>
                  <button className="btn btn-dark" style={{ flex: 2, justifyContent: "center", padding: "12px 0" }} onClick={() => setPage("dashboard")}>Créer mon compte</button>
                </div>
              </div>}
            </div>
          )}
        </div>
        <div style={{ textAlign: "center", marginTop: 14 }}>
          <span style={{ fontSize: 13, color: "var(--t4)", cursor: "pointer" }} onClick={() => setPage("landing")}>Retour à l'accueil</span>
        </div>
      </div>
    </div>
  );
}

/* ───── DASHBOARD ─────────────────────────────────────── */
function DashboardPage({ setPage }) {
  return (
    <div className="page-inner" style={{ animation: "fadeIn .3s ease" }}>
      {/* Mobile top */}
      <div className="mob" style={{ marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 22, color: "var(--t1)" }}>Bonjour, Kaylhia</div>
          <div style={{ fontSize: 13, color: "var(--t3)", marginTop: 2 }}>IA · L1 · IFRI/UAC</div>
        </div>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "var(--t3)", position: "relative" }} onClick={() => setPage("notifs")}>
          <span style={{ width: 22, height: 22, display: "block" }}>{I.Bell}</span>
          <span style={{ position: "absolute", top: -1, right: -1, width: 7, height: 7, background: "var(--b300)", borderRadius: "50%", border: "2px solid var(--s1)" }} />
        </button>
      </div>

      <div className="ph desk a1">
        <div className="ph-title">Tableau de bord</div>
        <div className="ph-sub">Kaylhia Tovihouande — Intelligence Artificielle · L1 · IFRI/UAC</div>
      </div>

      {/* Stats */}
      <div className="a1" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 20 }}>
        {[["84", "Points totaux", I.Trophy], ["4", "Sessions aidées", I.Users], ["3", "Alertes lancées", I.Zap]].map(([v, l, ic]) => (
          <div key={l} className="stat">
            <div style={{ width: 32, height: 32, marginBottom: 12, color: "var(--b400)" }}>{ic}</div>
            <div className="stat-val">{v}</div>
            <div className="stat-lbl">{l}</div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="card a2" style={{ padding: 20, marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 14.5, color: "var(--t1)", marginBottom: 2 }}>Progression vers Expert</div>
            <div style={{ fontSize: 13, color: "var(--t3)" }}>84 / 150 points — encore 66 pts nécessaires</div>
          </div>
          <div className="bdg bdg-actif">Actif</div>
        </div>
        <div className="prog"><div className="prog-fill" style={{ width: "56%" }} /></div>
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 7, fontSize: 11.5, color: "var(--t4)" }}>
          <span>Novice · 0</span><span style={{ color: "var(--b500)", fontWeight: 600 }}>Actif · 84 pts</span><span>Expert · 150</span>
        </div>
      </div>

      {/* Launch CTA */}
      <div className="a3" style={{ background: "var(--b800)", borderRadius: var_("--r16"), padding: "22px 24px", marginBottom: 16, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", overflow: "hidden" }} onClick={() => setPage("launch")}>
        <div style={{ position: "absolute", right: -32, top: -32, width: 140, height: 140, background: "rgba(255,255,255,.04)", borderRadius: "50%" }} />
        <div>
          <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 20, color: "white", marginBottom: 5 }}>Lancer une alerte</div>
          <div style={{ color: "rgba(255,255,255,.55)", fontSize: 13, lineHeight: 1.5 }}>Un blocage ? Trouvez de l'aide en moins de 10 minutes.</div>
        </div>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", flexShrink: 0 }}>
          <span style={{ width: 18, height: 18 }}>{I.ChevR}</span>
        </div>
      </div>

      {/* PeerBuddy strip */}
      <div className="card a4" style={{ padding: 16, marginBottom: 20, cursor: "pointer", display: "flex", gap: 14, alignItems: "center", borderLeft: "3px solid var(--b400)" }} onClick={() => setPage("chatbot")}>
        <div style={{ width: 42, height: 42, borderRadius: var_("--r12"), background: "var(--b050)", border: "1px solid var(--b100)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--b500)", flexShrink: 0 }}>
          <span style={{ width: 22, height: 22 }}>{I.Brain}</span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: 14, color: "var(--t1)", marginBottom: 2 }}>PeerBuddy — Psychologue virtuel</div>
          <div style={{ fontSize: 13, color: "var(--t3)" }}>Comment vous sentez-vous aujourd'hui ?</div>
        </div>
        <span style={{ width: 16, height: 16, color: "var(--t4)" }}>{I.ChevR}</span>
      </div>

      {/* Recent alerts */}
      <div className="a5">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: "var(--t1)" }}>Alertes disponibles</div>
          <span style={{ fontSize: 13, color: "var(--b400)", cursor: "pointer", fontWeight: 500 }} onClick={() => setPage("alerts")}>Voir tout</span>
        </div>
        {ALERTS.slice(0, 2).map(a => (
          <div key={a.id} className="ac" style={{ marginBottom: 12 }} onClick={() => setPage("alerts")}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div>
                <div className="tag tag-blue" style={{ marginBottom: 8 }}>{a.subject}</div>
                <div style={{ fontWeight: 700, fontSize: 15.5, color: "var(--t1)", marginBottom: 3 }}>{a.notion}</div>
                <div style={{ fontSize: 13, color: "var(--t3)" }}>{a.type}</div>
              </div>
              {a.urgent && <div className="tag tag-red">Urgent</div>}
            </div>
            {!a.expert && (
              <div style={{ background: "var(--warn-bg)", border: "1px solid var(--warn-line)", borderRadius: var_("--r8"), padding: "8px 12px", fontSize: 12.5, color: "var(--warn)", marginBottom: 10 }}>
                Expert non confirmé — Au moins un pair maîtrisant cette notion est requis pour démarrer la session
              </div>
            )}
            <div style={{ display: "flex", gap: 20, fontSize: 12, color: "var(--t4)", marginBottom: 12 }}>
              <span>{a.time}</span><span>{a.taken}/{a.spots} places</span><span>{a.filiere}</span>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: "center" }}>Accepter</button>
              <button className="btn btn-ghost btn-sm">Décliner</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ───── ALERTS PAGE ──────────────────────────────────── */
function AlertsPage({ setPage }) {
  const [filter, setFilter] = useState("Tout");
  const [detail, setDetail] = useState(null);
  const subjects = ["Tout", "Algorithmique", "Mathématiques", "Réseaux", "Prog. Web"];
  const filtered = filter === "Tout" ? ALERTS : ALERTS.filter(a => a.subject.startsWith(filter));

  if (detail) return (
    <div className="page-inner" style={{ animation: "fadeIn .3s ease" }}>
      <button className="btn btn-ghost btn-sm" style={{ marginBottom: 20 }} onClick={() => setDetail(null)}>
        <span style={{ width: 14, height: 14 }}>{I.ChevL}</span>Retour
      </button>
      <div className="card" style={{ padding: 26, marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
          <div>
            <div className="tag tag-blue" style={{ marginBottom: 10 }}>{detail.subject}</div>
            <h2 style={{ fontFamily: "DM Serif Display,serif", fontSize: 24, color: "var(--t1)", marginBottom: 6 }}>{detail.notion}</h2>
            <div style={{ fontSize: 14, color: "var(--t3)" }}>{detail.type}</div>
          </div>
          {detail.urgent && <div className="tag tag-red">Urgent</div>}
        </div>
        <div className="divider" />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 18 }}>
          {[["Créneau", detail.time], ["Places", `${detail.taken}/${detail.spots}`], ["Filière", detail.filiere], ["Niveau", detail.level]].map(([l, v]) => (
            <div key={l} style={{ background: "var(--s2)", borderRadius: var_("--r8"), padding: "12px 14px", border: "1px solid var(--line)" }}>
              <div style={{ fontSize: 11.5, color: "var(--t4)", fontWeight: 600, marginBottom: 3, textTransform: "uppercase", letterSpacing: ".05em" }}>{l}</div>
              <div style={{ fontWeight: 600, fontSize: 14, color: "var(--t1)" }}>{v}</div>
            </div>
          ))}
        </div>
        {!detail.expert && (
          <div style={{ background: "var(--warn-bg)", border: "1px solid var(--warn-line)", borderRadius: var_("--r8"), padding: 14, marginBottom: 16, fontSize: 13, color: "var(--warn)" }}>
            <strong>Expert non encore confirmé.</strong> Au moins un participant maîtrisant cette notion est requis. Indiquez votre niveau lors de l'acceptation.
          </div>
        )}
        <div style={{ marginBottom: 18 }}>
          <label className="lbl">Je rejoins en tant que</label>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <label style={{ cursor: "pointer", display: "flex", gap: 10, padding: "12px 14px", border: "2px solid var(--success-line)", borderRadius: var_("--r8"), alignItems: "flex-start", background: "var(--success-bg)" }}>
              <input type="radio" name="role" defaultChecked style={{ marginTop: 2 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "var(--success)" }}>Aidant expert</div>
                <div style={{ fontSize: 12, color: "var(--success)", opacity: .8 }}>Je maîtrise cette notion</div>
              </div>
            </label>
            <label style={{ cursor: "pointer", display: "flex", gap: 10, padding: "12px 14px", border: "1.5px solid var(--line)", borderRadius: var_("--r8"), alignItems: "flex-start" }}>
              <input type="radio" name="role" style={{ marginTop: 2 }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: "var(--t1)" }}>Aidant apprenant</div>
                <div style={{ fontSize: 12, color: "var(--t3)" }}>Aide partielle possible</div>
              </div>
            </label>
          </div>
        </div>
        <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px 0" }} onClick={() => setPage("session")}>
          Rejoindre la session
        </button>
      </div>
    </div>
  );

  return (
    <div className="page-inner" style={{ animation: "fadeIn .3s ease" }}>
      <div className="ph a1">
        <div className="ph-title">Alertes disponibles</div>
        <div className="ph-sub">Aidez vos pairs et gagnez des points</div>
      </div>
      <div className="chips-row a2" style={{ marginBottom: 20 }}>
        {subjects.map(s => <button key={s} className={`chip${filter === s ? " on" : ""}`} onClick={() => setFilter(s)}>{s}</button>)}
      </div>
      {filtered.map((a, i) => (
        <div key={a.id} className="ac" style={{ marginBottom: 14, opacity: 0, animation: `fadeUp .4s ${i * .07}s ease both` }} onClick={() => setDetail(a)}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                <div className="tag tag-blue">{a.subject}</div>
                {a.urgent && <div className="tag tag-red">Urgent</div>}
                {a.expert && <div className="tag tag-green">Expert confirmé</div>}
              </div>
              <div style={{ fontWeight: 700, fontSize: 15.5, color: "var(--t1)", marginBottom: 3 }}>{a.notion}</div>
              <div style={{ fontSize: 13, color: "var(--t3)" }}>{a.type}</div>
            </div>
          </div>
          {!a.expert && (
            <div style={{ background: "var(--warn-bg)", border: "1px solid var(--warn-line)", borderRadius: var_("--r8"), padding: "7px 12px", fontSize: 12.5, color: "var(--warn)", marginBottom: 10 }}>
              Expert requis — Acceptez si vous maîtrisez cette notion
            </div>
          )}
          <div style={{ display: "flex", gap: 20, fontSize: 12.5, color: "var(--t4)", marginBottom: 14, flexWrap: "wrap" }}>
            <span>{a.time}</span><span>{a.taken}/{a.spots} places</span><span>{a.author}</span><span>{a.level} · {a.filiere}</span>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: "center" }} onClick={e => { e.stopPropagation(); setDetail(a); }}>Voir et accepter</button>
            <button className="btn btn-ghost btn-sm" onClick={e => e.stopPropagation()}>Ignorer</button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ───── LAUNCH ────────────────────────────────────────── */
function LaunchPage({ setPage }) {
  const [step, setStep] = useState(1);

  return (
    <div className="page-inner" style={{ animation: "fadeIn .3s ease" }}>
      <div className="ph a1">
        <div className="ph-title">Lancer une alerte</div>
        <div className="ph-sub">Décrivez votre blocage pour trouver de l'aide</div>
      </div>

      {/* Stepper */}
      <div className="a2" style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 28 }}>
        {["Contenu", "Logistique", "Confirmation"].map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", flex: 1 }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: step > i + 1 ? "var(--b500)" : step === i + 1 ? "var(--b700)" : "var(--line)", color: step >= i + 1 ? "white" : "var(--t4)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, transition: "all .3s", flexShrink: 0 }}>
                {step > i + 1 ? <span style={{ width: 14, height: 14 }}>{I.Check}</span> : i + 1}
              </div>
              <span style={{ fontSize: 11, color: step === i + 1 ? "var(--b500)" : "var(--t4)", fontWeight: 600, whiteSpace: "nowrap" }}>{s}</span>
            </div>
            {i < 2 && <div style={{ flex: 1, height: 1.5, background: step > i + 1 ? "var(--b400)" : "var(--line)", margin: "0 6px", marginBottom: 16, transition: "background .3s" }} />}
          </div>
        ))}
      </div>

      <div className="card a3" style={{ padding: 26 }}>
        {step === 1 && (
          <div className="ai">
            <div style={{ marginBottom: 16 }}>
              <label className="lbl">Matière</label>
              <select className="inp">
                <option value="">— Sélectionner —</option>
                {["Algorithmique", "Mathématiques", "Réseaux", "Programmation Web", "Bases de données", "Physique", "Cybersécurité"].map(m => <option key={m}>{m}</option>)}
              </select>
            </div>
            <div style={{ marginBottom: 16 }}>
              <label className="lbl">Notion précise</label>
              <input className="inp" placeholder="Ex : Récursivité sur les arbres binaires" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label className="lbl">Type de difficulté</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9 }}>
                {["Exercice bloquant", "Compréhension du cours", "Schéma difficile", "Méthode inconnue"].map(t => (
                  <label key={t} style={{ cursor: "pointer", display: "flex", gap: 9, padding: "11px 13px", border: "1.5px solid var(--line)", borderRadius: var_("--r8"), alignItems: "center", fontSize: 13 }}>
                    <input type="radio" name="dtype" /><span>{t}</span>
                  </label>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 22 }}>
              <label className="lbl">Description (facultatif)</label>
              <textarea className="inp" placeholder="Décrivez votre blocage plus précisément..." />
            </div>
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px 0" }} onClick={() => setStep(2)}>Continuer</button>
          </div>
        )}

        {step === 2 && (
          <div className="ai">
            <div style={{ marginBottom: 16 }}>
              <label className="lbl">Créneau proposé</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 9, marginBottom: 10 }}>
                {["Ce soir 18h", "Ce soir 20h", "Demain matin", "Demain après-midi"].map(t => (
                  <label key={t} style={{ cursor: "pointer", display: "flex", gap: 9, padding: "10px 13px", border: "1.5px solid var(--line)", borderRadius: var_("--r8"), alignItems: "center", fontSize: 13 }}>
                    <input type="radio" name="slot" /><span>{t}</span>
                  </label>
                ))}
              </div>
              <input className="inp" placeholder="Ou précisez un horaire : ex. Demain 15h–16h30" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label className="lbl">Participants maximum</label>
              <div style={{ display: "flex", gap: 9 }}>
                {[2, 3, 4, 5].map(n => (
                  <button key={n} className="btn btn-ghost" style={{ flex: 1, justifyContent: "center", fontWeight: 700, fontSize: 15, padding: "10px 0" }}>{n}</button>
                ))}
              </div>
            </div>
            <div style={{ marginBottom: 14 }}>
              <label className="lbl">Lien WhatsApp du groupe</label>
              <input className="inp" placeholder="https://chat.whatsapp.com/..." />
              <div style={{ fontSize: 12, color: "var(--t4)", marginTop: 5 }}>Créez un groupe WhatsApp et partagez le lien d'invitation</div>
            </div>
            <div style={{ background: "var(--b050)", border: "1px solid var(--b100)", borderRadius: var_("--r8"), padding: 12, marginBottom: 20 }}>
              <div style={{ fontSize: 13, color: "var(--b600)" }}>
                Limite hebdomadaire : <strong>5 alertes maximum</strong>. Il vous en reste <strong>3 cette semaine</strong>.
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => setStep(1)}>Retour</button>
              <button className="btn btn-primary" style={{ flex: 2, justifyContent: "center", padding: "12px 0" }} onClick={() => setStep(3)}>Confirmer</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="ai">
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: "var(--t1)", marginBottom: 4 }}>Récapitulatif de l'alerte</div>
              <div style={{ fontSize: 13, color: "var(--t3)" }}>Vérifiez les informations avant d'envoyer</div>
            </div>
            {[["Matière", "Algorithmique"], ["Notion", "Récursivité sur les arbres binaires"], ["Difficulté", "Exercice bloquant"], ["Créneau", "Ce soir 18h00–19h30"], ["Participants max", "3 personnes"], ["WhatsApp", "Lien configuré"]].map(([l, v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--line)", fontSize: 13.5 }}>
                <span style={{ color: "var(--t3)" }}>{l}</span>
                <span style={{ fontWeight: 600, color: "var(--t1)" }}>{v}</span>
              </div>
            ))}
            <div style={{ background: "var(--success-bg)", border: "1px solid var(--success-line)", borderRadius: var_("--r8"), padding: 12, marginTop: 16, marginBottom: 20, fontSize: 13, color: "var(--success)" }}>
              L'algorithme cherchera en priorité des étudiants de la filière IA maîtrisant la récursivité.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="btn btn-ghost" style={{ flex: 1, justifyContent: "center" }} onClick={() => setStep(2)}>Modifier</button>
              <button className="btn btn-dark" style={{ flex: 2, justifyContent: "center", padding: "12px 0" }} onClick={() => setPage("dashboard")}>
                Envoyer l'alerte
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ───── SESSION ──────────────────────────────────────── */
function SessionPage({ setPage }) {
  const [time, setTime] = useState(82 * 60);
  useEffect(() => {
    const t = setInterval(() => setTime(p => Math.max(0, p - 1)), 1000);
    return () => clearInterval(t);
  }, []);
  const mm = String(Math.floor(time / 60)).padStart(2, "0");
  const ss = String(time % 60).padStart(2, "0");

  const participants = [
    { init: "NK", name: "N. Kouelo", role: "aidant", expert: true, filiere: "Génie Logiciel", pts: 287 },
    { init: "KT", name: "K. Tovihouande", role: "demandeur", expert: false, filiere: "IA", pts: 84, me: true },
    { init: "CD", name: "C. Dako", role: "aidant", expert: false, filiere: "Cybersécurité", pts: 183 },
  ];

  return (
    <div className="page-inner" style={{ animation: "fadeIn .3s ease" }}>
      <div className="ph a1">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="online" />
          <div>
            <div className="ph-title" style={{ fontSize: 24 }}>Session active</div>
            <div className="ph-sub">Algorithmique · Récursivité · 3 participants</div>
          </div>
        </div>
      </div>

      {/* Timer */}
      <div className="card a2" style={{ padding: 22, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 12.5, color: "var(--t3)", marginBottom: 4 }}>Temps restant</div>
            <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 42, color: "var(--b600)", letterSpacing: "-.02em" }}>{mm}:{ss}</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="tag tag-green" style={{ marginBottom: 8 }}>Session active</div>
            <div style={{ fontSize: 12, color: "var(--t4)" }}>Démarrée à 18h05</div>
          </div>
        </div>
        <div className="prog"><div className="prog-fill" style={{ width: `${(time / (90 * 60)) * 100}%` }} /></div>
      </div>

      {/* Expert confirmed */}
      <div className="a3" style={{ background: "var(--success-bg)", border: "1px solid var(--success-line)", borderRadius: var_("--r12"), padding: 14, marginBottom: 14, display: "flex", gap: 10, alignItems: "center" }}>
        <span style={{ width: 18, height: 18, color: "var(--success)", flexShrink: 0 }}>{I.Check}</span>
        <div style={{ fontSize: 13, color: "var(--success)" }}><strong>Expert confirmé :</strong> N. Kouelo maîtrise la récursivité. La session peut démarrer.</div>
      </div>

      {/* Participants */}
      <div className="card a4" style={{ padding: 20, marginBottom: 14 }}>
        <div style={{ fontWeight: 700, fontSize: 14.5, color: "var(--t1)", marginBottom: 14 }}>Participants ({participants.length}/3)</div>
        {participants.map(p => (
          <div key={p.name} className="prow">
            <div className="av" style={{ width: 38, height: 38, fontSize: 14 }}>{p.init}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13.5, color: "var(--t1)", display: "flex", alignItems: "center", gap: 8 }}>
                {p.name}
                {p.me && <span style={{ fontSize: 10.5, background: "var(--b100)", color: "var(--b500)", padding: "2px 8px", borderRadius: var_("--rpill"), fontWeight: 700 }}>Moi</span>}
              </div>
              <div style={{ fontSize: 12, color: "var(--t3)" }}>{p.filiere} · {p.pts} pts</div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-end" }}>
              {p.expert && <div className="tag tag-green">Expert</div>}
              <div className={`tag ${p.role === "aidant" ? "tag-blue" : "tag-warn"}`}>{p.role === "aidant" ? "Aidant" : "Demandeur"}</div>
            </div>
          </div>
        ))}
      </div>

      {/* WhatsApp */}
      <div className="card a5" style={{ padding: 18, marginBottom: 16, borderLeft: "3px solid #25D366" }}>
        <div style={{ fontWeight: 700, fontSize: 14, color: "var(--t1)", marginBottom: 4 }}>Groupe WhatsApp configuré</div>
        <div style={{ fontSize: 13, color: "var(--t3)", marginBottom: 12, lineHeight: 1.5 }}>La session d'entraide se déroule dans le groupe WhatsApp. Cliquez pour rejoindre.</div>
        <button className="btn" style={{ background: "#25D366", color: "white", gap: 8 }}>
          <span style={{ width: 16, height: 16 }}>{I.WA}</span>Rejoindre le groupe
        </button>
      </div>

      <button className="btn btn-dark" style={{ width: "100%", justifyContent: "center", padding: "13px 0", fontSize: 14 }} onClick={() => setPage("quiz")}>
        Terminer la session — Quiz de validation
      </button>
    </div>
  );
}

/* ───── QUIZ ─────────────────────────────────────────── */
function QuizPage({ setPage }) {
  const [role, setRole] = useState(null);
  const [q, setQ] = useState(0);
  const [sel, setSel] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [timer, setTimer] = useState(45);

  const qA = [
    { q: "Quel est le rôle du cas de base dans une fonction récursive ?", opts: ["Arrêter les appels récursifs", "Lancer le premier appel", "Retourner la valeur finale", "Définir le paramètre"], ans: 0 },
    { q: "Que provoque l'absence de cas de base ?", opts: ["La fonction retourne 0", "La fonction s'exécute une seule fois", "Un dépassement de pile (stack overflow)", "La fonction s'arrête automatiquement"], ans: 2 },
    { q: "Quelle est la complexité d'une récursion sur un tableau de taille n ?", opts: ["O(1)", "O(n)", "O(n²)", "O(log n)"], ans: 1 },
  ];
  const qE = [
    { q: "Identifiez l'erreur dans ce code :\nfact(n) { return n * fact(n) }", opts: ["Le cas de base est absent", "La multiplication est incorrecte", "Le paramètre est mal typé", "Aucune erreur"], ans: 0 },
    { q: "Quelle structure est implicitement utilisée par la pile d'appels récursifs ?", opts: ["File (queue)", "Tas (heap)", "Pile (stack)", "Arbre binaire"], ans: 2 },
    { q: "Comment transformer une récursion terminale en forme itérative ?", opts: ["Boucle while avec accumulateur", "Tableau dynamique", "Structure switch/case", "Liste chaînée"], ans: 0 },
  ];
  const quiz = role === "aidant" ? qE : qA;

  useEffect(() => {
    if (!role || done || revealed) return;
    const t = setInterval(() => setTimer(p => {
      if (p <= 1) { setRevealed(true); return 0; }
      return p - 1;
    }), 1000);
    return () => clearInterval(t);
  }, [role, q, done, revealed]);

  const confirm = () => { if (sel === quiz[q].ans) setScore(s => s + 1); setRevealed(true); };
  const next = () => {
    if (q < quiz.length - 1) { setQ(q + 1); setSel(null); setRevealed(false); setTimer(45); }
    else setDone(true);
  };
  const pts = role === "aidant" ? Math.round((score / quiz.length) * 60) : Math.round((score / quiz.length) * 30);

  if (!role) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ maxWidth: 420, width: "100%" }}>
        <div className="card ar" style={{ padding: 32, textAlign: "center" }}>
          <div style={{ width: 56, height: 56, borderRadius: var_("--r16"), background: "var(--b050)", border: "1px solid var(--b100)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--b500)", margin: "0 auto 20px" }}>
            <span style={{ width: 28, height: 28 }}>{I.Medal}</span>
          </div>
          <h2 style={{ fontFamily: "DM Serif Display,serif", fontSize: 22, color: "var(--t1)", marginBottom: 8 }}>Quiz de validation</h2>
          <p style={{ fontSize: 13.5, color: "var(--t3)", marginBottom: 28, lineHeight: 1.65 }}>La session est terminée. Répondez au quiz pour valider vos points.<br />Anti-triche activé : 45 s max par question, copier-coller désactivé.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <button className="btn btn-primary" style={{ justifyContent: "center", padding: "13px 0" }} onClick={() => { setRole("apprenant"); setTimer(45); }}>Je suis le Demandeur (Apprenant)</button>
            <button className="btn btn-dark" style={{ justifyContent: "center", padding: "13px 0" }} onClick={() => { setRole("aidant"); setTimer(45); }}>Je suis l'Aidant (Expert)</button>
          </div>
        </div>
      </div>
    </div>
  );

  if (done) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ maxWidth: 420, width: "100%" }}>
        <div className="card ar" style={{ padding: 32, textAlign: "center" }}>
          <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 22, color: "var(--t1)", marginBottom: 6 }}>
            {score === quiz.length ? "Résultat parfait" : score >= 2 ? "Bon travail" : "Continuez à apprendre"}
          </div>
          <div style={{ fontSize: 14, color: "var(--t3)", marginBottom: 18 }}>{score}/{quiz.length} bonnes réponses</div>
          <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 54, color: "var(--b500)", marginBottom: 4, animation: "countUp .5s ease" }}>+{pts}</div>
          <div style={{ fontSize: 13.5, color: "var(--t3)", marginBottom: 24 }}>points ajoutés à votre profil</div>
          <div className="prog" style={{ marginBottom: 24 }}><div className="prog-fill" style={{ width: `${(score / quiz.length) * 100}%` }} /></div>
          <button className="btn btn-dark" style={{ width: "100%", justifyContent: "center", padding: "12px 0" }} onClick={() => setPage("dashboard")}>Retour au tableau de bord</button>
        </div>
      </div>
    </div>
  );

  const cur = quiz[q];
  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ maxWidth: 520, width: "100%" }}>
        <div className="a1" style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
            <span style={{ fontSize: 12.5, color: "var(--t3)", fontWeight: 600 }}>Question {q + 1} / {quiz.length}</span>
            <span style={{ fontSize: 12.5, color: timer < 15 ? "var(--danger)" : "var(--t3)", fontWeight: 700 }}>{timer} s</span>
          </div>
          <div className="prog">
            <div style={{ width: `${(timer / 45) * 100}%`, height: "100%", borderRadius: var_("--rpill"), background: timer < 15 ? "var(--danger)" : "var(--b400)", transition: "width 1s linear" }} />
          </div>
        </div>
        <div className="card a2" style={{ padding: 26 }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
            <div className={`tag ${role === "aidant" ? "tag-blue" : "tag-gray"}`}>
              {role === "aidant" ? "Quiz Expert" : "Quiz Apprenant"}
            </div>
            <div className="tag tag-blue">Algorithmique · Récursivité</div>
          </div>
          <h3 style={{ fontWeight: 700, fontSize: 16.5, color: "var(--t1)", marginBottom: 20, lineHeight: 1.5, whiteSpace: "pre-line" }}>{cur.q}</h3>
          {cur.opts.map((o, i) => {
            let cls = "qopt";
            if (revealed) { if (i === cur.ans) cls += " ok"; else if (i === sel && i !== cur.ans) cls += " ko"; }
            else if (i === sel) cls += " sel";
            return <button key={i} className={cls} onClick={() => !revealed && setSel(i)}>{String.fromCharCode(65 + i)}. {o}</button>;
          })}
          {!revealed ? (
            <button className="btn btn-primary" style={{ width: "100%", justifyContent: "center", padding: "12px 0", marginTop: 4 }} onClick={confirm} disabled={sel === null}>Confirmer la réponse</button>
          ) : (
            <div>
              <div style={{ background: sel === cur.ans ? "var(--success-bg)" : "var(--danger-bg)", border: `1px solid ${sel === cur.ans ? "var(--success-line)" : "var(--danger-line)"}`, borderRadius: var_("--r8"), padding: 12, marginBottom: 12, fontSize: 13, fontWeight: 600, color: sel === cur.ans ? "var(--success)" : "var(--danger)" }}>
                {sel === cur.ans ? "Bonne réponse." : "Mauvaise réponse. La bonne réponse est indiquée en vert."}
              </div>
              <button className="btn btn-dark" style={{ width: "100%", justifyContent: "center", padding: "12px 0" }} onClick={next}>
                {q < quiz.length - 1 ? "Question suivante" : "Voir mes résultats"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ───── HISTORY ──────────────────────────────────────── */
function HistoryPage() {
  return (
    <div className="page-inner" style={{ animation: "fadeIn .3s ease" }}>
      <div className="ph a1"><div className="ph-title">Historique</div><div className="ph-sub">Toutes vos sessions d'entraide</div></div>
      <div className="a1" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 22 }}>
        {[["105", "Points gagnés"], ["4", "Sessions"], ["3/4", "Validées"]].map(([v, l]) => (
          <div key={l} className="stat">
            <div className="stat-val">{v}</div>
            <div className="stat-lbl">{l}</div>
          </div>
        ))}
      </div>
      {HISTORY.map((h, i) => (
        <div key={h.id} className="card" style={{ padding: 20, marginBottom: 12, opacity: 0, animation: `fadeUp .4s ${i * .07}s ease both` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                <div className="tag tag-blue">{h.subject}</div>
                <div className={`tag ${h.role === "aidant" ? "tag-green" : "tag-warn"}`}>
                  {h.role === "aidant" ? "Aidant" : "Demandeur"}
                </div>
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "var(--t1)", marginBottom: 3 }}>{h.notion}</div>
              <div style={{ fontSize: 12.5, color: "var(--t4)" }}>{h.date}</div>
            </div>
            {h.ok ? (
              <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 24, color: "var(--b500)" }}>+{h.pts}</div>
            ) : (
              <div className="tag tag-gray">Non validé</div>
            )}
          </div>
          {h.ok ? (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: "var(--t3)", marginBottom: 5 }}>
                <span>Score quiz</span><span style={{ fontWeight: 700, color: "var(--t1)" }}>{h.quiz} %</span>
              </div>
              <div className="prog"><div className="prog-fill" style={{ width: `${h.quiz}%` }} /></div>
            </div>
          ) : (
            <div style={{ fontSize: 12.5, color: "var(--danger)", background: "var(--danger-bg)", borderRadius: var_("--r8"), padding: "6px 12px" }}>
              Quiz non réussi (score : {h.quiz} %) — aucun point attribué
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ───── PROFILE ──────────────────────────────────────── */
function ProfilePage({ setPage }) {
  const days = { Lun: ["18h–20h"], Mar: [], Mer: ["14h–16h", "18h–20h"], Jeu: [], Ven: ["16h–22h"], Sam: ["10h–12h", "14h–18h"], Dim: ["10h–14h"] };

  return (
    <div className="page-inner" style={{ animation: "fadeIn .3s ease" }}>
      <div className="ph a1"><div className="ph-title">Mon profil</div></div>

      {/* Profile card */}
      <div className="card a1" style={{ padding: 24, marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center", marginBottom: 20 }}>
          <div className="av" style={{ width: 60, height: 60, fontSize: 20 }}>KT</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 20, color: "var(--t1)" }}>Kaylhia Tovihouande</div>
            <div style={{ fontSize: 13, color: "var(--t3)", marginTop: 2 }}>Intelligence Artificielle · L1 · IFRI/UAC</div>
            <div style={{ display: "flex", gap: 8, marginTop: 8, alignItems: "center" }}>
              <div className="bdg bdg-actif">Actif</div>
              <span style={{ fontSize: 11.5, color: "var(--t4)" }}>Membre depuis janvier 2026</span>
            </div>
          </div>
        </div>
        <div style={{ background: "var(--s2)", borderRadius: var_("--r12"), padding: 16, border: "1px solid var(--line)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--t1)" }}>Progression vers Expert</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "var(--b500)" }}>84 pts</span>
          </div>
          <div className="prog"><div className="prog-fill" style={{ width: "56%" }} /></div>
          <div style={{ fontSize: 12, color: "var(--t4)", marginTop: 6 }}>66 points restants pour atteindre Expert</div>
        </div>
      </div>

      {/* Badges */}
      <div className="card a2" style={{ padding: 20, marginBottom: 14 }}>
        <div style={{ fontWeight: 700, fontSize: 14.5, color: "var(--t1)", marginBottom: 14 }}>Badges et progression</div>
        {[["Novice", "0–49 pts", true, "bdg-novice"], ["Actif", "50–149 pts", true, "bdg-actif"], ["Expert", "150–299 pts", false, "bdg-expert"], ["Mentor", "300+ pts", false, "bdg-mentor"]].map(([n, p, ok, cls]) => (
          <div key={n} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: "1px solid var(--line)", alignItems: "center", opacity: ok ? 1 : .45 }}>
            <div className={`bdg ${cls}`} style={{ minWidth: 70, justifyContent: "center" }}>{n}</div>
            <div style={{ flex: 1, fontSize: 13, color: "var(--t3)" }}>{p}</div>
            {ok && <span style={{ width: 16, height: 16, color: "var(--success)" }}>{I.Check}</span>}
          </div>
        ))}
      </div>

      {/* Disponibilités */}
      <div className="card a3" style={{ padding: 20, marginBottom: 14 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ fontWeight: 700, fontSize: 14.5, color: "var(--t1)" }}>Disponibilités hebdomadaires</div>
          <button className="btn btn-ghost btn-xs">Modifier</button>
        </div>
        {Object.entries(days).map(([d, slots]) => (
          <div key={d} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid var(--line)" }}>
            <div style={{ width: 32, fontSize: 13, fontWeight: 600, color: "var(--t3)" }}>{d}</div>
            <div style={{ flex: 1, display: "flex", gap: 6, flexWrap: "wrap" }}>
              {slots.length > 0 ? slots.map(s => (
                <span key={s} style={{ background: "var(--b100)", color: "var(--b600)", padding: "3px 10px", borderRadius: var_("--rpill"), fontSize: 12, fontWeight: 500 }}>{s}</span>
              )) : <span style={{ fontSize: 12, color: "var(--t4)" }}>Non disponible</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Settings */}
      <div className="card a4" style={{ padding: 18, marginBottom: 14 }}>
        <div style={{ fontWeight: 700, fontSize: 14.5, color: "var(--t1)", marginBottom: 12 }}>Paramètres</div>
        {[["Limite d'alertes par semaine", "5 alertes"], ["Matières prioritaires", "Algorithmique, IA"], ["Notifications push", "Activées"], ["Compte", "kvictoria@gmail.com"]].map(([l, v]) => (
          <div key={l} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "11px 0", borderBottom: "1px solid var(--line)" }}>
            <span style={{ fontSize: 13.5, color: "var(--t1)" }}>{l}</span>
            <span style={{ fontSize: 13, color: "var(--b400)", fontWeight: 500, cursor: "pointer" }}>{v}</span>
          </div>
        ))}
      </div>

      <button className="btn btn-ghost" style={{ width: "100%", justifyContent: "center", padding: "12px 0", color: "var(--danger)", borderColor: "var(--danger-line)" }} onClick={() => setPage("landing")}>
        Se déconnecter
      </button>
    </div>
  );
}

/* ───── NOTIFICATIONS ────────────────────────────────── */
function NotifsPage({ setPage }) {
  const iconFor = { alert: I.Bell, badge: I.Trophy, quiz: I.Check, buddy: I.Brain };
  return (
    <div className="page-inner" style={{ animation: "fadeIn .3s ease" }}>
      <div className="ph a1">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div><div className="ph-title">Notifications</div><div className="ph-sub">3 non lues</div></div>
          <button className="btn btn-ghost btn-sm">Tout marquer lu</button>
        </div>
      </div>
      {NOTIFS.map((n, i) => (
        <div key={n.id} className={`ni${!n.read ? " unread" : ""}`}
          style={{ opacity: 0, animation: `fadeUp .4s ${i * .07}s ease both` }}
          onClick={() => { if (n.type === "alert") setPage("alerts"); if (n.type === "buddy") setPage("chatbot"); }}>
          <div style={{ width: 40, height: 40, borderRadius: var_("--r12"), background: !n.read ? "var(--b100)" : "var(--s2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: !n.read ? "var(--b500)" : "var(--t4)" }}>
            <span style={{ width: 18, height: 18 }}>{iconFor[n.type]}</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 13.5, color: "var(--t1)", marginBottom: 2, display: "flex", alignItems: "center", gap: 8 }}>
              {n.title}
              {!n.read && <span style={{ display: "inline-block", width: 6, height: 6, background: "var(--b400)", borderRadius: "50%" }} />}
            </div>
            <div style={{ fontSize: 12.5, color: "var(--t3)", lineHeight: 1.45 }}>{n.msg}</div>
            <div style={{ fontSize: 11.5, color: "var(--t4)", marginTop: 4 }}>{n.time}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ───── LEADERBOARD ──────────────────────────────────── */
function LeaderboardPage() {
  const [period, setPeriod] = useState("semaine");
  const bdgC = { mentor: "bdg-mentor", expert: "bdg-expert", actif: "bdg-actif", novice: "bdg-novice" };

  return (
    <div className="page-inner" style={{ animation: "fadeIn .3s ease" }}>
      <div className="ph a1"><div className="ph-title">Classement</div><div className="ph-sub">Communauté PeerAlert — IFRI/UAC</div></div>
      <div className="chips-row a2" style={{ marginBottom: 22 }}>
        {["semaine", "mois", "global"].map(p => (
          <button key={p} className={`chip${period === p ? " on" : ""}`} onClick={() => setPeriod(p)} style={{ textTransform: "capitalize" }}>{p}</button>
        ))}
      </div>

      {/* Podium */}
      <div className="card a2" style={{ padding: 22, marginBottom: 20, background: "var(--b025)" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 12 }}>
          {[[1, LEADERBOARD[1], "68px"], [0, LEADERBOARD[0], "88px"], [2, LEADERBOARD[2], "52px"]].map(([rank, u, h]) => (
            <div key={rank} style={{ textAlign: "center", flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: "var(--t3)", marginBottom: 4 }}>{u.name.split(" ")[0]}</div>
              <div className="av" style={{ width: 40, height: 40, fontSize: 14, margin: "0 auto 5px" }}>{u.name[0] + u.name.split(" ")[1][0]}</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "var(--b500)", marginBottom: 6 }}>{u.pts} pts</div>
              <div style={{ background: rank === 0 ? "var(--b700)" : rank === 1 ? "var(--b400)" : "var(--b200)", borderRadius: "var(--r8) var(--r8) 0 0", height: h, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: 8 }}>
                <span style={{ fontFamily: "DM Serif Display,serif", fontSize: 18, color: "white" }}>{rank === 0 ? "1" : rank === 1 ? "2" : "3"}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {LEADERBOARD.map((u, i) => (
        <div key={u.rank} className={`rkrow${u.me ? " me" : ""}`} style={{ opacity: 0, animation: `fadeUp .4s ${i * .05}s ease both` }}>
          <div style={{ width: 26, fontFamily: "DM Serif Display,serif", fontSize: 15, color: i < 3 ? "var(--b500)" : "var(--t4)", textAlign: "center" }}>{u.rank}</div>
          <div className="av" style={{ width: 38, height: 38, fontSize: 14 }}>{u.name[0] + u.name.split(" ")[1][0]}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 13.5, color: "var(--t1)", display: "flex", gap: 7, alignItems: "center" }}>
              {u.name}
              {u.me && <span style={{ fontSize: 10.5, background: "var(--b100)", color: "var(--b500)", padding: "1px 7px", borderRadius: var_("--rpill"), fontWeight: 700 }}>Moi</span>}
            </div>
            <div style={{ fontSize: 12, color: "var(--t3)" }}>{u.filiere} · {u.sess} sessions</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "DM Serif Display,serif", fontSize: 17, color: "var(--t1)" }}>{u.pts}</div>
            <div className={`bdg ${bdgC[u.badge]}`} style={{ marginTop: 4 }}>{u.badge.charAt(0).toUpperCase() + u.badge.slice(1)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ───── CHATBOT ──────────────────────────────────────── */
function ChatbotPage() {
  const [msgs, setMsgs] = useState([
    { id: 1, from: "bot", text: "Bonjour, je suis PeerBuddy — votre compagnon de bien-être académique. Je suis disponible à tout moment pour vous accompagner : stress, procrastination, gestion du temps, motivation. Comment vous sentez-vous aujourd'hui ?" }
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
            <div style={{ width: 44, height: 44, borderRadius: var_("--r12"), background: "var(--b800)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", flexShrink: 0 }}>
              <span style={{ width: 22, height: 22 }}>{I.Brain}</span>
            </div>
            <div className="online" style={{ position: "absolute", bottom: 0, right: 0, border: "2px solid var(--white)" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: "var(--t1)" }}>PeerBuddy</div>
            <div style={{ fontSize: 12, color: "var(--success)", fontWeight: 500 }}>En ligne · Psychologue virtuel</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11.5, color: "var(--t4)", fontWeight: 600 }}>Base embarquée</div>
            <div style={{ fontSize: 11, color: "var(--t4)" }}>Sans API externe</div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 28px", maxWidth: 820, width: "100%", margin: "0 auto" }}>
        {/* Suggestions */}
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontSize: 12.5, color: "var(--t4)", marginBottom: 10, textAlign: "center" }}>Sujets fréquents</div>
          <div className="chips-row" style={{ justifyContent: "center", flexWrap: "wrap", gap: 7 }}>
            {suggestions.map(s => (
              <button key={s.label} className="chip" style={{ fontSize: 12.5 }} onClick={() => send(s.msg)}>{s.label}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {msgs.map(m => (
            <div key={m.id} style={{ display: "flex", gap: 10, flexDirection: m.from === "user" ? "row-reverse" : "row", alignItems: "flex-end" }}>
              {m.from === "bot" && (
                <div style={{ width: 30, height: 30, borderRadius: var_("--r8"), background: "var(--b800)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "white" }}>
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
              <div style={{ width: 30, height: 30, borderRadius: var_("--r8"), background: "var(--b800)", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
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
            style={{ height: 44, width: 44, borderRadius: var_("--r8"), padding: 0, justifyContent: "center", flexShrink: 0 }}
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

/* ───── ROOT ─────────────────────────────────────────── */
export default function PeerAlert() {
  const [page, setPage] = useState("landing");
  useEffect(() => { injectCSS(); }, []);
  const nav = p => setPage(p);

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
    </Shell>
  );
}
