import React from "react";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Link } from "react-router-dom";
import "./widget.scss";

const Widget = ({ type }) => {
  let data;
  switch (type) {
    case "customer":
      data = {
        title: "Total responses",
        link: "of candidates for the period",
        amount: 2436,
        diff: 15,
        // icon: <PersonOutlineOutlinedIcon className="icon" style={{ color: "crimson", backgroundColor: "#ff000033" }} />,
      };
      break;

    case "order":
      data = {
        title: "Responses today",
        isMoney: false,
        link: "candidates left a response",
        amount: 98,
        diff: -10,
        // icon: <ShoppingCartOutlinedIcon className="icon" style={{ color: "goldenrod", backgroundColor: "#daa52033" }} />,
      };
      break;

    case "earnings":
      data = {
        title: "Total vacancies",
        isMoney: true,
        link: "active and closed vacancies",
        amount: 49,
        diff: -10,
        // icon: <MonetizationOnOutlinedIcon className="icon" style={{ color: "green", backgroundColor: "#00800033" }} />,
      };
      break;

    case "balance":
      data = {
        title: "Closed vacancies",
        link: "18 out of 49",
        // icon: <AccountBalanceWalletOutlinedIcon className="icon" style={{ color: "purple", backgroundColor: "#80008033" }} />,
      };
      break;

    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && ""} {data.amount}
        </span>
        <span className="link">
          <Link to="/candidatelist">View Details</Link> {/* Link to CandidateList */}
        </span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {data.diff}%
        </div>
        {/* {data.icon} */}
      </div>
    </div>
  );
};

export default Widget;
