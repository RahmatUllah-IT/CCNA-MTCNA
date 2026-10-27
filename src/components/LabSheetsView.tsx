import React, { useState } from 'react';
import { FileText, Download, ExternalLink, Search, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

interface LabSheetItem {
  id: string;
  title: string;
  titleEn: string;
  category: string;
  fileSize: string;
  pdfPath: string;
  description: string;
}

const LAB_SHEETS: LabSheetItem[] = [
  {
    id: 'lab-0',
    title: '০. সিসকো রাউটিং বেসিক ও ইন্টারফেস পরিচিতি',
    titleEn: '0. Cisco Routing Basics',
    category: 'রাউটার ও রাউটিং',
    fileSize: '3.1 MB',
    pdfPath: '/assets/aistudio/0._Cisco_Routing_Basics_78194a63.pdf',
    description: 'রাউটার কি, সিএলআই মোড (User, Privileged, Global), ইন্টারফেসে আইপি সেট এবং পাথ সিলেকশন মেকানিজম।'
  },
  {
    id: 'lab-1',
    title: '১. সিসকো রাউটার DHCP কনফিগারেশন ল্যাব ম্যানুয়াল',
    titleEn: '1. Cisco DHCP Configuration',
    category: 'রাউটার ও রাউটিং',
    fileSize: '2.8 MB',
    pdfPath: '/assets/aistudio/1._Cisco_DHCP_Configuration_7babceb4.pdf',
    description: 'DHCP Pool তৈরি, Network ও Subnet Mask নির্ধারণ, Default Gateway এবং ক্লায়েন্ট পিসিতে আইপি ভেরিফিকেশন।'
  },
  {
    id: 'lab-2',
    title: '২. কম্পিউটার নেটওয়ার্কিং এড্রেসিং ক্লাস মেটেরিয়াল v1.0',
    titleEn: '2. Addressing Class Material v1.0',
    category: 'এড্রেসিং ও সাবনেটিং',
    fileSize: '4.2 MB',
    pdfPath: '/assets/aistudio/2_-_Addressing_v1.0_e8e759f7.pdf',
    description: 'IPv4, IPv6, MAC এড্রেস স্ট্রাকচার, ক্লাস A থেকে E, প্রাইভেট আইপি রেঞ্জ এবং বাইনারি টু ডেসিমাল কনভার্সন।'
  },
  {
    id: 'lab-3',
    title: '৩. সিসকো RIPv2 ডাইনামিক রাউটিং কনফিগারেশন',
    titleEn: '3. Cisco RIP Routing Configuration',
    category: 'রাউটার ও রাউটিং',
    fileSize: '3.5 MB',
    pdfPath: '/assets/aistudio/3._Cisco__RIP_Routing_Configuration_16b3dd84.pdf',
    description: 'ডিস্ট্যান্স ভেক্টর RIPv2 কনফিগারেশন, নো অটো-সামারি রুল, সর্বোচ্চ ১৫ হপ লিমিট এবং রাউটার হ্যান্ডশেক।'
  },
  {
    id: 'lab-4',
    title: '৪. OSPF সিঙ্গেল এরিয়া আর্কিটেকচার ও ৩-নোড কনফিগারেশন',
    titleEn: '4. Cisco OSPF Single Area Configuration',
    category: 'রাউটার ও রাউটিং',
    fileSize: '3.9 MB',
    pdfPath: '/assets/aistudio/4._Cisco__OSPF_Single_Area_Configuration_5d5221dc.pdf',
    description: 'Open Shortest Path First Area 0 ব্যাকবোন, Dijkstra অ্যালগরিদম, ওয়াইল্ডকার্ড মাস্ক এবং নেইবার এডজেসেন্সি।'
  },
  {
    id: 'lab-5',
    title: '৫. সিসকো সুইচে বেসিক VLAN কনফিগারেশন গাইড',
    titleEn: '5. Cisco VLAN Configuration',
    category: 'সুইচিং ও VLAN',
    fileSize: '2.7 MB',
    pdfPath: '/assets/aistudio/5._Cisco__VLAN_Configuration_f455b2f1.pdf',
    description: 'VLAN তৈরি, নাম প্রদান, এক্সেস পোর্ট অ্যাসাইনমেন্ট এবং show vlan brief দিয়ে কনফিগারেশন যাচাই।'
  },
  {
    id: 'lab-6',
    title: '৬. সিসকো ইন্টার-ভিল্যান রাউটিং (Router-on-a-Stick)',
    titleEn: '6. Cisco Inter VLAN Configuration',
    category: 'সুইচিং ও VLAN',
    fileSize: '3.4 MB',
    pdfPath: '/assets/aistudio/6._Cisco__Inter_Vlan_Configuration_3e54d815.pdf',
    description: 'রাউটারের ফিজিক্যাল পোর্টে ভার্চুয়াল সাব-ইন্টারফেস গঠন, 802.1Q এনক্যাপসুলেশন ও ট্রাঙ্ক পোর্ট কনফিগারেশন।'
  },
  {
    id: 'lab-7',
    title: '৭. কম্পিউটার নেটওয়ার্কিং রাউটিং হ্যান্ডবুক v1.0',
    titleEn: '7. Routing Theory Handbook v1.0',
    category: 'রাউটার ও রাউটিং',
    fileSize: '4.5 MB',
    pdfPath: '/assets/aistudio/7._Routing_v1.0_64e037a7.pdf',
    description: 'স্ট্যাটিক বনাম ডাইনামিক আর্কিটেকচার, কস্ট/মেট্রিক, এডমিনিস্ট্রেটিভ ডিস্ট্যান্স এবং রাউটিং লুপ প্রতিরোধ।'
  },
  {
    id: 'lab-8',
    title: '৮. ইন্টার-ভিল্যান মেটেরিয়াল v1.0 (থিওরি ও আর্কিটেকচার)',
    titleEn: '5. Inter-VLAN Material v1.0',
    category: 'সুইচিং ও VLAN',
    fileSize: '2.9 MB',
    pdfPath: '/assets/aistudio/5._Inter-Vlan_v1.0_02c09f60.pdf',
    description: 'লেয়ার ৩ ডিভাইস বা মাল্টিলেয়ার সুইচে ইন্টার-ভিল্যান রাউটিংয়ের প্রয়োজনীয়তা ও ডাটা ফ্লো ডায়াগ্রাম।'
  },
  {
    id: 'lab-9',
    title: '৯. কম্পিউটার নেটওয়ার্কিং VLAN মেটেরিয়াল v1.0',
    titleEn: '9. VLAN Material v1.0',
    category: 'সুইচিং ও VLAN',
    fileSize: '3.8 MB',
    pdfPath: '/assets/aistudio/9._VLAN_v1.0_5f1f55f4.pdf',
    description: 'নরমাল ও এক্সটেন্ডেড VLAN রেঞ্জ, VTP মোড, Native VLAN এবং IEEE 802.1Q ট্রাঙ্ক প্রোটোকল।'
  },
  {
    id: 'lab-10',
    title: '১০. স্ট্যান্ডার্ড এক্সেস কন্ট্রোল লিস্ট (Standard ACL 10)',
    titleEn: '13. Cisco Standard ACL Configuration',
    category: 'সিকিউরিটি ও ACL',
    fileSize: '3.2 MB',
    pdfPath: '/assets/aistudio/13._Cisco__Standard_ACL_Configuration_cf6ffbc1.pdf',
    description: 'সোর্স আইপি ফিল্টারিং, সিকোয়েন্স নম্বর, পারমিট/ডিনাই রুলস এবং ইন্টারফেসে ইনবাউন্ড ট্রাফিক চেকপয়েন্ট।'
  },
  {
    id: 'lab-11',
    title: '১১. এক্সটেন্ডেড এক্সেস কন্ট্রোল লিস্ট (Extended ACL 100)',
    titleEn: '14. Cisco Extended ACL Configuration',
    category: 'সিকিউরিটি ও ACL',
    fileSize: '4.1 MB',
    pdfPath: '/assets/aistudio/14._Cisco__Extended_ACL_Configuration_918f70e5.pdf',
    description: 'সোর্স ও ডেস্টিনেশন আইপি এবং TCP পোর্ট ৮০ (Web) বা নির্দিষ্ট হোস্ট ফিল্টারিংয়ের ভিজ্যুয়াল গাইড।'
  },
  {
    id: 'lab-12',
    title: '১২. সিসকো রাউটার স্ট্যাটিক ন্যাট (Static NAT)',
    titleEn: '15. Cisco Static NAT Configuration',
    category: 'NAT ও ডিভাইস ম্যানেজমেন্ট',
    fileSize: '3.6 MB',
    pdfPath: '/assets/aistudio/15._Cisco__Static_NAT_Configuration_58211be8.pdf',
    description: 'অভ্যন্তরীণ সার্ভারকে ওএসপিএফ ও স্ট্যাটিক ১:১ ম্যাপিংয়ের মাধ্যমে পাবলিক ইন্টারনেটে উন্মুক্ত করা।'
  },
  {
    id: 'lab-13',
    title: '১৩. প্যাট (NAT Overload) ও RIP রাউটিং ল্যাব ম্যানুয়াল',
    titleEn: '17. Cisco PAT Overloaded Configuration',
    category: 'NAT ও ডিভাইস ম্যানেজমেন্ট',
    fileSize: '4.0 MB',
    pdfPath: '/assets/aistudio/17._Cisco__PAT_Overloaded_Configuration_0eaed622.pdf',
    description: 'লোকাল ল্যানের একাধিক পিসিকে একটিমাত্র পাবলিক আইপি দিয়ে ইন্টারনেটে কানেক্ট করার সম্পূর্ণ ধাপ।'
  },
  {
    id: 'lab-14',
    title: '১৪. সিসকো Telnet বনাম SSH সিকিউর ম্যানেজমেন্ট',
    titleEn: '18. Cisco Telnet & SSH Configuration',
    category: 'NAT ও ডিভাইস ম্যানেজমেন্ট',
    fileSize: '3.3 MB',
    pdfPath: '/assets/aistudio/18._Cisco__Telnet___SSH_Configuration_e36a9540.pdf',
    description: 'টেলনেটের নিরাপত্তা দুর্বলতা, RSA ক্রিপ্টোগ্রাফিক কি জেনারেট এবং SSHv2 দিয়ে ডিভাইস লকডাউন।'
  },
  {
    id: 'lab-15',
    title: '১৫. রাউটার পাসওয়ার্ড সিকিউরিটি ও রমমন পাসওয়ার্ড ব্রেক',
    titleEn: 'Router Password Setup & Password Breaking',
    category: 'NAT ও ডিভাইস ম্যানেজমেন্ট',
    fileSize: '3.0 MB',
    pdfPath: '/assets/aistudio/Router_password_setup_and_Passowrd_Breaking_57ce8456.pdf',
    description: 'কনসোল ও এনেবল পাসওয়ার্ড সেট, ভুলে যাওয়া পাসওয়ার্ড 0x2142 দিয়ে রিকভার এবং 0x2102 এ রিস্টোর।'
  },
  {
    id: 'lab-16',
    title: '১৬. সিসিএনএ ক্যাপস্টোন প্রজেক্ট স্পেসিফিকেশন (Batch 2606)',
    titleEn: 'Project - CCNA 2606',
    category: 'সিসিএনএ প্রজেক্ট ও ক্যাপস্টোন',
    fileSize: '2.5 MB',
    pdfPath: '/assets/aistudio/Project_-_CCNA__2606__2c4dafcb.pdf',
    description: 'এন্টারপ্রাইজ এলএএন ডিজাইন: ইন্টার-ভিল্যান রাউটিং, ইথারচ্যানেল, ভিটিপি, পোর্ট সিকিউরিটি এবং মার্কিং রুব্রিক।'
  },
];

interface LabSheetsViewProps {
  onOpenPdf: (pdfPath: string, title: string) => void;
}

export const LabSheetsView: React.FC<LabSheetsViewProps> = ({ onOpenPdf }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredSheets = LAB_SHEETS.filter((sheet) => {
    const matchesSearch = 
      sheet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sheet.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sheet.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCat = selectedCategory === 'all' || sheet.category.includes(selectedCategory);

    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            অফিশিয়াল ক্লাস শিট ও পিডিএফ সংগ্রহশালা
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Rezaul Karim Bhuiyan (Creative IT Institute)-এর তৈরি ১৬টি প্রফেশনাল ল্যাব হ্যান্ডআউট ও প্রেজেন্টেশন স্লাইড।
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="পিডিএফ খুঁজুন..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>
      </div>

      {/* Grid of Lab PDF Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSheets.map((sheet) => (
          <div
            key={sheet.id}
            className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 group"
          >
            <div>
              <div className="flex items-center justify-between gap-2 text-xs text-slate-400 mb-2">
                <span className="text-cyan-400 font-medium">{sheet.category}</span>
                <span className="font-mono text-[11px] text-slate-400">{sheet.fileSize}</span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors leading-snug">
                {sheet.title}
              </h3>
              <span className="text-xs text-slate-400 block mt-0.5 font-mono">
                {sheet.titleEn}
              </span>

              <p className="text-slate-300 text-xs mt-3 leading-relaxed line-clamp-3">
                {sheet.description}
              </p>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
              <button
                onClick={() => onOpenPdf(sheet.pdfPath, sheet.title)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold transition-colors"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>স্লাইড দেখুন</span>
              </button>

              <div className="flex items-center gap-1.5">
                <a
                  href={sheet.pdfPath}
                  download
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="ডাউনলোড করুন"
                >
                  <Download className="w-4 h-4" />
                </a>
                <a
                  href={sheet.pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  title="নতুন ট্যাবে ওপেন করুন"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
