"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "../ToursListing.module.css";
import initialPackages from "../../../data/packages.json";
import {
  IconArrowRight,
  IconClock,
  IconCalendar,
  IconCheck,
  IconMapPin,
  IconUsers,
  IconSparkles
} from "../../../components/Icons";
import ScrollReveal from "../../../components/ScrollReveal";

export default function GroupToursPage() {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [packages, setPackages] = useState(initialPackages);

  useEffect(() => {
    fetch('/api/packages')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data)) setPackages(data);
      })
      .catch(err => console.error(err));
  }, []);

  const regions = ["All", "Hunza", "Skardu", "Swat", "Kashmir", "Kumrat"];

  const groupTours = packages.filter(
    (p) =>
      p.type.toLowerCase().includes("group") ||
      p.type.toLowerCase().includes("signature") ||
      p.type.toLowerCase().includes("adventure")
  );

  const filteredTours =
    selectedRegion === "All"
      ? groupTours
      : groupTours.filter(
          (t) =>
            t.title.toLowerCase().includes(selectedRegion.toLowerCase()) ||
            t.destinations?.some((d) => d.toLowerCase().includes(selectedRegion.toLowerCase())) ||
            t.attractions?.some((a) => a.toLowerCase().includes(selectedRegion.toLowerCase()))
        );

  return (
    <main className={styles.pageContainer}>
      {/* Cinematic Hero Banner */}
      <ScrollReveal direction="left">
        <section className={styles.heroBanner}>
          <div className={styles.heroBg}>
            <Image
              src="/images/group-tours-banner.jpg"
              alt="Scheduled Group Expeditions in Northern Pakistan"
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="100vw"
            />
          </div>
          <div className={styles.heroOverlay} />

          <div className={styles.heroInner}>
            {/* Breadcrumbs */}
            <div className={styles.breadcrumbs}>
              <Link href="/" className={styles.breadcrumbLink}>Home</Link>
              <span>/</span>
              <span className={styles.breadcrumbLink}>Domestic Tours</span>
              <span>/</span>
              <span className={styles.breadcrumbCurrent}>Group Expeditions</span>
            </div>

            <span className={styles.heroBadge}>
              <IconSparkles size={14} />
              <span>Guaranteed Weekly Departures • Islamabad & Karachi</span>
            </span>

            <h1 className={styles.heroTitle}>Scheduled Group Expeditions</h1>

            <p className={styles.heroSubtitle}>
              Join fellow adventurers on fixed-departure expeditions across Northern Pakistan.
              Travel in executive Grand Cabins & Coasters with certified mountain guides,
              pre-screened hotel stays, and guaranteed departures every week.
            </p>

            {/* Region Quick Filters */}
            <div className={styles.filterBar}>
              {regions.map((region) => (
                <button
                  key={region}
                  type="button"
                  className={`${styles.filterBtn} ${
                    selectedRegion === region ? styles.filterBtnActive : ""
                  }`}
                  onClick={() => setSelectedRegion(region)}
                >
                  {region === "All" ? "All Group Tours" : `${region} Tours`}
                </button>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Tours Grid Section */}
      <ScrollReveal direction="right">
        <section className={styles.cardsSection}>
          <div className={styles.sectionBar}>
            <span className={styles.countText}>
              Showing {filteredTours.length} Signature Group {filteredTours.length === 1 ? "Tour" : "Tours"}
            </span>
          </div>

          <div className={styles.cardsGrid}>
            {filteredTours.map((t) => (
              <div key={t.id} className={styles.tourCard}>
                {/* Square Poster Display */}
                <div className={styles.posterWrapper}>
                  <Image
                    src={t.poster || t.image}
                    alt={t.title}
                    fill
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className={styles.durationBadge}>
                    <IconClock size={13} />
                    <span>{t.duration.days} Days / {t.duration.nights} Nights</span>
                  </div>
                  <div className={styles.categoryTag}>{t.type}</div>
                </div>

                {/* Card Body */}
                <div className={styles.cardBody}>
                  <h2 className={styles.tourTitle}>{t.title}</h2>
                  <p className={styles.tagline}>{t.tagline}</p>

                  {/* Key Attractions */}
                  {t.attractions && (
                    <div className={styles.highlightsList}>
                      {t.attractions.slice(0, 3).map((item, idx) => (
                        <div key={idx} className={styles.highlightItem}>
                          <IconCheck size={14} color="#16a34a" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Card Footer */}
                  <div className={styles.cardFooter}>
                    <div className={styles.priceCol}>
                      <span className={styles.priceLabel}>Starting from</span>
                      <span className={styles.priceVal}>
                        PKR {t.pricing.solo.toLocaleString()}
                        <small> / person</small>
                      </span>
                    </div>

                    <Link href={`/tours/${t.id}`} className={styles.exploreBtn}>
                      <span>View Tour</span>
                      <IconArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}