export const metadata = {
  title: "Private & Honeymoon Tours — Luxury 4x4 Prado Expeditions",
  description:
    "Bespoke private tours and romantic honeymoon escapes across Northern Pakistan. Dedicated Toyota Prado 4x4, handpicked luxury hotels, personalized itineraries to Hunza, Skardu, Swat, Fairy Meadows & Neelum Valley.",
  alternates: {
    canonical: "/tours/private"
  },
  openGraph: {
    title: "Private & Honeymoon Tours Pakistan | Musafir Pakistan",
    description:
      "Luxury 4x4 Prado expeditions with personalized itineraries. Private honeymoon tours to Hunza, Skardu & Fairy Meadows.",
    url: "/tours/private",
    images: [{ url: "/images/hunza.jpg", width: 1200, height: 630, alt: "Private honeymoon tour in Hunza Valley" }]
  }
};

export default function PrivateToursLayout({ children }) {
  return children;
}
