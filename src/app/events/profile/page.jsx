"use client";
import React, { useEffect, useState } from "react";
import styles from "./profile.module.css";
import axios from "axios";
import { useRouter } from "next/navigation";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { VisibilityOffOutlined } from "@mui/icons-material";

function Profile() {
  const [loading, setIsLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [comp, setComp] = useState("");
  const [lname, setLname] = useState("");
  const [eml, setEml] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [incorrectPassword, setIncorrectPassword] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const fetchUser = async () => {
    setIsLoading(true);
    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");

    try {
      const res = await axios.get(
        ` http://localhost:8088/api/v1/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Fetched user ", res.data);
      return res.data;
    } catch (error) {
      console.log("error fetching user shit" + error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser()
      .then((res) => {
        setFname(res.firstName);
        setLname(res.lastName);
        setComp(res.company);
        setEml(res.email);
      })
      .catch((err) => console.log(err));
  }, []);

  /* update user */

  const handleUpdateInfo = async (e) => {
    e.preventDefault();

    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");

    //create an object and push fields

    const userDetails = {};

    if (firstName.trim() !== "") {
      userDetails.firstName = firstName;
    }
    if (lastName.trim() !== "") {
      userDetails.lastName = lastName;
    }
    if (company.trim() !== "") {
      userDetails.company = company;
    }
    if (email.trim() !== "") {
      userDetails.email = email;
    }

    try {
      const res = await axios.put(
        `http://localhost:8088/api/v1/users/${userId}`,
        userDetails,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Updated user ", res.data);

      if (userDetails.email) {
        alert("Please log in again to refresh your session.");

        router.push("http://localhost:3000/login");
      }

      setFirstName("");
      setlastName("");
      setCompany("");

      await fetchUser();
    } catch (error) {
      console.log("Error updating user!", error);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const userId = sessionStorage.getItem("userId");

    const changePasswordRequest = {
      oldPassword,
      newPassword,
    };

    if (repeatPassword !== newPassword) {
      setPasswordMatch(false);
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8088/api/v1/auth/change-password/${userId}`,
        changePasswordRequest
      );

      console.log("Password change response: ", res.data);
      setOldPassword("");
      setNewPassword("");
      setRepeatPassword("");
      setPasswordMatch(true);
      setSuccess(true);
      setIncorrectPassword(false);
    } catch (error) {
      setIncorrectPassword(true);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className={styles.profile}>
      {success && (
        <div className={styles.success}>
          <p>Password changed successfully!</p>
        </div>
      )}
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleUpdateInfo}>
          <div className={styles.left}>
            <div className={styles.h2}>
              <h3 className={styles.title}>Personal Details</h3>
              <p>
                Set your name and contact information, the email address entered
                here is used for your login access
              </p>

              <div className={styles.names}>
                <div className={styles.name}>
                  <label>First Name</label>
                  <input
                    type="text"
                    placeholder={fname}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className={styles.name}>
                  <label>Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setlastName(e.target.value)}
                    placeholder={lname}
                  />
                </div>
              </div>
              <div className={styles.email}>
                <label> Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={eml}
                />
              </div>
              <div className={styles.email}>
                <label>Company</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder={comp}
                />
              </div>
              <button type="submit" className={styles.btn}>
                Update Info
              </button>
            </div>
          </div>
        </form>
        <div className={styles.right}>
          <div
            className={`${styles.section} ${incorrectPassword && styles.error}`}
          >
            <h3>Change Password</h3>
            <p>
              To make an update, enter your existing password followed by a new
              one. If you don't know your existing password, you can logout and
              use the Reset Password link on the Sign In page.
            </p>
            <form action="" onSubmit={handleChangePassword}>
              <div
                className={`${styles.email} ${
                  incorrectPassword && styles.error
                }`}
              >
                <label>Old Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <div
                  type="button"
                  className={styles.showPassword}
                  onClick={toggleShowPassword}
                >
                  {showPassword ? (
                    <VisibilityOutlinedIcon />
                  ) : (
                    <VisibilityOffOutlined />
                  )}
                </div>
              </div>
              <div className={styles.email}>
                <label>New Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className={styles.email}>
                <label>Repeat password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                />
              </div>
              <button className={styles.btn2} type="submit">
                Change Password
              </button>
              {incorrectPassword && (
                <span className={styles.incorrect}>
                  <div className={styles.p}>
                    {" "}
                    Incorrect password, please try again
                  </div>
                </span>
              )}
              {!passwordMatch && (
                <span className={styles.incorrect}>
                  <div className={styles.p}> Passwords do not match</div>
                </span>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
