import { IMG } from "./images";

export type BizCat = "tourism" | "food" | "trade" | "service";

export type BizSummary = {
  no: string;
  cat: BizCat;
  eyebrow: string;
  title: string;
  desc: string;
  img: string;
  target: string;
};

export const BIZ_SUMMARY: BizSummary[] = [
  {
    no: "01",
    cat: "tourism",
    eyebrow: "TOURISM CORRIDOR",
    title: "Travel & Tourism",
    desc: "Indonesia Tourism Corridor, Religious, Motorcycle, Cultural, Medical, Cruise, Educational",
    img: IMG.padar,
    target: "biz-travel",
  },
  {
    no: "02",
    cat: "tourism",
    eyebrow: "STAY + EXPERIENCE",
    title: "Hospitality",
    desc: "Accommodation, Tourism, Food & Beverages, Experiences",
    img: IMG.villaPool,
    target: "biz-hospitality",
  },
  {
    no: "03",
    cat: "food",
    eyebrow: "7 KITCHENS",
    title: "Restaurants",
    desc: "Indonesian, International, Seafood, Grill, Cafe, Bakery, Cloud Kitchen",
    img: IMG.fineDining,
    target: "biz-restaurants",
  },
  {
    no: "04",
    cat: "trade",
    eyebrow: "NEIGHBOURHOOD SHELF",
    title: "Retail",
    desc: "Daily needs, Indonesian products, souvenirs, export shelf",
    img: IMG.marketSpice,
    target: "biz-retail",
  },
  {
    no: "05",
    cat: "service",
    eyebrow: "CARE",
    title: "Automotive",
    desc: "Car Wash, Detailing, Maintenance, Tourism vehicles",
    img: IMG.motorbikes,
    target: "biz-automotive",
  },
  {
    no: "06",
    cat: "food",
    eyebrow: "FARM HOUSE",
    title: "Agriculture",
    desc: "Farm House, Agri-Tourism, Organic produce, Supply to Restaurants",
    img: IMG.riceAerial,
    target: "biz-agriculture",
  },
  {
    no: "07",
    cat: "food",
    eyebrow: "BLUE ECONOMY",
    title: "Fisheries",
    desc: "Fish & Prawn Farming, Sustainable, Supply & Export",
    img: IMG.fishingBoats,
    target: "biz-fisheries",
  },
  {
    no: "08",
    cat: "trade",
    eyebrow: "IMPORT EXPORT",
    title: "International Trade",
    desc: "Indonesian products export, import facilitation, trade corridor",
    img: IMG.containers,
    target: "biz-trade",
  },
  {
    no: "09",
    cat: "service",
    eyebrow: "CARE",
    title: "Healthcare",
    desc: "Pharmacy, Wellness, Medical tourism support",
    img: IMG.spa,
    target: "biz-healthcare",
  },
  {
    no: "10",
    cat: "service",
    eyebrow: "PT PMA",
    title: "Legal & Corporate",
    desc: "Company Formation, PT PMA, Licenses, Compliance",
    img: IMG.meeting,
    target: "biz-legal",
  },
  {
    no: "11",
    cat: "service",
    eyebrow: "SKILLS",
    title: "Training",
    desc: "Hospitality, Tourism, Language, Entrepreneurship skills",
    img: IMG.workshop,
    target: "biz-training",
  },
];

export type CompactBiz = {
  id: string;
  tag: string;
  title: string;
  body: string;
  img: string;
  cta: string;
  bookType: string;
  gold?: boolean;
};

export const COMPACT_BIZ: CompactBiz[] = [
  {
    id: "biz-retail",
    tag: "04 — RETAIL",
    title: "Neighbourhood Shelf. Indonesian Products to World.",
    body: "Daily needs, coffee, spices, handicrafts Batik, dried fish, tourist essentials, export shelf. Located near hospitality clusters. Promote MSME.",
    img: IMG.marketGrains,
    cta: "VISIT STORE",
    bookType: "Retail — Visit Store",
  },
  {
    id: "biz-automotive",
    tag: "05 — AUTOMOTIVE",
    title: "Car Wash, Detailing & Tourism Mobility.",
    body: "Premium wash, detailing, tourism fleet maintenance, motorcycle rental & service for motorcycle tourism. EV charging + wash combo.",
    img: IMG.motorbikesRoad,
    cta: "BOOK SERVICE",
    bookType: "Automotive Service",
  },
  {
    id: "biz-agriculture",
    tag: "06 — AGRICULTURE",
    title: "Farm House. Agri-Tourism. Farm-to-Table.",
    body: "Organic vegetables, rice, fruits, farm visits, rice planting experience, supply to restaurants, training local farmers, sambal/coffee packaging.",
    img: IMG.farmers,
    cta: "VISIT FARM",
    bookType: "Agriculture — Farm Visit",
  },
  {
    id: "biz-fisheries",
    tag: "07 — FISHERIES",
    title: "Fish & Prawn Farming. Sustainable Blue Economy.",
    body: "Fish farming, prawn Vannamei, daily fresh to restaurants, dried/frozen export, sustainable aquaculture training, aquaculture tourism.",
    img: IMG.schoolFish,
    cta: "SOURCE SEAFOOD",
    bookType: "Fisheries — Seafood Supply",
  },
  {
    id: "biz-trade",
    tag: "08 — INTERNATIONAL TRADE",
    title: "Indonesian Products Export. Global Products Import.",
    body: "Export coffee, spices, seafood, handicrafts, sambal. Import hospitality equipment, tourism vehicles. Documentation, customs, buyer matching.",
    img: IMG.cranes,
    cta: "START TRADE",
    bookType: "International Trade",
  },
  {
    id: "biz-healthcare",
    tag: "09 — HEALTHCARE",
    title: "Pharmacy. Wellness. Medical Tourism Support.",
    body: "Pharmacy retail & supply to hotels, wellness spa traditional massage herbal, medical tourism facilitation, health camps community outreach.",
    img: IMG.massage,
    cta: "HEALTH SERVICES",
    bookType: "Healthcare Services",
  },
  {
    id: "biz-legal",
    tag: "10 — LEGAL & CORPORATE",
    title: "Company Formation. PT PMA. Licenses. Compliance.",
    body: "PT PMA formation foreign-owned, local PT, business licenses tourism/restaurant/retail/import-export, KITAS/KITAP, tax compliance, property lease, JV structuring.",
    img: IMG.presentation,
    cta: "START PT PMA",
    bookType: "Legal — PT PMA",
    gold: true,
  },
  {
    id: "biz-training",
    tag: "11 — TRAINING & SKILLS",
    title: "Hospitality. Tourism. Language. Entrepreneurship.",
    body: "Hospitality front office F&B housekeeping, tourism guide certified, Bahasa for expats English for locals, entrepreneurship homestay restaurant, agriculture fisheries training. Train → Intern → Employ.",
    img: IMG.officeTeam,
    cta: "JOIN TRAINING",
    bookType: "Training Enrollment",
  },
];

export const PILLARS = [
  {
    no: "01",
    kind: "FINANCIAL",
    title: "CAPITAL",
    body: "Financial resources, investment capability, asset base, and ability to mobilize funds for growth opportunities. We deploy capital strategically across sectors to maximize integrated returns.",
  },
  {
    no: "02",
    kind: "HUMAN",
    title: "PEOPLE",
    body: "Human capital, talent, expertise, cultural understanding, and relationships. Our people are our bridge — multilingual, multicultural, and deeply connected in Indonesia and international markets.",
  },
  {
    no: "03",
    kind: "DEMAND",
    title: "MARKETS",
    body: "Indonesia's 270M+ domestic market plus international corridors. We understand tourist markets, food markets, retail markets, agricultural markets, and B2B service markets.",
  },
  {
    no: "04",
    kind: "KNOW-HOW",
    title: "EXPERTISE",
    body: "Operational knowledge across 11 sectors — from running hotels and restaurants to legal PT PMA formation, import-export documentation, and farm management.",
  },
  {
    no: "05",
    kind: "RELATIONSHIPS",
    title: "NETWORKS",
    body: "Partnerships with government, tourism boards, suppliers, airlines, hotels, farmers, fishermen, retailers, and international buyers. Networks that take years to build.",
  },
  {
    no: "06",
    kind: "GROWTH",
    title: "OPPORTUNITIES",
    body: "Indonesia Tourism Corridor, Religious Tourism, Agro-Tourism, Export of Indonesian products, Import of needed goods, Training needs, Healthcare access, Legal facilitation for investors.",
  },
];

export const INVEST_STEPS = [
  {
    no: "01",
    title: "OPPORTUNITY IDENTIFICATION",
    body: "Identify gaps in Indonesia tourism corridor — no premium homestay, no seafood restaurant, no organic supply.",
  },
  {
    no: "02",
    title: "FEASIBILITY & MARKET STUDY",
    body: "Tourist footfall, competitor analysis, cost structure, regulatory check, ROI projection from operating businesses.",
  },
  {
    no: "03",
    title: "STRUCTURE & LEGAL",
    body: "PT PMA or JV structure, licenses, KITAS, property lease, compliance roadmap. Handled by Legal vertical.",
  },
  {
    no: "04",
    title: "PARTNERSHIP & NETWORK",
    body: "Connect with local partners, government, suppliers, buyers, tourism boards. Network is our moat.",
  },
  {
    no: "05",
    title: "INVESTMENT & SETUP",
    body: "Capital deployment, build-out, staffing via Training academy, supply chain setup, SOPs.",
  },
  {
    no: "06",
    title: "GROWTH & VALUE CREATION",
    body: "Operations, marketing via Travel network, retail export, scaling to other islands, eventual exit or expansion. Integrated returns.",
  },
];

export const ADVANTAGES = [
  {
    no: "01",
    title: "Integrated Ecosystem — Not Silos",
    body: "11 businesses that feed each other. One customer touches 7-8 businesses, multiplying revenue per customer.",
  },
  {
    no: "02",
    title: "Indonesia Hub + International Corridor",
    body: "Deep local knowledge + international market access. We are the bridge, not just a local player.",
  },
  {
    no: "03",
    title: "End-to-End Facilitation",
    body: "From PT PMA formation to operations, supply chain, marketing, export — one group handles all.",
  },
  {
    no: "04",
    title: "Cultural & Market Expertise",
    body: "We understand Indonesian culture, Halal tourism, religious tourism, and international expectations.",
  },
  {
    no: "05",
    title: "Network Moat",
    body: "Government, tourism boards, airlines, hotels, farmers, buyers — relationships built over years.",
  },
  {
    no: "06",
    title: "Asset-Light + Partnership Model",
    body: "We don't need to own all hotels — we manage, partner, and certify. Scalable without heavy capex.",
  },
  {
    no: "07",
    title: "Profitability with Purpose",
    body: "Sustainable, community-based, environmentally conscious — attractive to modern investors and tourists.",
  },
];

export const PHASES = [
  {
    label: "PHASE 1 — FOUNDATION (2020-21)",
    body: "Legal & Corporate, market research, PT PMA facilitation, network building.",
    color: "#002448",
  },
  {
    label: "PHASE 2 — TOURISM & HOSPITALITY (2022)",
    body: "Indonesia Tourism Corridor launch, religious tourism, hotel partnerships.",
    color: "#0a3161",
  },
  {
    label: "PHASE 3 — FOOD & RETAIL (2023)",
    body: "Restaurants 7 kitchens, Neighbourhood Shelf retail, import-export of food.",
    color: "#b48430",
  },
  {
    label: "PHASE 4 — PRIMARY SECTORS (2024)",
    body: "Agriculture Farm House, Fisheries, Automotive, Healthcare pharmacy.",
    color: "#c9a24b",
  },
];

export const INTERNATIONAL = [
  {
    title: "01 MARKET ENTRY FACILITATION",
    body: "We make Indonesia easy — PT PMA, licenses, property, staffing, supply chain. One contact, end-to-end.",
  },
  {
    title: "02 JV & PARTNERSHIP MODEL",
    body: "We prefer JV where international partner brings market/capital/expertise, we bring local execution/network.",
  },
  {
    title: "03 TOURISM CORRIDOR — TWO WAY",
    body: "Bring international tourists to Indonesia AND take Indonesian tourists/products to international markets.",
  },
  {
    title: "04 TRADE CORRIDOR — TWO WAY",
    body: "Export Indonesian coffee, spices, seafood, handicrafts. Import hospitality equipment, tourism vehicles.",
  },
  {
    title: "05 CULTURAL BRIDGE",
    body: "We translate culture, not just language — Halal, religious sensitivity, business etiquette, local customs.",
  },
  {
    title: "06 LONG-TERM VALUE",
    body: "We don't seek quick deals — we build long-term ecosystems where both sides grow.",
  },
];

export const PARTNERSHIPS = [
  "Ministry of Tourism & Creative Economy",
  "Local Governments — Labuan Bajo, Bali, Lombok",
  "Airlines & Cruise Liners — Astoria Grande, AIDAmar",
  "Hotels & Villa Owners — Management partnerships",
  "Farmers & Fishermen Cooperatives",
  "MSMEs — Product sourcing & export",
  "International Tour Operators — GCC, Europe, ASEAN",
  "Legal & Consulting Networks",
];
