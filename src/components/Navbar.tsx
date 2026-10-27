import React from 'react';
import { Share2, BookOpen, Calculator, Terminal, FileText, Network, Code2 } from 'lucide-react';

interface NavbarProps {
  activeView: 'topics' | 'commands' | 'calculator' | 'cli' | 'labs';
  setActiveView: (view: 'topics' | 'commands' | 'calculator' | 'cli' | 'labs') => void;
  onOpenShare: () => void;
  onOpenTopology: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  setActiveView,
  onOpenShare,
  onOpenTopology,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single line brand wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-500/20">
            <Network className="w-5 h-5" />
          </div>
          <button
            onClick={() => setActiveView('topics')}
            className="text-left font-bold text-lg text-white hover:text-cyan-300 transition-colors tracking-tight whitespace-nowrap"
          >
            NetMaster <span className="text-cyan-400">Hub</span>
            <span className="hidden lg:inline text-xs font-normal text-slate-400 ml-2">by Rahmat Ullah</span>
          </button>
        </div>

        {/* Zone 2: 4-5 single-line navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveView('topics')}
            className={`whitespace-nowrap transition-colors hover:text-cyan-400 cursor-pointer ${
              activeView === 'topics' ? 'text-cyan-400 font-semibold' : 'text-slate-300'
            }`}
          >
            টপিক ডেটাবেস
          </button>

          <button
            onClick={() => setActiveView('commands')}
            className={`whitespace-nowrap transition-colors hover:text-cyan-400 cursor-pointer ${
              activeView === 'commands' ? 'text-cyan-400 font-semibold' : 'text-slate-300'
            }`}
          >
            কমান্ড মাস্টারবুক
          </button>

          <button
            onClick={() => setActiveView('calculator')}
            className={`whitespace-nowrap transition-colors hover:text-cyan-400 cursor-pointer ${
              activeView === 'calculator' ? 'text-cyan-400 font-semibold' : 'text-slate-300'
            }`}
          >
            সাবনেট ক্যালকুলেটর
          </button>

          <button
            onClick={() => setActiveView('cli')}
            className={`whitespace-nowrap transition-colors hover:text-cyan-400 cursor-pointer ${
              activeView === 'cli' ? 'text-cyan-400 font-semibold' : 'text-slate-300'
            }`}
          >
            সিএলআই জেনারেটর
          </button>

          <button
            onClick={() => setActiveView('labs')}
            className={`whitespace-nowrap transition-colors hover:text-cyan-400 cursor-pointer ${
              activeView === 'labs' ? 'text-cyan-400 font-semibold' : 'text-slate-300'
            }`}
          >
            পিডিএফ স্লাইড
          </button>

          <button
            onClick={onOpenTopology}
            className="whitespace-nowrap transition-colors text-slate-300 hover:text-cyan-400 cursor-pointer"
          >
            টপোলজি
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenShare}
            className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-white bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-xl transition-all shadow-md shadow-cyan-900/30 whitespace-nowrap cursor-pointer active:scale-95"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>বন্ধুদের সাথে শেয়ার</span>
          </button>
        </div>
      </div>

      {/* Mobile nav pills bar */}
      <div className="flex md:hidden px-4 py-2 bg-slate-900/80 border-t border-slate-800/80 overflow-x-auto gap-2 text-xs">
        <button
          onClick={() => setActiveView('topics')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
            activeView === 'topics' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400'
          }`}
        >
          টপিক ডেটাবেস
        </button>
        <button
          onClick={() => setActiveView('commands')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
            activeView === 'commands' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400'
          }`}
        >
          কমান্ড মাস্টারবুক
        </button>
        <button
          onClick={() => setActiveView('calculator')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
            activeView === 'calculator' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400'
          }`}
        >
          সাবনেট ক্যালকুলেটর
        </button>
        <button
          onClick={() => setActiveView('cli')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
            activeView === 'cli' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400'
          }`}
        >
          সিএলআই জেনারেটর
        </button>
        <button
          onClick={() => setActiveView('labs')}
          className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-medium ${
            activeView === 'labs' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' : 'text-slate-400'
          }`}
        >
          পিডিএফ
        </button>
        <button
          onClick={onOpenTopology}
          className="px-3 py-1.5 rounded-lg whitespace-nowrap font-medium text-slate-400"
        >
          টপোলজি
        </button>
      </div>
    </header>
  );
};
