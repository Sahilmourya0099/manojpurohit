import { mainTabs } from "../data/categories";

interface HomeProps {
  onMainTabSelect: (mainTabId: string) => void;
  onSubTabSelect: (mainTabId: string, subTabId: string) => void;
}

export default function Home({ onMainTabSelect, onSubTabSelect }: HomeProps) {
  const totalSubTabs = mainTabs.reduce((sum, t) => sum + t.subTabs.length, 0);

  const recentItems = [
    { mainId: "oopj", subId: "oopj-mca-25-27", title: "OOPJ - MCA - 25 - 27", icon: "☕" },
    { mainId: "oose", subId: "oose-assignments", title: "OOSE ASSIGNMENTS", icon: "⚙️" },
    { mainId: "python", subId: "python-assignments-1", title: "PYTHON ASSIGNMENTS", icon: "🐍" },
    { mainId: "oopj", subId: "oopj-internal-25-27", title: "OOPJ INTERNAL LAB EXAM MCA-25-27", icon: "☕" },
    { mainId: "oopj", subId: "oopj-lab-file", title: "OOPJ - LAB - FILE - MCA2527", icon: "☕" },
    { mainId: "python", subId: "filter-python", title: "FILTER IN PYTHON", icon: "🐍" },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 rounded-3xl p-8 md:p-12 text-white overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/3 -translate-x-1/4"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-yellow-300 text-2xl">🎓</span>
            <span className="text-blue-200 text-sm font-medium uppercase tracking-wider">Welcome to</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 leading-tight">
            Prof. Manoj Purohit's
            <br />
            <span className="text-cyan-300">Academic Blog</span>
          </h1>
          <p className="text-blue-100 text-lg max-w-2xl leading-relaxed">
            Your comprehensive resource for MCA coursework — assignments, notes, lab exercises,
            examinations, and more across multiple programming languages and software engineering topics.
          </p>
          <div className="flex flex-wrap gap-4 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/20">
              <p className="text-2xl font-bold">{mainTabs.length}</p>
              <p className="text-xs text-blue-200">Main Tabs</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/20">
              <p className="text-2xl font-bold">{totalSubTabs}</p>
              <p className="text-xs text-blue-200">Sub-Topics</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/20">
              <p className="text-2xl font-bold">10+</p>
              <p className="text-xs text-blue-200">Subjects</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent / Featured Posts */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span>🔥</span> Recent & Featured
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentItems.map((item) => (
            <button
              key={item.subId}
              onClick={() => onSubTabSelect(item.mainId, item.subId)}
              className="text-left bg-white rounded-xl p-5 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 group"
            >
              <span className="text-2xl mb-3 block">{item.icon}</span>
              <h3 className="font-semibold text-slate-800 text-sm leading-snug group-hover:text-blue-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-blue-500 mt-2 font-medium group-hover:underline">View details →</p>
            </button>
          ))}
        </div>
      </div>

      {/* Browse by Main Tab */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <span>📂</span> Browse by Category
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mainTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onMainTabSelect(tab.id)}
              className="text-left bg-white rounded-2xl p-6 border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-200 group"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tab.gradient} flex items-center justify-center text-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                {tab.icon}
              </div>
              <h3 className="font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">
                {tab.name}
              </h3>
              <p className="text-xs text-slate-400">{tab.subTabs.length} sub-topics</p>
              <div className="mt-3 flex flex-wrap gap-1">
                {tab.subTabs.slice(0, 3).map((sub) => (
                  <span
                    key={sub.id}
                    className="text-[10px] px-2 py-0.5 bg-slate-50 rounded-full text-slate-500 border border-slate-100 truncate max-w-[150px]"
                  >
                    {sub.title}
                  </span>
                ))}
                {tab.subTabs.length > 3 && (
                  <span className="text-[10px] px-2 py-0.5 bg-blue-50 rounded-full text-blue-500 font-medium">
                    +{tab.subTabs.length - 3} more
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Thought of the Day */}
      <div
        onClick={() => onSubTabSelect("about", "thought-of-day")}
        className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-2xl p-8 border border-amber-200 cursor-pointer hover:shadow-lg transition-all"
      >
        <div className="flex items-start gap-4">
          <span className="text-4xl">💭</span>
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">Thought of the Day</h3>
            <p className="text-slate-600 italic text-lg">
              "Education is the most powerful weapon which you can use to change the world."
            </p>
            <p className="text-amber-700 font-semibold text-sm mt-2">— Nelson Mandela</p>
          </div>
        </div>
      </div>

      {/* Subjects Overview */}
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 text-white">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <span>📊</span> Subjects Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "OOSE", count: mainTabs.find((c) => c.id === "oose")?.subTabs.length || 0, color: "bg-blue-500" },
            { name: "Java / OOPJ", count: (mainTabs.find((c) => c.id === "oopj")?.subTabs.length || 0) + (mainTabs.find((c) => c.id === "java")?.subTabs.length || 0), color: "bg-red-500" },
            { name: "Python", count: mainTabs.find((c) => c.id === "python")?.subTabs.length || 0, color: "bg-green-500" },
            { name: "Others", count: (mainTabs.find((c) => c.id === "cpp")?.subTabs.length || 0) + (mainTabs.find((c) => c.id === "csharp")?.subTabs.length || 0) + (mainTabs.find((c) => c.id === "other-subjects")?.subTabs.length || 0), color: "bg-purple-500" },
          ].map((item) => (
            <div key={item.name} className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className={`w-3 h-3 ${item.color} rounded-full mb-2`}></div>
              <p className="text-2xl font-bold">{item.count}</p>
              <p className="text-xs text-slate-400">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
