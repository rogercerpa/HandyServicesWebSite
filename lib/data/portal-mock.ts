export interface Customer {
  id: string;
  email: string;
  name: string;
  phone: string;
  address: string;
  avatar?: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  status: "scheduled" | "in-progress" | "completed" | "cancelled";
  technician: string;
  notes?: string;
  estimatedDuration: string;
  price: number;
}

export interface ServiceHistoryItem {
  id: string;
  serviceId: string;
  serviceName: string;
  completedDate: string;
  technician: string;
  price: number;
  rating?: number;
  review?: string;
  images: string[];
  invoiceUrl?: string;
}

export interface Payment {
  id: string;
  date: string;
  amount: number;
  method: string;
  status: "paid" | "pending" | "refunded";
  description: string;
  invoiceId?: string;
}

export interface PaymentMethod {
  id: string;
  type: "card" | "bank";
  last4: string;
  expiryDate?: string;
  isDefault: boolean;
  brand?: string;
}

// Mock Data
export const mockCustomer: Customer = {
  id: "cust_001",
  email: "john.doe@example.com",
  name: "John Doe",
  phone: "(555) 123-4567",
  address: "123 Oak Street, Apt 4B, Metro City, MC 12345",
  createdAt: "2024-06-15",
};

export const mockAppointments: Appointment[] = [
  {
    id: "apt_001",
    serviceId: "ceiling-fan-replacement",
    serviceName: "Ceiling Fan Replacement",
    date: "2026-01-15",
    time: "10:00 AM",
    status: "scheduled",
    technician: "Mike R.",
    notes: "Master bedroom, customer will provide fan",
    estimatedDuration: "1.5 hours",
    price: 160,
  },
  {
    id: "apt_002",
    serviceId: "light-switches-replacement",
    serviceName: "Smart Switch Installation",
    date: "2026-01-22",
    time: "2:00 PM",
    status: "scheduled",
    technician: "Mike R.",
    notes: "3 smart switches for living room and kitchen",
    estimatedDuration: "1 hour",
    price: 225,
  },
];

export const mockServiceHistory: ServiceHistoryItem[] = [
  {
    id: "hist_001",
    serviceId: "light-fixture-replacement",
    serviceName: "Dining Room Chandelier Installation",
    completedDate: "2025-11-20",
    technician: "Mike R.",
    price: 185,
    rating: 5,
    review: "Excellent work! The chandelier looks beautiful and was installed perfectly.",
    images: [
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400",
    ],
    invoiceUrl: "#",
  },
  {
    id: "hist_002",
    serviceId: "power-receptacle-replacement",
    serviceName: "USB Outlet Installation (4 outlets)",
    completedDate: "2025-10-05",
    technician: "Mike R.",
    price: 360,
    rating: 5,
    review: "Very convenient now! No more searching for USB chargers.",
    images: [],
    invoiceUrl: "#",
  },
  {
    id: "hist_003",
    serviceId: "ring-camera-installation",
    serviceName: "Ring Doorbell & 2 Cameras",
    completedDate: "2025-08-15",
    technician: "Mike R.",
    price: 425,
    rating: 5,
    review: "Great security setup. Helped me configure everything on my phone.",
    images: [
      "https://images.unsplash.com/photo-1558002038-1055907df827?w=400",
    ],
    invoiceUrl: "#",
  },
];

export const mockPayments: Payment[] = [
  {
    id: "pay_001",
    date: "2025-11-20",
    amount: 185,
    method: "Visa •••• 4242",
    status: "paid",
    description: "Dining Room Chandelier Installation",
    invoiceId: "INV-2025-0042",
  },
  {
    id: "pay_002",
    date: "2025-10-05",
    amount: 360,
    method: "Visa •••• 4242",
    status: "paid",
    description: "USB Outlet Installation",
    invoiceId: "INV-2025-0038",
  },
  {
    id: "pay_003",
    date: "2025-08-15",
    amount: 425,
    method: "Visa •••• 4242",
    status: "paid",
    description: "Ring Security Installation",
    invoiceId: "INV-2025-0029",
  },
];

export const mockPaymentMethods: PaymentMethod[] = [
  {
    id: "pm_001",
    type: "card",
    brand: "Visa",
    last4: "4242",
    expiryDate: "12/27",
    isDefault: true,
  },
  {
    id: "pm_002",
    type: "card",
    brand: "Mastercard",
    last4: "8888",
    expiryDate: "06/26",
    isDefault: false,
  },
];

// Summary stats
export const mockPortalStats = {
  totalSpent: 970,
  completedJobs: 3,
  upcomingAppointments: 2,
  averageRating: 5.0,
};

