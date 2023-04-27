import { useEffect, useRef, useState } from "react";
import Account from "../components/Account";
import axios from "axios";
import img1 from "../images/img1.jpg";

import { Link } from "react-router-dom";
import AdminSideMenu from "../templates/AdminSideMenu";

// const [flag, setFlag] = useState(false);

export const accountsArray = [
  {
    id: 1,
    role: "admin",
    name: "John Doe",
    email: "johndoe@example.com",
    password: "password1",

    properties: [
      {
        id: 1,
        status: "PENDING",
        views: 35,
        location: "Fairfield",
        propertyType: "sell",
        roomNo: 4,
        homeType: "Family",
        price: 200000,
        image: img1,
      },
      {
        id: 1,
        status: "PENDING",
        views: 35,
        location: "Fairfield",
        propertyType: "sell",
        roomNo: 4,
        homeType: "Family",
        price: 200000,
        image: img1,
      },
    ],
  },

  {
    id: 2,
    role: "owner",
    name: "Jane Doe",
    email: "janedoe@example.com",
    password: "password2",
  },
  {
    id: 3,
    role: "customer",
    name: "Bob Smith",
    email: "bobsmith@example.com",
    password: "password3",
  },
];
function Accounts() {
  const [usersAccounts, setAccountsState] = useState([{}]);

  const fetchAccounts = () => {
    axios
      .get("http://localhost:8080/users")
      .then((response) => {
        setAccountsState(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchAccounts();
  }, []);
  const accounts = usersAccounts.map((a) => {
    return (
      // <Link to={`${a.id}`} key={a.id}>
      <Account account={a} key={a.account_id} />
      // {/* </Link> */}
    );
  });

  return (
    <>
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="container-fluid">
          <AdminSideMenu />

          <div class="table-responsive">
            <table class="table table-striped table-sm">
              <thead>
                <tr>
                  {/* <th scope="col">ID</th> */}
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  {/* <th scope="col">Role</th> */}
                  <th scope="col">Action</th>
                </tr>
              </thead>

              {accounts}
            </table>
          </div>
        </div>
      </main>
    </>
  );
}

export default Accounts;

// <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
//                 <div class="table-responsive">
//                     <table class="table table-striped table-sm">
//                         <thead>
//                             <tr>
//                                 <th scope="col">#</th>
//                                 <th scope="col">Header</th>
//                                 <th scope="col">Header</th>
//                                 <th scope="col">Header</th>
//                                 <th scope="col">Header</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td>1,001</td>
//                                 <td>random</td>
//                                 <td>data</td>
//                                 <td>placeholder</td>
//                                 <td>text</td>
//                             </tr>

//                         </tbody>
//                     </table>
//                 </div>

//             </main>
