# Content triage & sitemap decision — 2026-07-16

Multi-agent triage of all source material (`context/`) against the site's primary goal.
Pipeline: atomize (60 atoms) → 4 audience lenses judge every atom → 3 independent IA proposals → 3-dimension judge panel → completeness critic.

**Primary goal (user-decided):** grow the year-round community. Conference = acquisition hook; "join the community" = north-star conversion.
**Audiences:** prospective member/attendee · sponsor/partner · prospective speaker · skeptical newcomer.

---

## 1. Triage result

| Verdict | Count | Meaning |
|---|---|---|
| Essential | 22 | An audience needs it to act |
| Trust | 28 | Builds credibility/belonging that de-risks acting |
| Archive | 7 | True, fine internally — publishing adds noise |
| Cut | 3 | Actively harms conversion as written |

### The 3 cuts (all four lenses agreed on the first two)

1. **`challenge-microsoft-dependence`** — "dependent on providers with unethical business practices (i.e. Microsoft)". Cut by all 4 lenses: defamation-adjacent, alienates sponsors on Azure/M365 and members who build careers on big-tech stacks.
2. **`challenge-platform-censorship-palestine`** — "Platforms censor voices — pro-Palestinian narratives are suppressed". Sponsor/speaker/skeptic cut. The *theme* survives via the vision doc's sober wording (`claim-platform-influence`: platforms have significant influence over information flow and narratives).
3. **`principle-prop2-faith-collective-action`** — "…preventing tragedies like Gaza through coordinated technological solutions". Overclaim no tech community can honour; undermines the five careful propositions beside it. Gaza-as-motivation survives in sober form (`claim-motivation-gaza`, trust verdict).

> These are positioning calls, not copyedits — final say is the user's. See §5 question log.

### Copy defects found in source material (fix before any publication)

- `value-serving-ummah-humanity` — sentence is grammatically broken/self-repeating as written.
- `goal-opportunities-bridges` — typo "communites".
- `mission-*` — **three different mission statements** exist across the docs; publishing more than one signals the org hasn't settled what it is. Canonical pick: `mission-vision-statement` (vision-doc wording).
- `history-2025-soil` — written in present tense about 2025; published in 2026 it reads as an abandoned site.
- Mixed US/UK spelling throughout ("organizations"/"organisations", "Benefitting").

### Live homepage bugs the lenses flagged (independent of any new page)

- **"Get Tickets" routes to the contact form while sales aren't open** — every lens called this the most trust-damaging pattern on the site. Fix: relabel "Tickets open soon — register interest" (zero-build copy change), ideally feeding an email-notify list.
- **Speaker cards literally say "Speaker Name"** — placeholder names next to real faces on the primary conversion surface reads as fabricated social proof.

---

## 2. Sitemap proposals & scores

Three architects, deliberately different biases; judged on 3 dimensions (1–10).

| Proposal | Routes | Conversion | Sufficiency | Pragmatics | Total |
|---|---|---|---|---|---|
| **A — Minimalist funnel** | Home + `/community` + `/partner` | **8** | **9** | **9** | **26** |
| B — Team nav, sharpened | Home + `/events` + `/partner` + `/about` + `/community` + `/privacy` | 7 | 5 | 4 | 16 |
| C — Movement-first | Home + `/community` + `/conference` + `/partner-with-us` + `/about` | 6 | 7 | 5 | 18 |

**Why A wins:**
- *Conversion:* all non-sponsor traffic gets exactly one destination; the legitimacy story terminates at the join CTA on the same scroll; only proposal that explicitly de-risks the join mechanics at the moment of action.
- *Sufficiency:* only 2 of 15 sections lack source content today (team bios, partnership offer) — both get honest interim copy, not padding. B spreads ~45 usable atoms across 6 routes (6 empty sections, whole pages of not-yet-written content).
- *Pragmatics:* two fixed-section JSON pages clone the proven `home.json` pattern (zod mirror, safe CMS form editing); nothing structurally breaks on 8 Nov 2026. B and C both rebuild the homepage's ticket-conversion job on a second page that must be kept in lockstep.

**Strongest objection to A (steelman for B):** `/community` becomes a ~10-section mega-page absorbing the whole About job — ~21 philosophy/value atoms sit between the concrete "what's happening now" content and the join CTA. Mitigations: concrete-first section order, philosophy after, join CTA repeated mid-page; if it proves unwieldy, splitting `/about` out later is cheap in this architecture. Also: the team's own draft nav was B's 4-page shape — overriding a team decision has organisational cost; confirm with the team.

**Grafts from the losing proposals (adopt regardless):**
- (B) Button-styled **"Join the Community" nav CTA → `/community`** — persistent north-star ask on every page; never deep-link the WhatsApp group from nav.
- (B) The zero-build **"Get Tickets" relabel** fix, immediately.
- (C) **Dead ticket intent → newsletter capture** ("get notified when sales open") — converts months of pre-sales intent into an owned channel.
- (C) **Roadmap quarantine** — all `goal-*` atoms live under an explicit "Where we're heading" framing so aspirations never read as current offerings.

**Recommendation: A + grafts.** Confidence high vs B/C for the community-growth goal; medium on exact section composition (depends on what retrieval below turns up).

---

## 3. Retrieval list (send to the team / dig from the cut pile)

Prioritised by conversion impact. This is the answer to "what information is relevant" — these are the things NO current document provides.

| # | What | Why | Where it likely lives |
|---|---|---|---|
| 1 | **Real names/roles of the 2025 speakers** | Placeholders are live on the homepage today | 2025 programme, photos, LinkedIn, organisers' memory |
| 2 | **WhatsApp community facts** — member count, cadence, typical content, norms | It's the product the north-star conversion sells; nobody joins a black-box group chat | The group itself + team |
| 3 | **Organiser names, faces, short bios + legal entity** (NPC/NPO? PBO/18A?) | #1 gap for skeptic AND sponsor: anonymous movements read as vaporware; funders can't do due diligence | Team; entity paperwork |
| 4 | **Hard numbers 2024/2025** — attendance, talks, audience composition | Core of the sponsor value prop; one real number outweighs paragraphs of vision copy | Ticketing exports, debriefs |
| 5 | **2025 edition confirmation** — date, city, programme, recordings? | Homepage says "last year's speakers" but no doc states the 2025 event happened | 2025 promo material |
| 6 | **Event photos / recap** from 2024–2025 | All history copy was written *before* the events; nothing proves execution | Photographer folder, phones, partners' socials |
| 7 | **True 2026 ticket state** — open? when? platform? interest list? | Fixes the most scam-like pattern on the site | One question to the team |
| 8 | ~~**Sponsorship offer**~~ **RETRIEVED 2026-07-18** — `working/source-docs/Ummah Tech-Strategic-Partner-Proposal.pdf` (2024 deck): 3 tiers (Platinum–Headline R150k / Gold–Partner R50k / Silver–Exhibitor R5k) + full benefit matrix + audience description. Also closes the legal-entity half of #3: **Ummah Tech NPC 2024/095025/08**. User decisions: publish tiers + benefits **without prices** (prospectus on request); **publish the NPC number**. | — | — |
| 9 | **Named partnership contact** (person + direct email) | Routing funding conversations through a shared web form signals immaturity | Team decision |
| 10 | **Roundtable evidence** — dates/topics actually held + next date before Nov 2026 | The "movement not just a conference" thesis has one unevidenced atom behind it; flagship is 16 months out | WhatsApp history, team |
| 11 | **One concrete outcome story** — collaboration/project/hire from the community | "Ideas grow into solutions" is claimed, never evidenced | Ask organisers / the group |
| 12 | **Who-is-welcome statement** — students, juniors, non-coders, women, all levels | "Technologists, founders, creatives" reads elite; uncertainty at the join moment kills conversion | Positioning decision → write fresh |
| 13 | **Testimonials** — one partner quote (Ashraful Aid / Awqaf SA), 1–2 attendee/speaker quotes | Everything current is self-description; peer testimony is the strongest de-risker | Request; feedback forms in cut pile |
| 14 | **CFP mechanics** — topics, formats, deadlines, selection, logistics/honorarium | Accomplished speakers won't apply through a generic form | Team decisions → draft fresh |
| 15 | **Origin story with a date** — when founded, who convened it, why | Answers the skeptic's "since when?"; nothing states the founding narrative | Team + early docs in cut pile |
| 16 | **Privacy note** for forms (POPIA-aware) | An org condemning data exploitation while collecting phone numbers with no privacy note reads hypocritical | Write fresh (one paragraph) |

Also flagged: the planned newsletter form **requires Phone Number** — data-hungry, POPIA-careless, conversion killer. Email-only (+ optional first name) is the fix.

---

## 4. Page skeletons (Proposal A, as designed)

### `/community` — The Ummah Tech Community
Audience: prospective members + skeptics. CTA: **Join the WhatsApp community** (email-only newsletter as low-commitment fallback).
Order is deliberate — concrete before philosophy:

1. A movement, not just a conference (mission-vision, movement framing)
2. What's happening now (roundtables, community activity) ← *retrieval #10*
3. The story so far (2024 event, 2025 conference, rotation JHB/CT) ← *retrieval #5, #6*
4. Who's behind Ummah Tech ← *retrieval #3 — honest interim: names pending*
5. Why we exist (sober challenges: algorithms & faith, big-tech influence, the two urgent questions)
6. What we believe (5 surviving core propositions + prophetic market of Medina + Qur'an 5:2)
7. Our values (6 values, copyedited)
8. Where we're heading (goal atoms under explicit roadmap framing)
9. Who's welcome — and how joining works ← *retrieval #2, #12*
10. Join us (CTA)

### `/partner` — Partner With Us
Audience: sponsors/partners. CTA: **Start a partnership conversation.** Politically sanitised by design.

1. Why partner with Ummah Tech (mission + audience framing)
2. The audience and track record ← *retrieval #4, #5, #6*
3. Our current partners (logos; testimonial slot ← *retrieval #13*)
4. What partnership looks like ← *retrieval #8 — honest interim: "partnerships are tailored — talk to us"*
5. Start the conversation ← *retrieval #9*

### Deferred (build when content exists)
- `/events` archive — after Nov 2026, or when 2024/25 recap material is retrieved
- CFP page — when retrieval #14 decisions are made
- `/about` split — only if `/community` proves unwieldy

---

## 5. Decision log

- 2026-07-16 — Primary goal set by user: year-round community growth (conference = hook).
- 2026-07-16 — Sensitive content: **user decided — keep the sharp versions** (censorship bullet, Gaza framing, big-tech critique published as written; overrides the lens recommendation). Open flag: the Microsoft naming specifically is defamation-adjacent — legal exposure, not just positioning.
- 2026-07-16 — IA: **decided (user)** — team nav `Home | Events | Partner With Us | About` plus an events collection using the **area-hub model**: `/events` index → `/events/<area>` standing hub pages (Johannesburg, Cape Town) listing all upcoming events there; only main events (annual conferences) get full pages (`/events/ummah-tech-2026`, past recaps for 2024/2025). About is standalone (mission, values, story, team) and carries the join CTA; no separate /community page.
- Build constraints inherited from the judges' objections to this shape: (1) event pages must not duplicate the homepage's ticket-conversion job — homepage stays the campaign front door; (2) content stretches thin across 6+ routes — retrieval list §3 is now load-bearing, honest-interim copy where material is missing; (3) the north-star join conversion has no dedicated page — mitigate with a prominent join CTA on About, the footer, and ideally a nav-level button.

*Full atom-by-atom verdicts appended below. Raw workflow JSON: scratchpad (session-temporary).*

---

## Appendix: all 60 atoms with per-lens verdicts

| Atom | Kind | Member | Sponsor | Speaker | Skeptic | Overall | Content |
|---|---|---|---|---|---|---|---|
| `activity-create-spaces` | activity | ess | trust | trust | trust | **ess** | "We create spaces where Muslim technologists, founders, and creatives can come together to share ideas, learn from one another, and develop … *(on homepage)* |
| `activity-roundtables` | activity | ess | trust | trust | trust | **ess** | Roundtable discussions are held alongside/beyond the conference — evidence of year-round activity beyond the flagship event. |
| `claim-2024-audience-talks` | claim | trust | trust | ess | arch | **ess** | Conference audience and format: "attendees ranging from tech entrepreneurs to seasoned professionals"; the event provides "thought-provoking… |
| `claim-2026-event` | claim | ess | ess | ess | ess | **ess** | Next conference: Ummah Tech Conference, 7 November 2026, Johannesburg, South Africa — 'Save the Date for 2026'. *(on homepage)* |
| `claim-partners-showcase` | claim | trust | ess | trust | ess | **ess** | Content block: 'Our Partners' — logos of partner organisations (legitimacy/social-proof block; built homepage names Ashraful Aid as headline… *(on homepage)* |
| `cta-newsletter-signup` | cta | ess | arch | arch | ess | **ess** | Planned newsletter signup block with fields: Email Address*, First Name*, Last Name*, Phone Number*, LinkedIn Profile. (Key IA signal: newsl… |
| `cta-participate-speaker-volunteer-partner` | cta | trust | ess | ess | trust | **ess** | Participation pathways: interested individuals can apply as speakers, volunteers, or partners through provided contact methods. *(on homepage)* |
| `cta-tickets` | cta | ess | CUT | arch | CUT | **ess** | Ticket CTA — layout wording: "Ticket sales open soon" (built homepage currently says 'Get Tickets' linking to the contact form; note the wor… *(on homepage)* |
| `goal-inperson-events` | goal | ess | trust | arch | trust | **ess** | Long-term goal/activity 1: "Organize in-person events for networking, collaboration, education and inspiration." |
| `goal-online-offline-network` | goal | ess | trust | arch | trust | **ess** | Long-term goal/activity 2: "An online & offline network of technologists." |
| `goal-opportunities-bridges` | goal | ess | trust | arch | trust | **ess** | Long-term goal/activity 6: "Connect our members with opportunities and build bridges with other communites for collaboration." |
| `goal-sa-community` | goal | ess | trust | trust | trust | **ess** | "Our goal is to build a thriving community in South Africa that is focused on using technology to make a positive impact on society." (Expli… |
| `goal-upskilling-education` | goal | ess | trust | arch | trust | **ess** | Long-term goal/activity 3: "Upskilling, Education, Bridging the Digital Divide." (Vision doc version adds mentorship: 'Educational programs … |
| `history-2024-event-date` | history | trust | ess | trust | ess | **ess** | Initial event: a one-day technology conference held 23 November 2024 in Johannesburg (the first Ummah Tech Conference). |
| `history-speakers-showcase` | history | ess | ess | ess | ess | **ess** | Content block: last year's speakers shown with photos, names and titles (example title format: 'CEO: Cassava Technologies') — social proof o… *(on homepage)* |
| `mission-vision-statement` | mission | ess | trust | trust | ess | **ess** | Ummah Tech functions as a movement; its stated vision is to "encourage collaboration, innovation and upskilling amongst muslims in the techn… |
| `nav-site-structure` | nav | arch | ess | arch | arch | **ess** | Planned site navigation: Home - Events - Partner With Us - About. (IA signal: four top-level pages; 'Partner With Us' is a dedicated sponsor… |
| `principle-non-sectarian` | principle | ess | trust | trust | ess | **ess** | Guiding principle: the organization operates as non-sectarian. (Strong legitimacy/inclusivity signal for skeptical newcomers.) |
| `principle-prop1-collaboration` | principle | trust | trust | ess | trust | **ess** | Core Proposition 1 — Collaboration for the Good of the Ummah and Society: "Bringing the best minds, skills, and values-aligned people togeth… |
| `principle-prop3-tech-independence` | principle | trust | arch | ess | trust | **ess** | Core Proposition 3 — Technological Independence: "Striving for independence in technology to secure the Ummah's future. Asking: How can we g… |
| `principle-prop5-rethinking-progress` | principle | trust | arch | ess | trust | **ess** | Core Proposition 5 — Rethinking Progress: "We need to redefine progress beyond GDP and consumption — aligning it instead with Islamic values… |
| `principle-prop6-values-based-design` | principle | trust | trust | ess | trust | **ess** | Core Proposition 6 — Values-Based Technology Design: "Technology is not neutral. We must design and deploy it consciously, embedding Islamic… |
| `challenge-algorithms-faith` | challenge | trust | arch | trust | trust | **trust** | "Algorithms (incl. AI) are shaping behaviour, values, & even undermine faith and social cohesion." |
| `challenge-bigtech-displacement` | challenge | trust | CUT | trust | trust | **trust** | "Big Tech is displacing public institutions, and exploiting user data." |
| `challenge-question-humanity-not-profit` | challenge | trust | arch | trust | trust | **trust** | Urgent question posed: "How do we ensure technology serves humanity, not just profit?" |
| `challenge-question-independence` | challenge | trust | arch | trust | trust | **trust** | Urgent question posed: "How do we secure our independence?" |
| `challenge-unanticipated-consequences` | challenge | arch | arch | trust | arch | **trust** | "Unanticipated social and moral consequences of technology." |
| `claim-attend-connect` | claim | trust | arch | arch | arch | **trust** | Why attend: "Connect with a thriving network of peers that will inspire you to grow." *(on homepage)* |
| `claim-attend-learn` | claim | trust | arch | arch | arch | **trust** | Why attend: "Learn from industry experts and thought leaders." *(on homepage)* |
| `claim-conference-gathering` | claim | trust | trust | trust | arch | **trust** | The conference is "a gathering of founders, technologists and innovators to network and share knowledge." *(on homepage)* |
| `claim-conference-rotation` | claim | trust | trust | trust | trust | **trust** | The annual Ummah Tech Conference is the flagship event, usually takes place in November, and rotates between Johannesburg and Cape Town. (Ro… |
| `claim-motivation-cohesion` | claim | trust | arch | trust | trust | **trust** | Core motivation: Muslim technologists are numerous but sometimes lack organizational cohesion — Ummah Tech exists to organise them. |
| `claim-motivation-gaza` | claim | trust | arch | arch | trust | **trust** | Core motivation: recent events (the Gaza conflict) demonstrated both the challenges faced by Muslim tech professionals and the power of netw… |
| `claim-platform-influence` | claim | CUT | arch | trust | trust | **trust** | Core motivation: major tech platforms have significant influence over information flow and narratives. [General, sanitized counterpart of th… |
| `goal-content-creation` | goal | trust | arch | trust | arch | **trust** | Long-term goal/activity 4: "Content creation & production - Blog, Podcast, white-papers." |
| `history-2024-conference-purpose` | history | trust | trust | trust | trust | **trust** | Ummah Tech 2024 was "a conference designed to create a dynamic ecosystem for Muslim technologists, founders, and innovators to collaborate, … |
| `history-2025-soil` | history | trust | trust | trust | trust | **trust** | "Ummah Tech 2025 is more than a conference, it is designed to begin the conversations, and provide the 'Soil' from which beneficial projects… |
| `history-prophetic-market-medina` | history | trust | trust | trust | trust | **trust** | Prophetic lesson: the Prophet (peace be upon him) built an independent market in Medina to ensure ethical practices in business and Muslim i… |
| `mission-empower-by-ummah-for-all` | mission | trust | trust | trust | CUT | **trust** | "Our Mission is to empower and grow technology by the ummah, for all" (verbatim mission statement). |
| `mission-planting-seeds` | mission | trust | arch | arch | arch | **trust** | "At Ummah Tech, we believe in planting the seeds today to cultivate a future where technology serves the Ummah and all of humanity." (verbat… |
| `principle-madinah-constitution` | principle | arch | arch | trust | arch | **trust** | "Faith as the organising principle for civilisation (example: Constitution of Madinah)" — unique Why Ummah Tech bullet not covered by the si… |
| `principle-prop4-servant-leadership` | principle | trust | trust | trust | trust | **trust** | Core Proposition 4 — Servant Leadership for Humanity: "As the Ummah of the Prophet (peace be upon him), we are called to serve humanity, rec… |
| `scripture-quran-5-2` | scripture | trust | trust | trust | trust | **trust** | "Cooperate with one another in goodness and righteousness, and do not cooperate in sin and transgression. And be mindful of Allah. Surely Al… |
| `value-collaboration-empowerment` | value | trust | trust | trust | trust | **trust** | Collaboration & Empowerment — "We believe in the strength of unity, fostering relationships that empower individuals and organizations." |
| `value-connecting-serving` | value | trust | trust | trust | trust | **trust** | Connecting & Serving — "We are committed to bridging gaps, building networks, and serving the needs of the Ummah." (2024/2025 short form: 'C… |
| `value-creativity-innovation` | value | trust | trust | trust | trust | **trust** | Creativity & Innovation — "We encourage futuristic thinking, ensuring that Muslim technologists remain at the forefront of global tech advan… |
| `value-ethics-integrity` | value | trust | trust | trust | trust | **trust** | Ethics & Integrity — "We uphold Islamic morals and ensure that the technology we build is rooted in justice and fairness." |
| `value-foundation-islamic-principles` | value | trust | trust | trust | trust | **trust** | Framing line for the values list: "Our foundation is built upon Islamic principles that guide how we innovate, collaborate, and serve." |
| `value-niyyah` | value | trust | trust | trust | trust | **trust** | Niyyah (Sincere Intention) — "Every action must be driven by a pure and purposeful intention to benefit the Ummah and humanity." |
| `value-serving-ummah-humanity` | value | trust | trust | trust | trust | **trust** | Serving the Ummah & Humanity — "Our work is dedicated to addressing real challenges and inspiring technology that addresses challenges the M… |
| `claim-attend-impact` | claim | arch | arch | arch | arch | **arch** | Why attend: "Make an impact by creating meaningful technology." *(on homepage)* |
| `claim-attend-inspired` | claim | arch | arch | arch | arch | **arch** | Why attend: "Be inspired to innovate and lead in tech." *(on homepage)* |
| `claim-ideas-to-solutions` | claim | arch | arch | arch | arch | **arch** | "Through this community, we believe ideas can grow into solutions – and solutions can drive meaningful change." |
| `goal-research` | goal | arch | arch | arch | arch | **arch** | Long-term goal/activity 5: "Research." (Vision doc specifies: 'Research into technology and Islamic principles'). |
| `principle-community-impact` | principle | arch | arch | arch | arch | **arch** | Guiding principle: community-impact focused. |
| `principle-intentional` | principle | arch | arch | arch | arch | **arch** | Guiding principle: intentional in its approach (aligns with the Niyyah value). |
| `scripture-5-2-commentary` | scripture | arch | arch | arch | arch | **arch** | Commentary on Qur'an 5:2: "This verse shows us what the ideal Islamic society should look like. It is a society in which members help each o… |
| `challenge-microsoft-dependence` | challenge | CUT | CUT | CUT | CUT | **CUT** | "The Ummah are dependent on providers with unethical business practices (i.e. Microsoft)." [COMMERCIALLY/POLITICALLY SENSITIVE: names Micros… |
| `challenge-platform-censorship-palestine` | challenge | trust | CUT | CUT | CUT | **CUT** | "Platforms censor voices — pro-Palestinian narratives are suppressed." [POLITICALLY SENSITIVE: explicit pro-Palestinian censorship claim; a … |
| `principle-prop2-faith-collective-action` | principle | CUT | CUT | trust | CUT | **CUT** | Core Proposition 2 — Bridging Faith and Collective Action: "Closing the gap between individual faith and collective, transnational solidarit… |
