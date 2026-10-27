import React, { useState, useMemo } from 'react';
import { Calculator, Copy, Check, ArrowRight, Sparkles } from 'lucide-react';

export const SubnetCalculator: React.FC = () => {
  const [ipInput, setIpInput] = useState('192.168.10.55');
  const [cidr, setCidr] = useState(26);
  const [copied, setCopied] = useState(false);

  // Parse IP and calculate subnet properties
  const calculation = useMemo(() => {
    // Validate IP
    const parts = ipInput.trim().split('.').map(p => parseInt(p, 10));
    const isValid = parts.length === 4 && parts.every(p => !isNaN(p) && p >= 0 && p <= 255);

    if (!isValid) {
      return null;
    }

    // Determine Class
    const firstOctet = parts[0];
    let ipClass = 'C';
    let isPrivate = false;

    if (firstOctet >= 1 && firstOctet <= 126) {
      ipClass = 'A';
      if (firstOctet === 10) isPrivate = true;
    } else if (firstOctet >= 128 && firstOctet <= 191) {
      ipClass = 'B';
      if (firstOctet === 172 && parts[1] >= 16 && parts[1] <= 31) isPrivate = true;
    } else if (firstOctet >= 192 && firstOctet <= 223) {
      ipClass = 'C';
      if (firstOctet === 192 && parts[1] === 168) isPrivate = true;
    } else if (firstOctet >= 224 && firstOctet <= 239) {
      ipClass = 'D (Multicast)';
    } else {
      ipClass = 'E (Experimental)';
    }

    // Convert IP to 32-bit number
    const ipInt = ((parts[0] << 24) >>> 0) + (parts[1] << 16) + (parts[2] << 8) + parts[3];

    // Mask Int
    const maskInt = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
    const wildcardInt = ~maskInt >>> 0;

    // Helper int to IP string
    const intToIp = (num: number) => {
      return [
        (num >>> 24) & 255,
        (num >>> 16) & 255,
        (num >>> 8) & 255,
        num & 255
      ].join('.');
    };

    const maskStr = intToIp(maskInt);
    const wildcardStr = intToIp(wildcardInt);

    const netInt = (ipInt & maskInt) >>> 0;
    const bcastInt = (netInt | wildcardInt) >>> 0;

    const netStr = intToIp(netInt);
    const bcastStr = intToIp(bcastInt);

    const totalAddresses = Math.pow(2, 32 - cidr);
    const usableHosts = cidr >= 31 ? 0 : totalAddresses - 2;

    const firstUsable = cidr >= 31 ? 'N/A' : intToIp(netInt + 1);
    const lastUsable = cidr >= 31 ? 'N/A' : intToIp(bcastInt - 1);

    // Active octet & Magic number (Block size)
    const activeOctetIndex = Math.floor((cidr - 1) / 8);
    const maskParts = maskStr.split('.').map(Number);
    const magicNumber = 256 - maskParts[activeOctetIndex];

    // Binary representation
    const ipBinary = parts.map(p => p.toString(2).padStart(8, '0')).join('.');
    const maskBinary = maskParts.map(p => p.toString(2).padStart(8, '0')).join('.');

    return {
      ip: parts.join('.'),
      cidr,
      ipClass,
      isPrivate,
      maskStr,
      wildcardStr,
      netStr,
      bcastStr,
      firstUsable,
      lastUsable,
      usableHosts,
      totalAddresses,
      magicNumber,
      activeOctet: activeOctetIndex + 1,
      ipBinary,
      maskBinary
    };
  }, [ipInput, cidr]);

  const copySummary = () => {
    if (!calculation) return;
    const text = `IP Address: ${calculation.ip}/${calculation.cidr}
Subnet Mask: ${calculation.maskStr}
Wildcard: ${calculation.wildcardStr}
Network ID: ${calculation.netStr}
Broadcast ID: ${calculation.bcastStr}
Usable Host Range: ${calculation.firstUsable} - ${calculation.lastUsable}
Usable Hosts: ${calculation.usableHosts.toLocaleString()}
Block Size / Magic Number: ${calculation.magicNumber}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
            <Calculator className="w-4 h-4" />
            <span>লাইভ সাবনেটিং টুল ও ক্যালকুলেটর</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            IPv4 Subnet Calculator & Block Analysis
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            যেকোনো আইপি ও সিআইডিআর প্রিফিক্স দিন; এক নিমেষেই নেটওয়ার্ক আইডি, ব্রডকাস্ট, ম্যাজিক নম্বর ও ভ্যালিড রেঞ্জ বের করুন।
          </p>
        </div>

        {calculation && (
          <button
            onClick={copySummary}
            className="flex items-center gap-2 self-start sm:self-auto px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-sm font-medium transition-colors border border-slate-700 shrink-0"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'কপি হয়েছে!' : 'সামারি কপি করুন'}</span>
          </button>
        )}
      </div>

      {/* Input Controls */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 mt-6">
        <div className="md:col-span-6 space-y-2">
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
            আইপি এড্রেস (IPv4 Address)
          </label>
          <input
            type="text"
            value={ipInput}
            onChange={(e) => setIpInput(e.target.value)}
            placeholder="e.g. 192.168.1.100"
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono text-base focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
          />
        </div>

        <div className="md:col-span-6 space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              সাবনেট প্রিফিক্স (CIDR) : <span className="text-cyan-400 font-mono text-base">/{cidr}</span>
            </label>
            <span className="text-xs text-slate-400 font-mono">
              {calculation ? calculation.maskStr : ''}
            </span>
          </div>
          <input
            type="range"
            min="8"
            max="30"
            value={cidr}
            onChange={(e) => setCidr(parseInt(e.target.value, 10))}
            className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
          <div className="flex justify-between text-[11px] text-slate-500 font-mono">
            <span>/8 (Class A)</span>
            <span>/16 (Class B)</span>
            <span>/24 (Class C)</span>
            <span>/30 (P2P WAN)</span>
          </div>
        </div>
      </div>

      {/* Quick Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-slate-800/60">
        <span className="text-xs text-slate-400 font-medium">কমন প্রিসেট:</span>
        {[
          { label: '/24 (254 Hosts)', val: 24 },
          { label: '/26 (62 Hosts - 4 Subnets)', val: 26 },
          { label: '/27 (30 Hosts)', val: 27 },
          { label: '/28 (14 Hosts)', val: 28 },
          { label: '/29 (6 Hosts)', val: 29 },
          { label: '/30 (2 Hosts - WAN Link)', val: 30 },
        ].map((preset) => (
          <button
            key={preset.val}
            onClick={() => setCidr(preset.val)}
            className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
              cidr === preset.val
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
                : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
            }`}
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Results View */}
      {calculation ? (
        <div className="mt-8 space-y-6">
          {/* Main KPI Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">নেটওয়ার্ক আইডি (Network ID)</span>
              <p className="text-cyan-400 font-mono text-base sm:text-lg font-bold mt-1">
                {calculation.netStr}
              </p>
              <span className="text-[11px] text-slate-500">সাবনেটের ১ম আনইউজেবল আইপি</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">ব্রডকাস্ট আইডি (Broadcast ID)</span>
              <p className="text-pink-400 font-mono text-base sm:text-lg font-bold mt-1">
                {calculation.bcastStr}
              </p>
              <span className="text-[11px] text-slate-500">সাবনেটের শেষ ব্রডকাস্ট আইপি</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">ব্যবহারযোগ্য হোস্ট (Usable Hosts)</span>
              <p className="text-emerald-400 font-mono text-base sm:text-lg font-bold mt-1">
                {calculation.usableHosts.toLocaleString()} টি
              </p>
              <span className="text-[11px] text-slate-500">2^h - 2 ফর্মুলা অনুযায়ী</span>
            </div>

            <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
              <span className="text-[11px] text-slate-400 uppercase font-semibold">ম্যাজিক নম্বর (Block Size)</span>
              <p className="text-amber-400 font-mono text-base sm:text-lg font-bold mt-1">
                {calculation.magicNumber}
              </p>
              <span className="text-[11px] text-slate-500">২৫৬ - {calculation.maskStr.split('.')[calculation.activeOctet - 1]}</span>
            </div>
          </div>

          {/* Range & Details Table */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="font-semibold text-white">ব্যবহারযোগ্য আইপি রেঞ্জ (Usable IP Range):</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-cyan-300 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg text-sm">
                <span>{calculation.firstUsable}</span>
                <ArrowRight className="w-4 h-4 text-slate-500" />
                <span>{calculation.lastUsable}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-3 border-t border-slate-800/80 text-xs">
              <div className="flex items-center justify-between text-slate-400">
                <span>সাবনেট মাস্ক (Subnet Mask):</span>
                <span className="font-mono text-white font-semibold">{calculation.maskStr}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>ওয়াইল্ডকার্ড মাস্ক (Wildcard Mask):</span>
                <span className="font-mono text-white font-semibold">{calculation.wildcardStr}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>ক্লাস ও প্রকারভেদ (Class):</span>
                <span className="font-mono text-cyan-400 font-semibold">
                  Class {calculation.ipClass} {calculation.isPrivate ? '(প্রাইভেট আইপি)' : '(পাবলিক আইপি)'}
                </span>
              </div>
            </div>

            {/* Binary Visualization */}
            <div className="pt-3 border-t border-slate-800/80 space-y-1.5">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
                বাইনারি গঠন (Binary Octets Visualization)
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px] mb-1">IP Binary (৩২ বিট):</span>
                  <span className="text-slate-200 tracking-wider break-all">{calculation.ipBinary}</span>
                </div>
                <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px] mb-1">Mask Binary (/{calculation.cidr}):</span>
                  <span className="text-cyan-400 tracking-wider break-all">{calculation.maskBinary}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-8 p-6 rounded-xl bg-red-950/20 border border-red-900/50 text-red-300 text-sm text-center">
          অনুগ্রহ করে একটি সঠিক IPv4 এড্রেস দিন (যেমন: 192.168.1.50)
        </div>
      )}
    </div>
  );
};
