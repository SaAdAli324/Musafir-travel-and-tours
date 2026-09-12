"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Hotels.module.css";
import hotels from "../../../data/hotels.json";
import {
  IconMapPin,
  IconCheck,
  IconWhatsApp,
  IconStar,
  IconHotel,
  IconShield,
  IconArrowRight
} from "../../../components/Icons";
import ScrollReveal from "../../../components/ScrollReveal";

export default function HotelsPage() {
  const [selectedDest, setSelectedDest] = useState("All");

  const destinations = ["All", "Skardu", "Hunza"];

  const filteredHotels =
    selectedDest === "All"
      ? hotels
      : hotels.filter((h) => h.destination === selectedDest);

  return (
    <main className={styles.pageContainer}>
      {/* Hero Header */}
      <ScrollReveal direction="left">
        <section className={styles.heroHeader}>
          <span className={styles.badge}>Hospitality & Partner Stays</span>
          <h1 className={styles.heroTitle}>Partner Hotels & Mountain Resorts</h1>
          <p className={styles.heroSubtitle}>
            Verified accommodations across Hunza and Skardu. All properties are pre-screened for
            continuous hot water, winter room heating, clean linen, and power backup.
          </p>

          <div className={styles.filterBar}>
            {destinations.map((dest) => (
              <button
                key={dest}
                onClick={() => setSelectedDest(dest)}
                className={`${styles.filterBtn} ${
                  selectedDest === dest ? styles.filterBtnActive : ""
                }`}
              >
                {dest === "All" ? "All Properties" : `${dest} Hotels`}
              </button>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Hotel Cards Grid */}
      <ScrollReveal direction="right">
        <div className={styles.mainContent}>
          <div className={styles.hotelsGrid}>
            {filteredHotels.map((hotel) => {
              const waMsg = encodeURIComponent(
                `Hello Musafir Pakistan! I would like to inquire about room booking at "${hotel.name}" in ${hotel.location}.`
              );
              const waUrl = `https://wa.me/923366832018?text=${waMsg}`;

              return (
                <div key={hotel.id} className={styles.hotelCard}>
                  <Link href={`/services/hotels/${hotel.id}`} className={styles.imageWrapper}>
                    <Image
                      src={hotel.image}
                      alt={hotel.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <span className={styles.ratingBadge}>
                      <IconStar size={13} fill="#facc15" color="#facc15" />
                      <span>{hotel.rating}</span>
                    </span>
                    <span className={styles.destBadge}>{hotel.destination}</span>
                  </Link>

                  <div className={styles.cardBody}>
                    <Link href={`/services/hotels/${hotel.id}`} style={{ textDecoration: "none" }}>
                      <h2 className={styles.hotelName}>{hotel.name}</h2>
                    </Link>
                    <div className={styles.hotelLocation}>
                      <IconMapPin size={14} color="#15803d" />
                      <span>{hotel.location}</span>
                    </div>
                    <p className={styles.hotelDesc}>{hotel.description}</p>

                    <div className={styles.amenitiesList}>
                      {hotel.amenities.slice(0, 4).map((amenity, idx) => (
                        <span key={idx} className={styles.amenityChip}>
                          <IconCheck size={12} color="#15803d" />
                          <span>{amenity}</span>
                        </span>
                      ))}
                    </div>

                    <div className={styles.cardFooter}>
                      <div className={styles.priceCol}>
                        <span className={styles.priceLabel}>Starting From</span>
                        <span className={styles.priceVal}>
                          PKR {hotel.pricePerNight.toLocaleString()}
                          <small style={{ fontSize: "0.8rem", color: "#666" }}> / night</small>
                        </span>
                      </div>

                      <div className={styles.footerActions}>
                        <Link
                          href={`/services/hotels/${hotel.id}`}
                          className={styles.detailsBtn}
                        >
                          <span>Details & Gallery</span>
                          <IconArrowRight size={14} />
                        </Link>

                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={styles.bookBtn}
                        >
                          <IconWhatsApp size={16} />
                          <span>Reserve</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Official Musafir Hotel Policy */}
          <section className={styles.policyCard}>
            <h3 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <IconHotel size={24} color="var(--primary-color)" />
              <span>Musafir Pakistan Hotel Guidelines & Operating Terms</span>
            </h3>
            <div className={styles.policyGrid}>
              <div className={styles.policyItem}>
                <h4>Check-in & Check-out Timings</h4>
                <p>
                  Standard Hotel Check-In is at <strong>3:00 PM</strong> and Check-Out is at <strong>12:00 PM</strong>. Early check-in or late check-out is subject to room availability at PKR 1,000 per hour.
                </p>
              </div>
              <div className={styles.policyItem}>
                <h4>Hygiene & Facility Verification</h4>
                <p>
                  All partner hotels are pre-inspected by our local coordinators to verify hot water running hours, clean beddings, functional room heaters, and backup generators.
                </p>
              </div>
              <div className={styles.policyItem}>
                <h4>Weather & Contingency Lodging</h4>
                <p>
                  In unforeseen road closures or sudden landslides, Musafir staff proactively coordinates alternate lodging arrangements in the nearest safe valley hub.
                </p>
              </div>
            </div>
          </section>
        </div>
      </ScrollReveal>
    </main>
  );
}