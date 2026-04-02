/**
 * site-upgrade.js  v141
 * SETD5 Syndrome (.com) — Realtime Colors palette
 *
 * v141: Teal / Warm Caramel palette — #2A627A · #62929E · #A07D54
 *
 *   Design tokens (Realtime Colors):
 *   ┌────────────────────────────────────────────────────┐
 *   │ Warm Tan         #2A627A   nav, headings, btns     │
 *   │ Charcoal         #2F2F2B   body text, headings      │
 *   │ Sage             #DDD8D1   secondary accent         │
 *   │ Purple-Grey      #DDD8D1   tertiary accent          │
 *   │ Cream            #F5F4F1   page bg, hero bg          │
 *   │ Warm Light       #F5F4F1   cards / surfaces          │
 *   │ Warm Border      #DDD8D1   borders                   │
 *   │ Charcoal-Muted   #7A756D   secondary / meta text     │
 *   │ Gold             #2A627A   accent highlights         │
 *   └────────────────────────────────────────────────────┘
 *
 *   Fonts:
 *   Display / headings — Libre Baskerville (serif)
 *   Body / UI          — DM Sans (sans-serif)
 *
 *   Zone strategy:
 *   ┌─────────────────────────────┐
 *   │ HERO HEADER  — Cream        │  text logo hero layout
 *   ├─────────────────────────────┤
 *   │ STICKY NAV   — Warm Tan     │  warm bar, white links
 *   ├─────────────────────────────┤
 *   │ CONTENT      — Cream        │  cards float on cream
 *   ├─────────────────────────────┤
 *   │ FOOTER       — Warm Tan     │  warm bookend
 *   └─────────────────────────────┘
 */

(function () {
  'use strict';

  /* ─── 1. INJECT STYLES ───────────────────────────────────────────────── */

  const css = `

    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

    /* ═══════════════════════════════════════════════════════════════
       CSS VARIABLE REMAPPING
       Interior pages define old-palette variables (--navy, --teal,
       --sage-lt, etc.) in their own :root blocks. By re-declaring
       them here — in a stylesheet appended after the page CSS —
       every element using those variables automatically inherits
       the new palette without needing individual element overrides.
    ═══════════════════════════════════════════════════════════════ */
    :root {
      /* v141 — Teal + Warm Caramel palette */
      --primary:   #2A627A;   /* primary teal — nav, footer, buttons, links    */
      --secondary: #62929E;   /* secondary teal accent — stats, featured       */
      --soft:      #81A8B1;   /* soft supporting accent — quiet details        */
      --warm:      #A07D54;   /* warm caramel — labels, tags, eyebrows         */
      --ink:       #2F2F2B;   /* main body text                                */
      --meta:      #7A756D;   /* secondary / metadata text                     */
      --bg:        #F5F4F1;   /* main background                               */
      --surface:   #EFEEEA;   /* alternate section background                  */
      --border:    #DDD8D1;   /* borders, dividers                             */
      /* legacy variable aliases */
      --navy:      #2A627A;
      --charcoal:  #2F2F2B;
      --teal:      #2A627A;
      --teal-lt:   #F5F4F1;
      --sage:      #62929E;
      --sage-lt:   #F5F4F1;
      --sage-mid:  #DDD8D1;
      --amber:     #A07D54;
      --muted:     #7A756D;
      --text:      #2F2F2B;
    }

    /* ═══════════════════════════════════════════════════════════════
       HOMEPAGE HERO HEADER
       Cream background with Counsel hero text layout.
       Tag pill → H1 (Libre Baskerville, gold em) → sub → buttons.
       Gold top stripe as structural entry point.
    ═══════════════════════════════════════════════════════════════ */

    header:not(.site-header) {
      background: #EFEEEA !important;
      color: #2F2F2B !important;
      text-align: left !important;
      padding: 0 !important;
      border-top: none !important;
      border-bottom: none !important;
      /* Soft shadow lifts the hero off the page as its own surface */
      box-shadow: 0 6px 40px rgba(42,98,122,0.10) !important;
      position: relative;
      z-index: 10;
    }

    /* Paper grain texture */
    header:not(.site-header)::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
      background-repeat: repeat;
      pointer-events: none;
      z-index: 0;
    }

    header:not(.site-header) .header-hero-inner {
      max-width: 1160px !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      justify-content: center !important;
      padding: 4rem 2rem 3.5rem !important;
      margin: 0 auto !important;
      position: relative;
      z-index: 1;
    }

    /* Visually-hidden h1 for screen readers when wordmark is active */
    .su-sr-only {
      position: absolute !important;
      width: 1px !important;
      height: 1px !important;
      padding: 0 !important;
      margin: -1px !important;
      overflow: hidden !important;
      clip: rect(0,0,0,0) !important;
      white-space: nowrap !important;
      border: 0 !important;
    }

    /* Home page original elements to suppress */
    header:not(.site-header) .header-rule { display: none !important; }
    header:not(.site-header) .header-sub  { display: none !important; }

    /* ── Hero tag pill ── */
    .su-hero-tag {
      display: inline-block;
      font-family: 'DM Sans', system-ui, sans-serif;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #A07D54;
      background: #EFEEEA;
      border: 1px solid #DDD8D1;
      border-radius: 100px;
      padding: 0.3rem 0.875rem;
      margin-bottom: 1.75rem;   /* more air — sets the pill apart as an entry label */
    }

    /* ── Hero H1 ── */
    .su-hero-h1 {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: clamp(2rem, 4vw, 2.75rem) !important;
      font-weight: 700 !important;
      color: #2F2F2B !important;
      line-height: 1.15 !important;
      letter-spacing: -0.02em !important;
      margin: 0 0 0.4rem !important;  /* tight to subtitle — they form one unit */
      max-width: 700px;
    }

    .su-hero-h1 em {
      font-style: normal !important;
      font-weight: 700 !important;
      color: #A07D54 !important;
    }

    /* ── Hero subheading ── */
    .su-hero-sub {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1rem !important;        /* smaller than H1, clearly secondary */
      font-weight: 400 !important;
      line-height: 1.7 !important;
      letter-spacing: 0.02em !important; /* slightly open — editorial, calm */
      color: #4A4944 !important;
      margin: 0 0 0 !important;          /* hero inner bottom padding handles spacing */
      max-width: 520px;
    }

    /* ── Hero button row ── */
    .su-hero-btns {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      align-items: center;
    }

    .su-btn-primary {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1rem !important;
      font-weight: 600 !important;
      letter-spacing: 0.01em !important;
      display: inline-flex;
      align-items: center;
      padding: 0.6875rem 1.375rem;
      background: #2A627A !important;
      color: #FFFFFF !important;
      border: 2px solid #2A627A !important;
      border-radius: 6px;
      text-decoration: none !important;
      transition: background 0.15s, border-color 0.15s;
    }

    .su-btn-primary:hover {
      background: #2A627A !important;
      border-color: #A07D54 !important;
      color: #FFFFFF !important;
    }

    .su-btn-secondary {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1rem !important;
      font-weight: 600 !important;
      letter-spacing: 0.01em !important;
      display: inline-flex;
      align-items: center;
      padding: 0.6875rem 1.375rem;
      background: transparent !important;
      color: #2A627A !important;
      border: 2px solid #2A627A !important;
      border-radius: 6px;
      text-decoration: none !important;
      transition: background 0.15s;
    }

    .su-btn-secondary:hover {
      background: #2A627A !important;
      color: #F5F4F1 !important;
    }

    /* Responsive hero */
    @media (max-width: 640px) {
      header:not(.site-header) .header-hero-inner {
        padding: 2.5rem 1.25rem 2rem !important;
      }
      .su-hero-h1 {
        font-size: 1.75rem !important;
      }
      .su-hero-btns {
        flex-direction: column;
        align-items: flex-start;
      }
      .su-btn-primary,
      .su-btn-secondary {
        width: 100%;
        justify-content: center;
      }
    }


    /* ═══════════════════════════════════════════════════════════════
       NAV — Sticky warm tan bar, white links, sage secondary accent
    ═══════════════════════════════════════════════════════════════ */

    .site-nav {
      background: #2A627A !important;
      border-top: none !important;
      border-bottom: 1px solid rgba(245,244,241,0.15) !important;
      box-shadow: 0 2px 16px rgba(42,98,122,0.25) !important;
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      width: 100% !important;
      z-index: 900 !important;
      padding-top: 6px !important;
      padding-bottom: 0 !important;
    }

    body {
      padding-top: 56px !important;
    }

    /* ── Text logo ── */
    .su-nav-logo {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1rem !important;
      font-weight: 600 !important;
      color: #F5F4F1 !important;
      text-decoration: none !important;
      white-space: nowrap;
      flex-shrink: 0;
      margin-right: 1.5rem;
      letter-spacing: -0.01em;
    }

    /* "Companion" — full white */
    .su-nav-logo .su-nav-logo-light {
      font-weight: 400;
      color: #F5F4F1;
    }

    /* "SETD5 Syndrome" — light warm caramel on dark teal nav */
    .su-nav-logo .su-nav-logo-setd5 {
      color: #D4AE88;
      font-weight: 600;
    }

    /* Short logo shown on mobile only; long version shown on desktop */
    .su-logo-short { display: none; }

    .su-nav-logo:hover {
      color: #F5F4F1 !important;
      opacity: 0.85;
    }

    /* ── Desktop nav layout ─────────────────────────────────────── */
    @media (min-width: 900px) {
      .nav-toggle { display: none !important; }

      .site-nav .site-nav-inner {
        height: 44px !important;
        min-height: 44px !important;
        max-width: 1160px !important;
        padding: 0 2rem !important;
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        margin: 0 auto !important;
        border-top: none !important;
      }

      .nav-menu {
        display: flex !important;
        flex-direction: row !important;
        align-items: stretch !important;
        height: 100% !important;
        gap: 0 !important;
        flex: 0 0 auto !important;
        justify-content: flex-end !important;
        margin-left: auto !important;
        position: static !important;
        width: auto !important;
        background: transparent !important;
        border: none !important;
        box-shadow: none !important;
      }

      .nav-menu > a {
        display: flex !important;
        align-items: center !important;
        height: 100% !important;
        padding: 0 1rem !important;
        border-bottom: none !important;
        border-left: none !important;
        border-radius: 0 !important;
        background: transparent !important;
        box-shadow: none !important;
        width: auto !important;
        font-size: 15px !important;
        position: relative !important;
      }

      /* Active underline: gold pill */
      .nav-menu > a.su-active::after,
      .nav-menu > a[aria-current="page"]::after {
        content: '' !important;
        position: absolute !important;
        bottom: 6px !important;
        left: 1rem !important;
        right: 1rem !important;
        height: 2px !important;
        background: #A07D54 !important;
        border-radius: 2px !important;
      }
    }

    /* Shrink link padding at wide-but-constrained widths (hamburger already shown below 900px) */
    @media (min-width: 900px) and (max-width: 1100px) {
      .nav-menu > a {
        font-size: 14px !important;
        padding: 0 0.6rem !important;
      }
      .nav-menu > a.su-active::after,
      .nav-menu > a[aria-current="page"]::after {
        left: 0.6rem !important;
        right: 0.6rem !important;
      }
    }

    /* ── Nav link typography: applies at all widths ───────────── */
    .nav-menu > a {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-weight: 400 !important;
      color: rgba(245,244,241,0.85) !important;
      text-decoration: none !important;
      transition: color 0.12s ease !important;
      white-space: nowrap;
      letter-spacing: 0.01em;
    }

    .nav-menu > a:hover {
      color: #FFFFFF !important;
      text-decoration: none !important;
    }

    .nav-menu > a.su-active,
    .nav-menu > a[aria-current="page"] {
      color: #FFFFFF !important;
      font-weight: 500 !important;
    }

    .nav-menu > a:focus-visible {
      outline: 2px solid #2A627A !important;
      outline-offset: -2px;
    }

    /* ── Hamburger nav: all widths below 900px (desktop + mobile) ── */
    @media (max-width: 899px) {
      .site-nav .site-nav-inner {
        height: auto !important;
        min-height: 50px !important;
        flex-wrap: wrap !important;
        padding: 0 1.25rem !important;
        justify-content: space-between !important;
      }

      /* Logo: full title, left of hamburger, slightly smaller so it fits narrow screens */
      .su-nav-logo {
        order: -1 !important;
        flex-shrink: 1 !important;
        font-size: 1.0625rem !important;
        margin-right: 0 !important;
      }

      /* Hamburger button: white on teal */
      .nav-toggle {
        color: #F5F4F1 !important;
        border-color: rgba(245,244,241,0.25) !important;
        min-height: 44px !important;
        min-width: 44px !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
      }

      /* Hamburger bars: white on dark teal nav */
      .nav-toggle span {
        background: #F5F4F1 !important;
      }

      /* Dropdown panel: hidden by default, shown when .open is toggled by hamburger JS */
      .nav-menu {
        display: none !important;
      }

      .nav-menu.open {
        display: flex !important;
        background: #FFFFFF !important;
        border-top: 1px solid #DDD8D1 !important;
        border-bottom: 1px solid #DDD8D1 !important;
        box-shadow: 0 4px 16px rgba(0,0,0,0.12) !important;
        margin-left: 0 !important;
        flex-direction: column !important;
        width: 100% !important;
        position: absolute !important;
        top: 100% !important;
        left: 0 !important;
        right: 0 !important;
      }

      /* Mobile links: dark text on white */
      .nav-menu > a {
        display: block !important;
        height: auto !important;
        width: 100% !important;
        padding: 0.6rem 1.25rem !important;
        font-size: 0.9375rem !important;
        font-weight: 400 !important;
        color: #2F2F2B !important;
        border-bottom: 1px solid #DDD8D1 !important;
        border-left: 3px solid transparent !important;
      }

      .nav-menu > a:last-child {
        border-bottom: none !important;
      }

      .nav-menu > a.su-active,
      .nav-menu > a[aria-current="page"] {
        color: #2A627A !important;
        font-weight: 600 !important;
        border-left-color: #2A627A !important;
        border-bottom-color: #DDD8D1 !important;
        padding-left: calc(1.5rem - 3px) !important;
      }

      .nav-menu > a:hover {
        color: #2A627A !important;
        background: #F5F4F1 !important;
      }
    }


    /* ═══════════════════════════════════════════════════════════════
       FOOTER — Midnight indigo, white text, gold headings
    ═══════════════════════════════════════════════════════════════ */

    .site-footer {
      background: #2A627A !important;
      padding: 0 !important;
      text-align: left !important;
      border-top: none !important;
    }

    #su-footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr;
      gap: 3rem;
      max-width: 1160px;
      margin: 0 auto;
      padding: 2.25rem 2rem 2rem;
    }

    .su-footer-col h4 {
      font-family: 'DM Sans', system-ui, sans-serif;
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #A07D54;
      margin: 0 0 0.875rem;
      padding-bottom: 0.5rem;
      border-bottom: 1px solid rgba(255,255,255,0.12);
    }

    .su-footer-brand-name {
      font-family: 'DM Sans', system-ui, sans-serif;
      font-size: 1rem;
      font-weight: 700;
      color: #FFFFFF;
      display: block;
      margin-bottom: 0.15rem;
      line-height: 1.2;
    }

    .su-footer-brand-tag {
      font-family: 'DM Sans', system-ui, sans-serif;
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.09em;
      color: rgba(255,255,255,0.45);
      display: block;
      margin-bottom: 0.875rem;
    }

    .su-footer-brand-desc {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 0.875rem !important;
      line-height: 1.65 !important;
      color: rgba(255,255,255,0.72) !important;
      margin: 0 0 0.9rem !important;
      max-width: 260px !important;
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
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 0.875rem !important;
      color: rgba(255,255,255,0.82) !important;
      text-decoration: none !important;
      transition: color 0.1s;
    }

    .su-footer-col ul li a:hover {
      color: #A07D54;
    }

    #su-footer-translate {
      border-top: 1px solid rgba(255,255,255,0.1);
      padding: 1rem 2rem;
      max-width: 1160px;
      margin: 0 auto;
    }

    #su-footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.1);
      padding: 0.875rem 2rem;
      max-width: 1160px;
      margin: 0 auto;
    }

    #su-footer-bottom p {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 0.72rem !important;
      color: rgba(255,255,255,0.65) !important;
      margin: 0 !important;
    }

    #su-footer-bottom-links {
      display: flex;
      gap: 1.25rem;
      flex-wrap: wrap;
    }

    #su-footer-bottom-links a {
      font-family: 'DM Sans', system-ui, sans-serif;
      font-size: 0.72rem;
      color: rgba(255,255,255,0.42);
      text-decoration: none;
      transition: color 0.12s;
    }

    #su-footer-bottom-links a:hover {
      color: #A07D54;
    }

    #su-footer-disclaimer {
      border-top: 1px solid rgba(255,255,255,0.1);
      padding: 0.85rem 2rem;
      max-width: 1160px;
      margin: 0 auto;
      font-family: 'DM Sans', system-ui, sans-serif;
      font-size: 0.73rem;
      color: rgba(255,255,255,0.38);
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
       PAGE BODY — Cream ground, white cards
    ═══════════════════════════════════════════════════════════════ */

    html {
      font-size: 16px !important;
    }

    body {
      background: #F5F4F1 !important;
      color: #2F2F2B !important;
      font-size: 16px !important;
    }

    /* Mobile: 15px body, 13px secondary */
    @media (max-width: 768px) {
      html { font-size: 15px !important; }
      body { font-size: 15px !important; }
      .page-body p, .page-main p,
      .prose p, .prose li,
      .content p, .content li,
      .entry-body p, .entry-body li,
      .page-body ul li, .page-body ol li,
      .page-main ul li, .page-main ol li { font-size: 15px !important; }
      .header-subtitle { font-size: 13px !important; }
    }

    .intro-bar {
      background: #F4F3F0 !important;
      text-align: center !important;
      max-width: none !important;
      margin: 0 !important;
      padding-top: 4.5rem !important;
      padding-bottom: 4rem !important;
      padding-left: max(2rem, calc(50% - 580px)) !important;
      padding-right: max(2rem, calc(50% - 580px)) !important;
      border-bottom: 1px solid #DDD8D1 !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
    }

    .intro-body {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1rem !important;
      line-height: 1.75 !important;
      color: #2F2F2B !important;
      text-align: center !important;
      width: 100% !important;
      max-width: 480px !important;
      margin: 0 0 1.5rem !important;
      background: transparent !important;
      border: none !important;
      padding: 0 !important;
      box-shadow: none !important;
      display: block !important;
    }

    /* Intro section: large personal headline above the body copy */
    .su-intro-headline {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1.625rem !important;
      font-weight: 700 !important;
      color: #2F2F2B !important;
      line-height: 1.25 !important;
      letter-spacing: -0.01em !important;
      text-align: center !important;
      max-width: 520px !important;
      margin: 0.5rem 0 0.75rem !important;
    }
    .su-intro-headline::before {
      content: '' !important;
      display: block !important;
      width: 36px !important;
      height: 2px !important;
      background: #2A627A !important;
      margin: 0 auto 0.75rem !important;
      border-radius: 2px !important;
    }
    .su-intro-headline em {
      font-style: normal !important;
      color: #A07D54 !important;
      font-weight: 700 !important;
    }

    /* Three trust-signal badges */
    .su-trust-row {
      display: flex !important;
      flex-wrap: wrap !important;
      justify-content: center !important;
      gap: 0.625rem !important;
      margin: 0 0 2.5rem !important;
    }

    .su-trust-badge {
      display: inline-flex !important;
      align-items: center !important;
      gap: 0.4rem !important;
      background: #FFFFFF !important;
      border: 1px solid #DDD8D1 !important;
      border-radius: 100px !important;
      padding: 0.45rem 1rem !important;
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 0.875rem !important;
      font-weight: 500 !important;
      color: #2A627A !important;
      line-height: 1 !important;
      white-space: nowrap !important;
    }

    .su-trust-badge svg {
      width: 14px !important;
      height: 14px !important;
      stroke: #2A627A !important;
      flex-shrink: 0 !important;
    }

    .su-intro-featured {
      max-width: 800px !important;
      width: 100% !important;
      margin: 0 !important;
      align-items: center !important;      /* stop flex-stretch from spanning badge full-width */
      text-align: center !important;
      background: #F5F4F1 !important;      /* warm cream — not clinical white on parchment */
      padding: 2.25rem 2.5rem 2rem !important;
    }

    /* Badge: small centered pill, not a full-width block */
    .su-intro-featured .featured-badge {
      align-self: center !important;
      display: inline-flex !important;
      align-items: center !important;
      border-radius: 20px !important;
      padding: 4px 14px !important;
      font-size: 0.625rem !important;
      background: #DDD8D1 !important;      /* steel indigo — label register, not heading register */
      color: #FFFFFF !important;
      margin-bottom: 0.875rem !important;
    }

    /* Featured card h2 and p: centered to match badge and CTA */
    .su-intro-featured h2 {
      text-align: center !important;
      margin-bottom: 0.4rem !important;   /* tight — h2 + p form one unit */
    }

    .su-intro-featured p {
      text-align: center !important;
      max-width: 420px !important;
      margin-bottom: 1.375rem !important;
    }

    .guides-zone {
      background: #F5F4F1 !important;
      padding-top: 4rem !important;
      padding-left: max(2rem, calc(50% - 580px)) !important;
      padding-right: max(2rem, calc(50% - 580px)) !important;
    }

    .guides-label {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 0.75rem !important;
      font-weight: 700 !important;
      letter-spacing: 0.12em !important;
      text-transform: uppercase !important;
      color: #A07D54 !important;
      margin-bottom: 1.375rem !important;
    }

    /* Cards: white on cream */
    .card {
      --card-accent: #2A627A;
      background: #FFFFFF !important;
      border: 1px solid #DDD8D1 !important;
      box-shadow: 0 2px 12px rgba(0,0,0,0.07) !important;
      transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease !important;
    }

    .card:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 6px 24px rgba(0,0,0,0.1) !important;
      border-color: #DDD8D1 !important;
    }

    /* Card top accent stripe: gold */
    .card::before {
      background: #2A627A !important;
      height: 3px !important;
    }

    /* Higher specificity (0,2,1) ensures card h2 beats .page-main h2 (0,1,1) */
    .card h2,
    .page-main .card h2,
    .page-body .card h2,
    .page-layout .card h2,
    .page-content .card h2 {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1.125rem !important;
      font-weight: 600 !important;
      color: #2F2F2B !important;
      line-height: 1.3 !important;
      margin-bottom: 1rem !important;
      border-bottom: none !important;
      padding-bottom: 0 !important;
    }

    .card p {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1rem !important;
      color: #4A4944 !important;
      line-height: 1.65 !important;
    }

    .card-link {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1rem !important;
      font-weight: 600 !important;
      color: #2A627A !important;
      border: 1.5px solid #2A627A !important;
      letter-spacing: 0.01em !important;
    }

    .card:hover .card-link {
      background: #2A627A !important;
      color: #FFFFFF !important;
    }

    /* ── BUTTON SYSTEM ─────────────────────────────────────────────────────
       All backgrounds set with !important to override inline style= attrs
       (e.g. style="background:#2A627A" or style="background:var(--teal)")
    ─────────────────────────────────────────────────────────────────────── */

    /* PRIMARY: midnight indigo — utility actions (download, generate, print…) */
    .download-btn, .pdf-btn, .resource-btn, .btn-primary, .btn-teal, .btn-dark,
    .handout-box-btn, .generate-btn, .print-btn, .submit-btn, .state-go-btn {
      background: #2A627A !important;
      color: #FFFFFF !important;
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-weight: 500 !important;
      border: none !important;
      border-radius: 7px !important;
    }
    .download-btn:hover, .pdf-btn:hover, .resource-btn:hover,
    .btn-primary:hover, .btn-teal:hover, .btn-dark:hover,
    .handout-box-btn:hover, .generate-btn:hover, .print-btn:hover,
    .submit-btn:hover, .state-go-btn:hover:not(:disabled) {
      background: #2A627A !important;
      color: #FFFFFF !important;
    }
    .state-go-btn:disabled {
      background: #EFEEEA !important;
      color: #7A756D !important;
      cursor: not-allowed !important;
    }

    /* CTA GOLD: high-emphasis calls to action */
    .cta-btn, .cta-banner-btn {
      background: #2A627A !important;
      color: #FFFFFF !important;
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-weight: 600 !important;
      border: none !important;
      border-radius: 7px !important;
    }
    .cta-btn:hover, .cta-banner-btn:hover {
      background: #2A627A !important;
      color: #FFFFFF !important;
    }

    /* SECONDARY OUTLINE: same weight as primary but ghost treatment */
    .btn-secondary {
      background: transparent !important;
      color: #2A627A !important;
      border: 1.5px solid #2A627A !important;
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-weight: 500 !important;
      border-radius: 7px !important;
    }
    .btn-secondary:hover {
      background: #2A627A !important;
      color: #F5F4F1 !important;
    }

    /* TERTIARY / TEMPLATE CHIPS: low-emphasis selectable options */
    .tpl-btn, .flow-btn {
      background: #F5F4F1 !important;
      color: #2F2F2B !important;
      border: 1px solid #DDD8D1 !important;
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-weight: 400 !important;
      border-radius: 6px !important;
    }
    .tpl-btn:hover, .flow-btn:hover {
      background: #F5F4F1 !important;
      border-color: #DDD8D1 !important;
    }
    .tpl-btn.active, .flow-btn.active {
      background: #2A627A !important;
      color: #FFFFFF !important;
      border-color: #2A627A !important;
    }

    /* GHOST / BACK: navigation-style, no fill */
    .back-btn, .restart-btn {
      background: transparent !important;
      color: #2A627A !important;
      border: 1.5px solid #DDD8D1 !important;
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-weight: 500 !important;
      border-radius: 7px !important;
    }
    .back-btn:hover, .restart-btn:hover {
      border-color: #DDD8D1 !important;
      color: #2A627A !important;
    }

    /* START-HERE CTA: gold, overrides inline style="background:var(--teal)" */
    .start-here-btn {
      background: #2A627A !important;
      color: #FFFFFF !important;
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-weight: 500 !important;
      border-radius: 6px !important;
    }
    .start-here-btn:hover {
      background: #2A627A !important;
      color: #FFFFFF !important;
    }

    /* ABOUT PAGE — contact CTA and closing link buttons */
    .contact-cta {
      background: #2A627A !important;
      color: #FFFFFF !important;
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-weight: 500 !important;
      border-radius: 7px !important;
      text-decoration: none !important;
    }
    .contact-cta:hover {
      background: #2A627A !important;
      color: #FFFFFF !important;
      text-decoration: none !important;
    }
    .cta-link-btn.primary {
      background: #DDD8D1 !important;
      color: #FFFFFF !important;
      border-color: transparent !important;
    }
    .cta-link-btn.primary:hover {
      background: #2A627A !important;
      color: #FFFFFF !important;
    }

    /* ═══════════════════════════════════════════════════════════════
       AT A GLANCE HANDOUT — override hard-coded legacy palette
       Hard-coded #2A627A, #2A627A, #EFEEEA, #2A627A → Counsel
    ═══════════════════════════════════════════════════════════════ */
    .h-header {
      background: #2A627A !important;
      border-top: none !important;
    }
    .h-eyebrow {
      color: #A07D54 !important;
    }
    .h-title em {
      color: #A07D54 !important;
    }
    .h-logo {
      color: rgba(255,255,255,0.45) !important;
    }
    .h-facts-bar {
      background: #F5F4F1 !important;
      border-bottom: 1px solid #DDD8D1 !important;
    }
    .h-fact {
      border-right-color: #DDD8D1 !important;
    }
    .h-fact-label {
      color: #2F2F2B !important;
    }
    .h-fact-value {
      color: #2F2F2B !important;
    }
    .h-what-is-label {
      color: #2A627A !important;
    }
    .h-section-label {
      color: #A07D54 !important;
      border-bottom-color: #DDD8D1 !important;
    }
    .h-feature-list li::before {
      background: #2A627A !important;
    }
    .h-feature-group-title {
      color: #2A627A !important;
    }
    .print-btn:hover {
      background: #2A627A !important;
    }

    /* ═══════════════════════════════════════════════════════════════
       INLINE STYLE OVERRIDES — old-palette hard-coded values
       CSS attribute selectors catch any element whose inline style=
       contains the legacy hex string, regardless of page or class.
    ═══════════════════════════════════════════════════════════════ */

    /* Old-teal link/label color → steel indigo */
    [style*="color:#A07D54"],
    [style*="color: #A07D54"] {
      color: #A07D54 !important;
    }

    /* Exception: teal-colored labels inside dark navy card containers
       become invisible (#DDD8D1 on #2A627A). Override to light accent. */
    [style*="background:#2A627A"] [style*="color:#2A627A"],
    [style*="background:#2A627A"] [style*="color: #2A627A"],
    [style*="background:#2A627A"] [style*="color:#2A627A"],
    [style*="background:#2A627A"] [style*="color: #2A627A"] {
      color: #EFEEEA !important;
    }

    /* Old-navy backgrounds (back-to-top buttons, promo cards, etc.) */
    [style*="background:#2A627A"],
    [style*="background: #2A627A"] {
      background: #2A627A !important;
    }
    /* Variant found on about.html back-to-top */
    [style*="background:#2A627A"],
    [style*="background: #2A627A"] {
      background: #2A627A !important;
    }

    /* Old caramel CTA buttons → antique gold */
    [style*="background:#2A627A"],
    [style*="background: #2A627A"] {
      background: #2A627A !important;
    }

    /* Old pale-teal callout backgrounds → parchment */
    [style*="background:#e8f4f2"],
    [style*="background:#E4F0EE"],
    [style*="background:#eaf5f3"] {
      background: #F5F4F1 !important;
      border-left-color: #DDD8D1 !important;
    }

    /* Old teal-green button (#2A627A) and old muted navy (#2A627A) → midnight indigo */
    [style*="background:#2A627A"],
    [style*="background: #2A627A"],
    [style*="background:#2A627A"],
    [style*="background: #2A627A"] {
      background: #2A627A !important;
      color: #FFFFFF !important;  /* restore white text — .page-body a rule overrides inline color:#fff */
    }

    /* Old-navy text color used in headings → midnight indigo */
    [style*="color:#2A627A"],
    [style*="color: #2A627A"] {
      color: #2A627A !important;
    }

    /* Inline font-family: Inter → Poppins */
    [style*="'Inter'"],
    [style*="\"Inter\""] {
      font-family: 'DM Sans', system-ui, sans-serif !important;
    }

    /* Inline font-family: Lora → DM Sans (promo cards, inline headers) */
    [style*="'Lora'"],
    [style*="\"Lora\""] {
      font-family: 'DM Sans', system-ui, sans-serif !important;
    }

    /* ═══════════════════════════════════════════════════════════════
       SECTION-LABEL + SECTION-TAG — eyebrow label components
       Used on 14+ pages; page CSS sets Inter/muted-grey.
    ═══════════════════════════════════════════════════════════════ */
    .section-label {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      color: #A07D54 !important;
      letter-spacing: 0.12em !important;
    }
    .section-tag {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      color: #2A627A !important;
    }
    .section-tag.on-dark {
      color: rgba(255,255,255,0.65) !important;
    }

    /* ═══════════════════════════════════════════════════════════════
       RESEARCH PAGE — hard-coded #2A627A references in page CSS
       (These are class-level rules so attribute selectors won't work)
    ═══════════════════════════════════════════════════════════════ */
    /* Type badges */
    .card-badge                        { color: #A07D54 !important; }
    .peer-reviewed .card-badge         { background: #F5F4F1 !important; }
    .dissertation .card-badge          { background: #F5F4F1 !important; }

    /* Citation links */
    .card-citation a                   { color: #A07D54 !important; }

    /* Bullet / arrow accent markers */
    .findings-list li::before,
    .treatment-card ul li::before,
    .registry .findings-list li::before { color: #A07D54 !important; }

    /* Callout labels */
    .callout-label,
    .review .family-callout .callout-label { color: #A07D54 !important; }

    /* Heading labels in cards */
    .card-section-label                { color: #2A627A !important; }

    /* Focus ring: old teal → steel indigo */
    .search-input:focus {
      border-color: #DDD8D1 !important;
      box-shadow: 0 0 0 2px rgba(42,98,122,0.18) !important;
    }

    /* Stat numbers: Lora → DM Sans */
    .stat-number,
    .stats-bar-num {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1.15rem !important;
      font-weight: 600 !important;
      color: #62929E !important;
    }

    /* Overview box h4 headers */
    .overview-box h4 {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      color: #62929E !important;
    }
    .overview-box ul li::before        { color: #62929E !important; }

    /* Watch + monitoring callout headings */
    .watch-callout h3,
    .monitoring-box h3 {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      color: #2F2F2B !important;
    }

    /* ═══════════════════════════════════════════════════════════════
       MEDICAL TERMS PAGE — old teal palette → Counsel + sticky offset
    ═══════════════════════════════════════════════════════════════ */
    /* Alphabet bar: old teal #2A627A → steel indigo */
    .alpha-bar {
      background: #DDD8D1 !important;
      border-bottom: 1px solid rgba(255,255,255,0.15) !important;
    }
    /* Search bar: old dark #2A627A → midnight indigo */
    .search-bar {
      background: #2A627A !important;
      border-top: 1px solid rgba(255,255,255,0.1) !important;
    }
    /* Search input on dark background */
    .search-input {
      background: rgba(255,255,255,0.1) !important;
      border-color: rgba(255,255,255,0.2) !important;
      color: #FFFFFF !important;
    }
    /* Sticky nav sits below the fixed main nav bar */
    .sticky-nav {
      top: 56px !important;
    }
    /* Term label: old teal → steel indigo */
    .teal-callout .callout-label,
    .term-setd5 strong {
      color: #A07D54 !important;
    }
    /* Tag badges: old teal bg → parchment */
    .tag-testing {
      background: #F5F4F1 !important;
      color: #A07D54 !important;
    }
    /* Prose body text */
    .prose {
      font-size: 16px !important;
    }
    .prose p, .prose li {
      font-size: 16px !important;
    }

    /* ═══════════════════════════════════════════════════════════════
       UNDERSTANDING SETD5 SYNDROME PAGE — old-palette in page CSS
    ═══════════════════════════════════════════════════════════════ */
    /* Active filter pill: old teal → steel indigo */
    .symptom-pill:hover {
      border-color: #DDD8D1 !important;
      color: #2A627A !important;
    }
    .symptom-pill.active {
      background: #DDD8D1 !important;
      border-color: #DDD8D1 !important;
      color: #FFFFFF !important;
    }

    /* TOC links */
    .page-toc ol li a                  { color: #2A627A !important; }

    /* Feature card bullet dots */
    .feature-card ul li::before,
    .feature-card.sage-top ul li::before { color: #2A627A !important; }

    .card-link:focus-visible {
      outline: 2px solid #2A627A !important;
      outline-offset: 2px !important;
    }

    .card-featured {
      background: #FFFFFF !important;
    }

    .featured-badge {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      background: #DDD8D1 !important;
      font-size: 0.58rem !important;
      letter-spacing: 0.1em !important;
    }

    /* Start-here banners: translucent gold tint */
    .start-here {
      background: rgba(160,125,84,0.06) !important;
      border-color: rgba(160,125,84,0.2) !important;
      border-left-color: #2A627A !important;
      border-left-width: 3px !important;
      box-shadow: none !important;
    }

    .start-here-text strong {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      color: #2A627A !important;
    }

    .start-here-text p {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      color: #2F2F2B !important;
    }

    .start-here-btn {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      background: #A07D54 !important;
      color: #FFFFFF !important;
    }

    .start-here-btn:hover {
      background: #2A627A !important;
      color: #FFFFFF !important;
    }

    .start-here-btn:focus-visible {
      outline: 2px solid #FFFFFF !important;
      outline-offset: 2px !important;
    }

    /* Main content links */
    main a:not(.card):not(.card-link):not(.start-here-btn):not([class*="btn"]):not([download]) {
      color: #2A627A !important;
      text-decoration-color: rgba(160,125,84,0.4) !important;
    }
    main a:not(.card):not(.card-link):not(.start-here-btn):not([class*="btn"]):not([download]):hover {
      color: #2A627A !important;
    }

    .card-link i,
    .card-link svg {
      color: inherit !important;
      stroke: currentColor !important;
    }

    .su-intro-featured .card-link {
      background: #2A627A !important;
      color: #FFFFFF !important;
      align-self: center !important;       /* center the CTA to match the centered layout */
    }

    /* ═══════════════════════════════════════════════════════════════
       INTERIOR PAGE OVERRIDES
       header.site-header + sidebar + content body
    ═══════════════════════════════════════════════════════════════ */

    header.site-header {
      background: rgba(245,244,241,0.94) !important;
      backdrop-filter: blur(4px) !important;
      -webkit-backdrop-filter: blur(4px) !important;
      border-top: none !important;
      border-bottom: 1px solid #DDD8D1 !important;
      box-shadow: 0 4px 16px rgba(0,0,0,0.04) !important;
      position: relative !important;
      z-index: 20 !important;
      padding: 1.125rem 0 0.875rem !important;
      clip-path: none !important;
    }

    /* Neutralise the JS-driven collapse: override every .collapsed rule so the
       header never visually shrinks or hides content on scroll */
    header.site-header.collapsed {
      position: relative !important;
      padding: 1.125rem 0 0.875rem !important;
    }

    header.site-header.collapsed .header-inner {
      padding: 1.125rem 2rem 0.875rem !important;
    }

    header.site-header.collapsed .header-eyebrow {
      opacity: 1 !important;
      max-height: none !important;
      margin-bottom: 0.4rem !important;
      overflow: visible !important;
    }

    header.site-header.collapsed .header-subtitle,
    header.site-header.collapsed .header-meta {
      opacity: 1 !important;
      max-height: none !important;
      margin: revert !important;
      padding: revert !important;
      overflow: visible !important;
    }

    header.site-header.collapsed .header-title {
      font-size: 1.65rem !important;
      margin-bottom: revert !important;
    }

    /* Interior pages: site-nav is fixed at top — same as homepage */
    .su-interior .site-nav {
      position: fixed !important;
      top: 0 !important;
    }

    header.site-header::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E");
      background-repeat: repeat;
      pointer-events: none;
      z-index: 0;
    }

    header.site-header .header-inner {
      max-width: 1160px !important;
      margin: 0 auto !important;
      padding: 0 2rem !important;
      position: relative;
      z-index: 1;
    }

    /* Home breadcrumb not needed — nav bar is always visible */
    .su-interior header.site-header .header-eyebrow,
    header.site-header .header-eyebrow {
      display: none !important;
    }

    /* Breadcrumb eyebrow (kept for any page that uses it for non-Home labels) */
    .header-eyebrow {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 0.72rem !important;
      font-weight: 500 !important;
      letter-spacing: 0.06em !important;
      text-transform: uppercase !important;
      color: #A07D54 !important;
      margin-bottom: 0.4rem !important;
    }

    .header-eyebrow a {
      color: #2A627A !important;
      text-decoration: none !important;
    }

    .header-eyebrow a:hover {
      color: #2A627A !important;
      text-decoration: underline !important;
    }

    /* Page title */
    .header-title {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1.65rem !important;
      font-weight: 700 !important;
      color: #2F2F2B !important;
      line-height: 1.15 !important;
      letter-spacing: -0.01em !important;
      text-shadow: none !important;
      margin: 0 0 0.35rem !important;
    }

    .header-title em {
      font-style: italic !important;
      color: #2A627A !important;
    }

    /* Page subtitle */
    .header-subtitle {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 16px !important;
      color: #2F2F2B !important;
      line-height: 1.5 !important;
      margin: 0 !important;
    }

    /* Meta chips */
    .meta-chip {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 0.67rem !important;
      font-weight: 600 !important;
      background: #F5F4F1 !important;
      color: #A07D54 !important;
      border: 1px solid #DDD8D1 !important;
      border-radius: 4px !important;
    }

    .page-layout {
      background: #F5F4F1 !important;
    }

    /* Sidebar */
    .page-sidebar {
      background: #FFFFFF !important;
      border: 1px solid #DDD8D1 !important;
      border-radius: 8px !important;
      box-shadow: 0 1px 6px rgba(0,0,0,0.05) !important;
      padding: 1.25rem 0 !important;
      top: 60px !important;
      max-height: calc(100vh - 60px) !important;
      overflow-y: auto !important;
    }

    .sidebar-hd {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 0.72rem !important;
      font-weight: 700 !important;
      letter-spacing: 0.12em !important;
      text-transform: uppercase !important;
      color: #2A627A !important;
      padding: 0 1.125rem 0.625rem !important;
      border-bottom: 1px solid #DDD8D1 !important;
      margin-bottom: 0.375rem !important;
    }

    .sidebar-link {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1rem !important;
      font-weight: 400 !important;
      color: #2F2F2B !important;
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
      color: #2A627A !important;
      background: #F5F4F1 !important;
    }

    .sidebar-link.active,
    .sidebar-link[aria-current],
    .sidebar-link[aria-selected="true"] {
      color: #2A627A !important;
      font-weight: 600 !important;
      border-left-color: #2A627A !important;
      background: #F5F4F1 !important;
      padding-left: calc(1.125rem - 3px) !important;
    }

    /* ── MOBILE SIDEBAR OVERRIDE ───────────────────────────────────────
       The sidebar styles above are desktop-only. On mobile (≤768px) the
       page CSS converts the sidebar to a horizontal scrollable tab strip
       but the !important rules above override it. Re-assert the mobile
       tab layout here so the sidebar never appears as a full-height block.
    ────────────────────────────────────────────────────────────────────── */
    @media (max-width: 768px) {
      .page-sidebar {
        height: auto !important;
        max-height: none !important;
        width: 100% !important;
        position: static !important;
        top: auto !important;
        border-radius: 0 !important;
        border: none !important;
        border-bottom: 1px solid #DDD8D1 !important;
        box-shadow: none !important;
        padding: 0 !important;
        display: flex !important;
        flex-direction: row !important;
        overflow-x: auto !important;
        overflow-y: visible !important;
      }
      .sidebar-hd,
      .sidebar-divider { display: none !important; }
      .sidebar-link {
        display: inline-flex !important;
        align-items: center !important;
        width: auto !important;
        flex-shrink: 0 !important;
        padding: 10px 16px !important;
        white-space: nowrap !important;
        border: none !important;
        border-left: none !important;
        border-bottom: 3px solid transparent !important;
        border-radius: 0 !important;
        background: transparent !important;
      }
      .sidebar-link.active,
      .sidebar-link[aria-current],
      .sidebar-link[aria-selected="true"] {
        border-left: none !important;
        border-left-color: transparent !important;
        border-bottom: 3px solid #2A627A !important;
        background: transparent !important;
        padding-left: 16px !important;
      }

      /* Sidebar tab labels: larger, easier to tap */
      .sidebar-link {
        font-size: 0.9375rem !important;
        min-height: 44px !important;
      }

      /* Scroll affordance: right-edge fade shows more tabs exist */
      .page-sidebar {
        position: relative !important;
      }
      .page-sidebar::after {
        content: '' !important;
        position: absolute !important;
        right: 0 !important;
        top: 0 !important;
        bottom: 0 !important;
        width: 28px !important;
        background: linear-gradient(to right, transparent, #F5F4F1) !important;
        pointer-events: none !important;
        z-index: 1 !important;
      }

      /* Interior page body: reduce side padding on mobile */
      .page-body,
      .page-main {
        padding-left: 1.25rem !important;
        padding-right: 1.25rem !important;
      }

      /* Interior page header padding: reduce on mobile (matches printable-handouts pattern) */
      .header-inner {
        padding-left: 1.25rem !important;
        padding-right: 1.25rem !important;
      }

      /* Keep site-nav fixed on mobile interior pages */
      .su-interior .site-nav {
        position: fixed !important;
        top: 0 !important;
        z-index: 900 !important;
      }

      /* Medical terms page search bar: push below sticky site-nav */
      .sticky-nav {
        top: 44px !important;
      }

      /* Section anchor offset: 150px is desktop-sized; 60px fits mobile */
      [id] {
        scroll-margin-top: 60px !important;
      }
    }

    /* Interior page content typography — 20px hard cap on headings */
    .page-body h2,
    .page-main h2 {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1.125rem !important;
      font-weight: 600 !important;
      color: #2A627A !important;
      line-height: 1.25 !important;
      margin-top: 2rem !important;
      margin-bottom: 0.75rem !important;
      padding-bottom: 0.375rem !important;
      border-bottom: 1px solid #DDD8D1 !important;
    }

    .page-body h3,
    .page-main h3 {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1.1rem !important;
      font-weight: 600 !important;
      color: #2A627A !important;
      line-height: 1.3 !important;
      margin-top: 1.5rem !important;
      margin-bottom: 0.5rem !important;
    }

    .page-body p, .page-main p,
    .prose p, .prose li,
    .content p, .content li,
    .entry-body p, .entry-body li,
    main p, main li {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 16px !important;
      line-height: 1.75 !important;
      color: #2F2F2B !important;
    }

    .prose, .content, .entry-body {
      font-size: 16px !important;
    }

    .page-body a:not([class*="btn"]):not([class*="-btn"]):not([class*="button"]):not([download]),
    .page-main a:not([class*="btn"]):not([class*="-btn"]):not([class*="button"]):not([download]) {
      color: #2A627A !important;
      text-decoration-color: rgba(160,125,84,0.4) !important;
    }
    .page-body a:not([class*="btn"]):not([class*="-btn"]):not([class*="button"]):not([download]):hover,
    .page-main a:not([class*="btn"]):not([class*="-btn"]):not([class*="button"]):not([download]):hover {
      color: #2A627A !important;
    }

    /* Enforce white text on all dark-background buttons — even when nested in .page-body/.page-main */
    .page-body .download-btn, .page-main .download-btn,
    .page-body .pdf-btn,      .page-main .pdf-btn,
    .page-body .resource-btn, .page-main .resource-btn,
    .page-body .btn-primary,  .page-main .btn-primary,
    .page-body .btn-teal,     .page-main .btn-teal,
    .page-body .btn-dark,     .page-main .btn-dark,
    .page-body .generate-btn, .page-main .generate-btn,
    .page-body .print-btn,    .page-main .print-btn,
    .page-body .submit-btn,   .page-main .submit-btn,
    .page-body .handout-box-btn, .page-main .handout-box-btn,
    .page-body .cta-btn,      .page-main .cta-btn,
    .page-body .cta-banner-btn, .page-main .cta-banner-btn,
    .page-body .start-here-btn, .page-main .start-here-btn,
    .page-body [style*="background:#2A627A"], .page-main [style*="background:#2A627A"],
    .page-body [style*="background: #2A627A"], .page-main [style*="background: #2A627A"],
    .page-body [style*="background:#2A627A"], .page-main [style*="background:#2A627A"],
    .page-body [style*="background: #2A627A"], .page-main [style*="background: #2A627A"] {
      color: #FFFFFF !important;
    }

    .page-body ul li,
    .page-body ol li,
    .page-main ul li,
    .page-main ol li {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 16px !important;
      line-height: 1.7 !important;
      color: #2F2F2B !important;
    }

    /* Callout / note boxes */
    .page-body .note,
    .page-body .callout,
    .page-main .note,
    .page-main .callout {
      background: #FFFFFF !important;
      border: 1px solid #DDD8D1 !important;
      border-left: 3px solid #2A627A !important;
      border-radius: 0 8px 8px 0 !important;
      padding: 1rem 1.375rem !important;
      box-shadow: 0 1px 6px rgba(0,0,0,0.04) !important;
    }


    /* ═══════════════════════════════════════════════════════════════
       INTRO-BOX — interior pages
    ═══════════════════════════════════════════════════════════════ */
    .intro-box {
      background: #FFFFFF !important;
      border: 1px solid #DDD8D1 !important;
      border-left: 3px solid #2A627A !important;
      border-radius: 0 8px 8px 0 !important;
      padding: 1.25rem 1.625rem !important;
      margin-bottom: 2rem !important;
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1rem !important;
      line-height: 1.7 !important;
      color: #2F2F2B !important;
      box-shadow: 0 1px 6px rgba(0,0,0,0.05) !important;
    }
    .intro-box strong {
      color: #2A627A !important;
      font-family: 'DM Sans', system-ui, sans-serif !important;
    }

    /* ── Broader heading overrides — 20px hard cap ── */
    .page-layout h2,
    .page-content h2,
    .page-body h2,
    .page-main h2 {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1.125rem !important;
      font-weight: 600 !important;
      color: #2A627A !important;
      line-height: 1.25 !important;
      margin-top: 2rem !important;
      margin-bottom: 0.75rem !important;
      padding-bottom: 0.375rem !important;
      border-bottom: 1px solid #DDD8D1 !important;
    }

    .page-layout h3,
    .page-content h3,
    .page-body h3,
    .page-main h3 {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1.1rem !important;
      font-weight: 600 !important;
      color: #2A627A !important;
      line-height: 1.3 !important;
      margin-top: 1.5rem !important;
      margin-bottom: 0.5rem !important;
    }

    .page-layout h4,
    .page-content h4,
    .page-body h4,
    .page-main h4 {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 0.9rem !important;
      font-weight: 600 !important;
      color: #2A627A !important;
      line-height: 1.3 !important;
      margin-top: 1.25rem !important;
      margin-bottom: 0.375rem !important;
    }

    .page-layout p,
    .page-content p {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1rem !important;
      line-height: 1.75 !important;
      color: #2F2F2B !important;
    }

    .page-intro,
    .about-lead p {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1rem !important;
      line-height: 1.8 !important;
      color: #2F2F2B !important;
    }

    /* ── Dark-background sections (about.html bg-story) ── */
    .bg-story {
      background: #2A627A !important;
    }
    .bg-story h2,
    .bg-story .section-tag {
      color: #ffffff !important;
    }
    .bg-story p,
    .bg-story p.on-dark {
      color: rgba(255,255,255,0.85) !important;
    }
    .bg-story .section-divider::before {
      background: rgba(255,255,255,0.3) !important;
    }
    .bg-story .kate-quote {
      color: rgba(255,255,255,0.78) !important;
      border-left-color: rgba(255,255,255,0.25) !important;
    }
    .bg-story .closing-note {
      color: rgba(255,255,255,0.65) !important;
    }


    /* ═══════════════════════════════════════════════════════════════
       OLD-PALETTE ELEMENT OVERRIDES
    ═══════════════════════════════════════════════════════════════ */

    .teal-callout {
      background: #FFFFFF !important;
      border: 1px solid #DDD8D1 !important;
      border-left: 3px solid #2A627A !important;
      border-radius: 0 8px 8px 0 !important;
      padding: 1.125rem 1.375rem !important;
      box-shadow: 0 1px 6px rgba(0,0,0,0.04) !important;
    }

    .teal-callout .callout-label {
      color: #A07D54 !important;
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 0.67rem !important;
      font-weight: 700 !important;
      letter-spacing: 0.1em !important;
      text-transform: uppercase !important;
    }

    .teal-callout p {
      color: #2F2F2B !important;
      font-family: 'DM Sans', system-ui, sans-serif !important;
    }

    .info-callout {
      background: #FFFFFF !important;
      border: 1px solid #DDD8D1 !important;
      border-left: 3px solid #2A627A !important;
      border-radius: 0 8px 8px 0 !important;
      padding: 1.125rem 1.375rem !important;
      box-shadow: 0 1px 6px rgba(0,0,0,0.04) !important;
    }

    .info-callout .callout-label {
      color: #A07D54 !important;
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 0.67rem !important;
      font-weight: 700 !important;
      letter-spacing: 0.1em !important;
      text-transform: uppercase !important;
    }

    .info-callout p {
      color: #2F2F2B !important;
      font-family: 'DM Sans', system-ui, sans-serif !important;
    }

    .amber-callout {
      background: #FFFFFF !important;
      border: 1px solid #DDD8D1 !important;
      border-left: 3px solid #2A627A !important;
      border-radius: 0 8px 8px 0 !important;
      padding: 1.125rem 1.375rem !important;
      box-shadow: 0 1px 6px rgba(0,0,0,0.04) !important;
    }

    .amber-callout .callout-label {
      color: #A07D54 !important;
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 0.67rem !important;
      font-weight: 700 !important;
      letter-spacing: 0.1em !important;
      text-transform: uppercase !important;
    }

    .feature-card {
      background: #FFFFFF !important;
      border: 1px solid #DDD8D1 !important;
      border-top: 3px solid #2A627A !important;
      border-radius: 8px !important;
      box-shadow: 0 1px 8px rgba(0,0,0,0.05) !important;
    }

    .feature-card.amber-top { border-top-color: #2A627A !important; }
    .feature-card.rose-top  { border-top-color: #2A627A !important; }
    .feature-card.sage-top  { border-top-color: #2A627A !important; }
    .feature-card.blue-top  { border-top-color: #2A627A !important; }

    .feature-card h4 {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1rem !important;
      font-weight: 700 !important;
      color: #62929E !important;
    }

    .feature-card li,
    .feature-card p {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1rem !important;
      color: #2F2F2B !important;
    }

    .section-label {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 0.75rem !important;
      font-weight: 600 !important;
      color: #A07D54 !important;
      letter-spacing: 0.12em !important;
      text-transform: uppercase !important;
    }

    .section-label::before {
      background: #2A627A !important;
    }

    .section-title {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      color: #2F2F2B !important;
    }

    .symptom-pill {
      background: #EFEEEA !important;
      border-color: #DDD8D1 !important;
      color: #2F2F2B !important;
      font-family: 'DM Sans', system-ui, sans-serif !important;
    }

    .symptom-pill:hover,
    .symptom-pill.active {
      background: #2A627A !important;
      border-color: #2A627A !important;
      color: #FFFFFF !important;
    }

    .symptom-search {
      border-color: #DDD8D1 !important;
      font-family: 'DM Sans', system-ui, sans-serif !important;
    }

    .symptom-search:focus {
      border-color: #2A627A !important;
    }

    .stat-box {
      background: #FFFFFF !important;
      border: 1px solid #DDD8D1 !important;
    }

    .tab-nav {
      background: #FFFFFF !important;
      border-top: 1px solid #DDD8D1 !important;
      border-bottom: 1px solid #DDD8D1 !important;
    }

    .tab-btn {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1rem !important;
      font-weight: 500 !important;
      color: #2F2F2B !important;
    }

    .tab-btn.active,
    .tab-btn[aria-selected="true"] {
      color: #2A627A !important;
      font-weight: 600 !important;
      border-bottom-color: #2A627A !important;
    }

    /* ── Shared section sidebar (injected into pages without their own) ── */
    .su-page-layout {
      display: flex !important;
      align-items: flex-start !important;
    }
    .su-page-sidebar {
      width: 200px !important;
      flex-shrink: 0 !important;
      position: sticky !important;
      top: 56px !important;
      height: calc(100vh - 56px) !important;
      overflow-y: auto !important;
      background: #fff !important;
      border-right: 1px solid #DDD8D1 !important;
      padding: 24px 0 !important;
      -ms-overflow-style: none !important;
      scrollbar-width: none !important;
    }
    .su-page-sidebar::-webkit-scrollbar { display: none; }
    .su-page-sidebar .sidebar-hd {
      font-size: 10px !important;
      font-weight: 700 !important;
      letter-spacing: 0.09em !important;
      text-transform: uppercase !important;
      color: #2F2F2B !important;
      padding: 0 20px !important;
      margin: 10px 0 6px !important;
    }
    .su-page-sidebar .sidebar-hd:first-child { margin-top: 0 !important; }
    .su-page-sidebar .sidebar-link {
      display: block !important;
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 13.5px !important;
      font-weight: 400 !important;
      color: #2F2F2B !important;
      text-decoration: none !important;
      padding: 7px 20px !important;
      border-left: 3px solid transparent !important;
      line-height: 1.35 !important;
      transition: background 0.12s, color 0.12s !important;
    }
    .su-page-sidebar .sidebar-link:hover {
      background: #F5F4F1 !important;
      color: #2A627A !important;
    }
    .su-page-sidebar .sidebar-link.active {
      color: #2A627A !important;
      font-weight: 600 !important;
      border-left-color: #2A627A !important;
      background: #F5F4F1 !important;
    }
    .su-page-sidebar .sidebar-divider {
      border: none !important;
      border-top: 1px solid #DDD8D1 !important;
      margin: 10px 0 !important;
    }
    .su-page-main {
      flex: 1 !important;
      min-width: 0 !important;
    }
    @media (max-width: 768px) {
      .su-page-layout { flex-direction: column !important; }
      .su-page-sidebar {
        width: 100% !important;
        height: auto !important;
        position: static !important;
        top: auto !important;
        border-right: none !important;
        border-bottom: 1px solid #DDD8D1 !important;
        padding: 0 !important;
        display: flex !important;
        flex-direction: row !important;
        overflow-x: auto !important;
        overflow-y: hidden !important;
      }
      .su-page-sidebar .sidebar-hd { display: none !important; }
      .su-page-sidebar .sidebar-divider { display: none !important; }
      .su-page-sidebar .sidebar-link {
        padding: 10px 16px !important;
        white-space: nowrap !important;
        border-left: none !important;
        border-bottom: 3px solid transparent !important;
        flex-shrink: 0 !important;
      }
      .su-page-sidebar .sidebar-link.active {
        border-bottom-color: #A07D54 !important;
        border-left: none !important;
        background: none !important;
      }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.id = 'su-styles';
  styleEl.textContent = css;
  // Inject CSS immediately — works even when script is in <head> before body exists.
  // This eliminates FOUC: styles are live before the browser paints any content.
  (document.head || document.documentElement).appendChild(styleEl);


  /* ─── 2–5. DOM WORK ─────────────────────────────────────────────────────
     Wrapped in DOMContentLoaded so this script can safely live in <head>.
     CSS above already applied; DOM changes run as soon as the HTML is parsed.
  ─────────────────────────────────────────────────────────────────────────── */
  function suInitDOM() {

  /* ─── 2. NAV: MOVE TO TOP + MARK ACTIVE LINK + INJECT TEXT LOGO ──────── */

  // On the homepage the hero header renders before the nav in the DOM.
  // Move .site-nav before header:not(.site-header) so the nav is always
  // the topmost element on the page.
  const homeNav = document.querySelector('.site-nav');
  const homeHero = document.querySelector('header:not(.site-header)');
  if (homeNav && homeHero && homeHero.parentNode) {
    homeHero.parentNode.insertBefore(homeNav, homeHero);
  }

  const navInner = document.querySelector('.site-nav-inner');

  if (navInner) {
    // Mark active nav link — direct match OR section membership
    const pathname = window.location.pathname.split('/').pop() || 'index.html';

    // Pages that belong to each top-nav section but don't match its href directly
    const sectionMap = {
      'family-toolkit.html': [
        'setd5-at-a-glance.html','understanding-genetic-report.html',
        'school-iep-guide.html','qualifying-for-services.html',
        'disability-discounts-guide.html','transition-to-adulthood.html',
        'medical-emergency-summary.html','printable-handouts.html',
        'iep-handout-builder.html','medical-handout-builder.html',
        'family-stories.html','share-your-story.html',
        'setd5-global-families-map.html','research-registries.html'
      ],
      'understanding-setd5-syndrome.html': [
        'setd5-symptom-prevalence-chart.html','setd5-acronym-glossary.html'
      ],
      'research.html': [],
      'helpful-links.html': ['suggest-a-resource.html'],
      'about.html': ['sources-references.html','terms-of-use.html','how-i-built-this.html']
    };

    navInner.querySelectorAll('.nav-menu a').forEach(a => {
      const href = a.getAttribute('href');
      if (!href) return;
      const isDirectMatch = (href === pathname);
      const isSectionMember = sectionMap[href] && sectionMap[href].includes(pathname);
      if (isDirectMatch || isSectionMember) {
        a.classList.add('su-active');
        a.setAttribute('aria-current', isDirectMatch ? 'page' : 'true');
      }
    });

    // Inject text logo before the nav-menu
    const navMenu = navInner.querySelector('.nav-menu');
    if (navMenu && !navInner.querySelector('.su-nav-logo')) {
      const logo = document.createElement('a');
      logo.href = '/index.html';
      logo.className = 'su-nav-logo';
      logo.innerHTML = '<span class="su-logo-long">The <span class="su-nav-logo-setd5">SETD5 Syndrome</span> <span class="su-nav-logo-light">Companion</span></span><span class="su-logo-short">SETD5 Syndrome</span>';
      navInner.insertBefore(logo, navMenu);
    }
  }


  /* ─── 2c. RENAME NAV LABEL ───────────────────────────────────────────── */
  document.querySelectorAll('.nav-menu a').forEach(a => {
    if (a.textContent.trim() === 'Community & Links') {
      a.textContent = 'Community';
    }
  });


  /* ─── 3. RESTRUCTURE HOME PAGE HERO ─────────────────────────────────── */
  // Interior pages use <header class="site-header"> — do not touch those.
  // Home page uses a plain <header> with .header-hero-inner inside.
  const siteHeader = document.querySelector('header:not(.site-header)');

  if (siteHeader) {
    // Recolor helix SVG from original teal → steel indigo (#A07D54 = rgb 69,106,124)
    // so it reads as a soft blue accent on the cream hero background
    const helixSvg = siteHeader.querySelector('svg');
    if (helixSvg) {
      helixSvg.innerHTML = helixSvg.innerHTML
        .replace(/rgba\(194,222,216,/g, 'rgba(69,106,124,')
        .replace(/#EFEEEA/gi, '#DDD8D1');
      // Scale up and nudge left; transform-origin anchors from the right
      // so it grows inward (leftward) without clipping the right edge
      helixSvg.style.transformOrigin = 'right center';
      helixSvg.style.transform = 'translateX(-80px) scale(1.3)';
      // Wrap in a clipping container so the scaled SVG doesn't bleed into
      // the section below. The wrapper sits at z-index 0 (behind hero text).
      const helixWrap = document.createElement('div');
      helixWrap.style.cssText = 'position:absolute;inset:0;overflow:hidden;pointer-events:none;z-index:0;';
      helixSvg.parentNode.insertBefore(helixWrap, helixSvg);
      helixWrap.appendChild(helixSvg);
      // Lower SVG z-index — wrapper stacking context handles placement
      helixSvg.style.zIndex = '0';
    }

    const heroInner = siteHeader.querySelector('.header-hero-inner');
    if (heroInner) {
      // Replace all existing content with Counsel hero layout
      heroInner.innerHTML = '';

      // Tag pill
      const tag = document.createElement('span');
      tag.className = 'su-hero-tag';
      tag.textContent = 'Rare Genetic Condition \u00B7 Family Resource';
      heroInner.appendChild(tag);

      // H1 with gold italic em
      const h1 = document.createElement('h1');
      h1.className = 'su-hero-h1';
      h1.innerHTML = 'The <em>SETD5 Syndrome</em> Companion';
      heroInner.appendChild(h1);

      // Subheading
      const sub = document.createElement('p');
      sub.className = 'su-hero-sub';
      sub.textContent = 'Plain-language resources for families navigating SETD5 Syndrome \u2014 wherever you are in the journey.';
      heroInner.appendChild(sub);

    }
  }


  /* ─── 3b. INTERIOR PAGE SETUP ───────────────────────────────────────── */
  const interiorHeader = document.querySelector('header.site-header');
  if (interiorHeader) {
    // Mark <html> so CSS can scope interior-only overrides (e.g. static nav)
    document.documentElement.classList.add('su-interior');

    // Remove decorative helix SVG
    const helixSvg = interiorHeader.querySelector('svg');
    if (helixSvg) helixSvg.remove();
  }


  /* ─── 3c. INTRO BAR: HEADLINE + TRUST BADGES ────────────────────────── */
  const introBar  = document.querySelector('.intro-bar');
  const introBody = introBar ? introBar.querySelector('.intro-body') : null;
  if (introBar && introBody) {
    // 1. Trim the body copy to a tighter supporting line
    introBody.textContent = 'A helpful companion for families navigating a SETD5 Syndrome diagnosis.';

    // 3. Three trust-signal badges injected after the body copy
    const trustRow = document.createElement('div');
    trustRow.className = 'su-trust-row';
    trustRow.innerHTML = `
      <span class="su-trust-badge">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        Always free
      </span>
      <span class="su-trust-badge">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
        Research-sourced
      </span>
      <span class="su-trust-badge">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
        Updated regularly
      </span>`;
    introBody.insertAdjacentElement('afterend', trustRow);
  }


  /* ─── 4. RESTYLE INTERNATIONAL NOTE ─────────────────────────────────── */
  const intlNote = document.querySelector('div[style*="sage-lt"], div[style*="e8f4f2"], div[style*="E4F0EE"], div[style*="eaf5f3"]');
  if (intlNote) {
    Object.assign(intlNote.style, {
      background: '#F5F4F1',
      border: '1px solid #DDD8D1',
      borderLeft: '3px solid #DDD8D1',
      borderRadius: '8px',
      color: '#2A627A',
      fontSize: '1rem',
      lineHeight: '1.7',
      fontFamily: "'DM Sans', system-ui, sans-serif",
      boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
    });
    const strong = intlNote.querySelector('strong');
    if (strong) strong.style.color = '#2A627A';
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
          <p class="su-footer-brand-desc">Content is for informational purposes only and does not constitute medical, legal, or educational advice.</p>
        </div>

        <div class="su-footer-col">
          <h4>Explore</h4>
          <ul>
            <li><a href="setd5-syndrome-overview.html">SETD5 Syndrome</a></li>
            <li><a href="family-toolkit.html">Family Toolkit</a></li>
            <li><a href="setd5-medical-terms-guide.html">Medical Terms</a></li>
            <li><a href="research.html">Research</a></li>
            <li><a href="helpful-links.html">Community</a></li>
          </ul>
        </div>

        <div class="su-footer-col">
          <h4>About &amp; Support</h4>
          <ul>
            <li><a href="about.html">About This Site</a></li>
            <li><a href="share-your-story.html">Share Your Story</a></li>
            <li><a href="suggest-a-resource.html">Contact</a></li>
            <li><a href="sources-references.html">Sources &amp; References</a></li>
            <li><a href="terms-of-use.html">Terms of Use</a></li>
          </ul>
        </div>

      </div>

      <div id="su-footer-translate">
        ${translateHTML}
      </div>

      <div id="su-footer-bottom">
        <p>&copy; 2026 The SETD5 Syndrome Companion</p>
      </div>
    `;
  } // end if (existingFooter)

  } // end suInitDOM

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', suInitDOM);
  } else {
    // DOM already parsed (e.g. script deferred or placed after body)
    suInitDOM();
  }

})();
