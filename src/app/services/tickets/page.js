"use client";

import { useState } from "react";
import styles from "./Tickets.module.css";
import {
  IconPlane,
  IconBus,
  IconTrain,
  IconWhatsApp,
  IconCreditCard,
  IconCompass,
  IconTicket
} from "../../../components/Icons";
import ScrollReveal from "../../../components/ScrollReveal";

export default function TicketsPage() {
  const [transportType, setTransportType] = useState("Air");
  const [origin, setOrigin] = useState("Karachi");
  const [destination, setDestination] = useState("Islamabad");
  const [travelDate, setTravelDate] = useState("");
  const [passengers, setPassengers] = useState("2");

  const handleInquiry = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hello Musafir Pakistan! I would like to book/inquire about ${transportType} tickets.\n` +
      `From: ${origin}\n` +
      `To: ${destination}\n` +
      `Date: ${travelDate || "Flexible"}\n` +
      `Passengers: ${passengers}\n` +
      `Please check live availability and share seat layouts.`
    );
    window.open(`https://wa.me/923366832018?text=${msg}`, "_blank");
  };

  return (
    <main className={styles.pageContainer}>
      {/* Hero Header */}
      <ScrollReveal direction="left">
        <section className={styles.heroHeader}>
          <span className={styles.badge}>Ticketing Desk</span>
          <h1 className={styles.heroTitle}>Domestic Ticket Booking</h1>
          <p className={styles.heroSubtitle}>
            Reserve domestic flights, luxury AC road coaches, or Pakistan Railways Green Line
            tickets with synchronized tour connections and instant WhatsApp e-tickets.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal direction="right">
        <div className={styles.mainContent}>
          {/* Ticket Booking / Inquiry Card */}
          <div className={styles.ticketCard}>
            <div className={styles.tabsRow}>
              <button
                type="button"
                onClick={() => setTransportType("Air")}
                className={`${styles.tabBtn} ${transportType === "Air" ? styles.tabBtnActive : ""}`}
              >
                <IconPlane size={18} />
                <span>Domestic Flights (PIA / AirSial / Fly Jinnah)</span>
              </button>
              <button
                type="button"
                onClick={() => setTransportType("Bus")}
                className={`${styles.tabBtn} ${transportType === "Bus" ? styles.tabBtnActive : ""}`}
              >
                <IconBus size={18} />
                <span>AC Coaches (Faisal Movers / Daewoo)</span>
              </button>
              <button
                type="button"
                onClick={() => setTransportType("Train")}
                className={`${styles.tabBtn} ${transportType === "Train" ? styles.tabBtnActive : ""}`}
              >
                <IconTrain size={18} />
                <span>Green Line & AC Business Trains</span>
              </button>
            </div>

            <form onSubmit={handleInquiry}>
              <div className={styles.formGrid}>
                <div className={styles.inputGroup}>
                  <label>Departure City</label>
                  <input
                    type="text"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="e.g. Karachi, Lahore, Islamabad"
                    className={styles.inputField}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Arrival Destination</label>
                  <input
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    placeholder="e.g. Islamabad, Skardu, Gilgit"
                    className={styles.inputField}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Travel Date</label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className={styles.inputField}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Number of Passengers</label>
                  <input
                    type="number"
                    min="1"
                    max="50"
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className={styles.inputField}
                    required
                  />
                </div>
              </div>

              <button type="submit" className={styles.submitBtn}>
                <IconWhatsApp size={20} />
                <span>Check Availability via WhatsApp Desk</span>
              </button>
            </form>
          </div>

          {/* Pricing Section */}
          <section className={styles.pricingSection}>
            <div className={styles.pricingHeader}>
              <h2>Ticket Pricing (KHI - ISB)</h2>
              <p>Approximate one-way fares for Karachi to Islamabad route</p>
            </div>

            <div className={styles.pricingGrid}>
              <div className={styles.pricingCategory}>
                <h3 className={styles.categoryTitle}>
                  <IconTrain size={20} />
                  Green Line Train
                </h3>
                <div className={styles.pricingItem}>
                  <span className={styles.pricingClass}>Economy Class (Berth)</span>
                  <span className={styles.pricingPrice}>Rs: 6,550/-</span>
                </div>
                <div className={styles.pricingItem}>
                  <span className={styles.pricingClass}>AC Standard Class (Berth)</span>
                  <span className={styles.pricingPrice}>Rs: 12,350/-</span>
                </div>
                <div className={styles.pricingItem}>
                  <span className={styles.pricingClass}>Business Class (Berth)</span>
                  <span className={styles.pricingPrice}>Rs: 15,450/-</span>
                </div>
              </div>

              <div className={styles.pricingCategory}>
                <h3 className={styles.categoryTitle}>
                  <IconTrain size={20} />
                  Tezgam Train
                </h3>
                <div className={styles.pricingItem}>
                  <span className={styles.pricingClass}>Economy Class (Berth)</span>
                  <span className={styles.pricingPrice}>Rs: 5,750/-</span>
                </div>
                <div className={styles.pricingItem}>
                  <span className={styles.pricingClass}>Business Class (Berth)</span>
                  <span className={styles.pricingPrice}>Rs: 13,400/-</span>
                </div>
                <div className={styles.pricingItem}>
                  <span className={styles.pricingClass}>AC Sleeper Luxury Cabin</span>
                  <span className={styles.pricingPrice}>Rs: 17,550/-</span>
                </div>
              </div>

              <div className={styles.pricingCategory}>
                <h3 className={styles.categoryTitle}>
                  <IconTrain size={20} />
                  Pakistan Express
                </h3>
                <div className={styles.pricingItem}>
                  <span className={styles.pricingClass}>Economy Class (Berth)</span>
                  <span className={styles.pricingPrice}>Rs: 4,400/-</span>
                </div>
                <div className={styles.pricingItem}>
                  <span className={styles.pricingClass}>AC Standard Class (Berth)</span>
                  <span className={styles.pricingPrice}>Rs: 10,350/-</span>
                </div>
              </div>

              <div className={styles.pricingCategory}>
                <h3 className={styles.categoryTitle}>
                  <IconBus size={20} />
                  Kainat Bus
                </h3>
                <div className={styles.pricingItem}>
                  <span className={styles.pricingClass}>Executive Class (Seat)</span>
                  <span className={styles.pricingPrice}>Rs: 8,100/-</span>
                </div>
                <div className={styles.pricingItem}>
                  <span className={styles.pricingClass}>Business Class (Seat)</span>
                  <span className={styles.pricingPrice}>Rs: 10,100/-</span>
                </div>
                <div className={styles.pricingItem}>
                  <span className={styles.pricingClass}>Sleeper Class (Berth)</span>
                  <span className={styles.pricingPrice}>Rs: 12,600/-</span>
                </div>
              </div>

              <div className={styles.pricingCategory}>
                <h3 className={styles.categoryTitle}>
                  <IconBus size={20} />
                  Faisal Movers
                </h3>
                <div className={styles.pricingItem}>
                  <span className={styles.pricingClass}>Executive Class (Seat)</span>
                  <span className={styles.pricingPrice}>Rs: 9,800/-</span>
                </div>
                <div className={styles.pricingItem}>
                  <span className={styles.pricingClass}>Business Class (Seat)</span>
                  <span className={styles.pricingPrice}>Rs: 11,200/-</span>
                </div>
                <div className={styles.pricingItem}>
                  <span className={styles.pricingClass}>Sleeper Class (Berth)</span>
                  <span className={styles.pricingPrice}>Rs: 13,500/-</span>
                </div>
              </div>

              <div className={styles.pricingCategory}>
                <h3 className={styles.categoryTitle}>
                  <IconPlane size={20} />
                  By Air
                </h3>
                <p style={{ fontSize: "0.9rem", color: "#4b5563", lineHeight: 1.6 }}>
                  Air tickets are subject to availability. Current fares start from approx. <strong>PKR 26,000 (KHI-ISB)</strong>. For booking & latest status, contact our agent.
                </p>
              </div>
            </div>

            <div className={styles.pricingNote}>
              <strong>Note:</strong> The mentioned pricing is an approximate amount for a one-way ticket and is updated as of April 2026. Please note that prices are subject to change based on updates from Pakistan Railways and other transport authorities.
            </div>
          </section>

          {/* Benefits Row */}
          <div className={styles.benefitsRow}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <IconWhatsApp size={24} color="#15803d" />
              </div>
              <h4>E-Ticket Confirmation</h4>
              <p>Confirmed e-tickets issued directly to your WhatsApp with verified PNR and coach details.</p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <IconCompass size={24} color="#0369a1" />
              </div>
              <h4>Pre-Approved Seating</h4>
              <p>Seat layouts and coach allocations are shared with you for approval before purchase.</p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>
                <IconCreditCard size={24} color="#b45309" />
              </div>
              <h4>Transparent Service Fee</h4>
              <p>Flat PKR 200 service charge per ticket with verified payment receipts.</p>
            </div>
          </div>

          {/* Official Musafir Ticketing Policy */}
          <section className={styles.policyCard}>
            <h3 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <IconTicket size={24} color="var(--primary-color)" />
              <span>Musafir Pakistan Ticketing Desk Terms & Guidelines</span>
            </h3>
            <div className={styles.policyGrid}>
              <div className={styles.policyItem}>
                <h4>Service Fee & Issuance</h4>
                <p>
                  Ticket booking service is available upon request with a flat <strong>PKR 200 service charge per ticket</strong>. E-tickets are issued within 24 hours of payment verification.
                </p>
              </div>
              <div className={styles.policyItem}>
                <h4>Carrier Authority Policies</h4>
                <p>
                  Musafir Pakistan facilitates reservations but is not liable for operational schedule revisions or flight delays by airlines, railways, or bus authorities. Cancellations follow respective carrier guidelines.
                </p>
              </div>
              <div className={styles.policyItem}>
                <h4>Karachi Tour Departure Coordination</h4>
                <p>
                  For travelers joining group tours from Karachi, our ticketing team coordinates synchronized departures to match Islamabad tour group reporting schedules.
                </p>
              </div>
            </div>
          </section>
        </div>
      </ScrollReveal>
    </main>
  );
}