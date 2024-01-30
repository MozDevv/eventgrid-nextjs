"use client";
import React, { useEffect, useState } from "react";
import styles from "./topbar.module.css";
import SearchIcon from "@mui/icons-material/Search";

import { useRouter } from "next/navigation";
import UserAvatar from "../avatar/UserAvatar";
import Avatar from "react-avatar";
import axios from "axios";
import Link from "next/link";

function TopBar({ title }) {
  ///setting up avatar

  ///
  const [loading, setIsLoading] = useState(true);
  const [initials, setInitials] = useState("");
  const [isProfile, setIsProfile] = useState(false);
  const [openOverlay, setOpenOverlay] = useState(false);

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

      //  console.log(res.data);
      return res.data;
    } catch (error) {
      console.log("error fetching user " + error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUser()
      .then((res) => setInitials(res.firstName))
      .catch((err) => console.log(err));
  }, []);

  ///

  //

  const router = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("token");
    window.location.href = "/login";
  };

  const handleClick = () => {
    setOpenOverlay((prevOpenOverlay) => !prevOpenOverlay);

    setIsProfile(true);
  };

  //update profile pic //

  /*
  
  */

  const handleUpdateProfile = () => {};

  return (
    <div className={styles.topbar}>
      <div className={styles.left}>
        <h4>{title}</h4>
      </div>
      <div className={styles.right}>
        <div className={styles.icon}>
          <div className={styles.search}>
            <SearchIcon />
          </div>
          <input type="text" />
        </div>

        {openOverlay && (
          <div className={styles.overlay}>
            <div className={styles.links}>
              <Link
                className={styles.link}
                onClick={handleUpdateProfile}
                href="#"
              >
                Update Profile Picture
              </Link>
              <Link className={styles.link} href="#">
                Profile Settings
              </Link>
              <Link className={styles.link} href="#">
                Logout
              </Link>
            </div>
          </div>
        )}

        <div className={styles.user}>
          <Avatar
            size={40}
            round={true}
            name={initials}
            fgColor="white"
            color="#1d3d7c"
            onClick={handleClick}
          />
        </div>
        <div className={styles.logout} onClick={handleLogout}>
          Logout
        </div>
      </div>
    </div>
  );
}

export default TopBar;
