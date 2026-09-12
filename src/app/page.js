"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./Home.module.css";
import initialPackages from "../data/packages.json";
import CardDeck from "../components/CardDeck";
import ScrollReveal from "../components/ScrollReveal";
import {
  IconArrowRight,
  IconArrowLeft,
  IconMapPin,
  IconCalendar,
  IconUsers,
  IconShield,
  IconCar,
  IconCheck,
  IconSearch,
  IconStar,
  IconSparkles,
  IconCompass
} from "../components/Icons";

const heroSlides = [
  {
    image: "/images/autumn_hero.jpg",
    title: "Hunza Valley",
    region: "Gilgit-Baltistan",
    tag: "Golden Autumn Foliage"
  },
  {
    image: "/images/skardu.jpg",
    title: "Skardu Valley",
    region: "Baltistan",
    tag: "Gateway to K2 & Deosai"
  },
  {
    image: "/images/swat.jpg",
    title: "Swat & Kalam",
    region: "Khyber Pakhtunkhwa",
    tag: "Switzerland of the East"
  },
  {
    image: "/images/hunza.jpg",
    title: "Passu Cones",
    region: "Upper Hunza",
    tag: "Cathedral Peaks"
  },
  {
    image: "/images/hero.jpg",
    title: "Karakoram Corridors",
    region: "Gilgit-Baltistan",
    tag: "High Mountain Expeditions"
  }
];

const trendingTags = [
  { label: "Hunza Valley", query: "hunza" },
  { label: "Skardu & Deosai", query: "skardu" },
  { label: "Swat & Kalam", query: "swat" },
  { label: "Neelum Valley", query: "kashmir" },
  { label: "Babusar Pass", query: "naran" }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [packages, setPackages] = useState(initialPackages);

  useEffect(() => {
    fetch('/api/packages')
      .then(res => res.json())
      .then(data => {
        if (data && Array.isArray(data)) setPackages(data);
      })
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);
  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <main className={styles.main}>
      {/* Modern Breathtaking Hero Section */}
      <section className={styles.heroSection}>
        {/* Background Panoramic Carousel */}
        <div className={styles.heroBackground}>
          {heroSlides.map((slide, index) => (
            <div
              key={slide.image}
              className={`${styles.heroSlide} ${index === currentSlide ? styles.slideActive : ""}`}
            >
              <Image
                src={slide.image}
                alt={`${slide.title} - ${slide.region}`}
                fill
                style={{ objectFit: "cover" }}
                priority={index === 0}
                sizes="100vw"
              />
            </div>
          ))}
          {/* Refined directional gradient: preserves clarity while keeping text readable */}
          <div className={styles.heroGradientOverlay} />
        </div>

        <div className={styles.heroInner}>
          <div className={styles.heroLeft}>
            {/* Trust Badge */}
            <div className={styles.heroTrustBadge}>
              <div className={styles.starCluster}>
                <IconStar size={14} fill="#f59e0b" color="#f59e0b" />
                <IconStar size={14} fill="#f59e0b" color="#f59e0b" />
                <IconStar size={14} fill="#f59e0b" color="#f59e0b" />
                <IconStar size={14} fill="#f59e0b" color="#f59e0b" />
                <IconStar size={14} fill="#f59e0b" color="#f59e0b" />
              </div>
              <span>4.9 / 5 Rated by 1,200+ Travelers • Licensed Operator</span>
            </div>

            {/* Main Hero Headline */}
            <h1 className={styles.heroTitle}>
              Discover Northern Pakistan’s <br />
              <span className={styles.heroHighlight}>Majestic Valleys & Peaks</span>
            </h1>

            {/* Subtitle */}
            <p className={styles.heroSubtitle}>
              Guaranteed weekly group departures from Karachi & Islamabad, executive private 4x4 Prado expeditions,
              and hand-picked deluxe stays across Hunza, Skardu, Swat, and Neelum Valley.
            </p>

            {/* Trending Destination Pills */}
            <div className={styles.trendingPills}>
              <span className={styles.trendingLabel}>Trending:</span>
              {trendingTags.map((item) => (
                <Link
                  key={item.label}
                  href={`/destinations?q=${item.query}`}
                  className={styles.trendPill}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.heroRight}>
            {/* Infinite Swipeable Card Deck featuring Tours, Cars & Hotels */}
            <CardDeck />
          </div>
        </div>

        {/* Centered Modern Slide Controller */}
        <div className={styles.slideIndicatorCard}>
          <button
            type="button"
            onClick={handlePrev}
            className={styles.arrowBtn}
            aria-label="Previous destination"
          >
            <IconArrowLeft size={13} />
          </button>

          <div className={styles.indicatorInfo}>
            <div className={styles.indicatorLocation}>
              <IconMapPin size={13} color="#4ade80" />
              <span className={styles.indicatorTitle}>{heroSlides[currentSlide].title}</span>
            </div>
            <span className={styles.indicatorRegion}>
              {heroSlides[currentSlide].region}
            </span>
          </div>

          <div className={styles.slideDots}>
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`${styles.slideDot} ${idx === currentSlide ? styles.slideDotActive : ""}`}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={handleNext}
            className={styles.arrowBtn}
            aria-label="Next destination"
          >
            <IconArrowRight size={13} />
          </button>
        </div>
      </section>

      {/* Trust & Verification Bar */}
      <ScrollReveal direction="left">
        <section className={styles.trustSection}>
          <div className={styles.trustGrid}>
            <div className={styles.trustCard}>
              <div className={`${styles.trustIcon} ${styles.trustIconGreen}`}>
                <IconShield size={22} />
              </div>
              <div>
                <h4 className={styles.trustTitle}>DTS Licensed Operator</h4>
                <p className={styles.trustDesc}>Officially registered with Department of Tourist Services Pakistan.</p>
              </div>
            </div>

            <div className={styles.trustCard}>
              <div className={`${styles.trustIcon} ${styles.trustIconBlue}`}>
                <IconCar size={22} />
              </div>
              <div>
                <h4 className={styles.trustTitle}>Executive Mountain Fleet</h4>
                <p className={styles.trustDesc}>Saloon Coasters, Grand Cabins & 4x4 Prado SUVs with expert drivers.</p>
              </div>
            </div>

            <div className={styles.trustCard}>
              <div className={`${styles.trustIcon} ${styles.trustIconAmber}`}>
                <IconMapPin size={22} />
              </div>
              <div>
                <h4 className={styles.trustTitle}>Karachi & Islamabad</h4>
                <p className={styles.trustDesc}>Direct weekly departures and complete on-ground ops management.</p>
              </div>
            </div>

            <div className={styles.trustCard}>
              <div className={`${styles.trustIcon} ${styles.trustIconPurple}`}>
                <IconCheck size={22} />
              </div>
              <div>
                <h4 className={styles.trustTitle}>Verified Hotel Stays</h4>
                <p className={styles.trustDesc}>Pre-inspected rooms guaranteed with warm bedding, heating & hot water.</p>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Popular Destinations Gallery */}
      <ScrollReveal direction="right">
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Explore Pakistan</span>
            <h2>Top Travel Destinations</h2>
            <p>Explore seasonal itineraries and mountain corridors across Gilgit-Baltistan and Khyber Pakhtunkhwa.</p>
          </div>

          <div className={styles.destGrid}>
            <Link href="/destinations" className={styles.destCard}>
              <Image src="/images/hunza.jpg" alt="Hunza Valley" fill style={{ objectFit: "cover" }} className={styles.destImage} />
              <div className={styles.destOverlay}></div>
              <div className={styles.destContent}>
                <h3 className={styles.destName}>Hunza Valley</h3>
                <div className={styles.exploreBtn}><IconArrowRight size={18} /></div>
              </div>
            </Link>

            <Link href="/destinations" className={styles.destCard}>
              <Image src="/images/skardu.jpg" alt="Skardu Valley" fill style={{ objectFit: "cover" }} className={styles.destImage} />
              <div className={styles.destOverlay}></div>
              <div className={styles.destContent}>
                <h3 className={styles.destName}>Skardu</h3>
                <div className={styles.exploreBtn}><IconArrowRight size={18} /></div>
              </div>
            </Link>

            <Link href="/destinations" className={styles.destCard}>
              <Image src="/images/swat.jpg" alt="Swat Valley" fill style={{ objectFit: "cover" }} className={styles.destImage} />
              <div className={styles.destOverlay}></div>
              <div className={styles.destContent}>
                <h3 className={styles.destName}>Swat Valley</h3>
                <div className={styles.exploreBtn}><IconArrowRight size={18} /></div>
              </div>
            </Link>
          </div>
        </section>
      </ScrollReveal>

      {/* Featured Tour Packages */}
      <ScrollReveal direction="left">
        <section className={styles.pkgWrapper}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionTag}>Handpicked Itineraries</span>
            <h2>Featured Tour Packages</h2>
            <p>Transparent pricing, comprehensive meal plans, and day-by-day itineraries verified by our local field guides.</p>
          </div>

          <div className={styles.pkgGrid}>
            {packages.slice(0, 3).map((pkg) => (
              <div key={pkg.id} className={styles.pkgRow}>
                <div className={styles.pkgImageWrapper}>
                  <Image
                    src={pkg.poster || pkg.image}
                    alt={pkg.title}
                    fill
                    sizes="(max-width: 900px) 100vw, 550px"
                    style={{ objectFit: "cover" }}
                    className={styles.pkgImage}
                  />
                </div>
                <div className={styles.pkgInfo}>
                  <div className={styles.pkgBadge}>{pkg.badge || pkg.type}</div>
                  <h3>{pkg.title}</h3>
                  <p>{pkg.tagline}</p>

                  <div className={styles.pkgMeta}>
                    <div className={styles.metaItem}>
                      <span>Duration</span>
                      <span>{pkg.duration.days} Days / {pkg.duration.nights} Nights</span>
                    </div>
                    <div className={styles.metaItem}>
                      <span>Solo / Couple</span>
                      <span>PKR {pkg.pricing.solo.toLocaleString()} / PKR {pkg.pricing.couple.toLocaleString()}</span>
                    </div>
                  </div>

                  <Link href={`/tours/${pkg.id}`} className={styles.bookBtn}>
                    <span>View Full Itinerary & Pricing</span>
                    <IconArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "3.5rem" }}>
            <Link href="/tours/group" className={styles.viewAllBtn}>
              <span>View All Packages</span>
              <IconArrowRight size={16} />
            </Link>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}
