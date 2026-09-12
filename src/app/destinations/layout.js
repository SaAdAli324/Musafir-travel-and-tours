export const metadata = {
  title: "Travel Destinations — Hunza, Skardu, Swat, Kashmir & More",
  description:
    "Explore Pakistan's most iconic travel destinations. Browse seasonal road guides, attractions, and tour packages for Hunza Valley, Skardu, Swat, Naran Kaghan, Azad Kashmir, Fairy Meadows, Deosai & Kumrat Valley.",
  alternates: {
    canonical: "/destinations"
  },
  openGraph: {
    title: "Northern Pakistan Travel Destinations | Musafir Pakistan",
    description:
      "Explore Hunza, Skardu, Swat, Kashmir & more. Seasonal guides, top attractions, and verified tour packages.",
    url: "/destinations",
    images: [{ url: "/images/skardu.jpg", width: 1200, height: 630, alt: "Travel destinations in Northern Pakistan" }]
  }
};

export default function DestinationsLayout({ children }) {
  return children;
}
