import { useState } from "react";

interface HeaderProps {
  onSearch: (query: string) => void;
  onMenuToggle: () => void;
  isSidebarOpen: boolean;
  isAdmin: boolean;
  onAdminToggle: () => void;
}

export default function Header({ onSearch, onMenuToggle, isSidebarOpen, isAdmin, onAdminToggle }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 shadow-2xl border-b border-blue-800/30">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500"></div>

      <div className="max-w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Menu button + Brand */}
          <div className="flex items-center gap-3">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-lg bg-blue-800/30 text-blue-200 hover:bg-blue-700/50 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isSidebarOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg ring-2 ring-blue-400/30">
                MP
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Prof. Manoj Purohit
                </h1>
                <p className="text-xs sm:text-sm text-blue-300/80 font-medium">
                  Assistant Professor • MCA Department
                </p>
              </div>
            </div>
          </div>

          {/* Right: Search bar + Admin */}
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search topics..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    onSearch(e.target.value);
                  }}
                  className="w-64 lg:w-80 pl-10 pr-4 py-2.5 rounded-xl bg-slate-800/60 border border-blue-700/30 text-white placeholder-blue-300/50 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400/50 text-sm transition-all"
                />
                <svg
                  className="w-4 h-4 text-blue-400/60 absolute left-3 top-1/2 -translate-y-1/2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </form>

            {/* Admin Toggle Button */}
            <button
              onClick={onAdminToggle}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                isAdmin
                  ? "bg-green-500/20 text-green-300 border border-green-500/30 hover:bg-green-500/30"
                  : "bg-slate-800/60 text-blue-300/70 border border-blue-700/30 hover:bg-blue-700/40 hover:text-blue-200"
              }`}
              title={isAdmin ? "Click to logout from admin mode" : "Click to login as admin"}
            >
              {isAdmin ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
                  </svg>
                  <span className="hidden sm:inline">Admin ✓</span>
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span className="hidden sm:inline">Login</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
