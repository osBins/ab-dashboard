import "./experiment.scss";
import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../experimentDatasource";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { AutoGraph } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { config } from "../../config";

const actionColumns = [
  {
    field: "result",
    "headerName": "Result",
    width: 75,
    renderCell: (experiment) => {
      return (
        <Link to={`/experiments/${experiment.id}`}>
        <IconButton>
          <AutoGraph />
        </IconButton>
        </Link>
      );
    }
  },
]

const Datatable = () => {
  const [experiments, setExperiments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.baseURL}/experiments`);
        response.data.forEach(experiment => {
          if(experiment.status == "active") {
            experiment.action = true
          }
          else {
            experiment.action = false
          }
          const timeNow = Date.now()
          
          const startDate = Date.parse(experiment.startDate) 
          const endDate = Date.parse(experiment.endDate) 
          
          const expStarted = timeNow > startDate
          const expEnded = timeNow > endDate

          const start = moment(experiment.startDate).format('D MMMM YYYY - h:mm A')
          const end = moment(experiment.endDate).format('D MMMM YYYY - h:mm A')

          if (experiment.status == "inactive" && expEnded === false) {
            experiment.status = "Inactive";
          }
          else if (expStarted === true && expEnded === false) {
            experiment.status = "Active";
          }
          else if (startDate > timeNow) {
            experiment.status = "Scheduled";
          }
          else if (endDate < timeNow) {
            experiment.status = "Expired";
          }
          else if (experiment.status == "inactive" && expEnded === false){
            experiment.status = "Inactive";
          }
          experiment.startDate = start;
          experiment.endDate = end;
        })
        setExperiments(response.data);
        setLoading(false);
      }
      catch (error) {
        setLoading(false);
        setError("Error")
        throw new Error("Response not received.");
      }
    }
    fetchData();
  }, []);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  return (
    <div className="datatable">
      <div className="datatableTitle">
        EXPERIMENTS
        <Link
          to="/experiments/new"
          style={{ textDecoration: "none" }}
          className="link"> CREATE NEW </Link>
      </div>
      <DataGrid
        rows={experiments}
        columns={userColumns.concat(actionColumns)}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>

  );
};

export default Datatable;
