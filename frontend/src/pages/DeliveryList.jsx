import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, Milk } from "lucide-react";
import "../styles/DeliveryList.css";
import axios from "axios";

function DeliveryList() {
  const navigate = useNavigate();
  const { areaName } = useParams();
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [deliveredToday, setDeliveredToday] = useState(new Set());
  const [customers, setCustomers] = useState([]);

  const quantities = ["250 ml", "500 ml", "750 ml", "1 L"];

  // Get today's date string
  const todayString = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  // Load delivered info from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("deliveredToday")) || {};
    const todayDelivered = new Set();

    // Only keep customers delivered today
    for (let id in stored) {
      if (stored[id] === todayString) {
        todayDelivered.add(parseInt(id));
      }
    }

    setDeliveredToday(todayDelivered);
    const BASE_URL = process.env.REACT_APP_BACKEND_URL;
    axios
      .get(`${BASE_URL}/${areaName}/customers`)
      .then((res) => setCustomers(res.data))
      .catch(console.error);
  }, [areaName, todayString]);

  const getPrice = (quantity) => {
    switch (quantity) {
      case "250 ml":
        return 15;
      case "500 ml":
        return 30;
      case "750 ml":
        return 45;
      case "1 L":
        return 60;
      default:
        return 0;
    }
  };

  const handleDelivery = (customerId, quantity) => {
    const price = getPrice(quantity);

    const BASE_URL = process.env.REACT_APP_BACKEND_URL;
     axios
      .patch(`${BASE_URL}/updateDelivery/${customerId}`, {delivery:true })
      .then((res) => {
        console.log("succes");
        console.log(customerId);
        
      })
      .catch(console.error);

    // Update deliveredToday state
    setDeliveredToday((prev) => new Set(prev).add(customerId));

    // Save to localStorage with today's date
    const stored = JSON.parse(localStorage.getItem("deliveredToday")) || {};
    stored[customerId] = todayString;
    localStorage.setItem("deliveredToday", JSON.stringify(stored));

    setSelectedCustomer(null);
    alert(`✅ Delivered ${quantity} to customer.`);

    // Update backend balance
    
    axios
      .patch(`${BASE_URL}/${customerId}/add-balance`, { amount: price })
      .then((res) => {
        const updatedCustomer = res.data;
        setCustomers((prev) =>
          prev.map((c) =>
            c.id === customerId ? { ...c, balance: updatedCustomer.balance } : c
          )
        );
      })
      .catch(console.error);

     
  };

  return (
    <div className="delivery-container">
      <div className="delivery-inner">
        {/* Header */}
        <div className="delivery-header">
          <button className="back-button" onClick={() => navigate("/areas")}>
            <ArrowLeft className="icon" />
          </button>
          <div>
            <h1>Delivery Route</h1>
            <p>Area: {areaName}</p>
          </div>
        </div>

        {/* Customer List */}
        <div className="customers-list">
          {customers.map((customer) => (
            <div key={customer.id} className="customer-card">
              <div className="customer-info">
                <div className="left">
                  <h3>
                    {customer.name}
                    {deliveredToday.has(customer.id) && (
                      <span className="delivered-tag">
                        <Check className="delivered-icon" /> Delivered
                      </span>
                    )}
                  </h3>
                  <p>House {customer.house_no}</p>
                </div>
                <div className="right">
                  <p className="balance-label">Balance</p>
                  <p className="balance-value">₹{customer.balance}</p>
                </div>
              </div>

              <div className="milk-info">
                <Milk className="milk-icon" /> Usual: {customer.usual_milk}
              </div>

              <button
                className={`deliver-button ${
                  deliveredToday.has(customer.id) ? "disabled" : ""
                }`}
                disabled={deliveredToday.has(customer.id)}
                onClick={() =>
                  !deliveredToday.has(customer.id) &&
                  setSelectedCustomer(customer.id)
                }
              >
                {deliveredToday.has(customer.id)
                  ? "Delivered Today"
                  : "Deliver Now"}
              </button>
            </div>
          ))}
        </div>

        {/* Quantity Popup */}
        {selectedCustomer !== null && (
          <div className="dialog-overlay">
            <div className="dialog-box">
              <h2>Select Quantity</h2>
              <div className="quantity-grid">
                {quantities.map((qty, idx) => (
                  <button
                    key={idx}
                    className="quantity-button"
                    onClick={() => handleDelivery(selectedCustomer, qty)}
                  >
                    <Milk className="milk-icon-large" /> {qty}
                  </button>
                ))}
              </div>
              <button
                className="close-dialog"
                onClick={() => setSelectedCustomer(null)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeliveryList;