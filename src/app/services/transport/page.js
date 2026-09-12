import Image from "next/image";
import styles from "./Transport.module.css";
import transports from "../../../data/transports.json";
import {
  IconUsers,
  IconLuggage,
  IconMapPin,
  IconCheck,
  IconCar,
  IconArrowRight
} from "../../../components/Icons";
import ScrollReveal from "../../../components/ScrollReveal";

export default function TransportPage() {
  return (
    <main className={styles.pageContainer}>
      {/* Hero Header */}
      <ScrollReveal direction="left">
        <section className={styles.heroHeader}>
          <span className={styles.badge}>Commercial Fleet Rental</span>
          <h1 className={styles.heroTitle}>Rent Mountain Transport</h1>
          <p className={styles.heroSubtitle}>
            Reliable northern travel with our maintained private fleet and certified mountain drivers.
            Available for Islamabad pickups, Swat, Naran, Hunza, and Skardu routes.
          </p>
        </section>
      </ScrollReveal>

      {/* Fleet Grid */}
      <ScrollReveal direction="right">
        <div className={styles.mainContent}>
          <div className={styles.fleetGrid}>
            {transports.map((vehicle) => {
              const waMsg = encodeURIComponent(
                `Hello Musafir Pakistan! I would like to rent the "${vehicle.name}" (${vehicle.category}). Please share availability and route quotation.`
              );
              const waUrl = `https://wa.me/923366832018?text=${waMsg}`;

              return (
                <div key={vehicle.id} className={styles.vehicleCard}>
                  <div className={styles.imageWrapper}>
                    <Image
                      src={vehicle.image}
                      alt={vehicle.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <span className={styles.categoryBadge}>{vehicle.category}</span>
                  </div>

                  <div className={styles.cardBody}>
                    <h2 className={styles.vehicleName}>{vehicle.name}</h2>

                    <div className={styles.capacityRow}>
                      <span>
                        <IconUsers size={15} color="#4b5563" />
                        {vehicle.capacity}
                      </span>
                      <span>
                        <IconLuggage size={15} color="#4b5563" />
                        {vehicle.luggage}
                      </span>
                    </div>

                    <div className={styles.routeText}>
                      <IconMapPin size={15} color="#0369a1" />
                      <span>Typical Routes: {vehicle.popularRoutes}</span>
                    </div>

                    <ul className={styles.featuresList}>
                      {vehicle.features.map((feat, idx) => (
                        <li key={idx}>
                          <span className={styles.featureIcon}>
                            <IconCheck size={14} color="#15803d" />
                          </span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <div className={styles.cardFooter}>
                      <div className={styles.priceCol}>
                        <span className={styles.priceLabel}>Estimated Rate</span>
                        <span className={styles.priceVal}>{vehicle.ratePerDay}</span>
                      </div>

                      <a
                        href={waUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.rentBtn}
                      >
                        <span>Book Vehicle</span>
                        <IconArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Official Musafir Transport Policy */}
          <section className={styles.policyCard}>
            <h3 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <IconCar size={24} color="var(--primary-color)" />
              <span>Musafir Fleet Operating Terms & Guidelines</span>
            </h3>
            <div className={styles.policyGrid}>
              <div className={styles.policyItem}>
                <h4>Professional Hill Drivers Only</h4>
                <p>
                  All vehicles are operated exclusively by verified, skilled mountain chauffeurs. Self-driving is not permitted on northern high-altitude corridors.
                </p>
              </div>
              <div className={styles.policyItem}>
                <h4>Standard Operating Hours</h4>
                <p>
                  Standard driving hours are <strong>8:00 AM – 8:00 PM</strong> for mountain road safety. Driving past 8:00 PM requires driver consent and standard night allowances.
                </p>
              </div>
              <div className={styles.policyItem}>
                <h4>CNIC & Booking Policy</h4>
                <p>
                  A copy of a valid CNIC is required for vehicle dispatch. Rental cancellation 3 days prior qualifies for a 50% refund; less than 3 days is non-refundable.
                </p>
              </div>
            </div>
          </section>
        </div>
      </ScrollReveal>
    </main>
  );
}