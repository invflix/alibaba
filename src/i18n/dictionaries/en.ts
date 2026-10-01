/**
 * English copy. Every sentence here is carried over verbatim from the previous site; only UI
 * micro-labels (buttons, aria labels, filter names) were added for the new components.
 * `ar.ts` must satisfy the same `Dictionary` type, so a missing Arabic string fails the build.
 */
const en = {
  meta: {
    siteTitle: "Al-Batin | Scaffolding Company in Jubail, Saudi Arabia",
    titleTemplate: "%s | Al-Batin Advanced Contracting",
    description:
      "Al Batin scaffolding services in Saudi Arabia will help you plan, erect and dismantle the most appropriate cup lock, pin lock and tube and coupler solution for your project, on time and within your budget.",
    ogLocale: "en_US",
  },

  common: {
    home: "Home",
    requestQuote: "Request a Quote",
    skipToContent: "Skip to content",
    menu: "Menu",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    switchLanguage: "العربية",
    switchLanguageLabel: "عرض الموقع باللغة العربية",
    backToTop: "Back to top",
    breadcrumb: "Breadcrumb",
    viewDetails: "View details",
    viewAll: "View all",
    enquire: "Enquire",
    enquireNow: "Enquire Now",
    downloadPdf: "Download PDF",
    downloadProfile: "Download Profile",
    downloadCompanyProfile: "Download company profile",
    readMore: "Read more",
    items: "items",
    optional: "optional",
    close: "Close",
    previousImage: "Previous image",
    nextImage: "Next image",
    viewLarger: "View larger",
    imageViewer: "Image viewer",
    whatsapp: "WhatsApp",
    chatOnWhatsapp: "Chat with us on WhatsApp",
    homeLabel: "home",
    mainNav: "Main",
    mobileNav: "Mobile",
  },

  nav: {
    home: "Home",
    about: "About us",
    quality: "Quality Policy",
    certificates: "Certificates",
    products: "Products",
    allProducts: "All Products",
    services: "Services",
    allServices: "All Services",
    rentals: "Scaffolding Rentals",
    erection: "Scaffolding Erection",
    sales: "Scaffolding Sales",
    equipment: "Heavy Equipment Rental",
    ohs: "OHS",
    ohsFull: "Occupational Health & Safety",
    safety: "Safety Policy",
    contact: "Contact us",
  },

  quoteList: {
    title: "Your quote list",
    open: "Open quote list",
    empty: "Your quote list is empty. Add services, products or equipment from the site and request pricing for them together.",
    remove: "Remove",
    submit: "Request a quote for these items",
    clear: "Clear list",
    add: "Add to quote",
    added: "Added to quote",
    count: "items in your quote list",
    messageIntro: "I would like a quotation for:",
  },

  home: {
    hero: {
      eyebrow: "Over 12 years of experience",
      location: "Al-Jubail, Saudi Arabia",
      titleLead: "The Best Scaffolding Company in",
      titleAccent: "Saudi Arabia",
      text: "Al Batin scaffolding services help you plan, erect and dismantle the most appropriate cup lock, pin lock and tube and coupler solution for your project, on time and within your budget.",
      promptLabel: "Tell us about your project",
      promptPlaceholder: "Tell us about your project",
      promptSubmit: "Continue to the quote form",
      industriesLabel: "Safety-critical environments",
      industries: ["Petrochemical plants", "Utilities", "Railways", "Airports", "Construction"],
      productsLabel: "Product range",
      clients: "Our Clients",
    },
    stats: [
      { value: 12, suffix: "+", label: "Years of experience" },
      { value: 1, suffix: "M+", label: "Work hours clocked" },
      { value: 0, suffix: "", label: "Products in our range" },
      { value: 0, suffix: "", label: "ISO certifications" },
    ],
    about: {
      label: "About Al-Batin",
      titleLead: "We are the best scaffolding suppliers in",
      titleAccent: "Saudi Arabia.",
      body: [
        "Al Batin Contracting is one of the leading names in the field of scaffolding in KSA. We are a trading and contracting company that believes in treating our customers like family.",
        "We are specialized in trading, contracting, and hiring cup locks, frame types and aluminum scaffolding with accessories.",
      ],
      vision: "Vision",
      visionText:
        "To make a difference with the perception of our industry through innovation, presentation and our customers’ partnership.",
      mission: "Mission",
      missionText: "To care for our whole team, our customers and everyone affected by our work.",
      cta: "Read more about us",
      years: "years of experience",
    },
    services: {
      label: "Services",
      titleLead: "One of the top scaffolding companies in",
      titleAccent: "Jubail",
      intro:
        "We provide industrial scaffolding services for plant maintenance, shutdowns and turnarounds, protective coatings, industrial insulation and capital projects.",
      filters: { all: "All", services: "Services", products: "Products", equipment: "Equipment" },
      tags: { service: "Service", product: "Product", equipment: "Equipment" },
      filterLabel: "Filter services, products and equipment",
      cards: [
        {
          name: "Scaffolding Rental",
          slug: "scaffolding-rentals",
          text: "Work access solutions, including erecting and dismantling scaffolding, scaffolding rental and shoring services for oil and petrochemical clients.",
        },
        {
          name: "Scaffolding Erection",
          slug: "scaffolding-erection",
          text: "Erecting, altering or dismantling temporary structures that support a working platform at height.",
        },
        {
          name: "Scaffolding Sales",
          slug: "scaffolding-sales",
          text: "Scaffolding tubes and fittings, cup lock system scaffolding, and scaffolding boards and planks.",
        },
        {
          name: "Heavy Equipment Rental",
          slug: "heavy-equipment-rental",
          text: "Cranes, excavators, loaders, graders, rollers, dumpers and water tankers for hire across KSA.",
        },
      ],
    },
    products: {
      label: "Products",
      titleLead: "Our",
      titleAccent: "Products",
      intro: "Scaffolding systems, components, wood and ply, ladders and tools for trading and hire.",
      cta: "View all products",
      viewCategory: "View Products",
    },
    strengths: {
      label: "Why Al-Batin",
      titleLead: "Built on quality,",
      titleAccent: "safety and trust",
      items: [
        {
          title: "Brand reputation",
          text: "Through the years, we have built a reputation for providing high-quality and affordable scaffolding parts and equipment.",
        },
        {
          title: "Handle every scaffolding",
          text: "Our partners benefit from a comprehensive range of scaffolding system solutions to handle every scaffolding task.",
        },
        {
          title: "Top quality",
          text: "Our products are specifically engineered and manufactured to provide solid support, superior durability and versatile application.",
        },
        {
          title: "Durable scaffolds",
          text: "If your business requires high-quality and durable scaffolds, planks and ladders, then you can count on us.",
        },
      ],
    },
    industries: {
      label: "Industrial scaffolding",
      titleLead: "We provide industrial scaffolding",
      titleAccent: "services for",
    },
    projects: {
      label: "Projects",
      titleLead: "Our Latest",
      titleAccent: "Projects",
    },
    safety: {
      label: "Safety & quality",
      titleLead: "The safety of our team, customers and the public is our",
      titleAccent: "number one priority.",
      text: "Our commitment to safety has led us to gain qualifications that enable us to work in safety-critical environments such as utilities, railways, airports, petrochemical plants and construction.",
      safetyPolicy: "Read our Safety Policy",
      qualityPolicy: "Quality Policy",
      certified: "Certified to international standards",
      certifiedIntro: "Our quality, health and safety, and environmental management systems are certified to ISO standards.",
    },
  },

  cta: {
    title: "We can help build your project!",
    text: "Tell us about your project and our team will get back to you with the right scaffolding solution.",
    talk: "Prefer to talk?",
  },

  form: {
    title: "Send us an enquiry",
    name: "Full name",
    email: "Email",
    phone: "Phone",
    company: "Company",
    subject: "Subject",
    message: "Tell us about your project",
    send: "Send enquiry",
    sending: "Sending",
    sentTitle: "Thank you, your enquiry has been sent.",
    sentText: "One of our executives will be in touch with you as soon as possible.",
    fallback: "Opening your email app to send this enquiry. If nothing happens, email us at",
    preferTalk: "Prefer to talk?",
    call: "Call",
    quoteItems: "Items in your quote list",
    productEnquiry: "Enquiry:",
    productMessage: "I would like a quotation for {name}. Quantity: ",
    rentalEnquiry: "Rental enquiry:",
    errors: {
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      phone: "Please enter a valid phone number.",
      message: "Please tell us a little more (at least 10 characters).",
      summary: "Please check the highlighted fields.",
      send: "We could not send your message right now. Please email {email} or call {phone}.",
    },
  },

  footer: {
    blurb:
      "One of the leading names in the field of scaffolding in KSA. A trading and contracting company that believes in treating our customers like family.",
    company: "Company",
    products: "Products",
    services: "Services",
    contact: "Contact",
    rights: "All rights reserved.",
    facebook: "Al-Batin on Facebook",
    instagram: "Al-Batin on Instagram",
  },

  about: {
    metaDescription:
      "Al Batin Contracting is one of the leading names in the field of scaffolding in KSA. We are a trading and contracting company that believes in treating our customers like family.",
    title: "About us",
    intro:
      "Al Batin Contracting is one of the leading names in the field of scaffolding in KSA. We are a trading and contracting company that believes in treating our customers like family.",
    heroAlt: "The Al-Batin team in company uniforms at the yard",
    welcome: "Welcome to Al-Batin Advanced Contracting Co. Ltd.",
    body: [
      "AL-BATIN ADVANCED CONTRACTING CO. LTD has a proven track record in delivering innovative scaffolding solutions in a creative, cost-effective manner while remaining focused on our top priority: safety.",
      "Our commitment to safety has led us to gain qualifications that enable us to work in safety-critical environments such as utilities, railways, airports, petrochemical plants and construction.",
      "Renowned for our honest, open-door approach, we maintain a strong working relationship with our clients based on confidence and trust. This is reflected in the high level of repeat business we receive and also the fact that we are approved suppliers to a large number of organizations.",
      "Potential clients are welcome to visit our offices and sites by arrangement to see at first hand the way we run our business and meet a few of our satisfied customers.",
      "Our commitment to excellence is found in everything we do. When your next scaffolding project demands the highest levels of expertise and reliability, there is only one company to remember: AL-BATIN ADVANCED CONTRACTING CO. LTD.",
    ],
    towerAlt: "Scaffold tower under construction",
    vision: "Vision",
    visionText:
      "Our vision is to make a difference with the perception of our industry through innovation, presentation and our customers’ partnership.",
    mission: "Mission",
    missionText: "Our mission is to care for our whole team, our customers and everyone affected by our work.",
    missionPoints: [
      "To be efficient, innovative and “best in class” with everything that we do.",
      "Our “Delivering Safety First” commitment is at the forefront of our business at all times.",
      "To maintain healthy and sustainable profitability.",
    ],
    projects: "Our Latest Projects",
  },

  servicesPage: {
    metaDescription:
      "AL-BATIN ADVANCED CONTRACTING CO. LTD is not just a full-service scaffolding solutions provider. We also offer a wide range of support services to our clients.",
    title: "Services",
    intro:
      "We're more than just scaffolding at AL-BATIN. We offer a full range of support services and other solutions that help your project finish on time, on budget, and as safely and efficiently as possible.",
    heroAlt: "Multi-level scaffolding structure with steel planks",
    scopeTitle: "We provide industrial scaffolding services for",
    rentalsLabel: "Rentals",
    rentalsMore: "Scaffolding rental details",
    erectionMore: "How we erect scaffolding",
    erectionAlt: "Scaffolding erected at the Blower Building project",
    salesMore: "Scaffolding sales details",
    browseProducts: "Browse products",
    equipmentTitle: "Heavy Equipment Rental",
    equipmentIntro:
      "Our ever-expanding fleet of rental cranes and heavy machinery is adept at handling even the most challenging and intricate heavy lifting requirements.",
    viewFleet: "View the fleet",
    craneAlt: "Crawler crane from the rental fleet",
    industrialFor: "Industrial scaffolding for",
    otherServices: "Other services",
  },

  equipmentPage: {
    metaDescription:
      "Hire cranes, excavators, loaders, graders, rollers, dumpers, water tankers and more across KSA from Al-Batin Advanced Contracting at reasonable prices.",
    title: "Heavy Equipment Rental",
    intro:
      "Our ever-expanding fleet of rental cranes and heavy machinery is adept at handling even the most challenging and intricate heavy lifting requirements.",
    heroAlt: "Wheel loader from the Al-Batin rental fleet",
    body: [
      "AL-BATIN ADVANCED CONTRACTING CO. LTD has cemented itself as the leading heavy equipment rental company in the MENA region. At Al Batin Indus, we focus on delivering results with efficiency and safety in mind.",
      "We offer a wide range of heavy machinery to hire across KSA at reasonable prices. If you’re looking to hire diesel generators, lighting towers, air compressors, welding machines and other heavy construction equipment on lease, we’ve got you covered.",
    ],
    fleet: "Our fleet",
    enquireHire: "Enquire about hire",
    more: "More from the yard",
    ctaTitle: "Need a machine on site?",
    ctaText: "Tell us what equipment you need, for how long and where, and we'll prepare a rental quote.",
  },

  productsPage: {
    metaDescription:
      "Scaffolding products from Al-Batin: cuplock systems, couplers, ladders, steel planks, scaffolding tubes, wood and ply, tools and accessories.",
    title: "Our Products",
    intro: "Scaffolding systems, components, timber, ladders and tools for trading and hire across Saudi Arabia.",
    heroAlt: "Steel scaffolding props stacked in the Al-Batin yard",
    all: "All",
    categoriesLabel: "Product categories",
    showing: "Showing {count} of {total} {label}",
    productsWord: "products",
    search: "Search products",
    clearSearch: "Clear search",
    noMatch: "No products match “{query}”",
    noMatchText: "Try a different name, or contact us. We supply many items that are not listed here.",
    ctaTitle: "Can't find what you need?",
    ctaText: "We supply a much wider range than we list here. Tell us what your project requires.",
    categoryMetaSuffix: "Supplied by Al-Batin Advanced Contracting in Saudi Arabia.",
    categoryCtaTitle: "Need a quotation?",
    categoryCtaText: "Send us your {category} requirements and quantities, and we will come back with pricing and availability.",
    photoSoon: "Photo coming soon",
    loading: "Loading products",
  },

  productPage: {
    metaSuffix: "Available from Al-Batin Advanced Contracting in the {category} range, Saudi Arabia.",
    description: "Product description",
    partOf: "Part of our {category} range. Contact our team for current availability and pricing.",
    specifications: "Specifications",
    specProduct: "Product",
    specCategory: "Category",
    specSupplier: "Supplied by",
    specLocation: "Location",
    specSizes: "Sizes, grades and quantities",
    specSizesValue: "Confirmed with your quotation",
    specNote: "Detailed specifications are shared with each quotation. Tell us your project requirements when you enquire.",
    more: "More in {category}",
    whatsappText: "Hello Al-Batin, I would like a quotation for: {name}",
    ctaTitle: "Interested in the {name}?",
    ctaText: "Send us your quantities and site location and we will come back with pricing and availability.",
  },

  contactPage: {
    metaDescription:
      "Contact Al-Batin Advanced Contracting in Al-Jubail. Call {phone} or email {email} for scaffolding sales, rentals, erection and heavy equipment hire.",
    title: "Contact us",
    intro: "Tell us about your project. One of our executives will be in touch with you as soon as possible.",
    heroAlt: "Aerial view of a Saudi city skyline and highway interchange",
    details: "Contact details",
    callLabel: "Have a question? Call us",
    mailLabel: "Send your mail",
    visitLabel: "Visit our company at",
    visitValue: "Al Batin Advanced Contracting Co. Ltd, {line1}, {city}, KSA",
    hours: "Working hours",
    hoursList: [
      { days: "Sunday to Thursday", time: "8 AM - 6 PM" },
      { days: "Friday", time: "Closed" },
    ],
  },

  certificatesPage: {
    metaDescription:
      "Al-Batin Advanced Contracting is certified to ISO 9001:2015, ISO 45001:2018 and ISO 14001:2015 for quality, occupational health and safety, and environmental management.",
    title: "Certificates",
    intro:
      "Our management systems for quality, occupational health and safety, and the environment are certified to international ISO standards.",
    heroAlt: "Scaffolding on the Blower Building project at sunset",
    certificate: "certificate",
  },

  qualityPage: {
    metaDescription:
      "The company is dedicated to a quality policy that ensures its products and services fully meet the requirements of its customers at all times.",
    title: "Quality Policy",
    intro:
      "The company is dedicated to the quality policy that will ensure that its products and services fully meet the requirements of its customers at all times.",
    heroAlt: "Al-Batin team in a site briefing",
    body: [
      "The goal of the company is to achieve a high level of customer satisfaction at all times. The commitment to implementation of supporting managerial and business operational systems is essential to realizing that goal.",
      "Al Batin Scaffolding Advanced Contracting Co Ltd believes in the concept of client and supplier working together in pursuing this policy and in continually striving for improvements in service quality. We believe in the constant vigilance of health and safety to our staff and clients.",
      "To ensure that the policy is successfully implemented, staff will be responsible for identifying customer requirements and ensuring that the correct procedures are followed to meet those requirements. Objectives needed to ensure that the requirements of this policy are met, and that continual improvement is maintained in line with the spirit of the policy, will be set, determined and monitored at Management Review and Appraisals.",
      "The quality policy principles and objectives will be communicated and available to staff at all times. Training will be an integral part of the strategy to achieve the objectives. We are all committed to operating continuously to this standard and we will maintain the necessary Quality Approvals consistent with our customers’ requirements.",
      "Our Company will constantly review and improve on our services to ensure tasks are completed in the most effective and timely manner for the benefit of all our customers. We shall ensure that all our personnel understand and fully implement our Company’s policies and objectives and are able to perform their duties effectively through our ongoing training and development program.",
    ],
    principlesTitle: "Our quality principles",
    principles: [
      "Ensuring that we fully identify and conform to the needs of our clients.",
      "Everyone understanding how to do their job in the right manner and ensuring the job is completed correctly the first time.",
      "Looking at our service provision processes, identifying the potential for errors and taking the necessary action to eliminate them.",
      "Ensuring that health and safety is adhered to at all times.",
    ],
  },

  ohsPage: {
    metaDescription:
      "Health and safety is especially important in the scaffolding industry, with many scaffolders working at heights and in difficult conditions.",
    title: "Occupational Health & Safety",
    crumb: "OHS",
    intro:
      "Health and safety is especially important in the scaffolding industry, with many scaffolders working at heights and in difficult conditions.",
    heroAlt: "Al-Batin crew in safety vests and hard hats on site",
    heading: "The safety of our team, customers and the public is our number one priority.",
    body: [
      "At AL-BATIN Scaffolding, the safety of our scaffolding team, customers, and the general public is our number one priority. As such, we have implemented a strict Occupational Health and Safety (OH&S) policy, which ensures a safe and efficient working environment and that all our employees are fully trained in all relevant health and safety regulations.",
      "In support of our Occupational Health & Safety policy, all staff members are taught to manage their own safety and that of their colleagues to promote an injury free environment. We abide by all regulations in force wherever we work, and endeavour to maintain and improve safety and health standards above and beyond these requirements.",
      "AL-BATIN Scaffolding is pro-active on safety management and will continue to introduce practical initiatives to ensure the continuous improvement of our safety performance well into the future.",
    ],
    readPolicy: "Read our Safety Policy",
    teamAlt: "The Al-Batin workforce in safety uniforms",
  },

  safetyPage: {
    metaDescription: "Unrivaled safety performance. Safety is embedded in our culture at Al-Batin Scaffolding.",
    title: "Safety Policy",
    intro: "Unrivaled safety performance.",
    heroAlt: "Scaffolding erected safely around a building",
    statement: "Safety is embedded in our culture. We set firm expectations and teach our workforce how to achieve them.",
    pillars: [
      { title: "Rigorous training", text: "Our safety commitment is built on rigorous employee training." },
      { title: "Daily safety audits", text: "Training is reinforced by daily safety audits on every site." },
      {
        title: "Beyond OSHA",
        text: "Our work-site safety program is more strenuous than OSHA regulations or the typical requirements of our customers.",
      },
    ],
  },

  notFound: {
    eyebrow: "Error 404",
    title: "This page could not be found.",
    text: "The page may have moved when we rebuilt our website. Try one of these instead.",
    home: "Back to home",
    products: "Browse products",
    specific: "Looking for something specific?",
    contact: "Contact us",
  },

  error: {
    eyebrow: "Something went wrong",
    title: "We couldn’t load this page.",
    text: "Please try again. If the problem continues, call us on +966 53 104 4002.",
    retry: "Try again",
    home: "Back to home",
  },
};

export type Dictionary = typeof en;
export default en;
