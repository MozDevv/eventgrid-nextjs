import React from "react";
import styles from "./signup.module.css";
import Link from "next/link";
import { Work_Sans } from "next/font/google";

const work_Sans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

function Signup() {
  return (
    <div className={styles.signup}>
      <div className={styles.title}>
        <h1>eventGrid</h1>
        <p>Create an account</p>
      </div>
      <form action="" className={styles.form}>
        <div className={styles.name}>
          <div className={styles.fname}>
            <label htmlFor="">First Name</label>
            <input type="text" required={true} />
          </div>
          <div className={styles.lname}>
            <label htmlFor="">Last Name</label>
            <input type="text" required={true} />
          </div>
        </div>
        <div className={styles.email}>
          <label htmlFor="">Email address</label>
          <input type="email" required={true} />
        </div>
        <div className={styles.password}>
          <label htmlFor="">Password</label>
          <input type="password" required minLength={8} />
        </div>
        <div className={styles.company}>
          <label htmlFor="">Company</label>
          <input type="text" />
        </div>
        <div className={styles.terms}>
          <input type="checkbox" required={true} />
          <span>I agree to the Website Terms,Privacy Policy</span>
        </div>
        <button>CREATE MY ACCOUNT</button>
      </form>
      <div className={styles.bottom}>
        <div className={styles.register}>
          <span className={styles.d}>Already have an account?</span>
          <Link href="/login" className={styles.link}>
            Login
          </Link>
        </div>
        <div className={styles.contact}>
          <span>© 2023 Mozz</span>
        </div>
      </div>
    </div>
  );
}

export default Signup;
