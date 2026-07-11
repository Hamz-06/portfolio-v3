# Implementation Plan: Redesign Playlist Detail View

This plan outlines the redesign of the Playlist detail view at `/portfolio/playlist/[playlist_slug]` into a premium, two-pane Spotify-like layout:

* **Left Pane**: Contains the large cover art, title, description, and metadata.
* **Right Pane**: Contains a list-style table of projects ("songs") with custom row styling (hover states, play button overlay, index numbers).

---

## Proposed Changes

### 1. New List Component

We will create a list-item component that renders a project row like a Spotify song row.

#### [NEW] [projectRow.tsx](file:///Users/fdefreitas/Development/guests/portfolio-v3/src/components/list/playlist/projectRow.tsx)

* Renders a table row (`tr`) or list item with:
  * Index number (replaces with a mini play button on hover).
  * Small thumbnail image + Project title + Subtitle.
  * Project category/type.
  * Direct click/navigation to the project page.

### 2. Update Playlist Detail Page

#### [MODIFY] [page.tsx](file:///Users/fdefreitas/Development/guests/portfolio-v3/src/app/\(home\)/portfolio/playlist/\[playlist_slug\]/page.tsx)

* Refactor the page container layout using a responsive grid/flexbox:
  * On larger screens: Two-pane layout (`md:flex md:flex-row md:gap-8 p-6`).
  * On mobile screens: Stacks vertically.
  * Enable scrolling (`overflow-y-auto`) on the container.
* **Left Pane (Cover/Info)**:
  * Left-aligned, fixed width on desktop (`w-full md:w-64 flex flex-col items-center md:items-start text-center md:text-left gap-4`).
  * Big cover art image utilizing Next.js `Image`.
  * Bold, prominent title and description under the cover art.
* **Right Pane (Song List)**:
  * Expandable container (`flex-1`).
  * Renders a list table showing the project rows using `ProjectRow`.

### 3. Document Data Schema Hierarchy & Relations

* Document Sanity.io schemas and their relations using a Mermaid class diagram in the README.md. (Retroactive)

### 4. Redesign Project/Song Detail Page

We will convert the project detail view at `/portfolio/[project_type]/[slug]` into a Spotify "Now Playing / Album details" split view layout.

#### [MODIFY] [page.tsx](file:///Users/fdefreitas/Development/guests/portfolio-v3/src/app/\(home\)/portfolio/\[project_type\]/\[slug\]/page.tsx)

* Change page container structure to a split-pane layout:
  * **Left/Center Pane** (70% width on desktop): Displays the current large project visual/slider (`CentreImage` and navigation controls).
  * **Right Pane** (30% width on desktop, sticky/scrollable): Integrates the `ProjectDetailSidePane` directly into the page as a persistent side pane.
  * Stacks vertically on mobile viewports for clean responsive sizing.

#### [NEW] [projectDetailSidePane.tsx](file:///Users/fdefreitas/Development/guests/portfolio-v3/src/components/layout/project/projectDetailSidePane.tsx)

* Desktop container for project details displaying `ProjectSummary`.
* Includes a collapse button header to close/hide the details pane.
* Updates state and persists choice in `localStorage`.

#### [MODIFY] [projectProvider.tsx](file:///Users/fdefreitas/Development/guests/portfolio-v3/src/redux/provider/projectProvider.tsx)

* Loads `show-project-details` preference from `localStorage` on component mount to initialize state (defaults to `true`).
* Maintains dispatch contract using `StoreSingleton.getInstance().dispatch` to align with the core architectural design.

#### [MODIFY] [projectDetailsModal.tsx](file:///Users/fdefreitas/Development/guests/portfolio-v3/src/components/modal/slider/projectDetailsModal.tsx)

* Refactored to act as a custom inline bottom sheet using `framer-motion` rather than a portalled Radix Sheet.
* Bounds itself to the parent page DOM container (aligns cleanly above the bottom footer/song controls).
* Renders at `90%` viewport height on mobile/tablet viewports, leaving the top controls visible.
* Employs higher z-indexing (`z-100` / `z-110`) to overlay smoothly above carousels and slides.
* Saves `'false'` to `localStorage` upon sheet overlay tap or close button click.

#### [MODIFY] [projectSummary.tsx](file:///Users/fdefreitas/Development/guests/portfolio-v3/src/components/layout/project/projectSummary.tsx)

* Set background style to `bg-transparent` so that it seamlessly inherits the parent containers (`ProjectDetailSidePane` / `ProjectDetailsModal` sheet) without duplicate styles.
* Adjusted top padding `pt-2 px-8 pb-6` to eliminate redundant white space below headers.

#### [MODIFY] [projectControls.tsx](file:///Users/fdefreitas/Development/guests/portfolio-v3/src/components/layout/project/projectControls.tsx)

* Removed the redundant `Grid View` button from control bar options.
* Updated `Info` toggler to save preferences to `localStorage`.

---

## Verification Plan

### Manual Verification

1. Open `http://localhost:3000/portfolio/playlist/sample-playlist` in the browser.
2. Confirm the 2-pane layout works cleanly on both desktop and mobile viewports.
3. Hover over project rows and confirm the hover styling/play trigger works.
4. Click on a project row and ensure it navigates successfully to the project details route `/portfolio/[project_type]/[slug]`.
5. Verify details panel collapse state persists cleanly to `localStorage` across page reloads and song skipping.
