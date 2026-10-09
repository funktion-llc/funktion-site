"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useFixMorph } from "./useFixMorph";

const WORDS = ["work", "process", "team", "ops", "sales", "hiring", "invoices", "life", "*"];
const THEMES = ["home", "services", "how", "work", "talk"] as const;
type Theme = (typeof THEMES)[number];
const PAGE: Record<Theme, string> = {
  home: "#1f3a4a",
  services: "#9b9b6b",
  how: "#e3dccb",
  work: "#46606b",
  talk: "#efe9dc",
};

export default function Home() {
  const [i, setI] = useState(0);
  const [theme, setTheme] = useState<Theme>("home");
  const fixRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => setI((n) => n + 1), 1600);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    document.body.style.background = PAGE[theme];
    document.documentElement.style.background = PAGE[theme];
  }, [theme]);

  useFixMorph();

  // Phone diagram follows your scroll, smoothed so it glides instead of jerking.
  // The drawing is a 6s timeline of CSS animations; scroll position picks the moment.
  useEffect(() => {
    const el = document.querySelector<SVGSVGElement>(".fkm-art");
    if (!el || !el.getAnimations) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const TOTAL = 6000;
    let anims: Animation[] = [];
    let q = 0;
    let raf = 0;
    const collect = () => {
      anims = el
        .getAnimations({ subtree: true })
        .filter((a) => (a as CSSAnimation).animationName !== "fk-float");
      anims.forEach((a) => {
        a.pause();
        a.currentTime = q * TOTAL;
      });
    };
    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (getComputedStyle(el).display === "none") return;
      if (!anims.length) collect();
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height * 0.9)));
      const next = q + (p - q) * 0.14;
      if (Math.abs(next - q) < 0.0004 && Math.abs(p - q) < 0.0004) return;
      q = Math.abs(p - next) < 0.0004 ? p : next;
      const t = q * TOTAL;
      for (const a of anims) a.currentTime = t;
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  const word = WORDS[i % WORDS.length];
  const pick = Object.fromEntries(THEMES.map((k) => [k, () => setTheme(k)])) as Record<Theme, () => void>;
  const cur = Object.fromEntries(THEMES.map((k) => [k, theme === k ? "page" : "false"])) as Record<Theme, "page" | "false">;
  void fixRef;

  return (
      <div className="stock fx-root" data-theme={theme} style={{background: "var(--page)", color: "var(--ink)", fontFamily: "'DM Mono', ui-monospace, monospace", fontWeight: "500", overflow: "clip"} as CSSProperties}>

        <header className="fk-tabs">
          <nav className="fk-tabs-row" aria-label="Main">
            <a className="fk-tab fk-tab--home" onClick={pick.home} aria-current={cur.home} href="#top" aria-label="funktion home"><img src="/brand/funktion-wordmark-bone.png" alt="funktion" style={{width: "132px", height: "auto", display: "block"} as CSSProperties} /></a>
            <a className="fk-tab fk-tab--a" onClick={pick.services} aria-current={cur.services} href="#services"><span className="n">02</span>services</a>
            <a className="fk-tab fk-tab--b" onClick={pick.how} aria-current={cur.how} href="#how"><span className="n">03</span><span className="lg">how we work</span><span className="sh">how</span></a>
            <a className="fk-tab fk-tab--c" onClick={pick.work} aria-current={cur.work} href="#work"><span className="n">04</span>work</a>
            <a className="fk-tab fk-tab--d" onClick={pick.talk} aria-current={cur.talk} href="#contact"><span className="n">(*)</span><span className="lg">let's talk</span><span className="sh">talk</span></a>
          </nav>
        </header>

        <section id="top" style={{maxWidth: "1320px", margin: "0 auto", padding: "48px 40px 64px"} as CSSProperties}>
          <div className="fkh-stage" style={{position: "relative", aspectRatio: "1320 / 1000"} as CSSProperties}>
            <svg className="fkh-art" viewBox="0 0 1320 1000" role="img" aria-label="Diagram: the current process, a tangle of email chains, spreadsheets, reply-alls, lost files, manual re-entry, approval limbo and unclear ownership, runs into funktion and comes out as a connected workflow: map, build, then automate and train in parallel, then run it.">
              <g fontFamily="DM Mono, monospace" fontWeight="500">
              <text x="720" y="40" fontSize="13" letterSpacing="1.5" style={{fill: "var(--muted)"} as CSSProperties}>CURRENT PROCESS</text>
              <line x1="720" y1="56" x2="1320" y2="56" style={{stroke: "var(--rule)"} as CSSProperties} strokeWidth="1" />
              <text x="545" y="700" fontSize="13" letterSpacing="1.5" style={{fill: "var(--accent)"} as CSSProperties}>WITH FUNKTION</text>
              <line x1="545" y1="714" x2="700" y2="714" style={{stroke: "var(--rule)"} as CSSProperties} strokeWidth="1" />
              <path className="fkd-wire fkd-w0" pathLength="1" d="M380 760 H545" fill="none" style={{stroke: "var(--line)"} as CSSProperties} strokeWidth="4" strokeLinejoin="miter" />
              <path className="fkd-wire fkd-w1" pathLength="1" d="M695 760 H730 V680 H765" fill="none" style={{stroke: "var(--line)"} as CSSProperties} strokeWidth="4" strokeLinejoin="miter" />
              <path className="fkd-wire fkd-w2" pathLength="1" d="M915 680 H950 V600 H985" fill="none" style={{stroke: "var(--line)"} as CSSProperties} strokeWidth="4" strokeLinejoin="miter" />
              <path className="fkd-wire fkd-w3" pathLength="1" d="M915 680 H950 V760 H985" fill="none" style={{stroke: "var(--line)"} as CSSProperties} strokeWidth="4" strokeLinejoin="miter" />
              <path className="fkd-wire fkd-w4" pathLength="1" d="M1135 600 H1220 V548" fill="none" style={{stroke: "var(--line)"} as CSSProperties} strokeWidth="4" strokeLinejoin="miter" />
              <path className="fkd-wire fkd-w5" pathLength="1" d="M1135 760 H1220 V600" fill="none" style={{stroke: "var(--line)"} as CSSProperties} strokeWidth="4" strokeLinejoin="miter" />
              <path className="fkd-tangle" pathLength="1" d="M1262 292 C1258 330 1245 377 1222 366 C1200 355 1234 156 1206 133 C1178 109 1086 222 1056 224 C1026 227 1058 144 1025 145 C992 146 882 215 856 230 C830 245 884 249 871 233 C857 217 732 135 772 133 C813 132 1074 195 1115 224 C1156 253 1046 325 1016 308 C987 292 917 132 939 126 C962 119 1127 244 1152 269 C1176 294 1073 288 1089 278 C1105 267 1237 219 1245 208 C1254 197 1173 196 1140 210 C1107 223 1083 301 1046 288 C1009 276 925 131 917 133 C909 136 974 288 997 304 C1020 320 1041 255 1055 231 C1069 207 1116 165 1081 159 C1047 154 835 197 849 197 C864 198 1173 173 1168 163 C1163 153 882 133 817 137 C752 140 741 152 779 184 C818 217 1013 294 1046 332 C1080 369 1021 387 980 410 C939 433 862 445 800 470 C738 495 665 527 610 560 C555 593 508 637 470 670 C432 703 395 745 380 760" fill="none" stroke="#0e1a22" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" transform="translate(5 4)" />
              <path className="fkd-tangle" pathLength="1" d="M1262 292 C1258 330 1245 377 1222 366 C1200 355 1234 156 1206 133 C1178 109 1086 222 1056 224 C1026 227 1058 144 1025 145 C992 146 882 215 856 230 C830 245 884 249 871 233 C857 217 732 135 772 133 C813 132 1074 195 1115 224 C1156 253 1046 325 1016 308 C987 292 917 132 939 126 C962 119 1127 244 1152 269 C1176 294 1073 288 1089 278 C1105 267 1237 219 1245 208 C1254 197 1173 196 1140 210 C1107 223 1083 301 1046 288 C1009 276 925 131 917 133 C909 136 974 288 997 304 C1020 320 1041 255 1055 231 C1069 207 1116 165 1081 159 C1047 154 835 197 849 197 C864 198 1173 173 1168 163 C1163 153 882 133 817 137 C752 140 741 152 779 184 C818 217 1013 294 1046 332 C1080 369 1021 387 980 410 C939 433 862 445 800 470 C738 495 665 527 610 560 C555 593 508 637 470 670 C432 703 395 745 380 760" fill="none" style={{stroke: "var(--accent)"} as CSSProperties} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
              <g className="fkd-dot"><circle cx="1267" cy="296" r="9" fill="#0e1a22" /><circle cx="1262" cy="292" r="9" style={{fill: "var(--accent)"} as CSSProperties} /></g>
              <g transform="translate(700 96) rotate(-5)"><g className="fkd-drift" style={{"--dx": "-3px", "--dy": "2px", "--dr": "2deg", "--fd": "6.6s", "--fdl": "-2.3s"} as CSSProperties}><g className="fkd-pop" style={{"--d": "1.00s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="16">email chains</text><line className="fkd-strike" pathLength="1" x1="-4" y1="-5.1" x2="119" y2="-5.1" style={{stroke: "var(--accent)", animationDelay: "6.90s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
              <g transform="translate(905 90) rotate(3)"><g className="fkd-drift" style={{"--dx": "4px", "--dy": "-2px", "--dr": "-3deg", "--fd": "5.3s", "--fdl": "-4.6s"} as CSSProperties}><g className="fkd-pop" style={{"--d": "2.56s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="14">per my last email</text><line className="fkd-strike" pathLength="1" x1="-4" y1="-4.5" x2="147" y2="-4.5" style={{stroke: "var(--accent)", animationDelay: "6.95s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
              <g transform="translate(1150 104) rotate(6)"><g className="fkd-drift" style={{"--dx": "-5px", "--dy": "-2px", "--dr": "4deg", "--fd": "6.7s", "--fdl": "-1.9s"} as CSSProperties}><g className="fkd-pop" style={{"--d": "1.26s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="16">spreadsheets</text><line className="fkd-strike" pathLength="1" x1="-4" y1="-5.1" x2="119" y2="-5.1" style={{stroke: "var(--accent)", animationDelay: "7.00s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
              <g transform="translate(1226 182) rotate(-7)"><g className="fkd-drift" style={{"--dx": "6px", "--dy": "2px", "--dr": "-5deg", "--fd": "5.5s", "--fdl": "-4.2s"} as CSSProperties}><g className="fkd-pop" style={{"--d": "2.04s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="15">reply all</text><line className="fkd-strike" pathLength="1" x1="-4" y1="-4.8" x2="85" y2="-4.8" style={{stroke: "var(--accent)", animationDelay: "7.05s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
              <g transform="translate(676 200) rotate(-9)"><g className="fkd-drift" style={{"--dx": "-7px", "--dy": "-2px", "--dr": "2deg", "--fd": "6.9s", "--fdl": "-1.5s"} as CSSProperties}><g className="fkd-pop" style={{"--d": "3.34s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="14">sticky notes</text><line className="fkd-strike" pathLength="1" x1="-4" y1="-4.5" x2="105" y2="-4.5" style={{stroke: "var(--accent)", animationDelay: "7.10s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
              <g transform="translate(935 252) rotate(-4)"><g className="fkd-drift" style={{"--dx": "8px", "--dy": "-2px", "--dr": "-3deg", "--fd": "5.6s", "--fdl": "-3.8s"} as CSSProperties}><g className="fkd-pop" style={{"--d": "1.52s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="14">final_v7_real.xlsx</text><line className="fkd-strike" pathLength="1" x1="-4" y1="-4.5" x2="155" y2="-4.5" style={{stroke: "var(--accent)", animationDelay: "7.15s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
              <g transform="translate(680 304) rotate(5)"><g className="fkd-drift" style={{"--dx": "-3px", "--dy": "2px", "--dr": "4deg", "--fd": "7.0s", "--fdl": "-1.1s"} as CSSProperties}><g className="fkd-pop" style={{"--d": "3.08s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="15">approval limbo</text><line className="fkd-strike" pathLength="1" x1="-4" y1="-4.8" x2="130" y2="-4.8" style={{stroke: "var(--accent)", animationDelay: "7.20s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
              <g transform="translate(1110 236) rotate(7)"><g className="fkd-drift" style={{"--dx": "4px", "--dy": "-2px", "--dr": "-5deg", "--fd": "5.8s", "--fdl": "-3.4s"} as CSSProperties}><g className="fkd-pop" style={{"--d": "3.86s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="13">logins everywhere</text><line className="fkd-strike" pathLength="1" x1="-4" y1="-4.2" x2="137" y2="-4.2" style={{stroke: "var(--accent)", animationDelay: "7.25s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
              <g transform="translate(820 374) rotate(-3)"><g className="fkd-drift" style={{"--dx": "-5px", "--dy": "-2px", "--dr": "2deg", "--fd": "7.1s", "--fdl": "-0.7s"} as CSSProperties}><g className="fkd-pop" style={{"--d": "1.78s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="14">it&#8217;s in someone&#8217;s head</text><line className="fkd-strike" pathLength="1" x1="-4" y1="-4.5" x2="189" y2="-4.5" style={{stroke: "var(--accent)", animationDelay: "7.30s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
              <g transform="translate(690 440) rotate(-4)"><g className="fkd-drift" style={{"--dx": "6px", "--dy": "2px", "--dr": "-3deg", "--fd": "5.9s", "--fdl": "-3.0s"} as CSSProperties}><g className="fkd-pop" style={{"--d": "3.60s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="16">copy / paste</text><line className="fkd-strike" pathLength="1" x1="-4" y1="-5.1" x2="119" y2="-5.1" style={{stroke: "var(--accent)", animationDelay: "7.35s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
              <g transform="translate(1050 452) rotate(4)"><g className="fkd-drift" style={{"--dx": "-7px", "--dy": "-2px", "--dr": "4deg", "--fd": "7.3s", "--fdl": "-0.3s"} as CSSProperties}><g className="fkd-pop" style={{"--d": "2.30s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="16">who owns this?</text><line className="fkd-strike" pathLength="1" x1="-4" y1="-5.1" x2="138" y2="-5.1" style={{stroke: "var(--accent)", animationDelay: "7.40s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
              <g transform="translate(880 504) rotate(-6)"><g className="fkd-drift" style={{"--dx": "8px", "--dy": "-2px", "--dr": "-5deg", "--fd": "6.0s", "--fdl": "-2.6s"} as CSSProperties}><g className="fkd-pop" style={{"--d": "4.38s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="14">manual re-entry</text><line className="fkd-strike" pathLength="1" x1="-4" y1="-4.5" x2="130" y2="-4.5" style={{stroke: "var(--accent)", animationDelay: "7.45s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
              <g transform="translate(1165 388) rotate(-5)"><g className="fkd-drift" style={{"--dx": "-3px", "--dy": "2px", "--dr": "2deg", "--fd": "7.4s", "--fdl": "-4.9s"} as CSSProperties}><g className="fkd-pop" style={{"--d": "2.82s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="13">where&#8217;s that file?</text><line className="fkd-strike" pathLength="1" x1="-4" y1="-4.2" x2="144" y2="-4.2" style={{stroke: "var(--accent)", animationDelay: "7.50s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
              <g transform="translate(860 564) rotate(6)"><g className="fkd-drift" style={{"--dx": "4px", "--dy": "-2px", "--dr": "-3deg", "--fd": "6.2s", "--fdl": "-2.2s"} as CSSProperties}><g className="fkd-pop" style={{"--d": "4.12s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="14">3 tools, 1 job</text><line className="fkd-strike" pathLength="1" x1="-4" y1="-4.5" x2="122" y2="-4.5" style={{stroke: "var(--accent)", animationDelay: "7.55s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
              <g className="fkd-stamp"><g className="fkd-spin">
              <path fill="#0e1a22" transform="translate(388 767) rotate(14) scale(0.44 -0.44) translate(-247 -519.5)" d="M315 324 248 440 180 323 83 393 172 494 40 522 77 636 201 582 187 716H307L293 582L417 636L454 522L323 494L412 395Z" />
              <path style={{fill: "var(--accent)"} as CSSProperties} transform="translate(380 760) rotate(14) scale(0.44 -0.44) translate(-247 -519.5)" d="M315 324 248 440 180 323 83 393 172 494 40 522 77 636 201 582 187 716H307L293 582L417 636L454 522L323 494L412 395Z" />
              </g></g>
              <text className="fkd-cap" x="380" y="900" textAnchor="middle" fontSize="13" letterSpacing="1" style={{fill: "var(--muted)"} as CSSProperties}>f(*) / the function for your process</text>
              <g className="fkd-step fkd-n0">
              <rect x="545" y="732" width="150" height="56" style={{fill: "var(--tag)"} as CSSProperties} />
              <text x="557" y="752" fontSize="11" letterSpacing="1" style={{fill: "var(--tagnum)"} as CSSProperties}>01</text>
              <text x="557" y="776" fontSize="20" letterSpacing="-0.5" style={{fill: "var(--tagink)"} as CSSProperties}>map</text>
              <text x="545" y="808" fontSize="12" style={{fill: "var(--muted)"} as CSSProperties}>find what to fix</text>
              </g>
              <g className="fkd-step fkd-n1">
              <rect x="765" y="652" width="150" height="56" style={{fill: "var(--tag)"} as CSSProperties} />
              <text x="777" y="672" fontSize="11" letterSpacing="1" style={{fill: "var(--tagnum)"} as CSSProperties}>02</text>
              <text x="777" y="696" fontSize="20" letterSpacing="-0.5" style={{fill: "var(--tagink)"} as CSSProperties}>build</text>
              <text x="765" y="728" fontSize="12" style={{fill: "var(--muted)"} as CSSProperties}>ship the tools</text>
              </g>
              <g className="fkd-step fkd-n2">
              <rect x="985" y="572" width="150" height="56" style={{fill: "var(--tag)"} as CSSProperties} />
              <text x="997" y="592" fontSize="11" letterSpacing="1" style={{fill: "var(--tagnum)"} as CSSProperties}>03</text>
              <text x="997" y="616" fontSize="20" letterSpacing="-0.5" style={{fill: "var(--tagink)"} as CSSProperties}>automate</text>
              <text x="985" y="648" fontSize="12" style={{fill: "var(--muted)"} as CSSProperties}>wire it together</text>
              </g>
              <g className="fkd-step fkd-n3">
              <rect x="985" y="732" width="150" height="56" style={{fill: "var(--tag)"} as CSSProperties} />
              <text x="997" y="752" fontSize="11" letterSpacing="1" style={{fill: "var(--tagnum)"} as CSSProperties}>04</text>
              <text x="997" y="776" fontSize="20" letterSpacing="-0.5" style={{fill: "var(--tagink)"} as CSSProperties}>train</text>
              <text x="985" y="808" fontSize="12" style={{fill: "var(--muted)"} as CSSProperties}>make the team AI native</text>
              </g>
              <g className="fkd-step fkd-n4">
              <rect x="1145" y="492" width="150" height="56" style={{fill: "var(--accent)"} as CSSProperties} />
              <text x="1157" y="512" fontSize="11" letterSpacing="1" style={{fill: "var(--accentink)"} as CSSProperties}>05</text>
              <text x="1157" y="536" fontSize="20" letterSpacing="-0.5" style={{fill: "var(--accentink)"} as CSSProperties}>run it</text>
              <text x="1145" y="480" fontSize="12" style={{fill: "var(--muted)"} as CSSProperties}>your team owns it</text>
              </g>
              </g></svg>
          <div style={{position: "relative", maxWidth: "620px", display: "flex", flexDirection: "column", gap: "28px"} as CSSProperties}>
            <p style={{margin: "0", fontSize: "13px", letterSpacing: "0.1em", color: "var(--muted)"} as CSSProperties}>business + tech consulting / est. 2026</p>
            <h1 className="fx-hero-h1" aria-label="f of anything: work, process, team, life" style={{margin: "0", fontSize: "7.5rem", lineHeight: "0.9", letterSpacing: "-0.06em", fontWeight: "500", whiteSpace: "nowrap"} as CSSProperties}>f(<span style={{color: "var(--accent)"} as CSSProperties}>{word}</span>)</h1>
            <p style={{margin: "0", fontSize: "2.5rem", lineHeight: "1", letterSpacing: "-0.04em"} as CSSProperties}>make your business AI native.</p>
            <p style={{margin: "0", maxWidth: "460px", fontSize: "17px", lineHeight: "1.6", fontWeight: "400", color: "var(--muted)"} as CSSProperties}>Consulting plus custom software and workflow builds. We find where AI fits, build what uses it, and train your people to run it themselves.</p>
            <div style={{display: "flex", flexWrap: "wrap", gap: "20px", alignItems: "center"} as CSSProperties}>
              <a href="mailto:hello@funktion.work?subject=Working%20session" style={{display: "inline-flex", alignItems: "center", minHeight: "48px", padding: "0 28px", background: "var(--btn)", color: "var(--btnink)", textDecoration: "none", fontSize: "15px"} as CSSProperties}>book a working session</a>
              <a href="#how" style={{fontSize: "15px", textUnderlineOffset: "6px", textDecorationThickness: "2px"} as CSSProperties}>how we work</a>
            </div>
          </div>
            <svg className="fkm-art" viewBox="0 0 360 1090" role="img" aria-label="Diagram: the current process, a tangle of email chains, spreadsheets, reply-alls, lost files, manual re-entry, approval limbo and unclear ownership, runs into funktion and comes out as a connected workflow: map, build, then automate and train in parallel, then run it.">
            <g fontFamily="DM Mono, monospace" fontWeight="500">
            <text x="0" y="16" fontSize="12" letterSpacing="1.5" style={{fill: "var(--muted)"} as CSSProperties}>CURRENT PROCESS</text>
            <line x1="0" y1="28" x2="360" y2="28" style={{stroke: "var(--rule)"} as CSSProperties} strokeWidth="1" />
            <text x="0" y="640" fontSize="12" letterSpacing="1.5" style={{fill: "var(--accent)"} as CSSProperties}>WITH FUNKTION</text>
            <line x1="0" y1="652" x2="360" y2="652" style={{stroke: "var(--rule)"} as CSSProperties} strokeWidth="1" />
            <path className="fkm-draw fkm-w0" pathLength="1" d="M180 500 V676" fill="none" style={{stroke: "var(--line)"} as CSSProperties} strokeWidth="4" />
            <path className="fkm-draw fkm-w1" pathLength="1" d="M180 732 V770" fill="none" style={{stroke: "var(--line)"} as CSSProperties} strokeWidth="4" />
            <path className="fkm-draw fkm-w2" pathLength="1" d="M180 826 V842 H95 V864" fill="none" style={{stroke: "var(--line)"} as CSSProperties} strokeWidth="4" />
            <path className="fkm-draw fkm-w3" pathLength="1" d="M180 826 V842 H265 V864" fill="none" style={{stroke: "var(--line)"} as CSSProperties} strokeWidth="4" />
            <path className="fkm-draw fkm-w4" pathLength="1" d="M95 920 V940 H180 V968" fill="none" style={{stroke: "var(--line)"} as CSSProperties} strokeWidth="4" />
            <path className="fkm-draw fkm-w5" pathLength="1" d="M265 920 V940 H180" fill="none" style={{stroke: "var(--line)"} as CSSProperties} strokeWidth="4" />
            <path className="fkm-draw fkm-tangle" pathLength="1" d="M14 156 C10 132 6 98 24 108 C50 125 139 251 146 251 C152 251 73 105 64 108 C56 111 94 243 94 269 C95 296 44 291 67 265 C90 239 211 126 232 114 C253 102 205 156 191 192 C178 228 176 347 152 329 C128 311 22 110 50 85 C78 60 315 168 321 181 C326 194 114 140 84 163 C53 186 136 324 137 319 C137 314 76 151 87 134 C99 117 168 191 207 217 C247 243 337 304 325 290 C313 275 140 125 134 131 C128 137 305 305 288 327 C270 349 28 278 30 264 C31 250 288 240 298 243 C308 245 101 256 90 279 C79 302 212 353 230 380 C248 407 208 420 200 440 C192 460 183 490 180 500" fill="none" stroke="#0e1a22" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" transform="translate(4 3)" />
            <path className="fkm-draw fkm-tangle" pathLength="1" d="M14 156 C10 132 6 98 24 108 C50 125 139 251 146 251 C152 251 73 105 64 108 C56 111 94 243 94 269 C95 296 44 291 67 265 C90 239 211 126 232 114 C253 102 205 156 191 192 C178 228 176 347 152 329 C128 311 22 110 50 85 C78 60 315 168 321 181 C326 194 114 140 84 163 C53 186 136 324 137 319 C137 314 76 151 87 134 C99 117 168 191 207 217 C247 243 337 304 325 290 C313 275 140 125 134 131 C128 137 305 305 288 327 C270 349 28 278 30 264 C31 250 288 240 298 243 C308 245 101 256 90 279 C79 302 212 353 230 380 C248 407 208 420 200 440 C192 460 183 490 180 500" fill="none" style={{stroke: "var(--accent)"} as CSSProperties} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="18" cy="159" r="7" fill="#0e1a22" /><circle cx="14" cy="156" r="7" style={{fill: "var(--accent)"} as CSSProperties} />
            <g transform="translate(16 66) rotate(-4)"><g className="fkm-drift" style={{"--dx": "-2px", "--dy": "2px", "--dr": "2deg", "--fd": "7.6s", "--fdl": "-4.5s"} as CSSProperties}><g className="fkm-pop" style={{"--a": "0.15s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="15">email chains</text><line className="fkm-draw fkm-strike" pathLength="1" x1="-4" y1="-4.8" x2="112" y2="-4.8" style={{stroke: "var(--accent)", "--de": "5.00s", "--du": ".3s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
            <g transform="translate(150 56) rotate(3)"><g className="fkm-drift" style={{"--dx": "5px", "--dy": "-3px", "--dr": "-3deg", "--fd": "6.3s", "--fdl": "-1.8s"} as CSSProperties}><g className="fkm-pop" style={{"--a": "1.01s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="14">per my last email</text><line className="fkm-draw fkm-strike" pathLength="1" x1="-4" y1="-4.5" x2="147" y2="-4.5" style={{stroke: "var(--accent)", "--de": "5.07s", "--du": ".3s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
            <g transform="translate(238 98) rotate(6)"><g className="fkm-drift" style={{"--dx": "-4px", "--dy": "-4px", "--dr": "4deg", "--fd": "7.7s", "--fdl": "-4.1s"} as CSSProperties}><g className="fkm-pop" style={{"--a": "0.32s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="15">spreadsheets</text><line className="fkm-draw fkm-strike" pathLength="1" x1="-4" y1="-4.8" x2="112" y2="-4.8" style={{stroke: "var(--accent)", "--de": "5.14s", "--du": ".3s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
            <g transform="translate(282 148) rotate(-6)"><g className="fkm-drift" style={{"--dx": "3px", "--dy": "5px", "--dr": "-5deg", "--fd": "6.5s", "--fdl": "-1.4s"} as CSSProperties}><g className="fkm-pop" style={{"--a": "0.67s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="14">reply all</text><line className="fkm-draw fkm-strike" pathLength="1" x1="-4" y1="-4.5" x2="80" y2="-4.5" style={{stroke: "var(--accent)", "--de": "5.21s", "--du": ".3s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
            <g transform="translate(14 222) rotate(-8)"><g className="fkm-drift" style={{"--dx": "-2px", "--dy": "-2px", "--dr": "2deg", "--fd": "5.2s", "--fdl": "-3.7s"} as CSSProperties}><g className="fkm-pop" style={{"--a": "1.36s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="14">sticky notes</text><line className="fkm-draw fkm-strike" pathLength="1" x1="-4" y1="-4.5" x2="105" y2="-4.5" style={{stroke: "var(--accent)", "--de": "5.28s", "--du": ".3s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
            <g transform="translate(112 178) rotate(-4)"><g className="fkm-drift" style={{"--dx": "5px", "--dy": "-3px", "--dr": "-3deg", "--fd": "6.6s", "--fdl": "-1.0s"} as CSSProperties}><g className="fkm-pop" style={{"--a": "0.49s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="14">final_v7_real.xlsx</text><line className="fkm-draw fkm-strike" pathLength="1" x1="-4" y1="-4.5" x2="155" y2="-4.5" style={{stroke: "var(--accent)", "--de": "5.35s", "--du": ".3s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
            <g transform="translate(210 262) rotate(5)"><g className="fkm-drift" style={{"--dx": "-4px", "--dy": "4px", "--dr": "4deg", "--fd": "5.4s", "--fdl": "-3.3s"} as CSSProperties}><g className="fkm-pop" style={{"--a": "1.53s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="14">approval limbo</text><line className="fkm-draw fkm-strike" pathLength="1" x1="-4" y1="-4.5" x2="122" y2="-4.5" style={{stroke: "var(--accent)", "--de": "5.42s", "--du": ".3s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
            <g transform="translate(204 296) rotate(4)"><g className="fkm-drift" style={{"--dx": "3px", "--dy": "-5px", "--dr": "-5deg", "--fd": "6.7s", "--fdl": "-0.6s"} as CSSProperties}><g className="fkm-pop" style={{"--a": "1.88s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="14">where&#8217;s that file?</text><line className="fkm-draw fkm-strike" pathLength="1" x1="-4" y1="-4.5" x2="155" y2="-4.5" style={{stroke: "var(--accent)", "--de": "5.49s", "--du": ".3s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
            <g transform="translate(14 334) rotate(-4)"><g className="fkm-drift" style={{"--dx": "-2px", "--dy": "-2px", "--dr": "2deg", "--fd": "5.5s", "--fdl": "-2.9s"} as CSSProperties}><g className="fkm-pop" style={{"--a": "0.84s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="14">it&#8217;s in someone&#8217;s head</text><line className="fkm-draw fkm-strike" pathLength="1" x1="-4" y1="-4.5" x2="189" y2="-4.5" style={{stroke: "var(--accent)", "--de": "5.56s", "--du": ".3s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
            <g transform="translate(84 388) rotate(-7)"><g className="fkm-drift" style={{"--dx": "5px", "--dy": "3px", "--dr": "-3deg", "--fd": "6.9s", "--fdl": "-0.2s"} as CSSProperties}><g className="fkm-pop" style={{"--a": "1.70s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="15">copy / paste</text><line className="fkm-draw fkm-strike" pathLength="1" x1="-4" y1="-4.8" x2="112" y2="-4.8" style={{stroke: "var(--accent)", "--de": "5.63s", "--du": ".3s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
            <g transform="translate(226 394) rotate(4)"><g className="fkm-drift" style={{"--dx": "-4px", "--dy": "-4px", "--dr": "4deg", "--fd": "5.6s", "--fdl": "-2.5s"} as CSSProperties}><g className="fkm-pop" style={{"--a": "1.19s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="15">who owns this?</text><line className="fkm-draw fkm-strike" pathLength="1" x1="-4" y1="-4.8" x2="130" y2="-4.8" style={{stroke: "var(--accent)", "--de": "5.70s", "--du": ".3s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
            <g transform="translate(226 214) rotate(-6)"><g className="fkm-drift" style={{"--dx": "3px", "--dy": "-5px", "--dr": "-5deg", "--fd": "7.0s", "--fdl": "-4.8s"} as CSSProperties}><g className="fkm-pop" style={{"--a": "2.05s"} as CSSProperties}><text className="fk-pain" x="0" y="0" fontSize="14">manual re-entry</text><line className="fkm-draw fkm-strike" pathLength="1" x1="-4" y1="-4.5" x2="130" y2="-4.5" style={{stroke: "var(--accent)", "--de": "5.77s", "--du": ".3s"} as CSSProperties} strokeWidth="2.5" /></g></g></g>
            <g className="fkm-stamp"><g className="fkd-spin">
            <path fill="#0e1a22" transform="translate(186 506) rotate(14) scale(0.34 -0.34) translate(-247 -519.5)" d="M315 324 248 440 180 323 83 393 172 494 40 522 77 636 201 582 187 716H307L293 582L417 636L454 522L323 494L412 395Z" />
            <path style={{fill: "var(--accent)"} as CSSProperties} transform="translate(180 500) rotate(14) scale(0.34 -0.34) translate(-247 -519.5)" d="M315 324 248 440 180 323 83 393 172 494 40 522 77 636 201 582 187 716H307L293 582L417 636L454 522L323 494L412 395Z" />
            </g></g>
            <g className="fkm-step fkm-n0"><rect x="108" y="676" width="144" height="56" style={{fill: "var(--tag)"} as CSSProperties} />
            <text x="120" y="696" fontSize="11" letterSpacing="1" style={{fill: "var(--tagnum)"} as CSSProperties}>01</text>
            <text x="120" y="720" fontSize="19" letterSpacing="-0.5" style={{fill: "var(--tagink)"} as CSSProperties}>map</text>
      
            </g>
            <g className="fkm-step fkm-n1"><rect x="108" y="770" width="144" height="56" style={{fill: "var(--tag)"} as CSSProperties} />
            <text x="120" y="790" fontSize="11" letterSpacing="1" style={{fill: "var(--tagnum)"} as CSSProperties}>02</text>
            <text x="120" y="814" fontSize="19" letterSpacing="-0.5" style={{fill: "var(--tagink)"} as CSSProperties}>build</text>
      
            </g>
            <g className="fkm-step fkm-n2"><rect x="23" y="864" width="144" height="56" style={{fill: "var(--tag)"} as CSSProperties} />
            <text x="35" y="884" fontSize="11" letterSpacing="1" style={{fill: "var(--tagnum)"} as CSSProperties}>03</text>
            <text x="35" y="908" fontSize="19" letterSpacing="-0.5" style={{fill: "var(--tagink)"} as CSSProperties}>automate</text>
            </g>
            <g className="fkm-step fkm-n3"><rect x="193" y="864" width="144" height="56" style={{fill: "var(--tag)"} as CSSProperties} />
            <text x="205" y="884" fontSize="11" letterSpacing="1" style={{fill: "var(--tagnum)"} as CSSProperties}>04</text>
            <text x="205" y="908" fontSize="19" letterSpacing="-0.5" style={{fill: "var(--tagink)"} as CSSProperties}>train</text>
            </g>
            <g className="fkm-step fkm-n4"><rect x="108" y="968" width="144" height="56" style={{fill: "var(--accent)"} as CSSProperties} />
            <text x="120" y="988" fontSize="11" letterSpacing="1" style={{fill: "var(--accentink)"} as CSSProperties}>05</text>
            <text x="120" y="1012" fontSize="19" letterSpacing="-0.5" style={{fill: "var(--accentink)"} as CSSProperties}>run it</text>
            <text x="108" y="1042" fontSize="11" style={{fill: "var(--muted)"} as CSSProperties}>your team owns it</text>
            </g>
            </g></svg>
          </div>
        </section>

        <section className="fx-ticker" aria-label="Things we find the function for">
          <div className="fx-track"><span>f(work)</span><span className="ast" aria-hidden="true">*</span><span>f(process)</span><span className="ast" aria-hidden="true">*</span><span>f(team)</span><span className="ast" aria-hidden="true">*</span><span>f(ops)</span><span className="ast" aria-hidden="true">*</span><span>f(sales)</span><span className="ast" aria-hidden="true">*</span><span>f(hiring)</span><span className="ast" aria-hidden="true">*</span><span>f(invoices)</span><span className="ast" aria-hidden="true">*</span><span>f(onboarding)</span><span className="ast" aria-hidden="true">*</span><span>f(reporting)</span><span className="ast" aria-hidden="true">*</span><span>f(life)</span><span className="ast" aria-hidden="true">*</span><span className="fx-dup" aria-hidden="true" style={{display: "contents"} as CSSProperties}><span>f(work)</span><span className="ast" aria-hidden="true">*</span><span>f(process)</span><span className="ast" aria-hidden="true">*</span><span>f(team)</span><span className="ast" aria-hidden="true">*</span><span>f(ops)</span><span className="ast" aria-hidden="true">*</span><span>f(sales)</span><span className="ast" aria-hidden="true">*</span><span>f(hiring)</span><span className="ast" aria-hidden="true">*</span><span>f(invoices)</span><span className="ast" aria-hidden="true">*</span><span>f(onboarding)</span><span className="ast" aria-hidden="true">*</span><span>f(reporting)</span><span className="ast" aria-hidden="true">*</span><span>f(life)</span><span className="ast" aria-hidden="true">*</span></span></div>
        </section>

        <section id="services" className="fx-wrap">
          <div className="fx-head">
            <h2>services</h2>
            <p>four folders / pull one out</p>
          </div>
          <div className="fx-folders">
            <a className="fx-folder" href="#contact" style={{"--back": "#7e7e54", "--front": "#9b9b6b", "--ink": "#0e1a22"} as CSSProperties}>
              <span className="fx-folder__tab"><span className="n">01</span>consulting</span>
              <span className="fx-folder__back"></span>
              <span className="fx-folder__sheet2" aria-hidden="true"></span>
              <span className="fx-folder__sheet"><span className="fx-lbl">you leave with</span>a ranked map of where AI saves time or makes money, and the order to do it in</span>
              <span className="fx-folder__front">
                <span className="fx-folder__title">where AI fits</span>
                <span className="fx-folder__desc">We sit with your team, find the work AI should take, and rank it by payoff.</span>
                <span className="fx-folder__open">open the file &#8599;</span>
              </span>
            </a>
            <a className="fx-folder" href="#contact" style={{"--back": "#cfc7b2", "--front": "#e3dccb", "--ink": "#0e1a22"} as CSSProperties}>
              <span className="fx-folder__tab"><span className="n">02</span>software</span>
              <span className="fx-folder__back"></span>
              <span className="fx-folder__sheet2" aria-hidden="true"></span>
              <span className="fx-folder__sheet"><span className="fx-lbl">you leave with</span>a working tool your team uses on day one, shipped and supported</span>
              <span className="fx-folder__front">
                <span className="fx-folder__title">custom builds</span>
                <span className="fx-folder__desc">Apps and internal tools, designed around how your people already work.</span>
                <span className="fx-folder__open">open the file &#8599;</span>
              </span>
            </a>
            <a className="fx-folder" href="#contact" style={{"--back": "#364d56", "--front": "#46606b", "--ink": "#efe9dc"} as CSSProperties}>
              <span className="fx-folder__tab"><span className="n">03</span>workflows</span>
              <span className="fx-folder__back"></span>
              <span className="fx-folder__sheet2" aria-hidden="true"></span>
              <span className="fx-folder__sheet"><span className="fx-lbl">you leave with</span>a cleaner process, automated where it counts, written down so it sticks</span>
              <span className="fx-folder__front">
                <span className="fx-folder__title">process, rebuilt</span>
                <span className="fx-folder__desc">The messy handoffs mapped, simplified and automated where it pays.</span>
                <span className="fx-folder__open">open the file &#8599;</span>
              </span>
            </a>
            <a className="fx-folder" href="#contact" style={{"--back": "#050c11", "--front": "#0e1a22", "--ink": "#efe9dc"} as CSSProperties}>
              <span className="fx-folder__tab"><span className="n">04</span>(*) ai native</span>
              <span className="fx-folder__back"></span>
              <span className="fx-folder__sheet2" aria-hidden="true"></span>
              <span className="fx-folder__sheet"><span className="fx-lbl">you leave with</span>a team that uses AI every day, with the guardrails to run it without us</span>
              <span className="fx-folder__front">
                <span className="fx-folder__title">AI native</span>
                <span className="fx-folder__desc">Hands-on training so AI becomes a habit, not a pilot.</span>
                <span className="fx-folder__open">open the file &#8599;</span><svg className="fx-folder__mark" viewBox="0 0 120 120" aria-hidden="true"><path fill="#9b9b6b" transform="translate(60 60) rotate(14) scale(0.26 -0.26) translate(-247 -519.5)" d="M315 324 248 440 180 323 83 393 172 494 40 522 77 636 201 582 187 716H307L293 582L417 636L454 522L323 494L412 395Z" /></svg>
              </span>
            </a>
          </div>
        </section>

        <section id="how" className="fx-wrap fx-how">
          <div className="fx-how__intro">
            <p className="fx-kicker">how we work</p>
            <h2>in the room, then in the build.</h2>
            <p className="fx-how__note">Four steps, every time. Short loops, real software, no decks that sit in a drawer.</p>
          </div>
          <ol className="fx-steps">
              <li><span className="fx-tagbox"><span className="n">01</span>listen</span><span className="fx-step__desc">Sit with your team and watch the real work. Find where the hours go.</span></li>
              <li><span className="fx-tagbox"><span className="n">02</span>map</span><span className="fx-step__desc">Pick the few changes that matter most. Agree on what done looks like.</span></li>
              <li><span className="fx-tagbox"><span className="n">03</span>build</span><span className="fx-step__desc">Ship the app, the automation or the new process in short loops you can see.</span></li>
              <li><span className="fx-tagbox fx-tagbox--last"><span className="n">04</span>hand off</span><span className="fx-step__desc">Train the people who will own it, write it down, and step back.</span></li>
          </ol>
        </section>

        <section className="fx-band">
          <div className="fx-band__inner">
            <p className="fx-band__quote">no decks that sit in a drawer.<br /><span>every engagement ships something that works.</span></p>
            <div className="fx-stampwrap" aria-hidden="true">
              <div className="fx-stamp fx-stamp--key"><svg viewBox="0 0 60 60"><path style={{fill: "currentColor"} as CSSProperties} transform="translate(30 30) rotate(0) scale(0.13 -0.13) translate(-247 -519.5)" d="M315 324 248 440 180 323 83 393 172 494 40 522 77 636 201 582 187 716H307L293 582L417 636L454 522L323 494L412 395Z" /></svg>SHIPPED</div>
              <div className="fx-stamp fx-stamp--ink"><svg viewBox="0 0 60 60"><path style={{fill: "currentColor"} as CSSProperties} transform="translate(30 30) rotate(0) scale(0.13 -0.13) translate(-247 -519.5)" d="M315 324 248 440 180 323 83 393 172 494 40 522 77 636 201 582 187 716H307L293 582L417 636L454 522L323 494L412 395Z" /></svg>SHIPPED</div>
            </div>
          </div>
        </section>

        <section id="work" className="fx-wrap">
          <div className="fx-head">
            <h2>current funktions</h2>
            <p>live and in progress</p>
          </div>
          <div className="fx-files">
            <a className="fx-file fx-file--feature" href="#work">
              <span className="fx-file__tab"><span className="n">f(01)</span>OUTIN</span>
              <span className="fx-file__body">
                <span className="fx-file__shot">[OUTIN screenshot]</span>
                <span className="fx-file__meta">
                  <span className="fx-file__title">OUTIN</span>
                  <span className="fx-dl"><span>type</span><span>our first product</span></span>
                  <span className="fx-dl"><span>what</span><span>[one line on what OUTIN does]</span></span>
                  <span className="fx-dl"><span>built</span><span>[stack / timeline]</span></span>
                  <span className="fx-dl"><span>status</span><span>[status]</span></span>
                  <span className="fx-file__open">open it &#8599;</span>
                </span>
              </span>
            </a>
            <div className="fx-files__side">
              <a className="fx-file fx-file--slate" href="#work">
                <span className="fx-file__tab"><span className="n">f(02)</span>[client]</span>
                <span className="fx-file__body"><span className="fx-file__title">[workflow we rebuilt]</span><span className="fx-file__line">[one line on the result]</span></span>
              </a>
              <a className="fx-file fx-file--olive" href="#work">
                <span className="fx-file__tab"><span className="n">f(03)</span>[client]</span>
                <span className="fx-file__body"><span className="fx-file__title">[app we built]</span><span className="fx-file__line">[one line on the result]</span></span>
              </a>
              <a className="fx-file fx-file--empty" href="mailto:hello@funktion.work?subject=My%20messy%20process">
                <span className="fx-file__body"><span className="n">f(04)</span><span className="fx-file__title">your funktion here &#8599;</span></span>
              </a>
            </div>
          </div>
        </section>

        <footer id="contact" className="fx-foot">
          <div className="fx-foot__top">
            <p className="fx-foot__big">got a messy process?<br /><span>good.</span></p>
            <div className="fx-foot__fix">
              <svg className="fx-fix" viewBox="-10 -26 380 172" role="img" aria-label="A tangled line that straightens into a clean workflow: map, build, automate, train, run it."><path className="fx-fix__shadow" d="M0 60 C20 60 144.5 82.0 75.1 93.9 C36.4 130.7 146.6 142 119.1 121.9 C103.2 142 44.5 72.1 122.2 119.1 C65.9 142 -6 117.4 10 55.2 C-6 128.0 131.2 85.9 184.8 80.9 C286.0 68.1 298.2 18.3 190.2 5.8 C265.3 12.7 146.7 -22 125.4 24.5 C188.0 27.4 263.7 97.4 151.9 70.4 C189.8 142 73.5 -22 69.4 20.3 C20.9 77.9 66.5 142 130.3 118.3 C212.7 142 229.7 -22 230.8 12.3 C285.7 22.6 319.1 -10.3 249.5 9.4 C192.9 -22 330.0 -22 230.1 7.7 C160.8 -8.4 108.4 142 132.3 112.0 C218.9 142 253.8 97.3 182.7 20.2 C245.5 101.1 366 133.1 334.8 112.1 C258.8 142 231.6 142 223.1 124.6 C171.3 136.5 180.5 128.0 281.1 84.9 C366 102.6 174.8 123.6 233.9 121.7 C223.0 46.9 340 60 360 60" fill="none" stroke="#0e1a22" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" transform="translate(4 3)" /><path className="fx-fix__line" d="M0 60 C20 60 144.5 82.0 75.1 93.9 C36.4 130.7 146.6 142 119.1 121.9 C103.2 142 44.5 72.1 122.2 119.1 C65.9 142 -6 117.4 10 55.2 C-6 128.0 131.2 85.9 184.8 80.9 C286.0 68.1 298.2 18.3 190.2 5.8 C265.3 12.7 146.7 -22 125.4 24.5 C188.0 27.4 263.7 97.4 151.9 70.4 C189.8 142 73.5 -22 69.4 20.3 C20.9 77.9 66.5 142 130.3 118.3 C212.7 142 229.7 -22 230.8 12.3 C285.7 22.6 319.1 -10.3 249.5 9.4 C192.9 -22 330.0 -22 230.1 7.7 C160.8 -8.4 108.4 142 132.3 112.0 C218.9 142 253.8 97.3 182.7 20.2 C245.5 101.1 366 133.1 334.8 112.1 C258.8 142 231.6 142 223.1 124.6 C171.3 136.5 180.5 128.0 281.1 84.9 C366 102.6 174.8 123.6 233.9 121.7 C223.0 46.9 340 60 360 60" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /><g fontFamily="DM Mono, monospace" fontWeight="500"><g transform="translate(36 0)"><g className="fx-fix__node" data-x="36"><rect x="-8" y="52" width="16" height="16" style={{fill: "var(--tag)"} as CSSProperties} /><text x="0" y="94" textAnchor="middle" fontSize="12" style={{fill: "var(--muted)"} as CSSProperties}>map</text></g></g><g transform="translate(108 0)"><g className="fx-fix__node" data-x="108"><rect x="-8" y="52" width="16" height="16" style={{fill: "var(--tag)"} as CSSProperties} /><text x="0" y="94" textAnchor="middle" fontSize="12" style={{fill: "var(--muted)"} as CSSProperties}>build</text></g></g><g transform="translate(180 0)"><g className="fx-fix__node" data-x="180"><rect x="-8" y="52" width="16" height="16" style={{fill: "var(--tag)"} as CSSProperties} /><text x="0" y="94" textAnchor="middle" fontSize="12" style={{fill: "var(--muted)"} as CSSProperties}>automate</text></g></g><g transform="translate(252 0)"><g className="fx-fix__node" data-x="252"><rect x="-8" y="52" width="16" height="16" style={{fill: "var(--tag)"} as CSSProperties} /><text x="0" y="94" textAnchor="middle" fontSize="12" style={{fill: "var(--muted)"} as CSSProperties}>train</text></g></g><g transform="translate(324 0)"><g className="fx-fix__node" data-x="324"><rect x="-8" y="52" width="16" height="16" style={{fill: "var(--accent)"} as CSSProperties} /><text x="0" y="94" textAnchor="middle" fontSize="12" style={{fill: "var(--muted)"} as CSSProperties}>run it</text></g></g></g></svg>
              <p className="fx-foot__hint">hover to straighten it out</p>
              <a className="fx-foot__cta" href="mailto:hello@funktion.work?subject=Working%20session">book a working session</a>
            </div>
          </div>
          <div className="fx-foot__row">
            <img className="fx-mark-dark" src="/brand/funktion-fx-bone.png" alt="f(*)" style={{width: "96px", height: "auto"} as CSSProperties} /><img className="fx-mark-light" src="/brand/funktion-fx-prussian.png" alt="f(*)" style={{width: "96px", height: "auto"} as CSSProperties} />
            <a href="mailto:hello@funktion.work">hello@funktion.work</a>
            <span className="fx-foot__muted">consulting / software / workflows / ai native</span>
            <span className="fx-foot__muted">funktion / 2026</span>
          </div>
        </footer>
      </div>
  );
}
