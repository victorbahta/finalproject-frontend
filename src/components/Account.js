import Property from "./Property";
import { Link } from "react-router-dom";
function Account({ account }) {
  //  const accounts = account.properties.map(a=>
  //  <Account price={a.price} roomNo={a.roomNo}/>)

  return (
    <tbody>
      <td> {account.name}</td>
      <td> {account.email}</td>
      <td> {account.account_id}</td>
      {/* <td> {account.password}</td> */}
      {/* <td>{account.role === "owner" ? <button>Aprove Owner</button> : ""}</td> */}

      {/* <button class="btn btn-primary"> Details </button> */}
      <td>
        <button class="btn">
          <Link to={"/accounts/" + account.accountId}>Details</Link>
        </button>
      </td>

      {/* {properties} */}
    </tbody>
  );
}

export default Account;
