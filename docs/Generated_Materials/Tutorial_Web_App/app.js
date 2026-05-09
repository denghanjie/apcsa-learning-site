const STORAGE_KEY = "apcsa-tutorial-progress-v1";
const NOTES_KEY = "apcsa-tutorial-notes-v1";
const LAST_TOPIC_KEY = "apcsa-tutorial-last-topic-v1";

const data = window.APCSA_TUTORIAL_DATA;
const allTopics = data.units.flatMap((unit) => unit.topics);
const bridgeLessons = data.bridgeLessons || [];
const examLabLessons = data.examLabLessons || [];
const allLessons = [...allTopics, ...bridgeLessons, ...examLabLessons];
const lessonById = new Map(allLessons.map((lesson) => [lesson.id, lesson]));
const defaultPath = data.learningPaths && data.learningPaths[0];
const defaultReview = data.reviewSets && data.reviewSets[0];
const defaultLab = data.examLabs && data.examLabs[0];

const state = {
  mode: defaultPath ? "learn" : "browse",
  unit: 1,
  pathId: defaultPath ? defaultPath.id : "",
  reviewId: defaultReview ? defaultReview.id : "",
  labId: defaultLab ? defaultLab.id : "",
  topicId: defaultPath ? defaultPath.stepIds[0] : allTopics[0].id,
  query: "",
  section: "all",
  notesOpen: false,
  completed: loadJson(STORAGE_KEY, {}),
  notes: loadJson(NOTES_KEY, {})
};

const elements = {
  modeTabs: document.getElementById("modeTabs"),
  unitNav: document.getElementById("unitNav"),
  topicList: document.getElementById("topicList"),
  searchInput: document.getElementById("searchInput"),
  activeUnitLabel: document.getElementById("activeUnitLabel"),
  activeUnitTitle: document.getElementById("activeUnitTitle"),
  activeContextDescription: document.getElementById("activeContextDescription"),
  completeCount: document.getElementById("completeCount"),
  remainingCount: document.getElementById("remainingCount"),
  lessonMeta: document.getElementById("lessonMeta"),
  lessonTitle: document.getElementById("lessonTitle"),
  lessonContent: document.getElementById("lessonContent"),
  sectionTabs: document.getElementById("sectionTabs"),
  notesToggleBtn: document.getElementById("notesToggleBtn"),
  notesCloseBtn: document.getElementById("notesCloseBtn"),
  notesDrawer: document.getElementById("notesDrawer"),
  notesArea: document.getElementById("notesArea"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),
  completeBtn: document.getElementById("completeBtn")
};

init();

function init() {
  const lastTopic = localStorage.getItem(LAST_TOPIC_KEY);

  if (lastTopic && lessonById.has(lastTopic)) {
    state.topicId = lastTopic;
    syncContextToTopic(lastTopic);
  }

  elements.searchInput.addEventListener("input", () => {
    state.query = elements.searchInput.value.trim();
    renderTopicList();
  });

  elements.prevBtn.addEventListener("click", () => moveTopic(-1));
  elements.nextBtn.addEventListener("click", () => moveTopic(1));
  elements.completeBtn.addEventListener("click", toggleComplete);
  elements.notesArea.addEventListener("input", saveNotes);
  elements.notesToggleBtn.addEventListener("click", () => {
    state.notesOpen = !state.notesOpen;
    renderNotesDrawer();
  });
  elements.notesCloseBtn.addEventListener("click", () => {
    state.notesOpen = false;
    renderNotesDrawer();
  });

  render();
}

function render() {
  renderModeTabs();
  renderNavigation();
  renderTopicList();
  renderLesson();
  renderProgress();
}

function renderModeTabs() {
  const modes = [
    { id: "learn", label: "Learn", available: (data.learningPaths || []).length > 0 },
    { id: "browse", label: "Units", available: data.units.length > 0 },
    { id: "review", label: "Review", available: (data.reviewSets || []).length > 0 },
    { id: "labs", label: "Labs", available: (data.examLabs || []).length > 0 }
  ].filter((mode) => mode.available);

  elements.modeTabs.innerHTML = modes
    .map((mode) => {
      const active = mode.id === state.mode ? " active" : "";
      return `<button class="mode-tab${active}" type="button" data-mode="${mode.id}">${mode.label}</button>`;
    })
    .join("");

  elements.modeTabs.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.mode = button.dataset.mode;
      const first = getActiveSequence()[0];
      if (first) {
        state.topicId = first.id;
        syncUnitToTopic(first.id);
      }
      state.section = "all";
      rememberTopic();
      render();
    });
  });
}

function renderNavigation() {
  if (state.mode === "learn") {
    renderPathNavigation();
    return;
  }

  if (state.mode === "review") {
    renderReviewNavigation();
    return;
  }

  if (state.mode === "labs") {
    renderLabNavigation();
    return;
  }

  renderUnitNavigation();
}

function renderPathNavigation() {
  elements.unitNav.className = "unit-nav picker-nav";
  elements.unitNav.setAttribute("aria-label", "Learning paths");
  elements.unitNav.innerHTML = `
    <label class="context-picker">
      <span>Learning path</span>
      <select id="pathPicker">
        ${(data.learningPaths || []).map((path) => {
          const selected = path.id === state.pathId ? " selected" : "";
          return `<option value="${escapeHtml(path.id)}"${selected}>${escapeHtml(getNavTitle(path))}</option>`;
        }).join("")}
      </select>
    </label>
  `;

  document.getElementById("pathPicker").addEventListener("change", (event) => {
    state.pathId = event.target.value;
    const first = getActiveSequence()[0];
    if (first) {
      state.topicId = first.id;
      syncUnitToTopic(first.id);
    }
    state.section = "all";
    rememberTopic();
    render();
  });
}

function renderReviewNavigation() {
  elements.unitNav.className = "unit-nav picker-nav";
  elements.unitNav.setAttribute("aria-label", "Review sets");
  elements.unitNav.innerHTML = `
    <label class="context-picker">
      <span>Review focus</span>
      <select id="reviewPicker">
        ${(data.reviewSets || []).map((review) => {
          const selected = review.id === state.reviewId ? " selected" : "";
          return `<option value="${escapeHtml(review.id)}"${selected}>${escapeHtml(getNavTitle(review))}</option>`;
        }).join("")}
      </select>
    </label>
  `;

  document.getElementById("reviewPicker").addEventListener("change", (event) => {
    state.reviewId = event.target.value;
    const first = getActiveSequence()[0];
    if (first) {
      state.topicId = first.id;
      syncUnitToTopic(first.id);
    }
    state.section = "all";
    rememberTopic();
    render();
  });
}

function renderLabNavigation() {
  elements.unitNav.className = "unit-nav picker-nav";
  elements.unitNav.setAttribute("aria-label", "Exam pattern labs");
  elements.unitNav.innerHTML = `
    <label class="context-picker">
      <span>Exam labs</span>
      <select id="labPicker">
        ${(data.examLabs || []).map((lab) => {
          const selected = lab.id === state.labId ? " selected" : "";
          return `<option value="${escapeHtml(lab.id)}"${selected}>${escapeHtml(getNavTitle(lab))}</option>`;
        }).join("")}
      </select>
    </label>
  `;

  document.getElementById("labPicker").addEventListener("change", (event) => {
    state.labId = event.target.value;
    const first = getActiveSequence()[0];
    if (first) {
      state.topicId = first.id;
      syncUnitToTopic(first.id);
    }
    state.section = "all";
    rememberTopic();
    render();
  });
}

function renderUnitNavigation() {
  elements.unitNav.className = "unit-nav";
  elements.unitNav.setAttribute("aria-label", "Units");
  elements.unitNav.innerHTML = data.units
    .map((unit) => {
      const completed = unit.topics.filter((topic) => state.completed[topic.id]).length;
      const active = unit.unit === state.unit ? " active" : "";

      return `
        <button class="unit-btn${active}" type="button" data-unit="${unit.unit}">
          <span>Unit ${unit.unit}</span>
          <span class="unit-count">${completed}/${unit.topics.length}</span>
        </button>
      `;
    })
    .join("");

  elements.unitNav.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const unitNumber = Number(button.dataset.unit);
      const unit = data.units.find((item) => item.unit === unitNumber);
      state.unit = unitNumber;
      state.topicId = unit.topics[0].id;
      state.section = "all";
      rememberTopic();
      render();
    });
  });
}

function renderTopicList() {
  const context = getActiveContext();
  const topics = filterTopics(context.lessons);
  elements.activeUnitLabel.textContent = context.label;
  elements.activeUnitTitle.textContent = context.title;
  elements.activeContextDescription.textContent = context.description || "";

  if (topics.length === 0) {
    elements.topicList.innerHTML = `<p class="no-results">No matching topics</p>`;
    return;
  }

  elements.topicList.innerHTML = topics
    .map((topic) => {
      const active = topic.id === state.topicId ? " active" : "";
      const done = state.completed[topic.id] ? " done" : "";
      const status = state.completed[topic.id] ? "Done" : "Open";
      const marker = topic.type === "bridge" ? "Bridge" : topic.type === "lab" ? "Lab" : topic.id;

      return `
        <button class="topic-btn${active}" type="button" data-topic-id="${topic.id}">
          <span class="topic-title">
            <strong>${escapeHtml(marker)}</strong>
            <span>${escapeHtml(topic.title)}</span>
          </span>
          <span class="topic-status${done}">${status}</span>
        </button>
      `;
    })
    .join("");

  elements.topicList.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const topic = getTopic(button.dataset.topicId);
      state.topicId = topic.id;
      syncUnitToTopic(topic.id);
      state.section = "all";
      rememberTopic();
      render();
    });
  });
}

function renderLesson() {
  let topic = getTopic(state.topicId);

  if (!topic) {
    topic = getActiveSequence()[0];
    state.topicId = topic.id;
  }

  const sections = getSections(topic);
  const selectedSections = state.section === "all"
    ? sections
    : sections.filter((section) => section.id === state.section);
  const sequence = getActiveSequence();
  const topicIndex = sequence.findIndex((item) => item.id === topic.id);
  const meta = topic.type === "bridge" || topic.type === "lab"
    ? `${getActiveContext().label} | ${topic.type === "lab" ? "Exam Pattern" : "Bridge"}`
    : `Unit ${topic.unit} | Topic ${topic.id}`;

  elements.lessonMeta.textContent = meta;
  elements.lessonTitle.textContent = topic.title;
  elements.prevBtn.disabled = topicIndex <= 0;
  elements.nextBtn.disabled = topicIndex === -1 || topicIndex === sequence.length - 1;
  elements.completeBtn.textContent = state.completed[topic.id] ? "Completed" : "Mark Complete";
  elements.completeBtn.classList.toggle("is-complete", Boolean(state.completed[topic.id]));
  elements.completeBtn.setAttribute("aria-pressed", state.completed[topic.id] ? "true" : "false");
  elements.notesArea.value = state.notes[topic.id] || "";

  renderSectionTabs(sections);
  elements.lessonContent.innerHTML = selectedSections
    .map((section) => renderSection(section))
    .join("");

  renderNotesDrawer();
}

function renderSectionTabs(sections) {
  const tabs = [
    { id: "all", title: "Full Lesson" },
    ...sections.filter((section) => section.title).map((section) => ({
      id: section.id,
      title: section.title
    }))
  ];

  elements.sectionTabs.innerHTML = tabs
    .map((tab) => {
      const active = tab.id === state.section ? " active" : "";
      return `<button class="section-tab${active}" type="button" data-section="${escapeHtml(tab.id)}">${escapeHtml(shorten(tab.title, 30))}</button>`;
    })
    .join("");

  elements.sectionTabs.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      state.section = button.dataset.section;
      renderLesson();
      document.querySelector(".lesson-panel").scrollIntoView({ block: "start" });
    });
  });
}

function renderSection(section) {
  const heading = section.title ? `<h3>${escapeHtml(section.title)}</h3>` : "";
  return `${heading}${markdownToHtml(section.content)}`;
}

function renderNotesDrawer() {
  elements.notesDrawer.classList.toggle("active", state.notesOpen);
  elements.notesToggleBtn.classList.toggle("active", state.notesOpen);
  elements.notesToggleBtn.setAttribute("aria-expanded", state.notesOpen ? "true" : "false");
}

function renderProgress() {
  const sequence = getActiveSequence();
  const completed = sequence.filter((topic) => state.completed[topic.id]).length;
  elements.completeCount.textContent = completed;
  elements.remainingCount.textContent = sequence.length - completed;
}

function moveTopic(direction) {
  const sequence = getActiveSequence();
  const index = sequence.findIndex((topic) => topic.id === state.topicId);
  const next = sequence[index + direction];

  if (!next) {
    return;
  }

  state.topicId = next.id;
  syncUnitToTopic(next.id);
  state.section = "all";
  rememberTopic();
  render();
}

function toggleComplete() {
  const topic = getTopic(state.topicId);

  if (state.completed[topic.id]) {
    delete state.completed[topic.id];
  } else {
    state.completed[topic.id] = true;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.completed));
  render();
}

function saveNotes() {
  const topic = getTopic(state.topicId);
  const value = elements.notesArea.value;

  if (value.trim()) {
    state.notes[topic.id] = value;
  } else {
    delete state.notes[topic.id];
  }

  localStorage.setItem(NOTES_KEY, JSON.stringify(state.notes));
}

function filterTopics(topics) {
  if (!state.query) {
    return topics;
  }

  const query = state.query.toLowerCase();

  return topics.filter((topic) => {
    return `${topic.id} ${topic.title} ${topic.body}`.toLowerCase().includes(query);
  });
}

function getActiveContext() {
  if (state.mode === "learn") {
    const path = (data.learningPaths || []).find((item) => item.id === state.pathId) || data.learningPaths[0];
    return {
      label: "Learning Path",
      title: path.title,
      description: path.description,
      lessons: resolveSteps(path.stepIds)
    };
  }

  if (state.mode === "review") {
    const review = (data.reviewSets || []).find((item) => item.id === state.reviewId) || data.reviewSets[0];
    return {
      label: "Review Set",
      title: review.title,
      description: review.description,
      lessons: resolveSteps(review.stepIds)
    };
  }

  if (state.mode === "labs") {
    const lab = (data.examLabs || []).find((item) => item.id === state.labId) || data.examLabs[0];
    return {
      label: "Exam Labs",
      title: lab.title,
      description: lab.description,
      lessons: resolveSteps(lab.stepIds)
    };
  }

  const unit = getUnit(state.unit);
  return {
    label: `Unit ${unit.unit}`,
    title: unit.title.replace(/^Unit \d+: /, ""),
    description: "Browse the original AP unit organization.",
    lessons: unit.topics
  };
}

function getActiveSequence() {
  return getActiveContext().lessons;
}

function resolveSteps(stepIds) {
  return stepIds
    .map((id) => getTopic(id))
    .filter(Boolean);
}

function getNavTitle(item) {
  return item.navTitle || item.title;
}

function syncContextToTopic(topicId) {
  const path = (data.learningPaths || []).find((item) => item.stepIds.includes(topicId));

  if (path) {
    state.mode = "learn";
    state.pathId = path.id;
    syncUnitToTopic(topicId);
    return;
  }

  const review = (data.reviewSets || []).find((item) => item.stepIds.includes(topicId));

  if (review) {
    state.mode = "review";
    state.reviewId = review.id;
    syncUnitToTopic(topicId);
    return;
  }

  const lab = (data.examLabs || []).find((item) => item.stepIds.includes(topicId));

  if (lab) {
    state.mode = "labs";
    state.labId = lab.id;
    syncUnitToTopic(topicId);
    return;
  }

  state.mode = "browse";
  syncUnitToTopic(topicId);
}

function syncUnitToTopic(topicId) {
  const topic = getTopic(topicId);

  if (topic && typeof topic.unit === "number") {
    state.unit = topic.unit;
  }
}

function getUnit(unitNumber) {
  return data.units.find((unit) => unit.unit === unitNumber);
}

function getTopic(topicId) {
  return lessonById.get(topicId);
}

function rememberTopic() {
  localStorage.setItem(LAST_TOPIC_KEY, state.topicId);
}

function getSections(topic) {
  const lines = topic.body.split("\n");
  const sections = [];
  let current = {
    id: "intro",
    title: "",
    content: []
  };

  lines.forEach((line) => {
    const heading = line.match(/^### (.+)$/);

    if (heading) {
      if (current.content.join("\n").trim()) {
        sections.push({
          ...current,
          content: current.content.join("\n").trim()
        });
      }

      current = {
        id: slugify(heading[1]),
        title: heading[1],
        content: []
      };
    } else {
      current.content.push(line);
    }
  });

  if (current.content.join("\n").trim()) {
    sections.push({
      ...current,
      content: current.content.join("\n").trim()
    });
  }

  return sections;
}

function markdownToHtml(markdown) {
  const lines = markdown.split("\n");
  const html = [];
  let paragraph = [];
  let listType = null;
  let inCode = false;
  let codeLines = [];

  function flushParagraph() {
    if (paragraph.length > 0) {
      html.push(`<p>${formatInline(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  }

  function closeList() {
    if (listType) {
      html.push(`</${listType}>`);
      listType = null;
    }
  }

  function startList(type) {
    if (listType !== type) {
      closeList();
      html.push(`<${type}>`);
      listType = type;
    }
  }

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];

    if (line.startsWith("```")) {
      if (inCode) {
        html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
        codeLines = [];
        inCode = false;
      } else {
        flushParagraph();
        closeList();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      codeLines.push(line);
      continue;
    }

    if (line.trim() === "") {
      flushParagraph();
      closeList();
      continue;
    }

    const rawLine = line.trim();
    if (rawLine.startsWith("<details class=\"answer-toggle\"") || rawLine === "</div></details>") {
      flushParagraph();
      closeList();
      html.push(rawLine);
      continue;
    }

    if (isTableStart(lines, index)) {
      flushParagraph();
      closeList();
      const table = collectTable(lines, index);
      html.push(renderTable(table.rows));
      index = table.nextIndex - 1;
      continue;
    }

    const heading = line.match(/^(#{2,6}) (.+)$/);
    if (heading) {
      flushParagraph();
      closeList();
      const level = heading[1].length;
      html.push(`<h${level}>${formatInline(heading[2])}</h${level}>`);
      continue;
    }

    const bullet = line.match(/^- (.+)$/);
    if (bullet) {
      flushParagraph();
      startList("ul");
      html.push(`<li>${formatInline(bullet[1])}</li>`);
      continue;
    }

    const ordered = line.match(/^\d+\. (.+)$/);
    if (ordered) {
      flushParagraph();
      startList("ol");
      html.push(`<li>${formatInline(ordered[1])}</li>`);
      continue;
    }

    closeList();
    paragraph.push(line.trim());
  }

  if (inCode) {
    html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
  }

  flushParagraph();
  closeList();

  return html.join("");
}

function isTableStart(lines, index) {
  const current = lines[index] || "";
  const next = lines[index + 1] || "";
  return current.trim().startsWith("|") && /^\s*\|?[\s:-]+\|[\s|:-]*$/.test(next);
}

function collectTable(lines, startIndex) {
  const rows = [];
  let index = startIndex;

  while (index < lines.length && lines[index].trim().startsWith("|")) {
    if (!/^\s*\|?[\s:-]+\|[\s|:-]*$/.test(lines[index])) {
      rows.push(lines[index]);
    }
    index++;
  }

  return {
    rows,
    nextIndex: index
  };
}

function renderTable(rows) {
  if (rows.length === 0) {
    return "";
  }

  const parsed = rows.map((row) => {
    return row
      .trim()
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());
  });

  const head = parsed[0]
    .map((cell) => `<th>${formatInline(cell)}</th>`)
    .join("");
  const body = parsed
    .slice(1)
    .map((row) => `<tr>${row.map((cell) => `<td>${formatInline(cell)}</td>`).join("")}</tr>`)
    .join("");

  return `<table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
}

function splitAnswer(content) {
  const marker = content.match(/\n(Answer|Answers|Possible answer|Strong answer|Strong answer should mention):/i);

  if (!marker) {
    return {
      prompt: content,
      answer: ""
    };
  }

  const prompt = content.slice(0, marker.index).trim();
  const answer = content.slice(marker.index).trim();

  return {
    prompt,
    answer
  };
}

function formatInline(text) {
  const codeParts = text.split(/(`[^`]+`)/g);

  return codeParts
    .map((part) => {
      if (part.startsWith("`") && part.endsWith("`")) {
        return `<code>${escapeHtml(part.slice(1, -1))}</code>`;
      }

      return escapeHtml(part)
        .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
        .replace(/\*([^*]+)\*/g, "<em>$1</em>");
    })
    .join("");
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function shorten(value, maxLength) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 3)}...`;
}

function loadJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch (error) {
    return fallback;
  }
}
