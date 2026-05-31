/* =========================================================================
   TRIP DATA  ·  Around the World — APHuG Travel Itinerary
   ---------------------------------------------------------------------------
   This is the single source of truth for the whole site. Every fill-in value
   below is a placeholder labelled  text1, text2, text3 ...  and every image
   is image1, image2 ...

   HOW TO EDIT:
     1. Ctrl-F the label you want (e.g. text14). Each one appears exactly ONCE,
        so it jumps straight to it.
     2. Replace the placeholder string with your real text — keep the quotes.
        e.g.   country: 'text14',   ->   country: 'Japan',
     3. Save. The page updates automatically.

   For a photo / map, set its 'src' to an image URL (keep the quotes), e.g.
        { src: 'https://...jpg', note: 'photo 1', caption: 'text54' }
   Leave  src: null  to keep the dashed placeholder slot.

   Where the numbers live:
     • Home / overview ..... text1  – text13   (image1)
     • Stop 1 .............. text14 – text61    (image1, image2)
     • Stop 2 .............. text62 – text109
     • Stop 3 .............. text110 – text157
     • Stop 4 .............. text158 – text205
     • Stop 5 .............. text206 – text253
     • Stop 6 .............. text254 – text301
     • Stop 7 .............. text302 – text349
   ========================================================================= */

import type { TripOverview } from '../types';

export const trip: TripOverview = {
  travelers: ['Eisei', 'Nicholas'],

  // ---- Home / trip overview (text1 – text13) ----
  startDate: 'text1',
  endDate: 'text2',
  startingPoint: 'San Jose / Bay Area, California', // real, not a placeholder
  finalDestination: 'text3',
  totalBudget: 'text4',
  finalMap: { src: null, note: 'full-journey map' }, // image1
  mapEmbedLink: 'text5',
  grandTotal: {
    perStop: ['text6', 'text7', 'text8', 'text9', 'text10', 'text11', 'text12'],
    total: 'text13',
  },

  // ---- The 7 stops (text14 – text349) ----
  stops: [
    // ===== STOP 1  (text14 – text61) =====
    {
      stopNumber: 1,
      country: 'text14',
      region: 'text15',
      datesOfVisit: 'text16',
      capital: 'text17',
      otherPlace: 'text18',
      aphug: {
        language: 'text19',
        religion: 'text20',
        dtmStage: 'text21',
        netMigration: 'text22',
        cityType: 'text23',
        culturalSite: 'text24',
        agriculture: 'text25',
        factory: 'text26',
        typicalHome: 'text27',
        areasVisited: 'text28',
      },
      travel: {
        arrivingFrom: 'text29',
        mode: 'text30',
        modeCost: 'text31',
        local: 'text32',
        localCost: 'text33',
      },
      lodging: {
        place: 'text34',
        nights: 'text35',
        perNight: 'text36',
        total: 'text37',
      },
      activities: [
        { text: 'text38', cost: 'text39' },
        { text: 'text40', cost: 'text41' },
        { text: 'text42', cost: 'text43' },
        { text: 'text44', cost: 'text45' },
      ],
      food: {
        items: [
          { text: 'text46', cost: 'text47' },
          { text: 'text48', cost: 'text49' },
          { text: 'text50', cost: 'text51' },
        ],
        budget: 'text52',
      },
      journal: 'text53',
      photos: [
        { src: null, note: 'photo 1', caption: 'text54' },
        { src: null, note: 'photo 2', caption: 'text55' },
      ],
      costSummary: {
        rows: [
          { label: 'Transport to / from', value: 'text56' },
          { label: 'Local transport', value: 'text57' },
          { label: 'Lodging', value: 'text58' },
          { label: 'Activities', value: 'text59' },
          { label: 'Food', value: 'text60' },
        ],
        total: { label: 'Stop total', value: 'text61' },
      },
    },
    // ===== STOP 2  (text62 – text109) =====
    {
      stopNumber: 2,
      country: 'text62',
      region: 'text63',
      datesOfVisit: 'text64',
      capital: 'text65',
      otherPlace: 'text66',
      aphug: {
        language: 'text67',
        religion: 'text68',
        dtmStage: 'text69',
        netMigration: 'text70',
        cityType: 'text71',
        culturalSite: 'text72',
        agriculture: 'text73',
        factory: 'text74',
        typicalHome: 'text75',
        areasVisited: 'text76',
      },
      travel: {
        arrivingFrom: 'text77',
        mode: 'text78',
        modeCost: 'text79',
        local: 'text80',
        localCost: 'text81',
      },
      lodging: {
        place: 'text82',
        nights: 'text83',
        perNight: 'text84',
        total: 'text85',
      },
      activities: [
        { text: 'text86', cost: 'text87' },
        { text: 'text88', cost: 'text89' },
        { text: 'text90', cost: 'text91' },
        { text: 'text92', cost: 'text93' },
      ],
      food: {
        items: [
          { text: 'text94', cost: 'text95' },
          { text: 'text96', cost: 'text97' },
          { text: 'text98', cost: 'text99' },
        ],
        budget: 'text100',
      },
      journal: 'text101',
      photos: [
        { src: null, note: 'photo 1', caption: 'text102' },
        { src: null, note: 'photo 2', caption: 'text103' },
      ],
      costSummary: {
        rows: [
          { label: 'Transport to / from', value: 'text104' },
          { label: 'Local transport', value: 'text105' },
          { label: 'Lodging', value: 'text106' },
          { label: 'Activities', value: 'text107' },
          { label: 'Food', value: 'text108' },
        ],
        total: { label: 'Stop total', value: 'text109' },
      },
    },
    // ===== STOP 3  (text110 – text157) =====
    {
      stopNumber: 3,
      country: 'text110',
      region: 'text111',
      datesOfVisit: 'text112',
      capital: 'text113',
      otherPlace: 'text114',
      aphug: {
        language: 'text115',
        religion: 'text116',
        dtmStage: 'text117',
        netMigration: 'text118',
        cityType: 'text119',
        culturalSite: 'text120',
        agriculture: 'text121',
        factory: 'text122',
        typicalHome: 'text123',
        areasVisited: 'text124',
      },
      travel: {
        arrivingFrom: 'text125',
        mode: 'text126',
        modeCost: 'text127',
        local: 'text128',
        localCost: 'text129',
      },
      lodging: {
        place: 'text130',
        nights: 'text131',
        perNight: 'text132',
        total: 'text133',
      },
      activities: [
        { text: 'text134', cost: 'text135' },
        { text: 'text136', cost: 'text137' },
        { text: 'text138', cost: 'text139' },
        { text: 'text140', cost: 'text141' },
      ],
      food: {
        items: [
          { text: 'text142', cost: 'text143' },
          { text: 'text144', cost: 'text145' },
          { text: 'text146', cost: 'text147' },
        ],
        budget: 'text148',
      },
      journal: 'text149',
      photos: [
        { src: null, note: 'photo 1', caption: 'text150' },
        { src: null, note: 'photo 2', caption: 'text151' },
      ],
      costSummary: {
        rows: [
          { label: 'Transport to / from', value: 'text152' },
          { label: 'Local transport', value: 'text153' },
          { label: 'Lodging', value: 'text154' },
          { label: 'Activities', value: 'text155' },
          { label: 'Food', value: 'text156' },
        ],
        total: { label: 'Stop total', value: 'text157' },
      },
    },
    // ===== STOP 4  (text158 – text205) =====
    {
      stopNumber: 4,
      country: 'text158',
      region: 'text159',
      datesOfVisit: 'text160',
      capital: 'text161',
      otherPlace: 'text162',
      aphug: {
        language: 'text163',
        religion: 'text164',
        dtmStage: 'text165',
        netMigration: 'text166',
        cityType: 'text167',
        culturalSite: 'text168',
        agriculture: 'text169',
        factory: 'text170',
        typicalHome: 'text171',
        areasVisited: 'text172',
      },
      travel: {
        arrivingFrom: 'text173',
        mode: 'text174',
        modeCost: 'text175',
        local: 'text176',
        localCost: 'text177',
      },
      lodging: {
        place: 'text178',
        nights: 'text179',
        perNight: 'text180',
        total: 'text181',
      },
      activities: [
        { text: 'text182', cost: 'text183' },
        { text: 'text184', cost: 'text185' },
        { text: 'text186', cost: 'text187' },
        { text: 'text188', cost: 'text189' },
      ],
      food: {
        items: [
          { text: 'text190', cost: 'text191' },
          { text: 'text192', cost: 'text193' },
          { text: 'text194', cost: 'text195' },
        ],
        budget: 'text196',
      },
      journal: 'text197',
      photos: [
        { src: null, note: 'photo 1', caption: 'text198' },
        { src: null, note: 'photo 2', caption: 'text199' },
      ],
      costSummary: {
        rows: [
          { label: 'Transport to / from', value: 'text200' },
          { label: 'Local transport', value: 'text201' },
          { label: 'Lodging', value: 'text202' },
          { label: 'Activities', value: 'text203' },
          { label: 'Food', value: 'text204' },
        ],
        total: { label: 'Stop total', value: 'text205' },
      },
    },
    // ===== STOP 5  (text206 – text253) =====
    {
      stopNumber: 5,
      country: 'text206',
      region: 'text207',
      datesOfVisit: 'text208',
      capital: 'text209',
      otherPlace: 'text210',
      aphug: {
        language: 'text211',
        religion: 'text212',
        dtmStage: 'text213',
        netMigration: 'text214',
        cityType: 'text215',
        culturalSite: 'text216',
        agriculture: 'text217',
        factory: 'text218',
        typicalHome: 'text219',
        areasVisited: 'text220',
      },
      travel: {
        arrivingFrom: 'text221',
        mode: 'text222',
        modeCost: 'text223',
        local: 'text224',
        localCost: 'text225',
      },
      lodging: {
        place: 'text226',
        nights: 'text227',
        perNight: 'text228',
        total: 'text229',
      },
      activities: [
        { text: 'text230', cost: 'text231' },
        { text: 'text232', cost: 'text233' },
        { text: 'text234', cost: 'text235' },
        { text: 'text236', cost: 'text237' },
      ],
      food: {
        items: [
          { text: 'text238', cost: 'text239' },
          { text: 'text240', cost: 'text241' },
          { text: 'text242', cost: 'text243' },
        ],
        budget: 'text244',
      },
      journal: 'text245',
      photos: [
        { src: null, note: 'photo 1', caption: 'text246' },
        { src: null, note: 'photo 2', caption: 'text247' },
      ],
      costSummary: {
        rows: [
          { label: 'Transport to / from', value: 'text248' },
          { label: 'Local transport', value: 'text249' },
          { label: 'Lodging', value: 'text250' },
          { label: 'Activities', value: 'text251' },
          { label: 'Food', value: 'text252' },
        ],
        total: { label: 'Stop total', value: 'text253' },
      },
    },
    // ===== STOP 6  (text254 – text301) =====
    {
      stopNumber: 6,
      country: 'text254',
      region: 'text255',
      datesOfVisit: 'text256',
      capital: 'text257',
      otherPlace: 'text258',
      aphug: {
        language: 'text259',
        religion: 'text260',
        dtmStage: 'text261',
        netMigration: 'text262',
        cityType: 'text263',
        culturalSite: 'text264',
        agriculture: 'text265',
        factory: 'text266',
        typicalHome: 'text267',
        areasVisited: 'text268',
      },
      travel: {
        arrivingFrom: 'text269',
        mode: 'text270',
        modeCost: 'text271',
        local: 'text272',
        localCost: 'text273',
      },
      lodging: {
        place: 'text274',
        nights: 'text275',
        perNight: 'text276',
        total: 'text277',
      },
      activities: [
        { text: 'text278', cost: 'text279' },
        { text: 'text280', cost: 'text281' },
        { text: 'text282', cost: 'text283' },
        { text: 'text284', cost: 'text285' },
      ],
      food: {
        items: [
          { text: 'text286', cost: 'text287' },
          { text: 'text288', cost: 'text289' },
          { text: 'text290', cost: 'text291' },
        ],
        budget: 'text292',
      },
      journal: 'text293',
      photos: [
        { src: null, note: 'photo 1', caption: 'text294' },
        { src: null, note: 'photo 2', caption: 'text295' },
      ],
      costSummary: {
        rows: [
          { label: 'Transport to / from', value: 'text296' },
          { label: 'Local transport', value: 'text297' },
          { label: 'Lodging', value: 'text298' },
          { label: 'Activities', value: 'text299' },
          { label: 'Food', value: 'text300' },
        ],
        total: { label: 'Stop total', value: 'text301' },
      },
    },
    // ===== STOP 7  (text302 – text349) =====
    {
      stopNumber: 7,
      country: 'text302',
      region: 'text303',
      datesOfVisit: 'text304',
      capital: 'text305',
      otherPlace: 'text306',
      aphug: {
        language: 'text307',
        religion: 'text308',
        dtmStage: 'text309',
        netMigration: 'text310',
        cityType: 'text311',
        culturalSite: 'text312',
        agriculture: 'text313',
        factory: 'text314',
        typicalHome: 'text315',
        areasVisited: 'text316',
      },
      travel: {
        arrivingFrom: 'text317',
        mode: 'text318',
        modeCost: 'text319',
        local: 'text320',
        localCost: 'text321',
      },
      lodging: {
        place: 'text322',
        nights: 'text323',
        perNight: 'text324',
        total: 'text325',
      },
      activities: [
        { text: 'text326', cost: 'text327' },
        { text: 'text328', cost: 'text329' },
        { text: 'text330', cost: 'text331' },
        { text: 'text332', cost: 'text333' },
      ],
      food: {
        items: [
          { text: 'text334', cost: 'text335' },
          { text: 'text336', cost: 'text337' },
          { text: 'text338', cost: 'text339' },
        ],
        budget: 'text340',
      },
      journal: 'text341',
      photos: [
        { src: null, note: 'photo 1', caption: 'text342' },
        { src: null, note: 'photo 2', caption: 'text343' },
      ],
      costSummary: {
        rows: [
          { label: 'Transport to / from', value: 'text344' },
          { label: 'Local transport', value: 'text345' },
          { label: 'Lodging', value: 'text346' },
          { label: 'Activities', value: 'text347' },
          { label: 'Food', value: 'text348' },
        ],
        total: { label: 'Stop total', value: 'text349' },
      },
    },
  ],
};
