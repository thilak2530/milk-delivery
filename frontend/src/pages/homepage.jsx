import React, {useEffect, useState} from "react";
import "../styles/Home.css";
import { Milk, Users, IndianRupee, TrendingUp,MapPin,List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Home(){

  const[totalBalance,setTotalBalance]=useState("")
  const[totalCustomers,setTotalCustomers]=useState("")

    useEffect(()=>{
      const BASE_URL = process.env.REACT_APP_BACKEND_URL;
        axios.get(`${BASE_URL}/stats`)
        .then((response)=>{
          setTotalCustomers(response.data.totalCount);
          setTotalBalance(response.data.totalBalance);
        })
        .catch((error)=>{
          console.log(error);
        });

    },[])


  const navigate = useNavigate();
    return(
    <div className="app">
      <div className="container">
        <div className="header header2">
          <div className="icon-center">
            <Milk className="main-icon" />
          </div>
          <h1>Milk Delivery</h1>
          <p>Track your daily deliveries easily</p>
        </div>

        <div className="grid">
          <div className="stat-card">
            <div className="icon-section primary">
              <Users className="icon" />
            </div>
            <div className="matter">
              <p className="label">Customers</p>
              <p className="value">{totalCustomers}</p>
              
            </div>
          </div>

          <div className="stat-card">
            <div className="icon-section success">
              <Milk className="icon" />
            </div>
            <div className="matter">
              <p className="label">Today</p>
              <p className="value">----</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="icon-section warning">
              <IndianRupee className="icon" />
            </div>
            <div className="matter">
              <p className="label">Pending</p>
              <p className="value">₹{totalBalance}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="icon-section info">
              <TrendingUp className="icon" />
            </div>
            <div className="matter">
              <p className="label">Revenue</p>
              <p className="value">₹------</p>
            </div>
          </div>
        </div>
         <button 
          onClick={() => navigate("/areas")}
          className="start-delivery-button"
          >
          <MapPin className="icon" />
          Start Deliveries
        </button>
        <button 
            onClick={() => navigate("/customers")}
            className="coustomers-view-button"
            
          >
            <List className="icon" />
            View All Customers
          </button>
      </div>
    </div>
  );

}

export default Home;