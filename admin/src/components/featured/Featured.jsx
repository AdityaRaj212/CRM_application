import React from "react";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./featured.scss";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import ChangingProgressProvider from "./ChangingProgressProvider";

const Featured = () => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Candidate Sources</h1>
        <MoreVertOutlinedIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <ChangingProgressProvider
            values={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          >
            {(percentage) => (
              <CircularProgressbar
                value={percentage}
                text={`${percentage}%`}
                styles={buildStyles({
                  pathTransitionDuration: .95,
                  trailColor: "#24b65e",
                  pathColor: "#5d0909",
                  textColor: "#24b65e",
                })}
              />
            )}
          </ChangingProgressProvider>
        </div>
        {/* <p className="title">Total sales made today</p> */}
        {/* <p className="amount">$2042.50K</p> */}
        {/* <p className="desc">Previous transactions</p> */}
        {/* <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount ">$19.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Week</div>
            <div className="itemResult positive">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">$60.4k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month</div>
            <div className="itemResult negative">
              <KeyboardArrowDownIcon fontSize="small" />
              <div className="resultAmount">$73.4k</div>
            </div>
          </div>
        </div> */}
        <br />
        <br />
        <br />
        <div className="box">
            <h4>HH.ru</h4>
            <br />
            <p>685 responses</p>
            <br />
            <h4>Getmatch</h4>
            <br />
            <p>294 responses</p>
           
             
            
            
        </div>
     
        <br />
        <div className="box-1">
        <h4>Linkedin</h4>
        <br />
            <p>88 responses</p>
            <br />
            <h4>Telegram</h4>
            <br />
            <p>105 responses</p>
        </div>
        <br />
        <div className="box-1">
        <h4>Habr  </h4>
        <br />
            <p>168 responses</p>
            <br />
            <h4>GrapplTech</h4>
            <br />
            <p>201 responses</p>
        </div>
      </div>
    </div>
  );
};

export default Featured;