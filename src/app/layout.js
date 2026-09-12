import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const SITE_URL = "https://musafirpakistan.com";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Musafir Pakistan — Northern Tours, Hotels & Transport | Licensed Operator",
    template: "%s | Musafir Pakistan"
  },
  description:
    "Licensed DTS tour operator offering weekly group departures to Hunza, Skardu, Swat & Kashmir from Karachi & Islamabad. Private 4x4 Prado honeymoon tours, verified hotel stays, and executive mountain transport.",
  keywords: [
    "Pakistan tours",
    "northern Pakistan travel",
    "Hunza Valley tour",
    "Skardu tour package",
    "Swat Valley trip",
    "Kashmir tour",
    "group tours Pakistan",
    "honeymoon tour Pakistan",
    "private tour Pakistan",
    "Musafir Pakistan",
    "travel agency Pakistan",
    "Karachi to Hunza",
    "Islamabad tours",
    "4x4 Prado tour",
    "northern areas Pakistan",
    "Naran Kaghan tour",
    "Fairy Meadows trip",
    "Deosai tour",
    "DTS licensed operator"
  ],
  authors: [{ name: "Musafir Pakistan Tours & Travels" }],
  creator: "Musafir Pakistan",
  publisher: "Musafir Pakistan Tours & Travels",
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: SITE_URL,
    siteName: "Musafir Pakistan",
    title: "Musafir Pakistan — Northern Tours, Hotels & Transport",
    description:
      "Licensed DTS tour operator. Weekly group departures to Hunza, Skardu, Swat & Kashmir. Private honeymoon tours, verified hotels, executive 4x4 transport.",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Musafir Pakistan — Northern Pakistan Tour Operator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Musafir Pakistan — Northern Tours, Hotels & Transport",
    description:
      "Licensed DTS tour operator. Weekly group departures to Hunza, Skardu, Swat & Kashmir.",
    images: ["/images/hero.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  alternates: {
    canonical: SITE_URL
  }
};

// JSON-LD Organization structured data
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Musafir Pakistan Tours & Travels",
  alternateName: "Musafir Pakistan",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  description:
    "Licensed DTS tour operator offering weekly group departures, private honeymoon tours, verified hotel bookings, and executive mountain transport across Northern Pakistan.",
  telephone: "+92-336-683-2018",
  email: "info@musafirpakistan.com",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "Office # M-7, Mezzanine Floor, Falaknaz Heights, Shahrah-e-Faisal",
      addressLocality: "Karachi",
      addressRegion: "Sindh",
      addressCountry: "PK"
    },
    {
      "@type": "PostalAddress",
      streetAddress: "Abrar Plaza, Plot# 09, IJP Road, New Katarian Satellite Town",
      addressLocality: "Islamabad",
      addressRegion: "Islamabad Capital Territory",
      addressCountry: "PK"
    }
  ],
  sameAs: [
    "https://wa.me/923366832018"
  ],
  areaServed: {
    "@type": "Country",
    name: "Pakistan"
  },
  priceRange: "PKR 20,000 - PKR 150,000",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "1200",
    bestRating: "5"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={inter.className}>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
