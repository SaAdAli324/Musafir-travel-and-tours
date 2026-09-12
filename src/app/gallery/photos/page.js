"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./Photos.module.css";
import photos from "../../../data/gallery.json";
import { IconMapPin, IconCross } from "../../../components/Icons";
import ScrollReveal from "../../../components/ScrollReveal";

export default function PhotosPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activePhoto, setActivePhoto] = useState(null);

  const categories = ["All", "Group Expeditions", "Landscapes", "Bonfire & Camping"];

  const filteredPhotos =
    selectedCategory === "All"
      ? photos
      : photos.filter((p) => p.category === selectedCategory);

  return (
    <main className={styles.pageContainer}>
      {/* Hero Header */}
      <ScrollReveal direction="left">
        <section className={styles.heroHeader}>
          <span className={styles.badge}>Tour Field Photography</span>
          <h1 className={styles.heroTitle}>Our Tour Photo Gallery</h1>
          <p className={styles.heroSubtitle}>
            Real captures from group expeditions, family vacations, and high-altitude mountain passes
            across Gilgit-Baltistan, Khyber Pakhtunkhwa, and Azad Kashmir.
          </p>

          {/* Category Filters */}
          <div className={styles.filterBar}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`${styles.filterBtn} ${
                  selectedCategory === cat ? styles.filterBtnActive : ""
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* Main Grid */}
      <ScrollReveal direction="right">
        <div className={styles.mainContent}>
          <div className={styles.galleryGrid}>
            {filteredPhotos.map((item) => (
              <div
                key={item.id}
                className={styles.photoCard}
                onClick={() => setActivePhoto(item)}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className={styles.photoImg}
                />
                <div className={styles.photoOverlay}>
                  <span className={styles.photoLocation}>
                    <IconMapPin size={13} color="#4ade80" />
                    <span>{item.location}</span>
                  </span>
                  <h3 className={styles.photoTitle}>{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className={styles.lightboxModal}
          onClick={() => setActivePhoto(null)}
        >
          <div
            className={styles.lightboxContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeBtn}
              onClick={() => setActivePhoto(null)}
              aria-label="Close Preview"
            >
              <IconCross size={18} />
            </button>
            <div className={styles.lightboxImageWrapper}>
              <Image
                src={activePhoto.image}
                alt={activePhoto.title}
                fill
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className={styles.lightboxDetails}>
              <div className={styles.lightboxLoc}>
                <IconMapPin size={15} color="#4ade80" />
                <span>{activePhoto.location}</span>
              </div>
              <h2 className={styles.lightboxTitle}>{activePhoto.title}</h2>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}