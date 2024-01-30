"use client";
import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";

import { Quicksand } from "@next/font/google";
import Link from "next/link";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

function Navbar() {
  const [active, setIsActive] = useState(false);

  const isActive = () => {
    window.scrollY === 0 ? setIsActive(false) : setIsActive(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);

    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  return (
    <div className={`${styles.navbar} ${active ? styles.active : ""}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={quicksand.className}>eventGrid</div>
        </div>
        <div className={styles.links}>
          <div className={styles.link}>
            <Link href="/">Home</Link>
          </div>
          <div className={styles.link}>
            <Link href="#">Contact Us</Link>
          </div>
          <div className={styles.link}>
            <Link href="localhost:4000">Pricing</Link>
          </div>
          <div className={styles.link}>
            <Link href="/login">Login</Link>
          </div>
          <div className={styles.link}>
            <Link href="/signup" className={styles.signUp}>
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
