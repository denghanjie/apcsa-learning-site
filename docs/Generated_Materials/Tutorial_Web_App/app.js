const STORAGE_KEY = "apcsa-tutorial-progress-v1";
const NOTES_KEY = "apcsa-tutorial-notes-v1";
const LAST_TOPIC_KEY = "apcsa-tutorial-last-topic-v1";

const data = window.APCSA_TUTORIAL_DATA;
const allTopics = data.units.flatMap((unit) => unit.topics);

const state = {
  unit: 1,
  topicId: allTopics[0].id,
  query: "",
  section: "all",
  completed: loadJson(STORAGE_KEY, {}),
  notes: loadJson(NOTES_KEY, {})
};

const elements = {
  unitNav: document.getElementById("unitNav"),
  topicList: document.getElementById("topicList"),
  searchInput: document.getElementById("searchInput"),
  activeUnitLabel: document.getElementById("activeUnitLabel"),
  activeUnitTitle: document.getElementById("activeUnitTitle"),
  completeCount: document.getElementById("completeCount"),
  remainingCount: document.getElementById("remainingCount"),
  lessonMeta: document.getElementById("lessonMeta"),
  lessonTitle: document.getElementById("lessonTitle"),
  lessonContent: document.getElementById("lessonContent"),
  sectionTabs: document.getElementById("sectionTabs"),
  practicePanel: document.getElementById("practicePanel"),
  notesArea: document.getElementById("notesArea"),
  prevBtn: document.getElementById("prevBtn"),
  nextBtn: document.getElementById("nextBtn"),
  completeBtn: document.getElementById("completeBtn")
};

init();

function init() {
  const lastTopic = localStorage.getItem(LAST_TOPIC_KEY);

  if (lastTopic && allTopics.some((topic) => topic.id === lastTopic)) {
    state.topicId = lastTopic;
    state.unit = getTopic(lastTopic).unit;
  }

  elements.searchInput.addEventListener("input", () => {
    state.query = elements.searchInput.value.trim();
    renderTopicList();
  });

  elements.prevBtn.addEventListener("click", () => moveTopic(-1));
  elements.nextBtn.addEventListener("click", () => moveTopic(1));
  elements.completeBtn.addEventListener("click", toggleComplete);
  elements.notesArea.addEventListener("input", saveNotes);

  render();
}

function render() {
  renderUnits();
  renderTopicList();
  renderLesson();
  renderProgress();
}

function renderUnits() {
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
  const unit = getUnit(state.unit);
  const topics = filterTopics(unit.topics);
  elements.activeUnitLabel.textContent = `Unit ${unit.unit}`;
  elements.activeUnitTitle.textContent = unit.title.replace(/^Unit \d+: /, "");

  if (topics.length === 0) {
    elements.topicList.innerHTML = `<p class="no-results">No matching topics</p>`;
    return;
  }

  elements.topicList.innerHTML = topics
    .map((topic) => {
      const active = topic.id === state.topicId ? " active" : "";
      const done = state.completed[topic.id] ? " done" : "";
      const status = state.completed[topic.id] ? "Done" : "Open";

      return `
        <button class="topic-btn${active}" type="button" data-topic-id="${topic.id}">
          <span class="topic-title">
            <strong>${escapeHtml(topic.id)}</strong>
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
      state.unit = topic.unit;
      state.section = "all";
      rememberTopic();
      render();
    });
  });
}

function renderLesson() {
  const topic = getTopic(state.topicId);
  const sections = getSections(topic);
  const selectedSections = state.section === "all"
    ? sections
    : sections.filter((section) => section.id === state.section);
  const topicIndex = allTopics.findIndex((item) => item.id === topic.id);

  elements.lessonMeta.textContent = `Unit ${topic.unit} | Topic ${topic.id}`;
  elements.lessonTitle.textContent = topic.title;
  elements.prevBtn.disabled = topicIndex === 0;
  elements.nextBtn.disabled = topicIndex === allTopics.length - 1;
  elements.completeBtn.textContent = state.completed[topic.id] ? "Completed" : "Mark Complete";
  elements.completeBtn.classList.toggle("is-complete", Boolean(state.completed[topic.id]));
  elements.completeBtn.setAttribute("aria-pressed", state.completed[topic.id] ? "true" : "false");
  elements.notesArea.value = state.notes[topic.id] || "";

  renderSectionTabs(sections);
  elements.lessonContent.innerHTML = selectedSections
    .map((section) => renderSection(section))
    .join("");

  renderPractice(sections);
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

function renderPractice(sections) {
  const practiceSections = sections.filter((section) => {
    const title = section.title.toLowerCase();
    return title.includes("practice") || title.includes("checkpoint");
  });

  if (practiceSections.length === 0) {
    elements.practicePanel.innerHTML = `<p class="empty-state">No separate practice section in this topic.</p>`;
    return;
  }

  elements.practicePanel.innerHTML = practiceSections
    .map((section) => {
      const split = splitAnswer(section.content);
      const answer = split.answer
        ? `
          <details class="answer-toggle">
            <summary>Show worked answer</summary>
            <div class="answer-body">${markdownToHtml(split.answer)}</div>
          </details>
        `
        : "";

      return `
        <section class="practice-item">
          <h3>${escapeHtml(section.title)}</h3>
          <div class="practice-body">${markdownToHtml(split.prompt)}</div>
          ${answer}
        </section>
      `;
    })
    .join("");
}

function renderProgress() {
  const completed = allTopics.filter((topic) => state.completed[topic.id]).length;
  elements.completeCount.textContent = completed;
  elements.remainingCount.textContent = allTopics.length - completed;
}

function moveTopic(direction) {
  const index = allTopics.findIndex((topic) => topic.id === state.topicId);
  const next = allTopics[index + direction];

  if (!next) {
    return;
  }

  state.topicId = next.id;
  state.unit = next.unit;
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

function getUnit(unitNumber) {
  return data.units.find((unit) => unit.unit === unitNumber);
}

function getTopic(topicId) {
  return allTopics.find((topic) => topic.id === topicId);
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
