/**
 * site-upgrade.js  v106
 * SETD5 Syndrome (.com) — The Counsel design system
 *
 * v92: Full Counsel palette + typography applied site-wide
 *
 *   Design tokens (The Counsel):
 *   ┌────────────────────────────────────────────────────┐
 *   │ Midnight Indigo  #1E3A4F   nav, headings, btns     │
 *   │ Steel Indigo     #456A7C   labels, links, chips     │
 *   │ Antique Gold     #9E7E42   accent, active, CTA      │
 *   │ Gold Dark        #7A6535   hover dark accent         │
 *   │ Cream            #F5F4F1   page bg, hero bg          │
 *   │ Parchment        #E8E6DF   cards / surfaces          │
 *   │ Parchment-D      #D0CCC2   borders                   │
 *   │ Ink              #1C1B18   body text                 │
 *   │ Ink-Muted        #5A5850   secondary / meta text     │
 *   └────────────────────────────────────────────────────┘
 *
 *   Fonts:
 *   Display / headings — Libre Baskerville (serif)
 *   Body / UI          — Poppins (sans-serif)
 *
 *   Zone strategy:
 *   ┌─────────────────────────────┐
 *   │ HERO HEADER  — Cream        │  text logo hero layout
 *   ├─────────────────────────────┤
 *   │ STICKY NAV   — Indigo       │  dark bar, white links
 *   ├─────────────────────────────┤
 *   │ CONTENT      — Cream        │  cards float on cream
 *   ├─────────────────────────────┤
 *   │ FOOTER       — Indigo       │  dark bookend
 *   └─────────────────────────────┘
 */

(function () {
  'use strict';

  /* ─── 1. INJECT STYLES ───────────────────────────────────────────────── */

  const css = `

    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

    /* ═══════════════════════════════════════════════════════════════
       CSS VARIABLE REMAPPING
       Interior pages define old-palette variables (--navy, --teal,
       --sage-lt, etc.) in their own :root blocks. By re-declaring
       them here — in a stylesheet appended after the page CSS —
       every element using those variables automatically inherits
       the new palette without needing individual element overrides.
    ═══════════════════════════════════════════════════════════════ */
    :root {
      --navy:      #1E3A4F;   /* was #162544 dark navy  → midnight indigo  */
      --charcoal:  #1E3A4F;   /* alias used on some pages                  */
      --teal:      #456A7C;   /* was #C2DED8 pale teal  → steel indigo     */
      --teal-lt:   #C5CDD6;   /* light teal bg          → steel tint       */
      --sage:      #456A7C;   /* sage accent            → steel indigo     */
      --sage-lt:   #C5CDD6;   /* sage light bg          → steel tint       */
      --sage-mid:  #456A7C;   /* sage mid border        → steel indigo     */
      --amber:     #9E7E42;   /* warm amber             → antique gold     */
    }

    /* ═══════════════════════════════════════════════════════════════
       HOMEPAGE HERO HEADER
       Cream background with Counsel hero text layout.
       Tag pill → H1 (Libre Baskerville, gold em) → sub → buttons.
       Gold top stripe as structural entry point.
    ═══════════════════════════════════════════════════════════════ */

    header:not(.site-header) {
      background: #F5F4F1 !important;
      color: #1C1B18 !important;
      text-align: left !important;
      padding: 0 !important;
      border-top: 3px solid #9E7E42 !important;
      border-bottom: none !important;
      /* Soft shadow lifts the hero off the page as its own surface */
      box-shadow: 0 6px 40px rgba(30,58,79,0.14) !important;
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
      font-family: 'Poppins', system-ui, sans-serif;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #456A7C;
      background: #E8E6DF;
      border: 1px solid #D0CCC2;
      border-radius: 100px;
      padding: 0.3rem 0.875rem;
      margin-bottom: 1.75rem;   /* more air — sets the pill apart as an entry label */
    }

    /* ── Hero H1 ── */
    .su-hero-h1 {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: clamp(2rem, 4vw, 2.75rem) !important;
      font-weight: 700 !important;
      color: #1E3A4F !important;
      line-height: 1.15 !important;
      letter-spacing: -0.02em !important;
      margin: 0 0 0.4rem !important;  /* tight to subtitle — they form one unit */
      max-width: 700px;
    }

    .su-hero-h1 em {
      font-style: italic !important;
      color: #9E7E42 !important;
    }

    /* ── Hero subheading ── */
    .su-hero-sub {
      font-family: 'Poppins', system-ui, sans-serif !important;
      font-size: 1rem !important;        /* smaller than H1, clearly secondary */
      font-weight: 300 !important;
      line-height: 1.7 !important;
      letter-spacing: 0.02em !important; /* slightly open — editorial, calm */
      color: #5A5850 !important;
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
      font-family: 'Poppins', system-ui, sans-serif !important;
      font-size: 1rem !important;
      font-weight: 600 !important;
      letter-spacing: 0.01em !important;
      display: inline-flex;
      align-items: center;
      padding: 0.6875rem 1.375rem;
      background: #1E3A4F !important;
      color: #FFFFFF !important;
      border: 2px solid #1E3A4F !important;
      border-radius: 6px;
      text-decoration: none !important;
      transition: background 0.15s, border-color 0.15s;
    }

    .su-btn-primary:hover {
      background: #163043 !important;
      border-color: #163043 !important;
      color: #FFFFFF !important;
    }

    .su-btn-secondary {
      font-family: 'Poppins', system-ui, sans-serif !important;
      font-size: 1rem !important;
      font-weight: 600 !important;
      letter-spacing: 0.01em !important;
      display: inline-flex;
      align-items: center;
      padding: 0.6875rem 1.375rem;
      background: transparent !important;
      color: #9E7E42 !important;
      border: 2px solid #9E7E42 !important;
      border-radius: 6px;
      text-decoration: none !important;
      transition: background 0.15s;
    }

    .su-btn-secondary:hover {
      background: rgba(158,126,66,0.08) !important;
      color: #9E7E42 !important;
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
       NAV — Sticky midnight indigo bar, white links, gold CTA
    ═══════════════════════════════════════════════════════════════ */

    .site-nav {
      background: #1E3A4F !important;
      border-top: none !important;
      border-bottom: 1px solid rgba(255,255,255,0.08) !important;
      box-shadow: 0 2px 12px rgba(0,0,0,0.2) !important;
      position: sticky !important;
      top: 0 !important;
      z-index: 900 !important;
    }

    /* ── Text logo ── */
    .su-nav-logo {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1rem !important;
      font-weight: 700 !important;
      color: #FFFFFF !important;
      text-decoration: none !important;
      white-space: nowrap;
      flex-shrink: 0;
      margin-right: 1.5rem;
      letter-spacing: -0.01em;
    }

    .su-nav-logo .su-nav-logo-light {
      font-weight: 400;
      color: rgba(255,255,255,0.65);
    }

    .su-nav-logo:hover {
      color: #FFFFFF !important;
      opacity: 0.85;
    }

    /* ── Desktop nav layout ─────────────────────────────────────── */
    @media (min-width: 640px) {
      .nav-toggle { display: none !important; }

      .site-nav .site-nav-inner {
        height: 44px !important;
        min-height: 44px !important;
        max-width: 1160px !important;
        padding: 0 2rem !important;
        display: flex !important;
        align-items: center !important;
        justify-content: flex-start !important;
        margin: 0 auto !important;
        border-top: none !important;
      }

      .nav-menu {
        display: flex !important;
        flex-direction: row !important;
        align-items: stretch !important;
        height: 100% !important;
        gap: 0 !important;
        flex: 1 !important;
        justify-content: center !important;
        margin-left: 0 !important;
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
        font-size: 16px !important;
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
        background: #9E7E42 !important;
        border-radius: 2px !important;
      }
    }

    /* Shrink link padding at intermediate widths */
    @media (min-width: 640px) and (max-width: 920px) {
      .nav-menu > a {
        font-size: 14px !important;
        padding: 0 0.5rem !important;
      }
      .nav-menu > a.su-active::after,
      .nav-menu > a[aria-current="page"]::after {
        left: 0.5rem !important;
        right: 0.5rem !important;
      }
    }

    /* ── Nav link typography: applies at all widths ───────────── */
    .nav-menu > a {
      font-family: 'Poppins', system-ui, sans-serif !important;
      font-weight: 500 !important;
      color: rgba(255,255,255,0.82) !important;
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
      font-weight: 600 !important;
    }

    .nav-menu > a:focus-visible {
      outline: 2px solid #9E7E42 !important;
      outline-offset: -2px;
    }

    /* ── Mobile nav ────────────────────────────────────────────── */
    @media (max-width: 639px) {
      .site-nav .site-nav-inner {
        height: auto !important;
        min-height: 50px !important;
        flex-wrap: wrap !important;
        padding: 0 1.25rem !important;
        justify-content: space-between !important;
      }

      /* Hamburger button: white on indigo */
      .nav-toggle {
        color: #FFFFFF !important;
        border-color: rgba(255,255,255,0.3) !important;
      }

      /* Dropdown panel: white for readability */
      .nav-menu {
        background: #FFFFFF !important;
        border-top: 1px solid #D0CCC2 !important;
        border-bottom: 1px solid #D0CCC2 !important;
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
        padding: 0.875rem 1.5rem !important;
        font-size: 1.125rem !important;
        font-weight: 500 !important;
        color: #1C1B18 !important;
        border-bottom: 1px solid #D0CCC2 !important;
        border-left: 3px solid transparent !important;
      }

      .nav-menu > a:last-child {
        border-bottom: none !important;
      }

      .nav-menu > a.su-active,
      .nav-menu > a[aria-current="page"] {
        color: #9E7E42 !important;
        font-weight: 600 !important;
        border-left-color: #9E7E42 !important;
        border-bottom-color: #D0CCC2 !important;
        padding-left: calc(1.5rem - 3px) !important;
      }

      .nav-menu > a:hover {
        color: #1E3A4F !important;
        background: #F5F4F1 !important;
      }
    }


    /* ═══════════════════════════════════════════════════════════════
       FOOTER — Midnight indigo, white text, gold headings
    ═══════════════════════════════════════════════════════════════ */

    .site-footer {
      background: #1E3A4F !important;
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
      font-family: 'Poppins', system-ui, sans-serif;
      font-size: 0.72rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: #9E7E42;
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
      font-family: 'Poppins', system-ui, sans-serif;
      font-size: 0.72rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.09em;
      color: rgba(255,255,255,0.45);
      display: block;
      margin-bottom: 0.875rem;
    }

    .su-footer-brand-desc {
      font-family: 'Poppins', system-ui, sans-serif;
      font-size: 1rem;
      line-height: 1.65;
      color: rgba(255,255,255,0.65);
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
      font-family: 'Poppins', system-ui, sans-serif;
      font-size: 1rem;
      color: rgba(255,255,255,0.72);
      text-decoration: none;
      transition: color 0.1s;
    }

    .su-footer-col ul li a:hover {
      color: #FFFFFF;
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
      font-family: 'Poppins', system-ui, sans-serif;
      font-size: 0.72rem;
      color: rgba(255,255,255,0.42);
      margin: 0;
    }

    #su-footer-bottom-links {
      display: flex;
      gap: 1.25rem;
      flex-wrap: wrap;
    }

    #su-footer-bottom-links a {
      font-family: 'Poppins', system-ui, sans-serif;
      font-size: 0.72rem;
      color: rgba(255,255,255,0.42);
      text-decoration: none;
      transition: color 0.12s;
    }

    #su-footer-bottom-links a:hover {
      color: rgba(255,255,255,0.85);
    }

    #su-footer-disclaimer {
      border-top: 1px solid rgba(255,255,255,0.1);
      padding: 0.85rem 2rem;
      max-width: 1160px;
      margin: 0 auto;
      font-family: 'Poppins', system-ui, sans-serif;
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

    body {
      background: #F5F4F1 !important;
      color: #1C1B18 !important;
    }

    .intro-bar {
      background: #E8E6DF !important;
      text-align: center !important;
      max-width: none !important;
      margin: 0 !important;
      padding-top: 4.5rem !important;
      padding-bottom: 4rem !important;
      padding-left: max(2rem, calc(50% - 398px)) !important;
      padding-right: max(2rem, calc(50% - 398px)) !important;
      border-bottom: 1px solid #D0CCC2 !important;
      display: flex !important;
      flex-direction: column !important;
      align-items: center !important;
    }

    .intro-body {
      font-family: 'Poppins', system-ui, sans-serif !important;
      font-size: 1.125rem !important;
      line-height: 1.75 !important;
      color: #1C1B18 !important;
      text-align: center !important;
      width: 100% !important;
      max-width: 520px !important;
      margin: 0 0 2.25rem !important;
      background: transparent !important;
      border: none !important;
      padding: 0 !important;
      box-shadow: none !important;
      display: block !important;
    }

    .su-intro-featured {
      max-width: 640px !important;
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
      background: #456A7C !important;      /* steel indigo — label register, not heading register */
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
    }

    .guides-label {
      font-family: 'Poppins', system-ui, sans-serif !important;
      font-size: 0.75rem !important;
      font-weight: 700 !important;
      letter-spacing: 0.12em !important;
      text-transform: uppercase !important;
      color: #9E7E42 !important;
      margin-bottom: 1.375rem !important;
    }

    /* Cards: white on cream */
    .card {
      --card-accent: #9E7E42;
      background: #FFFFFF !important;
      border: 1px solid #D0CCC2 !important;
      box-shadow: 0 2px 12px rgba(0,0,0,0.07) !important;
      transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease !important;
    }

    .card:hover {
      transform: translateY(-2px) !important;
      box-shadow: 0 6px 24px rgba(0,0,0,0.1) !important;
      border-color: #B8B4AC !important;
    }

    /* Card top accent stripe: gold */
    .card::before {
      background: #9E7E42 !important;
      height: 3px !important;
    }

    .card h2 {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1.125rem !important;
      font-weight: 700 !important;
      color: #1E3A4F !important;
      line-height: 1.3 !important;
      margin-bottom: 0.5rem !important;
    }

    .card p {
      font-family: 'Poppins', system-ui, sans-serif !important;
      font-size: 1rem !important;
      color: #5A5850 !important;
      line-height: 1.65 !important;
    }

    .card-link {
      font-family: 'Poppins', system-ui, sans-serif !important;
      font-size: 1rem !important;
      font-weight: 600 !important;
      color: #9E7E42 !important;
      border: 1.5px solid #9E7E42 !important;
      letter-spacing: 0.01em !important;
    }

    .card:hover .card-link {
      background: #9E7E42 !important;
      color: #FFFFFF !important;
    }

    /* Filled/solid buttons */
    [class*="btn"]:not([class*="btn-outline"]):not([class*="btn-ghost"])
                  :not(.start-here-btn):not(.btn-secondary):not(.flow-btn)
                  :not(.restart-btn):not(.back-btn):not(.tpl-btn) {
      color: #FFFFFF !important;
    }
    .download-btn, .pdf-btn, .resource-btn, .btn-primary, .btn-teal, .btn-dark,
    .handout-box-btn, .cta-banner-btn, .generate-btn, .print-btn,
    .submit-btn, .state-go-btn {
      color: #FFFFFF !important;
    }

    .start-here-btn {
      color: #9E7E42 !important;
    }
    .btn-secondary,
    .flow-btn,
    .tpl-btn {
      color: #1C1B18 !important;
    }
    .back-btn,
    .restart-btn {
      color: #1E3A4F !important;
    }

    .card-link:focus-visible {
      outline: 2px solid #9E7E42 !important;
      outline-offset: 2px !important;
    }

    .card-featured {
      background: #FFFFFF !important;
    }

    .featured-badge {
      font-family: 'Poppins', system-ui, sans-serif !important;
      background: #456A7C !important;
      font-size: 0.58rem !important;
      letter-spacing: 0.1em !important;
    }

    /* Start-here banners: translucent gold tint */
    .start-here {
      background: rgba(158,126,66,0.1) !important;
      border-color: rgba(158,126,66,0.3) !important;
      border-left-color: #9E7E42 !important;
      border-left-width: 3px !important;
      box-shadow: none !important;
    }

    .start-here-text strong {
      font-family: 'Poppins', system-ui, sans-serif !important;
      color: #1E3A4F !important;
    }

    .start-here-text p {
      font-family: 'Poppins', system-ui, sans-serif !important;
      color: #1C1B18 !important;
    }

    .start-here-btn {
      font-family: 'Poppins', system-ui, sans-serif !important;
      background: #1E3A4F !important;
      color: #FFFFFF !important;
    }

    .start-here-btn:hover {
      background: #163043 !important;
      color: #FFFFFF !important;
    }

    .start-here-btn:focus-visible {
      outline: 2px solid #FFFFFF !important;
      outline-offset: 2px !important;
    }

    /* Main content links */
    main a:not(.card):not(.card-link):not(.start-here-btn):not([class*="btn"]):not([download]) {
      color: #456A7C !important;
    }

    .card-link i,
    .card-link svg {
      color: inherit !important;
      stroke: currentColor !important;
    }

    .su-intro-featured .card-link {
      background: #9E7E42 !important;
      color: #FFFFFF !important;
      align-self: center !important;       /* center the CTA to match the centered layout */
    }

    main p,
    main li {
      font-family: 'Poppins', system-ui, sans-serif !important;
      font-size: 1.125rem !important;
      color: #1C1B18 !important;
    }


    /* ═══════════════════════════════════════════════════════════════
       INTERIOR PAGE OVERRIDES
       header.site-header + sidebar + content body
    ═══════════════════════════════════════════════════════════════ */

    header.site-header {
      background: rgba(245,244,241,0.94) !important;
      backdrop-filter: blur(4px) !important;
      -webkit-backdrop-filter: blur(4px) !important;
      border-top: 3px solid #9E7E42 !important;
      border-bottom: 1px solid #D0CCC2 !important;
      box-shadow: 0 4px 16px rgba(0,0,0,0.04) !important;
      position: relative !important;
      z-index: 1 !important;
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

    /* Interior pages: site-nav is static (not sticky) — nav bar sits in flow */
    .su-interior .site-nav {
      position: relative !important;
      top: auto !important;
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

    /* Breadcrumb eyebrow */
    .header-eyebrow {
      font-family: 'Poppins', system-ui, sans-serif !important;
      font-size: 0.72rem !important;
      font-weight: 500 !important;
      letter-spacing: 0.06em !important;
      text-transform: uppercase !important;
      color: #9E7E42 !important;
      margin-bottom: 0.4rem !important;
    }

    .header-eyebrow a {
      color: #9E7E42 !important;
      text-decoration: none !important;
    }

    .header-eyebrow a:hover {
      color: #1E3A4F !important;
      text-decoration: underline !important;
    }

    /* Page title */
    .header-title {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1.65rem !important;
      font-weight: 700 !important;
      color: #1E3A4F !important;
      line-height: 1.15 !important;
      letter-spacing: -0.01em !important;
      text-shadow: none !important;
      margin: 0 0 0.35rem !important;
    }

    .header-title em {
      font-style: italic !important;
      color: #9E7E42 !important;
    }

    /* Page subtitle */
    .header-subtitle {
      font-family: 'Poppins', system-ui, sans-serif !important;
      font-size: 1rem !important;
      color: #5A5850 !important;
      line-height: 1.5 !important;
      margin: 0 !important;
    }

    /* Meta chips */
    .meta-chip {
      font-family: 'Poppins', system-ui, sans-serif !important;
      font-size: 0.67rem !important;
      font-weight: 600 !important;
      background: #C5CDD6 !important;
      color: #456A7C !important;
      border: 1px solid #456A7C !important;
      border-radius: 4px !important;
    }

    .page-layout {
      background: #F5F4F1 !important;
    }

    /* Sidebar */
    .page-sidebar {
      background: #FFFFFF !important;
      border: 1px solid #D0CCC2 !important;
      border-radius: 8px !important;
      box-shadow: 0 1px 6px rgba(0,0,0,0.05) !important;
      padding: 1.25rem 0 !important;
      top: 60px !important;
      max-height: calc(100vh - 60px) !important;
      overflow-y: auto !important;
    }

    .sidebar-hd {
      font-family: 'Poppins', system-ui, sans-serif !important;
      font-size: 0.72rem !important;
      font-weight: 700 !important;
      letter-spacing: 0.12em !important;
      text-transform: uppercase !important;
      color: #9E7E42 !important;
      padding: 0 1.125rem 0.625rem !important;
      border-bottom: 1px solid #D0CCC2 !important;
      margin-bottom: 0.375rem !important;
    }

    .sidebar-link {
      font-family: 'Poppins', system-ui, sans-serif !important;
      font-size: 1rem !important;
      font-weight: 400 !important;
      color: #1C1B18 !important;
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
      color: #9E7E42 !important;
      background: #F5F4F1 !important;
    }

    .sidebar-link.active,
    .sidebar-link[aria-current],
    .sidebar-link[aria-selected="true"] {
      color: #9E7E42 !important;
      font-weight: 600 !important;
      border-left-color: #9E7E42 !important;
      background: #F7F3E8 !important;
      padding-left: calc(1.125rem - 3px) !important;
    }

    /* Interior page content typography */
    .page-body h2,
    .page-main h2 {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 2rem !important;
      font-weight: 700 !important;
      color: #1E3A4F !important;
      line-height: 1.25 !important;
      margin-top: 2rem !important;
      margin-bottom: 0.75rem !important;
      padding-bottom: 0.375rem !important;
      border-bottom: 1px solid #D0CCC2 !important;
    }

    .page-body h3,
    .page-main h3 {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1.35rem !important;
      font-weight: 700 !important;
      color: #1E3A4F !important;
      line-height: 1.3 !important;
      margin-top: 1.5rem !important;
      margin-bottom: 0.5rem !important;
    }

    .page-body p,
    .page-main p {
      font-family: 'Poppins', system-ui, sans-serif !important;
      font-size: 1.125rem !important;
      line-height: 1.75 !important;
      color: #1C1B18 !important;
    }

    .page-body a,
    .page-main a {
      color: #456A7C !important;
    }

    .page-body ul li,
    .page-body ol li,
    .page-main ul li,
    .page-main ol li {
      font-family: 'Poppins', system-ui, sans-serif !important;
      font-size: 1.125rem !important;
      line-height: 1.7 !important;
      color: #1C1B18 !important;
    }

    /* Callout / note boxes */
    .page-body .note,
    .page-body .callout,
    .page-main .note,
    .page-main .callout {
      background: #FFFFFF !important;
      border: 1px solid #D0CCC2 !important;
      border-left: 3px solid #9E7E42 !important;
      border-radius: 0 8px 8px 0 !important;
      padding: 1rem 1.375rem !important;
      box-shadow: 0 1px 6px rgba(0,0,0,0.04) !important;
    }


    /* ═══════════════════════════════════════════════════════════════
       INTRO-BOX — interior pages
    ═══════════════════════════════════════════════════════════════ */
    .intro-box {
      background: #FFFFFF !important;
      border: 1px solid #D0CCC2 !important;
      border-left: 3px solid #9E7E42 !important;
      border-radius: 0 8px 8px 0 !important;
      padding: 1.25rem 1.625rem !important;
      margin-bottom: 2rem !important;
      font-family: 'Poppins', system-ui, sans-serif !important;
      font-size: 1rem !important;
      line-height: 1.7 !important;
      color: #1C1B18 !important;
      box-shadow: 0 1px 6px rgba(0,0,0,0.05) !important;
    }
    .intro-box strong {
      color: #1E3A4F !important;
      font-family: 'Poppins', system-ui, sans-serif !important;
    }

    /* ── Broader heading overrides ── */
    .page-layout h2,
    .page-content h2,
    .page-body h2,
    .page-main h2 {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 2rem !important;
      font-weight: 700 !important;
      color: #1E3A4F !important;
      line-height: 1.25 !important;
      margin-top: 2rem !important;
      margin-bottom: 0.75rem !important;
      padding-bottom: 0.375rem !important;
      border-bottom: 1px solid #D0CCC2 !important;
    }

    .page-layout h3,
    .page-content h3,
    .page-body h3,
    .page-main h3 {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1.35rem !important;
      font-weight: 700 !important;
      color: #1E3A4F !important;
      line-height: 1.3 !important;
      margin-top: 1.5rem !important;
      margin-bottom: 0.5rem !important;
    }

    .page-layout h4,
    .page-content h4,
    .page-body h4,
    .page-main h4 {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 0.975rem !important;
      font-weight: 700 !important;
      color: #1E3A4F !important;
      line-height: 1.3 !important;
      margin-top: 1.25rem !important;
      margin-bottom: 0.375rem !important;
    }

    .page-layout p,
    .page-content p {
      font-family: 'Poppins', system-ui, sans-serif !important;
      font-size: 1.125rem !important;
      line-height: 1.75 !important;
      color: #1C1B18 !important;
    }

    .page-intro,
    .about-lead p {
      font-family: 'Poppins', system-ui, sans-serif !important;
      font-size: 1.125rem !important;
      line-height: 1.8 !important;
      color: #1C1B18 !important;
    }

    /* ── Dark-background sections (about.html bg-story) ── */
    .bg-story {
      background: #1E3A4F !important;
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
      border: 1px solid #D0CCC2 !important;
      border-left: 3px solid #9E7E42 !important;
      border-radius: 0 8px 8px 0 !important;
      padding: 1.125rem 1.375rem !important;
      box-shadow: 0 1px 6px rgba(0,0,0,0.04) !important;
    }

    .teal-callout .callout-label {
      color: #9E7E42 !important;
      font-family: 'Poppins', system-ui, sans-serif !important;
      font-size: 0.67rem !important;
      font-weight: 700 !important;
      letter-spacing: 0.1em !important;
      text-transform: uppercase !important;
    }

    .teal-callout p {
      color: #1C1B18 !important;
      font-family: 'Poppins', system-ui, sans-serif !important;
    }

    .info-callout {
      background: #FFFFFF !important;
      border: 1px solid #D0CCC2 !important;
      border-left: 3px solid #9E7E42 !important;
      border-radius: 0 8px 8px 0 !important;
      padding: 1.125rem 1.375rem !important;
      box-shadow: 0 1px 6px rgba(0,0,0,0.04) !important;
    }

    .info-callout .callout-label {
      color: #9E7E42 !important;
      font-family: 'Poppins', system-ui, sans-serif !important;
      font-size: 0.67rem !important;
      font-weight: 700 !important;
      letter-spacing: 0.1em !important;
      text-transform: uppercase !important;
    }

    .info-callout p {
      color: #1C1B18 !important;
      font-family: 'Poppins', system-ui, sans-serif !important;
    }

    .amber-callout {
      background: #FFFFFF !important;
      border: 1px solid #D0CCC2 !important;
      border-left: 3px solid #9E7E42 !important;
      border-radius: 0 8px 8px 0 !important;
      padding: 1.125rem 1.375rem !important;
      box-shadow: 0 1px 6px rgba(0,0,0,0.04) !important;
    }

    .amber-callout .callout-label {
      color: #9E7E42 !important;
      font-family: 'Poppins', system-ui, sans-serif !important;
      font-size: 0.67rem !important;
      font-weight: 700 !important;
      letter-spacing: 0.1em !important;
      text-transform: uppercase !important;
    }

    .feature-card {
      background: #FFFFFF !important;
      border: 1px solid #D0CCC2 !important;
      border-top: 3px solid #9E7E42 !important;
      border-radius: 8px !important;
      box-shadow: 0 1px 8px rgba(0,0,0,0.05) !important;
    }

    .feature-card.amber-top { border-top-color: #9E7E42 !important; }
    .feature-card.rose-top  { border-top-color: #9E7E42 !important; }
    .feature-card.sage-top  { border-top-color: #9E7E42 !important; }
    .feature-card.blue-top  { border-top-color: #9E7E42 !important; }

    .feature-card h4 {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      font-size: 1rem !important;
      font-weight: 700 !important;
      color: #1E3A4F !important;
    }

    .feature-card li,
    .feature-card p {
      font-family: 'Poppins', system-ui, sans-serif !important;
      font-size: 1rem !important;
      color: #1C1B18 !important;
    }

    .section-label {
      font-family: 'Poppins', system-ui, sans-serif !important;
      font-size: 0.75rem !important;
      font-weight: 600 !important;
      color: #5A5850 !important;
      letter-spacing: 0.12em !important;
      text-transform: uppercase !important;
    }

    .section-label::before {
      background: #9E7E42 !important;
    }

    .section-title {
      font-family: 'DM Sans', system-ui, sans-serif !important;
      color: #1E3A4F !important;
    }

    .symptom-pill {
      background: #FFFFFF !important;
      border-color: #D0CCC2 !important;
      color: #5A5850 !important;
      font-family: 'Poppins', system-ui, sans-serif !important;
    }

    .symptom-pill:hover,
    .symptom-pill.active {
      background: #9E7E42 !important;
      border-color: #9E7E42 !important;
      color: #FFFFFF !important;
    }

    .symptom-search {
      border-color: #D0CCC2 !important;
      font-family: 'Poppins', system-ui, sans-serif !important;
    }

    .symptom-search:focus {
      border-color: #9E7E42 !important;
    }

    .stat-box {
      background: #FFFFFF !important;
      border: 1px solid #D0CCC2 !important;
    }

    .tab-nav {
      background: #FFFFFF !important;
      border-top: 1px solid #D0CCC2 !important;
      border-bottom: 1px solid #D0CCC2 !important;
    }

    .tab-btn {
      font-family: 'Poppins', system-ui, sans-serif !important;
      font-size: 1rem !important;
      font-weight: 500 !important;
      color: #5A5850 !important;
    }

    .tab-btn.active,
    .tab-btn[aria-selected="true"] {
      color: #9E7E42 !important;
      font-weight: 600 !important;
      border-bottom-color: #9E7E42 !important;
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.id = 'su-styles';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);


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
    // Mark active page link
    const pathname = window.location.pathname.split('/').pop() || 'index.html';
    navInner.querySelectorAll('.nav-menu a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === pathname || (href && pathname.startsWith(href.replace('.html', '')))) {
        a.classList.add('su-active');
        a.setAttribute('aria-current', 'page');
      }
    });

    // Inject text logo before the nav-menu
    const navMenu = navInner.querySelector('.nav-menu');
    if (navMenu && !navInner.querySelector('.su-nav-logo')) {
      const logo = document.createElement('a');
      logo.href = '/index.html';
      logo.className = 'su-nav-logo';
      logo.innerHTML = 'The SETD5 Syndrome <span class="su-nav-logo-light">Companion</span>';
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
    // Remove decorative helix SVG if present
    const helixSvg = siteHeader.querySelector('svg');
    if (helixSvg) helixSvg.remove();

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
      sub.textContent = 'Plain-language resources for families navigating SETD5 Syndrome \u2014 built by a parent, for families like ours.';
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


  /* ─── 4. RESTYLE INTERNATIONAL NOTE ─────────────────────────────────── */
  const intlNote = document.querySelector('div[style*="sage-lt"], div[style*="e8f4f2"], div[style*="E4F0EE"], div[style*="eaf5f3"]');
  if (intlNote) {
    Object.assign(intlNote.style, {
      background: '#FFFFFF',
      border: '1px solid #D0CCC2',
      borderLeft: '3px solid #456A7C',
      borderRadius: '8px',
      color: '#1C1B18',
      fontSize: '1rem',
      lineHeight: '1.7',
      fontFamily: "'Poppins', system-ui, sans-serif",
      boxShadow: '0 1px 6px rgba(0,0,0,0.05)',
    });
    const strong = intlNote.querySelector('strong');
    if (strong) strong.style.color = '#1E3A4F';
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
          <p class="su-footer-brand-desc" style="margin-top:0;">Content is for informational purposes only and does not constitute medical, legal, or educational advice.</p>
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
        <p>&copy; 2026 The SETD5 Syndrome Companion &mdash; Built by a parent, for families like ours</p>
      </div>
    `;
  }

})();
