"use client";

import { useState } from "react";
import styles from "./Contact.module.css";
import {
  IconPhone,
  IconMail,
  IconWhatsApp,
  IconBuilding,
  IconMapPin,
  IconArrowRight
} from "../../components/Icons";
import ScrollReveal from "../../components/ScrollReveal";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSend = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `Hello Musafir Pakistan! My name is ${name} (Phone: ${phone}).\nMessage: ${message}`
    );
    window.open(`https://wa.me/923366832018?text=${text}`, "_blank");
  };

  return (
    <main className={styles.pageContainer}>
      {/* Hero Header */}
      <ScrollReveal direction="left">
        <section className={styles.heroHeader}>
          <span className={styles.badge}>Get in Touch</span>
          <h1 className={styles.heroTitle}>Contact Musafir Pakistan</h1>
          <p className={styles.heroSubtitle}>
            Inquiries regarding scheduled group departures, private family itineraries, or corporate retreats.
            Our operations offices in Karachi and Islamabad are available round the clock.
          </p>
        </section>
      </ScrollReveal>

      <ScrollReveal direction="right">
        <div className={styles.mainContent}>
          <div className={styles.contactGrid}>
            {/* Official Offices & Contacts Column */}
            <div className={styles.infoCol}>
              <div className={styles.directContacts}>
                <h3>
                  <IconPhone size={20} color="var(--primary-color)" />
                  <span>Helpline & Desk Support</span>
                </h3>
                <div className={styles.contactRow}>
                  <strong>Direct Call / WhatsApp:</strong>
                  <a href="https://wa.me/923366832018" target="_blank" rel="noopener noreferrer">
                    +92-336-683-2018
                  </a>
                </div>
                <div className={styles.contactRow}>
                  <strong>Email Address:</strong>
                  <a href="mailto:info@musafirpakistan.com">info@musafirpakistan.com</a>
                </div>
                <div className={styles.contactRow}>
                  <strong>Official Web:</strong>
                  <span>www.musafirpakistan.com</span>
                </div>
              </div>

              {/* Karachi Head Office */}
              <div className={styles.officeCard}>
                <h3>
                  <IconBuilding size={20} color="var(--secondary-color)" />
                  <span>Karachi Head Office</span>
                </h3>
                <p>
                  Office # M-7, Mezzanine Floor, Falaknaz Heights, Shahrah-e-Faisal, Near Airport Road, Karachi, Pakistan.
                </p>
                <a
                  href="https://maps.app.goo.gl/mivsPu4eiUD7EUqt7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapBtn}
                >
                  <IconMapPin size={15} />
                  <span>Open Location in Google Maps</span>
                  <IconArrowRight size={14} />
                </a>
              </div>

              {/* Islamabad Regional Office */}
              <div className={styles.officeCard}>
                <h3>
                  <IconBuilding size={20} color="var(--secondary-color)" />
                  <span>Islamabad Regional Office</span>
                </h3>
                <p>
                  Abrar Plaza, Plot# 09, Near PSO Pump, IJP Road, New Katarian Satellite Town, Islamabad.
                </p>
                <a
                  href="https://maps.app.goo.gl/szN9kBiiwfZ6CcRRA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapBtn}
                >
                  <IconMapPin size={15} />
                  <span>Open Location in Google Maps</span>
                  <IconArrowRight size={14} />
                </a>
              </div>
            </div>

            {/* Message Form Column */}
            <div className={styles.formCard}>
              <h3>Send Us a Direct Message</h3>
              <p>Fill in your query details to initiate real-time itinerary discussion with our tour coordinator.</p>

              <form onSubmit={handleSend}>
                <div className={styles.inputGroup}>
                  <label>Your Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Asad Ali"
                    className={styles.inputField}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Phone / WhatsApp Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 0333 1234567"
                    className={styles.inputField}
                    required
                  />
                </div>

                <div className={styles.inputGroup}>
                  <label>Your Inquiry / Route Requirements</label>
                  <textarea
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your destination, group size, and tentative travel dates..."
                    className={styles.inputField}
                    required
                  />
                </div>

                <button type="submit" className={styles.submitBtn}>
                  <IconWhatsApp size={18} />
                  <span>Connect via WhatsApp Desk</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </main>
  );
}