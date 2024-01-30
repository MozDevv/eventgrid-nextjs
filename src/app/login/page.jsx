"use client";
import React, { useState } from "react";
import styles from "./login.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { BeatLoader } from "react-spinners";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    setIsLoading(true);

    e.preventDefault();
    const user = { email, password };

    try {
      const res = await axios.post(
        "http://localhost:8088/api/v1/auth/login",
        user
      );

      if (res.status === 200) {
        const id = res.data.id;
        const token = res.data.token;

        sessionStorage.setItem("userId", id);
        console.log(id);
        console.log(res.data);

        sessionStorage.setItem("token", token);
        console.log(token);

        window.location.href = "/events";
      }
    } catch (error) {
      setError(true);
      console.log("Error loggging in", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className={styles.login}>
      {isLoading ? (
        <div className={styles.loader}>
          <BeatLoader color="#2650a4" loading={isLoading} size={15} />
        </div>
      ) : (
        <>
          <div className={styles.top}>
            <h2 className={styles.logo}>eventGrid</h2>
            <div className={styles.text}>Login to your Account</div>
          </div>
          <div className={styles.bottom}>
            <form action="" className={styles.form} onSubmit={handleSubmit}>
              <div className={`${styles.input} ${error && styles.error}`}>
                <label htmlFor="">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                />
              </div>
              <div className={`${styles.input} ${error && styles.error}`}>
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <button>Login with Email</button>
              {error && (
                <p style={{ color: "crimson", fontSize: "14px" }}>
                  Incorrect Email or Password
                </p>
              )}
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
        </>
      )}
    </div>
  );
}

export default Login;
