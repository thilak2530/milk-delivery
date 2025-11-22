import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, ArrowLeft } from "lucide-react";
import "../styles/Areas.css";
import axios from "axios";

function Areas() {
  const navigate = useNavigate();
  const [areas, setAreas] = useState([]);

  useEffect(() => {
      const BASE_URL = process.env.REACT_APP_BACKEND_URL;
    axios
      .get(`${BASE_URL}/areas`)
      .then((response) => {
        // Format backend response
        const formatted = response.data.map((item, index) => ({
          id: index + 1,
          name: item.area,
          customerCount: item.customerCount,
        }));
        setAreas(formatted);
      })
      .catch((error) => console.error("Error fetching areas:", error));
  }, []);

  const handleAreaSelect = (areaName) => {
    navigate(`/${areaName}/delivery`);
  };

  return (
    <div className="areas-container">
      <div className="areas-inner">
        {/* Header */}
        <div className="areas-header">
          <button className="touch-button" onClick={() => navigate("/")}>
            <ArrowLeft className="icon" />
          </button>
          <div>
            <h1>Select Area</h1>
            <p>Choose your delivery area</p>
          </div>
        </div>

        {/* Grid */}
        <div className="areas-grid">
          {areas.map((area) => (
            <div
              key={area.id}
              className="customer-card"
              onClick={() => handleAreaSelect(area.name)}
             >
              <div className="card-content">
                <div className="icon-box">
                  <MapPin className="map-icon" />
                </div>
                <div>
                  <h3>{area.name}</h3>
                  <p>{area.customerCount} customers</p>
                </div>
              </div>
              <button className="start-button">Start Delivery</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Areas;