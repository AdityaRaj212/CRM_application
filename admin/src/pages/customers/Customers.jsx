import React from "react";
import Datatable from "../../../../../admin/src/components/datatable/Datatable";
import Sidebar from "../../../../../admin/src/components/sidebar/Sidebar";
import Navbar from "../../../../../admin/src/components/navbar/Navbar";
import "./customers.scss";

const Customers = () => {
  return (
    <div className="customers">
      <Sidebar />
      <div className="customersContainer">
        <Navbar />
        <Datatable />
      </div>
    </div>
  );
};

export default Customers;