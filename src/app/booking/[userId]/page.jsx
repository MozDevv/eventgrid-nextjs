"use client";
import React, { useState } from "react";
import styles from "./booking.module.css";
import axios from "axios";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

function Booking() {
  const [clientName, setClientName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [start, setStart] = useState("");

  // const [link, setLink] = useState("");
  const [qrCodeData, setQrCodeData] = useState("");
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const userId = searchParams.get("userId") || pathName.split("/").pop();

  //setLink(`http://localhost:8088/events/details`);
  const router = useRouter();

  console.log(start);
  const addEvent = async (eventData) => {
    try {
      const res = await axios.post(
        `http://localhost:8088/api/v1/new/events/${userId}`,
        eventData
      );

      console.log(res.data);
    } catch (error) {
      console.log("error creating event", eventData);
    }
  };
  const createClient = async (client) => {
    try {
      await axios.post(
        `http://localhost:8088/api/v1/new/clients/${userId}`,
        client
      );
      // console.log(object)
    } catch (error) {
      console.log("error creating client", eventData);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedStart = new Date(start).toISOString();

    const event = {
      title: "Appointment for " + clientName,
      desc: email,
      start: formattedStart,
      end: formattedStart,
    };

    const client = {
      clientName,
      email,
      phoneNumber,
      link: "booked",
    };

    try {
      await addEvent(event);

      await createClient(client);

      router.push("/confirm");
    } catch (error) {
      console.log("Error creating user ", error);
    }
  };

  return (
    <div className={styles.booking}>
      <div className={styles.title}>
        <h1>eventGrid</h1>
        <p>Book an Appointment</p>
      </div>
      <form action="" className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.name}>
          <label htmlFor="">Full Name</label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required={true}
          />
        </div>
        <div className={styles.name}>
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.name}>
          <label htmlFor="">Phone Number</label>
          <input
            type="number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div className={styles.date}>
          <label>Available Date</label>
          <input
            type="datetime-local"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
        </div>
        <button type="submit">Book Now</button>
      </form>
      <div className={styles.bottom}>
        <div className={styles.link}>
          <Link href="#">Send a Message</Link>
        </div>
        <div>© 2023 Mozz</div>
      </div>
    </div>
  );
}

export default Booking;
