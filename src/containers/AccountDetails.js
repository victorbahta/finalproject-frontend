import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import Property from "../components/Property";
import { accountsArray } from "./Accounts";
import axios from "axios";
import { useEffect, useState } from "react";
import { propertyContext } from "../context/PropertyContext";
import Account from "../components/Account";

function AccountDetails(props) {
  const params = useParams();
  const navigate = useNavigate();
  const [accountDetail, setAccountDetail] = useState({});
  const [flag, setFlag] = useState(false);

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
      <br />
      <br />
      <br />
      <br />
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
                  //   <Account id={role.id} key={role.id} cName={role.role} />
                  <span>
                    {role.role}

                    {role.role === "owner" &&
                    accountDetail.status === "inactive" ? (
                      <p>
                        <button
                          onClick={() => {
                            activate();
                          }}
                          className="btn btn-primary"
                        >
                          Activate
                        </button>
                        {/* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
                      </p>
                    ) : (
                      " "
                    )}
                    <button
                      onClick={() => {
                        deactivate();
                      }}
                      className="btn btn-danger"
                    >
                      Deactivate
                    </button>
                  </span>
                );
              })
            : null}
        </div>

        <div>
          {accountDetail.propertyList == null ? "" : <h3>PropertyList</h3>}
          {/* <br /> */}
          {accountDetail.propertyList != null
            ? accountDetail.propertyList.map((p) => {
                // let role=role.role;
                return (
                  <Link to={`/properties/${p.id}`} key={p.id}>
                    <Property property={p} />
                  </Link>
                );
              })
            : null}
        </div>

        <Link to={-1}>Back</Link>
      </div>
      <br />

      {/* add this to blog context */}
    </article>
  );
}

export default AccountDetails;
