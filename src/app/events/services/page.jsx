"use client";

import styles from "./services.module.css";
import { services } from "../data";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";

import ExportToExcel from "@/components/exportToExcel/ExportToExcel";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import axiosInstance from "@/utils/axiosInstance";

function Services() {
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    { field: "serviceId", headerName: "ID", width: 50 },
    { field: "serviceName", headerName: "Name", width: 200 },
    { field: "availableSlots", headerName: "Available Slots", width: 200 },
    { field: "totalSlots", headerName: "Total Slots", width: 200 },
  ];

  const [showForm, setShowForm] = useState(false);

  const [allServices, setAllServices] = useState([]);

  const [newService, setNewService] = useState({
    serviceId: "",
    serviceName: "",
    totalSlots: "",
    availableSlots: "",
  });

  const fetchAllServices = async () => {
    setIsLoading(true);

    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");

    try {
      const res = await axiosInstance.get(
        `http://localhost:8088/api/v1/services/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error) {
      console.log("Error fetching services", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllServices()
      .then((res) => setAllServices(res))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addService = async (serviceData) => {
    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");

    try {
      const res = await axios.post(
        `http://localhost:8088/api/v1/services/${userId}`,

        serviceData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log("error creating service");
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

    setNewService({ ...newService, [name]: value });
  };

  const handleSubmit = async () => {
    const serviceData = {
      serviceName: newService.serviceName,
      totalSlots: newService.totalSlots,
    };

    try {
      await addService(serviceData);

      await fetchAllServices()
        .then((res) => setAllServices(res))
        .catch((err) => {
          console.log(err);
        });

      setNewService({
        serviceId: "",
        serviceName: "",
        totalSlots: "",
        availableSlots: "",
      });

      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.clients}>
      {isLoading ? (
        <div className={styles.loader}>
          <BeatLoader color="#2650a4" loading={isLoading} size={15} />
        </div>
      ) : (
        <div className={styles.table}>
          <DataGrid
            rows={allServices}
            columns={columns}
            pageSize={5} // You can adjust the number of rows per page
            getRowId={(r) => r.serviceId} //Extract movies_id from obj
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0
                ? styles.even
                : styles.odd
            }
          />

          <form
            action=""
            className={`${styles.form} ${showForm ? styles.active : ""}`}
            onSubmit={handleSubmit}
          >
            <div className={styles.close}>
              <CloseIcon
                onClick={handleCloseForm}
                className={styles.closeIcon}
              />
            </div>
            <div className={styles.input}>
              <label>Name</label>
              <input
                type="text"
                name="serviceName"
                value={newService.serviceName}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.input}>
              <label>Total Slots</label>
              <input
                type="text"
                name="totalSlots"
                value={newService.totalSlots}
                onChange={handleInputChange}
              />
            </div>

            <button type="submit" className={styles.btn}>
              Add New Service
            </button>
          </form>

          <div className={styles.add}>
            <button className={styles.btn} onClick={handleAddBtn}>
              Add New Service
            </button>
          </div>
          <div className={styles.export}>
            <ExportToExcel data={allServices} columns={columns} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;
