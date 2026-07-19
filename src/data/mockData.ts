import { Auction, Notification, Shipment, Transaction, User } from '../types';

export const mockUser: User = {
  id: 'user_01',
  username: 'Rabia',
  email: 'quee007ina@gmail.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
  bio: 'Premium bidder & Collector of luxury watches, digital artwork, and limited-edition cars.',
  phone: '+92 300 1234567',
  address: 'Defense Phase 6, Lahore, Pakistan',
  achievements: ['First Win', 'High Roller', 'Sniper Bidder', 'Power Seller'],
  sellerRating: 4.9,
  buyerRating: 4.8,
  isVerified: true,
  isPremium: true,
  balance: 3210.50,
  joinedDate: 'May 11, 2024'
};

export const mockCategories = [
  { id: 'electronics', name: 'Electronics', icon: 'Cpu' },
  { id: 'vehicles', name: 'Vehicles', icon: 'Car' },
  { id: 'art', name: 'Art & Paintings', icon: 'Palette' },
  { id: 'fashion', name: 'Fashion', icon: 'Shirt' },
  { id: 'collectibles', name: 'Collectibles', icon: 'Compass' },
  { id: 'furniture', name: 'Furniture', icon: 'Armchair' },
  { id: 'books', name: 'Books', icon: 'BookOpen' },
  { id: 'sports', name: 'Sports', icon: 'Trophy' },
  { id: 'appliances', name: 'Home Appliances', icon: 'Tv' },
  { id: 'pets', name: 'Pets', icon: 'PawPrint' }
];

const now = Date.now();

export const initialAuctions: Auction[] = [
  // Live Auctions from Dashboard
  {
    id: 'auc_rolex_sub',
    title: 'Rolex Submariner Date',
    description: 'The Rolex Submariner Date reference 126610LN features a 41mm Oystersteel case, a black Cerachrom bezel insert, and a black dial with large luminescent hour markers. This iconic divers watch is equipped with the caliber 3235 automatic movement, boasting a 70-hour power reserve. Water-resistant up to 300 meters, it is presented on an Oyster bracelet with a Glidelock extension system. Complete with original box and papers dated 2023.',
    category: 'fashion',
    startingPrice: 7500,
    currentBid: 8450,
    increment: 250,
    currentBidderId: 'bidder_rolex_1',
    currentBidderName: 'Rabia',
    biddersCount: 18,
    startTime: now - 3600000 * 2,
    endTime: now + 3600000 * 1.4, // ~1h 24m remaining
    status: 'active',
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Excellent',
    seller: {
      name: 'Horology Masters',
      rating: 4.95,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
      isVerified: true
    },
    views: 420,
    likes: 84,
    bidsHistory: [
      { id: 'b1', bidderName: 'Rabia', amount: 8450, time: '2 min ago', isUser: true },
      { id: 'b2', bidderName: 'Ahmad K.', amount: 8200, time: '10 min ago', isUser: false },
      { id: 'b3', bidderName: 'Sarah L.', amount: 7950, time: '24 min ago', isUser: false },
      { id: 'b4', bidderName: 'Alex M.', amount: 7700, time: '40 min ago', isUser: false }
    ]
  },
  {
    id: 'auc_macbook_pro',
    title: 'MacBook Pro 16" M3 Max',
    description: 'Apple MacBook Pro 16-inch Space Black, equipped with the powerhouse Apple M3 Max chip (16-core CPU, 40-core GPU), 64GB Unified Memory, and a blazing fast 2TB SSD. Features the stunning Liquid Retina XDR display with ProMotion. Mint condition, zero scratches, original packaging, and AppleCare+ active until November 2026.',
    category: 'electronics',
    startingPrice: 1800,
    currentBid: 2150,
    increment: 120,
    currentBidderId: 'bidder_mac_1',
    currentBidderName: 'Michael Chen',
    biddersCount: 12,
    startTime: now - 3600000 * 5,
    endTime: now + 3600000 * 2.25, // ~2h 15m remaining
    status: 'active',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Like New',
    seller: {
      name: 'TechCycle Co.',
      rating: 4.8,
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100',
      isVerified: true
    },
    views: 310,
    likes: 45,
    bidsHistory: [
      { id: 'bm1', bidderName: 'Michael Chen', amount: 2150, time: '5 min ago', isUser: false },
      { id: 'bm2', bidderName: 'Rabia', amount: 2030, time: '12 min ago', isUser: true },
      { id: 'bm3', bidderName: 'Alice Woo', amount: 1910, time: '1 hour ago', isUser: false }
    ]
  },
  {
    id: 'auc_abstract_painting',
    title: 'Abstract Painting: "Ocean Dreams"',
    description: 'An original large scale abstract acrylic painting on stretched canvas by contemporary artist Elena Rostova. Features rich indigo, cerulean blue, soft sandy tones, and real 24k gold leaf accents. Signed on the front and back. Ready to hang, measures 48" x 36" x 1.5" and includes a Certificate of Authenticity.',
    category: 'art',
    startingPrice: 900,
    currentBid: 1250,
    increment: 75,
    currentBidderId: 'bidder_art_1',
    currentBidderName: 'Dianne V.',
    biddersCount: 9,
    startTime: now - 3600000 * 12,
    endTime: now + 3600000 * 0.75, // ~45m remaining
    status: 'active',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'New',
    seller: {
      name: 'Modern Art Gallery',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100',
      isVerified: true
    },
    views: 185,
    likes: 39,
    bidsHistory: [
      { id: 'ba1', bidderName: 'Dianne V.', amount: 1250, time: '14 min ago', isUser: false },
      { id: 'ba2', bidderName: 'Rabia', amount: 1175, time: '30 min ago', isUser: true },
      { id: 'ba3', bidderName: 'Rohan M.', amount: 1100, time: '2 hours ago', isUser: false }
    ]
  },
  {
    id: 'auc_canon_eos',
    title: 'Canon EOS R5 Mirrorless Camera',
    description: 'For the professional photographer who demands superb image resolution and speed. Canon EOS R5 full-frame mirrorless camera body featuring a ground-breaking 45MP CMOS sensor, 8K raw video recording, 5-axis in-body image stabilization, and up to 20fps shooting. Comes with 2 original batteries, dual charger, strap, and 128GB CFexpress card. Extremely low shutter count of 4,200.',
    category: 'electronics',
    startingPrice: 2800,
    currentBid: 3240,
    increment: 200,
    currentBidderId: 'bidder_canon_1',
    currentBidderName: 'Rabia',
    biddersCount: 14,
    startTime: now - 3600000 * 8,
    endTime: now + 3600000 * 3.5, // ~3h 30m remaining
    status: 'active',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Excellent',
    seller: {
      name: 'Camera Depot',
      rating: 4.7,
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100',
      isVerified: false
    },
    views: 295,
    likes: 55,
    bidsHistory: [
      { id: 'bc1', bidderName: 'Rabia', amount: 3240, time: '1 min ago', isUser: true },
      { id: 'bc2', bidderName: 'Fiona H.', amount: 3040, time: '15 min ago', isUser: false },
      { id: 'bc3', bidderName: 'Gavin K.', amount: 2840, time: '4 hours ago', isUser: false }
    ]
  },

  // Featured Auctions from Dashboard
  {
    id: 'auc_patek',
    title: 'Patek Philippe Nautilus 5711/1A',
    description: 'The ultra-rare, coveted Patek Philippe Nautilus 5711/1A-010 with the classic blue-grey dial. Solid stainless steel 40mm case with integrated steel bracelet. Caliber 324 S C self-winding automatic movement visible through the sapphire caseback. Mint collector condition with flawless bezel. Comes with original cork presentation box, documents of origin, and service receipts.',
    category: 'fashion',
    startingPrice: 18000,
    currentBid: 23500,
    increment: 500,
    currentBidderId: 'user_01',
    currentBidderName: 'Rabia',
    biddersCount: 34,
    startTime: now - 3600000 * 48,
    endTime: now + 3600000 * 2.16, // ~2h 10m remaining
    status: 'active',
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Excellent',
    seller: {
      name: 'Geneva Luxury Group',
      rating: 5.0,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100',
      isVerified: true
    },
    views: 1250,
    likes: 240,
    bidsHistory: [
      { id: 'bp1', bidderName: 'Rabia', amount: 23500, time: '3 min ago', isUser: true },
      { id: 'bp2', bidderName: 'Sultan Al-Thani', amount: 23000, time: '15 min ago', isUser: false },
      { id: 'bp3', bidderName: 'Marcus V.', amount: 22500, time: '1 hour ago', isUser: false }
    ]
  },
  {
    id: 'auc_tesla_s',
    title: 'Tesla Model S Plaid 2023',
    description: '2023 Tesla Model S Plaid in Deep Metallic Black with Cream Premium Interior and Carbon Fiber Decor. Features Tri-Motor All-Wheel Drive pushing 1,020 horsepower, 0-60 mph in 1.99s, and a top speed of 200 mph. Upgraded 21" Arachnid wheels, Full Self-Driving Capability fully paid. Only 3,400 miles, single owner, clean Title, 100% battery health certificate.',
    category: 'vehicles',
    startingPrice: 65000,
    currentBid: 72000,
    increment: 1000,
    currentBidderId: 'bidder_tesla_1',
    currentBidderName: 'Elon Fan',
    biddersCount: 22,
    startTime: now - 3600000 * 72,
    endTime: now + 3600000 * 0.33, // ~20m remaining
    status: 'active',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Like New',
    seller: {
      name: 'Prime Motors Inc.',
      rating: 4.9,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100',
      isVerified: true
    },
    views: 890,
    likes: 180,
    bidsHistory: [
      { id: 'bt1', bidderName: 'Elon Fan', amount: 72000, time: '1 min ago', isUser: false },
      { id: 'bt2', bidderName: 'Rabia', amount: 71000, time: '10 min ago', isUser: true },
      { id: 'bt3', bidderName: 'SpeedyDave', amount: 70000, time: '30 min ago', isUser: false }
    ]
  },
  {
    id: 'auc_starry_night',
    title: 'The Starry Night Painting (Giclee Studio Master)',
    description: 'An official museum-grade studio replica painting of Vincent van Gogh\'s 1889 masterwork, "The Starry Night". Produced in oil-on-canvas by highly trained master copyists using the original brushstroke scanning technique of the Van Gogh Museum. Heavy impasto texture, indistinguishable from the original to the untrained eye. Features custom hand-crafted gold leaf frame.',
    category: 'art',
    startingPrice: 2000,
    currentBid: 3150,
    increment: 150,
    currentBidderId: 'bidder_starry_1',
    currentBidderName: 'Rabia',
    biddersCount: 15,
    startTime: now - 3600000 * 24,
    endTime: now + 3600000 * 0.66, // ~40m remaining
    status: 'active',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Excellent',
    seller: {
      name: 'Amster Art replicas',
      rating: 4.85,
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100',
      isVerified: true
    },
    views: 450,
    likes: 92,
    bidsHistory: [
      { id: 'bsn1', bidderName: 'Rabia', amount: 3150, time: '40s ago', isUser: true },
      { id: 'bsn2', bidderName: 'Vincenzo', amount: 3000, time: '5 min ago', isUser: false },
      { id: 'bsn3', bidderName: 'ArtsyCat', amount: 2850, time: '15 min ago', isUser: false }
    ]
  },
  {
    id: 'auc_nike_aj1',
    title: 'Nike Air Jordan 1 Retro "Chicago" 1985',
    description: 'An original pair of 1985 Nike Air Jordan 1 high-tops in the classic "Chicago" colorway (White/Black-Red). Size 10.5 US. Exceptionally preserved in a climate-controlled vault. Highly collectible item with standard cracking on the collar material and minor yellowing of the midsole, confirming its vintage authenticity. Signed by Jordan designers. Unworn, DS condition.',
    category: 'fashion',
    startingPrice: 500,
    currentBid: 850,
    increment: 50,
    currentBidderId: 'bidder_nike_1',
    currentBidderName: 'Sneakerhead Pro',
    biddersCount: 29,
    startTime: now - 3600000 * 120,
    endTime: now + 3600000 * 3.42, // ~3h 25m remaining
    status: 'active',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=600',
    gallery: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600'
    ],
    condition: 'Good',
    seller: {
      name: 'Grail Vault',
      rating: 4.98,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100',
      isVerified: true
    },
    views: 1540,
    likes: 312,
    bidsHistory: [
      { id: 'bn1', bidderName: 'Sneakerhead Pro', amount: 850, time: '2 min ago', isUser: false },
      { id: 'bn2', bidderName: 'HypeBeast99', amount: 800, time: '8 min ago', isUser: false },
      { id: 'bn3', bidderName: 'Rabia', amount: 750, time: '1 hour ago', isUser: true }
    ]
  },

  // Products covering rest of Category items requested in pages 13-16 to guarantee products in every category:
  // Electronics additional items: Gaming Laptop, iPhone, Samsung Galaxy, PlayStation 5, Xbox Series X, Drone, Camera, Smart Watch.
  {
    id: 'auc_ps5_pro',
    title: 'PlayStation 5 Pro Developer Edition',
    description: 'Limited edition Sony PlayStation 5 Pro Developer Testing Console. Features double the GPU power of the base PS5, upgraded cooling architecture, 2TB custom SSD, and support for real-time ray-traced reflections in full 4K. Includes developer SDK interface access and two custom gunmetal dualsense controller skins.',
    category: 'electronics',
    startingPrice: 600,
    currentBid: 850,
    increment: 50,
    currentBidderId: 'bidder_ps5_1',
    currentBidderName: 'Ahmad K.',
    biddersCount: 16,
    startTime: now - 3600000 * 18,
    endTime: now + 3600000 * 4,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=600',
    gallery: ['https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=600'],
    condition: 'Like New',
    seller: { name: 'ConsoleKing', rating: 4.7, avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=100', isVerified: false },
    views: 310,
    likes: 49,
    bidsHistory: []
  },
  {
    id: 'auc_drone_dji',
    title: 'DJI Inspire 3 Cine Drone Combo',
    description: 'The pinnacle of aerial cinematography. DJI Inspire 3 professional drone with full-frame Zenmuse X9-8K Air Gimbal Camera. Supports Apple ProRes RAW and CinemaDNG recording inside. Features multi-camera synchronized positional awareness, hot-swappable batteries, and 3D Waypoint navigation.',
    category: 'electronics',
    startingPrice: 4000,
    currentBid: 4900,
    increment: 200,
    currentBidderId: 'bidder_drone_1',
    currentBidderName: 'CineAero LLC',
    biddersCount: 8,
    startTime: now - 3600000 * 10,
    endTime: now + 3600000 * 5.5,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=600',
    gallery: ['https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=600'],
    condition: 'Excellent',
    seller: { name: 'SkyFilming Group', rating: 4.9, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100', isVerified: true },
    views: 125,
    likes: 21,
    bidsHistory: []
  },
  // Vehicles additional items: Honda Civic, Toyota Corolla, BMW M4, Yamaha R1, Honda CBR, Mountain Bike, Luxury Boat
  {
    id: 'auc_bmw_m4',
    title: 'BMW M4 Competition Coupe 2024',
    description: 'Brand new 2024 BMW M4 Competition with M xDrive. Finished in Isle of Man Green Metallic over Kyalami Orange full merino leather. Powered by a twin-turbocharged 3.0-liter inline-six pushing 503 hp, paired with an 8-speed M Steptronic transmission. Carbon fiber exterior trim, adaptive M suspension, carbon-ceramic brakes.',
    category: 'vehicles',
    startingPrice: 70000,
    currentBid: 78500,
    increment: 1500,
    currentBidderId: 'bidder_bmw_1',
    currentBidderName: 'Rabia',
    biddersCount: 24,
    startTime: now - 3600000 * 36,
    endTime: now + 3600000 * 6,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=600',
    gallery: ['https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&q=80&w=600'],
    condition: 'New',
    seller: { name: 'Apex Imports', rating: 4.95, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100', isVerified: true },
    views: 1840,
    likes: 310,
    bidsHistory: [
      { id: 'bbm1', bidderName: 'Rabia', amount: 78500, time: '5m ago', isUser: true },
      { id: 'bbm2', bidderName: 'Ahmad K.', amount: 77000, time: '20m ago', isUser: false }
    ]
  },
  {
    id: 'auc_yamaha_r1',
    title: 'Yamaha YZF-R1M Superbike',
    description: 'The Yamaha YZF-R1M is a high-spec track weapon with advanced MotoGP-derived electronic controls, Ohlins electronic racing suspension, and carbon fiber bodywork. This 2022 model is heavily upgraded with an Akrapovič full titanium exhaust system and dyno-tuned to 205 horsepower at the rear wheel. Mint condition, only 1,200 highway miles.',
    category: 'vehicles',
    startingPrice: 15000,
    currentBid: 17200,
    increment: 400,
    currentBidderId: 'bidder_r1_1',
    currentBidderName: 'RiderPro99',
    biddersCount: 11,
    startTime: now - 3600000 * 24,
    endTime: now + 3600000 * 12,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&q=80&w=600',
    gallery: ['https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?auto=format&fit=crop&q=80&w=600'],
    condition: 'Excellent',
    seller: { name: 'MotoGarage', rating: 4.8, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100', isVerified: false },
    views: 400,
    likes: 72,
    bidsHistory: []
  },
  // Art & Paintings additional items: Rare Sculpture, Islamic Calligraphy
  {
    id: 'auc_sculpture_bronze',
    title: 'Rare Bronze Sculpture: "The Ascent"',
    description: 'An original modern bronze sculpture of minimalist figures climbing a curved helix structure. Standing 3.2 feet tall on a solid polished obsidian marble base. Hand-poured using the classic lost-wax casting technique. Stamped and numbered 3/15 by French-Canadian sculptor Pierre Gauthier. Perfect centerpiece for premium office lobbies.',
    category: 'art',
    startingPrice: 4500,
    currentBid: 5200,
    increment: 300,
    currentBidderId: 'bidder_sculp_1',
    currentBidderName: 'CorporateArt Inc.',
    biddersCount: 6,
    startTime: now - 3600000 * 48,
    endTime: now + 3600000 * 16,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=600',
    gallery: ['https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&q=80&w=600'],
    condition: 'New',
    seller: { name: 'Quebec Fine Arts', rating: 4.9, avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100', isVerified: true },
    views: 140,
    likes: 22,
    bidsHistory: []
  },
  // Collectibles: Pokemon Cards, Coins, Rare Books, Comics, Stamps, Antiques
  {
    id: 'auc_charizard_psa10',
    title: '1999 Base Set Shadowless Charizard Holo PSA 10',
    description: 'The holy grail of gaming collectibles. 1999 Pokemon Base Set Shadowless Holo Charizard card, graded GEM MT 10 by Professional Sports Authenticator (PSA). Flawless holographic foil, pristine corners, perfect centering, and clean reverse side. This shadowless variant is extremely hard to obtain in a PSA 10, highly valued by serious investors.',
    category: 'collectibles',
    startingPrice: 15000,
    currentBid: 21200,
    increment: 500,
    currentBidderId: 'bidder_pkmn_1',
    currentBidderName: 'Rabia',
    biddersCount: 42,
    startTime: now - 3600000 * 120,
    endTime: now + 3600000 * 1.8, // ~1h 48m remaining
    status: 'active',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=600',
    gallery: ['https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=600'],
    condition: 'Excellent',
    seller: { name: 'Elite TCG Vault', rating: 4.99, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100', isVerified: true },
    views: 2310,
    likes: 495,
    bidsHistory: [
      { id: 'bch1', bidderName: 'Rabia', amount: 21200, time: '20s ago', isUser: true },
      { id: 'bch2', bidderName: 'CollectorX', amount: 20700, time: '2m ago', isUser: false }
    ]
  },
  {
    id: 'auc_roman_coin',
    title: 'Julius Caesar Gold Aureus Coin (44 BC)',
    description: 'An exceptionally rare ancient Roman Gold Aureus, minted under the dictatorship of Julius Caesar around 44 BC. Features the veiled head of Pietas on the obverse and lustral instruments (simpulum, lituus, and axis) on the reverse. Graded Extremely Fine (XF) with superb high relief and fine detail.',
    category: 'collectibles',
    startingPrice: 8000,
    currentBid: 10400,
    increment: 400,
    currentBidderId: 'bidder_coin_1',
    currentBidderName: 'NumisAntiq',
    biddersCount: 15,
    startTime: now - 3600000 * 48,
    endTime: now + 3600000 * 20,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&q=80&w=600',
    gallery: ['https://images.unsplash.com/photo-1618042164219-62c820f10723?auto=format&fit=crop&q=80&w=600'],
    condition: 'Good',
    seller: { name: 'Roman Heritage', rating: 4.9, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100', isVerified: true },
    views: 520,
    likes: 85,
    bidsHistory: []
  },
  // Furniture: Gaming Chair, Office Desk, Luxury Sofa, Dining Table.
  {
    id: 'auc_herman_miller_sofa',
    title: 'Herman Miller Eames Lounge Chair & Ottoman',
    description: 'The definitive classic mid-century lounge chair, designed by Charles and Ray Eames. Features real Walnut shell wood veneers, luxury premium black full-grain leather upholstery, and a polished die-cast aluminum base. Certified 100% authentic Herman Miller product with original medallion tags and certification paperwork. In absolute pristine condition.',
    category: 'furniture',
    startingPrice: 3500,
    currentBid: 4100,
    increment: 150,
    currentBidderId: 'bidder_eames_1',
    currentBidderName: 'DesignNerd',
    biddersCount: 10,
    startTime: now - 3600000 * 12,
    endTime: now + 3600000 * 8,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600',
    gallery: ['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&q=80&w=600'],
    condition: 'Excellent',
    seller: { name: 'Modernist Living', rating: 4.9, avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=100', isVerified: true },
    views: 310,
    likes: 67,
    bidsHistory: []
  },
  // Books: Programming, AI, Business, Novels, History, Medical.
  {
    id: 'auc_vintage_newton',
    title: 'Isaac Newton: Principia Mathematica (1st Edition Replica)',
    description: 'A masterpiece of science. This is a highly limited, leather-bound full replica of the landmark 1687 work "Philosophiae Naturalis Principia Mathematica" by Sir Isaac Newton. Bound in genuine goat-skin leather with gold-foil tooling, heavy weight rag-cotton paper, and hand-stitched rib spines. Features exact high-definition scans of Newton\'s handwritten personal corrections.',
    category: 'books',
    startingPrice: 300,
    currentBid: 480,
    increment: 20,
    currentBidderId: 'bidder_newton_1',
    currentBidderName: 'Rabia',
    biddersCount: 7,
    startTime: now - 3600000 * 24,
    endTime: now + 3600000 * 14,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600',
    gallery: ['https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=600'],
    condition: 'Excellent',
    seller: { name: 'Rare Books Emporium', rating: 4.95, avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100', isVerified: true },
    views: 180,
    likes: 31,
    bidsHistory: []
  },
  // Sports: Football, Cricket Bat, Basketball, Tennis Racket, Gym Equipment.
  {
    id: 'auc_cricket_msd',
    title: 'MS Dhoni Signed Match-Worn Cricket Bat',
    description: 'A dream item for South Asian cricket fans. Genuine match-worn SG Player Edition English Willow cricket bat, personally used and signed by legendary Indian captain MS Dhoni during the 2011 ICC World Cup warm-ups. Fully certified by the BCCI Authenticity Board with a micro-chip embedded certificate and signature verification booklet.',
    category: 'sports',
    startingPrice: 2000,
    currentBid: 3400,
    increment: 100,
    currentBidderId: 'bidder_msd_1',
    currentBidderName: 'Rohan M.',
    biddersCount: 19,
    startTime: now - 3600000 * 48,
    endTime: now + 3600000 * 2.5,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=600',
    gallery: ['https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=600'],
    condition: 'Good',
    seller: { name: 'Cricket Memorabilia Club', rating: 4.88, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100', isVerified: true },
    views: 610,
    likes: 120,
    bidsHistory: []
  },
  // Home Appliances: TV, Refrigerator, Microwave, Washing Machine, Coffee Machine.
  {
    id: 'auc_coffee_la_marzocco',
    title: 'La Marzocco Linea Micra Espresso Machine',
    description: 'Professional-grade cafe performance inside a compact, elegant home footprint. Dual-boiler system, saturated group head, PID temperature controller, and powerful steam wand. Crafted in hand-polished premium stainless steel. App-connected smart controls. Under 6 months old, used lightly and fed exclusively with filtered reverse-osmosis water.',
    category: 'appliances',
    startingPrice: 2500,
    currentBid: 2950,
    increment: 100,
    currentBidderId: 'bidder_lm_1',
    currentBidderName: 'Rabia',
    biddersCount: 8,
    startTime: now - 3600000 * 12,
    endTime: now + 3600000 * 9.5,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600',
    gallery: ['https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&q=80&w=600'],
    condition: 'Like New',
    seller: { name: 'Barista Outlet', rating: 4.79, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100', isVerified: false },
    views: 190,
    likes: 42,
    bidsHistory: []
  },
  // Pets: Dogs, Cats, Birds, Aquarium, Pet Supplies.
  {
    id: 'auc_jellyfish_tank',
    title: 'Orbit 20 Desktop Jellyfish Aquarium',
    description: 'A stunning decorative centerpiece. This 20-liter Desktop Jellyfish Aquarium is specifically engineered for keeping delicate jellyfish, incorporating a circular flow "pseudokreisel" mechanism to keep jellyfish away from filtration systems. Features built-in remote-controlled RGB LED lights to wash your jellyfish in shifting neon gradients. Includes fully aged water filter sponge and starting food supply.',
    category: 'pets',
    startingPrice: 250,
    currentBid: 320,
    increment: 15,
    currentBidderId: 'bidder_jelly_1',
    currentBidderName: 'MarineBioGuy',
    biddersCount: 5,
    startTime: now - 3600000 * 4,
    endTime: now + 3600000 * 10,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600',
    gallery: ['https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600'],
    condition: 'Excellent',
    seller: { name: 'AquaDesign Premium', rating: 4.8, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100', isVerified: true },
    views: 95,
    likes: 18,
    bidsHistory: []
  },

  // Ended / Pending / Won Auctions for the user Rabia
  {
    id: 'auc_won_rolex_vint',
    title: 'Vintage Rolex Oyster Perpetual 1972',
    description: 'Beautiful 1972 reference 1002 vintage Rolex Oyster Perpetual with a rare silver sunburst mosaic dial. 34mm steel case with acrylic crystal. Serviced recently, runs beautifully. Sold in full compliance with authenticity guarantees.',
    category: 'fashion',
    startingPrice: 2000,
    currentBid: 3200,
    increment: 100,
    currentBidderId: 'user_01', // Won by User
    currentBidderName: 'Rabia',
    biddersCount: 14,
    startTime: now - 3600000 * 48,
    endTime: now - 3600000 * 2, // Ended 2 hours ago
    status: 'won', // Won status
    image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=600',
    gallery: ['https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=600'],
    condition: 'Excellent',
    seller: { name: 'Vintage Watches Ltd', rating: 4.9, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100', isVerified: true },
    views: 520,
    likes: 95,
    bidsHistory: [
      { id: 'bw1', bidderName: 'Rabia', amount: 3200, time: '2 hours ago', isUser: true },
      { id: 'bw2', bidderName: 'Collector_PK', amount: 3100, time: '2 hours ago', isUser: false }
    ]
  },
  {
    id: 'auc_pending_pay_iphone',
    title: 'iPhone 15 Pro Max 1TB (Unopened)',
    description: 'Brand new, sealed in box iPhone 15 Pro Max, 1TB Titanium, absolute pinnacle of smartphone technology. Includes 1 Year Apple Warranty.',
    category: 'electronics',
    startingPrice: 1000,
    currentBid: 1250,
    increment: 50,
    currentBidderId: 'user_01', // User won, needs to pay
    currentBidderName: 'Rabia',
    biddersCount: 11,
    startTime: now - 3600000 * 24,
    endTime: now - 3600000 * 3, // Ended 3 hours ago
    status: 'pending_payment', // Needs payment
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=600',
    gallery: ['https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=600'],
    condition: 'New',
    seller: { name: 'ElectroDirect', rating: 4.85, avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100', isVerified: true },
    views: 400,
    likes: 80,
    bidsHistory: [
      { id: 'bp1', bidderName: 'Rabia', amount: 1250, time: '3 hours ago', isUser: true }
    ]
  }
];

export const mockNotifications: Notification[] = [
  {
    id: 'n_outbid_1',
    title: 'Outbid on iPhone 15 Pro Max',
    message: 'Your bid was outbid by another user. Current bid is $1,350.',
    type: 'outbid',
    time: '2 min ago',
    read: false,
    auctionId: 'auc_macbook_pro'
  },
  {
    id: 'n_won_1',
    title: 'You won Vintage Rolex Watch! 🎉',
    message: 'Congratulations! You are the highest bidder. Tap to complete payment of $3,200.00.',
    type: 'won',
    time: '15 min ago',
    read: false,
    auctionId: 'auc_won_rolex_vint'
  },
  {
    id: 'n_ship_1',
    title: 'Shipment Update',
    message: 'Your order #AH5687 for Apple iPad Pro is in transit from Germany.',
    type: 'shipment',
    time: '1 hour ago',
    read: false,
    auctionId: 'auc_won_rolex_vint'
  },
  {
    id: 'n_pay_1',
    title: 'Payment Reminder',
    message: 'Payment of $1,250.00 is pending for iPhone 15 Pro Max 1TB.',
    type: 'payment_reminder',
    time: '3 hours ago',
    read: true,
    auctionId: 'auc_pending_pay_iphone'
  }
];

export const mockShipments: Shipment[] = [
  {
    id: 'sh_01',
    auctionId: 'auc_won_rolex_vint',
    auctionTitle: 'Vintage Rolex Oyster Perpetual 1972',
    auctionImage: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&q=80&w=150',
    trackingNumber: 'AH-88392-LHE',
    status: 'in_transit',
    estimatedDelivery: 'May 15, 2024',
    carrier: 'DHL Express Premium',
    timeline: [
      { status: 'confirmed', time: 'May 11, 2024, 11:30 AM', location: 'Geneva, Switzerland', description: 'Order confirmed and payment verified.' },
      { status: 'packed', time: 'May 12, 2024, 09:00 AM', location: 'Geneva, Switzerland', description: 'Item securely packed and inspected by Rolex Certified Horologists.' },
      { status: 'dispatched', time: 'May 12, 2024, 04:30 PM', location: 'Geneva International Airport', description: 'Dispatched to international sorting facility.' },
      { status: 'in_transit', time: 'May 13, 2024, 02:15 AM', location: 'Dubai Hub, UAE', description: 'In Transit - Customs cleared in transit hub.' }
    ]
  }
];

export const mockTransactions: Transaction[] = [
  { id: 'tx_01', auctionId: 'auc_won_rolex_vint', auctionTitle: 'Rolex Submariner Payment', amount: -8450.00, type: 'payment', status: 'success', date: 'May 11, 2024' },
  { id: 'tx_02', amount: 5000.00, type: 'topup', status: 'success', date: 'May 9, 2024' },
  { id: 'tx_03', auctionId: 'auc_won_rolex_vint', auctionTitle: 'Wallet Top Up - Stripe Credit Card', amount: 3500.00, type: 'topup', status: 'success', date: 'May 8, 2024' }
];

export const mockFAQ = [
  { q: "How do I place a bid?", a: "To place a bid, navigate to any live auction page, enter your bid amount (must be equal to or greater than the current highest bid plus the minimum increment), and click 'Bid Now'. Your wallet must contain enough balance or credit card verification." },
  { q: "How is delivery handled for luxury items?", a: "All high-value items won on AuctionHub are shipped via fully-insured premium shipping carriers (DHL Express, FedEx Priority) with end-to-end tracking, temperature-controlled transit packaging (if applicable), and signature confirmation upon delivery." },
  { q: "What happens if I get outbid?", a: "You will immediately receive an email and a push notification with an Outbid Alert. You can click 'Bid Again' to increase your bid and stay in the running." },
  { q: "How does the AI Auction Assistant work?", a: "The AI Auction Assistant is an intelligent system trained to help you track shipment statuses, answer questions about payment methods, advise you on bid increments, and monitor auction ending times in real time." },
  { q: "Are items verified for authenticity?", a: "Yes. Every item in the Fashion, Art, and Collectibles category undergoes a double physical authentication check by verified international experts (Sotheby\'s partners, Rolex Certified Horologists, PSA staff) before shipping." }
];
