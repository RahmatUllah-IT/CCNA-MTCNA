import React from 'react';
import { Search, X, BookOpen, Layers, Star, Video, FileText, Terminal, Calculator, Network, Code2 } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeFilter: 'all' | 'pdf' | 'video' | 'cli' | 'bookmarked';
  setActiveFilter: (filter: 'all' | 'pdf' | 'video' | 'cli' | 'bookmarked') => void;
  totalTopicsCount: number;
  filteredCount: number;
  bookmarkedCount: number;
  onOpenCommands: () => void;
  onOpenCalculator: () => void;
  onOpenCli: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  setSearchQuery,
  activeFilter,
  setActiveFilter,
  totalTopicsCount,
  filteredCount,
  bookmarkedCount,
  onOpenCommands,
  onOpenCalculator,
  onOpenCli,
}) => {
  return (
    <div className="pt-8 pb-6 border-b border-slate-800">
      {/* Editorial Title & Kicker */}
      <div className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-cyan-400 mb-2 tracking-wide uppercase">
          <span>Cisco CCNA & Networking Master Portal</span>
          <span aria-hidden="true">·</span>
          <span className="text-white bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/60">
            by Rahmat Ullah
          </span>
          <span aria-hidden="true">·</span>
          <span className="text-slate-400">Creative IT Curriculum</span>
        </div>
        
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight text-balance">
          সিসকো ও নেটওয়ার্কিং আল্টিমেট স্টাডি পোর্টাল
        </h1>

        <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed text-pretty">
          এড্রেসিং, সাবনেটিং, সুইচিং, ভি-ল্যান, ওএসপিএফ এবং এসিএল—ক্লাস ভিডিও, মিডিয়াম আর্টিকেল, সিসকো হ্যান্ডআউট এবং বেসিক থেকে এডভান্সড কমান্ড এক নিমিষে খুঁজে বের করুন।
        </p>
      </div>

      {/* Quick Tool Launchers Strip */}
      <div className="flex flex-wrap items-center gap-3 mt-6">
        <button
          onClick={onOpenCommands}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-cyan-950/40 cursor-pointer active:scale-95"
        >
          <Code2 className="w-4 h-4" />
          <span>কমান্ড মাস্টারবুক (Basic to Advance)</span>
        </button>

        <button
          onClick={onOpenCalculator}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-cyan-300 text-xs font-semibold transition-all shadow-sm cursor-pointer"
        >
          <Calculator className="w-4 h-4 text-cyan-400" />
          <span>লাইভ সাবনেট ক্যালকুলেটর</span>
        </button>

        <button
          onClick={onOpenCli}
          className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-emerald-300 text-xs font-semibold transition-all shadow-sm cursor-pointer"
        >
          <Terminal className="w-4 h-4 text-emerald-400" />
          <span>সিসকো সিএলআই জেনারেটর</span>
        </button>
      </div>

      {/* Instant Search Bar */}
      <div className="mt-6 max-w-2xl">
        <div className="relative flex items-center bg-slate-900 border border-slate-700 rounded-2xl shadow-xl shadow-slate-950/50 overflow-hidden focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all">
          <Search className="w-5 h-5 text-slate-400 ml-4 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="যেকোনো টপিক সার্চ করুন (যেমন: OSPF, VLAN, Subnetting, ACL, DHCP, 0x2142, সাবনেটিং)..."
            className="w-full bg-transparent px-3 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="p-2 text-slate-400 hover:text-white mr-2 rounded-lg cursor-pointer"
              title="সার্চ মুছুন"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Interactive Filter Pills & Result Counter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-6 pt-4 border-t border-slate-800/60">
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeFilter === 'all'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            সব রিসোর্স ({totalTopicsCount})
          </button>

          <button
            onClick={() => setActiveFilter('pdf')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeFilter === 'pdf'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>পিডিএফ স্লাইড সহ</span>
          </button>

          <button
            onClick={() => setActiveFilter('video')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeFilter === 'video'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>ভিডিও ক্লাস সহ</span>
          </button>

          <button
            onClick={() => setActiveFilter('cli')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeFilter === 'cli'
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>সিএলআই কমান্ড</span>
          </button>

          <button
            onClick={() => setActiveFilter('bookmarked')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              activeFilter === 'bookmarked'
                ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>বুকমার্ক ({bookmarkedCount})</span>
          </button>
        </div>

        <div className="text-xs text-slate-400 tabular-nums">
          <span>প্রদর্শন হচ্ছে: <strong className="text-cyan-400">{filteredCount}</strong> টি টপিক</span>
        </div>
      </div>
    </div>
  );
};
