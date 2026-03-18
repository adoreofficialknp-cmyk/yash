export interface CaseStudy {
  id: string;
  title: string;
  logo: string;
  tag: string;
  problem: string;
  solution: string;
  result: string;
  color: string;
  fullDescription: string;
  keyFeatures: string[];
  technologies: string[];
  impactMetrics: { label: string; value: string }[];
}

export const CASE_STUDIES: CaseStudy[] = [
  { 
    id: "tata-group",
    title: "Tata Group", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Tata_logo.svg/1200px-Tata_logo.svg.png",
    tag: "Enterprise Transformation",
    problem: "Legacy systems slowing down global supply chain visibility across multiple continents.",
    solution: "Implemented a unified AI-driven cloud architecture for real-time tracking and predictive logistics.",
    result: "30% reduction in operational overhead globally.",
    color: "from-neon-blue/20",
    fullDescription: "The Tata Group faced significant challenges in maintaining a cohesive view of their global supply chain. With disparate legacy systems across various business units, data silos were preventing real-time decision-making. We architected a centralized 'Digital Nervous System' using advanced cloud infrastructure and AI models to predict delays before they happened.",
    keyFeatures: [
      "Real-time global asset tracking",
      "Predictive delay modeling",
      "Unified data lake for cross-departmental insights",
      "Automated compliance reporting"
    ],
    technologies: ["Azure Cloud", "TensorFlow", "Kubernetes", "React", "Node.js"],
    impactMetrics: [
      { label: "OpEx Reduction", value: "30%" },
      { label: "Data Accuracy", value: "99.9%" },
      { label: "Response Time", value: "-45%" }
    ]
  },
  { 
    id: "titan-company",
    title: "Titan Company", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Titan_Company_logo.svg/1200px-Titan_Company_logo.svg.png",
    tag: "E-commerce Scaling",
    problem: "Fragmented customer journey across luxury watch segments and offline-online disconnect.",
    solution: "Architected a high-performance omnichannel experience with personalized AI recommendations and AR try-ons.",
    result: "150% growth in online luxury sales within 12 months.",
    color: "from-gold/20",
    fullDescription: "Titan needed to bridge the gap between their premium in-store experience and their digital presence. We developed an omnichannel strategy that allowed customers to start their journey online with AR-powered try-ons and finish in-store with personalized consultations, all tracked through a single customer ID.",
    keyFeatures: [
      "Augmented Reality (AR) watch try-on",
      "AI-driven style recommendations",
      "Seamless in-store pickup integration",
      "VIP loyalty portal"
    ],
    technologies: ["AWS", "PyTorch", "Three.js", "Next.js", "GraphQL"],
    impactMetrics: [
      { label: "Online Sales Growth", value: "150%" },
      { label: "Customer Retention", value: "+40%" },
      { label: "AR Engagement", value: "3.5M+" }
    ]
  },
  { 
    id: "amul-india",
    title: "Amul India", 
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/5e/Amul_logo.svg/1200px-Amul_logo.svg.png",
    tag: "Digital Strategy",
    problem: "Need to engage Gen-Z while maintaining heritage brand value and massive distribution scale.",
    solution: "Developed a viral social-first content engine and interactive D2C platform for direct engagement.",
    result: "Reached 50M+ unique users with 4x engagement rate.",
    color: "from-neon-pink/20",
    fullDescription: "Amul, the 'Taste of India', wanted to modernize its digital footprint without losing its iconic status. We created a D2C (Direct-to-Consumer) platform that gamified the dairy shopping experience and integrated a social-first content strategy that resonated with younger demographics.",
    keyFeatures: [
      "Interactive D2C storefront",
      "Gamified loyalty program",
      "Social media content automation",
      "Direct farmer-to-consumer storytelling"
    ],
    technologies: ["Shopify Plus", "React Native", "Firebase", "Adobe Creative Cloud"],
    impactMetrics: [
      { label: "User Reach", value: "50M+" },
      { label: "Engagement Rate", value: "4x" },
      { label: "D2C Revenue", value: "+200%" }
    ]
  },
  { 
    id: "reliance-industries",
    title: "Reliance Industries", 
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/99/Reliance_Industries_Logo.svg/1200px-Reliance_Industries_Logo.svg.png",
    tag: "Cloud Infrastructure",
    problem: "Scaling digital services for 400M+ users simultaneously with low latency requirements.",
    solution: "Custom-built edge computing nodes and high-density data processing pipelines.",
    result: "Achieved 99.99% uptime during peak traffic surges.",
    color: "from-neon-purple/20",
    fullDescription: "For Reliance's Jio ecosystem, scale is the primary challenge. We worked on optimizing their edge computing strategy to ensure that 4K streaming and high-speed data remained consistent even in remote areas during massive usage spikes.",
    keyFeatures: [
      "Edge computing optimization",
      "High-density data pipelines",
      "Real-time traffic load balancing",
      "Auto-scaling server clusters"
    ],
    technologies: ["Go", "Rust", "Docker", "Terraform", "Prometheus"],
    impactMetrics: [
      { label: "System Uptime", value: "99.99%" },
      { label: "Latency Reduction", value: "-60%" },
      { label: "User Capacity", value: "400M+" }
    ]
  },
  { 
    id: "zomato",
    title: "Zomato", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Zomato_Logo.svg/1200px-Zomato_Logo.svg.png",
    tag: "UX/UI Redesign",
    problem: "Complex checkout flow leading to cart abandonment and user frustration.",
    solution: "Psychology-backed 3-tap ordering system with predictive search and dynamic UI.",
    result: "22% increase in successful order completions.",
    color: "from-neon-cyan/20",
    fullDescription: "Zomato's app had become cluttered with features, making the core task—ordering food—difficult. We applied cognitive load theory to redesign the checkout flow, reducing the number of steps and using predictive AI to suggest what users wanted before they finished typing.",
    keyFeatures: [
      "3-tap checkout flow",
      "Predictive food search",
      "Dynamic UI personalization",
      "Real-time delivery visualization"
    ],
    technologies: ["Swift", "Kotlin", "Figma", "Amplitude", "Mixpanel"],
    impactMetrics: [
      { label: "Conversion Rate", value: "+22%" },
      { label: "Checkout Time", value: "-40%" },
      { label: "App Rating", value: "4.8/5" }
    ]
  },
  { 
    id: "mahindra-mahindra",
    title: "Mahindra & Mahindra", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Mahindra_Rise_logo.svg/1200px-Mahindra_Rise_logo.svg.png",
    tag: "Supply Chain AI",
    problem: "Inefficient inventory management across 500+ dealerships leading to capital lock-up.",
    solution: "Predictive analytics model to forecast demand and optimize stock levels using historical data.",
    result: "Saved ₹200Cr in annual inventory holding costs.",
    color: "from-neon-blue/20",
    fullDescription: "Mahindra's automotive division struggled with overstocking and understocking at various dealerships. We built a machine learning model that analyzed 10 years of sales data, local economic indicators, and seasonal trends to provide precise inventory recommendations.",
    keyFeatures: [
      "Demand forecasting engine",
      "Inventory optimization dashboard",
      "Dealer-specific stock alerts",
      "Automated procurement integration"
    ],
    technologies: ["Python", "Scikit-learn", "Tableau", "PostgreSQL", "AWS SageMaker"],
    impactMetrics: [
      { label: "Cost Savings", value: "₹200Cr" },
      { label: "Stock Accuracy", value: "92%" },
      { label: "Dealer Satisfaction", value: "+35%" }
    ]
  },
  { 
    id: "infosys",
    title: "Infosys", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/1200px-Infosys_logo.svg.png",
    tag: "Global Branding",
    problem: "Positioning as a digital-first consultant in a crowded global market.",
    solution: "Premium immersive digital experience showcasing global impact stories through interactive data.",
    result: "Ranked #1 for 'Digital Transformation' brand recall.",
    color: "from-neon-purple/20",
    fullDescription: "Infosys needed a digital platform that reflected its status as a global leader in technology services. We created an immersive, data-driven storytelling platform that allowed potential clients to explore Infosys's impact through interactive case studies and real-time project visualizations.",
    keyFeatures: [
      "Immersive 3D data visualizations",
      "Interactive global impact map",
      "Thought leadership portal",
      "Dynamic case study engine"
    ],
    technologies: ["WebGL", "D3.js", "Contentful", "Vercel", "Tailwind CSS"],
    impactMetrics: [
      { label: "Brand Recall", value: "#1" },
      { label: "Lead Generation", value: "+55%" },
      { label: "Session Duration", value: "+120%" }
    ]
  },
  { 
    id: "nykaa",
    title: "Nykaa", 
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Nykaa_Logo.svg/1200px-Nykaa_Logo.svg.png",
    tag: "Omnichannel Growth",
    problem: "Bridging the gap between offline stores and online app experience for beauty enthusiasts.",
    solution: "Integrated 'Magic Mirror' AR features with seamless in-store pickup and personalized beauty profiles.",
    result: "45% increase in cross-channel customer lifetime value.",
    color: "from-neon-pink/20",
    fullDescription: "Nykaa wanted to provide a consistent beauty consultation experience whether the customer was at home or in a physical store. We developed a unified beauty profile that synced skin tones, preferences, and purchase history across all touchpoints.",
    keyFeatures: [
      "Virtual makeup try-on",
      "Personalized beauty profiles",
      "In-store digital kiosks",
      "Omnichannel loyalty sync"
    ],
    technologies: ["React Native", "ARCore", "ARKit", "Elasticsearch", "Redis"],
    impactMetrics: [
      { label: "CLV Increase", value: "45%" },
      { label: "In-store Conversion", value: "+30%" },
      { label: "App MAU", value: "15M+" }
    ]
  }
];
