const iconPaths = {
  add: '<path d="M12 5v14M5 12h14"/>',
  add_circle: '<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>',
  analytics: '<path d="M4 19V5h16v14z"/><path d="M8 16v-5M12 16V8M16 16v-8"/>',
  apartment: '<path d="M4 21V5h10v16M14 9h6v12"/><path d="M8 9h2M8 13h2M8 17h2M17 13h1M17 17h1"/>',
  arrow_back: '<path d="M19 12H5M12 5l-7 7 7 7"/>',
  arrow_forward: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  auto_awesome: '<path d="M12 3l1.7 5.1L19 10l-5.3 1.9L12 17l-1.7-5.1L5 10l5.3-1.9z"/><path d="M5 4v4M3 6h4M19 16v4M17 18h4"/>',
  business_center: '<path d="M9 7V5h6v2"/><path d="M4 8h16v11H4z"/><path d="M9 13h6"/>',
  calendar_month: '<path d="M7 3v4M17 3v4M4 8h16M5 5h14v16H5z"/>',
  calendar_today: '<path d="M7 3v4M17 3v4M5 7h14v13H5z"/>',
  cancel: '<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>',
  check: '<path d="M5 12l4 4L19 6"/>',
  chevron_left: '<path d="M15 18l-6-6 6-6"/>',
  chevron_right: '<path d="M9 18l6-6-6-6"/>',
  dashboard: '<path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z"/>',
  delete: '<path d="M4 7h16M10 11v6M14 11v6M6 7l1 14h10l1-14M9 7V4h6v3"/>',
  description: '<path d="M6 3h9l3 3v15H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
  edit: '<path d="M4 20h4l11-11-4-4L4 16z"/><path d="M14 6l4 4"/>',
  edit_note: '<path d="M4 6h10M4 11h9M4 16h6"/><path d="M15 17l4-4 2 2-4 4h-2z"/>',
  emoji_events: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 3M16 6h3a3 3 0 0 1-3 3M12 13v4M9 21h6M8 17h8"/>',
  emoji_objects: '<path d="M9 18h6M10 21h4"/><path d="M8 12a4 4 0 1 1 8 0c0 1.5-.8 2.4-1.7 3.2-.6.5-.8 1-.8 1.8h-3c0-.8-.2-1.3-.8-1.8C8.8 14.4 8 13.5 8 12z"/>',
  fact_check: '<path d="M5 4h14v16H5z"/><path d="M8 9h1M12 9h4M8 14h1M12 14l2 2 4-5"/>',
  groups: '<path d="M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM16 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3 20a5 5 0 0 1 10 0M11 20a5 5 0 0 1 10 0"/>',
  history: '<path d="M3 12a9 9 0 1 0 3-6.7"/><path d="M3 4v5h5M12 7v6l4 2"/>',
  home: '<path d="M4 11l8-7 8 7v9h-5v-6H9v6H4z"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.6 2.6 0 1 1 4.3 2c-.9.7-1.8 1.2-1.8 2.7"/><path d="M12 17h.01"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 10v7M12 7h.01"/>',
  keyboard_arrow_down: '<path d="M6 9l6 6 6-6"/>',
  notifications: '<path d="M18 16H6l2-3V9a4 4 0 0 1 8 0v4z"/><path d="M10 19h4"/>',
  person: '<path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  phone_iphone: '<rect x="7" y="2" width="10" height="20" rx="2"/><path d="M11 18h2"/>',
  save: '<path d="M5 4h12l2 2v14H5z"/><path d="M8 4v6h8M9 20v-6h6v6"/>',
  send: '<path d="M4 4l17 8-17 8 4-8z"/><path d="M8 12h13"/>',
  share: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.6l6.8-4.2M8.6 13.4l6.8 4.2"/>',
  timeline: '<path d="M4 17l5-5 4 3 7-8"/><path d="M4 20h16"/>'
};

document.querySelectorAll(".material-symbols-outlined").forEach(icon => {
  const name = icon.textContent.trim();
  const paths = iconPaths[name];
  if (paths) {
    icon.setAttribute("aria-hidden", "true");
    icon.innerHTML = `<svg viewBox="0 0 24 24">${paths}</svg>`;
  }
});

const screens = Array.from(document.querySelectorAll(".screen"));
const nav = document.getElementById("bottomNav");
const navItems = Array.from(document.querySelectorAll(".nav-item"));
const filterChips = Array.from(document.querySelectorAll(".chip[data-filter]"));
let activityCards = Array.from(document.querySelectorAll(".activity-card[data-status]"));
const activityList = document.getElementById("activityList");
const viewAllLink = document.querySelector(".link-btn[href='careerpath-jobs.html']");
const analyticsDonut = document.getElementById("analyticsDonut");
const donutTotal = document.getElementById("donutTotal");
const analyticsLegend = document.getElementById("analyticsLegend");
const analyticsTableBody = document.getElementById("analyticsTableBody");
const analyticsSummary = document.getElementById("analyticsSummary");
const analyticsSummaryToggle = document.getElementById("analyticsSummaryToggle");
const addJobForm = document.getElementById("addJobForm");
const statusInput = document.getElementById("statusInput");
const statusPickerTrigger = document.getElementById("statusPickerTrigger");
const statusPickerLabel = document.getElementById("statusPickerLabel");
const statusBackdrop = document.getElementById("statusBackdrop");
const statusPickerClose = document.getElementById("statusPickerClose");
const statusOptions = Array.from(document.querySelectorAll("[data-status-option]"));
const interviewDateField = document.getElementById("interviewDateField");
const interviewDateInput = document.getElementById("interviewDateInput");
const timelineList = document.getElementById("timelineList");
const deleteJobButton = document.getElementById("deleteJobButton");
const detailDescriptionTitle = document.getElementById("detailDescriptionTitle");
const detailSource = document.getElementById("detailSource");
const detailNoteInput = document.getElementById("detailNoteInput");
const saveDetailNote = document.getElementById("saveDetailNote");
const notificationPopover = document.getElementById("notificationPopover");
const notificationTriggers = Array.from(document.querySelectorAll(".notification-trigger"));
const notificationClose = document.querySelector(".notification-close");
const profileNameModal = document.getElementById("profileNameModal");
const profileNameForm = document.getElementById("profileNameForm");
const profileNameInput = document.getElementById("profileNameInput");
const profileNameCancel = document.getElementById("profileNameCancel");
const aboutAppMenu = document.getElementById("aboutAppMenu");
const exportDataButton = document.getElementById("exportDataButton");
const importDataButton = document.getElementById("importDataButton");
const importFileInput = document.getElementById("importFileInput");
const deleteConfirmModal = document.getElementById("deleteConfirmModal");
const deleteConfirmCancel = document.getElementById("deleteConfirmCancel");
const deleteConfirmOk = document.getElementById("deleteConfirmOk");
const importConfirmModal = document.getElementById("importConfirmModal");
const importConfirmText = document.getElementById("importConfirmText");
const importConfirmCancel = document.getElementById("importConfirmCancel");
const importConfirmOk = document.getElementById("importConfirmOk");
const aboutBackButton = document.getElementById("aboutBackButton");
const gmailScanButton = document.getElementById("gmailScanButton");
const gmailStatus = document.getElementById("gmailStatus");
const gmailLogoutButton = document.getElementById("gmailLogoutButton");
const calendarBackdrop = document.getElementById("calendarBackdrop");
const calendarGrid = document.getElementById("calendarGrid");
const calendarTitle = document.getElementById("calendarTitle");
const calendarPrev = document.getElementById("calendarPrev");
const calendarNext = document.getElementById("calendarNext");
const calendarCancel = document.getElementById("calendarCancel");
const calendarToday = document.getElementById("calendarToday");
const calendarTriggers = Array.from(document.querySelectorAll(".calendar-trigger"));
const storageKey = "careerPathJobs";
const userStorageKey = "careerPathUser";
const storageVersion = "v2";

function obfuscate(text) {
  const key = storageVersion;
  return btoa(Array.from(text).map((c, i) =>
    String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i % key.length))
  ).join(""));
}

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
      const plain = JSON.parse(raw);
      if (plain !== null && typeof plain === "object") {
        localStorage.setItem(key, obfuscate(raw));
        return plain;
      }
    } catch {}
    return JSON.parse(deobfuscate(raw));
  } catch {
    return null;
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, obfuscate(JSON.stringify(value)));
}
let selectedJobId = null;
let editingJobId = null;
let calendarTargetInput = null;
let calendarViewDate = new Date();

const statusMeta = {
  recommendation: { label: "Rekomendasi lowongan", badge: "blue" },
  applied: { label: "Lamaran diterima", badge: "blue" },
  interview: { label: "Interview", badge: "orange" },
  offer: { label: "Penawaran kerja", badge: "green" },
  rejected: { label: "Ditolak", badge: "red" }
};

const statusPickerLabels = {
  recommendation: "Rekomendasi lowongan",
  applied: "Lamaran diterima",
  interview: "Interview",
  offer: "Penawaran kerja",
  rejected: "Ditolak"
};

const analyticsStatusMeta = [
  { key: "recommendation", label: "Rekomendasi", color: "#7f8cff" },
  { key: "applied", label: "Lamaran diterima", color: "#3bbcef" },
  { key: "interview", label: "Interview", color: "#ff9f43" },
  { key: "rejected", label: "Ditolak", color: "#d83a45" },
  { key: "offer", label: "Penawaran kerja", color: "#26b960" }
];

const legacyDefaultJobIds = new Set(["stellar", "flowstream", "nova", "apex"]);


function normalizeJobs(jobs) {
  if (!Array.isArray(jobs)) return [];
  return jobs.filter(job =>
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
    if (Array.isArray(stored) && jobs.length !== stored.length) saveJobs(jobs);
    return jobs;
  } catch {
    return [];
  }
}

function saveJobs(jobs) {
  writeStorage(storageKey, jobs);
}

function getUserProfile() {
  try {
    const stored = readStorage(userStorageKey);
    return stored && typeof stored === "object" ? stored : {};
  } catch {
    return {};
  }
}

function saveUserProfile(profile) {
  writeStorage(userStorageKey, profile);
}


function renderProfile() {
  const profile = getUserProfile();
  const userName = (profile.name || "").trim();
  document.querySelector(".profile-name").hidden = Boolean(userName);
  document.getElementById("profileUserName").textContent = userName;
}

function setProfileNameModalOpen(isOpen) {
  profileNameModal.hidden = !isOpen;
  if (!isOpen) return;
  const profile = getUserProfile();
  profileNameInput.value = profile.name || "";
  window.setTimeout(() => {
    profileNameInput.focus();
    profileNameInput.select();
  }, 0);
}

function editProfileName() {
  setProfileNameModalOpen(true);
}

function handleProfileNameSubmit(event) {
  event.preventDefault();
  const profile = getUserProfile();
  saveUserProfile({ ...profile, name: profileNameInput.value.trim() });
  renderProfile();
  setProfileNameModalOpen(false);
}

function scanGmail() {
  if (!window.CareerPathNative?.scanGmail) {
    gmailStatus.textContent = "Pemindaian Gmail hanya tersedia di APK Android.";
    return;
  }
  window.CareerPathNative.scanGmail();
}

function logoutGmail() {
  if (window.CareerPathNative?.logoutGmail) {
    window.CareerPathNative.logoutGmail();
  }
}

function exportData() {
  const jobs = getJobs();
  const dataString = JSON.stringify(jobs, null, 2);
  if (window.CareerPathNative?.exportData) {
    window.CareerPathNative.exportData(dataString);
    return;
  }
  const blob = new Blob([dataString], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const dateStr = new Date().toISOString().split("T")[0];
  link.href = url;
  link.download = `careerpath-backup-${dateStr}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function autoImportGmail(candidates) {
  const existingJobs = getJobs();
  const existingGmailIds = new Set(existingJobs.map(job => job.gmailId).filter(Boolean));
  const imported = candidates
    .filter(candidate => candidate && !existingGmailIds.has(candidate.gmailId))
    .map((candidate, index) => ({
      id: `gmail-${candidate.gmailId || `${Date.now()}-${index}`}`,
      company: candidate.company,
      role: candidate.role,
      status: candidate.status,
      date: candidate.date,
      interviewDate: "",
      offerDate: candidate.status === "offer" ? candidate.date : "",
      location: "Belum ditentukan",
      salary: "Belum ada",
      referral: "Tidak ada",
      source: "Gmail",
      logo: candidate.company.slice(0, 1).toUpperCase(),
      logoStyle: "",
      description: candidate.description || "Diimpor dari Gmail.",
      gmailId: candidate.gmailId
    }));
  if (imported.length) {
    saveJobs([...imported, ...existingJobs]);
    renderDashboard();
  }
  return imported.length;
}

window.CareerPathGmail = {
  onLoading() {
    gmailScanButton.disabled = true;
    gmailStatus.textContent = "Membaca email rekrutmen...";
  },
  onResult(result) {
    gmailScanButton.disabled = false;
    if (result?.action === "logout") {
      gmailStatus.textContent = "Akun Google telah dikeluarkan.";
      gmailLogoutButton.classList.add("is-hidden");
      return;
    }
    if (!result?.ok) {
      gmailStatus.textContent = result?.error || "Pemindaian Gmail gagal.";
      return;
    }
    gmailLogoutButton.classList.remove("is-hidden");
    const scannedCandidates = Array.isArray(result.jobs) ? result.jobs : [];
    const scannedById = new Map(scannedCandidates.map(candidate => [candidate.gmailId, candidate]));
    const currentJobs = getJobs();
    let correctedCount = 0;
    const correctedJobs = currentJobs.map(job => {
      const candidate = job.gmailId ? scannedById.get(job.gmailId) : null;
      if (!candidate || candidate.status === job.status || job.manualStatusUpdated) return job;
      correctedCount += 1;
      return { ...job, status: candidate.status };
    });
    if (correctedCount) {
      saveJobs(correctedJobs);
      renderDashboard();
    }
    const importedCount = autoImportGmail(scannedCandidates);
    const parts = [];
    if (importedCount) parts.push(`${importedCount} lamaran baru diimpor`);
    if (correctedCount) parts.push(`${correctedCount} status dikoreksi`);
    gmailStatus.textContent = parts.length ? parts.join(", ") + "." : "Tidak ada email rekrutmen baru.";
  }
};


function setStatusValue(status) {
  const nextStatus = statusPickerLabels[status] ? status : "applied";
  statusInput.value = nextStatus;
  statusPickerLabel.textContent = statusPickerLabels[nextStatus];
  statusOptions.forEach(option => {
    const isSelected = option.dataset.statusOption === nextStatus;
    option.classList.toggle("is-selected", isSelected);
    option.setAttribute("aria-pressed", String(isSelected));
  });
  syncInterviewDateField();
}

function setStatusPickerOpen(isOpen) {
  statusBackdrop.hidden = !isOpen;
  statusPickerTrigger.setAttribute("aria-expanded", String(isOpen));
  if (!isOpen) return;
  setNotificationsOpen(false);
  setProfileNameModalOpen(false);
  setCalendarOpen(false);
  window.setTimeout(() => {
    statusBackdrop.querySelector(".status-option.is-selected")?.focus();
  }, 0);
}

function parseDateValue(value) {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function formatDateValue(date) {
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
  });
}

function isSameDate(firstDate, secondDate) {
  return firstDate &&
    secondDate &&
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate();
}

function renderCalendar() {
  const year = calendarViewDate.getFullYear();
  const month = calendarViewDate.getMonth();
  const selectedDate = parseDateValue(calendarTargetInput?.value);
  const today = new Date();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  calendarTitle.textContent = calendarViewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric"
  });

  const cells = [];
  for (let index = 0; index < firstDay; index += 1) {
    cells.push(createElement("span", "calendar-empty"));
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const date = new Date(year, month, day);
    const button = createElement("button", "calendar-day", String(day));
    button.type = "button";
    button.classList.toggle("is-today", isSameDate(date, today));
    button.classList.toggle("is-selected", isSameDate(date, selectedDate));
    button.setAttribute("aria-label", date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric"
    }));
    button.addEventListener("click", () => {
      calendarTargetInput.value = formatDateValue(date);
      setCalendarOpen(false);
      calendarTargetInput.focus();
    });
    cells.push(button);
  }

  calendarGrid.replaceChildren(...cells);
}

function setCalendarOpen(isOpen, targetInput = calendarTargetInput) {
  calendarBackdrop.hidden = !isOpen;
  if (!isOpen) {
    calendarTargetInput = null;
    return;
  }

  calendarTargetInput = targetInput;
  const selectedDate = parseDateValue(targetInput.value) || new Date();
  calendarViewDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
  renderCalendar();
  setNotificationsOpen(false);
  setProfileNameModalOpen(false);
  setStatusPickerOpen(false);
}

function shiftCalendarMonth(offset) {
  calendarViewDate = new Date(calendarViewDate.getFullYear(), calendarViewDate.getMonth() + offset, 1);
  renderCalendar();
}

function chooseToday() {
  if (!calendarTargetInput) return;
  const today = new Date();
  calendarTargetInput.value = formatDateValue(today);
  setCalendarOpen(false);
  calendarTargetInput.focus();
}


function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}


function createActivityCard(job) {
  const meta = statusMeta[job.status] || statusMeta.applied;
  const button = createElement("button", "activity-card");
  button.type = "button";
  button.dataset.status = job.status;
  button.dataset.jobId = job.id;
  button.addEventListener("click", () => showJobDetail(job.id));

  const textWrap = createElement("div");
  textWrap.appendChild(createElement("div", "activity-title", job.company));
  textWrap.appendChild(createElement("div", "activity-role", job.role));

  const metaWrap = createElement("div", "activity-meta");
  metaWrap.appendChild(createElement("span", `badge ${meta.badge}`, meta.label));
  metaWrap.appendChild(createElement("span", "", job.date || "Tanpa tanggal"));

  button.append(textWrap, metaWrap);
  return button;
}

function createEmptyActivity() {
  const empty = createElement("div", "empty-state");
  empty.append(
    createElement("div", "empty-title", "Belum ada job"),
    createElement("p", "", "Tambahkan lamaran pertamamu agar dashboard hanya berisi data yang kamu masukkan sendiri.")
  );
  const action = createElement("button", "empty-action", "Add Job");
  action.type = "button";
  action.addEventListener("click", openAddForm);
  empty.appendChild(action);
  return empty;
}

function createTimelineEvent(event) {
  const item = createElement("div", `event ${event.kind || ""}`.trim());
  const dot = createElement("div", `dot ${event.dot || ""}`.trim());
  if (event.dot !== "current") dot.textContent = "✓";
  const body = createElement("div");
  body.appendChild(createElement("div", "event-title", event.title));
  body.appendChild(createElement("div", "event-date", event.date));
  item.append(dot, body);
  return item;
}

function getTimelineEvents(job) {
  if (job.status === "applied") {
    return [{ title: "Lamaran diterima", date: job.date || "Lamaran tersimpan", kind: "applied", dot: "" }];
  }
  if (job.status === "interview" && job.interviewDate) {
    return [{ title: "Interview", date: `Dijadwalkan: ${job.interviewDate}`, kind: "current", dot: "current" }];
  }
  if (job.status === "offer") {
    return [{ title: "Penawaran kerja", date: job.offerDate || job.date || "Penawaran diterima", kind: "offer", dot: "" }];
  }
  if (job.status === "rejected") {
    return [{ title: "Ditolak", date: job.date || "Lamaran ditutup", kind: "rejected", dot: "" }];
  }
  return [];
}

function renderTimeline(job) {
  const events = getTimelineEvents(job);
  timelineList.classList.toggle("single", events.length <= 1);
  if (!events.length) {
    timelineList.replaceChildren(createElement("p", "timeline-empty", "Tambahkan tanggal status untuk menampilkan timeline."));
    return;
  }
  timelineList.replaceChildren(...events.map(createTimelineEvent));
}

function getStatusCounts(jobs) {
  return jobs.reduce((total, job) => {
    total[job.status] = (total[job.status] || 0) + 1;
    return total;
  }, {});
}

function setAnalyticsSummaryExpanded(isExpanded) {
  analyticsSummary.classList.toggle("is-expanded", isExpanded);
  analyticsSummaryToggle.setAttribute("aria-expanded", String(isExpanded));
  analyticsSummaryToggle.setAttribute("aria-label", isExpanded ? "Hide status summary" : "Show status summary");
}

function renderDashboard() {
  const jobs = getJobs();
  const counts = getStatusCounts(jobs);

  ["recommendation", "applied", "interview", "offer", "rejected"].forEach(status => {
    const stat = document.querySelector(`[data-stat="${status}"]`);
    if (stat) stat.textContent = counts[status] || 0;
  });

  activityList.replaceChildren(...(jobs.length ? jobs.map(createActivityCard) : [createEmptyActivity()]));
  activityCards = Array.from(document.querySelectorAll(".activity-card[data-status]"));
  if (viewAllLink) {
    viewAllLink.href = `careerpath-jobs.html?jobs=${encodeURIComponent(JSON.stringify(jobs))}`;
  }

  const activeFilter = document.querySelector(".chip.active")?.dataset.filter || "all";
  filterActivities(activeFilter);
}

function renderAnalytics() {
  const jobs = getJobs();
  const counts = getStatusCounts(jobs);
  const total = jobs.length;

  document.querySelector('[data-analytics-stat="total"]').textContent = total;
  analyticsStatusMeta.forEach(item => {
    const stat = document.querySelector(`[data-analytics-stat="${item.key}"]`);
    if (stat) stat.textContent = counts[item.key] || 0;
  });

  donutTotal.textContent = total;
  if (!total) {
    analyticsDonut.style.background = "#edf2f7";
  } else {
    let current = 0;
    const segments = analyticsStatusMeta.map(item => {
      const value = counts[item.key] || 0;
      const start = current;
      const end = current + (value / total) * 100;
      current = end;
      return `${item.color} ${start}% ${end}%`;
    });
    analyticsDonut.style.background = `conic-gradient(${segments.join(", ")})`;
  }

  analyticsLegend.replaceChildren(...analyticsStatusMeta.map(item => {
    const value = counts[item.key] || 0;
    const percent = total ? Math.round((value / total) * 100) : 0;
    const row = createElement("div", "legend-item");
    const swatch = createElement("span", "legend-swatch");
    swatch.style.background = item.color;
    row.append(
      swatch,
      createElement("span", "legend-title", item.label),
      createElement("span", "legend-meta", `${value} (${percent}%)`)
    );
    return row;
  }));

  analyticsTableBody.replaceChildren(...jobs.slice(0, 6).map(job => {
    const meta = analyticsStatusMeta.find(item => item.key === job.status) || analyticsStatusMeta[0];
    const row = document.createElement("tr");
    const jobCell = document.createElement("td");
    jobCell.append(
      createElement("span", "table-company", job.company),
      createElement("span", "table-role", job.role)
    );
    const statusCell = document.createElement("td");
    statusCell.appendChild(createElement("span", `table-badge ${job.status}`, meta.label));
    const dateCell = createElement("td", "", job.date || "Tanpa tanggal");
    row.append(jobCell, statusCell, dateCell);
    return row;
  }));
}

function showJobDetail(jobId) {
  const job = getJobs().find(item => item.id === jobId);
  if (!job) {
    selectedJobId = null;
    showScreen("dashboard", "home");
    return;
  }
  const meta = statusMeta[job.status] || statusMeta.applied;
  selectedJobId = job.id;
  document.getElementById("detailStatus").textContent = meta.label;
  document.getElementById("detailJobTitle").textContent = job.role;
  const subtitle = document.querySelector(".detail-sub");
  subtitle.replaceChildren(
    createElement("span", "", job.company),
    createElement("span", "", "•"),
    createElement("span", "", job.location || "Belum ditentukan")
  );
  const isGmail = job.source === "Gmail";
  detailDescriptionTitle.textContent = isGmail ? "Ringkasan email" : "Deskripsi manual";
  document.getElementById("detailDescription").textContent = job.description || (isGmail ? "Ringkasan email tidak tersedia." : "Belum ada deskripsi manual.");
  detailSource.textContent = `Sumber: ${isGmail ? "Gmail" : "Manual"}`;
  detailNoteInput.value = job.note || "";
  saveDetailNote.textContent = "Simpan Catatan";
  renderTimeline(job);
  showScreen("detail", "profile");
}


function buildJobFromForm() {
  const company = document.getElementById("companyNameInput").value.trim();
  const role = document.getElementById("jobRoleInput").value.trim();
  const status = document.getElementById("statusInput").value;
  const date = document.getElementById("applicationDateInput").value.trim() || new Date().toLocaleDateString("en-US");
  const interviewDate = interviewDateInput.value.trim();
  const notes = document.getElementById("notesInput").value.trim();
  const existing = editingJobId ? getJobs().find(job => job.id === editingJobId) : null;

  return {
    id: existing?.id || `job-${Date.now()}`,
    company,
    role,
    status,
    date,
    interviewDate: status === "interview" ? interviewDate : "",
    offerDate: status === "offer" ? (existing?.offerDate || date) : "",
    location: existing?.location || "Belum ditentukan",
    salary: existing?.salary || "Belum ada",
    referral: existing?.referral || "Tidak ada",
    source: existing?.source || "Entri manual",
    logo: existing?.logo || company.slice(0, 1).toUpperCase(),
    logoStyle: existing?.logoStyle || "",
    description: notes || "Belum ada catatan.",
    gmailId: existing?.gmailId || null,
    manualStatusUpdated: Boolean(existing?.gmailId) && (existing.status !== status || existing.manualStatusUpdated)
  };
}

function setFormMode(mode) {
  const isEdit = mode === "edit";
  document.getElementById("formModeCrumb").textContent = isEdit ? "Edit Lamaran" : "Tambah Baru";
  document.getElementById("formTitle").textContent = isEdit ? "Edit Lamaran" : "Detail Lamaran";
  document.getElementById("formSubmitText").textContent = isEdit ? "Perbarui Lamaran" : "Simpan Lamaran";
}

function fillForm(job) {
  document.getElementById("companyNameInput").value = job.company || "";
  document.getElementById("jobRoleInput").value = job.role || "";
  document.getElementById("applicationDateInput").value = job.date || new Date().toLocaleDateString("en-US");
  interviewDateInput.value = job.interviewDate || "";
  document.getElementById("notesInput").value = job.description === "Belum ada catatan." ? "" : (job.description || "");
  setStatusValue(job.status || "applied");
}

function openAddForm() {
  editingJobId = null;
  setFormMode("add");
  addJobForm.reset();
  document.getElementById("applicationDateInput").value = new Date().toLocaleDateString("en-US");
  setStatusValue("applied");
  showScreen("add", "add");
}

function openEditForm() {
  const job = getJobs().find(item => item.id === selectedJobId);
  if (!job) return openAddForm();
  editingJobId = job.id;
  setFormMode("edit");
  fillForm(job);
  showScreen("add", "add");
}

function saveSelectedJobNote() {
  if (!selectedJobId) return;
  const jobs = getJobs().map(job => job.id === selectedJobId ? { ...job, note: detailNoteInput.value.trim() } : job);
  saveJobs(jobs);
  saveDetailNote.textContent = "Tersimpan";
  window.setTimeout(() => { saveDetailNote.textContent = "Simpan Catatan"; }, 1200);
}

function deleteSelectedJob() {
  if (!selectedJobId) return;
  deleteConfirmModal.hidden = false;
}

function confirmDeleteJob() {
  if (!selectedJobId) return;
  const nextJobs = getJobs().filter(job => job.id !== selectedJobId);
  saveJobs(nextJobs);
  selectedJobId = nextJobs[0]?.id || null;
  editingJobId = null;
  deleteConfirmModal.hidden = true;
  renderDashboard();
  filterActivities("all");
  showScreen("dashboard", "home");
}

let pendingImportJobs = null;

function importData() {
  importFileInput.click();
}

function handleImportFile(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      const valid = normalizeJobs(parsed);
      if (!valid.length) {
        alert("File tidak berisi data lamaran yang valid.");
        return;
      }
      pendingImportJobs = valid;
      importConfirmText.textContent = `File "${file.name}" berisi ${valid.length} lamaran. Data saat ini (${getJobs().length} lamaran) akan diganti.`;
      importConfirmModal.hidden = false;
    } catch {
      alert("File JSON tidak valid.");
    }
    importFileInput.value = "";
  };
  reader.readAsText(file);
}

function confirmImport() {
  if (!pendingImportJobs) return;
  saveJobs(pendingImportJobs);
  pendingImportJobs = null;
  importConfirmModal.hidden = true;
  renderDashboard();
  filterActivities("all");
  showScreen("dashboard", "home");
}

function syncInterviewDateField() {
  const needsInterviewDate = statusInput.value === "interview";
  interviewDateField.classList.toggle("is-hidden", !needsInterviewDate);
  interviewDateInput.required = needsInterviewDate;
  if (!needsInterviewDate) {
    if (calendarTargetInput === interviewDateInput) setCalendarOpen(false);
    interviewDateInput.value = "";
  }
}

function filterActivities(filter) {
  filterChips.forEach(chip => {
    const isActive = chip.dataset.filter === filter;
    chip.classList.toggle("active", isActive);
    chip.setAttribute("aria-pressed", String(isActive));
  });

  activityCards.forEach(card => {
    const shouldShow = filter === "all" || card.dataset.status === filter;
    card.classList.toggle("is-hidden", !shouldShow);
  });
}


function navKeyFor(id) {
  if (id === "add") return "add";
  if (id === "analytics") return "analytics";
  if (id === "detail" || id === "about") return "profile";
  return "home";
}

function setNotificationsOpen(isOpen) {
  notificationPopover.hidden = !isOpen;
  notificationTriggers.forEach(trigger => trigger.setAttribute("aria-expanded", String(isOpen)));
  if (isOpen) setStatusPickerOpen(false);
}

function showScreen(id, navKey = navKeyFor(id)) {
  if (id === "dashboard") renderDashboard();
  if (id === "analytics") {
    renderAnalytics();
    setAnalyticsSummaryExpanded(false);
  }
  if (id === "profile") renderProfile();
  screens.forEach(screen => screen.classList.toggle("active", screen.id === id));
  nav.style.display = "grid";
  navItems.forEach(item => item.classList.toggle("active", item.dataset.nav === navKey));
  setNotificationsOpen(false);
  setStatusPickerOpen(false);
  setProfileNameModalOpen(false);
  setCalendarOpen(false);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

navItems.forEach(item => item.addEventListener("click", () => {
  if (item.dataset.target === "add") openAddForm();
  else showScreen(item.dataset.target, item.dataset.nav);
}));
analyticsSummaryToggle.addEventListener("click", () => {
  setAnalyticsSummaryExpanded(!analyticsSummary.classList.contains("is-expanded"));
});
filterChips.forEach(chip => chip.addEventListener("click", () => filterActivities(chip.dataset.filter)));
statusPickerTrigger.addEventListener("click", event => {
  event.stopPropagation();
  setStatusPickerOpen(statusBackdrop.hidden);
});
statusPickerClose.addEventListener("click", () => setStatusPickerOpen(false));
statusOptions.forEach(option => {
  option.addEventListener("click", () => {
    setStatusValue(option.dataset.statusOption);
    setStatusPickerOpen(false);
    statusPickerTrigger.focus();
  });
});
statusBackdrop.addEventListener("click", event => {
  if (event.target === statusBackdrop) setStatusPickerOpen(false);
  else event.stopPropagation();
});
addJobForm.addEventListener("submit", event => {
  event.preventDefault();
  if (!addJobForm.reportValidity()) return;
  const savedJob = buildJobFromForm();
  const currentJobs = getJobs();
  const jobs = editingJobId
    ? currentJobs.map(job => job.id === editingJobId ? savedJob : job)
    : [savedJob, ...currentJobs];
  saveJobs(jobs);
  renderDashboard();
  filterActivities("all");
  editingJobId = null;
  setFormMode("add");
  addJobForm.reset();
  document.getElementById("applicationDateInput").value = new Date().toLocaleDateString("en-US");
  setStatusValue("applied");
  showJobDetail(savedJob.id);
});
deleteJobButton.addEventListener("click", deleteSelectedJob);
saveDetailNote.addEventListener("click", saveSelectedJobNote);
notificationTriggers.forEach(trigger => {
  trigger.addEventListener("click", event => {
    event.stopPropagation();
    setNotificationsOpen(notificationPopover.hidden);
  });
});
notificationClose.addEventListener("click", () => setNotificationsOpen(false));
notificationPopover.addEventListener("click", event => event.stopPropagation());
profileNameForm.addEventListener("submit", handleProfileNameSubmit);
profileNameCancel.addEventListener("click", () => setProfileNameModalOpen(false));
profileNameModal.addEventListener("click", event => {
  if (event.target === profileNameModal) setProfileNameModalOpen(false);
});
exportDataButton.addEventListener("click", exportData);
importDataButton.addEventListener("click", importData);
importFileInput.addEventListener("change", handleImportFile);
deleteConfirmCancel.addEventListener("click", () => { deleteConfirmModal.hidden = true; });
deleteConfirmOk.addEventListener("click", confirmDeleteJob);
deleteConfirmModal.addEventListener("click", event => { if (event.target === deleteConfirmModal) deleteConfirmModal.hidden = true; });
importConfirmCancel.addEventListener("click", () => { importConfirmModal.hidden = true; pendingImportJobs = null; });
importConfirmOk.addEventListener("click", confirmImport);
importConfirmModal.addEventListener("click", event => { if (event.target === importConfirmModal) { importConfirmModal.hidden = true; pendingImportJobs = null; } });
aboutAppMenu.addEventListener("click", () => showScreen("about", "profile"));
aboutBackButton.addEventListener("click", () => showScreen("profile", "profile"));
gmailScanButton.addEventListener("click", scanGmail);
gmailLogoutButton.addEventListener("click", logoutGmail);
calendarTriggers.forEach(trigger => {
  trigger.addEventListener("click", () => {
    const targetInput = document.getElementById(trigger.dataset.dateInput);
    if (targetInput) setCalendarOpen(true, targetInput);
  });
});
calendarPrev.addEventListener("click", () => shiftCalendarMonth(-1));
calendarNext.addEventListener("click", () => shiftCalendarMonth(1));
calendarCancel.addEventListener("click", () => setCalendarOpen(false));
calendarToday.addEventListener("click", chooseToday);
calendarBackdrop.addEventListener("click", event => {
  if (event.target === calendarBackdrop) setCalendarOpen(false);
});
document.addEventListener("click", () => {
  setNotificationsOpen(false);
  setStatusPickerOpen(false);
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    setNotificationsOpen(false);
    setStatusPickerOpen(false);
    setProfileNameModalOpen(false);
    setCalendarOpen(false);
    deleteConfirmModal.hidden = true;
    importConfirmModal.hidden = true;
    pendingImportJobs = null;
  }
});
setStatusValue("applied");
renderDashboard();
renderProfile();
showScreen("dashboard");
