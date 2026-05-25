// pip.jsx — Pip, an original round-headed cartoon character.
// Purple pom-pom beanie, mint scarf, yellow sweater, blue dungarees.
// Drawn at native viewBox 200x260; size + position via props.

const PIP_PALETTE = {
  skin:       '#ffd6a8',
  skinShade:  '#f0b074',
  outline:    '#3a2418',
  hat:        '#7a5af5',
  hatShade:   '#5d3fd3',
  hatBand:    '#fef0c4',
  pom:        '#ffd66b',
  scarf:      '#9ee5c5',
  scarfShade: '#7ed0ab',
  sweater:    '#ffc657',
  sweaterShade:'#e9a92e',
  dungaree:   '#3d6dd4',
  dungareeShade: '#2a52a8',
  button:     '#ffd66b',
  shoes:      '#5a3320',
  cheek:      '#ff9bb8',
  mouth:      '#a8345a',
};

// Pip — props: x, y (top-left of bounding box), scale, walkPhase (0..1, drives leg+bob),
// holding: null | 'goods' | 'card' | 'cup-and-bag'
// facing: 1 (right) or -1 (left)
function Pip({
  x = 0, y = 0,
  scale = 1,
  walkPhase = 0,        // phase in [0,1] — full step cycle
  walking = false,
  facing = 1,
  holding = null,
  blink = 0,            // 0..1, 1 = fully closed
  mouth = 'smile',      // 'smile' | 'small' | 'wide' | 'o'
}) {
  // Walk cycle: feed phase to sin for leg swing & bob
  const phase = walkPhase * Math.PI * 2;
  const legA = walking ?  Math.sin(phase) * 14 : 0;
  const legB = walking ? -Math.sin(phase) * 14 : 0;
  const bob  = walking ? Math.abs(Math.sin(phase * 2)) * -4 : 0;
  const armA = walking ? -Math.sin(phase) * 10 : 0;
  const armB = walking ?  Math.sin(phase) * 10 : 0;

  const c = PIP_PALETTE;

  // Mouth path
  let mouthEl;
  if (mouth === 'smile') {
    mouthEl = <path d="M90 122 Q100 132 110 122" stroke={c.mouth} strokeWidth="3.5" strokeLinecap="round" fill="none"/>;
  } else if (mouth === 'small') {
    mouthEl = <path d="M94 124 Q100 128 106 124" stroke={c.mouth} strokeWidth="3" strokeLinecap="round" fill="none"/>;
  } else if (mouth === 'wide') {
    mouthEl = (
      <g>
        <path d="M86 120 Q100 138 114 120 Q100 128 86 120 Z" fill={c.mouth}/>
        <path d="M88 122 Q100 132 112 122" stroke="#5a1a30" strokeWidth="1.5" fill="none"/>
      </g>
    );
  } else if (mouth === 'o') {
    mouthEl = <ellipse cx="100" cy="125" rx="5" ry="6" fill={c.mouth}/>;
  }

  const eyeH = 5 * (1 - blink) + 0.5;

  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      width: 200 * scale, height: 260 * scale,
      transform: `translateY(${bob}px) scaleX(${facing})`,
      transformOrigin: 'center',
      willChange: 'transform',
    }}>
      <svg viewBox="0 0 200 260" width="100%" height="100%" style={{ overflow: 'visible' }}>
        {/* ── Shadow ── */}
        <ellipse cx="100" cy="252" rx="48" ry="6" fill="rgba(58,36,24,0.18)"/>

        {/* ── Back arm (behind body) ── */}
        <g transform={`rotate(${armA} 75 175)`}>
          <rect x="62" y="160" width="22" height="46" rx="11" fill={c.sweater} stroke={c.outline} strokeWidth="2.5"/>
          <circle cx="73" cy="208" r="11" fill={c.skin} stroke={c.outline} strokeWidth="2.5"/>
        </g>

        {/* ── Legs ── */}
        <g transform={`translate(0 ${legA})`}>
          <rect x="80" y="200" width="18" height="32" rx="6" fill={c.dungaree} stroke={c.outline} strokeWidth="2.5"/>
          <ellipse cx="89" cy="236" rx="14" ry="7" fill={c.shoes} stroke={c.outline} strokeWidth="2.5"/>
        </g>
        <g transform={`translate(0 ${legB})`}>
          <rect x="102" y="200" width="18" height="32" rx="6" fill={c.dungaree} stroke={c.outline} strokeWidth="2.5"/>
          <ellipse cx="111" cy="236" rx="14" ry="7" fill={c.shoes} stroke={c.outline} strokeWidth="2.5"/>
        </g>

        {/* ── Sweater body ── */}
        <path d="M62 150 Q60 200 76 208 L124 208 Q140 200 138 150 Z"
              fill={c.sweater} stroke={c.outline} strokeWidth="2.5"/>
        {/* sweater hem stripe */}
        <path d="M70 200 Q100 210 130 200" fill="none" stroke={c.sweaterShade} strokeWidth="3"/>

        {/* ── Dungarees overlay ── */}
        <path d="M82 170 Q82 200 90 208 L110 208 Q118 200 118 170 Z"
              fill={c.dungaree} stroke={c.outline} strokeWidth="2.5"/>
        {/* straps */}
        <path d="M84 170 L92 152" stroke={c.dungaree} strokeWidth="6" strokeLinecap="round"/>
        <path d="M116 170 L108 152" stroke={c.dungaree} strokeWidth="6" strokeLinecap="round"/>
        <path d="M84 170 L92 152" stroke={c.outline} strokeWidth="2"/>
        <path d="M116 170 L108 152" stroke={c.outline} strokeWidth="2"/>
        {/* dungaree button */}
        <circle cx="100" cy="178" r="3.5" fill={c.button} stroke={c.outline} strokeWidth="1.5"/>

        {/* ── Scarf ── */}
        <path d="M70 140 Q100 152 130 140 L132 154 Q100 164 68 154 Z"
              fill={c.scarf} stroke={c.outline} strokeWidth="2.5"/>
        <path d="M126 152 L138 178 L130 180 L122 156 Z"
              fill={c.scarfShade} stroke={c.outline} strokeWidth="2.5"/>
        {/* scarf knit lines */}
        <path d="M75 148 L72 156 M88 150 L86 158 M100 152 L100 160 M112 150 L114 158 M125 148 L128 156"
              stroke={c.scarfShade} strokeWidth="1.5"/>

        {/* ── Head ── */}
        <circle cx="100" cy="100" r="42" fill={c.skin} stroke={c.outline} strokeWidth="2.5"/>
        {/* ear */}
        <ellipse cx="58" cy="100" rx="6" ry="9" fill={c.skin} stroke={c.outline} strokeWidth="2.5"/>
        <ellipse cx="58" cy="100" rx="2.5" ry="4" fill={c.skinShade}/>

        {/* ── Hat: beanie with cuff ── */}
        <path d="M64 80 Q66 50 100 48 Q134 50 136 80 Z"
              fill={c.hat} stroke={c.outline} strokeWidth="2.5"/>
        {/* hat shading */}
        <path d="M68 78 Q70 56 100 52 Q104 70 100 78 Z" fill={c.hatShade} opacity="0.5"/>
        {/* hat cuff */}
        <rect x="60" y="76" width="80" height="12" rx="6" fill={c.hatBand} stroke={c.outline} strokeWidth="2.5"/>
        {/* cuff stitches */}
        <path d="M66 82 L70 82 M78 82 L82 82 M90 82 L94 82 M102 82 L106 82 M114 82 L118 82 M126 82 L130 82"
              stroke={c.outline} strokeWidth="1.5"/>
        {/* pom-pom */}
        <circle cx="100" cy="42" r="10" fill={c.pom} stroke={c.outline} strokeWidth="2.5"/>
        <circle cx="97" cy="40" r="3" fill="#fff" opacity="0.7"/>

        {/* ── Eyes ── */}
        <g>
          <ellipse cx="86" cy="108" rx="4.5" ry={eyeH} fill={c.outline}/>
          <ellipse cx="114" cy="108" rx="4.5" ry={eyeH} fill={c.outline}/>
          {blink < 0.4 && (
            <g>
              <circle cx="87.5" cy="106" r="1.5" fill="#fff"/>
              <circle cx="115.5" cy="106" r="1.5" fill="#fff"/>
            </g>
          )}
        </g>

        {/* ── Cheeks ── */}
        <ellipse cx="78" cy="118" rx="6" ry="4" fill={c.cheek} opacity="0.7"/>
        <ellipse cx="122" cy="118" rx="6" ry="4" fill={c.cheek} opacity="0.7"/>

        {/* ── Mouth ── */}
        {mouthEl}

        {/* ── Front arm with optional holding ── */}
        <g transform={`rotate(${armB} 125 175)`}>
          <rect x="116" y="160" width="22" height="46" rx="11" fill={c.sweater} stroke={c.outline} strokeWidth="2.5"/>
          <circle cx="127" cy="208" r="11" fill={c.skin} stroke={c.outline} strokeWidth="2.5"/>

          {holding === 'card' && (
            <g transform="translate(127 208)">
              <rect x="-16" y="-22" width="32" height="20" rx="3" fill="#1f4abf" stroke={PIP_PALETTE.outline} strokeWidth="2"/>
              <rect x="-13" y="-18" width="9" height="6" rx="1" fill="#d4af37"/>
              <rect x="-13" y="-9" width="22" height="2" fill="#fff" opacity="0.5"/>
            </g>
          )}
          {holding === 'cup-and-bag' && (
            <g transform="translate(127 208)">
              {/* coffee cup */}
              <path d="M-14 -28 L-10 -2 L10 -2 L14 -28 Z" fill="#fff" stroke={PIP_PALETTE.outline} strokeWidth="2"/>
              <ellipse cx="0" cy="-28" rx="14" ry="3" fill="#3a2a1a" stroke={PIP_PALETTE.outline} strokeWidth="2"/>
              <rect x="-9" y="-22" width="18" height="6" fill="#a16d4b" opacity="0.7"/>
            </g>
          )}
        </g>

        {/* ── Pastry bag in back hand (when holding goods) ── */}
        {holding === 'cup-and-bag' && (
          <g transform="translate(73 208)">
            <path d="M-12 -22 L-14 4 L14 4 L12 -22 Z" fill="#fff5e1" stroke={PIP_PALETTE.outline} strokeWidth="2"/>
            <path d="M-12 -22 Q0 -28 12 -22" fill="none" stroke={PIP_PALETTE.outline} strokeWidth="2"/>
            <text x="0" y="-4" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fill="#a16d4b" fontWeight="700">SUGAR</text>
            <text x="0" y="4" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="7" fill="#a16d4b" fontWeight="700">LANE</text>
          </g>
        )}
      </svg>
    </div>
  );
}

window.Pip = Pip;
window.PIP_PALETTE = PIP_PALETTE;

// ─────────────────────────────────────────────────────────────────────────────
// Mrs. Marlow — the friendly baker behind the counter.
// Original character: chef's toque, round glasses, warm tan skin, brown bun,
// striped pink shirt, cream apron with mint pocket.
// Drawn at viewBox 220x300; lower body hidden behind counter when used.
// ─────────────────────────────────────────────────────────────────────────────

const MARLOW_PALETTE = {
  skin:        '#d8a070',
  skinShade:   '#b87a4e',
  outline:     '#3a2418',
  hat:         '#fffaf2',
  hatShade:    '#ead8c4',
  hair:        '#5a3320',
  glasses:     '#3a2418',
  blush:       '#e07a90',
  lips:        '#a8345a',
  shirtA:      '#ff8eb4',
  shirtB:      '#fff5e1',
  apron:       '#fbeec1',
  apronTrim:   '#ff8eb4',
  pocket:      '#9ee5c5',
  button:      '#ffd66b',
};

function Shopkeeper({
  x = 0, y = 0,
  scale = 1,
  wave = 0,         // 0..1 — right arm wave amount
  facing = 1,
  blink = 0,
  mouth = 'smile',  // 'smile' | 'wide' | 'small' | 'o'
  reach = 0,        // 0..1 — left arm reaches down (placing item)
  lookAt = 0,       // -1..1 — eye pupil direction
}) {
  const c = MARLOW_PALETTE;

  // Wave: oscillate the right arm
  const waveT = Math.sin(wave * Math.PI * 2 * 2) * 18 * (wave > 0 ? 1 : 0);
  const rightArmRot = wave > 0 ? -50 + waveT : 0;
  const leftArmRot = reach * 95; // pivots downward to reach counter

  let mouthEl;
  if (mouth === 'smile') {
    mouthEl = <path d="M96 132 Q108 144 120 132" stroke={c.lips} strokeWidth="3.5" strokeLinecap="round" fill="none"/>;
  } else if (mouth === 'wide') {
    mouthEl = (
      <g>
        <path d="M92 128 Q108 148 124 128 Q108 138 92 128 Z" fill={c.lips}/>
        <path d="M94 130 Q108 142 122 130" stroke="#5a1a30" strokeWidth="1.5" fill="none"/>
      </g>
    );
  } else if (mouth === 'small') {
    mouthEl = <path d="M102 134 Q108 138 114 134" stroke={c.lips} strokeWidth="2.8" strokeLinecap="round" fill="none"/>;
  } else {
    mouthEl = <ellipse cx="108" cy="135" rx="4" ry="5" fill={c.lips}/>;
  }

  const eyeH = 4 * (1 - blink) + 0.5;
  const pupilDx = lookAt * 1.5;

  return (
    <div style={{
      position: 'absolute',
      left: x, top: y,
      width: 220 * scale, height: 300 * scale,
      transformOrigin: 'bottom center',
      transform: `scaleX(${facing})`,
      willChange: 'transform',
    }}>
      <svg viewBox="0 0 220 300" width="100%" height="100%" style={{ overflow: 'visible' }}>
        {/* ── Right arm (waving) — drawn first so other arm overlaps when reaching ── */}
        <g transform={`rotate(${rightArmRot} 158 178)`} style={{ transformOrigin: '158px 178px' }}>
          {/* striped sleeve */}
          <rect x="148" y="170" width="22" height="52" rx="10" fill={c.shirtA} stroke={c.outline} strokeWidth="2.5"/>
          <line x1="148" y1="184" x2="170" y2="184" stroke={c.shirtB} strokeWidth="3"/>
          <line x1="148" y1="200" x2="170" y2="200" stroke={c.shirtB} strokeWidth="3"/>
          <line x1="148" y1="216" x2="170" y2="216" stroke={c.shirtB} strokeWidth="3"/>
          {/* hand */}
          <circle cx="159" cy="226" r="11" fill={c.skin} stroke={c.outline} strokeWidth="2.5"/>
          {wave > 0 && (
            <g stroke={c.outline} strokeWidth="1.6" fill="none" strokeLinecap="round">
              <path d="M 152 220 q -2 -3 -4 -3"/>
              <path d="M 154 216 q -2 -3 -2 -5"/>
              <path d="M 158 214 q 0 -3 1 -5"/>
            </g>
          )}
        </g>

        {/* ── Apron body / dress ── */}
        <path d="M 60 184 Q 56 240 70 270 L 150 270 Q 164 240 160 184 Z"
              fill={c.apron} stroke={c.outline} strokeWidth="2.5"/>
        {/* striped shirt visible at sides */}
        <path d="M 60 184 L 64 218 L 80 216 L 78 184 Z" fill={c.shirtA} stroke={c.outline} strokeWidth="2"/>
        <path d="M 160 184 L 156 218 L 140 216 L 142 184 Z" fill={c.shirtA} stroke={c.outline} strokeWidth="2"/>
        <line x1="62" y1="192" x2="80" y2="190" stroke={c.shirtB} strokeWidth="2"/>
        <line x1="63" y1="204" x2="80" y2="202" stroke={c.shirtB} strokeWidth="2"/>
        <line x1="142" y1="190" x2="158" y2="192" stroke={c.shirtB} strokeWidth="2"/>
        <line x1="140" y1="202" x2="157" y2="204" stroke={c.shirtB} strokeWidth="2"/>

        {/* apron neck strap */}
        <path d="M 90 184 Q 110 154 130 184" fill={c.apron} stroke={c.outline} strokeWidth="2.5"/>

        {/* apron pocket */}
        <rect x="86" y="214" width="48" height="28" rx="3" fill={c.pocket} stroke={c.outline} strokeWidth="2.5"/>
        <rect x="86" y="214" width="48" height="6" fill={c.apronTrim} opacity="0.7"/>
        {/* utensils sticking out of pocket */}
        <g>
          <path d="M 92 218 V 208" stroke={c.outline} strokeWidth="2"/>
          <ellipse cx="92" cy="206" rx="3" ry="4" fill={c.shirtB} stroke={c.outline} strokeWidth="1.5"/>
          <path d="M 102 218 V 210" stroke={c.outline} strokeWidth="2"/>
          <path d="M 100 208 H 104 M 100 212 H 104" stroke={c.outline} strokeWidth="1.5"/>
        </g>

        {/* apron name badge */}
        <rect x="124" y="226" width="22" height="10" fill={c.shirtB} stroke={c.outline} strokeWidth="1.5" rx="1"/>
        <text x="135" y="234" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="5.5" fontWeight="700" fill={c.outline}>MARLOW</text>

        {/* apron ribbon */}
        <path d="M 60 200 Q 50 196 48 188 L 56 192 Z" fill={c.apronTrim} stroke={c.outline} strokeWidth="2"/>
        <path d="M 160 200 Q 170 196 172 188 L 164 192 Z" fill={c.apronTrim} stroke={c.outline} strokeWidth="2"/>

        {/* ── Left arm (reaches down to place items) ── */}
        <g transform={`rotate(${leftArmRot} 62 178)`} style={{ transformOrigin: '62px 178px' }}>
          <rect x="50" y="170" width="22" height="52" rx="10" fill={c.shirtA} stroke={c.outline} strokeWidth="2.5"/>
          <line x1="50" y1="184" x2="72" y2="184" stroke={c.shirtB} strokeWidth="3"/>
          <line x1="50" y1="200" x2="72" y2="200" stroke={c.shirtB} strokeWidth="3"/>
          <line x1="50" y1="216" x2="72" y2="216" stroke={c.shirtB} strokeWidth="3"/>
          <circle cx="61" cy="226" r="11" fill={c.skin} stroke={c.outline} strokeWidth="2.5"/>
        </g>

        {/* ── Neck ── */}
        <rect x="98" y="148" width="24" height="22" fill={c.skin} stroke={c.outline} strokeWidth="2.5"/>

        {/* ── Hair bun behind head ── */}
        <ellipse cx="62" cy="92" rx="14" ry="16" fill={c.hair} stroke={c.outline} strokeWidth="2.5"/>
        <ellipse cx="158" cy="92" rx="14" ry="16" fill={c.hair} stroke={c.outline} strokeWidth="2.5"/>
        {/* tendrils */}
        <path d="M 62 108 q -4 14 2 24" fill="none" stroke={c.hair} strokeWidth="3" strokeLinecap="round"/>
        <path d="M 158 108 q 4 14 -2 24" fill="none" stroke={c.hair} strokeWidth="3" strokeLinecap="round"/>

        {/* ── Head ── */}
        <circle cx="110" cy="106" r="44" fill={c.skin} stroke={c.outline} strokeWidth="2.5"/>

        {/* hair fringe */}
        <path d="M 70 90 Q 90 70 110 76 Q 130 70 150 90 Q 142 82 132 84 Q 122 76 112 82 Q 102 76 92 82 Q 80 80 70 90 Z"
              fill={c.hair} stroke={c.outline} strokeWidth="2"/>

        {/* ── Chef's toque ── */}
        <g>
          {/* band */}
          <rect x="68" y="56" width="84" height="14" rx="2" fill={c.hat} stroke={c.outline} strokeWidth="2.5"/>
          {/* poofs */}
          <ellipse cx="78" cy="42" rx="16" ry="18" fill={c.hat} stroke={c.outline} strokeWidth="2.5"/>
          <ellipse cx="110" cy="32" rx="22" ry="22" fill={c.hat} stroke={c.outline} strokeWidth="2.5"/>
          <ellipse cx="142" cy="42" rx="16" ry="18" fill={c.hat} stroke={c.outline} strokeWidth="2.5"/>
          {/* poof shading */}
          <ellipse cx="74" cy="48" rx="6" ry="8" fill={c.hatShade} opacity="0.6"/>
          <ellipse cx="104" cy="40" rx="8" ry="10" fill={c.hatShade} opacity="0.6"/>
          <ellipse cx="146" cy="48" rx="6" ry="8" fill={c.hatShade} opacity="0.6"/>
          {/* tiny donut pin on band */}
          <circle cx="100" cy="63" r="4" fill={c.shirtA} stroke={c.outline} strokeWidth="1.5"/>
          <circle cx="100" cy="63" r="1.4" fill={c.hat}/>
        </g>

        {/* ── Glasses ── */}
        <g stroke={c.glasses} strokeWidth="2.5" fill="none">
          <circle cx="94" cy="108" r="11" fill={c.hat}/>
          <circle cx="126" cy="108" r="11" fill={c.hat}/>
          <line x1="105" y1="108" x2="115" y2="108"/>
          <line x1="83" y1="105" x2="78" y2="103"/>
          <line x1="137" y1="105" x2="142" y2="103"/>
        </g>

        {/* ── Eyes inside glasses ── */}
        <g>
          <ellipse cx={94 + pupilDx} cy="108" rx="3.6" ry={eyeH} fill={c.outline}/>
          <ellipse cx={126 + pupilDx} cy="108" rx="3.6" ry={eyeH} fill={c.outline}/>
          {blink < 0.4 && (
            <g>
              <circle cx={95.5 + pupilDx} cy="106" r="1.2" fill="#fff"/>
              <circle cx={127.5 + pupilDx} cy="106" r="1.2" fill="#fff"/>
            </g>
          )}
        </g>

        {/* ── Cheeks ── */}
        <ellipse cx="80" cy="124" rx="6" ry="4" fill={c.blush} opacity="0.6"/>
        <ellipse cx="140" cy="124" rx="6" ry="4" fill={c.blush} opacity="0.6"/>

        {/* ── Mouth ── */}
        {mouthEl}

        {/* tiny mole (character detail) */}
        <circle cx="138" cy="138" r="1.3" fill={c.hair}/>
      </svg>
    </div>
  );
}

window.Shopkeeper = Shopkeeper;
window.MARLOW_PALETTE = MARLOW_PALETTE;
