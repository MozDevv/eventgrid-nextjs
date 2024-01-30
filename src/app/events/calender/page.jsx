"use client";
import BigCalender from "@/components/bigCalendar/BigCalender";
import styles from "./calender.module.css";

export default function Calender() {
  return (
    <div className={styles.home}>
      <div className={styles.calender}>
        <BigCalender />
      </div>
    </div>
  );
}
