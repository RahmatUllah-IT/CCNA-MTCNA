import React from 'react';
import { X, ExternalLink, Download, FileText, CheckCircle2 } from 'lucide-react';

interface PdfViewerModalProps {
  pdfPath: string | null;
  pdfTitle: string;
  onClose: () => void;
}

export const PdfViewerModal: React.FC<PdfViewerModalProps> = ({
  pdfPath,
  pdfTitle,
  onClose,
}) => {
  if (!pdfPath) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800 bg-slate-900/90 shrink-0">
          <div className="flex items-center gap-3 min-w-0 pr-4">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
              <FileText className="w-5 h-5" />
            </div>
            <div className="truncate">
              <h3 className="text-base sm:text-lg font-bold text-white truncate">
                {pdfTitle}
              </h3>
              <p className="text-xs text-slate-400 truncate">
                সিসকো নেটওয়ার্কিং হ্যান্ডআউট ও ল্যাব গাইড (Creative IT Material)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={pdfPath}
              download
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">ডাউনলোড</span>
            </a>
            <a
              href={pdfPath}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium border border-slate-700 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">নতুন ট্যাবে খুলুন</span>
            </a>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Iframe Viewport */}
        <div className="flex-1 bg-slate-950 relative overflow-hidden">
          <iframe
            src={`${pdfPath}#toolbar=1&navpanes=0`}
            title={pdfTitle}
            className="w-full h-full border-0"
          />
        </div>

        {/* Footer info note */}
        <div className="px-5 py-3 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between text-xs text-slate-400 shrink-0">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>অরিজিনাল ক্লাস স্লাইড ও ডায়াগ্রাম সরাসরি ভিউ হচ্ছে।</span>
          </div>
          <span className="hidden sm:inline text-slate-400">
            সমস্যা হলে "নতুন ট্যাবে খুলুন" বাটনে ক্লিক করুন
          </span>
        </div>
      </div>
    </div>
  );
};
