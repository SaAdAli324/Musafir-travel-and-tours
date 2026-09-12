"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import styles from "./Footer.module.css";
import {
  IconPhone,
  IconWhatsApp,
  IconShield,
  IconMapPin,
  IconArrowRight,
  IconSparkles
} from "./Icons";

export default function Footer() {
  const pathname = usePathname();

  if (pathname && pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className={styles.footer}>
      {/* Top Pre-Footer Highlights Bar */}
      <div className={styles.topHighlightsBar}>
        <div className={styles.highlightsContainer}>
          <div className={styles.highlightItem}>
            <IconShield size={20} color="#4ade80" />
            <div>
              <strong>DTS Licensed Operator</strong>
              <span>Registered with Govt. of Pakistan</span>
            </div>
          </div>
          <div className={styles.highlightItem}>
            <IconWhatsApp size={20} color="#4ade80" />
            <div>
              <strong>24/7 Ground Operations</strong>
              <span>Active remote coordination in every valley</span>
            </div>
          </div>
          <div className={styles.highlightItem}>
            <IconSparkles size={20} color="#4ade80" />
            <div>
              <strong>Transparent Pricing</strong>
              <span>No hidden taxes, surprise charges, or commissions</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className={styles.container}>
        {/* Brand Information Column */}
        <div className={styles.brandCol}>
          <div className={styles.logoBadgeWrap}>
            <Image
              src="/logo.png"
              alt="Musafir Pakistan Tours & Travels"
              width={160}
              height={50}
              className={styles.logoImg}
            />
          </div>
          <p className={styles.brandDesc}>
            Musafir Pakistan is a licensed northern tour operator crafting weekly fixed group departures,
            bespoke 4x4 Prado family honeymoons, executive transport rentals, and pre-screened hotel stays across Gilgit-Baltistan, KPK, and Azad Kashmir.
          </p>
          <div className={styles.licensePill}>
            <IconShield size={13} color="#22c55e" />
            <span>Govt. of Pakistan DTS License Verified</span>
          </div>
        </div>

        {/* Explore Tours Column */}
        <div className={styles.navCol}>
          <h4 className={styles.colTitle}>Explore Tours</h4>
          <ul className={styles.linkList}>
            <li><Link href="/tours/group" className={styles.footerLink}>Group Expeditions</Link></li>
            <li><Link href="/tours/private" className={styles.footerLink}>Private & Honeymoon</Link></li>
            <li><Link href="/custom-trip" className={styles.footerLink}>Custom Trip Planner</Link></li>
            <li><Link href="/destinations" className={styles.footerLink}>Destination Guides</Link></li>
            <li><Link href="/gallery/photos" className={styles.footerLink}>Trip Photo Gallery</Link></li>
          </ul>
        </div>

        {/* Services & Stays Column */}
        <div className={styles.navCol}>
          <h4 className={styles.colTitle}>Services & Hubs</h4>
          <ul className={styles.linkList}>
            <li><Link href="/services/hotels" className={styles.footerLink}>Partner Hotels & Resorts</Link></li>
            <li><Link href="/services/transport" className={styles.footerLink}>Rent a Transport (4x4 & Fleet)</Link></li>
            <li><Link href="/services/tickets" className={styles.footerLink}>Domestic Tickets (Air/Bus/Train)</Link></li>
            <li><Link href="/gallery/reviews" className={styles.footerLink}>Client Reviews & Ratings</Link></li>
            <li><Link href="/policies" className={styles.footerLink}>Official Tour Policies</Link></li>
          </ul>
        </div>

        {/* Offices & Contact Column */}
        <div className={styles.contactCol}>
          <h4 className={styles.colTitle}>Contact & Offices</h4>
          
          <div className={styles.contactItem}>
            <IconPhone size={15} color="#4ade80" />
            <div>
              <span className={styles.contactLabel}>Direct Hotline:</span>
              <a href="tel:+923366832018" className={styles.contactVal}>+92 336 6832018</a>
            </div>
          </div>

          <div className={styles.contactItem}>
            <IconWhatsApp size={15} color="#4ade80" />
            <div>
              <span className={styles.contactLabel}>WhatsApp Desk:</span>
              <a
                href="https://wa.me/923366832018?text=Hello%20Musafir%20Pakistan!%20I%20have%20an%20inquiry%20regarding%20travel."
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactVal}
              >
                +92 336 6832018
              </a>
            </div>
          </div>

          <div className={styles.contactItem}>
            <IconMapPin size={15} color="#94a3b8" />
            <div>
              <span className={styles.contactLabel}>Karachi Office:</span>
              <span className={styles.officeText}>Mezzanine Floor, Falaknaz Heights, Shahrah-e-Faisal</span>
            </div>
          </div>

          <div className={styles.contactItem}>
            <IconMapPin size={15} color="#94a3b8" />
            <div>
              <span className={styles.contactLabel}>Islamabad Office:</span>
              <span className={styles.officeText}>Abrar Plaza, Plot# 09, IJP Road, New Katarian</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Legal Bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <p className={styles.copyrightText}>
            &copy; {new Date().getFullYear()} Musafir Pakistan Tours & Travels. All Rights Reserved. DTS Licensed Northern Operator.
          </p>
          <div className={styles.bottomLinks}>
            <Link href="/policies" className={styles.bottomLink}>Terms & Policies</Link>
            <span className={styles.bottomDivider}>•</span>
            <Link href="/contact" className={styles.bottomLink}>Customer Support</Link>
            <span className={styles.bottomDivider}>•</span>
            <Link href="/custom-trip" className={styles.bottomLink}>Custom Quote</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
