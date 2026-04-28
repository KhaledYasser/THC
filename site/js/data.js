// Product catalog data for Technology Hall (B2B catalog — no prices shown in UI).
window.THC_CATEGORIES = [
  { id: 'printers',     name: 'Printers',           image: 'images/hp-envy-6055e.png' },
  { id: 'scanners',     name: 'Scanners',           image: 'images/fujitsu-scansnap-ix1600.png' },
  { id: 'pos',          name: 'POS Systems',        image: 'images/epson-tm-t88vi.png' },
  { id: 'ink',          name: 'Ink & Toner',        image: 'images/hp-58a-toner.png' },
  { id: 'accessories',  name: 'Accessories',        image: 'images/logitech-mx-master-3s.jpg' },
  { id: 'smarthome',    name: 'Smart Home',         image: 'images/logitech-circle-view.png' },
  { id: 'surveillance', name: 'Video Surveillance', image: 'images/honeywell-dome-camera.png' },
  { id: 'networking',   name: 'Networking',         image: 'images/hp-aruba-ap22.png' }
];

window.THC_BRANDS = ['CANON', 'EPSON', 'HP', 'ZEBRA', 'HONEYWELL', 'FUJITSU', 'LOGITECH'];

window.THC_PRODUCTS = [
  { id: 'p1',  brand: 'HP',        category: 'printers',     name: 'HP LaserJet Pro M404n',
    image: 'images/hp-m404n.jpg',
    description: 'Fast, reliable monochrome laser printer ideal for small and medium businesses. Print speeds up to 40 ppm with built-in Ethernet networking.' },
  { id: 'p2',  brand: 'ZEBRA',     category: 'scanners',     name: 'Zebra DS2208 Barcode Scanner',
    image: 'images/zebra-ds2208.png',
    description: 'Handheld 1D/2D imager scanner with omnidirectional scanning for retail and healthcare environments.' },
  { id: 'p3',  brand: 'LOGITECH',  category: 'accessories',  name: 'Logitech MX Master 3S',
    image: 'images/logitech-mx-master-3s.jpg',
    description: 'Advanced wireless mouse with ultra-quiet clicks, 8K DPI tracking and customizable buttons.' },
  { id: 'p4',  brand: 'CANON',     category: 'printers',     name: 'Canon PIXMA G6020',
    image: 'images/canon-pixma-g6020.png',
    description: 'MegaTank all-in-one wireless printer with high-yield refillable ink tanks for low-cost, high-volume printing.' },
  { id: 'p5',  brand: 'HONEYWELL', category: 'scanners',     name: 'Honeywell Voyager 1200g',
    image: 'images/honeywell-voyager-1200g.png',
    description: 'Durable single-line laser barcode scanner built for retail point-of-sale environments.' },
  { id: 'p6',  brand: 'FUJITSU',   category: 'scanners',     name: 'Fujitsu ScanSnap iX1600',
    image: 'images/fujitsu-scansnap-ix1600.png',
    description: '4.3-inch touchscreen document scanner with Wi-Fi, 40 ppm duplex scanning and cloud integration.' },
  { id: 'p7',  brand: 'HP',        category: 'ink',          name: 'HP 58A Black Toner Cartridge',
    image: 'images/hp-58a-toner.png',
    description: 'Genuine HP 58A black toner cartridge delivering approximately 3,000 pages per cartridge.' },
  { id: 'p8',  brand: 'ZEBRA',     category: 'printers',     name: 'Zebra ZD421 Thermal Printer',
    image: 'images/zebra-zd421.png',
    description: 'Desktop direct-thermal label printer — ideal for shipping, labeling, and healthcare applications.' },
  { id: 'p9',  brand: 'EPSON',     category: 'printers',     name: 'Epson EcoTank ET-4760',
    image: 'images/epson-ecotank-et4760.png',
    description: 'Cartridge-free all-in-one SuperTank printer with automatic 2-sided printing and ADF.' },
  { id: 'p10', brand: 'CANON',     category: 'scanners',     name: 'Canon imageFORMULA R40',
    image: 'images/canon-imageformula-r40.png',
    description: 'Compact desktop document scanner, 40 ppm, perfect for small-to-medium business document capture.' },
  { id: 'p11', brand: 'HP',        category: 'printers',     name: 'HP ENVY 6055e',
    image: 'images/hp-envy-6055e.png',
    description: 'Wireless all-in-one color inkjet printer with HP+ smart features and Instant Ink ready.' },
  { id: 'p12', brand: 'ZEBRA',     category: 'scanners',     name: 'Zebra LS2208 Barcode Scanner',
    image: 'images/zebra-ls2208.png',
    description: 'Reliable handheld 1D laser scanner for retail, commercial and light-industrial applications.' },
  { id: 'p13', brand: 'LOGITECH',  category: 'accessories',  name: 'Logitech MX Keys S Keyboard',
    image: 'images/logitech-mx-keys-s.png',
    description: 'Advanced wireless illuminated keyboard with smart actions and multi-device support.' },
  { id: 'p14', brand: 'CANON',     category: 'ink',          name: 'Canon PG-245XL Black Ink',
    image: 'images/canon-pg245xl.png',
    description: 'Canon high-yield black ink cartridge for select PIXMA inkjet printers.' },
  { id: 'p15', brand: 'HP',        category: 'networking',   name: 'HP Aruba Instant On AP22',
    image: 'images/hp-aruba-ap22.png',
    description: 'Wi-Fi 6 indoor access point delivering fast, secure, reliable wireless for small business.' },
  { id: 'p16', brand: 'EPSON',     category: 'pos',          name: 'Epson TM-T88VI POS Printer',
    image: 'images/epson-tm-t88vi.png',
    description: 'Industry-leading thermal receipt printer trusted by retail and hospitality worldwide.' },
  { id: 'p17', brand: 'HONEYWELL', category: 'surveillance', name: 'Honeywell HD Dome Camera',
    image: 'images/honeywell-dome-camera.png',
    description: '4 MP indoor/outdoor IP dome camera with IR night vision and H.265 compression.' },
  { id: 'p18', brand: 'LOGITECH',  category: 'smarthome',    name: 'Logitech Circle View Camera',
    image: 'images/logitech-circle-view.png',
    description: 'HomeKit Secure Video camera with 180° view and end-to-end encryption.' }
];

// Shared news content, used by both the news list and the detail page.
window.THC_NEWS = [
  {
    id: 1,
    date: 'MAR 12, 2025',
    title: 'Technology Hall Expands Distribution Network in Egypt',
    excerpt: 'We have opened two new regional distribution centers in Alexandria and Aswan to serve customers faster than ever.',
    image: 'images/server_room_hero.png',
    content: [
      'Technology Hall is proud to announce the opening of two brand-new regional distribution centers in Alexandria and Aswan. This major expansion is part of our long-term commitment to bringing enterprise-grade IT products and printing solutions closer to every customer in Egypt.',
      'With the new facilities, businesses outside the Greater Cairo area can expect same-day or next-day delivery on the majority of SKUs in our catalog — including printers, scanners, POS systems and networking hardware. Our local service engineers are also being stationed at both locations so on-site support and installations can be scheduled faster than ever before.',
      'This expansion reinforces our mission to be the most reliable technology partner for organizations across the country, from small offices to national enterprises. We would like to thank our customers and brand partners for their continued trust — it is what makes growth like this possible.'
    ]
  },
  {
    id: 2,
    date: 'FEB 28, 2025',
    title: 'New Smart Home Product Line Launching This Spring',
    excerpt: 'Our smart home catalog is expanding with intelligent lighting, thermostats and security devices from top brands.',
    image: 'images/logitech-circle-view.png',
    content: [
      'Our smart home portfolio is getting a significant upgrade this spring. Technology Hall is bringing a curated selection of intelligent lighting, connected thermostats, smart locks and HomeKit-ready security cameras from the brands our customers already know and trust.',
      'Each product has been selected to integrate cleanly with the major ecosystems — Apple Home, Google Home and Amazon Alexa — so customers can build a connected environment without lock-in. We also offer professional installation and configuration for homes and small offices that want a fully set-up experience from day one.',
      'Visit our Smart Home category to explore the full range, or contact our sales team for tailored consultation on which devices best fit your space.'
    ]
  },
  {
    id: 3,
    date: 'FEB 10, 2025',
    title: 'Exclusive HP Partnership Expands Enterprise Offerings',
    excerpt: 'A new strategic agreement with HP enables us to offer broader enterprise printing and managed print services.',
    image: 'images/hp-aruba-ap22.png',
    content: [
      'Technology Hall has entered into a renewed strategic partnership with HP that significantly expands our enterprise portfolio. The agreement unlocks deeper access to HP\'s full lineup of enterprise LaserJet devices, Aruba networking products and HP Managed Print Services (MPS) programs.',
      'Under this expanded partnership, our customers benefit from preferential pricing on high-volume deployments, priority stock allocation and direct factory support for large rollouts. Our certified engineers are already being trained on the latest platforms to ensure fast, expert implementation.',
      'If your organization is planning a print-fleet refresh or a move to managed print, our enterprise team would love to help you put together a proposal that reduces cost-per-page and improves uptime.'
    ]
  }
];
