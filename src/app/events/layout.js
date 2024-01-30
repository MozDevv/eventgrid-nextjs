"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import SideBar from "@/components/sidebar/SideBar";
import TopBar from "@/components/topbar/TopBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BeatLoader } from "react-spinners";

export default function EventsLayout({ children }) {
  //check if it supports local storage
  const [selectedLink, setSelectedLink] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [localStorageLoaded, setLocalStorageLoaded] = useState(false);

  useEffect(() => {
    const isLocalStorageSupported = () => {
      try {
        sessionStorage.setItem("__test__", "__test__");
        sessionStorage.removeItem("__test__");
        return true;
      } catch (e) {
        return false;
      }
    };

    if (isLocalStorageSupported()) {
      const link = sessionStorage.getItem("selectedLink");
      setSelectedLink(link || "Calendar");
    }

    setLocalStorageLoaded(true);
  }, []);

  useEffect(() => {
    if (selectedLink !== null && localStorageLoaded) {
      sessionStorage.setItem("selectedLink", selectedLink);
    }
  }, [selectedLink, localStorageLoaded]);

  const router = useRouter();

  const handleLinkClick = (title) => {
    try {
      setIsLoading(true); // Set loading state to true when a link is clicked

      setSelectedLink(title);

      // Route mapping based on the clicked link
      switch (title) {
        case "Calender":
          router.push("/events/");
          break;
        case "Clients":
          router.push("/events/clients");
          break;
        case "Settings":
          router.push("/events/settings");
          break;
        case "Services":
          router.push("/events/services");
          break;
        case "Analytics":
          router.push("/events/analytics");
          break;

        case "Help":
          router.push("/events/help");
          break;
        case "Profile":
          router.push("/events/profile");
          break;
        // Add more cases for other links as needed
        default:
          break;
      }
    } finally {
      setIsLoading(false); // Set loading state to false when navigation is complete
    }
  };

  return (
    <div className="container">
      <div className="navbar">
        <SideBar
          selectedLink={selectedLink}
          handleLinkClick={handleLinkClick}
        />
        <div className="topbar">
          <TopBar title={selectedLink} />
        </div>
      </div>
      {isLoading ? (
        <div className="loader">
          <BeatLoader color="#2650a4" loading={isLoading} size={15} />
        </div>
      ) : (
        <div className="children">{children}</div>
      )}
    </div>
  );
}
