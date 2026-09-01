const storageKey = "careerPathJobs";
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
    const fromUrl = new URLSearchParams(location.search).get("jobs");
    if (fromUrl !== null) {
      const parsed = JSON.parse(fromUrl);
      return normalizeJobs(parsed);
    }
    const stored = JSON.parse(localStorage.getItem(storageKey) || "null");
    return normalizeJobs(stored);
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

function renderList() {
  jobList.replaceChildren(...(jobs.length ? jobs.map(createJobCard) : [createJobEmptyState()]));
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
