"use strict";

const projects = [
  {
    id: "lagos-water", name: "Community Water Access Upgrade", country: "Nigeria", location: "Lagos State, Nigeria", category: "Water & sanitation", status: "Ongoing", budget: "NGN 485 million", start: "Mar 2025", end: "Dec 2026", progress: 58,
    description: "A sample programme to extend reliable water connections and rehabilitate shared water points in underserved communities.",
    milestones: ["Community needs assessment completed · Mar 2025", "Procurement and contractor appointment · Jul 2025", "Network rehabilitation underway · Jan 2026"],
    updates: [{ date: "18 Sep 2026", text: "Illustrative update: rehabilitation work is shown as underway across three sample districts." }, { date: "04 Jun 2026", text: "Illustrative update: contractor mobilization and site checks are complete." }]
  },
  {
    id: "accra-roads", name: "Neighbourhood Roads Rehabilitation", country: "Ghana", location: "Greater Accra, Ghana", category: "Transport", status: "Ongoing", budget: "GHS 28.4 million", start: "Jun 2025", end: "Aug 2026", progress: 72,
    description: "A fictional roadworks project covering drainage improvements, safer crossings and resurfacing on local access routes.",
    milestones: ["Route and drainage survey completed · Jun 2025", "Drainage works completed · Feb 2026", "Road resurfacing in progress · Aug 2026"],
    updates: [{ date: "02 Oct 2026", text: "Illustrative update: resurfacing is shown as complete on two of five sample routes." }, { date: "12 Jul 2026", text: "Illustrative update: drainage work has passed a sample quality review." }]
  },
  {
    id: "kisumu-clinics", name: "Primary Health Centre Renewal", country: "Kenya", location: "Kisumu County, Kenya", category: "Health", status: "Planning", budget: "KES 126 million", start: "Jan 2027", end: "Nov 2027", progress: 12,
    description: "An illustrative plan to improve basic clinical facilities, accessibility and essential equipment at local health centres.",
    milestones: ["Facility assessments completed · Apr 2026", "Design review scheduled · Nov 2026", "Expected works begin · Jan 2027"],
    updates: [{ date: "15 Oct 2026", text: "Illustrative update: concept designs are under review with sample community feedback." }, { date: "09 Aug 2026", text: "Illustrative update: accessibility audits were completed at four sample sites." }]
  },
  {
    id: "freetown-schools", name: "School Sanitation Improvement", country: "Sierra Leone", location: "Western Area, Sierra Leone", category: "Education", status: "Delayed", budget: "SLE 18.2 million", start: "Sep 2024", end: "Mar 2026", progress: 46,
    description: "A fictional effort to improve accessible toilets and handwashing facilities at public primary schools.",
    milestones: ["School assessments completed · Sep 2024", "Works started at sample sites · Apr 2025", "Revised completion estimate · Mar 2026"],
    updates: [{ date: "11 Oct 2026", text: "Illustrative update: the completion estimate has been revised while materials are sourced." }, { date: "20 Jul 2026", text: "Illustrative update: work at two sample sites is temporarily paused." }]
  },
  {
    id: "kampala-solar", name: "Public Facilities Solar Programme", country: "Uganda", location: "Kampala, Uganda", category: "Energy", status: "Completed", budget: "UGX 3.6 billion", start: "Feb 2024", end: "May 2026", progress: 100,
    description: "A sample programme for installing rooftop solar and backup power at public service facilities.",
    milestones: ["Site audits and design completed · May 2024", "Installations completed · Mar 2026", "Handover and sample checks completed · May 2026"],
    updates: [{ date: "31 May 2026", text: "Illustrative update: all listed sample sites are marked as handed over." }, { date: "10 Apr 2026", text: "Illustrative update: system checks were completed at the final sample sites." }]
  },
  {
    id: "dakar-markets", name: "Market Access and Drainage Works", country: "Senegal", location: "Dakar, Senegal", category: "Local infrastructure", status: "Ongoing", budget: "XOF 920 million", start: "Oct 2025", end: "Jun 2027", progress: 34,
    description: "A fictional municipal project to improve drainage, pedestrian access and waste collection points around local markets.",
    milestones: ["Market consultations completed · Oct 2025", "Drainage design approved · Feb 2026", "First works package underway · Jul 2026"],
    updates: [{ date: "06 Oct 2026", text: "Illustrative update: the first drainage section is shown as under construction." }, { date: "24 Jun 2026", text: "Illustrative update: market access routes were mapped for the sample works plan." }]
  }
];

const resources = [
  { type: "PLAIN-LANGUAGE GUIDE", title: "Reading a public project budget", description: "A short guide to allocations, commitments and reported expenditure." },
  { type: "CHECKLIST", title: "Questions to ask about project progress", description: "Prompts for comparing milestones, timelines and reported status." },
  { type: "REFERENCE NOTE", title: "What procurement records can tell you", description: "An introduction to tender, award and contract information." },
  { type: "DATA GUIDE", title: "Understanding project location data", description: "How to interpret place names, administrative areas and site coverage." },
  { type: "GLOSSARY", title: "Public finance terms, explained", description: "Definitions for common budget and implementation terms." },
  { type: "METHOD NOTE", title: "How to verify a project update", description: "A practical starting point for tracing a claim to its source." }
];

const elements = {
  summary: document.querySelector("#summary-grid"),
  projectList: document.querySelector("#project-list"),
  projectCount: document.querySelector("#project-count"),
  filters: document.querySelector("#project-filters"),
  search: document.querySelector("#project-search"),
  location: document.querySelector("#location-filter"),
  status: document.querySelector("#status-filter"),
  category: document.querySelector("#category-filter"),
  resourceSearch: document.querySelector("#resource-search"),
  resourceList: document.querySelector("#resource-list"),
  dialog: document.querySelector("#detail-dialog"),
  dialogContent: document.querySelector("#dialog-content"),
  dialogKicker: document.querySelector("#dialog-kicker")
};

const escapeHTML = (value) => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
const uniqueValues = (key) => [...new Set(projects.map((project) => project[key]))].sort((a, b) => a.localeCompare(b));

function populateFilter(select, values) {
  const fragment = document.createDocumentFragment();
  values.forEach((value) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    fragment.append(option);
  });
  select.append(fragment);
}

function renderSummary() {
  const locations = new Set(projects.map((project) => project.country)).size;
  const average = Math.round(projects.reduce((total, project) => total + project.progress, 0) / projects.length);
  elements.summary.innerHTML = `
    <div class="summary-item"><span class="summary-value">${projects.length}</span><span class="summary-label">Sample projects</span></div>
    <div class="summary-item"><span class="summary-value">${locations}</span><span class="summary-label">Locations</span></div>
    <div class="summary-item"><span class="summary-value">${average}%</span><span class="summary-label">Average progress</span></div>
    <div class="summary-item summary-note"><span>Numbers describe this fictional dataset only.</span></div>`;
}

function projectCard(project) {
  const statusClass = `status-${project.status.toLowerCase()}`;
  return `<article class="project-card">
    <div class="card-topline"><span class="category-label">${escapeHTML(project.category)}</span><span class="status-pill ${statusClass}">${escapeHTML(project.status)}</span></div>
    <h3>${escapeHTML(project.name)}</h3>
    <p class="project-location"><span class="location-marker" aria-hidden="true"></span>${escapeHTML(project.location)}</p>
    <p class="card-description">${escapeHTML(project.description)}</p>
    <div class="project-meta"><div><span class="meta-label">Illustrative budget</span><span class="meta-value">${escapeHTML(project.budget)}</span></div><div><span class="meta-label">Sample timeline</span><span class="meta-value">${escapeHTML(project.start)} – ${escapeHTML(project.end)}</span></div></div>
    <div class="progress-row"><div style="flex:1"><div class="progress-copy"><span>Illustrative progress</span> <strong>${project.progress}%</strong></div><div class="progress-track" role="progressbar" aria-label="Illustrative progress for ${escapeHTML(project.name)}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${project.progress}"><div class="progress-fill" style="width:${project.progress}%"></div></div></div><button class="detail-link" type="button" data-project="${escapeHTML(project.id)}">View details <span aria-hidden="true">→</span></button></div>
  </article>`;
}

function getFilteredProjects() {
  const query = elements.search.value.trim().toLocaleLowerCase();
  return projects.filter((project) => {
    const searchable = [project.name, project.location, project.category, project.description, project.status].join(" ").toLocaleLowerCase();
    return (!query || searchable.includes(query)) &&
      (!elements.location.value || project.country === elements.location.value) &&
      (!elements.status.value || project.status === elements.status.value) &&
      (!elements.category.value || project.category === elements.category.value);
  });
}

function renderProjects() {
  const matches = getFilteredProjects();
  elements.projectCount.textContent = `${matches.length} ${matches.length === 1 ? "project" : "projects"} shown`;
  elements.projectList.setAttribute("aria-busy", "false");
  if (!matches.length) {
    elements.projectList.innerHTML = `<div class="empty-state"><strong>No matching projects</strong><p>Try another search term or clear one or more filters to see the sample portfolio.</p></div>`;
    return;
  }
  elements.projectList.innerHTML = matches.map(projectCard).join("");
}

function renderResources() {
  const query = elements.resourceSearch.value.trim().toLocaleLowerCase();
  const matches = resources.filter((resource) => `${resource.title} ${resource.type} ${resource.description}`.toLocaleLowerCase().includes(query));
  if (!matches.length) {
    elements.resourceList.innerHTML = `<div class="resource-empty">No resources match that search. Try a broader term.</div>`;
    return;
  }
  elements.resourceList.innerHTML = matches.map((resource, index) => `<article class="resource-card"><span class="resource-type">${escapeHTML(resource.type)}</span><h3>${escapeHTML(resource.title)}</h3><p>${escapeHTML(resource.description)}</p><button type="button" data-resource="${resources.indexOf(resource)}">Read summary <span aria-hidden="true">→</span></button></article>`).join("");
}

function openProject(project) {
  elements.dialogKicker.textContent = "ILLUSTRATIVE PROJECT DETAILS";
  elements.dialogContent.innerHTML = `<h2 class="dialog-title" id="dialog-title">${escapeHTML(project.name)}</h2><p class="dialog-subtitle">${escapeHTML(project.location)} · ${escapeHTML(project.category)} · ${escapeHTML(project.status)}</p>
    <section class="dialog-section"><h3>Project overview</h3><p>${escapeHTML(project.description)} This complete detail view uses fictional information for demonstration only.</p></section>
    <section class="dialog-section"><h3>Funding and timeline</h3><div class="detail-grid"><div class="detail-box"><span>Sample approved budget</span><strong>${escapeHTML(project.budget)}</strong></div><div class="detail-box"><span>Sample implementation period</span><strong>${escapeHTML(project.start)} – ${escapeHTML(project.end)}</strong></div><div class="detail-box"><span>Illustrative reported progress</span><strong>${project.progress}%</strong></div><div class="detail-box"><span>Sample status</span><strong>${escapeHTML(project.status)}</strong></div></div></section>
    <section class="dialog-section"><h3>Milestones</h3><ol class="milestone-list">${project.milestones.map((milestone) => `<li>${escapeHTML(milestone)}</li>`).join("")}</ol></section>
    <section class="dialog-section"><h3>Progress updates</h3><div class="update-list">${project.updates.map((update) => `<div class="update-item"><strong>${escapeHTML(update.date)}</strong><p>${escapeHTML(update.text)}</p></div>`).join("")}</div></section>`;
  elements.dialog.showModal();
  document.body.classList.add("dialog-open");
}

function openResource(resource) {
  elements.dialogKicker.textContent = "RESOURCE SUMMARY · SAMPLE CONTENT";
  elements.dialogContent.innerHTML = `<h2 class="dialog-title" id="dialog-title">${escapeHTML(resource.title)}</h2><p class="dialog-subtitle">${escapeHTML(resource.type)}</p><section class="dialog-section"><h3>About this guide</h3><p>${escapeHTML(resource.description)} This prototype summary is educational sample content, not formal legal, financial or procurement advice.</p></section><section class="dialog-section"><h3>Consider when reviewing public records</h3><ol class="milestone-list"><li>Check the date and institution responsible for the record.</li><li>Compare planned information with progress updates and source documents.</li><li>Note any missing information and seek confirmation from the relevant public body.</li></ol></section>`;
  elements.dialog.showModal();
  document.body.classList.add("dialog-open");
}

function renderError() {
  elements.projectList.setAttribute("aria-busy", "false");
  elements.projectCount.textContent = "Sample projects could not be displayed";
  elements.projectList.innerHTML = `<div class="error-state"><strong>We could not load the sample projects</strong><p>Refresh the page to try again. No external data service is used by this prototype.</p></div>`;
}

function initialize() {
  try {
    populateFilter(elements.location, uniqueValues("country"));
    populateFilter(elements.status, uniqueValues("status"));
    populateFilter(elements.category, uniqueValues("category"));
    renderSummary();
    renderProjects();
    renderResources();
  } catch (error) {
    renderError();
    console.error("Unable to render the OpenGov Africa sample dashboard.", error);
  }
}

elements.filters.addEventListener("input", renderProjects);
elements.filters.addEventListener("change", renderProjects);
elements.filters.addEventListener("reset", () => requestAnimationFrame(renderProjects));
elements.resourceSearch.addEventListener("input", renderResources);
elements.projectList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-project]");
  if (!button) return;
  const project = projects.find((item) => item.id === button.dataset.project);
  if (project) openProject(project);
});
elements.resourceList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-resource]");
  if (button) openResource(resources[Number(button.dataset.resource)]);
});
document.querySelector("#dialog-close").addEventListener("click", () => elements.dialog.close());
elements.dialog.addEventListener("close", () => document.body.classList.remove("dialog-open"));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && elements.dialog.open) elements.dialog.close();
});
document.querySelectorAll(".nav-link").forEach((link) => link.addEventListener("click", () => {
  document.querySelectorAll(".nav-link").forEach((item) => {
    item.classList.remove("is-active");
    item.removeAttribute("aria-current");
  });
  link.classList.add("is-active");
  link.setAttribute("aria-current", "page");
}));

window.setTimeout(initialize, 180);