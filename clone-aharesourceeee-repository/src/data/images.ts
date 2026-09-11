const px = (id: number, w = 1200, h = 800) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const IMG = {
  // Indonesia / hub
  heroBg: px(36732232, 2000, 1250),
  jakarta: px(32327756),
  jakartaNight: px(4992990),
  jakartaAerial: px(36732232),
  jakartaSkyline: px(37820154),

  // Komodo / Labuan Bajo / islands
  komodoHarbor: px(31987649),
  fishingBoats: px(38787249),
  komodoShips: px(18340434),
  komodoSunrise: px(38787248),
  sailingBoats: px(38787244),
  padar: px(7067089),
  komodoBay: px(8188644),
  padarSunset: px(10392196),
  phinisi: px(35823227),
  komodoAerial: px(3935736),

  // Food
  fineDining: px(37211572),
  bbq: px(29309713),
  streetGrill: px(6872124),
  charcoal: px(38461297),
  shrimpSalad: px(39035466),
  squid: px(10836201),
  seafoodFeast: px(32250509),
  seafoodPlatter: px(4869334),
  spicyFish: px(35627599),
  crabPlatter: px(4869355),

  // Culture
  kecak: px(35364628),
  danceParade: px(32193842),
  danceOutdoor: px(35365596),
  templeDance: px(35365592),
  ceremony: px(36105990),
  kecakAmphi: px(32162991),
  kecakCrowd: px(38964335),
  kecakSunset: px(35364617),

  // Hospitality
  villaPool: px(34790496),
  palmPool: px(19570521),
  villaGarden: px(36418268),
  cliffVilla: px(35043038),
  loungeChairs: px(14036443),
  villaAerial: px(36965360),
  resortPool: px(14024947),
  deckChairs: px(14036487),

  // Agriculture
  farmer: px(5111999),
  farmers: px(18310739),
  cropland: px(14232071),
  riceAerial: px(35738185),
  farmCouple: px(15830193),
  riceField: px(37838042),
  riceDrone: px(35669316),
  ricePaddies: px(35697843),

  // Trade / port
  containers: px(33537946),
  cranes: px(20581299),
  cargoShip: px(4940273),
  portShip: px(30115463),

  // Fisheries / marine
  reefOrange: px(13010777),
  clownfish: px(13010774),
  schoolFish: px(13010781),
  reefRed: px(31895961),

  // Retail
  marketGrains: px(19334742),
  marketSpice: px(37830084),
  teaMarket: px(12944684),
  jogjaMarket: px(37252500),

  // Automotive / mobility
  motorbikes: px(32804885),
  scooterCouple: px(31582427),
  scooterRide: px(2174656),
  motorbikesRoad: px(32877175),

  // Cruise
  cruise: px(33270055),
  cruiseNight: px(24244288),
  cruiseSea: px(15241912),

  // Healthcare / wellness
  spa: px(6187852),
  massage: px(6629525),
  herbal: px(6187848),

  // Corporate / training
  meeting: px(1181394),
  workshop: px(15141493),
  presentation: px(34221175),
  officeTeam: px(7793750),
};

export type GalleryItem = { src: string; alt: string };

export const GALLERY: GalleryItem[] = [
  { src: IMG.fineDining, alt: "Fine dining" },
  { src: IMG.seafoodFeast, alt: "Indonesian seafood feast" },
  { src: IMG.kecak, alt: "Kecak dance at sunset" },
  { src: IMG.komodoHarbor, alt: "Labuan Bajo harbour" },
  { src: IMG.villaPool, alt: "Bali villa pool" },
  { src: IMG.riceAerial, alt: "Rice fields aerial" },
  { src: IMG.containers, alt: "Export containers" },
  { src: IMG.clownfish, alt: "Coral reef" },
  { src: IMG.padar, alt: "Padar Island" },
  { src: IMG.marketSpice, alt: "Spice market" },
  { src: IMG.motorbikes, alt: "Motorcycle tourism" },
  { src: IMG.cruise, alt: "Cruise tourism" },
  { src: IMG.charcoal, alt: "Grill kitchen" },
  { src: IMG.templeDance, alt: "Temple dance" },
  { src: IMG.cliffVilla, alt: "Cliffside villa" },
  { src: IMG.farmer, alt: "Farmer in rice plantation" },
  { src: IMG.cargoShip, alt: "Cargo ship at port" },
  { src: IMG.reefOrange, alt: "Coral garden" },
  { src: IMG.komodoSunrise, alt: "Komodo sunrise" },
  { src: IMG.jogjaMarket, alt: "Jogja traditional market" },
  { src: IMG.scooterCouple, alt: "Scooter circuit" },
  { src: IMG.spa, alt: "Herbal wellness" },
  { src: IMG.shrimpSalad, alt: "Grilled prawn" },
  { src: IMG.ceremony, alt: "Balinese ceremony" },
  { src: IMG.villaGarden, alt: "Villa garden" },
  { src: IMG.ricePaddies, alt: "Rice paddies" },
  { src: IMG.cranes, alt: "Port cranes" },
  { src: IMG.schoolFish, alt: "School of fish" },
  { src: IMG.jakarta, alt: "Jakarta skyline" },
  { src: IMG.workshop, alt: "Training workshop" },
  { src: IMG.phinisi, alt: "Phinisi sailing boat" },
];
