import { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ContentArea from "./components/ContentArea";
import Home from "./components/Home";
import { mainTabs } from "./data/categories";
import { migrateFromLocalStorage } from "./utils/fileStorage";

export default function App() {
  const [activeMainTab, setActiveMainTab] = useState<string | null>(null);
  const [activeSubTab, setActiveSubTab] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem("blog_admin_mode") === "true";
  });
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminError, setAdminError] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSidebarOpen(false);
    };
    window.addEventListener("resize", handleResize);
    migrateFromLocalStorage();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMainTabSelect = (mainTabId: string) => {
    if (mainTabId === "") {
      // Go home
      setActiveMainTab(null);
      setActiveSubTab(null);
    } else {
      setActiveMainTab(mainTabId);
      setActiveSubTab(null);
    }
    setSearchQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubTabSelect = (mainTabId: string, subTabId: string) => {
    setActiveMainTab(mainTabId);
    setActiveSubTab(subTabId);
    setSearchQuery("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleGoHome = () => {
    setActiveMainTab(null);
    setActiveSubTab(null);
    setSearchQuery("");
  };

  const handleAdminToggle = () => {
    if (isAdmin) {
      setIsAdmin(false);
      localStorage.removeItem("blog_admin_mode");
    } else {
      setShowAdminModal(true);
      setAdminPassword("");
      setAdminError("");
    }
  };

  const handleAdminLogin = () => {
    if (adminPassword === "manoj2025") {
      setIsAdmin(true);
      localStorage.setItem("blog_admin_mode", "true");
      setShowAdminModal(false);
      setAdminPassword("");
      setAdminError("");
    } else {
      setAdminError("Incorrect password. Please try again.");
    }
  };

  // Build breadcrumb
  const currentMainTab = activeMainTab ? mainTabs.find((t) => t.id === activeMainTab) : null;
  const currentSubTab = activeSubTab && currentMainTab
    ? currentMainTab.subTabs.find((s) => s.id === activeSubTab)
    : null;

  return (
    <div className="min-h-screen bg-slate-100">
      <Header
        onSearch={handleSearch}
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        isSidebarOpen={sidebarOpen}
        isAdmin={isAdmin}
        onAdminToggle={handleAdminToggle}
      />

      <div className="flex">
        <Sidebar
          activeMainTab={activeMainTab}
          activeSubTab={activeSubTab}
          onMainTabSelect={handleMainTabSelect}
          onSubTabSelect={handleSubTabSelect}
          searchQuery={searchQuery}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3">
            <div className="flex items-center gap-2 text-sm flex-wrap">
              <button
                onClick={handleGoHome}
                className="text-blue-600 hover:text-blue-800 font-medium hover:underline transition-colors"
              >
                🏠 Home
              </button>
              {currentMainTab && (
                <>
                  <svg className="w-4 h-4 text-slate-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <button
                    onClick={() => handleMainTabSelect(currentMainTab.id)}
                    className={`font-medium transition-colors truncate ${
                      currentSubTab
                        ? "text-blue-600 hover:text-blue-800 hover:underline"
                        : "text-slate-600"
                    }`}
                  >
                    {currentMainTab.icon} {currentMainTab.name}
                  </button>
                </>
              )}
              {currentSubTab && (
                <>
                  <svg className="w-4 h-4 text-slate-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                  <span className="text-slate-500 truncate">{currentSubTab.title}</span>
                </>
              )}

              {isAdmin && (
                <span className="ml-auto px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold flex items-center gap-1 flex-shrink-0">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Admin Mode
                </span>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 lg:p-8 max-w-5xl">
            {activeMainTab ? (
              <ContentArea
                activeMainTab={activeMainTab}
                activeSubTab={activeSubTab}
                onSubTabSelect={handleSubTabSelect}
                isAdmin={isAdmin}
              />
            ) : (
              <Home
                onMainTabSelect={handleMainTabSelect}
                onSubTabSelect={handleSubTabSelect}
              />
            )}
          </div>

          {/* Footer */}
          <footer className="bg-white border-t border-slate-200 mt-12 px-4 sm:px-6 lg:px-8 py-8">
            <div className="max-w-5xl">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                      MP
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">Prof. Manoj Purohit</h4>
                      <p className="text-xs text-slate-500">Assistant Professor</p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Dedicated to providing quality education and resources for MCA students.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-3">Quick Links</h4>
                  <div className="space-y-2">
                    {[
                      { label: "OOSE Materials", mainId: "oose", subId: "oose-notes" },
                      { label: "Java Concepts", mainId: "java", subId: "java-concepts" },
                      { label: "Python Resources", mainId: "python", subId: "python-notes" },
                      { label: "About Me", mainId: "about", subId: "about-me" },
                    ].map((link) => (
                      <button
                        key={link.subId}
                        onClick={() => handleSubTabSelect(link.mainId, link.subId)}
                        className="block text-sm text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {link.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-3">Contact</h4>
                  <div className="space-y-2 text-sm text-slate-500">
                    <p>📧 manojpurohit@university.edu</p>
                    <p>🏫 MCA Department</p>
                    <p>🕐 Office Hours: Mon-Fri, 10AM-5PM</p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t border-slate-100 text-center text-xs text-slate-400">
                <p>© 2025 Prof. Manoj Purohit. All rights reserved. | Academic Blog for MCA Students</p>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Admin Login Modal */}
      {showAdminModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setShowAdminModal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">🔐</div>
                <div>
                  <h3 className="text-xl font-bold">Admin Login</h3>
                  <p className="text-white/70 text-sm">Enter password to manage files</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Admin Password</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => { setAdminPassword(e.target.value); setAdminError(""); }}
                onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                placeholder="Enter admin password..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-400 text-slate-800 placeholder-slate-400"
                autoFocus
              />
              {adminError && (
                <p className="mt-2 text-red-500 text-sm flex items-center gap-1">⚠️ {adminError}</p>
              )}
              <div className="mt-2 bg-blue-50 rounded-lg p-3 border border-blue-100">
                <p className="text-xs text-blue-600">
                  <strong>💡 Hint:</strong> Default password is{" "}
                  <code className="bg-blue-100 px-1.5 py-0.5 rounded font-mono">manoj2025</code>
                </p>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAdminModal(false)}
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdminLogin}
                  className="flex-1 px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 font-medium transition-all shadow-lg"
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
