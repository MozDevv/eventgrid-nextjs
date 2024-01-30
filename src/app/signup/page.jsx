"use client";
import React, { useState } from "react";
import styles from "./signup.module.css";
import Link from "next/link";
import { Work_Sans } from "next/font/google";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";

const work_Sans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

function Signup() {
  const [firstName, setfirstName] = useState("");
  const [lastname, setlastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [error, setError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    const user = {
      firstName,
      lastname,
      phoneNumber,
      email,
      password,
      company,
    };

    try {
      const res = await axios.post(
        "http://localhost:8088/api/v1/auth/register",
        user
      );
      if (res.status === 200) {
        const id = res.data.id;

        console.log(user);

        window.location.href = "/events";
        sessionStorage.setItem("token", res.data.token);

        setUserId(id);
        sessionStorage.setItem("userId", id);
        console.log("token", res.data.token);

        const token = res.data.token;
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
      console.log("The error is error", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.signup}>
      {isLoading ? (
        <div className={styles.loader}>
          <BeatLoader color="#2650a4" loading={isLoading} size={15} />
        </div>
      ) : (
        <>
          <div className={styles.title}>
            <h1>eventGrid</h1>
            <p>Create an account</p>
          </div>
          <form action="" className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.name}>
              <div className={styles.firstName}>
                <label htmlFor="">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setfirstName(e.target.value)}
                  required={true}
                />
              </div>
              <div className={styles.lastName}>
                <label htmlFor="">Last Name</label>
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setlastName(e.target.value)}
                  required={true}
                />
              </div>
            </div>
            <div className={styles.email}>
              <label htmlFor="">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={true}
              />
            </div>
            <div className={styles.password}>
              <label htmlFor="">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className={styles.company}>
              <label htmlFor="">Phone Number</label>
              <input
                type="number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <div className={styles.company}>
              <label htmlFor="">Company</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div className={styles.terms}>
              <input type="checkbox" required={true} />
              <span>I agree to the Website Terms,Privacy Policy</span>
            </div>
            <button type="submit">CREATE MY ACCOUNT</button>
          </form>
          {error && (
            <div className={styles.error}>
              <p>Error creating account, please try again</p>
            </div>
          )}
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
        </>
      )}
    </div>
  );
}

export default Signup;
