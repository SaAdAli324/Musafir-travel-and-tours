export const metadata = {
  title: "Verified Partner Hotels — Skardu & Hunza Valley",
  description:
    "Book directly at Musafir Pakistan's verified partner hotels in Skardu and Hunza. Pre-inspected rooms with 24/7 hot water, heating, and backup generators. No markup — direct partner rates.",
  alternates: {
    canonical: "/services/hotels"
  },
  openGraph: {
    title: "Verified Partner Hotels in Skardu & Hunza | Musafir Pakistan",
    description:
      "Pre-inspected hotels with direct partner rates. No commission. Verified heating, hot water & generator backup.",
    url: "/services/hotels",
    images: [{ url: "/images/skardu.jpg", width: 1200, height: 630, alt: "Verified partner hotels in Skardu and Hunza" }]
  }
};

export default function HotelsLayout({ children }) {
  return children;
}
