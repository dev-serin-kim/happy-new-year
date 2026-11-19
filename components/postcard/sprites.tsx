// Shared SVG symbols: the hand-drawn sheep, wax seal, star, and lock.
// Rendered once in the root layout and referenced with <use href="#...">.
export function PostcardSprites() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <path id="star5" d="M0-7 L1.8-2.2 L6.8-2.2 L2.8 0.8 L4.3 5.6 L0 2.8 L-4.3 5.6 L-2.8 0.8 L-6.8-2.2 L-1.8-2.2Z" />
        <path id="spark" d="M0-12 C1 -3 3 -1 12 0 C3 1 1 3 0 12 C-1 3 -3 1 -12 0 C-3 -1 -1 -3 0 -12Z" />
        <symbol id="sheep" viewBox="0 0 240 180">
          <g fill="currentColor">
            <rect x="76" y="104" width="10" height="58" rx="5" /><rect x="98" y="108" width="10" height="56" rx="5" />
            <rect x="150" y="108" width="10" height="56" rx="5" /><rect x="172" y="104" width="10" height="58" rx="5" />
            <circle cx="82" cy="64" r="22" /><circle cx="106" cy="54" r="24" /><circle cx="132" cy="52" r="24" />
            <circle cx="158" cy="55" r="24" /><circle cx="182" cy="66" r="22" /><circle cx="198" cy="88" r="19" />
            <circle cx="184" cy="108" r="19" /><circle cx="156" cy="114" r="19" /><circle cx="128" cy="116" r="19" />
            <circle cx="100" cy="114" r="19" /><circle cx="76" cy="106" r="19" /><circle cx="64" cy="86" r="19" />
            <ellipse cx="130" cy="86" rx="64" ry="34" /><circle cx="214" cy="80" r="9" />
            <path d="M72 76 L50 50 L32 62 L56 100 Z" />
            <ellipse cx="36" cy="64" rx="23" ry="14" transform="rotate(-28 36 64)" />
            <ellipse cx="56" cy="46" rx="12" ry="4.5" transform="rotate(-18 56 46)" />
          </g>
          <g fill="var(--sheep-detail)">
            <rect x="76" y="154" width="10" height="9" rx="2" /><rect x="98" y="156" width="10" height="9" rx="2" />
            <rect x="150" y="156" width="10" height="9" rx="2" /><rect x="172" y="154" width="10" height="9" rx="2" />
            <circle cx="29" cy="58" r="2.8" />
          </g>
          <path d="M44 48 c2 -18 28 -20 29 -4 c1 10 -12 13 -15 5" fill="none" stroke="var(--sheep-horn)" strokeWidth="6.5" strokeLinecap="round" />
          <g fill="var(--sheep-star)">
            <use href="#star5" transform="translate(104 66) scale(1.5) rotate(12)" /><use href="#star5" transform="translate(140 58) scale(1.2) rotate(-8)" />
            <use href="#star5" transform="translate(172 82) scale(1.4) rotate(20)" /><use href="#star5" transform="translate(126 98) scale(1.1) rotate(-15)" />
            <use href="#star5" transform="translate(86 92) scale(1.1)" /><use href="#star5" transform="translate(158 108) scale(1) rotate(30)" />
            <use href="#star5" transform="translate(194 100) scale(.9)" />
          </g>
          <g fill="var(--sheep-ribbon)">
            <path d="M60 84 l-14 -9 l1 16 z" /><path d="M60 84 l14 -10 l-1 17 z" /><path d="M58 86 l-6 16 l5 -2 l4 4 z" /><circle cx="60" cy="84" r="3.5" />
          </g>
        </symbol>
        <symbol id="wax" viewBox="0 0 60 60">
          <path d="M30 2.5c5 .2 7.6 2.6 11.6 3.6 4.4 1.1 8.3 3.8 10.2 8.2 1.6 3.7.8 7.4 2.6 11 2 4 1.2 8.6-.9 12.3-2 3.5-2.1 7.6-5.6 10.4-3.4 2.8-7.7 3.2-11.7 5-3.8 1.7-8 2.4-12 1-3.9-1.3-7.9-1.9-11-4.8-3.3-3-4.4-7.4-6.8-11-2.3-3.5-4-7.7-3-11.8.9-4 3.5-7.3 5.3-11 1.8-3.6 4.8-6.6 8.7-7.8 4.2-1.3 8.2-4.3 12.6-4.1z" fill="#c22d27" />
          <circle cx="30" cy="30" r="18.5" fill="#b02620" stroke="#8a1b16" strokeWidth="1.6" />
          <circle cx="30" cy="30" r="15.5" fill="none" stroke="#d8473f" strokeWidth="1" opacity=".7" />
          <svg x="17" y="20.5" width="26" height="19.5" viewBox="0 0 240 180" className="sheep-wax"><use href="#sheep" /></svg>
          <ellipse cx="20" cy="15" rx="7" ry="3.2" fill="#fff" opacity=".22" transform="rotate(-35 20 15)" />
        </symbol>
        <symbol id="lockSolid" viewBox="0 0 24 24">
          <path d="M7.5 10.5V8a4.5 4.5 0 0 1 9 0v2.5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <rect x="4.5" y="10" width="15" height="11" rx="2.6" fill="currentColor" />
        </symbol>
      </defs>
    </svg>
  )
}
