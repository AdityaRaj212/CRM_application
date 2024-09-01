export const userColumns = [
    { field: "id", headerName: "ID", width: 70 },
    {
      field: "user",
      headerName: "User",
      width: 230,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.img} alt="avatar" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 100,
    },
    {
      field: "status",
      headerName: "Status",
      width: 160,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.status}`}>
            {params.row.status}
          </div>
        );
      },
    },
  ];
  
  export const userRows = [
    {
      id: 1,
      username: "Olivia",
      img: "https://images.unsplash.com/photo-1688572865439-be9cd43b6986?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMyfHxyYW5kb20lMjAlMjAlMjBjbGllbnQlMjBpbWd8ZW58MHx8MHx8fDA%3D",
      email: "olivia@gmail.com",
      status: "active",
      age: 35,
    },
    {
      id: 2,
      username: "Charlotte",
      img: "https://images.unsplash.com/photo-1685808155214-d968eb3a8493?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjEzfHxyYW5kb20lMjAlMjAlMjBjbGllbnQlMjBpbWd8ZW58MHx8MHx8fDA%3D",
      email: "charlotte@gmail.com",
      status: "passive",
      age: 21,
    },
    {
      id: 3,
      username: "Amelia",
      img: "https://images.unsplash.com/photo-1689789939394-1bba4d5ebf6c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQxfHxyYW5kb20lMjAlMjAlMjBjbGllbnQlMjBpbWd8ZW58MHx8MHx8fDA%3D",
      email: "amelia@gmail.com",
      status: "pending",
      age: 15,
    },
    {
      id: 4,
      username: "Camila",
      img: "https://images.unsplash.com/photo-1642977195740-1204d9c401b5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjQ2fHxyYW5kb20lMjAlMjAlMjBjbGllbnQlMjBpbWd8ZW58MHx8MHx8fDA%3D",
      email: "camila@gmail.com",
      status: "active",
      age: 26,
    },
    {
      id: 5,
      username: "Madison Clark",
      img: "https://images.unsplash.com/photo-1704809015707-4284ee79ef0e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjYwfHxyYW5kb20lMjAlMjAlMjBjbGllbnQlMjBpbWd8ZW58MHx8MHx8fDA%3D",
      email: "madison@gmail.com",
      status: "pending",
      age: 28,
    },
    {
      id: 6,
      username: "Alexander Hall",
      img: "https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzI4fHxyYW5kb20lMjAlMjAlMjBjbGllbnQlMjBpbWd8ZW58MHx8MHx8fDA%3D",
      email: "alexander@gmail.com",
      status: "passive",
      age: 20,
    },
    {
      id: 7,
      username: "Nova Garcia",
      img: "https://images.unsplash.com/photo-1619194617062-5a61b9c6a049?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzQzfHxyYW5kb20lMjAlMjAlMjBjbGllbnQlMjBpbWd8ZW58MHx8MHx8fDA%3D",
      email: "nova@gmail.com",
      status: "active",
      age: 30,
    },
    {
      id: 8,
      username: "Sebastian",
      img: "https://images.unsplash.com/photo-1688198911740-77dde4d0c5d6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzc4fHxyYW5kb20lMjAlMjAlMjBjbGllbnQlMjBpbWd8ZW58MHx8MHx8fDA%3D",
      email: "sebastian@gmail.com",
      status: "passive",
      age: 27,
    },
    {
      id: 9,
      username: "Olivia",
      img: "https://images.unsplash.com/photo-1522794172501-bddb216175fa?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzk1fHxyYW5kb20lMjAlMjAlMjBjbGllbnQlMjBpbWd8ZW58MHx8MHx8fDA%3D",
      email: "olivia@gmail.com",
      status: "active",
      age: 35,
    },
    {
      id: 10,
      username: "Charlotte",
      img: "https://images.unsplash.com/photo-1560011316-90b2677df5d9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDA1fHxyYW5kb20lMjAlMjAlMjBjbGllbnQlMjBpbWd8ZW58MHx8MHx8fDA%3D",
      email: "charlotte@gmail.com",
      status: "passive",
      age: 21,
    },
    {
      id: 11,
      username: "Amelia",
      img: "https://images.unsplash.com/photo-1685980027180-eba21bcf6372?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDM0fHxyYW5kb20lMjAlMjAlMjBjbGllbnQlMjBpbWd8ZW58MHx8MHx8fDA%3D",
      email: "amelia@gmail.com",
      status: "pending",
      age: 15,
    },
    {
      id: 12,
      username: "Camila",
      img: "https://images.unsplash.com/photo-1687462310643-e993a3f09102?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDM2fHxyYW5kb20lMjAlMjAlMjBjbGllbnQlMjBpbWd8ZW58MHx8MHx8fDA%3D",
      email: "camila@gmail.com",
      status: "active",
      age: 26,
    },
    {
      id: 13,
      username: "Madison Clark",
      img: "https://images.unsplash.com/photo-1534350131724-2a405f7108cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDU3fHxyYW5kb20lMjAlMjAlMjBjbGllbnQlMjBpbWd8ZW58MHx8MHx8fDA%3D",
      email: "madison@gmail.com",
      status: "pending",
      age: 28,
    },
    {
      id: 14,
      username: "Alexander Hall",
      img: "https://images.unsplash.com/photo-1686393858329-8bdb28e5025f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDc1fHxyYW5kb20lMjAlMjAlMjBjbGllbnQlMjBpbWd8ZW58MHx8MHx8fDA%3D",
      email: "alexander@gmail.com",
      status: "passive",
      age: 20,
    },
    {
      id: 15,
      username: "Nova Garcia",
      img: "https://images.unsplash.com/photo-1685651523477-7a67c62d00b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjA3fHxyYW5kb20lMjAlMjAlMjBjbGllbnQlMjBpbWd8ZW58MHx8MHx8fDA%3D",
      email: "nova@gmail.com",
      status: "active",
      age: 30,
    },
    {
      id: 16,
      username: "Sebastian",
      img: "https://images.unsplash.com/photo-1505999407077-7937810b98ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjM3fHxyYW5kb20lMjAlMjAlMjBjbGllbnQlMjBpbWd8ZW58MHx8MHx8fDA%3D",
      email: "sebastian@gmail.com",
      status: "passive",
      age: 27,
    },
  ];
  
  // export const productColumns = [
  //   { field: "partNumber", headerName: "PART NO", width: 100 },
  //   {
  //     field: "product",
  //     headerName: "Product",
  //     width: 230,
  //     renderCell: (params) => {
  //       return (
  //         <div className="cellWithImg">
  //           <img className="cellImg" src={params.row.img} alt="avatar" />
  //           {params.row.product}
  //         </div>
  //       );
  //     },
  //   },
  //   { field: "brands", headerName: "Brands", width: 100 },
  //   { field: "description", headerName: "Description", width: 230 },
  //   {
  //     field: "price",
  //     headerName: "Price",
  //     type: "number",
  //     width: 100,
  //   },
  //   {
  //     field: "stock",
  //     headerName: "Stock",
  //     width: 100,
  //   },
  //   {
  //     field: "addtoCart",
  //     headerName: "Add to cart",
  //     width: 160,
  //     renderCell: () => {
  //       return (
  //         <div className="addtoCart">
  //           <span>Add to cart</span>
  //         </div>
  //       );
  //     },
  //   },
  // ];
  
  // export const productRows = [
  //   {
  //     partNumber: "DRBDM063",
  //     img: "/assets/carbattery.jpg",
  //     product: "DRIVETEC 063 CAR BATTERY",
  //     brands: "DRIVETEC",
  //     description:
  //       "Quality, durability and reliability sum up the DriveTec range of automotive and commercial batteries",
  //     price: "$40.90",
  //     stock: "in stock",
  //     addtoCart: "Add to cart",
  //   },
  //   {
  //     partNumber: "51Wy1UhvbZL",
  //     img: "/assets/engineoil.jpg",
  //     product: "Auto Parts Engine Oil Viscosity",
  //     brands: "Turbo",
  //     description: "Brand Generic Vehicle Service Type Scooter",
  //     price: "$25.00",
  //     stock: "in stock",
  //     addtoCart: "Add to cart",
  //   },
  //   {
  //     partNumber: "HJKDM063",
  //     img: "/assets/engineoil2.jpg",
  //     product: "ENGINE OIL",
  //     brands: "Turbo",
  //     description: "BMW ENGINE OIL TWIN POWER",
  //     price: "$20.00",
  //     stock: "in stock",
  //     addtoCart: "Add to cart",
  //   },
  //   {
  //     partNumber: "31CTWTB2",
  //     img: "/assets/engineoil.jpg",
  //     product: "HONDA 4 STROKE ENGINE OIL",
  //     brands: "Platinum",
  //     description: "GOOD QUALITY. EASY TO USE. LONG LASTING",
  //     price: "$20.00",
  //     stock: "in stock",
  //     addtoCart: "Add to cart",
  //   },
  //   {
  //     partNumber: "HRDDR3055",
  //     img: "/assets/wheel.jpg",
  //     product: "Platinum Plus - Wheel",
  //     brands: "Platinum",
  //     description: "AlUMINUM WHEEL; 15 X 6; 45MM OFFSET; 5 SPOKE",
  //     price: "$160.00",
  //     stock: "in stock",
  //     addtoCart: "Add to cart",
  //   },
  //   {
  //     partNumber: "FGH543",
  //     img: "/assets/carbrush.jpg",
  //     product: "Short Handle Car and Motocycle Wheel Brush",
  //     brands: "Amazon",
  //     description:
  //       "Short-handled cleaning brush for removing dirt, dust and grime from Car, Motocycle",
  //     price: "$18.00",
  //     stock: "in stock",
  //     addtoCart: "Add to cart",
  //   },
  //   {
  //     partNumber: "YABYBX3055",
  //     img: "/assets/.jpg",
  //     product: "YUASA 055 3000 SERIES CAR BATTERY -4 YEAR WARRANTY",
  //     brands: "YUASA",
  //     description:
  //       "Quality, durability and reliability sum up the DriveTec range of automotive and commercial batteries",
  //     price: "$137.00",
  //     stock: "in stock",
  //     addtoCart: "Add to cart",
  //   },
  // ];