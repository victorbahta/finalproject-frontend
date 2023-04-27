import { useEffect, useRef, useState } from "react";
import Account from "../components/Account";
import axios from "axios";
import img1 from "../images/img1.jpg";

import { Link } from "react-router-dom";
// import AdminSideMenu from "../templates/AdminSideMenu";

// const [flag, setFlag] = useState(false);

function Admin() {
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
          {/* <AdminSideMenu /> */}

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

export default Admin;
