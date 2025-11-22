import { ArrowLeft, Plus, Search, Phone, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/AllCustomers.css";
import axios from "axios";

function Customers() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    const BASE_URL = process.env.REACT_APP_BACKEND_URL;
    axios.get(`${BASE_URL}/customers`)
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error("Error fetching customers:", error);
      });
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.house_no?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.street_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="customers-container">
      <div className="customers-inner">
        {/* Header */}
        <div className="customers-header">
          <div className="customers-header1">
            <button
              onClick={() => navigate("/")}
              className="customers-back-btn"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>

            <div className="customers-title">
              <h1>All Customers</h1>
              <p>{customers.length} total customers</p>
            </div>
          </div>

          <button
            onClick={() => navigate("/customers/add")}
            className="customers-add-btn"
          >
            <Plus className="h-6 w-6" />
          </button>
        </div>

        {/* Search */}
        <div className="customers-search">
          <Search className="customers-search-icon" />
          <input
            placeholder="Search by name, house, or area..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="customers-search-input"
          />
        </div>

        {/* Customer List */}
        <div className="customers-list">
          {filteredCustomers.map((c) => (
            <div
              key={c.id}
              className="customer-card"
              onClick={() => navigate(`/customers/${c.id}`)}
            >
              <div className="customer-card-inner">
                <div className="customer-info">
                  <h3>{c.name}</h3>
                  <div className="customer-details">
                    <div className="customer-detail">
                      <MapPin className="icon" />
                      <span>House {c.house_no}, {c.street_name}</span>
                    </div>
                    <div className="customer-detail">
                      <Phone className="icon" />
                      <span>{c.phoneNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="customer-balance">
                  <p>Balance</p>
                  <h4>₹{c.balance}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Customers;