import React from "react";
import styles from "./menu.module.css";
import Image from "next/image";
import "./../../app/globals.css";

function Menu() {
  return (
    <div className={styles.menu}>
      <div className={styles.title}>
        <h1>Our simple 3-step setup helps you get started in no time!</h1>
      </div>
      <div className={styles.container}>
        <div className={styles.step1}>
          <div className={styles.text}>
            <Image
              className={styles.image}
              alt=""
              src="/5.jpg"
              height={150}
              width={150}
            />
            <h4>1. Create your event booking page</h4>
            <p>
              Enter your event details, available dates, capacity and your event
              page will be ready.Customiize and make it look pretty
            </p>
          </div>
        </div>
        <div className={styles.step1}>
          <div className={styles.text}>
            <Image
              className={styles.image}
              alt=""
              src="/2.jpg"
              height={150}
              width={150}
            />
            <h4>2. Share or embed your booking url</h4>
            <p>
              Invite clients to register for events and activities from your
              website, promotional emails, social campaigns using our booking
              integrations
            </p>
          </div>
        </div>
        <div className={styles.step1}>
          <div className={styles.text}>
            <Image
              className={styles.image}
              alt=""
              src="/10.jpg"
              height={150}
              width={150}
            />
            <h4>3. Watch registrations roll in</h4>
            <p>
              Anyone can check real-time availability on your booking website
              and book a seat. They cann also easily register on behalf of
              others with ability of reserving multiple seats.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;
