export const metadata = {
  title: "Tour Policies & Terms — Refund, Cancellation & Travel Rules",
  description:
    "Official Musafir Pakistan terms and conditions. Refund & cancellation policy, child fare tiers, booking confirmation, payment methods, packing checklist, hotel & transport policies for all northern departures.",
  alternates: {
    canonical: "/policies"
  },
  openGraph: {
    title: "Tour Policies & Terms | Musafir Pakistan",
    description: "Official refund, cancellation, booking & travel policies for all Musafir Pakistan tours.",
    url: "/policies"
  }
};

import styles from "./Policies.module.css";
import policies from "../../data/policies.json";
import {
  IconCreditCard,
  IconUsers,
  IconFileText,
  IconShield,
  IconLuggage,
  IconHotel,
  IconCar,
  IconTicket,
  IconMapPin,
  IconArrowRight,
  IconCheck
} from "../../components/Icons";

export default function PoliciesPage() {
  return (
    <main className={styles.pageContainer}>
      {/* Hero Header */}
      <section className={styles.heroHeader}>
        <span className={styles.badge}>Official Terms & Conditions</span>
        <h1 className={styles.heroTitle}>Company Policies & Travel Terms</h1>
        <p className={styles.heroSubtitle}>
          Comprehensive terms governing bookings, advance payments, cancellation refunds, group conduct,
          accommodation guidelines, and mandatory packing requirements across all Musafir Pakistan departures.
        </p>
      </section>

      <div className={styles.mainContent}>
        {/* 1. Refund & Cancellation Policy */}
        <section className={styles.policyCard}>
          <h2>
            <IconCreditCard size={22} color="var(--primary-color)" />
            <span>Refund & Cancellation Policy</span>
          </h2>
          <table className={styles.policyTable}>
            <thead>
              <tr>
                <th>Timeline / Circumstance</th>
                <th>Refund Policy</th>
              </tr>
            </thead>
            <tbody>
              {policies.refundPolicy.map((r, idx) => (
                <tr key={idx}>
                  <td><strong>{r.condition}</strong></td>
                  <td>{r.refund}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 2. Kids Policy */}
        <section className={styles.policyCard}>
          <h2>
            <IconUsers size={22} color="var(--primary-color)" />
            <span>Child & Infant Fare Policy</span>
          </h2>
          <table className={styles.policyTable}>
            <thead>
              <tr>
                <th>Age Category</th>
                <th>Fare & Seating Policy</th>
              </tr>
            </thead>
            <tbody>
              {policies.kidsPolicy.map((k, idx) => (
                <tr key={idx}>
                  <td><strong>{k.tier}</strong></td>
                  <td>{k.rule}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* 3. Booking & Payment Policy */}
        <section className={styles.policyCard}>
          <h2>
            <IconFileText size={22} color="var(--primary-color)" />
            <span>Booking Confirmation & Payment Policy</span>
          </h2>
          <ul className={styles.policyList}>
            {policies.bookingPolicy.map((rule, idx) => (
              <li key={idx}>
                <span className={styles.bulletIcon}>
                  <IconCheck size={16} color="var(--primary-color)" />
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>

          <div className={styles.paymentBox}>
            <div className={styles.bankCard}>
              <h3>1. Official Bank Accounts</h3>
              <p><strong>Title:</strong> MUSAFIR PAKISTAN</p>
              <p><strong>Account #:</strong> 0017-1008-670-633</p>
              <p style={{ marginTop: "0.75rem" }}><strong>Personal Title:</strong> ASHIR UMER KHAN</p>
              <p><strong>Account #:</strong> 0315-2793707</p>
            </div>

            <div className={styles.officeCard}>
              <h3>2. Karachi Head Office</h3>
              <p>Office # M-7, Mezzanine Floor, Falaknaz Heights, Shahrah-e-Faisal, Near Airport Road, Karachi, Pakistan.</p>
              <a
                href="https://maps.app.goo.gl/mivsPu4eiUD7EUqt7"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                <IconMapPin size={15} />
                <span>View Karachi Office Location</span>
                <IconArrowRight size={14} />
              </a>
            </div>

            <div className={styles.officeCard}>
              <h3>3. Islamabad Regional Office</h3>
              <p>Abrar Plaza, Plot# 09, Near PSO Pump, IJP Road, New Katarian Satellite Town, Islamabad.</p>
              <a
                href="https://maps.app.goo.gl/szN9kBiiwfZ6CcRRA"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mapLink}
              >
                <IconMapPin size={15} />
                <span>View Islamabad Office Location</span>
                <IconArrowRight size={14} />
              </a>
            </div>
          </div>
        </section>

        {/* 4. General Travel Policies */}
        <section className={styles.policyCard}>
          <h2>
            <IconShield size={22} color="var(--primary-color)" />
            <span>General Travel Policies & Group Code of Conduct</span>
          </h2>
          <ul className={styles.policyList}>
            {policies.generalTravelPolicies.map((rule, idx) => (
              <li key={idx}>
                <span className={styles.bulletIcon}>
                  <IconCheck size={16} color="var(--primary-color)" />
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. Essential Packing List */}
        <section className={styles.policyCard}>
          <h2>
            <IconLuggage size={22} color="var(--primary-color)" />
            <span>Essential Travel Packing Checklist</span>
          </h2>
          <div className={styles.checklistGrid}>
            {policies.packingChecklist.map((item, idx) => (
              <div key={idx} className={styles.checklistItem}>
                <IconCheck size={16} color="var(--primary-color)" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Hotel Policy */}
        <section className={styles.policyCard}>
          <h2>
            <IconHotel size={22} color="var(--primary-color)" />
            <span>Hotel & Accommodation Policies</span>
          </h2>
          <ul className={styles.policyList}>
            {policies.hotelPolicy.map((rule, idx) => (
              <li key={idx}>
                <span className={styles.bulletIcon}>
                  <IconCheck size={16} color="var(--primary-color)" />
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 7. Transport Policy */}
        <section className={styles.policyCard}>
          <h2>
            <IconCar size={22} color="var(--primary-color)" />
            <span>Transport & Fleet Rental Terms</span>
          </h2>
          <ul className={styles.policyList}>
            {policies.transportPolicy.map((rule, idx) => (
              <li key={idx}>
                <span className={styles.bulletIcon}>
                  <IconCheck size={16} color="var(--primary-color)" />
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 8. Ticketing Policy */}
        <section className={styles.policyCard}>
          <h2>
            <IconTicket size={22} color="var(--primary-color)" />
            <span>Ticketing Concierge Guidelines</span>
          </h2>
          <ul className={styles.policyList}>
            {policies.ticketsPolicy.map((rule, idx) => (
              <li key={idx}>
                <span className={styles.bulletIcon}>
                  <IconCheck size={16} color="var(--primary-color)" />
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
