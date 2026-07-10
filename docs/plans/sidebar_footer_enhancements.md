# Implementation Plan: Sidebar & Footer Enhancements

This plan outlines the changes to support library sidebar uncollapsing, removing volume controls, and styling the disabled repeat button.

---

## Proposed Changes

### 0. Permanent Documentation

* Save a copy of this implementation plan to `docs/plans/sidebar_footer_enhancements.md`.

### 1. Library Sidebar Collapse & Uncollapse

Currently, when the sidebar is collapsed (`toggleSidebar` is `false`), it renders nothing and is hidden. We will update it to render a condensed panel containing only the toggle trigger to expand/uncollapse it.

#### [MODIFY] [sidebar.tsx](file:///Users/fdefreitas/Development/guests/portfolio-v3/src/components/sidebar/sidebar.tsx)

* Update the render condition when `toggleSidebar` is `false`:
  * Instead of returning nothing, render a fixed-width, narrow vertical panel (`w-16` / `w-[72px]`) with `bg-zinc-900 rounded-2xl ml-2 mr-1 flex flex-col items-center py-4`.
  * Display a library icon (e.g. using Lucide's `Library` or a custom sidebar toggle icon).
  * Clicking this icon will dispatch `setToggleSidebar(true)` to uncollapse the full library view.

---

### 2. Footer Controls Cleanup

#### [MODIFY] [footer.tsx](file:///Users/fdefreitas/Development/guests/portfolio-v3/src/components/footer/footer.tsx)

* Remove the `<VolumeControls />` component call.
* Replace it with an empty spacer `div` (`w-1/3`) to maintain the flexbox layout balance (Left: Current song, Center: Media controls, Right: Spacer).

#### [DELETE] [volumeControls.tsx](file:///Users/fdefreitas/Development/guests/portfolio-v3/src/components/footer/volumeControls.tsx)

* Delete the unused `VolumeControls` component.

---

### 3. Repeat Button Disabled Styling

#### [MODIFY] [projectControls.tsx](file:///Users/fdefreitas/Development/guests/portfolio-v3/src/components/footer/projectControls.tsx)

* Update the styling of the `Repeat` icon container button:
  * Dim the icon colors to indicate it is disabled (e.g., `opacity-30` or `text-zinc-600` instead of `text-zinc-400`).
  * Add cursor style `cursor-not-allowed` on hover.
  * Add a tooltip indicating "Repeat is currently disabled".

---

## Verification Plan

### Manual Verification

1. Open the application on desktop layout.
2. Click the collapse button inside the library sidebar and verify that a condensed vertical strip remains visible with an expand button.
3. Click the expand button on the condensed sidebar and verify that it expands back to its full width.
4. Verify that the footer volume controls are gone and the remaining controls are centered correctly.
5. Verify that the repeat button has a disabled look (`opacity-30`, `cursor-not-allowed`) and displays a clear message/tooltip when hovered.
