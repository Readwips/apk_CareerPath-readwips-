const storageKey = "careerPathJobs";
const storageVersion = "v2";

function deobfuscate(encoded) {
  const key = storageVersion;
  const decoded = atob(encoded);
  return Array.from(decoded).map((c, i) =>
    String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length))
  ).join("");
}

function readStorage(key) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw);
    } catch {}
    return JSON.parse(deobfuscate(raw));
  } catch {
    return null;
  }
}
const statusMeta = {
  recommendation: { label: "Rekomendasi lowongan", badgeClass: "applied" },
  applied: { label: "Lamaran diterima", badgeClass: "applied" },
  interview: { label: "Interview", badgeClass: "interview" },
  offer: { label: "Penawaran kerja", badgeClass: "offer" },
  rejected: { label: "Ditolak", badgeClass: "rejected" }
};
const legacyDefaultJobIds = new Set(["stellar", "flowstream", "nova", "apex"]);
let jobs = getJobs();
const backBtn = document.getElementById("backBtn");
const jobList = document.querySelector(".job-list");
const detailLogo = document.getElementById("detailLogo");
const detailBadge = document.getElementById("detailBadge");
const detailCompany = document.getElementById("detailCompany");
const detailRole = document.getElementById("detailRole");
const detailDate = document.getElementById("detailDate");
const detailLocation = document.getElementById("detailLocation");
const detailSalary = document.getElementById("detailSalary");
const detailSource = document.getElementById("detailSource");
const detailDescription = document.getElementById("detailDescription");
const detailSteps = document.getElementById("detailSteps");

// Storage
function normalizeJobs(items) {
  if (!Array.isArray(items)) return [];
  return items.filter(job =>
    job &&
    typeof job === "object" &&
    !legacyDefaultJobIds.has(job.id) &&
    String(job.company || "").trim() &&
    String(job.role || "").trim()
  );
}

function getJobs() {
  try {
    const stored = readStorage(storageKey);
    const jobs = normalizeJobs(stored);
    return jobs.sort((a, b) => {
      const da = new Date(a.date).getTime();
      const db = new Date(b.date).getTime();
      return db - da;
    });
  } catch {}
  return [];
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

// List view
function createJobCard(job) {
  const meta = statusMeta[job.status] || statusMeta.applied;
  const button = createElement("button", "job-card");
  button.type = "button";
  button.dataset.job = job.id;

  const text = createElement("div");
  text.appendChild(createElement("div", "job-title", job.company));
  text.appendChild(createElement("div", "job-role", job.role));

  const metaWrap = createElement("div", "job-meta");
  metaWrap.appendChild(createElement("span", `badge ${meta.badgeClass}`, meta.label));
  metaWrap.appendChild(createElement("span", "", job.date || "Tanpa tanggal"));
  button.append(text, metaWrap);
  button.addEventListener("click", () => showDetail(job.id));
  return button;
}

function createJobEmptyState() {
  const empty = createElement("div", "job-empty");
  empty.append(
    createElement("div", "job-empty-title", "Belum ada job"),
    createElement("p", "", "Daftar ini akan terisi setelah kamu menambahkan lamaran dari menu Add.")
  );
  return empty;
}

let activeFilter = "all";
let searchQuery = "";

function renderList() {
  const filteredJobs = jobs.filter(job => {
    const matchesFilter = activeFilter === "all" || job.status === activeFilter;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = !searchLower || 
      (job.company && job.company.toLowerCase().includes(searchLower)) || 
      (job.role && job.role.toLowerCase().includes(searchLower));
    return matchesFilter && matchesSearch;
  });

  jobList.replaceChildren(...(filteredJobs.length ? filteredJobs.map(createJobCard) : [createJobEmptyState()]));
  
  const counts = jobs.reduce((total, job) => {
    total[job.status] = (total[job.status] || 0) + 1;
    return total;
  }, {});
  const summaryNumbers = document.querySelectorAll(".summary-card strong");
  const summaryLabels = document.querySelectorAll(".summary-card span");
  const summary = [
    ["Total", jobs.length],
    ["Lamaran", counts.applied || 0],
    ["Interview", counts.interview || 0],
    ["Penawaran", counts.offer || 0]
  ];
  summary.forEach(([label, value], index) => {
    if (summaryNumbers[index]) summaryNumbers[index].textContent = value;
    if (summaryLabels[index]) summaryLabels[index].textContent = label;
  });
}

const searchInput = document.getElementById("searchInput");
const filterChips = document.querySelectorAll(".filter-chip");

if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderList();
  });
}

if (filterChips.length) {
  filterChips.forEach(chip => {
    chip.addEventListener("click", () => {
      filterChips.forEach(c => {
        c.classList.remove("active");
        c.style.background = "white";
        c.style.color = "#101c2a";
        c.style.borderColor = "#dcdfe4";
      });
      chip.classList.add("active");
      chip.style.background = "#006f93";
      chip.style.color = "white";
      chip.style.borderColor = "#006f93";
      activeFilter = chip.dataset.filter;
if (readStorage("careerPathDarkMode") === true) {
  document.documentElement.classList.add("dark-mode");
}

renderList();
    });
  });
}

function showList() {
  document.body.classList.remove("detail-mode");
  backBtn.textContent = "Kembali";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Detail view
function showDetail(id) {
  const job = jobs.find(item => item.id === id);
  if (!job) {
    showList();
    return;
  }
  const meta = statusMeta[job.status] || statusMeta.applied;
  detailLogo.hidden = true;
  detailBadge.textContent = meta.label;
  detailBadge.className = `badge ${meta.badgeClass}`;
  detailCompany.textContent = job.company;
  detailRole.textContent = job.role;
  detailDate.textContent = job.date || "Tanpa tanggal";
  detailLocation.textContent = job.location || "Belum ditentukan";
  detailSalary.textContent = job.salary || "Belum ada";
  detailSource.textContent = job.source || "Entri manual";
  detailDescription.textContent = job.description || "Belum ada catatan.";
  const steps = job.steps || ["Tinjau kembali lamaran.", "Siapkan tahap selanjutnya.", "Perbarui status saat ada kemajuan."];
  detailSteps.replaceChildren(...steps.map(step => createElement("li", "", step)));
  document.body.classList.add("detail-mode");
  backBtn.textContent = "Kembali";
  window.scrollTo({ top: 0, behavior: "smooth" });
}

window.handleAndroidBack = function() {
  if (document.body.classList.contains("detail-mode")) {
    showList();
    return true; // We handled it
  }
  // If we are at list view, exit to app
  if (window.CareerPathNative && window.CareerPathNative.goBack) {
    window.CareerPathNative.goBack();
  }
  return false;
};

// Navigation
function leaveTab() {
  window.close();
  setTimeout(() => {
    if (!window.closed) window.location.href = "careerpath-app.html#dashboard";
  }, 120);
}

backBtn.addEventListener("click", () => {
  if (document.body.classList.contains("detail-mode")) {
    showList();
  } else {
    leaveTab();
  }
});

renderList();
