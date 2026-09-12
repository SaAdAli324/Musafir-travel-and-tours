export const metadata = {
  title: "Tour Photo Gallery & Client Reviews",
  description:
    "Browse real tour photographs and verified client testimonials from Musafir Pakistan's group expeditions and private tours across Hunza, Skardu, Swat, Naran & Azad Kashmir.",
  alternates: {
    canonical: "/gallery"
  },
  openGraph: {
    title: "Gallery & Reviews | Musafir Pakistan",
    description: "Real tour photos and verified traveler reviews from Northern Pakistan expeditions.",
    url: "/gallery"
  }
};

export default function GalleryLayout({ children }) {
  return children;
}
