import React from "react";
import styles from "./login.module.css";
import Link from "next/link";

function Login() {
  return (
    <div className={styles.login}>
      <div className={styles.top}>
        <h2 className={styles.logo}>eventGrid</h2>
        <div className={styles.text}>Login to your Account</div>
      </div>
      <div className={styles.bottom}>
        <form action="" className={styles.form}>
          <div className={styles.input}>
            <label htmlFor="">Email address</label>
            <input type="email" placeholder="Email address" />
          </div>
          <div className={styles.input}>
            <label htmlFor="">Password</label>
            <input type="password" placeholder="Password" />
          </div>
          <button>Login with Email</button>
        </form>
        <div className={styles.bottom}>
          <Link href="#" className={styles.link}>
            Forgot password?
          </Link>
          <div className={styles.register}>
            <span className={styles.d}>Do not have an account?</span>
            <Link href="/signup" className={styles.link}>
              Register
            </Link>
          </div>
          <div className={styles.contact}>
            <span>© 2023 Mozz</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
