import packages from "@/data/packages.json";
import hotels from "@/data/hotels.json";

const SITE_URL = "https://musafirpakistan.com";

export default function sitemap() {
  const staticPages = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0
    },
    {
      url: `${SITE_URL}/tours/group`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9
    },
    {
      url: `${SITE_URL}/tours/private`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${SITE_URL}/destinations`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8
    },
    {
      url: `${SITE_URL}/services/hotels`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: `${SITE_URL}/services/transport`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6
    },
    {
      url: `${SITE_URL}/services/tickets`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5
    },
    {
      url: `${SITE_URL}/gallery`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5
    },
    {
      url: `${SITE_URL}/gallery/photos`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5
    },
    {
      url: `${SITE_URL}/gallery/reviews`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6
    },
    {
      url: `${SITE_URL}/custom-trip`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7
    },
    {
      url: `${SITE_URL}/policies`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3
    }
  ];

  // Dynamic tour detail pages
  const tourPages = packages.map((pkg) => ({
    url: `${SITE_URL}/tours/${pkg.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8
  }));

  // Dynamic hotel detail pages
  const hotelPages = hotels.map((hotel) => ({
    url: `${SITE_URL}/services/hotels/${hotel.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6
  }));

  return [...staticPages, ...tourPages, ...hotelPages];
}
