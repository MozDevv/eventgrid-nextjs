"use client";

import { clients } from "../data";
import { DataGrid } from "@mui/x-data-grid";

import React, { useEffect, useState } from "react";
import styles from "./clients.module.css";
import ExportToExcel from "@/components/exportToExcel/ExportToExcel";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { BeatLoader } from "react-spinners";
import axiosInstance from "@/utils/axiosInstance";

function Clients() {
  const [isLoading, setIsLoading] = useState(true);

  const columns = [
    { field: "clientId", headerName: "Id", width: 50 },
    { field: "clientName", headerName: "Name", width: 200 },
    { field: "phoneNumber", headerName: "Phone Number", width: 200 },
    { field: "email", headerName: "Email", width: 280 },
    {
      field: "actions",
      headerName: "Actions",
      width: 120,
      renderCell: (params) => (
        <>
          <DeleteIcon
            onClick={() => handleDelete(params.row.clientId)}
            className={styles.delete}
          />
        </>
      ),
    },
  ];

  const [showForm, setShowForm] = useState(false);

  const [allClients, setAllClients] = useState([]);

  const [newClient, setNewClient] = useState({
    clientId: "",
    clientName: "",
    phoneNumber: "",
    email: "",
  });

  const fetchAllClients = async () => {
    setIsLoading(true);
    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");

    try {
      const res = await axiosInstance.get(
        `http://localhost:8088/api/v1/clients/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(res.data);

      return res.data;
    } catch (error) {
      console.log("Error fetching clients", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllClients()
      .then((res) => setAllClients(res))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addClient = async (clientData) => {
    const userId = sessionStorage.getItem("userId");
    const token = sessionStorage.getItem("token");

    try {
      const res = await axios.post(
        `http://localhost:8088/api/v1/new/clients/${userId}`,

        clientData
      );
    } catch (error) {
      console.log("error adding client", error);
    }
  };

  const handleSubmit = async () => {
    const clientData = {
      clientName: newClient.clientName,
      phoneNumber: newClient.phoneNumber,
      email: newClient.email,
    };

    try {
      await addClient(clientData);

      await fetchAllClients()
        .then((res) => setAllClients(res))
        .catch((err) => {
          console.log(err);
        });

      setNewClient({
        clientId: "",
        clientName: "",
        phoneNumber: "",
        email: "",
      });

      setShowForm(false);
    } catch (error) {
      console.log("error adding", error);
    }
  };

  const handleDelete = async (clientId) => {
    const token = sessionStorage.getItem("token");

    try {
      const res = await axios.delete(
        `http://localhost:8088/api/v1/clients/${clientId}`,

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        await fetchAllClients()
          .then((res) => setAllClients(res))
          .catch((err) => {
            console.log(err);
          });
      }
    } catch (error) {
      console.log("Error deleting the client", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewClient({ ...newClient, [name]: value });
  };

  const handleAddBtn = () => {
    setShowForm(true);
  };
  const handleCloseForm = () => {
    setShowForm(false);
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
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0
                ? styles.even
                : styles.odd
            }
            rows={allClients}
            columns={columns}
            pageSize={5} // You can adjust the number of rows per page
            getRowId={(r) => r.clientId} //Extract movies_id from obj
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
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
                name="clientName"
                value={newClient.clientName}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.input}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={newClient.email}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.input}>
              <label>Phone Number</label>
              <input
                type="number"
                name="phoneNumber"
                value={newClient.phoneNumber}
                onChange={handleInputChange}
              />
            </div>

            <button className={styles.btn} type="submit">
              Add New Client
            </button>
          </form>

          <div className={styles.add}>
            <button className={styles.btn} onClick={handleAddBtn}>
              Add New Client
            </button>
          </div>
          <div className={styles.export}>
            <ExportToExcel data={allClients} columns={columns} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Clients;
