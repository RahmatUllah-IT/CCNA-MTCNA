import React, { useState, useMemo, useEffect } from 'react';
import { 
  NETWORKING_TOPICS, 
  NetworkingTopic, 
  MODULE_CATEGORIES 
} from './data/networkingData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ModuleNav } from './components/ModuleNav';
import { TopicCard } from './components/TopicCard';
import { CiscoCommandBook } from './components/CiscoCommandBook';
import { SubnetCalculator } from './components/SubnetCalculator';
import { CiscoCliGenerator } from './components/CiscoCliGenerator';
import { LabSheetsView } from './components/LabSheetsView';
import { PdfViewerModal } from './components/PdfViewerModal';
import { ShareModal } from './components/ShareModal';
import { TopologyModal } from './components/TopologyModal';
import { 
  Sparkles, 
  BookOpen, 
  Layers, 
  Terminal, 
  Calculator, 
  HelpCircle, 
  FileText, 
  Share2,
  CheckCircle2,
  FolderKanban,
  Search,
  Code2
} from 'lucide-react';

export default function App() {
  const [activeView, setActiveView] = useState<'topics' | 'commands' | 'calculator' | 'cli' | 'labs'>('topics');
  const [selectedModule, setSelectedModule] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'pdf' | 'video' | 'cli' | 'bookmarked'>('all');
  
  // Bookmarks in localStorage
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('netmaster_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modal states
  const [pdfModal, setPdfModal] = useState<{ isOpen: boolean; path: string; title: string }>({
    isOpen: false,
    path: '',
    title: '',
  });
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isTopologyModalOpen, setIsTopologyModalOpen] = useState(false);

  // Sync bookmarks to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('netmaster_bookmarks', JSON.stringify(bookmarkedIds));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarkedIds]);

  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Module Counts
  const topicCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    NETWORKING_TOPICS.forEach((t) => {
      counts[t.moduleId] = (counts[t.moduleId] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered Topics
  const filteredTopics = useMemo(() => {
    return NETWORKING_TOPICS.filter((t) => {
      // Module filter
      if (selectedModule !== 'all' && t.moduleId !== selectedModule) {
        return false;
      }

      // Media / bookmark filter
      if (activeFilter === 'pdf' && !t.pdfPath) return false;
      if (activeFilter === 'video' && !t.facebookVideoUrl) return false;
      if (activeFilter === 'cli' && (!t.cliCommands || t.cliCommands.length === 0)) return false;
      if (activeFilter === 'bookmarked' && !bookmarkedIds.includes(t.id)) return false;

      // Search query (Bengali + English + Tags)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = t.title.toLowerCase().includes(q);
        const inTitleEn = t.titleEn.toLowerCase().includes(q);
        const inSummary = t.summary.toLowerCase().includes(q);
        const inTags = t.tags.some((tag) => tag.toLowerCase().includes(q));
        const inConcepts = t.keyConcepts.some((c) => c.toLowerCase().includes(q));
        const inCli = t.cliCommands?.some((c) => c.code.toLowerCase().includes(q) || c.title.toLowerCase().includes(q));

        if (!inTitle && !inTitleEn && !inSummary && !inTags && !inConcepts && !inCli) {
          return false;
        }
      }

      return true;
    });
  }, [selectedModule, activeFilter, searchQuery, bookmarkedIds]);

  const handleOpenPdf = (path: string, title: string) => {
    setPdfModal({
      isOpen: true,
      path,
      title,
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* 3-Zone Strict Top Bar */}
      <Navbar
        activeView={activeView}
        setActiveView={(v) => {
          setActiveView(v);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenShare={() => setIsShareModalOpen(true)}
        onOpenTopology={() => setIsTopologyModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* VIEW 1: TOPIC DATABASE & EXPLORER */}
        {activeView === 'topics' && (
          <div className="space-y-8">
            {/* Hero & Search Hub */}
            <HeroSection
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              totalTopicsCount={NETWORKING_TOPICS.length}
              filteredCount={filteredTopics.length}
              bookmarkedCount={bookmarkedIds.length}
              onOpenCommands={() => {
                setActiveView('commands');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenCalculator={() => {
                setActiveView('calculator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenCli={() => {
                setActiveView('cli');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Content Layout with Sidebar & Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Module Navigation Filter */}
              <div className="lg:col-span-3 sticky top-24 space-y-6">
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4">
                  <ModuleNav
                    selectedModule={selectedModule}
                    onSelectModule={(id) => setSelectedModule(id)}
                    topicCounts={topicCounts}
                  />
                </div>

                {/* Quick command book highlight widget */}
                <div className="bg-gradient-to-br from-cyan-950/40 to-blue-950/40 border border-cyan-800/40 rounded-2xl p-4 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                    <Code2 className="w-4 h-4 text-cyan-400" />
                    <span>কমান্ড মাস্টারবুক</span>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    রাউটার মোড, আইপি, VLAN, OSPF, ACL ও পাসওয়ার্ড রিকভারির রেডি-টু-ইউজ কমান্ড লিস্ট।
                  </p>
                  <button
                    onClick={() => {
                      setActiveView('commands');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-cyan-400 hover:text-cyan-300 font-medium block pt-1 cursor-pointer"
                  >
                    কমান্ড সেকশন খুলুন &rarr;
                  </button>
                </div>

                {/* Quick study tip widget */}
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-4 text-xs space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>স্টুডেন্ট প্র্যাকটিস টিপস</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    প্যাকেট ট্রেসারে ল্যাব করার সময় প্রথমে রাউটার ইন্টারফেসে আইপি বসিয়ে <code className="text-cyan-300 font-mono">no shutdown</code> দিন। তারপর রাউটিং বা এসিএল কনফিগার করুন।
                  </p>
                  <button
                    onClick={() => setIsTopologyModalOpen(true)}
                    className="text-cyan-400 hover:text-cyan-300 font-medium block pt-1 cursor-pointer"
                  >
                    টপোলজি ডায়াগ্রাম দেখুন &rarr;
                  </button>
                </div>
              </div>

              {/* Right Column: Topics Grid */}
              <div className="lg:col-span-9 space-y-6">
                {filteredTopics.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredTopics.map((topic) => (
                      <TopicCard
                        key={topic.id}
                        topic={topic}
                        isBookmarked={bookmarkedIds.includes(topic.id)}
                        onToggleBookmark={toggleBookmark}
                        onOpenPdf={handleOpenPdf}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-slate-500">
                      <Search className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white">কোনো টপিক পাওয়া যায়নি</h3>
                      <p className="text-sm text-slate-400 mt-1">
                        আপনার সার্চ কুয়েরি বা ফিল্টারের সাথে মিলে এমন কোনো রিসোর্স মেলেনি।
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedModule('all');
                        setActiveFilter('all');
                      }}
                      className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                    >
                      সব ফিল্টার রিসেট করুন
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: DEDICATED COMMAND MASTERBOOK (BASIC TO ADVANCE) */}
        {activeView === 'commands' && (
          <div className="space-y-6 py-2">
            <CiscoCommandBook />
          </div>
        )}

        {/* VIEW 3: SUBNET CALCULATOR */}
        {activeView === 'calculator' && (
          <div className="space-y-6 py-2">
            <SubnetCalculator />
          </div>
        )}

        {/* VIEW 4: CISCO CLI GENERATOR */}
        {activeView === 'cli' && (
          <div className="space-y-6 py-2">
            <CiscoCliGenerator />
          </div>
        )}

        {/* VIEW 5: OFFICIAL LAB SHEETS & PDF DIRECTORY */}
        {activeView === 'labs' && (
          <div className="space-y-6 py-2">
            <LabSheetsView onOpenPdf={handleOpenPdf} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 mt-16 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <span className="font-bold text-white">NetMaster Hub</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span className="text-cyan-400 font-medium">Curated & Developed by Rahmat Ullah</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span>সিসকো ও কম্পিউটার নেটওয়ার্কিং কমপ্লিট স্টাডি পোর্টাল</span>
          </div>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 text-slate-400">
            <span className="font-mono text-cyan-400 bg-slate-900 border border-slate-800 px-2.5 py-0.5 rounded text-[11px]">
              is.gd/rahmat_ccna_portal
            </span>
            <span aria-hidden="true">·</span>
            <span>কোর্স লেকচার: Rezaul Karim Bhuiyan</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setIsShareModalOpen(true)}
              className="text-cyan-400 hover:text-cyan-300 font-semibold cursor-pointer underline"
            >
              বন্ধুদের সাথে শেয়ার করুন
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {pdfModal.isOpen && (
        <PdfViewerModal
          pdfPath={pdfModal.path}
          pdfTitle={pdfModal.title}
          onClose={() => setPdfModal({ isOpen: false, path: '', title: '' })}
        />
      )}

      {isShareModalOpen && (
        <ShareModal
          isOpen={isShareModalOpen}
          onClose={() => setIsShareModalOpen(false)}
        />
      )}

      {isTopologyModalOpen && (
        <TopologyModal
          isOpen={isTopologyModalOpen}
          onClose={() => setIsTopologyModalOpen(false)}
        />
      )}
    </div>
  );
}
