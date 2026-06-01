/* =========================================================================
   TRIP DATA  ·  Around the World - APHuG Travel Itinerary
   ---------------------------------------------------------------------------
   Single source of truth for the whole site. Edit a value here and the page
   updates automatically.

   HOW TO EDIT:
     - Each of the 7 stops is a clearly labelled block below (// ===== STOP N).
     - Change any string between the quotes to update that field on the site.
     - Activities and food are LISTS: add or remove a line to add or remove a
       row on the page. Keep the  { text: '...', cost: '...' }  shape.
     - Photos and journal are still text# placeholders to fill in later.
       For a real photo, set its 'src' to an image URL (keep the quotes);
       leave  src: null  to keep the dashed placeholder slot.
   ========================================================================= */

import type { TripOverview } from '../types';

// All files in src/images, imported through Vite so the URLs work in the
// build (and on GitHub Pages). To use one, write  img('Mexico1.jpg').
const images = import.meta.glob('../images/*', { eager: true, import: 'default' }) as Record<
  string,
  string
>;
const img = (name: string) => images[`../images/${name}`];

export const trip: TripOverview = {
  travelers: ['Eisei', 'Nicholas'],

  // ---- Home / trip overview ----
  startDate: 'June 7, 2026',
  endDate: 'June 28, 2026',
  startingPoint: 'San Jose / Bay Area, California',
  startCoords: [-121.89, 37.34], // San Jose, CA [lng, lat]
  finalDestination: 'San Jose / Bay Area, California',
  totalBudget: '$11,964.66',
  finalMap: { src: img('FullMap.png'), note: 'full-journey map' },
  mapEmbedLink: 'https://nicholas-yashiro.travelmap.net/',
  grandTotal: {
    perStop: ['$1,535.66', '$1,108.00', '$1,401.00', '$1,952.00', '$1,085.00', '$1,484.00', '$3,399.00'],
    total: '$11,964.66',
  },

  // ---- The 7 stops ----
  stops: [
    // ===== STOP 1: Mexico =====
    {
      stopNumber: 1,
      country: 'Mexico',
      coords: [-99.13, 19.43], // Mexico City
      region: 'North America',
      datesOfVisit: 'June 7, 2026',
      capital: 'Mexico City',
      otherPlace: 'San Luis Potosi',
      aphug: {
        language: 'Spanish (UN language)',
        religion: 'Roman Catholic (majority); Pentecostal, Evangelical, and Mainline Protestant',
        dtmStage: 'Stage 3 (low death rates, falling birth rates)',
        netMigration: 'Net OUT (negative since 1960)',
        cityType: 'Primate city',
        culturalSite: 'Cathedral of San Luis Potosi',
        agriculture: 'Corn (intensive)',
        factory: 'Maquiladora making tech goods, located near the US for lower labor costs',
        typicalHome: 'Adobe casa',
        areasVisited: 'San Luis Potosi, Mexico City',
      },
      travel: {
        arrivingFrom: 'Bay Area, California',
        mode: 'Flight (San Jose to Mexico City)',
        modeCost: '$990 ($495 x 2)',
        local: 'Bus between Mexico City and San Luis Potosi (round trip)',
        localCost: '$240',
      },
      lodging: {
        place: 'Hotel Diligencias',
        nights: '3',
        perNight: '$57',
        total: '$171',
      },
      activities: [
        { text: 'Cathedral of San Luis Potosi', cost: 'Free' },
        { text: 'Teotihuacan and the Basilica', cost: '$110' },
        { text: 'Museo Laberinto de las Ciencias y las Artes', cost: '$8.66' },
      ],
      food: {
        items: [
          { text: 'Tamales and guajolotas', cost: '$3.00' },
          { text: 'Quesadillas and tostadas', cost: '$10.00' },
          { text: 'Tacos (al pastor, suadero, carnitas)', cost: '$3.00' },
        ],
        budget: '$16.00',
      },
      journal: [
        {
          author: 'Nicholas',
          text: `The first thing we did was to take a flight to Mexico City. (On June 7th) After that we went to Teotihuacan Pyramids, which did cost around $110 for the both of us. We were about to be late to our bus to San Luis Potosi, which was a minor challenge. In San Luis Potos, we went to a tech museum, which cost $8.66 in total for the both of us. We got some delicious Quesadillas and Tamales in San Luis Potosi also, which was very delicious. On the final day we made a quick trip to the San Luis Potosi, which surprisingly was completely free to tour. At the end (June 9th), we departed to Cuba.`,
        },
        {
          author: 'Eisei',
          text: `After we took our flight to Mexico City on June 7th, we went to Teotihuacan Pyramids and the Basilica. The tour cost $55 for one person. On our second day, we went on our bus to San Luis Potosi, in which we went to a science museum which cost $8.66 for the two of us. After we got back to the hotel on the last day, we went back to San Luis Potosi to go to the Cathedral. On the day of departure, we went straight to the airport to leave for Cuba.`,
        },
      ],
      photos: [
        { src: img('Mexico1.jpg'), caption: 'Cathedral of San Luis Potosi' },
        { src: img('Mexico2.jpg'), caption: 'Museo Laberinto de las Ciencias y las Artes' },
      ],
      stopMap: { src: img('MexicoMap.png'), note: 'route and places visited' },
      costSummary: {
        rows: [
          { label: 'Transport to / from', value: '$990.00' },
          { label: 'Local transport', value: '$240.00' },
          { label: 'Lodging', value: '$171.00' },
          { label: 'Activities', value: '$118.66' },
          { label: 'Food', value: '$16.00' },
        ],
        total: { label: 'Stop total', value: '$1,535.66' },
      },
    },
    // ===== STOP 2: Cuba =====
    {
      stopNumber: 2,
      country: 'Cuba',
      coords: [-82.38, 23.13], // Havana
      region: 'Caribbean',
      datesOfVisit: 'June 10, 2026',
      capital: 'Havana',
      otherPlace: 'Trinidad',
      aphug: {
        language: 'Spanish (UN language)',
        religion: 'Christian (majority), folk religion',
        dtmStage: 'Stage 4 (low, stable birth and death rates)',
        netMigration: 'Net OUT (negative since 1960)',
        cityType: 'Primate city',
        culturalSite: 'Castillo de la Real Fuerza',
        agriculture: 'Sugarcane and tobacco (extensive)',
        factory: 'N/A',
        typicalHome: 'N/A',
        areasVisited: 'Havana, Trinidad',
      },
      travel: {
        arrivingFrom: 'Mexico City',
        mode: 'Flight',
        modeCost: '$762',
        local: 'Taxi round trip to Trinidad; local taxis in Havana',
        localCost: '$130',
      },
      lodging: {
        place: 'Casa particular (private homestay) in Old Havana',
        nights: '3',
        perNight: '$40',
        total: '$120',
      },
      activities: [
        { text: 'Castillo de los Tres Reyes del Morro (El Morro fortress)', cost: '$12' },
        { text: 'Museo de la Revolucion (Museum of the Revolution)', cost: '$16' },
        { text: 'Plaza Mayor colonial walking tour in Trinidad', cost: '$8' },
      ],
      food: {
        items: [
          { text: 'Ropa vieja (shredded beef stew) at Paladar Los Mercaderes', cost: '$14' },
          { text: 'Medianoche sandwich from a street cafe', cost: '$5' },
          { text: 'Batido de mango (mango milkshake)', cost: '$3' },
        ],
        budget: '$60',
      },
      journal: [
        {
          author: 'Nicholas',
          text: `On June 10th we landed in Havana from Mexico City. The first thing that surprised us is how old the city looks compared to modern cities. There are many vintage American cars, consequently due to a U.S trade embargo after the 1959 revolution. We visited El Morro fortress, built by the Spanish to protect the harbor. We also took a Colectivo to Trinidad, which is a UNESCO designated colonial town. There is a large connection between extensive sugarcane and tobacco agriculture in the surrounding plains, and the wealth it generated. The contrast in how Havana and Trinidad look is very distinct. We departed for Lima on June 12th.`,
        },
        {
          author: 'Eisei',
          text: `After we got to Cuba from Mexico, we went to the castle of the three kings of Morro, which has beautiful limestone walls. The cost for it for two people was $12. On the next day, we went to the Museum of Revolution, in which we saw the artifacts of the revolution in Cuba. It cost around $8 per person. On our third day we went on the Plaza Mayor colonial walking tour in Trinidad, where we were almost late to the tour. On the last day, we left for Peru.`,
        },
      ],
      photos: [
        { src: img('Cuba1.jpg'), caption: 'El Morro fortress, Havana' },
        { src: img('Cuba2.jpg'), caption: 'Museo de la Revolución, Havana' },
      ],
      stopMap: { src: img('CubaMap.png'), note: 'route and places visited' },
      costSummary: {
        rows: [
          { label: 'Transport to / from', value: '$762.00' },
          { label: 'Local transport', value: '$130.00' },
          { label: 'Lodging', value: '$120.00' },
          { label: 'Activities', value: '$36.00' },
          { label: 'Food', value: '$60.00' },
        ],
        total: { label: 'Stop total', value: '$1,108.00' },
      },
    },
    // ===== STOP 3: Peru =====
    {
      stopNumber: 3,
      country: 'Peru',
      coords: [-77.04, -12.05], // Lima
      region: 'South America',
      datesOfVisit: 'June 13, 2026',
      capital: 'Lima',
      otherPlace: 'Ica',
      aphug: {
        language: 'Spanish (UN language)',
        religion: 'Roman Catholic (majority), Protestant',
        dtmStage: 'Stage 4 (falling birth and death rates, stabilizing population)',
        netMigration: 'Net IN (positive in recent years)',
        cityType: 'Primate city',
        culturalSite: 'Historic Centre of Lima',
        agriculture: 'Potatoes and quinoa (intensive)',
        factory: 'Premium textile production, based on long tradition, skilled labor, and premium natural materials',
        typicalHome: 'Quincha or adobe housing',
        areasVisited: 'Lima, Ica, Huacachina',
      },
      travel: {
        arrivingFrom: 'Havana, Cuba',
        mode: 'Flight (Copa Airlines via Panama City)',
        modeCost: '$1,000 ($500 x 2)',
        local: 'Cruz del Sur bus between Lima and Ica; Uber and bus in Lima',
        localCost: '$102',
      },
      lodging: {
        place: 'Hotel Señorial',
        nights: '3',
        perNight: '$55',
        total: '$165',
      },
      activities: [
        { text: 'Museo Larco (pre-Columbian gold, textiles, ceramics)', cost: '$30' },
        { text: 'Historic Centre of Lima and Catedral de Lima', cost: '$4' },
        { text: 'Huacachina dune buggy and sandboarding near Ica', cost: '$30' },
      ],
      food: {
        items: [
          { text: 'Ceviche at a local cevicheria in Lima', cost: '$18' },
          { text: 'Lomo saltado at a neighborhood restaurant', cost: '$14' },
          { text: 'Picarones (street doughnuts with molasses syrup)', cost: '$3' },
        ],
        budget: '$70',
      },
      journal: [
        {
          author: 'Nicholas',
          text: `On June 13th, we arrived in Lima from Havana. Lima was a huge city, holding over 10 million people. The uneven distribution of wealth was visible easily. Miraflores had ocean-view parks, next to densely packed shantytowns on the surrounding hills. The next day, we took a Cruz del Sur bus south through the coastal desert to Ica. We saw tons of intensive agriculture with irrigation technology. We also went to Lima’s Historic Centre: the 1535 Spanish colonial plaza built directly over demolished Inca temples. We finally went to the Larco museum, with pre-Columbian textiles, and then we departed to Morocco.`,
        },
        {
          author: 'Eisei',
          text: `Before we arrived at the airport, we could see some factories from the window of the airplane. When we arrived at Lima, we went to Museo Larco, which had artifacts from ancient Peru, such as silver and gold. The museum cost $3o for both of us to enter. On the second day, we went to the historic center of Lima, which was free, but we donated some money for the cathedral interior. Then for the last day, we went on dune buggies and sandboarded near Ica.`,
        },
      ],
      photos: [
        { src: img('Peru1.jpg'), caption: 'Catedral de Lima, Historic Centre of Lima' },
        { src: img('Peru2.jpg'), caption: 'Dune buggy at the Huacachina oasis, Ica' },
      ],
      stopMap: { src: img('PeruMap.png'), note: 'route and places visited' },
      costSummary: {
        rows: [
          { label: 'Transport to / from', value: '$1,000.00' },
          { label: 'Local transport', value: '$102.00' },
          { label: 'Lodging', value: '$165.00' },
          { label: 'Activities', value: '$64.00' },
          { label: 'Food', value: '$70.00' },
        ],
        total: { label: 'Stop total', value: '$1,401.00' },
      },
    },
    // ===== STOP 4: Morocco =====
    {
      stopNumber: 4,
      country: 'Morocco',
      coords: [-6.84, 34.02], // Rabat
      region: 'MENA',
      datesOfVisit: 'June 16, 2026',
      capital: 'Rabat',
      otherPlace: 'Marrakech',
      aphug: {
        language: 'Arabic (UN language)',
        religion: 'Sunni Muslim (majority), with Christian, Jewish, and Bahai minorities',
        dtmStage: 'Stage 3 (low death rates, falling birth rates)',
        netMigration: 'Net OUT (negative since 1960)',
        cityType: 'Forward capital',
        culturalSite: 'Hassan Tower and Mausoleum of Mohammed V (Rabat)',
        agriculture: 'N/A',
        factory: 'N/A',
        typicalHome: 'N/A',
        areasVisited: 'Rabat, Marrakech',
      },
      travel: {
        arrivingFrom: 'Lima, Peru',
        mode: 'Flight (Royal Air Maroc)',
        modeCost: '$1,560 ($780 x 2)',
        local: 'Trains between Casablanca, Rabat, and Marrakech; city taxis',
        localCost: '$124',
      },
      lodging: {
        place: 'Traditional riad guesthouse in the medina of Rabat',
        nights: '3',
        perNight: '$60',
        total: '$180',
      },
      activities: [
        { text: 'Hassan Tower and Mausoleum of Mohammed V (Rabat)', cost: 'Free' },
        { text: 'Majorelle Garden (Jardin Majorelle), Marrakech', cost: '$24' },
        { text: 'Saadian Tombs, Marrakech', cost: '$4' },
      ],
      food: {
        items: [
          { text: 'Lamb tagine with couscous at a medina restaurant', cost: '$18' },
          { text: 'Harira soup with dates and khobz bread', cost: '$5' },
          { text: 'Moroccan mint tea and msemen flatbread at a cafe', cost: '$4' },
        ],
        budget: '$60',
      },
      journal: [
        {
          author: 'Nicholas',
          text: `On June 16th, we arrived in Morocco at Casablanca,and took a train north to Rabat. We visited Hassan Tower, which was a 12th century minaret that would have been the world’s tallest when completed, but it wasn’t. We then took a train to Marrakech, through olive orchards, argan tree groves, and arid terrain. The Djemaa el-Fna square, a UNESCO cultural heritage site, had storytellers, musicians, snake charmers, and food stalls. We had lots of Harira soup and Moroccan mint tea. We would later depart to Ghana.`,
        },
        {
          author: 'Eisei',
          text: `During the trip to Morocco, on the first day, we saw the Hassan Tower, which was free, and the food was very different from the previous countries we went to during the trip. On the second day, we went to the Majorelle Gardens which was $12. But in the garden were exotic plants. On the last day, we went to the Saadian Tombs in Marrakech. And in the Saadian Tombs, we saw arches like on the Hassan Tower.`,
        },
      ],
      photos: [
        { src: img('Morocco1.jpg'), caption: 'Mausoleum of Mohammed V, Rabat' },
        { src: img('Morocco2.JPG'), caption: 'Jardin Majorelle, Marrakech' },
      ],
      stopMap: { src: img('MoroccoMap.png'), note: 'route and places visited' },
      costSummary: {
        rows: [
          { label: 'Transport to / from', value: '$1,560.00' },
          { label: 'Local transport', value: '$124.00' },
          { label: 'Lodging', value: '$180.00' },
          { label: 'Activities', value: '$28.00' },
          { label: 'Food', value: '$60.00' },
        ],
        total: { label: 'Stop total', value: '$1,952.00' },
      },
    },
    // ===== STOP 5: Ghana =====
    {
      stopNumber: 5,
      country: 'Ghana',
      coords: [-0.19, 5.56], // Accra
      region: 'Sub-Saharan Africa',
      datesOfVisit: 'June 19, 2026',
      capital: 'Accra',
      otherPlace: 'Cape Coast',
      aphug: {
        language: 'English (UN language)',
        religion: 'Christianity (majority), Muslim, indigenous',
        dtmStage: 'Stage 2 (death rates falling, birth rates still high)',
        netMigration: 'Neither (oscillates between positive and negative)',
        cityType: 'Primate city',
        culturalSite: 'Cape Coast Castle',
        agriculture: 'N/A',
        factory: 'N/A',
        typicalHome: 'N/A',
        areasVisited: 'Accra, Cape Coast',
      },
      travel: {
        arrivingFrom: 'Casablanca, Morocco',
        mode: 'Flight (Royal Air Maroc, direct)',
        modeCost: '$760 ($380 x 2)',
        local: 'Tro-tro (shared minibus) between Accra and Cape Coast; Uber and taxi in Accra',
        localCost: '$60',
      },
      lodging: {
        place: 'Nanas Holiday Let Guest House',
        nights: '3',
        perNight: '$45',
        total: '$135',
      },
      activities: [
        { text: 'Cape Coast Castle guided tour (UNESCO)', cost: '$30' },
        { text: 'Kakum National Park canopy walkway', cost: '$40' },
        { text: 'Kwame Nkrumah Mausoleum and Museum, Accra', cost: '$10' },
      ],
      food: {
        items: [
          { text: 'Jollof rice with grilled tilapia at a local chop bar', cost: '$10' },
          { text: 'Kelewele (spiced fried plantain) from a street vendor', cost: '$3' },
          { text: 'Groundnut (peanut) soup with fufu', cost: '$8' },
        ],
        budget: '$50',
      },
      journal: [
        {
          author: 'Nicholas',
          text: `We flew to Accra from Casablanca on June 19th. Accra is a huge city, way larger than any other city in Ghana. There seems to be a lot of informal settlements on the edge, emphasizing how it’s on stage 2 of the DTM. We took a tro-tro to Cape Coast, where we then went to Cape Coast Castle. It was a very interesting tour, showing many historical events and forced migration. The Kakum National Park canopy walk was very cool, we could see a vast forest. On June 21st, we would visit the Kwame Nkrumah Mausoleum, an important site to Ghanaian cultural identity. We would then depart to India.`,
        },
        {
          author: 'Eisei',
          text: `On our first day, we went to Cape Coast Castle guided tour which cost $15 per person, in which we saw dungeons where enslaved people were held in. On the second day, we went to Kakum National Park where we went on a canopy walkway from which we could see how deep the forest was. On the last day, we went to the Kwame Nkrumah Mausoleum and Museum, which was delicate to the first president of Ghana, Dr. Kwame Nkrumah.`,
        },
      ],
      photos: [
        { src: img('Ghana1.jpg'), caption: 'Cape Coast Castle' },
        { src: img('Ghana2.jpg'), caption: 'Kakum National Park canopy walkway' },
      ],
      stopMap: { src: img('GhanaMap.png'), note: 'route and places visited' },
      costSummary: {
        rows: [
          { label: 'Transport to / from', value: '$760.00' },
          { label: 'Local transport', value: '$60.00' },
          { label: 'Lodging', value: '$135.00' },
          { label: 'Activities', value: '$80.00' },
          { label: 'Food', value: '$50.00' },
        ],
        total: { label: 'Stop total', value: '$1,085.00' },
      },
    },
    // ===== STOP 6: India =====
    {
      stopNumber: 6,
      country: 'India',
      coords: [77.21, 28.61], // New Delhi
      region: 'Asia',
      datesOfVisit: 'June 22, 2026',
      capital: 'New Delhi',
      otherPlace: 'Agra',
      aphug: {
        language: 'Hindi',
        religion: 'Hinduism (majority), Islam, Christianity',
        dtmStage: 'Stage 3 (low death rates, rapidly falling birth rates)',
        netMigration: 'Net OUT (negative since 1990)',
        cityType: 'Forward capital',
        culturalSite: 'Taj Mahal, Agra',
        agriculture: 'N/A',
        factory: 'N/A',
        typicalHome: 'N/A',
        areasVisited: 'New Delhi, Agra',
      },
      travel: {
        arrivingFrom: 'Accra, Ghana',
        mode: 'Flight (Ethiopian Airlines via Addis Ababa)',
        modeCost: '$1,160 ($580 x 2)',
        local: 'Delhi Metro; Gatimaan Express train between Delhi and Agra; auto-rickshaw in Delhi',
        localCost: '$110',
      },
      lodging: {
        place: 'Hotel Palace Heights',
        nights: '3',
        perNight: '$40',
        total: '$120',
      },
      activities: [
        { text: 'Taj Mahal, Agra', cost: '$26' },
        { text: 'Red Fort (Lal Qila), Delhi (UNESCO)', cost: '$15' },
        { text: 'Jama Masjid, Delhi (exterior and courtyard)', cost: '$3' },
      ],
      food: {
        items: [
          { text: 'Butter chicken and garlic naan at a local dhaba', cost: '$10' },
          { text: 'Chaat street snacks at Chandni Chowk market', cost: '$4' },
          { text: 'Masala chai and samosas at a chai stall', cost: '$3' },
        ],
        budget: '$50',
      },
      journal: [
        {
          author: 'Nicholas',
          text: `We arrived in Delhi on June 22nd.  It's a huge city, yet it’s not a primate city due to India having many competing cities. There are wide ceremonial boulevards, and formal government buildings arranged throughout the city. We took the Gatimaan Express to Agra, and went to the Taj Mahal. The Taj Mahal is a Mughal-Islamic mausoleum in a nation that is 80% Hindu, which shows sequent occupance. We would then go to the Red Fort and Jama Masjid in Old Delhi. We would finally depart for Japan, our final stop., on June 24th.`,
        },
        {
          author: 'Eisei',
          text: `On the first day, we went to the Taj Mahal which has a very unique architecture. On the second day, we went to the Red Fort which shared some architectural traits from the Taj Mahal which we went to yesterday. And for the third day, we went to Jama Masjid which also had a similar architecture to the two previous stops. This is because they were all commissioned by the Mughal Emperor Shah Jahan during the golden age of Mughal architecture. And in the streets of India, we saw religious geography everywhere during the time we were there.`,
        },
      ],
      photos: [
        { src: img('India1.jpg'), caption: 'Taj Mahal, Agra' },
        { src: img('India2.webp'), caption: 'Red Fort (Lal Qila), Delhi' },
      ],
      stopMap: { src: img('IndiaMap.png'), note: 'route and places visited' },
      costSummary: {
        rows: [
          { label: 'Transport to / from', value: '$1,160.00' },
          { label: 'Local transport', value: '$110.00' },
          { label: 'Lodging', value: '$120.00' },
          { label: 'Activities', value: '$44.00' },
          { label: 'Food', value: '$50.00' },
        ],
        total: { label: 'Stop total', value: '$1,484.00' },
      },
    },
    // ===== STOP 7: Japan =====
    {
      stopNumber: 7,
      country: 'Japan',
      coords: [139.69, 35.69], // Tokyo
      region: 'Asia',
      datesOfVisit: 'June 25, 2026',
      capital: 'Tokyo',
      otherPlace: 'Osaka, Kyoto',
      aphug: {
        language: 'Japanese',
        religion: 'Shinto and Buddhism (majority), Christianity',
        dtmStage: 'Stage 5 (birth rate has fallen below the death rate)',
        netMigration: 'Net IN (positive since the 1990s)',
        cityType: 'Primate city',
        culturalSite: 'Fushimi Inari Taisha Shrine, Kyoto',
        agriculture: 'N/A',
        factory: 'N/A',
        typicalHome: 'N/A',
        areasVisited: 'Tokyo, Kyoto, Osaka',
      },
      travel: {
        arrivingFrom: 'New Delhi, India',
        mode: 'Flight (Air India or Japan Airlines)',
        modeCost: '$2,600 (includes $1,500 return flight home)',
        local: 'Suica card in Tokyo; Shinkansen Tokyo to Kyoto; JR train Kyoto to Osaka; local subway and bus',
        localCost: '$370',
      },
      lodging: {
        place: 'Hotel Shinjuku, Tokyo (2 nights); Holiday Inn Express Osaka (1 night)',
        nights: '3 (2 Tokyo, 1 Osaka)',
        perNight: '$78 (average)',
        total: '$235',
      },
      activities: [
        { text: 'Senso-ji Temple, Asakusa (Tokyo)', cost: 'Free' },
        { text: 'Fushimi Inari Taisha Shrine, Kyoto', cost: 'Free' },
        { text: 'teamLab Planets digital art museum, Tokyo', cost: '$64' },
        { text: 'Osaka Castle museum', cost: '$10' },
      ],
      food: {
        items: [
          { text: 'Tonkotsu ramen at a local shop in Tokyo', cost: '$24' },
          { text: 'Kaiten-zushi (conveyor belt sushi)', cost: '$40' },
          { text: 'Takoyaki street food in Dotonbori, Osaka', cost: '$5' },
        ],
        budget: '$120',
      },
      journal: [
        {
          author: 'Nicholas',
          text: `We landed in Tokyo on the 25th, and this city was insanely packed. By far the largest metro area compared to any other one we’ve visited. We visited the Senso-ji Temple,  Asakusa, a historical Buddhist temple founded in 628 CE. We took the Shinkansen from Tokyo, through Nagoya, all the way to Kyoto, which was very fast at around 320 km/h. We hiked through Fushimi Inari, through tons of gates. On June 27th, we went on a train to Osaka, and visited the castle. We also ate some takoyaki, which tasted amazing. We will fly home on June 28th.`,
        },
        {
          author: 'Eisei',
          text: `On the first day, we had to go on the metro since the Senso-ji Temple was a bit far. The metro was filled completely with people in the morning. The Kaminarimon in front of Senso-ji was crowded by other tourists. On the second day, we went to teamLab which was a . Then we went on a Shinkansen, which was very similar to an airplane, to Kyoto, where we went to Fushimi Inari where there was an uphill before there and hills within the shrine. Then we went to Osaka Castle. Then we flew back on 6/28.`,
        },
      ],
      photos: [
        { src: img('Japan1.jpg'), caption: 'Senso-ji Temple, Asakusa, Tokyo' },
        { src: img('Japan2.jpg'), caption: 'Fushimi Inari Taisha Shrine, Kyoto' },
      ],
      stopMap: { src: img('JapanMap.png'), note: 'route and places visited' },
      costSummary: {
        rows: [
          { label: 'Transport to / from', value: '$2,600.00' },
          { label: 'Local transport', value: '$370.00' },
          { label: 'Lodging', value: '$235.00' },
          { label: 'Activities', value: '$74.00' },
          { label: 'Food', value: '$120.00' },
        ],
        total: { label: 'Stop total', value: '$3,399.00' },
      },
    },
  ],
};
