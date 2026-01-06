export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  image: string;
  startingPrice: number;
  priceNote?: string;
  duration: string;
  features: string[];
  process: { step: number; title: string; description: string }[];
  faq: { question: string; answer: string }[];
  relatedServices: string[];
}

export const services: Service[] = [
  {
    id: "ceiling-fan-replacement",
    slug: "ceiling-fan-replacement",
    name: "Ceiling Fan Replacement",
    shortDescription:
      "Professional removal and installation of ceiling fans with proper electrical connections.",
    fullDescription:
      "Upgrade your comfort with our professional ceiling fan replacement service. We safely remove your old fan and install your new one with precision, ensuring proper balance, secure mounting, and correct electrical connections. Whether you're upgrading to a more efficient model or changing your room's style, we've got you covered.",
    icon: "Fan",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800",
    startingPrice: 125,
    priceNote: "Fan not included",
    duration: "1-2 hours",
    features: [
      "Safe removal of existing fan",
      "Secure mounting bracket installation",
      "Proper electrical wiring",
      "Fan balancing and testing",
      "Remote/wall control setup",
      "Cleanup of work area",
    ],
    process: [
      {
        step: 1,
        title: "Assessment",
        description: "We inspect the existing wiring and ceiling structure",
      },
      {
        step: 2,
        title: "Removal",
        description: "Carefully disconnect and remove the old ceiling fan",
      },
      {
        step: 3,
        title: "Installation",
        description: "Mount the new fan bracket and assemble the fan",
      },
      {
        step: 4,
        title: "Testing",
        description: "Balance the blades and test all speed/light settings",
      },
    ],
    faq: [
      {
        question: "Can you install a fan where there's currently a light?",
        answer:
          "Yes! If there's existing electrical wiring, we can typically install a fan. We'll assess if the electrical box needs upgrading to support the fan's weight.",
      },
      {
        question: "Do I need to provide the ceiling fan?",
        answer:
          "Yes, please have the fan ready for installation. We're happy to recommend brands and models if you need suggestions.",
      },
    ],
    relatedServices: [
      "light-fixture-replacement",
      "light-switches-replacement",
    ],
  },
  {
    id: "light-fixture-replacement",
    slug: "light-fixture-replacement",
    name: "Light Fixture Replacement",
    shortDescription:
      "Swap out dated fixtures for modern lighting that transforms your space.",
    fullDescription:
      "Transform the look and feel of any room with a new light fixture. Our expert installation ensures your new chandelier, pendant, flush mount, or any other fixture is safely and securely installed. We handle all the electrical work so you can enjoy your beautiful new lighting worry-free.",
    icon: "Lightbulb",
    image: "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800",
    startingPrice: 95,
    priceNote: "Fixture not included",
    duration: "45 min - 1.5 hours",
    features: [
      "Removal of existing fixture",
      "Secure mounting installation",
      "Proper wire connections",
      "Bulb installation & testing",
      "Smart dimmer compatibility check",
      "Cleanup included",
    ],
    process: [
      {
        step: 1,
        title: "Power Off",
        description: "Safely turn off power at the breaker",
      },
      {
        step: 2,
        title: "Remove Old Fixture",
        description: "Disconnect and remove the existing light",
      },
      {
        step: 3,
        title: "Install New Fixture",
        description: "Mount and wire your new light fixture",
      },
      {
        step: 4,
        title: "Test & Finish",
        description: "Restore power and test all functions",
      },
    ],
    faq: [
      {
        question: "Can you install heavy chandeliers?",
        answer:
          "Absolutely. For heavier fixtures, we ensure the electrical box is rated for the weight and may install additional support if needed.",
      },
      {
        question: "What if my wiring is old?",
        answer:
          "We'll assess the wiring condition and let you know if any updates are needed for safety before proceeding.",
      },
    ],
    relatedServices: [
      "light-fixture-installation",
      "light-switches-replacement",
    ],
  },
  {
    id: "light-fixture-installation",
    slug: "light-fixture-installation",
    name: "Light Fixture Installation",
    shortDescription:
      "New light fixture installation in locations without existing fixtures.",
    fullDescription:
      "Want to add lighting to a new location? Our installation service covers everything from running new wiring to mounting your fixture. We'll work with your home's existing electrical system to bring light exactly where you need it, whether it's a new pendant over your kitchen island or recessed lighting in your living room.",
    icon: "Sun",
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800",
    startingPrice: 175,
    priceNote: "May vary based on wiring requirements",
    duration: "2-4 hours",
    features: [
      "Site assessment and planning",
      "New electrical box installation",
      "Wiring from existing circuit",
      "Fixture mounting and connection",
      "Switch installation if needed",
      "Full testing and cleanup",
    ],
    process: [
      {
        step: 1,
        title: "Consultation",
        description: "Determine best location and wiring route",
      },
      {
        step: 2,
        title: "Rough-in Work",
        description: "Install electrical box and run new wiring",
      },
      {
        step: 3,
        title: "Fixture Install",
        description: "Mount and connect your new light fixture",
      },
      {
        step: 4,
        title: "Final Testing",
        description: "Test all connections and switch operation",
      },
    ],
    faq: [
      {
        question: "Do I need a permit for new light installation?",
        answer:
          "Simple fixture additions typically don't require permits, but we'll advise if your specific situation needs one.",
      },
      {
        question: "Can you install recessed lighting?",
        answer:
          "Yes! We install all types of lighting including recessed, pendant, track, and more.",
      },
    ],
    relatedServices: [
      "light-fixture-replacement",
      "lighting-controls-installation",
    ],
  },
  {
    id: "light-switches-replacement",
    slug: "light-switches-replacement",
    name: "Light Switches Replacement/Upgrades",
    shortDescription:
      "Upgrade to modern switches including dimmers, smart switches, and stylish designs.",
    fullDescription:
      "Modernize your home with updated light switches. Whether you want sleek dimmer switches, convenient smart switches, or simply want to replace worn-out toggles, we provide safe and professional installation. Smart switch integration can add convenience and energy savings to your daily life.",
    icon: "ToggleRight",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    startingPrice: 65,
    priceNote: "Per switch, switch not included",
    duration: "20-45 minutes per switch",
    features: [
      "Old switch removal",
      "Smart switch compatibility check",
      "Proper wiring connections",
      "Dimmer calibration",
      "Smart home app setup",
      "Multi-switch configurations",
    ],
    process: [
      {
        step: 1,
        title: "Power Off",
        description: "Safely disconnect power at breaker",
      },
      {
        step: 2,
        title: "Remove Old Switch",
        description: "Disconnect and remove existing switch",
      },
      {
        step: 3,
        title: "Install & Wire",
        description: "Connect new switch with proper wiring",
      },
      {
        step: 4,
        title: "Configure & Test",
        description: "Set up smart features and test operation",
      },
    ],
    faq: [
      {
        question: "Do smart switches need special wiring?",
        answer:
          "Many smart switches require a neutral wire. We'll check your wiring and recommend compatible switches for your home.",
      },
      {
        question: "Can you install 3-way smart switches?",
        answer:
          "Yes, we handle 3-way and 4-way switch configurations for multi-location control.",
      },
    ],
    relatedServices: [
      "lighting-controls-installation",
      "light-fixture-replacement",
    ],
  },
  {
    id: "lighting-controls-installation",
    slug: "lighting-controls-installation",
    name: "Lighting Controls Installation",
    shortDescription:
      "Smart lighting systems, timers, motion sensors, and whole-home lighting control.",
    fullDescription:
      "Take control of your home's lighting with our advanced lighting control installation services. From simple timers and motion sensors to complete smart home lighting systems, we can automate and optimize your lighting for convenience, security, and energy efficiency.",
    icon: "Sliders",
    image: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=800",
    startingPrice: 150,
    priceNote: "Varies based on system complexity",
    duration: "1-3 hours",
    features: [
      "Smart hub integration",
      "Motion sensor installation",
      "Timer switch setup",
      "Dimmer programming",
      "Scene configuration",
      "Mobile app setup",
    ],
    process: [
      {
        step: 1,
        title: "System Design",
        description: "Plan your lighting control setup",
      },
      {
        step: 2,
        title: "Hardware Install",
        description: "Install switches, sensors, and controls",
      },
      {
        step: 3,
        title: "Programming",
        description: "Configure scenes, schedules, and automations",
      },
      {
        step: 4,
        title: "Training",
        description: "Walk you through using your new system",
      },
    ],
    faq: [
      {
        question: "Which smart home systems do you work with?",
        answer:
          "We work with all major platforms including HomeKit, Google Home, Alexa, Lutron, and more.",
      },
      {
        question: "Can I control lights when away from home?",
        answer:
          "Yes! With smart lighting controls, you can manage your lights from anywhere via smartphone.",
      },
    ],
    relatedServices: [
      "light-switches-replacement",
      "ring-camera-installation",
    ],
  },
  {
    id: "power-receptacle-repair",
    slug: "power-receptacle-repair",
    name: "Power Receptacle Repair",
    shortDescription:
      "Fix outlets that aren't working, have loose connections, or show signs of damage.",
    fullDescription:
      "Non-working or damaged outlets can be frustrating and even dangerous. Our repair service diagnoses and fixes outlet issues including loose connections, worn contacts, tripped GFCI circuits, and more. We ensure your outlets are safe and functioning properly.",
    icon: "Plug",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800",
    startingPrice: 85,
    duration: "30 min - 1 hour",
    features: [
      "Diagnostic testing",
      "Loose connection repair",
      "GFCI reset/replacement",
      "Damaged outlet repair",
      "Wiring inspection",
      "Safety verification",
    ],
    process: [
      {
        step: 1,
        title: "Diagnose",
        description: "Test outlet and trace the issue",
      },
      {
        step: 2,
        title: "Power Off",
        description: "Safely disconnect power to the circuit",
      },
      {
        step: 3,
        title: "Repair",
        description: "Fix connections or replace damaged parts",
      },
      {
        step: 4,
        title: "Test",
        description: "Verify proper function and safety",
      },
    ],
    faq: [
      {
        question: "Why did my outlet stop working suddenly?",
        answer:
          "Common causes include tripped GFCI/breaker, loose wiring, or a worn outlet. We'll diagnose the exact cause.",
      },
      {
        question: "Is a warm outlet dangerous?",
        answer:
          "A warm outlet can indicate a problem. Contact us to have it inspected as it could be a fire hazard.",
      },
    ],
    relatedServices: [
      "power-receptacle-replacement",
      "light-switches-replacement",
    ],
  },
  {
    id: "power-receptacle-replacement",
    slug: "power-receptacle-replacement",
    name: "Power Receptacle Replacement",
    shortDescription:
      "Replace outdated outlets with modern, safer options including USB and GFCI outlets.",
    fullDescription:
      "Upgrade your outlets for safety, convenience, and style. We replace old 2-prong outlets with grounded 3-prong, install GFCI protection in kitchens and bathrooms, add USB charging outlets, or simply update to match your new décor. All installations meet current electrical codes.",
    icon: "Zap",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    startingPrice: 75,
    priceNote: "Per outlet, outlet not included",
    duration: "20-40 minutes per outlet",
    features: [
      "Old outlet removal",
      "USB outlet installation",
      "GFCI outlet installation",
      "Proper grounding verification",
      "Code-compliant installation",
      "Cover plate matching",
    ],
    process: [
      {
        step: 1,
        title: "Power Off",
        description: "Safely turn off the circuit breaker",
      },
      {
        step: 2,
        title: "Remove",
        description: "Disconnect and remove old outlet",
      },
      {
        step: 3,
        title: "Install",
        description: "Wire and mount new outlet securely",
      },
      {
        step: 4,
        title: "Verify",
        description: "Test function and safety features",
      },
    ],
    faq: [
      {
        question: "Can you add grounding to 2-prong outlets?",
        answer:
          "We can upgrade to grounded outlets if ground wire is available, or install GFCI protection as an alternative.",
      },
      {
        question: "Where do I need GFCI outlets?",
        answer:
          "GFCI outlets are required near water sources: bathrooms, kitchens, garages, and outdoor areas.",
      },
    ],
    relatedServices: ["power-receptacle-repair", "light-switches-replacement"],
  },
  {
    id: "ring-camera-installation",
    slug: "ring-camera-installation",
    name: "Ring Camera Installation",
    shortDescription:
      "Professional installation of Ring doorbells, cameras, and security systems.",
    fullDescription:
      "Enhance your home security with professional Ring device installation. We mount and configure Ring doorbells, indoor and outdoor cameras, and floodlight cameras. Our service includes optimal positioning for best coverage, proper wiring, and full app setup so you can monitor your home from day one.",
    icon: "Camera",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800",
    startingPrice: 125,
    priceNote: "Device not included",
    duration: "1-2 hours per device",
    features: [
      "Optimal camera positioning",
      "Secure mounting",
      "Wired or wireless setup",
      "Doorbell transformer check",
      "Ring app configuration",
      "Motion zone setup",
    ],
    process: [
      {
        step: 1,
        title: "Site Survey",
        description: "Determine best placement for coverage",
      },
      {
        step: 2,
        title: "Install",
        description: "Mount device and connect power/wiring",
      },
      {
        step: 3,
        title: "Configure",
        description: "Set up Ring app and connect to WiFi",
      },
      {
        step: 4,
        title: "Optimize",
        description: "Adjust motion zones and alerts",
      },
    ],
    faq: [
      {
        question: "Do I need existing doorbell wiring for Ring Doorbell?",
        answer:
          "Wired installation provides constant power, but Ring Doorbells also work on battery. We can assess and recommend the best option.",
      },
      {
        question: "Can you install multiple Ring cameras?",
        answer:
          "Absolutely! We install complete Ring security systems with multiple cameras and devices.",
      },
    ],
    relatedServices: [
      "lighting-controls-installation",
      "power-receptacle-replacement",
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(serviceIds: string[]): Service[] {
  return services.filter((service) => serviceIds.includes(service.id));
}

