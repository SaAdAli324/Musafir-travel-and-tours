"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Destinations.module.css";
import destinations from "../../data/destinations.json";
import { IconMapPin, IconSun, IconArrowRight, IconCompass } from "../../components/Icons";
import ScrollReveal from "../../components/ScrollReveal";

export default function DestinationsPage() {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const regions = ["All", "Gilgit-Baltistan", "Khyber Pakhtunkhwa", "Azad Kashmir"];

  const filteredDestinations = destinations.filter((dest) => {
    const matchesRegion =
      selectedRegion === "All" || dest.region === selectedRegion;
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.highlights.some((h) =>
        h.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesRegion && matchesSearch;
  });

  return (
    <main className={styles.destContainer}>
      {/* Hero Header */}
      <ScrollReveal direction="left">
        <section className={styles.heroHeader}>
          <span className={styles.heroTag}>Regional Tour Directory</span>
          <h1 className={styles.heroTitle}>Iconic Travel Destinations</h1>
          <p className={styles.heroSubtitle}>
            From the soaring 8,000m peaks of the Karakoram to the pine-forested valleys of Swat and Neelum.
            Browse seasonal road connectivity and planned departures.
          </p>

          {/* Region Filter Buttons */}
          <div className={styles.filterBar}>
            {regions.map((region) => (
              <button
                key={region}
                onClick={() => setSelectedRegion(region)}
                className={`${styles.filterBtn} ${
                  selectedRegion === region ? styles.filterBtnActive : ""
                }`}
              >
                {region}
              </button>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Main Destination Cards */}
      <ScrollReveal direction="right">
        <div className={styles.mainContent}>
          <div className={styles.destGrid}>
            {filteredDestinations.map((dest) => (
              <div key={dest.id} className={styles.destCard}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className={styles.cardImage}
                  />
                  <div className={styles.imageOverlay} />
                  <span className={styles.regionBadge}>{dest.region}</span>
                  <span className={styles.seasonBadge}>
                    <IconSun size={14} color="#d97706" />
                    <span>{dest.bestSeason}</span>
                  </span>
                </div>

                <div className={styles.cardBody}>
                  <h2 className={styles.cardTitle}>{dest.name}</h2>
                  <div className={styles.cardTagline}>{dest.tagline}</div>
                  <p className={styles.cardDesc}>{dest.description}</p>

                  <div className={styles.highlightsWrapper}>
                    <div className={styles.highlightsLabel}>Top Attractions</div>
                    <div className={styles.highlightsChips}>
                      {dest.highlights.slice(0, 5).map((highlight, idx) => (
                        <span key={idx} className={styles.chip}>
                          <IconMapPin size={13} color="#15803d" />
                          <span>{highlight}</span>
                        </span>
                      ))}
                      {dest.highlights.length > 5 && (
                        <span className={styles.chip}>
                          +{dest.highlights.length - 5} More
                        </span>
                      )}
                    </div>
                  </div>

                  <div className={styles.cardFooter}>
                    <div className={styles.priceCol}>
                      <span className={styles.priceLabel}>Tours Starting From</span>
                      <span className={styles.priceAmount}>
                        PKR {dest.startingPrice.toLocaleString()}
                      </span>
                    </div>
                    <Link href={dest.tourLink} className={styles.exploreBtn}>
                      <span>View Tours</span>
                      <IconArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Itinerary Call to Action */}
          <div className={styles.customCta}>
            <h3>Need a Customized Mountain Route or Offbeat Trail?</h3>
            <p>
              We curate bespoke private expeditions to Fairy Meadows, Kumrat Valley, Deosai Plains,
              Chitral, and remote northern passes with dedicated 4x4 transport and verified local guides.
            </p>
            <Link href="/custom-trip" className={styles.customCtaBtn}>
              <span>Plan Custom Itinerary</span>
              <IconArrowRight size={16} />
            </Link>
          </div>
        </div>
      </ScrollReveal>
    </main>
  );
}