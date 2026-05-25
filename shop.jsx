// shop.jsx — Sugar Lane sweet shop facade, interior counter, donut, coffee, card terminal.

const SHOP_C = {
  sky:        '#dbeefb',
  skyDeep:    '#b5d8ee',
  sidewalk:   '#e9d8bd',
  sidewalkLine: '#c9b48b',
  wall:       '#f6c8d2',
  wallShade:  '#e8aab9',
  trim:       '#fff5e1',
  trimShade:  '#e9d8a8',
  awningA:    '#ff8aa3',
  awningB:    '#fff5e1',
  signBg:     '#fbeec1',
  signText:   '#9c4a6a',
  windowGlass:'#cfe6e1',
  windowShine:'#ffffff',
  brown:      '#7a4a2e',
  outline:    '#3a2418',
  donutBase:  '#f0bf8b',
  donutShade: '#d99a64',
  donutFrostA:'#ff8eb4',
  donutFrostB:'#a07cf1',
  donutFrostC:'#e9d164',
  cup:        '#ffffff',
  lid:        '#3a2418',
  coffee:     '#6b4226',
  steam:      'rgba(255,255,255,0.9)',
  cardBlue:   '#1f4abf',
  cardGold:   '#d4af37',
  terminalBody:'#2c2c34',
  terminalScreen:'#7be3a3',
  success:    '#33c587',
};

// ── Background: sky + sidewalk + clouds ─────────────────────────────────────
function StreetBackdrop({ scrollPx = 0 }) {
  const c = SHOP_C;
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `linear-gradient(180deg, ${c.sky} 0%, ${c.skyDeep} 70%, ${c.sidewalk} 70%, ${c.sidewalk} 100%)`,
      overflow: 'hidden',
    }}>
      {/* Clouds — drift slowly */}
      <svg viewBox="0 0 1280 720" width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        <g transform={`translate(${-scrollPx * 0.3} 0)`}>
          <Cloud x={120} y={90} s={1}/>
          <Cloud x={520} y={60} s={0.8}/>
          <Cloud x={880} y={120} s={1.1}/>
          <Cloud x={1240} y={80} s={0.9}/>
          <Cloud x={1560} y={140} s={1}/>
        </g>
        {/* distant rooftops — charming pastel townhouses */}
        <g transform={`translate(${-scrollPx * 0.6} 0)`}>
          <CharmingHouses/>
        </g>
      </svg>

      {/* Sidewalk line + tiles */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '70%',
        height: 4, background: c.sidewalkLine,
      }}/>
      <svg width="100%" height="216" viewBox="0 0 1280 216" preserveAspectRatio="none"
           style={{ position: 'absolute', left: 0, bottom: 0 }}>
        <g transform={`translate(${-scrollPx % 80} 0)`}>
          {Array.from({length: 18}).map((_, i) => (
            <line key={i} x1={i * 80} y1="0" x2={i * 80} y2="216" stroke={c.sidewalkLine} strokeWidth="2" opacity="0.4"/>
          ))}
        </g>
        {/* faint cracks */}
        <path d="M180 80 L220 110 M540 60 L600 100 M900 90 L960 120" stroke={c.sidewalkLine} strokeWidth="1.5" opacity="0.5"/>
      </svg>
    </div>
  );
}

function Cloud({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} opacity="0.85">
      <ellipse cx="0" cy="0" rx="36" ry="14" fill="#ffffff"/>
      <ellipse cx="-22" cy="6" rx="22" ry="12" fill="#ffffff"/>
      <ellipse cx="24" cy="6" rx="22" ry="12" fill="#ffffff"/>
      <ellipse cx="-8" cy="-8" rx="18" ry="11" fill="#ffffff"/>
    </g>
  );
}

// ── Charming townhouse row ──────────────────────────────────────────────────
// A varied parade of pastel cottages/shops for the parallax background.
function CharmingHouses() {
  const OUT = '#3a2418';
  return (
    <g>
      {/* base ground tint behind houses */}
      <rect x="-200" y="490" width="2200" height="14" fill="#bca47e" opacity="0.5"/>

      {/* 1 — tall lavender townhouse with mansard roof + dormer */}
      <g>
        {/* chimney */}
        <rect x="60" y="290" width="14" height="40" fill="#c9b48b" stroke={OUT} strokeWidth="2"/>
        <rect x="56" y="286" width="22" height="8" fill="#a07b5e" stroke={OUT} strokeWidth="2"/>
        {/* smoke */}
        <g fill="#fff" opacity="0.85">
          <circle cx="76" cy="276" r="6"/>
          <circle cx="84" cy="266" r="5"/>
          <circle cx="80" cy="256" r="4"/>
        </g>
        {/* mansard roof */}
        <path d="M 10 360 L 30 320 L 110 320 L 130 360 Z" fill="#a07cf1" stroke={OUT} strokeWidth="2.5"/>
        <path d="M 30 320 Q 70 300 110 320" fill="#a07cf1" stroke={OUT} strokeWidth="2.5"/>
        {/* dormer window */}
        <rect x="58" y="332" width="24" height="20" fill="#ffe28a" stroke={OUT} strokeWidth="2"/>
        <line x1="70" y1="332" x2="70" y2="352" stroke={OUT} strokeWidth="1"/>
        {/* wall */}
        <rect x="10" y="360" width="120" height="140" fill="#dcc8f5" stroke={OUT} strokeWidth="2.5"/>
        {/* upper windows */}
        <rect x="28" y="378" width="28" height="36" fill="#ffe28a" stroke={OUT} strokeWidth="2"/>
        <path d="M 42 378 V 414 M 28 396 H 56" stroke={OUT} strokeWidth="1.2"/>
        <rect x="84" y="378" width="28" height="36" fill="#ffe28a" stroke={OUT} strokeWidth="2"/>
        <path d="M 98 378 V 414 M 84 396 H 112" stroke={OUT} strokeWidth="1.2"/>
        {/* door */}
        <rect x="58" y="438" width="24" height="62" fill="#7a4a2e" stroke={OUT} strokeWidth="2.5"/>
        <rect x="62" y="446" width="16" height="18" fill="#ffe28a" stroke={OUT} strokeWidth="1.5"/>
        <circle cx="76" cy="472" r="1.6" fill="#ffd66b"/>
        <path d="M 50 438 L 90 438 L 70 426 Z" fill="#7a4a2e" stroke={OUT} strokeWidth="2"/>
      </g>

      {/* 2 — mint cottage with pitched roof and shutters */}
      <g>
        <rect x="180" y="294" width="12" height="34" fill="#c9b48b" stroke={OUT} strokeWidth="2"/>
        <rect x="176" y="290" width="20" height="8" fill="#a07b5e" stroke={OUT} strokeWidth="2"/>
        <g fill="#fff" opacity="0.85">
          <circle cx="194" cy="282" r="5"/>
          <circle cx="200" cy="272" r="4"/>
        </g>
        {/* roof */}
        <path d="M 150 380 L 220 320 L 290 380 Z" fill="#5b8def" stroke={OUT} strokeWidth="2.5"/>
        {/* shingle hint */}
        <path d="M 168 372 L 220 332 M 192 372 L 240 340 M 220 380 L 270 372" stroke="#3d6dd4" strokeWidth="1" opacity="0.6"/>
        {/* gable trim */}
        <circle cx="220" cy="356" r="6" fill="#ffe28a" stroke={OUT} strokeWidth="2"/>
        {/* wall */}
        <rect x="160" y="380" width="120" height="120" fill="#b7e8c8" stroke={OUT} strokeWidth="2.5"/>
        {/* window with shutters */}
        <rect x="186" y="404" width="34" height="34" fill="#ffe28a" stroke={OUT} strokeWidth="2"/>
        <path d="M 203 404 V 438 M 186 421 H 220" stroke={OUT} strokeWidth="1.2"/>
        <rect x="178" y="402" width="8" height="38" fill="#7ed0ab" stroke={OUT} strokeWidth="2"/>
        <rect x="220" y="402" width="8" height="38" fill="#7ed0ab" stroke={OUT} strokeWidth="2"/>
        {/* flower box */}
        <rect x="178" y="438" width="50" height="8" fill="#7a4a2e" stroke={OUT} strokeWidth="2"/>
        <circle cx="186" cy="436" r="3" fill="#ff8eb4" stroke={OUT} strokeWidth="1"/>
        <circle cx="194" cy="434" r="3" fill="#ffd66b" stroke={OUT} strokeWidth="1"/>
        <circle cx="204" cy="436" r="3" fill="#a07cf1" stroke={OUT} strokeWidth="1"/>
        <circle cx="214" cy="434" r="3" fill="#ff8eb4" stroke={OUT} strokeWidth="1"/>
        <circle cx="222" cy="436" r="3" fill="#7ed0ab" stroke={OUT} strokeWidth="1"/>
        {/* door */}
        <rect x="240" y="446" width="26" height="54" fill="#ff8eb4" stroke={OUT} strokeWidth="2.5"/>
        <circle cx="244" cy="472" r="1.6" fill="#ffd66b"/>
        <path d="M 253 454 a 4 4 0 0 1 8 0 v 8" fill="none" stroke="#3a2418" strokeWidth="1"/>
        <text x="253" y="466" fontFamily="ui-monospace, monospace" fontSize="6" fill="#3a2418" fontWeight="700">12</text>
      </g>

      {/* 3 — peach "Petal & Bloom" flower shop with striped awning */}
      <g>
        <rect x="310" y="385" width="170" height="115" fill="#ffd0b8" stroke={OUT} strokeWidth="2.5"/>
        {/* shop sign */}
        <rect x="315" y="370" width="160" height="20" fill="#fff5e1" stroke={OUT} strokeWidth="2"/>
        <text x="395" y="385" textAnchor="middle" fontFamily="'Fredoka', system-ui" fontSize="12" fontWeight="700" fill="#9c4a6a">Petal &amp; Bloom</text>
        {/* striped awning */}
        <g>
          <path d="M 308 392 L 484 392 L 472 414 L 320 414 Z" fill="#ff8eb4" stroke={OUT} strokeWidth="2"/>
          {[0,1,2,3,4,5,6].map(i => (
            <path key={i} d={`M ${320 + i*22} 392 L ${328 + i*22} 414 L ${340 + i*22} 414 L ${332 + i*22} 392 Z`}
                  fill={i % 2 === 0 ? '#fff5e1' : '#ff8eb4'}/>
          ))}
        </g>
        {/* big shop window */}
        <rect x="324" y="424" width="60" height="60" fill="#cfe6e1" stroke={OUT} strokeWidth="2"/>
        <line x1="324" y1="454" x2="384" y2="454" stroke={OUT} strokeWidth="1.5"/>
        <line x1="354" y1="424" x2="354" y2="484" stroke={OUT} strokeWidth="1.5"/>
        {/* flowers in window */}
        <g>
          <circle cx="340" cy="438" r="5" fill="#ff8eb4" stroke={OUT} strokeWidth="1.2"/>
          <circle cx="340" cy="438" r="1.5" fill="#ffd66b"/>
          <circle cx="368" cy="438" r="5" fill="#a07cf1" stroke={OUT} strokeWidth="1.2"/>
          <circle cx="368" cy="438" r="1.5" fill="#ffd66b"/>
          <circle cx="340" cy="468" r="5" fill="#ffd66b" stroke={OUT} strokeWidth="1.2"/>
          <circle cx="340" cy="468" r="1.5" fill="#ff8eb4"/>
          <circle cx="368" cy="468" r="5" fill="#7ed0ab" stroke={OUT} strokeWidth="1.2"/>
          <circle cx="368" cy="468" r="1.5" fill="#ff8eb4"/>
        </g>
        {/* door + flower planters */}
        <rect x="406" y="430" width="38" height="70" fill="#9ee5c5" stroke={OUT} strokeWidth="2.5"/>
        <circle cx="438" cy="468" r="1.8" fill="#ffd66b"/>
        <rect x="396" y="488" width="14" height="12" fill="#7a4a2e" stroke={OUT} strokeWidth="2"/>
        <circle cx="403" cy="486" r="4" fill="#ff8eb4" stroke={OUT} strokeWidth="1"/>
        <rect x="446" y="488" width="14" height="12" fill="#7a4a2e" stroke={OUT} strokeWidth="2"/>
        <circle cx="453" cy="486" r="4" fill="#a07cf1" stroke={OUT} strokeWidth="1"/>
      </g>

      {/* 4 — butter yellow house with heart window */}
      <g>
        <path d="M 510 380 L 580 320 L 650 380 Z" fill="#ffb47a" stroke={OUT} strokeWidth="2.5"/>
        <path d="M 528 374 L 580 326 M 558 374 L 600 336 M 590 380 L 632 372" stroke="#d99564" strokeWidth="1" opacity="0.7"/>
        <rect x="520" y="380" width="120" height="120" fill="#fff0a8" stroke={OUT} strokeWidth="2.5"/>
        {/* heart window */}
        <path d="M 580 412 c -10 -16 -28 -8 -28 6 c 0 14 28 26 28 26 c 0 0 28 -12 28 -26 c 0 -14 -18 -22 -28 -6 Z"
              fill="#ff8eb4" stroke={OUT} strokeWidth="2"/>
        <path d="M 580 412 c -10 -16 -28 -8 -28 6 c 0 14 28 26 28 26 c 0 0 28 -12 28 -26 c 0 -14 -18 -22 -28 -6 Z"
              fill="#ffd6c2" opacity="0.6"/>
        {/* door */}
        <rect x="568" y="452" width="24" height="48" fill="#9c4a6a" stroke={OUT} strokeWidth="2.5"/>
        <circle cx="588" cy="476" r="1.6" fill="#ffd66b"/>
        {/* side window */}
        <rect x="614" y="448" width="20" height="22" fill="#ffe28a" stroke={OUT} strokeWidth="2"/>
        <path d="M 624 448 V 470 M 614 459 H 634" stroke={OUT} strokeWidth="1"/>
      </g>

      {/* 5 — small tree between houses */}
      <g>
        <rect x="678" y="468" width="8" height="32" fill="#7a4a2e" stroke={OUT} strokeWidth="2"/>
        <circle cx="682" cy="454" r="22" fill="#7ed0ab" stroke={OUT} strokeWidth="2.5"/>
        <circle cx="676" cy="448" r="3" fill="#ff8eb4"/>
        <circle cx="690" cy="458" r="3" fill="#ffd66b"/>
        <circle cx="684" cy="466" r="3" fill="#fff"/>
      </g>

      {/* 6 — sky blue "ice cream" parlor with a cone on the roof */}
      <g>
        <rect x="720" y="385" width="160" height="115" fill="#bcdff4" stroke={OUT} strokeWidth="2.5"/>
        <rect x="720" y="378" width="160" height="14" fill="#fff5e1" stroke={OUT} strokeWidth="2.5"/>
        <text x="800" y="389" textAnchor="middle" fontFamily="'Fredoka', system-ui" fontSize="10" fontWeight="700" fill="#3d6dd4" letterSpacing="2">SCOOPS!</text>
        {/* ice-cream cone on top */}
        <g>
          <path d="M 786 378 L 800 340 L 814 378 Z" fill="#ffd66b" stroke={OUT} strokeWidth="2"/>
          <path d="M 790 354 L 810 354 M 793 360 L 807 360 M 796 366 L 804 366" stroke="#a07b5e" strokeWidth="1" opacity="0.7"/>
          <circle cx="800" cy="338" r="10" fill="#ff8eb4" stroke={OUT} strokeWidth="2"/>
          <circle cx="794" cy="332" r="8" fill="#fff" stroke={OUT} strokeWidth="2"/>
          <circle cx="806" cy="328" r="7" fill="#7ed0ab" stroke={OUT} strokeWidth="2"/>
          {/* sprinkle */}
          <rect x="797" y="320" width="2" height="6" rx="1" fill="#ff8eb4" transform="rotate(20 798 323)"/>
        </g>
        {/* awning */}
        <path d="M 718 398 L 882 398 L 870 416 L 730 416 Z" fill="#5b8def" stroke={OUT} strokeWidth="2"/>
        {[0,1,2,3,4,5,6,7].map(i => (
          <path key={i} d={`M ${730 + i*18} 398 L ${736 + i*18} 416 L ${748 + i*18} 416 L ${742 + i*18} 398 Z`}
                fill={i % 2 === 0 ? '#fff5e1' : '#5b8def'}/>
        ))}
        {/* big window */}
        <rect x="734" y="426" width="130" height="48" fill="#cfe6e1" stroke={OUT} strokeWidth="2"/>
        <line x1="799" y1="426" x2="799" y2="474" stroke={OUT} strokeWidth="1.5"/>
        <text x="766" y="456" textAnchor="middle" fontFamily="'Fredoka', system-ui" fontSize="14" fill="#3d6dd4" fontWeight="700">🍦</text>
        <text x="832" y="456" textAnchor="middle" fontFamily="'Fredoka', system-ui" fontSize="14" fill="#9c4a6a" fontWeight="700">🍨</text>
        {/* door */}
        <rect x="794" y="478" width="22" height="22" fill="#3d6dd4" stroke={OUT} strokeWidth="2"/>
      </g>

      {/* 7 — dusty rose clock tower (tall) */}
      <g>
        {/* spire */}
        <path d="M 920 300 L 935 250 L 950 300 Z" fill="#9c4a6a" stroke={OUT} strokeWidth="2"/>
        <circle cx="935" cy="246" r="4" fill="#ffd66b" stroke={OUT} strokeWidth="1.5"/>
        {/* roof */}
        <path d="M 905 320 L 935 296 L 965 320 Z" fill="#7a3a5c" stroke={OUT} strokeWidth="2"/>
        {/* clock face */}
        <rect x="905" y="320" width="60" height="60" fill="#fff5e1" stroke={OUT} strokeWidth="2.5"/>
        <circle cx="935" cy="350" r="22" fill="#fff" stroke={OUT} strokeWidth="2.5"/>
        {[0,3,6,9].map(i => {
          const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
          return <circle key={i} cx={935 + Math.cos(a) * 18} cy={350 + Math.sin(a) * 18} r="1.5" fill={OUT}/>;
        })}
        <line x1="935" y1="350" x2="935" y2="336" stroke={OUT} strokeWidth="2" strokeLinecap="round"/>
        <line x1="935" y1="350" x2="945" y2="354" stroke={OUT} strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="935" cy="350" r="2" fill={OUT}/>
        {/* body */}
        <rect x="905" y="380" width="60" height="120" fill="#f4b6c8" stroke={OUT} strokeWidth="2.5"/>
        <rect x="918" y="396" width="14" height="22" fill="#ffe28a" stroke={OUT} strokeWidth="1.5"/>
        <rect x="938" y="396" width="14" height="22" fill="#ffe28a" stroke={OUT} strokeWidth="1.5"/>
        <rect x="918" y="426" width="14" height="22" fill="#ffe28a" stroke={OUT} strokeWidth="1.5"/>
        <rect x="938" y="426" width="14" height="22" fill="#ffe28a" stroke={OUT} strokeWidth="1.5"/>
        <rect x="922" y="466" width="26" height="34" fill="#7a4a2e" stroke={OUT} strokeWidth="2"/>
        <circle cx="943" cy="484" r="1.6" fill="#ffd66b"/>
      </g>

      {/* 8 — squat lavender bookshop with sign */}
      <g>
        <path d="M 990 386 L 1050 350 L 1110 386 Z" fill="#7e6cd6" stroke={OUT} strokeWidth="2.5"/>
        <rect x="990" y="386" width="120" height="114" fill="#e0d6f5" stroke={OUT} strokeWidth="2.5"/>
        <rect x="998" y="394" width="104" height="16" fill="#fff5e1" stroke={OUT} strokeWidth="2"/>
        <text x="1050" y="406" textAnchor="middle" fontFamily="'Fredoka', system-ui" fontSize="11" fontWeight="700" fill="#5d3fd3">Page &amp; Crumb</text>
        <rect x="1004" y="420" width="40" height="48" fill="#ffe28a" stroke={OUT} strokeWidth="2"/>
        <path d="M 1024 420 V 468 M 1004 444 H 1044" stroke={OUT} strokeWidth="1.2"/>
        {/* books stacked in window */}
        <rect x="1054" y="450" width="44" height="6" fill="#ff8eb4" stroke={OUT} strokeWidth="1"/>
        <rect x="1054" y="442" width="40" height="6" fill="#7ed0ab" stroke={OUT} strokeWidth="1"/>
        <rect x="1054" y="434" width="36" height="6" fill="#ffd66b" stroke={OUT} strokeWidth="1"/>
        <rect x="1054" y="426" width="42" height="6" fill="#5b8def" stroke={OUT} strokeWidth="1"/>
        <rect x="1078" y="476" width="24" height="24" fill="#9c4a6a" stroke={OUT} strokeWidth="2"/>
      </g>

      {/* 9 — tiny lamppost in front */}
      <g>
        <rect x="1140" y="380" width="3" height="120" fill="#3a2418"/>
        <path d="M 1133 380 q 8 -10 16 0 Z" fill="#ffd66b" stroke={OUT} strokeWidth="1.5"/>
        <circle cx="1141" cy="378" r="2" fill="#ffd66b"/>
        {/* glow */}
        <circle cx="1141" cy="378" r="10" fill="#ffd66b" opacity="0.3"/>
      </g>

      {/* 10 — far-back hill silhouettes */}
      <g opacity="0.4">
        <path d="M -50 460 Q 150 380 380 460 Q 580 400 820 460 Q 1020 410 1280 460 L 1280 500 L -50 500 Z" fill="#a07cf1"/>
      </g>

      {/* 11 — bunting between houses */}
      <g>
        {[0,1,2,3,4,5,6,7,8,9,10].map((i) => {
          const cx = 60 + i * 110;
          const cy = 250 + Math.sin(i * 0.7) * 14;
          const colors = ['#ff8eb4','#9ee5c5','#ffe28a','#a07cf1','#5b8def'];
          return (
            <path key={i} d={`M ${cx - 7} ${cy} L ${cx} ${cy + 16} L ${cx + 7} ${cy} Z`} fill={colors[i % colors.length]} stroke={OUT} strokeWidth="1.2"/>
          );
        })}
        <path d="M 40 248 Q 600 290 1240 248" fill="none" stroke={OUT} strokeWidth="1.5"/>
      </g>
    </g>
  );
}

// ── Shop facade — full storefront seen from outside ─────────────────────────
function ShopFacade({ x = 700, y = 120, scale = 1, doorOpen = 0 }) {
  const c = SHOP_C;
  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      width: 520 * scale, height: 420 * scale,
      transformOrigin: 'top left',
      transform: `scale(${scale})`,
    }}>
      <svg viewBox="0 0 520 420" width="100%" height="100%" style={{ overflow: 'visible' }}>
        {/* base wall */}
        <rect x="20" y="80" width="480" height="340" fill={c.wall} stroke={c.outline} strokeWidth="3"/>
        {/* brick lines */}
        <g stroke={c.wallShade} strokeWidth="1.5" opacity="0.6">
          <line x1="20" y1="140" x2="500" y2="140"/>
          <line x1="20" y1="190" x2="500" y2="190"/>
          <line x1="20" y1="240" x2="500" y2="240"/>
          <line x1="20" y1="290" x2="500" y2="290"/>
        </g>

        {/* sign board */}
        <rect x="40" y="20" width="440" height="70" rx="10" fill={c.signBg} stroke={c.outline} strokeWidth="3"/>
        <rect x="48" y="28" width="424" height="54" rx="6" fill="none" stroke={c.signText} strokeWidth="2" strokeDasharray="4 4"/>
        <text x="260" y="68" textAnchor="middle"
              fontFamily="'Fredoka', 'Quicksand', system-ui, sans-serif"
              fontSize="36" fontWeight="700" fill={c.signText} letterSpacing="2">
          SUGAR LANE
        </text>
        {/* tiny donut icon left of text */}
        <g transform="translate(85 55)">
          <circle r="14" fill={c.donutFrostA} stroke={c.outline} strokeWidth="2"/>
          <circle r="5" fill={c.signBg} stroke={c.outline} strokeWidth="1.5"/>
          <circle cx="-6" cy="-6" r="1.5" fill="#fff"/>
          <circle cx="6" cy="-2" r="1.5" fill={c.donutFrostB}/>
          <circle cx="-2" cy="6" r="1.5" fill={c.donutFrostC}/>
        </g>
        <g transform="translate(435 55)">
          <ellipse cx="0" cy="0" rx="10" ry="13" fill="#fff" stroke={c.outline} strokeWidth="2"/>
          <ellipse cx="0" cy="-12" rx="10" ry="2.5" fill={c.lid} stroke={c.outline} strokeWidth="2"/>
          <path d="M-4 -20 Q-2 -24 0 -20 Q2 -16 4 -20" fill="none" stroke="#fff" strokeWidth="2" opacity="0.9"/>
        </g>

        {/* striped awning */}
        <path d="M10 100 L510 100 L490 150 L30 150 Z" fill={c.awningA} stroke={c.outline} strokeWidth="3"/>
        <g>
          {[0,1,2,3,4,5,6,7].map(i => (
            <path key={i}
              d={`M${10 + i*62.5} 100 L${30 + i*62.5} 150 L${(30 + i*62.5) + 31} 150 L${(10 + i*62.5) + 31} 100 Z`}
              fill={i % 2 === 0 ? c.awningB : c.awningA}/>
          ))}
        </g>
        <path d="M10 100 L510 100 L490 150 L30 150 Z" fill="none" stroke={c.outline} strokeWidth="3"/>
        {/* awning scalloped edge */}
        <g fill={c.awningA} stroke={c.outline} strokeWidth="2.5">
          {[0,1,2,3,4,5,6,7].map(i => (
            <path key={i} d={`M${30 + i*60} 150 q15 18 30 0`}/>
          ))}
        </g>

        {/* left window */}
        <rect x="50" y="170" width="160" height="160" rx="6" fill={c.windowGlass} stroke={c.outline} strokeWidth="3"/>
        <rect x="50" y="170" width="160" height="160" rx="6" fill="none" stroke={c.windowShine} strokeWidth="2" opacity="0.5"/>
        <line x1="130" y1="170" x2="130" y2="330" stroke={c.outline} strokeWidth="2"/>
        <line x1="50" y1="250" x2="210" y2="250" stroke={c.outline} strokeWidth="2"/>
        {/* donuts in window — display case */}
        <g transform="translate(90 215)">
          <Donut x={0} y={0} s={0.5} frost={c.donutFrostA}/>
          <Donut x={60} y={0} s={0.5} frost={c.donutFrostC}/>
          <Donut x={0} y={60} s={0.5} frost={c.donutFrostB}/>
          <Donut x={60} y={60} s={0.5} frost={c.donutFrostA}/>
        </g>
        {/* window sill */}
        <rect x="44" y="330" width="172" height="10" fill={c.trim} stroke={c.outline} strokeWidth="2.5"/>

        {/* door */}
        <g transform={`translate(260 170) rotate(${doorOpen * -20} 0 160)`} style={{ transformOrigin: '0 160px' }}>
          <rect x="0" y="0" width="100" height="160" rx="4" fill={c.brown} stroke={c.outline} strokeWidth="3"/>
          <rect x="10" y="14" width="80" height="60" rx="2" fill={c.windowGlass} stroke={c.outline} strokeWidth="2"/>
          {/* sign on door */}
          <rect x="22" y="28" width="56" height="32" fill={c.signBg} stroke={c.outline} strokeWidth="1.5"/>
          <text x="50" y="42" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fill={c.signText} fontWeight="700">OPEN</text>
          <text x="50" y="54" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fill={c.signText}>come in!</text>
          {/* knob */}
          <circle cx="86" cy="100" r="3.5" fill={c.cardGold} stroke={c.outline} strokeWidth="1.5"/>
          {/* panels */}
          <rect x="14" y="90" width="72" height="55" rx="2" fill="none" stroke={c.outline} strokeWidth="1.5" opacity="0.6"/>
        </g>

        {/* right window — coffee display */}
        <rect x="370" y="170" width="120" height="160" rx="6" fill={c.windowGlass} stroke={c.outline} strokeWidth="3"/>
        <rect x="370" y="170" width="120" height="160" rx="6" fill="none" stroke={c.windowShine} strokeWidth="2" opacity="0.5"/>
        <g transform="translate(430 230)">
          <ellipse cx="0" cy="0" rx="22" ry="32" fill="#fff" stroke={c.outline} strokeWidth="2.5"/>
          <ellipse cx="0" cy="-30" rx="22" ry="6" fill={c.lid} stroke={c.outline} strokeWidth="2.5"/>
          <rect x="-16" y="-10" width="32" height="14" fill={c.brown} opacity="0.5"/>
          <text x="0" y="2" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fill="#fff" fontWeight="700">SUGAR</text>
          <text x="0" y="12" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fill="#fff" fontWeight="700">LANE</text>
        </g>
        <text x="430" y="305" textAnchor="middle" fontFamily="'Fredoka', system-ui" fontSize="14" fontWeight="700" fill={c.signText}>fresh ☕</text>
        <rect x="364" y="330" width="132" height="10" fill={c.trim} stroke={c.outline} strokeWidth="2.5"/>

        {/* step */}
        <rect x="260" y="330" width="100" height="14" fill={c.trim} stroke={c.outline} strokeWidth="3"/>

        {/* sandwich board on sidewalk */}
        <g transform="translate(420 370)">
          <path d="M0 0 L-20 -34 L20 -34 Z" fill={c.trim} stroke={c.outline} strokeWidth="2.5"/>
          <text x="0" y="-22" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="6" fontWeight="700" fill={c.signText}>TODAY</text>
          <text x="0" y="-14" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fontWeight="700" fill={c.signText}>DONUT</text>
          <text x="0" y="-6" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="5" fill={c.brown}>+ coffee ✨</text>
        </g>
      </svg>
    </div>
  );
}

// ── Standalone Donut ────────────────────────────────────────────────────────
function Donut({ x = 0, y = 0, s = 1, frost = SHOP_C.donutFrostA, sprinkles = true }) {
  const c = SHOP_C;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* dough */}
      <circle cx="0" cy="2" r="40" fill={c.donutShade} stroke={c.outline} strokeWidth="3"/>
      <circle cx="0" cy="0" r="40" fill={c.donutBase} stroke={c.outline} strokeWidth="3"/>
      {/* frosting */}
      <path d="M -36 0 Q -32 -28 0 -34 Q 32 -28 36 0 Q 32 12 24 8 Q 18 -4 0 -2 Q -18 -4 -24 8 Q -32 12 -36 0 Z"
            fill={frost} stroke={c.outline} strokeWidth="3"/>
      {/* shine */}
      <path d="M -22 -16 Q -14 -22 -2 -22" fill="none" stroke="#fff" strokeWidth="3" opacity="0.7" strokeLinecap="round"/>
      {/* hole */}
      <circle cx="0" cy="0" r="11" fill={c.donutBase} stroke={c.outline} strokeWidth="2"/>
      <circle cx="0" cy="0" r="11" fill="rgba(58,36,24,0.18)"/>
      {/* sprinkles */}
      {sprinkles && (
        <g stroke={c.outline} strokeWidth="0.8">
          <rect x="-22" y="-10" width="6" height="2" rx="1" fill="#5b8def" transform="rotate(20 -22 -10)"/>
          <rect x="-8" y="-22" width="6" height="2" rx="1" fill="#a7e9c4" transform="rotate(-15 -8 -22)"/>
          <rect x="10" y="-18" width="6" height="2" rx="1" fill="#ffe28a" transform="rotate(40 10 -18)"/>
          <rect x="18" y="-6" width="6" height="2" rx="1" fill="#fff" transform="rotate(80 18 -6)"/>
          <rect x="-18" y="8" width="6" height="2" rx="1" fill="#9c6ade" transform="rotate(-30 -18 8)"/>
          <rect x="14" y="10" width="6" height="2" rx="1" fill="#ff8eb4" transform="rotate(20 14 10)"/>
          <rect x="-2" y="14" width="6" height="2" rx="1" fill="#5b8def" transform="rotate(60 -2 14)"/>
        </g>
      )}
    </g>
  );
}

// ── Coffee cup with steam ───────────────────────────────────────────────────
function CoffeeCup({ x = 0, y = 0, s = 1, steamPhase = 0 }) {
  const c = SHOP_C;
  // Steam wiggle
  const sw1 = Math.sin(steamPhase * Math.PI * 2) * 4;
  const sw2 = Math.sin((steamPhase + 0.3) * Math.PI * 2) * 4;
  const sw3 = Math.sin((steamPhase + 0.6) * Math.PI * 2) * 4;
  const so = 0.6 + Math.sin(steamPhase * Math.PI * 2) * 0.2;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* steam */}
      <g opacity={so} stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round">
        <path d={`M -10 -60 q ${sw1} -10 0 -20 q ${-sw1} -10 0 -20`}/>
        <path d={`M 0 -56 q ${sw2} -10 0 -20 q ${-sw2} -10 0 -20`}/>
        <path d={`M 10 -60 q ${sw3} -10 0 -20 q ${-sw3} -10 0 -20`}/>
      </g>
      {/* body */}
      <path d="M -28 -40 L -22 30 L 22 30 L 28 -40 Z" fill={c.cup} stroke={c.outline} strokeWidth="3"/>
      {/* sleeve */}
      <path d="M -25 -16 L -23 8 L 23 8 L 25 -16 Z" fill={c.brown} stroke={c.outline} strokeWidth="3"/>
      <text x="0" y="-2" textAnchor="middle" fontFamily="'Fredoka', system-ui" fontSize="10" fill="#fff5e1" fontWeight="800">SUGAR LANE</text>
      {/* lid */}
      <ellipse cx="0" cy="-40" rx="28" ry="6" fill={c.lid} stroke={c.outline} strokeWidth="3"/>
      <ellipse cx="0" cy="-42" rx="28" ry="3" fill="#1a0e08"/>
      {/* drink hole */}
      <ellipse cx="-12" cy="-42" rx="4" ry="2" fill="#1a0e08"/>
    </g>
  );
}

// ── Card terminal ───────────────────────────────────────────────────────────
function CardTerminal({ x = 0, y = 0, s = 1, screen = 'ready', pulse = 0 }) {
  const c = SHOP_C;
  // screen: 'ready' | 'tapped' | 'success'
  const screenBg = screen === 'success' ? c.success : c.terminalScreen;
  const pulseR = 30 + pulse * 60;
  const pulseO = 1 - pulse;
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      {/* tap pulse waves */}
      {screen !== 'success' && (
        <g fill="none" stroke="#7be3a3" strokeWidth="3" opacity={pulseO}>
          <circle cx="0" cy="-50" r={pulseR}/>
          <circle cx="0" cy="-50" r={pulseR * 0.7} opacity={pulseO * 0.8}/>
        </g>
      )}
      {/* body */}
      <rect x="-50" y="-80" width="100" height="150" rx="12" fill={c.terminalBody} stroke={c.outline} strokeWidth="3"/>
      <rect x="-50" y="-80" width="100" height="50" rx="12" fill="#3a3a44" stroke={c.outline} strokeWidth="3"/>
      {/* screen */}
      <rect x="-40" y="-70" width="80" height="48" rx="4" fill={screenBg} stroke={c.outline} strokeWidth="2"/>
      {screen === 'ready' && (
        <g>
          <text x="0" y="-50" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fontWeight="700" fill="#0a3a22">TAP CARD</text>
          <g transform="translate(0 -36)" fill="none" stroke="#0a3a22" strokeWidth="1.8" strokeLinecap="round">
            <path d="M -10 0 a 6 6 0 0 1 6 -6"/>
            <path d="M -6 0 a 3 3 0 0 1 3 -3"/>
            <circle cx="-2" cy="0" r="1.2" fill="#0a3a22"/>
          </g>
        </g>
      )}
      {screen === 'tapped' && (
        <g>
          <text x="0" y="-50" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fontWeight="700" fill="#0a3a22">READING…</text>
          <g transform="translate(0 -36)">
            <circle cx="0" cy="0" r="6" fill="none" stroke="#0a3a22" strokeWidth="2" strokeDasharray="10 5">
              <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="0.8s" repeatCount="indefinite"/>
            </circle>
          </g>
        </g>
      )}
      {screen === 'success' && (
        <g>
          <path d="M -18 -48 L -6 -36 L 18 -60" stroke="#fff" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
          <text x="0" y="-26" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fontWeight="700" fill="#fff">APPROVED</text>
        </g>
      )}
      {/* keypad */}
      <g fill="#1a1a22" stroke={c.outline} strokeWidth="1.5">
        {[0,1,2].map(row => [0,1,2].map(col => (
          <rect key={`${row}-${col}`} x={-36 + col*24} y={-16 + row*22} width="20" height="18" rx="3"/>
        )))}
      </g>
      <g fill="#5fd6a8" stroke={c.outline} strokeWidth="1.5">
        <rect x="-18" y="50" width="36" height="14" rx="3"/>
      </g>
      <text x="0" y="61" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="8" fontWeight="700" fill="#0a3a22">PAY</text>
    </g>
  );
}

// ── Credit card ─────────────────────────────────────────────────────────────
function CreditCard({ x = 0, y = 0, s = 1, rotation = -12 }) {
  const c = SHOP_C;
  return (
    <g transform={`translate(${x} ${y}) scale(${s}) rotate(${rotation})`}>
      <defs>
        <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3a6cf0"/>
          <stop offset="100%" stopColor="#1f4abf"/>
        </linearGradient>
      </defs>
      <rect x="-60" y="-38" width="120" height="76" rx="8" fill="url(#cardGrad)" stroke={c.outline} strokeWidth="2.5"/>
      <rect x="-50" y="-22" width="18" height="14" rx="2" fill={c.cardGold} stroke={c.outline} strokeWidth="1.5"/>
      <path d="M -47 -15 h 12 M -47 -19 h 12 M -47 -11 h 12" stroke={c.outline} strokeWidth="0.8" opacity="0.5"/>
      {/* wave */}
      <g transform="translate(30 -22)" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" opacity="0.85">
        <path d="M 0 0 a 5 5 0 0 1 5 -5"/>
        <path d="M -4 0 a 9 9 0 0 1 9 -9"/>
        <path d="M -8 0 a 13 13 0 0 1 13 -13"/>
      </g>
      <text x="-52" y="15" fontFamily="ui-monospace, monospace" fontSize="8" fill="#fff" letterSpacing="1.5">5224  19••  ••24  •726</text>
      <text x="-52" y="28" fontFamily="ui-monospace, monospace" fontSize="6" fill="#fff" opacity="0.85" letterSpacing="1">PIP A. PLUM</text>
      <text x="22" y="28" fontFamily="ui-monospace, monospace" fontSize="6" fill="#fff" opacity="0.85">12/29</text>
    </g>
  );
}

// ── Shop interior backdrop (counter scene) ──────────────────────────────────
function ShopInterior() {
  const c = SHOP_C;
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `linear-gradient(180deg, ${c.wall} 0%, #f0b2c2 60%, ${c.brown} 60%, #6a3a20 100%)`,
    }}>
      {/* wallpaper dots */}
      <svg viewBox="0 0 1280 720" width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.4 }}>
        <defs>
          <pattern id="dots" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="4" fill="#fff"/>
            <circle cx="0" cy="0" r="4" fill="#fff"/>
            <circle cx="60" cy="0" r="4" fill="#fff"/>
            <circle cx="0" cy="60" r="4" fill="#fff"/>
            <circle cx="60" cy="60" r="4" fill="#fff"/>
          </pattern>
        </defs>
        <rect x="0" y="0" width="1280" height="430" fill="url(#dots)"/>

        {/* hanging menu chalkboard */}
        <g transform="translate(160 80)">
          <rect x="0" y="0" width="240" height="160" rx="6" fill="#3a2418" stroke="#7a4a2e" strokeWidth="6"/>
          <text x="120" y="36" textAnchor="middle" fontFamily="'Fredoka', system-ui" fontSize="22" fontWeight="700" fill="#ffe28a">MENU</text>
          <line x1="40" y1="46" x2="200" y2="46" stroke="#ffe28a" strokeWidth="1.5" opacity="0.6"/>
          <text x="30" y="78" fontFamily="'Fredoka', system-ui" fontSize="16" fill="#fff">Donut</text>
          <text x="210" y="78" textAnchor="end" fontFamily="ui-monospace, monospace" fontSize="14" fill="#9ee5c5">3.50</text>
          <text x="30" y="108" fontFamily="'Fredoka', system-ui" fontSize="16" fill="#fff">Coffee</text>
          <text x="210" y="108" textAnchor="end" fontFamily="ui-monospace, monospace" fontSize="14" fill="#9ee5c5">4.00</text>
          <line x1="30" y1="120" x2="210" y2="120" stroke="#ffe28a" strokeWidth="1" opacity="0.4" strokeDasharray="3 3"/>
          <text x="30" y="142" fontFamily="'Fredoka', system-ui" fontSize="14" fontWeight="700" fill="#ff8eb4">Combo</text>
          <text x="210" y="142" textAnchor="end" fontFamily="ui-monospace, monospace" fontSize="14" fontWeight="700" fill="#ff8eb4">6.50</text>
        </g>

        {/* shelf with jars on the right */}
        <g transform="translate(880 90)">
          <rect x="0" y="80" width="300" height="6" fill="#7a4a2e"/>
          <rect x="0" y="180" width="300" height="6" fill="#7a4a2e"/>
          {/* jars */}
          <g>
            <Jar x="30" y="36" color="#ff8eb4"/>
            <Jar x="100" y="36" color="#9ee5c5"/>
            <Jar x="170" y="36" color="#ffe28a"/>
            <Jar x="240" y="36" color="#a07cf1"/>
          </g>
          <g>
            <Jar x="30" y="136" color="#5b8def"/>
            <Jar x="100" y="136" color="#ff8eb4"/>
            <Jar x="170" y="136" color="#9ee5c5"/>
            <Jar x="240" y="136" color="#ffe28a"/>
          </g>
        </g>

        {/* bunting at top */}
        <g>
          {Array.from({length: 14}).map((_, i) => {
            const cx = 60 + i * 90;
            const cy = 30 + Math.sin(i * 0.6) * 8;
            const colors = ['#ff8eb4','#9ee5c5','#ffe28a','#a07cf1','#5b8def'];
            return (
              <g key={i}>
                <path d={`M ${cx - 12} ${cy} L ${cx} ${cy + 28} L ${cx + 12} ${cy} Z`} fill={colors[i % colors.length]} stroke="#3a2418" strokeWidth="2"/>
              </g>
            );
          })}
          <path d="M 50 30 Q 640 80 1240 30" fill="none" stroke="#3a2418" strokeWidth="2"/>
        </g>
      </svg>

      {/* counter front */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        height: '40%',
        background: `linear-gradient(180deg, #c98a5e 0%, #7a4a2e 100%)`,
        borderTop: '6px solid #3a2418',
      }}/>
      {/* counter top */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '60%',
        height: 30,
        background: '#fff5e1',
        borderTop: '4px solid #3a2418',
        borderBottom: '4px solid #3a2418',
      }}/>
      {/* counter wood grain */}
      <svg width="100%" height="40%" style={{ position: 'absolute', left: 0, bottom: 0 }} preserveAspectRatio="none" viewBox="0 0 1280 288">
        <path d="M 0 80 Q 640 100 1280 80" stroke="#5a3320" strokeWidth="2" fill="none" opacity="0.4"/>
        <path d="M 0 160 Q 640 180 1280 160" stroke="#5a3320" strokeWidth="2" fill="none" opacity="0.4"/>
        <path d="M 0 240 Q 640 260 1280 240" stroke="#5a3320" strokeWidth="2" fill="none" opacity="0.4"/>
      </svg>
    </div>
  );
}

function Jar({ x, y, color }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect x="0" y="6" width="40" height="44" rx="6" fill={color} stroke="#3a2418" strokeWidth="2"/>
      <rect x="0" y="6" width="40" height="44" rx="6" fill="#fff" opacity="0.25"/>
      <rect x="-4" y="0" width="48" height="10" rx="3" fill="#7a4a2e" stroke="#3a2418" strokeWidth="2"/>
      <ellipse cx="20" cy="20" rx="6" ry="4" fill="#fff" opacity="0.5"/>
    </g>
  );
}

Object.assign(window, { StreetBackdrop, ShopFacade, Donut, CoffeeCup, CardTerminal, CreditCard, ShopInterior, SHOP_C });
