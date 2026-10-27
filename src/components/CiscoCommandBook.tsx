import React, { useState, useMemo } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  Search, 
  X, 
  Sparkles, 
  ShieldCheck, 
  Layers, 
  Filter, 
  HelpCircle,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { CISCO_COMMANDS_MASTER, CommandItem } from '../data/commandsData';

export const CiscoCommandBook: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<'All' | 'Basic' | 'Intermediate' | 'Advance'>('All');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Unique topics for secondary filter
  const topicsList = useMemo(() => {
    const set = new Set<string>();
    CISCO_COMMANDS_MASTER.forEach((cmd) => set.add(cmd.topic));
    return ['All', ...Array.from(set)];
  }, []);

  // Filtered commands
  const filteredCommands = useMemo(() => {
    return CISCO_COMMANDS_MASTER.filter((cmd) => {
      // Level filter
      if (selectedLevel !== 'All' && cmd.level !== selectedLevel) {
        return false;
      }

      // Topic filter
      if (selectedTopic !== 'All' && cmd.topic !== selectedTopic) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = cmd.title.toLowerCase().includes(q);
        const inTitleEn = cmd.titleEn.toLowerCase().includes(q);
        const inDesc = cmd.description.toLowerCase().includes(q);
        const inSyntax = cmd.syntax.toLowerCase().includes(q);
        const inExample = cmd.exampleCli.toLowerCase().includes(q);
        const inTags = cmd.tags.some((t) => t.toLowerCase().includes(q));

        if (!inTitle && !inTitleEn && !inDesc && !inSyntax && !inExample && !inTags) {
          return false;
        }
      }

      return true;
    });
  }, [selectedLevel, selectedTopic, searchQuery]);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header section with author credit */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider">
              <Terminal className="w-4 h-4" />
              <span>Cisco Command Masterbook · Basic to Advance</span>
              <span aria-hidden="true">·</span>
              <span className="text-slate-400">Curated by Rahmat Ullah</span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-white mt-2">
              সিসকো সিএলআই কমান্ড মাস্টারবুক (Basic to Advance)
            </h2>
            <p className="text-slate-300 text-sm mt-2 max-w-3xl leading-relaxed">
              বেসিক ইন্টারফেস ও আইপি অ্যাসাইনমেন্ট থেকে শুরু করে OSPF মাল্টি এরিয়া, ইন্টার-ভিল্যান, এসিএল এবং রমমন পাসওয়ার্ড ব্রেক—প্রতিটি টপিকের কমান্ড আলাদাভাবে গুছিয়ে দেওয়া হয়েছে যাতে যে কেউ এক ক্লিকে কপি করে ল্যাব বা রিয়েল ডিভাইসে সরাসরি চালাতে পারে।
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 text-xs font-mono shrink-0">
            <span>মোট কমান্ড: {CISCO_COMMANDS_MASTER.length}টি প্রস্তুত</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-6">
          {/* Level Filter Tabs */}
          <div className="md:col-span-6 flex items-center gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800 overflow-x-auto text-xs font-medium">
            {[
              { id: 'All', label: `সব লেভেল (${CISCO_COMMANDS_MASTER.length})` },
              { id: 'Basic', label: '১. বেসিক (Basic)' },
              { id: 'Intermediate', label: '২. ইন্টারমিডিয়েট' },
              { id: 'Advance', label: '৩. এডভান্সড (Advance)' },
            ].map((lvl) => (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevel(lvl.id as any)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  selectedLevel === lvl.id
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="যেকোনো কমান্ড খুঁজুন (যেমন: no shut, dot1q, ospf, 0x2142, overload, vtp, acl)..."
              className="w-full bg-slate-950 border border-slate-700/80 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Secondary Topic Pills */}
        <div className="flex flex-wrap items-center gap-1.5 mt-4 pt-4 border-t border-slate-800/60">
          <span className="text-xs text-slate-400 mr-1 font-medium">টপিক ফিল্টার:</span>
          {topicsList.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedTopic(t)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedTopic === t
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {t === 'All' ? 'সকল টপিক' : t}
            </button>
          ))}
        </div>
      </div>

      {/* Commands List Grid */}
      <div className="space-y-6">
        {filteredCommands.length > 0 ? (
          filteredCommands.map((cmd, index) => {
            const isCopied = copiedId === cmd.id;

            return (
              <div
                key={cmd.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 transition-all duration-200 shadow-md"
              >
                {/* Header line */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="font-mono text-cyan-400 font-semibold">{cmd.topic}</span>
                    <span aria-hidden="true">·</span>
                    <span
                      className={`font-semibold px-2 py-0.5 rounded-md ${
                        cmd.level === 'Basic'
                          ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/40'
                          : cmd.level === 'Intermediate'
                          ? 'bg-amber-950/60 text-amber-400 border border-amber-800/40'
                          : 'bg-rose-950/60 text-rose-400 border border-rose-800/40'
                      }`}
                    >
                      {cmd.level}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono text-slate-400">Step #{index + 1}</span>
                  </div>

                  <button
                    onClick={() => handleCopy(cmd.exampleCli, cmd.id)}
                    className="flex items-center gap-1.5 self-start sm:self-auto px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-all shadow-md shadow-cyan-900/20 active:scale-95 cursor-pointer shrink-0"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{isCopied ? 'কপি সফল!' : 'কমান্ড কপি করুন'}</span>
                  </button>
                </div>

                {/* Command Title & Info */}
                <div className="mt-3">
                  <h3 className="text-lg font-bold text-white">
                    {cmd.title}
                  </h3>
                  <span className="text-xs text-slate-400 block font-mono mt-0.5">
                    {cmd.titleEn}
                  </span>
                  <p className="text-slate-300 text-sm mt-2 leading-relaxed">
                    {cmd.description}
                  </p>
                </div>

                {/* Practical Context (কখন ব্যবহার করবেন) */}
                <div className="mt-3 p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl text-xs text-slate-300 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white">কখন ব্যবহার করবেন: </strong>
                    <span className="text-slate-300">{cmd.whenToUse}</span>
                  </div>
                </div>

                {/* Syntax & Code Terminal Box */}
                <div className="mt-4 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-slate-900/90 border-b border-slate-800 text-[11px] font-mono text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></div>
                      <span className="ml-2 text-slate-300 font-semibold">Cisco IOS Execution Snippet</span>
                    </div>
                    <span className="text-cyan-400">One-Click Paste</span>
                  </div>

                  <pre className="p-4 text-xs sm:text-sm font-mono text-emerald-400 overflow-x-auto leading-relaxed selection:bg-emerald-800 selection:text-white">
                    {cmd.exampleCli}
                  </pre>
                </div>

                {/* Verification Commands if any */}
                {cmd.verificationCommands && cmd.verificationCommands.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-800/60 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-slate-400 font-medium">যাচাই করার শো-কমান্ড:</span>
                    {cmd.verificationCommands.map((vCmd, vIdx) => (
                      <code
                        key={vIdx}
                        onClick={() => handleCopy(vCmd, `${cmd.id}-v-${vIdx}`)}
                        className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-cyan-300 border border-slate-800 rounded-lg font-mono cursor-pointer transition-colors"
                        title="ক্লিক করে শো-কমান্ড কপি করুন"
                      >
                        {vCmd}
                      </code>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
            <p className="text-slate-300 font-bold">কোনো কমান্ড মেলেনি</p>
            <p className="text-xs text-slate-500">আপনার ফিল্টার বা সার্চ টার্ম পরিবর্তন করে চেষ্টা করুন।</p>
          </div>
        )}
      </div>
    </div>
  );
};
