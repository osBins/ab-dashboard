import "./datatable.scss";
import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datasource";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";

const config = {
  baseURL: 'http://127.0.0.1:8080/abacus-service'
};

const Datatable = () => {
  const [experiments, setExperiments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.baseURL}/experiments`);
        
        response.data.forEach(experiment => {
          const timeNow = Date.now()
          const expStarted = timeNow > Date.parse(experiment.startDate) 
          const expEnded = timeNow > Date.parse(experiment.endDate)
          const start = moment(experiment.startDate).format('D MMMM YYYY - h:mm A')
          const end = moment(experiment.endDate).format('D MMMM YYYY - h:mm A')
          experiment.startDate = start;
          experiment.endDate = end;
        
          if (expStarted === true && expEnded === false) {
            experiment.status = "Active";
          }
          else {
            experiment.status = "Inactive"
          }
        })
        setExperiments(response.data);
        setLoading(false);
      }
      catch (error) {
        setLoading(false);
        throw new Error("Response not received.");
      }
    }
    fetchData();
  }, []);


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data</p>;

  const actionColumns = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: () => {
        return (
          <div className="cellAction">
            <Link to="/experiments/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div className="deleteButton">Delete</div>
          </div>
        );
      }
    }
  ];
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
     //   columns={userColumns.concat(actionColumns)}
        columns={userColumns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>

  );
};

export default Datatable;
