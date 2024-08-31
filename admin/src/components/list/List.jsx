import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./list.scss";

const rows = [
  {
    id: 2117383933399,
    product: "John Smith",
    img: "https://cdn.pixabay.com/photo/2023/06/10/18/09/business-8054605_640.jpg",
    customer: "5",
    date: "285",
    amount: 300,
    close:"5 days",
 
    status: "Approved",
  },
  {
    id: 6617772543119,
    product: "John Smith",
    img: "https://cdn.pixabay.com/photo/2023/06/10/07/18/business-8053376_640.jpg",
    customer: "8",
    date: "285",
    amount: 100,
    close:"7 days",
    // method: "Online Payment",
    status: "Pending",
  },
  {
    id: 200116351133,
    product: "John Smith",
    img: "https://cdn.pixabay.com/photo/2020/10/14/07/18/woman-5653501_640.jpg",
    customer: "9",
    date: "285",
    amount: 200,
    close:"8 days",
    // method: "Online Payment",
    status: "Approved",
  },
  {
    id: 22567721541,
    product: "John Smith",
    img: "https://cdn.pixabay.com/photo/2023/06/10/07/18/business-8053374_640.jpg",
    customer: "5",
    date: "285",
    amount: 160,
    close:"4 days",
    // method: "Cash on Delivery",
    status: "Pending",
  },
  {
    id: 2117383933399,
    product: "John Smith",
    img: "https://cdn.pixabay.com/photo/2021/04/26/09/30/man-6208470_640.jpg",
    customer: "7",
    date: "285",
    amount: 570,
    close:"10 days",
    // method: "Online Payment",
    status: "Approved",
  },
  {
    id: 4520015619,
    product: "John Smith",
    img: "https://cdn.pixabay.com/photo/2023/06/10/18/09/business-8054608_640.jpg",
    customer: "6",
    date: "285",
    amount: 1800,
    close:"15 days",
    // method: "Cash on Delivery",
    status: "Approved",
  },
  {
    id: 25566001527,
    product: "John Smith",
    img: "https://cdn.pixabay.com/photo/2020/02/02/17/12/business-4813612_640.jpg",
    customer: "4",
    date: "285",
    amount: 20,
    close:"11 days",
    // method: "Cash on Delivery",
    status: "Pending",
  },
  {
    id: 2117383933399,
    product: "John Smith",
    img: "https://cdn.pixabay.com/photo/2020/02/04/16/41/business-suit-4818747_640.jpg",
    customer: "2",
    date: "285",
    amount: 25,
    close:"2 days",
    // method: "Cash on Delivery",
    status: "Approved",
  },
  {
    id: 2117383933399,
    product: "John Smith",
    img: "https://cdn.pixabay.com/photo/2015/12/09/04/27/a-single-person-1084191_640.jpg",
    customer: "11",
    date: "285",
    amount: 270,
    close:"12 days",
    // method: "Cash on Delivery",
    status: "Approved",
  },
  {
    id: 6117383933399,
    product: "John Smith",
    img: "https://cdn.pixabay.com/photo/2023/06/09/08/25/ai-generated-8051239_640.jpg",
    customer: "5",
    date: "285",
    amount: 300,
    close:"16 days",
    // method: "Cash on Delivery",
    status: "Approved",
  },
  {
    id: 8617772543119,
    product: "John Smith",
    img: "https://cdn.pixabay.com/photo/2020/02/08/17/02/office-4830633_640.jpg",
    customer: "7",
    date: "285",
    amount: 100,
    close:"5 days",
    // method: "Online Payment",
    status: "Pending",
  },
  {
    id: 200116351133,
    product: "John Smith",
    img: "https://cdn.pixabay.com/photo/2016/04/05/20/29/man-1310291_640.png",
    customer: "0",
    date: "285",
    amount: 200,
    close:"8 days",
    // method: "Online Payment",
    status: "Approved",
  },
  {
    id: 28567721541,
    product: "John Smith",
    img: "https://cdn.pixabay.com/photo/2019/12/17/17/09/woman-4702060_640.jpg",
    customer: "4",
    date: "285",
    amount: 160,
    close:"5 days",
    // method: "Cash on Delivery",
    status: "Pending",
  },
  {
    id: 2517383933399,
    product: "John Smith",
    img: "https://cdn.pixabay.com/photo/2023/06/10/18/09/business-8054605_640.jpg",
    customer: "6",
    date: "285",
    amount: 570,
    close:"6 days",
    // method: "Online Payment",
    status: "Approved",
  },
  {
    id: 48820015619,
    product: "John Smith",
    img: "https://cdn.pixabay.com/photo/2023/06/10/18/09/business-8054605_640.jpg",
    customer: "8",
    date: "285",
    amount: 1800,
    close:"3 days",
    // method: "Cash on Delivery",
    status: "Approved",
  },
  {
    id: 2557766001527,
    product: "John Smith",
    img: "https://cdn.pixabay.com/photo/2023/06/10/18/09/business-8054605_640.jpg",
    customer: "6",
    date: "285",
    amount: 20,
    close:"20 days",
    // method: "Cash on Delivery",
    status: "Pending",
  },
  {
    id: 21047383933399,
    product: "John Smith",
    img: "https://cdn.pixabay.com/photo/2023/06/10/18/09/business-8054605_640.jpg",
    customer: "8",
    date: "285",
    amount: 25,
    close:"5 days",
    // method: "Cash on Delivery",
    status: "Approved",
  },
  {
    id: 21987383933399,
    product: "John Smith",
    img: "https://cdn.pixabay.com/photo/2023/06/10/18/09/business-8054605_640.jpg",
    customer: "4",
    date: "285",
    amount: 270,
    close:"4 days",
    // method: "Cash on Delivery",
    status: "Approved",
  },
];

const List = () => {
  return (
    <div className="list">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell">Recrutier Id</TableCell>
              <TableCell className="tableCell"> Recrutier </TableCell>
              <TableCell className="tableCell"> Active vacancies </TableCell>
              <TableCell className="tableCell"> Number of responses </TableCell>
              <TableCell className="tableCell">Employees hired</TableCell>
              <TableCell className="tableCell"> Vacancy Closing </TableCell>
              <TableCell className="tableCell">Status</TableCell>
              {/* <TableCell className="tableCell">Payment Method</TableCell> */}

            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="tableCell">{row.id}</TableCell>
                <TableCell className="tableCell">
                  <div className="cellWrapper">
                    <img src={row.img} alt="" className="image" />
                    {row.product}
                  </div>
                </TableCell>
                <TableCell className="tableCell">{row.customer}</TableCell>
                <TableCell className="tableCell">{row.date}</TableCell>
                <TableCell className="tableCell">{row.amount}</TableCell>
                <TableCell className="tableCell">{row.close}</TableCell>
                {/* <TableCell className="tableCell">{row.method}</TableCell> */}
                <TableCell className="tableCell">
                  <span className={`status ${row.status}`}>{row.status}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default List;