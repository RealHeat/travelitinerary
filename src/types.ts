/* =========================================================================
   DATA MODEL  ·  Around the World — APHuG Travel Itinerary
   ---------------------------------------------------------------------------
   The whole site is driven by a single typed `TripOverview` object (see
   data/trip.ts). Fill in the strings there and every page updates.
   `text#` / `image#` placeholders from the prototype are replaced by these
   named fields.
   ========================================================================= */

export interface CostLine {
  label: string;
  value: string; // e.g. "$1,200"
}

export interface LineItem {
  text: string;
  cost?: string;
}

export interface ImageRef {
  /** Real image URL. Leave null to render the dashed placeholder slot. */
  src: string | null;
  caption?: string;
  /** Small grey note shown inside the placeholder slot (e.g. "photo 1"). */
  note?: string;
}

export interface CountryStop {
  stopNumber: number; // 1..7
  country: string; // page title
  region: string;
  datesOfVisit: string;
  capital: string;
  otherPlace: string;
  aphug: {
    language: string;
    religion: string;
    dtmStage: string;
    netMigration: string;
    cityType: string;
    culturalSite: string;
    agriculture: string;
    factory: string;
    typicalHome: string;
    areasVisited: string;
  };
  travel: {
    arrivingFrom: string;
    mode: string;
    modeCost: string;
    local: string;
    localCost: string;
  };
  lodging: {
    place: string;
    nights: string;
    perNight: string;
    total: string;
  };
  activities: LineItem[];
  food: {
    items: LineItem[];
    budget: string;
  };
  journal: string;
  photos: ImageRef[];
  costSummary: {
    rows: CostLine[];
    total: CostLine;
  };
}

export interface TripOverview {
  travelers: string[];
  startDate: string;
  endDate: string;
  startingPoint: string;
  finalDestination: string;
  totalBudget: string;
  finalMap: ImageRef;
  mapEmbedLink: string;
  grandTotal: {
    perStop: string[]; // 7 values, one per stop
    total: string;
  };
  stops: CountryStop[]; // 7
}
