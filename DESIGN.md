---
name: Warm Tactile Wealth
colors:
  surface: '#faf9fb'
  surface-dim: '#dbd9dc'
  surface-bright: '#faf9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f5'
  surface-container: '#efedf0'
  surface-container-high: '#e9e8ea'
  surface-container-highest: '#e3e2e4'
  on-surface: '#1b1c1e'
  on-surface-variant: '#504535'
  inverse-surface: '#2f3032'
  inverse-on-surface: '#f2f0f3'
  outline: '#827563'
  outline-variant: '#d4c4af'
  surface-tint: '#7c5800'
  primary: '#7c5800'
  on-primary: '#ffffff'
  primary-container: '#f4b840'
  on-primary-container: '#694a00'
  inverse-primary: '#f9bc44'
  secondary: '#396a05'
  on-secondary: '#ffffff'
  secondary-container: '#b8f484'
  on-secondary-container: '#3f710d'
  tertiary: '#a43c28'
  on-tertiary: '#ffffff'
  tertiary-container: '#ffae9d'
  on-tertiary-container: '#902e1b'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdea8'
  primary-fixed-dim: '#f9bc44'
  on-primary-fixed: '#271900'
  on-primary-fixed-variant: '#5e4200'
  secondary-fixed: '#b8f484'
  secondary-fixed-dim: '#9dd76b'
  on-secondary-fixed: '#0d2000'
  on-secondary-fixed-variant: '#285000'
  tertiary-fixed: '#ffdad3'
  tertiary-fixed-dim: '#ffb4a5'
  on-tertiary-fixed: '#3e0500'
  on-tertiary-fixed-variant: '#842513'
  background: '#faf9fb'
  on-background: '#1b1c1e'
  surface-variant: '#e3e2e4'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 44px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 36px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 22px
    letterSpacing: -0.005em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 15px
    fontWeight: '500'
    lineHeight: 22px
    letterSpacing: 0em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  margin: 1.25rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.875rem
  space-lg: 1.25rem
  space-xl: 1.75rem
---

## Brand & Style

This design system reimagines personal finance as an approachable, comforting, and intuitive daily habit rather than an intimidating, ledger-heavy chore. By replacing austere corporate blues and clinical monochrome layouts with warm bakery creams, optimistic mustard golds, organic sage greens, and soft terracotta corals, the interface delivers a grounding sense of psychological safety and calm optimism.

### Design Movement
The visual language operates at the intersection of **Warm Modernism** and **Tactile Minimalism**. It relies on:
- Deeply rounded pill containers and squircle enclosures that soften financial data.
- Layered off-white tonal surfaces that establish physical hierarchy through subtle inner fills and ghost hairline borders instead of abrasive dropshadows.
- Expressive, punchy numeric displays balanced against generous negative space.
- Tactile visual affordances (smooth floating navigation bars, capsule action shortcuts, and illustrated milestone headers) that make moving money feel tactile and tangible.

## Colors

The palette is anchored by a warm cream backdrop that eliminates screen fatigue and softens high-contrast data presentation.

### Surface Tones
- **Base Canvas (`#F7F5F0`)**: The warm off-white canvas setting the friendly, low-stress atmosphere.
- **Surface Elevated (`#FFFFFF`)**: Pure crisp white reserved for foreground container cards, segmented controls, and interactive modules.
- **Surface Subtle / Muted (`#EFECE6`)**: Inactive pill states, search troughs, and secondary dividers.

### Accent & Functional Colors
- **Warm Golden Mustard (`#F4B840` / `#F3C653`)**: The primary brand accent, signaling primary liquidity, active balance cards, and selected navigation anchors.
- **Soft Sage Green (`#88C057` / `#B8E086`)**: Represents positive cash inflow, active wallet balances, progress completions, and health milestones.
- **Coral Terracotta (`#FF8066` / `#F8A99B`)**: Communicates expense outfluxes, debit entries, and budget warning thresholds without alarming red alarms.
- **Deep Neutral Ink (`#1D1E20`)**: The primary text and high-contrast element color, providing grounded legibility across all warm background tints.
- **Secondary Charcoal (`#6B6D72`)**: For timestamps, supporting metadata, and inactive navigation labels.

## Typography

The typography uses **Plus Jakarta Sans** uniformly across display, body, and label roles to maintain geometric warmth, open apertures, and modern balance. 

- **Numerical Display**: Monetary amounts leverage `800` (ExtraBold) and `700` (Bold) weights with tight letter-spacing (`-0.02em` to `-0.03em`) to create dense, impactful financial metrics that anchor user attention immediately.
- **Hierarchical Contrast**: Section headers ("Statistic", "My Savings", "Wallet status") use `18px-20px` bold weights, balancing prominently against quiet `12px-13px` metadata tags and micro labels.
- **Tabular Figures**: For all metric-driven elements, enable proportional tabular lining numbers (`font-variant-numeric: tabular-nums`) to ensure currency strings align predictably across vertically stacked lists.

## Layout & Spacing

The layout model is optimized primarily for a compact, one-handed mobile experience built on an 8-point base grid (with 4-point micro nudges).

- **Mobile Viewports (under 600px)**: 
  - Standard edge canvas margin is set to `1.25rem` (`20px`), stepping down to `1rem` (`16px`) on ultra-compact devices.
  - Multi-column card grids (e.g., side-by-side Income vs. Outgo cards or horizontal currency carousels) utilize a fixed `0.75rem` (`12px`) gutter.
  - Content sections stack vertically separated by `1.5rem` (`24px`) to `1.75rem` (`28px`), giving distinct mental separation between categories.
- **Safe Areas & Navigation Padding**:
  - The bottom floating dock leaves `1rem` safe clearance from the physical screen bezel, preventing overlap with OS navigation gestures.
- **Card Padding**:
  - Primary hero cards (e.g., credit/debit card surfaces) apply `1.25rem` internal padding.
  - Compact action buttons and list item rows use `0.75rem` to `0.875rem` internal padding for comfortable touch targets.

## Elevation & Depth

This system avoids heavy, muddy drop shadows. Instead, it creates separation through warm tonal surfaces, micro-elevation, and delicate translucent perimeter boundaries:

- **Level 0 (Base Canvas)**: Flat `#F7F5F0` background color.
- **Level 1 (Surface Containers & Cards)**: Crisp `#FFFFFF` elevated cards floating on the cream canvas. Depth is achieved via a warm ambient shadow:
  - `box-shadow: 0 4px 16px -2px rgba(29, 30, 32, 0.04), 0 2px 6px -1px rgba(29, 30, 32, 0.02);`
  - Paired with an ultra-soft hairline outline: `border: 1px solid rgba(29, 30, 32, 0.04);`
- **Level 2 (Pill Modals & Floating Navigation)**: Floating floating bars (such as the bottom dock) use slightly deeper ambient diffusion:
  - `box-shadow: 0 10px 24px -4px rgba(29, 30, 32, 0.08);`
  - Optional backdrop-filter blur (`backdrop-filter: blur(12px)`) when translucent surfaces overlap scrolling content.
- **Chromatic Cards (Hero Balances)**: Featured cards receive solid fills in primary mustard (`#F4B840`) or sage green (`#B8E086`), creating instant visual hierarchy through color dominance rather than shadow elevation.

## Shapes

The geometric identity is explicitly defined by full pill capsules, soft squircles, and expansive radii that evoke tactile smoothness and friendliness.

- **Pill Elements (`border-radius: 9999px`)**: 
  - Standard action chips ("All spendings", "Groceries", "Bills").
  - Quick currency badges and micro tag pills.
  - Floating bottom navigation shell.
  - Circular icon badges (`w-10 h-10` or `w-12 h-12` fully circular frames).
- **Cards & Primary Modules (`rounded-xl` / `24px - 28px`)**:
  - Main balance cards, income/expense stat panels, and list groups.
- **Action Buttons (`rounded-lg` / `16px - 20px`)**:
  - Square-format utility icons ("Transfer", "Receive", "Convert", "Bills") utilize soft `18px` corners to blend harmoniously between squares and circles.

## Components

### 1. Buttons & Utility Quick-Actions
- **Square Utility Action**: Clean white surface card, `rounded-2xl`, with a subtle centered line icon and a concise `12px` medium weight label positioned directly underneath. Hover/press produces a micro scale-down (`scale(0.97)`).
- **Primary Pill Button**: Solid `#1D1E20` ink button with white text, or accent `#F4B840` mustard button with dark ink text. Full pill border radius (`9999px`), `48px` default height, bold `14px` label.

### 2. Segmented Filters & Chips
- **Category Filter Pills**: Grouped horizontal scroll row. Inactive state: semi-transparent muted surface (`#EFECE6` or `#FFFFFF`), dark text. Active state: solid color fill (Mustard `#F4B840`, Sage `#B8E086`, or Coral `#FF8066`) with crisp dark typography and zero border.

### 3. Financial Metric & Statistic Cards
- **Dual-Pane Split Stat**: Paired cards displaying Income and Outcome side by side. Contains:
  - Micro circular icon container at top-left with corresponding arrow vector.
  - Uppercase or small title label (`12px`, muted).
  - Prominent metric display (`20px`, bold).
  - Two-tone horizontal progress pill bar visualizing proportion to target (e.g., active color indicator bar on top of a light neutral track).

### 4. Interactive List Rows (Transactions & Savings Goals)
- **Goal / Transaction Card**: White background card, `rounded-2xl`, with internal padding of `14px 16px`.
- Left-aligned leading icon: Rounded badge pill housing category artwork or goal icon (e.g., piggy bank, vehicle, groceries) tinted in soft pastel yellow or coral.
- Center section: Bold title (`15px`) stacked above secondary timestamp or category tag.
- Right section: Amount display (`+ $500` in sage green, `- $2,300` in dark ink) or secondary circular icon actions (`%`, download).

### 5. Floating Dock Navigation
- An elevated pill container floating above the bottom viewport margin.
- Rendered in dark ink (`#1D1E20`) or crisp white (`#FFFFFF`) with contrasting active indicator capsule around the selected navigation destination.