export interface NetworkingTopic {
  id: string;
  moduleId: string;
  moduleName: string;
  moduleNameEn: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  category: 'addressing' | 'switching' | 'routing' | 'security' | 'administration' | 'project';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  mediumUrl?: string;
  facebookVideoUrl?: string;
  pdfPath?: string;
  pdfName?: string;
  cliCommands?: {
    title: string;
    description: string;
    code: string;
  }[];
  keyConcepts: string[];
  examTips?: string;
  tags: string[];
}

export interface ModuleCategory {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  iconName: string;
  badgeCount: number;
}

export const MODULE_CATEGORIES: ModuleCategory[] = [
  {
    id: 'all',
    name: 'সকল বিষয়বস্তু',
    nameEn: 'All Topics',
    description: 'সম্পূর্ণ নেটওয়ার্কিং ডেটাবেস ও ল্যাব গাইড',
    iconName: 'Layers',
    badgeCount: 18,
  },
  {
    id: 'addressing',
    name: '১. আইপি এড্রেসিং ও সাবনেটিং',
    nameEn: 'IP Addressing & Subnetting',
    description: 'IPv4, IPv6, MAC, ক্লাস A/B/C, সাবনেট মাস্ক ও ম্যাজিক নম্বর',
    iconName: 'Binary',
    badgeCount: 5,
  },
  {
    id: 'switching',
    name: '২. সুইচিং, VLAN ও VTP',
    nameEn: 'Switching, VLAN & VTP',
    description: 'সুইচ আর্কিটেকচার, VLAN ক্রিয়েশন, ট্রাঙ্ক, VTP ও EtherChannel',
    iconName: 'Server',
    badgeCount: 4,
  },
  {
    id: 'routing',
    name: '৩. রাউটার, DHCP ও রাউটিং',
    nameEn: 'Router, DHCP & Routing',
    description: 'রাউটার মোড, DHCP সার্ভার, স্ট্যাটিক, RIPv2 ও OSPF (সিঙ্গেল ও মাল্টি এরিয়া)',
    iconName: 'Network',
    badgeCount: 5,
  },
  {
    id: 'security',
    name: '৪. সিকিউরিটি ও ACL',
    nameEn: 'Security & Access Control',
    description: 'স্ট্যান্ডার্ড ও এক্সটেন্ডেড ACL ফিল্টারিং এবং পোর্ট সিকিউরিটি',
    iconName: 'ShieldCheck',
    badgeCount: 2,
  },
  {
    id: 'administration',
    name: '৫. NAT ও ডিভাইস ম্যানেজমেন্ট',
    nameEn: 'NAT & Device Administration',
    description: 'স্ট্যাটিক NAT, PAT ওভারলোড, Telnet/SSH এবং রমমন পাসওয়ার্ড রিকভারি',
    iconName: 'KeyRound',
    badgeCount: 3,
  },
  {
    id: 'project',
    name: '৬. সিসিএনএ প্রজেক্ট ও ক্যাপস্টোন',
    nameEn: 'CCNA Capstone Project',
    description: 'এন্টারপ্রাইজ এলএএন ডিজাইন, ল্যাব টপোলজি ও কনফিগারেশন নির্দেশিকা',
    iconName: 'FolderKanban',
    badgeCount: 1,
  },
];

export const NETWORKING_TOPICS: NetworkingTopic[] = [
  {
    id: 'ip-addressing-fundamentals',
    moduleId: 'addressing',
    moduleName: 'আইপি এড্রেসিং ও সাবনেটিং',
    moduleNameEn: 'IP Addressing & Subnetting',
    title: 'আইপি এড্রেসিং পূর্ণাঙ্গ ধারণা (IPv4, IPv6 & MAC)',
    titleEn: 'IP Addressing Complete Fundamentals',
    summary: 'কম্পিউটার নেটওয়ার্কের প্রাণ হলো আইপি এড্রেস। IPv4 (৩২ বিট), IPv6 (১২৮ বিট) এবং ফিজিক্যাল MAC এড্রেস (৪৮ বিট)-এর গঠন ও ক্লাসিফিকেশন বিস্তারিত জানুন।',
    summaryEn: 'Core addressing principles including 32-bit IPv4 octets, 128-bit IPv6 architecture, 48-bit MAC addresses, network vs host identification, and decimal-to-binary translation.',
    category: 'addressing',
    difficulty: 'Beginner',
    mediumUrl: 'https://medium.com/@rezaulmishal03/what-is-networking-types-of-networking-6416ad5c26c3',
    pdfPath: '/assets/aistudio/2_-_Addressing_v1.0_e8e759f7.pdf',
    pdfName: '2 - Addressing v1.0.pdf',
    keyConcepts: [
      'IPv4 হলো ৩২ বিটের লজিক্যাল এড্রেস, ৪টি অকটেট (Octet) ডট (.) দিয়ে পৃথক থাকে',
      'প্রতিটি অকটেটে ৮টি করে বিট থাকে (০ থেকে ২৫৫ পর্যন্ত মান)',
      'Network ID নির্দেশ করে নেটওয়ার্ক এলাকা এবং Host ID নির্দেশ করে নির্দিষ্ট ডিভাইস',
      'MAC Address হলো ৪৮ বিটের হার্ডওয়্যার/ফিজিক্যাল এড্রেস (Layer 2)',
      'প্রাইভেট আইপি রেঞ্জ: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16',
    ],
    examTips: 'ক্লাস A (1-126), ক্লাস B (128-191), ক্লাস C (192-223)। 127.0.0.0/8 লুপব্যাক টেস্টিংয়ের জন্য সংরক্ষিত।',
    tags: ['Addressing', 'IPv4', 'IPv6', 'MAC Address', 'Private IP', 'Network ID', 'Host ID']
  },
  {
    id: 'subnet-mask-concept',
    moduleId: 'addressing',
    moduleName: 'আইপি এড্রেসিং ও সাবনেটিং',
    moduleNameEn: 'IP Addressing & Subnetting',
    title: 'সাবনেট মাস্ক ও সিআইডিআর (CIDR Slash Notation)',
    titleEn: 'Subnet Mask & CIDR Slash Notation',
    summary: 'সাবনেট মাস্ক কেন প্রয়োজন? কিভাবে সাবনেট মাস্ক দিয়ে একটি আইপি এড্রেসের নেটওয়ার্ক অংশ ও হোস্ট অংশ পৃথক করা হয় এবং স্ল্যাশ নোটেশন (/২৪, /২৬ ইত্যাদি) হিসাব করা হয়।',
    summaryEn: 'Understand default and custom subnet masks, bitmask logic (AND operation), CIDR prefix representations, and how routers distinguish network vs host boundaries.',
    category: 'addressing',
    difficulty: 'Beginner',
    mediumUrl: 'https://medium.com/@rezaulmishal03/what-is-subnet-mask-57835487e797',
    pdfPath: '/assets/aistudio/2_-_Addressing_v1.0_e8e759f7.pdf',
    pdfName: '2 - Addressing v1.0.pdf',
    keyConcepts: [
      'সাবনেট মাস্কের বাইনারি 1 নির্দেশ করে নেটওয়ার্ক বিট এবং 0 নির্দেশ করে হোস্ট বিট',
      'ডিফল্ট মাস্ক: Class A = 255.0.0.0 (/8), Class B = 255.255.0.0 (/16), Class C = 255.255.255.0 (/24)',
      'CIDR (Classless Inter-Domain Routing) স্ল্যাশ নোটেশনে মোট নেটওয়ার্ক বিটের সংখ্যা প্রকাশ করে (যেমন /24 মানে 24 টি 1)',
      'মাস্ক ছাড়া রাউটার বুঝতে পারে না একই আইপির কোন অংশ নেটওয়ার্ক আর কোন অংশ হোস্ট',
    ],
    tags: ['Subnet Mask', 'CIDR', 'Slash Notation', 'Classful', 'Classless', 'Binary AND']
  },
  {
    id: 'subnetting-class-c',
    moduleId: 'addressing',
    moduleName: 'আইপি এড্রেসিং ও সাবনেটিং',
    moduleNameEn: 'IP Addressing & Subnetting',
    title: 'সাবনেটিং পরিচিতি ও ক্লাস সি (Class C Subnetting)',
    titleEn: 'Introduction to Subnetting & Class C',
    summary: 'একটি বড় নেটওয়ার্ককে ছোট ছোট সাব-নেটওয়ার্কে বিভক্ত করার কলাকৌশল। ধার নেওয়া বিট (2^n), ভ্যালিড হোস্ট (2^h - 2), ম্যাজিক নম্বর বা ব্লক সাইজ (256 - Mask) বের করার সহজ ফর্মুলা।',
    summaryEn: 'Comprehensive guide to FLSM/VLSM Class C subnetting. Calculation formulas for borrowed bits 2^n, usable hosts (2^h - 2), block size (256 - Subnet Mask), and broadcast ranges.',
    category: 'addressing',
    difficulty: 'Intermediate',
    mediumUrl: 'https://medium.com/@rezaulmishal03/what-is-subnetting-সাবনেটিং-কি-aa2188fce598',
    pdfPath: '/assets/aistudio/2_-_Addressing_v1.0_e8e759f7.pdf',
    pdfName: '2 - Addressing v1.0.pdf',
    keyConcepts: [
      'সাবনেটিং এর প্রধান উদ্দেশ্য: আইপি অপচয় রোধ করা ও ব্রডকাস্ট ডোমেইন ছোট করে নেটওয়ার্কের ট্রাফিক কমানো',
      'ম্যাজিক নম্বর (Magic Number) = ২৫৬ - শেষ পরিবর্তনশীল অকটেটের সাবনেট মাস্ক',
      'প্রতিটি সাবনেটের প্রথম আইপি হলো Network Address এবং শেষ আইপি হলো Broadcast Address',
      'হোস্ট হিসাব করার সময় সবসময় ২টি বাদ দিতে হয়: 2^h - 2 (১টি নেটওয়ার্ক আইডি ও ১টি ব্রডকাস্ট আইডির জন্য)',
      '/26 মাস্ক 255.255.255.192 -> ম্যাজিক নম্বর 256 - 192 = 64 (ব্লক: 0, 64, 128, 192)',
    ],
    tags: ['Subnetting', 'Class C', 'Magic Number', 'Block Size', 'Usable Hosts', 'Broadcast IP']
  },
  {
    id: 'subnetting-class-b',
    moduleId: 'addressing',
    moduleName: 'আইপি এড্রেসিং ও সাবনেটিং',
    moduleNameEn: 'IP Addressing & Subnetting',
    title: 'ক্লাস বি সাবনেটিং (Class B Subnetting)',
    titleEn: 'Class B Subnetting Deep Dive',
    summary: 'ক্লাস B নেটওয়ার্কে ১৬টি ডিফল্ট নেটওয়ার্ক বিট থাকে। /১৭ থেকে /২৪ এর বেশি সাবনেটিং করার সময় ৩য় ও ৪র্থ অকটেটে কিভাবে মান বৃদ্ধি পায় ও রেঞ্জ তৈরি হয়।',
    summaryEn: 'Deep dive into Class B subnetting across the 3rd and 4th octets (/17 to /30), calculating subnets, host capacity per segment, and boundary tracking.',
    category: 'addressing',
    difficulty: 'Intermediate',
    mediumUrl: 'https://medium.com/@rezaulmishal03/subnetting-class-b-4165935c7721',
    pdfPath: '/assets/aistudio/2_-_Addressing_v1.0_e8e759f7.pdf',
    pdfName: '2 - Addressing v1.0.pdf',
    keyConcepts: [
      'ক্লাস B ডিফল্ট মাস্ক 255.255.0.0 (/16)',
      'যখন বিট ৩য় অকটেট থেকে ধার নেওয়া হয় (/17 থেকে /23), তখন ম্যাজিক নম্বর ৩য় অকটেটে যোগ হয়',
      'উদাহরণ: /19 এর মাস্ক 255.255.224.0 -> ম্যাজিক নম্বর 32 (0.0, 32.0, 64.0, 96.0...)',
      'প্রতিটি /19 সাবনেটে ৮১৯০ জন হোস্ট থাকতে পারে (2^13 - 2)',
    ],
    tags: ['Subnetting', 'Class B', '3rd Octet', 'CIDR /17-/24', 'Enterprise IP Planning']
  },
  {
    id: 'subnetting-class-a',
    moduleId: 'addressing',
    moduleName: 'আইপি এড্রেসিং ও সাবনেটিং',
    moduleNameEn: 'IP Addressing & Subnetting',
    title: 'ক্লাস এ সাবনেটিং (Class A Subnetting)',
    titleEn: 'Class A Subnetting Architecture',
    summary: 'ক্লাস A এর বিশাল নেটওয়ার্ক (১ কোটি ৬৭ লাখ হোস্ট) কে কিভাবে প্রয়োজন অনুযায়ী ২য়, ৩য় ও ৪র্থ অকটেটে সাবনেটিং করে সুরক্ষিত ও অপ্টিমাইজড নেটওয়ার্ক ডিজাইন করা যায়।',
    summaryEn: 'Large-scale addressing for Class A networks (/8 default), handling octet transitions, maximizing address conservation for ISPs and enterprise backbones.',
    category: 'addressing',
    difficulty: 'Advanced',
    mediumUrl: 'https://medium.com/@rezaulmishal03/subnetting-class-a-f49ff30d1735',
    pdfPath: '/assets/aistudio/2_-_Addressing_v1.0_e8e759f7.pdf',
    pdfName: '2 - Addressing v1.0.pdf',
    keyConcepts: [
      'ক্লাস A ডিফল্ট মাস্ক 255.0.0.0 (/8)',
      '২য় অকটেটে বিট ধার নিলে মাস্ক হয় /9 থেকে /16 পর্যন্ত (যেমন: 10.0.0.0)',
      'লার্জ এন্টারপ্রাইজে 10.0.0.0/8 প্রাইভেট আইপিকে ব্রাঞ্চ বা ডেটাসেন্টার অনুযায়ী সাবনেট করা হয়',
    ],
    tags: ['Subnetting', 'Class A', 'ISP Addressing', 'Multi-Octet Borrowing']
  },
  {
    id: 'network-switch-fundamentals',
    moduleId: 'switching',
    moduleName: 'সুইচিং, VLAN ও VTP',
    moduleNameEn: 'Switching, VLAN & VTP',
    title: 'সুইচ আর্কিটেকচার ও ম্যাক এড্রেস লার্নিং',
    titleEn: 'Network Switch Architecture & MAC Table',
    summary: 'সুইচ কী এবং কেন হাবের পরিবর্তে সুইচ ব্যবহার করা হয়? লেয়ার ২ সুইচের ফ্রেম ফরোয়ার্ডিং, ম্যাক টেবিল লার্নিং প্রসেস এবং ব্রডকাস্ট ডোমেইন বনাম কলিশন ডোমেইন।',
    summaryEn: 'How switches function at Layer 2 (Data Link layer). Dynamic MAC address table building, frame flooding, unicast/multicast/broadcast forwarding, and collision domain isolation.',
    category: 'switching',
    difficulty: 'Beginner',
    mediumUrl: 'https://medium.com/@rezaulmishal03/what-is-networking-switch-7d4016c2b8d5',
    pdfPath: '/assets/aistudio/5._Cisco__VLAN_Configuration_f455b2f1.pdf',
    pdfName: '5. Cisco VLAN Configuration.pdf',
    cliCommands: [
      {
        title: 'সুইচের ম্যাক এড্রেস টেবিল পর্যবেক্ষণ',
        description: 'সুইচ কোন পোর্টে কোন ম্যাক এড্রেস শিখেছে তা দেখার কমান্ড:',
        code: `Switch# show mac address-table
Switch# show mac address-table dynamic
Switch# clear mac address-table dynamic`
      }
    ],
    keyConcepts: [
      'সুইচের প্রতিটি পোর্ট একটি স্বতন্ত্র কলিশন ডোমেইন (Collision Domain)',
      'ডিফল্টভাবে একটি সুইচের সব পোর্ট একই ব্রডকাস্ট ডোমেইনে (Broadcast Domain) থাকে',
      'ইনকামিং ফ্রেমের Source MAC দেখে সুইচ তার CAM/MAC টেবিলে পোর্ট এন্ট্রি যোগ করে',
      'Destination MAC টেবিলে না থাকলে সুইচ ওই পোর্ট বাদে বাকি সব পোর্টে ফ্রেমটি ফ্লাড (Flood) করে',
    ],
    tags: ['Switch', 'Layer 2', 'MAC Address Table', 'Collision Domain', 'CAM Table', 'Flooding']
  },
  {
    id: 'vlan-configuration',
    moduleId: 'switching',
    moduleName: 'সুইচিং, VLAN ও VTP',
    moduleNameEn: 'Switching, VLAN & VTP',
    title: 'VLAN কনফিগারেশন, এক্সেস পোর্ট ও ট্রাঙ্কিং (802.1Q)',
    titleEn: 'VLAN Setup, Access Ports & 802.1Q Trunking',
    summary: 'একটি ফিজিক্যাল সুইচকে একাধিক লজিক্যাল সুইচে ভাগ করার টেকনোলজি। বিভিন্ন ডিপার্টমেন্টের ট্রাফিক আলাদা করা, ব্রডকাস্ট নিয়ন্ত্রণ ও সিকিউরিটি জোরদার করা।',
    summaryEn: 'VLAN creation, naming, assigning access ports, configuring 802.1Q trunk links between switches, native VLANs, and traffic isolation.',
    category: 'switching',
    difficulty: 'Intermediate',
    mediumUrl: 'https://medium.com/@rezaulmishal03/what-is-networking-types-of-networking-6416ad5c26c3',
    facebookVideoUrl: 'https://www.facebook.com/share/v/1MfCzihNJo/?',
    pdfPath: '/assets/aistudio/5._Cisco__VLAN_Configuration_f455b2f1.pdf',
    pdfName: '5. Cisco VLAN Configuration.pdf',
    cliCommands: [
      {
        title: 'VLAN তৈরি ও এক্সেস পোর্ট অ্যাসাইনমেন্ট',
        description: 'সুইচে নতুন VLAN তৈরি করা এবং নির্দিষ্ট পোর্টে VLAN সেট করা:',
        code: `Switch# configure terminal
Switch(config)# vlan 10
Switch(config-vlan)# name HR
Switch(config-vlan)# exit

Switch(config)# vlan 20
Switch(config-vlan)# name IT_Support
Switch(config-vlan)# exit

! Assign Access Port to VLAN
Switch(config)# interface FastEthernet0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 10
Switch(config-if)# exit`
      },
      {
        title: 'ট্রাঙ্ক পোর্ট কনফিগারেশন (Trunk Port 802.1Q)',
        description: 'দুটি সুইচের মধ্যবর্তী লিংকে সব VLAN ট্রাফিক পাঠানোর জন্য ট্রাঙ্ক তৈরি:',
        code: `Switch(config)# interface GigabitEthernet0/1
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20
Switch(config-if)# exit
Switch# show interfaces trunk
Switch# show vlan brief`
      }
    ],
    keyConcepts: [
      'VLAN হলো Layer 2 ব্রডকাস্ট ডোমেইন পৃথককারী প্রযুক্তি',
      'এক্সেস পোর্ট (Access Port): শুধুমাত্র একটি নির্দিষ্ট VLAN এর ট্রাফিক বহন করে (পিসি বা প্রিন্টারের সাথে যুক্ত)',
      'ট্রাঙ্ক পোর্ট (Trunk Port): ট্যাগিং (802.1Q Tag) যোগ করে একাধিক VLAN এর ফ্রেম আদান-প্রদান করে',
      'ডিফল্ট Native VLAN হলো VLAN 1 (যাতে কোনো ট্যাগ যুক্ত হয় না)',
    ],
    tags: ['VLAN', 'Trunking', '802.1Q', 'Access Port', 'Native VLAN', 'Cisco Switch']
  },
  {
    id: 'inter-vlan-routing',
    moduleId: 'switching',
    moduleName: 'সুইচিং, VLAN ও VTP',
    moduleNameEn: 'Switching, VLAN & VTP',
    title: 'ইন্টার-ভিল্যান রাউটিং (Router-on-a-Stick & SVI)',
    titleEn: 'Inter-VLAN Routing (ROAS & Layer 3 Switch)',
    summary: 'দুটি ভিন্ন VLAN এর মধ্যে সরাসরি যোগাযোগ সম্ভব নয়। ইন্টার-ভিল্যান রাউটিংয়ের মাধ্যমে (রাউটার সাব-ইন্টারফেস ডট ওয়ান কিউ অথবা লেয়ার ৩ সুইচ) তাদের মধ্যে যোগাযোগ করানো হয়।',
    summaryEn: 'Detailed guide to Inter-VLAN routing using Router-on-a-stick (subinterfaces with 802.1Q encapsulation) and Switch Virtual Interfaces (SVI) on Layer 3 switches.',
    category: 'switching',
    difficulty: 'Intermediate',
    facebookVideoUrl: 'https://www.facebook.com/share/v/1Mo1hoskYm/?',
    pdfPath: '/assets/aistudio/6._Cisco__Inter_Vlan_Configuration_3e54d815.pdf',
    pdfName: '6. Cisco Inter Vlan Configuration.pdf',
    cliCommands: [
      {
        title: 'Router-on-a-Stick সাব-ইন্টারফেস কনফিগারেশন',
        description: 'রাউটারের একক গিগাবিট পোর্টে একাধিক সাব-ইন্টারফেস বানিয়ে ইন্টার-ভিল্যান রাউটিং:',
        code: `Router# configure terminal
! Physical interface bring up without IP
Router(config)# interface GigabitEthernet0/0
Router(config-if)# no shutdown
Router(config-if)# exit

! Subinterface for VLAN 10
Router(config)# interface GigabitEthernet0/0.10
Router(config-subif)# encapsulation dot1Q 10
Router(config-subif)# ip address 192.168.10.1 255.255.255.0
Router(config-subif)# exit

! Subinterface for VLAN 20
Router(config)# interface GigabitEthernet0/0.20
Router(config-subif)# encapsulation dot1Q 20
Router(config-subif)# ip address 192.168.20.1 255.255.255.0
Router(config-subif)# exit`
      },
      {
        title: 'সুইচ সাইডে ট্রাঙ্ক তৈরি',
        description: 'রাউটারের সাথে সংযুক্ত সুইচের পোর্টটিকে ট্রাঙ্ক মোডে রাখা আবশ্যক:',
        code: `Switch(config)# interface GigabitEthernet0/1
Switch(config-if)# switchport mode trunk
Switch(config-if)# no shutdown`
      }
    ],
    keyConcepts: [
      'Router-on-a-stick আর্কিটেকচারে রাউটারের ফিজিক্যাল ইন্টারফেসে কোনো আইপি দেওয়া হয় না',
      'সাব-ইন্টারফেস যেমন g0/0.10 এ encapsulation dot1Q 10 কমান্ড দিয়ে VLAN ট্যাগ অ্যাসাইন করা হয়',
      'ওই সাব-ইন্টারফেসের আইপি এড্রেসটিই স্ব-স্ব VLAN এর জন্য ডিফল্ট গেটওয়ে হিসেবে কাজ করে',
      'ভিডিও পার্ট ২ লিংক: https://www.facebook.com/share/v/1C1oAzK8q3/?',
    ],
    tags: ['Inter-VLAN', 'Router-on-a-stick', 'dot1Q', 'Subinterfaces', 'Gateway', 'Trunk']
  },
  {
    id: 'vtp-etherchannel-portsec',
    moduleId: 'switching',
    moduleName: 'সুইচিং, VLAN ও VTP',
    moduleNameEn: 'Switching, VLAN & VTP',
    title: 'VTP, EtherChannel ও সুইচ পোর্ট সিকিউরিটি',
    titleEn: 'VTP, EtherChannel & Switch Port Security',
    summary: 'এন্টারপ্রাইজ সুইচ ম্যানেজমেন্ট: VTP সার্ভার/ক্লায়েন্ট মোড, পোর্ট ব্যান্ডউইথ দ্বিগুণ বা চারগুণ করার জন্য EtherChannel (LACP/PAgP), এবং অননুমোদিত ডিভাইস রোধে Port Security।',
    summaryEn: 'VLAN Trunking Protocol (VTP) synchronization, link aggregation with EtherChannel (PAgP/LACP), and MAC address restriction via Port Security (Protect, Restrict, Shutdown).',
    category: 'switching',
    difficulty: 'Advanced',
    facebookVideoUrl: 'https://www.facebook.com/share/v/1D4HGoGJYR/?',
    pdfPath: '/assets/aistudio/9._VLAN_v1.0_5f1f55f4.pdf',
    pdfName: '9. VLAN v1.0.pdf',
    cliCommands: [
      {
        title: 'EtherChannel (LACP) কনফিগারেশন',
        description: 'দুটি ক্যাবলকে একত্র করে ব্যান্ডউইথ দ্বিগুণ ও রিডান্ড্যান্সি বৃদ্ধি:',
        code: `Switch# configure terminal
Switch(config)# interface range FastEthernet0/1 - 2
Switch(config-if-range)# channel-group 1 mode active
Switch(config-if-range)# exit
Switch(config)# interface port-channel 1
Switch(config-if)# switchport mode trunk
Switch# show etherchannel summary`
      },
      {
        title: 'Port Security কনফিগারেশন (MAC বাইন্ডিং)',
        description: 'নির্দিষ্ট ম্যাক এড্রেস ব্যতীত অন্য ডিভাইস কানেক্ট করলেই পোর্ট শাটডাউন হবে:',
        code: `Switch(config)# interface FastEthernet0/5
Switch(config-if)# switchport mode access
Switch(config-if)# switchport port-security
Switch(config-if)# switchport port-security maximum 1
Switch(config-if)# switchport port-security mac-address sticky
Switch(config-if)# switchport port-security violation shutdown
Switch# show port-security interface f0/5`
      },
      {
        title: 'VTP (VLAN Trunking Protocol) সেটআপ',
        description: 'একটি সুইচে VLAN বানালে স্বয়ংক্রিয়ভাবে সকল ক্লায়েন্ট সুইচে সিঙ্ক হবে:',
        code: `! On Primary Server Switch
Switch(config)# vtp domain NetLab
Switch(config)# vtp password cisco123
Switch(config)# vtp mode server

! On Secondary Client Switch
Switch(config)# vtp domain NetLab
Switch(config)# vtp password cisco123
Switch(config)# vtp mode client`
      }
    ],
    keyConcepts: [
      'EtherChannel একাধিক ফিজিক্যাল লিংককে একটি সিঙ্গেল লজিক্যাল লিংকে রূপান্তর করে (Spanning Tree ব্লকিং প্রতিরোধ করে)',
      'Port Security Violation মোড ৩টি: Protect (ড্রপ কিন্তু নোটিফিকেশন ছাড়া), Restrict (ড্রপ + লগ জেনারেট), Shutdown (পোর্ট এরর-ডিস্যাবল করে বন্ধ করে দেয়)',
      'VTP Violation লিংক: https://www.facebook.com/groups/2979625562385482/permalink/3116758712005499/?',
      'Port Security ভিডিও লিংক: https://www.facebook.com/share/v/1RDdDMauWV/?',
    ],
    tags: ['VTP', 'EtherChannel', 'LACP', 'Port Security', 'Sticky MAC', 'Violation Shutdown']
  },
  {
    id: 'router-basics-modes-dhcp',
    moduleId: 'routing',
    moduleName: 'রাউটার, DHCP ও রাউটিং',
    moduleNameEn: 'Router, DHCP & Routing',
    title: 'রাউটার আর্কিটেকচার, সিএলআই মোডস ও DHCP সার্ভার সেটআপ',
    titleEn: 'Router Modes & Cisco IOS DHCP Server',
    summary: 'সিসকো রাউটার কি? User EXEC, Privileged EXEC, Global Configuration মোডের পার্থক্য। রাউটারে DHCP পুল তৈরি করে স্বয়ংক্রিয়ভাবে পিসিগুলোতে আইপি বিতরণ করার নিয়ম।',
    summaryEn: 'Mastering Cisco IOS command modes, interface provisioning, and building native Cisco IOS DHCP pools with exclusions, default routers, and DNS parameters.',
    category: 'routing',
    difficulty: 'Beginner',
    mediumUrl: 'https://medium.com/@rezaulmishal03/what-is-router-রাউটার-কি-a94f907c1ef8',
    facebookVideoUrl: 'https://www.facebook.com/share/v/1C12eAFuYd/?',
    pdfPath: '/assets/aistudio/1._Cisco_DHCP_Configuration_7babceb4.pdf',
    pdfName: '1. Cisco DHCP Configuration.pdf',
    cliCommands: [
      {
        title: 'রাউটারের বেসিক ইন্টারফেস কনফিগারেশন',
        description: 'ইন্টারফেসে আইপি বসানো এবং নো শাটডাউন দেওয়া:',
        code: `Router> enable
Router# configure terminal
Router(config)# hostname Core_R1
Core_R1(config)# interface GigabitEthernet0/0
Core_R1(config-if)# ip address 192.168.1.1 255.255.255.0
Core_R1(config-if)# no shutdown
Core_R1(config-if)# exit`
      },
      {
        title: 'Cisco DHCP Server তৈরি',
        description: 'রাউটারে ডিএইচসিপি পুল তৈরি ও আইপি এক্সক্লুড করা:',
        code: `! Exclude Gateway and Server IPs
Core_R1(config)# ip dhcp excluded-address 192.168.1.1 192.168.1.10

! Define DHCP Pool
Core_R1(config)# ip dhcp pool LAN_POOL
Core_R1(dhcp-config)# network 192.168.1.0 255.255.255.0
Core_R1(dhcp-config)# default-router 192.168.1.1
Core_R1(dhcp-config)# dns-server 8.8.8.8
Core_R1(dhcp-config)# exit

! Verification
Core_R1# show ip dhcp binding
Core_R1# show ip interface brief`
      }
    ],
    keyConcepts: [
      'User EXEC মোড: Router> (সীমিত ভিউ কমান্ড)',
      'Privileged EXEC মোড: Router# (সব ধরনের শো ও ডিবাগ কমান্ড চালানো যায়)',
      'Global Config মোড: Router(config)# (ডিভাইসের গ্লোবাল সেটিংস পরিবর্তন করা যায়)',
      'DHCP Server বানানোর সময় ip dhcp excluded-address আগেই দিতে হয় যাতে রাউটার বা সার্ভারের স্ট্যাটিক আইপি কোনো পিসির কাছে বিতরণ না হয়ে যায়',
    ],
    tags: ['Router Modes', 'DHCP Server', 'Excluded Address', 'Default Gateway', 'DNS', 'Cisco IOS']
  },
  {
    id: 'static-routing-fundamentals',
    moduleId: 'routing',
    moduleName: 'রাউটার, DHCP ও রাউটিং',
    moduleNameEn: 'Router, DHCP & Routing',
    title: 'স্ট্যাটিক ও ডিফল্ট রাউটিং (Static & Default Routing)',
    titleEn: 'Static & Default Route Engineering',
    summary: 'রাউটার কিভাবে এক নেটওয়ার্ক থেকে অন্য নেটওয়ার্কে প্যাকেট পাঠায়? ম্যানুয়ালি নেক্সট-হপ আইপি বা এক্সিট ইন্টারফেস দিয়ে স্ট্যাটিক রাউট এবং ইন্টারনেট কানেকশনের জন্য ডিফল্ট রাউট সেটআপ।',
    summaryEn: 'Building static routes pointing to next-hop IP or exit interfaces, configuring 0.0.0.0/0 default gateways of last resort, and understanding administrative distance.',
    category: 'routing',
    difficulty: 'Beginner',
    facebookVideoUrl: 'https://www.facebook.com/share/v/18GAxXhnF8/?',
    pdfPath: '/assets/aistudio/0._Cisco_Routing_Basics_78194a63.pdf',
    pdfName: '0. Cisco Routing Basics.pdf',
    cliCommands: [
      {
        title: 'স্ট্যাটিক রাউট কনফিগারেশন',
        description: 'নির্দিষ্ট গন্তব্য নেটওয়ার্কে যাওয়ার পথ নির্ধারণ:',
        code: `! Syntax: ip route <destination-network> <subnet-mask> <next-hop-ip>
Router(config)# ip route 192.168.2.0 255.255.255.0 10.10.10.2
Router(config)# ip route 192.168.3.0 255.255.255.0 10.10.10.6`
      },
      {
        title: 'ডিফল্ট রাউট (Gateway of Last Resort)',
        description: 'ইন্টারনেট বা অজানা যেকোনো আইপির ট্রাফিক আইএসপি রাউটারে পাঠানোর জন্য:',
        code: `! Default Route: 0.0.0.0 0.0.0.0
Router(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.1
Router# show ip route`
      }
    ],
    keyConcepts: [
      'Static Route এর Administrative Distance (AD) হলো ১ (খুবই নির্ভরযোগ্য)',
      'ডিফল্ট রাউট 0.0.0.0 0.0.0.0 কে "Gateway of Last Resort" বলা হয়',
      'শো কমান্ড: show ip route এ \'S\' দিয়ে স্ট্যাটিক এবং \'S*\' দিয়ে ক্যান্ডিডেট ডিফল্ট রাউট প্রদর্শিত হয়',
    ],
    tags: ['Static Routing', 'Default Route', '0.0.0.0/0', 'Next Hop', 'AD 1', 'Routing Table']
  },
  {
    id: 'rip-routing-configuration',
    moduleId: 'routing',
    moduleName: 'রাউটার, DHCP ও রাউটিং',
    moduleNameEn: 'Router, DHCP & Routing',
    title: 'RIPv2 ডাইনামিক রাউটিং (Routing Information Protocol)',
    titleEn: 'RIP Version 2 Dynamic Routing',
    summary: 'ডিসট্যান্স ভেক্টর রাউটিং প্রোটোকল। হপ কাউন্টের ভিত্তিতে পথ নির্বাচন, ক্লাসলেস রাউটিং সাপোর্ট (no auto-summary) এবং প্রতি ৩০ সেকেন্ডে রাউটিং আপডেট আদান-প্রদান।',
    summaryEn: 'Configuring Distance-Vector RIPv2, hop count metric limitation (15 max), loop prevention mechanisms (split horizon, poison reverse), and classless mask advertisement.',
    category: 'routing',
    difficulty: 'Intermediate',
    facebookVideoUrl: 'https://www.facebook.com/share/v/1DuTw6bAKc/?',
    pdfPath: '/assets/aistudio/3._Cisco__RIP_Routing_Configuration_16b3dd84.pdf',
    pdfName: '3. Cisco RIP Routing Configuration.pdf',
    cliCommands: [
      {
        title: 'RIP Version 2 কনফিগারেশন',
        description: 'রাউটারে RIP সক্রিয় করা এবং সংযুক্ত নেটওয়ার্ক ঘোষণা করা:',
        code: `Router# configure terminal
Router(config)# router rip
Router(config-router)# version 2
Router(config-router)# no auto-summary
Router(config-router)# network 192.168.1.0
Router(config-router)# network 10.0.0.0
Router(config-router)# exit
Router# show ip route rip
Router# show ip protocols`
      }
    ],
    keyConcepts: [
      'RIP এর মেট্রিক হলো Hop Count (সর্বোচ্চ ১৫ হপ, ১৬ হপ মানে Unreachable)',
      'RIP এর Administrative Distance (AD) হলো ১২০',
      'RIPv2 ক্লাসলেস ও মাল্টিকাস্ট এড্রেস 224.0.0.9 ব্যবহার করে আপডেট পাঠায়',
      'no auto-summary কমান্ড দেওয়া বাধ্যতামূলক, যাতে সাবনেটেড নেটওয়ার্ক ক্লাসফুল সামারাইজ না হয়',
    ],
    tags: ['RIPv2', 'Distance Vector', 'Hop Count', 'AD 120', 'no auto-summary', 'Multicast 224.0.0.9']
  },
  {
    id: 'ospf-single-area-configuration',
    moduleId: 'routing',
    moduleName: 'রাউটার, DHCP ও রাউটিং',
    moduleNameEn: 'Router, DHCP & Routing',
    title: 'OSPF সিঙ্গেল এরিয়া কনফিগারেশন (Open Shortest Path First Area 0)',
    titleEn: 'OSPF Single Area 0 Engineering',
    summary: 'বর্তমান এন্টারপ্রাইজের সবচেয়ে জনপ্রিয় লিংক-স্টেট রাউটিং প্রোটোকল। Dijkstra SPF অ্যালগরিদম, ব্যান্ডউইথ অনুযায়ী কস্ট হিসাব, এবং ওয়াইল্ডকার্ড মাস্ক দিয়ে নেটওয়ার্ক ঘোষণা।',
    summaryEn: 'Link-State OSPFv2 architecture, Router-ID election, Dijkstra shortest path algorithm, wildcard masks, and neighbor adjacency over Hello packets.',
    category: 'routing',
    difficulty: 'Intermediate',
    facebookVideoUrl: 'https://www.facebook.com/share/v/19Xnz3Uibk/?',
    pdfPath: '/assets/aistudio/4._Cisco__OSPF_Single_Area_Configuration_5d5221dc.pdf',
    pdfName: '4. Cisco OSPF Single Area Configuration.pdf',
    cliCommands: [
      {
        title: 'OSPF Area 0 কনফিগারেশন',
        description: 'প্রসেস আইডি, রাউটার আইডি এবং ওয়াইল্ডকার্ড মাস্ক সহ OSPF চালু করা:',
        code: `Router# configure terminal
Router(config)# router ospf 10
Router(config-router)# router-id 1.1.1.1
! Network statement: <Network-ID> <Wildcard-Mask> area <Area-ID>
Router(config-router)# network 192.168.1.0 0.0.0.255 area 0
Router(config-router)# network 10.10.10.0 0.0.0.3 area 0
Router(config-router)# exit
Router# show ip ospf neighbor
Router# show ip route ospf`
      }
    ],
    keyConcepts: [
      'OSPF এর Administrative Distance (AD) হলো ১১০',
      'মেট্রিক হলো Cost (Cost = Reference Bandwidth / Interface Bandwidth)',
      'ওয়াইল্ডকার্ড মাস্ক (Wildcard Mask) হলো সাবনেট মাস্কের বিপরীত (যেমন: 255.255.255.0 এর ওয়াইল্ডকার্ড 0.0.0.255)',
      'হ্যালো প্যাকেট মাল্টিকাস্ট এড্রেস 224.0.0.5 ও 224.0.0.6 দিয়ে প্রতি ১০ সেকেন্ড পর পর পাঠানো হয়',
    ],
    tags: ['OSPF', 'Area 0', 'Link-State', 'AD 110', 'Cost', 'Wildcard Mask', 'Router-ID']
  },
  {
    id: 'ospf-multi-area-configuration',
    moduleId: 'routing',
    moduleName: 'রাউটার, DHCP ও রাউটিং',
    moduleNameEn: 'Router, DHCP & Routing',
    title: 'OSPF মাল্টি এরিয়া আর্কিটেকচার (Backbone Area 0, Area 1 & Area 2)',
    titleEn: 'OSPF Multi-Area Enterprise Architecture',
    summary: 'বড় নেটওয়ার্কে রাউটিং টেবিল ছোট রাখতে একাধিক এরিয়া গঠন করা। ব্যাকবোন এরিয়া (Area 0), Area Border Router (ABR), এবং ৪টি রাউটার দিয়ে মাল্টি-এরিয়া কনফিগারেশন স্ক্রিপ্ট।',
    summaryEn: 'Multi-Area hierarchical OSPF design with Backbone Area 0, ABRs, internal routers, LSA flood containment, and full multi-router CLI deployment scripts.',
    category: 'routing',
    difficulty: 'Advanced',
    facebookVideoUrl: 'https://www.facebook.com/share/v/14xiWT5NTvK/?',
    pdfPath: '/assets/aistudio/multiple_ospf_65c8848c.txt',
    pdfName: 'multiple_ospf.txt (সম্পূর্ণ ৪টি রাউটারের সিএলআই স্ক্রিপ্ট)',
    cliCommands: [
      {
        title: 'Router 1 (Area 0)',
        description: 'রাউটার ১ এ গিগাবিট আইপি এবং OSPF Area 0 ঘোষণা:',
        code: `Router>enable
Router#configure terminal
Router(config)#interface GigabitEthernet0/0
Router(config-if)#ip address 192.168.1.1 255.255.255.0
Router(config-if)#no shutdown
Router(config-if)#exit
Router(config)#interface GigabitEthernet0/1
Router(config-if)#ip address 10.10.10.10 255.255.255.252
Router(config-if)#no shutdown
Router(config-if)#exit
Router(config)#router ospf 15
Router(config-router)#router-id 1.1.1.1
Router(config-router)#net 192.168.1.0 0.0.0.255 area 0
Router(config-router)#net 10.10.10.8 0.0.0.3 area 0
Router(config-router)#exit
Router(config)#do wr`
      },
      {
        title: 'Router 4 (ABR - Backbone Area)',
        description: 'রাউটার ৪ ব্যাকবোন হিসেবে Area 0, Area 1 ও Area 2 কে যুক্ত করে:',
        code: `Router>enable
Router#configure terminal
Router(config)#interface GigabitEthernet0/0
Router(config-if)#ip address 10.10.10.9 255.255.255.252
Router(config-if)#no shutdown
Router(config-if)#exit
Router(config)#interface GigabitEthernet0/1
Router(config-if)#ip address 10.10.10.5 255.255.255.252
Router(config-if)#no shutdown
Router(config-if)#exit
Router(config)#interface GigabitEthernet0/2
Router(config-if)#ip address 10.10.10.1 255.255.255.252
Router(config-if)#no shutdown
Router(config-if)#exit
Router(config)#router ospf 15
Router(config-router)#router-id 4.4.4.4
Router(config-router)#net 10.10.10.8 0.0.0.3 area 0
Router(config-router)#net 10.10.10.4 0.0.0.3 area 1
Router(config-router)#net 10.10.10.0 0.0.0.3 area 2
Router(config-router)#do wr`
      }
    ],
    keyConcepts: [
      'সব নন-ব্যাকবোন এরিয়াকে অবশ্যই ব্যাকবোন এরিয়া (Area 0)-এর সাথে ফিজিক্যালি বা লজিক্যালি কানেক্টেড থাকতে হবে',
      'যে রাউটার একই সাথে ব্যাকবোন এরিয়া এবং অন্য কোনো এরিয়ার সাথে যুক্ত থাকে তাকে ABR (Area Border Router) বলে',
      'মাল্টি এরিয়া ব্যবহারের ফলে একটি এরিয়ার ফ্ল্যাপিং বা পরিবর্তন অন্য এরিয়ার রাউট ক্যালকুলেশনে বাধা সৃষ্টি করে না',
    ],
    tags: ['OSPF Multi-Area', 'Backbone Area 0', 'Area 1', 'Area 2', 'ABR', 'LSA', 'Router 4 Backbone']
  },
  {
    id: 'standard-acl-configuration',
    moduleId: 'security',
    moduleName: 'সিকিউরিটি ও ACL',
    moduleNameEn: 'Security & Access Control',
    title: 'স্ট্যান্ডার্ড এক্সেস কন্ট্রোল লিস্ট (Standard ACL 1-99)',
    titleEn: 'Standard ACL Traffic Filtering',
    summary: 'শুধুমাত্র Source IP এড্রেস দেখে ট্রাফিক পারমিট বা ড্রপ করা। স্ট্যান্ডার্ড এসিএল নম্বরিং (১-৯৯), প্লেসমেন্ট নিয়ম (গন্তব্যের কাছাকাছি) এবং ইনবাউন্ড/আউটবাউন্ড ইন্টারফেসে প্রয়োগ।',
    summaryEn: 'Standard access-list configuration (numbers 1-99), filtering solely on source IPv4 address, optimal placement closest to the destination, and implicit deny all logic.',
    category: 'security',
    difficulty: 'Intermediate',
    facebookVideoUrl: 'https://www.facebook.com/share/v/1CxHneLMET/?',
    pdfPath: '/assets/aistudio/13._Cisco__Standard_ACL_Configuration_cf6ffbc1.pdf',
    pdfName: '13. Cisco Standard ACL Configuration.pdf',
    cliCommands: [
      {
        title: 'নির্দিষ্ট পিসি বা সাবনেট ব্লক করার স্ট্যান্ডার্ড এসিএল',
        description: '192.168.1.100 আইপিকে ব্লক করা এবং বাকি সকলকে অনুমতি দেওয়া:',
        code: `Router# configure terminal
! Deny single host
Router(config)# access-list 10 deny host 192.168.1.100
! Permit everyone else
Router(config)# access-list 10 permit any

! Apply to Interface (Closest to Destination)
Router(config)# interface GigabitEthernet0/1
Router(config-if)# ip access-group 10 out
Router(config-if)# exit
Router# show access-lists`
      }
    ],
    keyConcepts: [
      'স্ট্যান্ডার্ড এসিএল নম্বর রেঞ্জ: ১ থেকে ৯৯ এবং এক্সপ্যান্ডেড ১৩০০ থেকে ১৯৯৯',
      'গোল্ডেন রুল: স্ট্যান্ডার্ড এসিএল সবসময় গন্তব্যের যতটা সম্ভব কাছাকাছি (Closest to Destination) বসাতে হয়',
      'মনে রাখবেন: প্রতিটি এসিএল-এর শেষে একটি গোপন "Implicit Deny Any" থাকে; তাই প্রয়োজনীয় ট্রাফিকের জন্য permit any দিতে হয়',
    ],
    tags: ['Standard ACL', 'Access-List 1-99', 'Source IP', 'Implicit Deny', 'ip access-group', 'Security']
  },
  {
    id: 'extended-acl-configuration',
    moduleId: 'security',
    moduleName: 'সিকিউরিটি ও ACL',
    moduleNameEn: 'Security & Access Control',
    title: 'এক্সটেন্ডেড এসিএল কনফিগারেশন (Extended ACL 100-199)',
    titleEn: 'Extended ACL Port & Protocol Filtering',
    summary: 'উন্নত সিকিউরিটি ফিল্টারিং: সোর্স আইপি, ডেস্টিনেশন আইপি, প্রোটোকল (TCP, UDP, ICMP) এবং পোর্ট নম্বর (HTTP 80, FTP 21, SSH 22, DNS 53) অনুযায়ী পিনপয়েন্ট ট্রাফিক ফিল্টারিং।',
    summaryEn: 'Granular policy filtering with Extended ACLs (100-199), matching protocol, source/destination subnets, and TCP/UDP application ports (HTTP, DNS, FTP, Ping).',
    category: 'security',
    difficulty: 'Advanced',
    pdfPath: '/assets/aistudio/14._Cisco__Extended_ACL_Configuration_918f70e5.pdf',
    pdfName: '14. Cisco Extended ACL Configuration.pdf',
    cliCommands: [
      {
        title: 'ওয়েব ট্রাফিক বন্ধ করে পিং চালু রাখার এক্সটেন্ডেড এসিএল',
        description: 'একটি ল্যান থেকে ওয়েব সার্ভারের HTTP ব্লক কিন্তু ICMP পিং পারমিট:',
        code: `Router# configure terminal
! Deny HTTP (port 80) from 192.168.10.0 to Web Server 10.10.10.50
Router(config)# access-list 101 deny tcp 192.168.10.0 0.0.0.255 host 10.10.10.50 eq 80
! Permit Ping (ICMP)
Router(config)# access-list 101 permit icmp 192.168.10.0 0.0.0.255 host 10.10.10.50
! Permit all other IP traffic
Router(config)# access-list 101 permit ip any any

! Apply to Interface (Closest to Source)
Router(config)# interface GigabitEthernet0/0
Router(config-if)# ip access-group 101 in
Router(config-if)# exit`
      }
    ],
    keyConcepts: [
      'এক্সটেন্ডেড এসিএল নম্বর রেঞ্জ: ১০০ থেকে ১৯৯ এবং ২০০০ থেকে ২৬৯৯',
      'গোল্ডেন রুল: এক্সটেন্ডেড এসিএল সবসময় উৎসের যতটা সম্ভব কাছাকাছি (Closest to Source) বসাতে হয় যাতে অপ্রয়োজনীয় ব্যান্ডউইথ নষ্ট না হয়',
      'কমান্ডে প্রোটোকল স্পেসিফাই করতে হয়: tcp, udp, icmp বা ip',
    ],
    tags: ['Extended ACL', 'Access-List 100-199', 'Port Filtering', 'TCP', 'UDP', 'ICMP', 'Firewall']
  },
  {
    id: 'static-nat-configuration',
    moduleId: 'administration',
    moduleName: 'NAT ও ডিভাইস ম্যানেজমেন্ট',
    moduleNameEn: 'NAT & Device Administration',
    title: 'স্ট্যাটিক ন্যাট কনফিগারেশন (Static NAT 1:1 Mapping)',
    titleEn: 'Static NAT One-to-One Public Mapping',
    summary: 'প্রাইভেট আইপিকে পার্মানেন্ট পাবলিক আইপিতে রূপান্তর। প্রতিষ্ঠানের নিজস্ব ওয়েব বা মেইল সার্ভারকে ইন্টারনেটে রিলিজ দেওয়ার জন্য স্ট্যাটিক ন্যাট কিভাবে ইনসাইড ও আউটসাইড ইন্টারফেসে কনফিগার করা হয়।',
    summaryEn: 'One-to-one mapping of private IPv4 addresses to routable public IPs. Configuring ip nat inside, ip nat outside, and translation tables for DMZ servers.',
    category: 'administration',
    difficulty: 'Intermediate',
    pdfPath: '/assets/aistudio/15._Cisco__Static_NAT_Configuration_58211be8.pdf',
    pdfName: '15. Cisco Static NAT Configuration.pdf',
    cliCommands: [
      {
        title: 'স্ট্যাটিক ন্যাট কনফিগারেশন',
        description: 'অভ্যন্তরীণ সার্ভারকে নির্দিষ্ট পাবলিক আইপিতে ম্যাপ করা:',
        code: `Router# configure terminal
! Static 1:1 NAT Mapping
Router(config)# ip nat inside source static 192.168.1.100 203.0.113.15

! Designate Interfaces
Router(config)# interface GigabitEthernet0/0
Router(config-if)# ip nat inside
Router(config-if)# exit

Router(config)# interface GigabitEthernet0/1
Router(config-if)# ip nat outside
Router(config-if)# exit

! View active translations
Router# show ip nat translations`
      }
    ],
    keyConcepts: [
      'Inside Local: প্রতিষ্ঠানের ভেতরের প্রাইভেট আইপি (192.168.1.100)',
      'Inside Global: ইন্টারনেটে দৃশ্যমান পাবলিক আইপি (203.0.113.15)',
      'ইন্টারফেসে ip nat inside এবং ip nat outside ডিফাইন না করলে ন্যাট কাজ করে না',
    ],
    tags: ['NAT', 'Static NAT', 'Inside Local', 'Inside Global', 'Port Forwarding', 'Public IP']
  },
  {
    id: 'pat-overloaded-nat',
    moduleId: 'administration',
    moduleName: 'NAT ও ডিভাইস ম্যানেজমেন্ট',
    moduleNameEn: 'NAT & Device Administration',
    title: 'প্যাট ওভারলোডেড ন্যাট (PAT / NAT Overload)',
    titleEn: 'Port Address Translation (PAT) Overload',
    summary: 'শত শত কম্পিউটারকে একটি মাত্র পাবলিক আইপি দিয়ে ইন্টারনেট ব্রাউজ করানোর জাদুকরী প্রযুক্তি। বিভিন্ন পোর্ট নম্বর ব্যবহার করে ট্রাফিক ট্র্যাকিং এবং ওভারলোড কমান্ড কনফিগারেশন।',
    summaryEn: 'Port Address Translation (PAT/NAT Overload) sharing a single public ISP interface address among hundreds of private clients using dynamic port assignment.',
    category: 'administration',
    difficulty: 'Intermediate',
    pdfPath: '/assets/aistudio/17._Cisco__PAT_Overloaded_Configuration_0eaed622.pdf',
    pdfName: '17. Cisco PAT Overloaded Configuration.pdf',
    cliCommands: [
      {
        title: 'PAT / NAT Overload কনফিগারেশন',
        description: 'এক্সেস-লিস্ট দিয়ে লোকাল ল্যান সিলেক্ট করে ইন্টারফেসে ওভারলোড করা:',
        code: `Router# configure terminal
! 1. Define permitted LAN traffic in ACL
Router(config)# access-list 1 permit 192.168.1.0 0.0.0.255

! 2. Link ACL to Exit Interface with Overload
Router(config)# ip nat inside source list 1 interface GigabitEthernet0/1 overload

! 3. Mark Inside and Outside interfaces
Router(config)# interface GigabitEthernet0/0
Router(config-if)# ip nat inside
Router(config-if)# exit

Router(config)# interface GigabitEthernet0/1
Router(config-if)# ip nat outside
Router(config-if)# exit

Router# show ip nat translations
Router# show ip nat statistics`
      }
    ],
    keyConcepts: [
      'PAT এ প্রতিটি কানেকশনকে সোর্স পোর্ট নম্বর দিয়ে আলাদা করা হয় (Layer 4 TCP/UDP Port)',
      'overload কি-ওয়ার্ডের মাধ্যমেই রাউটার বুঝতে পারে একটি আইপি দিয়ে হাজার হাজার সেশন হ্যান্ডেল করতে হবে',
      'বাসা-বাড়ি ও অফিসের ওয়াইফাই রাউটার এই PAT প্রযুক্তি ব্যবহার করে',
    ],
    tags: ['PAT', 'NAT Overload', 'Port Address Translation', 'ACL Binding', 'Shared Public IP']
  },
  {
    id: 'telnet-ssh-administration',
    moduleId: 'administration',
    moduleName: 'NAT ও ডিভাইস ম্যানেজমেন্ট',
    moduleNameEn: 'NAT & Device Administration',
    title: 'সিকিউর রিমোট এক্সেস (Telnet & SSH Configuration)',
    titleEn: 'Secure Remote Management with SSH & Telnet',
    summary: 'দূর থেকে নেটওয়ার্ক ডিভাইস ম্যানেজ করার উপায়। কেন সাধারণ টেলনেট (Unencrypted Plaintext) বাদ দিয়ে ক্রিপ্টোগ্রাফিক আরএসএ কী ও এসএসএইচ (SSHv2 Port 22) ব্যবহার করা আবশ্যক।',
    summaryEn: 'Configuring encrypted SSHv2 device management, generating 1024/2048-bit RSA keys, configuring local usernames, and securing Line VTY transports.',
    category: 'administration',
    difficulty: 'Intermediate',
    pdfPath: '/assets/aistudio/18._Cisco__Telnet___SSH_Configuration_e36a9540.pdf',
    pdfName: '18. Cisco Telnet & SSH Configuration.pdf',
    cliCommands: [
      {
        title: 'Cisco Router/Switch এ SSHv2 কনফিগারেশন',
        description: 'হোস্টনেম, ডোমেন নাম, RSA ক্রিপ্টো কী জেনারেশন ও VTY লকডাউন:',
        code: `Router# configure terminal
! Step 1: Set Hostname and Domain
Router(config)# hostname Core_Gate
Core_Gate(config)# ip domain-name netlab.local

! Step 2: Generate RSA Encryption Key (1024 or 2048 bit)
Core_Gate(config)# crypto key generate rsa
How many bits [512]: 1024

! Step 3: Create Local Admin User
Core_Gate(config)# username admin privilege 15 secret Cisco@StrongPass#99

! Step 4: Configure VTY Lines strictly for SSH
Core_Gate(config)# line vty 0 4
Core_Gate(config-line)# login local
Core_Gate(config-line)# transport input ssh
Core_Gate(config-line)# exit

! Enable SSH Version 2
Core_Gate(config)# ip ssh version 2`
      }
    ],
    keyConcepts: [
      'টেলনেট পোর্ট ২৩ ব্যবহার করে এবং সমস্ত পাসওয়ার্ড প্লেইন টেক্সটে পাঠায় যা ওয়্যারশার্ক দিয়ে যে কেউ চুরি করতে পারে',
      'এসএসএইচ পোর্ট ২২ ব্যবহার করে এবং এন্ড-টু-এন্ড এনক্রিপ্টেড টানেল নিশ্চিত করে',
      'RSA কী জেনারেট করার পূর্বে ডিভাইসের ডিফল্ট হোস্টনেম পরিবর্তন এবং ip domain-name দেওয়া বাধ্যতামূলক',
    ],
    tags: ['SSH', 'Telnet', 'RSA Key', 'Crypto', 'Line VTY', 'Transport Input SSH', 'Port 22']
  },
  {
    id: 'router-password-recovery',
    moduleId: 'administration',
    moduleName: 'NAT ও ডিভাইস ম্যানেজমেন্ট',
    moduleNameEn: 'NAT & Device Administration',
    title: 'পাসওয়ার্ড সেটআপ, এনক্রিপশন ও রমমন পাসওয়ার্ড ব্রেক (0x2142 Recovery)',
    titleEn: 'Password Hardening & ROMmon 0x2142 Recovery',
    summary: 'কনসোল, প্রিভিলেজড ও VTY পাসওয়ার্ড সেট করা। পাসওয়ার্ড ভুলে গেলে কীভাবে রাউটার না মুছে ROMMON মোডে কনফিগারেশন রেজিস্টার 0x2142 দিয়ে পাসওয়ার্ড ব্রেক ও ডাটা রিকভারি করতে হয়।',
    summaryEn: 'Complete recovery guide: Bypassing NVRAM startup configuration using config-register 0x2142, recovering configuration files, resetting enable secret, and restoring 0x2102 normal boot.',
    category: 'administration',
    difficulty: 'Advanced',
    facebookVideoUrl: 'https://www.facebook.com/share/v/19YF2gzkQB/?',
    pdfPath: '/assets/aistudio/Router_password_setup_and_Passowrd_Breaking_57ce8456.pdf',
    pdfName: 'Router password setup and Password Breaking.pdf',
    cliCommands: [
      {
        title: 'পাসওয়ার্ড সেটআপ ও গ্লোবাল এনক্রিপশন',
        description: 'সরাসরি হ্যাশড সিক্রেট এবং রানিং কনফিগারেশনের সব পাসওয়ার্ড এনক্রিপ্ট করা:',
        code: `Router# configure terminal
Router(config)# enable secret Cisco@Secret2026
Router(config)# service password-encryption
Router(config)# line console 0
Router(config-line)# password ConsolePass123
Router(config-line)# login
Router(config-line)# exit`
      },
      {
        title: 'ROMMON পাসওয়ার্ড ব্রেকিং ও রিকভারি ধাপসমূহ',
        description: 'পাসওয়ার্ড ভুলে গেলে রাউটার রিবুট করে ব্রেক সিগন্যাল পাঠিয়ে রিকভারি:',
        code: `! ১. রাউটার বুট হওয়ার সময় Ctrl + Break বা Pause টিপে ROMMON মোডে যান:
rommon 1 > confreg 0x2142
rommon 2 > reset

! ২. রাউটার রিবুট হওয়ার পর ডায়ালগ আসলে "no" লিখুন:
Router> enable
Router# copy startup-config running-config

! ৩. এবার নতুন পাসওয়ার্ড সেট করুন:
Router# configure terminal
Router(config)# enable secret NewMasterPass@2026

! ৪. কনফিগারেশন রেজিস্টার পুনরায় নরমাল মোড 0x2102 এ ফিরিয়ে আনুন:
Router(config)# config-register 0x2102
Router(config)# exit
Router# copy running-config startup-config
Router# reload`
      }
    ],
    keyConcepts: [
      'স্বাভাবিক অবস্থায় কনফিগারেশন রেজিস্টার থাকে 0x2102 (NVRAM স্টার্টআপ কনফিগ লোড করে)',
      '0x2142 রেজিস্টার দিলে রাউটার NVRAM এর স্টার্টআপ ফাইল বাইপাস করে ফাঁকা ফ্রেশ শুরু হয়',
      'রিকভারির পর config-register 0x2102 এ না ফেরালে প্রতিবার রিবুটে ডাটা মুছে যাবে!',
    ],
    tags: ['Password Recovery', 'ROMMON', '0x2142', '0x2102', 'confreg', 'Enable Secret', 'Data Recovery']
  },
  {
    id: 'ccna-enterprise-capstone-project',
    moduleId: 'project',
    moduleName: 'সিসিএনএ প্রজেক্ট ও ক্যাপস্টোন',
    moduleNameEn: 'CCNA Capstone Project',
    title: 'সিসিএনএ ক্যাপস্টোন প্রজেক্ট: এন্টারপ্রাইজ ল্যান ডিজাইন (Project CCNA 2606)',
    titleEn: 'CCNA Capstone Project: Enterprise Campus Network Design',
    summary: 'প্রফেশনাল এন্টারপ্রাইজ নেটওয়ার্ক আর্কিটেকচার: একাধিক ডিপার্টমেন্টে VLAN, Router-on-a-stick দিয়ে Inter-VLAN Routing, সুইচগুলোর মাঝে EtherChannel (LACP/PAgP), সেন্ট্রালাইজড DHCP ও সিকিউরিটি পলিসি।',
    summaryEn: 'Complete end-to-end multi-building campus network design matching Cisco CCNA syllabus guidelines. Includes VLAN budgeting, EtherChannel link redundancy, DHCP pools, and security verification.',
    category: 'project',
    difficulty: 'Advanced',
    pdfPath: '/assets/aistudio/Project_-_CCNA__2606__2c4dafcb.pdf',
    pdfName: 'Project - CCNA 2606.pdf',
    keyConcepts: [
      'Core Layer, Distribution Layer ও Access Layer ভিত্তিক থ্রি-টায়ার ক্যাম্পাস ডিজাইন',
      'এইচআর, অ্যাকাউন্টস, আইটি এবং গেস্টদের জন্য আলাদা VLAN ও সাবনেট নির্ধারণ',
      'সুইচগুলোর ব্যাকবোন লিংকে রিডান্ড্যান্সি ও ব্যান্ডউইথ নিশ্চিত করতে EtherChannel বান্ডেল',
      'রাউটার সাব-ইন্টারফেসে 802.1Q এনক্যাপসুলেশন ও গেটওয়ে কনফিগারেশন',
      'প্রজেক্টের পূর্ণাঙ্গ রিপোর্ট ও ডায়াগ্রাম তৈরির জন্য সম্পূর্ণ ল্যাব শিটটি ডাউনলোড করুন',
    ],
    tags: ['CCNA Project', 'Enterprise LAN', 'Campus Network', 'EtherChannel', 'ROAS', 'VLAN Design', 'Lab 2606']
  }
];

export const TOPIC_TOPOLOGIES = [
  {
    id: 'topo-ospf-multi',
    title: 'OSPF মাল্টি এরিয়া টপোলজি (Area 0, Area 1, Area 2)',
    description: 'রাউটার ৪ (Backbone) কিভাবে এরিয়া ১ (রাউটার ২), এরিয়া ২ (রাউটার ৩) এবং এরিয়া ০ (রাউটার ১) কে কানেক্ট করে।',
    nodes: [
      { id: 'R4', label: 'R4 (Backbone)', ip: '10.10.10.1, .5, .9', type: 'backbone', x: 50, y: 50 },
      { id: 'R1', label: 'R1 (Area 0)', ip: '192.168.1.1', type: 'area0', x: 15, y: 20 },
      { id: 'R2', label: 'R2 (Area 1)', ip: '192.168.3.1', type: 'area1', x: 85, y: 20 },
      { id: 'R3', label: 'R3 (Area 2)', ip: '192.168.2.1', type: 'area2', x: 50, y: 85 },
    ]
  },
  {
    id: 'topo-roas',
    title: 'Router-on-a-stick ইন্টার-ভিল্যান আর্কিটেকচার',
    description: 'একটি ট্রাঙ্ক ক্যাবল দিয়ে রাউটার সাব-ইন্টারফেস g0/0.10 ও g0/0.20 এর মাধ্যমে VLAN 10 ও 20 এর ডাটা ফরোয়ার্ড করা।',
    nodes: [
      { id: 'Router', label: 'Core Router (ROAS)', ip: 'g0/0.10 & g0/0.20', type: 'router', x: 50, y: 20 },
      { id: 'Switch', label: 'Layer 2 Switch', ip: 'Trunk g0/1', type: 'switch', x: 50, y: 55 },
      { id: 'VLAN10', label: 'VLAN 10 (HR Dept)', ip: '192.168.10.0/24', type: 'vlan', x: 25, y: 85 },
      { id: 'VLAN20', label: 'VLAN 20 (IT Dept)', ip: '192.168.20.0/24', type: 'vlan', x: 75, y: 85 },
    ]
  }
];
