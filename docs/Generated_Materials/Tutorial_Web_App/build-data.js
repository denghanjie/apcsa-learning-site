const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..", "Detailed_Tutorials");
const outputFile = path.resolve(__dirname, "tutorial-data.js");

const unitFiles = [
  {
    unit: 1,
    title: "Unit 1: Using Objects and Methods",
    file: "Unit1_Detailed_Tutorials.md"
  },
  {
    unit: 2,
    title: "Unit 2: Selection and Iteration",
    file: "Unit2_Detailed_Tutorials.md"
  },
  {
    unit: 3,
    title: "Unit 3: Class Creation",
    file: "Unit3_Detailed_Tutorials.md"
  },
  {
    unit: 4,
    title: "Unit 4: Data Collections",
    file: "Unit4_Detailed_Tutorials.md"
  }
];

function parseTopics(markdown, unitInfo) {
  const headingPattern = /^## (\d+\.\d+) (.+)$/gm;
  const matches = Array.from(markdown.matchAll(headingPattern));

  return matches.map((match, index) => {
    const next = matches[index + 1];
    const start = match.index + match[0].length;
    const end = next ? next.index : markdown.length;
    const body = markdown.slice(start, end).trim();

    return {
      id: match[1],
      title: match[2].trim(),
      unit: unitInfo.unit,
      source: unitInfo.file,
      body
    };
  });
}

const units = unitFiles.map((unitInfo) => {
  const filePath = path.join(root, unitInfo.file);
  const markdown = fs.readFileSync(filePath, "utf8");

  return {
    unit: unitInfo.unit,
    title: unitInfo.title,
    file: unitInfo.file,
    topics: parseTopics(markdown, unitInfo)
  };
});

const payload = {
  title: "AP CSA Detailed Tutorials",
  topicCount: units.reduce((total, unit) => total + unit.topics.length, 0),
  units
};

fs.writeFileSync(
  outputFile,
  `window.APCSA_TUTORIAL_DATA = ${JSON.stringify(payload, null, 2)};\n`
);

console.log(`Wrote ${payload.topicCount} topics to ${path.relative(process.cwd(), outputFile)}`);
