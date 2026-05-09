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

function bridgeLesson(id, title, bodyLines) {
  return {
    id,
    title,
    unit: "Bridge",
    type: "bridge",
    source: "Guided learning path",
    body: bodyLines.join("\n")
  };
}

const bridgeLessons = [
  bridgeLesson("B-OBJECT-MODEL", "Bridge: From Values to Objects", [
    "### Why This Bridge Exists",
    "Early Java feels like arithmetic: store numbers, combine them, print answers. Objects add a new question: what if one value is not enough to describe the thing we care about?",
    "",
    "A `String` is not just letters. It is an object with stored text and methods such as `length`, `substring`, and `indexOf`. The same mental model will later apply to `Student`, `ScoreReport`, `ArrayList`, and arrays of objects.",
    "",
    "### Learn",
    "A primitive variable stores a direct value. A reference variable stores a way to find an object.",
    "",
    "| Kind | Example | What the variable holds |",
    "| --- | --- | --- |",
    "| primitive | `int score = 95;` | the number 95 |",
    "| reference | `String name = \"Ava\";` | a reference to a String object |",
    "",
    "This matters because method calls use the object that the reference points to.",
    "",
    "```java",
    "String word = \"study\";",
    "int count = word.length();",
    "```",
    "",
    "`word.length()` means: go to the `String` object referred to by `word`, then ask that object for its length.",
    "",
    "### Predict",
    "Before running the code, decide what prints.",
    "",
    "```java",
    "String a = \"APCSA\";",
    "String b = a.substring(2);",
    "System.out.println(a);",
    "System.out.println(b);",
    "```",
    "",
    "### Misconception Check",
    "- Calling a method does not always change the object. Many `String` methods return a new value.",
    "- A reference variable is not the whole object. It is the handle used to reach the object.",
    "- `null` means the reference currently points to no object.",
    "",
    "### Practice",
    "Explain in one sentence why `word.length()` needs parentheses but `score` does not.",
    "",
    "Possible answer: `length` is a method call that asks an object to do work and return a result; `score` is just a variable value."
  ]),
  bridgeLesson("B-CLASS-DESIGN-STORY", "Bridge: From Using Objects to Designing Objects", [
    "### Why This Bridge Exists",
    "Unit 1 teaches you to use objects that Java already gives you. Unit 3 asks you to design your own objects. The shift is from consumer to builder.",
    "",
    "A good class answers three questions: what data should each object remember, what actions should it support, and what details should stay hidden?",
    "",
    "### Learn",
    "Imagine a quiz app needs many questions. A plain set of variables becomes messy:",
    "",
    "```java",
    "String prompt1 = \"What is 2 + 3?\";",
    "int answer1 = 5;",
    "String prompt2 = \"What is 4 + 1?\";",
    "int answer2 = 5;",
    "```",
    "",
    "A class groups related data and behavior.",
    "",
    "```java",
    "public class Question {",
    "  private String prompt;",
    "  private int answer;",
    "",
    "  public Question(String p, int a) {",
    "    prompt = p;",
    "    answer = a;",
    "  }",
    "",
    "  public boolean isCorrect(int response) {",
    "    return response == answer;",
    "  }",
    "}",
    "```",
    "",
    "### Predict",
    "Which parts belong to each object separately? Which part is the method every `Question` object can perform?",
    "",
    "### Misconception Check",
    "- A class is the blueprint; an object is one actual instance created from that blueprint.",
    "- Instance variables should usually be `private` because other code should interact through methods.",
    "- A constructor initializes a new object; it does not have a return type.",
    "",
    "### Practice",
    "Design the instance variables for a `Song` class. Then write one method idea that would use those variables.",
    "",
    "Possible answer: `private String title; private int seconds;` and a method `isLong()` that returns whether `seconds > 300`."
  ]),
  bridgeLesson("B-ARRAYLIST-NEED", "Bridge: Why Arrays Are Not Always Enough", [
    "### Why This Bridge Exists",
    "Arrays are perfect when the size is known and stable. Many real problems are not like that. A diagnostic app might collect responses one at a time, and the number of answers may grow as students work.",
    "",
    "That is the problem `ArrayList` solves: a sequence whose size can change.",
    "",
    "### Learn",
    "Use an array when the length is fixed:",
    "",
    "```java",
    "int[] scores = new int[5];",
    "scores[0] = 92;",
    "```",
    "",
    "Use an `ArrayList` when items may be added or removed:",
    "",
    "```java",
    "ArrayList<String> names = new ArrayList<String>();",
    "names.add(\"Ava\");",
    "names.add(\"Leo\");",
    "names.remove(0);",
    "```",
    "",
    "The main tradeoff is that an array uses bracket access and has a fixed `length`, while an `ArrayList` uses methods such as `add`, `get`, `set`, `remove`, and `size`.",
    "",
    "### Predict",
    "What does this code print?",
    "",
    "```java",
    "ArrayList<String> names = new ArrayList<String>();",
    "names.add(\"Ava\");",
    "names.add(\"Leo\");",
    "names.add(1, \"Mia\");",
    "System.out.println(names.get(1));",
    "System.out.println(names.size());",
    "```",
    "",
    "### Misconception Check",
    "- `arr.length` is a field; `list.size()` is a method.",
    "- `list.get(i)` reads; `list.set(i, value)` replaces; `list.add(value)` grows the list.",
    "- Removing an item shifts later items left, so indexes can change during traversal.",
    "",
    "### Practice",
    "Write one sentence explaining why a classroom roster is a better fit for `ArrayList<String>` than `String[]` when students may join or leave."
  ]),
  bridgeLesson("B-ARRAYLIST-BOXING", "Bridge: Wrappers, Autoboxing, and ArrayList", [
    "### Why This Bridge Exists",
    "`ArrayList` stores objects, not primitive values. That is why `ArrayList<int>` is not valid Java. To store numbers in an `ArrayList`, Java uses wrapper classes such as `Integer` and `Double`.",
    "",
    "### Learn",
    "Use wrapper types in the type parameter:",
    "",
    "```java",
    "ArrayList<Integer> scores = new ArrayList<Integer>();",
    "scores.add(95);        // autoboxing: int becomes Integer",
    "int first = scores.get(0); // unboxing: Integer becomes int",
    "```",
    "",
    "Autoboxing is Java's automatic conversion from primitive to wrapper. Unboxing is the reverse.",
    "",
    "| Primitive | Wrapper | Example use in ArrayList |",
    "| --- | --- | --- |",
    "| `int` | `Integer` | `ArrayList<Integer>` |",
    "| `double` | `Double` | `ArrayList<Double>` |",
    "| `boolean` | `Boolean` | `ArrayList<Boolean>` |",
    "",
    "### Predict",
    "What is the value of `total`?",
    "",
    "```java",
    "ArrayList<Integer> scores = new ArrayList<Integer>();",
    "scores.add(10);",
    "scores.add(20);",
    "int total = scores.get(0) + scores.get(1);",
    "```",
    "",
    "### Misconception Check",
    "- `ArrayList<int>` is invalid because type parameters require reference types.",
    "- `Integer` objects can often be used in arithmetic because Java unboxes them.",
    "- Unboxing a `null` wrapper causes an error, because there is no primitive value inside.",
    "",
    "### Practice",
    "Declare an `ArrayList` that can store decimal quiz averages. Then add `87.5` to it.",
    "",
    "Possible answer: `ArrayList<Double> averages = new ArrayList<Double>(); averages.add(87.5);`"
  ]),
  bridgeLesson("B-ARRAY-TO-2D", "Bridge: From One Row to a Grid", [
    "### Why This Bridge Exists",
    "A regular array models one sequence. A 2D array models rows and columns. This is useful for seats, images, game boards, spreadsheets, and tables of test data.",
    "",
    "### Learn",
    "Think of `grid[row][col]` as two choices: choose a row, then choose an item inside that row.",
    "",
    "```java",
    "int[][] grid = {",
    "  {4, 7, 1},",
    "  {9, 2, 6}",
    "};",
    "",
    "System.out.println(grid[0][1]); // 7",
    "System.out.println(grid.length); // number of rows: 2",
    "System.out.println(grid[0].length); // columns in row 0: 3",
    "```",
    "",
    "### Predict",
    "Which value is printed by `grid[1][2]` in the example above?",
    "",
    "### Misconception Check",
    "- The first index is the row, not the column.",
    "- `grid.length` is the number of rows.",
    "- `grid[r].length` is the number of columns in row `r`.",
    "",
    "### Practice",
    "Write nested loop headers that visit every cell in row-major order.",
    "",
    "Possible answer: `for (int r = 0; r < grid.length; r++)` and inside it `for (int c = 0; c < grid[r].length; c++)`."
  ]),
  bridgeLesson("B-ITERATION-RECURSION", "Bridge: From Loops to Recursion", [
    "### Why This Bridge Exists",
    "Loops repeat by moving a variable toward a stopping condition. Recursion repeats by calling the same method on a smaller version of the problem.",
    "",
    "### Learn",
    "Every AP CSA recursive method needs two ideas: a base case and a recursive call.",
    "",
    "```java",
    "public static int sumTo(int n) {",
    "  if (n == 1) {",
    "    return 1;",
    "  }",
    "  return n + sumTo(n - 1);",
    "}",
    "```",
    "",
    "The base case stops the chain. The recursive call makes progress toward the base case.",
    "",
    "### Predict",
    "Trace `sumTo(4)`. Write the pending additions before calculating the final answer.",
    "",
    "### Misconception Check",
    "- A recursive method is not magic; it creates a chain of method calls.",
    "- Forgetting the base case usually causes infinite recursion.",
    "- A recursive call must move toward the base case.",
    "",
    "### Practice",
    "For a method that counts down from `n` to 1, identify the base case and the smaller recursive call.",
    "",
    "Possible answer: base case `n == 1`; smaller call uses `n - 1`."
  ]),
  bridgeLesson("B-FRQ-READING", "Bridge: Reading FRQs Like Specifications", [
    "### Why This Bridge Exists",
    "Students often lose FRQ points because they start coding before extracting the contract. FRQs are not just coding prompts; they are specifications with required behavior, restrictions, and examples.",
    "",
    "### Learn",
    "Before writing code, mark four things:",
    "",
    "1. Inputs: parameters, instance variables, and any helper methods already provided.",
    "2. Output: return value or mutation that must happen.",
    "3. Rules: restrictions such as not modifying a list, using a helper method, or preserving order.",
    "4. Examples: sample cases that reveal edge behavior.",
    "",
    "A strong FRQ solution usually starts as a short algorithm in English.",
    "",
    "```java",
    "// Goal: count values above threshold",
    "// Plan: traverse every item, test it, update count, return count",
    "```",
    "",
    "### Predict",
    "If a prompt says a method should return a value, should you print the answer? Explain.",
    "",
    "### Misconception Check",
    "- Do not add input prompts or extra print statements unless the FRQ asks for them.",
    "- Do not rewrite provided classes or helper methods.",
    "- Keep variable names simple and traceable; clarity helps avoid small logic mistakes.",
    "",
    "### Practice",
    "For any FRQ part, write a three-line plan: data to inspect, condition to test, value to return or update."
  ])
];

const learningPaths = [
  {
    id: "path-foundations",
    navTitle: "1. Foundations",
    title: "1. Foundations: Values, Expressions, and Decisions",
    description: "Start with variables, expressions, output, input, and the Boolean decisions that make programs respond to data.",
    stepIds: ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "2.2", "2.3", "2.4"]
  },
  {
    id: "path-methods-objects",
    navTitle: "2. Methods & Objects",
    title: "2. Methods, Libraries, and Objects",
    description: "Move from using Java APIs to understanding reference variables and object method calls.",
    stepIds: ["1.7", "1.8", "1.9", "1.10", "1.11", "B-OBJECT-MODEL", "1.12", "1.13", "1.14", "1.15"]
  },
  {
    id: "path-control-algorithms",
    navTitle: "3. Control Flow",
    title: "3. Control Flow as Algorithms",
    description: "Build reliable selection, loop, string, nested-loop, and run-time reasoning habits.",
    stepIds: ["2.1", "2.5", "2.6", "2.7", "2.8", "2.9", "2.10", "2.11", "2.12"]
  },
  {
    id: "path-class-design",
    navTitle: "4. Classes",
    title: "4. Designing Classes",
    description: "Shift from using objects to writing classes with constructors, methods, scope, and reference behavior.",
    stepIds: ["B-CLASS-DESIGN-STORY", "3.1", "3.3", "3.4", "3.5", "3.8", "3.9", "3.6", "3.7", "3.2"]
  },
  {
    id: "path-array-data",
    navTitle: "5. Arrays",
    title: "5. Arrays and Data Sets",
    description: "Learn fixed-size collections, traversals, text-file data, and the common algorithms that appear in MCQ and FRQ tasks.",
    stepIds: ["4.1", "4.2", "4.3", "4.4", "4.5", "4.6"]
  },
  {
    id: "path-arraylist-data",
    navTitle: "6. ArrayList",
    title: "6. ArrayList and Growing Data",
    description: "Understand why ArrayList exists, why wrappers matter, and how insertion/removal changes traversal strategy.",
    stepIds: ["B-ARRAYLIST-NEED", "4.7", "B-ARRAYLIST-BOXING", "4.8", "4.9", "4.10"]
  },
  {
    id: "path-2d-grid",
    navTitle: "7. 2D Arrays",
    title: "7. 2D Arrays and Grid Algorithms",
    description: "Extend one-dimensional traversal into row-column reasoning for tables, boards, and matrix-style FRQs.",
    stepIds: ["B-ARRAY-TO-2D", "4.11", "4.12", "4.13"]
  },
  {
    id: "path-search-sort-recursion",
    navTitle: "8. Search & Recursion",
    title: "8. Search, Sort, and Recursion",
    description: "Connect traversal algorithms to binary search, sorting, recursive thinking, and recursive search/sort.",
    stepIds: ["4.14", "4.15", "B-ITERATION-RECURSION", "4.16", "4.17"]
  },
  {
    id: "path-frq-integration",
    navTitle: "9. FRQ Integration",
    title: "9. FRQ Integration",
    description: "Practice reading specifications and choosing the right tools for method, class, ArrayList, and 2D-array FRQs.",
    stepIds: ["B-FRQ-READING", "2.9", "3.5", "3.6", "4.5", "4.10", "4.13", "4.16"]
  }
];

const reviewSets = [
  {
    id: "review-reference-types",
    navTitle: "Reference Types",
    title: "Reference Types and Aliasing",
    description: "Review the concepts that make objects, arrays, wrappers, and ArrayLists behave differently from primitive variables.",
    stepIds: ["B-OBJECT-MODEL", "1.12", "1.13", "1.14", "3.6", "4.7", "B-ARRAYLIST-BOXING", "4.8"]
  },
  {
    id: "review-indexing-bounds",
    navTitle: "Indexing & Bounds",
    title: "Indexing and Bounds",
    description: "Strengthen zero-based indexing across String, arrays, ArrayList, and 2D arrays.",
    stepIds: ["1.15", "4.3", "4.4", "4.8", "4.9", "B-ARRAY-TO-2D", "4.11", "4.12"]
  },
  {
    id: "review-traversal-algorithms",
    navTitle: "Traversal",
    title: "Traversal Algorithms",
    description: "Practice reading, counting, accumulating, filtering, and mutating across every AP-tested collection type.",
    stepIds: ["2.7", "2.8", "2.10", "2.11", "4.4", "4.5", "4.9", "4.10", "4.12", "4.13"]
  },
  {
    id: "review-frq-readiness",
    navTitle: "FRQ Readiness",
    title: "FRQ Readiness",
    description: "Focus on the writing skills most likely to determine free-response score quality.",
    stepIds: ["B-FRQ-READING", "1.9", "2.9", "3.4", "3.5", "3.8", "4.5", "4.10", "4.13"]
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
  bridgeLessons,
  learningPaths,
  reviewSets,
  units
};

fs.writeFileSync(
  outputFile,
  `window.APCSA_TUTORIAL_DATA = ${JSON.stringify(payload, null, 2)};\n`
);

console.log(`Wrote ${payload.topicCount} topics to ${path.relative(process.cwd(), outputFile)}`);
