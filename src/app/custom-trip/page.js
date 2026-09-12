"use client";

import { useState } from "react";
import { IconWhatsApp, IconCalendar, IconMapPin, IconUsers, IconShield } from "../../components/Icons";
import ScrollReveal from "../../components/ScrollReveal";

export default function CustomTrip() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [duration, setDuration] = useState("");
  const [adults, setAdults] = useState("2");
  const [kids, setKids] = useState("0");
  const [rooms, setRooms] = useState("1");
  const [instructions, setInstructions] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = encodeURIComponent(
      `*Custom Trip Request — Musafir Pakistan*\n\n` +
      `*Lead Traveler:* ${name}\n` +
      `*Contact/WhatsApp:* ${phone}\n` +
      `*Destinations:* ${destination}\n` +
      `*Expected Start Date:* ${startDate || "Flexible"}\n` +
      `*Duration:* ${duration} Days\n` +
      `*Travelers:* ${adults} Adults, ${kids} Kids\n` +
      `*Rooms Required:* ${rooms}\n` +
      (instructions ? `*Special Preferences:* ${instructions}\n\n` : "\n") +
      `Please provide a customized itinerary with transport and hotel quotation.`
    );
    window.open(`https://wa.me/923366832018?text=${text}`, "_blank");
  };

  return (
    <main style={{ padding: "clamp(3rem, 6vw, 5rem) clamp(1rem, 4vw, 2rem)", maxWidth: "880px", margin: "0 auto", minHeight: "85vh" }}>
      <ScrollReveal direction="left">
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span style={{ color: "var(--primary-color)", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: "0.85rem" }}>
            Bespoke Travel Planning
          </span>
          <h1 style={{ fontSize: "clamp(1.8rem, 5vw, 3rem)", fontWeight: "900", color: "var(--secondary-color)", marginTop: "0.5rem", marginBottom: "1rem", lineHeight: 1.15 }}>
            Plan Your Custom Tour
          </h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "clamp(0.95rem, 2vw, 1.1rem)", maxWidth: "620px", margin: "0 auto", lineHeight: "1.6" }}>
            Specify your destinations, preferred dates, and group size. Our northern operations desk in Islamabad will structure a personalized itinerary with dedicated vehicle, fuel, driver, and verified hotel stays.
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal direction="right">
      <form
        onSubmit={handleSubmit}
        style={{
          display: "grid",
          gap: "1.8rem",
          backgroundColor: "white",
          padding: "clamp(1.25rem, 4vw, 3.5rem)",
          borderRadius: "20px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.06)",
          border: "1px solid #e2ece5"
        }}
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 240px), 1fr))", gap: "1.25rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "700", color: "#374151", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Lead Traveler Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Asad Ali"
              style={{ width: "100%", padding: "1.1rem", borderRadius: "10px", border: "1px solid #d1d5db", fontSize: "1rem", outline: "none" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "700", color: "#374151", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Contact / WhatsApp Number
            </label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+92 333 1234567"
              style={{ width: "100%", padding: "1.1rem", borderRadius: "10px", border: "1px solid #d1d5db", fontSize: "1rem", outline: "none" }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "700", color: "#374151", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Desired Destination(s) & Route
          </label>
          <input
            type="text"
            required
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g. Skardu, Hunza Valley, Fairy Meadows, Swat"
            style={{ width: "100%", padding: "1.1rem", borderRadius: "10px", border: "1px solid #d1d5db", fontSize: "1rem", outline: "none" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))", gap: "1.5rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "700", color: "#374151", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Tentative Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ width: "100%", padding: "1.1rem", borderRadius: "10px", border: "1px solid #d1d5db", fontSize: "1rem", outline: "none" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "700", color: "#374151", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Trip Duration (Days)
            </label>
            <input
              type="number"
              required
              min="1"
              max="30"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="e.g. 7"
              style={{ width: "100%", padding: "1.1rem", borderRadius: "10px", border: "1px solid #d1d5db", fontSize: "1rem", outline: "none" }}
            />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: "1.5rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "700", color: "#374151", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Adults
            </label>
            <input
              type="number"
              min="1"
              value={adults}
              onChange={(e) => setAdults(e.target.value)}
              style={{ width: "100%", padding: "1.1rem", borderRadius: "10px", border: "1px solid #d1d5db", fontSize: "1rem", outline: "none" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "700", color: "#374151", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Children (0–8 Yrs)
            </label>
            <input
              type="number"
              min="0"
              value={kids}
              onChange={(e) => setKids(e.target.value)}
              style={{ width: "100%", padding: "1.1rem", borderRadius: "10px", border: "1px solid #d1d5db", fontSize: "1rem", outline: "none" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "700", color: "#374151", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
              Rooms Required
            </label>
            <input
              type="number"
              min="1"
              value={rooms}
              onChange={(e) => setRooms(e.target.value)}
              style={{ width: "100%", padding: "1.1rem", borderRadius: "10px", border: "1px solid #d1d5db", fontSize: "1rem", outline: "none" }}
            />
          </div>
        </div>

        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "700", color: "#374151", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Special Requirements / Accommodation Preferences
          </label>
          <textarea
            rows={4}
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="e.g. Deluxe 4-star hotels preferred, 4x4 Prado SUV required, bonfire night on day 3, airport transfers..."
            style={{ width: "100%", padding: "1.1rem", borderRadius: "10px", border: "1px solid #d1d5db", fontSize: "1rem", fontFamily: "inherit", outline: "none" }}
          ></textarea>
        </div>

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "1.1rem",
            backgroundColor: "#25d366",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "clamp(0.92rem, 3vw, 1.1rem)",
            cursor: "pointer",
            fontWeight: "800",
            boxShadow: "0 8px 25px rgba(37, 211, 102, 0.35)",
            transition: "all 0.3s ease",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            textAlign: "center"
          }}
        >
          <IconWhatsApp size={20} />
          <span>Submit Custom Tour Request via WhatsApp</span>
        </button>
      </form>
      </ScrollReveal>
    </main>
  );
}