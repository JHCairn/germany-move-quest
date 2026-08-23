export const questCatalog = [
  // ============================================================
  // Vor dem Umzug · Preparing to Move
  // ============================================================

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
      "Collect the core documents you may need for the move and early German administration, and keep secure digital copies of important records.",
  },
  {
    id: "immigration-route",
    title: "Aufenthaltsrecht klären",
    subtitle: "Confirm your immigration and residence route",
    category: "Bureaucracy",
    stage: "preparing",
    priority: "high",
    order: 20,
    dueLabel: "As early as possible",
    estimatedTime: "1–2 hrs",
    actionLabel: "Confirm your residence route",
    description:
      "Determine which visa or residence status applies to your move, what must be completed before travel, which documents are required, and what employment rights apply.",
    applicableWhen: [
      {
        factId: "hasEuFreeMovementRights",
        value: false,
      },
    ],
  },
  {
    id: "krankenkasse",
    title: "Krankenkasse",
    subtitle: "Health insurance",
    category: "Healthcare",
    stage: "preparing",
    priority: "high",
    order: 30,
    dueLabel: "Before arrival",
    estimatedTime: "2–4 hours",
    actionLabel: "Choose your health insurance",
    description:
      "Confirm your health insurance arrangements before relocating to Germany.",
    guidance:
      "Germany has statutory health insurance (gesetzliche Krankenversicherung, GKV) and private health insurance (private Krankenversicherung, PKV). Which options are available and appropriate depends on your circumstances, so understand your eligibility and the implications before choosing coverage.",
    resources: [
      {
        label: "Health insurance guide",
        description:
          "Official Federal Ministry of Health guidance on Germany's statutory and private health insurance systems.",
        url: "https://www.bundesgesundheitsministerium.de/themen/krankenversicherung/online-ratgeber-krankenversicherung",
      },
      {
        label: "Feather",
        description:
          "Expat-focused digital insurance service offering English-language information and support for navigating German health insurance options.",
        url: "https://feather-insurance.com/en-de/health-insurance",
      },
    ],
  },
  {
    id: "medication-continuity",
    title: "Medikamentenversorgung",
    subtitle: "Prescription medication continuity",
    category: "Healthcare",
    stage: "preparing",
    priority: "high",
    order: 40,
    dueLabel: "Before move",
    estimatedTime: "30–60 min",
    actionLabel: "Plan your medication continuity",
    description:
      "Plan enough medication for the transition, check how your prescriptions will work in Germany, identify German equivalents if needed, and arrange ongoing prescribing without a gap.",
    applicableWhen: [
      {
        factId: "takeRegularMedication",
        value: true,
      },
    ],
  },
  {
    id: "moving-budget",
    title: "Umzugsbudget",
    subtitle: "Moving budget",
    category: "Finance",
    stage: "preparing",
    priority: "medium",
    order: 50,
    dueLabel: "Before move",
    estimatedTime: "45–60 min",
    actionLabel: "Review your moving budget",
    description:
      "Estimate relocation costs, first apartment expenses, deposits, household setup, utilities, and other move costs.",
  },
  {
    id: "bank",
    title: "Bankkonto",
    subtitle: "German bank account",
    category: "Finance",
    stage: "preparing",
    priority: "medium",
    order: 60,
    dueLabel: "Before or soon after arrival",
    estimatedTime: "45 min",
    actionLabel: "Open a German bank account",
    description:
      "Set up a German IBAN for salary payments, utilities, and direct debits.",
  },
  {
    id: "personal-liability-insurance",
    title: "Privathaftpflicht",
    subtitle: "Personal liability insurance",
    category: "Finance",
    stage: "preparing",
    priority: "medium",
    order: 70,
    dueLabel: "Before or soon after move",
    estimatedTime: "30–45 min",
    actionLabel: "Review personal liability insurance",
    description:
      "Review and arrange suitable personal liability insurance for life in Germany.",
  },
  {
    id: "household-contents-insurance",
    title: "Hausratversicherung",
    subtitle: "Household contents insurance",
    category: "Finance",
    stage: "preparing",
    priority: "medium",
    order: 80,
    dueLabel: "Before or soon after move",
    estimatedTime: "30–45 min",
    actionLabel: "Review household contents insurance",
    description:
      "Consider whether household contents insurance is appropriate for your new home and arrange coverage if needed.",
  },
  {
    id: "legal-insurance",
    title: "Rechtsschutzversicherung",
    subtitle: "Legal insurance",
    category: "Finance",
    stage: "preparing",
    priority: "low",
    order: 90,
    dueLabel: "Before or soon after move",
    estimatedTime: "30–45 min",
    actionLabel: "Review legal insurance",
    description:
      "Consider whether legal expenses insurance is appropriate for your situation in Germany and compare the areas of cover that matter to you.",
  },
  {
    id: "employment-setup",
    title: "Arbeitssituation klären",
    subtitle: "Employment setup in Germany",
    category: "Finance",
    stage: "preparing",
    priority: "medium",
    order: 100,
    dueLabel: "Before move",
    estimatedTime: "45–60 min",
    actionLabel: "Confirm your employment setup",
    description:
      "Confirm how your employment, self-employment, retirement, study, or other income situation will operate after your move to Germany.",
  },
  {
    id: "german-tax-position",
    title: "Steuerliche Situation klären",
    subtitle: "Understand your German tax position",
    category: "Finance",
    stage: "preparing",
    priority: "medium",
    order: 110,
    dueLabel: "Before or soon after move",
    estimatedTime: "45–60 min",
    actionLabel: "Review your tax position",
    description:
      "Understand the tax implications of becoming resident in Germany, including any continuing obligations in the country you are leaving, and get professional advice where appropriate.",
  },

  {
    id: "housing-search",
    title: "Wohnungssuche",
    subtitle: "Find a place to live",
    category: "Housing",
    stage: "preparing",
    priority: "high",
    order: 115,
    dueLabel: "As early as possible",
    estimatedTime: "Varies",
    actionLabel: "Explore housing options",
    description:
      "If you do not yet have a home in Germany, explore suitable areas and housing options, become familiar with common German rental and property terms, and use established property-search services to look for a place that meets your needs.",
    guidance:
      "Major nationwide property platforms include ImmoScout24 and Immowelt. Both offer websites and mobile apps for rental and purchase searches, including saved searches and listing alerts. Other regional and specialist services are also available.",
    resources: [
      {
        label: "ImmoScout24",
        description:
          "Nationwide property platform for finding homes to rent or buy.",
        url: "https://www.immobilienscout24.de/",
      },
      {
        label: "Immowelt",
        description:
          "Nationwide property platform for finding homes to rent or buy.",
        url: "https://www.immowelt.de/",
      },
      {
        label: "Housing and registration",
        description:
          "Official German government guidance for newcomers on finding housing, rental terminology, applications, and registration.",
        url: "https://www.make-it-in-germany.com/en/living-in-germany/housing-mobility/housing-registration",
      },
    ],
    applicableWhen: [
      {
        factId: "housingSecured",
        value: false,
      },
    ],
  },

  {
    id: "local-administration",
    title: "Verwaltung vor Ort",
    subtitle: "Understand your local administration",
    category: "Bureaucracy",
    stage: "preparing",
    priority: "medium",
    order: 118,
    dueLabel: "Once you know where you will live",
    estimatedTime: "20–30 min",
    actionLabel: "Understand your local area",
    description:
      "Learn where your new home sits within Germany's administrative structure, including your Gemeinde or Stadt, Landkreis or Kreis, and Bundesland, so you know which authorities and local services to look for.",
    guidance: [
      "A useful general model is municipality → district → federal state → Germany. For example: Pöcking → Landkreis Starnberg → Bayern → Deutschland.",
      "Your Gemeinde or Stadt is your municipality or city, your Landkreis or Kreis is roughly comparable to a county or district, and your Bundesland is comparable to a state.",
      "The structure is not identical everywhere: Berlin, Hamburg, and Bremen are city-states (Stadtstaaten), while kreisfreie Städte perform both municipal and district-level functions.",
      "Identify the names that apply where you plan to live so you recognise which authority later tasks are referring to.",
    ],
  },

  {
    id: "moving-logistics",
    title: "Umzugslogistik",
    subtitle: "Moving logistics",
    category: "Housing",
    stage: "preparing",
    priority: "medium",
    order: 120,
    dueLabel: "Before move",
    estimatedTime: "1–2 hrs",
    actionLabel: "Plan your move logistics",
    description:
      "Decide how belongings will be moved, what travels with you, whether anything will be moved or shipped separately, and what can wait until after arrival.",
  },
  {
    id: "address-changes",
    title: "Adressänderungen planen",
    subtitle: "Plan address and mail changes",
    category: "Bureaucracy",
    stage: "preparing",
    priority: "medium",
    order: 130,
    dueLabel: "Before move",
    estimatedTime: "30–60 min",
    actionLabel: "Plan your address changes",
    description:
      "Identify important organizations that need your new address and arrange mail forwarding or other postal handling where appropriate.",
  },




  {
    id: "home-handover",
    title: "Wohnungsübergabe",
    subtitle: "Prepare for home handover",
    category: "Housing",
    stage: "preparing",
    priority: "high",
    order: 140,
    dueLabel: "Before key handover",
    estimatedTime: "30–60 min",
    actionLabel: "Prepare for home handover",
    description:
      "Prepare for receiving the home and keys, including condition documentation, defects, meter information, access details, and other practical handover items.",
  },
  {
    id: "electricity",
    title: "Stromvertrag",
    subtitle: "Electricity contract",
    category: "Utilities",
    stage: "preparing",
    priority: "medium",
    order: 150,
    dueLabel: "Start before handover",
    estimatedTime: "20–30 min",
    actionLabel: "Arrange electricity",
    description:
      "Research your electricity setup before handover, then use the meter details and readings available with apartment access to complete or confirm the contract.",
  },
  {
    id: "internet",
    title: "Internetanschluss",
    subtitle: "Home internet",
    category: "Utilities",
    stage: "preparing",
    priority: "medium",
    order: 160,
    dueLabel: "Arrange early",
    estimatedTime: "30–60 min",
    actionLabel: "Arrange home internet",
    description:
      "Choose and order home internet early enough for equipment delivery or an installation appointment, and check whether bundling with mobile service offers useful savings.",
  },
  {
    id: "mobile-phone",
    title: "Deutsche Mobilfunknummer",
    subtitle: "German mobile number",
    category: "Utilities",
    stage: "preparing",
    priority: "medium",
    order: 170,
    dueLabel: "Before or just after arrival",
    estimatedTime: "20–30 min",
    actionLabel: "Set up a German mobile number",
    description:
      "Choose a German mobile plan and SIM or eSIM, consider whether to keep your previous number during the transition, and check bundle options with your home internet provider. Final activation may be easier after arrival.",
  },
  {
    id: "lighting-installation",
    title: "Festverdrahtete Leuchten",
    subtitle: "Hard-wired lighting",
    category: "Housing",
    stage: "preparing",
    priority: "medium",
    order: 180,
    dueLabel: "Plan before handover",
    estimatedTime: "Varies",
    actionLabel: "Arrange hard-wired lighting",
    description:
      "Purchase and arrange installation of permanently connected ceiling or wall lights, including scheduling an electrician or other qualified installer where needed.",
    applicableWhen: [
      {
        factId: "needInstalledLightFixtures",
        value: true,
      },
    ],
  },
  {
    id: "kitchen-installation",
    title: "Küchenmontage",
    subtitle: "Kitchen installation",
    category: "Housing",
    stage: "preparing",
    priority: "high",
    order: 190,
    dueLabel: "Plan before handover",
    estimatedTime: "Varies",
    actionLabel: "Coordinate kitchen installation",
    description:
      "Plan kitchen delivery and installation early, then coordinate access and installation once the home is available.",
    applicableWhen: [
      {
        factId: "needKitchen",
        value: true,
      },
    ],
  },
  {
    id: "public-transport",
    title: "Öffentlicher Nahverkehr",
    subtitle: "Local public transport",
    category: "Transport",
    stage: "preparing",
    priority: "medium",
    order: 200,
    dueLabel: "Before or soon after arrival",
    estimatedTime: "20–30 min",
    actionLabel: "Explore local public transport",
    description:
      "Familiarise yourself with the public transport available in your new area, including useful local and regional connections, journey-planning and ticketing tools, and ticket options such as the Deutschlandticket.",
    guidance:
      "Public transport is often organised through a regional transport association (Verkehrsverbund), which may have its own website and mobile app. Search for “Verkehrsverbund + [your city or region]” or “ÖPNV + [your city or region]” to identify the network serving your area.",
    resources: [
      {
        label: "DB Navigator",
        description:
          "Deutsche Bahn's journey-planning and ticketing app for local, regional, and long-distance public transport.",
        url: "https://www.bahn.de/service/mobile/db-navigator",
      },
      {
        label: "Deutschlandticket",
        description:
          "Official Deutsche Bahn information about the nationwide local and regional transport ticket.",
        url: "https://www.bahn.de/faq/deutschlandticket-kaufen",
      },
    ],

  },
  {
    id: "car",
    title: "Führerschein prüfen",
    subtitle: "Driving licence requirements",
    category: "Transport",
    stage: "preparing",
    priority: "medium",
    order: 210,
    dueLabel: "Before driving in Germany",
    estimatedTime: "30–60 min",
    actionLabel: "Check your driving licence",
    description:
      "Check whether your existing driving licence remains valid after becoming resident in Germany and whether or when an exchange or other action is required.",
    applicableWhen: [
      {
        factId: "willDrive",
        value: true,
      },
    ],
  },
  {
    id: "pet-travel",
    title: "Haustier-Einreise",
    subtitle: "Pet travel preparation",
    category: "Pets",
    stage: "preparing",
    priority: "medium",
    order: 220,
    dueLabel: "Before travel",
    estimatedTime: "30–60 min",
    actionLabel: "Prepare pet travel documents",
    description:
      "Check identification, rabies timing, required documents, transport arrangements, crate or carrier needs, and current entry requirements for your pet.",
    applicableWhen: [
      {
        factId: "havePets",
        value: true,
      },
    ],
  },
  {
    id: "pet-health-insurance",
    title: "Tierkrankenversicherung",
    subtitle: "Pet health insurance",
    category: "Pets",
    stage: "preparing",
    priority: "low",
    order: 230,
    dueLabel: "Before or soon after move",
    estimatedTime: "30–45 min",
    actionLabel: "Review pet health insurance",
    description:
      "Investigate whether pet health insurance is available and worthwhile, noting that eligibility, premiums, exclusions, and coverage can depend on the animal's age and health history.",
    applicableWhen: [
      {
        factId: "havePets",
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
    order: 240,
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

  // ============================================================
  // Frisch angekommen · Just Arrived
  // ============================================================

  {
    id: "anmeldung",
    title: "Anmeldung",
    subtitle: "Register your address",
    category: "Bureaucracy",
    stage: "just-arrived",
    priority: "high",
    milestoneCompletionPrompt:
      "Record the actual Anmeldung date under Reise to complete this quest.",
    derivedCompletionNote:
      "Completed from your Anmeldung date. If the registration did not happen, remove the actual date under Reise.",
    order: 10,
    dueLabel: "First 2 weeks",
    estimatedTime: "30–60 min",
    actionLabel: "Prepare your Anmeldung",
    description:
      "Register your German address at the Bürgerbüro/Rathaus after moving into your apartment and retain your registration confirmation.",
    guidance:
      "Registration is handled locally. Search for “Anmeldung Wohnsitz + [your Gemeinde or city]” or “Bürgerbüro + [your Gemeinde or city]”. Check the official local information for where to register, which documents to bring, opening hours, and whether you need to make an appointment in advance.",
    resources: [
      {
        label: "Residence registration",
        description:
          "Official German government information about registering a residence after moving.",
        url: "https://verwaltung.bund.de/leistungsverzeichnis/DE/leistung/99115005104000",
      },
    ],
  },
  {
    id: "mailbox-name",
    title: "Briefkasten & Namensschild",
    subtitle: "Mailbox and name label",
    category: "Housing",
    stage: "just-arrived",
    priority: "medium",
    order: 20,
    dueLabel: "As soon as possible",
    estimatedTime: "10–20 min",
    actionLabel: "Set up your mailbox name",
    description:
      "Make sure your name is correctly shown for postal delivery and that you can access and regularly check your mailbox for important German administrative mail.",
  },
  {
    id: "tax-id",
    title: "Steuer-ID",
    subtitle: "Tax identification number",
    category: "Bureaucracy",
    stage: "just-arrived",
    priority: "high",
    order: 30,
    dueLabel: "After Anmeldung",
    estimatedTime: "10–15 min",
    actionLabel: "Track your Steuer-ID",
    description:
      "After Anmeldung, watch for your German tax identification number by post and make sure you can retrieve it when needed.",
  },
  {
    id: "rundfunkbeitrag",
    title: "Rundfunkbeitrag",
    subtitle: "Broadcasting fee",
    category: "Bureaucracy",
    stage: "just-arrived",
    priority: "medium",
    order: 40,
    dueLabel: "After registration",
    estimatedTime: "15–20 min",
    actionLabel: "Set up broadcasting fee payment",
    description:
      "Register or respond to the household broadcasting fee request after your address registration.",
    guidance:
      "The broadcasting contribution (Rundfunkbeitrag) generally applies per dwelling rather than per person. If someone in your household already pays for the dwelling, you normally do not register a second contribution for the same home.",
    resources: [
      {
        label: "Rundfunkbeitrag",
        description:
          "Official Beitragsservice information and forms for registering, changing, or deregistering a dwelling.",
        url: "https://www.rundfunkbeitrag.de/buergerinnen_und_buerger/formulare/index_ger.html",
      },
    ],
  },
  {
    id: "building-management",
    title: "Haus & Hausverwaltung",
    subtitle: "Building and property management",
    category: "Housing",
    stage: "just-arrived",
    priority: "medium",
    order: 50,
    dueLabel: "First weeks",
    estimatedTime: "30–45 min",
    actionLabel: "Learn how your building works",
    description:
      "Identify the relevant landlord or property-management contacts and understand building rules, access systems, common areas, waste arrangements, services, and how to report defects or repairs.",
  },
  {
    id: "emergency-numbers",
    title: "Notfälle & wichtige Nummern",
    subtitle: "Emergency and important numbers",
    category: "Daily Life",
    stage: "just-arrived",
    priority: "medium",
    order: 60,
    dueLabel: "First days",
    estimatedTime: "15–20 min",
    actionLabel: "Save important numbers",
    description:
      "Learn and save the key German emergency and urgent-service numbers and identify important local contacts you may need.",
  },
  {
    id: "shipped-belongings",
    title: "Umzugsgut prüfen",
    subtitle: "Receive separately moved belongings",
    category: "Housing",
    stage: "just-arrived",
    priority: "medium",
    order: 70,
    dueLabel: "When shipment arrives",
    estimatedTime: "Varies",
    actionLabel: "Receive and check your belongings",
    description:
      "Confirm delivery of belongings moved or shipped separately from your own travel, check for missing or damaged items, and follow up with the mover or shipping company where needed.",
    applicableWhen: [
      {
        factId: "shippingBelongingsSeparately",
        value: true,
      },
    ],
  },
  {
    id: "school-registration",
    title: "Schulanmeldung",
    subtitle: "School registration",
    category: "Family",
    stage: "just-arrived",
    priority: "high",
    order: 80,
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
    id: "dog-registration",
    title: "Hundesteuer",
    subtitle: "Dog registration tax",
    category: "Pets",
    stage: "just-arrived",
    priority: "medium",
    order: 90,
    dueLabel: "After arrival",
    estimatedTime: "20–30 min",
    actionLabel: "Register your dog",
    description:
      "Register your dog with the local municipality and arrange the applicable dog tax.",
    applicableWhen: [
      {
        factId: "haveDog",
        value: true,
      },
    ],
  },

  // ============================================================
  // Einrichten · Settling In
  // ============================================================

  {
    id: "digital-identity",
    title: "Digitale Identität",
    subtitle: "German digital identification",
    category: "Bureaucracy",
    stage: "settling-in",
    priority: "medium",
    order: 10,
    dueLabel: "First months",
    estimatedTime: "30–60 min",
    actionLabel: "Set up digital identification",
    description:
      "Set up the German digital-identification tools appropriate to you, such as BundID, AusweisApp, and an available eID route, and test that authentication works.",
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
      "Identify a local general practitioner and understand how appointments, referrals, and routine care work.",
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
      "Find nearby pharmacies and learn which ones offer convenient opening hours and where to find emergency pharmacy information.",
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
      "Understand local rules for residual waste, packaging and recycling, organic waste, paper, glass, returnables, and collection.",
    guidance: [
      "Waste sorting and collection arrangements vary locally. Common categories include residual waste (Restmüll), organic waste (Biomüll), paper (Papier), packaging collected through the Gelbe Tonne or Gelber Sack, and glass.",
      "Search for “Abfallwirtschaft + [your Landkreis or city]” or “Abfallkalender + [your Gemeinde or city]” to find the responsible local service, collection schedules, and the rules that apply where you live.",
      "Also become familiar with Germany's deposit-return system (Pfand) for many bottles and cans, which are normally returned through shops rather than placed in household recycling.",
    ],
    resources: [
      {
        label: "Mülltrennung wirkt",
        description:
          "Practical guidance on correctly sorting packaging, paper, glass, organic waste, and residual waste in Germany.",
        url: "https://www.muelltrennung-wirkt.de/en/",
      },
    ],
  },

  {
    id: "grocery-shopping",
    title: "Lebensmittel einkaufen",
    subtitle: "Grocery and food shopping",
    category: "Daily Life",
    stage: "settling-in",
    priority: "low",
    order: 45,
    dueLabel: "First weeks",
    estimatedTime: "30–60 min",
    actionLabel: "Explore local food shopping",
    description:
      "Become familiar with food-shopping options around your new home, including supermarkets, discounters, Biomärkte, Getränkemärkte, bakeries, butchers, markets, and other local or specialty shops that suit your needs.",
  guidance: [
  "Food shopping in Germany often involves several kinds of shops rather than one store for everything. Full-range supermarkets include Edeka and Rewe, while Aldi, Lidl, Penny, and Netto are common discounters.",
  "Biomärkte specialise in organic products, while Getränkemärkte specialise in drinks and often sell beverages by the crate. Local Bäckereien, Metzgereien, Wochenmärkte, Hofläden, and international or specialty shops may also become part of your regular shopping.",
  "Explore what is near your home and what works for you. Useful map searches include “Supermarkt”, “Biomarkt”, “Getränkemarkt”, “Bäckerei”, “Metzgerei”, and “Wochenmarkt”.",
],
    },

  {
    id: "vet",
    title: "Tierarzt",
    subtitle: "Find a veterinarian",
    category: "Pets",
    stage: "settling-in",
    priority: "medium",
    order: 50,
    dueLabel: "First months",
    estimatedTime: "20–30 min",
    actionLabel: "Find a veterinarian",
    description:
      "Identify a local veterinarian and know where to seek routine and urgent veterinary care before you need it.",
    applicableWhen: [
      {
        factId: "havePets",
        value: true,
      },
    ],
  },
  {
    id: "dog-liability-insurance",
    title: "Hundehaftpflicht",
    subtitle: "Dog liability insurance",
    category: "Pets",
    stage: "settling-in",
    priority: "medium",
    order: 60,
    dueLabel: "First weeks",
    estimatedTime: "30–45 min",
    actionLabel: "Review dog liability insurance",
    description:
      "Check the dog-liability requirements that apply where you live and arrange suitable coverage for your dog.",
    applicableWhen: [
      {
        factId: "haveDog",
        value: true,
      },
    ],
  },
  {
    id: "previous-country-accounts",
    title: "Alte Konten & Verträge prüfen",
    subtitle: "Review previous-country accounts and services",
    category: "Bureaucracy",
    stage: "settling-in",
    priority: "medium",
    order: 70,
    dueLabel: "First months",
    estimatedTime: "1–2 hrs",
    actionLabel: "Review old accounts and services",
    description:
      "Review accounts and services tied to your previous home or country and deliberately decide what to close, update, keep temporarily, or retain long term.",
  },

  // ============================================================
  // Leben in Deutschland · Living in Germany
  // ============================================================

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
];
