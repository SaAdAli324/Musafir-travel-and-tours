"use client";

import { useState } from "react";
import styles from "./TourDetails.module.css";
import {
  IconCalendar,
  IconCheck,
  IconCross,
  IconUtensils,
  IconSparkles,
  IconLuggage,
  IconFileText,
  IconCreditCard,
  IconShield,
  IconChevronDown
} from "../../../components/Icons";

export default function TourAccordionSections({ pkg, policies }) {
  // All accordion dropdown states
  const [openSections, setOpenSections] = useState({
    itinerary: false,
    inclusions: false,
    menu: false,
    addons: false,
    checklist: false,
    policies: false,
    conduct: false
  });

  const toggleSection = (sectionKey) => {
    setOpenSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey]
    }));
  };

  const areAllOpen = Object.values(openSections).every(Boolean);

  const toggleAll = () => {
    const nextState = !areAllOpen;
    setOpenSections({
      itinerary: nextState,
      inclusions: nextState,
      menu: nextState,
      addons: nextState,
      checklist: nextState,
      policies: nextState,
      conduct: nextState
    });
  };

  return (
    <div className={styles.accordionContainer}>
      <div className={styles.accordionMasterHeader}>
        <div className={styles.accordionHeaderTitle}>
          <h3>Tour Specifications & Logistics Details</h3>
          <p>Click any dropdown below to inspect day-by-day schedules, menus, and policies</p>
        </div>
        <button
          type="button"
          onClick={toggleAll}
          className={styles.toggleAllBtn}
        >
          {areAllOpen ? "Collapse All Details" : "Expand All Details"}
        </button>
      </div>

      {/* 1. Day-by-Day Route Itinerary Dropdown */}
      <div className={`${styles.accordionCard} ${openSections.itinerary ? styles.accordionCardOpen : ""}`}>
        <button
          type="button"
          className={styles.accordionTrigger}
          onClick={() => toggleSection("itinerary")}
          aria-expanded={openSections.itinerary}
        >
          <div className={styles.triggerLeft}>
            <span className={styles.triggerIconWrap}>
              <IconCalendar size={20} color="var(--primary-color)" />
            </span>
            <div className={styles.triggerText}>
              <span className={styles.triggerTitle}>Day-by-Day Route Itinerary</span>
              <span className={styles.triggerSubtitle}>
                {pkg.duration.days} Days / {pkg.duration.nights} Nights Detailed Schedule
              </span>
            </div>
          </div>
          <div className={styles.triggerRight}>
            <span className={styles.triggerBadge}>{pkg.routePlan.length} Days</span>
            <IconChevronDown
              size={18}
              className={`${styles.accordionChevron} ${openSections.itinerary ? styles.chevronRotated : ""}`}
            />
          </div>
        </button>

        {openSections.itinerary && (
          <div className={styles.accordionContent}>
            <div className={styles.timeline}>
              {pkg.routePlan.map((dayPlan) => (
                <div key={dayPlan.day} className={styles.timelineItem}>
                  <div className={styles.timelineMarker}>
                    <span>Day {dayPlan.day}</span>
                  </div>
                  <div className={styles.timelineCard}>
                    <h4 className={styles.dayTitle}>{dayPlan.title}</h4>
                    <p className={styles.dayDesc}>{dayPlan.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. Inclusions & Exclusions Comparison Dropdown */}
      <div className={`${styles.accordionCard} ${openSections.inclusions ? styles.accordionCardOpen : ""}`}>
        <button
          type="button"
          className={styles.accordionTrigger}
          onClick={() => toggleSection("inclusions")}
          aria-expanded={openSections.inclusions}
        >
          <div className={styles.triggerLeft}>
            <span className={styles.triggerIconWrap}>
              <IconFileText size={20} color="var(--primary-color)" />
            </span>
            <div className={styles.triggerText}>
              <span className={styles.triggerTitle}>Package Inclusions & Exclusions</span>
              <span className={styles.triggerSubtitle}>
                What is fully covered vs personal expense responsibilities
              </span>
            </div>
          </div>
          <div className={styles.triggerRight}>
            <span className={styles.triggerBadge}>Coverage Breakdown</span>
            <IconChevronDown
              size={18}
              className={`${styles.accordionChevron} ${openSections.inclusions ? styles.chevronRotated : ""}`}
            />
          </div>
        </button>

        {openSections.inclusions && (
          <div className={styles.accordionContent}>
            <div className={styles.inclusionsGrid}>
              <div className={styles.includeBox}>
                <div className={styles.boxHeaderGreen}>
                  <IconCheck size={18} color="#166534" />
                  <span>Included in Package</span>
                </div>
                <ul className={styles.checkList}>
                  {pkg.inclusions.map((item, idx) => (
                    <li key={idx}>
                      <span className={styles.checkIcon}><IconCheck size={16} /></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.excludeBox}>
                <div className={styles.boxHeaderGrey}>
                  <IconCross size={18} color="#dc2626" />
                  <span>Not Included</span>
                </div>
                <ul className={styles.crossList}>
                  {pkg.exclusions.map((item, idx) => (
                    <li key={idx}>
                      <span className={styles.crossIcon}><IconCross size={16} /></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Complimentary Meal Plan Dropdown */}
      {pkg.menu && (
        <div className={`${styles.accordionCard} ${openSections.menu ? styles.accordionCardOpen : ""}`}>
          <button
            type="button"
            className={styles.accordionTrigger}
            onClick={() => toggleSection("menu")}
            aria-expanded={openSections.menu}
          >
            <div className={styles.triggerLeft}>
              <span className={styles.triggerIconWrap}>
                <IconUtensils size={20} color="var(--primary-color)" />
              </span>
              <div className={styles.triggerText}>
                <span className={styles.triggerTitle}>Complimentary Meal Plan</span>
                <span className={styles.triggerSubtitle}>
                  Daily fresh breakfast and hot dinner menu
                </span>
              </div>
            </div>
            <div className={styles.triggerRight}>
              <span className={styles.triggerBadge}>Breakfast & Dinner</span>
              <IconChevronDown
                size={18}
                className={`${styles.accordionChevron} ${openSections.menu ? styles.chevronRotated : ""}`}
              />
            </div>
          </button>

          {openSections.menu && (
            <div className={styles.accordionContent}>
              <div className={styles.menuGrid}>
                <div className={styles.menuCard}>
                  <h4 className={styles.menuCardTitle}>Daily Breakfast</h4>
                  <ul className={styles.menuItems}>
                    {pkg.menu.breakfast.map((item, idx) => (
                      <li key={idx}>
                        <span className={styles.bulletDot}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={styles.menuCard}>
                  <h4 className={styles.menuCardTitle}>Buffet Dinner</h4>
                  <ul className={styles.menuItems}>
                    {pkg.menu.dinner.map((item, idx) => (
                      <li key={idx}>
                        <span className={styles.bulletDot}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <p className={styles.menuNote}>
                * Note: Meal plans operate on a rotational basis with fresh local preparation in partner hotel dining rooms.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 4. Optional Upgrades & Add-ons Dropdown */}
      {pkg.addOns && pkg.addOns.length > 0 && (
        <div className={`${styles.accordionCard} ${openSections.addons ? styles.accordionCardOpen : ""}`}>
          <button
            type="button"
            className={styles.accordionTrigger}
            onClick={() => toggleSection("addons")}
            aria-expanded={openSections.addons}
          >
            <div className={styles.triggerLeft}>
              <span className={styles.triggerIconWrap}>
                <IconSparkles size={20} color="var(--primary-color)" />
              </span>
              <div className={styles.triggerText}>
                <span className={styles.triggerTitle}>Optional Upgrades & Add-on Services</span>
                <span className={styles.triggerSubtitle}>
                  Dedicated 4x4 jeeps, rafting, and room heating facilities
                </span>
              </div>
            </div>
            <div className={styles.triggerRight}>
              <span className={styles.triggerBadge}>{pkg.addOns.length} Upgrades</span>
              <IconChevronDown
                size={18}
                className={`${styles.accordionChevron} ${openSections.addons ? styles.chevronRotated : ""}`}
              />
            </div>
          </button>

          {openSections.addons && (
            <div className={styles.accordionContent}>
              <div className={styles.addonsList}>
                {pkg.addOns.map((addon, idx) => (
                  <div key={idx} className={styles.addonCard}>
                    <div className={styles.addonMain}>
                      <h5>{addon.service}</h5>
                      <p>{addon.description}</p>
                      {addon.limit && (
                        <span className={styles.addonLimit}>{addon.limit}</span>
                      )}
                    </div>
                    <div className={styles.addonPriceTag}>
                      <span>+ PKR {addon.rates.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5. Recommended Packing Checklist Dropdown */}
      {policies.packingChecklist && policies.packingChecklist.length > 0 && (
        <div className={`${styles.accordionCard} ${openSections.checklist ? styles.accordionCardOpen : ""}`}>
          <button
            type="button"
            className={styles.accordionTrigger}
            onClick={() => toggleSection("checklist")}
            aria-expanded={openSections.checklist}
          >
            <div className={styles.triggerLeft}>
              <span className={styles.triggerIconWrap}>
                <IconLuggage size={20} color="var(--primary-color)" />
              </span>
              <div className={styles.triggerText}>
                <span className={styles.triggerTitle}>Recommended Packing Checklist</span>
                <span className={styles.triggerSubtitle}>
                  Essential gear recommended by our mountain guides
                </span>
              </div>
            </div>
            <div className={styles.triggerRight}>
              <span className={styles.triggerBadge}>Packing Guide</span>
              <IconChevronDown
                size={18}
                className={`${styles.accordionChevron} ${openSections.checklist ? styles.chevronRotated : ""}`}
              />
            </div>
          </button>

          {openSections.checklist && (
            <div className={styles.accordionContent}>
              <p style={{ color: "#64748b", fontSize: "0.92rem", marginBottom: "1.2rem" }}>
                Essential gear recommended by our tour leads for high-altitude mountain travel:
              </p>
              <div className={styles.checklistGrid}>
                {policies.packingChecklist.map((item, idx) => (
                  <div key={idx} className={styles.checklistItem}>
                    <span className={styles.checkIconGreen}><IconCheck size={15} /></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. Booking, Child & Cancellation Policies Dropdown */}
      <div className={`${styles.accordionCard} ${openSections.policies ? styles.accordionCardOpen : ""}`}>
        <button
          type="button"
          className={styles.accordionTrigger}
          onClick={() => toggleSection("policies")}
          aria-expanded={openSections.policies}
        >
          <div className={styles.triggerLeft}>
            <span className={styles.triggerIconWrap}>
              <IconCreditCard size={20} color="var(--primary-color)" />
            </span>
            <div className={styles.triggerText}>
              <span className={styles.triggerTitle}>Booking, Child & Cancellation Policies</span>
              <span className={styles.triggerSubtitle}>
                Payment terms, child seating tiers, and refund schedule
              </span>
            </div>
          </div>
          <div className={styles.triggerRight}>
            <span className={styles.triggerBadge}>Official Rules</span>
            <IconChevronDown
              size={18}
              className={`${styles.accordionChevron} ${openSections.policies ? styles.chevronRotated : ""}`}
            />
          </div>
        </button>

        {openSections.policies && (
          <div className={styles.accordionContent}>
            {/* Kids Policy */}
            {policies.kidsPolicy && (
              <div className={styles.policyCardBlock}>
                <h4>Child Seating & Fare Policy</h4>
                <div className={styles.tableResponsiveWrap}>
                  <table className={styles.policyTable}>
                    <thead>
                      <tr>
                        <th>Age Bracket</th>
                        <th>Seat Arrangement & Fare</th>
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
                </div>
              </div>
            )}

            {/* Refund & Cancellation Policy */}
            {policies.refundPolicy && (
              <div className={styles.policyCardBlock}>
                <h4>Refund & Cancellation Timeline</h4>
                <div className={styles.tableResponsiveWrap}>
                  <table className={styles.policyTable}>
                    <thead>
                      <tr>
                        <th>Cancellation Timeline</th>
                        <th>Refund Terms</th>
                      </tr>
                    </thead>
                    <tbody>
                      {policies.refundPolicy.map((r, idx) => (
                        <tr key={idx}>
                          <td><strong>{r.condition}</strong></td>
                          <td><span className={styles.refundTag}>{r.refund}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Booking Policies */}
            {policies.bookingPolicy && (
              <div className={styles.policyCardBlock}>
                <h4>Reservation & Payment Schedule</h4>
                <ul className={styles.policyList}>
                  {policies.bookingPolicy.map((rule, idx) => (
                    <li key={idx}>
                      <span className={styles.policyListIcon}><IconCheck size={15} /></span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 7. General Travel Guidelines & Code of Conduct Dropdown */}
      {policies.generalTravelPolicies && (
        <div className={`${styles.accordionCard} ${openSections.conduct ? styles.accordionCardOpen : ""}`}>
          <button
            type="button"
            className={styles.accordionTrigger}
            onClick={() => toggleSection("conduct")}
            aria-expanded={openSections.conduct}
          >
            <div className={styles.triggerLeft}>
              <span className={styles.triggerIconWrap}>
                <IconShield size={20} color="var(--primary-color)" />
              </span>
              <div className={styles.triggerText}>
                <span className={styles.triggerTitle}>General Travel Guidelines & Code of Conduct</span>
                <span className={styles.triggerSubtitle}>
                  Punctuality, environmental ethics, and ID requirements
                </span>
              </div>
            </div>
            <div className={styles.triggerRight}>
              <span className={styles.triggerBadge}>Guidelines</span>
              <IconChevronDown
                size={18}
                className={`${styles.accordionChevron} ${openSections.conduct ? styles.chevronRotated : ""}`}
              />
            </div>
          </button>

          {openSections.conduct && (
            <div className={styles.accordionContent}>
              <ul className={styles.policyList}>
                {policies.generalTravelPolicies.map((rule, idx) => (
                  <li key={idx}>
                    <span className={styles.policyListIcon}><IconCheck size={15} /></span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
