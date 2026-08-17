
import { useState } from "react";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, LineChart, Line, CartesianGrid,
} from "recharts";
import {
  AlertTriangle, MapPin, Users, Shield, Activity, Bell, FileText,
  Search, Phone, MessageSquare, ChevronRight, ChevronDown, Radio,
  Wifi, Battery, Clock, CheckCircle2, XCircle, Navigation, UserCheck,
  Siren, ArrowUpRight, LayoutDashboard, ClipboardList, ScrollText,
  Compass, Signal, PhoneCall, Droplet, ShieldAlert, Gauge, X,
  Lock, LogIn, LogOut, Loader2, Home, Map, Radar, IdCard, ShieldCheck,
  Megaphone, Settings, Download, Plus,
} from "lucide-react";
 
/* ------------------------------------------------------------------ */
/*  DESIGN TOKENS                                                      */
/* ------------------------------------------------------------------ */
const CSS = `
  :root{
    --bg:#0a0812; --panel:#130f1e; --panel-2:#171225; --raised:#1c1730;
    --border:#241d38; --border-soft:#1c1730;
    --text:#ede9f7; --text-dim:#9a92b3; --text-faint:#57506e;
    --critical:#ff4d6a; --critical-dim:#4a1030;
    --warning:#f5a623; --warning-dim:#4a3a14;
    --safe:#2fd4a8; --safe-dim:#123a30;
    --live:#22d3ee; --live-dim:#0f2f42;
    --brand1:#8b5cf6; --brand2:#ec4899; --brand-dim:#2a1a42;
    --brand-grad:linear-gradient(135deg,var(--brand1),var(--brand2));
    --mono:'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
    --display:'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
    --body:'Inter', ui-sans-serif, system-ui, sans-serif;
  }
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
 
  .tsa-root{ background:var(--bg); color:var(--text); font-family:var(--body);
    min-height:100vh; display:flex; font-size:13px; position:relative; }
  .tsa-root::before{ content:''; position:fixed; inset:0; z-index:0; pointer-events:none;
    background:
      radial-gradient(ellipse 900px 620px at 88% -8%, rgba(139,92,246,0.16), transparent 60%),
      radial-gradient(ellipse 800px 560px at -8% 92%, rgba(236,72,153,0.10), transparent 60%),
      radial-gradient(ellipse 600px 500px at 50% 40%, rgba(139,92,246,0.05), transparent 65%); }
  .tsa-root *{ box-sizing:border-box; }
  .mono{ font-family:var(--mono); letter-spacing:0.01em; }
  .disp{ font-family:var(--display); }
 
  /* ---------- sidebar ---------- */
  .sidebar{ width:220px; flex-shrink:0; background:rgba(19,15,30,0.85); backdrop-filter:blur(8px);
    border-right:1px solid var(--border); display:flex; flex-direction:column;
    padding:18px 12px; position:sticky; top:0; height:100vh; overflow-y:auto; z-index:2; }
  .brand{ display:flex; align-items:center; gap:9px; padding:2px 8px 18px 8px; }
  .brand-mark{ width:30px; height:30px; border-radius:9px; background:var(--brand-grad);
    display:flex; align-items:center; justify-content:center; flex-shrink:0;
    box-shadow:0 0 0 4px rgba(139,92,246,0.10); }
  .brand-name{ font-family:var(--display); font-weight:700; font-size:13.5px; line-height:1.15; }
  .brand-sub{ color:var(--text-faint); font-size:9.5px; letter-spacing:0.08em; text-transform:uppercase; margin-top:1px;}
  .nav-group-label{ color:var(--text-faint); font-size:9.5px; letter-spacing:0.12em; text-transform:uppercase;
    padding:14px 10px 6px; }
  .nav-item{ display:flex; align-items:center; gap:10px; padding:8px 10px; border-radius:8px; cursor:pointer;
    color:var(--text-dim); font-size:12.5px; font-weight:500; position:relative; transition:background .12s,color .12s; }
  .nav-item:hover{ background:var(--raised); color:var(--text); }
  .nav-item.active{ background:var(--raised); color:var(--text); }
  .nav-item.active::before{ content:''; position:absolute; left:-12px; top:8px; bottom:8px; width:3px;
    background:var(--brand-grad); border-radius:2px; }
  .nav-icon{ display:flex; align-items:center; justify-content:center; flex-shrink:0; }
  .nav-badge{ margin-left:auto; background:var(--critical-dim); color:var(--critical); font-family:var(--mono);
    font-size:10px; padding:1px 6px; border-radius:20px; font-weight:600; }
  .sidebar-foot{ margin-top:auto; padding:12px 10px 2px; border-top:1px solid var(--border-soft); margin-top:14px; }
  .role-pill{ display:flex; align-items:center; gap:8px; }
  .role-avatar{ width:26px; height:26px; border-radius:50%; background:var(--brand-grad);
    display:flex; align-items:center; justify-content:center; color:#fff; flex-shrink:0; }
  .role-name{ font-size:12px; font-weight:600; }
  .role-tag{ font-size:9.5px; color:var(--text-faint); }
 
  /* ---------- top bar ---------- */
  .main{ flex:1; min-width:0; display:flex; flex-direction:column; position:relative; z-index:1; }
  .topbar{ height:56px; border-bottom:1px solid var(--border); display:flex; align-items:center;
    padding:0 22px; gap:16px; position:sticky; top:0; background:rgba(10,8,18,0.75); backdrop-filter:blur(8px); z-index:20;}
  .page-title{ font-family:var(--display); font-weight:600; font-size:15.5px; }
  .search-box{ display:flex; align-items:center; gap:7px; background:var(--panel-2); border:1px solid var(--border);
    border-radius:7px; padding:6px 10px; color:var(--text-faint); width:230px; margin-left:8px; transition:border-color .15s, box-shadow .15s; }
  .search-box:focus-within{ border-color:var(--brand1); box-shadow:0 0 0 3px rgba(139,92,246,0.14); }
  .search-box input{ background:none; border:none; outline:none; color:var(--text); font-size:12px; width:100%; font-family:var(--body); }
  .status-chip{ display:flex; align-items:center; gap:6px; font-size:11px; color:var(--text-dim); font-family:var(--mono); }
  .dot{ width:6px; height:6px; border-radius:50%; }
  .dot.live{ background:var(--safe); box-shadow:0 0 0 3px var(--safe-dim); }
  .topbar-right{ margin-left:auto; display:flex; align-items:center; gap:18px; }
  .bell-wrap{ position:relative; color:var(--text-dim); }
  .bell-dot{ position:absolute; top:-2px; right:-2px; width:7px; height:7px; border-radius:50%; background:var(--critical);
    border:1.5px solid var(--panel); }
 
  .content{ padding:22px 26px 60px; position:relative; z-index:1; }
 
  /* ---------- kpi grid ---------- */
  .kpi-grid{ display:grid; grid-template-columns:repeat(6,1fr); gap:12px; margin-bottom:20px; }
  .kpi{ background:var(--panel); border:1px solid var(--border); border-radius:10px; padding:14px 14px 12px; min-width:0; }
  .kpi-top{ display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
  .kpi-icon{ width:26px; height:26px; border-radius:6px; display:flex; align-items:center; justify-content:center; }
  .kpi-val{ font-family:var(--display); font-size:22px; font-weight:700; line-height:1; }
  .kpi-label{ color:var(--text-dim); font-size:11px; margin-top:6px; }
 
  .section-title{ font-family:var(--display); font-weight:600; font-size:13.5px; display:flex; align-items:center; gap:8px; margin-bottom:12px;}
  .panel{ background:var(--panel); border:1px solid var(--border); border-radius:10px; padding:16px; }
  .grid-2{ display:grid; grid-template-columns:1.55fr 1fr; gap:16px; align-items:start; }
 
  /* ---------- live map ---------- */
  .radar-wrap{ position:relative; aspect-ratio:16/11; border-radius:9px; overflow:hidden;
    background:radial-gradient(circle at 50% 50%, #170f26 0%, #0d0817 65%, #070510 100%); border:1px solid var(--border-soft); }
  .map-aurora{ position:absolute; inset:-20%; pointer-events:none;
    background:radial-gradient(circle at 28% 32%, rgba(139,92,246,0.20), transparent 45%),
               radial-gradient(circle at 74% 68%, rgba(236,72,153,0.14), transparent 42%);
    animation:drift 9s ease-in-out infinite alternate; }
  .radar-ring{ position:absolute; border:1px solid rgba(139,92,246,0.16); border-radius:50%; top:50%; left:50%; transform:translate(-50%,-50%); }
  .scan-h{ position:absolute; left:0; right:0; height:2px; top:0;
    background:linear-gradient(90deg, transparent, rgba(139,92,246,0.95), transparent);
    box-shadow:0 0 14px 2px rgba(139,92,246,0.55); animation:scanDown 4.4s linear infinite; }
  @keyframes scanDown{ 0%{ top:0%; opacity:0;} 8%{opacity:1;} 92%{opacity:1;} 100%{ top:100%; opacity:0;} }
  .scan-v{ position:absolute; top:0; bottom:0; width:2px; left:0;
    background:linear-gradient(180deg, transparent, rgba(236,72,153,0.9), transparent);
    box-shadow:0 0 14px 2px rgba(236,72,153,0.5); animation:scanRight 6.2s linear infinite; }
  @keyframes scanRight{ 0%{ left:0%; opacity:0;} 8%{opacity:1;} 92%{opacity:1;} 100%{ left:100%; opacity:0;} }
  .route-svg{ position:absolute; inset:0; width:100%; height:100%; }
  .route-line{ stroke:var(--brand1); stroke-width:0.45; stroke-dasharray:2 1.5; fill:none; opacity:0.85;
    animation:dashMove 0.9s linear infinite; }
  @keyframes dashMove{ to{ stroke-dashoffset:-7; } }
  .marker{ position:absolute; transform:translate(-50%,-50%); display:flex; flex-direction:column; align-items:center; cursor:pointer; z-index:2; }
  .marker-dot{ width:9px; height:9px; border-radius:50%; position:relative; z-index:2; }
  .marker-ping{ position:absolute; width:9px; height:9px; border-radius:50%; z-index:1; animation:ping 1.6s cubic-bezier(0,0,0.3,1) infinite; }
  @keyframes ping{ 0%{ transform:scale(1); opacity:0.7;} 100%{ transform:scale(3.2); opacity:0; } }
  .marker-label{ font-family:var(--mono); font-size:9px; color:var(--text-dim); margin-top:4px; white-space:nowrap;
    background:rgba(10,8,18,0.75); padding:1px 5px; border-radius:3px; }
  .compass{ position:absolute; top:10px; left:12px; color:var(--text-faint); display:flex; align-items:center; gap:6px; font-size:10px; font-family:var(--mono); z-index:3;}
  .legend{ position:absolute; bottom:10px; right:12px; display:flex; gap:10px; background:rgba(10,8,18,0.6);
    padding:6px 9px; border-radius:6px; border:1px solid var(--border-soft); z-index:3; }
  .legend-item{ display:flex; align-items:center; gap:5px; font-size:9.5px; color:var(--text-dim); }
  .legend-dot{ width:6px; height:6px; border-radius:50%; }
 
  /* ---------- badges ---------- */
  .badge{ display:inline-flex; align-items:center; gap:5px; padding:3px 8px; border-radius:20px; font-size:10.5px;
    font-weight:600; font-family:var(--mono); text-transform:uppercase; letter-spacing:0.03em; }
  .badge.critical{ background:var(--critical-dim); color:var(--critical); }
  .badge.warning{ background:var(--warning-dim); color:var(--warning); }
  .badge.safe{ background:var(--safe-dim); color:var(--safe); }
  .badge.live{ background:var(--live-dim); color:var(--live); }
  .badge.brand{ background:var(--brand-dim); color:#c4b5fd; }
  .badge.neutral{ background:var(--raised); color:var(--text-dim); }
 
  /* ---------- lists / tables ---------- */
  .row-item{ display:flex; align-items:center; gap:10px; padding:9px 6px; border-bottom:1px solid var(--border-soft); font-size:12px; }
  .row-item:last-child{ border-bottom:none; }
  table.tsa-table{ width:100%; border-collapse:collapse; font-size:12px; }
  table.tsa-table th{ text-align:left; color:var(--text-faint); font-weight:600; font-size:10px; text-transform:uppercase;
    letter-spacing:0.06em; padding:8px 10px; border-bottom:1px solid var(--border); }
  table.tsa-table td{ padding:10px 10px; border-bottom:1px solid var(--border-soft); vertical-align:middle; }
  table.tsa-table tr:hover td{ background:var(--panel-2); }
 
  /* ---------- SOS cards ---------- */
  .filter-bar{ display:flex; gap:8px; margin-bottom:14px; flex-wrap:wrap; }
  .filter-btn{ padding:6px 12px; border-radius:7px; border:1px solid var(--border); background:var(--panel-2);
    color:var(--text-dim); font-size:11.5px; font-weight:500; cursor:pointer; }
  .filter-btn.active{ background:var(--brand-dim); color:#c4b5fd; border-color:var(--brand1); }
  .sos-grid{ display:grid; grid-template-columns:repeat(2,1fr); gap:12px; }
  .sos-card{ background:var(--panel); border:1px solid var(--border); border-radius:10px; padding:14px; cursor:pointer; transition:border-color .12s, box-shadow .15s;}
  .sos-card:hover{ border-color:#382a56; box-shadow:0 0 0 1px rgba(139,92,246,0.18); }
  .sos-card.sel{ border-color:var(--brand1); box-shadow:0 0 0 1px rgba(139,92,246,0.3); }
  .sos-head{ display:flex; align-items:center; justify-content:space-between; margin-bottom:10px; }
  .sos-id{ font-family:var(--mono); font-size:11px; color:var(--text-dim); }
  .person-row{ display:flex; align-items:center; gap:10px; margin-bottom:10px; }
  .avatar{ width:34px; height:34px; border-radius:8px; background:var(--raised); display:flex; align-items:center;
    justify-content:center; color:var(--text-dim); font-weight:700; font-family:var(--display); font-size:13px; flex-shrink:0; }
  .person-name{ font-weight:600; font-size:13px; }
  .person-loc{ color:var(--text-dim); font-size:11px; display:flex; align-items:center; gap:4px; margin-top:1px; }
  .stat-strip{ display:flex; gap:14px; margin:10px 0; }
  .stat-mini{ display:flex; align-items:center; gap:5px; color:var(--text-dim); font-size:11px; font-family:var(--mono); }
  .btn-row{ display:flex; gap:6px; margin-top:12px; }
  .icon-btn{ flex:1; display:flex; align-items:center; justify-content:center; gap:5px; padding:7px 0; border-radius:7px;
    border:1px solid var(--border); background:var(--panel-2); color:var(--text-dim); font-size:10.5px; font-weight:600; cursor:pointer; }
  .icon-btn:hover{ background:var(--raised); color:var(--text); }
  .icon-btn.primary{ background:var(--critical-dim); color:var(--critical); border-color:transparent; }
 
  /* ---------- incident detail ---------- */
  .drawer{ position:sticky; top:70px; }
  .kv{ display:flex; justify-content:space-between; padding:7px 0; border-bottom:1px solid var(--border-soft); font-size:12px; }
  .kv:last-child{ border-bottom:none; }
  .kv .k{ color:var(--text-faint); }
  .kv .v{ font-family:var(--mono); color:var(--text); text-align:right; }
  .timeline{ margin-top:4px; }
  .tl-item{ display:flex; gap:10px; position:relative; padding-bottom:16px; }
  .tl-item:last-child{ padding-bottom:0; }
  .tl-dot-wrap{ display:flex; flex-direction:column; align-items:center; }
  .tl-dot{ width:8px; height:8px; border-radius:50%; background:var(--brand1); flex-shrink:0; margin-top:3px; }
  .tl-line{ width:1px; flex:1; background:var(--border); margin-top:2px; }
  .tl-time{ font-family:var(--mono); font-size:10.5px; color:var(--text-faint); }
  .tl-text{ font-size:12px; margin-top:1px; }
  .med-card{ background:linear-gradient(135deg,var(--critical-dim),var(--panel-2)); border:1px solid var(--border);
    border-radius:9px; padding:12px; margin-top:12px; }
 
  .empty-close{ display:flex; align-items:center; justify-content:center; height:100%; color:var(--text-faint); font-size:12px; flex-direction:column; gap:8px;}
 
  .two-col{ display:grid; grid-template-columns:1fr 1fr; gap:16px; }
  .chart-card{ background:var(--panel); border:1px solid var(--border); border-radius:10px; padding:16px; }
 
  /* ---------- roles / permissions ---------- */
  .role-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:12px; margin-bottom:18px; }
  .role-card{ background:var(--panel); border:1px solid var(--border); border-radius:10px; padding:14px; transition:border-color .15s; }
  .role-card:hover{ border-color:#382a56; }
  .role-card-icon{ width:30px; height:30px; border-radius:8px; display:flex; align-items:center; justify-content:center; margin-bottom:10px; }
  .role-card-title{ font-weight:700; font-size:12.5px; margin-bottom:8px; }
  .perm-item{ display:flex; align-items:center; gap:6px; font-size:11px; color:var(--text-dim); padding:3px 0; }
 
  /* ---------- broadcast ---------- */
  .broadcast-hero{ background:linear-gradient(135deg, var(--critical-dim), var(--panel-2)); border:1px solid var(--border);
    border-radius:10px; padding:20px; display:flex; align-items:center; justify-content:space-between; gap:16px; margin-bottom:16px; }
  .broadcast-btn{ background:linear-gradient(135deg,var(--critical),#ff8a4d); color:#180404; font-weight:700; font-size:12.5px;
    padding:12px 20px; border-radius:9px; border:none; cursor:pointer; display:flex; align-items:center; gap:8px; white-space:nowrap; }
  .broadcast-btn:hover{ filter:brightness(1.06); }
  .template-row{ display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px; }
  .template-chip{ padding:8px 14px; border-radius:20px; border:1px solid var(--border); background:var(--panel-2);
    color:var(--text-dim); font-size:11.5px; font-weight:500; cursor:pointer; }
  .template-chip.active{ border-color:var(--brand1); color:#c4b5fd; background:var(--brand-dim); }
 
  /* ---------- reports ---------- */
  .report-row{ display:flex; align-items:center; gap:12px; padding:13px 8px; border-bottom:1px solid var(--border-soft); }
  .report-row:last-child{ border-bottom:none; }
  .report-icon{ width:32px; height:32px; border-radius:8px; background:var(--raised); display:flex; align-items:center; justify-content:center; color:#c4b5fd; flex-shrink:0; }
  .report-name{ font-weight:600; font-size:12.5px; }
  .report-meta{ color:var(--text-faint); font-size:10.5px; margin-top:1px; }
  .report-btn{ margin-left:auto; display:flex; align-items:center; gap:5px; padding:7px 12px; border-radius:7px;
    border:1px solid var(--border); background:var(--panel-2); color:var(--text-dim); font-size:11px; font-weight:600; cursor:pointer; }
  .report-btn:hover{ background:var(--raised); color:var(--text); }
 
  /* ---------- settings ---------- */
  .settings-row{ display:flex; align-items:center; justify-content:space-between; padding:14px 4px; border-bottom:1px solid var(--border-soft); }
  .settings-row:last-child{ border-bottom:none; }
  .settings-label{ font-weight:600; font-size:12.5px; }
  .settings-desc{ color:var(--text-faint); font-size:11px; margin-top:2px; }
  .switch{ width:38px; height:22px; border-radius:20px; background:var(--raised); border:1px solid var(--border);
    position:relative; cursor:pointer; flex-shrink:0; transition:background .2s, border-color .2s; }
  .switch.on{ background:var(--brand-grad); border-color:transparent; }
  .switch-thumb{ position:absolute; top:2px; left:2px; width:16px; height:16px; border-radius:50%; background:#fff;
    transition:transform .2s; box-shadow:0 1px 3px rgba(0,0,0,0.4); }
  .switch.on .switch-thumb{ transform:translateX(16px); }
 
  /* ---------- geofences ---------- */
  .fence-dot{ width:8px; height:8px; border-radius:50%; flex-shrink:0; }
 
  @media (max-width:1100px){
    .kpi-grid{ grid-template-columns:repeat(3,1fr); }
    .grid-2{ grid-template-columns:1fr; }
    .sos-grid{ grid-template-columns:1fr; }
    .two-col{ grid-template-columns:1fr; }
    .role-grid{ grid-template-columns:repeat(2,1fr); }
  }
  @media (max-width:720px){
    .sidebar{ display:none; }
    .kpi-grid{ grid-template-columns:repeat(2,1fr); }
    .role-grid{ grid-template-columns:1fr; }
  }
 
  /* ---------- animations ---------- */
  @keyframes fadeUp{ from{ opacity:0; transform:translateY(10px);} to{ opacity:1; transform:translateY(0);} }
  @keyframes fadeIn{ from{ opacity:0;} to{ opacity:1;} }
  @keyframes slideInLeft{ from{ opacity:0; transform:translateX(-14px);} to{ opacity:1; transform:translateX(0);} }
  @keyframes slideDown{ from{ opacity:0; transform:translateY(-8px);} to{ opacity:1; transform:translateY(0);} }
  @keyframes popIn{ from{ opacity:0; transform:scale(0.96);} to{ opacity:1; transform:scale(1);} }
  @keyframes rot{ to{ transform:rotate(360deg); } }
  @keyframes pulseDot{ 0%,100%{ box-shadow:0 0 0 0 rgba(255,77,77,0.55);} 50%{ box-shadow:0 0 0 4px rgba(255,77,77,0);} }
 
  .tab-fade{ animation:fadeUp .38s ease both; }
  .sidebar{ animation:slideInLeft .4s ease both; }
  .topbar{ animation:slideDown .35s ease both; }
  .kpi{ animation:popIn .4s ease both; opacity:0; animation-fill-mode:forwards; }
  .sos-card{ animation:popIn .4s ease both; opacity:0; animation-fill-mode:forwards; }
  .panel, .chart-card{ animation:fadeUp .4s ease both; }
  .row-item{ animation:fadeIn .5s ease both; }
 
  .nav-item{ transition:background .15s,color .15s,transform .15s; }
  .nav-item:hover{ transform:translateX(2px); }
 
  .icon-btn, .filter-btn, .login-btn, .login-role{ transition:background .15s,color .15s,transform .1s,border-color .15s,filter .15s; }
  .icon-btn:active, .filter-btn:active{ transform:scale(0.96); }
 
  .marker{ transition:transform .15s; }
  .marker:hover{ transform:translate(-50%,-50%) scale(1.18); }
 
  .bell-dot{ animation:pulseDot 1.8s ease-in-out infinite; }
  .spin{ animation:rot .8s linear infinite; }
 
  /* ---------- login ---------- */
  .login-screen{ min-height:100vh; background:var(--bg); position:relative; overflow:hidden;
    display:flex; align-items:center; justify-content:center; font-family:var(--body); color:var(--text); }
  .login-bg{ position:absolute; inset:-10%; }
  .login-bg::before{ content:''; position:absolute; inset:0;
    background:radial-gradient(circle at 28% 30%, rgba(34,211,238,0.12), transparent 45%),
               radial-gradient(circle at 76% 72%, rgba(255,77,77,0.09), transparent 42%);
    animation:drift 12s ease-in-out infinite alternate; }
  @keyframes drift{ from{ transform:translate(0,0) scale(1);} to{ transform:translate(-3%,2%) scale(1.06);} }
  .login-grid{ position:absolute; inset:0; background-image:linear-gradient(rgba(34,211,238,0.05) 1px,transparent 1px),
    linear-gradient(90deg, rgba(34,211,238,0.05) 1px,transparent 1px); background-size:34px 34px;
    -webkit-mask-image:radial-gradient(circle at 50% 40%, black, transparent 72%);
    mask-image:radial-gradient(circle at 50% 40%, black, transparent 72%); }
  .scan-line{ position:absolute; left:0; right:0; height:140px; top:-140px;
    background:linear-gradient(rgba(34,211,238,0) 0%, rgba(34,211,238,0.09) 50%, rgba(34,211,238,0) 100%);
    animation:scan 5.5s linear infinite; }
  @keyframes scan{ from{ top:-140px;} to{ top:100%; } }
  .login-card{ position:relative; z-index:2; width:378px; background:rgba(16,22,29,0.9); border:1px solid var(--border);
    border-radius:14px; padding:30px 28px 26px; backdrop-filter:blur(10px); animation:popIn .5s ease both;
    box-shadow:0 30px 60px -20px rgba(0,0,0,0.65); }
  .login-mark-wrap{ display:flex; justify-content:center; margin-bottom:16px; }
  .login-mark{ width:52px; height:52px; border-radius:13px; background:linear-gradient(140deg,var(--live),var(--safe));
    display:flex; align-items:center; justify-content:center; box-shadow:0 0 0 6px rgba(34,211,238,0.08); }
  .login-title{ font-family:var(--display); font-weight:700; font-size:19px; text-align:center; }
  .login-sub{ text-align:center; color:var(--text-dim); font-size:11.5px; margin-top:4px; margin-bottom:22px; }
  .login-role-row{ display:flex; gap:8px; margin-bottom:18px; }
  .login-role{ flex:1; text-align:center; padding:8px 0; border-radius:7px; border:1px solid var(--border);
    background:var(--panel-2); color:var(--text-dim); font-size:10.5px; font-weight:600; cursor:pointer; }
  .login-role.active{ border-color:var(--live); color:var(--live); background:var(--live-dim); }
  .login-field{ margin-bottom:14px; animation:fadeUp .4s ease both; opacity:0; animation-fill-mode:forwards; }
  .login-label{ font-size:10.5px; color:var(--text-faint); text-transform:uppercase; letter-spacing:0.08em; margin-bottom:6px; display:block; }
  .login-input-wrap{ display:flex; align-items:center; gap:8px; background:var(--panel-2); border:1px solid var(--border);
    border-radius:8px; padding:10px 12px; transition:border-color .15s, box-shadow .15s; }
  .login-input-wrap:focus-within{ border-color:var(--live); box-shadow:0 0 0 3px rgba(34,211,238,0.12); }
  .login-input-wrap input{ background:none; border:none; outline:none; color:var(--text); font-size:13px; width:100%; font-family:var(--body); }
  .login-btn{ width:100%; padding:11px 0; border-radius:8px; border:none; background:var(--live); color:#06121a;
    font-weight:700; font-size:13px; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:7px; margin-top:6px; }
  .login-btn:hover{ filter:brightness(1.08); }
  .login-btn:active{ transform:scale(0.98); }
  .login-btn[disabled]{ opacity:0.72; cursor:progress; }
  .login-error{ background:var(--critical-dim); color:var(--critical); font-size:11px; padding:8px 10px; border-radius:7px;
    margin-bottom:14px; animation:fadeUp .3s ease both; }
  .login-status{ display:flex; align-items:center; justify-content:center; gap:6px; margin-top:18px; color:var(--text-faint); font-size:10.5px; font-family:var(--mono); }
  .logout-btn{ color:var(--text-faint); cursor:pointer; margin-left:auto; display:flex; align-items:center; }
  .logout-btn:hover{ color:var(--critical); }
`;
 
/* ------------------------------------------------------------------ */
/*  MOCK DATA                                                          */
/* ------------------------------------------------------------------ */
const NAV = [
  { key: "overview", label: "Dashboard", icon: LayoutDashboard, group: "Monitoring" },
  { key: "sos", label: "Active SOS", icon: Siren, group: "Monitoring", badge: 3 },
  { key: "map", label: "Live Map", icon: MapPin, group: "Monitoring" },
  { key: "responders", label: "Responders", icon: UserCheck, group: "Monitoring" },
  { key: "incidents", label: "Incidents", icon: ClipboardList, group: "Management" },
  { key: "users", label: "Tourists", icon: Users, group: "Management" },
  { key: "analytics", label: "Analytics", icon: Gauge, group: "Management" },
  { key: "audit", label: "Audit Logs", icon: ScrollText, group: "Management" },
];
 
const SOS_LIST = [
  { id: "SOS-20482", name: "Rahul Sharma", initials: "RS", status: "active", risk: "critical",
    location: "Upper Shillong, Meghalaya", trigger: "14:51:02", distance: "1.2 km", battery: 41,
    network: "2G", lastGps: "8s ago", assigned: "A. Kumar", eta: "4 min", age: "26",
    blood: "O+", allergies: "Penicillin, Severe Asthma", emergencyContact: "Priya S. (Sister)" },
  { id: "SOS-20481", name: "Sneha Iyer", initials: "SI", status: "unassigned", risk: "critical",
    location: "Dzukou Valley Trek Route, Nagaland", trigger: "14:38:47", distance: "—", battery: 19,
    network: "No Signal", lastGps: "6 min ago", assigned: "—", eta: "—", age: "24",
    blood: "B+", allergies: "None reported", emergencyContact: "Karan I. (Brother)" },
  { id: "SOS-20479", name: "Karan Das", initials: "KD", status: "responding", risk: "warning",
    location: "Mawphlang Sacred Forest, Meghalaya", trigger: "14:12:19", distance: "0.6 km", battery: 67,
    network: "4G", lastGps: "just now", assigned: "S. Patel", eta: "2 min", age: "31",
    blood: "A-", allergies: "None reported", emergencyContact: "Ritu D. (Spouse)" },
  { id: "SOS-20475", name: "Priya Singh", initials: "PS", status: "resolved", risk: "safe",
    location: "Nohsngithiang Falls, Meghalaya", trigger: "13:02:55", distance: "0 km", battery: 88,
    network: "4G", lastGps: "12 min ago", assigned: "R. Singh", eta: "Arrived", age: "29",
    blood: "AB+", allergies: "Peanuts (mild)", emergencyContact: "Anil S. (Father)" },
];
 
const RESPONDERS = [
  { name: "A. Kumar", status: "En route", statusType: "warning", location: "1.2 km out", assigned: "SOS-20482", eta: "4 min" },
  { name: "S. Patel", status: "En route", statusType: "warning", location: "0.6 km out", assigned: "SOS-20479", eta: "2 min" },
  { name: "R. Singh", status: "Available", statusType: "safe", location: "Shillong HQ", assigned: "—", eta: "—" },
  { name: "M. Lyngdoh", status: "Available", statusType: "safe", location: "Cherrapunji Post", assigned: "—", eta: "—" },
  { name: "T. Marak", status: "Offline", statusType: "neutral", location: "—", assigned: "—", eta: "—" },
];
 
const USERS = [
  { name: "Rahul Sharma", phone: "+91 98765 43210", status: "Active", trips: 3, lastActive: "8s ago", registered: "12 May 2026" },
  { name: "Sneha Iyer", phone: "+91 90210 55214", status: "Active", trips: 1, lastActive: "6 min ago", registered: "02 Jun 2026" },
  { name: "Karan Das", phone: "+91 88991 22013", status: "Active", trips: 5, lastActive: "just now", registered: "19 Feb 2026" },
  { name: "Priya Singh", phone: "+91 76543 90981", status: "Active", trips: 2, lastActive: "12 min ago", registered: "30 Jul 2026" },
  { name: "Aayush Verma", phone: "+91 99887 65432", status: "Inactive", trips: 0, lastActive: "4 days ago", registered: "11 Jan 2026" },
];
 
const AUDIT_LOG = [
  { time: "14:52:41", admin: "Admin #23 (S. Rao)", action: "Viewed Incident SOS-20482" },
  { time: "14:52:10", admin: "Admin #23 (S. Rao)", action: "Assigned Responder A. Kumar to SOS-20482" },
  { time: "14:51:48", admin: "Admin #23 (S. Rao)", action: "Acknowledged SOS-20482" },
  { time: "14:53:30", admin: "System", action: "Responder A. Kumar marked En Route" },
  { time: "13:05:40", admin: "Admin #11 (D. Kharshiing)", action: "Marked Incident SOS-20475 as Resolved" },
  { time: "12:44:02", admin: "Admin #11 (D. Kharshiing)", action: "Called tourist Priya Singh" },
];
 
const RISK_DATA = [
  { name: "Safe", value: 1129, color: "#2fd4a8" },
  { name: "Warning", value: 214, color: "#f5a623" },
  { name: "High Risk", value: 62, color: "#ff8a4d" },
  { name: "Critical", value: 23, color: "#ff4d4d" },
];
 
const WEEKLY_DATA = [
  { day: "Mon", incidents: 9 }, { day: "Tue", incidents: 14 }, { day: "Wed", incidents: 7 },
  { day: "Thu", incidents: 16 }, { day: "Fri", incidents: 11 }, { day: "Sat", incidents: 21 }, { day: "Sun", incidents: 18 },
];
 
const RESPONSE_TREND = [
  { day: "Mon", mins: 6.2 }, { day: "Tue", mins: 5.4 }, { day: "Wed", mins: 5.9 },
  { day: "Thu", mins: 4.8 }, { day: "Fri", mins: 5.1 }, { day: "Sat", mins: 4.3 }, { day: "Sun", mins: 4.6 },
];
 
const MARKERS = [
  { id: "SOS-20482", x: 38, y: 32, type: "critical", label: "Upper Shillong" },
  { id: "SOS-20481", x: 72, y: 20, type: "critical", label: "Dzukou Valley" },
  { id: "SOS-20479", x: 55, y: 58, type: "warning", label: "Mawphlang" },
  { id: "R-A.Kumar", x: 33, y: 40, type: "responder", label: "A. Kumar" },
  { id: "R-S.Patel", x: 60, y: 55, type: "responder", label: "S. Patel" },
  { id: "SOS-20475", x: 24, y: 68, type: "safe", label: "Nohsngithiang Falls" },
];
 
/* ------------------------------------------------------------------ */
/*  SMALL HELPERS                                                      */
/* ------------------------------------------------------------------ */
function riskColor(risk) {
  return { critical: "var(--critical)", warning: "var(--warning)", safe: "var(--safe)", live: "var(--live)" }[risk] || "var(--text-dim)";
}
function Badge({ type, children }) {
  return <span className={`badge ${type}`}>{children}</span>;
}
function statusMeta(status) {
  switch (status) {
    case "active": return { label: "Active", type: "critical" };
    case "unassigned": return { label: "Unassigned", type: "critical" };
    case "responding": return { label: "Responding", type: "warning" };
    case "resolved": return { label: "Resolved", type: "safe" };
    default: return { label: status, type: "neutral" };
  }
}
 
/* ------------------------------------------------------------------ */
/*  RADAR MAP (signature element)                                      */
/* ------------------------------------------------------------------ */
function RadarMap({ height = "100%", onSelect }) {
  const dotColor = { critical: "var(--critical)", warning: "var(--warning)", safe: "var(--safe)", responder: "var(--live)" };
  return (
    <div className="radar-wrap" style={{ height }}>
      <div className="radar-sweep" />
      {[18, 32, 46].map((r, i) => (
        <div key={i} className="radar-ring" style={{ width: r * 2 + "%", height: r * 2 + "%" }} />
      ))}
      <div className="radar-cross" style={{ top: "50%", left: 0, right: 0, height: 1 }} />
      <div className="radar-cross" style={{ left: "50%", top: 0, bottom: 0, width: 1 }} />
      <div className="compass"><Compass size={12} /> NE INDIA GRID · SECTOR 4</div>
      {MARKERS.map((m) => (
        <div key={m.id} className="marker" style={{ top: m.y + "%", left: m.x + "%" }}
          onClick={() => onSelect && onSelect(m.id)}>
          <div style={{ position: "relative", width: 9, height: 9 }}>
            {m.type !== "responder" && <div className="marker-ping" style={{ background: dotColor[m.type] }} />}
            <div className="marker-dot" style={{ background: dotColor[m.type] }} />
          </div>
          <div className="marker-label">{m.label}</div>
        </div>
      ))}
      <div className="legend">
        <div className="legend-item"><span className="legend-dot" style={{ background: "var(--critical)" }} /> SOS</div>
        <div className="legend-item"><span className="legend-dot" style={{ background: "var(--warning)" }} /> Warning</div>
        <div className="legend-item"><span className="legend-dot" style={{ background: "var(--live)" }} /> Responder</div>
        <div className="legend-item"><span className="legend-dot" style={{ background: "var(--safe)" }} /> Safe</div>
      </div>
    </div>
  );
}
 
/* ------------------------------------------------------------------ */
/*  LOGIN SCREEN                                                        */
/* ------------------------------------------------------------------ */
const ROLE_LABELS = { dispatcher: "Emergency Dispatcher", responder: "Responder", analyst: "Analyst" };
 
function LoginScreen({ onLogin }) {
  const [role, setRole] = useState("dispatcher");
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 
  const submit = () => {
    if (!id.trim() || !pw.trim()) { setError("Enter an admin ID and password to continue."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin({ id: id.trim(), role }); }, 900);
  };
 
  return (
    <div className="login-screen">
      <style>{CSS}</style>
      <div className="login-bg" />
      <div className="login-grid" />
      <div className="scan-line" />
 
      <div className="login-card">
        <div className="login-mark-wrap"><div className="login-mark"><ShieldAlert size={24} color="#06121a" /></div></div>
        <div className="login-title">SafeTrip NER</div>
        <div className="login-sub">Emergency Response Control Center</div>
 
        {error && <div className="login-error">{error}</div>}
 
        <div className="login-role-row">
          {Object.keys(ROLE_LABELS).map((r) => (
            <div key={r} className={`login-role ${role === r ? "active" : ""}`} onClick={() => setRole(r)}>
              {r[0].toUpperCase() + r.slice(1)}
            </div>
          ))}
        </div>
 
        <div className="login-field" style={{ animationDelay: "60ms" }}>
          <label className="login-label">Admin ID</label>
          <div className="login-input-wrap">
            <UserCheck size={14} color="var(--text-faint)" />
            <input value={id} onChange={(e) => setId(e.target.value)} placeholder="e.g. ADM-0231"
              onKeyDown={(e) => e.key === "Enter" && submit()} />
          </div>
        </div>
 
        <div className="login-field" style={{ animationDelay: "120ms" }}>
          <label className="login-label">Password</label>
          <div className="login-input-wrap">
            <Lock size={14} color="var(--text-faint)" />
            <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••"
              onKeyDown={(e) => e.key === "Enter" && submit()} />
          </div>
        </div>
 
        <button className="login-btn" disabled={loading} onClick={submit}>
          {loading ? <Loader2 size={14} className="spin" /> : <LogIn size={14} />}
          {loading ? "Authenticating…" : "Sign in to dashboard"}
        </button>
 
        <div className="login-status"><span className="dot live" /> System operational · GPS nominal</div>
      </div>
    </div>
  );
}
 
/* ------------------------------------------------------------------ */
/*  MAIN APP                                                            */
/* ------------------------------------------------------------------ */
function AdminApp({ admin, onLogout }) {
  const [tab, setTab] = useState("overview");
  const [sosFilter, setSosFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(SOS_LIST[0].id);
 
  const grouped = NAV.reduce((acc, n) => { (acc[n.group] ||= []).push(n); return acc; }, {});
  const filteredSos = SOS_LIST.filter((s) => sosFilter === "all" || s.status === sosFilter);
  const selected = SOS_LIST.find((s) => s.id === selectedId);
 
  const pageTitles = {
    overview: "Command Dashboard", sos: "Active SOS Alerts", map: "Live Tracking",
    responders: "Responder Management", incidents: "Incident Management", users: "Registered Tourists",
    analytics: "Analytics", audit: "Audit Logs",
  };
 
  return (
    <div className="tsa-root">
      <style>{CSS}</style>
 
      {/* -------- SIDEBAR -------- */}
      <div className="sidebar">
        <div className="brand">
          <div className="brand-mark"><ShieldAlert size={16} color="#06121a" /></div>
          <div>
            <div className="brand-name">SafeTrip NER</div>
            <div className="brand-sub">Control Center</div>
          </div>
        </div>
 
        {Object.entries(grouped).map(([group, items]) => (
          <div key={group}>
            <div className="nav-group-label">{group}</div>
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.key} className={`nav-item ${tab === item.key ? "active" : ""}`} onClick={() => setTab(item.key)}>
                  <Icon size={15} />
                  <span>{item.label}</span>
                  {item.badge ? <span className="nav-badge">{item.badge}</span> : null}
                </div>
              );
            })}
          </div>
        ))}
 
        <div className="sidebar-foot">
          <div className="role-pill">
            <div className="role-avatar"><Shield size={13} /></div>
            <div>
              <div className="role-name">{admin?.id || "S. Rao"}</div>
              <div className="role-tag">{ROLE_LABELS[admin?.role] || "Super Admin"}</div>
            </div>
            <div className="logout-btn" onClick={onLogout} title="Sign out"><LogOut size={14} /></div>
          </div>
        </div>
      </div>
 
      {/* -------- MAIN -------- */}
      <div className="main">
        <div className="topbar">
          <div className="page-title">{pageTitles[tab]}</div>
          <div className="search-box"><Search size={13} /><input placeholder="Search tourist, incident, ID…" /></div>
          <div className="topbar-right">
            <div className="status-chip"><span className="dot live" /> System Operational</div>
            <div className="status-chip"><Wifi size={13} /> GPS Nominal</div>
            <div className="bell-wrap"><Bell size={16} /><span className="bell-dot" /></div>
          </div>
        </div>
 
        <div className="content">
          <div key={tab} className="tab-fade">
            {tab === "overview" && <Overview onGoSos={() => setTab("sos")} />}
            {tab === "sos" && (
              <SosTab
                filter={sosFilter} setFilter={setSosFilter} list={filteredSos}
                selectedId={selectedId} setSelectedId={setSelectedId} selected={selected}
              />
            )}
            {tab === "map" && (
              <div className="panel"><div className="section-title"><MapPin size={14} /> Live Situation Map</div>
                <RadarMap height="560px" onSelect={() => {}} />
              </div>
            )}
            {tab === "responders" && <RespondersTab />}
            {tab === "incidents" && <IncidentsTab selected={selected} setSelectedId={setSelectedId} />}
            {tab === "users" && <UsersTab />}
            {tab === "analytics" && <AnalyticsTab />}
            {tab === "audit" && <AuditTab />}
          </div>
        </div>
      </div>
    </div>
  );
}
 
/* ------------------------------------------------------------------ */
/*  ROOT — gates the dashboard behind the login screen                 */
/* ------------------------------------------------------------------ */
export default function TouristSafetyAdmin() {
  const [authed, setAuthed] = useState(false);
  const [admin, setAdmin] = useState(null);
 
  if (!authed) {
    return <LoginScreen onLogin={(a) => { setAdmin(a); setAuthed(true); }} />;
  }
  return <AdminApp admin={admin} onLogout={() => setAuthed(false)} />;
}
 
/* ------------------------------------------------------------------ */
/*  OVERVIEW TAB                                                       */
/* ------------------------------------------------------------------ */
function Overview({ onGoSos }) {
  const kpis = [
    { label: "Active SOS", val: "3", icon: Siren, color: "critical" },
    { label: "Unassigned", val: "1", icon: AlertTriangle, color: "warning" },
    { label: "Responding", val: "2", icon: Activity, color: "live" },
    { label: "Resolved Today", val: "18", icon: CheckCircle2, color: "safe" },
    { label: "Avg. Response", val: "4.6m", icon: Clock, color: "live" },
    { label: "Avg. Ack Time", val: "38s", icon: Signal, color: "live" },
  ];
  return (
    <>
      <div className="kpi-grid">
        {kpis.map((k, i) => {
          const Icon = k.icon;
          return (
            <div className="kpi" key={k.label} style={{ animationDelay: `${i * 45}ms` }}>
              <div className="kpi-top">
                <div className="kpi-icon" style={{ background: `var(--${k.color}-dim)`, color: `var(--${k.color})` }}>
                  <Icon size={13} />
                </div>
              </div>
              <div className="kpi-val disp">{k.val}</div>
              <div className="kpi-label">{k.label}</div>
            </div>
          );
        })}
      </div>
 
      <div className="grid-2">
        <div className="panel">
          <div className="section-title"><MapPin size={14} /> Live Situation Map</div>
          <RadarMap height="380px" />
        </div>
 
        <div className="panel">
          <div className="section-title" style={{ justifyContent: "space-between", display: "flex" }}>
            <span style={{ display: "flex", gap: 8, alignItems: "center" }}><Siren size={14} /> Recent SOS</span>
            <span onClick={onGoSos} style={{ color: "var(--live)", cursor: "pointer", fontSize: 11, display: "flex", alignItems: "center", gap: 3 }}>
              View all <ChevronRight size={12} />
            </span>
          </div>
          {SOS_LIST.map((s) => {
            const meta = statusMeta(s.status);
            return (
              <div className="row-item" key={s.id}>
                <div className="avatar" style={{ width: 28, height: 28, fontSize: 11 }}>{s.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600 }}>{s.name}</div>
                  <div className="person-loc"><MapPin size={10} /> {s.location}</div>
                </div>
                <Badge type={meta.type}>{meta.label}</Badge>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
 
/* ------------------------------------------------------------------ */
/*  SOS TAB                                                             */
/* ------------------------------------------------------------------ */
function SosTab({ filter, setFilter, list, selectedId, setSelectedId, selected }) {
  const filters = ["all", "active", "unassigned", "responding", "resolved"];
  return (
    <div className="grid-2">
      <div>
        <div className="filter-bar">
          {filters.map((f) => (
            <button key={f} className={`filter-btn ${filter === f ? "active" : ""}`} onClick={() => setFilter(f)}>
              {f[0].toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
        <div className="sos-grid">
          {list.map((s, i) => {
            const meta = statusMeta(s.status);
            return (
              <div key={s.id} className={`sos-card ${selectedId === s.id ? "sel" : ""}`}
                style={{ animationDelay: `${i * 55}ms` }} onClick={() => setSelectedId(s.id)}>
                <div className="sos-head">
                  <span className="sos-id">{s.id}</span>
                  <Badge type={meta.type}>{meta.label}</Badge>
                </div>
                <div className="person-row">
                  <div className="avatar">{s.initials}</div>
                  <div>
                    <div className="person-name">{s.name}</div>
                    <div className="person-loc"><MapPin size={10} /> {s.location}</div>
                  </div>
                </div>
                <div className="stat-strip">
                  <span className="stat-mini"><Battery size={12} /> {s.battery}%</span>
                  <span className="stat-mini"><Signal size={12} /> {s.network}</span>
                  <span className="stat-mini"><Clock size={12} /> {s.lastGps}</span>
                </div>
                <div className="kv"><span className="k">Assigned responder</span><span className="v">{s.assigned}</span></div>
                <div className="kv"><span className="k">ETA</span><span className="v">{s.eta}</span></div>
                <div className="btn-row">
                  <div className="icon-btn primary"><PhoneCall size={12} /> Call</div>
                  <div className="icon-btn"><MessageSquare size={12} /> Message</div>
                  <div className="icon-btn"><UserCheck size={12} /> Assign</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
 
      <div className="drawer">
        {selected ? <IncidentDetail key={selected.id} incident={selected} /> : (
          <div className="panel" style={{ height: 300 }}><div className="empty-close"><Siren size={20} /> Select an SOS to view details</div></div>
        )}
      </div>
    </div>
  );
}
 
/* ------------------------------------------------------------------ */
/*  INCIDENT DETAIL (shared drawer)                                    */
/* ------------------------------------------------------------------ */
function IncidentDetail({ incident }) {
  const timeline = [
    { time: incident.trigger, text: "SOS triggered" },
    { time: "+3s", text: "Location received" },
    { time: "+18s", text: "Admin notified" },
    { time: "+46s", text: "Admin acknowledged" },
    { time: "+68s", text: incident.assigned !== "—" ? `Responder ${incident.assigned} assigned` : "Awaiting responder assignment" },
  ];
  return (
    <div className="panel">
      <div className="section-title" style={{ justifyContent: "space-between", display: "flex" }}>
        <span>{incident.id}</span>
        <Badge type={statusMeta(incident.status).type}>{statusMeta(incident.status).label}</Badge>
      </div>
 
      <div className="person-row">
        <div className="avatar">{incident.initials}</div>
        <div>
          <div className="person-name">{incident.name}</div>
          <div className="person-loc"><MapPin size={10} /> {incident.location}</div>
        </div>
      </div>
 
      <div className="kv"><span className="k">Age</span><span className="v">{incident.age}</span></div>
      <div className="kv"><span className="k">Emergency contact</span><span className="v">{incident.emergencyContact}</span></div>
      <div className="kv"><span className="k">Distance to responder</span><span className="v">{incident.distance}</span></div>
      <div className="kv"><span className="k">Network / battery</span><span className="v">{incident.network} · {incident.battery}%</span></div>
      <div className="kv"><span className="k">Last GPS update</span><span className="v">{incident.lastGps}</span></div>
 
      <div className="med-card">
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <Droplet size={14} color="var(--critical)" />
          <span style={{ fontWeight: 700, fontFamily: "var(--display)", fontSize: 12.5 }}>Emergency Medical Card</span>
        </div>
        <div className="kv"><span className="k">Blood group</span><span className="v">{incident.blood}</span></div>
        <div className="kv"><span className="k">Allergies</span><span className="v">{incident.allergies}</span></div>
      </div>
 
      <div style={{ marginTop: 16 }}>
        <div className="section-title" style={{ fontSize: 12 }}>Incident Timeline</div>
        <div className="timeline">
          {timeline.map((t, i) => (
            <div className="tl-item" key={i}>
              <div className="tl-dot-wrap">
                <div className="tl-dot" />
                {i < timeline.length - 1 && <div className="tl-line" />}
              </div>
              <div>
                <div className="tl-time">{t.time}</div>
                <div className="tl-text">{t.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
 
      <div className="btn-row" style={{ marginTop: 14 }}>
        <div className="icon-btn primary"><PhoneCall size={12} /> Call tourist</div>
        <div className="icon-btn"><Navigation size={12} /> Track live</div>
      </div>
    </div>
  );
}
 
/* ------------------------------------------------------------------ */
/*  RESPONDERS TAB                                                     */
/* ------------------------------------------------------------------ */
function RespondersTab() {
  return (
    <div className="panel">
      <div className="section-title"><UserCheck size={14} /> Responder Roster</div>
      <table className="tsa-table">
        <thead>
          <tr><th>Responder</th><th>Status</th><th>Location</th><th>Assigned SOS</th><th>ETA</th><th></th></tr>
        </thead>
        <tbody>
          {RESPONDERS.map((r) => (
            <tr key={r.name}>
              <td style={{ fontWeight: 600 }}>{r.name}</td>
              <td><Badge type={r.statusType}>{r.status}</Badge></td>
              <td className="mono">{r.location}</td>
              <td className="mono">{r.assigned}</td>
              <td className="mono">{r.eta}</td>
              <td style={{ color: "var(--live)", cursor: "pointer" }}>View <ChevronRight size={11} style={{ display: "inline" }} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
/* ------------------------------------------------------------------ */
/*  INCIDENTS TAB                                                      */
/* ------------------------------------------------------------------ */
function IncidentsTab({ selected, setSelectedId }) {
  return (
    <div className="grid-2">
      <div className="panel">
        <div className="section-title"><ClipboardList size={14} /> All Incidents</div>
        <table className="tsa-table">
          <thead><tr><th>ID</th><th>Tourist</th><th>Location</th><th>Trigger time</th><th>Status</th></tr></thead>
          <tbody>
            {SOS_LIST.map((s) => {
              const meta = statusMeta(s.status);
              return (
                <tr key={s.id} onClick={() => setSelectedId(s.id)} style={{ cursor: "pointer" }}>
                  <td className="mono">{s.id}</td>
                  <td style={{ fontWeight: 600 }}>{s.name}</td>
                  <td className="mono">{s.location}</td>
                  <td className="mono">{s.trigger}</td>
                  <td><Badge type={meta.type}>{meta.label}</Badge></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="drawer">{selected && <IncidentDetail key={selected.id} incident={selected} />}</div>
    </div>
  );
}
 
/* ------------------------------------------------------------------ */
/*  USERS TAB                                                          */
/* ------------------------------------------------------------------ */
function UsersTab() {
  return (
    <div className="panel">
      <div className="section-title"><Users size={14} /> Registered Tourists</div>
      <table className="tsa-table">
        <thead><tr><th>Name</th><th>Phone</th><th>Status</th><th>Trips</th><th>Last active</th><th>Registered</th></tr></thead>
        <tbody>
          {USERS.map((u) => (
            <tr key={u.name}>
              <td style={{ fontWeight: 600 }}>{u.name}</td>
              <td className="mono">{u.phone}</td>
              <td><Badge type={u.status === "Active" ? "safe" : "neutral"}>{u.status}</Badge></td>
              <td className="mono">{u.trips}</td>
              <td className="mono">{u.lastActive}</td>
              <td className="mono">{u.registered}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 
/* ------------------------------------------------------------------ */
/*  ANALYTICS TAB                                                      */
/* ------------------------------------------------------------------ */
function AnalyticsTab() {
  return (
    <div>
      <div className="two-col" style={{ marginBottom: 16 }}>
        <div className="chart-card">
          <div className="section-title"><Gauge size={14} /> Risk Distribution</div>
          <ResponsiveContainer width="100%" height={230}>
            <PieChart>
              <Pie data={RISK_DATA} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={3}>
                {RISK_DATA.map((d, i) => <Cell key={i} fill={d.color} stroke="none" />)}
              </Pie>
              <Tooltip contentStyle={{ background: "#141b23", border: "1px solid #212b36", borderRadius: 8, fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center", marginTop: 4 }}>
            {RISK_DATA.map((d) => (
              <div key={d.name} className="legend-item"><span className="legend-dot" style={{ background: d.color }} /> {d.name}</div>
            ))}
          </div>
        </div>
 
        <div className="chart-card">
          <div className="section-title"><Activity size={14} /> Incidents This Week</div>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={WEEKLY_DATA}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1a222c" vertical={false} />
              <XAxis dataKey="day" stroke="#4f5b68" fontSize={11} axisLine={false} tickLine={false} />
              <YAxis stroke="#4f5b68" fontSize={11} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#141b23", border: "1px solid #212b36", borderRadius: 8, fontSize: 12 }} />
              <Bar dataKey="incidents" fill="#22d3ee" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
 
      <div className="chart-card">
        <div className="section-title"><Clock size={14} /> Avg. Response Time Trend (minutes)</div>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={RESPONSE_TREND}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1a222c" vertical={false} />
            <XAxis dataKey="day" stroke="#4f5b68" fontSize={11} axisLine={false} tickLine={false} />
            <YAxis stroke="#4f5b68" fontSize={11} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "#141b23", border: "1px solid #212b36", borderRadius: 8, fontSize: 12 }} />
            <Line type="monotone" dataKey="mins" stroke="#2fd4a8" strokeWidth={2} dot={{ r: 3, fill: "#2fd4a8" }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
 
/* ------------------------------------------------------------------ */
/*  AUDIT TAB                                                          */
/* ------------------------------------------------------------------ */
function AuditTab() {
  return (
    <div className="panel">
      <div className="section-title"><ScrollText size={14} /> Audit Trail</div>
      <table className="tsa-table">
        <thead><tr><th>Time</th><th>Actor</th><th>Action</th></tr></thead>
        <tbody>
          {AUDIT_LOG.map((a, i) => (
            <tr key={i}>
              <td className="mono">{a.time}</td>
              <td style={{ fontWeight: 600 }}>{a.admin}</td>
              <td>{a.action}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
 





