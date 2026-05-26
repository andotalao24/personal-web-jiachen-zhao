# Design Document — Jiachen Zhao's Personal Homepage

## 1. Project description

This project is the personal academic homepage of Jiachen Zhao, a PhD student at
Northeastern University. It is a small, hand-written static website (plain HTML,
CSS, and a single ES module of vanilla JavaScript) — no Jekyll, no framework, no
build step beyond optional formatters.

**Goals**

- Make recent publications, research projects, and contact information easy to
  find for visitors who land on the page from arXiv, social media, or a search
  for the author.
- Keep the site small enough that the author can maintain it by hand —
  publications are added by editing a single `<li>` block in `index.html`.
- Demonstrate the course's required practices: ES6 modules, separated
  CSS/JS/images folders, semantic HTML, meta tags, Prettier formatting, ESLint,
  W3C-valid markup, and at least one piece of original interactive JavaScript.

**Non-goals**

- No CMS, no analytics, no comments.
- No login, no server, no database — the site is fully static and is served by
  GitHub Pages.
- No heavy design system; visual style is intentionally restrained so the
  content (papers, projects) leads.

**Tech stack**

| Layer       | Choice                                                   |
| ----------- | -------------------------------------------------------- |
| Markup      | Hand-written HTML5                                       |
| Styling     | Plain CSS with custom properties, flexbox, and CSS grid  |
| Interaction | One ES module: a publication filter (year + text search) |
| Hosting     | GitHub Pages (`andotalao24/andotalao24.github.io`)       |
| Dev tooling | Node.js (Prettier + ESLint as devDependencies)           |

---

## 2. User personas

### Persona A — _Priya, the prospective collaborator_

- **Age / role:** 32, senior PhD student at another university working on LLM
  interpretability.
- **How she arrives:** Clicks the author's name from an arXiv paper she just
  finished reading.
- **What she wants:** To check whether the author has other relevant work
  before reaching out, and to find a contact channel.
- **Frustrations:** Academic pages that bury publications under three menu
  levels; broken PDF links; sites that don't load on her phone in transit.
- **Success looks like:** Lands on the homepage, sees a recent-first
  publication list within one scroll, clicks one PDF, then opens email.

### Persona B — _David, the recruiter / industry reader_

- **Age / role:** 45, hiring manager at an AI lab.
- **How he arrives:** Internal Slack share — "look at this person".
- **What he wants:** A 30-second snapshot — current institution, advisor,
  research focus, and a sense of seniority.
- **Frustrations:** Walls of text; no clear "who is this person" line near the
  top; missing résumé.
- **Success looks like:** Reads the one-paragraph bio, scans the venues in the
  publication list (ICML, NeurIPS, ACL, EMNLP), and closes the tab with a
  formed opinion in under a minute.

### Persona C — _Mei, the curious friend_

- **Age / role:** 26, a friend from undergrad with no ML background.
- **How she arrives:** Direct link from the author.
- **What she wants:** To see something personal — what kind of work, what does
  the author care about beyond research.
- **Frustrations:** Pages that read like a CV in plain Times New Roman.
- **Success looks like:** Skims the bio, clicks "Photos" out of curiosity,
  enjoys the Tadao Ando gallery with hover captions, leaves with a sense of
  the person.

---

## 3. User stories

> **Format:** Each story is written as a short narrative from the persona's
> point of view, followed by the specific page interactions that make it work.

### Story 1 — Priya looks for related work

> _"I just finished reading the 'LLMs Encode Harmfulness and Refusal Separately'
> paper. I want to know if this author has written more about safety
> mechanisms in LLMs — or if this is a one-off. I open their site on my phone
> while waiting for coffee."_

- She lands on `index.html`. The bio paragraph immediately tells her the
  author works on post-training and emergent behaviour.
- She scrolls past the bio to the **Publications** section.
- She types **"safety"** into the search box — no exact matches, so she tries
  **"unsafe"** — the page collapses to just _"Learning and Forgetting Unsafe
  Examples in Large Language Models"_ (ICML 2024). The headings for empty
  years disappear, so she doesn't have to scroll past them.
- She clicks the **[pdf]** link, reads the abstract, then taps back, clears
  the search, and clicks the **2025** year filter to see what's current.

### Story 2 — David triages a candidate

> _"Someone in Slack said 'check this person out'. I have a meeting in five
> minutes. I just need a vibe check."_

- The page loads instantly (no framework, ~30 KB total).
- The header — name, "PhD student, Northeastern University", and avatar —
  answers _who_ in the first two seconds.
- The bio paragraph answers _what they work on_ in the next ten.
- The publication list, grouped by year with venue tags ("NeurIPS 2025",
  "ICML 2024"), answers _are they serious_ in the next twenty.
- He closes the tab without clicking anything, satisfied.

### Story 3 — Mei wants to see the person behind the papers

> _"I have no idea what 'in-context learning' is, but I want to see what
> they've been up to. The 'Photos' tab in the menu catches my eye."_

- She clicks **Photos (AI-generated)** in the top nav.
- The page shows a tidy grid of six buildings by Tadao Ando.
- She hovers over the Church of the Light card; a dark gradient slides up and
  the caption appears: _"A cruciform slit in the concrete wall lets daylight
  pour through, turning sunlight itself into the altar."_
- She hovers over a few more, smiles, and forwards the link to her partner.

### Story 4 — Priya wants more depth on a project

> _"The bio mentioned 'continual learning' but I want to see if there's a more
> detailed project description anywhere."_

- She clicks **Research Projects** in the top nav.
- The page lists five projects with dates, supervisors, and 2–3 bullet points
  each — enough context to decide which to ask about.
- She copies the project title and pastes it into her draft email.

---

## 4. Design mockups

> Wireframes are shown as ASCII boxes — they are intentionally rough to focus
> on layout and information hierarchy rather than visual polish. The
> implemented site follows these layouts exactly.

### 4.1 Homepage (`index.html`) — desktop

```
-------------------------------
| nav: Home | Projects | Photos
-------------------------------
| [photo]  Name
|          one-line subtitle
|
| short bio paragraph
|
| Publications
| [ search box ]  [year buttons]
|
| 2026
|  - paper 1
| 2025
|  - paper 2
| ...
-------------------------------
```

### 4.2 Component focus — publication filter interaction

```
Initial state:
   [ Search title or author... ]  [All*][2026][2025][2024][2023][2022]
   * = .active

   2026  • Can Aha Moments ...
   2025  • LLMs Encode Harmfulness ...
   2024  • Large Language Models are In-context Teachers ...
         • Learning and Forgetting Unsafe Examples ...
         • Multistage Collaborative Knowledge Distillation ...
         • Adaptive Fusion of Deep Learning ...
   ...

After typing "unsafe" in the search:
   [ unsafe                       ]  [All*][2026][2025][2024][2023][2022]

   2024  • Learning and Forgetting Unsafe Examples in LLMs

   (every other <h3> + <ul> hidden — empty year headings collapse)

After clicking [2026]:
   [                              ]  [All][2026*][2025][2024][2023][2022]

   2026  • Can Aha Moments Be Fake? ...
```

---

## 5. Information architecture

```
/                       index.html          (about + publications + service)
/projects.html          projects.html       (research projects)
/photos.html            photos.html         (Tadao Ando gallery, hover captions)
/files/*.pdf            static PDF files    (linked from publications)
/images/                static images       (avatar, favicon)
```

Navigation is a single horizontal bar present at the top of every page. The
current page is marked with `.active`. There is no deeper menu hierarchy by
design — the site is intentionally shallow.

---

## 6. Design choices and trade-offs

| Decision                                       | Reasoning                                                                                                                                          |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Plain HTML over Jekyll / static-site generator | The site has three pages and a single author. A build step would cost more than it saves.                                                          |
| One stylesheet, no framework                   | The page is under 30 KB total. Bootstrap or Tailwind would multiply that for very little visual gain.                                              |
| Filter as ES module, not jQuery / React        | Course requires ES6 modules; vanilla JS is enough for ~40 lines of DOM toggling.                                                                   |
| Hover-only captions on photos                  | The page is decorative — moving the caption out of view by default keeps the grid clean. `:focus-within` mirrors the behaviour for keyboard users. |
| Year filter buttons as real `<button>`         | Rubric explicitly forbids `<div>` buttons; real `<button type="button">` also gives free keyboard support.                                         |
| `data-title` / `data-authors` on each `<li>`   | Pre-computing the search corpus in attributes keeps the JS trivial and lets the filter run with no allocation per keystroke.                       |
| Wikimedia Commons for photos                   | Stable URLs (`Special:FilePath`), permissive licences, and no need to commit binary blobs to the repo.                                             |
| Mobile breakpoint at 560 px                    | Single column profile + wrapping year-button row covers every phone width in active use.                                                           |

---

## 7. Accessibility notes

- Every `<img>` has descriptive `alt` text.
- The publication search input has an explicit `aria-label`.
- Year filters are real buttons, so they receive focus and respond to
  Enter/Space.
- Photo captions also appear on `:focus-within`, so keyboard users can reveal
  them without a pointer.
- Page contrast: foreground `#222` on background `#fff`, link colour `#2a6df4`
  on white — both above WCAG AA at body text size.
