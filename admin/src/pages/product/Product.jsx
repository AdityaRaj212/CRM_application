import React from "react";
import Sidebar from "../../../../../admin/src/components/sidebar/Sidebar.jsx";
import Navbar from "../../../../../admin/src/components/navbar/Navbar.jsx";
import "./product.scss";
import Productable from "../../../../../admin/src/components/productable/Productable.jsx";
import { Link } from "react-router-dom";

const Product = () => {
  return ( 
    <div className="product">
      <Sidebar />
      <div className="productContainer">
        <Navbar />
        <div className="productList">
          <div className="datatableTitle">
            <span>Add New Product</span>
            <Link
              to="/products/productId/new"
              style={{ textDecoration: "none" }}
            >
              <span className="link">Add New </span>
            </Link>
          </div>
          <Productable />
        </div>
      </div>
    </div>
  );
};

export default Product;