import React from "react";
import styles from "./featured.module.css";
import { Work_Sans, Poppins } from "@next/font/google";
import Image from "next/image";
import Link from "next/link";

const work_Sans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

function Featured() {
  return (
    <div className={styles.featured}>
      <div className={styles.text}>
        <h1>Effortless Event Management:Manage Your Schedule with Ease bud</h1>

        <Image
          alt=""
          className={styles.img}
          src="/8.jpg"
          height={300}
          width={300}
        />
      </div>
      <div className={styles.btn}>
        <Link href="/signup" className={styles.link}>
          <button className={styles.button}>Get Started</button>
        </Link>
      </div>
    </div>
  );
}

export default Featured;
