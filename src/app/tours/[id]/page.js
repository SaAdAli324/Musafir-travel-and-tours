import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./TourDetails.module.css";
import packagesData from "@/data/packages.json";
import policies from "@/data/policies.json";
import connectToDatabase from "@/lib/db";
import Package from "@/lib/models/Package";
import { getPlacesForPackage } from "../../../data/getPlacesForPackage";
import TourAccordionSections from "./TourAccordionSections";
import {
  IconMapPin,
  IconClock,
  IconCalendar,
  IconCheck,
  IconCross,
  IconShield,
  IconCar,
  IconPhone,
  IconWhatsApp,
  IconUtensils,
  IconSparkles,
  IconLuggage,
  IconFileText,
  IconCreditCard,
  IconUsers,
  IconCompass
} from "../../../components/Icons";
import ScrollReveal from "../../../components/ScrollReveal";

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const pkg = packagesData.find((p) => p.id === id);
  if (!pkg) return {};

  const destinations = pkg.attractions ? pkg.attractions.slice(0, 3).join(", ") : pkg.title;

  return {
    title: `${pkg.title} — ${pkg.duration.days} Days / ${pkg.duration.nights} Nights Tour Package`,
    description: `${pkg.tagline}. ${pkg.duration.days}-day ${pkg.type} from PKR ${pkg.pricing.solo.toLocaleString()}/person. Destinations: ${destinations}. Verified hotels, meals & transport included.`,
    alternates: {
      canonical: `/tours/${id}`
    },
    openGraph: {
      title: `${pkg.title} | Musafir Pakistan`,
      description: `${pkg.tagline}. Starting from PKR ${pkg.pricing.solo.toLocaleString()}/person.`,
      url: `/tours/${id}`,
      images: [{ url: pkg.poster || pkg.image, width: 1200, height: 630, alt: `${pkg.title} tour package` }]
    }
  };
}

function TourJsonLd({ pkg }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: pkg.title,
    description: pkg.tagline,
    touristType: pkg.type,
    itinerary: {
      "@type": "ItemList",
      numberOfItems: pkg.routePlan?.length || pkg.duration?.days || 0,
      itemListElement: (pkg.routePlan || []).map((day, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: day.title,
        description: day.description
      }))
    },
    offers: {
      "@type": "AggregateOffer",
      lowPrice: pkg.pricing.solo,
      highPrice: pkg.pricing.couple,
      priceCurrency: "PKR",
      availability: "https://schema.org/InStock"
    },
    provider: {
      "@type": "TravelAgency",
      name: "Musafir Pakistan Tours & Travels",
      url: "https://musafirpakistan.com"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function TourDetailPage({ params }) {
  const { id } = await params;
  
  await connectToDatabase();
  const pkgData = await Package.findOne({ id }).lean();
  
  if (!pkgData) {
    notFound();
  }

  // Parse JSON data objects because Mongoose lean() returns MongoDB objects which might cause serialization issues,
  // or we can just stringify and parse.
  const pkg = JSON.parse(JSON.stringify(pkgData));

  if (!pkg) {
    notFound();
  }

  const places = getPlacesForPackage(pkg);
  const relatedTours = packagesData.filter((p) => p.id !== id).slice(0, 3);

  const whatsappMessage = encodeURIComponent(
    `Hello Musafir Pakistan! I would like to inquire/book the "${pkg.title}" (${pkg.duration.days} Days / ${pkg.duration.nights} Nights) package.`
  );
  const whatsappUrl = `https://wa.me/923366832018?text=${whatsappMessage}`;

  return (
    <>
      <TourJsonLd pkg={pkg} />
      <main className={styles.detailContainer}>
      {/* Redesigned Rich Tour Hero Showcase */}
      <ScrollReveal direction="left">
        <section className={styles.heroSection}>
          <div className={styles.heroImageContainer}>
            <Image
              src={pkg.image}
              alt={pkg.title}
              fill
              style={{ objectFit: "cover" }}
              priority
            />
            <div className={styles.heroOverlay} />
          </div>

          <div className={styles.heroContent}>
            <div className={styles.heroSplit}>
              {/* Left Column: Essential Trip Information */}
              <div className={styles.heroLeft}>
                <div className={styles.breadcrumbs}>
                  <Link href="/">Home</Link> <span>/</span>
                  <Link href="/tours/group">Tours</Link> <span>/</span>
                  <span className={styles.currentCrumb}>{pkg.title}</span>
                </div>

                <div className={styles.badgeRow}>
                  <span className={styles.categoryBadge}>{pkg.type}</span>
                  <span className={styles.durationBadge}>
                    <IconClock size={14} />
                    <span>{pkg.duration.days} Days / {pkg.duration.nights} Nights</span>
                  </span>
                  <span className={styles.verifiedBadge}>
                    <IconShield size={14} />
                    <span>Verified DTS Operator</span>
                  </span>
                </div>

                <h1 className={styles.tourTitle}>{pkg.title}</h1>
                <p className={styles.tourTagline}>{pkg.tagline}</p>

                {/* Fast Highlights Badges */}
                <div className={styles.heroPillGrid}>
                  <div className={styles.heroPill}>
                    <IconCalendar size={15} color="#4ade80" />
                    <span>{pkg.departure}</span>
                  </div>
                  <div className={styles.heroPill}>
                    <IconCar size={15} color="#4ade80" />
                    <span>AC Coaster / Grand Cabin</span>
                  </div>
                  <div className={styles.heroPill}>
                    <IconUtensils size={15} color="#4ade80" />
                    <span>Breakfast & Dinner Included</span>
                  </div>
                </div>

                {/* Price & Immediate Booking Trigger */}
                <div className={styles.heroPricingBar}>
                  <div className={styles.heroPriceBlock}>
                    <span className={styles.heroPriceLabel}>Solo / Per Person</span>
                    <span className={styles.heroPriceVal}>PKR {pkg.pricing.solo.toLocaleString()}</span>
                  </div>
                  <div className={styles.heroPriceDivider} />
                  <div className={styles.heroPriceBlock}>
                    <span className={styles.heroPriceLabel}>Couple Package</span>
                    <span className={styles.heroPriceVal}>PKR {pkg.pricing.couple.toLocaleString()}</span>
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.heroBookBtn}
                  >
                    <IconWhatsApp size={18} />
                    <span>Quick WhatsApp Booking</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Promotional Artwork / Poster Card */}
              <div className={styles.heroRight}>
                <div className={styles.heroPosterCard}>
                  <div className={styles.heroPosterImg}>
                    <Image
                      src={pkg.poster || pkg.image}
                      alt={`${pkg.title} Official Itinerary`}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 360px"
                      priority
                    />
                    <div className={styles.posterBadgeOverlay}>
                      <span>Official Package Flyer</span>
                    </div>
                  </div>
                  <div className={styles.heroPosterFooter}>
                    <span className={styles.heroPosterHint}>Verified Departures & Transparent Inclusions</span>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.posterChatBtn}
                    >
                      <IconSparkles size={14} />
                      <span>Inquire Package Details</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Main Content Layout */}
      <ScrollReveal direction="right">
        <div className={styles.contentGrid}>
          {/* Left Detailed Information Column */}
          <div className={styles.mainInfo}>
            {/* Researched Places & Attractions Experience Guide (Stays open & prominently featured) */}
            <section className={styles.sectionBlock}>
              <div className={styles.placesHeader}>
                <span className={styles.placesTag}>Destinations & Highlights</span>
                <h2 className={styles.sectionTitle}>
                  <span className={styles.titleIcon}>
                    <IconCompass size={24} color="var(--primary-color)" />
                  </span>
                  Places You Will Explore & Experience
                </h2>
                <p className={styles.placesIntro}>
                  Deeply researched insights, historical lore, altitude facts, and photography tips for the iconic locations visited throughout this tour.
                </p>
              </div>

              {/* Quick Attraction Chips */}
              {pkg.attractions && pkg.attractions.length > 0 && (
                <div className={styles.attractionChips} style={{ marginBottom: "2rem" }}>
                  {pkg.attractions.map((attraction, i) => (
                    <div key={i} className={styles.attractionChip}>
                      <IconMapPin size={14} color="#166534" />
                      <span>{attraction}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Rich Researched Destination Cards */}
              {places.length > 0 && (
                <div className={styles.placesGrid}>
                  {places.map((place) => (
                    <div key={place.name} className={styles.placeCard}>
                      <div className={styles.placeCardHeader}>
                        <div className={styles.placeCardTop}>
                          <h3 className={styles.placeName}>{place.name}</h3>
                          {place.badge && (
                            <span className={styles.placeBadge}>{place.badge}</span>
                          )}
                        </div>
                        <div className={styles.placeMetaRow}>
                          {place.altitude && (
                            <span className={styles.placeAltitude}>
                              ⛰️ {place.altitude}
                            </span>
                          )}
                          {place.region && (
                            <span className={styles.placeRegion}>
                              📍 {place.region}
                            </span>
                          )}
                        </div>
                        <p className={styles.placeTagline}>{place.tagline}</p>
                      </div>

                      <div className={styles.placeCardBody}>
                        <p className={styles.placeDescription}>{place.description}</p>

                        <div className={styles.placeInsightBlock}>
                          <div className={styles.insightItem}>
                            <span className={styles.insightLabel}>💡 Must Experience</span>
                            <p className={styles.insightText}>{place.experience}</p>
                          </div>

                          {place.photoTip && (
                            <div className={styles.insightItem}>
                              <span className={styles.insightLabel}>📸 Photography & Golden Hour</span>
                              <p className={styles.insightText}>{place.photoTip}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>

            {/* Collapsible Logistics Accordions (All details in dropdowns to avoid confusion) */}
            <TourAccordionSections pkg={pkg} policies={policies} />
          </div>

          {/* Right Sticky Booking Box */}
          <aside className={styles.sidebar}>
            <div className={styles.bookingCard}>
              <div className={styles.bookingCardHeader}>
                <div className={styles.priceLabel}>Starting Fare</div>
                <div className={styles.priceValue}>
                  PKR {pkg.pricing.solo.toLocaleString()}
                  <span className={styles.priceSub}> / person</span>
                </div>
                <div className={styles.couplePrice}>
                  Couple Rate: <strong>PKR {pkg.pricing.couple.toLocaleString()}</strong>
                </div>
              </div>

              <div className={styles.bookingSummaryList}>
                <div className={styles.summaryRow}>
                  <span>Duration</span>
                  <strong>{pkg.duration.days} Days / {pkg.duration.nights} Nights</strong>
                </div>
                <div className={styles.summaryRow}>
                  <span>Category</span>
                  <strong>{pkg.type}</strong>
                </div>
                <div className={styles.summaryRow}>
                  <span>Group Makeup</span>
                  <strong>Families / Couples / Bachelors</strong>
                </div>
                <div className={styles.summaryRow}>
                  <span>Departures</span>
                  <strong>Karachi / Islamabad</strong>
                </div>
              </div>

              <div className={styles.bookingCtaWrapper}>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.primaryWhatsappBtn}
                >
                  <IconWhatsApp size={20} />
                  <span>Reserve via WhatsApp</span>
                </a>
                <Link href="/contact" className={styles.secondaryInquireBtn}>
                  Request Custom Quotation
                </Link>
              </div>

              <div className={styles.trustBadges}>
                <div className={styles.trustItem}>
                  <span className={styles.trustIcon}><IconShield size={16} color="var(--primary-color)" /></span>
                  <span>Verified Hotel Accommodations</span>
                </div>
                <div className={styles.trustItem}>
                  <span className={styles.trustIcon}><IconCar size={16} color="var(--primary-color)" /></span>
                  <span>Dedicated Mountain Fleet</span>
                </div>
                <div className={styles.trustItem}>
                  <span className={styles.trustIcon}><IconPhone size={16} color="var(--primary-color)" /></span>
                  <span>24/7 Ground Coordinator</span>
                </div>
              </div>

              <div className={styles.phoneDirect}>
                <span>Direct Inquiries</span>
                <a href="tel:+923366832018">+92-336-683-2018</a>
              </div>
            </div>
          </aside>
        </div>
      </ScrollReveal>

      {/* Recommended / Related Tours */}
      {relatedTours.length > 0 && (
        <ScrollReveal direction="left">
          <section className={styles.relatedSection}>
            <div className={styles.relatedHeader}>
              <h2>Alternative Itineraries</h2>
              <p>Explore more destinations across Pakistan</p>
            </div>
            <div className={styles.relatedGrid}>
              {relatedTours.map((t) => (
                <Link key={t.id} href={`/tours/${t.id}`} className={styles.relatedCard}>
                  <div className={styles.relatedImageWrapper}>
                    <Image
                      src={t.poster || t.image}
                      alt={t.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div className={styles.relatedBadge}>{t.type}</div>
                  </div>
                  <div className={styles.relatedInfo}>
                    <h3>{t.title}</h3>
                    <p>{t.duration.days} Days • From PKR {t.pricing.solo.toLocaleString()}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </ScrollReveal>
      )}
    </main>
    </>
  );
}
