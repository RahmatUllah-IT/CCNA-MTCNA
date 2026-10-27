import React, { useState } from 'react';
import { 
  FileText, 
  Video, 
  BookOpen, 
  Terminal, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Copy, 
  Check, 
  ExternalLink,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { NetworkingTopic } from '../data/networkingData';

interface TopicCardProps {
  topic: NetworkingTopic;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
  onOpenPdf: (pdfPath: string, title: string) => void;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  isBookmarked,
  onToggleBookmark,
  onOpenPdf,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyCli = (code: string, idx: number) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-6 transition-all duration-200 hover:shadow-xl hover:shadow-cyan-950/20 flex flex-col justify-between group">
      <div>
        {/* Top unboxed metadata line */}
        <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-3 pb-2 border-b border-slate-800/60">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400 font-medium">{topic.moduleName}</span>
            <span aria-hidden="true">·</span>
            <span className={
              topic.difficulty === 'Beginner' 
                ? 'text-emerald-400 font-medium' 
                : topic.difficulty === 'Intermediate' 
                ? 'text-amber-400 font-medium' 
                : 'text-rose-400 font-medium'
            }>
              {topic.difficulty}
            </span>
          </div>

          <button
            onClick={() => onToggleBookmark(topic.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              isBookmarked 
                ? 'text-amber-400 hover:bg-amber-400/10' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
            }`}
            title={isBookmarked ? 'বুকমার্ক থেকে সরান' : 'পড়ার জন্য বুকমার্ক করুন'}
          >
            <Star className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
          {topic.title}
        </h3>
        <span className="text-xs text-slate-400 block mt-0.5 font-mono">
          {topic.titleEn}
        </span>

        {/* Summary */}
        <p className="text-slate-300 text-sm mt-3 leading-relaxed">
          {topic.summary}
        </p>

        {/* Key Concepts List */}
        <div className="mt-4 pt-3 border-t border-slate-800/70">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
            মূল পয়েন্টসমূহ (Core Takeaways):
          </span>
          <ul className="space-y-1.5 text-xs text-slate-300">
            {topic.keyConcepts.slice(0, isExpanded ? topic.keyConcepts.length : 3).map((concept, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 mt-1.5 shrink-0" />
                <span className="leading-normal">{concept}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* CLI Snippets Preview if any */}
        {topic.cliCommands && topic.cliCommands.length > 0 && (
          <div className="mt-4">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-between w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-cyan-300 hover:bg-slate-900 transition-colors"
            >
              <div className="flex items-center gap-2 font-mono">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>সিসকো সিএলআই কমান্ড ({topic.cliCommands.length}টি)</span>
              </div>
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {isExpanded && (
              <div className="mt-3 space-y-3">
                {topic.cliCommands.map((cmd, idx) => (
                  <div key={idx} className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                    <div className="flex items-center justify-between px-3 py-2 bg-slate-900/90 border-b border-slate-800 text-xs">
                      <span className="text-slate-300 font-semibold truncate pr-2">{cmd.title}</span>
                      <button
                        onClick={() => handleCopyCli(cmd.code, idx)}
                        className="flex items-center gap-1 text-[11px] text-cyan-400 hover:text-cyan-300 shrink-0 font-medium"
                      >
                        {copiedIndex === idx ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedIndex === idx ? 'কপি হয়েছে' : 'কপি'}</span>
                      </button>
                    </div>
                    <pre className="p-3 text-[11px] font-mono text-emerald-400 overflow-x-auto leading-relaxed">
                      {cmd.code}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Footer Links */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
        {topic.pdfPath && (
          <button
            onClick={() => onOpenPdf(topic.pdfPath!, topic.title)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950/40 hover:bg-cyan-900/40 text-cyan-300 border border-cyan-800/50 text-xs font-semibold transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>PDF হ্যান্ডআউট</span>
          </button>
        )}

        {topic.facebookVideoUrl && (
          <a
            href={topic.facebookVideoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-950/40 hover:bg-indigo-900/40 text-indigo-300 border border-indigo-800/50 text-xs font-semibold transition-colors"
          >
            <Video className="w-3.5 h-3.5 text-indigo-400" />
            <span>ভিডিও ক্লাস</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        )}

        {topic.mediumUrl && (
          <a
            href={topic.mediumUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-300 border border-emerald-800/50 text-xs font-semibold transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
            <span>মিডিয়াম ব্লগ</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>
        )}
      </div>
    </div>
  );
};
