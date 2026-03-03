# Compact Header Restore Guide

**Restore keyword:** say `RESTORE COMPACT HEADER` to bring back the collapsing sticky header on all pages.

---

## What the compact header did

Every page (except index.html) had a sticky header that:
- Showed full height on page load — eyebrow breadcrumb, large title, italic subtitle
- After scrolling **60px down**, smoothly collapsed to a slim title-only bar
- Scrolling back to the top restored the full header
- Had a subtle drop shadow when compact

---

## CSS to add to each page (inside `<style>`)

For pages using `.site-header`:

```css
/* ── COMPACT STICKY HEADER ── */
.site-header { transition: box-shadow 0.3s ease; }
.site-header.compact { box-shadow: 0 2px 12px rgba(0,0,0,0.25); }
.header-inner { transition: padding 0.3s ease; }
.compact .header-inner { padding: 12px 32px 10px; }
.header-eyebrow {
  transition: opacity 0.2s ease, max-height 0.3s ease;
  max-height: 80px; overflow: hidden;
}
.compact .header-eyebrow { opacity: 0; max-height: 0; margin-bottom: 0; }
.header-title { transition: font-size 0.3s ease, margin-bottom 0.3s ease; }
.compact .header-title { font-size: 1.15rem; margin-bottom: 0; }
.header-subtitle {
  transition: opacity 0.2s ease, max-height 0.3s ease;
  max-height: 150px; overflow: hidden;
}
.compact .header-subtitle { opacity: 0; max-height: 0; margin-top: 0; }
```

---

## JS to add to each page (before `</body>`)

For pages with **no sub-bar** (most pages):

```html
<script>
(function() {
  var header = document.querySelector('.site-header') || document.querySelector('header');
  if (!header) return;
  window.addEventListener('scroll', function() {
    header.classList[window.scrollY > 60 ? 'add' : 'remove']('compact');
  }, { passive: true });
})();
</script>
```

For pages with a **sub-bar** (medical terms `.sticky-nav`, newly diagnosed `.tab-nav`, disability discounts `.tab-nav`):

```html
<script>
(function() {
  var header = document.querySelector('.site-header') || document.querySelector('header');
  var subBar = document.querySelector('.sticky-nav') || document.querySelector('.tab-nav');
  if (!header) return;

  function updateSubBar() {
    if (subBar) subBar.style.top = header.offsetHeight + 'px';
  }

  window.addEventListener('load', updateSubBar);
  updateSubBar();

  window.addEventListener('scroll', function() {
    header.classList[window.scrollY > 60 ? 'add' : 'remove']('compact');
    updateSubBar();
  }, { passive: true });
})();
</script>
```

---

## Pages with sub-bars

| Page | Bar selector | Bar color |
|------|-------------|-----------|
| `setd5-medical-terms-guide.html` | `.sticky-nav` (contains `.alpha-bar`) | `#2a627a` |
| `setd5-newly-diagnosed-guide.html` | `.tab-nav` | `#2a627a` |
| `disability-discounts-guide.html` | `.tab-nav` | `#2a627a` |

---

## Pages excluded from compact behavior

- `index.html` — home page has no sticky header at all (scrolls normally)
