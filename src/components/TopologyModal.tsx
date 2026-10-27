import React, { useState } from 'react';
import { X, Network, Layers, ArrowRight, ShieldCheck, CheckCircle } from 'lucide-react';

interface TopologyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TopologyModal: React.FC<TopologyModalProps> = ({ isOpen, onClose }) => {
  const [selectedTopo, setSelectedTopo] = useState<'ospf' | 'roas' | 'pat'>('ospf');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div 
        className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white">
                ইন্টারেক্টিভ নেটওয়ার্ক টপোলজি ডায়াগ্রাম
              </h3>
              <p className="text-xs text-slate-400">
                ল্যাবের আর্কিটেকচার ও প্যাকেট ট্রাভেল পাথের ভিজ্যুয়াল মডেল
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab selection */}
        <div className="flex items-center gap-2 p-3 bg-slate-950 border-b border-slate-800/80 overflow-x-auto shrink-0">
          {[
            { id: 'ospf', label: 'OSPF মাল্টি এরিয়া টপোলজি' },
            { id: 'roas', label: 'Router-on-a-Stick (Inter-VLAN)' },
            { id: 'pat', label: 'PAT (NAT Overload) আর্কিটেকচার' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTopo(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedTopo === tab.id
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Body content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {selectedTopo === 'ospf' && (
            <div className="space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 text-center">
                <svg viewBox="0 0 600 320" className="w-full max-h-[300px] mx-auto">
                  {/* Central Backbone Cloud/Circle */}
                  <circle cx="300" cy="160" r="65" fill="#0f172a" stroke="#06b6d4" strokeWidth="2.5" strokeDasharray="4 4" />
                  <text x="300" y="150" textAnchor="middle" fill="#38bdf8" fontSize="13" fontWeight="bold">Router 4</text>
                  <text x="300" y="170" textAnchor="middle" fill="#94a3b8" fontSize="10">Backbone (Area 0)</text>
                  <text x="300" y="185" textAnchor="middle" fill="#64748b" fontSize="9">RID: 4.4.4.4</text>

                  {/* Area 0 Router R1 */}
                  <line x1="240" y1="140" x2="120" y2="80" stroke="#0ea5e9" strokeWidth="2" />
                  <rect x="60" y="50" width="110" height="60" rx="8" fill="#1e293b" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="115" y="75" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">Router 1</text>
                  <text x="115" y="93" textAnchor="middle" fill="#38bdf8" fontSize="10">Area 0 (192.168.1.0)</text>

                  {/* Area 1 Router R2 */}
                  <line x1="360" y1="140" x2="480" y2="80" stroke="#10b981" strokeWidth="2" />
                  <rect x="430" y="50" width="110" height="60" rx="8" fill="#1e293b" stroke="#10b981" strokeWidth="1.5" />
                  <text x="485" y="75" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">Router 2</text>
                  <text x="485" y="93" textAnchor="middle" fill="#34d399" fontSize="10">Area 1 (192.168.3.0)</text>

                  {/* Area 2 Router R3 */}
                  <line x1="300" y1="225" x2="300" y2="255" stroke="#f59e0b" strokeWidth="2" />
                  <rect x="245" y="250" width="110" height="60" rx="8" fill="#1e293b" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="300" y="275" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">Router 3</text>
                  <text x="300" y="293" textAnchor="middle" fill="#fbbf24" fontSize="10">Area 2 (192.168.2.0)</text>
                </svg>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  <span className="text-cyan-400 font-bold block mb-1">Area 0 (Backbone Core)</span>
                  <p className="text-slate-400">Router 1 এবং Router 4 এর Gig0/0 ইন্টারফেসের সংযোগ। 10.10.10.8/30 সাবনেট।</p>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  <span className="text-emerald-400 font-bold block mb-1">Area 1 (Branch 1)</span>
                  <p className="text-slate-400">Router 2 এবং Router 4 এর Gig0/1 ইন্টারফেসের সংযোগ। 10.10.10.4/30 সাবনেট।</p>
                </div>
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  <span className="text-amber-400 font-bold block mb-1">Area 2 (Branch 2)</span>
                  <p className="text-slate-400">Router 3 এবং Router 4 এর Gig0/2 ইন্টারফেসের সংযোগ। 10.10.10.0/30 সাবনেট।</p>
                </div>
              </div>
            </div>
          )}

          {selectedTopo === 'roas' && (
            <div className="space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 text-center">
                <svg viewBox="0 0 600 280" className="w-full max-h-[260px] mx-auto">
                  {/* Router */}
                  <rect x="240" y="20" width="120" height="50" rx="8" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
                  <text x="300" y="45" textAnchor="middle" fill="#fff" fontSize="12" fontWeight="bold">Core Router</text>
                  <text x="300" y="60" textAnchor="middle" fill="#38bdf8" fontSize="9">g0/0.10 & g0/0.20</text>

                  {/* Trunk Line */}
                  <line x1="300" y1="70" x2="300" y2="130" stroke="#f43f5e" strokeWidth="3" strokeDasharray="3 3" />
                  <text x="365" y="105" textAnchor="middle" fill="#fb7185" fontSize="10">802.1Q Trunk Link</text>

                  {/* Switch */}
                  <rect x="230" y="130" width="140" height="45" rx="6" fill="#1e293b" stroke="#94a3b8" strokeWidth="1.5" />
                  <text x="300" y="155" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="bold">Layer 2 Switch</text>

                  {/* VLAN 10 Branch */}
                  <line x1="260" y1="175" x2="150" y2="220" stroke="#06b6d4" strokeWidth="2" />
                  <rect x="80" y="210" width="140" height="55" rx="6" fill="#0f172a" stroke="#06b6d4" strokeWidth="1.5" />
                  <text x="150" y="233" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">VLAN 10 (HR Dept)</text>
                  <text x="150" y="250" textAnchor="middle" fill="#94a3b8" fontSize="9">192.168.10.0/24</text>

                  {/* VLAN 20 Branch */}
                  <line x1="340" y1="175" x2="450" y2="220" stroke="#10b981" strokeWidth="2" />
                  <rect x="380" y="210" width="140" height="55" rx="6" fill="#0f172a" stroke="#10b981" strokeWidth="1.5" />
                  <text x="450" y="233" textAnchor="middle" fill="#34d399" fontSize="11" fontWeight="bold">VLAN 20 (IT Dept)</text>
                  <text x="450" y="250" textAnchor="middle" fill="#94a3b8" fontSize="9">192.168.20.0/24</text>
                </svg>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 space-y-1.5">
                <span className="font-semibold text-white block">কীভাবে কাজ করে?</span>
                <p>১. পিসি যখন অন্য VLAN এ বার্তা পাঠায়, সুইচ ফ্রেমটিতে 802.1Q ট্যাগ লাগিয়ে ট্রাঙ্ক ক্যাবল দিয়ে রাউটারে পাঠায়।</p>
                <p>২. রাউটার ট্যাগ দেখে স্ব-স্ব সাব-ইন্টারফেসে গ্রহণ করে, রাউটিং করে অপর সাব-ইন্টারফেসে পাঠিয়ে দেয়।</p>
              </div>
            </div>
          )}

          {selectedTopo === 'pat' && (
            <div className="space-y-4">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 text-center">
                <svg viewBox="0 0 600 240" className="w-full max-h-[240px] mx-auto">
                  {/* Private LAN */}
                  <rect x="40" y="50" width="150" height="140" rx="10" fill="#0f172a" stroke="#334155" />
                  <text x="115" y="75" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Private LAN (Inside)</text>
                  <text x="115" y="110" textAnchor="middle" fill="#94a3b8" fontSize="10">PC1: 192.168.1.10:4921</text>
                  <text x="115" y="140" textAnchor="middle" fill="#94a3b8" fontSize="10">PC2: 192.168.1.20:5012</text>
                  <text x="115" y="170" textAnchor="middle" fill="#94a3b8" fontSize="10">PC3: 192.168.1.30:6144</text>

                  {/* Flow Arrow */}
                  <line x1="190" y1="120" x2="250" y2="120" stroke="#06b6d4" strokeWidth="2" markerEnd="url(#arrow)" />

                  {/* NAT Gateway */}
                  <rect x="250" y="80" width="120" height="80" rx="8" fill="#1e293b" stroke="#0ea5e9" strokeWidth="2" />
                  <text x="310" y="110" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">NAT Router</text>
                  <text x="310" y="130" textAnchor="middle" fill="#f59e0b" fontSize="9">PAT Translation</text>
                  <text x="310" y="145" textAnchor="middle" fill="#38bdf8" fontSize="9">Public: 203.0.113.5</text>

                  {/* Flow Arrow */}
                  <line x1="370" y1="120" x2="430" y2="120" stroke="#10b981" strokeWidth="2" />

                  {/* Internet / Cloud */}
                  <ellipse cx="490" cy="120" rx="60" ry="40" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
                  <text x="490" y="118" textAnchor="middle" fill="#34d399" fontSize="12" fontWeight="bold">Internet</text>
                  <text x="490" y="135" textAnchor="middle" fill="#94a3b8" fontSize="9">Web / DNS / Mail</text>
                </svg>
              </div>

              <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300">
                <span className="font-semibold text-emerald-400 block mb-1">প্যাট ওভারলোডের ম্যাজিক:</span>
                <p>সব লোকাল ডিভাইসের ট্রাফিক রাউটারটির একটিমাত্র পাবলিক আইপি (203.0.113.5)-তে পরিবর্তিত হয় এবং প্রতিটি কানেকশনকে আলাদা করতে অনন্য পোর্ট নম্বর (যেমন: 203.0.113.5:1025) অ্যাসাইন করা হয়।</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
