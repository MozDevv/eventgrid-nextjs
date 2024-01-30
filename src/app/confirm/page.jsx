import React from "react";
import styles from "./confirm.module.css";

function Confirm() {
  return (
    <div className={styles.confirm}>
      <div className={styles.img}>
        <img src="/check.png" alt="" />
      </div>
      <h1>Booking Successful</h1>
      <p>
        Your booking is confirmed! We've received your reservation and look
        forward to hosting you. Thank you for choosing our service.
      </p>
    </div>
  );
}

export default Confirm;
