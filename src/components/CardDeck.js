"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import styles from "./CardDeck.module.css";
import {
  IconMapPin,
  IconCalendar,
  IconArrowRight,
  IconCar,
  IconUsers,
  IconStar
} from "./Icons";

const DEFAULT_SERVICE_CARDS = [
  {
    id: "tour-swat",
    type: "tour",
    badge: "Signature Group Tour",
    title: "Swat & Kalam Valley",
    image: "/images/posters/swat-kalam-5-days.png",
    meta1: { label: "Fizaghat & Kalam", icon: "location" },
    meta2: { label: "5 Days Tour", icon: "duration" },
    priceLabel: "Starting from",
    priceValue: "PKR 24,500",
    link: "/tours/swat-kalam-5-days"
  },
  {
    id: "car-prado",
    type: "car",
    badge: "Rent a 4x4 Prado",
    title: "Toyota Prado TX / V8",
    image: "/images/transports/prado-suv.webp",
    meta1: { label: "VIP Off-Road 4x4", icon: "car" },
    meta2: { label: "3 – 4 Passengers", icon: "users" },
    priceLabel: "Daily Rental",
    priceValue: "PKR 20,000 / Day",
    link: "/services/transport"
  },
  {
    id: "hotel-arcadian",
    type: "hotel",
    badge: "Partner Deluxe Hotel",
    title: "Arcadian Resort Skardu",
    image: "/images/hotels/arcadian-2.jpg",
    meta1: { label: "Skardu Valley", icon: "location" },
    meta2: { label: "4.8 ★ Luxury Stay", icon: "star" },
    priceLabel: "Room Rate",
    priceValue: "PKR 28,000 / Night",
    link: "/services/hotels/arcadian-skardu"
  },
  {
    id: "tour-hunza",
    type: "tour",
    badge: "Weekly Group Tour",
    title: "Hunza & Khunjerab Pass",
    image: "/images/posters/hunza-china-border-7-days.png",
    meta1: { label: "Attabad & Passu", icon: "location" },
    meta2: { label: "7 Days Tour", icon: "duration" },
    priceLabel: "Starting from",
    priceValue: "PKR 34,500",
    link: "/tours/hunza-china-border-7-days"
  },
  {
    id: "car-cabin",
    type: "car",
    badge: "Executive Van Fleet",
    title: "Toyota Grand Cabin",
    image: "/images/transports/grand-cabin.jpg",
    meta1: { label: "With Hill Driver", icon: "car" },
    meta2: { label: "10 – 13 Passengers", icon: "users" },
    priceLabel: "Daily Rental",
    priceValue: "PKR 14,000 / Day",
    link: "/services/transport"
  },
  {
    id: "hotel-eliet",
    type: "hotel",
    badge: "Boutique Mountain Stay",
    title: "Eliet Hotel Hunza",
    image: "/images/hotels/eliet-1.webp",
    meta1: { label: "Karimabad Hunza", icon: "location" },
    meta2: { label: "4.9 ★ Mountain View", icon: "star" },
    priceLabel: "Room Rate",
    priceValue: "PKR 18,000 / Night",
    link: "/services/hotels/eliet-hotel-hunza"
  }
];

export default function CardDeck({ cards: initialCards }) {
  // Use passed cards or default diverse service deck (tours, cars, hotels)
  const [cards, setCards] = useState(initialCards || DEFAULT_SERVICE_CARDS);

  const handleDragEnd = (event, info) => {
    // If swiped left or right significantly
    if (Math.abs(info.offset.x) > 80) {
      setCards((prev) => {
        const newCards = [...prev];
        const topCard = newCards.shift();
        newCards.push(topCard);
        return newCards;
      });
    }
  };

  const renderMetaIcon = (iconType) => {
    switch (iconType) {
      case "car":
        return <IconCar size={14} color="#16a34a" />;
      case "users":
        return <IconUsers size={14} color="#16a34a" />;
      case "star":
        return <IconStar size={14} fill="#f59e0b" color="#f59e0b" />;
      case "duration":
        return <IconCalendar size={14} color="#16a34a" />;
      case "location":
      default:
        return <IconMapPin size={14} color="#16a34a" />;
    }
  };

  return (
    <div className={styles.deckWrapper}>
      <div className={styles.deckContainer}>
        {/* We take top 4 to render. reverse() so the first in array renders last (on top in DOM) */}
        {cards.slice(0, 4).reverse().map((card, idx) => {
          const isTop = idx === 3; // Because we slice(0,4).reverse(), idx 3 is the top card

          // Elegant subtle rotations for card stack that stay within mobile bounds
          const rotations = [-3, 2.5, -1.5, 0];
          const rotation = isTop ? 0 : rotations[idx];

          return (
            <motion.div
              key={card.id}
              layout
              className={styles.card}
              initial={false}
              animate={{
                scale: isTop ? 1 : 1 - (3 - idx) * 0.04,
                y: isTop ? 0 : (3 - idx) * 20,
                rotate: rotation,
                zIndex: idx,
                opacity: (3 - idx) >= 3 ? 0 : 1 // Hide cards too far back
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              drag={isTop ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.6}
              onDragEnd={isTop ? handleDragEnd : undefined}
              whileDrag={{ scale: 1.05, cursor: "grabbing" }}
              style={{ cursor: isTop ? "grab" : "auto" }}
            >
              <div className={styles.cardImageWrapper}>
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 350px"
                  draggable="false"
                />
                <div className={styles.cardBadge}>{card.badge}</div>
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <div className={styles.cardMeta}>
                  <div className={styles.metaItem}>
                    {renderMetaIcon(card.meta1?.icon)}
                    <span>{card.meta1?.label}</span>
                  </div>
                  <div className={styles.metaItem}>
                    {renderMetaIcon(card.meta2?.icon)}
                    <span>{card.meta2?.label}</span>
                  </div>
                </div>
                <div className={styles.cardFooter}>
                  <div className={styles.priceBlock}>
                    <span className={styles.priceLabel}>{card.priceLabel}</span>
                    <span className={styles.priceValue}>{card.priceValue}</span>
                  </div>
                  <Link href={card.link} className={styles.exploreBtn} draggable="false" aria-label={`Explore ${card.title}`}>
                    <IconArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className={styles.swipeHint}>
        <span className={styles.swipeArrow}>&larr;</span>
        <span>Swipe tours, cars & hotels</span>
        <span className={styles.swipeArrow}>&rarr;</span>
      </div>
    </div>
  );
}
