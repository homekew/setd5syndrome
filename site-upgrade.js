/**
 * site-upgrade.js  v23
 * SETD5 Syndrome (.com) — editorial redesign
 *
 * v7: Header, nav, footer redesign
 * v8: Full page body overrides
 * v9: Zone-based visual rhythm — three distinct tonal layers
 *
 *   Zone strategy (top to bottom):
 *   ┌─────────────────────────────┐
 *   │ HEADER + NAV   — WHITE      │  elevated cap, clean structure
 *   ├─────────────────────────────┤
 *   │ INTRO / HERO   — TAN #DFD4C3│  warm break, white cards inside
 *   ├─────────────────────────────┤
 *   │ CONTENT / CARDS— LINEN      │  grounded zone, white cards float on linen
 *   ├─────────────────────────────┤
 *   │ FOOTER         — TAN #DFD4C3│  bookend matches intro zone
 *   └─────────────────────────────┘
 *
 *   Additional improvements:
 *   - Cards: stronger shadow (0 2px 12px), more visible borders
 *   - Stats: white-on-tan creates real contrast
 *   - Intro card: white-on-tan with blue left border
 *   - International note: restyled to palette via DOM
 *   - Accent #2a627a consistently on all interactive elements
 */

(function () {
  'use strict';

  /* ─── DESIGN TOKENS ──────────────────────────────────────────────────────
     --bg:          #EEEAE2   warm linen page ground
     --bg-alt:      #DFD4C3   muted tan — footer, alt bands, borders
     --surface:     #FFFFFF   header, elevated cards
     --heading:     #5D5646   primary heading
     --body:        #4D4C4B   body / UI text
     --muted:       #7A756D   secondary labels, meta
     --accent-blue: #2a627a   interaction: links, active states, buttons, focus
     --accent-warm: #A07D54   warm accent: labels, tags, subtitle, section marks
     --border:      #D4CCBF   card and section borders
  ────────────────────────────────────────────────────────────────────────── */


  /* ─── 1. INJECT STYLES ───────────────────────────────────────────────── */

  /* Header background: clean white surface for header and nav. */

  const css = `

    @import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,600;0,700;1,400&family=Public+Sans:wght@300;400;500;600;700&display=swap');

    /* ═══════════════════════════════════════════════════════════════
       UNIFIED HEADER SYSTEM
       ─────────────────────────────────────────────────────────────
       The header (title area) and nav (link strip) are separate HTML
       elements but must read as a single designed surface. Strategy:

       • 3px blue accent stripe at the very top of the header — structural
         entry point, the only non-white element in the header block.
       • No border between header and nav — they share one continuous
         white surface. The seam is replaced by a ghost hairline inside
         the nav-inner that reads as internal articulation, not division.
       • Single shadow lives on the nav — one drop at the bottom of the
         combined unit, lifting the whole block off the page.
       • Title hierarchy tightened: h1 dominates, subtitle becomes a
         clearly subordinate eyebrow label at reduced weight and size.
    ═══════════════════════════════════════════════════════════════ */

    /* ── HOME PAGE HEADER: blue entry stripe, no bottom seam ─────────── */
    header:not(.site-header) {
      background: #FFFFFF !important;
      color: #5D5646 !important;
      text-align: left !important;
      padding: 0 !important;              /* inner handles all spacing */
      border-top: 3px solid #2a627a !important;   /* structural anchor */
      border-bottom: none !important;     /* no seam — merges with nav */
      box-shadow: none !important;        /* shadow lives on nav bottom */
      position: relative;
      z-index: 10;
    }

    header:not(.site-header) .header-hero-inner {
      max-width: 1160px !important;
      display: flex !important;
      align-items: center !important;
      gap: 1.25rem !important;
      padding: 1.125rem 2rem 1rem !important;   /* slightly tighter vertical */
      margin: 0 auto !important;
    }

    /* Logo: balanced against the title weight.
       Drop-shadow follows the actual shape (not the bounding box) so the
       cream book pages don't vanish against the white header background. */
    .su-header-logo {
      flex-shrink: 0;
      height: 96px;
      width: 96px;
      object-fit: contain;
      filter: drop-shadow(0 1px 3px rgba(0,0,0,0.18));
    }

    .su-header-text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 0;
    }

    /* Site title: Spectral, hero scale */
    header:not(.site-header) h1,
    header:not(.site-header) h1 a {
      font-family: 'Spectral', Georgia, serif !important;
      color: #5D5646 !important;
      font-size: 2.2rem !important;
      font-weight: 600 !important;
      letter-spacing: -0.02em !important;
      line-height: 1.1 !important;
      text-shadow: none !important;
      margin: 0 !important;
    }

    /* Hide original em on home page only — subtitle replaced by span */
    header:not(.site-header) h1 em {
      display: none !important;
    }

    /* Subtitle: clearly secondary — smaller, wider tracking, lower weight.
       Reads as an eyebrow label beneath the title, not a co-equal element. */
    .su-site-subtitle {
      display: block;
      font-family: 'Public Sans', system-ui, sans-serif;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: #5a9186;
      margin-top: 0.5rem;
      line-height: 1;
      opacity: 0.9;
    }

    /* Home page decorative elements to remove */
    header:not(.site-header) .header-rule { display: none !important; }
    header:not(.site-header) .header-sub  { display: none !important; }

    /* Responsive: mobile header layout */
    @media (max-width: 640px) {
      .su-header-logo { height: 68px; width: 68px; }
      header:not(.site-header) h1 { font-size: 2rem !important; }
      header:not(.site-header) .header-hero-inner {
        gap: 0.875rem !important;
        padding: 0.875rem 1.25rem 0.75rem !important;
      }
      .su-site-subtitle { font-size: 0.65rem; letter-spacing: 0.12em; }
    }


    /* ── NAV: completes the unified header block ──────────────────────────
       No top border — the nav surface continues directly from the header.
       Internal hairline added inside nav-inner for subtle articulation.
       Shadow lives here, anchoring the full header block to the page.
    ──────────────────────────────────────────────────────────────────── */

    .site-nav {
      background: #FFFFFF !important;
      border-top: none !important;        /* no seam between header and nav */
      border-bottom: 1px solid #E0D9CE !important;
      box-shadow: 0 2px 16px rgba(0,0,0,0.07) !important;
      /* Intentionally NOT overriding position or z-index:
         original is position:sticky; top:0; z-index:900 — keep that intact */
    }

    /* ── Desktop nav layout: scoped to min-width 640px so tablets
       keep the horizontal bar; only true mobile gets the hamburger.
       ─────────────────────────────────────────────────────────── */
    @media (min-width: 640px) {
      /* Hide hamburger button — original site shows it at ≤768px */
      .nav-toggle { display: none !important; }

      .site-nav .site-nav-inner {
        height: 40px !important;         /* slightly slimmer — more editorial */
        min-height: 40px !important;
        max-width: 1160px !important;
        padding: 0 2rem !important;
        justify-content: flex-start !important;
        margin: 0 auto !important;
        /* Ghost hairline: internal articulation, not a structural divide */
        border-top: 1px solid rgba(212, 204, 191, 0.55) !important;
      }

      .nav-menu {
        display: flex !important;
        flex-direction: row !important;
        align-items: stretch !important;
        height: 100% !important;
        gap: 0 !important;
        flex: unset !important;
        justify-content: flex-start !important;
        margin-left: -0.5rem !important;
        position: static !important;
        width: auto !important;
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
      }

      /* Desktop link: editorial underline-only active state, no pill/box */
      .nav-menu > a {
        display: flex !important;
        align-items: center !important;
        height: 100% !important;
        padding: 0 0.75rem !important;
        border-bottom: 2px solid transparent !important;
        border-left: none !important;
        border-radius: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
        width: auto !important;
        font-size: 0.93rem !important;
      }

      .nav-menu > a.su-active {
        border-bottom-color: #2a627a !important;
        border-left-color: transparent !important;
        padding-left: 0.75rem !important;
        background: transparent !important;
      }
    }

    /* Shrink link padding at intermediate widths before hamburger kicks in */
    @media (min-width: 640px) and (max-width: 920px) {
      .nav-menu > a {
        font-size: 0.8rem !important;
        padding: 0 0.5rem !important;
      }
      .nav-menu > a.su-active {
        padding-left: 0.5rem !important;
      }
    }

    /* ── Typography / color: applies at all widths ──────────────── */
    .nav-menu > a {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-weight: 500 !important;
      color: #4D4C4B !important;
      text-decoration: none !important;
      transition: color 0.12s ease, border-color 0.12s ease !important;
      white-space: nowrap;
      letter-spacing: 0.01em;
    }

    .nav-menu > a:hover {
      color: #2a627a !important;
      text-decoration: none !important;
    }

    .nav-menu > a.su-active {
      color: #2a627a !important;
      font-weight: 600 !important;
    }

    .nav-menu > a:focus-visible {
      outline: 2px solid #2a627a !important;
      outline-offset: -2px;
    }

    /* ── Mobile nav: restore dropdown layout ──────────────────────────────
       Desktop overrides (negative margin, height:100%, small padding)
       must not apply inside the mobile dropdown. These rules win because
       they are more specific AND come later in the cascade.
    ──────────────────────────────────────────────────────────────────── */
    @media (max-width: 639px) {
      /* Nav inner: auto height so the hamburger button fits */
      .site-nav .site-nav-inner {
        height: auto !important;
        min-height: 46px !important;
        flex-wrap: wrap !important;
        padding: 0 1.25rem !important;
        justify-content: flex-end !important;
      }

      /* Dropdown panel: white, full-width, elevated */
      .nav-menu {
        background: #FFFFFF !important;
        border-top: 1px solid #DFD4C3 !important;
        border-bottom: 1px solid #DFD4C3 !important;
        box-shadow: 0 4px 16px rgba(0,0,0,0.10) !important;
        margin-left: 0 !important;
        flex-direction: column !important;
        width: 100% !important;
        position: absolute !important;
        top: 100% !important;
        left: 0 !important;
        right: 0 !important;
      }

      /* Mobile link items: block, full-width, readable tap targets */
      .nav-menu > a {
        display: block !important;
        height: auto !important;
        width: 100% !important;
        padding: 0.875rem 1.5rem !important;
        font-size: 0.93rem !important;
        font-weight: 500 !important;
        color: #4D4C4B !important;
        border-bottom: 1px solid #DFD4C3 !important;
        border-left: 3px solid transparent !important;
      }

      .nav-menu > a:last-child {
        border-bottom: none !important;
      }

      /* Active state: left border instead of bottom border */
      .nav-menu > a.su-active {
        color: #2a627a !important;
        font-weight: 600 !important;
        border-left-color: #2a627a !important;
        border-bottom-color: #DFD4C3 !important;
        padding-left: calc(1.5rem - 3px) !important;
      }

      /* Hover */
      .nav-menu > a:hover {
        color: #2a627a !important;
        background: #F8F6F2 !important;
      }
    }


    /* ── FOOTER: warm earth-tone palette ────────────────────────────────── */

    .site-footer {
      background: #DFD4C3 !important;
      padding: 0 !important;
      text-align: left !important;
      border-top: 1px solid #D4CCBF !important;
    }

    #su-footer-grid {
      display: grid;
      grid-template-columns: 1.75fr 1fr 1fr;
      gap: 2.5rem;
      max-width: 1160px;
      margin: 0 auto;
      padding: 2.5rem 2rem 2rem;
    }

    .su-footer-col h4 {
      font-family: 'Public Sans', system-ui, sans-serif;
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #A07D54;
      margin: 0 0 0.875rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid #D4CCBF;
    }

    .su-footer-brand-name {
      font-family: 'Spectral', Georgia, serif;
      font-size: 1rem;
      font-weight: 600;
      color: #5D5646;
      display: block;
      margin-bottom: 0.15rem;
      line-height: 1.2;
    }

    .su-footer-brand-tag {
      font-family: 'Public Sans', system-ui, sans-serif;
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.09em;
      color: #5a9186;
      display: block;
      margin-bottom: 0.875rem;
    }

    .su-footer-brand-desc {
      font-family: 'Public Sans', system-ui, sans-serif;
      font-size: 0.825rem;
      line-height: 1.65;
      color: #7A756D;
      margin: 0 0 0.9rem;
      max-width: 260px;
    }

    .su-footer-col ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .su-footer-col ul li {
      margin-bottom: 0.45rem;
    }

    .su-footer-col ul li a {
      font-family: 'Public Sans', system-ui, sans-serif;
      font-size: 0.825rem;
      color: #4D4C4B;
      text-decoration: none;
      transition: color 0.1s;
    }

    .su-footer-col ul li a:hover {
      color: #2a627a;
    }

    #su-footer-translate {
      border-top: 1px solid #D4CCBF;
      padding: 1rem 2rem;
      max-width: 1160px;
      margin: 0 auto;
    }

    #su-footer-bottom {
      border-top: 1px solid #D4CCBF;
      padding: 0.875rem 2rem;
      max-width: 1160px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    #su-footer-bottom p {
      font-family: 'Public Sans', system-ui, sans-serif;
      font-size: 0.72rem;
      color: #7A756D;
      margin: 0;
    }

    #su-footer-bottom-links {
      display: flex;
      gap: 1.25rem;
      flex-wrap: wrap;
    }

    #su-footer-bottom-links a {
      font-family: 'Public Sans', system-ui, sans-serif;
      font-size: 0.72rem;
      color: #7A756D;
      text-decoration: none;
      transition: color 0.12s;
    }

    #su-footer-bottom-links a:hover {
      color: #4D4C4B;
    }

    #su-footer-disclaimer {
      border-top: 1px solid #D4CCBF;
      padding: 0.85rem 2rem;
      max-width: 1160px;
      margin: 0 auto;
      font-family: 'Public Sans', system-ui, sans-serif;
      font-size: 0.73rem;
      color: #7A756D;
      line-height: 1.55;
    }

    @media (max-width: 700px) {
      #su-footer-grid {
        grid-template-columns: 1fr;
        gap: 1.75rem;
        padding-bottom: 1.75rem;
      }
      #su-footer-bottom {
        flex-direction: column;
        align-items: flex-start;
      }
      #su-footer-bottom-links { gap: 0.85rem; }
    }


    /* ═══════════════════════════════════════════════════════════════
       PAGE BODY OVERRIDES  —  Zone-based visual rhythm
       ═══════════════════════════════════════════════════════════════
       Zone 1: header + nav  →  white  (already handled above)
       Zone 2: .intro-bar    →  tan #DFD4C3  (warm break, distinct)
       Zone 3: main content  →  linen #EEEAE2  (grounded content zone)
       Zone 4: footer        →  tan #DFD4C3  (already handled above)

       White cards sit on linen → natural contrast, no trickery needed.
       The tan zones bookend the linen content, creating real rhythm.
    ═══════════════════════════════════════════════════════════════ */

    /* ── Zone 1: Page ground — linen ── */
    body {
      background: #EEEAE2 !important;
      color: #4D4C4B !important;
    }

    /* ── Zone 2: Intro / hero band — full-width tan ──────────────────
       Uses max() to center content within the 860px column while
       letting the tan background extend edge-to-edge.
       calc(50% - 398px) = half viewport minus (430px - 32px padding)
    ──────────────────────────────────────────────────────────────── */
    .intro-bar {
      background: #DFD4C3 !important;
      text-align: center !important;
      max-width: none !important;
      margin: 0 !important;
      padding-top: 2.5rem !important;
      padding-bottom: 2.25rem !important;
      padding-left: max(2rem, calc(50% - 398px)) !important;
      padding-right: max(2rem, calc(50% - 398px)) !important;
      border-bottom: 1px solid #C8BFB0 !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
    }

    /* Intro text: white card on tan — centered, full column width */
    .intro-body {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 0.925rem !important;
      line-height: 1.75 !important;
      color: #4D4C4B !important;
      text-align: left !important;
      width: 100% !important;
      max-width: 760px !important;
      margin: 0 0 1.75rem !important;
      background: #FFFFFF !important;
      border: 1px solid #D4CCBF !important;
      border-left: 3px solid #2a627a !important;
      border-radius: 0 8px 8px 0 !important;
      padding: 1.25rem 1.625rem !important;
      box-shadow: 0 1px 6px rgba(0,0,0,0.07) !important;
      display: block !important;
    }

    /* Stats bar: white on tan — centered below intro card */
    .stats-bar {
      background: #FFFFFF !important;
      border: 1px solid #D4CCBF !important;
      border-radius: 8px !important;
      max-width: 560px !important;
      width: 100% !important;
      margin: 0 !important;
      padding: 0 !important;
      box-shadow: 0 1px 6px rgba(0,0,0,0.07) !important;
    }

    .stats-bar-item {
      padding: 1.375rem 1.5rem !important;
      border-right: 1px solid #DFD4C3 !important;
    }

    .stats-bar-item:last-child {
      border-right: none !important;
    }

    .stats-bar-num {
      font-family: 'Spectral', Georgia, serif !important;
      font-size: 1.875rem !important;
      font-weight: 700 !important;
      color: #5a9186 !important;
      line-height: 1 !important;
    }

    .stats-bar-label {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 0.72rem !important;
      font-weight: 600 !important;
      letter-spacing: 0.09em !important;
      text-transform: uppercase !important;
      color: #A07D54 !important;
      margin-top: 0.4rem !important;
    }

    /* ── Zone 3: Content zone — linen, white cards float on it ──────── */
    .guides-zone {
      background: #EEEAE2 !important;
    }

    /* Section label / eyebrow: warm accent + rule that extends to right edge */
    .guides-label {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 0.75rem !important;
      font-weight: 700 !important;
      letter-spacing: 0.12em !important;
      text-transform: uppercase !important;
      color: #A07D54 !important;
      margin-bottom: 1.375rem !important;
    }

    /* Cards: white on linen — the contrast is real and intentional.
       Stronger shadow than v8 so cards genuinely float off the surface. */
    .card {
      --card-accent: #2a627a;
      background: #FFFFFF !important;
      border: 1px solid #D4CCBF !important;
      box-shadow: 0 2px 12px rgba(0,0,0,0.08) !important;
      transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease !important;
    }

    .card:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 6px 24px rgba(0,0,0,0.11) !important;
      border-color: #C2B9AC !important;
    }

    /* Card top accent stripe: teal accent */
    .card::before {
      background: #5a9186 !important;
      height: 3px !important;
    }

    /* Card headings: Spectral, deep brown — clear hierarchy */
    .card h2 {
      font-family: 'Spectral', Georgia, serif !important;
      font-size: 1.05rem !important;
      font-weight: 600 !important;
      color: #5D5646 !important;
      line-height: 1.3 !important;
      margin-bottom: 0.5rem !important;
    }

    /* Card body: Public Sans, muted — subordinate to heading */
    .card p {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 0.875rem !important;
      color: #7A756D !important;
      line-height: 1.65 !important;
    }

    /* Card link button: #2a627a blue — the one interaction signal */
    .card-link {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 0.775rem !important;
      font-weight: 600 !important;
      color: #2a627a !important;
      border: 1.5px solid #2a627a !important;
      letter-spacing: 0.01em !important;
    }

    .card:hover .card-link {
      background: #2a627a !important;
      color: #FFFFFF !important;
    }

    .card-link:focus-visible {
      outline: 2px solid #2a627a !important;
      outline-offset: 2px !important;
    }

    /* Featured card: white (overrides inline amber-lt background) */
    .card-featured {
      background: #FFFFFF !important;
    }

    /* Featured badge: teal accent */
    .featured-badge {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      background: #5a9186 !important;
      font-size: 0.58rem !important;
      letter-spacing: 0.1em !important;
    }

    /* Start-here banners: white on linen, blue structural left border */
    .start-here {
      background: #FFFFFF !important;
      border-color: #D4CCBF !important;
      border-left-color: #2a627a !important;
      border-left-width: 3px !important;
      box-shadow: 0 1px 6px rgba(0,0,0,0.06) !important;
    }

    .start-here-text strong {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      color: #5D5646 !important;
    }

    .start-here-text p {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      color: #7A756D !important;
    }

    .start-here-btn {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      background: #2a627a !important;
    }

    .start-here-btn:hover {
      background: #314c64 !important;
    }

    .start-here-btn:focus-visible {
      outline: 2px solid #2a627a !important;
      outline-offset: 2px !important;
    }

    /* ── Main content typography ── */
    main a:not(.card):not(.card-link):not(.start-here-btn) {
      color: #2a627a !important;
    }

    main p,
    main li {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      color: #4D4C4B !important;
    }


    /* ═══════════════════════════════════════════════════════════════
       INTERIOR PAGE OVERRIDES
       Targets <header class="site-header"> + sidebar + content body.
       All interior pages use this header class; homepage does not.
    ═══════════════════════════════════════════════════════════════ */

    /* ── Interior header: same unified treatment as homepage header ──
       Blue top stripe, no bottom seam, no shadow (shadow is on nav).
    ──────────────────────────────────────────────────────────────── */
    header.site-header {
      background: #FFFFFF !important;
      border-top: 3px solid #2a627a !important;  /* matches homepage accent */
      border-bottom: none !important;             /* merges with nav below */
      box-shadow: none !important;                /* shadow lives on nav */
      position: sticky !important;
      top: 0 !important;
      z-index: 920 !important;
      padding: 1.125rem 0 0.875rem !important;    /* slightly tighter */
    }

    header.site-header .header-inner {
      max-width: 1160px !important;
      margin: 0 auto !important;
      padding: 0 2rem !important;
    }

    /* Breadcrumb eyebrow: warm accent */
    .header-eyebrow {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 0.72rem !important;
      font-weight: 500 !important;
      letter-spacing: 0.06em !important;
      text-transform: uppercase !important;
      color: #A07D54 !important;
      margin-bottom: 0.4rem !important;
    }

    .header-eyebrow a {
      color: #A07D54 !important;
      text-decoration: none !important;
    }

    .header-eyebrow a:hover {
      color: #5D5646 !important;
      text-decoration: underline !important;
    }

    /* Page title: Spectral, deep brown; italic em in caramel */
    .header-title {
      font-family: 'Spectral', Georgia, serif !important;
      font-size: 1.65rem !important;
      font-weight: 700 !important;
      color: #5D5646 !important;
      line-height: 1.15 !important;
      letter-spacing: -0.01em !important;
      text-shadow: none !important;
      margin: 0 0 0.35rem !important;
    }

    .header-title em {
      font-style: italic !important;
      color: #A07D54 !important;
    }

    /* Page subtitle: muted, Public Sans */
    .header-subtitle {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 0.875rem !important;
      color: #7A756D !important;
      line-height: 1.5 !important;
      margin: 0 !important;
    }

    /* Meta chips: teal-tinted */
    .meta-chip {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 0.67rem !important;
      font-weight: 600 !important;
      background: #EAF4F2 !important;
      color: #5a9186 !important;
      border: 1px solid #B8D8D4 !important;
      border-radius: 4px !important;
    }

    /* ── Page layout: linen ground ── */
    .page-layout {
      background: #EEEAE2 !important;
    }

    /* ── Sidebar: white card on linen ── */
    .page-sidebar {
      background: #FFFFFF !important;
      border: 1px solid #D4CCBF !important;
      border-radius: 8px !important;
      box-shadow: 0 1px 6px rgba(0,0,0,0.06) !important;
      padding: 1.25rem 0 !important;
      /* Fix sticky positioning: account for sticky header + nav height (~155px)
         so the sidebar doesn't hide behind the header when position:sticky fires. */
      top: 155px !important;
      max-height: calc(100vh - 155px) !important;
      overflow-y: auto !important;
    }

    /* Sidebar heading: warm accent label */
    .sidebar-hd {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 0.72rem !important;
      font-weight: 700 !important;
      letter-spacing: 0.12em !important;
      text-transform: uppercase !important;
      color: #A07D54 !important;
      padding: 0 1.125rem 0.625rem !important;
      border-bottom: 1px solid #DFD4C3 !important;
      margin-bottom: 0.375rem !important;
    }

    /* Sidebar nav buttons */
    .sidebar-link {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 0.825rem !important;
      font-weight: 400 !important;
      color: #4D4C4B !important;
      background: transparent !important;
      border: none !important;
      border-left: 3px solid transparent !important;
      padding: 0.5rem 1.125rem !important;
      text-align: left !important;
      cursor: pointer !important;
      display: block !important;
      width: 100% !important;
      transition: color 0.12s, background 0.12s !important;
    }

    .sidebar-link:hover {
      color: #2a627a !important;
      background: #F4F1EC !important;
    }

    /* Active sidebar link: left border in blue */
    .sidebar-link.active,
    .sidebar-link[aria-current],
    .sidebar-link[aria-selected="true"] {
      color: #2a627a !important;
      font-weight: 600 !important;
      border-left-color: #2a627a !important;
      background: #EBF0F5 !important;
      padding-left: calc(1.125rem - 3px) !important;
    }

    /* ── Interior page content body typography ── */
    .page-body h2,
    .page-main h2 {
      font-family: 'Spectral', Georgia, serif !important;
      font-size: 2rem !important;
      font-weight: 600 !important;
      color: #5D5646 !important;
      line-height: 1.25 !important;
      margin-top: 2rem !important;
      margin-bottom: 0.75rem !important;
      padding-bottom: 0.375rem !important;
      border-bottom: 1px solid #DFD4C3 !important;
    }

    .page-body h3,
    .page-main h3 {
      font-family: 'Spectral', Georgia, serif !important;
      font-size: 1.35rem !important;
      font-weight: 600 !important;
      color: #5D5646 !important;
      line-height: 1.3 !important;
      margin-top: 1.5rem !important;
      margin-bottom: 0.5rem !important;
    }

    .page-body p,
    .page-main p {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 1rem !important;
      line-height: 1.75 !important;
      color: #4D4C4B !important;
    }

    .page-body a,
    .page-main a {
      color: #2a627a !important;
    }

    .page-body ul li,
    .page-body ol li,
    .page-main ul li,
    .page-main ol li {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 1rem !important;
      line-height: 1.7 !important;
      color: #4D4C4B !important;
    }

    /* Callout / note boxes inside content */
    .page-body .note,
    .page-body .callout,
    .page-main .note,
    .page-main .callout {
      background: #FFFFFF !important;
      border: 1px solid #D4CCBF !important;
      border-left: 3px solid #2a627a !important;
      border-radius: 0 8px 8px 0 !important;
      padding: 1rem 1.375rem !important;
      box-shadow: 0 1px 6px rgba(0,0,0,0.05) !important;
    }


    /* ═══════════════════════════════════════════════════════════════
       OLD-PALETTE ELEMENT OVERRIDES
       Interior pages use teal/sage/amber CSS variables from the dark
       theme. These rules remap them to the warm editorial palette.
    ═══════════════════════════════════════════════════════════════ */

    /* Teal callout → white card with blue left border */
    .teal-callout {
      background: #FFFFFF !important;
      border: 1px solid #D4CCBF !important;
      border-left: 3px solid #2a627a !important;
      border-radius: 0 8px 8px 0 !important;
      padding: 1.125rem 1.375rem !important;
      box-shadow: 0 1px 6px rgba(0,0,0,0.05) !important;
    }

    .teal-callout .callout-label {
      color: #2a627a !important;
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 0.67rem !important;
      font-weight: 700 !important;
      letter-spacing: 0.1em !important;
      text-transform: uppercase !important;
    }

    .teal-callout p {
      color: #4D4C4B !important;
      font-family: 'Public Sans', system-ui, sans-serif !important;
    }

    /* Info callout → white card with warm left border */
    .info-callout {
      background: #FFFFFF !important;
      border: 1px solid #D4CCBF !important;
      border-left: 3px solid #A07D54 !important;
      border-radius: 0 8px 8px 0 !important;
      padding: 1.125rem 1.375rem !important;
      box-shadow: 0 1px 6px rgba(0,0,0,0.05) !important;
    }

    .info-callout .callout-label {
      color: #A07D54 !important;
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 0.67rem !important;
      font-weight: 700 !important;
      letter-spacing: 0.1em !important;
      text-transform: uppercase !important;
    }

    .info-callout p {
      color: #4D4C4B !important;
      font-family: 'Public Sans', system-ui, sans-serif !important;
    }

    /* Amber callout → white card with caramel left border */
    .amber-callout {
      background: #FFFFFF !important;
      border: 1px solid #D4CCBF !important;
      border-left: 3px solid #A07D54 !important;
      border-radius: 0 8px 8px 0 !important;
      padding: 1.125rem 1.375rem !important;
      box-shadow: 0 1px 6px rgba(0,0,0,0.05) !important;
    }

    .amber-callout .callout-label {
      color: #A07D54 !important;
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 0.67rem !important;
      font-weight: 700 !important;
      letter-spacing: 0.1em !important;
      text-transform: uppercase !important;
    }

    /* Feature cards (symptom grid) → white on linen, warm top stripe */
    .feature-card {
      background: #FFFFFF !important;
      border: 1px solid #D4CCBF !important;
      border-top: 3px solid #A07D54 !important;
      border-radius: 8px !important;
      box-shadow: 0 1px 8px rgba(0,0,0,0.06) !important;
    }

    .feature-card.amber-top { border-top-color: #A07D54 !important; }
    .feature-card.rose-top  { border-top-color: #A07D54 !important; }
    .feature-card.sage-top  { border-top-color: #5a9186 !important; }
    .feature-card.blue-top  { border-top-color: #2a627a !important; }

    .feature-card h4 {
      font-family: 'Spectral', Georgia, serif !important;
      font-size: 1rem !important;
      font-weight: 600 !important;
      color: #5D5646 !important;
    }

    .feature-card li,
    .feature-card p {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 0.875rem !important;
      color: #4D4C4B !important;
    }

    /* Section labels in page content */
    .section-label {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 0.75rem !important;
      font-weight: 600 !important;
      color: #7A756D !important;
      letter-spacing: 0.12em !important;
      text-transform: uppercase !important;
    }

    .section-label::before {
      background: #A07D54 !important;
    }

    /* Section titles in page content */
    .section-title {
      font-family: 'Spectral', Georgia, serif !important;
      color: #5D5646 !important;
    }

    /* Symptom pills: keep subtle but remap to warm palette */
    .symptom-pill {
      background: #FFFFFF !important;
      border-color: #D4CCBF !important;
      color: #7A756D !important;
      font-family: 'Public Sans', system-ui, sans-serif !important;
    }

    .symptom-pill:hover,
    .symptom-pill.active {
      background: #2a627a !important;
      border-color: #2a627a !important;
      color: #FFFFFF !important;
    }

    /* Symptom search input */
    .symptom-search {
      border-color: #D4CCBF !important;
      font-family: 'Public Sans', system-ui, sans-serif !important;
    }

    .symptom-search:focus {
      border-color: #2a627a !important;
    }

    /* Stat boxes in content area */
    .stat-box {
      background: #FFFFFF !important;
      border: 1px solid #D4CCBF !important;
    }

    /* Tab nav (in-page section tabs) */
    .tab-nav {
      background: #FFFFFF !important;
      border-top: 1px solid #DFD4C3 !important;
      border-bottom: 1px solid #DFD4C3 !important;
    }

    .tab-btn {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 0.825rem !important;
      font-weight: 500 !important;
      color: #7A756D !important;
    }

    .tab-btn.active,
    .tab-btn[aria-selected="true"] {
      color: #2a627a !important;
      font-weight: 600 !important;
      border-bottom-color: #2a627a !important;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.id = 'su-styles';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);


  /* ─── 2. MARK ACTIVE NAV LINK ────────────────────────────────────────── */
  const navInner = document.querySelector('.site-nav-inner');

  if (navInner) {
    const pathname = window.location.pathname.split('/').pop() || 'index.html';
    navInner.querySelectorAll('.nav-menu a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === pathname || (href && pathname.startsWith(href.replace('.html', '')))) {
        a.classList.add('su-active');
      }
    });
  }


  /* ─── 2b. RENAME NAV LABEL: Community & Links → Community ───────────── */
  document.querySelectorAll('.nav-menu a').forEach(a => {
    if (a.textContent.trim() === 'Community & Links') {
      a.textContent = 'Community';
    }
  });


  /* ─── 3. RESTRUCTURE HOME PAGE HEADER ONLY ──────────────────────────── */
  // Interior pages use <header class="site-header"> — we must not touch those.
  // Home page uses a plain <header> with no class and a .header-hero-inner inside.
  const siteHeader = document.querySelector('header:not(.site-header)');

  if (siteHeader) {
    // Remove decorative helix SVG if present
    const helixSvg = siteHeader.querySelector('svg');
    if (helixSvg) helixSvg.remove();

    const heroInner = siteHeader.querySelector('.header-hero-inner');
    if (heroInner) {
      // Wrap existing content in .su-header-text
      const textBlock = document.createElement('div');
      textBlock.className = 'su-header-text';
      while (heroInner.firstChild) {
        textBlock.appendChild(heroInner.firstChild);
      }

      // Insert subtitle span (Public Sans label) after the h1
      const h1 = textBlock.querySelector('h1');
      if (h1) {
        // Update the visible title text to the new site name
        const h1Link = h1.querySelector('a') || h1;
        Array.from(h1Link.childNodes).forEach(node => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            node.textContent = 'The SETD5 Syndrome Companion';
          }
        });
        // Remove the <br> — no longer needed with single-line title
        const br = h1Link.querySelector('br');
        if (br) br.remove();

        // Ensure the em text is correct (CSS hides it but we keep it in DOM)
        const emEl = h1.querySelector('em');
        if (emEl) emEl.textContent = 'A peer resource for families and caregivers';

        // Create the visible subtitle span
        const subtitle = document.createElement('span');
        subtitle.className = 'su-site-subtitle';
        subtitle.textContent = 'A peer resource for families and caregivers';
        h1.insertAdjacentElement('afterend', subtitle);
      }

      // Remove old tagline element
      const headerSub = textBlock.querySelector('.header-sub');
      if (headerSub) headerSub.remove();

      // Build and prepend logo
      const logoImg = document.createElement('img');
      logoImg.src = '/SD5-recolored.png';
      logoImg.alt = 'SETD5 Syndrome site logo';
      logoImg.className = 'su-header-logo';

      heroInner.appendChild(logoImg);
      heroInner.appendChild(textBlock);
    }
  }


  /* ─── 3b. REMOVE HELIX SVG FROM INTERIOR PAGE HEADERS ──────────────── */
  const interiorHeader = document.querySelector('header.site-header');
  if (interiorHeader) {
    const helixSvg = interiorHeader.querySelector('svg');
    if (helixSvg) helixSvg.remove();
  }


  /* ─── 4. RESTYLE INTERNATIONAL NOTE ─────────────────────────────────── */
  // The note has inline styles from the old palette. Selector does not use
  // 'main' prefix because some pages have no <main> element.
  const intlNote = document.querySelector('div[style*="sage-lt"], div[style*="e8f4f2"], div[style*="E4F0EE"], div[style*="eaf5f3"]');
  if (intlNote) {
    Object.assign(intlNote.style, {
      background: '#FFFFFF',
      border: '1px solid #D4CCBF',
      borderLeft: '3px solid #5a9186',
      borderRadius: '8px',
      color: '#4D4C4B',
      fontSize: '1rem',
      lineHeight: '1.7',
      fontFamily: "'Public Sans', system-ui, sans-serif",
      boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
    });
    const strong = intlNote.querySelector('strong');
    if (strong) strong.style.color = '#5D5646';
    // Text already corrected in HTML source — no replacement needed
  }


  /* ─── 5. REPLACE FOOTER ──────────────────────────────────────────────── */
  const existingFooter = document.querySelector('footer.site-footer');

  if (existingFooter) {
    const translateEl = existingFooter.querySelector('#google_translate_element');
    const translateHTML = translateEl ? translateEl.parentElement.outerHTML : '';

    existingFooter.innerHTML = `
      <div id="su-footer-grid">

        <div class="su-footer-col">
          <span class="su-footer-brand-name">The SETD5 Syndrome Companion</span>
          <span class="su-footer-brand-tag">A peer resource for families and caregivers</span>
          <p class="su-footer-brand-desc">Plain-language, evidence-based resources for families and caregivers navigating SETD5 Syndrome. Built by a parent, for families like ours.</p>
        </div>

        <div class="su-footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a href="understanding-setd5-syndrome.html">Understanding SETD5 Syndrome</a></li>
            <li><a href="family-toolkit.html">Family Toolkit</a></li>
            <li><a href="setd5-medical-terms-guide.html">Medical Terms Guide</a></li>
            <li><a href="research.html">Research</a></li>
            <li><a href="helpful-links.html">Community</a></li>
          </ul>
        </div>

        <div class="su-footer-col">
          <h4>About &amp; Support</h4>
          <ul>
            <li><a href="about.html">About This Site</a></li>
            <li><a href="share-your-story.html">Share Your Story</a></li>
            <li><a href="suggest-a-resource.html">Contact / Suggest a Resource</a></li>
            <li><a href="sources-references.html">Sources &amp; References</a></li>
            <li><a href="terms-of-use.html">Terms of Use</a></li>
          </ul>
        </div>

      </div>

      <div id="su-footer-translate">
        ${translateHTML}
      </div>

      <div id="su-footer-bottom">
        <p>&copy; 2026 The SETD5 Syndrome Companion &mdash; Built by a parent, for families</p>
        <div id="su-footer-bottom-links">
          <a href="index.html">Home</a>
          <a href="about.html">About</a>
          <a href="terms-of-use.html">Terms of Use</a>
          <a href="sources-references.html">Sources</a>
          <a href="suggest-a-resource.html">Contact</a>
        </div>
      </div>

      <p id="su-footer-disclaimer">
        Content on this site is for informational purposes only and does not constitute medical, legal, or educational advice.
        Always consult qualified professionals for decisions about your child&rsquo;s care, education, or benefits.
      </p>
    `;
  }

})();
