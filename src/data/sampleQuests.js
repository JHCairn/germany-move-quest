export const quests = [
  {
    id: "anmeldung",
    title: "Anmeldung",
    subtitle: "Register your address",
    category: "Bureaucracy",
    stage: "just-arrived",
    status: "active",
    applicable: true,
    priority: "high",
    dueLabel: "First 2 weeks",
    estimatedTime: "30–60 min",
    actionLabel: "Prepare your Anmeldung",
    description:
      "Register your German address at the Bürgerbüro/Rathaus after moving into your apartment.",
  },

  {
    id: "krankenkasse",
    title: "Krankenkasse",
    subtitle: "Health insurance",
    category: "Healthcare",
    stage: "preparing",
    status: "active",
    applicable: true,
    priority: "high",
    dueLabel: "Before arrival",
    estimatedTime: "20–30 min",
    actionLabel: "Choose your health insurance",
    description:
      "Confirm your health insurance arrangements before relocating to Germany.",
  },

  {
    id: "bank",
    title: "Bankkonto",
    subtitle: "German bank account",
    category: "Finance",
    stage: "preparing",
    status: "completed",
    applicable: true,
    priority: "medium",
    dueLabel: "Completed",
    estimatedTime: "45 min",
    actionLabel: "Open a German bank account",
    description:
      "Set up a German IBAN for salary payments, utilities, and direct debits.",
  },

  {
    id: "internet",
    title: "Internetanschluss",
    subtitle: "Home internet",
    category: "Apartment",
    stage: "settling-in",
    status: "next",
    applicable: true,
    priority: "medium",
    dueLabel: "After move-in",
    estimatedTime: "15 min",
    actionLabel: "Arrange home internet",
    description:
      "Order home internet service and schedule the installation appointment.",
  },

  {
    id: "car",
    title: "Führerschein / Auto",
    subtitle: "Driving and car setup",
    category: "Transport",
    stage: "optional",
    status: "next",
    applicable: false,
    priority: "low",
    dueLabel: "Optional",
    estimatedTime: "Varies",
    actionLabel: "Review driving requirements",
    description:
      "Only applicable if you plan to drive or purchase a car in Germany.",
  },
];