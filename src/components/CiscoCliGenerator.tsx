import React, { useState } from 'react';
import { Terminal, Copy, Check, RotateCcw, ShieldCheck, Network, Server, KeyRound } from 'lucide-react';

type GeneratorType = 'dhcp' | 'vlan' | 'intervlan' | 'ospf' | 'acl' | 'pat' | 'rommon';

export const CiscoCliGenerator: React.FC = () => {
  const [activeType, setActiveType] = useState<GeneratorType>('dhcp');
  const [copied, setCopied] = useState(false);

  // DHCP state
  const [dhcpPool, setDhcpPool] = useState('LAN_OFFICE');
  const [dhcpNet, setDhcpNet] = useState('192.168.10.0');
  const [dhcpMask, setDhcpMask] = useState('255.255.255.0');
  const [dhcpGateway, setDhcpGateway] = useState('192.168.10.1');
  const [dhcpDns, setDhcpDns] = useState('8.8.8.8');
  const [dhcpExcludeStart, setDhcpExcludeStart] = useState('192.168.10.1');
  const [dhcpExcludeEnd, setDhcpExcludeEnd] = useState('192.168.10.10');

  // VLAN state
  const [vlanId, setVlanId] = useState('10');
  const [vlanName, setVlanName] = useState('HR_Department');
  const [vlanPort, setVlanPort] = useState('FastEthernet0/1 - 4');
  const [vlanMode, setVlanMode] = useState<'access' | 'trunk'>('access');

  // Inter-VLAN state
  const [roasRouterIf, setRoasRouterIf] = useState('GigabitEthernet0/0');
  const [roasVlan1, setRoasVlan1] = useState('10');
  const [roasIp1, setRoasIp1] = useState('192.168.10.1');
  const [roasVlan2, setRoasVlan2] = useState('20');
  const [roasIp2, setRoasIp2] = useState('192.168.20.1');

  // OSPF state
  const [ospfProcessId, setOspfProcessId] = useState('10');
  const [ospfRouterId, setOspfRouterId] = useState('1.1.1.1');
  const [ospfNet1, setOspfNet1] = useState('192.168.10.0');
  const [ospfWildcard1, setOspfWildcard1] = useState('0.0.0.255');
  const [ospfArea, setOspfArea] = useState('0');

  // ACL state
  const [aclType, setAclType] = useState<'standard' | 'extended'>('standard');
  const [aclNumber, setAclNumber] = useState('10');
  const [aclAction, setAclAction] = useState<'permit' | 'deny'>('deny');
  const [aclHost, setAclHost] = useState('192.168.10.50');
  const [aclIf, setAclIf] = useState('GigabitEthernet0/1');
  const [aclDirection, setAclDirection] = useState<'in' | 'out'>('out');

  // PAT state
  const [patLanNet, setPatLanNet] = useState('192.168.10.0');
  const [patLanWildcard, setPatLanWildcard] = useState('0.0.0.255');
  const [patInsideIf, setPatInsideIf] = useState('GigabitEthernet0/0');
  const [patOutsideIf, setPatOutsideIf] = useState('GigabitEthernet0/1');

  // Generated CLI Script
  const generateCommand = () => {
    switch (activeType) {
      case 'dhcp':
        return `! ==========================================
! CISCO IOS DHCP SERVER CONFIGURATION
! ==========================================
configure terminal
! ১. গেটওয়ে ও সংরক্ষিত আইপি এক্সক্লুড করা
ip dhcp excluded-address ${dhcpExcludeStart} ${dhcpExcludeEnd}

! ২. ডিএইচসিপি পুল তৈরি ও সেটিংস নির্ধারণ
ip dhcp pool ${dhcpPool}
 network ${dhcpNet} ${dhcpMask}
 default-router ${dhcpGateway}
 dns-server ${dhcpDns}
 exit

! ৩. লোকাল ইন্টারফেসে গেটওয়ে আইপি বসানো
interface GigabitEthernet0/0
 ip address ${dhcpGateway} ${dhcpMask}
 no shutdown
 exit
do write memory`;

      case 'vlan':
        return `! ==========================================
! CISCO SWITCH VLAN & PORT CONFIGURATION
! ==========================================
configure terminal
! ১. VLAN তৈরি ও নাম প্রদান
vlan ${vlanId}
 name ${vlanName}
 exit

! ২. সুইচের পোর্টে VLAN অ্যাসাইন করা
interface range ${vlanPort}
 switchport mode ${vlanMode}
 ${vlanMode === 'access' ? `switchport access vlan ${vlanId}` : `switchport trunk allowed vlan add ${vlanId}`}
 no shutdown
 exit
do show vlan brief
do write memory`;

      case 'intervlan':
        return `! ==========================================
! CISCO ROUTER-ON-A-STICK (INTER-VLAN)
! ==========================================
configure terminal
! ১. মূল ফিজিক্যাল পোর্ট চালু করা (আইপি ছাড়া)
interface ${roasRouterIf}
 no shutdown
 exit

! ২. প্রথম সাব-ইন্টারফেস (VLAN ${roasVlan1})
interface ${roasRouterIf}.${roasVlan1}
 encapsulation dot1Q ${roasVlan1}
 ip address ${roasIp1} 255.255.255.0
 exit

! ৩. দ্বিতীয় সাব-ইন্টারফেস (VLAN ${roasVlan2})
interface ${roasRouterIf}.${roasVlan2}
 encapsulation dot1Q ${roasVlan2}
 ip address ${roasIp2} 255.255.255.0
 exit
do show ip route
do write memory`;

      case 'ospf':
        return `! ==========================================
! CISCO OSPF DYNAMIC ROUTING CONFIGURATION
! ==========================================
configure terminal
router ospf ${ospfProcessId}
 router-id ${ospfRouterId}
 ! Network announcement with Wildcard Mask
 network ${ospfNet1} ${ospfWildcard1} area ${ospfArea}
 exit
do show ip ospf neighbor
do show ip route ospf
do write memory`;

      case 'acl':
        if (aclType === 'standard') {
          return `! ==========================================
! CISCO STANDARD ACCESS CONTROL LIST (1-99)
! ==========================================
configure terminal
! রুল ১: নির্দিষ্ট আইপি ${aclAction} করা
access-list ${aclNumber} ${aclAction} host ${aclHost}
! রুল ২: বাকি সবাইকে পারমিট করা (Implicit Deny ওভাররাইড)
access-list ${aclNumber} permit any

! ইন্টারফেসে ফিল্টার প্রয়োগ (গন্তব্যের নিকটে)
interface ${aclIf}
 ip access-group ${aclNumber} ${aclDirection}
 exit
do show access-lists
do write memory`;
        } else {
          return `! ==========================================
! CISCO EXTENDED ACCESS CONTROL LIST (100-199)
! ==========================================
configure terminal
! ওয়েব পোর্ট ৮০ ট্রাফিক ব্লক করা কিন্তু পিং পারমিট
access-list 101 deny tcp host ${aclHost} any eq 80
access-list 101 permit ip any any

interface ${aclIf}
 ip access-group 101 in
 exit
do show access-lists
do write memory`;
        }

      case 'pat':
        return `! ==========================================
! CISCO PAT / NAT OVERLOAD CONFIGURATION
! ==========================================
configure terminal
! ১. ল্যান সাবনেটকে পারমিট করে এক্সেস লিস্ট তৈরি
access-list 1 permit ${patLanNet} ${patLanWildcard}

! ২. পাবলিক এক্সিট ইন্টারফেসে ওভারলোড ম্যাপিং
ip nat inside source list 1 interface ${patOutsideIf} overload

! ৩. ইনসাইড ও আউটসাইড পোর্ট চিহ্নিত করা
interface ${patInsideIf}
 ip nat inside
 exit

interface ${patOutsideIf}
 ip nat outside
 exit
do show ip nat translations
do write memory`;

      case 'rommon':
        return `! ==========================================
! CISCO ROUTER ROMMON PASSWORD RECOVERY
! ==========================================
! ধাপ ১: রাউটার রিবুট করে Ctrl + Break চেপে ROMMON এ যান:
rommon 1 > confreg 0x2142
rommon 2 > reset

! ধাপ ২: রাউটার বুট হওয়ার পর প্রাথমিক সেটআপ নো দিন:
Router> enable
Router# copy startup-config running-config

! ধাপ ৩: নতুন পাসওয়ার্ড কনফিগার করুন:
Router# configure terminal
Router(config)# enable secret Cisco@AdminPass2026

! ধাপ ৪: কনফিগারেশন রেজিস্টার নরমাল মোডে (0x2102) ফেরত আনুন:
Router(config)# config-register 0x2102
Router(config)# exit
Router# copy running-config startup-config
Router# reload`;
    }
  };

  const codeString = generateCommand();

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 lg:p-8 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm">
            <Terminal className="w-4 h-4" />
            <span>সিসকো সিএলআই কমান্ড জেনারেটর</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            Interactive Cisco IOS Configuration Builder
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            পছন্দের টপিক বেছে নিন, মান পরিবর্তন করুন এবং সিসকো প্যাকেট ট্রেসারে সরাসরি চালানোর উপযুক্ত কোড এক ক্লিকে কপি করুন।
          </p>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 self-start sm:self-auto px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold transition-all shadow-lg shadow-cyan-900/30 shrink-0 cursor-pointer active:scale-95"
        >
          {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'স্ক্রিপ্ট কপি হয়েছে!' : 'সম্পূর্ণ কোড কপি করুন'}</span>
        </button>
      </div>

      {/* Navigation Pills */}
      <div className="flex flex-wrap gap-2 mt-6">
        {[
          { id: 'dhcp', label: 'DHCP Server', icon: Server },
          { id: 'vlan', label: 'VLAN & Trunk', icon: Network },
          { id: 'intervlan', label: 'Router-on-a-Stick', icon: Network },
          { id: 'ospf', label: 'OSPF Dynamic Route', icon: Network },
          { id: 'acl', label: 'ACL Firewall', icon: ShieldCheck },
          { id: 'pat', label: 'PAT (NAT Overload)', icon: Server },
          { id: 'rommon', label: 'ROMMON পাসওয়ার্ড রিকভারি', icon: KeyRound },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activeType === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveType(item.id as GeneratorType)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                isActive
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-800'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Form & Code Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Form Controls Column */}
        <div className="lg:col-span-5 bg-slate-950/70 border border-slate-800/80 rounded-xl p-5 space-y-4">
          <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
            প্যারামিটার কাস্টমাইজেশন (Input Fields)
          </h3>

          {activeType === 'dhcp' && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">DHCP Pool Name:</label>
                <input
                  type="text"
                  value={dhcpPool}
                  onChange={(e) => setDhcpPool(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Network Subnet:</label>
                  <input
                    type="text"
                    value={dhcpNet}
                    onChange={(e) => setDhcpNet(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Subnet Mask:</label>
                  <input
                    type="text"
                    value={dhcpMask}
                    onChange={(e) => setDhcpMask(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Default Gateway (Router IP):</label>
                <input
                  type="text"
                  value={dhcpGateway}
                  onChange={(e) => setDhcpGateway(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Exclude Start IP:</label>
                  <input
                    type="text"
                    value={dhcpExcludeStart}
                    onChange={(e) => setDhcpExcludeStart(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Exclude End IP:</label>
                  <input
                    type="text"
                    value={dhcpExcludeEnd}
                    onChange={(e) => setDhcpExcludeEnd(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {activeType === 'vlan' && (
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">VLAN ID:</label>
                  <input
                    type="text"
                    value={vlanId}
                    onChange={(e) => setVlanId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">VLAN Name:</label>
                  <input
                    type="text"
                    value={vlanName}
                    onChange={(e) => setVlanName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Switch Interface Range:</label>
                <input
                  type="text"
                  value={vlanPort}
                  onChange={(e) => setVlanPort(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Port Mode:</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setVlanMode('access')}
                    className={`flex-1 py-1.5 rounded-lg border text-center ${vlanMode === 'access' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
                  >
                    Access Port
                  </button>
                  <button
                    type="button"
                    onClick={() => setVlanMode('trunk')}
                    className={`flex-1 py-1.5 rounded-lg border text-center ${vlanMode === 'trunk' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
                  >
                    Trunk Port (802.1Q)
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeType === 'intervlan' && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Router Physical Interface:</label>
                <input
                  type="text"
                  value={roasRouterIf}
                  onChange={(e) => setRoasRouterIf(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Sub-IF 1 (VLAN ID):</label>
                  <input
                    type="text"
                    value={roasVlan1}
                    onChange={(e) => setRoasVlan1(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Gateway IP 1:</label>
                  <input
                    type="text"
                    value={roasIp1}
                    onChange={(e) => setRoasIp1(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Sub-IF 2 (VLAN ID):</label>
                  <input
                    type="text"
                    value={roasVlan2}
                    onChange={(e) => setRoasVlan2(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Gateway IP 2:</label>
                  <input
                    type="text"
                    value={roasIp2}
                    onChange={(e) => setRoasIp2(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {activeType === 'ospf' && (
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">OSPF Process ID:</label>
                  <input
                    type="text"
                    value={ospfProcessId}
                    onChange={(e) => setOspfProcessId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Router ID:</label>
                  <input
                    type="text"
                    value={ospfRouterId}
                    onChange={(e) => setOspfRouterId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-400 block mb-1">Network Address:</label>
                <input
                  type="text"
                  value={ospfNet1}
                  onChange={(e) => setOspfNet1(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Wildcard Mask:</label>
                  <input
                    type="text"
                    value={ospfWildcard1}
                    onChange={(e) => setOspfWildcard1(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Area ID:</label>
                  <input
                    type="text"
                    value={ospfArea}
                    onChange={(e) => setOspfArea(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {activeType === 'acl' && (
            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">ACL Type:</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => { setAclType('standard'); setAclNumber('10'); }}
                    className={`flex-1 py-1.5 rounded-lg border text-center ${aclType === 'standard' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
                  >
                    Standard (1-99)
                  </button>
                  <button
                    type="button"
                    onClick={() => { setAclType('extended'); setAclNumber('101'); }}
                    className={`flex-1 py-1.5 rounded-lg border text-center ${aclType === 'extended' ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' : 'bg-slate-900 border-slate-700 text-slate-400'}`}
                  >
                    Extended (100-199)
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Action:</label>
                  <select
                    value={aclAction}
                    onChange={(e) => setAclAction(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  >
                    <option value="deny">Deny (ব্লক)</option>
                    <option value="permit">Permit (অনুমতি)</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Target Host IP:</label>
                  <input
                    type="text"
                    value={aclHost}
                    onChange={(e) => setAclHost(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Router Interface:</label>
                  <input
                    type="text"
                    value={aclIf}
                    onChange={(e) => setAclIf(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Direction:</label>
                  <select
                    value={aclDirection}
                    onChange={(e) => setAclDirection(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  >
                    <option value="in">Inbound (in)</option>
                    <option value="out">Outbound (out)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeType === 'pat' && (
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Inside LAN Network:</label>
                  <input
                    type="text"
                    value={patLanNet}
                    onChange={(e) => setPatLanNet(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Wildcard Mask:</label>
                  <input
                    type="text"
                    value={patLanWildcard}
                    onChange={(e) => setPatLanWildcard(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1">Inside Interface:</label>
                  <input
                    type="text"
                    value={patInsideIf}
                    onChange={(e) => setPatInsideIf(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Outside WAN Interface:</label>
                  <input
                    type="text"
                    value={patOutsideIf}
                    onChange={(e) => setPatOutsideIf(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {activeType === 'rommon' && (
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-2 text-slate-300">
              <p className="font-semibold text-amber-400">গুরুত্বপূর্ণ নির্দেশনা:</p>
              <p>১. রাউটারের পাওয়ার অফ করে অন করুন এবং বুটিং স্ক্রিন আসার সাথে সাথে <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-cyan-300">Ctrl + Break</kbd> চাপুন।</p>
              <p>২. <code className="text-emerald-400">confreg 0x2142</code> দিলে NVRAM বাইপাস হবে এবং পুরানো কনফিগ অক্ষত থাকবে।</p>
              <p>৩. পাসওয়ার্ড পরিবর্তনের পর অবশ্যই <code className="text-cyan-400">config-register 0x2102</code> দিয়ে সেভ করবেন।</p>
            </div>
          )}
        </div>

        {/* Generated Code Terminal Output */}
        <div className="lg:col-span-7 flex flex-col">
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex flex-col h-full shadow-inner">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                <span className="text-xs text-slate-400 font-mono ml-2">Cisco_CLI_Terminal</span>
              </div>
              <span className="text-[11px] text-slate-400">IOS Ready-to-Paste</span>
            </div>

            <pre className="flex-1 p-5 text-emerald-400 font-mono text-xs sm:text-sm overflow-x-auto selection:bg-emerald-800 selection:text-white leading-relaxed">
              {codeString}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
