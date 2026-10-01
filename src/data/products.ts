export type CategorySlug =
  | "wood-ply"
  | "coupler"
  | "ladder"
  | "steel-plank-and-scaffolding-tube"
  | "tool"
  | "others";

export type Category = {
  slug: CategorySlug;
  name: string;
  summary: string;
  cover: string;
  /** Full-bleed photo for the category page header. */
  hero: string;
};

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  /** Path under /public, or null when no photo exists yet. */
  image: string | null;
  summary: string;
};

export const categories: Category[] = [
  {
    slug: "wood-ply",
    name: "Wood & Ply",
    summary: "Timber, wooden beams, film faced plywood and OSHA boards for formwork and scaffold decking.",
    cover: "/images/products/ab-plex-film-faced-plywood.jpg",
    hero: "/images/heroes/scaffold-tower.jpg",
  },
  {
    slug: "coupler",
    name: "Coupler",
    summary: "Couplers and clamps for joining scaffolding tubes, beams and boards securely.",
    cover: "/images/products/double-coupler.jpg",
    hero: "/images/heroes/marafiq.jpg",
  },
  {
    slug: "ladder",
    name: "Ladder",
    summary: "Aluminium, steel and beam ladders for safe access on site.",
    cover: "/images/products/aluminum-ladder.jpg",
    hero: "/images/heroes/substation.jpg",
  },
  {
    slug: "steel-plank-and-scaffolding-tube",
    name: "Steel Plank and Scaffolding Tube",
    summary: "Steel planks and GI scaffolding tubes, the backbone of every tube and coupler system.",
    cover: "/images/products/steel-plank.jpg",
    hero: "/images/heroes/scaffold-structure.jpg",
  },
  {
    slug: "tool",
    name: "Tool",
    summary: "Scaffolders' tools, safety harnesses, strapping and site accessories.",
    cover: "/images/products/scaffolding-tool-belt.jpg",
    hero: "/images/heroes/site-team.jpg",
  },
  {
    slug: "others",
    name: "Others",
    summary: "Cuplock components, jacks, base plates, props, steel sections and fittings.",
    cover: "/images/products/cuplock-standard.jpg",
    hero: "/images/heroes/props.jpg",
  },
];

const p = (
  slug: string,
  name: string,
  category: CategorySlug,
  summary: string,
  image: string | null = `/images/products/${slug}.jpg`,
): Product => ({ slug, name, category, summary, image });

export const products: Product[] = [
  // Wood & Ply
  p("ab-plex-film-faced-plywood", "AB Plex Film Faced Plywood", "wood-ply", "Film faced plywood sheets for concrete formwork and shuttering."),
  p("ab-osha-board", "AB Osha Board", "wood-ply", "Wooden scaffold boards for working platforms and walkways."),
  p("timber-wood", "Timber Wood", "wood-ply", "Sawn timber for formwork, bearers and general site use."),
  p("wooden-beam", "Wooden Beam", "wood-ply", "Wooden beams for formwork support and load spreading."),

  // Coupler
  p("double-coupler", "Double Coupler", "coupler", "Right-angle coupler for joining two scaffolding tubes at 90 degrees."),
  p("single-coupler", "Single Coupler", "coupler", "Coupler for fixing a tube to another tube or member."),
  p("swivel-coupler", "Swivel Coupler", "coupler", "Coupler for joining two tubes at any angle, used for bracing."),
  p("sleeve-coupler", "Sleeve Coupler", "coupler", "External coupler for joining two tubes end to end."),
  p("cuplock-ledger", "Cuplock Ledger", "coupler", "Horizontal cuplock member that locks into standards to form the scaffold bay."),
  p("beam-clamp", "Beam Clamp", "coupler", "Clamp for fixing scaffolding tubes to steel beams and flanges."),
  p("board-retaining-clamp", "Board Retaining Clamp", "coupler", "Clamp that holds scaffold boards firmly in place on the tube."),

  // Ladder
  p("steel-ladder", "Steel Ladder", "ladder", "Heavy-duty steel ladder for scaffold and site access."),
  p("beam-ladder", "Beam Ladder", "ladder", "Ladder beams for bridging spans in tube and coupler scaffolds."),
  p("aluminum-ladder", "Aluminum Ladder", "ladder", "Lightweight aluminium step ladder for general access work."),

  // Steel Plank and Scaffolding Tube
  p("steel-plank", "Steel Plank", "steel-plank-and-scaffolding-tube", "Perforated steel planks for scaffold working platforms."),
  p("scaffolding-gi-tube", "Scaffolding GI Tube", "steel-plank-and-scaffolding-tube", "Galvanised iron scaffolding tubes for tube and coupler systems."),

  // Tool
  p("scaffolding-tool-belt", "Scaffolding Tool Belt", "tool", "Tool belt with holders for a scaffolder's essential tools."),
  p("steel-strapping-clips", "Steel Strapping Clips", "tool", "Seals for securing steel strapping on bundled materials."),
  p("harness", "Harness", "tool", "Full body safety harness for working at height."),
  p("steel-strapper", "Steel Strapper", "tool", "Manual tensioning tool for steel strapping."),
  p("rubber-bush", "Rubber Bush", "tool", "Rubber bushes and protective end caps for site use."),
  p("scaffolding-box-spanner", "Scaffolding Box Spanner", "tool", "Box spanner for tightening scaffold coupler bolts."),
  p("steel-strapping-rolls", "Steel Strapping Rolls", "tool", "Steel strapping coils for bundling and securing loads."),
  p("welded-wire-mesh", "Welded Wire Mesh", "tool", "Welded wire mesh rolls for reinforcement and debris protection."),
  p("ratchet-spanner", "Ratchet Spanner", "tool", "Ratchet spanner for fast coupler tightening."),
  p("scaffolding-tag-holders", "Scaffolding Tag-Holders", "tool", "Tag holders and inspection tags for scaffold status marking."),
  p("brass-hammer", "Brass Hammer", "tool", "Non-sparking brass hammer for use in sensitive areas."),
  p("normal-hammer", "Normal Hammer", "tool", "General purpose hammer for scaffold assembly."),
  p("spirit-level", "Spirit Level", "tool", "Spirit level for checking scaffold alignment and plumb."),

  // Others
  p("cuplock-standard", "Cuplock Standard", "others", "Vertical cuplock member with cup joints for rapid scaffold assembly."),
  p("cuplock-transom", "Cuplock Transom", "others", "Cuplock member that supports boards and planks across the bay."),
  p("washer-plate", "Washer Plate", "others", "Square washer plate for tie rods and formwork."),
  p("base-jack", "Base Jack", "others", "Adjustable screw jack for levelling scaffold standards."),
  p("base-plate", "Base Plate", "others", "Steel base plate that spreads the load of scaffold standards."),
  p("carbon-steel-beam", "Carbon Steel Beam", "others", "Carbon steel I-beams for structural and support works."),
  p("carbon-steel-board", "Carbon Steel Board", "others", "Carbon steel plates and sheets for fabrication and site use."),
  p("cross-bracing", "Cross Bracing", "others", "Cross braces for stabilising frame scaffolding."),
  p("joint-pressed", "Joint Pressed", "others", "Pressed joint pin for connecting scaffolding tubes."),
  p("spigot", "Spigot", "others", "Spigot connector for joining scaffold standards."),
  p("ladder-clamp", "Ladder Clamp", "others", "Clamp for securing ladders to the scaffold structure."),
  p("rebar", "Rebar", "others", "Steel reinforcement bars for concrete works."),
  p("universal-clamp", "Universal Clamp", "others", "Pipe hanger clamp for supporting pipes and services."),
  p("black-tube", "Black Tube", "others", "Black HDPE tubes for site services and ducting."),
  p("aluminium-beam", "Aluminium Beam", "others", "Lightweight aluminium beams for formwork and shoring."),
  p("tie-rod", "Tie Rod", "others", "Threaded tie rod for holding formwork panels together."),
  p("u-head-jack", "U Head Jack", "others", "Adjustable U head jack for supporting beams on shoring."),
  p("wing-nut", "Wing Nut", "others", "Wing nut for tie rod and formwork systems."),
  p("steel-props", "Steel Props", "others", "Adjustable steel props for temporary support and shoring."),
  p("pvc-cone", "PVC Cone", "others", "PVC cones used with tie rods in concrete formwork.", null),
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function getProduct(category: string, slug: string) {
  return products.find((x) => x.category === category && x.slug === slug);
}

export function productsIn(category: CategorySlug) {
  return products.filter((x) => x.category === category);
}
