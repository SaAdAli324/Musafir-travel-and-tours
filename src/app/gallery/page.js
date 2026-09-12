import Link from "next/link";
import styles from "./GalleryHub.module.css";
import { IconCamera, IconStar, IconArrowRight } from "../../components/Icons";
import ScrollReveal from "../../components/ScrollReveal";

export default function GalleryHubPage() {
  return (
    <main className={styles.pageContainer}>
      <ScrollReveal direction="left">
        <section className={styles.heroHeader}>
          <span className={styles.badge}>Field Records & Reviews</span>
          <h1 className={styles.heroTitle}>Our Gallery & Traveler Reviews</h1>
          <p className={styles.heroSubtitle}>
            Discover genuine travel moments, high-altitude summit views, and verified testimonials
            from travelers across Pakistan.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal direction="right">
        <div className={styles.mainContent}>
          <div className={styles.hubGrid}>
            <div className={styles.hubCard}>
              <div className={styles.cardIcon}>
                <IconCamera size={30} color="var(--primary-color)" />
              </div>
              <h2 className={styles.cardTitle}>Trip Photo Gallery</h2>
              <p className={styles.cardDesc}>
                Browse through our curated collection of verified tour photographs from Swat, Naran, Hunza,
                Skardu, and Azad Kashmir. Filter by group expeditions, landscapes, and campsites.
              </p>
              <Link href="/gallery/photos" className={styles.cardBtn}>
                <span>View Photo Gallery</span>
                <IconArrowRight size={15} />
              </Link>
            </div>

            <div className={styles.hubCard}>
              <div className={styles.cardIcon}>
                <IconStar size={30} fill="#d97706" color="#d97706" />
              </div>
              <h2 className={styles.cardTitle}>Client Reviews & Ratings</h2>
              <p className={styles.cardDesc}>
                Read verified testimonials and feedback from families, corporate teams,
                and private tour travelers who journeyed with Musafir Pakistan.
              </p>
              <Link href="/gallery/reviews" className={styles.cardBtn}>
                <span>Read Client Reviews</span>
                <IconArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </main>
  );
}
