import { mainTabs, type MainTab, type SubTab } from "../data/categories";
import FileManager from "./FileManager";

interface ContentAreaProps {
  activeMainTab: string;
  activeSubTab: string | null;
  onSubTabSelect: (mainTabId: string, subTabId: string) => void;
  isAdmin: boolean;
}

function getMainTabById(id: string): MainTab | undefined {
  return mainTabs.find((t) => t.id === id);
}

function getSubTabById(mainTabId: string, subTabId: string): SubTab | undefined {
  const main = getMainTabById(mainTabId);
  return main?.subTabs.find((s) => s.id === subTabId);
}

/* ======= ABOUT ME CONTENT ======= */
function AboutMeContent() {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <div className="w-40 h-40 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-6xl font-bold shadow-xl flex-shrink-0">
            MP
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">Manoj Purohit</h2>
            <p className="text-lg text-blue-600 font-semibold mb-4">Assistant Professor, MCA Department</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <InfoItem icon="🎓" label="Qualification" value="MCA, M.Tech (CS)" />
              <InfoItem icon="🏫" label="Department" value="Master of Computer Applications" />
              <InfoItem icon="📧" label="Email" value="manojpurohit@university.edu" />
              <InfoItem icon="📍" label="Location" value="India" />
              <InfoItem icon="📚" label="Specialization" value="Software Engineering, OOP, Python" />
              <InfoItem icon="🗓️" label="Experience" value="10+ Years in Teaching" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard number="100+" label="Blog Topics" icon="📝" color="from-blue-500 to-cyan-500" />
        <StatCard number="500+" label="Students Taught" icon="👨‍🎓" color="from-purple-500 to-pink-500" />
        <StatCard number="10+" label="Subjects Covered" icon="📚" color="from-amber-500 to-orange-500" />
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span>📋</span> About
        </h3>
        <p className="text-slate-600 leading-relaxed mb-4">
          I am an Assistant Professor in the MCA Department with expertise in Object Oriented Software Engineering,
          Java Programming, Python, C++, C#, and various other computer science subjects.
        </p>
        <p className="text-slate-600 leading-relaxed mb-4">
          This blog serves as a comprehensive resource for my students, containing assignments, notes, lab
          examinations, syllabus materials, and practice questions across multiple programming languages.
        </p>
        <p className="text-slate-600 leading-relaxed">
          I believe in the power of education and continuous learning. Through this platform, I aim to make
          quality educational resources accessible to all my students.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span>🎯</span> Subjects I Teach
        </h3>
        <div className="flex flex-wrap gap-2">
          {[
            "Object Oriented Software Engineering", "Object Oriented Programming (Java)",
            "Core Java", "Python Programming", "C++ Programming", "C# Programming",
            "UML", "Design Patterns", "Operating Systems", "Data Structures & Algorithms",
            "Cyber Security", "Fundamental of IT", "Mathematics",
          ].map((s) => (
            <span key={s} className="px-4 py-2 bg-gradient-to-r from-slate-50 to-blue-50 text-slate-700 rounded-full text-sm font-medium border border-slate-200">
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function InfoItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span>{icon}</span>
      <span className="text-slate-500">{label}:</span>
      <span className="font-medium text-slate-700">{value}</span>
    </div>
  );
}

function StatCard({ number, label, icon, color }: { number: string; label: string; icon: string; color: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl mb-4 shadow-lg`}>
        {icon}
      </div>
      <p className="text-3xl font-bold text-slate-800">{number}</p>
      <p className="text-sm text-slate-500 mt-1">{label}</p>
    </div>
  );
}

/* ======= THOUGHT OF DAY ======= */
function ThoughtOfDay() {
  const thoughts = [
    { quote: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
    { quote: "The beautiful thing about learning is that nobody can take it away from you.", author: "B.B. King" },
    { quote: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
    { quote: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { quote: "The only way to learn a new programming language is by writing programs in it.", author: "Dennis Ritchie" },
    { quote: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  ];
  return (
    <div className="space-y-6">
      {thoughts.map((t, i) => (
        <div key={i} className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl p-6 border border-amber-200">
          <div className="text-4xl text-amber-400 mb-2">"</div>
          <p className="text-lg text-slate-700 italic leading-relaxed mb-3">{t.quote}</p>
          <p className="text-sm text-amber-700 font-semibold">— {t.author}</p>
        </div>
      ))}
    </div>
  );
}

/* ======= GENERIC SUB-TAB CONTENT ======= */
function GenericSubTabContent({ title, gradient, icon, categoryName }: {
  title: string; gradient: string; icon: string; categoryName: string;
}) {
  const lower = title.toLowerCase();
  const isAssignment = lower.includes("assignment");
  const isLab = lower.includes("lab");
  const isExam = lower.includes("exam") || lower.includes("test");
  const isNotes = lower.includes("notes") || lower.includes("concept") || lower.includes("tutorial");
  const isSyllabus = lower.includes("syllabus");
  const isMCQ = lower.includes("mcq");

  let contentType = "📄 Resource";
  let description = "This section contains educational materials and resources.";
  let items: string[] = [];

  if (isAssignment) {
    contentType = "📝 Assignment";
    description = "This section contains assignments and practice problems for students.";
    items = [
      "Complete all assignments before the deadline",
      "Follow proper coding standards and documentation",
      "Submit your work through the designated portal",
      "Include proper comments in your code",
      "Test your code thoroughly before submission",
    ];
  } else if (isExam || isMCQ) {
    contentType = "📋 Examination";
    description = "This section contains examination materials, test series, and MCQs.";
    items = [
      "Review all chapters covered in the syllabus",
      "Practice previous year questions",
      "Time management is crucial during examinations",
      "Focus on understanding concepts rather than memorization",
      "Revise lab programs and their outputs",
    ];
  } else if (isLab) {
    contentType = "🔬 Lab Work";
    description = "This section contains lab assignments, exercises, and practical work.";
    items = [
      "Complete the lab programs as per the schedule",
      "Maintain a proper lab file with all programs",
      "Each program should include aim, algorithm, code, and output",
      "Practice writing code without IDE assistance",
      "Understand the logic behind each program",
    ];
  } else if (isNotes) {
    contentType = "📖 Study Notes";
    description = "This section contains comprehensive study notes and learning materials.";
    items = [
      "Read through the notes carefully",
      "Make your own summary for quick revision",
      "Highlight important definitions and concepts",
      "Practice related numerical/programming problems",
      "Refer to recommended textbooks for deeper understanding",
    ];
  } else if (isSyllabus) {
    contentType = "📑 Syllabus";
    description = "This section contains the detailed syllabus and course structure.";
    items = [
      "Familiarize yourself with the complete syllabus",
      "Note the unit-wise topic distribution",
      "Check recommended reference books",
      "Understand the marking scheme",
      "Plan your study schedule accordingly",
    ];
  } else {
    items = [
      "Explore the materials provided in this section",
      "Take notes and practice regularly",
      "Discuss doubts during office hours",
      "Collaborate with peers for better understanding",
      "Stay updated with new materials added regularly",
    ];
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 flex-wrap">
        <span className={`px-4 py-1.5 rounded-full text-sm font-semibold bg-gradient-to-r ${gradient} text-white shadow-md`}>
          {icon} {categoryName}
        </span>
        <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-slate-100 text-slate-600">
          {contentType}
        </span>
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <p className="text-slate-700 leading-relaxed">{description}</p>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span>📌</span> Guidelines & Instructions
        </h3>
        <ul className="space-y-3">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                {i + 1}
              </span>
              <span className="text-slate-600">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-gradient-to-r from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200">
        <p className="text-sm text-slate-500">
          <span className="font-semibold text-slate-600">💡 Need help?</span> Contact Prof. Manoj Purohit during office hours or send an email for any queries.
        </p>
      </div>
    </div>
  );
}

/* ======= MAIN CONTENT AREA ======= */
export default function ContentArea({ activeMainTab, activeSubTab, onSubTabSelect, isAdmin }: ContentAreaProps) {
  const mainTab = getMainTabById(activeMainTab);

  if (!mainTab) {
    return <AboutMeContent />;
  }

  const currentSubTab = activeSubTab ? getSubTabById(activeMainTab, activeSubTab) : null;

  return (
    <div>
      {/* Main Tab Header */}
      <div className={`bg-gradient-to-r ${mainTab.gradient} rounded-2xl p-6 md:p-8 mb-6 text-white shadow-lg`}>
        <div className="flex items-center gap-4">
          <span className="text-4xl md:text-5xl">{mainTab.icon}</span>
          <div>
            <h2 className="text-2xl md:text-3xl font-bold leading-tight">{mainTab.name}</h2>
            <p className="text-white/70 mt-1 text-sm">
              {mainTab.subTabs.length} sub-topics available
            </p>
          </div>
        </div>
      </div>

      {/* Sub-Tab Navigation Bar */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 mb-6 overflow-hidden">
        <div className="p-2 border-b border-slate-100 bg-slate-50">
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest px-2">
            📂 Sub-Topics
          </p>
        </div>
        <div className="p-3 overflow-x-auto">
          <div className="flex flex-wrap gap-2">
            {mainTab.subTabs.map((sub) => {
              const isActive = activeSubTab === sub.id;
              return (
                <button
                  key={sub.id}
                  onClick={() => onSubTabSelect(mainTab.id, sub.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200 whitespace-nowrap border ${
                    isActive
                      ? `bg-gradient-to-r ${mainTab.gradient} text-white border-transparent shadow-lg scale-105`
                      : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  {isActive && <span className="mr-1">✦</span>}
                  {sub.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Sub-Tab Content */}
      {currentSubTab ? (
        <div className="animate-fadeIn">
          {/* Sub-tab title bar */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200 mb-6">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mainTab.gradient} flex items-center justify-center text-white text-lg shadow-md`}>
                {mainTab.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg md:text-xl font-bold text-slate-800 truncate">
                  {currentSubTab.title}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {mainTab.name} → {currentSubTab.title}
                </p>
              </div>
            </div>
          </div>

          {/* Special content for about-me */}
          {currentSubTab.id === "about-me" ? (
            <AboutMeContent />
          ) : currentSubTab.id === "thought-of-day" ? (
            <ThoughtOfDay />
          ) : (
            <GenericSubTabContent
              title={currentSubTab.title}
              gradient={mainTab.gradient}
              icon={mainTab.icon}
              categoryName={mainTab.name}
            />
          )}

          {/* File Attachment Section */}
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <FileManager tabId={currentSubTab.id} isAdmin={isAdmin} />
          </div>
        </div>
      ) : (
        /* No sub-tab selected — show overview */
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
              <span>👆</span> Select a Sub-Topic
            </h3>
            <p className="text-slate-500 text-sm">
              Click on any sub-topic button above to view its content, materials, and attached files.
            </p>
          </div>

          {/* Grid of sub-tab cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mainTab.subTabs.map((sub, idx) => (
              <button
                key={sub.id}
                onClick={() => onSubTabSelect(mainTab.id, sub.id)}
                className="text-left bg-white rounded-xl p-5 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex items-start gap-3">
                  <span className={`w-8 h-8 rounded-lg bg-gradient-to-br ${mainTab.gradient} text-white flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-sm`}>
                    {idx + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 text-sm leading-snug group-hover:text-blue-600 transition-colors truncate">
                      {sub.title}
                    </h4>
                    <p className="text-xs text-blue-500 mt-2 font-medium group-hover:underline">
                      Open sub-topic →
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
