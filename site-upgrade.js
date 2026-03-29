/**
 * site-upgrade.js  v7
 * SETD5 Syndrome (.com) — editorial redesign
 *
 * v7 changes:
 *   - Header: white surface, box-shadow, Public Sans subtitle label
 *   - Nav: editorial active state (2px underline, no pill/box)
 *   - Full warm earth-tone palette throughout (no dark navy)
 *   - Footer: warm #DFD4C3 background, #5D5646 headings, #4D4C4B links
 *   - Fonts: Spectral (headings) + Public Sans (body/UI)
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

    /* ── HEADER: white surface, shadow, separated from linen page ──────── */
    header {
      background: #FFFFFF !important;
      color: #5D5646 !important;
      text-align: left !important;
      padding: 1.375rem 0 !important;
      border-bottom: 1px solid #D4CCBF !important;
      box-shadow: 0 1px 8px rgba(0,0,0,0.055) !important;
      position: relative;
      z-index: 10;
    }

    .header-hero-inner {
      max-width: 1160px !important;
      display: flex !important;
      align-items: center !important;
      gap: 1.5rem !important;
      padding: 0 2rem !important;
      margin: 0 auto !important;
    }

    /* Logo: sized to span the title block height */
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

    /* Site title: Spectral, deep brown */
    header h1,
    header h1 a {
      font-family: 'Spectral', Georgia, serif !important;
      color: #5D5646 !important;
      font-size: 2rem !important;
      font-weight: 700 !important;
      letter-spacing: -0.015em !important;
      line-height: 1.1 !important;
      text-shadow: none !important;
    }

    /* Hide the original em — subtitle is now a separate span */
    header h1 em {
      display: none !important;
    }

    /* Subtitle: Public Sans label, not a heading.
       Uppercase, small, warm accent — clearly secondary metadata. */
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

    .header-rule { display: none !important; }
    .header-sub  { display: none !important; }

    @media (max-width: 640px) {
      .su-header-logo { height: 60px; width: 60px; }
      header h1 { font-size: 1.5rem !important; }
      .header-hero-inner { gap: 1rem !important; }
    }


    /* ── NAV: editorial, restrained, text-only ──────────────────────────── */

    .site-nav {
      background: #FFFFFF !important;
      border-top: 1px solid #DFD4C3 !important;
      border-bottom: 1px solid #DFD4C3 !important;
    }

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
      align-items: stretch !important;
      height: 100% !important;
      gap: 0 !important;
      flex: unset !important;
      justify-content: flex-start !important;
      margin-left: -0.5rem !important;
    }

    /* Base link: text only, bottom border reserved for active */
    .nav-menu > a {
      display: flex !important;
      align-items: center !important;
      height: 100% !important;
      font-family: 'Public Sans', system-ui, sans-serif !important;
      font-size: 0.78rem !important;
      font-weight: 500 !important;
      color: #4D4C4B !important;
      text-decoration: none !important;
      padding: 0 0.75rem !important;
      border-bottom: 2px solid transparent !important;
      border-radius: 0 !important;
      background: transparent !important;
      box-shadow: none !important;
      transition: color 0.12s ease, border-color 0.12s ease !important;
      white-space: nowrap;
      letter-spacing: 0.01em;
    }

    .nav-menu > a:hover {
      color: #3E5974 !important;
      background: transparent !important;
      text-decoration: none !important;
    }

    /* Active: blue text + 2px bottom border. No pill, no box. */
    .nav-menu > a.su-active {
      color: #3E5974 !important;
      font-weight: 600 !important;
      border-bottom-color: #3E5974 !important;
      background: transparent !important;
      border-radius: 0 !important;
    }

    .nav-menu > a:focus-visible {
      outline: 2px solid #3E5974 !important;
      outline-offset: -2px;
    }

    @media (max-width: 820px) {
      .nav-menu > a {
        font-size: 0.72rem !important;
        padding: 0 0.55rem !important;
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


  /* ─── 3. RESTRUCTURE MAIN HEADER ─────────────────────────────────────── */
  const siteHeader = document.querySelector('header');

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


  /* ─── 4. REPLACE FOOTER ──────────────────────────────────────────────── */
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
