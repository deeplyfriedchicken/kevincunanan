# GitHub Stats: Kevin Cunanan @ Sureapp

> Data collected: February 28, 2026
> GitHub: `deeplyfriedchicken` | Org: `sureapp`

---

## Summary

| Metric | Count |
|---|---|
| **Total PRs Opened** | 1,724 |
| **Total PRs Merged** | 1,619 |
| **Merge Rate** | 93.9% |
| **PRs Reviewed** | 5,190 |
| **PRs Commented On** | 5,368 |
| **Total Comments on Reviewed PRs** | 4,165+ |
| **Repositories Contributed To** | 30 / 360 |
| **Total Commits** | 2,793+ |

## PR Review Breakdown

| Review Action | Count |
|---|---|
| **Approvals** | 3,685+ |
| **Changes Requested** | 55+ |
| **Approval Rate** | ~98.5% |

> Note: Review state counts are minimums. GitHub's search API limits results to 1,000 per query window; years with >1,000 reviewed PRs (2021: 1,648 / 2022: 1,180 / 2023: 1,017) were partially sampled.

### Reviews by Year

| Year | PRs Reviewed | Approvals | Changes Requested |
|---|---|---|---|
| 2020 | 147 | 120 | 0 |
| 2021 | 1,648 | 871* | 3* |
| 2022 | 1,180 | 852* | 14* |
| 2023 | 1,017 | 883* | 28* |
| 2024 | 642 | 519 | 7 |
| 2025 | 472 | 382 | 2 |
| 2026 (Jan-Feb) | 85 | 58 | 1 |

\* Partial data due to API result limits

### Comments on Reviewed PRs by Year

Comments include both **inline code review comments** (line-level feedback) and **conversation comments** (general PR discussion).

| Year | Inline Review Comments | Conversation Comments | Total Comments |
|---|---|---|---|
| 2020 | 128 | 19 | 147 |
| 2021 | 842 | 43 | 885 |
| 2022 | 1,008 | 47 | 1,055 |
| 2023 | 760 | 45 | 805 |
| 2024 | 660 | 53 | 713 |
| 2025 | 405 | 47 | 452 |
| 2026 (Jan-Feb) | 104 | 4 | 108 |
| **Total** | **3,907** | **258** | **4,165** |

> Note: Inline review comments are code-level feedback left during reviews. Conversation comments are general discussion on the PR thread. Totals are minimums due to API pagination limits on high-volume years.

---

## Repository Contributions (by commits)

### Top Repositories

| # | Repository | Commits | Description |
|---|---|---|---|
| 1 | wl-toggle-auto | 974 | |
| 2 | berry-test-repo | 816 | |
| 3 | platform-sdk | 163 | |
| 4 | platform-app | 118 | |
| 5 | surepreme | 98 | |
| 6 | email-engineer | 84 | |
| 7 | surecraft-admin-portal | 75 | |
| 8 | postmark-templates | 72 | |
| 9 | sure-platform-sdk | 68 | |
| 10 | platform-sdk-archived | 66 | |

### All Repositories

| Repository | Commits |
|---|---|
| wl-toggle-auto | 974 |
| berry-test-repo | 816 |
| platform-sdk | 163 |
| platform-app | 118 |
| surepreme | 98 |
| email-engineer | 84 |
| surecraft-admin-portal | 75 |
| postmark-templates | 72 |
| sure-platform-sdk | 68 |
| platform-sdk-archived | 66 |
| toggle-fe | 63 |
| retrace-shopify-plugin | 36 |
| postmark-emails | 34 |
| surecraft-apps | 29 |
| wl-toggle-homeowners | 28 |
| document-engineer | 26 |
| wl-farmers-direct | 13 |
| retrace-services | 13 |
| wl-toggle-container | 11 |
| wl-toggle-shared-runtime-modules | 7 |
| stelabot | 7 |
| sure-fe-orb | 7 |
| static-assets | 7 |
| qa-automation | 4 |
| surecraft-cli | 2 |
| sli | 2 |
| payment-service-js | 1 |
| sure-be-orb | 1 |
| react-payment-service | 1 |
| explAInables | 1 |

---

## Visualization Ideas

### 1. Holistic Overview — "Developer Impact Dashboard"

**Hero Stats Row** — Large number cards across the top:
- PRs Opened (1,724)
- PRs Merged (1,619)
- PRs Reviewed (5,190)
- Repos Contributed To (30)

These work great as bold, oversized numbers with small labels underneath — think GitHub profile-style contribution stats but larger and more prominent.

---

### 2. PR Lifecycle Funnel

A horizontal or vertical funnel/Sankey-style diagram showing:

```
PRs Opened (1,724)
  └─> Merged (1,619 / 93.9%)
  └─> Not Merged (105 / 6.1%)
```

This clearly communicates quality/throughput.

---

### 3. Contribution Treemap

A **treemap chart** where each rectangle represents a repository, sized by commit count. This instantly shows where your time was concentrated:
- `wl-toggle-auto` and `berry-test-repo` would dominate
- Smaller repos form a mosaic of varied work

Use theme colors for the rectangles. Great for showing breadth + depth simultaneously.

---

### 4. Repository Commit Bar Chart (Horizontal)

A horizontal bar chart sorted by commit count — the classic "what did you work on most" view. Works well on both mobile and desktop. Only show top 10-15 repos to keep it clean.

---

### 5. Review Activity Donut Chart

A donut/ring chart for review outcomes:
- Approvals (98.5%) — large green/theme-primary arc
- Changes Requested (1.5%) — small accent arc

The center of the donut can show the total (5,190 reviews).

---

### 6. Year-over-Year Activity Heatmap or Stacked Bar

A **stacked bar chart by year** showing:
- PRs opened vs merged per year
- Reviews given per year

This shows growth/trajectory over time (2020-2026). Could also be a line chart with multiple series for a cleaner look.

---

### 7. Contribution Radar/Spider Chart

Axes for different contribution types:
- Code (commits)
- Reviews
- PR Comments
- Repository Breadth
- Merge Rate

Normalized to percentage scales. Creates a nice "developer profile shape" that shows strengths at a glance.

---

### 8. GitHub-Style Contribution Calendar

A heatmap calendar (like GitHub's contribution graph) but filtered to Sureapp activity. Shows consistency of contribution over time.

---

### 9. Interactive Repo Cards (Project-by-Project View)

For the per-project breakdown, consider a **card grid** where each repo gets a card showing:
- Repo name
- Commit count (bar or spark line)
- Number of PRs
- Small activity indicator

Cards could be sorted by commits and filterable. On hover/tap, expand to show more detail.

---

### 10. Review Comment Activity — "Code Conversation" Visualizations

Your comment data tells a compelling story: **4,165+ comments across 6 years** of code review. Here are some ways to visualize it:

**a) Stacked Area Chart (Comments Over Time)**
A stacked area chart with two layers — inline review comments (larger, darker fill) and conversation comments (smaller, lighter fill). The area shape shows engagement intensity per year. Peak in 2022 (1,055 comments) creates a natural visual crescendo. This pairs well next to the year-over-year reviews chart.

**b) "Review Depth" Metric**
Calculate and display a **comments-per-review ratio** (total comments / PRs reviewed):

| Year | PRs Reviewed | Comments | Comments/Review |
|---|---|---|---|
| 2020 | 147 | 147 | 1.00 |
| 2021 | 1,648 | 885 | 0.54 |
| 2022 | 1,180 | 1,055 | 0.89 |
| 2023 | 1,017 | 805 | 0.79 |
| 2024 | 642 | 713 | 1.11 |
| 2025 | 472 | 452 | 0.96 |
| 2026 | 85 | 108 | 1.27 |

Show this as a **line sparkline** next to the hero stats. The upward trend in 2024-2026 tells a great story — as you reviewed fewer PRs, your reviews got *deeper and more thorough*.

**c) Inline vs Conversation Ratio Ring**
A thin ring/donut showing the split: 94% inline code comments vs 6% conversation. Communicates that your reviews are code-focused, not just drive-by approvals.

**d) Animated Counter Cards**
For the portfolio, animate a counter that ticks up from 0 to 4,165 (total comments). Add a subtle typing/cursor animation next to it — like the comments are being written in real time. Pair with a label like "Lines of feedback written."

**e) "Comment Heatmap" Calendar**
A GitHub-style contribution calendar but colored by comment volume per day/week. Shows consistency of review engagement. Green-scale or theme-colored squares, denser = more comments that week.

---

### Recommended Implementation Stack

For a portfolio site integration:
- **Recharts** or **Nivo** — React-native charting libraries, great with SSR
- **D3.js** — For custom treemaps, Sankey diagrams, or calendars
- **CSS-only** — Hero stat cards, simple bar charts, and donut charts can be done with pure CSS for performance
- **Framer Motion** — Animate numbers counting up, chart segments appearing

### Suggested Layout for Portfolio Page

```
┌─────────────────────────────────────────────┐
│  HERO STAT CARDS (4 across)                 │
│  [PRs Opened] [Merged] [Reviewed] [Repos]  │
├─────────────────────────────────────────────┤
│  LEFT: PR Funnel        RIGHT: Review Donut │
├─────────────────────────────────────────────┤
│  FULL WIDTH: Year-over-Year Stacked Bars    │
├─────────────────────────────────────────────┤
│  FULL WIDTH: Repository Treemap             │
├─────────────────────────────────────────────┤
│  REPO CARDS GRID (scrollable / paginated)   │
└─────────────────────────────────────────────┘
```
