import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./HotelDetails.module.css";
import hotels from "../../../../data/hotels.json";
import HotelGallery from "./HotelGallery";
import {
  IconMapPin,
  IconStar,
  IconCheck,
  IconShield,
  IconWhatsApp,
  IconPhone,
  IconHotel,
  IconUsers,
  IconCalendar,
  IconClock,
  IconArrowLeft,
  IconArrowRight
} from "../../../../components/Icons";
import ScrollReveal from "../../../../components/ScrollReveal";

export function generateStaticParams() {
  return hotels.map((h) => ({
    id: h.id
  }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const hotel = hotels.find((h) => h.id === id);
  if (!hotel) return {};

  return {
    title: `${hotel.name} — ${hotel.destination} Valley | Verified Partner Hotel`,
    description: `${hotel.description?.slice(0, 155) || `Book ${hotel.name} in ${hotel.location}. ${hotel.category} hotel with direct partner rates from PKR ${hotel.pricePerNight.toLocaleString()}/night.`}`,
    alternates: {
      canonical: `/services/hotels/${id}`
    },
    openGraph: {
      title: `${hotel.name} | Musafir Pakistan Hotels`,
      description: `${hotel.category} in ${hotel.destination}. From PKR ${hotel.pricePerNight.toLocaleString()}/night. Verified by Musafir Pakistan.`,
      url: `/services/hotels/${id}`,
      images: [{ url: hotel.image, width: 1200, height: 630, alt: `${hotel.name} — ${hotel.destination}` }]
    }
  };
}

function HotelJsonLd({ hotel }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hotel",
    name: hotel.name,
    description: hotel.description,
    image: hotel.image,
    address: {
      "@type": "PostalAddress",
      streetAddress: hotel.locationDetails?.address || hotel.location,
      addressLocality: hotel.destination,
      addressCountry: "PK"
    },
    starRating: {
      "@type": "Rating",
      ratingValue: hotel.rating
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: hotel.rating,
      reviewCount: hotel.reviewCount || 100,
      bestRating: "5"
    },
    priceRange: `PKR ${hotel.pricePerNight.toLocaleString()} / night`,
    amenityFeature: hotel.amenities?.map((a) => ({
      "@type": "LocationFeatureSpecification",
      name: a,
      value: true
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default async function HotelDetailPage({ params }) {
  const { id } = await params;
  const hotel = hotels.find((h) => h.id === id);

  if (!hotel) {
    notFound();
  }

  const relatedHotels = hotels.filter((h) => h.id !== id).slice(0, 3);

  const defaultWaMsg = encodeURIComponent(
    `Hello Musafir Pakistan! I would like to inquire/reserve a room at "${hotel.name}" in ${hotel.location}. Please share availability and current rates.`
  );
  const defaultWaUrl = `https://wa.me/923366832018?text=${defaultWaMsg}`;

  return (
    <>
      <HotelJsonLd hotel={hotel} />
      <main className={styles.pageContainer}>
      {/* Top Breadcrumb Navigation */}
      <div className={styles.breadcrumbBar}>
        <div className={styles.breadcrumbContent}>
          <Link href="/" className={styles.breadcrumbLink}>Home</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <Link href="/services/hotels" className={styles.breadcrumbLink}>Partner Hotels</Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>{hotel.name}</span>
        </div>
      </div>

      {/* Property Hero Header */}
      <ScrollReveal direction="left">
        <section className={styles.propertyHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.badgeRow}>
              <span className={styles.categoryBadge}>{hotel.category}</span>
              <span className={styles.destinationBadge}>{hotel.destination} Valley</span>
              <span className={styles.ratingBadge}>
                <IconStar size={13} fill="#f59e0b" color="#f59e0b" />
                <span>{hotel.rating}</span>
                <span className={styles.reviewCount}>({hotel.reviewCount || 100}+ Reviews)</span>
              </span>
            </div>

            <h1 className={styles.hotelTitle}>{hotel.name}</h1>

            <div className={styles.locationRow}>
              <IconMapPin size={16} color="#16a34a" />
              <span>{hotel.locationDetails?.address || hotel.location}</span>
            </div>
          </div>

          <div className={styles.headerRight}>
            <div className={styles.pricePill}>
              <span className={styles.pricePillLabel}>Starting From</span>
              <span className={styles.pricePillAmount}>
                PKR {hotel.pricePerNight.toLocaleString()}
                <small>/ night</small>
              </span>
            </div>
            <a
              href={defaultWaUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.quickReserveBtn}
            >
              <IconWhatsApp size={16} />
              <span>Reserve Room</span>
            </a>
          </div>
        </section>
      </ScrollReveal>

      {/* Multi-Photo Interactive Gallery */}
      <section className={styles.gallerySection}>
        <HotelGallery gallery={hotel.gallery} hotelName={hotel.name} />
      </section>

      {/* Key Highlights Ribbon */}
      {hotel.highlights && (
        <section className={styles.highlightsRibbon}>
          {hotel.highlights.map((highlight, idx) => (
            <div key={idx} className={styles.highlightItem}>
              <div className={styles.highlightIcon}>
                <IconCheck size={14} color="#16a34a" />
              </div>
              <span>{highlight}</span>
            </div>
          ))}
        </section>
      )}

      {/* Main Two-Column Layout */}
      <ScrollReveal direction="right">
        <div className={styles.contentLayout}>
          {/* Left Column: Details, Rooms, Amenities, Checklist */}
          <div className={styles.leftCol}>
            {/* About Hotel */}
            <section className={styles.detailCard}>
              <h2 className={styles.cardHeading}>About The Property</h2>
              <p className={styles.cardText}>{hotel.description}</p>
            </section>

            {/* Available Room Tiers */}
            {hotel.roomTypes && hotel.roomTypes.length > 0 && (
              <section className={styles.detailCard}>
                <div className={styles.cardHeadingRow}>
                  <h2 className={styles.cardHeading}>Available Room Tiers & Rates</h2>
                  <span className={styles.headingBadge}>Direct Partner Rates</span>
                </div>
                <div className={styles.roomsGrid}>
                  {hotel.roomTypes.map((room) => {
                    const roomWaMsg = encodeURIComponent(
                      `Hello Musafir Pakistan! I want to book the "${room.name}" at "${hotel.name}" (Rate: PKR ${room.price.toLocaleString()} / night).`
                    );
                    const roomWaUrl = `https://wa.me/923366832018?text=${roomWaMsg}`;

                    return (
                      <div key={room.id} className={styles.roomCard}>
                        <div className={styles.roomHeader}>
                          <h3 className={styles.roomName}>{room.name}</h3>
                          <div className={styles.roomSpecs}>
                            <span className={styles.roomSpecItem}>
                              <IconHotel size={13} color="#64748b" />
                              <span>{room.bed}</span>
                            </span>
                            <span className={styles.roomSpecItem}>
                              <IconUsers size={13} color="#64748b" />
                              <span>{room.capacity}</span>
                            </span>
                          </div>
                        </div>

                        <div className={styles.roomFeatures}>
                          {room.features.map((feat, idx) => (
                            <span key={idx} className={styles.roomFeatChip}>
                              <IconCheck size={12} color="#16a34a" />
                              <span>{feat}</span>
                            </span>
                          ))}
                        </div>

                        <div className={styles.roomFooter}>
                          <div className={styles.roomPriceBlock}>
                            <span className={styles.roomPriceLabel}>Nightly Rate</span>
                            <span className={styles.roomPriceVal}>
                              PKR {room.price.toLocaleString()}
                              <small>/ night</small>
                            </span>
                          </div>
                          <a
                            href={roomWaUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.roomBookBtn}
                          >
                            <IconWhatsApp size={14} />
                            <span>Reserve This Room</span>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Verified Hotel Amenities */}
            <section className={styles.detailCard}>
              <h2 className={styles.cardHeading}>Property Amenities & Facilities</h2>
              <div className={styles.amenitiesGrid}>
                {hotel.amenities.map((amenity, idx) => (
                  <div key={idx} className={styles.amenityItem}>
                    <div className={styles.amenityCheck}>
                      <IconCheck size={14} color="#15803d" />
                    </div>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Musafir Pakistan Quality Verification */}
            <section className={`${styles.detailCard} ${styles.verificationCard}`}>
              <div className={styles.verifyHeader}>
                <IconShield size={24} color="#16a34a" />
                <div>
                  <h3 className={styles.verifyTitle}>Musafir Verified Hotel Standards</h3>
                  <p className={styles.verifySubtitle}>
                    Every room is pre-inspected by Musafir Pakistan’s local station team before guest check-in.
                  </p>
                </div>
              </div>
              <div className={styles.verifyGrid}>
                <div className={styles.verifyItem}>
                  <strong>Continuous Hot Water</strong>
                  <span>Tested boilers & heating units ensure uninterrupted warm showers.</span>
                </div>
                <div className={styles.verifyItem}>
                  <strong>Thermal Heating</strong>
                  <span>Essential electric/gas heating prepared for cold mountain nights.</span>
                </div>
                <div className={styles.verifyItem}>
                  <strong>Power Generator</strong>
                  <span>Guaranteed backup power generator operational during valley load shedding.</span>
                </div>
                <div className={styles.verifyItem}>
                  <strong>Sanitized Linen</strong>
                  <span>Freshly laundered linens and sterilized bathroom standards.</span>
                </div>
              </div>
            </section>

            {/* Location & Nearby Landmarks */}
            {hotel.locationDetails && (
              <section className={styles.detailCard}>
                <h2 className={styles.cardHeading}>Location & Nearby Landmarks</h2>
                <div className={styles.locationDetailWrapper}>
                  <div className={styles.exactAddress}>
                    <IconMapPin size={18} color="#16a34a" />
                    <span>{hotel.locationDetails.address}</span>
                  </div>
                  {hotel.locationDetails.nearby && (
                    <div className={styles.nearbyList}>
                      {hotel.locationDetails.nearby.map((place, idx) => (
                        <div key={idx} className={styles.nearbyChip}>
                          <IconClock size={13} color="#64748b" />
                          <span>{place}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            )}

            {/* Policies & Rules */}
            {hotel.policies && (
              <section className={styles.detailCard}>
                <h2 className={styles.cardHeading}>Check-In & House Rules</h2>
                <div className={styles.policiesGrid}>
                  <div className={styles.policyRow}>
                    <span className={styles.policyLabel}>Check-In Time:</span>
                    <span className={styles.policyVal}>{hotel.policies.checkIn}</span>
                  </div>
                  <div className={styles.policyRow}>
                    <span className={styles.policyLabel}>Check-Out Time:</span>
                    <span className={styles.policyVal}>{hotel.policies.checkOut}</span>
                  </div>
                  <div className={styles.policyRow}>
                    <span className={styles.policyLabel}>Cancellation:</span>
                    <span className={styles.policyVal}>{hotel.policies.cancellation}</span>
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sticky Booking & Support Sidebar */}
          <aside className={styles.rightCol}>
            <div className={styles.stickySidebar}>
              <div className={styles.inquiryCard}>
                <div className={styles.inquiryHeader}>
                  <div className={styles.priceWrap}>
                    <span className={styles.sidebarPriceLabel}>Rates starting from</span>
                    <span className={styles.sidebarPrice}>
                      PKR {hotel.pricePerNight.toLocaleString()}
                      <small> / night</small>
                    </span>
                  </div>
                  <span className={styles.verifiedStamp}>
                    <IconShield size={12} color="#16a34a" /> Verified
                  </span>
                </div>

                <div className={styles.quickHighlights}>
                  <div className={styles.quickHItem}>
                    <IconCheck size={14} color="#16a34a" />
                    <span>Free Breakfast Included</span>
                  </div>
                  <div className={styles.quickHItem}>
                    <IconCheck size={14} color="#16a34a" />
                    <span>24/7 Hot Showers & Heating</span>
                  </div>
                  <div className={styles.quickHItem}>
                    <IconCheck size={14} color="#16a34a" />
                    <span>No Musafir Commission / Markup</span>
                  </div>
                </div>

                <div className={styles.actionBlock}>
                  <a
                    href={defaultWaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.sidebarWhatsAppBtn}
                  >
                    <IconWhatsApp size={18} />
                    <span>Book via WhatsApp</span>
                  </a>

                  <a href="tel:+923366832018" className={styles.sidebarCallBtn}>
                    <IconPhone size={16} />
                    <span>Call +92 336 6832018</span>
                  </a>
                </div>

                <div className={styles.supportNote}>
                  <p>
                    Need a customized multi-room reservation or bundled 4x4 transport? Our reservation team is available 24/7.
                  </p>
                </div>
              </div>

              {/* Direct Assistance Card */}
              <div className={styles.needHelpCard}>
                <h4>Planning a Group or Family Stay?</h4>
                <p>We arrange private transport and hotel packages across Northern Pakistan.</p>
                <Link href="/custom-trip" className={styles.customTripLink}>
                  <span>Request Custom Package</span>
                  <IconArrowRight size={14} />
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </ScrollReveal>

      {/* Related Partner Hotels */}
      {relatedHotels.length > 0 && (
        <ScrollReveal direction="left">
          <section className={styles.relatedSection}>
            <div className={styles.relatedHeader}>
              <div>
                <span className={styles.relatedTag}>Explore More Properties</span>
                <h2 className={styles.relatedTitle}>Other Verified Partner Hotels</h2>
              </div>
              <Link href="/services/hotels" className={styles.viewAllHotelsLink}>
                <span>View All Properties</span>
                <IconArrowRight size={14} />
              </Link>
            </div>

            <div className={styles.relatedGrid}>
              {relatedHotels.map((h) => (
                <Link key={h.id} href={`/services/hotels/${h.id}`} className={styles.relatedCard}>
                  <div className={styles.relatedImageWrapper}>
                    <Image
                      src={h.image}
                      alt={h.name}
                      fill
                      style={{ objectFit: "cover" }}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <span className={styles.relatedRating}>
                      <IconStar size={11} fill="#facc15" color="#facc15" />
                      <span>{h.rating}</span>
                    </span>
                  </div>
                  <div className={styles.relatedContent}>
                    <span className={styles.relatedDest}>{h.destination} Valley</span>
                    <h3 className={styles.relatedName}>{h.name}</h3>
                    <div className={styles.relatedPrice}>
                      <span>From PKR {h.pricePerNight.toLocaleString()}</span>
                      <small> / night</small>
                    </div>
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
