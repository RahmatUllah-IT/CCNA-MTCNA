import React from 'react';
import { 
  Layers, 
  Binary, 
  Server, 
  Network, 
  ShieldCheck, 
  KeyRound, 
  FolderKanban 
} from 'lucide-react';
import { MODULE_CATEGORIES, ModuleCategory } from '../data/networkingData';

interface ModuleNavProps {
  selectedModule: string;
  onSelectModule: (moduleId: string) => void;
  topicCounts: Record<string, number>;
}

export const ModuleNav: React.FC<ModuleNavProps> = ({
  selectedModule,
  onSelectModule,
  topicCounts,
}) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Binary': return Binary;
      case 'Server': return Server;
      case 'Network': return Network;
      case 'ShieldCheck': return ShieldCheck;
      case 'KeyRound': return KeyRound;
      case 'FolderKanban': return FolderKanban;
      default: return Layers;
    }
  };

  return (
    <div className="space-y-1">
      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 mb-2 block">
        স্টাডি মডিউলসমূহ (Syllabus Modules)
      </span>
      {MODULE_CATEGORIES.map((cat) => {
        const Icon = getIcon(cat.iconName);
        const isSelected = selectedModule === cat.id;
        const count = cat.id === 'all' 
          ? Object.values(topicCounts).reduce((a, b) => a + b, 0)
          : (topicCounts[cat.id] || 0);

        return (
          <button
            key={cat.id}
            onClick={() => onSelectModule(cat.id)}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all text-left ${
              isSelected
                ? 'bg-cyan-500/15 text-cyan-300 font-semibold border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0 pr-2">
              <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-cyan-400' : 'text-slate-500'}`} />
              <span className="truncate">{cat.name}</span>
            </div>
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md ${
              isSelected ? 'bg-cyan-500/30 text-cyan-200' : 'bg-slate-800 text-slate-400'
            }`}>
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
};
