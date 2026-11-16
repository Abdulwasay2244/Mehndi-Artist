import type { MehndiServiceType } from '../utils/booking';
import type { GalleryCategoryName, GallerySection } from '../utils/galleryFilter';

export const HERO_IMAGE = '/src/assets/images/hero_bridal_mehndi_1794853636334.jpg';

export interface FeaturedCategoryCard {
  category: GalleryCategoryName;
  title: string;
  tagline: string;
  image: string;
  alt: string;
}

export const FEATURED_CATEGORIES: FeaturedCategoryCard[] = [
  {
    category: 'Bridal',
    title: 'Bridal Mehndi',
    tagline: 'Royal full-hand & forearm heirlooms',
    image: '/src/assets/images/gallery_bridal_1_1794853636749.jpg',
    alt: 'Intricate symmetrical Pakistani bridal mehndi covering both palms and forearms',
  },
  {
    category: 'Arabic',
    title: 'Arabic Mehndi',
    tagline: 'Graceful shaded floral trails',
    image: '/src/assets/images/gallery_arabic_1_1794853637795.jpg',
    alt: 'Modern Arabic floral vine mehndi flowing from wrist to index finger',
  },
  {
    category: 'Eid',
    title: 'Eid Mehndi',
    tagline: 'Crescent moon & festive tikki motifs',
    image: '/src/assets/images/gallery_eid_1_1794853641461.jpg',
    alt: 'Festive Eid mehndi with crescent moon, star, and floral mandala on palm',
  },
  {
    category: 'Party Wear',
    title: 'Party Wear Mehndi',
    tagline: 'Delicate cuffs & effortless elegance',
    image: '/src/assets/images/gallery_party_1_1794853642294.jpg',
    alt: 'Graceful Party Wear mehndi bracelet cuff and finger chain on back of hand',
  },
];

export const GALLERY_SECTIONS: GallerySection[] = [
  {
    category: 'Bridal',
    title: 'Bridal Mehndi',
    description:
      'The pride of every bride’s hands—intricate and richly detailed Bridal Mehndi. Specially crafted with love for every bride to make her big day even more breathtaking.',
    items: [
      {
        id: 'bridal-1',
        title: 'Royal Peacock & Dome Bridal',
        category: 'Bridal',
        serviceType: 'Bridal Mehndi',
        styleNote: 'Symmetrical palms · Forearm arches',
        duration: '4–5 hours',
        image: '/src/assets/images/gallery_bridal_1_1794853636749.jpg',
        alt: 'Royal peacock and lotus bridal mehndi on both palms and forearms over ivory lehenga',
      },
      {
        id: 'bridal-2',
        title: 'Heritage Mandala & Jaali Stain',
        category: 'Bridal',
        serviceType: 'Bridal Mehndi',
        styleNote: 'Full forearm · Deep mahogany stain',
        duration: '5–6 hours',
        image: '/src/assets/images/gallery_bridal_2_1794853637082.jpg',
        alt: 'Traditional bridal mehndi with fine check jaali work and gold kundan bangles',
      },
      {
        id: 'bridal-3',
        title: 'Candlelit Haathphool Lacework',
        category: 'Bridal',
        serviceType: 'Bridal Mehndi',
        styleNote: 'Back-of-hand lace · Ring chain motifs',
        duration: '3.5–4.5 hours',
        image: '/src/assets/images/gallery_bridal_3_1794853637741.jpg',
        alt: 'Ornate bridal back-hand mehndi lacework with candlelit wedding decor',
      },
    ],
  },
  {
    category: 'Arabic',
    title: 'Arabic Mehndi',
    description:
      'Light, stylish, and modern Arabic Mehndi. The perfect choice for women who love a simple yet classy and sophisticated look.',
    items: [
      {
        id: 'arabic-1',
        title: 'Shaded Rose Diagonal Trail',
        category: 'Arabic',
        serviceType: 'Arabic Mehndi',
        styleNote: 'Bold floral shading · Open spacing',
        duration: '45–60 mins',
        image: '/src/assets/images/gallery_arabic_1_1794853637795.jpg',
        alt: 'Arabic mehndi featuring shaded rose and diagonal vine from wrist to index finger',
      },
      {
        id: 'arabic-2',
        title: 'Sunlit Garden Leaf Belt',
        category: 'Arabic',
        serviceType: 'Arabic Mehndi',
        styleNote: 'Back-hand swirl · Crisp leafy vines',
        duration: '45–60 mins',
        image: '/src/assets/images/gallery_arabic_2_1794853639694.jpg',
        alt: 'Modern Arabic back-hand mehndi with swirling leaves and floral clusters',
      },
      {
        id: 'arabic-3',
        title: 'Khaleeji Jasmine Palm',
        category: 'Arabic',
        serviceType: 'Arabic Mehndi',
        styleNote: 'Bold petal outlines · Finger tendrils',
        duration: '60 mins',
        image: '/src/assets/images/gallery_arabic_3_1794853639869.jpg',
        alt: 'Khaleeji Arabic palm mehndi beside fresh jasmine flowers on cream silk',
      },
    ],
  },
  {
    category: 'Eid',
    title: 'Eid Mehndi',
    description:
      'Eid celebrations are incomplete without mehndi. Charming crescent moon, star, and floral Eid Mehndi designs that make your hands shine as bright as the Eid moon.',
    items: [
      {
        id: 'eid-1',
        title: 'Chand Raat Crescent Mandala',
        category: 'Eid',
        serviceType: 'Eid Mehndi',
        styleNote: 'Crescent moon & stars · Festive charm',
        duration: '30–45 mins',
        image: '/src/assets/images/gallery_eid_1_1794853641461.jpg',
        alt: 'Festive Eid mehndi with crescent moon, star, and blooming floral mandala',
      },
      {
        id: 'eid-2',
        title: 'Classic Chikankari Gol Tikki',
        category: 'Eid',
        serviceType: 'Eid Mehndi',
        styleNote: 'Central round tikki · Beaded finger lines',
        duration: '25–35 mins',
        image: '/src/assets/images/gallery_eid_2_1794853641123.jpg',
        alt: 'Traditional Eid gol tikki round mandala mehndi centered on the palm',
      },
      {
        id: 'eid-3',
        title: 'Lantern Glow Eid Bracelet',
        category: 'Eid',
        serviceType: 'Eid Mehndi',
        styleNote: 'Wrist crescent motif · Scalloped arch',
        duration: '35–45 mins',
        image: '/src/assets/images/gallery_eid_3_1794853641641.jpg',
        alt: 'Charming Eid mehndi on back of hands with crescent wrist bracelet and glowing lanterns',
      },
    ],
  },
  {
    category: 'Party Wear',
    title: 'Party Wear Mehndi',
    description:
      'Graceful Party Wear Mehndi for weddings, dinners, or any festive celebration. Soft, delicate, and stylish patterns that look stunning on every hand.',
    items: [
      {
        id: 'party-1',
        title: 'Emerald Evening Chain Cuff',
        category: 'Party Wear',
        serviceType: 'Party Wear Mehndi',
        styleNote: 'Delicate wrist cuff · Finger chains',
        duration: '30–40 mins',
        image: '/src/assets/images/gallery_party_1_1794853642294.jpg',
        alt: 'Party Wear mehndi floral cuff bracelet and beaded finger chain over emerald silk',
      },
      {
        id: 'party-2',
        title: 'Dainty Rosebud Minimalist',
        category: 'Party Wear',
        serviceType: 'Party Wear Mehndi',
        styleNote: 'Airy negative space · Fine dots',
        duration: '25–35 mins',
        image: '/src/assets/images/gallery_party_2_1794853642686.jpg',
        alt: 'Minimalist party wear mehndi on palm with dainty rosebuds and geometric wrist band',
      },
      {
        id: 'party-3',
        title: 'Dholki Marigold Side Trail',
        category: 'Party Wear',
        serviceType: 'Party Wear Mehndi',
        styleNote: 'Side-hand vine · Tiny mandalas',
        duration: '30–45 mins',
        image: '/src/assets/images/gallery_party_3_1794853643136.jpg',
        alt: 'Wedding-guest party mehndi trailing along the side of hand at golden hour',
      },
    ],
  },
];

export type ServiceIconKey =
  | 'crown'
  | 'flower'
  | 'sparkles'
  | 'moon'
  | 'heart'
  | 'gem';

export interface ServiceItem {
  id: string;
  title: MehndiServiceType;
  shortDesc: string;
  fullDesc: string;
  durationHint: string;
  coverage: string;
  image: string;
  alt: string;
  icon: ServiceIconKey;
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'bridal',
    title: 'Bridal Mehndi',
    shortDesc: 'Intricate full-hand and feet traditional & modern bridal henna artistry.',
    fullDesc:
      'Intricate full-hand and feet traditional & modern bridal henna artistry. Personalized with heirloom motifs, royal architecture, and organic Rajasthani henna for a deep mahogany stain.',
    durationHint: '4–6 hours',
    coverage: 'Full hands & feet',
    image: '/src/assets/images/service_bridal_showcase_1794853644907.jpg',
    alt: 'Bride showcasing elaborate traditional Pakistani bridal mehndi on hands and feet',
    icon: 'crown',
  },
  {
    id: 'arabic',
    title: 'Arabic Mehndi',
    shortDesc: 'Bold floral vines, shaded patterns, and modern minimalist trails.',
    fullDesc:
      'Bold floral vines, shaded patterns, and modern minimalist trails. Flowing compositions with generous negative space that highlight natural hand elegance.',
    durationHint: '45–60 mins',
    coverage: 'Front & back trails',
    image: '/src/assets/images/service_arabic_showcase_1794853644407.jpg',
    alt: 'Flowing Arabic henna artistry with shaded blooms along wrist and fingers',
    icon: 'flower',
  },
  {
    id: 'party',
    title: 'Party Wear Mehndi',
    shortDesc: 'Quick, delicate, and trendy designs for wedding guests & festive events.',
    fullDesc:
      'Quick, delicate, and trendy designs for wedding guests & festive events. Chic wrist cuffs, finger rings, and refined floral bands ideal for dholkis and dinners.',
    durationHint: '25–40 mins',
    coverage: 'Single or both sides',
    image: '/src/assets/images/service_party_showcase_1794853645054.jpg',
    alt: 'Modern party mehndi cuff and minimal finger patterns holding a green silk clutch',
    icon: 'sparkles',
  },
  {
    id: 'eid',
    title: 'Eid Mehndi',
    shortDesc: 'Festive crescent-star, tikki, and floral patterns for Eid celebrations.',
    fullDesc:
      'Festive crescent-star, tikki, and floral patterns for Eid celebrations. Joyful, neat, and radiant henna handcrafted for Chand Raat and Eid gatherings.',
    durationHint: '30–45 mins',
    coverage: 'Palms & back of hands',
    image: '/src/assets/images/service_eid_showcase_1794853644575.jpg',
    alt: 'Celebratory Eid henna design featuring crescent moon, stars, and floral tikki',
    icon: 'moon',
  },
  {
    id: 'engagement',
    title: 'Engagement Mehndi',
    shortDesc: 'Romantic, detailed ring-ceremony designs tailored for brides-to-be.',
    fullDesc:
      'Romantic, detailed ring-ceremony designs tailored for brides-to-be. Delicate lacework and heart-inspired mandalas designed to frame your engagement ring.',
    durationHint: '1.5–2.5 hours',
    coverage: 'Hands & wrist lacework',
    image: '/src/assets/images/service_engagement_showcase_1794853645484.jpg',
    alt: 'Romantic Engagement Mehndi framing a diamond ring with delicate heart mandala',
    icon: 'heart',
  },
  {
    id: 'balochi',
    title: 'Balochi Mehndi',
    shortDesc: 'Traditional geometric, bold, and cultural Balochi-style henna patterns.',
    fullDesc:
      'Traditional geometric, bold, and cultural Balochi-style henna patterns. Crisp architectural diamonds, symmetrical borders, and deeply stained fingertips celebrating heritage craft.',
    durationHint: '1.5–2 hours',
    coverage: 'Geometric hand & fingers',
    image: '/src/assets/images/service_balochi_showcase_1794853646019.jpg',
    alt: 'Traditional Balochi geometric mehndi with crisp diamonds and deeply stained fingertips',
    icon: 'gem',
  },
];
