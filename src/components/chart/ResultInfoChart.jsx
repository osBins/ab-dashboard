import { useEffect, useState } from "react";
import "./chart.scss";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

import { config } from "../../config";
import moment from "moment";
import axios from "axios";
import { useParams } from "react-router-dom";

// const data = [
//   // { name: "January", total: 500 },
//   [75, 30]
// ];

// const sm = [
//   {
//     name: 'group A', 
//     count: 50
//   },
//   {
//     name: 'group B', 
//     count: 3
//   },
//   {
//     name: 'group C', 
//     count: 5
//   },
// ];

const Chart = ({ title, aspect }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const { expId } = useParams()
  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.baseURL}/experiment/${expId}/result`);
      setResult(response.data.result)
    } 
    catch (error) {
      console.error('Nai aaya result data:', error);
    } 
    finally {
      setLoading(false); // Set loading state to false regardless of success or error
    }
  }

  useEffect(() => {
    fetchData();
  },[]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" height="100%" aspect={aspect}>
      <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
        {/* <XAxis dataKey="name" stroke="blue" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip /> */}
        {/* <Area
            type="monotone"
            dataKey="total"
            stroke="aqua"
            fillOpacity={1}
            fill="url(#colorTotal)"
          /> */}
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
