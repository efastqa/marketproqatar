import { 
  Listing, 
  Category, 
  Review, 
  Conversation, 
  AdminStats, 
  PaymentTransaction, 
  AdPackage, 
  CommercialBannerAd, 
  HeroSpotlightConfig, 
  PlatformConfig 
} from '../types';

export const PLATFORM_PHONE = '0743383338';
export const PLATFORM_PHONE_DISPLAY = '074 338 3338';
export const PLATFORM_WHATSAPP_LINK = 'https://wa.me/94743383338?text=Hello%20ebuymatale.lk,%20I%20am%20inquiring%20about%20your%20services';

// Matale District & Central Province Locations
export const MATALE_LOCATIONS = [
  'All Matale District',
  'Matale Town (Clock Tower / Central)',
  'Aluvihare',
  'Ukuwela',
  'Rattota (Tea & Spices)',
  'Riverston & Knuckles Range',
  'Dambulla (Cave Temple & Town)',
  'Sigiriya (Heritage Area)',
  'Galewela',
  'Pallepola',
  'Naula & Bowatenna',
  'Yatawatta & Palapathwela',
  'Elkaduwa / Hunnas Falls',
  'Kandy - Matale Road',
  'Central Province'
];

// Alias for backward compatibility
export const QATAR_LOCATIONS = MATALE_LOCATIONS;

export const CATEGORIES: Category[] = [
  {
    id: 'lands',
    name: 'Lands & Plantations',
    nameAr: '',
    icon: 'Trees',
    color: 'from-emerald-600 to-green-700',
    count: 840,
    subcategories: [
      { id: 'tea_spice_estates', name: 'Tea & Spice Estates', nameAr: '', count: 240 },
      { id: 'residential_land', name: 'Residential Land Plots', nameAr: '', count: 320 },
      { id: 'commercial_land', name: 'Commercial Land (Main Road)', nameAr: '', count: 110 },
      { id: 'paddy_agricultural', name: 'Agricultural & Paddy Lands', nameAr: '', count: 95 },
      { id: 'mountain_plots', name: 'Riverston View & Eco Plots', nameAr: '', count: 75 },
    ],
    popularSpecs: ['Land Extent (Perches/Acres)', 'Deed Type (Bim Saviya/Clear)', 'Road Access (ft)', 'Water & Electricity', 'Distance to Town']
  },
  {
    id: 'gems',
    name: 'Ceylon Gems & Jewelry',
    nameAr: '',
    icon: 'Sparkles',
    color: 'from-blue-600 to-indigo-700',
    count: 620,
    subcategories: [
      { id: 'blue_sapphire', name: 'Royal Blue Sapphires', nameAr: '', count: 260 },
      { id: 'padparadscha', name: 'Padparadscha Sapphires', nameAr: '', count: 85 },
      { id: 'rubies_spinel', name: 'Ceylon Rubies & Spinel', nameAr: '', count: 95 },
      { id: 'cats_eye_alexandrite', name: 'Cat’s Eye & Alexandrite', nameAr: '', count: 60 },
      { id: 'gold_jewelry', name: '22K Gold & Gem Jewelry', nameAr: '', count: 120 },
    ],
    popularSpecs: ['Carat Weight', 'Gemstone Type', 'Cut & Shape', 'NGJA / GIA Certification', 'Treatment (Unheated/Heated)', 'Origin']
  },
  {
    id: 'properties',
    name: 'Houses & Properties',
    nameAr: '',
    icon: 'Building2',
    color: 'from-teal-600 to-cyan-700',
    count: 950,
    subcategories: [
      { id: 'houses_sale', name: 'Houses for Sale', nameAr: '', count: 480 },
      { id: 'bungalows', name: 'Colonial Bungalows & Villas', nameAr: '', count: 120 },
      { id: 'houses_rent', name: 'Houses for Rent', nameAr: '', count: 190 },
      { id: 'commercial_buildings', name: 'Commercial Buildings & Shops', nameAr: '', count: 160 },
    ],
    popularSpecs: ['Bedrooms', 'Bathrooms', 'Land Extent (Perches)', 'Floor Area (sqft)', 'Parking Slots']
  },
  {
    id: 'vehicles',
    name: 'Motors & Vehicles',
    nameAr: '',
    icon: 'Car',
    color: 'from-amber-500 to-red-600',
    count: 1180,
    subcategories: [
      { id: 'cars', name: 'Cars for Sale', nameAr: '', count: 580 },
      { id: 'suvs', name: '4x4 & SUVs (Prado/Land Cruiser)', nameAr: '', count: 210 },
      { id: 'vans', name: 'Vans & KDH Commuter', nameAr: '', count: 160 },
      { id: 'three_wheelers', name: 'Three-Wheelers (Tuk-Tuk)', nameAr: '', count: 140 },
      { id: 'motorcycles', name: 'Motorcycles & Scooters', nameAr: '', count: 90 },
    ],
    popularSpecs: ['Make & Model', 'Year', 'Mileage (km)', 'Fuel Type', 'Transmission', 'Provincial Registration (CP/WP)']
  },
  {
    id: 'agriculture',
    name: 'Spices & Farm Produce',
    nameAr: '',
    icon: 'Trees',
    color: 'from-emerald-700 to-lime-800',
    count: 430,
    subcategories: [
      { id: 'black_pepper', name: 'Matale Black Pepper & White Pepper', nameAr: '', count: 180 },
      { id: 'cardamom_cloves', name: 'Cardamom & Cloves', nameAr: '', count: 110 },
      { id: 'cinnamon_vanilla', name: 'Ceylon Cinnamon & Vanilla', nameAr: '', count: 85 },
      { id: 'plant_nursery', name: 'Spice Plants & Seedlings', nameAr: '', count: 55 },
    ],
    popularSpecs: ['Grade', 'Weight / Quantity', 'Moisture Level', 'Organic Certified', 'Packaging']
  },
  {
    id: 'electronics',
    name: 'Electronics & Mobiles',
    nameAr: '',
    icon: 'Smartphone',
    color: 'from-indigo-500 to-blue-700',
    count: 1450,
    subcategories: [
      { id: 'mobiles', name: 'Smartphones & Tablets', nameAr: '', count: 720 },
      { id: 'laptops', name: 'Laptops & Computers', nameAr: '', count: 340 },
      { id: 'solar_power', name: 'Solar Systems & Inverters', nameAr: '', count: 190 },
      { id: 'appliances', name: 'Home Appliances & TVs', nameAr: '', count: 200 },
    ],
    popularSpecs: ['Brand', 'Model', 'TRCSL Approval', 'Warranty Status', 'Condition']
  },
  {
    id: 'services',
    name: 'Services & Tourism',
    nameAr: '',
    icon: 'Briefcase',
    color: 'from-teal-500 to-emerald-600',
    count: 360,
    subcategories: [
      { id: 'knuckles_tours', name: 'Knuckles & Riverston Trekking Guides', nameAr: '', count: 120 },
      { id: 'gem_testing', name: 'Gemstone Appraisal & Lapidary', nameAr: '', count: 65 },
      { id: 'deed_surveyor', name: 'Land Surveyors & Legal Notaries', nameAr: '', count: 85 },
      { id: 'construction', name: 'Building Contractors & Landscaping', nameAr: '', count: 90 },
    ]
  }
];

export const INITIAL_LISTINGS: Listing[] = [];

export const INITIAL_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    listingId: 'list-1',
    sellerId: 'sel-1',
    authorName: 'Dr. Rohan Wickramasinghe',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    authorLocation: 'Colombo & Kandy',
    rating: 5,
    title: 'Flawless Deed Verification & Honest Estate Description',
    comment: 'Purchased a tea plot through Mr. Sunil. The deed was cleanly checked at the Matale Land Registry with zero encumbrances. Highly recommended seller on ebuymatale.lk!',
    date: '3 days ago',
    verifiedPurchase: true,
    helpfulCount: 18,
    sellerReply: {
      text: 'Thank you Dr. Rohan! We strive to maintain absolute transparency for all land buyers in Matale.',
      date: '2 days ago'
    }
  },
  {
    id: 'rev-2',
    listingId: 'list-2',
    sellerId: 'sel-2',
    authorName: 'Dhammika Perera',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    authorLocation: 'Matale',
    rating: 5,
    title: 'Top Gem Quality & Genuine NGJA Certificate',
    comment: 'The Ceylon Blue Sapphire was examined directly at NGJA Colombo and the certificate was 100% verified. Superb color and natural luster.',
    date: '1 week ago',
    verifiedPurchase: true,
    helpfulCount: 24
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv-1',
    listingId: 'list-1',
    listingTitle: 'Prime 4.5 Acre Tea & Black Pepper Estate with Mountain Stream - Rattota',
    listingPrice: 38500000,
    listingImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    listingLocation: 'Rattota (Tea & Spices)',
    otherUser: {
      id: 'sel-1',
      name: 'Sunil Dissanayake (Highland Plantations)',
      phone: '0743383338',
      whatsapp: '0743383338',
      email: 'plantations@ebuymatale.lk',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      isVerified: true,
      rating: 4.9,
      reviewCount: 42,
      joinedDate: 'Joined March 2021',
      responseRate: '99%',
      responseTime: 'within 5 minutes',
      location: 'Rattota, Matale',
      isOnline: true
    },
    lastMessage: 'Ayubowan! You are welcome to visit the estate this Saturday for land boundary inspection.',
    lastMessageTime: '15 mins ago',
    unreadCount: 1,
    messages: [
      {
        id: 'msg-1',
        senderId: 'buyer-me',
        senderName: 'Buyer',
        text: 'Hello, is the 4.5 acre tea estate in Rattota still available? Can we inspect the Bim Saviya deed copy?',
        timestamp: '1 hour ago',
        isRead: true
      },
      {
        id: 'msg-2',
        senderId: 'sel-1',
        senderName: 'Sunil Dissanayake',
        text: 'Ayubowan! Yes, the deed is first class Sinnakkara and available for your lawyer to review at any time.',
        timestamp: '45 mins ago',
        isRead: true
      },
      {
        id: 'msg-3',
        senderId: 'sel-1',
        senderName: 'Sunil Dissanayake',
        text: 'Ayubowan! You are welcome to visit the estate this Saturday for land boundary inspection.',
        timestamp: '15 mins ago',
        isRead: false
      }
    ]
  }
];

export const INITIAL_ADMIN_STATS: AdminStats = {
  totalListings: 148,
  activeListings: 139,
  pendingListings: 7,
  reportedListings: 2,
  totalUsers: 8420,
  verifiedSellers: 320,
  totalVolumeQAR: 184500000,
  promotionsRevenueQAR: 1250000,
  totalTransactions: 194
};

export const INITIAL_TRANSACTIONS: PaymentTransaction[] = [
  {
    id: 'tx-1',
    type: 'ad_boost',
    amount: 5500,
    currency: 'LKR',
    listingId: 'list-1',
    listingTitle: 'Prime 4.5 Acre Tea & Black Pepper Estate',
    buyerName: 'Sunil Dissanayake',
    method: 'Card',
    status: 'completed',
    date: 'Oct 02, 2026'
  },
  {
    id: 'tx-2',
    type: 'vip_badge',
    amount: 12500,
    currency: 'LKR',
    listingId: 'list-2',
    listingTitle: 'Certified Natural Ceylon Royal Blue Sapphire',
    buyerName: 'Matale Crown Gem Lapidary',
    method: 'Card',
    status: 'completed',
    date: 'Oct 01, 2026'
  }
];

export const ADVERTISING_PACKAGES: AdPackage[] = [
  {
    id: 'pkg-free',
    name: 'Standard Free Listing',
    nameAr: '',
    tier: 'free',
    priceQAR: 0,
    durationDays: 30,
    viewsMultiplier: '1x',
    badge: 'Standard',
    badgeAr: '',
    tagline: 'Basic classified listing in Matale directory',
    taglineAr: '',
    features: [
      'Active for 30 Days',
      'Up to 5 High-Res Photos',
      'Direct WhatsApp & Call Button',
      'Matale District Map Pin'
    ],
    featuresAr: [],
    isFree: true,
    colorScheme: 'slate'
  },
  {
    id: 'pkg-bump',
    name: 'Instant 24H Bump',
    nameAr: '',
    tier: 'bump_24h',
    priceQAR: 1500,
    durationDays: 3,
    viewsMultiplier: '3x Views',
    badge: 'Top Bump',
    badgeAr: '',
    tagline: 'Refreshes your ad to the top of search results',
    taglineAr: '',
    features: [
      'Bumps back to #1 top position',
      'Highlight border in search feed',
      'Instant SMS alert to matched buyers',
      '3x more inquiry clicks'
    ],
    featuresAr: [],
    colorScheme: 'blue'
  },
  {
    id: 'pkg-featured',
    name: 'Featured Prime Ad',
    nameAr: '',
    tier: 'featured_7d',
    priceQAR: 4500,
    durationDays: 7,
    viewsMultiplier: '8x Views',
    badge: 'Featured',
    badgeAr: '',
    tagline: 'Pinned to homepage carousel and category top',
    taglineAr: '',
    features: [
      'Pinned on Homepage Spotlight carousel',
      'Top placement in Lands / Gems / Vehicles',
      'Gold verified seller badge',
      'WhatsApp direct inquiry priority',
      'Social media cross-share inclusion'
    ],
    featuresAr: [],
    isPopular: true,
    colorScheme: 'emerald'
  },
  {
    id: 'pkg-vip',
    name: 'VIP Gemstone & Estate Showcase',
    nameAr: '',
    tier: 'vip_gold',
    priceQAR: 9500,
    durationDays: 14,
    viewsMultiplier: '15x Views',
    badge: 'VIP Crown',
    badgeAr: '',
    tagline: 'Maximum visibility across Sri Lanka & international diaspora',
    taglineAr: '',
    features: [
      'Guaranteed Hero Banner placement',
      'NGJA Gem / Land Deed verification review',
      'Video walkthrough embedded',
      'Featured in daily WhatsApp broadcasts',
      'Dedicated concierge buyer screening'
    ],
    featuresAr: [],
    colorScheme: 'amber'
  }
];


export const COMMERCIAL_BANNER_ADS: CommercialBannerAd[] = [
  {
    id: 'ban-1',
    title: 'Certified Ceylon Sapphire Auctions & Direct Lapidary',
    titleAr: '',
    subtitle: 'Buy direct from licensed Matale & Central Province gem merchants with NGJA reports',
    subtitleAr: '',
    advertiserName: 'Matale Gem Merchants Association',
    advertiserLogo: '💎',
    badgeText: 'Official Partner',
    badgeTextAr: '',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80',
    categoryTag: 'gems',
    ctaText: 'Explore Certified Gems',
    ctaTextAr: '',
    whatsappNumber: '0743383338',
    phone: '0743383338',
    location: 'King Street, Matale',
    impressions: 12400,
    clicks: 1420,
    status: 'active',
    isSponsored: true
  },
  {
    id: 'ban-2',
    title: 'Tea & Spice Land Valuations & Survey Services',
    titleAr: '',
    subtitle: 'Clear title deeds, Bim Saviya compliance & drone land mapping in Matale',
    subtitleAr: '',
    advertiserName: 'Matale Land Registry & Survey Consultants',
    advertiserLogo: '📐',
    badgeText: 'Deed Verified',
    badgeTextAr: '',
    imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
    categoryTag: 'lands',
    ctaText: 'Book Land Survey',
    ctaTextAr: '',
    whatsappNumber: '0743383338',
    phone: '0743383338',
    location: 'Matale Town',
    impressions: 8900,
    clicks: 940,
    status: 'active',
    isSponsored: true
  }
];

export const INITIAL_HERO_SPOTLIGHT: HeroSpotlightConfig = {
  badge: 'FEATURED MATALE ESTATE',
  location: 'Rattota (Tea & Spices)',
  imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
  price: 'Rs. 38,500,000',
  priceNum: 38500000,
  subLocation: 'Knuckles Foothills Ridge, Matale',
  title: 'Highland Tea & Black Pepper Plantation with Mountain Stream',
  titleAr: '',
  description: '4.5 Acres of fully yielding high-grown tea and export pepper. Complete Sinnakkara First Class deeds with natural mountain water supply.',
  category: 'lands',
  escrowGuaranteed: true
};

export const INITIAL_PLATFORM_CONFIG: PlatformConfig = {
  platformName: 'ebuymatale.lk',
  phone: '0743383338',
  phoneDisplay: '074 338 3338',
  whatsappNumber: '0743383338',
  announcementNotice: 'Welcome to ebuymatale.lk - Sri Lanka’s premier Matale marketplace for Lands, Ceylon Gems, Vehicles, and Live Gold Rates & Weather!',
  isAnnouncementActive: true,
  requireAdminApprovalForNewAds: true
};

export interface ImagePreset {
  name: string;
  category: string;
  url: string;
}

export const MATALE_IMAGE_PRESETS: ImagePreset[] = [
  {
    name: 'Natural Ceylon Royal Blue Sapphire (Unheated)',
    category: 'Ceylon Gems',
    url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Padparadscha Pink-Orange Ceylon Sapphire',
    category: 'Ceylon Gems',
    url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Pigeon Blood Ruby & Diamond Ring Setting',
    category: 'Ceylon Gems',
    url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Knuckles Foothills Tea & Pepper Estate (Rattota)',
    category: 'Lands & Plantations',
    url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Prime Residential Land Plot (Aluvihare Matale)',
    category: 'Lands & Plantations',
    url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Commercial Land & Road Frontage (Matale Town)',
    category: 'Lands & Plantations',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Colonial Planter Bungalow & Garden (Matale)',
    category: 'Houses & Property',
    url: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Modern 2-Story Architect Designed Residence',
    category: 'Houses & Property',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Toyota Land Cruiser Prado TX-L (WP CBG)',
    category: 'Vehicles & Motors',
    url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Toyota Hilux Revo 4x4 Double Cab',
    category: 'Vehicles & Motors',
    url: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Bajaj RE 4S 205cc Sri Lanka Three-Wheeler (Tuk Tuk)',
    category: 'Vehicles & Motors',
    url: 'https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?auto=format&fit=crop&w=1200&q=80'
  },
  {
    name: 'Organic Matale Cloves, Cardamom & Black Pepper Spices',
    category: 'Spices & Produce',
    url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80'
  }
];

export const QATAR_IMAGE_PRESETS = MATALE_IMAGE_PRESETS;

