import Link from "next/link";
import styles from "./ServicesHub.module.css";
import { IconHotel, IconCar, IconTicket, IconArrowRight } from "../../components/Icons";
import ScrollReveal from "../../components/ScrollReveal";

export default function ServicesHubPage() {
  const services = [
    {
      title: "Hotels & Mountain Resorts",
      subtitle: "Verified stays in Hunza, Skardu & Swat",
      desc: "From riverside chalets in Skardu to boutique hotels overlooking Karimabad, reserve pre-vetted rooms equipped with continuous hot water, room heating, and power generators.",
      icon: <IconHotel size={28} />,
      link: "/services/hotels",
      cta: "Explore Partner Hotels",
      tag: "Verified Stays"
    },
    {
      title: "Rent a Transport",
      subtitle: "Executive vans, coasters & 4x4 SUVs",
      desc: "Reliable travel across northern corridors in well-maintained Toyota Grand Cabins, Saloon Coasters, or luxury Prado SUVs with verified mountain drivers.",
      icon: <IconCar size={28} />,
      link: "/services/transport",
      cta: "View Executive Fleet",
      tag: "With Mountain Drivers"
    },
    {
      title: "Domestic Ticketing Desk",
      subtitle: "Airlines, Luxury AC Coaches & Green Line Trains",
      desc: "Direct reservation assistance for domestic flights (PIA/AirSial/Fly Jinnah), luxury road coaches (Faisal Movers/Daewoo), and Pakistan Railways Green Line with WhatsApp e-ticket confirmation.",
      icon: <IconTicket size={28} />,
      link: "/services/tickets",
      cta: "Book Tickets",
      tag: "Flat PKR 200 Service Fee"
    }
  ];

  return (
    <main className={styles.pageContainer}>
      <ScrollReveal direction="left">
        <section className={styles.heroHeader}>
          <span className={styles.badge}>Ground Services & Logistics</span>
          <h1 className={styles.heroTitle}>Comprehensive Travel Services</h1>
          <p className={styles.heroSubtitle}>
            Beyond complete tour packages, Musafir Pakistan provides standalone hotel reservations,
            dedicated mountain vehicles with drivers, and domestic ticketing concierge.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal direction="right">
        <div className={styles.mainContent}>
          <div className={styles.servicesGrid}>
            {services.map((s, idx) => (
              <div key={idx} className={styles.serviceCard}>
                <div className={styles.iconWrapper}>{s.icon}</div>
                <span className={styles.serviceTag}>{s.tag}</span>
                <h2 className={styles.cardTitle}>{s.title}</h2>
                <p className={styles.cardSubtitle}>{s.subtitle}</p>
                <p className={styles.cardDesc}>{s.desc}</p>
                <Link href={s.link} className={styles.cardLink}>
                  <span>{s.cta}</span>
                  <IconArrowRight size={15} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </main>
  );
}
