"use client";
import React, { useEffect, useState } from "react";
import styles from "./settings.module.css";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import { userAgentFromString } from "next/server";

function Settings() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [userId, setUserId] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const userIdFromSessionStorage = sessionStorage.getItem("userId");
    if (userIdFromSessionStorage) {
      setUserId(userIdFromSessionStorage);
      console.log(userIdFromSessionStorage);
    }
  }, []);
  const handleClick = (e) => {
    e.preventDefault();

    setShowOverlay(true);
  };

  const link = `http://localhost:3000/booking/${userId}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);

      setIsCopied(true);
      console.log("Link Copied");
    } catch (error) {
      console.log("Error copying", error);
    }
  };
  const handleClose = () => {
    setShowOverlay(false);
    setIsCopied(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.container}>
        <div className={styles.left}>
          <h1>Let Your Clients Book Appointments Online!</h1>
          <p>
            Invite clients to register for events and activities from your
            website, promotional emails, social campaigns using our booking
            integrations
          </p>
          <p>
            Simply insert a link to your website or social media and that's it.
          </p>
        </div>
        <div className={styles.right}>
          <Image
            src="/share.png"
            height={350}
            width={400}
            className={styles.img}
          />
        </div>
      </div>
      {showOverlay && <div className={styles.background}></div>}
      <div className={styles.bottom}>
        <button onClick={handleClick}>Generate Link</button>
      </div>
      {showOverlay && <div className={styles.background}></div>}

      {showOverlay && (
        <div className={styles.gg}>
          <div className={styles.overlay}>
            <div className={styles.icon}>
              <CloseIcon onClick={handleClose} />
            </div>
            <div className={styles.top}>
              <h2>Direct Link for bookings</h2>
              <p>
                Here's the link where your online booking services can be
                reached directly!
              </p>
            </div>
            <div className={styles.link}>
              <p>{link}</p>
            </div>
            <div className={styles.bottom}>
              <p>
                Just with one click the customers can reach your business
                profiles and book appointments. This link is easy to use and
                friendly to all devices either it be a computer, a phone or a
                tablet.
              </p>
            </div>
            <div className={styles.button}>
              <button onClick={copyToClipboard}>
                {isCopied ? "Copied!" : "Copy Link"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
