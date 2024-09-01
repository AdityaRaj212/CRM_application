import React from "react";
import Chart from "../../../../../admin/src/components/chart/Chart";
import Featured from "../../../../../admin/src/components/featured/Featured";
import List from "../../../../../admin/src/components/list/List";
import Navbar from "../../../../../admin/src/components/navbar/Navbar";
import Sidebar from "../../../../../admin/src/components/sidebar/Sidebar";
import Widget from "../../../../../admin/src/components/widget/Widget";
import "./home.scss";


const Home = () => {
  return (
    <div className="home">
      <>
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="widgets">
            <Widget type="customer" />
            <Widget type="order" />
            <Widget type="earnings" />
            <Widget type="balance" />
          </div>
          <div className="charts">
            <Featured />
            <Chart title="Last 6 months (Revenue)" aspect={2 / 1} />
          </div>
          <div className="listContainer">
            <div className="listTitle">Recruiters rating</div>
            <List />
          </div>
        </div>
      </>
    </div>
  );
};

export default Home;