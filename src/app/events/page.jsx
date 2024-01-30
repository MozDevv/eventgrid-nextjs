"use client";
import BigCalender from "@/components/bigCalendar/BigCalender";
import styles from "./homepage.module.css";

export default function Calender() {
  return (
    <div className={styles.home}>
      <div className={styles.cal}>
        <BigCalender />
      </div>
    </div>
  );
}
