// scene.jsx — Orchestrates the 4-act animation:

// ── Audio: cheerful success chime ──────────────────────────────────────────
let __audioCtx = null;
function getAudioCtx() {
  if (!__audioCtx) {
    try { __audioCtx = new (window.AudioContext || window.webkitAudioContext)(); }
    catch (e) { return null; }
  }
  if (__audioCtx.state === 'suspended') __audioCtx.resume();
  return __audioCtx;
}
// Unlock on first user gesture (browsers gate Web Audio)
if (typeof window !== 'undefined') {
  const unlock = () => { getAudioCtx(); };
  window.addEventListener('pointerdown', unlock, { once: true });
  window.addEventListener('keydown', unlock, { once: true });
}

function playSuccessChime() {
  const ctx = getAudioCtx();
  if (!ctx) return;
  // Happy ascending arpeggio: C5 → E5 → G5 → C6 with a sparkly tail
  const now = ctx.currentTime + 0.01;
  const notes = [
    { f: 523.25, t: 0.00, d: 0.30, g: 0.18 }, // C5
    { f: 659.25, t: 0.10, d: 0.30, g: 0.18 }, // E5
    { f: 783.99, t: 0.20, d: 0.40, g: 0.20 }, // G5
    { f: 1046.5, t: 0.34, d: 0.55, g: 0.22 }, // C6
  ];
  for (const n of notes) {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.value = n.f;
    const start = now + n.t;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(n.g, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + n.d);
    osc.connect(gain).connect(ctx.destination);
    osc.start(start);
    osc.stop(start + n.d + 0.05);
  }
  // tiny sparkle layer — high sine ping
  const ping = ctx.createOscillator();
  const pingGain = ctx.createGain();
  ping.type = 'sine';
  ping.frequency.value = 2093; // C7
  pingGain.gain.setValueAtTime(0.0001, now + 0.34);
  pingGain.gain.exponentialRampToValueAtTime(0.10, now + 0.36);
  pingGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.70);
  ping.connect(pingGain).connect(ctx.destination);
  ping.start(now + 0.34);
  ping.stop(now + 0.75);
}

function useSuccessChime(shouldPlay) {
  // Plays once per entry into the success window. Resets on exit so the
  // chime fires again on every timeline loop.
  const playedRef = React.useRef(false);
  React.useEffect(() => {
    if (shouldPlay && !playedRef.current) {
      playedRef.current = true;
      playSuccessChime();
    } else if (!shouldPlay) {
      playedRef.current = false;
    }
  }, [shouldPlay]);
}

// scene.jsx — Orchestrates the 4-act animation:
//   Act 1 (0.0–3.0s)  walks to shop
//   Act 2 (3.0–5.6s)  orders donut + coffee at counter
//   Act 3 (5.6–8.0s)  taps card to pay
//   Act 4 (8.0–10.0s) leaves happy

function Scene() {
  const time = useTime();

  // Master scene crossfader — fades between act backdrops
  return (
    <div style={{ position: 'absolute', inset: 0, fontFamily: "'Fredoka', 'Quicksand', system-ui, sans-serif" }}>
      <Sprite start={0}   end={3.2}> <Act1Outdoor/> </Sprite>
      <Sprite start={3.0} end={5.8}> <Act2Counter/> </Sprite>
      <Sprite start={5.6} end={8.2}> <Act3CardTap/> </Sprite>
      <Sprite start={8.0} end={10}>  <Act4Leaving/> </Sprite>

      {/* Persistent caption strip at bottom — narrates each act */}
      <CaptionStrip/>

      {/* Title chip top-left */}
      <TitleChip/>
    </div>
  );
}

// ── Title chip & captions ───────────────────────────────────────────────────
function TitleChip() {
  const time = useTime();
  const op = animate({ from: 0, to: 1, start: 0.2, end: 0.8, ease: Easing.easeOutCubic })(time);
  const fade = animate({ from: 1, to: 0.6, start: 1.5, end: 2.5 })(time);
  return (
    <div style={{
      position: 'absolute', top: 24, left: 28,
      padding: '10px 18px',
      background: 'rgba(255,255,255,0.92)',
      border: '3px solid #3a2418',
      borderRadius: 28,
      boxShadow: '4px 4px 0 #3a2418',
      opacity: op * fade,
      transform: `translateY(${(1-op) * -12}px)`,
    }}>
      <div style={{ fontSize: 13, color: '#9c4a6a', letterSpacing: 2, fontWeight: 700, whiteSpace: 'nowrap' }}>A DAY AT</div>
      <div style={{ fontSize: 28, color: '#3a2418', fontWeight: 700, letterSpacing: 1, marginTop: -2, whiteSpace: 'nowrap' }}>SUGAR LANE</div>
    </div>
  );
}

function CaptionStrip() {
  const time = useTime();
  const captions = [
    { start: 0.4,  end: 2.8,  text: '“off to Sugar Lane for a treat…”' },
    { start: 3.2,  end: 5.5,  text: '“one donut and a coffee, please!”' },
    { start: 5.8,  end: 7.4,  text: '“just tap to pay — easy!”' },
    { start: 8.1,  end: 9.9,  text: '“thanks! see you tomorrow 💛”' },
  ];
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 72, display: 'flex', justifyContent: 'center', pointerEvents: 'none' }}>
      {captions.map((c, i) => {
        const inWindow = time >= c.start && time <= c.end;
        if (!inWindow) return null;
        const local = time - c.start;
        const dur = c.end - c.start;
        let op = 1;
        if (local < 0.3) op = local / 0.3;
        else if (local > dur - 0.3) op = (dur - local) / 0.3;
        return (
          <div key={i} style={{
            padding: '12px 28px',
            background: 'rgba(255,245,225,0.96)',
            border: '3px solid #3a2418',
            borderRadius: 16,
            boxShadow: '4px 4px 0 #3a2418',
            fontSize: 26,
            fontWeight: 600,
            color: '#3a2418',
            opacity: op,
            letterSpacing: 0.2,
            whiteSpace: 'nowrap',
          }}>
            {c.text}
          </div>
        );
      })}
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// ACT 1 — Pip walks to the shop
// ════════════════════════════════════════════════════════════════════════════
function Act1Outdoor() {
  const { localTime, progress } = useSprite();
  const t = useTime();

  // Pip walks from x=-200 to x=560 over ~2.6s, then pauses
  const pipX = interpolate([0, 2.6, 3.2], [-200, 560, 580], Easing.easeOutCubic)(localTime);
  const walking = localTime < 2.7;
  // Walk cycle phase: 2 full steps per second
  const walkPhase = (localTime * 2.2) % 1;

  // Background parallax scroll while walking
  const scrollPx = Math.min(localTime * 80, 2.6 * 80);

  // Blink occasionally
  const blink = (Math.sin(localTime * 4) > 0.95) ? 1 : 0;

  // Pip looks at shop at the end (head tilt)
  const armWave = localTime > 2.7 ? Math.sin((localTime - 2.7) * 8) * 0.3 : 0;

  // Mouth: small while walking, opens to 'o' at the end (looking up at sign)
  const mouth = localTime > 2.7 ? 'o' : 'smile';

  return (
    <Sprite start={0} end={Infinity}>
      <StreetBackdrop scrollPx={scrollPx}/>

      {/* Shop facade — positioned right side of screen */}
      <ShopFacade x={680} y={140} scale={0.95}/>

      {/* Floating sparkle near "today's special" board */}
      <Sparkle x={1120} y={420} phase={localTime * 0.6}/>
      <Sparkle x={1170} y={460} phase={localTime * 0.6 + 0.4}/>

      {/* A passing bird */}
      <Bird x={interpolate([0, 3], [-100, 700])(localTime)} y={120 + Math.sin(localTime*3)*8}/>

      {/* Pip — walks across the sidewalk */}
      <Pip
        x={pipX}
        y={420}
        scale={1.05}
        walking={walking}
        walkPhase={walkPhase}
        facing={1}
        blink={blink}
        mouth={mouth}
      />

      {/* Excitement bubble at the end */}
      {localTime > 2.5 && (
        <ExcitementBubble x={pipX + 200} y={400} t={localTime - 2.5}/>
      )}
    </Sprite>
  );
}

function Sparkle({ x, y, phase = 0 }) {
  const op = 0.4 + Math.abs(Math.sin(phase * Math.PI * 2)) * 0.6;
  const s = 0.6 + Math.abs(Math.sin(phase * Math.PI * 2)) * 0.5;
  return (
    <svg style={{ position: 'absolute', left: x, top: y, opacity: op, transform: `scale(${s})` }} width="36" height="36" viewBox="-18 -18 36 36">
      <path d="M 0 -14 L 3 -3 L 14 0 L 3 3 L 0 14 L -3 3 L -14 0 L -3 -3 Z" fill="#ffe28a" stroke="#3a2418" strokeWidth="1.5"/>
    </svg>
  );
}

function Bird({ x, y }) {
  const t = useTime();
  const flap = Math.sin(t * 12) * 0.4;
  return (
    <svg style={{ position: 'absolute', left: x, top: y }} width="42" height="28" viewBox="-21 -14 42 28">
      <g transform={`scale(1 ${1 + flap})`}>
        <path d="M -16 0 Q -8 -10 0 0 Q 8 -10 16 0" fill="none" stroke="#3a2418" strokeWidth="2.5" strokeLinecap="round"/>
      </g>
    </svg>
  );
}

function ExcitementBubble({ x, y, t }) {
  const op = animate({ from: 0, to: 1, start: 0, end: 0.3, ease: Easing.easeOutBack })(t);
  const bob = Math.sin(t * 6) * 3;
  return (
    <div style={{
      position: 'absolute', left: x, top: y + bob,
      opacity: op,
      transform: `scale(${op})`,
      transformOrigin: 'bottom left',
    }}>
      <svg width="120" height="80" viewBox="0 0 120 80">
        <path d="M 6 14 Q 6 4 16 4 L 104 4 Q 114 4 114 14 L 114 50 Q 114 60 104 60 L 30 60 L 18 74 L 22 60 L 16 60 Q 6 60 6 50 Z"
              fill="#fff5e1" stroke="#3a2418" strokeWidth="3"/>
        <text x="60" y="38" textAnchor="middle" fontSize="24" fill="#ff8eb4">🍩</text>
        <text x="82" y="38" textAnchor="middle" fontSize="22" fill="#7a4a2e">☕</text>
        <text x="38" y="38" textAnchor="middle" fontSize="22">✨</text>
      </svg>
    </div>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// ACT 2 — At the counter, ordering donut + coffee
// ════════════════════════════════════════════════════════════════════════════
function Act2Counter() {
  const { localTime } = useSprite();

  // Fade in
  const op = animate({ from: 0, to: 1, start: 0, end: 0.4 })(localTime);
  // Counter slide-in: barely noticeable settle
  const settle = animate({ from: 30, to: 0, start: 0, end: 0.5, ease: Easing.easeOutBack })(localTime);

  // Donut: appears around t=0.8, bounces onto counter
  const donutY = localTime > 0.8
    ? 380 - Math.max(0, interpolate([0,0.3,0.5], [200, -10, 0], Easing.easeOutBack)(localTime - 0.8))
    : -200;

  // Coffee: appears around t=1.4, slides in from right
  const coffeeX = localTime > 1.4
    ? interpolate([0, 0.4], [1400, 820], Easing.easeOutBack)(localTime - 1.4)
    : 1400;

  // Pip peeks from below counter from t=0.2 onward
  const pipY = interpolate([0.2, 0.7, 2.6], [820, 480, 480], Easing.easeOutBack)(localTime);
  const pipMouth = localTime > 1.6 ? 'wide' : (localTime > 0.7 ? 'smile' : 'o');
  const pipBlink = (Math.sin(localTime * 5) > 0.95) ? 1 : 0;

  // Steam phase
  const steamPhase = localTime;

  // Subtle hop on item placement
  const counterShake = (localTime > 0.85 && localTime < 1.05) ? Math.sin(localTime * 60) * 1.5 : 0;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op, transform: `translateY(${counterShake}px)` }}>
      <ShopInterior/>

      {/* Pip peeking up behind counter on the left */}
      <div style={{ position: 'absolute', left: 220, top: pipY, transition: 'none' }}>
        <Pip
          x={0} y={0} scale={1.4}
          walking={false}
          facing={1}
          blink={pipBlink}
          mouth={pipMouth}
        />
      </div>

      {/* Mrs. Marlow — the shopkeeper, standing behind the counter on the right.
          Clipped so her lower body hides behind the counter. */}
      <div style={{ position: 'absolute', left: 880, top: 168, width: 330, height: 264, overflow: 'hidden' }}>
        <Shopkeeper
          x={0} y={0} scale={1.5}
          wave={localTime < 0.9 ? clamp(localTime / 0.9, 0, 1) : 0}
          blink={(Math.sin(localTime * 3 + 1) > 0.94) ? 1 : 0}
          mouth={localTime < 0.9 ? 'wide' : (localTime > 1.6 ? 'smile' : 'small')}
          lookAt={-1}
        />
      </div>

      {/* Donut on the counter (left of center) */}
      <div style={{ position: 'absolute', left: 640, top: donutY, transform: 'translateZ(0)' }}>
        <svg width="180" height="180" viewBox="-90 -90 180 180">
          {/* tray */}
          <ellipse cx="0" cy="48" rx="60" ry="10" fill="#3a2418" opacity="0.25"/>
          <Donut x={0} y={0} s={1.4}/>
        </svg>
      </div>

      {/* Coffee on the counter (right of donut) */}
      <div style={{ position: 'absolute', left: coffeeX, top: 320 }}>
        <svg width="160" height="240" viewBox="-80 -120 160 240">
          <CoffeeCup x={0} y={50} s={1.6} steamPhase={steamPhase}/>
        </svg>
      </div>

      {/* "+ poof!" sparkles when items land — Marlow's presence sells the placement */}
      {localTime > 1.05 && localTime < 1.5 && <Poof x={720} y={420} t={localTime - 1.05}/>}
      {localTime > 1.7 && localTime < 2.1 && <Poof x={900} y={420} t={localTime - 1.7}/>}
    </div>
  );
}

function ShopkeeperHand({ x, y, hand }) {
  return (
    <div style={{ position: 'absolute', left: x, top: y, pointerEvents: 'none' }}>
      <svg width="120" height="420" viewBox="0 -200 120 420" style={{ overflow: 'visible' }}>
        {/* sleeve — striped pink, matches Mrs. Marlow */}
        <rect x="32" y="-220" width="56" height="340" rx="10" fill="#ff8eb4" stroke="#3a2418" strokeWidth="3"/>
        <line x1="32" y1="40" x2="88" y2="40" stroke="#fff5e1" strokeWidth="4"/>
        <line x1="32" y1="66" x2="88" y2="66" stroke="#fff5e1" strokeWidth="4"/>
        <line x1="32" y1="92" x2="88" y2="92" stroke="#fff5e1" strokeWidth="4"/>
        <rect x="28" y="110" width="64" height="14" rx="4" fill="#fbeec1" stroke="#3a2418" strokeWidth="3"/>
        {/* hand — warm tan */}
        <ellipse cx="60" cy="142" rx="28" ry="22" fill="#d8a070" stroke="#3a2418" strokeWidth="3"/>
        {/* fingers */}
        <path d="M 36 142 q -4 18 4 26 M 50 156 q -2 16 4 22 M 70 156 q 2 16 -4 22 M 84 142 q 4 18 -4 26"
              fill="none" stroke="#3a2418" strokeWidth="2" opacity="0.5"/>
        {/* held item indicator */}
        {hand === 'donut' && (
          <g transform="translate(60 178)"><Donut x={0} y={0} s={0.45}/></g>
        )}
        {hand === 'coffee' && (
          <g transform="translate(60 178)"><CoffeeCup x={0} y={0} s={0.6} steamPhase={0}/></g>
        )}
      </svg>
    </div>
  );
}

function Poof({ x, y, t }) {
  const op = 1 - t / 0.45;
  const r = t * 80;
  return (
    <svg style={{ position: 'absolute', left: x - 60, top: y - 60, pointerEvents: 'none' }} width="120" height="120" viewBox="-60 -60 120 120">
      <g opacity={op} fill="none" stroke="#fff5e1" strokeWidth="3">
        <circle r={r * 0.5}/>
        <circle r={r * 0.7} opacity="0.5"/>
      </g>
      <g opacity={op} stroke="#ffd66b" strokeWidth="3" strokeLinecap="round">
        <line x1={-r*0.7} y1="0" x2={-r*0.9} y2="0"/>
        <line x1={r*0.7} y1="0" x2={r*0.9} y2="0"/>
        <line x1="0" y1={-r*0.7} x2="0" y2={-r*0.9}/>
        <line x1="0" y1={r*0.7} x2="0" y2={r*0.9}/>
      </g>
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// ACT 3 — Card tap to pay
// ════════════════════════════════════════════════════════════════════════════
function Act3CardTap() {
  const { localTime } = useSprite();
  const op = animate({ from: 0, to: 1, start: 0, end: 0.4 })(localTime);

  // Terminal sits stationary at right-center
  // Card flies in from bottom-left, tilts, hovers near terminal, taps, retreats
  const cardX = interpolate([0, 0.6, 1.2, 1.6, 2.0, 2.4], [200, 480, 540, 540, 540, 360],
    [Easing.easeOutCubic, Easing.easeInOutCubic, Easing.linear, Easing.linear, Easing.easeInOutCubic])(localTime);
  const cardY = interpolate([0, 0.6, 1.2, 1.6, 2.0, 2.4], [720, 380, 340, 360, 340, 480],
    [Easing.easeOutCubic, Easing.easeInOutCubic, Easing.easeInOutSine, Easing.easeInOutSine, Easing.easeInCubic])(localTime);
  const cardRot = interpolate([0, 0.6, 1.2, 1.6, 2.0, 2.4], [-30, -12, -8, -10, -8, -22])(localTime);
  const cardS = interpolate([0, 0.6, 1.2, 2.4], [0.6, 1.0, 1.05, 1.0])(localTime);

  // Tap window: 1.2–1.6
  const tapPulse = (localTime > 1.2 && localTime < 1.8)
    ? clamp((localTime - 1.2) / 0.6, 0, 1)
    : 0;

  // Screen states
  let screen = 'ready';
  if (localTime > 1.25 && localTime < 1.85) screen = 'tapped';
  if (localTime >= 1.85) screen = 'success';

  // Big check overlay
  const checkOp = animate({ from: 0, to: 1, start: 1.85, end: 2.1, ease: Easing.easeOutBack })(localTime);
  const checkScale = animate({ from: 0.4, to: 1, start: 1.85, end: 2.1, ease: Easing.easeOutBack })(localTime);

  // Coins burst
  const coinsT = Math.max(0, localTime - 1.85);

  // 🔔 Play cheerful chime at the moment of approval
  useSuccessChime(localTime >= 1.85 && localTime < 2.4);

  return (
    <div style={{
      position: 'absolute', inset: 0, opacity: op,
      background: 'radial-gradient(ellipse at 50% 60%, #f6c8d2 0%, #d99fb1 60%, #7a4a2e 100%)',
    }}>
      {/* Soft spotlight ring */}
      <div style={{
        position: 'absolute', left: '50%', top: '55%',
        width: 700, height: 700, marginLeft: -350, marginTop: -350,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,245,225,0.65) 0%, rgba(255,245,225,0) 60%)',
      }}/>

      {/* Receipt floating in left corner */}
      <Receipt x={120} y={140} t={localTime}/>

      {/* Terminal */}
      <svg style={{ position: 'absolute', left: 480, top: 280 }} width="320" height="380" viewBox="-160 -190 320 380">
        <CardTerminal x={0} y={40} s={1.7} screen={screen} pulse={tapPulse}/>
      </svg>

      {/* Pip hand holding card — animated path */}
      <svg style={{ position: 'absolute', left: 0, top: 0 }} width="1280" height="720" viewBox="0 0 1280 720">
        <g transform={`translate(${cardX} ${cardY})`}>
          {/* arm/cuff */}
          <g transform={`rotate(${cardRot + 90})`}>
            <rect x="-18" y="40" width="36" height="120" rx="14" fill="#ffc657" stroke="#3a2418" strokeWidth="3"/>
            <rect x="-22" y="148" width="44" height="14" rx="4" fill="#e9a92e" stroke="#3a2418" strokeWidth="3"/>
            <circle cx="0" cy="36" r="22" fill="#ffd6a8" stroke="#3a2418" strokeWidth="3"/>
          </g>
          {/* the card */}
          <g transform={`scale(${cardS})`}>
            <CreditCard x={0} y={0} s={1} rotation={cardRot}/>
          </g>
        </g>
      </svg>

      {/* Big success check */}
      {checkOp > 0 && (
        <div style={{
          position: 'absolute', left: '50%', top: '38%',
          marginLeft: -90, marginTop: -90,
          opacity: checkOp,
          transform: `scale(${checkScale})`,
        }}>
          <svg width="180" height="180" viewBox="-90 -90 180 180">
            <circle r="76" fill="#33c587" stroke="#3a2418" strokeWidth="5"/>
            <circle r="76" fill="none" stroke="#fff" strokeWidth="3" strokeDasharray="4 8" opacity="0.5"/>
            <path d="M -36 0 L -10 26 L 38 -28" fill="none" stroke="#fff" strokeWidth="14" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}

      {/* Coins/confetti burst on success */}
      {coinsT > 0 && <CoinBurst t={coinsT}/>}

      {/* Secured by Razorpay badge — fades in with the approval */}
      {localTime > 1.9 && <RazorpayBadge t={localTime - 1.9}/>}

      {/* "PAID" stamp */}
      {localTime > 2.1 && (
        <div style={{
          position: 'absolute', left: 880, top: 200,
          transform: `rotate(-14deg) scale(${animate({from:1.6, to:1, start:2.1, end:2.3, ease:Easing.easeOutBack})(localTime)})`,
          opacity: animate({from:0, to:1, start:2.1, end:2.25})(localTime),
        }}>
          <div style={{
            border: '6px double #c5314a',
            color: '#c5314a',
            fontWeight: 800,
            fontSize: 48,
            padding: '6px 24px',
            letterSpacing: 4,
            fontFamily: "'Fredoka', system-ui",
            background: 'rgba(255,245,225,0.4)',
          }}>
            PAID
          </div>
          <div style={{ textAlign: 'center', color: '#c5314a', fontFamily: 'ui-monospace, monospace', fontSize: 14, marginTop: 4, opacity: 0.8 }}>
            ₹ 6.50 · TXN 88224
          </div>
        </div>
      )}
    </div>
  );
}

// ── Secured by Razorpay badge ──────────────────────────────────────────────
function RazorpayBadge({ t }) {
  const op = animate({ from: 0, to: 1, start: 0, end: 0.35, ease: Easing.easeOutCubic })(t);
  const slide = animate({ from: 30, to: 0, start: 0, end: 0.45, ease: Easing.easeOutBack })(t);
  const wiggle = Math.sin(t * 3) * 1.5;
  return (
    <div style={{
      position: 'absolute', left: '50%', top: 600,
      transform: `translate(-50%, ${slide + wiggle}px)`,
      opacity: op,
      pointerEvents: 'none',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '8px 16px 8px 10px',
        background: '#072654',
        border: '3px solid #3a2418',
        borderRadius: 999,
        boxShadow: '3px 4px 0 #3a2418',
        fontFamily: "'Fredoka', system-ui, sans-serif",
      }}>
        {/* tiny lock icon */}
        <svg width="22" height="22" viewBox="0 0 22 22" style={{ flexShrink: 0 }}>
          <rect x="4" y="10" width="14" height="9" rx="2" fill="#ffd66b" stroke="#3a2418" strokeWidth="1.5"/>
          <path d="M 7 10 V 7 a 4 4 0 0 1 8 0 V 10" fill="none" stroke="#ffd66b" strokeWidth="2"/>
          <circle cx="11" cy="14" r="1.5" fill="#3a2418"/>
        </svg>
        <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)', letterSpacing: 2, fontWeight: 600 }}>SECURED BY</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
            {/* Razorpay 'R' mark */}
            <svg width="16" height="18" viewBox="0 0 16 18">
              <path d="M 4 18 L 8 8 L 4 8 L 6 2 L 14 2 L 11 9 L 7 9 L 3 18 Z" fill="#3395FF"/>
            </svg>
            <span style={{ fontSize: 18, color: '#fff', fontWeight: 700, letterSpacing: 0.3 }}>Razorpay</span>
          </div>
        </div>
        {/* tiny cute heart */}
        <span style={{ fontSize: 14, marginLeft: 2 }}>💙</span>
      </div>
      {/* sub-tagline */}
      <div style={{
        fontFamily: "'Fredoka', system-ui, sans-serif",
        fontSize: 13,
        fontWeight: 600,
        color: '#072654',
        background: 'rgba(255,245,225,0.96)',
        border: '2px solid #3a2418',
        borderRadius: 10,
        padding: '3px 12px',
        whiteSpace: 'nowrap',
      }}>
        safe &amp; sweet · payment in 0.3s ✨
      </div>
    </div>
  );
}

function Receipt({ x, y, t }) {
  const slideIn = animate({ from: -300, to: 0, start: 0.2, end: 0.7, ease: Easing.easeOutCubic })(t);
  return (
    <div style={{
      position: 'absolute', left: x + slideIn, top: y,
      transform: 'rotate(-6deg)',
      filter: 'drop-shadow(4px 6px 0 rgba(58,36,24,0.3))',
    }}>
      <svg width="220" height="280" viewBox="0 0 220 280">
        <path d="M 10 0 L 210 0 L 210 250 L 200 260 L 190 250 L 180 260 L 170 250 L 160 260 L 150 250 L 140 260 L 130 250 L 120 260 L 110 250 L 100 260 L 90 250 L 80 260 L 70 250 L 60 260 L 50 250 L 40 260 L 30 250 L 20 260 L 10 250 Z"
              fill="#fff5e1" stroke="#3a2418" strokeWidth="2.5"/>
        <text x="110" y="32" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="14" fontWeight="700" fill="#3a2418">SUGAR LANE</text>
        <text x="110" y="50" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="9" fill="#7a4a2e">~ donuts &amp; coffee ~</text>
        <line x1="20" y1="64" x2="200" y2="64" stroke="#3a2418" strokeDasharray="3 3"/>
        <text x="24" y="86" fontFamily="ui-monospace, monospace" fontSize="12" fill="#3a2418">1x Glazed Donut</text>
        <text x="196" y="86" textAnchor="end" fontFamily="ui-monospace, monospace" fontSize="12" fill="#3a2418">3.50</text>
        <text x="24" y="106" fontFamily="ui-monospace, monospace" fontSize="12" fill="#3a2418">1x Hot Coffee</text>
        <text x="196" y="106" textAnchor="end" fontFamily="ui-monospace, monospace" fontSize="12" fill="#3a2418">4.00</text>
        <text x="24" y="126" fontFamily="ui-monospace, monospace" fontSize="11" fill="#9c4a6a">  combo discount</text>
        <text x="196" y="126" textAnchor="end" fontFamily="ui-monospace, monospace" fontSize="11" fill="#9c4a6a">-1.00</text>
        <line x1="20" y1="138" x2="200" y2="138" stroke="#3a2418" strokeDasharray="3 3"/>
        <text x="24" y="160" fontFamily="ui-monospace, monospace" fontSize="13" fontWeight="700" fill="#3a2418">TOTAL</text>
        <text x="196" y="160" textAnchor="end" fontFamily="ui-monospace, monospace" fontSize="13" fontWeight="700" fill="#3a2418">6.50</text>
        <line x1="20" y1="172" x2="200" y2="172" stroke="#3a2418" strokeDasharray="3 3"/>
        <text x="24" y="194" fontFamily="ui-monospace, monospace" fontSize="10" fill="#7a4a2e">CARD ····0726 · TAP</text>
        <text x="24" y="210" fontFamily="ui-monospace, monospace" fontSize="10" fill="#33c587" fontWeight="700">APPROVED ✓</text>
        <text x="24" y="226" fontFamily="ui-monospace, monospace" fontSize="9" fill="#072654" fontWeight="700">via Razorpay 💙</text>
        <text x="110" y="246" textAnchor="middle" fontFamily="'Fredoka', system-ui" fontSize="11" fill="#9c4a6a">have a sweet day!</text>
      </svg>
    </div>
  );
}

function CoinBurst({ t }) {
  const items = Array.from({ length: 12 }).map((_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    const r = t * 280;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r - 60 * t * t;
    const op = clamp(1 - t / 1.2, 0, 1);
    const rot = t * 360 + i * 30;
    const isHeart = i % 3 === 0;
    return { x, y, op, rot, isHeart, i };
  });
  return (
    <svg style={{ position: 'absolute', left: '50%', top: '38%', pointerEvents: 'none' }}
         width="800" height="800" viewBox="-400 -400 800 800">
      {items.map(it => (
        <g key={it.i} transform={`translate(${it.x} ${it.y}) rotate(${it.rot})`} opacity={it.op}>
          {it.isHeart ? (
            <path d="M0,-6 C-8,-18 -22,-10 -22,2 C-22,14 0,26 0,26 C0,26 22,14 22,2 C22,-10 8,-18 0,-6 Z"
                  fill="#ff8eb4" stroke="#3a2418" strokeWidth="2"/>
          ) : (
            <g>
              <circle r="14" fill="#ffd66b" stroke="#3a2418" strokeWidth="2"/>
              <text textAnchor="middle" y="5" fontFamily="ui-monospace, monospace" fontSize="14" fontWeight="800" fill="#3a2418">$</text>
            </g>
          )}
        </g>
      ))}
    </svg>
  );
}

// ════════════════════════════════════════════════════════════════════════════
// ACT 4 — Pip walks away with goods, sparkles
// ════════════════════════════════════════════════════════════════════════════
function Act4Leaving() {
  const { localTime } = useSprite();
  const op = animate({ from: 0, to: 1, start: 0, end: 0.3 })(localTime);

  // Pip walks LEFT, away from shop (facing left) holding cup + bag
  const pipX = interpolate([0, 1.8], [600, -120], Easing.easeInOutCubic)(localTime);
  const walkPhase = (localTime * 2.2) % 1;
  const walking = localTime < 1.8;

  // Hearts floating above
  return (
    <div style={{ position: 'absolute', inset: 0, opacity: op }}>
      <StreetBackdrop scrollPx={localTime * 60}/>
      <ShopFacade x={680} y={140} scale={0.95} doorOpen={Math.max(0, 1 - localTime * 1.5)}/>

      {/* Sparkles around shop */}
      <Sparkle x={780} y={180} phase={localTime * 0.8}/>
      <Sparkle x={1100} y={280} phase={localTime * 0.8 + 0.3}/>
      <Sparkle x={900} y={120} phase={localTime * 0.8 + 0.6}/>

      {/* Pip with goods */}
      <Pip
        x={pipX}
        y={420}
        scale={1.1}
        walking={walking}
        walkPhase={walkPhase}
        facing={-1}
        holding="cup-and-bag"
        mouth="wide"
        blink={(Math.sin(localTime * 4) > 0.95) ? 1 : 0}
      />

      {/* Hearts trailing above Pip */}
      {Array.from({ length: 4 }).map((_, i) => {
        const delay = i * 0.35;
        if (localTime < delay) return null;
        const lt = localTime - delay;
        const opacity = clamp(1 - lt / 1.6, 0, 1);
        const heartX = pipX + 80 + Math.sin(lt * 3) * 20;
        const heartY = 380 - lt * 60;
        return (
          <svg key={i} style={{ position: 'absolute', left: heartX, top: heartY, opacity }} width="36" height="36" viewBox="-18 -18 36 36">
            <path d="M0,-2 C-8,-14 -16,-6 -16,4 C-16,12 0,20 0,20 C0,20 16,12 16,4 C16,-6 8,-14 0,-2 Z"
                  fill="#ff8eb4" stroke="#3a2418" strokeWidth="2"/>
          </svg>
        );
      })}

      {/* End card */}
      {localTime > 1.4 && (
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: `translate(-50%, -50%) scale(${animate({from:0.6, to:1, start:1.4, end:1.8, ease:Easing.easeOutBack})(localTime)})`,
          opacity: animate({from:0, to:1, start:1.4, end:1.7})(localTime),
        }}>
          <div style={{
            background: '#fff5e1',
            border: '4px solid #3a2418',
            borderRadius: 28,
            padding: '28px 56px',
            boxShadow: '8px 8px 0 #3a2418',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: 18, color: '#9c4a6a', letterSpacing: 4, fontWeight: 700 }}>— FIN —</div>
            <div style={{ fontSize: 46, color: '#3a2418', fontWeight: 700, marginTop: 4, letterSpacing: 0.5 }}>have a sweet day</div>
            <div style={{ fontSize: 16, color: '#7a4a2e', marginTop: 8, fontFamily: 'ui-monospace, monospace' }}>sugarlane.shop · tap · sip · smile</div>
          </div>
        </div>
      )}
    </div>
  );
}

window.Scene = Scene;
