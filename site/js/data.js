// Product data for Technology Hall
window.THC_CATEGORIES = [
  { id: 'printers', name: 'Printers', image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&q=80' },
  { id: 'scanners', name: 'Scanners', image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80' },
  { id: 'pos', name: 'POS Systems', image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&q=80' },
  { id: 'ink', name: 'Ink & Toner', image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&q=80' },
  { id: 'business-laptops', name: 'Business Laptops', image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80' },
  { id: 'gaming-laptops', name: 'Gaming Laptops', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80' },
  { id: 'desktops', name: 'Desktops', image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80' },
  { id: 'accessories', name: 'Accessories', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80' },
  { id: 'smarthome', name: 'Smart Home', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80' },
  { id: 'surveillance', name: 'Video Surveillance', image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80' },
  { id: 'networking', name: 'Networking', image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80' }
];

window.THC_BRANDS = ['CANON', 'EPSON', 'ZEBRA', 'HONEYWELL', 'FUJITSU', 'LOGITECH', 'HP', 'DELL', 'LENOVO', 'ASUS', 'MSI'];

window.THC_PRODUCTS = [
  {
    id: 'p1', brand: 'HP', category: 'printers', name: 'HP LaserJet Pro M404n', rating: 4.0, reviews: 24, sale: true,
    image: 'images/hp-m404n.jpg',
    description: 'Fast, reliable monochrome laser printer ideal for small and medium businesses. Print speeds up to 40 ppm with built-in Ethernet networking.'
  },
  {
    id: 'p2', brand: 'ZEBRA', category: 'scanners', name: 'Zebra DS2208 Barcode Scanner', rating: 5.0, reviews: 31,
    image: 'images/zebra-ds2208.png',
    description: 'Handheld 1D/2D imager scanner with omnidirectional scanning for retail and healthcare.'
  },
  {
    id: 'p3', brand: 'LOGITECH', category: 'accessories', name: 'Logitech MX Master 3S', rating: 4.8, reviews: 48,
    image: 'images/logitech-mx-master-3s.jpg',
    description: 'Advanced wireless mouse with ultra-quiet clicks, 8K DPI tracking, and customizable buttons.'
  },
  {
    id: 'p4', brand: 'CANON', category: 'printers', name: 'Canon PIXMA G6020', rating: 4.0, reviews: 18,
    image: 'images/canon-pixma-g6020.png',
    description: 'MegaTank all-in-one wireless printer with high-yield refillable ink tanks for low-cost printing.'
  },
  {
    id: 'p5', brand: 'HONEYWELL', category: 'scanners', name: 'Honeywell Voyager 1200g', rating: 4.0, reviews: 15,
    image: 'images/honeywell-voyager-1200g.png',
    description: 'Durable single-line laser barcode scanner built for retail point-of-sale environments.'
  },
  {
    id: 'p6', brand: 'FUJITSU', category: 'scanners', name: 'Fujitsu ScanSnap iX1600', rating: 5.0, reviews: 22,
    image: 'images/fujitsu-scansnap-ix1600.png',
    description: '4.3 inch touchscreen document scanner with Wi-Fi, 40 ppm duplex scanning, and cloud integration.'
  },
  {
    id: 'p7', brand: 'HP', category: 'ink', name: 'HP 58A Black Toner Cartridge', rating: 4.0, reviews: 56,
    image: 'images/hp-58a-toner.png',
    description: 'Genuine HP 58A black toner cartridge delivering approximately 3,000 pages.'
  },
  {
    id: 'p8', brand: 'ZEBRA', category: 'printers', name: 'Zebra ZD421 Thermal Printer', rating: 4.0, reviews: 12,
    image: 'images/zebra-zd421.png',
    description: 'Desktop direct thermal label printer, ideal for shipping, labeling, and healthcare applications.'
  },
  {
    id: 'p9', brand: 'EPSON', category: 'printers', name: 'Epson EcoTank ET-4760', rating: 4.0, reviews: 20, sale: true,
    image: 'images/epson-ecotank-et4760.png',
    description: 'Cartridge-free all-in-one supertank printer with automatic 2-sided printing and ADF.'
  },
  {
    id: 'p10', brand: 'CANON', category: 'scanners', name: 'Canon imageFORMULA R40', rating: 4.0, reviews: 9,
    image: 'images/canon-imageformula-r40.png',
    description: 'Compact desktop document scanner, 40 ppm, perfect for small-to-medium business document capture.'
  },
  {
    id: 'p11', brand: 'HP', category: 'printers', name: 'HP ENVY 6055e', rating: 4.0, reviews: 33,
    image: 'images/hp-envy-6055e.png',
    description: 'Wireless all-in-one color inkjet printer with HP+ smart features and 6 months of Instant Ink.'
  },
  {
    id: 'p12', brand: 'ZEBRA', category: 'scanners', name: 'Zebra LS2208 Barcode Scanner', rating: 5.0, reviews: 27,
    image: 'images/zebra-ls2208.png',
    description: 'Reliable handheld 1D laser scanner for retail, commercial, and light-industrial applications.'
  },
  {
    id: 'p13', brand: 'LOGITECH', category: 'accessories', name: 'Logitech MX Keys S Keyboard', rating: 4.7, reviews: 41,
    image: 'images/logitech-mx-keys-s.png',
    description: 'Advanced wireless illuminated keyboard with smart actions and multi-device support.'
  },
  {
    id: 'p14', brand: 'CANON', category: 'ink', name: 'Canon PG-245XL Black Ink', rating: 4.3, reviews: 64,
    image: 'images/canon-pg245xl.png',
    description: 'Canon high-yield black ink cartridge for select PIXMA inkjet printers.'
  },
  {
    id: 'p15', brand: 'HP', category: 'networking', name: 'HP Aruba Instant On AP22', rating: 4.6, reviews: 19,
    image: 'images/hp-aruba-ap22.png',
    description: 'Wi-Fi 6 indoor access point delivering fast, secure, reliable wireless for small business.'
  },
  {
    id: 'p16', brand: 'EPSON', category: 'pos', name: 'Epson TM-T88VI POS Printer', rating: 4.7, reviews: 14,
    image: 'images/epson-tm-t88vi.png',
    description: 'Industry-leading thermal receipt printer trusted by retail and hospitality worldwide.'
  },
  {
    id: 'p17', brand: 'HONEYWELL', category: 'surveillance', name: 'Honeywell HD Dome Camera', rating: 4.4, reviews: 11,
    image: 'images/honeywell-dome-camera.png',
    description: '4MP indoor/outdoor IP dome camera with IR night vision and H.265 compression.'
  },
  {
    id: 'p18', brand: 'LOGITECH', category: 'smarthome', name: 'Logitech Circle View Camera', rating: 4.5, reviews: 22,
    image: 'images/logitech-circle-view.png',
    description: 'HomeKit Secure Video camera with 180° view and end-to-end encryption.'
  },
  {
    id: 'p20', brand: 'DELL', category: 'business-laptops', name: 'Dell Latitude 5420', rating: 4.5, reviews: 15,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&q=80',
    description: 'The world’s smallest 14-inch mainstream business-class notebook. Work faster than ever with the built-in AI of Dell Optimizer.'
  },
  {
    id: 'p21', brand: 'LENOVO', category: 'business-laptops', name: 'Lenovo ThinkPad X1 Carbon Gen 9', rating: 4.9, reviews: 42,
    image: 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&q=80',
    description: 'Premium business laptop with Ultralight & Ultra-powerful design, offering an exceptional user experience.'
  },
  {
    id: 'p22', brand: 'ASUS', category: 'gaming-laptops', name: 'ASUS ROG Zephyrus G14', rating: 4.8, reviews: 38,
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80',
    description: 'Powerful and portable 14-inch Windows 10 Pro gaming laptop with 8-core AMD Ryzen 9 and GeForce RTX graphics.'
  },
  {
    id: 'p23', brand: 'MSI', category: 'gaming-laptops', name: 'MSI Katana GF66', rating: 4.6, reviews: 25,
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    description: 'Sharp as a blade, MSI Katana GF66 is optimized to unleash true performance during gameplay.'
  },
  {
    id: 'p24', brand: 'HP', category: 'desktops', name: 'HP EliteDesk 800 G6 Mini PC', rating: 4.7, reviews: 12,
    image: 'https://images.unsplash.com/photo-1547082223-8124e188b6b5?w=800&q=80',
    description: 'Compact, secure, and manageable Mini PC with high-performance for modern workspaces.'
  },
  {
    id: 'p25', brand: 'DELL', category: 'desktops', name: 'Dell OptiPlex 7080 Tower', rating: 4.4, reviews: 18,
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=800&q=80',
    description: 'Intelligent, mainstream towers and small form factor desktops that deliver best-in-class expandability and performance.'
  }
];

// Stripe publishable key (test). Replace after deploy with your live key if desired.
window.THC_STRIPE_PK = 'pk_test_51OZBqHHjNSG2aNoB6IqQbqMfJBvsPqRRQKRoJHeBwQNlRu1pGl5XVNXZvyzUTKNH4MqLL6kT6FbPqlJ0GV3tvN2R00tNn3Pv0y';
// Lambda Function URL to create Checkout Sessions (set after Lambda deploy).
window.THC_CHECKOUT_URL = ''; // populated at deploy time via config.js
