import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Property from "../components/Property";
import { accountsArray } from "./Accounts";
import axios from "axios";
import { useEffect, useState } from "react";
// import { propertyContext } from "../context/PropertyContext";
// import Account from "../components/Account";

function AccountDetails(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [accountDetail, setAccountDetail] = useState({});
  const [flag, setFlag] = useState(false);

  let properties;
  console.log(accountDetail);
   if(accountDetail.propertyList!=null){
    properties = accountDetail.propertyList.map(p => {
       return (
           <Link to={`${p.id}`} key={p.isbn} >
       <Property
                   property={p}
               /></Link>
               )
   
   });
   }

  const activate = () => {
    axios
      .put("http://localhost:8080/users/" + params.id + "/activate")
      .then(() => {
        setFlag(!flag);
      })
      .catch((err) => console.log(err.message));
  };

  const deactivate = () => {
    axios
      .put("http://localhost:8080/users/" + params.id + "/deactivate")
      .then(() => {
        setFlag(!flag);
      })
      .catch((err) => console.log(err.message));
  };

  useEffect(() => {
    console.log(params.id);
    if (params.id) {
      axios
        .get("http://localhost:8080/users/" + params.id)
        .then((response) => {
          setAccountDetail(response.data);
        })
        .catch((err) => console.log(err.message));
    }
  }, [params.id, flag]);

  return (
    <article>
    <br />
    <div className="Info">
      <p> Name: {accountDetail.name}</p>
      <p> Email : {accountDetail.email}</p>

      <div style={{ textAlign: "left" }}>
        {accountDetail.roles == null ? "Term status: inactive" : "Role: "}
        {/* <br /> */}
        {accountDetail.roles != null
          ? accountDetail.roles.map((role) => {
              // let role=role.role;
              return (
                <span>
                  {role.role}

                  {role.role !== "customer" ? (
                    accountDetail.status === "inactive" ? (
                      <button
                        onClick={() => {
                          activate();
                        }}
                        className="btn btn-primary"
                      >
                        Activate
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          deactivate();
                        }}
                        className="btn btn-danger"
                      >
                        Deactivate
                      </button>
                    )
                  ) : (
                    " "
                  )}
                </span>
              );
            })
          : null}
      </div>

      <Link to={-1}>Back</Link>
    </div>
    <br />
    {properties}
  </article>
  );
}

export default AccountDetails;
