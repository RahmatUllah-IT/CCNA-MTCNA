export interface CommandItem {
  id: string;
  level: 'Basic' | 'Intermediate' | 'Advance';
  topic: string;
  topicEn: string;
  title: string;
  titleEn: string;
  description: string;
  whenToUse: string;
  syntax: string;
  exampleCli: string;
  verificationCommands?: string[];
  tags: string[];
}

export const CISCO_COMMANDS_MASTER: CommandItem[] = [
  // ===================== BASIC (LEVEL 1) =====================
  {
    id: 'cmd-modes-navigation',
    level: 'Basic',
    topic: 'রাউটার ও সুইচ মোডস',
    topicEn: 'Router & Switch Modes',
    title: 'সিএলআই মোড পরিবর্তন ও নেভিগেশন',
    titleEn: 'CLI Modes Navigation',
    description: 'সিসকো ডিভাইসে User EXEC (>), Privileged EXEC (#), এবং Global Configuration ((config)#) মোডের মধ্যে যাতায়াত।',
    whenToUse: 'ডিভাইস বুট হওয়ার পর কনফিগারেশন করার জন্য বা শো কমান্ড চালানোর জন্য।',
    syntax: `Router> enable
Router# configure terminal
Router(config)# exit / end
Router# disable`,
    exampleCli: `Router> enable
Router# configure terminal
Router(config)# ! এখন আপনি গ্লোবাল কনফিগারেশন মোডে আছেন
Router(config)# exit
Router# disable`,
    verificationCommands: ['show privilege', 'show version'],
    tags: ['Modes', 'Enable', 'Config Terminal', 'User Exec', 'Privileged']
  },
  {
    id: 'cmd-hostname-banner',
    level: 'Basic',
    topic: 'ডিভাইস আইডেন্টিটি',
    topicEn: 'Device Identity',
    title: 'হোস্টনেম ও লগইন ব্যানার সেট করা',
    titleEn: 'Hostname & MOTD Banner',
    description: 'রাউটার বা সুইচের নাম পরিবর্তন করা এবং অননুমোদিত প্রবেশ রোধে সতর্কবার্তা ব্যানার যোগ করা।',
    whenToUse: 'প্রতিটি নতুন রাউটার বা সুইচ নেটওয়ার্কে যুক্ত করার সময় শুরুতে চিহ্নিত করার জন্য।',
    syntax: `Router(config)# hostname <NEW_HOSTNAME>
Router(config)# banner motd # <WARNING_MESSAGE> #`,
    exampleCli: `Router# configure terminal
Router(config)# hostname Core_Gateway_R1
Core_Gateway_R1(config)# banner motd # AUTHORIZED ACCESS ONLY! VIOLATORS WILL BE PROSECUTED. #
Core_Gateway_R1(config)# exit`,
    verificationCommands: ['show running-config | include hostname'],
    tags: ['Hostname', 'Banner MOTD', 'Identity', 'Naming']
  },
  {
    id: 'cmd-interface-addressing',
    level: 'Basic',
    topic: 'ইন্টারফেস কনফিগারেশন',
    topicEn: 'Interface Configuration',
    title: 'ইন্টারফেসে আইপি সেট ও সচল করা (No Shutdown)',
    titleEn: 'Interface IP Assignment & Bring Up',
    description: 'রাউটারের গিগাবিট বা ফাস্ট-ইথারনেট পোর্টে আইপি এড্রেস এবং সাবনেট মাস্ক বসিয়ে পোর্ট চালু করা।',
    whenToUse: 'রাউটারের যেকোনো পোর্টে নেটওয়ার্ক ক্যাবল যুক্ত করার পর ডাটা চলাচলের পথ তৈরির জন্য।',
    syntax: `Router(config)# interface <interface_name>
Router(config-if)# ip address <ip_address> <subnet_mask>
Router(config-if)# no shutdown
Router(config-if)# exit`,
    exampleCli: `Router# configure terminal
Router(config)# interface GigabitEthernet0/0
Router(config-if)# description Connected to LAN Switch 1
Router(config-if)# ip address 192.168.10.1 255.255.255.0
Router(config-if)# no shutdown
Router(config-if)# exit`,
    verificationCommands: ['show ip interface brief', 'show interfaces GigabitEthernet0/0'],
    tags: ['Interface', 'IP Address', 'No Shutdown', 'GigabitEthernet', 'FastEthernet']
  },
  {
    id: 'cmd-save-reload',
    level: 'Basic',
    topic: 'মেমোরি ও কনফিগারেশন সংরক্ষণ',
    topicEn: 'Memory Management',
    title: 'কনফিগারেশন সংরক্ষণ (Save Config) ও রিলোড',
    titleEn: 'Saving Running Config to NVRAM',
    description: 'RAM এর রানিং কনফিগকে NVRAM এর স্টার্টআপ কনফিগে স্থায়ীভাবে সেভ করা যাতে পাওয়ার অফ হলেও না মুছে যায়।',
    whenToUse: 'যেকোনো কনফিগারেশন শেষ করার সাথে সাথে বাধ্যতামূলকভাবে সেভ করতে হয়।',
    syntax: `Router# write memory (বা wr)
Router# copy running-config startup-config
Router# reload`,
    exampleCli: `Router# copy running-config startup-config
Destination filename [startup-config]? [Enter]
Building configuration...
[OK]
! অথবা সংক্ষেপে:
Router# write memory
! গ্লোবাল মোড থেকে চালাতে:
Router(config)# do write memory`,
    verificationCommands: ['show startup-config'],
    tags: ['Write Memory', 'Copy Run Start', 'NVRAM', 'Reload']
  },
  {
    id: 'cmd-basic-troubleshoot',
    level: 'Basic',
    topic: 'ভেরিফিকেশন ও ট্রাবলশুটিং',
    topicEn: 'Verification & Diagnostics',
    title: 'বেসিক শো কমান্ড ও পিং টেস্ট',
    titleEn: 'Essential Show Commands & Ping',
    description: 'পোর্টের স্ট্যাটাস, রাউটিং টেবিল ও কানেক্টিভিটি চেক করার দ্রুততম কমান্ডসমূহ।',
    whenToUse: 'ল্যাব চলাকালীন কোনো সমস্যা হলে বা কনফিগারেশন যাচাই করার সময়।',
    syntax: `Router# show ip interface brief
Router# show ip route
Router# ping <target_ip>
Router# traceroute <target_ip>`,
    exampleCli: `Router# show ip interface brief
! Interface              IP-Address      OK? Method Status                Protocol
! GigabitEthernet0/0     192.168.10.1    YES manual up                    up
Router# ping 192.168.10.2
! Sending 5, 100-byte ICMP Echos to 192.168.10.2, timeout is 2 seconds:
! !!!!!
! Success rate is 100 percent (5/5)`,
    verificationCommands: ['show ip interface brief', 'show ip route'],
    tags: ['Show IP Int Brief', 'Ping', 'Traceroute', 'Verification']
  },

  // ===================== INTERMEDIATE (LEVEL 2) =====================
  {
    id: 'cmd-dhcp-server',
    level: 'Intermediate',
    topic: 'DHCP সার্ভার',
    topicEn: 'DHCP Server',
    title: 'সিসকো রাউটারে সম্পূর্ণ DHCP সার্ভার সেটআপ',
    titleEn: 'Cisco IOS DHCP Server Setup',
    description: 'রাউটারে ডিএইচসিপি পুল গঠন, ক্লায়েন্টদের আইপি, গেটওয়ে ও ডিএনএস বিতরণ এবং নিজস্ব আইপি এক্সক্লুড করা।',
    whenToUse: 'ম্যানুয়ালি প্রতিটি পিসিতে আইপি না বসিয়ে স্বয়ংক্রিয়ভাবে ১০০+ ডিভাইসে আইপি দেওয়ার জন্য।',
    syntax: `Router(config)# ip dhcp excluded-address <start_ip> <end_ip>
Router(config)# ip dhcp pool <POOL_NAME>
Router(dhcp-config)# network <network_ip> <subnet_mask>
Router(dhcp-config)# default-router <gateway_ip>
Router(dhcp-config)# dns-server <dns_ip>
Router(dhcp-config)# exit`,
    exampleCli: `Router# configure terminal
! ১. গেটওয়ে এবং সার্ভারের জন্য প্রথম ১০টি আইপি সংরক্ষিত রাখুন
Router(config)# ip dhcp excluded-address 192.168.10.1 192.168.1.10

! ২. পুল তৈরি করুন
Router(config)# ip dhcp pool IT_OFFICE_POOL
Router(dhcp-config)# network 192.168.10.0 255.255.255.0
Router(dhcp-config)# default-router 192.168.10.1
Router(dhcp-config)# dns-server 8.8.8.8
Router(dhcp-config)# exit`,
    verificationCommands: ['show ip dhcp binding', 'show ip dhcp pool', 'show ip dhcp conflict'],
    tags: ['DHCP', 'DHCP Pool', 'Excluded Address', 'Default Router', 'DNS']
  },
  {
    id: 'cmd-vlan-access',
    level: 'Intermediate',
    topic: 'সুইচিং ও VLAN',
    topicEn: 'Switching & VLAN',
    title: 'সুইচে VLAN তৈরি ও এক্সেস পোর্ট অ্যাসাইন করা',
    titleEn: 'VLAN Creation & Access Port Assignment',
    description: 'সুইচে নতুন VLAN ডেটাবেস এন্ট্রি করা এবং নির্দিষ্ট কম্পিউটার সংযুক্ত পোর্টে এক্সেস মোড চালু করা।',
    whenToUse: 'এইচআর, আইটি বা অ্যাকাউন্টসের কম্পিউটারগুলোকে একই সুইচে থেকেও পৃথক ব্রডকাস্ট ডোমেইনে রাখতে।',
    syntax: `Switch(config)# vlan <vlan_id>
Switch(config-vlan)# name <vlan_name>
Switch(config-vlan)# exit
Switch(config)# interface <port_name> / range <port_range>
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan <vlan_id>`,
    exampleCli: `Switch# configure terminal
Switch(config)# vlan 10
Switch(config-vlan)# name HR_Dept
Switch(config-vlan)# exit

Switch(config)# vlan 20
Switch(config-vlan)# name Accounts_Dept
Switch(config-vlan)# exit

! Assign ports Fa0/1 through Fa0/5 to VLAN 10
Switch(config)# interface range FastEthernet0/1 - 5
Switch(config-if-range)# switchport mode access
Switch(config-if-range)# switchport access vlan 10
Switch(config-if-range)# exit`,
    verificationCommands: ['show vlan brief', 'show vlan id 10'],
    tags: ['VLAN', 'Access Port', 'Switchport', 'VLAN Name']
  },
  {
    id: 'cmd-vlan-trunk',
    level: 'Intermediate',
    topic: 'সুইচিং ও VLAN',
    topicEn: 'Switching & VLAN',
    title: '802.1Q ট্রাঙ্ক পোর্ট কনফিগারেশন (Trunking)',
    titleEn: '802.1Q Trunk Port Configuration',
    description: 'দুটি সুইচ বা সুইচ-রাউটার লিংকে সব VLAN এর ফ্রেম ট্যাগ সহ আদান-প্রদান করতে ট্রাঙ্ক পোর্ট তৈরি।',
    whenToUse: 'একাধিক সুইচের মধ্যে একই VLAN এর ট্রাফিক পাঠানোর সময় ইন্টার-সুইচ লিংকে।',
    syntax: `Switch(config)# interface <interface_name>
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan <vlan_list | all>
Switch(config-if)# switchport trunk native vlan <native_vlan_id>`,
    exampleCli: `Switch# configure terminal
Switch(config)# interface GigabitEthernet0/1
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20,30
Switch(config-if)# no shutdown
Switch(config-if)# exit`,
    verificationCommands: ['show interfaces trunk', 'show interface g0/1 switchport'],
    tags: ['Trunk', '802.1Q', 'Native VLAN', 'Allowed VLAN']
  },
  {
    id: 'cmd-roas-intervlan',
    level: 'Intermediate',
    topic: 'ইন্টার-ভিল্যান রাউটিং',
    topicEn: 'Inter-VLAN Routing',
    title: 'Router-on-a-Stick (ROAS) সাব-ইন্টারফেস কনফিগারেশন',
    titleEn: 'Router-on-a-Stick (ROAS) with dot1Q',
    description: 'রাউটারের একটিমাত্র ফিজিক্যাল ইন্টারফেসকে ভার্চুয়াল সাব-ইন্টারফেসে ভাগ করে ভিন্ন VLAN সমূহের মাঝে রাউটিং।',
    whenToUse: 'যখন লেয়ার ৩ সুইচ ছাড়া সাধারণ রাউটার দিয়ে VLAN 10 ও VLAN 20 এর মধ্যে যোগাযোগ করাতে হয়।',
    syntax: `Router(config)# interface <physical_if>
Router(config-if)# no shutdown
Router(config-if)# exit
Router(config)# interface <physical_if>.<sub_if_number>
Router(config-subif)# encapsulation dot1Q <vlan_id>
Router(config-subif)# ip address <gateway_ip> <subnet_mask>`,
    exampleCli: `Router# configure terminal
! ১. ফিজিক্যাল পোর্ট আপ করুন
Router(config)# interface GigabitEthernet0/0
Router(config-if)# no shutdown
Router(config-if)# exit

! ২. VLAN 10 এর জন্য সাব-ইন্টারফেস
Router(config)# interface GigabitEthernet0/0.10
Router(config-subif)# encapsulation dot1Q 10
Router(config-subif)# ip address 192.168.10.1 255.255.255.0
Router(config-subif)# exit

! ৩. VLAN 20 এর জন্য সাব-ইন্টারফেস
Router(config)# interface GigabitEthernet0/0.20
Router(config-subif)# encapsulation dot1Q 20
Router(config-subif)# ip address 192.168.20.1 255.255.255.0
Router(config-subif)# exit`,
    verificationCommands: ['show ip route', 'show vlans', 'show ip interface brief'],
    tags: ['Inter-VLAN', 'ROAS', 'Sub-interface', 'dot1Q', 'Encapsulation']
  },
  {
    id: 'cmd-static-routing',
    level: 'Intermediate',
    topic: 'রাউটিং প্রোটোকল',
    topicEn: 'Routing Protocols',
    title: 'স্ট্যাটিক রাউটিং ও ডিফল্ট রাউট (0.0.0.0/0)',
    titleEn: 'Static Route & Default Gateway of Last Resort',
    description: 'গন্তব্য নেটওয়ার্কের জন্য ম্যানুয়ালি নেক্সট-হপ আইপি নির্ধারণ এবং ইন্টারনেটের জন্য ডিফল্ট রাউট তৈরি।',
    whenToUse: 'ছোট নেটওয়ার্কে কম ব্যান্ডউইথ খরচ করে সুরক্ষিত পাথ তৈরি এবং আইএসপি রাউটারে যাওয়ার জন্য।',
    syntax: `Router(config)# ip route <dest_network> <subnet_mask> <next_hop_ip | exit_interface>
Router(config)# ip route 0.0.0.0 0.0.0.0 <isp_gateway_ip>`,
    exampleCli: `Router# configure terminal
! নির্দিষ্ট ব্রাঞ্চে যাওয়ার স্ট্যাটিক রাউট:
Router(config)# ip route 192.168.20.0 255.255.255.0 10.10.10.2

! ইন্টারনেটে ট্রাফিক পাঠানোর ডিফল্ট রাউট:
Router(config)# ip route 0.0.0.0 0.0.0.0 203.0.113.1
Router(config)# exit`,
    verificationCommands: ['show ip route', 'show ip route static'],
    tags: ['Static Route', 'Default Route', '0.0.0.0/0', 'Next Hop', 'AD 1']
  },
  {
    id: 'cmd-ripv2-routing',
    level: 'Intermediate',
    topic: 'রাউটিং প্রোটোকল',
    topicEn: 'Routing Protocols',
    title: 'RIPv2 ডাইনামিক রাউটিং কনফিগারেশন',
    titleEn: 'RIPv2 Dynamic Routing Setup',
    description: 'Routing Information Protocol v2 সক্রিয় করা, সাবনেট মাস্ক বজায় রাখতে no auto-summary দেওয়া।',
    whenToUse: 'ছোট লিগ্যাসি নেটওয়ার্কে রাউটারগুলোর মাঝে স্বয়ংক্রিয়ভাবে রাউটিং টেবিল শেয়ার করার জন্য।',
    syntax: `Router(config)# router rip
Router(config-router)# version 2
Router(config-router)# no auto-summary
Router(config-router)# network <classful_network_id>`,
    exampleCli: `Router# configure terminal
Router(config)# router rip
Router(config-router)# version 2
Router(config-router)# no auto-summary
Router(config-router)# network 192.168.10.0
Router(config-router)# network 10.0.0.0
Router(config-router)# exit`,
    verificationCommands: ['show ip route rip', 'show ip protocols'],
    tags: ['RIP', 'RIPv2', 'no auto-summary', 'Distance Vector', 'AD 120']
  },
  {
    id: 'cmd-ospf-single-area',
    level: 'Intermediate',
    topic: 'রাউটিং প্রোটোকল',
    topicEn: 'Routing Protocols',
    title: 'OSPF সিঙ্গেল এরিয়া (Area 0) কনফিগারেশন',
    titleEn: 'OSPF Single Area 0 Setup',
    description: 'ওপেন শর্টেস্ট পাথ ফার্স্ট চালু করা, রাউটার-আইডি সেট এবং ওয়াইল্ডকার্ড মাস্ক দিয়ে ব্যাকবোন এরিয়ায় নেটওয়ার্ক ঘোষণা।',
    whenToUse: 'বর্তমান আধুনিক এন্টারপ্রাইজ নেটওয়ার্কে হাই-স্পিড ও লুপ-ফ্রি লিংক-স্টেট রাউটিংয়ের জন্য।',
    syntax: `Router(config)# router ospf <process_id>
Router(config-router)# router-id <router_id_ip>
Router(config-router)# network <network_ip> <wildcard_mask> area 0`,
    exampleCli: `Router# configure terminal
Router(config)# router ospf 10
Router(config-router)# router-id 1.1.1.1
! ওয়াইল্ডকার্ড মাস্ক: 255.255.255.0 এর বিপরীত 0.0.0.255
Router(config-router)# network 192.168.10.0 0.0.0.255 area 0
! পয়েন্ট-টু-পয়েন্ট লিংক /30 (255.255.255.252 -> 0.0.0.3)
Router(config-router)# network 10.10.10.0 0.0.0.3 area 0
Router(config-router)# exit`,
    verificationCommands: ['show ip ospf neighbor', 'show ip route ospf', 'show ip ospf interface'],
    tags: ['OSPF', 'Area 0', 'Wildcard Mask', 'Router-ID', 'Link State', 'AD 110']
  },
  {
    id: 'cmd-standard-acl',
    level: 'Intermediate',
    topic: 'নেটওয়ার্ক সিকিউরিটি',
    topicEn: 'Network Security',
    title: 'স্ট্যান্ডার্ড এক্সেস কন্ট্রোল লিস্ট (Standard ACL 1-99)',
    titleEn: 'Standard ACL Traffic Filtering',
    description: 'শুধুমাত্র সোর্স আইপি এড্রেস ফিল্টার করে নির্দিষ্ট হোস্ট বা সাবনেটকে পারমিট বা ব্লক করা।',
    whenToUse: 'গন্তব্যের কাছাকাছি নির্দিষ্ট কম্পিউটারকে অন্য নেটওয়ার্কে প্রবেশে নিষেধাজ্ঞা জারি করতে।',
    syntax: `Router(config)# access-list <1-99> <permit | deny> <source_ip | host ip | any>
Router(config)# interface <interface_name>
Router(config-if)# ip access-group <1-99> <in | out>`,
    exampleCli: `Router# configure terminal
! 192.168.10.50 পিসিকে ব্লক করুন
Router(config)# access-list 10 deny host 192.168.10.50
! বাকি সবাইকে পারমিট দিন (ইমপ্লিসিট ডিনাই এড়াতে)
Router(config)# access-list 10 permit any

! ইন্টারফেসে গন্তব্যের দিকে আউটবাউন্ড প্রয়োগ
Router(config)# interface GigabitEthernet0/1
Router(config-if)# ip access-group 10 out
Router(config-if)# exit`,
    verificationCommands: ['show access-lists', 'show ip interface g0/1'],
    tags: ['Standard ACL', 'Access-List', 'Permit Any', 'Deny Host', 'Security']
  },
  {
    id: 'cmd-static-nat',
    level: 'Intermediate',
    topic: 'ন্যাট (NAT)',
    topicEn: 'Network Address Translation',
    title: 'স্ট্যাটিক ন্যাট ১:১ ম্যাপিং (Static NAT)',
    titleEn: 'Static 1:1 NAT Configuration',
    description: 'লোকাল প্রাইভেট আইপিকে একটি নির্দিষ্ট পাবলিক আইপিতে পার্মানেন্টভাবে রূপান্তর করা।',
    whenToUse: 'প্রতিষ্ঠানের ভেতরের ওয়েব বা ডাটাবেস সার্ভারকে ইন্টারনেটের জন্য উন্মুক্ত করতে।',
    syntax: `Router(config)# ip nat inside source static <local_ip> <global_public_ip>
Router(config-if)# ip nat inside  (লোকাল ইন্টারফেসে)
Router(config-if)# ip nat outside (ইন্টারনেট ইন্টারফেসে)`,
    exampleCli: `Router# configure terminal
Router(config)# ip nat inside source static 192.168.10.100 203.0.113.15

Router(config)# interface GigabitEthernet0/0
Router(config-if)# ip nat inside
Router(config-if)# exit

Router(config)# interface GigabitEthernet0/1
Router(config-if)# ip nat outside
Router(config-if)# exit`,
    verificationCommands: ['show ip nat translations', 'show ip nat statistics'],
    tags: ['Static NAT', '1:1 Mapping', 'Inside Local', 'Inside Global']
  },
  {
    id: 'cmd-port-security',
    level: 'Intermediate',
    topic: 'সুইচ সিকিউরিটি',
    topicEn: 'Switch Security',
    title: 'সুইচ পোর্ট সিকিউরিটি ও স্টিকি ম্যাক (Port Security)',
    titleEn: 'Switch Port Security & Sticky MAC',
    description: 'সুইচের পোর্টে অননুমোদিত ডিভাইস প্লাগ করলেই পোর্ট স্বয়ংক্রিয়ভাবে বন্ধ (Shutdown) বা ড্রপ করা।',
    whenToUse: 'অফিসের দেওয়ালে থাকা ল্যান পোর্টে কেউ নিজের আন-অথরাইজড ল্যাপটপ কানেক্ট করলে পোর্ট ব্লক করতে।',
    syntax: `Switch(config-if)# switchport mode access
Switch(config-if)# switchport port-security
Switch(config-if)# switchport port-security maximum <1-132>
Switch(config-if)# switchport port-security mac-address sticky
Switch(config-if)# switchport port-security violation <shutdown | restrict | protect>`,
    exampleCli: `Switch# configure terminal
Switch(config)# interface FastEthernet0/5
Switch(config-if)# switchport mode access
Switch(config-if)# switchport port-security
Switch(config-if)# switchport port-security maximum 1
Switch(config-if)# switchport port-security mac-address sticky
Switch(config-if)# switchport port-security violation shutdown
Switch(config-if)# exit`,
    verificationCommands: ['show port-security interface f0/5', 'show port-security address'],
    tags: ['Port Security', 'Sticky MAC', 'Violation Shutdown', 'Layer 2 Security']
  },

  // ===================== ADVANCE (LEVEL 3) =====================
  {
    id: 'cmd-extended-acl',
    level: 'Advance',
    topic: 'নেটওয়ার্ক সিকিউরিটি',
    topicEn: 'Network Security',
    title: 'এক্সটেন্ডেড এসিএল (Extended ACL 100-199 Port Filtering)',
    titleEn: 'Extended ACL Port & Protocol Filtering',
    description: 'সোর্স, ডেস্টিনেশন, প্রোটোকল (TCP/UDP/ICMP) এবং পোর্ট নম্বর (HTTP 80, SSH 22, Ping) ফিল্টারিং।',
    whenToUse: 'কোনো কম্পিউটার যেন নির্দিষ্ট সার্ভারের ওয়েব পোর্ট ৮০ ব্রাউজ না করতে পারে কিন্তু পিং চালু থাকে।',
    syntax: `Router(config)# access-list <100-199> <permit | deny> <protocol> <source> <wildcard> <destination> <wildcard> eq <port_number>
Router(config-if)# ip access-group <100-199> in`,
    exampleCli: `Router# configure terminal
! ১. 192.168.10.0 ল্যান থেকে ওয়েব সার্ভার 10.10.10.50 এর পোর্ট ৮০ (HTTP) ব্লক
Router(config)# access-list 101 deny tcp 192.168.10.0 0.0.0.255 host 10.10.10.50 eq 80

! ২. কিন্তু পিং (ICMP) টেস্ট করতে দিন
Router(config)# access-list 101 permit icmp 192.168.10.0 0.0.0.255 host 10.10.10.50

! ৩. বাকি সকল ট্রাফিক স্বাভাবিকভাবে চলতে দিন
Router(config)# access-list 101 permit ip any any

! ৪. সোর্সের নিকটবর্তী ইনবাউন্ড পোর্টে বসান
Router(config)# interface GigabitEthernet0/0
Router(config-if)# ip access-group 101 in
Router(config-if)# exit`,
    verificationCommands: ['show access-lists 101'],
    tags: ['Extended ACL', '100-199', 'Port 80', 'TCP Filtering', 'ICMP', 'Firewall']
  },
  {
    id: 'cmd-pat-overload',
    level: 'Advance',
    topic: 'ন্যাট (NAT)',
    topicEn: 'Network Address Translation',
    title: 'প্যাট / ডাইনামিক ন্যাট ওভারলোড (PAT / NAT Overload)',
    titleEn: 'PAT / NAT Overload Dynamic Sharing',
    description: 'পুরো লোকাল নেটওয়ার্কের শত শত কম্পিউটারকে রাউটারের একটিমাত্র পাবলিক আইপি দিয়ে ইন্টারনেট শেয়ারিং।',
    whenToUse: 'বাসা, অফিস ও ক্যাম্পাসে শত শত ডিভাইসে ইন্টারনেট ব্রাউজিং নিশ্চিত করতে।',
    syntax: `Router(config)# access-list <acl_no> permit <network_ip> <wildcard_mask>
Router(config)# ip nat inside source list <acl_no> interface <outside_if> overload
Router(config-if)# ip nat inside / outside`,
    exampleCli: `Router# configure terminal
! ১. লোকাল ল্যানকে পারমিট করে এক্সেস-লিস্ট বানান
Router(config)# access-list 1 permit 192.168.10.0 0.0.0.255

! ২. বহির্গামী WAN ইন্টারফেসে ওভারলোড সক্রিয় করুন
Router(config)# ip nat inside source list 1 interface GigabitEthernet0/1 overload

! ৩. ইন্টারফেস চিহ্নিত করুন
Router(config)# interface GigabitEthernet0/0
Router(config-if)# ip nat inside
Router(config-if)# exit

Router(config)# interface GigabitEthernet0/1
Router(config-if)# ip nat outside
Router(config-if)# exit`,
    verificationCommands: ['show ip nat translations', 'show ip nat statistics'],
    tags: ['PAT', 'NAT Overload', 'Port Address Translation', 'ACL Overload']
  },
  {
    id: 'cmd-ssh-v2',
    level: 'Advance',
    topic: 'ডিভাইস এডমিনিস্ট্রেশন',
    topicEn: 'Device Administration',
    title: 'এনক্রিপ্টেড SSHv2 রিমোট ম্যানেজমেন্ট সেটআপ',
    titleEn: 'Secure SSHv2 Remote Access with RSA 1024',
    description: 'টেলনেটের প্লেইনটেক্সট দুর্বলতা দূর করে ১০২৪ বা ২০৪৮ বিট RSA কী ও লোকাল এডমিন ইউজার দিয়ে সুরক্ষিত রিমোট এক্সেস।',
    whenToUse: 'দূর থেকে যেকোনো রাউটার বা সুইচে পুটি (PuTTY) বা টার্মিনাল দিয়ে নিরাপদে লগইন করার জন্য।',
    syntax: `Router(config)# hostname <name>
Router(config)# ip domain-name <domain>
Router(config)# crypto key generate rsa (1024 bits)
Router(config)# username <user> privilege 15 secret <password>
Router(config)# line vty 0 4
Router(config-line)# transport input ssh
Router(config-line)# login local
Router(config)# ip ssh version 2`,
    exampleCli: `Router# configure terminal
Router(config)# hostname Core_HQ
Core_HQ(config)# ip domain-name netlab.local
Core_HQ(config)# crypto key generate rsa
The name for the keys will be: Core_HQ.netlab.local
How many bits in the modulus [512]: 1024
% Generating 1024 bit RSA keys, keys will be non-exportable...[OK]

Core_HQ(config)# username admin privilege 15 secret Rahmat@Security2026
Core_HQ(config)# line vty 0 4
Core_HQ(config-line)# transport input ssh
Core_HQ(config-line)# login local
Core_HQ(config-line)# exit
Core_HQ(config)# ip ssh version 2`,
    verificationCommands: ['show ip ssh', 'show ssh'],
    tags: ['SSH', 'SSHv2', 'Crypto Key RSA', 'Line VTY', 'Transport Input SSH']
  },
  {
    id: 'cmd-password-hardening',
    level: 'Advance',
    topic: 'ডিভাইস এডমিনিস্ট্রেশন',
    topicEn: 'Device Administration',
    title: 'পাসওয়ার্ড হার্ডেনিং ও সার্ভিস পাসওয়ার্ড এনক্রিপশন',
    titleEn: 'Password Hardening & Service Encryption',
    description: 'কনসোল ও এনেবল সিক্রেট পাসওয়ার্ড হ্যাশ করা এবং রানিং কনফিগের সব প্লেইনটেক্সট পাসওয়ার্ড এনক্রিপ্ট করা।',
    whenToUse: 'যাতে কোনো ইঞ্জিনিয়ার বা হ্যাকার show run চালিয়ে পাসওয়ার্ড দেখতে না পারে।',
    syntax: `Router(config)# enable secret <strong_password>
Router(config)# service password-encryption
Router(config)# line console 0
Router(config-line)# password <console_password>
Router(config-line)# login`,
    exampleCli: `Router# configure terminal
Router(config)# enable secret Cisco@TopSecret#2026
Router(config)# service password-encryption

Router(config)# line console 0
Router(config-line)# password ConsoleLock@789
Router(config-line)# login
Router(config-line)# exit`,
    verificationCommands: ['show running-config | include password', 'show running-config | include enable'],
    tags: ['Enable Secret', 'Console Password', 'Service Password-Encryption', 'Hardening']
  },
  {
    id: 'cmd-rommon-recovery',
    level: 'Advance',
    topic: 'পাসওয়ার্ড রিকভারি',
    topicEn: 'Password Recovery & Forensics',
    title: 'সিসকো রমমন পাসওয়ার্ড ব্রেকিং (ROMMON 0x2142 Recovery)',
    titleEn: 'ROMmon 0x2142 Configuration Bypass Recovery',
    description: 'পাসওয়ার্ড ভুলে গেলে রাউটার রিসেট না করে কনফিগারেশন রেজিস্টার 0x2142 দিয়ে NVRAM বাইপাস করে পাসওয়ার্ড রিসেট ও ডাটা রিকভারি।',
    whenToUse: 'রাউটারের অ্যাডমিন পাসওয়ার্ড হারিয়ে গেলে কিন্তু ভেতরে মূল্যবান কনফিগারেশন অক্ষত রাখতে হলে।',
    syntax: `rommon 1 > confreg 0x2142
rommon 2 > reset
Router> enable
Router# copy startup-config running-config
Router(config)# enable secret <NEW_PASSWORD>
Router(config)# config-register 0x2102
Router(config)# exit
Router# copy running-config startup-config
Router# reload`,
    exampleCli: `! ১. রাউটার বুট হওয়ার সময় Ctrl + Break বা Pause টিপে ROMMON মোডে যান:
rommon 1 > confreg 0x2142
rommon 2 > reset

! ২. রাউটার রিবুট হওয়ার পর ডায়ালগ আসলে "no" লিখুন:
Router> enable
Router# copy startup-config running-config

! ৩. এবার আপনার নতুন পাসওয়ার্ড সেট করুন:
Router# configure terminal
Router(config)# enable secret RahmatNewPass@2026

! ৪. কনফিগারেশন রেজিস্টার পুনরায় নরমাল মোড 0x2102 এ ফিরিয়ে আনুন:
Router(config)# config-register 0x2102
Router(config)# exit
Router# copy running-config startup-config
Router# reload`,
    verificationCommands: ['show version | include Configuration register'],
    tags: ['ROMMON', '0x2142', '0x2102', 'confreg', 'Password Break', 'Data Recovery']
  },
  {
    id: 'cmd-etherchannel-lacp',
    level: 'Advance',
    topic: 'সুইচিং ও রিডান্ড্যান্সি',
    topicEn: 'Switching & Redundancy',
    title: 'ইথারচ্যানেল লিংক এগ্রিগেশন (EtherChannel LACP 802.3ad)',
    titleEn: 'EtherChannel Link Aggregation (LACP)',
    description: 'দুটি বা চারটি ফিজিক্যাল লিংককে একত্রিত করে একক ভার্চুয়াল Port-Channel বান্ডেল তৈরি করে ব্যান্ডউইথ ও ব্যাকআপ বাড়ানো।',
    whenToUse: 'কোর সুইচ ও ডিস্ট্রিবিউশন সুইচের মধ্যবর্তী লিংকে উচ্চ ট্রাফিকের জন্য ও এসটিপি ব্লকিং ঠেকাতে।',
    syntax: `Switch(config)# interface range <port_range>
Switch(config-if-range)# channel-group <channel_number> mode active
Switch(config-if-range)# exit
Switch(config)# interface port-channel <channel_number>
Switch(config-if)# switchport mode trunk`,
    exampleCli: `Switch# configure terminal
Switch(config)# interface range FastEthernet0/1 - 2
Switch(config-if-range)# channel-group 1 mode active
Switch(config-if-range)# exit

Switch(config)# interface port-channel 1
Switch(config-if)# switchport mode trunk
Switch(config-if)# exit`,
    verificationCommands: ['show etherchannel summary', 'show etherchannel port-channel'],
    tags: ['EtherChannel', 'LACP', 'Port-Channel', 'Active Mode', 'High Availability']
  },
  {
    id: 'cmd-ospf-multi-area',
    level: 'Advance',
    topic: 'রাউটিং প্রোটোকল',
    topicEn: 'Routing Protocols',
    title: 'OSPF মাল্টি এরিয়া ব্যাকবোন আর্কিটেকচার (Area 0, 1, 2)',
    titleEn: 'OSPF Multi-Area Backbone & ABR Deployment',
    description: 'বড় নেটওয়ার্কে রাউটিং টেবিল ছোট রাখতে ব্যাকবোন Area 0 এর সাথে Area 1 ও Area 2 সংযুক্ত করে ABR কনফিগারেশন।',
    whenToUse: 'ক্যাম্পাস বা মাল্টি-বিল্ডিং এন্টারপ্রাইজ নেটওয়ার্কে এলএসএ ফ্লাডিং নিয়ন্ত্রণ করতে।',
    syntax: `Router(config)# router ospf <process_id>
Router(config-router)# router-id <unique_router_id>
Router(config-router)# network <network_ip> <wildcard> area <area_id>`,
    exampleCli: `! রাউটার ৪ (Backbone ABR Router connecting all areas):
Router> enable
Router# configure terminal
Router(config)# router ospf 15
Router(config-router)# router-id 4.4.4.4
! Connect to Area 0:
Router(config-router)# network 10.10.10.8 0.0.0.3 area 0
! Connect to Area 1:
Router(config-router)# network 10.10.10.4 0.0.0.3 area 1
! Connect to Area 2:
Router(config-router)# network 10.10.10.0 0.0.0.3 area 2
Router(config-router)# exit
Router(config)# do write memory`,
    verificationCommands: ['show ip ospf neighbor', 'show ip route ospf', 'show ip ospf database'],
    tags: ['OSPF Multi-Area', 'ABR', 'Area 0', 'Area 1', 'Area 2', 'Backbone']
  },
  {
    id: 'cmd-vtp-domain',
    level: 'Advance',
    topic: 'সুইচিং ও VLAN',
    topicEn: 'Switching & VLAN',
    title: 'ভিটিপি সার্ভার ও ক্লায়েন্ট মোড (VLAN Trunking Protocol)',
    titleEn: 'VTP Server & Client Domain Synchronization',
    description: 'একটি সুইচে VLAN তৈরি বা ডিলিট করলে তা যেন স্বয়ংক্রিয়ভাবে পুরো নেটওয়ার্কের সব সুইচে সিঙ্ক হয়।',
    whenToUse: '৫০+ সুইচের এন্টারপ্রাইজ নেটওয়ার্কে প্রতিটিতে আলাদা VLAN তৈরির ঝামেলা কমাতে।',
    syntax: `Switch(config)# vtp domain <domain_name>
Switch(config)# vtp password <password>
Switch(config)# vtp mode <server | client | transparent>`,
    exampleCli: `! ১. প্রাইমারি সুইচে VTP Server করুন:
Switch# configure terminal
Switch(config)# vtp domain NetMasterCorp
Switch(config)# vtp password RahmatVtpPass2026
Switch(config)# vtp mode server

! ২. অন্য সকল সুইচে VTP Client করুন:
Switch(config)# vtp domain NetMasterCorp
Switch(config)# vtp password RahmatVtpPass2026
Switch(config)# vtp mode client
Switch(config)# exit`,
    verificationCommands: ['show vtp status', 'show vtp password'],
    tags: ['VTP', 'VTP Server', 'VTP Client', 'VTP Domain', 'VLAN Sync']
  }
];
