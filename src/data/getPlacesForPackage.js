import placesData from "./placesData.json";

const packageToPlaces = {
  "swat-kalam-5-days": ["kalam-valley", "mahodand-lake", "malam-jabba", "ushu-forest"],
  "naran-babusar-5-days": ["lake-saif-ul-mulook", "babusar-top"],
  "shogran-siripaye-4-days": ["siri-paye"],
  "kashmir-arangkel-5-days": ["arang-kel", "sharda-peeth"],
  "kashmir-taobut-6-days": ["taobut", "arang-kel", "sharda-peeth"],
  "kumrat-valley-5-days": ["kumrat-forest"],
  "hunza-china-border-7-days": ["karimabad", "attabad-lake", "passu-cones", "hussaini-bridge", "khunjerab-pass"],
  "skardu-bashu-8-days": ["shangrila-resort", "cold-desert-katpana", "manthoka-waterfall", "shigar-fort", "bashu-valley"],
  "swat-kashmir-8-days": ["kalam-valley", "mahodand-lake", "malam-jabba", "arang-kel", "sharda-peeth"],
  "skardu-hunza-10-days": ["shangrila-resort", "cold-desert-katpana", "manthoka-waterfall", "attabad-lake", "passu-cones", "khunjerab-pass"],
  "skardu-honeymoon-private": ["shangrila-resort", "upper-kachura-lake", "cold-desert-katpana", "shigar-fort", "manthoka-waterfall"]
};

export function getPlacesForPackage(pkg) {
  if (!pkg) return [];
  
  const keys = packageToPlaces[pkg.id] || [];
  const matched = [];

  for (const key of keys) {
    if (placesData[key]) {
      matched.push({ key, ...placesData[key] });
    }
  }

  // Fallback if no explicit keys: match by name/attractions
  if (matched.length === 0 && pkg.attractions) {
    for (const [key, place] of Object.entries(placesData)) {
      const match = pkg.attractions.some((a) =>
        place.name.toLowerCase().includes(a.toLowerCase()) ||
        a.toLowerCase().includes(place.name.toLowerCase())
      );
      if (match) {
        matched.push({ key, ...place });
      }
    }
  }

  return matched;
}
