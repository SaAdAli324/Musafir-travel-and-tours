"use client";

import { motion } from "framer-motion";

export default function ScrollReveal({ children, className, delay = 0, direction = "up" }) {
  const directionOffset = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: -40, y: 0 },
    right: { x: 40, y: 0 },
    none: { x: 0, y: 0 }
  };

  const initialPosition = directionOffset[direction] || directionOffset.up;

  return (
    <motion.div
      initial={{ opacity: 0, ...initialPosition }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      style={{ willChange: "opacity, transform" }}
    >
      {children}
    </motion.div>
  );
}
