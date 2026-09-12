"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import {
  IconChevronDown,
  IconPhone,
  IconWhatsApp,
  IconSparkles,
  IconArrowRight
} from "./Icons";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMobileOpen(false);
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
    setActiveDropdown(null);
  };

  const toggleDropdown = (name) => {
    if (typeof window !== "undefined" && window.innerWidth <= 1024) {
      setActiveDropdown(activeDropdown === name ? null : name);
    }
  };

  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <header ref={navRef} className={`${styles.headerWrapper} ${scrolled ? styles.scrolled : ""}`}>
      {/* Top Utility Announcement Bar */}
      <div className={styles.topBar}>
        <div className={styles.topBarContainer}>
          <div className={styles.topBarLeft}>
            <span className={styles.pulseDot} />
            <span className={styles.topBarText}>
              Weekly Fixed Departures from Karachi & Islamabad • Verified Deluxe Hotels
            </span>
          </div>
          <div className={styles.topBarRight}>
            <a href="tel:+923366832018" className={styles.topBarLink}>
              <IconPhone size={13} color="#4ade80" />
              <span>+92 336 6832018</span>
            </a>
            <span className={styles.divider}>|</span>
            <a
              href="https://wa.me/923366832018?text=Hello%20Musafir%20Pakistan!%20I%20would%20like%20to%20inquire%20about%20a%20tour."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.topBarWhatsApp}
            >
              <IconWhatsApp size={13} />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Integrated Cinematic Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          {/* Brand Logo with clean high-contrast badge */}
          <div className={styles.logoContainer}>
            <Link href="/" className={styles.logoBadge} onClick={() => setMobileOpen(false)}>
              <Image
                src="/logo.png"
                alt="Musafir Travel and Tours"
                width={160}
                height={48}
                className={styles.logoImg}
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className={`${styles.navLinks} ${mobileOpen ? styles.mobileOpen : ""}`}>
            <Link
              href="/"
              className={styles.navItem}
              onClick={() => setMobileOpen(false)}
            >
              <span>Home</span>
            </Link>

            {/* Domestic Tours Dropdown */}
            <div
              className={`${styles.navItem} ${styles.hasDropdown} ${
                activeDropdown === "tours" ? styles.dropdownItemActive : ""
              }`}
              onClick={() => toggleDropdown("tours")}
            >
              <span className={styles.navItemLabel}>
                <span>Domestic Tours</span>
                <IconChevronDown
                  size={13}
                  className={`${styles.chevron} ${
                    activeDropdown === "tours" ? styles.chevronOpen : ""
                  }`}
                />
              </span>

              <div
                className={`${styles.dropdownMenu} ${
                  activeDropdown === "tours" ? styles.dropdownOpenMobile : ""
                }`}
              >
                <Link
                  href="/tours/group"
                  className={styles.dropdownLink}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileOpen(false);
                  }}
                >
                  Group Expeditions
                </Link>

                <Link
                  href="/tours/private"
                  className={styles.dropdownLink}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileOpen(false);
                  }}
                >
                  Private & Honeymoon
                </Link>
              </div>
            </div>

            {/* Destinations */}
            <Link
              href="/destinations"
              className={styles.navItem}
              onClick={() => setMobileOpen(false)}
            >
              <span>Destinations</span>
            </Link>

            {/* Services Dropdown */}
            <div
              className={`${styles.navItem} ${styles.hasDropdown} ${
                activeDropdown === "services" ? styles.dropdownItemActive : ""
              }`}
              onClick={() => toggleDropdown("services")}
            >
              <span className={styles.navItemLabel}>
                <span>Services</span>
                <IconChevronDown
                  size={13}
                  className={`${styles.chevron} ${
                    activeDropdown === "services" ? styles.chevronOpen : ""
                  }`}
                />
              </span>

              <div
                className={`${styles.dropdownMenu} ${
                  activeDropdown === "services" ? styles.dropdownOpenMobile : ""
                }`}
              >
                <Link
                  href="/services/hotels"
                  className={styles.dropdownLink}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileOpen(false);
                  }}
                >
                  Partner Hotels & Resorts
                </Link>

                <Link
                  href="/services/transport"
                  className={styles.dropdownLink}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileOpen(false);
                  }}
                >
                  Rent a Transport
                </Link>

                <Link
                  href="/services/tickets"
                  className={styles.dropdownLink}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileOpen(false);
                  }}
                >
                  Air & Train Tickets
                </Link>
              </div>
            </div>

            {/* Gallery & Reviews Dropdown */}
            <div
              className={`${styles.navItem} ${styles.hasDropdown} ${
                activeDropdown === "gallery" ? styles.dropdownItemActive : ""
              }`}
              onClick={() => toggleDropdown("gallery")}
            >
              <span className={styles.navItemLabel}>
                <span>Gallery & Reviews</span>
                <IconChevronDown
                  size={13}
                  className={`${styles.chevron} ${
                    activeDropdown === "gallery" ? styles.chevronOpen : ""
                  }`}
                />
              </span>

              <div
                className={`${styles.dropdownMenu} ${
                  activeDropdown === "gallery" ? styles.dropdownOpenMobile : ""
                }`}
              >
                <Link
                  href="/gallery/photos"
                  className={styles.dropdownLink}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileOpen(false);
                  }}
                >
                  Trip Photo Gallery
                </Link>

                <Link
                  href="/gallery/reviews"
                  className={styles.dropdownLink}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMobileOpen(false);
                  }}
                >
                  Client Reviews
                </Link>
              </div>
            </div>

            {/* Contact */}
            <Link
              href="/contact"
              className={styles.navItem}
              onClick={() => setMobileOpen(false)}
            >
              <span>Contact Us</span>
            </Link>

            {/* Mobile Call-To-Action in Drawer */}
            <div className={styles.mobileActions}>
              <Link
                href="/custom-trip"
                className={styles.customTripBtn}
                onClick={() => setMobileOpen(false)}
              >
                <IconSparkles size={16} />
                <span>Plan Your Custom Trip</span>
              </Link>
              <a
                href="https://wa.me/923366832018"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.mobileWhatsAppBtn}
              >
                <IconWhatsApp size={16} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Desktop Right CTA Action */}
          <div className={styles.navActionWrapper}>
            <Link href="/custom-trip" className={styles.customTripBtn}>
              <IconSparkles size={15} />
              <span>Plan Your Custom Trip</span>
            </Link>
          </div>

          {/* Hamburger Icon */}
          <button
            type="button"
            className={`${styles.mobileMenuIcon} ${mobileOpen ? styles.menuActive : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
            <span className={styles.hamburgerLine}></span>
          </button>
        </div>
      </nav>
    </header>
  );
}
