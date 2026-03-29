/**
 * site-upgrade.js
 * SETD5 Syndrome Resources (.com) — header & footer upgrade
 *
 * What this does:
 *  1. Injects a logo + site name into the existing sticky nav bar
 *  2. Expands the nav to full-width with proper spacing
 *  3. Replaces the minimal footer with a polished multi-column footer
 *
 * Drop this file in the site root and add before </body>:
 *   <script src="site-upgrade.js"></script>
 */

(function () {
  'use strict';

  /* ─── Colors & fonts match the existing site tokens ───────────────────
     --navy:    #162544
     --cream:   #F7F4EE
     --caramel: #C6A27E
     --deep:    #AEBFBE  (teal)
     Fonts: Lora (serif), Inter (sans-serif) — already loaded
  ─────────────────────────────────────────────────────────────────────── */

  /* ─── 1. INJECT OVERRIDE STYLES ──────────────────────────────────────── */
  const css = `
    /* ── Nav: wider container, logo layout ── */
    .site-nav,
    .site-nav .site-nav-inner {
      height: 82px !important;
      min-height: 82px !important;
    }

    .site-nav-inner {
      max-width: 1160px !important;
      padding: 0 2rem !important;
      justify-content: space-between !important;
    }

    .nav-menu {
      flex: unset !important;
      justify-content: flex-end !important;
      gap: 0 !important;
    }

    .nav-menu > a {
      font-size: 14.5px !important;
    }

    /* ── Logo group ── */
    .su-logo-wrap {
      display: flex;
      align-items: center;
      gap: 14px;
      text-decoration: none;
      flex-shrink: 0;
    }

    .su-logo-wrap img {
      height: 62px;
      width: auto;
      display: block;
    }

    .su-name-block {
      display: flex;
      flex-direction: column;
      line-height: 1.25;
    }

    .su-site-name {
      font-family: 'Lora', Georgia, serif;
      font-size: 1.45rem;
      font-weight: 700;
      color: #162544;
      letter-spacing: -0.01em;
    }

    .su-site-tagline {
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 0.72rem;
      font-weight: 500;
      color: #AEBFBE;
      text-transform: lowercase;
      letter-spacing: 0.04em;
    }

    @media (max-width: 820px) {
      .su-site-tagline { display: none; }
      .su-logo-wrap img { height: 44px; }
      .su-site-name { font-size: 1.1rem; }
      .site-nav-inner { height: 64px !important; }
    }

    @media (max-width: 480px) {
      .su-logo-wrap img { height: 36px; }
      .site-nav-inner { height: 56px !important; }
    }

    /* ── Main site header: warm white, logo flush left ── */
    header {
      background: #EEEAE2 !important;
      color: #5D5646 !important;
      text-align: left !important;
      padding: 2rem 0 1.75rem !important;
      border-bottom: 1px solid #D4CCBF !important;
    }

    header h1, header h1 a {
      color: #5D5646 !important;
      font-size: 2.4rem !important;
      line-height: 1.2 !important;
    }

    header h1 em {
      color: #A07D54 !important;
      font-size: 1.6rem !important;
      font-weight: 400 !important;
    }

    .header-hero-inner {
      max-width: 1160px !important;
      display: flex !important;
      align-items: center !important;
      gap: 2rem !important;
      padding: 0 2rem !important;
    }

    .su-header-logo {
      flex-shrink: 0;
      height: 120px;
      width: 120px;
      object-fit: contain;
    }

    .su-header-text {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    .header-rule {
      display: none !important;
    }

    .header-sub {
      display: none !important;
    }

    @media (max-width: 640px) {
      .su-header-logo { height: 80px; width: 80px; }
      header h1 { font-size: 1.6rem !important; }
      header h1 em { font-size: 1.1rem !important; }
      .header-hero-inner { gap: 1.25rem !important; }
    }

    /* ── Active nav link ── */
    .nav-menu > a.su-active {
      color: #162544 !important;
      font-weight: 600 !important;
      background: rgba(22,37,68,0.06);
      border-radius: 5px;
    }

    /* ── Footer: new layout ── */
    .site-footer {
      padding: 0 !important;
      text-align: left !important;
    }

    #su-footer-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr;
      gap: 2.5rem;
      max-width: 1160px;
      margin: 0 auto;
      padding: 2.75rem 2rem 2.25rem;
    }

    .su-footer-col h4 {
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 0.67rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #AEBFBE;
      margin: 0 0 0.9rem;
    }

    .su-footer-brand-name {
      font-family: 'Lora', Georgia, serif;
      font-size: 1rem;
      font-weight: 600;
      color: rgba(255,255,255,0.9);
      display: block;
      margin-bottom: 0.2rem;
    }

    .su-footer-brand-tag {
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 0.65rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.07em;
      color: #AEBFBE;
      display: block;
      margin-bottom: 0.9rem;
    }

    .su-footer-brand-desc {
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 0.85rem;
      line-height: 1.65;
      color: rgba(255,255,255,0.45);
      margin: 0 0 0.9rem;
    }

    .su-footer-col ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .su-footer-col ul li {
      margin-bottom: 0.5rem;
    }

    .su-footer-col ul li a {
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 0.85rem;
      color: rgba(255,255,255,0.55);
      text-decoration: none;
      transition: color 0.15s;
    }

    .su-footer-col ul li a:hover {
      color: rgba(255,255,255,0.9);
    }

    #su-footer-translate {
      border-top: 1px solid rgba(255,255,255,0.08);
      padding: 1.1rem 2rem;
      max-width: 1160px;
      margin: 0 auto;
    }

    #su-footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.08);
      padding: 1.1rem 2rem;
      max-width: 1160px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    #su-footer-bottom p {
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 0.78rem;
      color: rgba(255,255,255,0.3);
      margin: 0;
    }

    #su-footer-bottom-links {
      display: flex;
      gap: 1.25rem;
      flex-wrap: wrap;
    }

    #su-footer-bottom-links a {
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 0.78rem;
      color: rgba(255,255,255,0.35);
      text-decoration: none;
      transition: color 0.15s;
    }

    #su-footer-bottom-links a:hover {
      color: rgba(255,255,255,0.75);
    }

    #su-footer-disclaimer {
      border-top: 1px solid rgba(255,255,255,0.05);
      padding: 0.85rem 2rem;
      max-width: 1160px;
      margin: 0 auto;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 0.73rem;
      color: rgba(255,255,255,0.25);
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


  /* ─── 2. ENHANCE THE EXISTING STICKY NAV ─────────────────────────────── */
  const navInner = document.querySelector('.site-nav-inner');

  if (navInner) {
    // Determine active page
    const pathname = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = {
      'understanding-setd5-syndrome.html': 'SETD5 Syndrome',
      'family-toolkit.html':               'Family Toolkit',
      'setd5-medical-terms-guide.html':    'Medical Terms',
      'research.html':                     'Research',
      'helpful-links.html':                'Community & Links',
      'about.html':                        'About',
    };

    // Mark active link
    navInner.querySelectorAll('.nav-menu a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === pathname || pathname.startsWith(href.replace('.html', ''))) {
        a.classList.add('su-active');
      }
    });

    // Nav is text links only — no logo or site name injected here
  }


  /* ─── 3. RESTRUCTURE THE MAIN SITE HEADER ────────────────────────────── */
  const siteHeader = document.querySelector('header');

  if (siteHeader) {
    // Remove the decorative helix SVG overlay
    const helixSvg = siteHeader.querySelector('svg');
    if (helixSvg) helixSvg.remove();

    // Find the inner content wrapper
    const heroInner = siteHeader.querySelector('.header-hero-inner');
    if (heroInner) {
      // Wrap existing content in a text block
      const textBlock = document.createElement('div');
      textBlock.className = 'su-header-text';
      while (heroInner.firstChild) {
        textBlock.appendChild(heroInner.firstChild);
      }
      // Update h1 subtitle, remove tagline
      const h1Em = textBlock.querySelector('h1 em');
      if (h1Em) h1Em.textContent = "A Parent\u2019s Guide";
      const headerSub = textBlock.querySelector('.header-sub');
      if (headerSub) headerSub.remove();

      // Build logo img
      const logoImg = document.createElement('img');
      logoImg.src = '/SD5-recolored.png';
      logoImg.alt = 'SETD5 Syndrome';
      logoImg.className = 'su-header-logo';

      heroInner.appendChild(logoImg);
      heroInner.appendChild(textBlock);
    }
  }


  /* ─── 4. REPLACE THE FOOTER ──────────────────────────────────────────── */
  const existingFooter = document.querySelector('footer.site-footer');

  if (existingFooter) {
    // Grab the translate element HTML before we replace
    const translateEl = existingFooter.querySelector('#google_translate_element');
    const translateHTML = translateEl ? translateEl.parentElement.outerHTML : '';

    existingFooter.innerHTML = `
      <div id="su-footer-grid">

        <div class="su-footer-col">
          <span class="su-footer-brand-name">SETD5 Syndrome</span>
          <span class="su-footer-brand-tag">Family Resources &amp; Guides</span>
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
        <p>&copy; 2026 SETD5 Syndrome Resources &mdash; Built by a parent, for families</p>
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
