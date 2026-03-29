/**
 * site-upgrade.js  v14
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
 *   - Accent #3E5974 consistently on all interactive elements
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
     --accent-blue: #3E5974   interaction: links, active states, buttons, focus
     --accent-warm: #A07D54   warm accent: labels, tags, subtitle, section marks
     --border:      #D4CCBF   card and section borders
  ────────────────────────────────────────────────────────────────────────── */


  /* ─── 1. INJECT STYLES ───────────────────────────────────────────────── */
  const css = `

    @import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,400;0,600;0,700;1,400&family=Public+Sans:wght@300;400;500;600;700&display=swap');

    /* ── HOME PAGE HEADER ONLY: white surface, shadow ───────────────────
       Scoped to header:not(.site-header) so interior pages (which use
       <header class="site-header">) are completely untouched.
    ──────────────────────────────────────────────────────────────────── */
    header:not(.site-header) {
      background: #FFFFFF !important;
      color: #5D5646 !important;
      text-align: left !important;
      padding: 1.375rem 0 !important;
      border-bottom: 1px solid #D4CCBF !important;
      box-shadow: 0 1px 8px rgba(0,0,0,0.055) !important;
      position: relative;
      z-index: 10;
    }

    header:not(.site-header) .header-hero-inner {
      max-width: 1160px !important;
      display: flex !important;
      align-items: center !important;
      gap: 1.5rem !important;
      padding: 0 2rem !important;
      margin: 0 auto !important;
    }

    /* Logo */
    .su-header-logo {
      flex-shrink: 0;
      height: 82px;
      width: 82px;
      object-fit: contain;
      margin-top: 2px;
    }

    .su-header-text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 1;
    }

    /* Site title: Spectral, deep brown — home page h1 only */
    header:not(.site-header) h1,
    header:not(.site-header) h1 a {
      font-family: 'Spectral', Georgia, serif !important;
      color: #5D5646 !important;
      font-size: 2rem !important;
      font-weight: 700 !important;
      letter-spacing: -0.015em !important;
      line-height: 1.1 !important;
      text-shadow: none !important;
    }

    /* Hide original em on home page only — subtitle replaced by span */
    header:not(.site-header) h1 em {
      display: none !important;
    }

    /* Subtitle: Public Sans label, warm accent */
    .su-site-subtitle {
      display: block;
      font-family: 'Public Sans', system-ui, sans-serif;
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #A07D54;
      margin-top: 0.5rem;
      line-height: 1;
    }

    /* Home page decorative elements to remove */
    header:not(.site-header) .header-rule { display: none !important; }
    header:not(.site-header) .header-sub  { display: none !important; }

    /* Responsive: mobile header layout */
    @media (max-width: 640px) {
      .su-header-logo { height: 56px; width: 56px; }
      header:not(.site-header) h1 { font-size: 1.4rem !important; }
      header:not(.site-header) .header-hero-inner {
        gap: 1rem !important;
        padding: 0 1.25rem !important;
      }
      .su-site-subtitle { font-size: 0.65rem; }
    }


    /* ── NAV: editorial, restrained, text-only ──────────────────────────── */

    .site-nav {
      background: #FFFFFF !important;
      border-top: 1px solid #DFD4C3 !important;
      border-bottom: 1px solid #DFD4C3 !important;
      /* Intentionally NOT overriding position or z-index:
         original is position:sticky; top:0; z-index:900 — keep that intact */
    }

    /* ── Desktop nav layout: scoped to min-width 769px so we never
       override the mobile menu's display:none or flex-direction.
       ─────────────────────────────────────────────────────────── */
    @media (min-width: 769px) {
      .site-nav .site-nav-inner {
        height: 46px !important;
        min-height: 46px !important;
        max-width: 1160px !important;
        padding: 0 2rem !important;
        justify-content: flex-start !important;
        margin: 0 auto !important;
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

      /* Desktop link: horizontal pill-free tab style */
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
        font-size: 0.78rem !important;
      }

      .nav-menu > a.su-active {
        border-bottom-color: #3E5974 !important;
        border-left-color: transparent !important;
        padding-left: 0.75rem !important;
        background: transparent !important;
      }
    }

    /* Shrink link padding at intermediate widths before hamburger kicks in */
    @media (min-width: 769px) and (max-width: 920px) {
      .nav-menu > a {
        font-size: 0.72rem !important;
        padding: 0 0.45rem !important;
      }
      .nav-menu > a.su-active {
        padding-left: 0.45rem !important;
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
      color: #3E5974 !important;
      text-decoration: none !important;
    }

    .nav-menu > a.su-active {
      color: #3E5974 !important;
      font-weight: 600 !important;
    }

    .nav-menu > a:focus-visible {
      outline: 2px solid #3E5974 !important;
      outline-offset: -2px;
    }

    /* ── Mobile nav: restore dropdown layout ──────────────────────────────
       Desktop overrides (negative margin, height:100%, small padding)
       must not apply inside the mobile dropdown. These rules win because
       they are more specific AND come later in the cascade.
    ──────────────────────────────────────────────────────────────────── */
    @media (max-width: 768px) {
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
        font-size: 0.875rem !important;
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
        color: #3E5974 !important;
        font-weight: 600 !important;
        border-left-color: #3E5974 !important;
        border-bottom-color: #DFD4C3 !important;
        padding-left: calc(1.5rem - 3px) !important;
      }

      /* Hover */
      .nav-menu > a:hover {
        color: #3E5974 !important;
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
      font-size: 0.6rem;
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
      font-size: 0.62rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.09em;
      color: #A07D54;
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
      color: #3E5974;
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
      text-align: left !important;
      max-width: none !important;
      margin: 0 !important;
      padding-top: 2.5rem !important;
      padding-bottom: 2.25rem !important;
      padding-left: max(2rem, calc(50% - 398px)) !important;
      padding-right: max(2rem, calc(50% - 398px)) !important;
      border-bottom: 1px solid #C8BFB0 !important;
    }

    /* Intro text: white card on tan — creates real surface contrast */
    .intro-body {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 0.925rem !important;
      line-height: 1.75 !important;
      color: #4D4C4B !important;
      text-align: left !important;
      max-width: 620px !important;
      margin: 0 0 1.75rem !important;
      background: #FFFFFF !important;
      border: 1px solid #D4CCBF !important;
      border-left: 3px solid #3E5974 !important;
      border-radius: 0 8px 8px 0 !important;
      padding: 1.25rem 1.625rem !important;
      box-shadow: 0 1px 6px rgba(0,0,0,0.07) !important;
      display: block !important;
    }

    /* Stats bar: white on tan — clear separation from hero background */
    .stats-bar {
      background: #FFFFFF !important;
      border: 1px solid #D4CCBF !important;
      border-radius: 8px !important;
      max-width: 520px !important;
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
      color: #3E5974 !important;
      line-height: 1 !important;
    }

    .stats-bar-label {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 0.62rem !important;
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

    /* Section label: warm accent + rule that extends to right edge */
    .guides-label {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 0.62rem !important;
      font-weight: 700 !important;
      letter-spacing: 0.13em !important;
      text-transform: uppercase !important;
      color: #A07D54 !important;
      margin-bottom: 1.375rem !important;
    }

    /* Cards: white on linen — the contrast is real and intentional.
       Stronger shadow than v8 so cards genuinely float off the surface. */
    .card {
      --card-accent: #3E5974;
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

    /* Card top accent stripe: warm accent, consistent across all cards */
    .card::before {
      background: #A07D54 !important;
      height: 3px !important;
    }

    /* Card headings: Spectral, deep brown — clear hierarchy */
    .card h2 {
      font-family: 'Spectral', Georgia, serif !important;
      font-size: 1.1rem !important;
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

    /* Card link button: #3E5974 blue — the one interaction signal */
    .card-link {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 0.775rem !important;
      font-weight: 600 !important;
      color: #3E5974 !important;
      border: 1.5px solid #3E5974 !important;
      letter-spacing: 0.01em !important;
    }

    .card:hover .card-link {
      background: #3E5974 !important;
      color: #FFFFFF !important;
    }

    .card-link:focus-visible {
      outline: 2px solid #3E5974 !important;
      outline-offset: 2px !important;
    }

    /* Featured card: white (overrides inline amber-lt background) */
    .card-featured {
      background: #FFFFFF !important;
    }

    /* Featured badge: warm accent */
    .featured-badge {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      background: #A07D54 !important;
      font-size: 0.58rem !important;
      letter-spacing: 0.1em !important;
    }

    /* Start-here banners: white on linen, blue structural left border */
    .start-here {
      background: #FFFFFF !important;
      border-color: #D4CCBF !important;
      border-left-color: #3E5974 !important;
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
      background: #3E5974 !important;
    }

    .start-here-btn:hover {
      background: #314c64 !important;
    }

    .start-here-btn:focus-visible {
      outline: 2px solid #3E5974 !important;
      outline-offset: 2px !important;
    }

    /* ── Main content typography ── */
    main a:not(.card):not(.card-link):not(.start-here-btn) {
      color: #3E5974 !important;
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

    /* ── Interior header: white surface matching homepage header ── */
    header.site-header {
      background: #FFFFFF !important;
      border-bottom: 1px solid #D4CCBF !important;
      box-shadow: 0 1px 8px rgba(0,0,0,0.055) !important;
      position: sticky !important;
      top: 0 !important;
      z-index: 920 !important;
      padding: 1.375rem 0 !important;
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

    /* Meta chips: blue-tinted */
    .meta-chip {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 0.67rem !important;
      font-weight: 600 !important;
      background: #EBF0F5 !important;
      color: #3E5974 !important;
      border: 1px solid #C5D3DF !important;
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
    }

    /* Sidebar heading: warm accent label */
    .sidebar-hd {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 0.6rem !important;
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
      color: #3E5974 !important;
      background: #F4F1EC !important;
    }

    /* Active sidebar link: left border in blue */
    .sidebar-link.active,
    .sidebar-link[aria-current],
    .sidebar-link[aria-selected="true"] {
      color: #3E5974 !important;
      font-weight: 600 !important;
      border-left-color: #3E5974 !important;
      background: #EBF0F5 !important;
      padding-left: calc(1.125rem - 3px) !important;
    }

    /* ── Interior page content body typography ── */
    .page-body h2,
    .page-main h2 {
      font-family: 'Spectral', Georgia, serif !important;
      font-size: 1.35rem !important;
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
      font-size: 1.1rem !important;
      font-weight: 600 !important;
      color: #5D5646 !important;
      line-height: 1.3 !important;
      margin-top: 1.5rem !important;
      margin-bottom: 0.5rem !important;
    }

    .page-body p,
    .page-main p {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 0.9375rem !important;
      line-height: 1.75 !important;
      color: #4D4C4B !important;
    }

    .page-body a,
    .page-main a {
      color: #3E5974 !important;
    }

    .page-body ul li,
    .page-body ol li,
    .page-main ul li,
    .page-main ol li {
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 0.9375rem !important;
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
      border-left: 3px solid #3E5974 !important;
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
      border-left: 3px solid #3E5974 !important;
      border-radius: 0 8px 8px 0 !important;
      padding: 1.125rem 1.375rem !important;
      box-shadow: 0 1px 6px rgba(0,0,0,0.05) !important;
    }

    .teal-callout .callout-label {
      color: #3E5974 !important;
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
    .feature-card.sage-top  { border-top-color: #3E5974 !important; }
    .feature-card.blue-top  { border-top-color: #3E5974 !important; }

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
      color: #7A756D !important;
      letter-spacing: 0.12em !important;
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
      background: #3E5974 !important;
      border-color: #3E5974 !important;
      color: #FFFFFF !important;
    }

    /* Symptom search input */
    .symptom-search {
      border-color: #D4CCBF !important;
      font-family: 'Public Sans', system-ui, sans-serif !important;
    }

    .symptom-search:focus {
      border-color: #3E5974 !important;
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
      color: #3E5974 !important;
      font-weight: 600 !important;
      border-bottom-color: #3E5974 !important;
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
        // Ensure the em text is correct (CSS hides it but we keep it in DOM)
        const emEl = h1.querySelector('em');
        if (emEl) emEl.textContent = 'A Parent\u2019s Guide';

        // Create the visible subtitle span
        const subtitle = document.createElement('span');
        subtitle.className = 'su-site-subtitle';
        subtitle.textContent = 'A Parent\u2019s Guide';
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
  // The international note has inline styles from the old palette.
  // Target it via JS so we can override inline styles cleanly.
  const intlNote = document.querySelector('main div[style*="sage-lt"], main div[style*="e8f4f2"], main div[style*="E4F0EE"]');
  if (intlNote) {
    Object.assign(intlNote.style, {
      background: '#FFFFFF',
      border: '1px solid #D4CCBF',
      borderLeft: '3px solid #A07D54',
      borderRadius: '8px',
      color: '#4D4C4B',
      fontSize: '0.875rem',
      lineHeight: '1.7',
      fontFamily: "'Public Sans', system-ui, sans-serif",
      boxShadow: '0 1px 6px rgba(0,0,0,0.06)',
    });
    // Restyle the strong tag inside
    const strong = intlNote.querySelector('strong');
    if (strong) strong.style.color = '#5D5646';
  }


  /* ─── 5. REPLACE FOOTER ──────────────────────────────────────────────── */
  const existingFooter = document.querySelector('footer.site-footer');

  if (existingFooter) {
    const translateEl = existingFooter.querySelector('#google_translate_element');
    const translateHTML = translateEl ? translateEl.parentElement.outerHTML : '';

    existingFooter.innerHTML = `
      <div id="su-footer-grid">

        <div class="su-footer-col">
          <span class="su-footer-brand-name">SETD5 Syndrome</span>
          <span class="su-footer-brand-tag">A Parent&rsquo;s Guide</span>
          <p class="su-footer-brand-desc">Plain-language, evidence-based resources for families and caregivers navigating SETD5 Syndrome. Built by a parent, for families like ours.</p>
          <ul>
            <li><a href="mailto:info@setd5syndrome.live">info@setd5syndrome.live</a></li>
          </ul>
        </div>

        <div class="su-footer-col">
          <h4>Resources</h4>
          <ul>
            <li><a href="understanding-setd5-syndrome.html">Understanding SETD5 Syndrome</a></li>
            <li><a href="family-toolkit.html">Family Toolkit</a></li>
            <li><a href="setd5-medical-terms-guide.html">Medical Terms Guide</a></li>
            <li><a href="research.html">Research</a></li>
            <li><a href="helpful-links.html">Community &amp; Links</a></li>
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
        <p>&copy; 2026 SETD5 Syndrome: A Parent&rsquo;s Guide &mdash; Built by a parent, for families</p>
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
