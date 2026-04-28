// Product data for Technology Hall
window.THC_CATEGORIES = [
  { id: 'printers', name: 'Printers', image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?w=800&q=80' },
  { id: 'scanners', name: 'Scanners', image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&q=80' },
  { id: 'pos', name: 'POS Systems', image: 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&q=80' },
  { id: 'ink', name: 'Ink & Toner', image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&q=80' },
  { id: 'accessories', name: 'Accessories', image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&q=80' },
  { id: 'smarthome', name: 'Smart Home', image: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80' },
  { id: 'surveillance', name: 'Video Surveillance', image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?w=800&q=80' },
  { id: 'networking', name: 'Networking', image: 'https://images.unsplash.com/photo-1606161290889-77950cfb67d8?w=800&q=80' }
];

window.THC_BRANDS = ['CANON', 'EPSON', 'ZEBRA', 'HONEYWELL', 'FUJITSU', 'LOGITECH', 'HP'];

window.THC_PRODUCTS = [
  {
    id: 'p1', brand: 'HP', category: 'printers', name: 'HP LaserJet Pro M404n', price: 299.00, oldPrice: 349.00, rating: 4.0, reviews: 24, sale: true,
    image: 'images/hp-m404n.jpg',
    description: 'Fast, reliable monochrome laser printer ideal for small and medium businesses. Print speeds up to 40 ppm with built-in Ethernet networking.'
  },
  {
    id: 'p2', brand: 'ZEBRA', category: 'scanners', name: 'Zebra DS2208 Barcode Scanner', price: 179.00, rating: 5.0, reviews: 31,
    image: 'images/zebra-ds2208.png',
    description: 'Handheld 1D/2D imager scanner with omnidirectional scanning for retail and healthcare.'
  },
  {
    id: 'p3', brand: 'LOGITECH', category: 'accessories', name: 'Logitech MX Master 3S', price: 99.99, rating: 4.8, reviews: 48,
    image: 'images/logitech-mx-master-3s.jpg',
    description: 'Advanced wireless mouse with ultra-quiet clicks, 8K DPI tracking, and customizable buttons.'
  },
  {
    id: 'p4', brand: 'CANON', category: 'printers', name: 'Canon PIXMA G6020', price: 299.99, rating: 4.0, reviews: 18,
    image: 'images/canon-pixma-g6020.png',
    description: 'MegaTank all-in-one wireless printer with high-yield refillable ink tanks for low-cost printing.'
  },
  {
    id: 'p5', brand: 'HONEYWELL', category: 'scanners', name: 'Honeywell Voyager 1200g', price: 129.00, rating: 4.0, reviews: 15,
    image: 'images/honeywell-voyager-1200g.png',
    description: 'Durable single-line laser barcode scanner built for retail point-of-sale environments.'
  },
  {
    id: 'p6', brand: 'FUJITSU', category: 'scanners', name: 'Fujitsu ScanSnap iX1600', price: 449.00, rating: 5.0, reviews: 22,
    image: 'images/fujitsu-scansnap-ix1600.png',
    description: '4.3 inch touchscreen document scanner with Wi-Fi, 40 ppm duplex scanning, and cloud integration.'
  },
  {
    id: 'p7', brand: 'HP', category: 'ink', name: 'HP 58A Black Toner Cartridge', price: 89.99, rating: 4.0, reviews: 56,
    image: 'images/hp-58a-toner.png',
    description: 'Genuine HP 58A black toner cartridge delivering approximately 3,000 pages.'
  },
  {
    id: 'p8', brand: 'ZEBRA', category: 'printers', name: 'Zebra ZD421 Thermal Printer', price: 399.00, rating: 4.0, reviews: 12,
    image: 'images/zebra-zd421.png',
    description: 'Desktop direct thermal label printer, ideal for shipping, labeling, and healthcare applications.'
  },
  {
    id: 'p9', brand: 'EPSON', category: 'printers', name: 'Epson EcoTank ET-4760', price: 449.00, oldPrice: 499.99, rating: 4.0, reviews: 20, sale: true,
    image: 'images/epson-ecotank-et4760.png',
    description: 'Cartridge-free all-in-one supertank printer with automatic 2-sided printing and ADF.'
  },
  {
    id: 'p10', brand: 'CANON', category: 'scanners', name: 'Canon imageFORMULA R40', price: 349.00, rating: 4.0, reviews: 9,
    image: 'images/canon-imageformula-r40.png',
    description: 'Compact desktop document scanner, 40 ppm, perfect for small-to-medium business document capture.'
  },
  {
    id: 'p11', brand: 'HP', category: 'printers', name: 'HP ENVY 6055e', price: 149.99, rating: 4.0, reviews: 33,
    image: 'images/hp-envy-6055e.png',
    description: 'Wireless all-in-one color inkjet printer with HP+ smart features and 6 months of Instant Ink.'
  },
  {
    id: 'p12', brand: 'ZEBRA', category: 'scanners', name: 'Zebra LS2208 Barcode Scanner', price: 149.00, rating: 5.0, reviews: 27,
    image: 'images/zebra-ls2208.png',
    description: 'Reliable handheld 1D laser scanner for retail, commercial, and light-industrial applications.'
  },
  {
    id: 'p13', brand: 'LOGITECH', category: 'accessories', name: 'Logitech MX Keys S Keyboard', price: 109.99, rating: 4.7, reviews: 41,
    image: 'images/logitech-mx-keys-s.png',
    description: 'Advanced wireless illuminated keyboard with smart actions and multi-device support.'
  },
  {
    id: 'p14', brand: 'CANON', category: 'ink', name: 'Canon PG-245XL Black Ink', price: 34.99, rating: 4.3, reviews: 64,
    image: 'images/canon-pg245xl.png',
    description: 'Canon high-yield black ink cartridge for select PIXMA inkjet printers.'
  },
  {
    id: 'p15', brand: 'HP', category: 'networking', name: 'HP Aruba Instant On AP22', price: 179.00, rating: 4.6, reviews: 19,
    image: 'images/hp-aruba-ap22.png',
    description: 'Wi-Fi 6 indoor access point delivering fast, secure, reliable wireless for small business.'
  },
  {
    id: 'p16', brand: 'EPSON', category: 'pos', name: 'Epson TM-T88VI POS Printer', price: 429.00, rating: 4.7, reviews: 14,
    image: 'images/epson-tm-t88vi.png',
    description: 'Industry-leading thermal receipt printer trusted by retail and hospitality worldwide.'
  },
  {
    id: 'p17', brand: 'HONEYWELL', category: 'surveillance', name: 'Honeywell HD Dome Camera', price: 199.00, rating: 4.4, reviews: 11,
    image: 'images/honeywell-dome-camera.png',
    description: '4MP indoor/outdoor IP dome camera with IR night vision and H.265 compression.'
  },
  {
    id: 'p18', brand: 'LOGITECH', category: 'smarthome', name: 'Logitech Circle View Camera', price: 159.99, rating: 4.5, reviews: 22,
    image: 'images/logitech-circle-view.png',
    description: 'HomeKit Secure Video camera with 180° view and end-to-end encryption.'
  },
  {
    id: 'p19', brand: 'LOGITECH', category: 'smarthome', name: 'test', price: 159.99, rating: 4.5, reviews: 22,
    image: 'images/logitech-circle-view.png',
    description: 'test.'
  },

];

// Stripe publishable key (test). Replace after deploy with your live key if desired.
window.THC_STRIPE_PK = 'pk_test_51OZBqHHjNSG2aNoB6IqQbqMfJBvsPqRRQKRoJHeBwQNlRu1pGl5XVNXZvyzUTKNH4MqLL6kT6FbPqlJ0GV3tvN2R00tNn3Pv0y';
// Lambda Function URL to create Checkout Sessions (set after Lambda deploy).
window.THC_CHECKOUT_URL = ''; // populated at deploy time via config.js
