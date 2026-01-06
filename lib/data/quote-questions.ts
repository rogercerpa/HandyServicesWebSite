export interface QuoteQuestion {
  id: string;
  question: string;
  type: "select" | "number" | "radio" | "checkbox";
  options?: { value: string; label: string; priceModifier?: number }[];
  min?: number;
  max?: number;
  pricePerUnit?: number;
}

export interface ServiceQuoteConfig {
  serviceId: string;
  serviceName: string;
  basePrice: number;
  questions: QuoteQuestion[];
}

export const quoteConfigurations: ServiceQuoteConfig[] = [
  {
    serviceId: "ceiling-fan-replacement",
    serviceName: "Ceiling Fan Replacement",
    basePrice: 125,
    questions: [
      {
        id: "fan-count",
        question: "How many ceiling fans need to be replaced?",
        type: "number",
        min: 1,
        max: 10,
        pricePerUnit: 125,
      },
      {
        id: "ceiling-height",
        question: "What is your ceiling height?",
        type: "select",
        options: [
          { value: "standard", label: "Standard (8-9 ft)", priceModifier: 0 },
          { value: "tall", label: "Tall (10-12 ft)", priceModifier: 35 },
          { value: "vaulted", label: "Vaulted/Cathedral (12+ ft)", priceModifier: 75 },
        ],
      },
      {
        id: "existing-wiring",
        question: "Is there existing wiring at the location?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes, there's an existing fan or light fixture", priceModifier: 0 },
          { value: "no", label: "No, new wiring is needed", priceModifier: 150 },
        ],
      },
      {
        id: "remote-control",
        question: "Does the new fan have a remote control?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes, setup remote", priceModifier: 15 },
          { value: "no", label: "No, wall switch only", priceModifier: 0 },
        ],
      },
    ],
  },
  {
    serviceId: "light-fixture-replacement",
    serviceName: "Light Fixture Replacement",
    basePrice: 95,
    questions: [
      {
        id: "fixture-count",
        question: "How many fixtures need to be replaced?",
        type: "number",
        min: 1,
        max: 20,
        pricePerUnit: 95,
      },
      {
        id: "fixture-type",
        question: "What type of fixture are you installing?",
        type: "select",
        options: [
          { value: "flush-mount", label: "Flush Mount", priceModifier: 0 },
          { value: "pendant", label: "Pendant Light", priceModifier: 15 },
          { value: "chandelier-small", label: "Small Chandelier", priceModifier: 35 },
          { value: "chandelier-large", label: "Large Chandelier (heavy)", priceModifier: 75 },
        ],
      },
      {
        id: "ceiling-height",
        question: "What is your ceiling height?",
        type: "select",
        options: [
          { value: "standard", label: "Standard (8-9 ft)", priceModifier: 0 },
          { value: "tall", label: "Tall (10-12 ft)", priceModifier: 25 },
          { value: "vaulted", label: "Vaulted (12+ ft)", priceModifier: 50 },
        ],
      },
    ],
  },
  {
    serviceId: "light-fixture-installation",
    serviceName: "Light Fixture Installation (New Location)",
    basePrice: 175,
    questions: [
      {
        id: "fixture-count",
        question: "How many new fixtures need to be installed?",
        type: "number",
        min: 1,
        max: 10,
        pricePerUnit: 175,
      },
      {
        id: "wiring-distance",
        question: "How far is the nearest power source?",
        type: "select",
        options: [
          { value: "close", label: "Less than 10 feet", priceModifier: 0 },
          { value: "medium", label: "10-25 feet", priceModifier: 50 },
          { value: "far", label: "More than 25 feet", priceModifier: 100 },
        ],
      },
      {
        id: "new-switch",
        question: "Do you need a new switch installed?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes, install new switch", priceModifier: 50 },
          { value: "no", label: "No, connect to existing switch", priceModifier: 0 },
        ],
      },
    ],
  },
  {
    serviceId: "light-switches-replacement",
    serviceName: "Light Switches Replacement/Upgrade",
    basePrice: 65,
    questions: [
      {
        id: "switch-count",
        question: "How many switches need to be replaced?",
        type: "number",
        min: 1,
        max: 20,
        pricePerUnit: 65,
      },
      {
        id: "switch-type",
        question: "What type of switches?",
        type: "select",
        options: [
          { value: "standard", label: "Standard Toggle/Rocker", priceModifier: 0 },
          { value: "dimmer", label: "Dimmer Switch", priceModifier: 15 },
          { value: "smart", label: "Smart Switch", priceModifier: 25 },
        ],
      },
      {
        id: "multi-way",
        question: "Are any switches part of a 3-way or 4-way setup?",
        type: "radio",
        options: [
          { value: "no", label: "No, single switches only", priceModifier: 0 },
          { value: "3way", label: "Yes, some are 3-way", priceModifier: 25 },
          { value: "4way", label: "Yes, some are 4-way", priceModifier: 40 },
        ],
      },
    ],
  },
  {
    serviceId: "lighting-controls-installation",
    serviceName: "Lighting Controls Installation",
    basePrice: 150,
    questions: [
      {
        id: "control-type",
        question: "What type of lighting control do you need?",
        type: "select",
        options: [
          { value: "timer", label: "Timer Switches", priceModifier: 0 },
          { value: "motion", label: "Motion Sensors", priceModifier: 25 },
          { value: "smart-basic", label: "Basic Smart Lighting (1-5 devices)", priceModifier: 50 },
          { value: "smart-advanced", label: "Advanced Smart System (6+ devices)", priceModifier: 150 },
        ],
      },
      {
        id: "device-count",
        question: "How many devices/switches?",
        type: "number",
        min: 1,
        max: 20,
        pricePerUnit: 40,
      },
      {
        id: "hub-needed",
        question: "Do you already have a smart home hub?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes, I have a hub", priceModifier: 0 },
          { value: "no", label: "No, I need help setting up", priceModifier: 50 },
        ],
      },
    ],
  },
  {
    serviceId: "power-receptacle-repair",
    serviceName: "Power Receptacle Repair",
    basePrice: 85,
    questions: [
      {
        id: "outlet-count",
        question: "How many outlets need repair?",
        type: "number",
        min: 1,
        max: 10,
        pricePerUnit: 85,
      },
      {
        id: "issue-type",
        question: "What seems to be the issue?",
        type: "select",
        options: [
          { value: "not-working", label: "Outlet not working", priceModifier: 0 },
          { value: "intermittent", label: "Intermittent power", priceModifier: 0 },
          { value: "sparking", label: "Sparking or burning smell", priceModifier: 25 },
          { value: "loose", label: "Loose/wobbly outlet", priceModifier: 0 },
        ],
      },
    ],
  },
  {
    serviceId: "power-receptacle-replacement",
    serviceName: "Power Receptacle Replacement",
    basePrice: 75,
    questions: [
      {
        id: "outlet-count",
        question: "How many outlets need to be replaced?",
        type: "number",
        min: 1,
        max: 20,
        pricePerUnit: 75,
      },
      {
        id: "outlet-type",
        question: "What type of outlets do you want?",
        type: "select",
        options: [
          { value: "standard", label: "Standard 3-prong", priceModifier: 0 },
          { value: "usb", label: "USB Charging Outlets", priceModifier: 15 },
          { value: "gfci", label: "GFCI Outlets", priceModifier: 25 },
          { value: "usb-c", label: "USB-C Fast Charging Outlets", priceModifier: 25 },
        ],
      },
    ],
  },
  {
    serviceId: "ring-camera-installation",
    serviceName: "Ring Camera Installation",
    basePrice: 125,
    questions: [
      {
        id: "device-count",
        question: "How many Ring devices need to be installed?",
        type: "number",
        min: 1,
        max: 10,
        pricePerUnit: 125,
      },
      {
        id: "device-type",
        question: "What type of Ring device?",
        type: "checkbox",
        options: [
          { value: "doorbell", label: "Ring Doorbell", priceModifier: 0 },
          { value: "indoor-cam", label: "Indoor Camera", priceModifier: 0 },
          { value: "outdoor-cam", label: "Outdoor Camera", priceModifier: 15 },
          { value: "floodlight", label: "Floodlight Cam", priceModifier: 35 },
        ],
      },
      {
        id: "wiring",
        question: "For doorbells, do you have existing doorbell wiring?",
        type: "radio",
        options: [
          { value: "yes", label: "Yes, existing wiring available", priceModifier: 0 },
          { value: "no", label: "No, will use battery power", priceModifier: 0 },
          { value: "need-wired", label: "No, but I want wired installation", priceModifier: 75 },
        ],
      },
    ],
  },
];

export function getQuoteConfigByServiceId(serviceId: string): ServiceQuoteConfig | undefined {
  return quoteConfigurations.find((config) => config.serviceId === serviceId);
}

export function calculateQuote(
  config: ServiceQuoteConfig,
  answers: Record<string, string | number | string[]>
): number {
  let total = 0;

  config.questions.forEach((question) => {
    const answer = answers[question.id];

    if (question.type === "number" && typeof answer === "number") {
      // For quantity questions, multiply by price per unit
      const count = Math.max(1, answer);
      if (question.pricePerUnit) {
        total += question.pricePerUnit * count;
      }
    } else if (question.options && typeof answer === "string") {
      // For select/radio, find the option and add its modifier
      const selectedOption = question.options.find((opt) => opt.value === answer);
      if (selectedOption?.priceModifier) {
        total += selectedOption.priceModifier;
      }
    } else if (question.type === "checkbox" && Array.isArray(answer)) {
      // For checkbox, add modifiers for all selected options
      answer.forEach((val) => {
        const selectedOption = question.options?.find((opt) => opt.value === val);
        if (selectedOption?.priceModifier) {
          total += selectedOption.priceModifier;
        }
      });
    }
  });

  // If no quantity question was answered, use base price
  if (total === 0) {
    total = config.basePrice;
  }

  return total;
}

