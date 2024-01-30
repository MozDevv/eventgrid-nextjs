"use client";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./calender.module.css";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import axiosInstance from "@/utils/axiosInstance";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function BigCalender() {
  const [isLoading, setIsLoading] = useState(true);

  const [selectedEventDetails, setSelectedEventDetails] = useState({});
  const [openEventOverlay, setOpenEventOverlay] = useState(false);

  const [newEvent, setNewEvent] = useState({
    title: "",
    desc: "",
    start: new Date().toISOString().slice(0, 16), // Default value for start datetime-local input
    end: new Date().toISOString().slice(0, 16), // Default value for end datetime-local input
  });

  const [allEvents, setAllEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const fetchAllEvents = async () => {
    setIsLoading(true);
    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");

    try {
      const res = await axiosInstance.get(
        `http://localhost:8088/api/v1/events/${userId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      return res.data;
    } catch (error) {
      console.log("eror fethcing", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllEvents()
      .then((res) => setAllEvents(res))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addEvent = async (eventData) => {
    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");

    try {
      const res = await axios.post(
        `http://localhost:8088/api/v1/new/events/${userId}`,
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("The event is", res.data);
    } catch (error) {
      console.log("Error saving event", error);
    }
  };

  const handleAddEvent = async () => {
    const formattedStart = new Date(newEvent.start);
    const formattedEnd = new Date(newEvent.end);

    const eventData = {
      title: newEvent.title,
      desc: newEvent.desc,
      start: formattedStart.toISOString(),
      end: formattedEnd.toISOString(),
    };

    try {
      await addEvent(eventData);

      await fetchAllEvents()
        .then((res) => setAllEvents(res))
        .catch((error) => {
          console.log(error);
        });

      setNewEvent({
        title: "",
        desc: "",
        start: new Date().toISOString().slice(0, 16),
        end: new Date().toISOString().slice(0, 16),
      });
      setShowForm(false);
    } catch (error) {
      console.log("Error saving", error);
    }
  };

  const handleAddBtn = () => {
    setShowForm(true);
  };
  const handleCloseForm = () => {
    setShowForm(false);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewEvent({ ...newEvent, [name]: value });
  };

  // Fetch single Event Details

  //

  //
  const fetchEventDetails = async (selectedEvent) => {
    const token = sessionStorage.getItem("token");

    try {
      const res = await axios.get(
        `http://localhost:8088/api/v1/event/${selectedEvent.id}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("The data is" + res.data);

      setOpenEventOverlay(true);
      setSelectedEventDetails(res.data);

      console.log(selectedEvent.id);
    } catch (error) {
      console.log(error);
    }
  };

  ///close overlay

  const handleClose = () => {
    setOpenEventOverlay(false);
  };

  return (
    <div className={styles.calender}>
      {isLoading ? (
        <div className={styles.loader}>
          <BeatLoader color="#2650a4" loading={isLoading} size={15} />
        </div>
      ) : (
        <>
          {openEventOverlay && <div className={styles.background}></div>}
          {openEventOverlay && (
            <div className={styles.overlay}>
              <div className={styles.icon}>
                <CloseIcon onClick={handleClose} />
              </div>

              <div className={styles.name}>
                <div className={styles.logo}>eventGrid</div>
                <div className={styles.title}>View Event</div>
              </div>
              <div className={styles.date}>
                <label htmlFor="">Title: </label>
                <div className={styles.item}>{selectedEventDetails.title}</div>
              </div>
              <div className={styles.date}>
                <label htmlFor="">Start Time: </label>
                <div className={styles.item}>{selectedEventDetails.start}</div>
              </div>
              <div className={styles.date}>
                <label htmlFor="">End Time: </label>
                <div className={styles.item}>{selectedEventDetails.end}</div>
              </div>
              <div className={styles.date}>
                <label>Description: </label>
                <div className={styles.item}>{selectedEventDetails.desc}</div>
              </div>
            </div>
          )}

          <div className={styles.add}>
            <button className={styles.btn} onClick={handleAddBtn}>
              ADD NEW +
            </button>

            <form
              action=""
              className={`${styles.form} ${showForm ? styles.active : ""}`}
              onSubmit={(e) => {
                e.preventDefault();
                handleAddEvent();
              }}
            >
              <div className={styles.close}>
                <CloseIcon
                  onClick={handleCloseForm}
                  className={styles.closeIcon}
                />
              </div>
              <div className={styles.input}>
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={newEvent.title}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.input}>
                <label>Description</label>
                <input
                  type="text"
                  name="desc"
                  value={newEvent.desc}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.input}>
                <label>Start</label>
                <input
                  name="start"
                  type="datetime-local"
                  min={new Date().toISOString().slice(0, 16)}
                  value={newEvent.start}
                  onChange={handleInputChange}
                />
              </div>
              <div className={styles.input}>
                <label>End</label>
                <input
                  name="end"
                  type="datetime-local"
                  min={new Date().toISOString().slice(0, 16)}
                  value={newEvent.end}
                  onChange={handleInputChange}
                />
              </div>
              <button className={styles.button}>Add Event</button>
            </form>
          </div>

          <Calendar
            className={styles.bigCalender}
            localizer={localizer}
            events={allEvents}
            startAccessor={(event) => new Date(event.start)} // Modify this line
            endAccessor={(event) => new Date(event.end)} // Modify this line
            style={{ height: 550, marginTop: "20px" }}
            onSelectEvent={(event, e) => fetchEventDetails(event, e)}
          />
        </>
      )}
    </div>
  );
}

export default BigCalender;
