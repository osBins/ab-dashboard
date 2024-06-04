import "./goal.scss";
import React, { useState, useEffect } from 'react';
import { DataGrid } from "@mui/x-data-grid";
import { goalColumns } from "../../goaldatasource";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { AutoGraph } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { config } from "../../config";


const Datatable = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.baseURL}/goals`);
        response.data.forEach(goal => {
          const textConfig = JSON.stringify(goal.sourceConfig);
          goal.sourceConfig = textConfig
        })
        setGoals(response.data);
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
        GOALS
        <Link
          to="/goals/new"
          style={{ textDecoration: "none" }}
          className="link"> ADD NEW </Link>
      </div>
      <DataGrid
        rows={goals}
        columns={goalColumns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>

  );
};

export default Datatable;
