import { Link, Navigate } from "react-router-dom";
import { propertyContext } from "../context/PropertyContext";
import { useContext } from "react";

import "./Header.css";

function Header() {
  const contextData = useContext(propertyContext);
  // console.log("inside the header thing" + contextData.isLoggedIn);

  const handleLogOut = () => {
    contextData.setLogInStatus(false);
  };

  return (
    <header className="header">
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark navbar-scroll">
        <a class="navbar-brand" id="logo" href="/homes">
          {/* <Link to={{pathname:"/homes", state:{propertyType: 'sell'}}}>All Homes</Link> */}
          All Homes
        </a>
        <ul className="navbar-nav ms-auto">
          <li>
            <Link to="/buy-home" state={{ propertyType: "sell" }}>
              Buy
            </Link>
          </li>
          <li>
            <Link to="/sell-home" state={{ propertyType: "sell" }}>
              Sell
            </Link>
          </li>

          <li>
            <Link to="/rent-home" state={{ propertyType: "rent" }}>
              {" "}
              Rent{" "}
            </Link>
          </li>

          <li>
            <Link to="/manage-rental"> Manage Rental </Link>
          </li>
          <li></li>
          {contextData.isLoggedIn ? (
            <Link to="/login"> Sign Out</Link>
          ) : (
            <Link to="/login"> Sign In</Link>
          )}

          {/* { contextData.isLoggedIn ? (
       <Link to="/login"> Sign In</Link>
      ) : (
        <Link to="/login"> Sign Out</Link>
      )} */}
          {/* <button onClick={Navigate("/login")}>Login</button> */}
          {/* <li>
                      {
                      
                      contextData.isLoggedIn?
                      <button onClick={Navigate("/login")}>Login</button>:
                      <button onClick={Navigate("/login")}>Logout</button>
                      }
                      
                    </li> */}
        </ul>
      </nav>
    </header>
  );
}
export default Header;
