export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  flavorProfile: string;
  colorTheme: 'classic-red' | 'zero-black' | 'cherry-purple' | 'vanilla-cream' | 'starlight-cosmic' | 'creations-meta';
  variants: { size: string; type: string }[];
  image: string;
  calories: string;
  sugar: string;
  sodium: string;
  carbs: string;
}

export interface SitemapNode {
  category: 'core' | 'product' | 'campaign' | 'utility';
  title: string;
  path: string;
  description: string;
  conversionPurpose: string;
}

export interface FoodPairing {
  id: string;
  name: string;
  image: string;
  description: string;
  matchScore: string;
}

export interface RecipeMoment {
  id: string;
  title: string;
  image: string;
  tag: string;
  readTime: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "classic-original",
    name: "Coca-Cola Original Taste",
    tagline: "The original wave of real refreshment.",
    description: "The classic, iconic beverage enjoyed worldwide since 1886. Perfectly balanced flavors crafted to spark shared moments of pure joy.",
    flavorProfile: "Iconic Cola Blend",
    colorTheme: "classic-red",
    variants: [
      { size: "330ml can", type: "Can" },
      { size: "500ml bottle", type: "Recycled Plastic Bottle" },
      { size: "1.5L bottle", type: "Family Share" }
    ],
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=600&auto=format&fit=crop",
    calories: "139 kcal",
    sugar: "35g",
    sodium: "45mg",
    carbs: "35g"
  },
  {
    id: "zero-sugar",
    name: "Coca-Cola Zero Sugar",
    tagline: "Same great taste. Zero compromise.",
    description: "Crafted for those who want the full, bold flavor of our classic recipe, but with zero sugar and zero calories. Absolute taste, zero limits.",
    flavorProfile: "Zero Sugar & Calories",
    colorTheme: "zero-black",
    variants: [
      { size: "330ml can", type: "Can" },
      { size: "500ml bottle", type: "Recycled Plastic Bottle" },
      { size: "1.5L bottle", type: "Family Share" }
    ],
    image: "/src/assets/images/coke_zero_pdp_1780510965111.png",
    calories: "0 kcal",
    sugar: "0g",
    sodium: "40mg",
    carbs: "0g"
  },
  {
    id: "cherry-cola",
    name: "Coca-Cola Cherry",
    tagline: "A wild splash of stone-fruit flavor.",
    description: "Our legendary Coca-Cola recipe infused with a bold, sweet splash of wild cherry. A delightful, crisp twist that keeps you coming back.",
    flavorProfile: "Dark Cherry Infusion",
    colorTheme: "cherry-purple",
    variants: [
      { size: "330ml can", type: "Can" },
      { size: "500ml bottle", type: "Recycled Bottle" }
    ],
    image: "https://images.unsplash.com/photo-1551782450-1a14cdb80361?q=80&w=600&auto=format&fit=crop",
    calories: "150 kcal",
    sugar: "38g",
    sodium: "35mg",
    carbs: "38g"
  },
  {
    id: "vanilla-cola",
    name: "Coca-Cola Vanilla",
    tagline: "Smooth, elegant, and deeply refreshing.",
    description: "The classic snap of Coca-Cola with a smooth, velvety French vanilla finish. Creamy and comforting yet incredibly crisp.",
    flavorProfile: "Smooth Creamy Vanilla",
    colorTheme: "vanilla-cream",
    variants: [
      { size: "330ml can", type: "Can" },
      { size: "500ml bottle", type: "Recycled Bottle" }
    ],
    image: "https://images.unsplash.com/photo-1543257580-7269da773bf5?q=80&w=600&auto=format&fit=crop",
    calories: "150 kcal",
    sugar: "40g",
    sodium: "35mg",
    carbs: "40g"
  },
  {
    id: "starlight-cola",
    name: "Coca-Cola Starlight",
    tagline: "A cosmic bite of interstellar magic.",
    description: "The first limited-edition Coca-Cola Creations release, featuring a cooling sensation and a taste reminiscent of stargazing around a campfire.",
    flavorProfile: "Interstellar Space Spark",
    colorTheme: "starlight-cosmic",
    variants: [
      { size: "330ml can", type: "Space Edition" }
    ],
    image: "https://images.unsplash.com/photo-1581612053181-ce0d771804b4?q=80&w=600&auto=format&fit=crop",
    calories: "140 kcal",
    sugar: "36g",
    sodium: "35mg",
    carbs: "37g"
  },
  {
    id: "creations-cola",
    name: "Coca-Cola Creations",
    tagline: "Co-created with culture, gaming, and AI.",
    description: "An ongoing series of fantasy-flavored, culture-forward designs bringing virtual and real worlds together inside iconic packaging.",
    flavorProfile: "Future Fantasy Blend",
    colorTheme: "creations-meta",
    variants: [
      { size: "330ml can", type: "Sleek Can" }
    ],
    image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?q=80&w=600&auto=format&fit=crop",
    calories: "120 kcal",
    sugar: "29g",
    sodium: "30mg",
    carbs: "30g"
  }
];

export const SITEMAP: SitemapNode[] = [
  // Core pages
  {
    category: "core",
    title: "Homepage",
    path: "/",
    description: "The starting point for brand immersion.",
    conversionPurpose: "Direct users to discover beverages, engage in campaigns, and register for Coke Rewards (above-the-fold engagement)."
  },
  {
    category: "core",
    title: "Our Story",
    path: "/stories",
    description: "A digital archive of brand heritage and impact since 1886.",
    conversionPurpose: "Deepen customer brand loyalty, trust, and increase time-spent-on-site through emotional history and heritage."
  },
  {
    category: "core",
    title: "Our Drinks Hub",
    path: "/drinks",
    description: "A beautiful directory listing the entire brand collection.",
    conversionPurpose: "Drive high-intent shoppers to find local retailers via the Store Locator or buy online directly through ecommerce partnerships."
  },
  // Product pages
  {
    category: "product",
    title: "Coca-Cola Original Detail",
    path: "/drinks/original",
    description: "Dedicated detail page for Coca-Cola Original Taste.",
    conversionPurpose: "Convert product discovery to shopping intent; includes direct 'Buy Online' and 'Find Near Me' CTAs."
  },
  {
    category: "product",
    title: "Coca-Cola Zero Sugar Premium Showcase",
    path: "/drinks/zero-sugar",
    description: "High-impact presentation of the premium non-caloric zero sugar option.",
    conversionPurpose: "Overcome flavor anxiety via 3D interactive model preview, recipe pairings, and direct purchase referral."
  },
  {
    category: "product",
    title: "Coca-Cola Creations Hub",
    path: "/drinks/creations",
    description: "A showcase of culture-defining limited drops.",
    conversionPurpose: "Drive high-velocity impulse discovery and social sharing, generating viral word-of-mouth."
  },
  // Campaign/seasonal pages
  {
    category: "campaign",
    title: "Coke Rewards & Loyalty",
    path: "/rewards",
    description: "Gamified reward center where sips become points.",
    conversionPurpose: "Maximize recurring retention and gather premium first-party user data through rewarding loyalty signups."
  },
  {
    category: "campaign",
    title: "Share a Coke Summer Campaign",
    path: "/campaign/summer",
    description: "Immersive summer hub showcasing limited-edition personalized bottles.",
    conversionPurpose: "Drive brand engagement through UGC (User-Generated Content) creation, recipe discovery, and summer sweepstakes entries."
  },
  // Utility pages
  {
    category: "utility",
    title: "Store Locator Finder",
    path: "/store-locator",
    description: "A dynamic, geolocation-based retail store mapper.",
    conversionPurpose: "Eliminate final friction by routing high-intent buyers directly to the nearest physical retail checkout shelf."
  },
  {
    category: "utility",
    title: "Contact & Help Desk",
    path: "/contact",
    description: "Direct relationship channel for consumer inquiries and support.",
    conversionPurpose: "Protect brand reputation, resolve concerns, and gather crucial product feedback from loyal consumers."
  }
];

export const FOOD_PAIRINGS: FoodPairing[] = [
  {
    id: "burger",
    name: "Classic Cheeseburger",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=400&auto=format&fit=crop",
    description: "The rich, savory flavors of a premium grilled beef patty and melted cheddar are perfectly cut by the crisp carbonation and dark undertones of ice-cold Zero Sugar.",
    matchScore: "98% Match"
  },
  {
    id: "pizza",
    name: "Neapolitan Pizza",
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=400&auto=format&fit=crop",
    description: "Rustic tomato acidity, fresh mozzarella, and aromatic basil are elevated by the sparkling sweetness of a Coke Zero, creating a perfect balance.",
    matchScore: "95% Match"
  },
  {
    id: "tacos",
    name: "Spicy Street Tacos",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=400&auto=format&fit=crop",
    description: "A fiery kick of jalapeno and smoky barbacoa beef is instantly calmed and enhanced by the cool, refreshing snap of Zero Sugar.",
    matchScore: "92% Match"
  },
  {
    id: "wings",
    name: "BBQ Glazed Wings",
    image: "https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=400&auto=format&fit=crop",
    description: "Sticky, caramelized barbecue glaze pairs naturally with the deep, warm notes of Zero Sugar's complex recipe, highlighting the oak smoke.",
    matchScore: "94% Match"
  }
];

export const RECIPES_AND_MOMENTS: RecipeMoment[] = [
  {
    id: "recipe-1",
    title: "The Perfect Summer Serve: Ice, Slice & Soda",
    image: "https://images.unsplash.com/photo-1497534446932-c925b458314e?q=80&w=500&auto=format&fit=crop",
    tag: "Summer Serve Guide",
    readTime: "3 min read"
  },
  {
    id: "recipe-2",
    title: "Crafting Cola-Glazed Backyard BBQ Ribs",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=500&auto=format&fit=crop",
    tag: "Culinary Highlights",
    readTime: "5 min read"
  },
  {
    id: "recipe-3",
    title: "Mocktail Magic: Red Wave Crimson Spritz",
    image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?q=80&w=500&auto=format&fit=crop",
    tag: "Aesthetic Mocktails",
    readTime: "4 min read"
  }
];

export interface CustomAnalyticsEvent {
  timestamp: string;
  eventName: string;
  parameters: Record<string, string | number>;
}
