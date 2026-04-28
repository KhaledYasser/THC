// Product catalog data for Technology Hall (B2B catalog — no prices shown in UI).
window.THC_CATEGORIES = [
  { id: 'printers',     name: { en: 'Printers', ar: 'الطابعات' },           image: 'images/hp-envy-6055e.png' },
  { id: 'scanners',     name: { en: 'Scanners', ar: 'الماسحات الضوئية' },           image: 'images/fujitsu-scansnap-ix1600.png' },
  { id: 'pos',          name: { en: 'POS Systems', ar: 'أنظمة نقاط البيع' },        image: 'images/epson-tm-t88vi.png' },
  { id: 'ink',          name: { en: 'Ink & Toner', ar: 'الحبر والبودرة' },        image: 'images/hp-58a-toner.png' },
  { id: 'accessories',  name: { en: 'Accessories', ar: 'الإكسسوارات' },        image: 'images/logitech-mx-master-3s.jpg' },
  { id: 'smarthome',    name: { en: 'Smart Home', ar: 'المنزل الذكي' },         image: 'images/logitech-circle-view.png' },
  { id: 'surveillance', name: { en: 'Video Surveillance', ar: 'المراقبة بالفيديو' }, image: 'images/honeywell-dome-camera.png' },
  { id: 'networking',   name: { en: 'Networking', ar: 'الشبكات' },         image: 'images/hp-aruba-ap22.png' }
];

window.THC_BRANDS = ['CANON', 'EPSON', 'HP', 'ZEBRA', 'HONEYWELL', 'FUJITSU', 'LOGITECH'];

window.THC_PRODUCTS = [
  { id: 'p1',  brand: 'HP',        category: 'printers',     
    name: { en: 'HP LaserJet Pro M404n', ar: 'اتش بي ليزر جيت برو M404n' },
    image: 'images/hp-m404n.jpg',
    description: { 
      en: 'Fast, reliable monochrome laser printer ideal for small and medium businesses. Print speeds up to 40 ppm with built-in Ethernet networking.',
      ar: 'طابعة ليزر أحادية اللون سريعة وموثوقة مثالية للشركات الصغيرة والمتوسطة. سرعات طباعة تصل إلى ٤٠ صفحة في الدقيقة مع شبكة إيثرنت مدمجة.'
    } 
  },
  { id: 'p2',  brand: 'ZEBRA',     category: 'scanners',     
    name: { en: 'Zebra DS2208 Barcode Scanner', ar: 'ماسح باركود زيبرا DS2208' },
    image: 'images/zebra-ds2208.png',
    description: {
      en: 'Handheld 1D/2D imager scanner with omnidirectional scanning for retail and healthcare environments.',
      ar: 'ماسح ضوئي محمول للصور أحادي وثنائي الأبعاد مع مسح ضوئي شامل لبيئات التجزئة والرعاية الصحية.'
    }
  },
  { id: 'p3',  brand: 'LOGITECH',  category: 'accessories',  
    name: { en: 'Logitech MX Master 3S', ar: 'لوجيتك MX ماستر 3S' },
    image: 'images/logitech-mx-master-3s.jpg',
    description: {
      en: 'Advanced wireless mouse with ultra-quiet clicks, 8K DPI tracking and customizable buttons.',
      ar: 'ماوس لاسلكي متطور مع نقرات فائقة الهدوء وتتبع 8K DPI وأزرار قابلة للتخصيص.'
    }
  },
  { id: 'p4',  brand: 'CANON',     category: 'printers',     
    name: { en: 'Canon PIXMA G6020', ar: 'كانون بيكسما G6020' },
    image: 'images/canon-pixma-g6020.png',
    description: {
      en: 'MegaTank all-in-one wireless printer with high-yield refillable ink tanks for low-cost, high-volume printing.',
      ar: 'طابعة لاسلكية الكل في واحد من MegaTank مع خزانات حبر قابلة لإعادة التعبئة عالية الإنتاجية لطباعة منخفضة التكلفة وعالية الحجم.'
    }
  },
  { id: 'p5',  brand: 'HONEYWELL', category: 'scanners',     
    name: { en: 'Honeywell Voyager 1200g', ar: 'هانيويل فوياجر 1200g' },
    image: 'images/honeywell-voyager-1200g.png',
    description: {
      en: 'Durable single-line laser barcode scanner built for retail point-of-sale environments.',
      ar: 'ماسح باركود ليزر متين أحادي الخط مصمم لبيئات نقاط البيع بالتجزئة.'
    }
  },
  { id: 'p6',  brand: 'FUJITSU',   category: 'scanners',     
    name: { en: 'Fujitsu ScanSnap iX1600', ar: 'فوجيتسو سكان سناب iX1600' },
    image: 'images/fujitsu-scansnap-ix1600.png',
    description: {
      en: '4.3-inch touchscreen document scanner with Wi-Fi, 40 ppm duplex scanning and cloud integration.',
      ar: 'ماسح ضوئي للمستندات بشاشة تعمل باللمس مقاس ٤.٣ بوصة مع واي فاي ومسح ضوئي مزدوج بسرعة ٤٠ صفحة في الدقيقة وتكامل سحابي.'
    }
  },
  { id: 'p7',  brand: 'HP',        category: 'ink',          
    name: { en: 'HP 58A Black Toner Cartridge', ar: 'خرطوشة حبر أسود اتش بي 58A' },
    image: 'images/hp-58a-toner.png',
    description: {
      en: 'Genuine HP 58A black toner cartridge delivering approximately 3,000 pages per cartridge.',
      ar: 'خرطوشة حبر أسود أصلية من اتش بي 58A توفر حوالي ٣٠٠٠ صفحة لكل خرطوشة.'
    }
  },
  { id: 'p8',  brand: 'ZEBRA',     category: 'printers',     
    name: { en: 'Zebra ZD421 Thermal Printer', ar: 'طابعة حرارية زيبرا ZD421' },
    image: 'images/zebra-zd421.png',
    description: {
      en: 'Desktop direct-thermal label printer — ideal for shipping, labeling, and healthcare applications.',
      ar: 'طابعة ملصقات حرارية مباشرة لسطح المكتب - مثالية للشحن ووضع الملصقات وتطبيقات الرعاية الصحية.'
    }
  },
  { id: 'p9',  brand: 'EPSON',     category: 'printers',     
    name: { en: 'Epson EcoTank ET-4760', ar: 'إبسون إيكو تانك ET-4760' },
    image: 'images/epson-ecotank-et4760.png',
    description: {
      en: 'Cartridge-free all-in-one SuperTank printer with automatic 2-sided printing and ADF.',
      ar: 'طابعة سوبر تانك الكل في واحد خالية من الخراطيش مع طباعة تلقائية على الوجهين ومغذي مستندات تلقائي.'
    }
  },
  { id: 'p10', brand: 'CANON',     category: 'scanners',     
    name: { en: 'Canon imageFORMULA R40', ar: 'كانون إيميج فورمولا R40' },
    image: 'images/canon-imageformula-r40.png',
    description: {
      en: 'Compact desktop document scanner, 40 ppm, perfect for small-to-medium business document capture.',
      ar: 'ماسح ضوئي لسطح المكتب صغير الحجم للمستندات، ٤٠ صفحة في الدقيقة، مثالي لالتقاط المستندات للشركات الصغيرة والمتوسطة.'
    }
  },
  { id: 'p11', brand: 'HP',        category: 'printers',     
    name: { en: 'HP ENVY 6055e', ar: 'اتش بي إنفي 6055e' },
    image: 'images/hp-envy-6055e.png',
    description: {
      en: 'Wireless all-in-one color inkjet printer with HP+ smart features and Instant Ink ready.',
      ar: 'طابعة نافثة للحبر ملونة لاسلكية الكل في واحد مع ميزات HP+ الذكية وجاهزة للحبر الفوري.'
    }
  },
  { id: 'p12', brand: 'ZEBRA',     category: 'scanners',     
    name: { en: 'Zebra LS2208 Barcode Scanner', ar: 'ماسح باركود زيبرا LS2208' },
    image: 'images/zebra-ls2208.png',
    description: {
      en: 'Reliable handheld 1D laser scanner for retail, commercial and light-industrial applications.',
      ar: 'ماسح ليزر أحادي الأبعاد محمول موثوق به للتطبيقات التجارية والصناعية الخفيفة والتجزئة.'
    }
  },
  { id: 'p13', brand: 'LOGITECH',  category: 'accessories',  
    name: { en: 'Logitech MX Keys S Keyboard', ar: 'لوحة مفاتيح لوجيتك MX Keys S' },
    image: 'images/logitech-mx-keys-s.png',
    description: {
      en: 'Advanced wireless illuminated keyboard with smart actions and multi-device support.',
      ar: 'لوحة مفاتيح لاسلكية مضيئة متطورة مع إجراءات ذكية ودعم أجهزة متعددة.'
    }
  },
  { id: 'p14', brand: 'CANON',     category: 'ink',          
    name: { en: 'Canon PG-245XL Black Ink', ar: 'حبر أسود كانون PG-245XL' },
    image: 'images/canon-pg245xl.png',
    description: {
      en: 'Canon high-yield black ink cartridge for select PIXMA inkjet printers.',
      ar: 'خرطوشة حبر أسود عالية الإنتاجية من كانون لطابعات بيكسما النافثة للحبر المختارة.'
    }
  },
  { id: 'p15', brand: 'HP',        category: 'networking',   
    name: { en: 'HP Aruba Instant On AP22', ar: 'اتش بي أروبا إنستانت أون AP22' },
    image: 'images/hp-aruba-ap22.png',
    description: {
      en: 'Wi-Fi 6 indoor access point delivering fast, secure, reliable wireless for small business.',
      ar: 'نقطة وصول داخلية Wi-Fi 6 توفر لاسلكيًا سريعًا وآمنًا وموثوقًا للشركات الصغيرة.'
    }
  },
  { id: 'p16', brand: 'EPSON',     category: 'pos',          
    name: { en: 'Epson TM-T88VI POS Printer', ar: 'طابعة نقاط بيع إبسون TM-T88VI' },
    image: 'images/epson-tm-t88vi.png',
    description: {
      en: 'Industry-leading thermal receipt printer trusted by retail and hospitality worldwide.',
      ar: 'طابعة إيصالات حرارية رائدة في الصناعة يثق بها تجار التجزئة والضيافة في جميع أنحاء العالم.'
    }
  },
  { id: 'p17', brand: 'HONEYWELL', category: 'surveillance', 
    name: { en: 'Honeywell HD Dome Camera', ar: 'كاميرا دوم هانيويل عالية الدقة' },
    image: 'images/honeywell-dome-camera.png',
    description: {
      en: '4 MP indoor/outdoor IP dome camera with IR night vision and H.265 compression.',
      ar: 'كاميرا آي بي دوم ٤ ميجابكسل داخلية/خارجية مع رؤية ليلية بالأشعة تحت الحمراء وضغط H.265.'
    }
  },
  { id: 'p18', brand: 'LOGITECH',  category: 'smarthome',    
    name: { en: 'Logitech Circle View Camera', ar: 'كاميرا لوجيتك سيركل فيو' },
    image: 'images/logitech-circle-view.png',
    description: {
      en: 'HomeKit Secure Video camera with 180° view and end-to-end encryption.',
      ar: 'كاميرا فيديو آمنة من HomeKit مع عرض ١٨٠ درجة وتشفير شامل.'
    }
  }
];

// Shared news content, used by both the news list and the detail page.
window.THC_NEWS = [
  {
    id: 1,
    date: { en: 'MAR 12, 2025', ar: '١٢ مارس ٢٠٢٥' },
    title: { en: 'Technology Hall Expands Distribution Network in Egypt', ar: 'تكنولوجي هول توسع شبكة التوزيع في مصر' },
    excerpt: { en: 'We have opened two new regional distribution centers in Alexandria and Aswan to serve customers faster than ever.', ar: 'افتتحنا مركزين جديدين للتوزيع الإقليمي في الإسكندرية وأسوان لخدمة العملاء بشكل أسرع من أي وقت مضى.' },
    image: 'images/server_room_hero.png',
    content: {
      en: [
        'Technology Hall is proud to announce the opening of two brand-new regional distribution centers in Alexandria and Aswan. This major expansion is part of our long-term commitment to bringing enterprise-grade IT products and printing solutions closer to every customer in Egypt.',
        'With the new facilities, businesses outside the Greater Cairo area can expect same-day or next-day delivery on the majority of SKUs in our catalog — including printers, scanners, POS systems and networking hardware. Our local service engineers are also being stationed at both locations so on-site support and installations can be scheduled faster than ever before.',
        'This expansion reinforces our mission to be the most reliable technology partner for organizations across the country, from small offices to national enterprises. We would like to thank our customers and brand partners for their continued trust — it is what makes growth like this possible.'
      ],
      ar: [
        'تفخر تكنولوجي هول بالإعلان عن افتتاح مركزين إقليميين جديدين للتوزيع في الإسكندرية وأسوان. هذا التوسع الكبير هو جزء من التزامنا طويل الأمد بتقريب منتجات تكنولوجيا المعلومات والحلول الطباعية من كل عميل في مصر.',
        'مع المرافق الجديدة، يمكن للشركات خارج منطقة القاهرة الكبرى توقع التوصيل في نفس اليوم أو اليوم التالي لغالبية المنتجات في كتالوجنا - بما في ذلك الطابعات والماسحات الضوئية وأنظمة نقاط البيع وأجهزة الشبكات. يتم أيضًا تعيين مهندسي الخدمة المحليين لدينا في كلا الموقعين بحيث يمكن جدولة الدعم والتركيبات في الموقع بشكل أسرع من أي وقت مضى.',
        'يعزز هذا التوسع مهمتنا في أن نكون شريك التكنولوجيا الأكثر موثوقية للمؤسسات في جميع أنحاء البلاد، من المكاتب الصغيرة إلى المؤسسات الوطنية. نود أن نشكر عملائنا وشركاء علامتنا التجارية على ثقتهم المستمرة - فهي ما يجعل النمو مثل هذا ممكنًا.'
      ]
    }
  },
  {
    id: 2,
    date: { en: 'FEB 28, 2025', ar: '٢٨ فبراير ٢٠٢٥' },
    title: { en: 'New Smart Home Product Line Launching This Spring', ar: 'خط منتجات المنزل الذكي الجديد ينطلق هذا الربيع' },
    excerpt: { en: 'Our smart home catalog is expanding with intelligent lighting, thermostats and security devices from top brands.', ar: 'كتالوج المنزل الذكي لدينا يتوسع مع الإضاءة الذكية والمنظمات الحرارية وأجهزة الأمان من أفضل العلامات التجارية.' },
    image: 'images/logitech-circle-view.png',
    content: {
      en: [
        'Our smart home portfolio is getting a significant upgrade this spring. Technology Hall is bringing a curated selection of intelligent lighting, connected thermostats, smart locks and HomeKit-ready security cameras from the brands our customers already know and trust.',
        'Each product has been selected to integrate cleanly with the major ecosystems — Apple Home, Google Home and Amazon Alexa — so customers can build a connected environment without lock-in. We also offer professional installation and configuration for homes and small offices that want a fully set-up experience from day one.',
        'Visit our Smart Home category to explore the full range, or contact our sales team for tailored consultation on which devices best fit your space.'
      ],
      ar: [
        'تحصل محفظة المنزل الذكي لدينا على ترقية كبيرة هذا الربيع. تقدم تكنولوجي هول مجموعة مختارة من الإضاءة الذكية والمنظمات الحرارية المتصلة والأقفال الذكية وكاميرات الأمان الجاهزة لـ HomeKit من العلامات التجارية التي يعرفها عملاؤنا ويثقون بها بالفعل.',
        'تم اختيار كل منتج للتكامل بشكل نظيف مع الأنظمة البيئية الرئيسية - Apple Home و Google Home و Amazon Alexa - بحيث يمكن للعملاء بناء بيئة متصلة دون قيود. نقدم أيضًا تركيبًا وتكوينًا احترافيًا للمنازل والمكاتب الصغيرة التي تريد تجربة إعداد كاملة من اليوم الأول.',
        'قم بزيارة فئة المنزل الذكي لدينا لاستكشاف النطاق الكامل، أو اتصل بفريق المبيعات لدينا للحصول على استشارة مخصصة حول الأجهزة التي تناسب مساحتك بشكل أفضل.'
      ]
    }
  },
  {
    id: 3,
    date: { en: 'FEB 10, 2025', ar: '١٠ فبراير ٢٠٢٥' },
    title: { en: 'Exclusive HP Partnership Expands Enterprise Offerings', ar: 'شراكة حصرية مع HP توسع عروض المؤسسات' },
    excerpt: { en: 'A new strategic agreement with HP enables us to offer broader enterprise printing and managed print services.', ar: 'تمكننا اتفاقية استراتيجية جديدة مع HP من تقديم خدمات طباعة للمؤسسات وخدمات طباعة مدارة أوسع.' },
    image: 'images/hp-aruba-ap22.png',
    content: {
      en: [
        'Technology Hall has entered into a renewed strategic partnership with HP that significantly expands our enterprise portfolio. The agreement unlocks deeper access to HP\'s full lineup of enterprise LaserJet devices, Aruba networking products and HP Managed Print Services (MPS) programs.',
        'Under this expanded partnership, our customers benefit from preferential pricing on high-volume deployments, priority stock allocation and direct factory support for large rollouts. Our certified engineers are already being trained on the latest platforms to ensure fast, expert implementation.',
        'If your organization is planning a print-fleet refresh or a move to managed print, our enterprise team would love to help you put together a proposal that reduces cost-per-page and improves uptime.'
      ],
      ar: [
        'دخلت تكنولوجي هول في شراكة استراتيجية متجددة مع HP توسع بشكل كبير محفظة مؤسساتنا. تفتح الاتفاقية وصولاً أعمق إلى تشكيلة HP الكاملة من أجهزة LaserJet للمؤسسات، ومنتجات شبكات Aruba وبرامج خدمات الطباعة المدارة (MPS) من HP.',
        'بموجب هذه الشراكة الموسعة، يستفيد عملاؤنا من أسعار تفضيلية في عمليات النشر كبيرة الحجم، وتخصيص المخزون ذي الأولوية ودعم المصنع المباشر لعمليات النشر الكبيرة. يتم تدريب مهندسينا المعتمدين بالفعل على أحدث المنصات لضمان التنفيذ السريع والخبراء.',
        'إذا كانت مؤسستك تخطط لتحديث أسطول الطباعة أو الانتقال إلى الطباعة المدارة، فإن فريق المؤسسات لدينا يود مساعدتك في وضع اقتراح يقلل التكلفة لكل صفحة ويحسن وقت التشغيل.'
      ]
    }
  }
];
