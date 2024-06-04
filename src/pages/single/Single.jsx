import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/ResultInfoChart";
import List from "../../components/list/List";
import { config } from "../../config";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import moment from "moment";

const Single = () => {
  const [experimentData, setExperimentData] = useState();
  const [loading, setLoading] = useState(true);

  const { expId } = useParams()

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.baseURL}/experiment/${expId}`);
      
      const start = moment(response.data.startDate).format('D MMMM YYYY - h:mm A')
      const end = moment(response.data.endDate).format('D MMMM YYYY - h:mm A')
            
      response.data.startDate = start
      response.data.endDate = end
      setExperimentData(response.data)
    } 
    catch (error) {
      console.error('Nai aaya experiment data:', error);
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
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <h1 className="title">EXPERIMENT</h1>
            <div className="item">
              
              <div className="details">
                <h1 className="itemTitle">{experimentData.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">ID:</span>
                  <span className="itemValue">{experimentData.id}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Description:</span>
                  <span className="itemValue">{experimentData.description}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Goal ID:</span>
                  <span className="itemValue">{experimentData.goalId}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Start:</span>
                  <span className="itemValue">{experimentData.startDate}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">End:</span>
                  <span className="itemValue">{experimentData.endDate}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={4 / 1} title="Variation Counts" />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Last Transaction</h1>
          <List />
        </div>
      </div>
    </div>
  );
};

export default Single;
