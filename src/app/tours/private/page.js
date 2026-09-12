"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./PrivateTours.module.css";
import {
  IconWhatsApp,
  IconCalendar,
  IconMapPin,
  IconUsers,
  IconShield,
  IconCar,
  IconCheck,
  IconSparkles,
  IconPhone
} from "../../../components/Icons";
import ScrollReveal from "../../../components/ScrollReveal";

export default function PrivateToursPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [tripType, setTripType] = useState("Honeymoon & Couple Escape");
  const [destinations, setDestinations] = useState("Hunza Valley & Khunjerab Pass");
  const [vehicle, setVehicle] = useState("Toyota Prado TX / V8 (4x4 Luxury SUV)");
  const [hotelTier, setHotelTier] = useState("4-Star Deluxe Boutique Stays");
  const [departureCity, setDepartureCity] = useState("Islamabad");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("7");
  const [adults, setAdults] = useState("2");
  const [kids, setKids] = useState("0");
  const [rooms, setRooms] = useState("1");
  const [specialNotes, setSpecialNotes] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedMessage = encodeURIComponent(
      `*🌟 Private & Custom Tour Planning Request — Musafir Pakistan*\n\n` +
      `*Lead Traveler:* ${name}\n` +
      `*WhatsApp/Phone:* ${phone}\n` +
      `*Trip Category:* ${tripType}\n` +
      `*Destination(s):* ${destinations}\n` +
      `*Vehicle Preference:* ${vehicle}\n` +
      `*Hotel Preference:* ${hotelTier}\n` +
      `*Departure City:* ${departureCity}\n` +
      `*Expected Start Date:* ${startDate || "Flexible"}\n` +
      `*Trip Duration:* ${duration} Days\n` +
      `*Travelers:* ${adults} Adults, ${kids} Children\n` +
      `*Rooms Required:* ${rooms} Room(s)\n` +
      (specialNotes ? `*Special Preferences:* ${specialNotes}\n\n` : "\n") +
      `Please provide a complete private custom itinerary with vehicle, driver, and hotel package quotation.`
    );
    window.open(`https://wa.me/923366832018?text=${formattedMessage}`, "_blank");
  };

  return (
    <main className={styles.pageContainer}>
      {/* Cinematic Hero Banner */}
      <ScrollReveal direction="left">
        <section className={styles.heroBanner}>
          <div className={styles.heroBg}>
            <Image
              src="/images/private-tours-banner.jpg"
              alt="Private and Honeymoon Tours in Northern Pakistan"
              fill
              style={{ objectFit: "cover" }}
              priority
              sizes="100vw"
            />
          </div>
          <div className={styles.heroOverlay} />

          <div className={styles.heroInner}>
            {/* Breadcrumbs */}
            <div className={styles.breadcrumbs}>
              <Link href="/" className={styles.breadcrumbLink}>Home</Link>
              <span>/</span>
              <span className={styles.breadcrumbLink}>Domestic Tours</span>
              <span>/</span>
              <span className={styles.breadcrumbCurrent}>Private & Honeymoon</span>
            </div>

            <span className={styles.heroBadge}>
              <IconSparkles size={14} />
              <span>Dedicated 4x4 Prado & Deluxe Chalets • 100% Customized</span>
            </span>

            <h1 className={styles.heroTitle}>Private & Honeymoon Expeditions</h1>

            <p className={styles.heroSubtitle}>
              Tailor-made itineraries crafted exclusively for your schedule. Travel with dedicated private 4x4 Prado or
              Grand Cabin transport, handpicked boutique luxury resorts, a private hill chauffeur, and flexible departure dates.
            </p>
          </div>
        </section>
      </ScrollReveal>

      {/* Main Planning Form & Trust Guidelines Section */}
      <ScrollReveal direction="right">
        <section className={styles.formSection}>
          <div className={styles.layoutGrid}>
            {/* Custom Tour Planning Form */}
            <div className={styles.formCard}>
              <div className={styles.formHeader}>
                <span className={styles.formTag}>Bespoke Private Tour Builder</span>
                <h2 className={styles.formTitle}>Plan Your Private Custom Itinerary</h2>
                <p className={styles.formDesc}>
                  Tell us your travel vision. Our northern expedition desk in Islamabad will design an end-to-end itinerary
                  with private transport, verified hotels, fuel, and toll taxes included.
                </p>
              </div>

              <form onSubmit={handleSubmit} className={styles.formGrid}>
                {/* Traveler Info */}
                <div className={styles.rowTwo}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Lead Traveler Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Asad Ali"
                      className={styles.inputField}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>WhatsApp / Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 336 1234567"
                      className={styles.inputField}
                    />
                  </div>
                </div>

                {/* Trip Type & Destinations */}
                <div className={styles.rowTwo}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Trip Category</label>
                    <select
                      value={tripType}
                      onChange={(e) => setTripType(e.target.value)}
                      className={styles.selectField}
                    >
                      <option>Honeymoon & Couple Escape</option>
                      <option>Private Family Vacation</option>
                      <option>Executive / VIP Expedition</option>
                      <option>Adventure & Photography Group</option>
                    </select>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Preferred Destination(s)</label>
                    <select
                      value={destinations}
                      onChange={(e) => setDestinations(e.target.value)}
                      className={styles.selectField}
                    >
                      <option>Hunza Valley & Khunjerab Pass</option>
                      <option>Skardu Valley, Deosai & Shigar</option>
                      <option>Swat, Kalam & Malam Jabba</option>
                      <option>Neelum Valley & Arang Kel (Kashmir)</option>
                      <option>Kumrat Valley & Jahaz Banda</option>
                      <option>Fairy Meadows & Nanga Parbat Base</option>
                      <option>Combined Multi-Valley Route (Custom)</option>
                    </select>
                  </div>
                </div>

                {/* Vehicle & Hotel Tier */}
                <div className={styles.rowTwo}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Dedicated Vehicle Type</label>
                    <select
                      value={vehicle}
                      onChange={(e) => setVehicle(e.target.value)}
                      className={styles.selectField}
                    >
                      <option>Toyota Prado TX / V8 (4x4 Luxury SUV)</option>
                      <option>Toyota Grand Cabin (High-Roof Executive Van)</option>
                      <option>Toyota Corolla / Yaris Sedan</option>
                      <option>Toyota Saloon Coaster (for 15+ Guests)</option>
                    </select>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Hotel Accommodation Standard</label>
                    <select
                      value={hotelTier}
                      onChange={(e) => setHotelTier(e.target.value)}
                      className={styles.selectField}
                    >
                      <option>5-Star / Luxury Boutique Resorts (Arcadian, Serena, etc.)</option>
                      <option>4-Star Deluxe Mountain Stays (Pre-screened)</option>
                      <option>3-Star Clean Family Hotels (Budget Friendly)</option>
                    </select>
                  </div>
                </div>

                {/* Dates & Duration */}
                <div className={styles.rowThree}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Departure City</label>
                    <select
                      value={departureCity}
                      onChange={(e) => setDepartureCity(e.target.value)}
                      className={styles.selectField}
                    >
                      <option>Islamabad / Rawalpindi</option>
                      <option>Lahore</option>
                      <option>Karachi (Via Flights / Train)</option>
                      <option>Direct Skardu / Gilgit Airport Pickup</option>
                    </select>
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Tentative Start Date</label>
                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className={styles.inputField}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Duration (Days)</label>
                    <input
                      type="number"
                      min="2"
                      max="30"
                      required
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className={styles.inputField}
                    />
                  </div>
                </div>

                {/* Guests Count */}
                <div className={styles.rowThree}>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Adults (12+ Yrs)</label>
                    <input
                      type="number"
                      min="1"
                      value={adults}
                      onChange={(e) => setAdults(e.target.value)}
                      className={styles.inputField}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Children (0–11 Yrs)</label>
                    <input
                      type="number"
                      min="0"
                      value={kids}
                      onChange={(e) => setKids(e.target.value)}
                      className={styles.inputField}
                    />
                  </div>
                  <div className={styles.fieldGroup}>
                    <label className={styles.fieldLabel}>Rooms Required</label>
                    <input
                      type="number"
                      min="1"
                      value={rooms}
                      onChange={(e) => setRooms(e.target.value)}
                      className={styles.inputField}
                    />
                  </div>
                </div>

                {/* Special Requests */}
                <div className={styles.fieldGroup}>
                  <label className={styles.fieldLabel}>Special Preferences / Custom Requests</label>
                  <textarea
                    rows={3}
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    placeholder="e.g. Honeymoon candle-light dinner, bonfire night, river-facing room, photographer, flexible daily timings..."
                    className={styles.textareaField}
                  />
                </div>

                {/* Submit CTA */}
                <button type="submit" className={styles.submitBtn}>
                  <IconWhatsApp size={20} />
                  <span>Submit Private Plan & Get Custom Quote</span>
                </button>
              </form>
            </div>

            {/* Sidebar Guidelines & Trust Badges */}
            <div className={styles.sidebarCol}>
              {/* Why Musafir Private Tours */}
              <div className={styles.trustBox}>
                <h3 className={styles.trustBoxTitle}>
                  <IconShield size={20} color="#16a34a" />
                  <span>The Musafir Private Guarantee</span>
                </h3>
                <div className={styles.trustList}>
                  <div className={styles.trustListItem}>
                    <div className={styles.trustIconWrap}>
                      <IconCar size={14} color="#166534" />
                    </div>
                    <div className={styles.trustText}>
                      <strong>100% Dedicated Private Vehicle</strong>
                      <span>No sharing. Your vehicle, driver, and schedule are exclusively yours for the entire trip.</span>
                    </div>
                  </div>

                  <div className={styles.trustListItem}>
                    <div className={styles.trustIconWrap}>
                      <IconCheck size={14} color="#166534" />
                    </div>
                    <div className={styles.trustText}>
                      <strong>Pre-Screened Partner Hotels</strong>
                      <span>Tested for continuous hot water, clean linens, functional heaters, and power backup.</span>
                    </div>
                  </div>

                  <div className={styles.trustListItem}>
                    <div className={styles.trustIconWrap}>
                      <IconUsers size={14} color="#166534" />
                    </div>
                    <div className={styles.trustText}>
                      <strong>Experienced Mountain Chauffeurs</strong>
                      <span>Senior licensed drivers with comprehensive knowledge of high-altitude passes and roads.</span>
                    </div>
                  </div>

                  <div className={styles.trustListItem}>
                    <div className={styles.trustIconWrap}>
                      <IconSparkles size={14} color="#166534" />
                    </div>
                    <div className={styles.trustText}>
                      <strong>Tailored Day-by-Day Flexibility</strong>
                      <span>Stop wherever you want for photos, tea, and meals at your family’s natural pace.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Indicative Sample Rates */}
              <div className={styles.sampleRatesCard}>
                <h3 className={styles.sampleTitle}>Popular Private Itinerary Estimates</h3>
                <p className={styles.sampleSub}>
                  Indicative private package pricing including 4x4 Prado, fuel, tolls, driver, and deluxe hotels:
                </p>
                <div className={styles.sampleList}>
                  <div className={styles.sampleItem}>
                    <div className={styles.sampleName}>
                      <strong>Swat & Kalam Luxury Honeymoon</strong>
                      <span>5 Days / 4 Nights • Private 4x4 Prado</span>
                    </div>
                    <span className={styles.samplePrice}>PKR 95,000+</span>
                  </div>

                  <div className={styles.sampleItem}>
                    <div className={styles.sampleName}>
                      <strong>Hunza & Khunjerab Royal Escape</strong>
                      <span>7 Days / 6 Nights • Private 4x4 Prado</span>
                    </div>
                    <span className={styles.samplePrice}>PKR 145,000+</span>
                  </div>

                  <div className={styles.sampleItem}>
                    <div className={styles.sampleName}>
                      <strong>Skardu & Deosai Explorer</strong>
                      <span>8 Days / 7 Nights • Private 4x4 Prado</span>
                    </div>
                    <span className={styles.samplePrice}>PKR 185,000+</span>
                  </div>
                </div>
              </div>

              {/* Direct Support Contact */}
              <div className={styles.supportCard}>
                <div className={styles.supportInfo}>
                  <h4>Need Immediate Assistance?</h4>
                  <p>Speak directly with our chief trip planner.</p>
                </div>
                <a href="tel:+923366832018" className={styles.supportCallLink}>
                  <IconPhone size={14} style={{ display: "inline", marginRight: "4px" }} />
                  <span>+92 336 6832018</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
    </main>
  );
}