"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./HotelDetails.module.css";
import { IconArrowLeft, IconArrowRight, IconCross, IconSparkles } from "../../../../components/Icons";

export default function HotelGallery({ gallery = [], hotelName = "Hotel" }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const images = gallery.length > 0 ? gallery : ["/images/hotels/skardu-arcadian.jpg"];

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = (index) => {
    setActiveIdx(index);
    setLightboxOpen(true);
  };

  return (
    <div className={styles.galleryContainer}>
      {/* Modern Mosaic Showcase */}
      <div className={styles.mosaicGrid}>
        {/* Main Large Image */}
        <div
          className={styles.mainImageCol}
          onClick={() => openLightbox(activeIdx)}
          role="button"
          tabIndex={0}
          aria-label="Open full photo viewer"
        >
          <Image
            src={images[activeIdx]}
            alt={`${hotelName} - Featured View`}
            fill
            style={{ objectFit: "cover" }}
            priority
            sizes="(max-width: 1024px) 100vw, 65vw"
          />
          <div className={styles.mainImageOverlay}>
            <span className={styles.viewBadge}>
              <IconSparkles size={14} />
              <span>Click to Expand View</span>
            </span>
          </div>
        </div>

        {/* Side Thumbnails Column */}
        <div className={styles.sideThumbsCol}>
          {images.slice(0, 3).map((img, idx) => (
            <div
              key={idx}
              className={`${styles.thumbTile} ${activeIdx === idx ? styles.thumbActive : ""}`}
              onClick={() => setActiveIdx(idx)}
              role="button"
              tabIndex={0}
              aria-label={`View photo ${idx + 1}`}
            >
              <Image
                src={img}
                alt={`${hotelName} photo ${idx + 1}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 33vw, 20vw"
              />
              {idx === 2 && images.length > 3 && (
                <div
                  className={styles.moreOverlay}
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightbox(2);
                  }}
                >
                  <span>+{images.length - 3} More</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Thumbnail Ribbon */}
      <div className={styles.thumbRibbon}>
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            className={`${styles.ribbonItem} ${activeIdx === idx ? styles.ribbonActive : ""}`}
            onClick={() => setActiveIdx(idx)}
            aria-label={`Select photo ${idx + 1}`}
          >
            <Image
              src={img}
              alt={`${hotelName} thumbnail ${idx + 1}`}
              fill
              style={{ objectFit: "cover" }}
            />
          </button>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxOpen && (
        <div className={styles.lightboxModal} onClick={() => setLightboxOpen(false)}>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setLightboxOpen(false)}
              aria-label="Close photo viewer"
            >
              <IconCross size={20} />
            </button>

            <button
              type="button"
              className={`${styles.navBtn} ${styles.navBtnPrev}`}
              onClick={handlePrev}
              aria-label="Previous photo"
            >
              <IconArrowLeft size={20} />
            </button>

            <div className={styles.lightboxImageWrapper}>
              <Image
                src={images[activeIdx]}
                alt={`${hotelName} - High resolution view`}
                fill
                style={{ objectFit: "contain" }}
                sizes="90vw"
                priority
              />
            </div>

            <button
              type="button"
              className={`${styles.navBtn} ${styles.navBtnNext}`}
              onClick={handleNext}
              aria-label="Next photo"
            >
              <IconArrowRight size={20} />
            </button>

            <div className={styles.lightboxFooter}>
              <span className={styles.counterText}>
                Photo {activeIdx + 1} of {images.length}
              </span>
              <span className={styles.hotelCaption}>{hotelName} Verified Property</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
