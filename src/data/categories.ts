export interface SubTab {
  id: string;
  title: string;
}

export interface MainTab {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: string;
  subTabs: SubTab[];
}

export const mainTabs: MainTab[] = [
  {
    id: "about",
    name: "About & Personal",
    icon: "👨‍🏫",
    color: "bg-indigo-500",
    gradient: "from-indigo-500 to-purple-600",
    subTabs: [
      { id: "about-me", title: "About Me" },
      { id: "my-office", title: "My Office" },
      { id: "manoj-photos", title: "Manoj Purohit Photos" },
      { id: "feedback", title: "Manoj Purohit : Feedback of Teaching (out of 5)" },
      { id: "experience-2018", title: "My Experience 2018" },
      { id: "thought-of-day", title: "Thought of the Day" },
      { id: "timetable-mca", title: "Time Table of MCA" },
    ],
  },
  {
    id: "python",
    name: "Python Programming",
    icon: "🐍",
    color: "bg-green-500",
    gradient: "from-green-500 to-emerald-600",
    subTabs: [
      { id: "python-syllabus-1", title: "Python Programming - Syllabus" },
      { id: "python-syllabus-2", title: "Syllabus - Python Programming" },
      { id: "python-notes", title: "PYTHON NOTES FOR MCA STUDENTS" },
      { id: "filter-python", title: "FILTER IN PYTHON" },
      { id: "reduce-python", title: "REDUCE IN PYTHON" },
      { id: "lambda-python", title: "LAMBDA IN PYTHON" },
      { id: "lazy-eval-python", title: "LAZY EVALUATION IN PYTHON" },
      { id: "map-python", title: "MAP IN PYTHON" },
      { id: "decorator-python", title: "Decorator in Python" },
      { id: "numpy-python", title: "NumPy in Python" },
      { id: "python-assignments-1", title: "PYTHON ASSIGNMENTS" },
      { id: "python-lab-assignments-1", title: "PYTHON LAB ASSIGNMENTS" },
      { id: "python-lab-assignments-2", title: "Python Lab Assignments" },
      { id: "python-lab-assignments-mca", title: "PYTHON LAB ASSIGNMENTS FOR MCA STUDENTS" },
      { id: "python-assignments-mca", title: "PYTHON - ASSIGNMENTS - MCA - II - SEM" },
      { id: "python-mcq-1", title: "PYTHON - MCQ - 1" },
      { id: "python-lab-test", title: "Python Programming - Lab Test" },
      { id: "python-external-lab", title: "Python Programming External Lab Examination - MCA - 24 - 26" },
      { id: "python-internal-lab", title: "Python Internal Lab Examination" },
      { id: "python-test-series", title: "Python Test Series" },
    ],
  },
  {
    id: "oose",
    name: "Object Oriented Software Engineering",
    icon: "⚙️",
    color: "bg-blue-500",
    gradient: "from-blue-500 to-cyan-500",
    subTabs: [
      { id: "oose-oo-se", title: "OBJECT ORIENTED SOFTWARE ENGINEERING" },
      { id: "oose-syllabus", title: "OOSE - SYLLABUS" },
      { id: "oose-notes", title: "OOSE NOTES" },
      { id: "oose-notes-mca", title: "OOSE NOTES FOR MCA STUDENTS" },
      { id: "oose-books", title: "OOSE BOOKS" },
      { id: "oose-assignments", title: "OOSE ASSIGNMENTS" },
      { id: "oose-class-assignments", title: "OOSE CLASS ASSIGNMENTS" },
      { id: "oose-project-lab", title: "OOSE PROJECT LAB" },
      { id: "oose-labs", title: "OOSE-LABS" },
      { id: "oose-labs-mca-22-24", title: "OOSE-LABS-MCA-22-24" },
      { id: "oose-lab-assignments", title: "OOSE LAB ASSIGNMENTS" },
      { id: "oose-lab-assignments-mca", title: "OOSE LAB ASSIGNMENTS FOR MCA STUDENTS" },
      { id: "oose-uml-lab", title: "OOSE UML LAB ASSIGNMENTS - MCA - 24 - 26" },
      { id: "oose-lab-tests", title: "OOSE LAB TESTS - MCA - II - SEM - 23-25" },
      { id: "oose-unit-test", title: "OOSE UNIT TEST" },
      { id: "oose-unit-test-2", title: "OOSE UNIT TEST 2 - MCQ" },
      { id: "oose-test-series", title: "OOSE Test Series" },
      { id: "oose-internal-lab", title: "OOSE INTERNAL LAB EXAMINATION MCA - 23 - 25" },
      { id: "oose-external-exam", title: "OOSE EXTERNAL EXAMINATION" },
      { id: "oose-external-lab", title: "OOSE EXTERNAL LAB EXAMINATION MCA - 24 - 26" },
      { id: "agile-methodology", title: "AGILE METHODOLOGY IN OBJECT ORIENTED SOFTWARE ENGINEERING" },
    ],
  },
  {
    id: "ooad-testing",
    name: "OO Analysis, Design & Testing",
    icon: "🔍",
    color: "bg-teal-500",
    gradient: "from-teal-500 to-emerald-500",
    subTabs: [
      { id: "ooad", title: "OBJECT ORIENTED ANALYSIS AND DESIGN" },
      { id: "oo-testing", title: "Object Oriented Testing" },
      { id: "test1-oo-testing", title: "TEST-1: OBJECT ORIENTED TESTING" },
    ],
  },
  {
    id: "uml",
    name: "UML",
    icon: "📐",
    color: "bg-violet-500",
    gradient: "from-violet-500 to-purple-500",
    subTabs: [
      { id: "uml-main", title: "UML" },
      { id: "state-diagrams", title: "STATE DIAGRAMS IN UML" },
      { id: "package-diagram", title: "PACKAGE DIAGRAM IN UML" },
    ],
  },
  {
    id: "design-patterns",
    name: "Design Patterns & Principles",
    icon: "🏗️",
    color: "bg-amber-500",
    gradient: "from-amber-500 to-orange-500",
    subTabs: [
      { id: "design-patterns-java", title: "DESIGN PATTERNS IN JAVA" },
      { id: "singleton-pattern", title: "SINGLETON DESIGN PATTERN - JAVA CODE AND CONCEPT" },
      { id: "solid-principles", title: "S-O-L-I-D Design Principles for better Java code" },
    ],
  },
  {
    id: "oopj",
    name: "OOPJ (OO Programming Java)",
    icon: "☕",
    color: "bg-red-500",
    gradient: "from-red-500 to-rose-500",
    subTabs: [
      { id: "oopj-assignments", title: "OOPJ ASSIGNMENTS" },
      { id: "oopj-mca-25-27", title: "OOPJ - MCA - 25 - 27" },
      { id: "oopj-mca-23-25", title: "OOPJ-MCA-23-25" },
      { id: "oopj-lab-file", title: "OOPJ - LAB - FILE - MCA2527" },
      { id: "oopj-internal-25-27", title: "OOPJ INTERNAL LAB EXAMINATION MCA - 25 - 27" },
      { id: "oopj-internal-24-26", title: "OOPJ INTERNAL LAB EXAMINATION MCA - 24 - 26" },
      { id: "oopj-external-2527", title: "OOPJ EXTERNAL LAB EXAMINATION - MCA - 2527" },
    ],
  },
  {
    id: "java",
    name: "Core Java",
    icon: "♨️",
    color: "bg-orange-500",
    gradient: "from-orange-500 to-red-500",
    subTabs: [
      { id: "java-concepts", title: "Manoj Purohit : Java Concepts" },
      { id: "core-java-lab", title: "Core Java Lab Assignments" },
      { id: "core-java-test", title: "Core Java Test Series" },
      { id: "java-practice", title: "JAVA PROGRAM PRACTICE" },
      { id: "packages-java", title: "Packages in Java" },
      { id: "awt-swing", title: "AWT and Swing in Java" },
      { id: "exception-handling", title: "Exception Handling - Core Java" },
    ],
  },
  {
    id: "cpp",
    name: "C++ Programming",
    icon: "💻",
    color: "bg-sky-500",
    gradient: "from-sky-500 to-blue-600",
    subTabs: [
      { id: "cpp-concepts", title: "C++ CONCEPTS" },
      { id: "cpp-concepts-2", title: "C++ Concepts" },
      { id: "cpp-tutorials", title: "C++ TUTORIALS" },
      { id: "cpp-interview", title: "C++ Interview Questions and Answers" },
    ],
  },
  {
    id: "csharp",
    name: "C# Programming",
    icon: "🔷",
    color: "bg-purple-500",
    gradient: "from-purple-500 to-indigo-600",
    subTabs: [
      { id: "csharp-lectures", title: "C# LECTURES" },
      { id: "csharp-manoj", title: "C# - MANOJ PUROHIT" },
      { id: "csharp-qa", title: "C# QUESTION - ANSWERS" },
    ],
  },
  {
    id: "cyber",
    name: "Cyber Security & Cyber Law",
    icon: "🛡️",
    color: "bg-rose-500",
    gradient: "from-rose-500 to-pink-600",
    subTabs: [
      { id: "cyber-security", title: "CYBER SECURITY AND CYBER LAW" },
      { id: "cyber-security-2", title: "Cyber Security and Cyber Law" },
      { id: "cscl-assignments", title: "CSCL ASSIGNMENTS" },
    ],
  },
  {
    id: "other-subjects",
    name: "Other Subjects",
    icon: "📚",
    color: "bg-pink-500",
    gradient: "from-pink-500 to-rose-500",
    subTabs: [
      { id: "computers-basics", title: "Computers : Basic Concepts" },
      { id: "intro-os", title: "INTRODUCTION TO OPERATING SYSTEM" },
      { id: "foit", title: "Fundamental of Information Technology" },
      { id: "foit-2", title: "fundamental of IT" },
      { id: "foit-lecture", title: "FOIT LECTURE" },
      { id: "daa", title: "Design and Analysis of Algorithms" },
      { id: "mathematics", title: "Mathematics" },
    ],
  },
  {
    id: "spiritual",
    name: "Personal & Spiritual",
    icon: "🙏",
    color: "bg-yellow-500",
    gradient: "from-yellow-500 to-amber-600",
    subTabs: [
      { id: "spiritual-stories", title: "SPIRITUAL STORIES FOR KIDS" },
      { id: "shayari", title: "मेरी शायरी : दिल, धड़कन की डायरी" },
      { id: "dharmik-qa", title: "धार्मिक प्रश्न उत्तर" },
    ],
  },
];

// Helper to get all sub-tabs flat
export const allSubTabs: SubTab[] = mainTabs.flatMap((t) => t.subTabs);

// Helper to find which main tab a sub-tab belongs to
export function findMainTab(subTabId: string): MainTab | undefined {
  return mainTabs.find((t) => t.subTabs.some((s) => s.id === subTabId));
}
