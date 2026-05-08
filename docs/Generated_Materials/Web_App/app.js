const MCQ_POINTS = 2;

const units = [
  { id: "u1", name: "Unit 1", full: "Using Objects and Methods", mcq: [1, 2, 3, 4, 5, 6] },
  { id: "u2", name: "Unit 2", full: "Selection and Iteration", mcq: [7, 8, 9, 10, 11, 12, 13, 14, 15] },
  { id: "u3", name: "Unit 3", full: "Class Creation", mcq: [16, 17, 18, 19] },
  { id: "u4", name: "Unit 4", full: "Data Collections", mcq: [20, 21, 22, 23, 24, 25, 26, 27, 28] }
];

const mcqQuestions = [
  {
    id: 1,
    unit: "u1",
    tag: "Casting",
    prompt: "What is printed by the following code segment?",
    code: `int a = 17;
int b = 5;
double x = a / b;
double y = (double) (a / b);
double z = (double) a / b;
System.out.println(x + " " + y + " " + z);`,
    choices: ["3 3 3", "3.0 3.0 3.4", "3.4 3.4 3.4", "3.0 3.4 3.4"],
    answer: 1,
    note: "`a / b` uses integer division unless `a` is cast before the division."
  },
  {
    id: 2,
    unit: "u1",
    tag: "Expressions",
    prompt: "What is the value of the expression?",
    code: "14 + 18 % 5 * 2 - 6 / 4",
    choices: ["16", "18", "19", "20"],
    answer: 2,
    note: "`18 % 5` is 3, `3 * 2` is 6, and `6 / 4` is 1."
  },
  {
    id: 3,
    unit: "u1",
    tag: "Math.random",
    prompt: "Which expression produces a random integer from 1 through 6, inclusive?",
    choices: [
      "(int) (Math.random() * 6)",
      "(int) (Math.random() * 6) + 1",
      "(int) (Math.random() * 7)",
      "(int) (Math.random() * 5) + 1"
    ],
    answer: 1,
    note: "The cast produces 0 through 5, then adding 1 shifts the range to 1 through 6."
  },
  {
    id: 4,
    unit: "u1",
    tag: "String",
    prompt: "What is the value of `part`?",
    code: `String s = "diagnostic";
String part = s.substring(3, 7);`,
    choices: ['"gno"', '"gnos"', '"agno"', '"nostic"'],
    answer: 1,
    note: "`substring(3, 7)` includes index 3 and stops before index 7."
  },
  {
    id: 5,
    unit: "u1",
    tag: "Objects",
    prompt: "What is printed?",
    code: `String a = "code";
String b = new String("code");
System.out.println((a == b) + " " + a.equals(b));`,
    choices: ["true true", "true false", "false true", "false false"],
    answer: 2,
    note: "`==` compares object references. `equals` compares the String contents."
  },
  {
    id: 6,
    unit: "u1",
    tag: "Signatures",
    prompt: "Assume the following method appears in the same class. Which call is valid?",
    code: "public double convert(int n, double scale)",
    choices: ["convert(4.0, 2);", "convert(4, 2.5);", 'convert("4", 2.5);', "convert(4);"],
    answer: 1,
    note: "The method requires two arguments: an `int` followed by a `double`."
  },
  {
    id: 7,
    unit: "u2",
    tag: "Boolean",
    prompt: "What is the value of `result`?",
    code: `int x = 4;
int y = 9;
int z = 9;
boolean result = x < y && !(y != z) || x == z;`,
    choices: ["true", "false", "The expression does not compile.", "The expression causes a run-time error."],
    answer: 0,
    note: "`x < y` is true, `y != z` is false, so `!(y != z)` is true."
  },
  {
    id: 8,
    unit: "u2",
    tag: "Short-circuit",
    prompt: "What happens when this code segment is executed?",
    code: `int n = 0;
boolean ok = n != 0 && 12 / n > 2;
System.out.println(ok);`,
    choices: [
      "It prints true.",
      "It prints false.",
      "It causes a compile-time error.",
      "It causes a run-time division-by-zero error."
    ],
    answer: 1,
    note: "The right side of `&&` is not evaluated because the left side is false."
  },
  {
    id: 9,
    unit: "u2",
    tag: "Selection",
    prompt: "What is printed?",
    code: `int score = 72;
String label;

if (score >= 90)
{
    label = "A";
}
else if (score >= 80)
{
    label = "B";
}
else
{
    label = "D";
}

if (score >= 70)
{
    label = "C";
}

System.out.println(label);`,
    choices: ["A", "B", "C", "D"],
    answer: 2,
    note: "The first structure sets `label` to `D`, then the separate `if` changes it to `C`."
  },
  {
    id: 10,
    unit: "u2",
    tag: "Nested if",
    prompt: "What is printed?",
    code: `int a = 3;
int b = 8;

if (a > b)
{
    System.out.print("X");
}
else
{
    if (b % a == 2)
    {
        System.out.print("Y");
    }
    else
    {
        System.out.print("Z");
    }
}`,
    choices: ["X", "Y", "Z", "Nothing is printed."],
    answer: 1,
    note: "`a > b` is false, and `8 % 3` is 2."
  },
  {
    id: 11,
    unit: "u2",
    tag: "while",
    prompt: "What is printed?",
    code: `int total = 0;
int k = 1;

while (k < 8)
{
    total += k;
    k += 2;
}

System.out.println(total);`,
    choices: ["9", "12", "16", "25"],
    answer: 2,
    note: "The loop adds 1, 3, 5, and 7."
  },
  {
    id: 12,
    unit: "u2",
    tag: "for loop",
    prompt: "How many times is `count++` executed?",
    code: `int count = 0;

for (int i = 10; i > 1; i -= 3)
{
    count++;
}`,
    choices: ["2", "3", "4", "5"],
    answer: 1,
    note: "`i` has values 10, 7, and 4 inside the loop."
  },
  {
    id: 13,
    unit: "u2",
    tag: "Nested loops",
    prompt: "How many asterisks are printed?",
    code: `for (int row = 1; row <= 3; row++)
{
    for (int col = 0; col < row; col++)
    {
        System.out.print("*");
    }
}`,
    choices: ["3", "4", "5", "6"],
    answer: 3,
    note: "The inner loop prints 1 + 2 + 3 asterisks."
  },
  {
    id: 14,
    unit: "u2",
    tag: "Runtime",
    prompt: "How many times is the statement `sum += i * j;` executed?",
    code: `int sum = 0;
for (int i = 0; i < 4; i++)
{
    for (int j = 0; j < 5; j++)
    {
        sum += i * j;
    }
}`,
    choices: ["9", "16", "20", "25"],
    answer: 2,
    note: "Four outer iterations times five inner iterations gives 20."
  },
  {
    id: 15,
    unit: "u2",
    tag: "String algorithm",
    prompt: "What is the value of `count`?",
    code: `String word = "banana";
int count = 0;

for (int i = 0; i < word.length() - 1; i++)
{
    if (word.substring(i, i + 2).equals("an"))
    {
        count++;
    }
}`,
    choices: ["1", "2", "3", "4"],
    answer: 1,
    note: "`an` appears starting at indexes 1 and 3."
  },
  {
    id: 16,
    unit: "u3",
    tag: "Aliasing",
    prompt: "What is printed?",
    code: `public class Counter
{
    private int value;

    public Counter(int n)
    {
        value = n;
    }

    public void add(int n)
    {
        value += n;
    }

    public int getValue()
    {
        return value;
    }
}

Counter c1 = new Counter(2);
Counter c2 = c1;
c2.add(5);
System.out.println(c1.getValue());`,
    choices: ["2", "5", "7", "The code does not compile."],
    answer: 2,
    note: "`c1` and `c2` are aliases for the same object."
  },
  {
    id: 17,
    unit: "u3",
    tag: "static",
    prompt: "What is printed?",
    code: `public class Ticket
{
    private static int next = 100;
    private int id;

    public Ticket()
    {
        id = next;
        next += 10;
    }

    public int getId()
    {
        return id;
    }
}

Ticket t1 = new Ticket();
Ticket t2 = new Ticket();
System.out.println(t1.getId() + " " + t2.getId());`,
    choices: ["100 100", "100 110", "110 120", "110 110"],
    answer: 1,
    note: "`next` is shared across all `Ticket` instances."
  },
  {
    id: 18,
    unit: "u3",
    tag: "this",
    prompt: "What is printed?",
    code: `public class Box
{
    private int size;

    public Box(int size)
    {
        size = size;
    }

    public int getSize()
    {
        return size;
    }
}

Box b = new Box(5);
System.out.println(b.getSize());`,
    choices: ["0", "5", "null", "The code does not compile."],
    answer: 0,
    note: "The constructor assigns the parameter to itself. `this.size = size;` was needed."
  },
  {
    id: 19,
    unit: "u3",
    tag: "References",
    prompt: "What is printed?",
    code: `public class Item
{
    private int value;

    public Item(int v)
    {
        value = v;
    }

    public void setValue(int v)
    {
        value = v;
    }

    public int getValue()
    {
        return value;
    }
}

public static void change(Item x)
{
    x.setValue(8);
    x = new Item(3);
}

Item item = new Item(1);
change(item);
System.out.println(item.getValue());`,
    choices: ["1", "3", "8", "The code does not compile."],
    answer: 2,
    note: "The original object is mutated before the local parameter is reassigned."
  },
  {
    id: 20,
    unit: "u4",
    tag: "Arrays",
    prompt: "What are the contents of `nums` after the code segment is executed?",
    code: `int[] nums = {4, 1, 7};
nums[nums.length - 1] = nums[0] + nums[1];`,
    choices: ["{4, 1, 5}", "{4, 5, 7}", "{5, 1, 7}", "{4, 1, 8}"],
    answer: 0,
    note: "The last element is replaced with `4 + 1`."
  },
  {
    id: 21,
    unit: "u4",
    tag: "Enhanced for",
    prompt: "What are the contents of `data` after the code segment is executed?",
    code: `int[] data = {2, 4, 6};

for (int n : data)
{
    n = 0;
}`,
    choices: ["{0, 0, 0}", "{2, 4, 6}", "{0, 4, 6}", "The code does not compile."],
    answer: 1,
    note: "Assigning to the enhanced-for variable does not change array elements."
  },
  {
    id: 22,
    unit: "u4",
    tag: "ArrayList",
    prompt: 'Assume `list` initially contains `["A", "B", "C", "D"]`. What does it contain after this code segment?',
    code: `list.remove(1);
list.add(2, "X");`,
    choices: [
      '["A", "B", "X", "C", "D"]',
      '["A", "C", "X", "D"]',
      '["A", "X", "C", "D"]',
      '["A", "C", "D", "X"]'
    ],
    answer: 1,
    note: "Removing index 1 removes `B`; adding at index 2 inserts before `D`."
  },
  {
    id: 23,
    unit: "u4",
    tag: "Remove",
    prompt: "Assume `nums` initially contains `[2, 4, 6]`. What does it contain after this code segment?",
    code: `for (int i = 0; i < nums.size(); i++)
{
    if (nums.get(i) % 2 == 0)
    {
        nums.remove(i);
    }
}`,
    choices: ["[]", "[4]", "[2, 6]", "[2, 4, 6]"],
    answer: 1,
    note: "After removing 2, 4 shifts to index 0 while `i` advances to index 1."
  },
  {
    id: 24,
    unit: "u4",
    tag: "2D traversal",
    prompt: "What is printed?",
    code: `int[][] grid = {{1, 2, 3}, {4, 5, 6}};

for (int col = 0; col < grid[0].length; col++)
{
    for (int row = 0; row < grid.length; row++)
    {
        System.out.print(grid[row][col] + " ");
    }
}`,
    choices: ["1 2 3 4 5 6", "1 4 2 5 3 6", "1 4 5 2 3 6", "The code causes an index error."],
    answer: 1,
    note: "The nested loops traverse by column first, then row."
  },
  {
    id: 25,
    unit: "u4",
    tag: "Search",
    prompt: "What is returned by `search(new int[] {3, 5, 2, 8}, 4)`?",
    code: `public static int search(int[] arr, int target)
{
    for (int i = 0; i < arr.length; i++)
    {
        if (arr[i] > target)
        {
            return i;
        }
    }
    return -1;
}`,
    choices: ["-1", "0", "1", "3"],
    answer: 2,
    note: "The first value greater than 4 is 5 at index 1."
  },
  {
    id: 26,
    unit: "u4",
    tag: "Sorting",
    prompt: "An array begins as `{5, 1, 4, 2}`. After the first pass of selection sort in increasing order, what is the array?",
    choices: ["{1, 5, 4, 2}", "{1, 2, 4, 5}", "{5, 1, 2, 4}", "{2, 1, 4, 5}"],
    answer: 0,
    note: "Selection sort swaps the smallest remaining value into the first unsorted position."
  },
  {
    id: 27,
    unit: "u4",
    tag: "Recursion",
    prompt: "What is returned by `mystery(4)`?",
    code: `public static int mystery(int n)
{
    if (n <= 0)
    {
        return 0;
    }
    return n + mystery(n - 2);
}`,
    choices: ["4", "6", "10", "The method never terminates."],
    answer: 1,
    note: "`mystery(4)` is `4 + mystery(2)`, which is `4 + 2 + 0`."
  },
  {
    id: 28,
    unit: "u4",
    tag: "Binary search / merge sort",
    prompt: "Which statement correctly describes both binary search and merge sort?",
    choices: [
      "Binary search works on unsorted data, and merge sort repeatedly swaps adjacent elements.",
      "Binary search repeatedly eliminates half of a sorted search range, and merge sort recursively splits and merges sorted subarrays.",
      "Binary search repeatedly merges sorted halves, and merge sort checks each element from left to right.",
      "Binary search and merge sort are both outside the AP CSA exam scope."
    ],
    answer: 1,
    note: "Binary search works on sorted data and narrows the possible range by halves. Merge sort recursively splits, then merges sorted subarrays."
  }
];

const frqQuestions = [
  {
    id: "frq1",
    number: 1,
    unit: "u1",
    tag: "Methods and Control Structures",
    title: "Methods and Control Structures",
    points: 12,
    body: `Scenario
The CodeTools class contains small helper methods that are used by a practice app. You will complete two static methods. Both methods should work for all valid parameter values, not just for the examples.

Part (a): countMultiples
Write countMultiples, which returns the number of integers from start through end, inclusive, that are evenly divisible by factor.

Assumptions:
- start <= end
- factor > 0

Examples:
- countMultiples(3, 12, 3) returns 4 because 3, 6, 9, and 12 are divisible by 3.
- countMultiples(5, 10, 4) returns 1 because only 8 is divisible by 4.
- countMultiples(1, 5, 9) returns 0 because no value in the range is divisible by 9.

Implementation guidance:
- Use a loop to visit every integer in the inclusive range.
- Use the remainder operator to test whether a value is divisible by factor.
- Return the final count after the loop finishes.

Part (b): countNonOverlapping
Write countNonOverlapping, which returns the number of non-overlapping occurrences of target in text.

Assumption:
- target.length() > 0

Examples:
- countNonOverlapping("banana", "an") returns 2.
- countNonOverlapping("aaaaa", "aa") returns 2, not 4, because the matching substrings may not overlap.
- countNonOverlapping("abc", "z") returns 0.

Implementation guidance:
- Search from left to right through text.
- When a match is found, advance by target.length() so the next match cannot overlap the previous one.
- Stop when there is not enough text remaining for another full target.`,
    code: `public class CodeTools
{
    public static int countMultiples(int start, int end, int factor)
    {
        /* to be implemented */
    }

    public static int countNonOverlapping(String text, String target)
    {
        /* to be implemented */
    }
}`,
    rubric: [
      "Initializes count variables correctly.",
      "Loops from start through end inclusively.",
      "Uses modulo to test divisibility.",
      "Counts only matching multiples.",
      "Searches target occurrences in text correctly.",
      "Advances by target.length() after a match to prevent overlap.",
      "Handles not-found cases and loop termination.",
      "Returns the correct values from both methods."
    ],
    study: ["Method writing", "Loop bounds", "String traversal", "Non-overlapping pattern logic"]
  },
  {
    id: "frq2",
    number: 2,
    unit: "u3",
    tag: "Class Design",
    title: "Class Design",
    points: 12,
    body: `Scenario
A tutoring platform tracks how much practice a student has completed for one AP CSA topic. You will design a complete class named PracticeRecord.

Each PracticeRecord object must store:
- the topic name as a String
- the total minutes practiced as an int
- the total number of correct answers as an int
- the total number of attempted questions as an int

Required constructor:
public PracticeRecord(String topicName)

The constructor initializes the topic name. The total minutes, total correct answers, and total attempted questions should all begin at 0.

Required method:
public void addResult(int minutes, int correct, int attempted)

This method adds one practice session to the record. Add minutes to the total minutes, correct to the total correct answers, and attempted to the total attempted questions.

Assumptions:
- all parameters are nonnegative
- correct <= attempted

Required method:
public double accuracy()

This method returns total correct answers divided by total attempted questions as a double. If there have been no attempted questions, return 0.0.

Required method:
public boolean needsReview()

This method returns true if the student has practiced fewer than 30 total minutes or if the student's accuracy is less than 0.70. Otherwise, it returns false.

Example:
PracticeRecord r = new PracticeRecord("ArrayList");
r.addResult(20, 6, 10);
r.needsReview() returns true because total practice time is below 30 minutes.

After r.addResult(15, 8, 10), the record has 35 minutes, 14 correct, and 20 attempted. accuracy() returns 0.7, and needsReview() returns false.`,
    rubric: [
      "Uses a correct public class header.",
      "Declares private instance variables for topic, minutes, correct, and attempted.",
      "Constructor initializes topic and zeroes numeric totals.",
      "addResult updates minutes, correct, and attempted.",
      "accuracy returns a double ratio.",
      "accuracy returns 0.0 when attempted is 0.",
      "needsReview uses both conditions with OR logic.",
      "Uses correct return types, access modifiers, and syntax."
    ],
    study: ["Class anatomy", "Constructors", "Instance variables", "this and state", "Return values"]
  },
  {
    id: "frq3",
    number: 3,
    unit: "u4",
    tag: "ArrayList Data Analysis",
    title: "Data Analysis with ArrayList",
    points: 10,
    body: `Scenario
A diagnostic report stores each quiz attempt as an Attempt object. Each attempt has a topic name and a score percentage. You will write a method that identifies the topics that need review.

The Attempt class provides:
- getTopic(), which returns the topic name
- getPercent(), which returns the score divided by the maximum score as a double

Task
Write weakTopics, which returns an ArrayList<String> containing the names of topics for attempts whose percent is less than cutoff.

Rules:
- A topic should appear at most once in the returned list.
- Topics should appear in the order in which they first qualify as weak.
- Do not add topics whose percent is equal to cutoff. Only scores less than cutoff qualify.

Example:
If attempts contains these entries:
- "String", percent 0.60
- "Array", percent 0.80
- "String", percent 0.50
- "2D Array", percent 0.65

Then weakTopics(attempts, 0.70) returns ["String", "2D Array"].

Explanation:
"String" is added when it first appears below the cutoff. The second weak String attempt is not added again. "Array" is not added because 0.80 is not below 0.70. "2D Array" is added because 0.65 is below 0.70.`,
    code: `public class Attempt
{
    private String topic;
    private int score;
    private int maxScore;

    public Attempt(String t, int s, int m)
    {
        topic = t;
        score = s;
        maxScore = m;
    }

    public String getTopic()
    {
        return topic;
    }

    public double getPercent()
    {
        return (double) score / maxScore;
    }
}

public static ArrayList<String> weakTopics(ArrayList<Attempt> attempts,
                                           double cutoff)
{
    /* to be implemented */
}`,
    rubric: [
      "Creates and returns an ArrayList<String>.",
      "Traverses all attempts.",
      "Uses getPercent() and compares with cutoff.",
      "Retrieves topic names with getTopic().",
      "Checks whether a topic is already in the result.",
      "Uses equals for String comparison.",
      "Adds each weak topic at most once.",
      "Preserves first-qualifying order."
    ],
    study: ["ArrayList traversal", "Object method calls", "String equality", "Duplicate filtering"]
  },
  {
    id: "frq4",
    number: 4,
    unit: "u4",
    tag: "2D Array",
    title: "2D Array",
    points: 10,
    body: `Scenario
A data table is represented by a rectangular two-dimensional array of integers. Each column represents one category, and each row represents one observation. You will identify which column has the greatest total.

Task
Write bestColumn, which returns the index of the column with the greatest sum.

Tie rule:
If more than one column has the greatest sum, return the smallest such column index.

Assumptions:
- data has at least one row
- every row has the same positive length
- all values are integers

Example:
For this array:
{ {3, 1, 4},
  {2, 5, 0},
  {1, 2, 6} }

Column sums:
- column 0: 3 + 2 + 1 = 6
- column 1: 1 + 5 + 2 = 8
- column 2: 4 + 0 + 6 = 10

bestColumn(data) returns 2.

Additional example:
For { {5, 2}, {1, 4} }, both columns have sum 6. The method returns 0 because column 0 is the smaller index.

Implementation guidance:
- Use an outer loop to examine each column.
- Use an inner loop to add the values in that column across all rows.
- Update the best column only when the current column sum is greater than the best sum so far. This preserves the smallest index during ties.`,
    code: `public static int bestColumn(int[][] data)
{
    /* to be implemented */
}`,
    rubric: [
      "Initializes best column and best sum.",
      "Traverses columns with valid column bounds.",
      "Traverses rows with valid row bounds.",
      "Adds every value in the current column.",
      "Compares current column sum to best sum.",
      "Preserves the smaller index in a tie.",
      "Returns the best column index.",
      "Uses correct 2D array indexing syntax."
    ],
    study: ["2D array indexing", "Nested loops", "Column aggregation", "Tie handling"]
  }
];

const studyLibrary = {
  u1: {
    title: "Unit 1: Using Objects and Methods",
    focus: "Rebuild precision with primitive expressions, API calls, object references, and String methods.",
    tasks: [
      "Trace 12 mixed expressions using integer division, modulo, casts, and compound assignment.",
      "Write a one-page String method table with index examples for substring, indexOf, equals, compareTo, and split.",
      "Practice 10 random integer range formulas and explain the inclusive endpoints."
    ]
  },
  u2: {
    title: "Unit 2: Selection and Iteration",
    focus: "Stabilize Boolean logic, loop tracing, String algorithms, and runtime counts.",
    tasks: [
      "Rewrite five compound conditions using De Morgan's laws and test them with sample values.",
      "Trace five loops by making columns for variable values, condition result, and output.",
      "Implement count, sum, min/max, and pattern-search algorithms on strings without using an IDE."
    ]
  },
  u3: {
    title: "Unit 3: Class Creation",
    focus: "Strengthen class design, state, references, static members, and this.",
    tasks: [
      "Design three small classes from specification tables with private fields, constructors, and methods.",
      "Trace two aliasing examples where one object has multiple references.",
      "Fix constructor shadowing errors using this and explain static vs instance variables."
    ]
  },
  u4: {
    title: "Unit 4: Data Collections",
    focus: "Practice arrays, ArrayList mutation, 2D traversal, search, sort, and recursion.",
    tasks: [
      "Write and trace array algorithms for sum, max, reverse, rotate, duplicate checks, and linear search.",
      "Practice ArrayList remove problems using forward and backward traversal.",
      "Trace row-major and column-major 2D loops, then trace one recursion, one binary search, and one merge sort by hand."
    ]
  }
};

const state = {
  started: false,
  answers: {},
  frqResponses: {},
  flags: {},
  submitted: false,
  activeTab: "all",
  startedAt: null
};

const storageKey = "apcsa-diagnostic-state-v1";
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatInstructionText(value) {
  return escapeHtml(value)
    .split(/\n{2,}/)
    .map((block) => `<p>${block.replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function loadState() {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    Object.assign(state, saved);
    state.started = Boolean(saved.started);
    state.startedAt = saved.startedAt || null;
  } catch {
    localStorage.removeItem(storageKey);
  }
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function showCurrentScreen() {
  const introPanel = $("#introPanel");
  const appShell = $("#appShell");
  if (!introPanel || !appShell) return;

  introPanel.classList.toggle("hidden", state.started);
  appShell.classList.toggle("hidden", !state.started);
}

function startDiagnostic() {
  state.started = true;
  state.answers = {};
  state.frqResponses = {};
  state.flags = {};
  state.submitted = false;
  state.activeTab = "all";
  state.startedAt = Date.now();
  saveState();
  render();
  updateTimer();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderTabs() {
  const tabs = [
    { id: "all", label: "All" },
    ...units.map((unit) => ({ id: unit.id, label: unit.name })),
    { id: "frq", label: "FRQ" },
    { id: "flagged", label: "Flagged" }
  ];

  $("#sectionTabs").innerHTML = tabs.map((tab) => `
    <button class="tab-btn ${state.activeTab === tab.id ? "active" : ""}" type="button" data-tab="${tab.id}">
      ${tab.label}
    </button>
  `).join("");
}

function renderUnitNav() {
  $("#unitNav").innerHTML = units.map((unit) => {
    const total = unit.mcq.length + frqQuestions.filter((frq) => frq.unit === unit.id).length;
    const answered = getAnsweredCountForUnit(unit.id);
    return `
      <button class="nav-btn" type="button" data-tab="${unit.id}">
        <span>${unit.name}<br><small>${unit.full}</small></span>
        <span class="nav-count">${answered}/${total}</span>
      </button>
    `;
  }).join("");
}

function renderMcq() {
  $("#mcqList").innerHTML = mcqQuestions.map((question) => {
    const selected = state.answers[question.id];
    const unit = units.find((item) => item.id === question.unit);
    const shouldShow = state.submitted;
    return `
      <article class="question-card mcq-card ${state.flags[`mcq-${question.id}`] ? "flagged" : ""}" data-unit="${question.unit}" data-kind="mcq" id="question-${question.id}">
        <header class="question-header">
          <div>
            <div class="question-title">
              <h3>Question ${question.id}</h3>
              <span class="tag">${unit.name}</span>
              <span class="tag">${escapeHtml(question.tag)}</span>
            </div>
            <p class="question-meta">${MCQ_POINTS} points</p>
          </div>
          <button class="flag-btn ${state.flags[`mcq-${question.id}`] ? "active" : ""}" type="button" data-flag="mcq-${question.id}" aria-label="Flag question ${question.id}">!</button>
        </header>
        <div class="question-body ${shouldShow ? "show-feedback" : ""}">
          <p class="prompt">${question.prompt}</p>
          ${question.code ? `<pre><code>${escapeHtml(question.code)}</code></pre>` : ""}
          <div class="choices">
            ${question.choices.map((choice, index) => {
              const isChecked = Number(selected) === index;
              let resultClass = "";
              if (shouldShow && index === question.answer) resultClass = "correct";
              if (shouldShow && isChecked && index !== question.answer) resultClass = "incorrect";
              return `
                <label class="choice ${resultClass}">
                  <input type="radio" name="q-${question.id}" value="${index}" ${isChecked ? "checked" : ""}>
                  <span><strong>${String.fromCharCode(65 + index)}.</strong> ${escapeHtml(choice)}</span>
                </label>
              `;
            }).join("")}
          </div>
          <div class="feedback">
            <strong>Answer: ${String.fromCharCode(65 + question.answer)}.</strong> ${question.note}
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function cleanCode(value) {
  return String(value || "")
    .replace(/\/\*[\s\S]*?\*\//g, " ")
    .replace(/\/\/.*$/gm, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function compactCode(value) {
  return cleanCode(value).replace(/\s+/g, "");
}

function check(label, points, passed) {
  return { label, points, passed: Boolean(passed) };
}

function hasRegex(text, regex) {
  return regex.test(text);
}

function gradeFrq(frq) {
  const response = state.frqResponses[frq.id] || "";
  const code = cleanCode(response);
  const tight = compactCode(response);

  const graders = {
    frq1: gradeFrq1,
    frq2: gradeFrq2,
    frq3: gradeFrq3,
    frq4: gradeFrq4
  };

  const checks = graders[frq.id](code, tight);
  const score = checks.reduce((sum, item) => sum + (item.passed ? item.points : 0), 0);
  return { score: Math.min(score, frq.points), checks };
}

function gradeFrq1(code, tight) {
  const hasCountMultiples = /countMultiples\s*\(\s*int\s+start\s*,\s*int\s+end\s*,\s*int\s+factor\s*\)/.test(code);
  const hasCountNonOverlapping = /countNonOverlapping\s*\(\s*String\s+text\s*,\s*String\s+target\s*\)/.test(code);
  const initializesCount = /\bint\s+\w*count\w*\s*=\s*0\b/i.test(code);
  const loopsThroughRange = /(for\s*\([^;]*=\s*start\s*;[^;]*(<=\s*end|end\s*>=)[^;]*;[^)]*(\+\+|\+=\s*1|=\s*\w+\s*\+\s*1))/i.test(code)
    || /(while\s*\([^)]*(<=\s*end|end\s*>=)[^)]*\))/i.test(code);
  const usesModuloFactor = /%\s*factor/.test(tight) && /==0/.test(tight);
  const countsMatches = /(\+\+|\+=1)/.test(tight) && /if\s*\(/.test(code);
  const returnsCount = /return\s+\w*count\w*\s*;/.test(code);
  const searchesTarget = /indexOf\s*\(\s*target\s*\)/.test(code)
    || (/substring\s*\(/.test(code) && /target\.length\s*\(\s*\)/.test(code) && /\.equals\s*\(\s*target\s*\)/.test(code));
  const advancesNonOverlap = /\+=\s*target\.length\s*\(\s*\)/.test(code)
    || /=\s*\w+\s*\+\s*target\.length\s*\(\s*\)/.test(code)
    || /\+\s*target\.length\s*\(\s*\)/.test(code);
  const handlesNotFound = /-1/.test(code) || /text\.length\s*\(\s*\)\s*-\s*target\.length\s*\(\s*\)/.test(code);

  return [
    check("Declares both required method signatures", 2, hasCountMultiples && hasCountNonOverlapping),
    check("Initializes a counter for accumulation", 1, initializesCount),
    check("Loops through start..end inclusively", 2, loopsThroughRange),
    check("Tests divisibility with modulo factor", 2, usesModuloFactor),
    check("Counts only values that satisfy the condition", 1, countsMatches),
    check("Searches text for target occurrences", 2, searchesTarget),
    check("Advances by target.length() to avoid overlap", 1, advancesNonOverlap),
    check("Handles no-match termination and returns counts", 1, handlesNotFound && returnsCount)
  ];
}

function gradeFrq2(code, tight) {
  const hasClass = /public\s+class\s+PracticeRecord\b/.test(code);
  const hasStringField = /private\s+String\s+\w+/.test(code);
  const intFieldNames = ["minutes", "correct", "attempted"].filter((name) => new RegExp(`private\\s+int\\s+[^;]*\\b${name}\\b`).test(code)).length;
  const hasConstructor = /public\s+PracticeRecord\s*\(\s*String\s+topicName\s*\)/.test(code);
  const assignsTopic = /=\s*topicName\s*;/.test(code);
  const zeroesTotals = ["minutes", "correct", "attempted"].filter((name) => new RegExp(`${name}\\s*=\\s*0\\s*;`).test(code)).length;
  const hasAddResult = /public\s+void\s+addResult\s*\(\s*int\s+minutes\s*,\s*int\s+correct\s*,\s*int\s+attempted\s*\)/.test(code);
  const accumulatesAll = ["minutes", "correct", "attempted"].filter((name) => {
    return new RegExp(`this\\.${name}\\s*\\+=\\s*${name}`).test(code)
      || new RegExp(`\\b${name}\\s*\\+=\\s*${name}\\b`).test(code)
      || new RegExp(`this\\.${name}\\s*=\\s*this\\.${name}\\s*\\+\\s*${name}`).test(code);
  }).length;
  const hasAccuracy = /public\s+double\s+accuracy\s*\(\s*\)/.test(code);
  const avoidsZero = /attempted\s*==\s*0/.test(code) && /return\s+0\.0\s*;/.test(code);
  const doubleRatio = /\(double\)\s*correct\s*\/\s*attempted/.test(code)
    || /correct\s*\/\s*\(double\)\s*attempted/.test(code)
    || /1\.0\s*\*\s*correct\s*\/\s*attempted/.test(code);
  const hasNeedsReview = /public\s+boolean\s+needsReview\s*\(\s*\)/.test(code);
  const reviewLogic = /minutes\s*<\s*30/.test(code) && /(accuracy\s*\(\s*\)|correct\s*\/|0\.70|\.70)/.test(code) && /\|\|/.test(code);

  return [
    check("Uses the required PracticeRecord class header", 1, hasClass),
    check("Declares private fields for topic and numeric totals", 2, hasStringField && intFieldNames >= 3),
    check("Provides the required constructor and stores topicName", 2, hasConstructor && assignsTopic),
    check("Initializes numeric totals to zero or relies on valid zero defaults", 1, zeroesTotals >= 2 || (hasConstructor && intFieldNames >= 3)),
    check("Provides addResult with the required signature", 1, hasAddResult),
    check("addResult accumulates minutes, correct, and attempted", 2, accumulatesAll >= 3),
    check("accuracy returns a double ratio and handles zero attempts", 2, hasAccuracy && avoidsZero && doubleRatio),
    check("needsReview uses minutes < 30 or accuracy < 0.70", 1, hasNeedsReview && reviewLogic)
  ];
}

function gradeFrq3(code, tight) {
  const hasSignature = /ArrayList\s*<\s*String\s*>\s+weakTopics\s*\(\s*ArrayList\s*<\s*Attempt\s*>\s+attempts\s*,\s*double\s+cutoff\s*\)/.test(code);
  const createsResult = /new\s+ArrayList\s*<\s*String\s*>\s*\(/.test(code)
    || /new\s+ArrayList\s*<\s*>\s*\(/.test(code);
  const loopsAttempts = /(for\s*\([^)]*attempts\.size\s*\(\s*\)|for\s*\(\s*Attempt\s+\w+\s*:\s*attempts\s*\))/.test(code);
  const usesPercentCutoff = /\.getPercent\s*\(\s*\)\s*<\s*cutoff/.test(code);
  const getsTopic = /\.getTopic\s*\(\s*\)/.test(code);
  const duplicateCheck = /\.contains\s*\(/.test(code)
    || (/\.equals\s*\(/.test(code) && /result\.size\s*\(\s*\)/.test(code));
  const usesEquals = /\.equals\s*\(/.test(code) || /\.contains\s*\(/.test(code);
  const addsTopic = /\.add\s*\([^)]*(topic|getTopic\s*\(\s*\))/.test(code);
  const returnsResult = /return\s+\w+\s*;/.test(code);

  return [
    check("Uses the required ArrayList<String> method signature", 1, hasSignature),
    check("Creates a result ArrayList<String>", 1, createsResult),
    check("Traverses every Attempt in attempts", 1, loopsAttempts),
    check("Compares getPercent() with cutoff", 2, usesPercentCutoff),
    check("Retrieves each weak attempt's topic", 1, getsTopic),
    check("Checks for duplicates before adding", 2, duplicateCheck && usesEquals),
    check("Adds qualifying topics in traversal order", 1, addsTopic),
    check("Returns the result list", 1, returnsResult)
  ];
}

function gradeFrq4(code, tight) {
  const hasSignature = /int\s+bestColumn\s*\(\s*int\s*\[\]\s*\[\]\s*data\s*\)/.test(code);
  const initializesBest = /\bint\s+\w*(best|max)\w*\s*=/i.test(code) && /\bint\s+\w*(index|col)\w*\s*=\s*0/i.test(code);
  const colLoop = /(for\s*\([^;]*col[^;]*;[^;]*col[^;]*<[^;]*data\s*\[\s*0\s*\]\.length[^;]*;[^)]*\))/.test(code);
  const rowLoop = /(for\s*\([^;]*row[^;]*;[^;]*row[^;]*<[^;]*data\.length[^;]*;[^)]*\))/.test(code);
  const accessesByColumn = /data\s*\[\s*row\s*\]\s*\[\s*col\s*\]/.test(code);
  const accumulatesSum = /\w*sum\w*\s*(\+=|=\s*\w*sum\w*\s*\+)/.test(code);
  const updatesBest = /if\s*\([^)]*\w*sum\w*\s*>\s*\w*(best|max)\w*/.test(code)
    && /=\s*col\s*;/.test(code);
  const returnsIndex = /return\s+\w*(index|col)\w*\s*;/i.test(code);

  return [
    check("Uses the required bestColumn signature", 1, hasSignature),
    check("Initializes best column and best sum tracking", 2, initializesBest),
    check("Loops over columns using data[0].length", 2, colLoop),
    check("Loops over rows using data.length", 1, rowLoop),
    check("Accesses data[row][col]", 1, accessesByColumn),
    check("Accumulates a column sum", 1, accumulatesSum),
    check("Updates best only when the current sum is greater", 1, updatesBest),
    check("Returns the best column index", 1, returnsIndex)
  ];
}

function renderFrq() {
  $("#frqList").innerHTML = frqQuestions.map((question) => {
    const unit = units.find((item) => item.id === question.unit);
    const response = state.frqResponses[question.id] || "";
    const grade = gradeFrq(question);
    return `
      <article class="question-card frq-card ${state.flags[question.id] ? "flagged" : ""}" data-unit="${question.unit}" data-kind="frq" id="${question.id}">
        <header class="question-header">
          <div>
            <div class="question-title">
              <h3>FRQ ${question.number}: ${question.title}</h3>
              <span class="tag">${unit.name}</span>
              <span class="tag">${escapeHtml(question.tag)}</span>
            </div>
            <p class="question-meta">${question.points} points</p>
          </div>
          <button class="flag-btn ${state.flags[question.id] ? "active" : ""}" type="button" data-flag="${question.id}" aria-label="Flag FRQ ${question.number}">!</button>
        </header>
        <div class="question-body">
          <div class="frq-meta frq-detail">${formatInstructionText(question.body)}</div>
          ${question.code ? `<pre><code>${escapeHtml(question.code)}</code></pre>` : ""}
          <textarea class="frq-response" data-frq-response="${question.id}" spellcheck="false" aria-label="Response for FRQ ${question.number}">${escapeHtml(response)}</textarea>
          <div class="auto-grade ${state.submitted ? "visible" : ""}" aria-label="Automatic grading for FRQ ${question.number}">
            <div class="auto-grade-head">
              <strong>Auto grade: ${grade.score}/${question.points}</strong>
              <span>${state.submitted ? "Based on detected Java structure and rubric evidence." : "Automatic grading will run when you generate the report."}</span>
            </div>
            ${state.submitted ? `
              <div class="auto-checks">
                ${grade.checks.map((check) => `
                  <div class="auto-check ${check.passed ? "passed" : "missed"}">
                    <span class="check-mark">${check.passed ? "OK" : "Review"}</span>
                    <span>${escapeHtml(check.label)}</span>
                    <strong>${check.passed ? check.points : 0}/${check.points}</strong>
                  </div>
                `).join("")}
              </div>
            ` : ""}
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function bindEvents() {
  const startBtn = $("#startBtn");
  if (startBtn) {
    startBtn.addEventListener("click", () => {
      startDiagnostic();
    });
  }

  document.addEventListener("change", (event) => {
    const target = event.target;
    if (target.matches('input[type="radio"]')) {
      const questionId = Number(target.name.replace("q-", ""));
      state.answers[questionId] = Number(target.value);
      state.submitted = false;
      saveState();
      updateProgress();
    }
  });

  document.addEventListener("input", (event) => {
    const target = event.target;
    if (target.matches("[data-frq-response]")) {
      state.frqResponses[target.dataset.frqResponse] = target.value;
      saveState();
      updateProgress();
    }
  });

  document.addEventListener("click", (event) => {
    const flagButton = event.target.closest("[data-flag]");
    if (flagButton) {
      const key = flagButton.dataset.flag;
      state.flags[key] = !state.flags[key];
      saveState();
      render();
      return;
    }

    const tabButton = event.target.closest("[data-tab]");
    if (tabButton) {
      state.activeTab = tabButton.dataset.tab;
      saveState();
      render();
      $("#testPanel").classList.add("active");
      $("#reportPanel").classList.remove("active");
      return;
    }
  });

  $("#submitBtn").addEventListener("click", () => {
    state.submitted = true;
    saveState();
    render();
    showReport();
  });

  $("#backToTestBtn").addEventListener("click", () => {
    $("#reportPanel").classList.remove("active");
    $("#testPanel").classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  $("#saveBtn").addEventListener("click", () => {
    saveState();
    $("#saveBtn").textContent = "Saved";
    setTimeout(() => {
      $("#saveBtn").textContent = "Save";
    }, 1200);
  });

  $("#printBtn").addEventListener("click", () => window.print());

  $("#resetBtn").addEventListener("click", () => {
    if (!confirm("Reset all answers and scores?")) return;
    localStorage.removeItem(storageKey);
    state.started = false;
    state.answers = {};
    state.frqResponses = {};
    state.flags = {};
    state.submitted = false;
    state.activeTab = "all";
    state.startedAt = null;
    render();
    updateProgress();
    updateTimer();
  });
}

function getAnsweredCountForUnit(unitId) {
  const mcqCount = mcqQuestions.filter((question) => question.unit === unitId && state.answers[question.id] !== undefined).length;
  const frqCount = frqQuestions.filter((question) => question.unit === unitId && ((state.frqResponses[question.id] || "").trim().length > 0 || getFrqScore(question) > 0)).length;
  return mcqCount + frqCount;
}

function getTotalAnsweredCount() {
  const mcqCount = Object.keys(state.answers).length;
  const frqCount = frqQuestions.filter((question) => ((state.frqResponses[question.id] || "").trim().length > 0 || getFrqScore(question) > 0)).length;
  return mcqCount + frqCount;
}

function getMcqScore() {
  return mcqQuestions.reduce((sum, question) => {
    return sum + (Number(state.answers[question.id]) === question.answer ? MCQ_POINTS : 0);
  }, 0);
}

function getFrqScore(frq) {
  return gradeFrq(frq).score;
}

function getFrqTotalScore() {
  return frqQuestions.reduce((sum, question) => sum + getFrqScore(question), 0);
}

function getTotalScore() {
  return getMcqScore() + getFrqTotalScore();
}

function getUnitScore(unitId) {
  const unitMcq = mcqQuestions.filter((question) => question.unit === unitId);
  const mcqEarned = unitMcq.reduce((sum, question) => sum + (Number(state.answers[question.id]) === question.answer ? MCQ_POINTS : 0), 0);
  const mcqPossible = unitMcq.length * MCQ_POINTS;
  const unitFrq = frqQuestions.filter((question) => question.unit === unitId);
  const frqEarned = unitFrq.reduce((sum, question) => sum + getFrqScore(question), 0);
  const frqPossible = unitFrq.reduce((sum, question) => sum + question.points, 0);
  return {
    earned: mcqEarned + frqEarned,
    possible: mcqPossible + frqPossible,
    mcqEarned,
    mcqPossible,
    frqEarned,
    frqPossible
  };
}

function updateProgress() {
  $("#answeredCount").textContent = getTotalAnsweredCount();
  $("#questionCount").textContent = mcqQuestions.length + frqQuestions.length;
  $("#liveScore").textContent = state.submitted ? `${Math.round(getTotalScore())}%` : "Hidden";
  renderUnitNav();
  applyFilter();
}

function applyFilter() {
  $$(".question-card").forEach((card) => {
    const unit = card.dataset.unit;
    const kind = card.dataset.kind;
    const flagged = card.classList.contains("flagged");
    const visible = state.activeTab === "all"
      || state.activeTab === unit
      || (state.activeTab === "frq" && kind === "frq")
      || (state.activeTab === "flagged" && flagged);
    card.style.display = visible ? "" : "none";
  });

  $$(".tab-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === state.activeTab);
  });

  $$(".nav-btn").forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === state.activeTab);
  });
}

function scoreClass(percent) {
  if (percent < 60) return "low";
  if (percent < 80) return "mid";
  return "high";
}

function bandLabel(percent) {
  if (percent >= 85) return "Strong readiness";
  if (percent >= 70) return "Mostly ready";
  if (percent >= 55) return "Developing";
  return "Foundational review";
}

function missedTopics() {
  const misses = [];
  mcqQuestions.forEach((question) => {
    if (Number(state.answers[question.id]) !== question.answer) {
      const unit = units.find((item) => item.id === question.unit);
      misses.push(`${unit.name}: ${question.tag}`);
    }
  });

  frqQuestions.forEach((question) => {
    const percent = (getFrqScore(question) / question.points) * 100;
    if (percent < 75) {
      question.study.forEach((topic) => misses.push(`FRQ ${question.number}: ${topic}`));
    }
  });

  return Array.from(new Set(misses)).slice(0, 12);
}

function buildStudyPlan() {
  const unitResults = units.map((unit) => {
    const score = getUnitScore(unit.id);
    const percent = score.possible ? (score.earned / score.possible) * 100 : 0;
    return { unit, percent, ...score };
  });

  const priorities = unitResults
    .filter((item) => item.percent < 80)
    .sort((a, b) => a.percent - b.percent);

  const selected = priorities.length ? priorities : unitResults.sort((a, b) => a.percent - b.percent).slice(0, 2);

  return selected.map((item, index) => {
    const library = studyLibrary[item.unit.id];
    const days = index === 0 ? "Days 1-2" : index === 1 ? "Days 3-4" : "Day 5";
    return `
      <article class="plan-item">
        <h4>${days}: ${library.title}</h4>
        <p>${library.focus}</p>
        <ul>
          ${library.tasks.map((task) => `<li>${task}</li>`).join("")}
        </ul>
      </article>
    `;
  }).join("");
}

function showReport() {
  const total = getTotalScore();
  const percent = Math.round(total);
  const mcqScore = getMcqScore();
  const frqScore = getFrqTotalScore();
  const misses = missedTopics();

  const unitRows = units.map((unit) => {
    const score = getUnitScore(unit.id);
    const unitPercent = score.possible ? Math.round((score.earned / score.possible) * 100) : 0;
    return `
      <div class="unit-score">
        <strong>${unit.name}: ${unit.full}</strong>
        <div class="bar-track" aria-label="${unit.name} score">
          <div class="bar-fill ${scoreClass(unitPercent)}" style="width: ${unitPercent}%"></div>
        </div>
        <span>${score.earned}/${score.possible} (${unitPercent}%)</span>
      </div>
    `;
  }).join("");

  const frqRows = frqQuestions.map((question) => {
    const grade = gradeFrq(question);
    const failed = grade.checks.filter((item) => !item.passed);
    return `
      <article class="plan-item">
        <h4>FRQ ${question.number}: ${question.title} (${grade.score}/${question.points})</h4>
        <p>${failed.length ? "Review these missing rubric signals:" : "The automatic grader found all expected rubric signals."}</p>
        ${failed.length ? `
          <ul>
            ${failed.map((item) => `<li>${escapeHtml(item.label)} (${item.points} pt${item.points === 1 ? "" : "s"})</li>`).join("")}
          </ul>
        ` : ""}
      </article>
    `;
  }).join("");

  $("#reportContent").innerHTML = `
    <div class="report-grid">
      <div class="summary-band">
        <div class="metric">
          <span>Total</span>
          <strong>${percent}%</strong>
        </div>
        <div class="metric">
          <span>MCQ</span>
          <strong>${mcqScore}/56</strong>
        </div>
        <div class="metric">
          <span>FRQ</span>
          <strong>${frqScore}/44</strong>
        </div>
      </div>

      <section class="report-section">
        <h3>${bandLabel(percent)}</h3>
        <p class="report-note">${reportSummary(percent)}</p>
      </section>

      <section class="report-section">
        <h3>Unit Breakdown</h3>
        <div class="unit-score-list">${unitRows}</div>
      </section>

      <section class="report-section">
        <h3>FRQ Auto-Grading Details</h3>
        <p class="report-note">This static app grades FRQs by detecting method signatures, control structures, data-structure operations, and key rubric logic in the submitted code. Treat it as diagnostic feedback, not an official AP score.</p>
        <div class="plan-list">${frqRows}</div>
      </section>

      <section class="report-section">
        <h3>Priority Topics</h3>
        <div class="topic-list">
          ${misses.length ? misses.map((topic) => `<div class="topic-chip">${escapeHtml(topic)}</div>`).join("") : '<p class="report-note">No priority gaps from this attempt.</p>'}
        </div>
      </section>

      <section class="report-section">
        <h3>Study Plan</h3>
        <div class="plan-list">${buildStudyPlan()}</div>
      </section>
    </div>
  `;

  $("#testPanel").classList.remove("active");
  $("#reportPanel").classList.add("active");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function reportSummary(percent) {
  if (percent >= 85) {
    return "Move into mixed timed sets. Keep a small error log for boundary mistakes, especially around collections and recursion.";
  }
  if (percent >= 70) {
    return "The foundation is mostly in place. Target the weak unit bands first, then retake a short mixed set under time.";
  }
  if (percent >= 55) {
    return "Several skills are close but inconsistent. Work by unit for a week before attempting a full-length practice exam.";
  }
  return "Start with fundamentals and trace every example by hand. Short daily sets will help more than one long mixed test right now.";
}

function updateTimer() {
  if (!state.started || !state.startedAt) {
    $("#timer").textContent = "00:00";
    return;
  }
  const seconds = Math.floor((Date.now() - state.startedAt) / 1000);
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  $("#timer").textContent = `${mins}:${secs}`;
}

function render() {
  showCurrentScreen();
  renderTabs();
  renderUnitNav();
  renderMcq();
  renderFrq();
  updateProgress();
}

loadState();
render();
bindEvents();
updateTimer();
setInterval(updateTimer, 1000);
