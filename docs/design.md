# 🎨 Design System Specification (`design.md`)

> **Source Document:** `C:\Users\pantr\Downloads\prd-sales-booking-flow-intern (1).html`  
> **Document Title:** PRD — Book a Sales Meeting (Detailed UI/UX & Design Spec v3.0)

---

## 1. 🌈 Color Palette System

The application design system utilizes a structured, high-contrast light palette designed for readability, calm interaction, and clear hierarchy.

### Core Brand & Surface Tokens
| Token Name | Hex Code | Purpose & Usage |
| :--- | :--- | :--- |
| `--paper` | `#F8F8FA` | Main Page Background (Soft Off-White) |
| `--card` | `#FFFFFF` | Elevate Surface / Card Containers |
| `--ink` | `#1B1F27` | Primary Text & High-Contrast Headings |
| `--muted` | `#666B76` | Secondary Text, Captions & Subtitles |
| `--line` | `#E4E6EC` | Borders, Dividers & Structural Grid Lines |
| `--accent` | `#4C46E0` | Primary CTA, Active Tabs & Brand Accent (Indigo) |
| `--accent-soft` | `#EEEDFC` | Highlight Backgrounds, Soft Indigo Badges |

---

### Priority & Status Color Tokens
| Status Tag | Text Color | Background Fill | Border Color | Description |
| :--- | :--- | :--- | :--- | :--- |
| **MUST** | `#4C46E0` (`--must`) | `#EEEDFC` (`--accent-soft`) | `--` | Essential feature requirement badge |
| **SHOULD** | `#0E7C6B` (`--should`) | `#E4F5F1` (`--should-soft`) | `--` | High priority secondary badge |
| **NICE** | `#8A8F99` (`--nice`) | `#F0F1F3` (`--nice-soft`) | `--` | Optional / Deferred badge |
| **Status Active**| `#0E7C6B` | `#E4F5F1` | `--` | Active pill tag (`border-radius: 20px`) |

---

### Feedback & Wireframe State Colors
| State Component | Background Fill | Border Color | Text Color |
| :--- | :--- | :--- | :--- |
| **Error Slot** | `#FBE7E4` | `#EFC4BE` | `#C13A2E` |
| **Warning / Out-of-Scope** | `#FCF7EC` | `#EFE0BE` | `#A67F1F` |
| **Wireframe Fill** | `#F6F6F9` | `#C7CAD4` | `#A9AEBC` |

---

## 2. 🔤 Typography & Font System

The design system incorporates a triple-font hierarchy for distinct editorial, user interface, and technical data presentation.

### Font Families
1. **Primary Interface Sans:** `'Inter', sans-serif`
2. **Editorial Serif Headings:** `'Newsreader', serif`
3. **Monospace Code & Metadata:** `'JetBrains Mono', monospace`

---

### Type Scale & Hierarchy Rules

```css
/* Core Global Typographic Specs */
body {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: #1B1F27;
  -webkit-font-smoothing: antialiased;
}

.mono {
  font-family: 'JetBrains Mono', monospace;
}
```

#### Detailed Element Specifications
| Element / Class | Font Family | Size | Weight | Line Height | Letter Spacing | Color / Style |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Main Hero Title** | `Newsreader` | `36px` | `600` | `1.2` | `-0.01em` | `#1B1F27` (*Italic*) |
| **Section H2 Heading** | `Newsreader` | `23px` | `600` | `1.3` | `-0.01em` | `#1B1F27` |
| **Persona Name Title** | `Newsreader` | `18px` | `500` | `1.3` | `--` | `#1B1F27` (*Italic*) |
| **Subheading H3** | `Inter` | `15px` | `600` | `1.4` | `--` | `#1B1F27` |
| **Hero Subtitle / Lede** | `Inter` | `15px - 16px`| `400` | `1.6` | `--` | `#666B76` (`--muted`) |
| **Body Paragraph / List**| `Inter` | `14px - 14.5px`| `400` | `1.6` | `--` | `#1B1F27` (`--ink`) |
| **Eyebrow Header** | `JetBrains Mono`| `12px` | `500` | `1.2` | `0.1em` | `#4C46E0` (*Uppercase*) |
| **Section Number** | `JetBrains Mono`| `12.5px`| `600` | `1.2` | `--` | `#4C46E0` |
| **Code / Route Tag** | `JetBrains Mono`| `12.5px`| `500` | `1.2` | `--` | `#1B1F27` (`bg: #F4F4F8`) |
| **TOC Navigation Link**| `JetBrains Mono`| `11px` | `400` | `1.2` | `--` | `#666B76` |
| **Table Column Th** | `JetBrains Mono`| `10.5px - 11px`| `500`| `1.2` | `0.05em` | `#666B76` (*Uppercase*) |
| **Badges & Meta Keys** | `JetBrains Mono`| `10px - 10.5px`| `600`| `1.2` | `0.05em` | (*Uppercase*) |

---

## 3. 📐 Layout Grid & Spacing System

### Container Boundaries
- **Maximum Content Width:** `960px` (`margin: 0 auto`)
- **Desktop Horizontal Padding:** `40px` (`padding: 0 40px`)
- **Mobile Horizontal Padding (≤760px):** `22px` (`padding: 0 22px`)
- **Vertical Section Spacing:** `44px` padding top/bottom with `1px solid #E4E6EC` bottom border

---

### Component Spacings & Border Radii
| Component | Padding | Border Radius | Border | Shadow / Effects |
| :--- | :--- | :--- | :--- | :--- |
| **Primary CTA Button** | `12px 24px` | `6px` | `none` | High-contrast indigo fill |
| **Metric / NFR Card** | `16px 18px` | `9px` | `1px solid #E4E6EC` | White background card |
| **Persona Card** | `20px` | `10px` | `1px solid #E4E6EC` | White background card |
| **Wireframe Block** | `22px 22px 18px` | `12px` | `1px solid #E4E6EC` | Background `#FFFFFF` |
| **Error Slot Callout** | `14px 18px` | `8px` | `1px solid #D8D5F8` | Background `#EEEDFC` |
| **Status Pill** | `3px 9px` | `20px` | `none` | Background `#E4F5F1` |
| **Badge Tag** | `3px 8px` | `4px` | `none` | Uppercase monospace |

---

## 4. 🎛️ Component & Interaction Design Rules

### 1. Primary Hero CTA Button
- **Default State:** Fill `#4C46E0`, Text `#FFFFFF` (`font-weight: 600`).
- **Interaction Rule:** Exactly one prominent CTA button per view. High contrast above the fold.
- **Submitting State:** Displays loading spinner, disabled click state, and text updates to `"Creating account..."` or `"Logging in..."`.

### 2. Auth Modal UI Specs
- **Overlay:** Backdrop `#D9DBE3` opacity `0.6` over landing page.
- **Card Container:** Dimensions `280px` width (or responsive full-screen on mobile `≤640px`), border radius `10px`, border `1px solid #E4E6EC`, fill `#FFFFFF`.
- **Tab Header:** Dual Sign Up / Log In toggle positioned at the top of the modal. Active tab features an indigo underline (`2px fill #4C46E0`).
- **Error Slot Behavior:** Reserved vertical height space (`16px` min-height) to prevent modal height jumping when an inline error occurs.

### 3. Data Tables & Data Grids
- **Table Header (`th`):** Left-aligned, `JetBrains Mono` font `10.5px`, uppercase, tracking `0.05em`, color `#666B76`, border-bottom `2px solid #E4E6EC`.
- **Table Data (`td`):** Padding `10px - 11px`, border-bottom `1px solid #E4E6EC`. Technical tags rendered in `JetBrains Mono` color `#4C46E0`.

---

## 5. 📱 Responsive Viewport Breakpoints

| Viewport Range | Layout Adaptations |
| :--- | :--- |
| **Desktop (≥1024px)** | 3-column metric grid, 2-column persona & deliverable grid, centered 280px modal overlay. |
| **Tablet (761px - 1023px)** | 2-column grids, fluid horizontal padding (`40px`). |
| **Mobile (≤760px)** | Single column stack for grids & timeline strips, full-screen auth modal, `22px` horizontal padding. |
