export const questCatalog = [
  {
    id: "important-documents",
    title: "Wichtige Unterlagen",
    subtitle: "Gather important documents",
    category: "Bureaucracy",
    stage: "preparing",
    priority: "high",
    order: 10,
    dueLabel: "Before arrival",
    estimatedTime: "1–2 hrs",
    actionLabel: "Gather your documents",
    description:
      "Collect passports, birth certificates, contracts, insurance documents, and other key paperwork before moving.",
  },
  {
    id: "krankenkasse",
    title: "Krankenkasse",
    subtitle: "Health insurance",
    category: "Healthcare",
    stage: "preparing",
    priority: "high",
    order: 20,
    dueLabel: "Before arrival",
    estimatedTime: "20–30 min",
    actionLabel: "Choose your health insurance",
    description:
      "Confirm your health insurance arrangements before relocating to Germany.",
  },
  {
    id: "moving-budget",
    title: "Umzugsbudget",
    subtitle: "Moving budget",
    category: "Finance",
    stage: "preparing",
    priority: "medium",
    order: 30,
    dueLabel: "Before move",
    estimatedTime: "45–60 min",
    actionLabel: "Review your moving budget",
    description:
      "Estimate relocation costs, first apartment expenses, deposits, furniture, utilities, and setup costs.",
  },
  {
    id: "bank",
    title: "Bankkonto",
    subtitle: "German bank account",
    category: "Finance",
    stage: "preparing",
    priority: "medium",
    order: 40,
    dueLabel: "Completed",
    estimatedTime: "45 min",
    actionLabel: "Open a German bank account",
    description:
      "Set up a German IBAN for salary payments, utilities, and direct debits.",
  },
  {
    id: "moving-logistics",
    title: "Umzugslogistik",
    subtitle: "Moving logistics",
    category: "Housing",
    stage: "preparing",
    priority: "medium",
    order: 50,
    dueLabel: "Before move",
    estimatedTime: "1–2 hrs",
    actionLabel: "Plan your move logistics",
    description:
      "Decide how belongings will be moved, what travels with you, and what can wait until after arrival.",
  },
  {
  id: "pet-travel",
  title: "Haustier-Einreise",
  subtitle: "Pet travel preparation",
  category: "Pets",
  stage: "preparing",
  priority: "medium",
  order: 60,
  dueLabel: "Before travel",
  estimatedTime: "30–60 min",
  actionLabel: "Prepare pet travel documents",
  description:
    "Check pet passport, rabies vaccination timing, transport crate, and airline or travel requirements.",

  applicableWhen: [
    {
      factId: "havePets",
      value: true,
    },
  ],
},
  {
    id: "anmeldung",
    title: "Anmeldung",
    subtitle: "Register your address",
    category: "Bureaucracy",
    stage: "just-arrived",
    priority: "high",
    order: 10,
    dueLabel: "First 2 weeks",
    estimatedTime: "30–60 min",
    actionLabel: "Prepare your Anmeldung",
    description:
      "Register your German address at the Bürgerbüro/Rathaus after moving into your apartment.",
  },
  {
    id: "tax-id",
    title: "Steuer-ID",
    subtitle: "Tax identification number",
    category: "Bureaucracy",
    stage: "just-arrived",
    priority: "high",
    order: 20,
    dueLabel: "After Anmeldung",
    estimatedTime: "10–15 min",
    actionLabel: "Track your Steuer-ID",
    description:
      "After Anmeldung, your German tax identification number is usually sent by post.",
  },
  {
    id: "rundfunkbeitrag",
    title: "Rundfunkbeitrag",
    subtitle: "Broadcasting fee",
    category: "Bureaucracy",
    stage: "just-arrived",
    priority: "medium",
    order: 30,
    dueLabel: "After registration",
    estimatedTime: "15–20 min",
    actionLabel: "Set up broadcasting fee payment",
    description:
      "Register or respond to the household broadcasting fee request after your address registration.",
  },
  {
    id: "electricity",
    title: "Stromvertrag",
    subtitle: "Electricity contract",
    category: "Utilities",
    stage: "just-arrived",
    priority: "medium",
    order: 40,
    dueLabel: "Move-in",
    estimatedTime: "20–30 min",
    actionLabel: "Confirm electricity setup",
    description:
      "Check whether electricity is already arranged or whether you need to choose a provider.",
  },
{
    id: "mobile-phone",
    title: "Mobilfunkvertrag",
    subtitle: "Mobile phone plan",
    category: "Utilities",
    stage: "just-arrived",
    priority: "medium",
    order: 50,
    dueLabel: "After arrival",
    estimatedTime: "20–30 min",
    actionLabel: "Choose a mobile plan",
    description:
      "Set up a German mobile number or eSIM if you need one for local services and two-factor authentication.",
  },

/* 
/will deal with this later as it is not always needed so we have to think about how to make it conditional
  {
    id: "lighting-installation",
    title: "Deckenbeleuchtung",
    subtitle: "Lighting installation",
    category: "Housing",
    stage: "just-arrived",
    priority: "medium",
    order: 52,
    dueLabel: "After key handover",
    estimatedTime: "Varies",
    actionLabel: "Arrange lighting installation",
    description:
      "Install ceiling lights once you have access to the apartment and can coordinate entry with the installer.",
  },
*/


  {
    id: "kitchen-installation",
    title: "Küchenmontage",
    subtitle: "Kitchen installation",
    category: "Housing",
    stage: "just-arrived",
    priority: "high",
    order: 54,
    dueLabel: "After key handover",
    estimatedTime: "Varies",
    actionLabel: "Coordinate kitchen installation",
    description:
      "Coordinate kitchen delivery and installation once you have access to the apartment.",

    applicableWhen: [
      {
        factId: "needKitchen",
        value: true,
      },
    ],
  },
  {
    id: "furniture-delivery",
    title: "Möbellieferung",
    subtitle: "Furniture delivery",
    category: "Housing",
    stage: "just-arrived",
    priority: "medium",
    order: 56,
    dueLabel: "After key handover",
    estimatedTime: "Varies",
    actionLabel: "Coordinate furniture delivery",
    description:
      "Schedule and receive furniture deliveries once someone can provide access to the apartment.",

    applicableWhen: [
      {
        factId: "needFurniture",
        value: true,
      },
    ],
  },

  /*
  /* will deal with this later as it is not always needed so we have to think about how to make it conditional
  {
    id: "wardrobe-installation",
    title: "Kleiderschrankmontage",
    subtitle: "Wardrobe installation",
    category: "Housing",
    stage: "just-arrived",
    priority: "medium",
    order: 58,
    dueLabel: "After key handover",
    estimatedTime: "Varies",
    actionLabel: "Arrange wardrobe installation",
    description:
      "Assemble or install wardrobes once you have access to the apartment.",

    applicableWhen: [
      {
        factId: "needFurniture",
        value: true,
      },
    ],
  },
  */

  {
    id: "furniture-basics",
    title: "Möbel & Grundausstattung",
    subtitle: "Furniture and essentials",
    category: "Housing",
    stage: "just-arrived",
    priority: "medium",
    order: 60,
    dueLabel: "After move-in",
    estimatedTime: "1–2 hrs",
    actionLabel: "Plan home essentials",
    description:
      "Prioritize furniture, lighting, kitchen items, cleaning supplies, and delivery timing for your new home.",

      applicableWhen: [
  {
    factId: "needFurniture",
    value: true,
  },
],
  },
// settling in stage items below for readability, not because they must be here
  {
    id: "internet",
    title: "Internetanschluss",
    subtitle: "Home internet",
    category: "Utilities",
    stage: "settling-in",
    priority: "medium",
    order: 10,
    dueLabel: "After move-in",
    estimatedTime: "15 min",
    actionLabel: "Arrange home internet",
    description:
      "Order home internet service and schedule the installation appointment.",
  },
  
  {
    id: "hausarzt",
    title: "Hausarzt",
    subtitle: "General practitioner",
    category: "Healthcare",
    stage: "settling-in",
    priority: "medium",
    order: 20,
    dueLabel: "First months",
    estimatedTime: "30–45 min",
    actionLabel: "Find a Hausarzt",
    description:
      "Identify a local general practitioner and understand how appointments and referrals work.",
  },
  {
    id: "pharmacy",
    title: "Apotheke",
    subtitle: "Local pharmacy",
    category: "Healthcare",
    stage: "settling-in",
    priority: "low",
    order: 30,
    dueLabel: "First months",
    estimatedTime: "10–15 min",
    actionLabel: "Find your local pharmacy",
    description:
      "Find nearby pharmacies and learn which one offers convenient opening hours or emergency service information.",
  },
  {
    id: "waste-sorting",
    title: "Mülltrennung",
    subtitle: "Waste sorting",
    category: "Daily Life",
    stage: "settling-in",
    priority: "medium",
    order: 40,
    dueLabel: "First weeks",
    estimatedTime: "20–30 min",
    actionLabel: "Learn local waste sorting",
    description:
      "Understand paper, packaging, organic waste, residual waste, glass, and local collection rules.",
  },
  {
    id: "public-transport",
    title: "ÖPNV",
    subtitle: "Public transport",
    category: "Transport",
    stage: "settling-in",
    priority: "medium",
    order: 50,
    dueLabel: "First weeks",
    estimatedTime: "20–30 min",
    actionLabel: "Set up public transport",
    description:
      "Review local transport zones, ticket options, apps, and regular routes for daily life.",
  },
  
// living stage items below for readability, not because they must be here


  {
    id: "german-learning",
    title: "Deutsch lernen",
    subtitle: "Learn German",
    category: "Language",
    stage: "living",
    priority: "medium",
    order: 10,
    dueLabel: "Ongoing",
    estimatedTime: "Ongoing",
    actionLabel: "Plan your German learning",
    description:
      "Choose a realistic way to continue improving your German through classes, apps, tutors, or local practice.",
  },
  {
    id: "local-community",
    title: "Lokales Leben",
    subtitle: "Local community",
    category: "Community",
    stage: "living",
    priority: "low",
    order: 20,
    dueLabel: "When ready",
    estimatedTime: "30–60 min",
    actionLabel: "Explore local community options",
    description:
      "Look for local groups, events, clubs, classes, or activities that help you feel settled.",
  },
  {
    id: "annual-insurance-review",
    title: "Versicherungscheck",
    subtitle: "Annual insurance review",
    category: "Finance",
    stage: "living",
    priority: "low",
    order: 30,
    dueLabel: "Annually",
    estimatedTime: "45–60 min",
    actionLabel: "Review your insurance setup",
    description:
      "Review health, liability, household, legal, pet, car, or other insurance needs once your situation is stable.",
  },
  {
    id: "school-registration",
    title: "Schulanmeldung",
    subtitle: "School registration",
    category: "Family",
    stage: "just-arrived",
    priority: "high",
    order: 60,
    dueLabel: "If applicable",
    estimatedTime: "1–2 hrs",
    actionLabel: "Review school registration",
    description:
      "Relevant if you have school-age children and need to understand local school registration.",

      applicableWhen: [
  {
    factId: "haveChildren",
    value: true,
  },
],
  },
  {
    id: "childcare",
    title: "Kita / Kinderbetreuung",
    subtitle: "Childcare",
    category: "Family",
    stage: "preparing",
    priority: "high",
    order: 70,
    dueLabel: "As early as possible",
    estimatedTime: "1–2 hrs",
    actionLabel: "Research childcare options",
    description:
      "Relevant if you need daycare, kindergarten, after-school care, or other childcare support.",

      applicableWhen: [
  {
    factId: "haveChildren",
    value: true,
  },
],
  },
  {
    id: "car",
    title: "Führerschein / Auto",
    subtitle: "Driving and car setup",
    category: "Transport",
    stage: "optional",
    priority: "low",
    order: 10,
    dueLabel: "Optional",
    estimatedTime: "Varies",
    actionLabel: "Review driving requirements",
    description:
      "Only applicable if you plan to drive or purchase a car in Germany.",

      applicableWhen: [
  {
    factId: "haveCar",
    value: true,
  },
],
  },
  {
    id: "dog-registration",
    title: "Hundesteuer",
    subtitle: "Dog registration tax",
    category: "Pets",
    stage: "just-arrived",
    priority: "medium",
    order: 70,
    dueLabel: "If applicable",
    estimatedTime: "20–30 min",
    actionLabel: "Register your dog",
    description:
      "Relevant if you move with a dog and need to register it with the local municipality.",

      applicableWhen: [
  {
    factId: "haveDog",
    value: true,
  },
],
  },
  /*
  This is planned for a future release, but not yet implemented in the current prototype.
  {
    id: "golf-club",
    title: "Golfclub finden",
    subtitle: "Find a golf club",
    category: "Community",
    stage: "living",
    priority: "low",
    order: 40,
    dueLabel: "When ready",
    estimatedTime: "30–60 min",
    actionLabel: "Explore local golf options",
    description:
      "Relevant if golf is one of your interests and you want to explore clubs or courses nearby.",
  },
*/

];