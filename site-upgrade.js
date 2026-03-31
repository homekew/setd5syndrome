/**
 * site-upgrade.js
 * SETD5 Syndrome Resources (.com) — site-wide header & footer upgrade
 * Injects a sticky branded header and a full multi-column footer into every page.
 */

(function () {
  'use strict';

  /* ─── 1. INJECT STYLES ─────────────────────────────────────────────── */
  const css = `
    /* ── Google Fonts ── */
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Inter:wght@400;500;600&display=swap');

    /* ── Design Tokens ── */
    :root {
      --navy:       #1a2c5b;
      --navy-light: #2c3e6b;
      --teal:       #4a9ea0;
      --teal-light: #7ab3b5;
      --cream:      #f5f0e8;
      --white:      #ffffff;
      --text-muted: #b0bfd8;
      --border:     #e2ddd5;
    }

    /* ── Fixed Header — always at top of viewport ── */
    #su-header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: var(--white);
      border-bottom: 1px solid var(--border);
      box-shadow: 0 2px 12px rgba(26, 44, 91, 0.08);
      font-family: 'Inter', system-ui, sans-serif;
    }

    /* ── Push page content below fixed header + Poppins size correction ── */
    body {
      padding-top: 68px !important;
      font-size: 15px !important;
    }

    /* ── Remove sticky from page hero so it sits naturally below the nav ── */
    .site-header {
      position: relative !important;
      top: auto !important;
      z-index: auto !important;
    }

    #su-header-inner {
      max-width: 1160px;
      margin: 0 auto;
      padding: 0 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 68px;
      gap: 1.5rem;
    }

    #su-logo-group {
      display: flex;
      align-items: center;
      gap: 11px;
      text-decoration: none;
      flex-shrink: 0;
    }

    #su-logo-group img {
      height: 42px;
      width: auto;
    }

    #su-name-block {
      display: flex;
      flex-direction: column;
      line-height: 1.2;
    }

    #su-site-name {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--navy);
      letter-spacing: -0.01em;
    }

    #su-site-tagline {
      font-size: 0.68rem;
      font-weight: 500;
      color: var(--teal);
      text-transform: uppercase;
      letter-spacing: 0.07em;
    }

    #su-nav {
      display: flex;
      align-items: center;
      gap: 0.15rem;
      flex-wrap: nowrap;
    }

    #su-nav a {
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--navy-light);
      text-decoration: none;
      padding: 0.35rem 0.7rem;
      border-radius: 6px;
      transition: background 0.15s ease, color 0.15s ease;
      white-space: nowrap;
    }

    #su-nav a:hover {
      background: #eef2f8;
      color: var(--navy);
    }

    #su-nav a.su-active {
      background: #dce6f5;
      color: var(--navy);
      font-weight: 600;
    }

    /* Hamburger — mobile only */
    #su-hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      cursor: pointer;
      padding: 6px;
      border: none;
      background: none;
      flex-shrink: 0;
    }

    #su-hamburger span {
      display: block;
      width: 22px;
      height: 2px;
      background: var(--navy);
      border-radius: 2px;
      transition: all 0.25s ease;
    }

    #su-mobile-nav {
      display: none;
      flex-direction: column;
      background: var(--white);
      border-top: 1px solid var(--border);
      padding: 0.75rem 1.5rem 1rem;
    }

    #su-mobile-nav a {
      display: block;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--navy-light);
      text-decoration: none;
      padding: 0.6rem 0;
      border-bottom: 1px solid #f0ebe2;
    }

    #su-mobile-nav a:last-child { border-bottom: none; }
    #su-mobile-nav a.su-active { color: var(--navy); font-weight: 600; }

    /* ── Hide original site nav on all pages ── */
    .site-nav,
    .site-header,
    nav.navbar,
    .navbar {
      display: none !important;
    }

    /* ── Button text color fix — white text on any dark button ── */
    a[style*="background"],
    button[style*="background"],
    .btn,
    .button,
    [class*="btn-"],
    [class*="download"],
    [class*="pdf-btn"],
    [style*="background:#5a9186"],
    [style*="background: #5a9186"],
    [style*="background:#4a6a8a"],
    [style*="background: #4a6a8a"],
    [style*="background:#1E3A4F"],
    [style*="background: #1E3A4F"],
    [style*="background:#456A7C"],
    [style*="background: #456A7C"] {
      color: #ffffff !important;
    }

    /* Ensure page body links that are styled as buttons keep white text */
    .page-body a[style*="background"],
    .page-body a[class*="btn"],
    .page-body a[class*="download"],
    .page-body a[class*="pdf"] {
      color: #ffffff !important;
    }

    @media (max-width: 820px) {
      #su-nav { display: none; }
      #su-hamburger { display: flex; }
      #su-header-inner { height: 60px; }
      #su-mobile-nav.su-open { display: flex; }
      #su-site-tagline { display: none; }
    }

    @media (max-width: 480px) {
      #su-site-name { font-size: 0.95rem; }
      #su-logo-group img { height: 36px; }
    }

    /* ── Footer ── */
    #su-footer {
      background: var(--navy);
      color: var(--text-muted);
      font-family: 'Inter', system-ui, sans-serif;
      margin-top: 0;
    }

    #su-footer-grid {
      max-width: 1160px;
      margin: 0 auto;
      padding: 3rem 2rem 2.5rem;
      display: grid;
      grid-template-columns: 1.6fr 1fr 1fr;
      gap: 3rem;
    }

    .su-footer-brand h3 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--white);
      margin: 0 0 0.3rem;
    }

    .su-footer-brand .su-footer-tagline {
      font-size: 0.68rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.08em;
      color: var(--teal-light);
      display: block;
      margin-bottom: 1rem;
    }

    .su-footer-brand p {
      font-size: 0.85rem;
      line-height: 1.65;
      color: #8fa3c8;
      margin: 0 0 1rem;
      max-width: 280px;
    }

    .su-footer-brand a.su-footer-email {
      color: var(--teal-light);
      text-decoration: none;
      font-size: 0.85rem;
      font-weight: 500;
    }

    .su-footer-brand a.su-footer-email:hover {
      color: var(--white);
    }

    .su-footer-col h4 {
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--teal-light);
      margin: 0 0 1rem;
    }

    .su-footer-col ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .su-footer-col ul li {
      margin-bottom: 0.55rem;
    }

    .su-footer-col ul li a {
      color: #8fa3c8;
      text-decoration: none;
      font-size: 0.85rem;
      transition: color 0.15s;
    }

    .su-footer-col ul li a:hover {
      color: var(--white);
    }

    #su-footer-translate {
      border-top: 1px solid rgba(255,255,255,0.1);
      padding: 1.25rem 2rem;
      display: flex;
      justify-content: center;
    }

    #su-footer-bottom {
      border-top: 1px solid rgba(255,255,255,0.1);
      max-width: 1160px;
      margin: 0 auto;
      padding: 1.25rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    #su-footer-bottom p {
      font-size: 0.78rem;
      color: #5a6f96;
      margin: 0;
    }

    #su-footer-bottom-links {
      display: flex;
      gap: 1.5rem;
      flex-wrap: wrap;
    }

    #su-footer-bottom-links a {
      font-size: 0.78rem;
      color: #5a6f96;
      text-decoration: none;
      transition: color 0.15s;
    }

    #su-footer-bottom-links a:hover {
      color: var(--teal-light);
    }

    #su-footer-disclaimer {
      max-width: 1160px;
      margin: 0 auto;
      padding: 0.75rem 2rem 1.5rem;
      font-size: 0.75rem;
      color: #4a5e82;
      line-height: 1.55;
      text-align: center;
    }

    @media (max-width: 720px) {
      #su-footer-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
        padding-bottom: 2rem;
      }

      .su-footer-brand p { max-width: 100%; }

      #su-footer-bottom {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }

      #su-footer-bottom-links { gap: 1rem; }
    }
  `;

  const styleEl = document.createElement('style');
  styleEl.id = 'su-styles';
  styleEl.textContent = css;
  document.head.appendChild(styleEl);


  /* ─── 2. DETERMINE ACTIVE NAV ITEM ─────────────────────────────────── */
  const pathname = window.location.pathname.split('/').pop() || 'index.html';

  const navLinks = [
    { label: 'SETD5 Syndrome',   href: 'understanding-setd5-syndrome.html' },
    { label: 'Family Toolkit',   href: 'family-toolkit.html' },
    { label: 'Medical Terms',    href: 'setd5-medical-terms-guide.html' },
    { label: 'Research',         href: 'research.html' },
    { label: 'Community & Links',href: 'helpful-links.html' },
    { label: 'About',            href: 'about.html' },
  ];

  function isActive(href) {
    return pathname === href || pathname === href.replace('.html', '');
  }


  /* ─── 3. BUILD & INJECT STICKY HEADER ──────────────────────────────── */

  // Determine relative path to root for logo (handle subdirectory pages)
  const logoSrc = 'logo.png';

  const navItemsHTML = navLinks.map(link =>
    `<a href="${link.href}"${isActive(link.href) ? ' class="su-active"' : ''}>${link.label}</a>`
  ).join('');

  const mobileNavHTML = navLinks.map(link =>
    `<a href="${link.href}"${isActive(link.href) ? ' class="su-active"' : ''}>${link.label}</a>`
  ).join('');

  const headerHTML = `
    <header id="su-header">
      <div id="su-header-inner">
        <a id="su-logo-group" href="index.html">
          <img src="${logoSrc}" alt="SETD5 Syndrome Resources logo">
          <div id="su-name-block">
            <span id="su-site-name">SETD5 Syndrome</span>
            <span id="su-site-tagline">Family Resources &amp; Guides</span>
          </div>
        </a>
        <nav id="su-nav" aria-label="Main navigation">
          ${navItemsHTML}
        </nav>
        <button id="su-hamburger" aria-label="Toggle navigation" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
      <nav id="su-mobile-nav" aria-label="Mobile navigation">
        ${mobileNavHTML}
      </nav>
    </header>
  `;

  const headerEl = document.createElement('div');
  headerEl.innerHTML = headerHTML;
  document.body.insertBefore(headerEl.firstElementChild, document.body.firstChild);

  // Mobile toggle
  const hamburger = document.getElementById('su-hamburger');
  const mobileNav = document.getElementById('su-mobile-nav');
  hamburger.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('su-open');
    hamburger.setAttribute('aria-expanded', open);
  });

  // Hide ALL original nav/header elements.
  // First pass: hide any direct body-level header or nav that isn't ours.
  document.querySelectorAll('body > header, body > nav').forEach(el => {
    if (el.id === 'su-header') return;
    el.style.display = 'none';
  });

  // Second pass: catch any nested nav/header containing the site's own links.
  document.querySelectorAll('nav, header, .site-nav, .site-header, .nav-wrapper, .header-inner, .header').forEach(el => {
    if (el.id === 'su-header' || el.id === 'su-nav' || el.id === 'su-mobile-nav') return;
    if (el.closest('#su-header')) return;
    const links = el.querySelectorAll('a');
    const texts = Array.from(links).map(a => a.textContent.trim());
    if (texts.some(t => t === 'Family Toolkit' || t === 'Research' || t === 'Medical Terms')) {
      el.style.display = 'none';
    }
  });


  /* ─── 4. BUILD & INJECT FOOTER ──────────────────────────────────────── */

  // Grab the existing translate widget (Google Translate) before we remove the old footer
  const existingFooter = document.querySelector('footer, [role="contentinfo"]');
  let translateWidgetHTML = '';
  if (existingFooter) {
    const translateEl = existingFooter.querySelector('.goog-te-gadget, #google_translate_element, [id*="translate"]');
    if (translateEl) {
      translateWidgetHTML = translateEl.outerHTML;
    }
    // Also grab translate container div if it exists as a sibling
    const translateSibling = existingFooter.previousElementSibling;
    if (translateSibling && (translateSibling.id === 'google_translate_element' || translateSibling.className.includes('translate'))) {
      translateWidgetHTML = translateSibling.outerHTML;
    }
    existingFooter.style.display = 'none';
  }

  const footerHTML = `
    <footer id="su-footer">
      <div id="su-footer-grid">
        <div class="su-footer-brand">
          <h3>SETD5 Syndrome</h3>
          <span class="su-footer-tagline">Family Resources &amp; Guides</span>
          <a class="su-footer-email" href="mailto:info@setd5syndrome.com">info@setd5syndrome.com</a>
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
            <li><a href="suggest-a-resource.html">Contact / Suggest a Resource</a></li>
            <li><a href="sources-references.html">Sources &amp; References</a></li>
            <li><a href="terms-of-use.html">Terms of Use</a></li>
            <li><a href="share-your-story.html">Share Your Story</a></li>
          </ul>
        </div>
      </div>

      <div id="su-footer-translate">
        ${translateWidgetHTML || '<!-- translate widget -->'}
      </div>

      <div id="su-footer-bottom">
        <p>&copy; 2026 SETD5 Syndrome Resources</p>
        <div id="su-footer-bottom-links">
          <a href="index.html">Home</a>
          <a href="terms-of-use.html">Terms of Use</a>
          <a href="sources-references.html">Sources &amp; References</a>
          <a href="suggest-a-resource.html">Contact</a>
        </div>
      </div>

      <p id="su-footer-disclaimer">
        Content on this site is for informational purposes only and does not constitute medical, legal, or educational advice.
        Always consult qualified professionals for guidance specific to your situation.
      </p>
    </footer>
  `;

  const footerEl = document.createElement('div');
  footerEl.innerHTML = footerHTML;
  document.body.appendChild(footerEl.firstElementChild);


  /* ─── 5. HOMEPAGE INTRO DEDUP ───────────────────────────────────────── */
  // The hero already says "built by a parent / plain-language" — replace the
  // intro section text so it doesn't repeat the same message.
  if (pathname === 'index.html' || pathname === '' || pathname === '/') {
    document.querySelectorAll('p, div').forEach(el => {
      if (el.children.length > 0) return; // skip containers, text nodes only
      const t = el.textContent.trim();
      if (
        t.includes('built by a SETD5 Syndrome parent') ||
        t.includes('Built by a parent, for families like ours')
      ) {
        el.textContent = 'A helpful companion for families navigating a SETD5 Syndrome diagnosis.';
      }
    });
  }

})();
