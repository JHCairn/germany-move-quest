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
    order: 70,
    dueLabel: "Before arrival",
    estimatedTime: "1–2 hrs",
    actionLabel: "Gather your documents",
    description:
      "Collect the core documents you may need for the move and early German administration, and keep secure digital copies of important records.",
    guidance: [
      "Gather the important documents you may need during your move and first months in Germany. Keep the originals you may need for administrative appointments with you rather than packing them in shipped belongings.",
      "Depending on your circumstances, useful documents may include your passport or national identity card, birth and marriage or civil-status certificates, driving licence, employment or income documents, health-insurance information, education or professional qualifications, and relevant housing documents.",
      "If you are moving with children or pets, also gather the records needed for them, such as school or childcare records, vaccination or medical information, and pet travel or veterinary documents.",
      "Keep secure digital copies of important documents as a backup, but do not assume that a digital copy will always be accepted where an original or certified document is required.",
      "For documents issued outside Germany, check whether the authority receiving them requires a certified copy, certified translation, apostille, or other authentication before paying to have these prepared unnecessarily.",
    ],
  },
  {
    id: "immigration-route",
    title: "Aufenthaltsrecht klären",
    subtitle: "Confirm your immigration and residence route",
    category: "Bureaucracy",
    stage: "preparing",
    priority: "high",
    order: 10,
    dueLabel: "As early as possible",
    estimatedTime: "1–2 hrs",
    actionLabel: "Confirm your residence route",
    description:
      "Determine which visa or residence status applies to your move, what must be completed before travel, which documents are required, and what employment rights apply.",
    guidance:
      "Your immigration route depends on your nationality, the purpose of your move, and what you plan to do in Germany. EU/EEA citizens generally benefit from freedom of movement and do not need a visa or residence permit, while people from other countries may need a visa or residence title for work, study, family reunification, or another purpose. Check your route early because some steps may need to be completed before travel.",
    resources: [
      {
        label: "Make it in Germany – Visa & residence",
        description:
          "Official German government guidance in English for identifying visa and residence requirements and understanding the application process.",
        url: "https://www.make-it-in-germany.com/en/visa-residence/apply-for-visa",
      },
    ],
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
    order: 40,
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
    order: 80,
    dueLabel: "Before move",
    estimatedTime: "30–60 min",
    actionLabel: "Plan your medication continuity",
    description:
      "Plan enough medication for the transition, check how your prescriptions will work in Germany, identify German equivalents if needed, and arrange ongoing prescribing without a gap.",
    guidance: [
      "Plan medication continuity before you move. Bring enough of your regular medication for the transition where legally permitted, allowing time to establish ongoing prescribing in Germany rather than assuming you can immediately obtain a replacement prescription after arrival.",
      "Keep a current medication list showing the medicine name, active ingredient (Wirkstoff), strength, dose, and reason for use. Brand names can differ between countries, so the active ingredient is particularly useful when discussing an equivalent medicine with a German doctor or pharmacist.",
      "Bring useful medical documentation for ongoing treatment, especially where a German doctor may need to understand why a medicine is prescribed. Check in advance whether any medication has special rules for bringing it into Germany or requires additional documentation.",
      "Identify how you will obtain future prescriptions in Germany and allow time to find an appropriate doctor. German pharmacies can help with medication availability and equivalents, but prescription-only medicines normally require a valid prescription.",
    ],
    resources: [
      {
        label: "Medication in Germany",
        description:
          "Official German health information in English about prescription and non-prescription medicines and how medication is obtained through pharmacies in Germany.",
        url: "https://gesund.bund.de/en/arzneimittel-mit-und-ohne-rezept",
      },
      {
        label: "E-Rezept",
        description:
          "Official German health information in English about electronic prescriptions and the ways prescriptions can be redeemed at pharmacies.",
        url: "https://gesund.bund.de/en/das-e-rezept",
      },
      {
        label: "Bringing medicines into Germany",
        description:
          "Official German Customs information about bringing medicines into Germany for personal use and restrictions that may apply.",
        url: "https://www.zoll.de/EN/Private-individuals/Travel/Entering-Germany/Restrictions/Medicinal-products-and-narcotics/medicinal-products-and-narcotics_node.html",
      },
    ],
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
    order: 120,
    dueLabel: "Before move",
    estimatedTime: "45–60 min",
    actionLabel: "Review your moving budget",
    description:
      "Estimate relocation costs, first apartment or house expenses, deposits, household setup, utilities, and other move costs.",
  },
  {
    id: "bank",
    title: "Bankkonto",
    subtitle: "German bank account",
    category: "Finance",
    stage: "preparing",
    priority: "medium",
    order: 150,
    dueLabel: "Before or soon after arrival",
    estimatedTime: "1-2 hrs",
    actionLabel: "Open a German bank account",
    description:
      "Set up a German IBAN for salary payments, utilities, and direct debits.",
    resources: [
      {
        label: "N26",
        description:
          "German fully online bank with an English-language website and app, making it a potentially accessible option for newcomers who prefer digital banking.",
        url: "https://n26.com/en-de",
      },
      {
        label: "Commerzbank",
        description:
          "Traditional German bank with branches as well as online banking and an English-language banking app. Account-opening and contractual information may require German.",
        url: "https://www.commerzbank.de/portal/en/englisch/products-offers/private-clients/bank/",
      },
      {
        label: "CHECK24 – Girokonto",
        description:
          "German comparison portal for comparing current accounts from multiple banks. The service is primarily in German.",
        url: "https://www.check24.de/girokonto/",
      },
    ],
  },
  {
    id: "personal-liability-insurance",
    title: "Privathaftpflicht",
    subtitle: "Personal liability insurance",
    category: "Finance",
    stage: "preparing",
    priority: "medium",
    order: 160,
    dueLabel: "Before or soon after move",
    estimatedTime: "30–45 min",
    actionLabel: "Review personal liability insurance",
    description:
      "Review and arrange suitable personal liability insurance for life in Germany.",
    guidance: [
      "Personal liability insurance (Privathaftpflicht) covers certain claims when you accidentally cause injury to another person or damage someone else's property and are legally liable for the loss. It is voluntary, but commonly considered one of the most important forms of private insurance in Germany because liability claims can potentially be very large.",
      "Privathaftpflicht protects you against liability to other people; it is different from Hausratversicherung, which generally protects your own household belongings. When comparing policies, consider coverage limits, who is insured under the policy, deductibles, and exclusions that matter to your circumstances.",
      "Your needs can depend on your household and activities. Check whether a partner or children are covered and whether you need additional protection for circumstances such as rented property, pets, volunteering, or other activities.",
    ],
    resources: [
      {
        label: "Getsafe",
        description:
          "Digital insurance provider offering personal liability insurance with an English-language app, policy documents, support, and claims process.",
        url: "https://www.hellogetsafe.com/en-de/p/liability-de",
      },
      {
        label: "Feather",
        description:
          "Expat-focused digital insurance service offering personal liability insurance with English-language information and support.",
        url: "https://www.feather-insurance.com/personal-liability-insurance",
      },
      {
        label: "CHECK24 – Privathaftpflicht",
        description:
          "German comparison portal for comparing personal liability insurance policies from multiple insurers. The service is primarily in German.",
        url: "https://www.check24.de/privathaftpflicht/",
      },
    ],
  },
  {
    id: "household-contents-insurance",
    title: "Hausratversicherung",
    subtitle: "Household contents insurance",
    category: "Finance",
    stage: "preparing",
    priority: "medium",
    order: 170,
    dueLabel: "Before or soon after move",
    estimatedTime: "30–45 min",
    actionLabel: "Review household contents insurance",
    description:
      "Consider whether household contents insurance is appropriate for your new home and arrange coverage if needed.",
    guidance: [
      "Household contents insurance (Hausratversicherung) generally protects your own household belongings against specified risks such as fire, burglary, storm, hail, and certain types of water damage. It can cover items such as furniture, clothing, electronics, and other personal possessions in your home.",
      "Hausratversicherung protects your belongings; it is different from Privathaftpflicht, which protects you against certain liability claims when you cause injury or damage to someone else.",
      "Consider the value of the belongings you would need to replace, the risks covered, deductibles, coverage limits, and whether you need optional protection such as bicycle theft or other additional cover.",
    ],
    resources: [
      {
        label: "Getsafe",
        description:
          "Digital insurance provider offering household contents insurance with English-language information and support.",
        url: "https://www.hellogetsafe.com/en-de/p/contents-de",
      },
      {
        label: "Feather",
        description:
          "Expat-focused digital insurance service offering household contents insurance with English-language information and support.",
        url: "https://feather-insurance.com/household-insurance",
      },
      {
        label: "CHECK24 – Hausratversicherung",
        description:
          "German comparison portal for comparing household contents insurance policies from multiple insurers. The service is primarily in German.",
        url: "https://www.check24.de/hausratversicherung/",
      },
    ],
  },
  {
    id: "legal-insurance",
    title: "Rechtsschutzversicherung",
    subtitle: "Legal insurance",
    category: "Finance",
    stage: "preparing",
    priority: "low",
    order: 180,
    dueLabel: "Before or soon after move",
    estimatedTime: "30–45 min",
    actionLabel: "Review legal insurance",
    description:
      "Consider whether legal expenses insurance is appropriate for your situation in Germany and compare the areas of cover that matter to you.",
    guidance: [
      "Legal expenses insurance (Rechtsschutzversicherung) can help cover certain costs of legal disputes, such as lawyer and court fees, within the areas included in your policy. It is optional, and the usefulness of coverage depends on your circumstances.",
      "Policies can cover different areas of life, such as private matters, employment, traffic, or housing and tenancy disputes. Check which areas are included rather than assuming that a policy covers every type of legal problem.",
      "Pay particular attention to exclusions, deductibles, coverage limits, and waiting periods. Legal protection generally cannot simply be purchased after a dispute has already arisen and then used to cover that existing matter.",
    ],
    resources: [
      {
        label: "Getsafe",
        description:
          "Digital insurance provider offering legal protection insurance with English-language information and support.",
        url: "https://www.hellogetsafe.com/en-de/p/legal-de",
      },
      {
        label: "Feather",
        description:
          "Expat-focused digital insurance service offering legal insurance with English-language information and support.",
        url: "https://feather-insurance.com/legal-insurance",
      },
      {
        label: "CHECK24 – Rechtsschutzversicherung",
        description:
          "German comparison portal for comparing legal protection insurance policies from multiple insurers. The service is primarily in German.",
        url: "https://www.check24.de/rechtsschutzversicherung/",
      },
    ],
  },
  {
    id: "employment-setup",
    title: "Arbeitssituation klären",
    subtitle: "Employment setup in Germany",
    category: "Finance",
    stage: "preparing",
    priority: "medium",
    order: 30,
    dueLabel: "Before move",
    estimatedTime: "1–3 hrs",
    actionLabel: "Confirm your employment setup",
    description:
      "Confirm how your employment, self-employment, retirement, study, or other income situation will operate after your move to Germany.",
    guidance: [
      "Clarify what your work or income situation will be when you become resident in Germany. This may be German employment, continuing work for a foreign employer, self-employment or freelance work, retirement or pension income, study, job seeking, or a combination of these.",
      "If you will be employed, understand who your legal employer will be, where the work is performed, how you will be paid, and how German payroll tax and social-security arrangements will be handled.",
      "If you will be self-employed or freelance, check how your activity should be classified and registered in Germany and what tax, invoicing, insurance, and social-security obligations may apply.",
      "Cross-border working arrangements can be more complicated than simply continuing an existing job from Germany. If your employer, clients, or business remain in another country, confirm the employment, tax, social-security, and immigration implications before relying on the arrangement.",
    ],
    resources: [
      {
        label: "Make it in Germany – Working in Germany",
        description:
          "Official German government portal in English covering employment, job seeking, self-employment, recognition of qualifications, visas, and practical aspects of working in Germany.",
        url: "https://www.make-it-in-germany.com/en/",
      },
    ],
  },
  {
    id: "german-tax-position",
    title: "Steuerliche Situation klären",
    subtitle: "Understand your German tax position",
    category: "Finance",
    stage: "preparing",
    priority: "medium",
    order: 50,
    dueLabel: "Before or soon after move",
    estimatedTime: "1-3 hrs",
    actionLabel: "Review your tax position",
    description:
      "Understand the tax implications of becoming resident in Germany, including any continuing obligations in the country you are leaving, and get professional advice where appropriate.",
    guidance: [
      "Moving to Germany can change where and how your income is taxed. German tax liability depends on factors including residence, the types and sources of your income, and your individual circumstances.",
      "If you continue to receive income, hold investments or property, work for an overseas employer, operate a business, receive pensions, or retain tax obligations in another country, your situation may involve more than one tax system.",
      "Germany has double-taxation agreements with many countries that determine how taxing rights are allocated in cross-border situations. These rules do not necessarily remove filing obligations in either country.",
      "Identify the German and continuing foreign obligations that may apply to you and seek professional cross-border tax advice where your circumstances are complex or the financial consequences are significant.",
    ],
    resources: [
      {
        label: "Taxes in Germany",
        description:
          "Official German government information in English introducing German income tax, payroll taxation, tax returns, and social-security deductions.",
        url: "https://www.make-it-in-germany.com/en/working-in-germany/working-environment/salary-taxes-social-security",
      },
      {
        label: "Double taxation agreements",
        description:
          "Official Federal Ministry of Finance information about Germany's double-taxation agreements and how taxing rights are allocated between countries.",
        url: "https://www.bundesfinanzministerium.de/Content/EN/Standardartikel/Topics/Taxation/Articles/double-taxation.html",
      },
    ],
  },

  {
    id: "housing-search",
    title: "Wohnungssuche",
    subtitle: "Find a place to live",
    category: "Housing",
    stage: "preparing",
    priority: "high",
    order: 20,
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
    order: 110,
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
    order: 130,
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
    order: 140,
    dueLabel: "Before move",
    estimatedTime: "30–60 min",
    actionLabel: "Plan your address changes",
    description:
      "Identify important organizations that need your new address and arrange mail forwarding or other postal handling where appropriate.",
    guidance: [
      "Make a list of organizations and people that need your new address. The exact list depends on your circumstances, so work through categories rather than relying on memory.",
      "Common categories include employers, banks and financial providers, insurers, pension providers, tax authorities, healthcare providers, utilities, subscriptions and memberships, schools or childcare providers, and organizations in the country you are leaving.",
      "Also review online accounts where your address affects billing, delivery, identity verification, or the country associated with the service. Some services may require more than simply editing the address in your profile.",
      "Consider whether you need mail forwarding from your previous address. If you are moving to Germany from another country, check the forwarding options offered by the postal service in the country you are leaving. Forwarding can help during the transition, but it does not replace notifying important organizations of your new address directly.",
    ],
  },

  {
    id: "home-handover",
    title: "Wohnungsübergabe",
    subtitle: "Prepare for home handover",
    category: "Housing",
    stage: "preparing",
    priority: "high",
    order: 230,
    dueLabel: "Before key handover",
    estimatedTime: "30–60 min",
    actionLabel: "Prepare for home handover",
    description:
      "Prepare for receiving your new home and document its condition, defects, meter information, keys, access details, and other important handover information.",
    guidance: [
      "A home handover (Wohnungsübergabe) is the point when you receive the apartment or house and its keys or other access devices. The exact process differs for renters and buyers, but in either case document the condition of the property carefully rather than relying on memory.",
      "Use or request a handover record (Übergabeprotokoll). Record visible defects or unfinished work, take photographs where useful, and make sure any agreed follow-up items are documented. Keep a copy of the completed or signed record.",
      "Record relevant meter information, including meter numbers (Zählernummern) and readings (Zählerstände), where accessible. This information may be needed for electricity or other utility arrangements.",
      "Check the keys, fobs, garage or building-access devices, mailbox access, and other items being handed over. For a rental, confirm how defects and repairs should be reported. For a purchased home, make sure you understand any outstanding defects, warranties, or follow-up work that remains after handover.",
    ],
  },
  {
    id: "electricity",
    title: "Stromvertrag",
    subtitle: "Electricity contract",
    category: "Utilities",
    stage: "preparing",
    priority: "medium",
    order: 240,
    dueLabel: "Start before handover",
    estimatedTime: "30–60 min",
    actionLabel: "Arrange electricity",
    description:
      "Research your electricity setup before handover, then use the meter details and readings available once you have access to your new home to complete or confirm the contract.",
    guidance: [
      "Electricity supply is local at the network level, but you can usually choose your electricity supplier. Your address determines your local network operator (Netzbetreiber) and basic/default supplier (Grundversorger), while other suppliers may offer alternative tariffs in your area.",
      "When comparing electricity plans, you will normally need your postcode and estimated annual electricity consumption. Consider the price, contract length, notice period, price guarantees, bonuses, and whether the tariff uses renewable electricity.",
      "If you start using electricity without having arranged another supply contract, you may initially receive electricity through the local default or basic supply arrangement. Do not assume this is necessarily the best long-term tariff, so confirm your electricity arrangements after you have access to your new home.",
      "At handover, record the electricity meter number (Zählernummer) and meter reading (Zählerstand). These may be needed when setting up or confirming your electricity contract.",
    ],
    resources: [
      {
        label: "CHECK24 – Strom",
        description:
          "German comparison portal for comparing electricity tariffs available at your location. The service is primarily in German.",
        url: "https://www.check24.de/strom/",
      },
    ],
  },
  {
    id: "internet",
    title: "Internetanschluss",
    subtitle: "Home internet",
    category: "Utilities",
    stage: "preparing",
    priority: "medium",
    order: 250,
    dueLabel: "Arrange early",
    estimatedTime: "1-2 hrs",
    actionLabel: "Arrange home internet",
    description:
      "Choose and order home internet early enough for equipment delivery or an installation appointment, and check whether bundling with mobile service offers useful savings.",
    guidance: [
      "Internet availability in Germany is address-specific. Providers, connection types, and achievable speeds can differ even within the same town, so check the exact address of your new apartment or house rather than relying only on which providers operate in the area.",
      "Depending on the property, available technologies may include fibre (Glasfaser), cable (Kabel), DSL, or other fixed-wireless options. Consider the speed you actually need, contract length, setup costs, router options, and whether combining internet with mobile service offers useful savings.",
      "Arrange internet early. Activation may require equipment delivery, an existing connection to be activated, or a technician appointment, and the time required can vary. If reliable internet is important immediately after arrival, consider a temporary mobile-data option in case the fixed connection is not ready.",
    ],
    resources: [
      {
        label: "CHECK24 – Internet",
        description:
          "German comparison portal for checking internet providers, connection types, speeds, and tariffs available at your address. The service is primarily in German.",
        url: "https://www.check24.de/internet/",
      },
    ],
  },
  {
    id: "mobile-phone",
    title: "Deutsche Mobilfunknummer",
    subtitle: "German mobile number",
    category: "Utilities",
    stage: "preparing",
    priority: "medium",
    order: 260,
    dueLabel: "Before or just after arrival",
    estimatedTime: "30–60 min",
    actionLabel: "Set up a German mobile number",
    description:
      "Choose a German mobile plan and SIM or eSIM, consider whether to keep your previous number during the transition, and check bundle options with your home internet provider. Final activation may be easier after arrival.",
    guidance: [
      "German mobile service is available through prepaid plans and monthly contracts. Consider coverage where you live and travel, data allowance, contract length, cancellation terms, EU roaming, and whether you want a physical SIM or eSIM.",
      "Setting up a new German mobile service normally requires identity verification. If you are still using a number from another country, consider keeping it active during the transition until important accounts and contacts have been moved to your German number.",
      "Check whether your home internet provider offers a useful mobile bundle, but compare the combined cost and terms rather than assuming a bundle is automatically cheaper.",
    ],
    resources: [
      {
        label: "CHECK24 – Handytarife",
        description:
          "German comparison portal for comparing mobile-phone tariffs from multiple providers. The service is primarily in German.",
        url: "https://www.check24.de/handytarife/",
      },
    ],
  },
  {
    id: "lighting-installation",
    title: "Festverdrahtete Leuchten",
    subtitle: "Hard-wired lighting",
    category: "Housing",
    stage: "preparing",
    priority: "medium",
    order: 220,
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
    order: 210,
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
    order: 270,
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
    order: 100,
    dueLabel: "Before driving in Germany",
    estimatedTime: "30–60 min",
    actionLabel: "Check your driving licence",
    description:
      "Check whether your existing driving licence remains valid after becoming resident in Germany and whether or when an exchange or other action is required.",
    guidance: [
      "The rules for using a foreign driving licence in Germany depend mainly on where the licence was issued. A valid licence from an EU or EEA country generally remains valid after you become resident in Germany until it expires, although some licence categories have additional rules.",
      "If your licence was issued outside the EU or EEA, it is generally recognised for six months after you establish normal residence in Germany. After that, you normally need a German driving licence. The exchange requirements depend on the country that issued your licence, so check your specific situation well before the six-month period ends.",
      "Your local Fahrerlaubnisbehörde (driving licence authority), usually at city or district level, handles exchanges and can confirm the requirements that apply to your licence.",
    ],
    resources: [
      {
        label: "Foreign driving licences in Germany",
        description:
          "Official Federal Ministry of Transport guidance on the validity and exchange of foreign driving licences in Germany. The site is in German but there are several fact sheets available in English.",
        url: "https://www.bmv.de/SharedDocs/DE/Artikel/StV/Strassenverkehr/gueltigkeit-auslaendischer-fahrerlaubnisse-in-deutschland.htm",
      },
    ],
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
    priority: "high",
    order: 90,
    dueLabel: "Before travel",
    estimatedTime: "30–60 min",
    actionLabel: "Prepare pet travel documents",
    description:
      "Check identification, rabies timing, required documents, transport arrangements, crate or carrier needs, and current entry requirements for your pet.",
    guidance:
      "Pet-entry requirements depend on the type of animal and where you are travelling from. For dogs, cats, and ferrets, check identification, rabies vaccination timing, the required travel document, and any additional rules that apply to your route. Allow enough time before travel because some requirements include waiting periods.",
    resources: [
      {
        label: "Travelling with pets in the EU",
        description:
          "Official EU guidance on travelling with dogs, cats, and ferrets, including microchips, rabies vaccination, pet passports, health certificates, and country-specific requirements.",
        url: "https://europa.eu/youreurope/citizens/travel/carry/pets-and-other-animals/index_en.htm",
      },
    ],
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
    order: 200,
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
    order: 60,
    dueLabel: "As early as possible",
    estimatedTime: "2–4 hrs",
    actionLabel: "Research childcare options",
    description:
      "Relevant if you need daycare, kindergarten, after-school care, or other childcare support.",
    guidance: [
      "Childcare in Germany includes options such as Kinderkrippe for younger children, Kindergarten for preschool-age children, and other Kita or Kindertagespflege arrangements. The terminology, application process, fees, and availability can vary by Bundesland and locality.",
      "Start researching childcare as early as possible. Places can be limited, and some areas use a central application or Kita portal while others require contact with individual providers.",
      "Search for “Kinderbetreuung + [your Gemeinde or city]”, “Kita + [your Gemeinde or city]”, or “Kita-Portal + [your Gemeinde or city]”. Use the official local-authority information to understand registration, deadlines, eligibility, fees, and how places are allocated where you live.",
      "If you need childcare in order to work or study, consider the hours you actually require as well as location. Opening hours, holiday closures, meal arrangements, settling-in periods (Eingewöhnung), and the amount of care available can differ between providers.",
    ],
    resources: [
      {
        label: "Childcare in Germany",
        description:
          "Official German government information in English introducing childcare options in Germany and how to begin looking for a childcare place.",
        url: "https://www.make-it-in-germany.com/en/living-in-germany/family-life/child-care",
      },
    ],
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
      "Register your German address at the Bürgerbüro/Rathaus after moving into your apartment or house and retain your registration confirmation.",
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
    guidance: [
      "Your German tax identification number (Steueridentifikationsnummer or IdNr) is a permanent personal tax identifier. If you are registering in Germany for the first time, it is normally assigned automatically after your Anmeldung and sent to you by post.",
      "Keep the IdNr once you receive it. It remains valid for life and does not change when you move or get married. You may need it for employment, tax matters, banking, and other administrative purposes.",
      "If you lose your IdNr, or you have not received the letter within three months of your first registration in Germany, you can request the number again from the Federal Central Tax Office (BZSt).",
    ],
    resources: [
      {
        label: "Obtain your tax identification number",
        description:
          "Official Federal Central Tax Office service in English explaining the German tax identification number and how to request it again if it is lost or has not arrived.",
        url: "https://online.portal.bzst.de/SharedDocs/Leistungsbeschreibung/EN/erneute_mitteilung_der_ID-Nr.html",
      },
    ],
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
    priority: "high",
    order: 60,
    dueLabel: "First days",
    estimatedTime: "15–20 min",
    actionLabel: "Save important numbers",
    description:
      "Learn and save the key German emergency and urgent-service numbers and identify important local contacts you may need.",
    guidance: [
      "Know which number to use before you need it. Call 112 for fire, rescue, or a potentially life-threatening medical emergency. The 112 emergency number works throughout the EU and is free from landlines and mobile phones, including when using a foreign mobile SIM while roaming in Germany.",
      "Call 110 when you urgently need the police in Germany.",
      "For an urgent medical problem that is not life-threatening but cannot wait until your normal doctor's practice is open, call the medical on-call service (Ärztlicher Bereitschaftsdienst) on 116117.",
      "Also identify useful local contacts such as your nearest hospital or emergency department and local utility or building emergency contacts. Emergency pharmacy coverage rotates, so look up the pharmacy currently providing Notdienst rather than relying on one pharmacy always being open.",
    ],
    resources: [
      {
        label: "Emergency numbers in Germany",
        description:
          "Official German government information in English about emergency medical services and when to use 112 or 116117.",
        url: "https://verwaltung.bund.de/leistungsverzeichnis/en/rechte-und-pflichten/102837939",
      },
      {
        label: "Apotheken-Notdienst",
        description:
          "Search for the pharmacy currently providing emergency service near you. The search uses official Federal Chamber of Pharmacists data and includes English instructions.",
        url: "https://www.aponet.de/notdienstsuche",
      },
    ],
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
    dueLabel: "As early as possible",
    estimatedTime: "1–2 hrs",
    actionLabel: "Review school registration",
    description:
      "Relevant if you have school-age children and need to understand local school registration.",
    guidance: [
      "School education in Germany is primarily the responsibility of the Bundesländer, so school types, enrolment rules, school-year dates, and some procedures vary depending on the federal state where you live.",
      "If you are moving with a school-age child, find out which local school authority or school is responsible for registration and whether your address determines the school your child should attend. The process can differ for primary and secondary education and for children entering the German school system from another country.",
      "Start with the official education information for your Bundesland, then search for “Schulanmeldung + [your Gemeinde or city]”, “Schulamt + [your Landkreis or city]”, or “Schuleinschreibung + [your Gemeinde or city]” to find the local process.",
      "Have previous school records and other relevant documents available. If they are not in German, check whether the responsible authority or school requires translations rather than arranging translations unnecessarily in advance.",
    ],
    resources: [
      {
        label: "School system in Germany",
        description:
          "Official German government information in English introducing the German school system and schooling for children moving to Germany.",
        url: "https://www.make-it-in-germany.com/en/living-in-germany/family-life/school-system",
      },
    ],
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
    dueLabel: "First weeks",
    estimatedTime: "20–30 min",
    actionLabel: "Register your dog",
    description:
      "Register your dog with the local municipality and arrange the applicable dog tax.",
    guidance: [
      "Dog tax (Hundesteuer) is administered locally by your Gemeinde or Stadt. If you bring a dog when moving to Germany, check the registration requirement and deadline that apply where you live rather than looking for a nationwide registration service.",
      "The amount of Hundesteuer, registration process, deadlines, exemptions, and any higher rates for particular categories of dogs vary between municipalities.",
      "Search for “Hundesteuer + [your Gemeinde or city]” or “Hund anmelden + [your Gemeinde or city]” and use the official local-authority information. Registration may be available online or may require a form or contact with the municipality.",
      "After registration, some municipalities issue a Hundesteuermarke (dog tax tag). Check the local rules for whether one is issued and whether your dog is required to wear it.",
    ],
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
    guidance: [
      "Germany increasingly allows administrative services to be completed online using digital accounts and electronic identification. Which options are available to you depends partly on the identity documents you hold.",
      "BundID is a central citizen account for accessing many German government services online. It can be used to identify yourself for online applications and includes a digital mailbox for receiving messages and official notices from participating authorities.",
      "The online ID function (Online-Ausweisfunktion or eID) provides a higher-assurance way to prove your identity electronically. It can be available with a German identity card, electronic residence permit, or eID card for eligible EU/EEA citizens. Some non-German EU identities can also be used with BundID.",
      "AusweisApp is the software used with a supported online ID. To use it you generally need an activated eID, your PIN, and an NFC-capable smartphone or compatible card reader.",
    ],
    resources: [
      {
        label: "BundID",
        description:
          "Official German government citizen account for accessing online administrative services and receiving digital communications from participating authorities.",
        url: "https://id.bund.de/en/",
      },
      {
        label: "AusweisApp",
        description:
          "Official English-language information about setting up and using Germany's online ID function, including checking your device and identity document.",
        url: "https://www.ausweisapp.bund.de/en/for-users",
      },
    ],
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
    guidance: [
      "A Hausarzt (general practitioner or family doctor) is often your first point of contact for routine medical care in Germany and can coordinate treatment or refer you to specialists where needed.",
      "Look for a practice convenient to your home and check whether it is accepting new patients and whether it treats patients with your type of health insurance. Some practices offer online appointment booking, while others require you to contact the practice directly.",
      "Useful searches include “Hausarzt + [your town or area]” or “Allgemeinmedizin + [your town or area]”. You can also use national doctor-search and appointment services rather than relying only on a general web or map search.",
    ],
    resources: [
      {
        label: "116117",
        description:
          "Official patient service of Germany's statutory-health-insurance physicians. Use the website to search for doctors and psychotherapists and access appointment and medical on-call services. The site is primarily in German.",
        url: "https://www.116117.de/",
      },
      {
        label: "Doctolib",
        description:
          "Widely used digital service and mobile app for finding participating doctors and other healthcare professionals and booking available appointments online.",
        url: "https://www.doctolib.de/",
      },
    ],
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
    guidance: [
      "Pharmacies (Apotheken) in Germany provide prescription and non-prescription medicines as well as professional advice about medications. Look for one or more convenient pharmacies near your home and note their normal opening hours.",
      "Outside normal opening hours, pharmacies take turns providing emergency service (Apotheken-Notdienst). The pharmacy on duty changes, so use a current Notdienst search when you need one rather than assuming your usual pharmacy will be open.",
      "Useful local searches include “Apotheke + [your town or area]”. You may find it useful to know both a convenient regular pharmacy and how to locate the nearest Notdienst pharmacy when normal pharmacies are closed.",
      "If you take regular prescription medication, also complete the Medikamentenversorgung quest, which covers planning medication continuity, bringing medication into Germany, and how prescriptions work here.",
    ],
    resources: [
      {
        label: "Apotheken-Notdienst",
        description:
          "Search for pharmacies currently providing emergency service near you. The search uses official Federal Chamber of Pharmacists data and includes English instructions.",
        url: "https://www.aponet.de/notdienstsuche",
      },
    ],
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
    guidance: [
      "Find a veterinary practice (Tierarztpraxis) convenient to your home before you need one, and check whether it is accepting new patients. Useful searches include “Tierarzt + [your town or area]” or, for a particular type of animal, “Tierarzt Katze”, “Tierarzt Hund”, or the relevant animal type.",
      "Ask your regular veterinary practice what to do outside its normal opening hours. Veterinary emergency arrangements (tierärztlicher Notdienst) vary by region, and the practice providing emergency cover may not be your usual veterinarian.",
      "Identify an emergency option in advance. Depending on where you live, this may be a regional veterinary Notdienst, an emergency practice, or a Tierklinik. Call ahead in an emergency where possible, because emergency services may require telephone notification before arrival.",
      "Veterinary fees in Germany are regulated through the Gebührenordnung für Tierärztinnen und Tierärzte (GOT). Emergency treatment has additional charges and can cost significantly more than treatment during normal practice hours.",
    ],
    resources: [
      {
        label: "Veterinary emergency service",
        description:
          "Information from the German Federal Chamber of Veterinarians about veterinary emergency care, including when to use it, finding local emergency arrangements, and what to expect. The information is in German.",
        url: "https://www.bundestieraerztekammer.de/d.php?id=9122",
      },
    ],
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
    stage: "preparing",
    priority: "medium",
    order: 190,
    dueLabel: "Before or soon after move",
    estimatedTime: "30–45 min",
    actionLabel: "Review dog liability insurance",
    description:
      "Check the dog-liability requirements that apply where you live and arrange suitable coverage for your dog.",
    guidance: [
      "Dog liability insurance (Hundehaftpflicht or Hundehalterhaftpflicht) covers certain liability claims if your dog injures someone or damages another person's property. Do not assume that your normal Privathaftpflicht automatically covers liability caused by a dog.",
      "The legal requirements are not uniform across Germany. Whether dog liability insurance is mandatory, and whether particular rules apply to certain dogs, depends on the Bundesland where you live. Check the current rules for your federal state.",
      "When comparing policies, consider the coverage limit, deductible, who is allowed to handle the dog, damage to rented property, and other exclusions or conditions relevant to you.",
    ],
    resources: [
      {
        label: "Getsafe",
        description:
          "Digital insurance provider offering dog liability insurance with an English-language website, app, support, and claims process.",
        url: "https://www.hellogetsafe.com/en-de/p/dog-liability-de",
      },
      {
        label: "CHECK24 – Hundehaftpflicht",
        description:
          "German comparison portal for comparing dog liability insurance policies from multiple insurers. The service is primarily in German.",
        url: "https://www.check24.de/hundehaftpflicht/",
      },
    ],
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
    guidance: [
      "Learning some German can make everyday life, local administration, healthcare, shopping, and social activities considerably easier, even if you can work or manage many initial tasks in English.",
      "Choose a learning approach that fits your goals and available time. Options include structured language courses, Volkshochschule (VHS) courses, integration courses where eligible, private language schools, online learning, language exchanges, and self-study.",
      "For local courses, search for “Volkshochschule + [your town or Landkreis]” or “Deutschkurs + [your town or area]”. Course levels commonly follow the CEFR scale from A1 through C2, which can help you choose an appropriate starting point and track progress.",
      "If you may qualify for a government-supported integration course (Integrationskurs), check the eligibility and application information rather than assuming that every newcomer is automatically entitled or required to attend one.",
    ],
    resources: [
      {
        label: "BAMF – Integration courses",
        description:
          "Official Federal Office for Migration and Refugees information about German integration courses, including eligibility, participation, course content, and how to find a course.",
        url: "https://www.bamf.de/EN/Themen/Integration/ZugewanderteTeilnehmende/Integrationskurse/integrationskurse-node.html",
      },
      {
        label: "vhs-Lernportal",
        description:
          "Free online learning platform from the German Adult Education Association with German courses from beginner through more advanced levels. The learning platform can be used independently or alongside a course.",
        url: "https://www.vhs-lernportal.de/",
      },
    ],
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
    guidance: [
      "Getting to know your local area can make a new place feel familiar much more quickly. Look beyond shops and practical services for activities, events, groups, and places where you can participate in local life.",
      "Useful searches include “Veranstaltungen + [your town or area]” for local events, “Veranstaltungskalender + [your town or Landkreis]” for event calendars, and “Verein + [an activity or interest] + [your area]” for local clubs and associations.",
      "The local Volkshochschule (VHS) can also be useful beyond German-language learning. Many offer courses and activities covering fitness, cooking, arts, culture, technology, languages, and other interests.",
      "Check the website of your Gemeinde or Stadt and, where relevant, your Landkreis. Local authorities often publish community information, events, clubs, leisure facilities, and other resources that may not be easy to discover through national websites.",
    ],
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
