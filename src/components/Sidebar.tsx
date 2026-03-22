import { useState, useEffect } from "react";
import { mainTabs, type MainTab } from "../data/categories";

interface SidebarProps {
  activeMainTab: string | null;
  activeSubTab: string | null;
  onMainTabSelect: (mainTabId: string) => void;
  onSubTabSelect: (mainTabId: string, subTabId: string) => void;
  searchQuery: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({
  activeMainTab,
  activeSubTab,
  onMainTabSelect,
  onSubTabSelect,
  searchQuery,
  isOpen,
  onClose,
}: SidebarProps) {
  const [expandedTabs, setExpandedTabs] = useState<Set<string>>(new Set());

  // Auto-expand the active main tab
  useEffect(() => {
    if (activeMainTab) {
      setExpandedTabs((prev) => new Set(prev).add(activeMainTab));
    }
  }, [activeMainTab]);

  const toggleExpand = (tabId: string) => {
    setExpandedTabs((prev) => {
      const next = new Set(prev);
      if (next.has(tabId)) {
        next.delete(tabId);
      } else {
        next.add(tabId);
      }
      return next;
    });
  };

  // Filter tabs based on search
  const filteredTabs = searchQuery
    ? mainTabs
        .map((tab) => ({
          ...tab,
          subTabs: tab.subTabs.filter((st) =>
            st.title.toLowerCase().includes(searchQuery.toLowerCase())
          ),
        }))
        .filter(
          (tab) =>
            tab.subTabs.length > 0 ||
            tab.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : mainTabs;

  const handleMainClick = (tab: MainTab) => {
    onMainTabSelect(tab.id);
    toggleExpand(tab.id);
  };

  const handleSubClick = (mainTabId: string, subTabId: string) => {
    onSubTabSelect(mainTabId, subTabId);
    onClose();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 lg:top-[5.25rem] left-0 h-full lg:h-[calc(100vh-5.25rem)] w-80 bg-gradient-to-b from-slate-50 to-white border-r border-slate-200 z-50 lg:z-30 transition-transform duration-300 overflow-y-auto ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Mobile close */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-200 bg-white sticky top-0 z-10">
          <span className="font-bold text-slate-800 text-lg">📑 Navigation</span>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Home button */}
        <div className="p-3 pb-0">
          <button
            onClick={() => {
              onMainTabSelect("");
              onClose();
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
              !activeMainTab
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <span className="text-lg">🏠</span>
            <span className="font-semibold text-sm">Home / Dashboard</span>
          </button>
        </div>

        {/* Main Tabs list */}
        <nav className="p-3 space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2">
            Main Categories
          </p>

          {filteredTabs.map((tab: MainTab) => {
            const isExpanded = expandedTabs.has(tab.id) || searchQuery.length > 0;
            const isActive = activeMainTab === tab.id;

            return (
              <div key={tab.id} className="rounded-xl overflow-hidden">
                {/* Main Tab Button */}
                <button
                  onClick={() => handleMainClick(tab)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-left rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-blue-50 text-blue-800 border border-blue-200"
                      : "hover:bg-slate-100 text-slate-700"
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0 ${
                      isActive
                        ? `bg-gradient-to-br ${tab.gradient} text-white shadow-sm`
                        : "bg-slate-100 group-hover:bg-slate-200"
                    }`}
                  >
                    {tab.icon}
                  </span>
                  <span className="font-semibold text-xs flex-1 leading-tight">
                    {tab.name}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400 bg-slate-100 rounded-full px-2 py-0.5 flex-shrink-0">
                    {tab.subTabs.length}
                  </span>
                  <svg
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Sub-Tabs (expandable) */}
                {isExpanded && (
                  <div className="ml-5 pl-4 border-l-2 border-slate-200 mt-1 mb-2 space-y-0.5 animate-fadeIn">
                    {tab.subTabs.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleSubClick(tab.id, sub.id)}
                        className={`w-full text-left px-3 py-2 text-xs rounded-lg transition-all duration-150 leading-snug ${
                          activeSubTab === sub.id
                            ? `bg-gradient-to-r ${tab.gradient} text-white shadow-md font-semibold`
                            : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                        }`}
                      >
                        {sub.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 mt-4 border-t border-slate-200">
          <div className="text-center text-xs text-slate-400">
            <p className="font-medium text-slate-500">📧 manojpurohit@university.edu</p>
            <p className="mt-1">© 2025 Prof. Manoj Purohit</p>
          </div>
        </div>
      </aside>
    </>
  );
}
