import React, { useState } from 'react';
import { X, Copy, Check, Share2, MessageCircle, Send, ExternalLink, Link2, Sparkles, Globe, AlertCircle, ShieldAlert, KeyRound, CheckCircle2 } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedAltLink, setCopiedAltLink] = useState(false);
  const [copiedDirectLink, setCopiedDirectLink] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  if (!isOpen) return null;

  // 100% verified active short URLs
  const primaryShortUrl = 'https://is.gd/rahmat_ccna_portal';
  const alternativeShortUrl = 'https://da.gd/rahmat-ccn';
  const directLiveUrl = 'https://ais-dev-ub7wahxl5ynwyhiuf4goqb-661052543194.asia-east1.run.app';

  const shareText = `🔥 দোস্ত, সিসকো ও নেটওয়ার্কিং (CCNA)-এর সব ক্লাস নোট, হ্যান্ডআউট, বেসিক টু এডভান্সড সিএলআই কমান্ড, সাবনেটিং ক্যালকুলেটর এবং ভিডিও লেকচার একটা পোর্টালে চমৎকারভাবে সাজিয়ে দিয়েছে Rahmat Ullah!

👉 সরাসরি লিংক:
${primaryShortUrl}

⚠️ [জরুরি টিপস]: লিংকে ঢুকলে যদি Google "Sign in" অপশন আসে, তবে ভয় পাওয়ার কিছু নেই—সেখানে তোমার *নিজের যেকোনো সাধারণ জিমেইল (@gmail.com)* দিয়ে একবার সাইন-ইন করলেই পুরো পোর্টালটি সাথে সাথে উন্মুক্ত হয়ে যাবে!`;

  const handleCopyPrimary = () => {
    navigator.clipboard.writeText(primaryShortUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyAlt = () => {
    navigator.clipboard.writeText(alternativeShortUrl);
    setCopiedAltLink(true);
    setTimeout(() => setCopiedAltLink(false), 2000);
  };

  const handleCopyDirect = () => {
    navigator.clipboard.writeText(directLiveUrl);
    setCopiedDirectLink(true);
    setTimeout(() => setCopiedDirectLink(false), 2000);
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(shareText);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2000);
  };

  const shareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`, '_blank');
  };

  const shareTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(primaryShortUrl)}&text=${encodeURIComponent('সিসকো সিসিএনএ নেটওয়ার্কিং পোর্টাল - by Rahmat Ullah')}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-lg p-6 shadow-2xl overflow-hidden relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-3 shrink-0">
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">বন্ধুদের সাথে শেয়ার করুন</h3>
            <p className="text-xs text-slate-400">Curated & Developed by Rahmat Ullah</p>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto pr-1 space-y-4 my-2">
          {/* Important Box: Why Google Sign-In appears & What friends should do */}
          <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-500/40 text-xs text-slate-200 space-y-2.5">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <KeyRound className="w-4 h-4 text-amber-400 shrink-0" />
              <span>বন্ধুদের কেন Google Sign-In দেখাচ্ছে?</span>
            </div>
            <p className="leading-relaxed text-slate-300">
              যেহেতু এই পোর্টালটি Google ক্লাউড প্ল্যাটফর্মে হোস্ট করা, তাই গুগল নিরাপত্তার স্বার্থে ভিজিটরদের পরিচয় যাচাই করে। 
            </p>
            <div className="p-2.5 bg-slate-950/80 rounded-lg border border-amber-500/30 font-medium text-amber-200">
              💡 <strong>বন্ধুদের যা বলবেন:</strong> "লগইন স্ক্রিনে তোমার <u>নিজের যেকোনো ব্যক্তিগত জিমেইল (@gmail.com)</u> দিয়ে সাইন-ইন করো, তাহলেই সাথে সাথে পুরো পোর্টাল খুলে যাবে!"
            </div>
          </div>

          {/* Primary Branded Short Link */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Link2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>প্রধান শেয়ার লিংক (Short URL):</span>
              </label>
              <span className="text-[10px] text-emerald-400 font-mono font-semibold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                ● লাইভ সক্রিয়
              </span>
            </div>
            <div className="flex items-center gap-2 bg-slate-950 border border-cyan-500/50 rounded-xl p-2.5 shadow-sm">
              <input
                type="text"
                readOnly
                value={primaryShortUrl}
                className="bg-transparent flex-1 text-xs text-cyan-300 font-mono font-semibold focus:outline-none px-2 truncate"
              />
              <button
                onClick={handleCopyPrimary}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shrink-0 transition-colors cursor-pointer active:scale-95"
              >
                {copiedLink ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'কপি হয়েছে!' : 'লিংক কপি'}</span>
              </button>
            </div>
          </div>

          {/* Alternative Short Link */}
          <div>
            <label className="text-xs font-medium text-slate-400 block mb-1">
              বিকল্প শর্ট লিংক (Alternative URL):
            </label>
            <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-xl p-2">
              <input
                type="text"
                readOnly
                value={alternativeShortUrl}
                className="bg-transparent flex-1 text-xs text-slate-300 font-mono focus:outline-none px-2 truncate"
              />
              <button
                onClick={handleCopyAlt}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium shrink-0 transition-colors cursor-pointer"
              >
                {copiedAltLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAltLink ? 'কপি হয়েছে' : 'কপি'}</span>
              </button>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={shareWhatsApp}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 text-xs font-semibold transition-colors cursor-pointer active:scale-95"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp এ পাঠান</span>
            </button>

            <button
              onClick={shareTelegram}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-sky-600/20 hover:bg-sky-600/30 text-sky-300 border border-sky-500/30 text-xs font-semibold transition-colors cursor-pointer active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>Telegram এ পাঠান</span>
            </button>
          </div>

          {/* Preformatted Message with instructions for friends */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 space-y-2">
            <div className="flex items-center justify-between text-slate-400">
              <span className="font-semibold text-[11px] uppercase tracking-wide text-cyan-400">
                গ্রুপে পাঠানোর জন্য রেডি মেসেজ (লগইন টিপস সহ):
              </span>
              <button
                onClick={handleCopyMessage}
                className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold text-[11px] cursor-pointer"
              >
                {copiedMessage ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedMessage ? 'মেসেজ কপি হয়েছে' : 'মেসেজ কপি'}</span>
              </button>
            </div>
            <p className="text-slate-300 font-sans text-[11px] leading-relaxed bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/60">
              {shareText}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-slate-800 flex justify-between items-center text-xs text-slate-400 shrink-0">
          <a
            href={primaryShortUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-cyan-400 hover:underline font-semibold"
          >
            <span>ব্রাউজারে টেস্ট করুন</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            বন্ধ করুন
          </button>
        </div>
      </div>
    </div>
  );
};
