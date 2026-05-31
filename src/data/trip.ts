/* =========================================================================
   TRIP DATA  ·  Around the World — APHuG Travel Itinerary
   ---------------------------------------------------------------------------
   This is the single source of truth for the whole site. Every fill-in value
   below is a placeholder labelled  text1, text2, text3 ...  and every image
   is image1, image2 ...   — Ctrl-F a label to jump straight to it, then
   replace the string with your real content.

   The labels are UNIQUE across this whole file (they never repeat), so a
   Ctrl-F always lands on exactly one spot. Layout of the numbers:

       • Home / trip overview ............ text1  – text13   (image1)
       • Stop 1 .......................... text14 – text61    (image1, image2)
       • Stop 2 .......................... text62 – text109
       • Stop 3 .......................... text110 – text157
       • Stop 4 .......................... text158 – text205
       • Stop 5 .......................... text206 – text253
       • Stop 6 .......................... text254 – text301
       • Stop 7 .......................... text302 – text349

   For a photo / map, set its `src` to an image URL. Leave `src: null` to keep
   the dashed placeholder slot (it shows the image1 / image2 tag).
   ========================================================================= */

import type { CountryStop, TripOverview } from '../types';

// Hands out the next unique label each time it is called: text1, text2, ...
let counter = 0;
const t = () => `text${++counter}`;

/** Builds one stop. Each call to `t()` consumes the next label in sequence,
 *  so the fields below are numbered top-to-bottom in the order they render. */
function makeStop(stopNumber: number): CountryStop {
  return {
    stopNumber,
    country: t(),
    region: t(),
    datesOfVisit: t(),
    capital: t(),
    otherPlace: t(),
    aphug: {
      language: t(),
      religion: t(),
      dtmStage: t(),
      netMigration: t(),
      cityType: t(),
      culturalSite: t(),
      agriculture: t(),
      factory: t(),
      typicalHome: t(),
      areasVisited: t(),
    },
    travel: {
      arrivingFrom: t(),
      mode: t(),
      modeCost: t(),
      local: t(),
      localCost: t(),
    },
    lodging: {
      place: t(),
      nights: t(),
      perNight: t(),
      total: t(),
    },
    activities: [
      { text: t(), cost: t() },
      { text: t(), cost: t() },
      { text: t(), cost: t() },
      { text: t(), cost: t() },
    ],
    food: {
      items: [
        { text: t(), cost: t() },
        { text: t(), cost: t() },
        { text: t(), cost: t() },
      ],
      budget: t(),
    },
    journal: t(),
    photos: [
      { src: null, note: 'photo 1', caption: t() },
      { src: null, note: 'photo 2', caption: t() },
    ],
    costSummary: {
      rows: [
        { label: 'Transport to / from', value: t() },
        { label: 'Local transport', value: t() },
        { label: 'Lodging', value: t() },
        { label: 'Activities', value: t() },
        { label: 'Food', value: t() },
      ],
      total: { label: 'Stop total', value: t() },
    },
  };
}

// ---- Home / trip overview (text1 – text13) ---------------------------------
const startDate = t(); // text1
const endDate = t(); // text2
const finalDestination = t(); // text3
const totalBudget = t(); // text4
const mapEmbedLink = t(); // text5
const grandTotalPerStop = Array.from({ length: 7 }, () => t()); // text6 – text12
const grandTotalValue = t(); // text13

// ---- The 7 stops (text14 – text349) ----------------------------------------
const stops = Array.from({ length: 7 }, (_, i) => makeStop(i + 1));

export const trip: TripOverview = {
  travelers: ['Eisei', 'Nicholas'],
  startDate,
  endDate,
  startingPoint: 'San Jose / Bay Area, California', // real, not a placeholder
  finalDestination,
  totalBudget,
  finalMap: { src: null, note: 'full-journey map' },
  mapEmbedLink,
  grandTotal: {
    perStop: grandTotalPerStop,
    total: grandTotalValue,
  },
  stops,
};
