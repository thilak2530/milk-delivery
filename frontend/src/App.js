import React from "react";
import Home from "./pages/homepage";
import Areas from "./pages/Areas";
import DeliveryList from "./pages/DeliveryList";
import Customers from "./pages/AllCustomers";
import CustomerDetails from "./pages/CustomerDetails"
import { BrowserRouter as Router, Routes, Route ,Navigate} from "react-router-dom";
import { Toaster } from 'sonner';
import AddCustomer from "./pages/AddCustomer";




function App(){
  return (
    <Router>
       <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Navigate to={"/home"}/>} />
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/customers/add" element={<AddCustomer/>}></Route>
        <Route path="/customers/:id" element={<CustomerDetails/>} />
        <Route path="/customers" element={<Customers/>}></Route>
        <Route path="/:areaName/delivery" element={<DeliveryList />} />
        <Route path="/areas" element={<Areas/>}></Route>
      </Routes>
    </Router>
    
  );
}


export default App;