export const site = {
  name: "Al-Batin Advanced Contracting Co. Ltd",
  shortName: "Al-Batin",
  url: "https://albatinindus.com",
  description:
    "Al Batin scaffolding services in Saudi Arabia will help you plan, erect and dismantle the most appropriate cup lock, pin lock and tube and coupler solution for your project, on time and within your budget.",
  phone: "+966 53 104 4002",
  phoneHref: "tel:+966531044002",
  whatsapp: "https://wa.me/966531044002",
  email: "info@albatinindus.com",
  address: {
    line1: "P.O. Box 362",
    city: "Al-Jubail",
    postalCode: "31951",
    country: "Saudi Arabia",
  },
  hours: [
    { days: "Sunday to Thursday", time: "8 AM - 6 PM" },
    { days: "Friday", time: "Closed" },
  ],
  social: {
    facebook: "https://www.facebook.com/albatinadvanced/",
    instagram: "https://www.instagram.com/albatinadvanced/",
  },
  docs: {
    profile: "/docs/al-batin-company-profile.pdf",
    equipmentBrochure: "/docs/al-batin-heavy-equipment-brochure.pdf",
  },
} as const;

export const clients = [
  { name: "SABIC", logo: "/images/clients/sabic.png" },
  { name: "Sadara", logo: "/images/clients/sadara.png" },
  { name: "Saudi Aramco", logo: "/images/clients/saudi-aramco.png" },
  { name: "SATORP", logo: "/images/clients/satorp.png" },
  { name: "Samsung", logo: "/images/clients/samsung.png" },
];

export const certificates = [
  {
    code: "ISO 9001:2015",
    name: "Quality Management System",
    image: "/images/certificates/iso-9001.jpg",
    pdf: "/docs/iso-9001-quality-management-certificate.pdf",
  },
  {
    code: "ISO 45001:2018",
    name: "Occupational Health & Safety Management System",
    image: "/images/certificates/iso-45001.jpg",
    pdf: "/docs/iso-45001-health-safety-certificate.pdf",
  },
  {
    code: "ISO 14001:2015",
    name: "Environmental Management System",
    image: "/images/certificates/iso-14001.jpg",
    pdf: "/docs/iso-14001-environmental-certificate.pdf",
  },
];

export const projects = [
  { name: "Marafiq SWTP-9", image: "/images/projects/marafiq-swtp-9.jpg", width: 900, height: 702 },
  { name: "Blower Building", image: "/images/projects/blower-building.jpg", width: 900, height: 702 },
  {
    name: "Water Treatment Plant Substation - 01",
    image: "/images/projects/water-treatment-plant-substation-01.jpg",
    width: 960,
    height: 1280,
  },
];
