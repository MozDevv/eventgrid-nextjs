"use client";
import React, { useEffect, useState } from "react";
import styles from "./details.module.css";
import Avatar from "react-avatar";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CallIcon from "@mui/icons-material/Call";
import axios from "axios";

function Details() {
  const [initials, setInitials] = useState("K");

  const [client, setClient] = useState({});
  const [user, setUser] = useState({});
  const [userId, setUserId] = useState(null);
  const [openContact, setOpenContact] = useState(false);
  const [toggleCancel, setToggleCancel] = useState(false);

  const pathName = usePathname();
  const searchParams = useSearchParams();

  const clientId = searchParams.get("clientId") || pathName.split("/").pop();

  const fetchClient = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8088/api/v1/new/clients/${clientId}`
      );

      console.log(res.data);
      setUserId(res.data.userId);
      setClient(res.data);
    } catch (error) {
      console.log("Error fetching user in det" + error);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        ` http://localhost:8088/api/v1/user/${userId}`
      );

      console.log(res.data);

      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchClient();
      } catch (error) {
        console.log("Error fetching data");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (userId) {
          await fetchUser();
        }
      } catch (error) {
        console.log("EEE", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleCallIcon = () => {
    setOpenContact((prevOpenContact) => !prevOpenContact);
  };

  const handleCancel = () => {
    setToggleCancel((prevToggleCancel) => !prevToggleCancel);
  };
  return (
    <div className={styles.details}>
      {toggleCancel && (
        <>
          <div className={styles.cancel}>
            <p>Are you sure you want to cancel the booking?</p>
            <div className={styles.btns}>
              <button className={styles.btnY}>Yes, delete</button>
              <button className={styles.btnN} onClick={handleCancel}>
                No, return
              </button>
            </div>
          </div>
        </>
      )}
      {toggleCancel && <div className={styles.background}></div>}
      <div className={styles.container}>
        <div className={styles.title}>
          <h4> Booking Confirmed</h4>
          <div className={styles.icon}>
            <CheckCircleIcon />
          </div>
        </div>

        <div className={styles.top}>
          <div className={styles.user}>
            <Avatar
              size={40}
              round={true}
              name={client.clientName}
              fgColor="white"
              color="#1d3d7c"
            />
            <span className={styles.name}>{client.clientName}</span>
          </div>
          <div className={styles.company}>
            <h5>{user.company}</h5>
            {openContact && (
              <span>{user.phoneNumber ? user.phoneNumber : "0722718965"}</span>
            )}
            <span onClick={handleCallIcon} className={styles.callIcon}>
              <CallIcon />
            </span>
          </div>
        </div>

        <div className={styles.bottom}>
          <div className={styles.h3}>Appointment details</div>
          <div className={styles.userDetails}>
            <div className={styles.item}>
              <span className={styles.label}>Status:</span>
              <span className={styles.val1}>booked</span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Booked By:</span>
              <span className={styles.val}>{client.clientName}</span>
            </div>

            <div className={styles.item}>
              <span className={styles.label}>Created At:</span>
              <span className={styles.val}>
                {client.createdAt
                  ? client.createdAt
                  : "June 14, 2024 3:35pm EAT"}
              </span>
            </div>
            <div className={styles.item}>
              <span className={styles.label}>Start:</span>
              <span className={styles.val1}>July 24, 2024 11:35pm EAT</span>
            </div>
          </div>

          <div className={styles.buttons}>
            <button onClick={handleCancel}>Cancel Booking</button>
          </div>
        </div>

        <div className={styles.contact}>
          <span className={styles.logo}>eventGrid</span>
          <span>© 2023 Mozz</span>
        </div>
      </div>
    </div>
  );
}

export default Details;
