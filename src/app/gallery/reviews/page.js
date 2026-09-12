import styles from "./Reviews.module.css";
import reviews from "../../../data/reviews.json";
import { IconStar, IconCheck, IconWhatsApp } from "../../../components/Icons";
import ScrollReveal from "../../../components/ScrollReveal";

export default function ReviewsPage() {
  const waReviewUrl =
    "https://wa.me/923366832018?text=" +
    encodeURIComponent(
      "Hello Musafir Pakistan! I recently traveled with your team and would like to share my trip review and feedback."
    );

  return (
    <main className={styles.pageContainer}>
      {/* Hero Header */}
      <ScrollReveal direction="left">
        <section className={styles.heroHeader}>
          <span className={styles.badge}>Verified Traveler Feedback</span>
          <h1 className={styles.heroTitle}>Client Reviews & Field Stories</h1>
          <p className={styles.heroSubtitle}>
            Real testimonials from travelers who explored Pakistan’s northern corridors with Musafir.
            Verified service, mountain road safety, and memorable moments.
          </p>

          {/* Stats Row */}
          <div className={styles.statsRow}>
            <div className={styles.statItem}>
              <span className={styles.statVal}>4.9 / 5.0</span>
              <span className={styles.statLabel}>Average Guest Rating</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statVal}>5,000+</span>
              <span className={styles.statLabel}>Traveled Explorers</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statVal}>98%</span>
              <span className={styles.statLabel}>Recommendation Rate</span>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Reviews Grid */}
      <ScrollReveal direction="right">
        <div className={styles.mainContent}>
          <div className={styles.reviewsGrid}>
            {reviews.map((r) => (
              <div key={r.id} className={styles.reviewCard}>
                <div className={styles.cardTop}>
                  <div className={styles.stars}>
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <IconStar key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <span className={styles.tripBadge}>{r.trip}</span>
                </div>

                <p className={styles.commentText}>"{r.comment}"</p>

                <div className={styles.cardAuthor}>
                  <div>
                    <h3 className={styles.authorName}>
                      {r.name}
                      {r.verified && (
                        <span className={styles.verifiedIcon} title="Verified Traveler">
                          <IconCheck size={14} color="#15803d" />
                        </span>
                      )}
                    </h3>
                    <span className={styles.authorMeta}>
                      From {r.city} • {r.date}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Review Call to Action */}
          <section className={styles.ctaBox}>
            <h3>Traveled With Us Recently?</h3>
            <p>
              Your feedback helps us continuously evaluate our partner hotels, mountain fleet, and tour guides.
              Share your experience directly with our operations team on WhatsApp.
            </p>
            <a
              href={waReviewUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappReviewBtn}
            >
              <IconWhatsApp size={18} />
              <span>Submit Traveler Review</span>
            </a>
          </section>
        </div>
      </ScrollReveal>
    </main>
  );
}