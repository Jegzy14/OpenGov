# OpenGov Africa: Project Explorer

An independent, front-end-only concept prototype for making public project information easier to discover and understand. It is not an official OpenGov Africa product and does not connect to a public data source.

## Run locally

Open `index.html` in a modern browser. No build step, package installation or server is required. The page uses HTML, CSS and vanilla JavaScript. Google Fonts are an optional network dependency; system fallbacks remain available if fonts cannot be reached.

## Prototype features

- Search sample projects by name, location, category, status or description.
- Filter by location, implementation status and category; reset all filters.
- Open an accessible project detail dialog with a sample description, funding and timeline, milestones, and progress updates.
- Search a small resource library and open short sample summaries.
- Use the responsive layout, skip link, keyboard-visible focus indicators, semantic landmarks, labelled controls, progressbar names, and reduced-motion support.
- See loading, empty-result and rendering-error states.

## Data and assumptions

Every project, organization context, budget, date, status, progress value, milestone, update and resource in this demo is fictional and illustrative. Figures are not independently verified, should not be used for decisions, and are clearly labelled in the interface. Budget amounts use example local-currency formats and are not intended to be compared across currencies. Search and summary statistics operate only on the included in-memory sample data.

## Source layout

- `index.html` contains the semantic page structure.
- `styles.css` contains responsive styles and accessible state treatments.
- `app.js` contains the sample dataset, rendering, filtering and dialog behavior.

## UX and implementation notes

The dashboard puts the sample-data caveat before the project list, keeps key project fields visible for scanning, and makes the status and progress understandable without charts. Project details and resource summaries use the same native dialog pattern. Data and rendering are separated from the page structure and styling to keep the prototype approachable for collaborative review.

The prototype is not production-ready. Before using real public data, add source links and update timestamps, document currency and progress definitions, validate the dataset with responsible institutions, and test across browsers and assistive technologies. A production version would also need data provenance, API and failure handling, security review, localization, and automated accessibility and interaction tests.