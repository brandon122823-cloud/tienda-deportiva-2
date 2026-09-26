export interface Product {
  id: string;
  name: string;
  category: 'balones' | 'uniformes' | 'tenis' | 'accesorios';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  currency: string;
  badge?: string;
  badgeType?: 'primary' | 'secondary' | 'tertiary';
  rating: number;
  reviewsCount: number;
  image: string;
  description: string;
  features?: string[];
  sizes?: string[];
  colors?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export const LOGO_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFPjVw9NO01VoywNU0q1axeODznnPIllJPLb121Cr3opWPph5JCcTzPEiSvQ8MTkTpFGxz7dxobSFWg4FImQwowkWjwgwgYG3kPgM9qpa0dMEKY6GCgD4GIgcbyhYK2Jrh3H5Uv_6tzv_LcTfpNCd_8WLLWQ3A9vZyMiE_WQwv7LVgVegyyuGQ8ST7bqTu_Yor7SdS2mmRoTTTpNuu66AdbXH0WX4O08C5VI3Gy-44BfMqluWi-nc2';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Tenis Richard Apex V2',
    category: 'tenis',
    categoryLabel: 'Calzado Pro',
    price: 2499,
    originalPrice: 2899,
    currency: 'MXN',
    badge: 'Popular',
    badgeType: 'primary',
    rating: 4.9,
    reviewsCount: 154,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCsNc5z_fW3TPedI9qq_3hfrwsL2T97y0OZlqVR8-XA_h9NIN9tkY7AqlXpI5txQ0nxmwCfAClUucrIcNFbXUxgBa2tfwj1NkBGmYff5NFgPsYKdwZdISITcvQYmm1IixtIxxQbpQInsvlrFM-68AF2DFIn14xl2i6GN9Ta2fQvo8CdjsBzCA51hRE-lp9Iv0mBOcSZjei0ifriZDjM9qDkXdkrodyzTAiW1VSBa3RDEJquNukcJcCK',
    description: 'Calzado técnico de running de alta respuesta con retorno de energía Speed Vortex, malla transpirable de triple capa y suela de agarre multisuperficie.',
    features: ['Placa estabilizadora en fibra compuesta', 'Malla ultraligera AirFlow Pro', 'Suela de goma antideslizante con tracción activa'],
    sizes: ['40', '41', '42', '42.5', '43', '44'],
    colors: ['Negro/Neón', 'Azul Eléctrico', 'Blanco/Plata']
  },
  {
    id: 'prod-2',
    name: 'Balón Oficial Match-Day',
    category: 'balones',
    categoryLabel: 'Equipamiento',
    price: 899,
    originalPrice: 1199,
    currency: 'MXN',
    badge: 'FIFA Pro',
    badgeType: 'tertiary',
    rating: 4.8,
    reviewsCount: 98,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfeDugQWmECdrNK84T8RcWBvsb3pdzGKDDYJ5Qwzbo0THA_6sIWQd89ePFudaDcDr2GuInTYr_sVBNMPGhJVrEnLtZ8mL5GOAWH7NzUpw2GsSygx3XcuZPr0ga8AhiymX15aMW6VVPiXv8ECFMfBdfX0EX9RhqOzCtes7UOe2-kMUGnNMWG-FvdTqMPzKoXLsNh_ucoYvpGKrUgfQcEArQzm3pGwKpyNQCViDajEz_wJlXSUIAXQRg',
    description: 'Balón oficial de competencia con termosellado aerodinámico de 12 paneles y micro-textura para precisión milimétrica en cualquier condición climática.',
    features: ['Certificación FIFA Quality Pro', 'Cámara de butilo de retención prolongada', 'Termosellado sin costuras visibles'],
    sizes: ['Talla 5 (Oficial)'],
    colors: ['Negro / Verde Neón', 'Blanco / Azul']
  },
  {
    id: 'prod-3',
    name: 'Uniforme Oficial Titular 2025',
    category: 'uniformes',
    categoryLabel: 'Textil Pro',
    price: 1299,
    originalPrice: 1499,
    currency: 'MXN',
    badge: 'Edición 2025',
    badgeType: 'primary',
    rating: 4.9,
    reviewsCount: 82,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuArdWjbiH2720Ax5Vh8MMCl4-XbwC6jtoVHMYazfJkX7IPRafwwsd-DzWAd6Q5zUEVa32ipPJuLz3xrFWZRC5lIjIVnhpCNINT-nd9oij9O_tGBW7NhErpj3uSfFKQ6lO34PXtkFJudBnAo8CqdEoSCUqDio721Qb3k5mnLSdJIELuhMwtMIqjzAnKDfD9VrgECcm6lM0DX7Hf5sHP9RBdGutaIFyTlPKtP2FYBsq-hmQcNVZd4c5pu',
    description: 'Camiseta técnica de partido elaborada en tejido HydroShield antibacteriano con escudo Richard térmico e inserciones de ventilación cortadas con láser.',
    features: ['Secado rápido HydroShield', 'Corte atlético ergonómico', 'Estampado oficial personalizable'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Charcoal / Azul Eléctrico', 'Negro Obsidiana']
  },
  {
    id: 'prod-4',
    name: 'Richard Volt Pro X',
    category: 'tenis',
    categoryLabel: 'Tenis',
    price: 3780,
    originalPrice: 4200,
    currency: 'MXN',
    badge: 'Nuevo',
    badgeType: 'primary',
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8Ty_O3WuOJcXP_TiqtkalaULVnE9DMgAi63PCbpNqMRW0a9hhiU_-BR7iw99L9C18dRfyDGvuaTOiOlByucEbuwdjJCPdENVNYpuDx1MsjDNC9eU06O26KrRr_DigYcgMsgBxP2pJGKfYj1DsNCnonBWDedpSAbZ9rNXZgNv86ilnyMlv4jbTXi7yMztJI0asKwjJovqBXeaj5Mmi1ftGu-gIjUqNbqU77VFtaL1_CNk3GEYzNPUK',
    description: 'Botines de fútbol de precisión con suela multiterreno para aceleración explosiva, soporte de tobillo anatómico y microtextura de disparo.',
    features: ['Suela FG/AG dual de fibra de carbono', 'Zona de impacto con microtextura Grip3D', 'Cuello FlyKnit reforzado'],
    sizes: ['39', '40', '41', '42', '43'],
    colors: ['Azul Eléctrico / Naranja']
  },
  {
    id: 'prod-5',
    name: 'Balón FIFA Pro Strike',
    category: 'balones',
    categoryLabel: 'Balones',
    price: 1180,
    originalPrice: 1350,
    currency: 'MXN',
    badge: 'Más Vendido',
    badgeType: 'tertiary',
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZFhw0VZcTf_ak20bIGbvVrLym-nTCBU9JxYjyLlIJfrW4ycKQcaHrnEJxtKJf7IkWrFsQCJJ-zxfJ1D5jAdkzfDa039ns6FeVtX6p6AYCFUPamD62MVzF1ejlNviosJ9grNMrHFND8ryVbQEJxYvQ2x72xTL5yVhotLGcySajr_juv26iVFKoUcXGMG1pLYfWos2tTHCdfKFbIgR9SFp1F9IutqfGLz981_MiL0wVTM_-Se0bzXYs',
    description: 'Balón con tecnología de flujo laminar para estabilidad en vuelos largos y toque suave acolchado de 4 capas de espuma EVA.',
    features: ['Aerodinámica probada en túnel de viento', 'Capa exterior PU japonés texturizado', 'Válvula de silicona blindada'],
    sizes: ['Talla 5 (Adulto)'],
    colors: ['Blanco / Azul Neón']
  },
  {
    id: 'prod-6',
    name: 'Jersey AeroTech Pro',
    category: 'uniformes',
    categoryLabel: 'Uniformes',
    price: 1700,
    originalPrice: 1950,
    currency: 'MXN',
    badge: 'Pro Series',
    badgeType: 'secondary',
    rating: 4.7,
    reviewsCount: 65,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDMqYaYQxnewjx4GWVNXfskOb3puyUOOKRBBnuvgjpwVWLur7c3UzWS1H28p508vYkntBArBKW9xtBzevUi754_RfrxJw7eX_LqBdeUyN8NeHOQwZFjIQVYrh3CoTZBaiiR88Vf2-qJUnUpDidGyUknV6LgJFy0yW39k7r2WDybdEj_-7dUH4EydFUwrxB7JVJ-EeMclRQdWdo0Bj0OHTXHVdzlJ8GjZM89AX9r5g8LKre-fcbg5ZgZ',
    description: 'Jersey deportivo de entrenamiento intensivo con vivos en verde neón, cuello en V termosellado y tejido de alta durabilidad resistente a jalones.',
    features: ['Microperforaciones traseras 360°', 'Costuras planas anti-rozaduras', 'Diseño exclusivo Richard 78'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Gris Antracita / Neón']
  },
  {
    id: 'prod-7',
    name: 'Mochila SportElite',
    category: 'accesorios',
    categoryLabel: 'Accesorios',
    price: 1280,
    originalPrice: 1600,
    currency: 'MXN',
    badge: '-20%',
    badgeType: 'secondary',
    rating: 4.9,
    reviewsCount: 210,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpQlLRs9QHInFzwiwSUsDMNWOMmKZPGS7hM7aru_C36noamkNjcgs_F4LiAt6LWrdPx71j-yNrB2G_XoaMAkNGcjtb45KQ7EB8a7u9U6wwUkoRRKcPSJXuW2Fi7v_Cx0qBuMUdsDIMlIE7RdMkxjySbqDpsunx4KOFTsFKQ8a_TcFJex_I-QVvkFYatX6wGII1lV5ZF3NPWhlaGV7DKcyJkFOqfpUx0wsa54Kgk0-NU9U2BRa3wbRA',
    description: 'Mochila técnica impermeable para deportistas con compartimento ventilado para calzado, porta laptop 16" acolchado y correas de compresión pectoral.',
    features: ['Compartimento aislado para zapatillas', 'Material Cordura 900D impermeable', 'Bolsillos térmicos laterales para botellas'],
    sizes: ['35 Litros'],
    colors: ['Negro Mate / Azul']
  },
  {
    id: 'prod-8',
    name: 'Balón Richard Slam Basketball',
    category: 'balones',
    categoryLabel: 'Balones Oficiales',
    price: 899,
    originalPrice: 1050,
    currency: 'MXN',
    badge: 'Oficial NBA Spec',
    badgeType: 'primary',
    rating: 4.8,
    reviewsCount: 112,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJn0GNzkvL09jEbT-SiEQ-vPoIVVzULXb-jjqOrtebdnED_x7b1r93GgvAtoWuUSGEOpqOwsq_Yd862Sp1gJTqFOOEPAWlv31COrlY0bRFb4k2YiGr3ndRzF-1q5VVyj6cB3IotNrRD3bkWQ0v-wgkic573OcERhh7_Dc_t1r7OYtWKQVbxQwIHQktmxRqikESaYrHy3TTtAIPmccBjPjlp3xZg9ftzFeHZMeF5wQ5S1__gac5XVXa',
    description: 'Balón de básquetbol para duela y asfalto con canales profundos antideslizantes de cuero compuesto para control total en dribling y tiro.',
    features: ['Cuero compuesto Micro-Touch', 'Canales Pebble Grip para tacto superior', 'Apto interior y exterior'],
    sizes: ['Talla 7 (Oficial Masculino)'],
    colors: ['Naranja Clásico / Negro']
  },
  {
    id: 'prod-9',
    name: 'Pack Pro Training Gear (2x1)',
    category: 'accesorios',
    categoryLabel: 'Accesorios',
    price: 999,
    originalPrice: 1999,
    currency: 'MXN',
    badge: '2x1 Promoción',
    badgeType: 'secondary',
    rating: 4.9,
    reviewsCount: 77,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbRCoxQG4DGMb4CK4Z1WZSzVp5o8sIhavZtylQ0ciRBCB8TR8SP4KDkRB0qJPAhvFYNDiuxgc4nRJhpFVTRpJVLkPQQJAHP3HR1jOejMU9h1HtW0UEJdHwAW5iosJHBtNaWmXKpUbtctZ51KiccSFZSodYVidECnVJ1yxLOszUinQH_cmkuZH5fUfN1WP53WL7q-KyhDfAlPCwiMVPYpGJzUzu24tCBjGZDk5gHFtvqvWHXU_2pPV5',
    description: 'Set completo de entrenamiento funcional que incluye guantes antideslizantes con muñequera, 3 bandas de resistencia elástica graduadas y termo hermético de 750ml.',
    features: ['Guantes con palma de silicona grip', 'Bandas de látex natural 15/25/35 lbs', 'Botella de acero inoxidable libre de BPA'],
    sizes: ['Pack Universal'],
    colors: ['Kit Negro / Cyan']
  },
  {
    id: 'prod-10',
    name: 'Chaqueta Impermeable Storm Resistant',
    category: 'uniformes',
    categoryLabel: 'Textil Pro',
    price: 1850,
    originalPrice: 2850,
    currency: 'MXN',
    badge: '35% OFF',
    badgeType: 'tertiary',
    rating: 4.8,
    reviewsCount: 53,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZmq9UKrbMJpzu1EQcl94IXs1--hoct7UrPWpJ1-p8Boulovss1uHUnb6BkL47UL-42tc5lvwiUy13jhhAemmV-NYJ8SOOakBPJCpE3b7G-sYAuhu-essxhmlj0au8Atwua4vCgC5-cC3GW9EZN9ZjtDJd_XUEn5wStFueJnLQutW5H4Slxn1-YqXSE0GGhSJYqxpdC4gQZK479KKAkWv1YCNg2GmzV6oqjgi13XsspgjtK46nJGnD',
    description: 'Chaqueta rompevientos ultraligera de 140g con sellado térmico en costuras, capucha ajustable y reflectores 3M para entrenar seguro bajo lluvia nocturna.',
    features: ['Membrana 10K/10K impermeable y respirable', 'Plegable en su propio bolsillo', 'Elementos reflectantes 360°'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Negro Carbono']
  },
  {
    id: 'prod-11',
    name: 'Balón Golty Space Pro',
    category: 'balones',
    categoryLabel: 'Balones',
    price: 649,
    originalPrice: 799,
    currency: 'MXN',
    badge: 'Nuevo',
    badgeType: 'primary',
    rating: 4.8,
    reviewsCount: 39,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZCMSiy0pmMvjpredyNL3DaPjTJjGqSBlo0CG0SpgpPiwYpECpQK30xmjXWVdygtQb8jW_y0EQ3lMEiVB48i8ljMlG1CkcyCJjHzRonXgAPQlGoqpH9Pm4HDTQJEbE9Mn4bA4Chju-849649u8hcm_o7-viMl241wz5nsiIKMMTti6BygzxaE00TtVUaXKLxw3HBcMzzuO_4fZQaYU85RjBInn5z3GdBeMSNH4ZuNNyiNSmHXyVnOymE1RawnvRtMTvw',
    description: 'Balón oficial con diseño de alta visibilidad para fútbol de salón y canchas sintéticas, rebote controlado y agarre firme.',
    features: ['Cubierta microtexturizada de poliuretano', 'Retención de aire superior', 'Apto fútbol sala y microfútbol'],
    sizes: ['Talla 4', 'Talla 5'],
    colors: ['Rojo Neón / Azul']
  },
  {
    id: 'prod-12',
    name: 'Casco Rawlings Atlanta Edición Pro',
    category: 'accesorios',
    categoryLabel: 'Accesorios',
    price: 1450,
    originalPrice: 1750,
    currency: 'MXN',
    badge: 'Colección Única',
    badgeType: 'secondary',
    rating: 4.9,
    reviewsCount: 46,
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1UjthKpPTG5fxNzjY68aFNQ6sVdvOi_NAMuTok77kivWLCV5aWnb1oaoHbKMXo4Pwj5VTuK83JowXZVAv9Y4MYELBN0gokD-olS5lAjZvwEEnDcDqU-jJqqRd0l-3CIXl5UOnpztk2kdDB1s4l9JzTT1nMWgcNeyCWg4I5QqRhghQlL3BCV4IubutwEt9SN6bWxmGusArH4w-1fT83aIrIxpeB1Wl67nPXK98qy5-Ahy-qmKXXBouqgK_c',
    description: 'Casco de bateo con tecnología IMPAX contra impactos de alta velocidad, visera protectora y almohadillas termoselladas transpirables.',
    features: ['Carcasa de ABS aeroespacial', 'Forro antibacterial CoolFlo', 'Certificación NOCSAE'],
    sizes: ['M (Adulto)', 'L (Adulto)'],
    colors: ['Azul Marino / Visera Roja']
  },
  {
    id: 'prod-13',
    name: 'Conjunto Thor Moto & Racing Pro',
    category: 'uniformes',
    categoryLabel: 'Uniformes',
    price: 3200,
    originalPrice: 3800,
    currency: 'MXN',
    badge: 'Edición Limitada',
    badgeType: 'primary',
    rating: 4.9,
    reviewsCount: 88,
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1WaIfViLjCe2mcwsXNZy_QyGIybLqO26osvN755UZKYg-RxdfNTA8IV0hEHB-4vMm9sQvIB5TLzVp2tyhoQCmpr-Uv0duxaMGtzkVseBvDnwBEGAGVXcCAu2yycwKLDHmC0M_V5NamTXlUAZf-TRwQ-_hK5gjoJMZvpJYBEsaAgQtWrwO1gtEFPTfZr-nPVz51G17yh1GBKIsSSwkIjG_kTgRk5ssQVQU8EXOzMCRC-ny6z2-9yoJEEVyE',
    description: 'Conjunto completo de motocross y deportes de acción con paneles elásticos In-Motion, refuerzos de rodilla en piel resistente a la abrasión y ventilación estratégica.',
    features: ['Tejido elástico de 4 vías', 'Paneles de cuero de flor entera en rodillas', 'Jersey con cuello atlético elástico'],
    sizes: ['M', 'L', 'XL'],
    colors: ['Cyan / Naranja / Negro']
  }
];

export const INITIAL_CART: CartItem[] = [
  {
    product: INITIAL_PRODUCTS[0], // Tenis Richard Apex V2
    quantity: 1,
    selectedSize: '42.5',
    selectedColor: 'Negro/Neón'
  },
  {
    product: INITIAL_PRODUCTS[1], // Balón Oficial Match-Day
    quantity: 1,
    selectedSize: 'Talla 5',
    selectedColor: 'Negro / Verde Neón'
  },
  {
    product: INITIAL_PRODUCTS[2], // Uniforme Oficial Titular
    quantity: 1,
    selectedSize: 'G (Large)',
    selectedColor: 'Charcoal / Azul Eléctrico'
  }
];
