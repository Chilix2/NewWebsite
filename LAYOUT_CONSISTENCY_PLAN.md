# Layout Consistency Fix Plan

## Issues Identified

### 1. Inconsistent Layout Wrappers
- **Root pages** (pricing, contact, news): Use basic `<main>` with `bg-slate-50/50`
- **Product pages** (produkt/*, ai-impacts/*): Use cosmic gradient background
- **Missing**: Consistent cosmic background and layout structure

### 2. Missing Layout Components
Root-level pages are missing:
- Cosmic background (`cosmic-iris-global`)
- Consistent header/footer integration
- Glass panel effects and backdrop blur
- Proper z-index layering

### 3. Styling Inconsistencies
- Different background patterns across pages
- Inconsistent spacing and padding
- Mixed use of glass effects and plain backgrounds

## Solution Strategy

### Phase 1: Create Consistent Layout Component
Create a shared layout component that all pages can use:
- Cosmic background
- Consistent spacing
- Glass effects
- Proper z-index management

### Phase 2: Update All Root Pages
Apply consistent layout to:
- `/pricing/page.tsx`
- `/contact/page.tsx` 
- `/news/page.tsx`
- `/blog/page.tsx`
- Other root-level pages

### Phase 3: Standardize Product Pages
Ensure all product pages use the same layout pattern:
- Breadcrumb navigation
- Consistent header sections
- Uniform CTA sections

## Implementation Steps

1. **Create Layout Component**: `components/page-layout.tsx`
2. **Update Root Pages**: Apply new layout wrapper
3. **Standardize Headers**: Consistent page headers
4. **Unify CTAs**: Standard call-to-action sections
5. **Test Consistency**: Verify all pages look uniform

## Files to Modify

### Root Pages
- `app/pricing/page.tsx`
- `app/contact/page.tsx`
- `app/news/page.tsx`
- `app/blog/page.tsx`

### Product Pages (standardize)
- `app/produkt/*/page.tsx`
- `app/ai-impacts/*/page.tsx`
- `app/use-cases/*/page.tsx`

### New Component
- `components/page-layout.tsx`

This approach will create a unified, professional look across all pages while maintaining the cosmic theme and glass effects that make QORTEX visually distinctive.
