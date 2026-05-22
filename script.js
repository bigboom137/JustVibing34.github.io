/* ============================================================
   VOICES OF ILIATANIA — Game Script (Society & Merit Edition)
   ============================================================ */

// ─── STATS ──────────────────────────────────────────────────

const STAT_DEFS = [
  { key: 'rank',      label: 'Rank Progress',  icon: '◈', color: '#c8a850', type: 'good',
    desc: 'Your progress toward earning a higher civic rank in Iliatanian society.' },
  { key: 'trust',     label: 'Public Trust',   icon: '◉', color: '#4a88cc', type: 'good',
    desc: 'How much citizens and officials trust you to act fairly and honestly.' },
  { key: 'equality',  label: 'Social Equality',icon: '⊕', color: '#5aad8a', type: 'good',
    desc: 'Whether your choices strengthen equality across Iliatanian society.' },
  { key: 'stability', label: 'Civic Stability', icon: '◫', color: '#9070c8', type: 'good',
    desc: 'How stable and resilient Iliatania\'s civic institutions remain.' },
];

// ─── RANK TIERS ─────────────────────────────────────────────

const RANKS = [
  { min: 88, name: 'Imperial Representative' },
  { min: 76, name: 'Council Candidate'       },
  { min: 64, name: 'Public Officer'          },
  { min: 52, name: 'Civic Contributor'       },
  { min: 38, name: 'Certified Worker'        },
  { min: 24, name: 'Apprentice'              },
  { min: 0,  name: 'Common Citizen'          },
];

const INITIAL_STATS = { rank: 18, trust: 50, equality: 45, stability: 55 };

// ─── SCENE ART ──────────────────────────────────────────────

const SCENE_ART = {

'council': `<div style="position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#08050f 0%,#12091e 55%,#1a0f10 100%)">
  <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice">
    <rect x="0" y="210" width="600" height="110" fill="#0d0916"/>
    <rect x="0" y="208" width="600" height="4" fill="#2a1f3a"/>
    <rect x="60" y="60" width="18" height="155" fill="#1e1630" rx="2"/>
    <rect x="60" y="55" width="22" height="10" fill="#2a2040" rx="1"/>
    <rect x="522" y="60" width="18" height="155" fill="#1e1630" rx="2"/>
    <rect x="518" y="55" width="22" height="10" fill="#2a2040" rx="1"/>
    <rect x="130" y="80" width="14" height="135" fill="#1a1328" rx="2"/>
    <rect x="456" y="80" width="14" height="135" fill="#1a1328" rx="2"/>
    <path d="M180 215 Q300 80 420 215 Z" fill="none" stroke="#2a1f40" stroke-width="2"/>
    <rect x="180" y="180" width="240" height="36" fill="#130e22"/>
    <circle cx="300" cy="135" r="38" fill="none" stroke="#2a1f40" stroke-width="1.5"/>
    <circle cx="300" cy="135" r="26" fill="none" stroke="#2a1f40" stroke-width="1"/>
    <polygon points="300,100 308,127 337,127 314,144 322,171 300,154 278,171 286,144 263,127 292,127" fill="none" stroke="#3a2f50" stroke-width="1"/>
    <rect x="88" y="100" width="6" height="22" fill="#2a1f30" rx="1"/>
    <ellipse cx="91" cy="98" rx="5" ry="7" fill="#c06020" opacity="0.9"><animate attributeName="opacity" values="0.9;0.6;0.85;0.5;0.9" dur="1.8s" repeatCount="indefinite"/></ellipse>
    <ellipse cx="91" cy="96" rx="3" ry="5" fill="#f0a030" opacity="0.8"><animate attributeName="opacity" values="0.8;0.4;0.75;0.3;0.8" dur="1.8s" repeatCount="indefinite"/></ellipse>
    <rect x="506" y="100" width="6" height="22" fill="#2a1f30" rx="1"/>
    <ellipse cx="509" cy="98" rx="5" ry="7" fill="#c06020" opacity="0.9"><animate attributeName="opacity" values="0.7;0.95;0.5;0.9;0.7" dur="2.1s" repeatCount="indefinite"/></ellipse>
    <ellipse cx="509" cy="96" rx="3" ry="5" fill="#f0a030" opacity="0.8"><animate attributeName="opacity" values="0.6;0.9;0.4;0.85;0.6" dur="2.1s" repeatCount="indefinite"/></ellipse>
    <radialGradient id="tg1" cx="50%" cy="50%"><stop offset="0%" stop-color="#c06020" stop-opacity="0.18"/><stop offset="100%" stop-color="#c06020" stop-opacity="0"/></radialGradient>
    <ellipse cx="91" cy="115" rx="40" ry="30" fill="url(#tg1)"/>
    <ellipse cx="509" cy="115" rx="40" ry="30" fill="url(#tg1)"/>
    <ellipse cx="300" cy="222" rx="100" ry="18" fill="#130e1c" stroke="#241a34" stroke-width="1.5"/>
    <ellipse cx="210" cy="205" rx="10" ry="14" fill="#0e0b18"/>
    <rect x="202" y="204" width="16" height="20" fill="#0e0b18" rx="3"/>
    <ellipse cx="300" cy="202" rx="11" ry="15" fill="#0d0a16"/>
    <rect x="292" y="200" width="18" height="22" fill="#0d0a16" rx="3"/>
    <ellipse cx="390" cy="205" rx="10" ry="14" fill="#0e0b18"/>
    <rect x="382" y="204" width="16" height="20" fill="#0e0b18" rx="3"/>
    <radialGradient id="shaft" cx="50%" cy="0%"><stop offset="0%" stop-color="#c8a050" stop-opacity="0.08"/><stop offset="100%" stop-color="#c8a050" stop-opacity="0"/></radialGradient>
    <ellipse cx="300" cy="100" rx="80" ry="120" fill="url(#shaft)"/>
  </svg>
</div>`,

'corridor': `<div style="position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#060408 0%,#100b18 60%,#160f0c 100%)">
  <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice">
    <polygon points="0,320 600,320 420,190 180,190" fill="#0c0814"/>
    <rect x="0" y="0" width="180" height="320" fill="#090610"/>
    <rect x="420" y="0" width="180" height="320" fill="#090610"/>
    <polygon points="0,0 600,0 420,190 180,190" fill="#06040d"/>
    <polygon points="180,190 420,190 380,130 220,130" fill="#0a0715"/>
    <polygon points="220,130 380,130 360,90 240,90" fill="#08060f"/>
    <polygon points="240,90 360,90 348,65 252,65" fill="#060410"/>
    <line x1="180" y1="0" x2="180" y2="320" stroke="#1e1630" stroke-width="2"/>
    <line x1="420" y1="0" x2="420" y2="320" stroke="#1e1630" stroke-width="2"/>
    <rect x="30" y="110" width="8" height="28" fill="#1e1628" rx="1"/>
    <ellipse cx="34" cy="108" rx="6" ry="9" fill="#b05018" opacity="0.9"><animate attributeName="opacity" values="0.9;0.5;0.85;0.4;0.9" dur="1.9s" repeatCount="indefinite"/></ellipse>
    <ellipse cx="34" cy="105" rx="4" ry="6" fill="#e88020" opacity="0.7"><animate attributeName="opacity" values="0.7;0.3;0.7;0.2;0.7" dur="1.9s" repeatCount="indefinite"/></ellipse>
    <rect x="562" y="110" width="8" height="28" fill="#1e1628" rx="1"/>
    <ellipse cx="566" cy="108" rx="6" ry="9" fill="#b05018" opacity="0.9"><animate attributeName="opacity" values="0.5;0.9;0.4;0.88;0.5" dur="2.2s" repeatCount="indefinite"/></ellipse>
    <ellipse cx="566" cy="105" rx="4" ry="6" fill="#e88020" opacity="0.7"><animate attributeName="opacity" values="0.3;0.8;0.2;0.75;0.3" dur="2.2s" repeatCount="indefinite"/></ellipse>
    <radialGradient id="cg1" cx="50%" cy="50%"><stop offset="0%" stop-color="#b05018" stop-opacity="0.22"/><stop offset="100%" stop-color="#b05018" stop-opacity="0"/></radialGradient>
    <ellipse cx="34" cy="140" rx="55" ry="45" fill="url(#cg1)"/>
    <ellipse cx="566" cy="140" rx="55" ry="45" fill="url(#cg1)"/>
    <ellipse cx="300" cy="108" rx="8" ry="10" fill="#0a0814"/>
    <rect x="293" y="107" width="14" height="18" fill="#0a0814" rx="2"/>
    <line x1="180" y1="220" x2="420" y2="220" stroke="#130e1e" stroke-width="1"/>
    <line x1="180" y1="250" x2="420" y2="250" stroke="#130e1e" stroke-width="1"/>
    <line x1="270" y1="190" x2="220" y2="320" stroke="#130e1e" stroke-width="1"/>
    <line x1="300" y1="190" x2="300" y2="320" stroke="#130e1e" stroke-width="1"/>
    <line x1="330" y1="190" x2="380" y2="320" stroke="#130e1e" stroke-width="1"/>
  </svg>
</div>`,

'hospital': `<div style="position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#060a08 0%,#0a1210 55%,#0c1008 100%)">
  <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice">
    <rect x="0" y="0" width="600" height="320" fill="#080c0a"/>
    <rect x="0" y="230" width="600" height="90" fill="#0a0e0c"/>
    <rect x="0" y="228" width="600" height="3" fill="#182420"/>
    <rect x="120" y="30" width="70" height="90" fill="#0e1a12" rx="2"/>
    <rect x="125" y="35" width="60" height="80" fill="#0c1810" rx="1"/>
    <line x1="155" y1="35" x2="155" y2="115" stroke="#182420" stroke-width="1.5"/>
    <line x1="125" y1="75" x2="185" y2="75" stroke="#182420" stroke-width="1.5"/>
    <rect x="410" y="30" width="70" height="90" fill="#0e1a12" rx="2"/>
    <rect x="415" y="35" width="60" height="80" fill="#0c1810" rx="1"/>
    <line x1="445" y1="35" x2="445" y2="115" stroke="#182420" stroke-width="1.5"/>
    <line x1="415" y1="75" x2="475" y2="75" stroke="#182420" stroke-width="1.5"/>
    <rect x="60" y="180" width="120" height="55" fill="#0f1a12" rx="3" stroke="#1a2a1e" stroke-width="1"/>
    <rect x="65" y="175" width="50" height="30" fill="#121e16" rx="8"/>
    <rect x="420" y="180" width="120" height="55" fill="#0f1a12" rx="3" stroke="#1a2a1e" stroke-width="1"/>
    <rect x="425" y="175" width="50" height="30" fill="#121e16" rx="8"/>
    <ellipse cx="300" cy="185" rx="12" ry="16" fill="#0d1810"/>
    <rect x="290" y="183" width="20" height="30" fill="#0d1810" rx="3"/>
    <line x1="200" y1="0" x2="200" y2="40" stroke="#1e2820" stroke-width="1.5"/>
    <ellipse cx="200" cy="44" rx="8" ry="12" fill="#182818" opacity="0.8"/>
    <line x1="380" y1="0" x2="380" y2="40" stroke="#1e2820" stroke-width="1.5"/>
    <ellipse cx="380" cy="44" rx="8" ry="12" fill="#182818" opacity="0.8"/>
    <rect x="290" y="0" width="20" height="50" fill="none" stroke="#1e2820" stroke-width="1.5"/>
    <rect x="286" y="48" width="28" height="18" fill="#141e16" rx="2"/>
    <ellipse cx="300" cy="65" rx="10" ry="5" fill="#3a7040" opacity="0.6"><animate attributeName="opacity" values="0.6;0.3;0.55;0.25;0.6" dur="2.4s" repeatCount="indefinite"/></ellipse>
    <radialGradient id="hg1" cx="50%" cy="50%"><stop offset="0%" stop-color="#206030" stop-opacity="0.14"/><stop offset="100%" stop-color="#206030" stop-opacity="0"/></radialGradient>
    <ellipse cx="300" cy="120" rx="150" ry="100" fill="url(#hg1)"/>
  </svg>
</div>`,

'rooftop': `<div style="position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#05080f 0%,#08101a 40%,#0c141e 100%)">
  <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice">
    <rect x="0" y="0" width="600" height="320" fill="#05080f"/>
    <circle cx="45" cy="20" r="1" fill="#c8c0a8" opacity="0.7"/>
    <circle cx="120" cy="35" r="0.8" fill="#c8c0a8" opacity="0.5"/>
    <circle cx="200" cy="15" r="1.2" fill="#c8c0a8" opacity="0.8"/>
    <circle cx="310" cy="28" r="0.9" fill="#c8c0a8" opacity="0.6"/>
    <circle cx="390" cy="10" r="1" fill="#c8c0a8" opacity="0.7"/>
    <circle cx="480" cy="30" r="0.8" fill="#c8c0a8" opacity="0.5"/>
    <circle cx="555" cy="18" r="1.1" fill="#c8c0a8" opacity="0.8"/>
    <circle cx="480" cy="55" r="22" fill="#d4c890" opacity="0.12"/>
    <circle cx="480" cy="55" r="16" fill="#d4c890" opacity="0.18"/>
    <polygon points="0,200 30,185 40,175 55,185 70,170 90,185 110,160 130,180 160,165 190,180 220,155 260,178 300,160 340,178 380,155 410,180 440,165 470,180 500,160 530,178 570,165 600,180 600,320 0,320" fill="#07090f"/>
    <rect x="0" y="230" width="600" height="90" fill="#0c0f14"/>
    <rect x="0" y="228" width="600" height="3" fill="#161e28"/>
    <rect x="0" y="220" width="600" height="12" fill="#101520" rx="1"/>
    <ellipse cx="240" cy="215" rx="11" ry="14" fill="#0a0e14"/>
    <rect x="231" y="213" width="18" height="22" fill="#0a0e14" rx="3"/>
    <ellipse cx="360" cy="218" rx="10" ry="13" fill="#0a0e14"/>
    <rect x="352" y="216" width="16" height="20" fill="#0a0e14" rx="3"/>
    <radialGradient id="mg1" cx="80%" cy="0%"><stop offset="0%" stop-color="#d4c890" stop-opacity="0.06"/><stop offset="100%" stop-color="#d4c890" stop-opacity="0"/></radialGradient>
    <rect x="0" y="0" width="600" height="320" fill="url(#mg1)"/>
  </svg>
</div>`,

'ocean-night': `<div style="position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#04060d 0%,#060a12 40%,#08101a 100%)">
  <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice">
    <rect x="0" y="0" width="600" height="175" fill="#04060d"/>
    <circle cx="60" cy="18" r="0.9" fill="#b8c0c8" opacity="0.6"/>
    <circle cx="140" cy="8" r="1.1" fill="#b8c0c8" opacity="0.8"/>
    <circle cx="250" cy="22" r="0.8" fill="#b8c0c8" opacity="0.5"/>
    <circle cx="350" cy="12" r="1" fill="#b8c0c8" opacity="0.7"/>
    <circle cx="460" cy="25" r="0.9" fill="#b8c0c8" opacity="0.6"/>
    <circle cx="540" cy="10" r="1.2" fill="#b8c0c8" opacity="0.8"/>
    <circle cx="90" cy="60" r="20" fill="#c8c0a0" opacity="0.13"/>
    <circle cx="90" cy="60" r="13" fill="#c8c0a0" opacity="0.20"/>
    <rect x="0" y="175" width="600" height="145" fill="#050d18"/>
    <radialGradient id="og1" cx="50%" cy="0%"><stop offset="0%" stop-color="#1040a0" stop-opacity="0.12"/><stop offset="100%" stop-color="#1040a0" stop-opacity="0"/></radialGradient>
    <ellipse cx="300" cy="175" rx="300" ry="40" fill="url(#og1)"/>
    <path d="M0,190 Q30,183 60,190 Q90,197 120,190 Q150,183 180,190 Q210,197 240,190 Q270,183 300,190 Q330,197 360,190 Q390,183 420,190 Q450,197 480,190 Q510,183 540,190 Q570,197 600,190" fill="none" stroke="#0a1828" stroke-width="2" opacity="0.8"><animateTransform attributeName="transform" type="translate" from="0 0" to="-60 0" dur="4s" repeatCount="indefinite"/></path>
    <polygon points="240,165 360,165 375,175 225,175" fill="#030608"/>
    <rect x="290" y="105" width="4" height="62" fill="#040710"/>
    <polygon points="294,108 294,145 330,145" fill="#05080e" opacity="0.9"/>
    <polygon points="290,115 290,148 260,148" fill="#05080e" opacity="0.7"/>
  </svg>
</div>`,

'harbor-day': `<div style="position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#0a1018 0%,#121a22 40%,#0e1520 100%)">
  <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice">
    <rect x="0" y="0" width="600" height="160" fill="#0a1018"/>
    <ellipse cx="150" cy="50" rx="120" ry="35" fill="#0e141e" opacity="0.9"/>
    <ellipse cx="350" cy="35" rx="140" ry="30" fill="#0c1218" opacity="0.8"/>
    <rect x="0" y="160" width="600" height="160" fill="#08121c"/>
    <rect x="0" y="200" width="280" height="18" fill="#121820" rx="2"/>
    <rect x="40" y="190" width="8" height="28" fill="#101820" rx="1"/>
    <rect x="100" y="190" width="8" height="28" fill="#101820" rx="1"/>
    <rect x="160" y="190" width="8" height="28" fill="#101820" rx="1"/>
    <rect x="220" y="190" width="8" height="28" fill="#101820" rx="1"/>
    <polygon points="50,165 230,165 250,200 30,200" fill="#0c1018"/>
    <rect x="120" y="90" width="5" height="78" fill="#0e1420"/>
    <polygon points="125,95 125,140 175,140" fill="#101828" opacity="0.8"/>
    <polygon points="120,100 120,145 80,145" fill="#0e1624" opacity="0.7"/>
    <ellipse cx="160" cy="196" rx="9" ry="12" fill="#090d14"/>
    <rect x="153" y="194" width="14" height="18" fill="#090d14" rx="2"/>
    <ellipse cx="200" cy="198" rx="8" ry="11" fill="#090d14"/>
    <rect x="194" y="196" width="13" height="16" fill="#090d14" rx="2"/>
    <circle cx="38" cy="190" r="3" fill="#c8a050" opacity="0.6"><animate attributeName="opacity" values="0.6;0.4;0.6" dur="2s" repeatCount="indefinite"/></circle>
  </svg>
</div>`,

'assembly': `<div style="position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#06040c 0%,#0e0b18 55%,#120e10 100%)">
  <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice">
    <rect x="0" y="0" width="600" height="320" fill="#07050e"/>
    <rect x="0" y="260" width="600" height="60" fill="#0c0918"/>
    <rect x="20" y="235" width="560" height="28" fill="#0b0816" rx="1"/>
    <rect x="50" y="210" width="500" height="28" fill="#0a0715" rx="1"/>
    <rect x="85" y="188" width="430" height="25" fill="#090614" rx="1"/>
    <rect x="125" y="168" width="350" height="22" fill="#080513" rx="1"/>
    <ellipse cx="80" cy="260" rx="9" ry="12" fill="#060410"/>
    <ellipse cx="130" cy="260" rx="9" ry="12" fill="#060410"/>
    <ellipse cx="180" cy="260" rx="9" ry="12" fill="#060410"/>
    <ellipse cx="230" cy="260" rx="9" ry="12" fill="#060410"/>
    <ellipse cx="280" cy="260" rx="9" ry="12" fill="#070512"/>
    <ellipse cx="330" cy="260" rx="9" ry="12" fill="#060410"/>
    <ellipse cx="380" cy="260" rx="9" ry="12" fill="#060410"/>
    <ellipse cx="430" cy="260" rx="9" ry="12" fill="#060410"/>
    <ellipse cx="480" cy="260" rx="9" ry="12" fill="#060410"/>
    <ellipse cx="520" cy="260" rx="9" ry="12" fill="#060410"/>
    <ellipse cx="100" cy="235" rx="8" ry="11" fill="#050310"/>
    <ellipse cx="160" cy="235" rx="8" ry="11" fill="#050310"/>
    <ellipse cx="220" cy="235" rx="8" ry="11" fill="#050310"/>
    <ellipse cx="280" cy="235" rx="8" ry="11" fill="#050310"/>
    <ellipse cx="340" cy="235" rx="8" ry="11" fill="#050310"/>
    <ellipse cx="400" cy="235" rx="8" ry="11" fill="#050310"/>
    <ellipse cx="460" cy="235" rx="8" ry="11" fill="#050310"/>
    <rect x="220" y="150" width="160" height="20" fill="#14101e" rx="2"/>
    <ellipse cx="300" cy="143" rx="13" ry="17" fill="#0f0c1c"/>
    <rect x="289" y="140" width="22" height="28" fill="#0f0c1c" rx="3"/>
    <rect x="200" y="130" width="6" height="24" fill="#1a1428" rx="1"/>
    <ellipse cx="203" cy="128" rx="5" ry="8" fill="#c05020" opacity="0.9"><animate attributeName="opacity" values="0.9;0.5;0.85;0.4;0.9" dur="1.7s" repeatCount="indefinite"/></ellipse>
    <rect x="394" y="130" width="6" height="24" fill="#1a1428" rx="1"/>
    <ellipse cx="397" cy="128" rx="5" ry="8" fill="#c05020" opacity="0.9"><animate attributeName="opacity" values="0.5;0.9;0.4;0.88;0.5" dur="2.0s" repeatCount="indefinite"/></ellipse>
    <radialGradient id="ag1" cx="50%" cy="100%"><stop offset="0%" stop-color="#c05020" stop-opacity="0.15"/><stop offset="100%" stop-color="#c05020" stop-opacity="0"/></radialGradient>
    <ellipse cx="300" cy="160" rx="100" ry="60" fill="url(#ag1)"/>
  </svg>
</div>`,

'antechamber': `<div style="position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#06040d 0%,#0c0a1a 55%,#100c12 100%)">
  <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice">
    <rect x="0" y="0" width="600" height="320" fill="#07050e"/>
    <rect x="0" y="245" width="600" height="75" fill="#0b0918"/>
    <rect x="0" y="243" width="600" height="3" fill="#1e1830"/>
    <rect x="210" y="60" width="180" height="186" fill="#0e0b1c" rx="2" stroke="#2a2040" stroke-width="2"/>
    <line x1="300" y1="60" x2="300" y2="246" stroke="#2a2040" stroke-width="1.5"/>
    <path d="M210,100 Q300,40 390,100" fill="none" stroke="#2a2040" stroke-width="2"/>
    <circle cx="288" cy="175" r="4" fill="#2a2040"/>
    <circle cx="312" cy="175" r="4" fill="#2a2040"/>
    <rect x="0" y="80" width="140" height="168" fill="#08060e"/>
    <rect x="460" y="80" width="140" height="168" fill="#08060e"/>
    <rect x="130" y="65" width="20" height="185" fill="#100d1e" rx="2"/>
    <rect x="450" y="65" width="20" height="185" fill="#100d1e" rx="2"/>
    <rect x="15" y="130" width="7" height="20" fill="#1e1830" rx="1"/>
    <ellipse cx="18" cy="128" rx="5" ry="7" fill="#b04818" opacity="0.9"><animate attributeName="opacity" values="0.9;0.5;0.85;0.4;0.9" dur="1.9s" repeatCount="indefinite"/></ellipse>
    <rect x="578" y="130" width="7" height="20" fill="#1e1830" rx="1"/>
    <ellipse cx="582" cy="128" rx="5" ry="7" fill="#b04818" opacity="0.9"><animate attributeName="opacity" values="0.5;0.9;0.4;0.88;0.5" dur="2.2s" repeatCount="indefinite"/></ellipse>
    <radialGradient id="dg1" cx="50%" cy="60%"><stop offset="0%" stop-color="#c8a050" stop-opacity="0.06"/><stop offset="100%" stop-color="#c8a050" stop-opacity="0"/></radialGradient>
    <ellipse cx="300" cy="200" rx="140" ry="100" fill="url(#dg1)"/>
  </svg>
</div>`,

'shore': `<div style="position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#04060e 0%,#060a14 40%,#0a1018 100%)">
  <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice">
    <rect x="0" y="0" width="600" height="185" fill="#04060e"/>
    <circle cx="500" cy="55" r="18" fill="#c8c0a0" opacity="0.15"/>
    <circle cx="500" cy="55" r="12" fill="#c8c0a0" opacity="0.22"/>
    <polygon points="0,185 80,155 140,165 200,140 250,160 300,145 350,162 400,138 460,158 520,145 600,160 600,185 0,185" fill="#060810"/>
    <rect x="0" y="185" width="600" height="50" fill="#0a0e14"/>
    <rect x="0" y="235" width="600" height="85" fill="#050e1a"/>
    <path d="M0,236 Q50,232 100,236 Q150,240 200,236 Q250,232 300,236 Q350,240 400,236 Q450,232 500,236 Q550,240 600,236" fill="none" stroke="#0e1e30" stroke-width="2"/>
    <ellipse cx="260" cy="210" rx="10" ry="13" fill="#07090f"/>
    <rect x="252" y="208" width="16" height="20" fill="#07090f" rx="2"/>
    <ellipse cx="340" cy="212" rx="10" ry="13" fill="#07090f"/>
    <rect x="332" y="210" width="16" height="20" fill="#07090f" rx="2"/>
    <rect x="295" y="215" width="10" height="14" fill="#181420" rx="1"/>
    <ellipse cx="300" cy="215" rx="6" ry="4" fill="#c8a050" opacity="0.7"><animate attributeName="opacity" values="0.7;0.4;0.65;0.35;0.7" dur="1.8s" repeatCount="indefinite"/></ellipse>
  </svg>
</div>`,

'final': `<div style="position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#06040c 0%,#0e0a18 40%,#14101e 100%)">
  <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice">
    <rect x="0" y="0" width="600" height="320" fill="#07050e"/>
    <rect x="0" y="250" width="600" height="70" fill="#0c0a1a"/>
    <rect x="0" y="248" width="600" height="3" fill="#201840"/>
    <rect x="160" y="230" width="280" height="22" fill="#14102a" rx="2"/>
    <ellipse cx="205" cy="206" rx="11" ry="14" fill="#0c0a1a"/>
    <rect x="196" y="203" width="18" height="22" fill="#0c0a1a" rx="3"/>
    <ellipse cx="265" cy="206" rx="11" ry="14" fill="#0c0a1a"/>
    <rect x="256" y="203" width="18" height="22" fill="#0c0a1a" rx="3"/>
    <ellipse cx="335" cy="206" rx="11" ry="14" fill="#0c0a1a"/>
    <rect x="326" y="203" width="18" height="22" fill="#0c0a1a" rx="3"/>
    <ellipse cx="395" cy="206" rx="11" ry="14" fill="#0c0a1a"/>
    <rect x="386" y="203" width="18" height="22" fill="#0c0a1a" rx="3"/>
    <circle cx="300" cy="110" r="52" fill="none" stroke="#2a1e42" stroke-width="2"/>
    <circle cx="300" cy="110" r="36" fill="none" stroke="#241838" stroke-width="1.5"/>
    <polygon points="300,62 314,96 350,96 322,118 332,152 300,130 268,152 278,118 250,96 286,96" fill="none" stroke="#342850" stroke-width="1.5"/>
    <rect x="55" y="90" width="10" height="35" fill="#1e1830" rx="1"/>
    <ellipse cx="60" cy="87" rx="8" ry="11" fill="#c06820" opacity="0.9"><animate attributeName="opacity" values="0.9;0.5;0.85;0.4;0.9" dur="1.7s" repeatCount="indefinite"/></ellipse>
    <rect x="535" y="90" width="10" height="35" fill="#1e1830" rx="1"/>
    <ellipse cx="540" cy="87" rx="8" ry="11" fill="#c06820" opacity="0.9"><animate attributeName="opacity" values="0.5;0.9;0.4;0.88;0.5" dur="2.0s" repeatCount="indefinite"/></ellipse>
    <radialGradient id="fg1" cx="50%" cy="80%"><stop offset="0%" stop-color="#c8a050" stop-opacity="0.10"/><stop offset="100%" stop-color="#c8a050" stop-opacity="0"/></radialGradient>
    <ellipse cx="300" cy="220" rx="200" ry="100" fill="url(#fg1)"/>
  </svg>
</div>`,

'exam': `<div style="position:absolute;inset:0;overflow:hidden;background:linear-gradient(180deg,#06050e 0%,#0d0b18 55%,#0f0c14 100%)">
  <svg style="position:absolute;inset:0;width:100%;height:100%" viewBox="0 0 600 320" preserveAspectRatio="xMidYMid slice">
    <rect x="0" y="248" width="600" height="72" fill="#0b0918"/>
    <rect x="0" y="246" width="600" height="3" fill="#1a1630"/>
    <line x1="0" y1="265" x2="600" y2="265" stroke="#100d1c" stroke-width="1"/>
    <line x1="0" y1="283" x2="600" y2="283" stroke="#100d1c" stroke-width="1"/>
    <line x1="150" y1="248" x2="150" y2="320" stroke="#100d1c" stroke-width="1"/>
    <line x1="300" y1="248" x2="300" y2="320" stroke="#100d1c" stroke-width="1"/>
    <line x1="450" y1="248" x2="450" y2="320" stroke="#100d1c" stroke-width="1"/>
    <rect x="0" y="0" width="90" height="248" fill="#090715"/>
    <rect x="510" y="0" width="90" height="248" fill="#090715"/>
    <rect x="85" y="0" width="22" height="248" fill="#0e0b1c" rx="1"/>
    <rect x="148" y="30" width="18" height="218" fill="#0c091a" rx="1"/>
    <rect x="434" y="30" width="18" height="218" fill="#0c091a" rx="1"/>
    <rect x="493" y="0" width="22" height="248" fill="#0e0b1c" rx="1"/>
    <rect x="262" y="18" width="76" height="108" fill="#0e1030" rx="3"/>
    <line x1="300" y1="18" x2="300" y2="126" stroke="#181a3c" stroke-width="1.5"/>
    <line x1="262" y1="72" x2="338" y2="72" stroke="#181a3c" stroke-width="1.5"/>
    <path d="M262,18 Q300,-8 338,18" fill="none" stroke="#181a3c" stroke-width="1.5"/>
    <radialGradient id="exwg" cx="50%" cy="0%"><stop offset="0%" stop-color="#2030a0" stop-opacity="0.12"/><stop offset="100%" stop-color="#2030a0" stop-opacity="0"/></radialGradient>
    <ellipse cx="300" cy="90" rx="90" ry="80" fill="url(#exwg)"/>
    <rect x="95" y="82" width="6" height="18" fill="#1a1530" rx="1"/>
    <ellipse cx="98" cy="80" rx="5" ry="7" fill="#a04218" opacity="0.9"><animate attributeName="opacity" values="0.9;0.5;0.85;0.4;0.9" dur="2.1s" repeatCount="indefinite"/></ellipse>
    <ellipse cx="98" cy="77" rx="3" ry="5" fill="#d07018" opacity="0.7"><animate attributeName="opacity" values="0.7;0.3;0.65;0.25;0.7" dur="2.1s" repeatCount="indefinite"/></ellipse>
    <rect x="499" y="82" width="6" height="18" fill="#1a1530" rx="1"/>
    <ellipse cx="502" cy="80" rx="5" ry="7" fill="#a04218" opacity="0.9"><animate attributeName="opacity" values="0.5;0.9;0.4;0.88;0.5" dur="1.8s" repeatCount="indefinite"/></ellipse>
    <ellipse cx="502" cy="77" rx="3" ry="5" fill="#d07018" opacity="0.7"><animate attributeName="opacity" values="0.3;0.7;0.25;0.65;0.3" dur="1.8s" repeatCount="indefinite"/></ellipse>
    <radialGradient id="exeg" cx="50%" cy="50%"><stop offset="0%" stop-color="#a04218" stop-opacity="0.18"/><stop offset="100%" stop-color="#a04218" stop-opacity="0"/></radialGradient>
    <ellipse cx="98" cy="108" rx="48" ry="42" fill="url(#exeg)"/>
    <ellipse cx="502" cy="108" rx="48" ry="42" fill="url(#exeg)"/>
    <rect x="195" y="166" width="210" height="10" fill="#141028" rx="1" stroke="#221a3a" stroke-width="1"/>
    <rect x="220" y="150" width="160" height="18" fill="#110e22" rx="1"/>
    <rect x="240" y="138" width="120" height="14" fill="#0f0c1e" rx="2" stroke="#1c1830" stroke-width="1"/>
    <ellipse cx="300" cy="133" rx="9" ry="11" fill="#08061a"/>
    <rect x="292" y="130" width="16" height="20" fill="#08061a" rx="2"/>
    <rect x="108" y="205" width="384" height="5" fill="#0d0b1c" rx="1"/>
    <ellipse cx="148" cy="203" rx="6" ry="8" fill="#070513"/>
    <rect x="143" y="201" width="10" height="14" fill="#070513" rx="1"/>
    <ellipse cx="208" cy="203" rx="6" ry="8" fill="#070513"/>
    <rect x="203" y="201" width="10" height="14" fill="#070513" rx="1"/>
    <ellipse cx="268" cy="203" rx="6" ry="8" fill="#080615"/>
    <rect x="263" y="201" width="10" height="14" fill="#080615" rx="1"/>
    <ellipse cx="332" cy="203" rx="6" ry="8" fill="#070513"/>
    <rect x="327" y="201" width="10" height="14" fill="#070513" rx="1"/>
    <ellipse cx="392" cy="203" rx="6" ry="8" fill="#070513"/>
    <rect x="387" y="201" width="10" height="14" fill="#070513" rx="1"/>
    <ellipse cx="452" cy="203" rx="6" ry="8" fill="#070513"/>
    <rect x="447" y="201" width="10" height="14" fill="#070513" rx="1"/>
    <rect x="88" y="228" width="424" height="5" fill="#0d0b1c" rx="1"/>
    <ellipse cx="128" cy="226" rx="6" ry="8" fill="#060412"/>
    <rect x="123" y="224" width="10" height="14" fill="#060412" rx="1"/>
    <ellipse cx="192" cy="226" rx="6" ry="8" fill="#060412"/>
    <rect x="187" y="224" width="10" height="14" fill="#060412" rx="1"/>
    <ellipse cx="256" cy="226" rx="6" ry="8" fill="#060412"/>
    <rect x="251" y="224" width="10" height="14" fill="#060412" rx="1"/>
    <ellipse cx="344" cy="226" rx="6" ry="8" fill="#060412"/>
    <rect x="339" y="224" width="10" height="14" fill="#060412" rx="1"/>
    <ellipse cx="408" cy="226" rx="6" ry="8" fill="#060412"/>
    <rect x="403" y="224" width="10" height="14" fill="#060412" rx="1"/>
    <ellipse cx="472" cy="226" rx="6" ry="8" fill="#060412"/>
    <rect x="467" y="224" width="10" height="14" fill="#060412" rx="1"/>
  </svg>
</div>`,

}; // end SCENE_ART

// ─── CHARACTER SILHOUETTES (seen from behind) ────────────────

const SILHOUETTES = {

strategist: `<svg viewBox="0 0 80 128" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto">
  <ellipse cx="40" cy="16" rx="11" ry="13" fill="#0c0a1a"/>
  <rect x="36" y="27" width="8" height="7" fill="#0c0a1a"/>
  <path d="M13,34 Q40,31 67,34 L71,53 Q56,51 40,52 Q24,51 9,53 Z" fill="#0c0a1a"/>
  <rect x="7" y="34" width="13" height="9" fill="#0c0a1a" rx="2"/>
  <rect x="60" y="34" width="13" height="9" fill="#0c0a1a" rx="2"/>
  <path d="M13,53 L10,110 L40,115 L70,110 L67,53 Z" fill="#0c0a1a"/>
  <line x1="40" y1="76" x2="40" y2="115" stroke="#080614" stroke-width="2"/>
  <rect x="13" y="72" width="54" height="5" fill="#080614" rx="1"/>
  <rect x="10" y="109" width="14" height="10" fill="#0c0a1a" rx="1"/>
  <rect x="56" y="109" width="14" height="10" fill="#0c0a1a" rx="1"/>
</svg>`,

healer: `<svg viewBox="0 0 80 128" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto">
  <ellipse cx="40" cy="15" rx="10" ry="12" fill="#0a1210"/>
  <rect x="37" y="25" width="6" height="8" fill="#0a1210"/>
  <path d="M22,33 Q40,31 58,33 L62,48 Q51,46 40,47 Q29,46 18,48 Z" fill="#0a1210"/>
  <path d="M18,48 Q9,116 20,116 L40,119 L60,116 Q71,116 62,48 Z" fill="#0a1210"/>
  <path d="M20,82 Q12,102 17,116" fill="none" stroke="#060e0a" stroke-width="5"/>
  <path d="M60,82 Q68,102 63,116" fill="none" stroke="#060e0a" stroke-width="5"/>
  <rect x="38" y="0" width="4" height="20" fill="#060e0a" rx="1"/>
  <rect x="32" y="6" width="16" height="4" fill="#060e0a" rx="1"/>
</svg>`,

navigator: `<svg viewBox="0 0 80 128" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto">
  <ellipse cx="40" cy="15" rx="11" ry="13" fill="#0e0e0a"/>
  <rect x="37" y="26" width="7" height="7" fill="#0e0e0a"/>
  <path d="M15,33 Q40,31 65,33 L68,51 Q55,49 40,50 Q25,49 12,51 Z" fill="#0e0e0a"/>
  <path d="M12,51 L9,112 L40,116 L71,112 L68,51 Z" fill="#0e0e0a"/>
  <rect x="65" y="49" width="11" height="32" fill="#0e0e0a" rx="2"/>
  <rect x="68" y="81" width="16" height="5" fill="#0e0e0a" rx="1"/>
  <line x1="40" y1="78" x2="40" y2="116" stroke="#090904" stroke-width="1.5"/>
  <rect x="12" y="72" width="56" height="4" fill="#090904" rx="1"/>
  <rect x="9" y="110" width="13" height="9" fill="#0e0e0a" rx="1"/>
  <rect x="58" y="110" width="13" height="9" fill="#0e0e0a" rx="1"/>
</svg>`,

worker: `<svg viewBox="0 0 80 128" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto">
  <ellipse cx="40" cy="15" rx="11" ry="13" fill="#100c08"/>
  <rect x="37" y="26" width="7" height="8" fill="#100c08"/>
  <path d="M16,34 Q40,32 64,34 L66,51 Q53,50 40,51 Q27,50 14,51 Z" fill="#100c08"/>
  <path d="M14,51 L12,112 L40,116 L68,112 L66,51 Z" fill="#100c08"/>
  <rect x="14" y="68" width="52" height="6" fill="#080604" rx="1"/>
  <rect x="14" y="84" width="52" height="4" fill="#080604" rx="1"/>
  <rect x="12" y="110" width="14" height="10" fill="#100c08" rx="1"/>
  <rect x="54" y="110" width="14" height="10" fill="#100c08" rx="1"/>
</svg>`,

}; // end SILHOUETTES

// ─── CHARACTERS ─────────────────────────────────────────────

const CHARACTERS = [

// ══════ KAEL DORN — THE LOWBORN STRATEGIST ══════
{
  id: 'strategist', name: 'Kael Dorn', title: 'The Lowborn Strategist',
  tagline: 'Fifteen years reading law by candlelight. Today, the exam door finally opens.',
  color: '#4a88cc', icon: '◈',
  scenes: [
    {
      title: 'The Merit Exam', location: 'Imperial Academy Examination Hall',
      art: 'exam', label: 'SCENE I',
      npcName: 'Examiner Valdis',
      npcLine: '"Merit-only track. No sponsor on file. The score council grades you against every candidate — background irrelevant. You have three hours."',
      innerVoice: 'This is the only door they ever left open for someone like you. Don\'t rush it.',
      body: `<p>The hall smells of old varnish and fresh ink. Fifty candidates arranged in tiered rows — most with tailored coats, sponsor letters in their satchels, names you\'ve seen on civic plaques since you were a child. You find your seat near the back. The desk wobbles slightly. <em>You don\'t adjust it. Not now. You\'ve sat at worse.</em></p><p>The pension administration section is worth thirty points. You know it cold. You\'ve read the Civic Labour Code so many times the binding has split.</p>`,
      choices: [
        {
          text: 'Work methodically through every section. No guessing.',
          sub: '(You open the paper and begin without a word.)',
          consequence: 'Three hours of steady, careful work. Your civic law answers are precise; the pension formula section is near-perfect. You finish with time to spare and don\'t change a single answer. The examiner notes your name.',
          changes: { rank: 8, trust: 3, equality: 1, stability: 4 },
          sets: { methodical: true },
        },
        {
          text: 'Write what you actually believe about pension access — in the essay, with your name on it.',
          sub: '(You pause at the essay prompt. Then you write fast, and you don\'t stop.)',
          consequence: 'Your essay argues for full pension extension to colonial-registration workers. Two examiners flag it for committee review. You pass — but your views are now on record in a building full of people who remember such things.',
          changes: { rank: 5, trust: 2, equality: 10, stability: -3 },
          sets: { recordedView: true },
        },
        {
          text: 'The candidate beside you is panicking. Walk her through the pension formula before time starts.',
          sub: '"That third formula — substitute years served, not registration date. You\'ve got this."',
          consequence: 'You lose eight minutes. Your score is modest. But word travels through the candidates\' common room that afternoon: Kael Dorn helped someone on exam day. That reputation will arrive in rooms before you do.',
          changes: { rank: 2, trust: 11, equality: 5, stability: 0 },
          sets: { helpedCandidate: true },
        },
      ],
    },
    {
      title: 'The Petition', location: 'Civic Assembly Hall — Lower District',
      art: 'assembly', label: 'SCENE II',
      npcName: 'Elder Maris',
      npcLine: '"Three bridge workers. Fifteen combined years of civic service. One transposed date on a registration form each. The reapplication window closed. Kael — you know this system. Tell me there\'s a way."',
      innerVoice: 'You know exactly what it cost these families to be here. You know because it cost yours the same.',
      body: `<p>The assembly hall is full — standing room along the back wall. The three workers sit in the front row with their hands folded in their laps. A child is asleep across two chairs. <em>Elder Maris sent a note to your lodging house directly. The whole street knew you\'d passed before you did.</em></p><p>The pension denials were issued on filing errors — technically correct, practically devastating. You understand both of those facts at the same time, and they don\'t cancel each other out.</p>`,
      choices: [
        {
          text: 'File corrected applications yourself. All three. This week.',
          sub: '"Don\'t reapply — that\'s a dead end. Give me your documentation. I\'m going to the original filings."',
          consequence: 'Three late nights in the civic records office. Every claim corrected, certified, and resubmitted under your name. All three approved within a fortnight. The families remember. Elder Maris puts your name in her recommendation book.',
          changes: { rank: 3, trust: 12, equality: 8, stability: 3 },
          sets: { fixedPensions: true },
        },
        {
          text: 'Address this assembly — publicly — on the systemic flaw that caused this.',
          sub: '"What happened to these three men happens every month to people who don\'t have anyone in their corner. I\'m going to say that out loud, in the civic gazette, with my name on it."',
          consequence: 'The speech earns you a formal council candidacy recommendation. The three workers are still waiting for their specific claims while your name circulates in committee rooms.',
          changes: { rank: 8, trust: 5, equality: 6, stability: 1 },
        },
        {
          text: 'Draft a collective guild petition under Article 14. It has more legal force than three separate appeals.',
          sub: '"A group grievance gives the records office forty days to respond. That\'s the pressure point — let me show you how to use it."',
          consequence: 'Two workers receive their credits within six weeks. The third remains under appeal — his filing error runs deeper. He thanks you anyway.',
          changes: { rank: 2, trust: 5, equality: 5, stability: 5 },
        },
      ],
    },
    {
      title: 'The Endorsement Wall', location: 'Civic Records Office',
      art: 'corridor', label: 'SCENE III',
      npcName: 'Clerk Sevin',
      npcLine: '"Your exam results are exceptional — highest merit-track score this quarter. But the endorsement requirement has no exemptions. I\'m sorry. This isn\'t the answer you came here for."',
      innerVoice: 'You prepared for this room for three years. You didn\'t expect the obstacle to be a single line on a form.',
      body: `<p>The records office smells of stone dust and old wax. Clerk Sevin has reviewed your application three times while you stood at the counter — not from difficulty, but caution. She is not unkind. She is explaining a rule she did not write. <em>A character endorsement from a sitting Public Officer. Required. No exceptions. The rule exists, officially, to prevent unvetted candidates from advancing. What it does, in practice, is wall off everyone who wasn\'t born knowing a Public Officer.</em></p>`,
      memoryLines: {
        helpedCandidate: `<p><em>You think of the candidate from the exam hall — the one you walked through the pension formula. If she passed, she might know someone. It\'s a long shot. But so was every other door you\'ve knocked on.</em></p>`,
      },
      choices: [
        {
          text: 'Ask who in this building endorses merit-track candidates. Get a name.',
          sub: '"I\'m not asking you to bend anything. I\'m asking if there\'s a formal channel I haven\'t found."',
          consequence: 'Sevin gives you Officer Liris\'s name — known for reviewing merit-track candidates. You wait two weeks for an appointment. The door opens.',
          changes: { rank: 4, trust: 5, equality: 3, stability: 3 },
        },
        {
          text: 'File formally for an exceptional-score review. Use the system against itself.',
          sub: '"My score is in the top quartile. If there\'s a mechanism for that, I want to file for it properly."',
          consequence: 'No formal exemption exists — but Sevin escalates to a senior clerk who adds a notation that carries weight. The board reviews your file the same week.',
          changes: { rank: 6, trust: 3, equality: 2, stability: 5 },
        },
        {
          text: 'Write a public letter about this requirement. Civic gazette. Your name on it.',
          sub: '"I\'m not angry at you. But I\'m going to put on record that this rule undermines the merit system it claims to protect."',
          consequence: 'Two officers contact you — one to endorse, one to warn you about making enemies too early. Both relationships turn out to be useful.',
          changes: { rank: 3, trust: 4, equality: 8, stability: -2 },
          sets: { publicLetter: true },
        },
        {
          text: 'Ask the candidate you helped on exam day if she has a contact.',
          sub: '(You almost smile.) "Turns out helping someone has a longer reach than I expected."',
          consequence: 'She does. Officer Liris sees you within three days, moved partly by the story of exam-day generosity. You have your endorsement before the week is out.',
          changes: { rank: 6, trust: 8, equality: 4, stability: 2 },
          requiresMemory: 'helpedCandidate',
        },
      ],
    },
    {
      title: 'The Assembly Debate', location: 'Civic Assembly Hall',
      art: 'assembly', label: 'SCENE IV',
      npcName: 'Representative Boren',
      npcLine: '"Candidate Dorn. The question is pension eligibility for colonial-registration workers. Your position — on record."',
      innerVoice: 'Say what you actually believe, or say what advances you. You cannot always do both. Choose now.',
      body: `<p>The chamber fills differently when something matters. You can feel the weight of attention before you sit down. Capital-district representatives on the left. Colonial delegates along the right wall — several of them standing because the seating was allocated before they were invited. <em>You noticed that the moment you walked in. You notice everything.</em></p><p>Representative Boren chairs with professional calm. He asks your position the way people watch to see which way a door swings.</p>`,
      memoryLines: {
        fixedPensions: `<p><em>Elder Maris is in the gallery. You can see her from here. She gave you three weeks of her trust — you gave it back in corrected paperwork. This room feels like a different scale of the same problem.</em></p>`,
      },
      choices: [
        {
          text: 'Full extension. No conditions. Every person who serves Iliatania earns equal protection.',
          sub: '(You stand fully, both hands flat on the table.) "That is the founding compact, and I will not qualify it."',
          consequence: 'Colonial delegates applaud. Several capital merchants leave early. You\'ve put your position on record in a way that can\'t be softened later. It will follow you — as a liability to some, as a promise to others.',
          changes: { rank: 4, trust: 6, equality: 13, stability: -3 },
          sets: { supportedColonial: true },
        },
        {
          text: 'Full extension is the destination. Propose a phased transition the fund can sustain.',
          sub: '"I\'m not offering a lesser commitment. I\'m offering a credible path."',
          consequence: 'Moderates on both sides accept this. Colonial delegates are cautiously hopeful. You haven\'t closed any doors, and you haven\'t opened any enemies.',
          changes: { rank: 7, trust: 5, equality: 7, stability: 5 },
        },
        {
          text: 'Raise the fund\'s solvency first. Expansion must hold when it arrives.',
          sub: '"Promising rights we can\'t fund isn\'t compassion. It\'s politics. I want both — but I want the one we can keep."',
          consequence: 'You gain a reputation for careful thinking. Colonial advocates are quietly disappointed. You have not said no — but you\'ve said not now, and in this room that feels like the same thing.',
          changes: { rank: 5, trust: 3, equality: 2, stability: 8 },
        },
      ],
    },
    {
      title: 'The Forty-Minute Wait', location: 'Council Selection Committee — Antechamber',
      art: 'antechamber', label: 'SCENE V',
      npcName: 'Committee Secretary Olan',
      npcLine: '"Candidate Dorn? They\'re ready. I apologize for the wait."',
      innerVoice: 'They\'ve kept you waiting forty minutes past your appointment. Deliberately. You\'re meant to feel small before you enter.',
      body: `<p>The antechamber is lit by a single tall window. The chairs are designed to be uncomfortable — too formal to slouch in, too rigid to relax. You have been here forty-five minutes past your scheduled time. <em>You\'ve counted the flagstones: forty-two. You\'ve read the civic charter placard on the wall three times. You know it by heart now.</em></p><p>An older candidate exits the committee room looking satisfied. He adjusts his cufflinks. His father sat on this committee. You know because you looked it up before you came.</p>`,
      choices: [
        {
          text: 'Walk in exactly as prepared. The wait changes nothing.',
          sub: '(You stand, straighten your jacket, walk in at your own measured pace.)',
          consequence: 'You enter composed. One committee member leans to another and whispers something. Later, someone asks how you stayed calm. You don\'t give the real answer: you\'ve been waiting your whole life for rooms like this. The interview goes well.',
          changes: { rank: 8, trust: 5, equality: 2, stability: 5 },
        },
        {
          text: 'Note the delay — politely, directly, before the interview begins.',
          sub: '"Before we start: forty-five minutes past schedule is unusual. I wanted to note it and move on."',
          consequence: 'Silence. Then one committee member laughs — genuinely surprised. "Fair," she says. The interview is better for it. She is the deciding vote.',
          changes: { rank: 5, trust: 8, equality: 3, stability: 2 },
        },
        {
          text: 'Study the committee\'s seating before answering a single question.',
          sub: '(You pause in the doorway. Take in the room fully. Then sit.)',
          consequence: 'You identify who defers to whom, which members have your exam results open versus untouched, who is watching your face versus the window. You direct every answer at the right person. They notice.',
          changes: { rank: 7, trust: 4, equality: 1, stability: 6 },
        },
      ],
    },
    {
      title: 'The East Wing', location: 'Civic Hospital — East Corridor',
      art: 'hospital', label: 'SCENE VI',
      npcName: 'Senior Physician',
      npcLine: '"Candidate Dorn. You\'re not assigned to this wing. What brings you here — officially?"',
      innerVoice: 'This is not your jurisdiction. But injustice doesn\'t stay in its lane, and you stopped letting that stop you a long time ago.',
      body: `<p>The east wing corridor is where workers classified Certified and below are directed — shorter staff ratios, older equipment, longer waits. A colleague mentioned that pension credit disputes are resolved differently depending on which wing you\'re treated in. <em>You didn\'t believe it. Then you asked for the discharge records.</em></p><p>Workers treated in the east wing are three times more likely to have pension credit appeals denied. The pattern isn\'t explained anywhere in the filing notes. You\'re a strategist. You don\'t need it explained.</p>`,
      choices: [
        {
          text: 'Request the pension credit resolution records for both wings. Side by side.',
          sub: '"I\'m documenting a disparity. I\'m not here to cause difficulty — I\'m here because the numbers don\'t add up."',
          consequence: 'The physician gives you access — carefully, with chart numbers redacted. You document the pattern anyway. Three more weeks to make it airtight. Worth it.',
          changes: { rank: 3, trust: 7, equality: 9, stability: 1 },
        },
        {
          text: 'Present your candidacy papers and conduct a formal compliance review.',
          sub: '"This is an official review visit under equal-treatment provisions. I\'d like to begin in the records room."',
          consequence: 'The formal framing opens more doors than asking permission would have. Two nurses volunteer information they wouldn\'t have otherwise. You leave with more than you came for.',
          changes: { rank: 5, trust: 4, equality: 7, stability: 4 },
        },
        {
          text: 'Talk to the patients. Not the records — the people.',
          sub: '"The files will tell me what happened. The patients will tell me what it felt like."',
          consequence: 'Three hours in the east wing. Four patients who tell you, with careful precision, exactly what was done differently for them. You leave with testimony, not just statistics.',
          changes: { rank: 2, trust: 10, equality: 8, stability: 0 },
          sets: { hasTestimony: true },
        },
      ],
    },
    {
      title: 'The Council Vote', location: 'Imperial Council Chamber',
      art: 'council', label: 'SCENE VII', isFinal: true,
      npcName: 'Council Chair Iren',
      npcLine: '"The pension reform bill — colonial extension article. Candidate Dorn, you have five minutes to present the supporting case."',
      innerVoice: 'This is the moment everything before was building toward. It will not feel as large as you imagined. Do it anyway.',
      body: `<p>The chamber seats thirty-two. Twenty-seven are present. You have spent eight months on this bill — you know which four members are undecided, which two respond to argument, which two move only under political cost. <em>You have every number memorized. You have the names of every affected worker\'s district.</em></p>`,
      memoryLines: {
        hasTestimony: `<p><em>In your inside pocket: testimony from four east wing patients, handwritten, each signed. You didn\'t plan to use it today. You may have to.</em></p>`,
        helpedCandidate: `<p><em>In the back row, you see a face from the exam hall — the candidate you helped with the pension formula. She\'s an observer today. She gives you a single nod. You feel it land.</em></p>`,
      },
      choices: [
        {
          text: 'Lead with data. Clean, documented, no sentiment.',
          sub: '"The fund can sustain this extension. The retroactive period is five years. The cost-per-capita is lower than the civic remediation cost of not acting. I\'ll take questions."',
          consequence: 'The undecided members move. The bill passes 16-11. Not a sweep — a margin. But durable. The reform will hold.',
          changes: { rank: 12, trust: 7, equality: 10, stability: 6 },
        },
        {
          text: 'Read from the patient testimony. Let them hear what the disparity costs.',
          sub: '"I have four statements from east wing patients. I\'d like to read one — with permission, which I have in writing."',
          consequence: 'Two undecided members vote yes who wouldn\'t have on data alone. The bill passes 18-9 — a margin that doesn\'t get quietly amended away later.',
          changes: { rank: 11, trust: 10, equality: 12, stability: 4 },
          requiresMemory: 'hasTestimony',
        },
        {
          text: 'Name the two movable members directly. On the record. In the chamber.',
          sub: '"Representatives Halv and Coren — I\'ve spoken with your district coordinators. This gap affects workers in your districts specifically. I\'m asking you to vote for those workers today."',
          consequence: 'Halv votes yes. Coren abstains — which in a contested vote is close enough. The bill passes 15-11-1. Coren never forgives you for naming him publicly. It was worth it.',
          changes: { rank: 9, trust: 6, equality: 11, stability: 4 },
        },
      ],
    },
  ],
},

// ══════ TESSYN VAYLE — THE VEYRAN HEALER ══════
{
  id: 'healer', name: 'Tessyn Vayle', title: 'The Veyran Healer',
  tagline: 'Trained abroad, licensed here. Every day she proves she belongs in rooms that weren\'t built for her.',
  color: '#5aad8a', icon: '⊕',
  scenes: [
    {
      title: 'The Morning Ward', location: 'Civic Hospital — General Ward',
      art: 'hospital', label: 'SCENE I',
      npcName: 'Head Physician Draul',
      npcLine: '"Vayle. The east-wing patients are not your assignment. You\'re on the upper ward. Please stay in your designated section."',
      innerVoice: 'He doesn\'t say it outright. He doesn\'t have to. You\'ve learned to read the distance between what Iliatanian physicians say and what they mean.',
      body: `<p>The ward smells of lye soap and something underneath it that no amount of cleaning removes. You\'ve been a certified civic physician for fourteen months. You are still the only Veyran-trained healer on staff. <em>Some mornings the other physicians greet you by name. Some mornings they look past you. You\'ve stopped trying to predict which kind of morning it will be.</em></p><p>There\'s a patient in the east wing running a fever that Physician Draul classified as minor. You passed his bed on your way in. His breathing was not minor.</p>`,
      choices: [
        {
          text: 'Go to the east wing patient. His breathing is wrong and you know it.',
          sub: '(You change direction without a word and go.)',
          consequence: 'Early pneumonia. You catch it before it consolidates. The patient is transferred to your care. Draul says nothing to you directly — but the ward nursing staff notice what you did, and who didn\'t.',
          changes: { rank: 4, trust: 10, equality: 8, stability: 2 },
          sets: { brokeProtocol: true },
        },
        {
          text: 'Flag your concern to Draul formally and let him decide.',
          sub: '"I want to note for the record that the east-wing patient in bed seven has labored breathing inconsistent with a minor classification. I\'d like a second review."',
          consequence: 'Draul reviews the patient two hours later. He adjusts the classification. He doesn\'t acknowledge your flag. The patient is treated in time.',
          changes: { rank: 3, trust: 5, equality: 4, stability: 5 },
        },
        {
          text: 'Go to your assigned ward — then document the east-wing patient\'s symptoms in writing before anyone can claim you didn\'t notice.',
          sub: '(You write the observation in your case notes, dated and timed, and go to your ward.)',
          consequence: 'The documentation protects you later when the patient worsens and the question of who knew what becomes relevant. It is a careful, cold way to do the right thing. You\'re not sure how you feel about that.',
          changes: { rank: 2, trust: 4, equality: 3, stability: 7 },
          sets: { documented: true },
        },
      ],
    },
    {
      title: 'The Certification Exam', location: 'Imperial Academy — Medical Board',
      art: 'exam', label: 'SCENE II',
      npcName: 'Board Examiner Helke',
      npcLine: '"Your Veyran training covers the practical requirements. The theoretical sections will be graded on Iliatanian civic medicine standards. Any questions before we begin?"',
      innerVoice: 'You\'ve passed this exam before — in a different language, in a different country. This version asks you to forget half of what you know.',
      body: `<p>The medical board examination room is smaller than you expected. Three examiners, a clerk, and a blank sheet of paper in front of you. Examiner Helke has your Veyran certification on the table beside her, face-down. <em>You notice that. You notice everything they do with their hands when they think you\'re not watching.</em></p><p>The Iliatanian theoretical sections include several categories where Veyran methodology diverges significantly from standard practice. You know both approaches. You know which one works better in certain cases. This exam doesn\'t ask which one works better.</p>`,
      choices: [
        {
          text: 'Answer using Iliatanian standards throughout. Pass clean.',
          sub: '(You set aside the Veyran methodology and work through the exam as they\'ve defined it.)',
          consequence: 'You pass with a strong score. No flags, no questions. The board approves your full civic certification. You will use Veyran methods in practice regardless — the exam just doesn\'t need to know that.',
          changes: { rank: 7, trust: 3, equality: 2, stability: 6 },
        },
        {
          text: 'Answer Iliatanian standards, but note where Veyran methodology differs — and why.',
          sub: '(In the margin of two answers, you add a footnote. You sign your name to the footnote.)',
          consequence: 'One examiner flags the footnotes for review. Two weeks later, she contacts you to ask more questions — academic interest, she says. It becomes a correspondence that lasts years.',
          changes: { rank: 5, trust: 5, equality: 6, stability: 3 },
          sets: { sharedVeyranKnowledge: true },
        },
        {
          text: 'Answer using whichever methodology produces the better outcome for each question.',
          sub: '(You write the best answer you know, without filtering it through what they expect.)',
          consequence: 'The exam board flags several answers as non-standard. You pass — barely. One examiner writes in the margin: "Unconventional. Effective. Watch this one." You are watched, for better and worse.',
          changes: { rank: 3, trust: 6, equality: 7, stability: 1 },
          sets: { flaggedUnconventional: true },
        },
      ],
    },
    {
      title: 'The Resource Meeting', location: 'Hospital Administration — Third Floor',
      art: 'corridor', label: 'SCENE III',
      npcName: 'Administrator Quelm',
      npcLine: '"The east-wing supply allocation is set by patient classification, not physician preference. I understand your concern — but the system is the system."',
      innerVoice: 'He\'s not wrong about the system. He\'s wrong about accepting it.',
      body: `<p>Administrator Quelm has a very clean desk. Everything on it is aligned at right angles. He looks at your resource request the way people look at things they\'ve already decided to deny. <em>You\'ve been in this meeting four times in fourteen months. You have brought different evidence each time. The desk has not changed.</em></p><p>The east-wing supply shortage means patients there receive lower-grade wound care materials and slower pharmaceutical access than the upper ward. The outcomes data shows it. You have the outcomes data with you.</p>`,
      memoryLines: {
        brokeProtocol: `<p><em>The patient with pneumonia is three floors below you right now, recovering. He has a name: Terven. He told you he\'d been in the east wing for two days before anyone checked his breathing properly.</em></p>`,
      },
      choices: [
        {
          text: 'Present the outcomes data formally and request it be entered into the hospital record.',
          sub: '"I want this documented. If the board is making resource decisions, they should be making them with accurate outcome information in front of them."',
          consequence: 'Quelm enters your data reluctantly. It sits in the record for six months before a civic inspector reviews it during a routine audit and asks why nothing was done. Something is done.',
          changes: { rank: 3, trust: 5, equality: 7, stability: 4 },
          sets: { formalRecord: true },
        },
        {
          text: 'Ask Quelm directly: which outcomes would change his decision?',
          sub: '"I want to understand the threshold. What evidence would move this? Tell me what you need and I\'ll get it."',
          consequence: 'He names a mortality differential he doesn\'t believe you can prove. You spend six weeks proving it. He approves a partial reallocation. It\'s not everything. It helps.',
          changes: { rank: 4, trust: 6, equality: 8, stability: 3 },
        },
        {
          text: 'Go over Quelm\'s head — directly to the civic health inspector.',
          sub: '(You put the outcomes data in an envelope and write a cover letter that evening.)',
          consequence: 'The inspector responds within a week. The reallocation is ordered. Quelm doesn\'t speak to you in the corridor for two months. The east-wing patients don\'t notice — they just notice the better bandages.',
          changes: { rank: 5, trust: 4, equality: 10, stability: -1 },
          sets: { wentAboveHead: true },
        },
      ],
    },
    {
      title: 'The Pension Claim', location: 'Civic Hospital — East Ward',
      art: 'hospital', label: 'SCENE IV',
      npcName: 'Patient Terven',
      npcLine: '"The guild said my sick leave doesn\'t count toward pension credits because I was in the east wing, not the upper ward. I didn\'t choose which ward they put me in."',
      innerVoice: 'He is telling you that the place they assigned him to heal is now being used to deny him what healing cost.',
      body: `<p>Terven is a bridge rigger — has been for twenty years. He is sitting up in bed for the first time since you admitted him, which means the fever has broken and his lungs are clearing. He should be relieved. <em>He doesn\'t look relieved.</em></p><p>The pension credit classification for sick leave depends, apparently, on which ward you were admitted to. Upper ward: full credits. East wing: partial credits, with a guild review required. Nobody told him this when he was admitted. Nobody tells anyone.</p>`,
      choices: [
        {
          text: 'Write a formal clinical note contesting the ward classification on medical grounds.',
          sub: '"Your admission to the east wing was a staffing decision, not a severity decision. I\'m going to put that in writing and it will be in your file."',
          consequence: 'The note gives his guild appeal a medical foundation. His claim is approved six weeks later. He sends you a handwritten card. You keep it.',
          changes: { rank: 3, trust: 9, equality: 8, stability: 3 },
        },
        {
          text: 'Contact the guild directly and explain the medical situation.',
          sub: '"I\'m Physician Vayle. I treated this patient. His east-wing placement was administrative — his condition was serious. I\'d like to speak to whoever handles classification appeals."',
          consequence: 'The guild clerk is initially defensive. By the end of the call she\'s taking notes. Terven\'s claim is expedited. Two other workers with similar situations contact you the following week.',
          changes: { rank: 4, trust: 8, equality: 9, stability: 2 },
          sets: { guildContact: true },
        },
        {
          text: 'Ask Terven if he knows other workers in the same situation and offer to help all of them.',
          sub: '"This doesn\'t sound like it happened only to you. If there are others, I\'d like to know — and I\'d like to help."',
          consequence: 'Seven workers. All east-wing patients, all with contested pension credits tied to their ward placement. You spend the next month working through each case. It costs you evenings and two weekends. Every case is approved.',
          changes: { rank: 2, trust: 12, equality: 11, stability: 1 },
          sets: { helpedGroup: true },
        },
      ],
    },
    {
      title: 'The Whistleblower\'s Choice', location: 'Hospital Administration — Corridor',
      art: 'antechamber', label: 'SCENE V',
      npcName: 'Nurse Aldis',
      npcLine: '"Vayle. I need to tell you something, but I need you to understand — if it gets traced back to me, I lose this job. My family needs this job."',
      innerVoice: 'She came to you specifically. That\'s not an accident. She\'s decided something about who you are — make sure she\'s right.',
      body: `<p>Aldis finds you in the supply corridor between shifts. She has been a ward nurse for eleven years. She is not prone to dramatic statements. <em>She is visibly frightened.</em></p><p>What she tells you: Physician Draul has been systematically mis-classifying east-wing patients to keep their admission costs down — which also, incidentally, keeps their pension credit eligibility down. It is not accidental. There are notes. She has seen the notes.</p>`,
      choices: [
        {
          text: 'Ask to see the notes. Document everything. Protect her name.',
          sub: '"Show me what you\'ve seen. I won\'t use your name — I\'ll find another way to surface this."',
          consequence: 'You spend a week verifying the pattern independently, using your own access to case records. You build a case that doesn\'t require Aldis to come forward. She doesn\'t. The case still holds.',
          changes: { rank: 4, trust: 9, equality: 10, stability: 2 },
          sets: { hasEvidenceDraul: true },
        },
        {
          text: 'Tell her you need to report this — but you\'ll go to the civic inspector, not internal administration.',
          sub: '"If we take this to Quelm, it disappears. The inspector has external authority. That\'s the only path that doesn\'t loop back through this building."',
          consequence: 'She agrees, hesitantly. You file with the civic inspector that week. The investigation takes two months. Draul is suspended pending review. Aldis is interviewed once and her name is sealed. She keeps her job.',
          changes: { rank: 6, trust: 8, equality: 11, stability: -1 },
          sets: { reportedDraul: true, whistleblew: true },
        },
        {
          text: 'Listen — and then tell her you need time to think about what to do with it.',
          sub: '"I hear you. I need to think about how to do this without destroying you in the process. Give me a few days."',
          consequence: 'You think carefully. You find a way to surface the pattern through civic outcomes data that doesn\'t require Aldis\'s testimony at all. It takes longer. The case is airtight.',
          changes: { rank: 3, trust: 6, equality: 8, stability: 4 },
          sets: { hasEvidenceDraul: true },
        },
      ],
    },
    {
      title: 'The Equal Care Charter', location: 'Civic Assembly Hall',
      art: 'council', label: 'SCENE VI',
      npcName: 'Assembly Speaker Dreva',
      npcLine: '"Physician Vayle. You\'ve submitted a proposed amendment to the hospital equal-treatment charter. The floor is open — explain your reasoning."',
      innerVoice: 'Everything you\'ve seen in two years is in this room right now. Speak it plainly.',
      body: `<p>The assembly hall holds forty when full. Today it holds thirty-one, which is full enough. Your charter amendment has three articles: equal supply access by admission need rather than ward, pension credit eligibility tied to clinical severity rather than location, and mandatory outcome reporting by ward classification. <em>Simple. Auditable. Overdue by a decade.</em></p>`,
      memoryLines: {
        hasEvidenceDraul: `<p><em>The evidence on Draul\'s mis-classifications is in a separate packet — you decided not to lead with it. If they fight the charter, you\'ll use it. If they don\'t, it stays in reserve.</em></p>`,
        helpedGroup: `<p><em>Seven workers\' names are written in the back of your notebook. You don\'t read them aloud. You don\'t need to. You know exactly who you\'re speaking for.</em></p>`,
      },
      choices: [
        {
          text: 'Present the outcomes data. Let the numbers make the case.',
          sub: '"Patients in the east wing have a 23% higher rate of delayed diagnosis. That is not a matter of preference — it is a measurable failure. The charter amendment corrects it."',
          consequence: 'The assembly approves the first two articles immediately. The third — mandatory reporting — requires a further review period. Two of the three will transform conditions for thousands of patients.',
          changes: { rank: 8, trust: 7, equality: 11, stability: 5 },
        },
        {
          text: 'Open with a patient case. Make it a person, not a statistic.',
          sub: '"I want to tell you about a bridge rigger named Terven. He was in the east wing for eight days. Here is what that cost him — in pension credits, in time, in what he was and wasn\'t told."',
          consequence: 'Two assembly members who were planning to abstain vote yes. The full charter passes. Terven is in the gallery. He does not know you used his name. You\'ll ask his permission afterward.',
          changes: { rank: 7, trust: 10, equality: 12, stability: 3 },
          sets: { charterPassed: true },
        },
        {
          text: 'Present the Veyran approach to equal-admission triage. Frame it as a technical improvement.',
          sub: '"In Veyran civic medicine, triage is based on clinical need alone — ward assignment follows, not precedes, severity classification. Iliatania can adopt this. I can show you how."',
          consequence: 'The technical framing disarms opposition from administrators who would have fought a rights-based argument. The charter passes with broader support than you expected. Examiner Helke, watching from the gallery, makes a note.',
          changes: { rank: 6, trust: 6, equality: 10, stability: 6 },
        },
      ],
    },
    {
      title: 'The Last Shift', location: 'Civic Hospital — Corridor',
      art: 'corridor', label: 'SCENE VII', isFinal: true,
      npcName: 'Apprentice Physician Soren',
      npcLine: '"Physician Vayle — before you go. I wanted to ask: how do you decide? When the rule and the right thing aren\'t the same?"',
      innerVoice: 'He\'s twenty-two. He came to you because he trusts you. Don\'t say what sounds good. Say what you actually believe.',
      body: `<p>It is the end of a double shift. The corridor is quiet in the way hospitals get quiet at the turn of the night — not peaceful, just temporarily still. Soren has been your apprentice for three months. He is thoughtful and frightened in equal measure, which means he\'ll be good at this eventually. <em>He reminds you of yourself at his age, which is both heartening and alarming.</em></p>`,
      memoryLines: {
        charterPassed: `<p><em>The new charter takes effect next month. You\'ve already seen the supply orders change in the east wing. Small things — better wound dressings, faster pharmaceutical access — that to a patient feel enormous.</em></p>`,
        whistleblew: `<p><em>Draul\'s review concluded last week. He has been transferred to an administrative role. Aldis is still on the ward. She nodded to you this morning in a way that meant something.</em></p>`,
      },
      choices: [
        {
          text: '"The rule and the right thing are usually the same. When they aren\'t, document everything and act on what you know is right."',
          sub: '"And find colleagues who will back you. You can\'t do this alone — no one should have to."',
          consequence: 'Soren writes it down. Not because you said something eloquent — because you said something true. Years from now he will say you told him this, and he will be right.',
          changes: { rank: 5, trust: 12, equality: 8, stability: 6 },
        },
        {
          text: '"There isn\'t a rule for that. You learn your own line and you hold it. It costs something every time. That\'s how you know it means something."',
          sub: '"I can\'t give you a formula. I can tell you what it feels like to have a line worth holding."',
          consequence: 'He is quiet for a long moment. Then he says: "Okay." That\'s the right answer. The ones who say okay and mean it turn out to be the best physicians.',
          changes: { rank: 4, trust: 10, equality: 10, stability: 4 },
        },
        {
          text: '"Follow the rule until you\'ve tried everything within it. Then — only then — decide if the rule deserves to be broken."',
          sub: '"That order matters. The people who skip straight to breaking rules usually aren\'t doing it for the right reasons."',
          consequence: 'Soren nods slowly. He asks one follow-up question: "How do you know if the rule deserves it?" You tell him: "You\'ll know." That\'s not a complete answer. It\'s the honest one.',
          changes: { rank: 6, trust: 8, equality: 7, stability: 8 },
        },
      ],
    },
  ],
},

// ══════ MARA SHON — THE MERCHANT NAVIGATOR ══════
{
  id: 'navigator', name: 'Mara Shon', title: 'The Merchant Navigator',
  tagline: 'Three documented voyages. She knows what the sea costs — and what it\'s worth.',
  color: '#c89840', icon: '◎',
  scenes: [
    {
      title: 'The Falsified Manifest', location: 'Harbor Broker\'s Office',
      art: 'corridor', label: 'SCENE I',
      npcName: 'Broker Yenne',
      npcLine: '"The cargo weight is close enough. Everyone adjusts manifests, Shon. It\'s three crates. Nobody checks three crates."',
      innerVoice: 'He\'s right that no one will check. That\'s exactly why it matters that you don\'t do it.',
      body: `<p>The broker\'s office smells of salt rope and old ledgers. Yenne has been in this harbor for thirty years and has the patience of someone who has worn down a lot of resistant navigators. <em>He\'s watching you the way merchants watch the tide — waiting for the inevitable shift.</em></p><p>Three crates under the declared weight. The difference is wool — pre-sold at the destination port, never officially loaded. The pension credit calculations for harbor workers are based on certified cargo tonnage. Under-declaring the weight means three dock workers won\'t accrue the credits they\'re owed for loading it.</p>`,
      choices: [
        {
          text: 'Refuse. File the accurate manifest.',
          sub: '"Three crates is three crates, Yenne. File the real weight."',
          consequence: 'Yenne marks you as difficult. Two smaller contracts fall through in the following month because he talks. Three dock workers accrue their full pension credits without knowing why. You sleep fine.',
          changes: { rank: 5, trust: 11, equality: 8, stability: 2 },
          sets: { refusedFalsify: true },
        },
        {
          text: 'Point out the pension credit implications. Make it about the dock workers, not your ethics.',
          sub: '"Those three crates represent dock worker tonnage credits. You\'re not just adjusting a number — you\'re cutting what three men will retire on."',
          consequence: 'Yenne is surprised — this isn\'t the objection he expected. He recalculates. He approves the accurate filing and bills the merchant for the correction. He respects you more for knowing the downstream effects.',
          changes: { rank: 4, trust: 8, equality: 10, stability: 3 },
          sets: { refusedFalsify: true },
        },
        {
          text: 'Sign the adjusted manifest. You can\'t lose this contract.',
          sub: '(You pick up the pen. You don\'t meet Yenne\'s eyes.)',
          consequence: 'The contract holds. The money is good. For six weeks you don\'t think about it. Then you do. Then you think about it every time you file a manifest for the next two years, which is often.',
          changes: { rank: 7, trust: -3, equality: -5, stability: 5 },
          sets: { signedFalse: true },
        },
      ],
    },
    {
      title: 'The Dock Dispute', location: 'Harbor — East Pier',
      art: 'harbor-day', label: 'SCENE II',
      npcName: 'Dock Foreman Cassev',
      npcLine: '"The guild says our pension credits get split between the loading and the voyage. We load your ship — half credit. You and your crew get the other half for the voyage. That\'s not what the charter says."',
      innerVoice: 'He\'s read the charter more carefully than the guild official who explained it to him. He\'s right, and he knows it.',
      body: `<p>East pier at midday is all salt spray and shouted coordinates. Cassev is the kind of man who has earned the right to be listened to — twenty-two years on the docks, every one of them documented. <em>He holds the charter passage in his hand, folded and re-folded so many times the paper has gone soft at the creases.</em></p><p>The pension credit split being applied to his workers is incorrect. The charter is clear: full credits for loading, separate credits for voyage. Someone in the guild administration either misread it or decided it was easier not to correct the error.</p>`,
      memoryLines: {
        refusedFalsify: `<p><em>Cassev was one of the workers who loaded your last voyage. You think of the manifest you filed accurately. At least the tonnage was right. At least that.</em></p>`,
      },
      choices: [
        {
          text: 'Read the charter passage together with Cassev and confirm he\'s correct.',
          sub: '"You\'re right. That split is wrong. Let\'s document this in writing before you take it to the guild."',
          consequence: 'With your signature supporting the charter interpretation, Cassev\'s appeal has navigational credibility behind it. The guild corrects the error within three weeks and issues backdated credits for six months.',
          changes: { rank: 3, trust: 9, equality: 9, stability: 3 },
        },
        {
          text: 'Offer to accompany Cassev to the guild office personally.',
          sub: '"If a licensed navigator shows up alongside you, they\'re going to have a harder time pretending they don\'t understand the charter."',
          consequence: 'The guild official\'s posture changes the moment you walk in. The error is acknowledged in the room and corrected the same day. Cassev calls you a useful person, which is the highest compliment he gives.',
          changes: { rank: 4, trust: 10, equality: 9, stability: 2 },
          sets: { supportedCassev: true },
        },
        {
          text: 'Put the charter interpretation in writing and submit it to the guild as a formal navigation officer\'s clarification.',
          sub: '"A written clarification from a licensed navigator creates a precedent. Every dock worker in this harbor benefits from it, not just yours."',
          consequence: 'The formal clarification is approved and entered into the guild\'s interpretation record. It takes six weeks, but it covers seventeen docks, not just East Pier. Cassev shakes your hand. You both know you did the bigger thing.',
          changes: { rank: 5, trust: 8, equality: 11, stability: 4 },
          sets: { formalClarification: true },
        },
      ],
    },
    {
      title: 'The Trade Assembly', location: 'Civic Assembly Hall — Trade Committee',
      art: 'assembly', label: 'SCENE III',
      npcName: 'Committee Chair Fenrik',
      npcLine: '"The proposed route licensing reform would open northern sea lanes to independent navigators. The established merchant houses are opposed. Navigator Shon — you have experience on those routes. What\'s your position?"',
      innerVoice: 'The established houses have been controlling those lanes for thirty years. They\'ve been charging what they like. Everyone in this room knows it.',
      body: `<p>The trade committee chamber smells of beeswax and old ambition. You are the only working navigator at the table — everyone else is a merchant representative, a guild administrator, or a civic official who has never touched a tiller. <em>Fenrik calls on you by name with the careful neutrality of someone who already knows how the vote will go and is giving you a chance to be useful or invisible.</em></p>`,
      choices: [
        {
          text: 'Support the reform. Independent navigators mean competitive routes and lower shipping costs for everyone.',
          sub: '"The northern lanes are navigable. They\'re only controlled because the established houses made it expensive to learn them. Open licensing fixes that."',
          consequence: 'Three merchant representatives immediately challenge you. You answer each challenge with specific route data from your own logs. The reform passes narrowly. The merchant houses remember your name for years.',
          changes: { rank: 6, trust: 7, equality: 10, stability: -2 },
          sets: { supportedReform: true },
        },
        {
          text: 'Support the reform but propose a navigation safety certification requirement for new licensees.',
          sub: '"Open the lanes — but require documented safe-passage certification. Experienced navigators can run the certification program. That\'s quality control and opportunity at the same time."',
          consequence: 'The safety certification compromise threads the needle. The reform passes with broader support. You are appointed to design the certification program, which turns out to be significant work and significant influence.',
          changes: { rank: 7, trust: 6, equality: 8, stability: 5 },
          sets: { certificationRole: true },
        },
        {
          text: 'Present your voyage logs from the northern lanes and let the data speak.',
          sub: '"I\'ve run the northern routes three times. Here are the conditions, the passage times, and the cargo outcomes. The committee can draw its own conclusions."',
          consequence: 'The data is harder to argue with than your opinion would have been. The reform passes. Fenrik thanks you afterward for keeping it clean. You\'ve made a useful ally.',
          changes: { rank: 5, trust: 8, equality: 7, stability: 4 },
        },
      ],
    },
    {
      title: 'Night Passage', location: 'Northern Sea Lane — Three Days Out',
      art: 'ocean-night', label: 'SCENE IV',
      npcName: 'First Mate Prael',
      npcLine: '"Navigator Shon. We\'re three degrees off the lodged route. Cutting across saves six hours. The cargo owner is asking."',
      innerVoice: 'Six hours saved means six hours less pay for your crew. That\'s not why you\'re hesitating. You\'re hesitating because the unlodged route is also the one that skips the harbor toll, and that toll funds dock worker pensions.',
      body: `<p>The northern sea is flat and black and very cold. The stars are sharp tonight — ideal navigation conditions. Prael has done the calculation correctly: cutting the headland shaves six hours and saves fuel. <em>What Prael\'s calculation doesn\'t include: the harbor toll on the lodged route contributes directly to the dock pension fund. Taking the unlodged route legally avoids it. Legally. Not honestly.</em></p>`,
      choices: [
        {
          text: 'Hold the lodged route.',
          sub: '"We stay on the filed course. Six hours is six hours."',
          consequence: 'Prael nods, adjusts the heading, and says nothing further. The cargo owner complains at arrival. Your reputation with dock workers — who somehow always know these things — goes up another notch.',
          changes: { rank: 3, trust: 10, equality: 8, stability: 4 },
          sets: { heldRoute: true },
        },
        {
          text: 'Explain the pension fund implication to the cargo owner and let him decide.',
          sub: '"The shorter route skips a toll that funds dock worker pensions. I want you to know that before I make the call."',
          consequence: 'The cargo owner is quiet for a long moment. Then he says: "Hold the route." He is not a good man by most measures, but he is surprised into a good decision by the specificity of the information.',
          changes: { rank: 4, trust: 8, equality: 9, stability: 3 },
        },
        {
          text: 'Take the shortcut. It\'s legal. The toll system is a separate problem.',
          sub: '"Adjust heading. We\'re cutting the headland."',
          consequence: 'You arrive six hours early. The cargo owner is pleased. You don\'t mention the toll to anyone. You file the unlodged route in the morning log and feel the particular discomfort of something that was technically permitted.',
          changes: { rank: 6, trust: -2, equality: -4, stability: 3 },
          sets: { tookShortcut: true },
        },
      ],
    },
    {
      title: 'The Chart Sale', location: 'Harbor Broker\'s Office',
      art: 'harbor-day', label: 'SCENE V',
      npcName: 'Independent Navigator Vesk',
      npcLine: '"Your northern route charts. I\'ve been asking for two years. Name your price — I\'ll pay it. This is my family\'s livelihood."',
      innerVoice: 'You spent three years on those routes earning those charts. They\'re yours. The question is what "yours" means when someone else needs them to survive.',
      body: `<p>Vesk is forty-three and has been trying to break into the northern lanes for seven years. The established houses have kept the charts proprietary — legal but effective at keeping independent navigators out. <em>Your charts are the result of your own three voyages, your own observations, your own risk. Nobody gave them to you. You built them.</em></p><p>If you sell them at market rate, Vesk can\'t afford them. If you share them freely, every navigator you compete with has your knowledge and you lose your competitive edge.</p>`,
      choices: [
        {
          text: 'Sell at a price Vesk can actually pay. Below market.',
          sub: '"Cost price. Don\'t mention this to the broker\'s consortium — they\'ll try to stop it."',
          consequence: 'Vesk gets the charts. He runs the northern lanes the following season. He refers two other navigators to you. You haven\'t lost your edge — you\'ve built a network instead.',
          changes: { rank: 3, trust: 9, equality: 9, stability: 3 },
          sets: { sharedCharts: true },
        },
        {
          text: 'Give Vesk the charts freely — and propose a knowledge-sharing cooperative for independent navigators.',
          sub: '"What if the charts were everyone\'s? A navigator cooperative — we all contribute, we all draw from it. The houses have done this for years. We can too."',
          consequence: 'The cooperative takes a season to organize. Twelve independent navigators join the first year. The northern lanes open. The established houses file an official complaint, which is the best confirmation you could ask for that it\'s working.',
          changes: { rank: 4, trust: 8, equality: 12, stability: 2 },
          sets: { foundedCooperative: true },
        },
        {
          text: 'Sell at full market rate. You earned those charts.',
          sub: '"Full price. That\'s the value — I can\'t set a precedent of underselling my own work."',
          consequence: 'Vesk can\'t afford it. He thanks you for being honest about the price and leaves. You don\'t feel good about it. You\'re not sure the alternative would have felt better.',
          changes: { rank: 5, trust: 1, equality: -3, stability: 5 },
        },
      ],
    },
    {
      title: 'The Corruption Report', location: 'Harbor Authority Office',
      art: 'council', label: 'SCENE VI',
      npcName: 'Harbor Authority Inspector Nole',
      npcLine: '"You\'re saying the consortium has been colluding on cargo declaration standards. That\'s a serious allegation, Navigator Shon. I\'ll need documentation."',
      innerVoice: 'You have the documentation. You\'ve had it for three months. You kept waiting for someone else to file this. No one else has.',
      body: `<p>Inspector Nole has the particular stillness of someone used to receiving bad news about organizations he was supposed to be overseeing. He is not defensive — he\'s taking notes. <em>That\'s a good sign.</em></p><p>The consortium has been coordinating cargo under-declarations across seven merchant houses. The pattern is in the manifests — the same adjustments, the same categories, over four years. It systematically cuts dock worker pension credits across the harbor. You found it because you file accurate manifests and the pattern shows up as an anomaly against your numbers.</p>`,
      memoryLines: {
        refusedFalsify: `<p><em>Yenne asked you to adjust three crates once. You said no. Looking at this four-year pattern, you wonder how long he\'d been doing it before he asked you.</em></p>`,
        heldRoute: `<p><em>You think about the northern passage — holding the lodged route when cutting it would have been legal. Small choices. They add up to being the kind of person Inspector Nole believes when you walk into his office.</em></p>`,
      },
      choices: [
        {
          text: 'File the full report with everything you have.',
          sub: '"Here\'s the documentation. Four years, seven houses, the pattern is clear. I\'ll testify if needed."',
          consequence: 'The investigation takes five months. Three consortium members are fined. The coordinated under-declaration practice is formally prohibited. Dock worker pension credits increase across the harbor by an average of eleven percent. You are called difficult by people whose opinion you have stopped valuing.',
          changes: { rank: 8, trust: 10, equality: 12, stability: 3 },
          sets: { reportedConsortium: true },
        },
        {
          text: 'File the report — but first give the consortium a chance to self-correct.',
          sub: '"I\'m going to give you this documentation. Before I file it officially, I\'d like one week for the consortium to come to you voluntarily. After that, I file regardless."',
          consequence: 'Two of the seven houses come forward voluntarily. The investigation is faster and broader because of it. You are viewed as measured, which is a more durable reputation than righteous.',
          changes: { rank: 7, trust: 8, equality: 10, stability: 5 },
          sets: { reportedConsortium: true },
        },
        {
          text: 'Share the documentation with other independent navigators first so they can corroborate it.',
          sub: '"My word against seven merchant houses is a story. Seven navigators\' documentation is evidence. Let me build the case properly."',
          consequence: 'Four other navigators find the same pattern in their own records within a week. The report you file jointly is impossible to dismiss. The investigation is expedited. The consortium\'s legal challenge goes nowhere.',
          changes: { rank: 6, trust: 9, equality: 11, stability: 4 },
          sets: { reportedConsortium: true },
        },
      ],
    },
    {
      title: 'The Navigator\'s License', location: 'Trade Commission — Final Review',
      art: 'council', label: 'SCENE VII', isFinal: true,
      npcName: 'Trade Commissioner Aren',
      npcLine: '"Navigator Shon. Your license renewal is before this commission — along with your report on the consortium. I want to ask you directly: why file it? You knew it would make enemies."',
      innerVoice: 'Because the dock workers\' pension credits are real money in real lives, and I had the information to stop it being taken from them. That\'s why.',
      body: `<p>Commissioner Aren has the weather-worn face of someone who has been asking hard questions for a long time. She isn\'t hostile. She is trying to understand the calculation you made, because she doesn\'t meet many people who make it. <em>Your license renewal is technically straightforward — your record is clean, your voyage logs are complete, your certifications are current. The question isn\'t really about the license.</em></p>`,
      memoryLines: {
        foundedCooperative: `<p><em>Twelve independent navigators now use the cooperative you started. The northern lanes are open. The established houses are still trying to close them through licensing delays — they won\'t succeed, but they\'ll try for years.</em></p>`,
        reportedConsortium: `<p><em>Three consortium members were fined. Dock worker pension credits have gone up across the harbor. Yenne doesn\'t greet you at the pier anymore. You don\'t miss it.</em></p>`,
      },
      choices: [
        {
          text: '"Because I had accurate records and they didn\'t. That\'s the only reason. I don\'t need a more complicated one."',
          sub: '(You meet her eyes without ceremony.) "The information was mine to use. I used it."',
          consequence: 'Aren is quiet for a moment. Then: "License renewed. Commendation noted." She shakes your hand with the grip of someone who means it. You walk out into the harbor smell and feel, briefly, exactly right about everything.',
          changes: { rank: 10, trust: 11, equality: 8, stability: 6 },
        },
        {
          text: '"Because dock workers\' pension credits are real money in real lives, and I was the one person with the information to stop them being stolen."',
          sub: '"That\'s not complicated. That\'s arithmetic."',
          consequence: 'Aren writes something in her file. Later you find out she quoted you in a trade commission address about navigator accountability. Your words, attributed by name. You are simultaneously proud and slightly embarrassed.',
          changes: { rank: 9, trust: 10, equality: 11, stability: 5 },
        },
        {
          text: '"Because I decided, a long time ago, that my word on a manifest means something. Everything else follows from that."',
          sub: '"The consortium didn\'t believe navigators like me kept that standard. I needed them to be wrong."',
          consequence: 'Aren nods slowly. "That\'s a harder thing to maintain than most people imagine," she says. You tell her: "Yes." The license is renewed. You sail again in three weeks. The sea doesn\'t care about your reputation, which is part of why you love it.',
          changes: { rank: 8, trust: 9, equality: 9, stability: 7 },
        },
      ],
    },
  ],
},

// ══════ DAVAN CORR — THE FORMER TRIBUTE WORKER ══════
{
  id: 'worker', name: 'Davan Corr', title: 'The Former Tribute Worker',
  tagline: 'Fifteen years under the tribute system. He knows exactly what the system costs — and who pays it.',
  color: '#a86030', icon: '◆',
  scenes: [
    {
      title: 'The Quota Meeting', location: 'Craftsmen\'s Guild Hall',
      art: 'assembly', label: 'SCENE I',
      npcName: 'Overseer Bant',
      npcLine: '"The quarterly quota is going up twelve percent. This is not a proposal — it\'s been approved at the district level. Your crew meets it or the contracts go elsewhere."',
      innerVoice: 'You have sat in this chair for fifteen years and listened to this exact speech. The words are different. The structure is identical.',
      body: `<p>The guild hall smells of sawdust and old stone. Bant delivers the quota increase with the brisk efficiency of someone who considers resentment an inefficiency. <em>Twelve percent. You run the numbers in your head without moving. At current pace, twelve percent means two extra hours every day, unpaid, because the daily rate is fixed to the base quota. It always is.</em></p><p>Three of the workers beside you are within two years of pension eligibility. A quota increase at this stage will affect their credit calculations.</p>`,
      choices: [
        {
          text: 'Ask Bant to put the pension credit impact in writing before the crew votes.',
          sub: '"Before we respond: I need the quota increase\'s effect on pension credit calculations documented. In writing. From the district office."',
          consequence: 'Bant is visibly annoyed — this isn\'t a question he expected. The written documentation takes two weeks to arrive. When it does, it confirms the impact. Three workers use it to file formal objections. The quota increase is delayed.',
          changes: { rank: 4, trust: 8, equality: 8, stability: 3 },
          sets: { demandsWritten: true },
        },
        {
          text: 'Refuse the quota increase. Formally, on behalf of the crew.',
          sub: '"The crew doesn\'t accept this. We\'ll put our objection in writing today."',
          consequence: 'Bant warns you the contracts will move. You prepare for that. The contracts don\'t move — finding a crew of your quality and reliability takes longer than he implied. The quota increase is quietly revised downward by six percent.',
          changes: { rank: 5, trust: 7, equality: 9, stability: 1 },
          sets: { refusedQuota: true },
        },
        {
          text: 'Accept the quota — but log every extra hour worked beyond the base, starting today.',
          sub: '(To the crew, quietly:) "Everyone logs hours. Everything extra. All of it."',
          consequence: 'The logs accumulate. After eight weeks you have documentation of 340 collective hours of uncompensated work above the base quota. You take the logs to the guild administrator. The crew receives a retroactive payment adjustment.',
          changes: { rank: 3, trust: 6, equality: 7, stability: 5 },
          sets: { loggedHours: true },
        },
      ],
    },
    {
      title: 'The Pension Shortfall', location: 'Civic Records Office',
      art: 'assembly', label: 'SCENE II',
      npcName: 'Records Clerk Voss',
      npcLine: '"Your tribute-years — the fifteen years before your reclassification — aren\'t eligible for pension credit under current rules. The new framework only counts civic employment years."',
      innerVoice: 'Fifteen years of work. Gone from the ledger as if they didn\'t happen. Because the system that recorded them has been renamed.',
      body: `<p>Clerk Voss is not cruel. She is reciting rules that she finds uncomfortable to recite, which is something. <em>You look at the numbers on the form. Your certified civic years: four. Your tribute years: fifteen. For pension purposes: four.</em></p><p>The transition framework that reclassified tribute workers into the civic employment system did not include a credit conversion mechanism. It was either an oversight or a decision. Either way it has the same effect: nineteen years of labor produces four years of retirement security.</p>`,
      choices: [
        {
          text: 'Request a formal review of the transition framework\'s credit provisions.',
          sub: '"I want a formal review on record — not just my case, the framework itself. This can\'t only be happening to me."',
          consequence: 'The formal review surfaces 847 workers with the same gap. Voss processes your request carefully and files it with the civic review board. It becomes part of the case for the pension reform bill the following year.',
          changes: { rank: 4, trust: 7, equality: 9, stability: 4 },
          sets: { formalReview: true },
        },
        {
          text: 'Find other tribute-era workers with the same shortfall. Build a collective case.',
          sub: '"I know I\'m not alone in this. Before I file anything, I want to understand how many of us there are."',
          consequence: 'You spend three weeks finding forty-three workers with identical gaps. The collective case is substantially harder to dismiss than an individual appeal. A civic advocate takes it without charge.',
          changes: { rank: 3, trust: 9, equality: 10, stability: 2 },
          sets: { builtCollective: true },
        },
        {
          text: 'Ask Voss directly: who decided not to include a credit conversion mechanism?',
          sub: '"I\'m not asking who wrote the rule. I\'m asking who decided not to include the conversion. Someone made that choice. I want to know who."',
          consequence: 'Voss checks the original framework documentation. It was an administrative working group. Their names are public record. You write them down. Having names makes the next step easier.',
          changes: { rank: 5, trust: 5, equality: 8, stability: 2 },
          sets: { hasNames: true },
        },
      ],
    },
    {
      title: 'The Union Meeting', location: 'Workers\' Assembly Hall',
      art: 'assembly', label: 'SCENE III',
      npcName: 'Union Organizer Fenn',
      npcLine: '"We\'re asking for a strike authorization vote. The tribute credit gap, the quota system, the unsafe hours — it\'s all connected. We need to move together or not at all. Corr — you have credibility with the older workers. We need your voice."',
      innerVoice: 'Fenn is right that it\'s connected. You\'re less certain about the strike. Strikes can be won or lost, and what gets lost is harder to rebuild than what got taken.',
      body: `<p>The assembly hall is warm with bodies — ninety workers, maybe more. The energy in the room is the specific kind that comes from people who have been patient for a long time and have decided to stop. <em>You know this energy. You\'ve felt it before. You also know what happens when it breaks wrong.</em></p><p>Fenn has been organizing for six years. She is effective and impatient, which is a combination that moves things faster than slow. You trust her goals. You\'re not certain about her timeline.</p>`,
      choices: [
        {
          text: 'Endorse the strike authorization but ask for a negotiation deadline before action.',
          sub: '"I\'m with Fenn. But I want thirty days of formal negotiation first — in writing, with a documented response required. If they don\'t respond, we move. That timeline is reasonable, and it protects us legally."',
          consequence: 'The negotiation deadline is accepted. The district responds within twenty days, offering a partial quota adjustment and a promise to review the tribute credit gap. Fenn isn\'t satisfied. You tell her: this is the opening, not the end.',
          changes: { rank: 5, trust: 8, equality: 8, stability: 4 },
          sets: { negotiationFirst: true },
        },
        {
          text: 'Speak in support of the strike. All of it, now.',
          sub: '"We\'ve been reasonable for fifteen years. There is no version of reasonable they haven\'t found a way around. I vote yes."',
          consequence: 'The room responds. The authorization passes. The strike lasts nine days. It is difficult and it works. The tribute credit gap goes onto the district\'s formal agenda. Some workers lose a week\'s pay they couldn\'t afford to lose. You don\'t forget that.',
          changes: { rank: 6, trust: 7, equality: 10, stability: -2 },
          sets: { organised: true },
        },
        {
          text: 'Recommend building the case publicly before striking.',
          sub: '"Strike when the public knows what we\'re striking for. Right now they don\'t. Give me two weeks to change that."',
          consequence: 'You spend two weeks speaking at civic assemblies and sending documentation to the civic gazette. By the time the strike vote happens again, three neighborhood councils have publicly backed the workers. The district settles before the strike starts.',
          changes: { rank: 4, trust: 9, equality: 9, stability: 5 },
          sets: { builtPublicCase: true },
        },
      ],
    },
    {
      title: 'The Safety Report', location: 'Guild Administration Office',
      art: 'corridor', label: 'SCENE IV',
      npcName: 'Guild Administrator Helm',
      npcLine: '"The unsafe timber frame was repaired last week. The incident report was filed internally. There\'s no need to escalate this to the civic safety inspector — it\'s handled."',
      innerVoice: 'A worker broke his wrist because of that frame. "Handled" means the frame was fixed. It doesn\'t mean the worker was compensated, or that the safety check that missed it was reviewed.',
      body: `<p>Administrator Helm\'s office is tidy and defensive in equal measure. The frame was repaired — that part is true. <em>What Helm isn\'t mentioning: the safety inspection that cleared the frame three weeks before it failed was signed by a guild inspector who hasn\'t walked the floor in six months. You\'ve seen the logbook. You know the signature.</em></p><p>The worker who broke his wrist is named Priv. He is thirty-one. He is currently on reduced pay because his modified duties count as a different classification.</p>`,
      choices: [
        {
          text: 'File with the civic safety inspector yourself. Today.',
          sub: '"The internal filing doesn\'t cover the inspection failure. I\'m filing with the external inspector. Priv deserves a full review."',
          consequence: 'The inspection review finds three other frames flagged and ignored in the same building. The inspector\'s signature is investigated. The guild tightens its inspection protocols. Priv receives a classification review and full compensation.',
          changes: { rank: 5, trust: 8, equality: 9, stability: 2 },
          sets: { filedSafety: true },
        },
        {
          text: 'Demand Priv\'s compensation be settled before you agree this is "handled."',
          sub: '"The frame is fixed. Priv hasn\'t been compensated at full rate. Until that\'s done, this isn\'t handled — it\'s half-handled."',
          consequence: 'Helm processes a full-rate compensation adjustment for Priv the same week. You do not file the external report. The inspection problem remains — for now.',
          changes: { rank: 3, trust: 7, equality: 7, stability: 5 },
        },
        {
          text: 'Ask Priv what he wants done before you decide anything.',
          sub: '"This affects him most. I\'m not going to decide how to handle it without knowing what he needs."',
          consequence: 'Priv wants his pay restored and doesn\'t want more trouble. You get him the pay. You file a partial report that flags the inspection issue without naming him. It\'s the right compromise. It takes longer.',
          changes: { rank: 2, trust: 10, equality: 8, stability: 4 },
        },
      ],
    },
    {
      title: 'The Cooperative Charter', location: 'Civic Records Office',
      art: 'council', label: 'SCENE V',
      npcName: 'Charter Clerk Mev',
      npcLine: '"A worker-owned cooperative requires five founding members, a capital bond, and a civic purpose statement. You have the members. You\'re short on the bond by half."',
      innerVoice: 'The bond exists to stop people like you from doing exactly what you\'re trying to do. You know that. File anyway.',
      body: `<p>Clerk Mev is efficient and, you think, privately rooting for you — she keeps re-reading the bond requirement as if a different amount might appear. <em>The cooperative you\'re founding would be the first worker-owned craftsmen\'s collective in this district. The capital bond requirement was written when cooperatives were a theoretical concern. Nobody expected one to actually try to file.</em></p>`,
      memoryLines: {
        builtCollective: `<p><em>Forty-three workers with identical pension gaps. Twelve of them are contributing to the cooperative bond — a little from each, adding up to something that looks like solidarity and functions like capital.</em></p>`,
        refusedQuota: `<p><em>The workers who stood beside you at the quota meeting are four of the five founding members. There is a specific quality of trust that comes from standing in the same room when something was at stake.</em></p>`,
      },
      choices: [
        {
          text: 'Pool contributions from every worker who\'s committed. File what you have and let the process move.',
          sub: '"We\'re filing today with what we\'ve got. The clerk can note the bond deficit — we\'ll clear it within sixty days. That\'s the formal timeline anyway."',
          consequence: 'Mev processes the filing with a sixty-day bond completion notice. You clear the bond in forty-one days. The cooperative is chartered. It\'s the first one in the district. It won\'t be the last.',
          changes: { rank: 7, trust: 8, equality: 10, stability: 4 },
          sets: { cooperativeChartered: true },
        },
        {
          text: 'Ask Mev what the minimum viable filing looks like. Find every legal way to reduce the bond.',
          sub: '"Walk me through the bond calculation. I want to know if there\'s a legal path we haven\'t found."',
          consequence: 'There is one: a civic purpose bond reduction for cooperatives in underserved craft categories. Your craft qualifies. The reduction brings the bond to within your reach in two weeks. You file immediately.',
          changes: { rank: 6, trust: 7, equality: 9, stability: 5 },
          sets: { cooperativeChartered: true },
        },
        {
          text: 'Request that the district civic fund consider a bond loan for first-time cooperative filings.',
          sub: '"We\'re not asking for charity. We\'re asking for the same access to capital that established merchant houses receive through their existing bond relationships."',
          consequence: 'The request is reviewed. It takes two months. The district approves a first-cooperative bond loan program — not just for you, but for any future cooperative filing. You get your loan. Three other cooperatives file the following year, citing your precedent.',
          changes: { rank: 5, trust: 9, equality: 12, stability: 3 },
          sets: { cooperativeChartered: true },
        },
      ],
    },
    {
      title: 'The Public Speech', location: 'Eastward District — Rooftop Assembly',
      art: 'rooftop', label: 'SCENE VI',
      npcName: 'Neighbor Aleth',
      npcLine: '"Davan. The pension reform bill is going to the council next week. Someone needs to speak at the public forum. You\'re the one who knows what it actually means — in actual lives. Will you?"',
      innerVoice: 'You don\'t make speeches. You never have. But nobody who does make speeches has lived what you\'ve lived — and the council is about to vote on something that depends on them understanding it.',
      body: `<p>The rooftop assembly meets after dark because the district hall was double-booked and nobody was surprised. The sky is clear. There are forty people on this roof and a drop of four floors on every side. <em>Aleth chose this venue on purpose — you can see the bridge from here, where three of the workers in tonight\'s audience have spent the last two decades.</em></p>`,
      memoryLines: {
        cooperativeChartered: `<p><em>The cooperative\'s first month of operation cleared twelve percent more in worker earnings than the equivalent contracted work would have. You have the numbers. You know what they mean.</em></p>`,
        builtPublicCase: `<p><em>You did this before — two weeks of civic assemblies, speaking until the public understood what the workers were asking for. It worked then. The scale is larger now.</em></p>`,
      },
      choices: [
        {
          text: 'Speak. Tell them exactly what fifteen years as a tribute worker felt like — and what the pension gap costs in real terms.',
          sub: '"I\'m going to tell you what the numbers look like when they\'re your numbers. Then I\'m going to tell you what I want the council to do about it."',
          consequence: 'The speech is recorded by two people in the audience who share it without asking. The civic gazette publishes an excerpt. Three council members contact the reform bill\'s sponsors before the forum ends. You don\'t sleep well that night — not from anxiety, from something closer to release.',
          changes: { rank: 8, trust: 11, equality: 10, stability: 2 },
          sets: { madePublicSpeech: true },
        },
        {
          text: 'Speak — but focus on what the reform would create, not what the current system has cost.',
          sub: '"I\'m not here to make you angry at the past. I\'m here to show you what the future looks like if this bill passes — for real people, in real numbers."',
          consequence: 'The forward-focused framing reaches people who came skeptical of worker advocacy. Four of them leave committed to attending the public forum. The council hears from a broader coalition than any previous reform effort.',
          changes: { rank: 7, trust: 9, equality: 9, stability: 5 },
          sets: { madePublicSpeech: true },
        },
        {
          text: 'Bring one of the affected workers to speak alongside you. Your voice and theirs.',
          sub: '"I\'ll speak first. Then Priv is going to say what the safety shortfall and pension gap cost his family. In his words."',
          consequence: 'Priv speaks for four minutes. Forty people on a rooftop are absolutely still. The cooperative\'s presence in the forum triples the media coverage the bill receives. It passes.',
          changes: { rank: 6, trust: 12, equality: 11, stability: 3 },
          sets: { madePublicSpeech: true },
        },
      ],
    },
    {
      title: 'The Reform Vote', location: 'Imperial Council Chamber',
      art: 'council', label: 'SCENE VII', isFinal: true,
      npcName: 'Council Chair Iren',
      npcLine: '"The pension reform bill — tribute credit conversion article. The cooperative sector is entitled to one representative statement. Who speaks for you?"',
      innerVoice: 'You. Obviously you. You\'ve been building to this room for fifteen years without knowing it.',
      body: `<p>The council chamber is colder than you expected. The chairs are arranged in a semicircle around a floor space where speakers stand. You have stood in many rooms in your life. <em>Most of them were rooms designed to make you smaller. This one is designed to make the speaker central — a different experience entirely.</em></p><p>The tribute credit conversion article would retroactively credit tribute years at a civic-equivalent rate for pension calculations. 847 workers. Fifteen years of labor, restored to the ledger.</p>`,
      memoryLines: {
        madePublicSpeech: `<p><em>You\'ve said this in public before. You know what the words cost you and what they open in the people who hear them. Say them again.</em></p>`,
        cooperativeChartered: `<p><em>The cooperative exists. Twelve members, one charter, four months of operation. It is evidence that the people you\'re speaking for can build things when the system gets out of the way.</em></p>`,
      },
      choices: [
        {
          text: 'Give the numbers. Clean, precise, undeniable.',
          sub: '"847 workers. 15 years each, on average. 12,705 combined years of labor not counted toward their retirement. The conversion cost to the fund is documented and manageable. I\'ll take any question on any figure."',
          consequence: 'The bill passes 17-10. The precision of the numbers makes it harder to vote against without looking negligent. Pension credits begin processing for 847 workers within the month. You read the gazette that morning in the cooperative office.',
          changes: { rank: 15, trust: 9, equality: 12, stability: 6 },
        },
        {
          text: 'Speak as a tribute worker. Tell this chamber what it cost, in the first person.',
          sub: '"I worked fifteen years under the tribute system. Those fifteen years are not in my pension file. I want the council to understand — not abstractly — what that means to a person who is standing in front of you."',
          consequence: 'The chamber is quiet in a way chambers rarely are. The bill passes 19-8. Three council members who were undecided vote yes. Afterward, one of them tells you: "I didn\'t understand what we were voting on until you walked in." That is the thing you\'ll remember.',
          changes: { rank: 14, trust: 12, equality: 13, stability: 4 },
        },
        {
          text: 'Yield part of your time to one of the 847 workers. Let the council hear directly.',
          sub: '"I\'ll use two of my five minutes. The remaining three belong to a tribute worker named Aleth, who is better qualified than I am to explain what this bill means."',
          consequence: 'Aleth speaks for three minutes. She doesn\'t have your practice at this. She has something more important: the council hears someone who has nothing to gain from eloquence and everything to gain from the vote. The bill passes 20-7. It is the largest margin any pension reform has received.',
          changes: { rank: 13, trust: 11, equality: 14, stability: 5 },
        },
      ],
    },
  ],
},

]; // end CHARACTERS




// ── ENDINGS (condition-based, per character) ──────────────────────────────────
const ENDINGS = {
  strategist: [
    {
      condition: s => s.rank >= 76 && s.trust >= 65,
      eyebrow: 'KAEL DORN — CIVIC RECORD SEALED',
      title: 'The Voice of the Council',
      body: 'Kael\'s unflinching honesty in exam halls and public assemblies earned him a Council seat no one could question. The lowborn boy who memorized law books by candlelight now writes them.'
    },
    {
      condition: s => s.rank >= 52 && s.equality >= 60,
      eyebrow: 'KAEL DORN — CIVIC RECORD SEALED',
      title: 'Public Officer of the Eastward District',
      body: 'He never reached the Council, but as a Public Officer he rewrote pension access rules that freed three thousand tribute workers from debt. Iliatania noticed.'
    },
    {
      condition: s => s.trust >= 60,
      eyebrow: 'KAEL DORN — CIVIC RECORD SEALED',
      title: 'The Trusted Examiner',
      body: 'Rank eluded him, but trust did not. Kael became the most respected exam proctor in the Imperial Academy — the one students prayed would read their papers.'
    },
    {
      condition: () => true,
      eyebrow: 'KAEL DORN — CIVIC RECORD SEALED',
      title: 'A Citizen Who Tried',
      body: 'He did not rise as high as he hoped. But he played fair, left the system a little cleaner, and the students he mentored remember his name.'
    },
  ],
  healer: [
    {
      condition: s => s.rank >= 64 && s.equality >= 70,
      eyebrow: 'TESSYN VAYLE — CIVIC RECORD SEALED',
      title: 'Director of Public Medicine',
      body: 'Tessyn\'s insistence on equal care regardless of rank reshaped Iliatania\'s hospital charter. Every ward now displays the Vayle Principle: "Illness does not ask your rank."'
    },
    {
      condition: s => s.rank >= 52 && s.trust >= 65,
      eyebrow: 'TESSYN VAYLE — CIVIC RECORD SEALED',
      title: 'Senior Civic Physician',
      body: 'Trusted by patients across every district, Tessyn built a network of healers trained in Veyran methods. She never stopped learning — or teaching.'
    },
    {
      condition: s => s.stability >= 65,
      eyebrow: 'TESSYN VAYLE — CIVIC RECORD SEALED',
      title: 'The Steady Healer',
      body: 'When the fever outbreak spread through the lower districts, Tessyn stayed. The city\'s stability owed a debt to her quiet resilience that the records never fully captured.'
    },
    {
      condition: () => true,
      eyebrow: 'TESSYN VAYLE — CIVIC RECORD SEALED',
      title: 'A Healer Who Stayed',
      body: 'Rank came slowly and recognition slower. But every patient she treated honestly left healthier — and that, she told her apprentices, was enough.'
    },
  ],
  navigator: [
    {
      condition: s => s.rank >= 76 && s.trust >= 70,
      eyebrow: 'MARA SHON — CIVIC RECORD SEALED',
      title: 'Imperial Trade Commissioner',
      body: 'Mara\'s refusal to falsify manifests cost her one contract and won her an empire\'s confidence. She now sets the standards every navigator is measured against.'
    },
    {
      condition: s => s.rank >= 52 && s.equality >= 60,
      eyebrow: 'MARA SHON — CIVIC RECORD SEALED',
      title: 'Guild Charter Navigator',
      body: 'She restructured the navigator guild to share route knowledge freely — ending the era of hoarded maps that kept new traders poor. The sea opened for everyone.'
    },
    {
      condition: s => s.trust >= 65,
      eyebrow: 'MARA SHON — CIVIC RECORD SEALED',
      title: 'The Honest Merchant',
      body: 'Buyers across three ports learned: Mara Shon\'s word is the manifest. Her reputation outlasted every competitor who chose shortcuts over honesty.'
    },
    {
      condition: () => true,
      eyebrow: 'MARA SHON — CIVIC RECORD SEALED',
      title: 'A Navigator Who Charted Fair',
      body: 'The sea does not reward fairness — but the people who sail it do. Mara\'s routes, her logs, and her name were passed down to a generation of navigators she never met.'
    },
  ],
  worker: [
    {
      condition: s => s.rank >= 64 && s.equality >= 70,
      eyebrow: 'DAVAN CORR — CIVIC RECORD SEALED',
      title: 'Founder of the Worker Cooperative',
      body: 'Davan turned fifteen years of tribute labour into the blueprint for Iliatania\'s first worker-owned cooperative. The system he escaped now studied him.'
    },
    {
      condition: s => s.rank >= 52 && s.stability >= 65,
      eyebrow: 'DAVAN CORR — CIVIC RECORD SEALED',
      title: 'Civic Contributor — Guild Master',
      body: 'He became the steadying hand of the craftsmen\'s guild: negotiating fair wages, blocking unsafe quotas, and making sure no younger worker signed what he once signed.'
    },
    {
      condition: s => s.trust >= 65,
      eyebrow: 'DAVAN CORR — CIVIC RECORD SEALED',
      title: 'The Worker They Trusted',
      body: 'His colleagues voted him shop steward every term. Not for his rank — he never climbed far — but because he told the truth when telling it was costly.'
    },
    {
      condition: () => true,
      eyebrow: 'DAVAN CORR — CIVIC RECORD SEALED',
      title: 'A Worker Who Endured',
      body: 'The system ground him. He pushed back. He didn\'t win everything, but his name appears in the margin of the cooperative charter — one of the hands that started something.'
    },
  ],
};

// ── FINAL ENDINGS (Council of Voices, all four characters played) ─────────────
const FINAL_ENDINGS = [
  {
    condition: stats => stats.rank >= 70 && stats.trust >= 70 && stats.equality >= 65 && stats.stability >= 65,
    title: 'The Golden Compact',
    subtitle: 'Iliatania enters an era of honest governance not seen in three generations.',
    gem: '◈',
    body: `<p>Four voices — exam hall, hospital ward, trade deck, craftsmen's bench — rose through the same merit system and chose, every time, the harder honest path.</p>
<p>The Council they shaped wrote pension protections that could not be purchased away. The equality they defended became law. The stability they tended held when lesser systems cracked.</p>
<p>Iliatania did not become perfect. It became honest about its imperfections. That was enough to change the world.</p>`,
  },
  {
    condition: stats => stats.rank >= 55 && stats.trust >= 60,
    title: 'The Merit Compact',
    subtitle: 'Slow, imperfect — but the system moves toward fairness.',
    gem: '◉',
    body: `<p>None of the four reached the highest rank. But each left the system more navigable for the next generation. Pension credits expanded. Exam fraud dropped. The hospitals posted waiting times for every district.</p>
<p>Change in Iliatania is not a single voice — it is a chorus of decisions, each small, each leaving a mark. The archive holds their names.</p>`,
  },
  {
    condition: stats => stats.equality >= 60 && stats.stability >= 55,
    title: 'The Steady Foundation',
    subtitle: 'Equality and stability take root where least expected.',
    gem: '⊕',
    body: `<p>They did not dominate the rankings. But the society they supported grew more equal and more stable than the records predicted. A healer's fairness, a worker's stubbornness, a navigator's honest log — each eroded the small corruptions that compound into great injustice.</p>
<p>Iliatania noticed. Slowly. The way all honest systems do.</p>`,
  },
  {
    condition: () => true,
    title: 'Four Citizens of Iliatania',
    subtitle: 'The archive holds every choice. Nothing is forgotten.',
    gem: '◆',
    body: `<p>They did not all rise high. They did not all choose wisely. But they navigated a system that demands merit and rewards it imperfectly — and in doing so they revealed both the promise and the failure of Iliatania's great experiment.</p>
<p>The archive seals their record. Future citizens will read it and decide: was the compact kept?</p>`,
  },
];

// ── GAME STATE ────────────────────────────────────────────────────────────────
const gameState = {
  currentChar: null,
  currentScene: 0,
  stats: { ...INITIAL_STATS },
  completed: {},      // { charId: { title, stats } }
  councilPlayed: false,
  memory: {},         // { flagName: true } — set by choices, read by scenes
};

// ── HELPERS ───────────────────────────────────────────────────────────────────
function clamp(v, lo = 0, hi = 100) { return Math.max(lo, Math.min(hi, v)); }

function getCurrentRank(rankVal) {
  for (const r of RANKS) {
    if (rankVal >= r.min) return r.name;
  }
  return RANKS[RANKS.length - 1].name;
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => {
    s.classList.remove('active');
    s.classList.add('hidden');
  });
  const el = document.getElementById(id);
  el.classList.remove('hidden');
  el.classList.add('active');
}

// ── STAT RENDERING ────────────────────────────────────────────────────────────
function renderStats() {
  const hud = document.getElementById('ss-bars');
  hud.innerHTML = '';
  STAT_DEFS.forEach(def => {
    const val = gameState.stats[def.key] ?? 50;
    const pct = Math.round(val);
    const bar = document.createElement('div');
    bar.className = 'ss-row';
    bar.innerHTML = `
      <div class="ss-row-head">
        <span class="ss-icon" style="color:${def.color}">${def.icon}</span>
        <span class="ss-label">${def.label}</span>
        <span class="ss-val">${pct}</span>
      </div>
      <div class="ss-track"><div class="ss-fill" id="fill-${def.key}" style="width:${pct}%;background:${def.color}"></div></div>`;
    hud.appendChild(bar);
  });
  // Update rank display
  const rankEl = document.getElementById('rank-display');
  if (rankEl) {
    const rankName = getCurrentRank(gameState.stats.rank);
    rankEl.innerHTML = `<span class="rank-tier">CURRENT RANK</span><span class="rank-name">${rankName}</span>`;
  }
}

function animateStats(changes) {
  Object.entries(changes).forEach(([key, delta]) => {
    const oldVal = gameState.stats[key] ?? 50;
    const newVal = clamp(oldVal + delta);
    gameState.stats[key] = newVal;
    const fill = document.getElementById(`fill-${key}`);
    if (fill) {
      fill.style.transition = 'width 0.6s ease';
      fill.style.width = newVal + '%';
    }
    const valEl = fill && fill.closest('.ss-row').querySelector('.ss-val');
    if (valEl) valEl.textContent = Math.round(newVal);
  });
  // Update rank display after animation
  const rankEl = document.getElementById('rank-display');
  if (rankEl) {
    const rankName = getCurrentRank(gameState.stats.rank);
    rankEl.innerHTML = `<span class="rank-tier">CURRENT RANK</span><span class="rank-name">${rankName}</span>`;
  }
}

// ── CHARACTER SELECT ──────────────────────────────────────────────────────────
function renderCharSelect() {
  const grid = document.getElementById('char-grid');
  grid.innerHTML = '';
  CHARACTERS.forEach(char => {
    const done = gameState.completed[char.id];
    const card = document.createElement('div');
    card.className = 'char-card' + (done ? ' char-done' : '');
    card.style.setProperty('--char-color', char.color);
    card.innerHTML = `
      <div class="char-card-top">
        <span class="char-icon" style="color:${char.color}">${char.icon}</span>
        ${done ? '<span class="char-badge">&#10003; Complete</span>' : ''}
      </div>
      <h3 class="char-name">${char.name}</h3>
      <p class="char-card-title">${char.title}</p>
      <p class="char-card-tag">${char.tagline}</p>
      ${done ? `<p class="char-done-title">${done.title}</p>` : '<button class="btn-primary char-play-btn">&#9670; Play</button>'}`;
    if (!done) {
      card.querySelector('.char-play-btn').addEventListener('click', () => startCharacter(char.id));
    }
    grid.appendChild(card);
  });

  const allDone = CHARACTERS.every(c => gameState.completed[c.id]);
  const unlock = document.getElementById('council-unlock');
  if (allDone && !gameState.councilPlayed) {
    unlock.classList.remove('hidden');
  } else {
    unlock.classList.add('hidden');
  }
}

// ── START CHARACTER ───────────────────────────────────────────────────────────
function startCharacter(charId) {
  const char = CHARACTERS.find(c => c.id === charId);
  if (!char) return;
  gameState.currentChar = char;
  gameState.currentScene = 0;
  gameState.stats = { ...INITIAL_STATS };
  gameState.memory = {};
  document.documentElement.style.setProperty('--char-color', char.color);
  showScreen('game-screen');
  document.getElementById('gh-charname').textContent = char.name;
  renderStats();
  showScene(0);
}

// ── SCENE RENDERING ───────────────────────────────────────────────────────────
function showScene(idx) {
  const char = gameState.currentChar;
  const scene = char.scenes[idx];
  if (!scene) return;

  // Cutscene overlay
  showCutscene(scene, () => {
    renderScene(scene, idx);
  });
}


function toRoman(num) {
  const romans = [
    ['M', 1000], ['CM', 900], ['D', 500], ['CD', 400],
    ['C', 100], ['XC', 90], ['L', 50], ['XL', 40],
    ['X', 10], ['IX', 9], ['V', 5], ['IV', 4], ['I', 1]
  ];
  let result = '';
  for (const [roman, value] of romans) {
    while (num >= value) {
      result += roman;
      num -= value;
    }
  }
  return result;
}

function showCutscene(scene, cb) {
  const ov = document.getElementById('cutscene-ov');
  document.getElementById('cso-loc').textContent = scene.location || '';
  document.getElementById('cso-ttl').textContent = scene.title || '';
  const sceneIdx = gameState.currentScene;
  const total = gameState.currentChar.scenes.length;
  document.getElementById('cso-num').textContent = `${scene.label || ('Scene ' + toRoman(sceneIdx + 1))} of ${toRoman(total)}`;
  ov.classList.add('cso-on');
  setTimeout(() => {
    ov.classList.remove('cso-on');
    if (cb) cb();
  }, 2200);
}

function renderScene(scene, idx) {
  const char = gameState.currentChar;
  const total = char.scenes.length;

  // Progress
  document.getElementById('gh-prog').textContent = `Scene ${toRoman(idx + 1)} / ${toRoman(total)}`;

  // Art background
  const artEl = document.getElementById('scene-art');
  const artVal = SCENE_ART[scene.art];
  artEl.style.background = artVal ? '' : '#1a1a2e';
  artEl.innerHTML = artVal || '';

  // Silhouette
  const silEl = document.getElementById('player-silhouette');
  silEl.innerHTML = SILHOUETTES[char.id] || '';
  silEl.classList.remove('sil-vis');
  requestAnimationFrame(() => requestAnimationFrame(() => silEl.classList.add('sil-vis')));

  // NPC bubble
  const bubbleEl = document.getElementById('npc-bubble');
  bubbleEl.classList.remove('npc-vis', 'hidden');
  if (scene.npcName && scene.npcLine) {
    document.getElementById('npc-speaker').textContent = scene.npcName;
    document.getElementById('npc-line').textContent = scene.npcLine;
    requestAnimationFrame(() => requestAnimationFrame(() => bubbleEl.classList.add('npc-vis')));
  } else {
    bubbleEl.classList.add('hidden');
  }

  // Dialogue panel
  document.getElementById('sc-location').textContent = scene.location || '';
  document.getElementById('sc-label').textContent = scene.label || '';
  document.getElementById('sc-title').textContent = scene.title || '';

  // Body + optional memory-injected lines
  let bodyHtml = scene.body || '';
  if (scene.memoryLines) {
    Object.entries(scene.memoryLines).forEach(([flag, html]) => {
      if (gameState.memory[flag]) bodyHtml += html;
    });
  }
  document.getElementById('sc-body').innerHTML = bodyHtml;

  // Inline NPC quote inside dialogue panel
  const dpNpc = document.getElementById('dp-npc');
  if (scene.npcName && scene.npcLine) {
    document.getElementById('dp-npc-name').textContent = scene.npcName;
    document.getElementById('dp-npc-text').textContent = scene.npcLine;
    dpNpc.classList.remove('hidden');
  } else {
    dpNpc.classList.add('hidden');
  }

  // Inner voice
  const ivEl = document.getElementById('inner-voice');
  if (scene.innerVoice) {
    ivEl.textContent = scene.innerVoice;
    ivEl.classList.remove('hidden');
  } else {
    ivEl.classList.add('hidden');
  }

  // Choices
  renderChoices(scene.choices);

  // Hide consequence/continue from last scene
  document.getElementById('consequence').classList.add('hidden');
  document.getElementById('continue-btn').classList.add('hidden');

  // Rank display in header right
  const ghRight = document.getElementById('gh-right');
  ghRight.innerHTML = `<span class="gh-rank">${getCurrentRank(gameState.stats.rank)}</span>`;
}

// ── CHOICES ───────────────────────────────────────────────────────────────────
function renderChoices(choices) {
  const box = document.getElementById('choices');
  box.innerHTML = '';
  choices.forEach((ch, i) => {
    // Check memory requirement
    if (ch.requiresMemory && !gameState.memory[ch.requiresMemory]) return;

    const locked = ch.minStat && Object.entries(ch.minStat).some(([k, v]) => (gameState.stats[k] || 0) < v);
    const btn = document.createElement('button');
    btn.className = 'choice-btn' + (locked ? ' locked' : '');
    const lockNote = locked
      ? `<span class="choice-lock-note">Requires higher ${Object.keys(ch.minStat).join('/')}</span>`
      : '';
    btn.innerHTML = `<span class="choice-main">${ch.text}</span>${ch.sub ? `<span class="choice-sub">${ch.sub}</span>` : ''}${lockNote}`;
    if (!locked) btn.addEventListener('click', () => handleChoice(ch, i));
    box.appendChild(btn);
  });
}

function handleChoice(choice, idx) {
  // Disable all choices
  document.querySelectorAll('.choice-btn').forEach(b => {
    b.disabled = true;
    b.classList.remove('selected');
  });
  const btns = document.querySelectorAll('.choice-btn');
  if (btns[idx]) btns[idx].classList.add('selected');

  // Apply stat changes
  if (choice.changes) animateStats(choice.changes);

  // Record memory flags
  if (choice.sets) Object.assign(gameState.memory, choice.sets);

  // Show consequence
  const consEl = document.getElementById('consequence');
  const consText = document.getElementById('consequence-text');
  const consChips = document.getElementById('consequence-chips');
  consText.textContent = choice.consequence || '';
  consChips.innerHTML = '';
  if (choice.changes) {
    Object.entries(choice.changes).forEach(([key, delta]) => {
      const def = STAT_DEFS.find(d => d.key === key);
      if (!def) return;
      const chip = document.createElement('span');
      chip.className = 'chip ' + (delta >= 0 ? 'chip-pos' : 'chip-neg');
      chip.textContent = `${def.icon} ${def.label} ${delta >= 0 ? '+' : ''}${delta}`;
      consChips.appendChild(chip);
    });
  }
  consEl.classList.remove('hidden');
  document.getElementById('continue-btn').classList.remove('hidden');
}

// ── NEXT SCENE / FINISH ───────────────────────────────────────────────────────
function nextScene() {
  const char = gameState.currentChar;
  const next = gameState.currentScene + 1;
  if (next >= char.scenes.length) {
    finishCharacter();
  } else {
    gameState.currentScene = next;
    showScene(next);
  }
}

function finishCharacter() {
  const char = gameState.currentChar;
  const stats = { ...gameState.stats };
  const endings = ENDINGS[char.id] || [];
  const match = endings.find(e => e.condition(stats)) || endings[endings.length - 1];

  gameState.completed[char.id] = { title: match ? match.title : 'Complete', stats };

  // Show character ending screen
  document.getElementById('ce-eyebrow').textContent = match ? match.eyebrow : char.name;
  document.getElementById('ce-title').textContent = match ? match.title : 'Journey Complete';
  document.getElementById('ce-body').textContent = match ? match.body : '';
  showScreen('char-end-screen');
}

// ── FINAL ENDING ──────────────────────────────────────────────────────────────
function calculateEnding() {
  const completed = Object.values(gameState.completed);
  if (completed.length === 0) return;
  const avg = { rank: 0, trust: 0, equality: 0, stability: 0 };
  completed.forEach(c => {
    STAT_DEFS.forEach(def => { avg[def.key] = (avg[def.key] || 0) + (c.stats[def.key] || 0); });
  });
  STAT_DEFS.forEach(def => { avg[def.key] = Math.round(avg[def.key] / completed.length); });
  return avg;
}

function showFinalEnding() {
  gameState.councilPlayed = true;
  const avg = calculateEnding();
  const match = FINAL_ENDINGS.find(e => e.condition(avg)) || FINAL_ENDINGS[FINAL_ENDINGS.length - 1];

  document.getElementById('ending-title').textContent = match.title;
  document.getElementById('ending-subtitle').textContent = match.subtitle;
  document.getElementById('ending-gem').textContent = match.gem || '◈';
  document.getElementById('ending-body').innerHTML = match.body;

  // Art background (use a generic civic art)
  const bgArt = document.getElementById('ending-bg-art');
  bgArt.innerHTML = SCENE_ART['assembly'] || '';

  // Voice summaries
  const voicesBox = document.getElementById('ending-voices');
  voicesBox.innerHTML = '<p class="ev-header">Four Voices — Sealed Record</p>';
  CHARACTERS.forEach(char => {
    const done = gameState.completed[char.id];
    if (!done) return;
    const div = document.createElement('div');
    div.className = 'ev-entry';
    div.style.setProperty('--char-color', char.color);
    div.innerHTML = `<span class="ev-icon" style="color:${char.color}">${char.icon}</span>
      <span class="ev-name">${char.name}</span>
      <span class="ev-title">${done.title}</span>`;
    voicesBox.appendChild(div);
  });

  // Final averaged stats
  const statsBox = document.getElementById('ending-final-stats');
  statsBox.innerHTML = '<p class="efs-header">Averaged Civic Record</p>';
  STAT_DEFS.forEach(def => {
    const val = avg[def.key] ?? 50;
    const row = document.createElement('div');
    row.className = 'efs-row';
    row.innerHTML = `<span class="efs-icon" style="color:${def.color}">${def.icon}</span>
      <span class="efs-label">${def.label}</span>
      <div class="efs-track"><div class="efs-fill" style="width:${val}%;background:${def.color}"></div></div>
      <span class="efs-val">${val}</span>`;
    statsBox.appendChild(row);
  });

  showScreen('ending-screen');
}

// ── EVENT LISTENERS ───────────────────────────────────────────────────────────
document.getElementById('start-btn').addEventListener('click', () => {
  showScreen('char-screen');
  renderCharSelect();
});

document.getElementById('back-btn').addEventListener('click', () => {
  showScreen('char-screen');
  renderCharSelect();
});

document.getElementById('continue-btn').addEventListener('click', nextScene);

document.getElementById('ce-continue').addEventListener('click', () => {
  showScreen('char-screen');
  renderCharSelect();
});

document.getElementById('council-btn').addEventListener('click', showFinalEnding);

document.getElementById('ending-replay-btn').addEventListener('click', () => {
  showScreen('char-screen');
  renderCharSelect();
});

document.getElementById('ending-restart-btn').addEventListener('click', () => {
  gameState.completed = {};
  gameState.councilPlayed = false;
  gameState.currentChar = null;
  gameState.currentScene = 0;
  gameState.stats = { ...INITIAL_STATS };
  showScreen('title-screen');
});
