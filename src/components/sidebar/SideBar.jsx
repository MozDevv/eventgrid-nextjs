import React from "react";
import styles from "./sidebar.module.css";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined"; //calender
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline"; //clients
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined"; //services
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined"; //messages
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined"; //settings
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined"; //
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

function SideBar({ handleLinkClick, selectedLink }) {
  return (
    <div className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.links}>
          <div
            className={`${styles.link} ${
              selectedLink === "Calender" ? styles.active : ""
            }`}
            onClick={() => handleLinkClick("Calender")}
          >
            <div className={styles.icon}>
              <CalendarMonthOutlinedIcon />
            </div>

            <p>Calender</p>
          </div>
          <div
            className={`${styles.link} ${
              selectedLink === "Clients" ? styles.active : ""
            }`}
            onClick={() => handleLinkClick("Clients")}
          >
            <div className={styles.icon}>
              <PeopleOutlineIcon />
            </div>

            <p>Clients</p>
          </div>
          <div
            className={`${styles.link} ${
              selectedLink === "Services" ? styles.active : ""
            }`}
            onClick={() => handleLinkClick("Services")}
          >
            <div className={styles.icon}>
              <CategoryOutlinedIcon />
            </div>

            <p>Services</p>
          </div>

          <div
            className={`${styles.link} ${
              selectedLink === "Settings" ? styles.active : ""
            }`}
            onClick={() => handleLinkClick("Settings")}
          >
            <div className={styles.icon}>
              <SettingsOutlinedIcon />
            </div>

            <p className={styles.o}>Online Booking</p>
          </div>
          <div
            className={`${styles.link} ${
              selectedLink === "Help" ? styles.active : ""
            }`}
            onClick={() => handleLinkClick("Help")}
          >
            <div className={styles.icon}>
              <HelpOutlineOutlinedIcon />
            </div>

            <p className={styles.help}>Help</p>
          </div>
          <div
            className={`${styles.link} ${
              selectedLink === "Analytics" ? styles.active : ""
            }`}
            onClick={() => handleLinkClick("Analytics")}
          >
            <div className={styles.icon}>
              <BarChartOutlinedIcon />
            </div>

            <p>Analytics</p>
          </div>
          <div
            className={`${styles.link} ${
              selectedLink === "Profile" ? styles.active : ""
            }`}
            onClick={() => handleLinkClick("Profile")}
          >
            <div className={styles.icon}>
              <ManageAccountsIcon />
            </div>

            <p className={styles.pr}>Profile</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
