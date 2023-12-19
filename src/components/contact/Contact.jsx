/* eslint-disable*/
import React from "react";
import styles from "./contact.module.css";
import Image from "next/image";

function Contact() {
  return (
    <div className={styles.contact}>
      <div className={styles.left}>
        <h2>
          Give your customers the flexibility to book online 24x7 with our
          appointment scheduling software
        </h2>
        <p>No Credit Card Required</p>
        <button className={styles.btn}>Get Started</button>
      </div>

      <div className={styles.right}>
        <img className={styles.img} alt="" src="/contactUs.png" />
      </div>
    </div>
  );
}

export default Contact;
