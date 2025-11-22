
import { ArrowLeft, Phone, MapPin, IndianRupee} from "lucide-react";
import { useNavigate,useParams  } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"
import { toast } from "sonner";


import "../styles/CustomerDetails.css";

function CustomerDetail(){
  const navigate = useNavigate();
  const [customer,setCustomers]=useState({})
  const { id } = useParams();
  const [selectedCustomer, setSelectedCustomer] = useState(false);
  const BASE_URL = process.env.REACT_APP_BACKEND_URL;

 useEffect(() => {
    
    axios.get(`${BASE_URL}/customers/${id}`)
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error("Error fetching customers:", error);
      });
  }, [id,BASE_URL]);


//  pending database**************************************************************

  // const deliveryHistory = [
  //   { date: "2024-03-20", quantity: "500 ml", amount: 30 },
  //   { date: "2024-03-19", quantity: "500 ml", amount: 30 },
  //   { date: "2024-03-18", quantity: "1 L", amount: 60 },
  //   { date: "2024-03-17", quantity: "500 ml", amount: 30 },
  // ];

  const handlePaymentReceived = () => {

    axios.patch(`${BASE_URL}/${customer.id}/completedPayment`,{
      amount:0
      
    })
    .then((response)=>{

      toast.success("Payment marked as received", {
        description: `₹${customer.balance} received from ${customer.name}`,
      });
      setSelectedCustomer(false);
      const updatedData=response.data;
      setCustomers((prev) => ({...prev,balance: updatedData.balance}));
    })

    .catch((error)=>{console.log("payment clearing issue in database");setSelectedCustomer(false)})
    
  };



  return (
    <div className="customer-page">
      <div className="customer-container">
        {/* Header */}
        <div className="header">
          <button variant="ghost" size="icon" onClick={() => navigate("/customers")} className="touch-button">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="customer-name">{customer.name}</h1>
            <p className="customer-house">House {customer.house_no}</p>
          </div>
        </div>

        {/* Contact & Location */}
        <div className="stat-card customer-stat-card">
          <div className="info-line">
            <Phone className="icon" />
            <a href={`tel:${customer.phoneNumber}`} className="info-text">{customer.phoneNumber}</a>
          </div>
          <div className="info-line">
            <MapPin className="icon" />
            <span className="info-text">{customer.street_name}</span>
          </div>
        </div>

        {/* Balance */}
        <div className="stat-card customer-stat-card warning-card">
          <div className="balance-container">
            <div className="balance-info">
              <div className="balance-icon">
                <IndianRupee className="h-6 w-6 text-warning" />
              </div>
              <div>
                <p className="balance-label">Pending Balance</p>
                <p className="balance-amount">₹{customer.balance}</p>
              </div>
            </div>
            <button onClick={()=>{setSelectedCustomer(true)}} className="touch-button mark-paid-button" size="lg">
              Mark Paid
            </button>
          </div>
        </div>

        {/* Milk Plan */}
        <div className="stat-card customer-stat-card">
          <h3 className="section-title">Milk Plan</h3>
          <div className="plan-details">
            <div className="plan-item">
              <span>Usual Quantity</span>
              <span className="value">{customer.usual_milk}</span>
            </div>
            <div className="plan-item">
              <span>Rate per Litre</span>
              <span className="value">₹{customer.ratePerLitre}</span>
            </div>
            <div className="plan-item">
              <span>Member Since</span>
              <span className="value">{customer.startDate}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {customer.notes && (
          <div className="stat-card customer-stat-card">
            <h3 className="section-title">Notes</h3>
            <p className="notes-text">{customer.notes}</p>
          </div>
        )}

        {/* Delivery History */}
        {/* <div className="stat-card customer-stat-card">
          <h3 className="section-title">Recent Deliveries</h3>
          <div className="delivery-list">
            {deliveryHistory.map((delivery, index) => (
              <div key={index} className="delivery-item">
                <div className="delivery-info">
                  <Calendar className="icon small" />
                  <div>
                    <p className="delivery-date">{delivery.date}</p>
                    <p className="delivery-qty">{delivery.quantity}</p>
                  </div>
                </div>
                <p className="delivery-amount">₹{delivery.amount}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* Action */}
        <button  className="edit-customer-button" size="lg">
          Edit Customer Info
        </button>


        {/* once more conforming payment */}
        {selectedCustomer  && (
          <div className="dialog-overlay">
            <div className="dialog-box">
              <h2>conform payment of   <span style={{ fontSize: "30px" }}><IndianRupee className="icon"/>{customer.balance}</span></h2>
              <button className="deliver-button" onClick={()=>{handlePaymentReceived();}}>
                conform
              </button> 
              
              
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetail;