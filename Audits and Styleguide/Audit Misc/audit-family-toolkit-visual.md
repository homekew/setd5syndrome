# Visual Design Audit — family-toolkit.html

**Audited:** March 9, 2026
**Page:** https://setd5syndrome.live/family-toolkit.html
**Context:** Parent-created informational site for SETD5 Syndrome families. Goal: compassionate, trustworthy, clear, calm, polished, engaging.

---

## 1. Overall Visual Impression

The Family Toolkit is one of the stronger pages on the site. It makes a solid first impression: the navy header with the Lora serif title feels authoritative and warm, the sticky section nav gives immediate orientation, and the card grid communicates "there's a lot here for you" without overwhelming.

That said, the page settles into a **single visual rhythm** very quickly — card grid after card grid on the same cream background — and never breaks out of it. After the first section, every subsequent section looks nearly identical: a small uppercase label, then a 3-column card grid. The eye has no reason to slow down, pause, or be drawn to anything in particular. It's organized but monotonous.

**Honest verdict:** Clear and trustworthy, but visually repetitive. A 6.5/10 page that could be an 8 with relatively modest changes to rhythm and contrast.

---

## 2. Strongest Design Elements

- **Header:** The navy-to-teal radial gradient background is the best element on the page. It feels polished and immediately signals credibility. The Lora serif title with the italic "Toolkit" in muted teal is elegant.
- **Collapsing header behavior:** The smooth transition to a compact sticky header on scroll is excellent UX. It preserves context without eating vertical space.
- **Card design fundamentals:** White cards on cream, subtle box-shadow, colored top accent bar, rounded corners, hover lift — these are solid, modern card patterns.
- **Section nav (sticky tabs):** The teal tab bar with amber active underline provides clear wayfinding. Scroll-spy highlighting is a thoughtful touch.
- **CTA links with icons:** Each card's bottom link (e.g., "View Guide →", "Open Builder →") with an inline SVG icon is clean and consistent.
- **Section labels with rule line:** The uppercase label + horizontal rule pattern is a clean, minimal section separator.
- **Typography pairing:** Lora for card headings + Inter for body text is a strong, readable combination.

---

## 3. What Feels Boring, Plain, Repetitive, or Visually Weak

### The entire page below the header is one unbroken cream (#faf7f2) background
This is the single biggest visual problem. Every section — Community, Tools, Guides, Reference — sits on the same cream surface with no visual differentiation. There are no alternating background bands, no subtle color shifts, no section-level contrast. Compare this to the recently redesigned qualifying-for-services.html, which alternates cream → white → cream and uses full-width content bands. The toolkit page feels flat by comparison.

### Every section is a card grid with identical structure
Community: 3 cards in a row. Tools: 3 cards in a row. Guides: 3 cards in a row. Reference: 2 cards in a row. The pattern never varies. There's no callout box, no featured/hero card, no pull quote, no visual break between sections. The page reads like a catalog rather than a curated toolkit.

### Card accent colors don't create enough contrast
The colored top bars (amber, teal, deep blue, sage, purple) are only 4px tall. At that thickness, the color differentiation between sections is barely noticeable. The cards themselves are all identical white with the same border, shadow, and padding — the tiny accent bar isn't doing enough work to distinguish categories.

### No imagery, illustrations, or visual anchors anywhere
The entire page is text + white rectangles. There are no icons in card headers, no illustrations, no decorative elements beyond the SVG link icons at the bottom of each card. For a page called "Family Toolkit" — which should feel warm and inviting — the absence of any visual warmth beyond typography is noticeable.

### The "Suggest a resource" CTA at the bottom is easy to miss
It's a single line of text with a teal left border, sitting alone at the bottom. It looks like an afterthought rather than an invitation.

### Section labels feel too small and too separated from their content
The 12px uppercase labels with the horizontal rule are functional but visually wispy. They don't create enough of a visual "event" to signal that a new category is starting.

---

## 4. Visual Hierarchy

**What draws attention first:** The header — correctly. The title "Family Toolkit" and the subtitle communicate purpose immediately.

**What draws attention second:** The teal section nav. Also correct — it tells you what categories exist.

**What gets lost:**
- The distinction between sections. As you scroll past the nav, Community flows into Tools flows into Guides with nothing to visually mark the transitions beyond a small label. The scroll-spy in the nav helps, but the page itself doesn't reinforce the category change.
- Individual card importance. All 11 cards have equal visual weight. If "SETD5 Syndrome: At a Glance" is the single most important resource for a newly diagnosed family, nothing about its presentation signals that.
- The "Suggest a resource" CTA. It reads as a footnote.

**What should stand out more:**
- A "Start Here" or featured card for the At a Glance handout
- The transition from one section to the next
- The bottom CTA

---

## 5. Layout and Spacing

- **Card grid gap (1.5rem / 24px):** Good. Not too tight, not too loose.
- **Section bottom margin (4rem / 64px):** Appropriate separation between sections.
- **Card internal padding (2rem 1.75rem 1.75rem):** Comfortable. Cards don't feel cramped.
- **Main content max-width (860px):** Consistent with other pages. Good.
- **The space between the section label and first card row** feels slightly large. The label's `margin-bottom: 1.5rem` could be tightened to 1rem to make the label feel more connected to its cards.
- **On mobile (390px):** Cards stack to single column correctly. Spacing feels appropriate. No horizontal overflow issues. The section nav tabs all fit without truncation. Mobile layout is solid.
- **Desktop 3-column grid** works well for 3 cards, but the Reference section with only 2 cards leaves an awkward empty third column space. Consider making those 2 cards wider (2-column grid for that section, or full-width cards).

---

## 6. Typography

- **Card headings (Lora 22px, weight 400):** Beautiful. The serif at this size feels warm and readable without being heavy.
- **Card body text (Inter 16px, color #6b6b6b):** Readable, but the muted gray (#6b6b6b) is slightly low-contrast against white cards. This is borderline for WCAG AA — the contrast ratio is approximately 4.9:1, which passes, but just barely. Consider darkening to #555 or #4a4a4a for better comfort reading.
- **CTA link text (Inter 15.5px, amber):** Legible and consistent.
- **Section labels (Inter 12px, weight 600, uppercase):** Functional but could be slightly larger (13px) to feel less fragile.
- **Line length:** At max-width 860px with 3 columns, card text lines are short enough to be comfortable (roughly 35–45 characters per line in cards). Good.
- **Paragraph density in cards:** Each card has 2–3 lines of description text. This is ideal — enough to explain without overwhelming.

---

## 7. Color and Emotional Tone

The color palette is cohesive and emotionally appropriate. The cream background, navy header, teal accents, and amber highlights create a warm, earthy, trustworthy feel. Nothing feels clinical, harsh, or corporate.

**What works:**
- Navy + cream is a strong, grounded combination
- The teal (#2a7a6a) feels calm and natural
- Amber (#c9893a) as an accent is warm without being aggressive
- The overall palette avoids the cold blues and sterile whites that make medical sites feel institutional

**What could improve:**
- The cream background is used so uniformly that it starts to feel like "no background" rather than a deliberate design choice. Introducing alternating white (#ffffff) bands for some sections would make the cream feel more intentional.
- The card accent bar colors (amber, teal, deep, sage, purple) are a nice idea but they're so thin (4px) that they don't contribute much warmth. Thickening them to 5–6px or adding a subtle tinted background to cards by section would strengthen the color story.
- The muted text color (#6b6b6b) on card descriptions makes the content feel slightly washed out. Darkening it would add visual weight without losing the calm tone.

---

## 8. Navigation and Calls to Action

- **Sticky section nav:** Excellent. The four categories (Community, Tools, Guides, Reference) are clear and the scroll-spy highlighting works well. The teal background with white text and amber active underline is visually clean.
- **Card CTAs ("View Guide →", "Open Builder →"):** These are well-styled — amber text with an SVG icon and arrow. They're consistent across all cards. They could benefit from a slightly bolder treatment on hover (e.g., underline or background highlight) to feel more clickable.
- **"Suggest a resource" CTA:** This is the weakest call to action on the page. It's styled as a plain text line with a left border. If you want families to actually suggest resources, it needs more visual presence — perhaps a full-width card or a styled banner with a background color.
- **Back link ("← SETD5 SYNDROME RESEARCH & RESOURCES"):** Functional but visually fights with the Google Translate widget in the top-right on smaller screens.

---

## 9. Section-by-Section Visual Improvement Suggestions

### Header
Currently strong. No major changes needed. One small improvement: add a very subtle bottom border or shadow to the collapsed header state to give it more separation from the page content below.

### Community Section
- Consider making the first card ("Share Your Story") a **featured card** — wider than the other two, perhaps spanning 2 columns with a different background tint (e.g., amber-lt). Personal stories are emotionally powerful and deserve visual emphasis.
- Add a 1-sentence intro line below the section label: *"Connect with other SETD5 families."* This would make the transition from nav to content feel less abrupt.

### Tools Section
- This is the most action-oriented section and should feel visually different from the informational sections. Consider giving it an alternating white background band to visually separate it from Community above.
- The "At a Glance" handout is arguably the single most useful resource for newly diagnosed families. Consider giving it a "Start Here" badge or a slightly different card treatment (e.g., a sage or amber background tint).

### Guides Section
- These three guides are the meatiest content on the site. Consider adding a small tag or badge on each card (e.g., "In-depth guide" or an estimated reading time) to signal that these are substantive resources, not just links.
- An alternating background (cream vs. white) starting here would break up the visual monotony.

### Reference Section
- The 2-card layout leaves dead space on the right. Either make these cards wider (use `grid-template-columns: repeat(2, 1fr)` explicitly) or add a third card placeholder/CTA card.
- Consider a different visual treatment for reference/glossary cards vs. guide cards — perhaps a more compact card style with a different icon treatment.

### Suggest a Resource CTA
- Upgrade from a text line to a full-width styled banner. Use a sage or amber background with centered text. Something like: "Have an idea for a resource? We'd love to hear it." with a visible "Suggest →" button.

### Footer
- The footer is minimal and appropriate. The "Made with ❤️" line is a warm touch. No changes needed.

---

## 10. Top 10 Highest-Impact Visual Improvements

1. **Add alternating section backgrounds.** Alternate cream and white bands for each section (Community on cream, Tools on white, Guides on cream, Reference on white). This is the single biggest improvement — it breaks the visual monotony and creates section identity. *This pattern is already in use on qualifying-for-services.html.*

2. **Feature the "At a Glance" card.** Give it a hero treatment — wider, with a colored background tint and a "Start Here" badge. Newly diagnosed families need to see this immediately.

3. **Thicken card accent bars to 5–6px.** The current 4px is too subtle. A slightly thicker bar would make the color coding more visible and add warmth.

4. **Add 1-line section intros below section labels.** A brief sentence under each label (e.g., "Build handouts tailored to your child" under Tools) would make sections feel more curated and less like a flat index.

5. **Upgrade the "Suggest a resource" CTA to a styled banner.** Give it a background color, center the text, and add a real button or link treatment.

6. **Darken card description text from #6b6b6b to #555.** Improves readability and makes card content feel less washed out.

7. **Add subtle card header icons.** A small icon (document, people, wrench, book) above or beside each card title would add visual variety and help users scan the grid faster. These could be simple SVGs matching the existing link icon style.

8. **Fix the Reference section 2-card layout.** Either constrain it to a 2-column grid or add a "More coming soon" placeholder card to fill the gap.

9. **Add a subtle hover background tint to CTA links.** Currently the amber text links change color on hover but lack a visual "button feel." A light amber background on hover would improve clickability.

10. **Add a collapsed-header bottom shadow.** When the header collapses on scroll, add `box-shadow: 0 2px 8px rgba(0,0,0,0.08)` to the collapsed state to create better separation from page content.

---

## 11. Final Score

| Criterion | Score | Notes |
|---|---|---|
| Visual appeal | 6.5 / 10 | Clean and functional but repetitive; the unbroken cream background and identical card grids reduce visual interest |
| Warmth | 7.5 / 10 | The color palette and typography are warm; the lack of imagery or visual variety keeps it from feeling truly inviting |
| Trustworthiness | 8 / 10 | Strong. The navy header, professional typography, and clean card layout communicate credibility |
| Clarity | 8.5 / 10 | Very clear. Categories are well-organized, cards are scannable, CTAs are obvious |
| Modern feel | 7 / 10 | The card grid + sticky nav + hover effects feel current, but the flat single-background layout and lack of section contrast feel dated |
| Engagement | 6 / 10 | Nothing on the page surprises, invites exploration, or creates visual momentum. It's informative but static |

**Overall:** 7.25 / 10 — A solid, trustworthy page that does its job but doesn't create excitement or visual warmth. The bones are good. The card design, typography, and color palette are all working. The weakness is entirely in **rhythm and variation** — the page needs alternating backgrounds, featured elements, and section-level contrast to match the quality of the recently redesigned qualifying-for-services.html.
