export type Service = {
  slug: "scaffolding-rentals" | "scaffolding-erection" | "scaffolding-sales";
  name: string;
  title: string;
  summary: string;
  image: string;
  imageAlt: string;
  /** Full-bleed header photo (upscaled, high resolution). */
  hero: string;
  body: string[];
  list?: { heading: string; items: string[] };
};

const supplyList = {
  heading: "Materials we supply",
  items: ["Scaffolding Tubes & Fittings", "Cup lock System Scaffolding", "Scaffolding Boards / Planks"],
};

const salesRentalsBody = [
  "AL-BATIN ADVANCED CONTRACTING CO. LTD creates new heights in the scaffolding material supply service. We provide an appropriate environment to attract and achieve customer satisfaction, to provide excellent service efficiently, effectively and transparently, through the application of the concepts of total quality, activating a sense of partnership and translating it into reality.",
  "We provide a comprehensive range of scaffolding materials on rental basis as per the requirement of our clients. We have committed and dedicated professional staff to ensure our outstanding services.",
];

export const services: Service[] = [
  {
    slug: "scaffolding-rentals",
    name: "Scaffolding Rentals",
    title: "Scaffolding Rental",
    summary:
      "Al Batin Scaffolding provides work access solutions, including erecting and dismantling scaffolding, scaffolding rental and shoring services, to oil and petrochemical clients, directly and through general contractors, within your budget.",
    image: "/images/site/scaffold-props.jpg",
    hero: "/images/heroes/props.jpg",
    imageAlt: "Stacks of steel scaffolding props ready for rental",
    body: salesRentalsBody,
    list: supplyList,
  },
  {
    slug: "scaffolding-erection",
    name: "Scaffolding Erection",
    title: "Scaffolding Erection",
    summary:
      "Al Batin Scaffolding is one of the top scaffolding erection companies in Saudi Arabia. Our work is erecting, altering or dismantling a temporary structure erected to support a platform from which a person or object may fall more than 4 metres.",
    image: "/images/site/scaffold-building.jpg",
    hero: "/images/heroes/scaffold-building.jpg",
    imageAlt: "Scaffolding erected around a multi-storey building",
    body: [
      "We provide work access solutions, including erecting and dismantling scaffolding, scaffolding rental and shoring services, to oil and petrochemical clients, directly and through general contractors. In just eight years, we expanded from a small start-up to a 20-person company that clocked more than 1 million work hours. Our growth speaks to our quality, productivity and safety: onshore, offshore, domestic and overseas.",
      "Fast mobilization underpins our operations. With a well-organized, substantial inventory and round-the-clock availability, we can deliver accurate materials and skilled personnel right away.",
      "High expectations. Because many other crafts depend on scaffolding, our work is often the foundation for successful industrial projects. That is one reason we hold ourselves to the highest standards for training and strive to optimize our performance at every level.",
      "In-house trainers certified by the Scaffold Training Institute provide practical, hands-on instruction that covers assembly, inspection and other activities required for the proper erection and use of scaffolding. We make sure that everyone understands how to identify and control risks and comply with correct safety standards.",
      "We also provide comprehensive pre-planning. Because our management team comprises skilled problem-solvers with more than 8 years of field scaffolding experience, they understand how to best accomplish each job and would never take the kinds of short-cuts that could increase risk.",
    ],
  },
  {
    slug: "scaffolding-sales",
    name: "Scaffolding Sales",
    title: "Scaffolding Sales",
    summary:
      "At Al Batin Scaffolding, our research is often the basis for productive industrial projects. That is one factor we hold to the highest training standards, working to improve our efficiency at all levels.",
    image: "/images/projects/marafiq-swtp-9.jpg",
    hero: "/images/heroes/marafiq.jpg",
    imageAlt: "Scaffolding structure at the Marafiq SWTP-9 project",
    body: salesRentalsBody,
    list: supplyList,
  },
];

export const servicesIntro = [
  "AL-BATIN ADVANCED CONTRACTING CO. LTD is not just a full-service scaffolding solutions provider. We also have a wide range of other support services that we offer to our clients. Even if you don't choose us for your scaffolding needs, or your project doesn't require scaffolding and related services, there are still many ways in which AL-BATIN can help you achieve your desired results.",
  "At the same time, if you do choose AL-BATIN for scaffolding, our support services augment these products and solutions, and allow you to gain the benefit of synergy. Working with our team for support services as well as scaffolding saves you time and money, makes your job site more productive, provides faster project completion, and can greatly enhance safety as well.",
  "To learn more about any of the support services we offer, or any of our products or other solutions, please explore our website. Then, don't hesitate to contact us, and one of our executives will be in touch with you as soon as possible to discuss what AL-BATIN ADVANCED CONTRACTING CO. LTD can do for you.",
];

export const industrialScope = [
  "Plant maintenance, modification and upgrades",
  "Outages, shutdowns and turnarounds",
  "Protective coatings",
  "Industrial insulation",
  "Capital projects",
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
