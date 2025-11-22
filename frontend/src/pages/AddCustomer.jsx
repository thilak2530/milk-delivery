import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "../styles/AddCustomer.css"
import axios from "axios";




const AddCustomer = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    house_no: "",
    phoneNumber: "",
    street_name: "",
    usual_milk: "",
    ratePerLitre: 60,
    startDate: new Date().toISOString().split("T")[0],
    note: "",
    balance: 0
  });

  const areas = ["Main Street", "Park Lane", "Temple Road", "Market Area"];
  const quantities = ["250 ml", "500 ml", "1 L", "500 ml + 250 ml"];


 const transferData = (e) => {
  e.preventDefault();

  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

axios.post(`${BASE_URL}/addingCustomer`, formData)
    .then((response) => {
      alert("Successfully customer added");
      navigate("/");
    })
    .catch((error) => {
      alert("Failed to add customer");
    });
    
};

  return (
    <div className="min-h-screen  ">
      <div className="max-w-2xl ">

        {/* Header */}
        <div className="customers-header1 heading">
            <button
              onClick={() => navigate("/")}
              className="customers-back-btn"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>

            <div className="customers-title">
              <h1>Add New Customer</h1>
              <p> Fill in customer details</p>
            </div>
          </div>

        {/* Form */}
        <form onSubmit={transferData}>
          <div className="stat-card ">
            <div className="stat-card22">

              {/* Name */}
              <div className="space-y-2  padd">
                <label >Customer Name *</label>
                <input
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Enter full name"
                  
                />
              </div>

              {/* House + Phone */}
              <div className="grid padd">
                {/* House */}
                <div className="space-y-2 ">
                  <label className="text-base">House Number *</label>
                  <input
                    required
                    value={formData.house_no}
                    onChange={(e) =>
                      setFormData({ ...formData, house_no: e.target.value })
                    }
                    placeholder="12"
                   
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="text-base">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, phoneNumber: e.target.value })
                    }
                    placeholder="+91 98765 43210"
                    className="h-14 text-base border rounded-md w-full px-3"
                  />
                </div>
              </div>

              {/* Area */}
              <div className="space-y-2 padd">
                <label className="text-base" >Area *</label>
                <div className="select-wrapper">
                  <select
                    required
                    value={formData.street_name}
                    onChange={(e) =>
                      setFormData({ ...formData, street_name: e.target.value })
                    }
                    className="select"
                  >
                    <option value="" disabled>
                      Select area
                    </option>

                    {areas.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                </div>
                
              </div>

              {/* Quantity + Rate */}
              <div className="grid grid-cols-2 padd">

                {/* Quantity */}
                <div className="space-y-2 ">
                  <label className="text-base">Usual Quantity *</label>
                  <div className="select-wrapper">
                    <select
                      required
                      value={formData.usual_milk}
                      onChange={(e) =>
                        setFormData({ ...formData, usual_milk: e.target.value })
                      }
                    >
                      <option value="" disabled>Select quantity</option>
                      {quantities.map((qty) => (
                        <option key={qty} value={qty}>
                          {qty}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Rate */}
                <div className="space-y-2 ">
                  <label className="text-base">Rate per Litre *</label>
                  <input
                    value={formData.ratePerLitre}
                    onChange={(e) =>
                      setFormData({ ...formData, ratePerLitre: e.target.value })
                    }
                    placeholder="60"
                  />
                </div>
              </div>

              {/* Start Date */}
              <div className="space-y-2 padd">
                <label >Start Date *</label>
                <input
                  type="date"
                  required  
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                 
                />
              </div>

              {/* Notes */}
              <div className="space-y-2 padd">
                <label className="text-base">Notes (Optional)</label>
                <textarea
                  value={formData.note}
                  onChange={(e) =>
                    setFormData({ ...formData, note: e.target.value })
                  }
                  placeholder="Any special instructions..."
                  className=""
                />
              </div>

              {/* Submit */}
              <div className="space-y-2 padd">
                <button
                  className="save-btn"
                  type="submit"
                >
                  Save Customer
                </button>
              </div>

            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomer;