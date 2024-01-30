import React from "react";
import styles from "./help.module.css";
import Image from "next/image";

function Help() {
  return (
    <div className={styles.help}>
      <div className={styles.top}>
        <h2>How can we help?</h2>
        <form action="" className={styles.form}>
          <label htmlFor="">Ask a Question</label>
          <input type="text" />
        </form>
      </div>
      <div className={styles.bottom}>
        <div className={styles.explore}>
          <div className={styles.container}>
            <div className={styles.img}>
              <Image src="/11.jpg" height={100} width={100} />

              <h4>Getting Started</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.img}>
              <Image src="/1.jpg" height={100} width={100} />

              <h4>Adding Events</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.img}>
              <Image src="/3.jpg" height={100} width={100} />

              <h4>Adding Clients</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.img}>
              <Image src="/8.jpg" height={100} width={100} />

              <h4>Services</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.img}>
              <Image src="/10.jpg" height={100} width={100} />

              <h4>Online Booking</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
          <div className={styles.container}>
            <div className={styles.img}>
              <Image src="/share.png" height={100} width={100} />

              <h4>Connect with customers</h4>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
