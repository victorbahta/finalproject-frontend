import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { propertyContext } from "../context/PropertyContext";
import jwt_decode from "jwt-decode";
import "./AddAccount.css";

function AddProperty(props) {
  const location = useLocation();
  // const propertyType = location.state.propertyType;
  const [userId, setUserId] = useState();
  const [userStatus, setUserStatus] = useState();

  // let userId;

  const token = localStorage.getItem("token");

  const contextData = useContext(propertyContext);

  const newPropertyForm = useRef();
  const navigate = useNavigate();

  const getUserID = () => {
    const decodedToken = jwt_decode(token);
    const email = decodedToken.sub;
    console.log(email);
    axios
      .get("http://localhost:8080/users/email/" + email)
      .then((res) => {
        console.log(res);
        setUserId(res.data.accountId);
        setUserStatus(res.data.status);
      })
      .catch((err) => console.log(err));
    // userId = user.data.accountId;
    // console.log("userIDup" + userId);
    // setUserId(userId);
  };

  const AddProperty = (e) => {
    
    console.log("userStauts" + userStatus);
    if (contextData.isLoggedIn || localStorage.getItem("token")) {
      
      if(userStatus=="inactive"){
        alert("You are not approved by the admin");
        return;
      }
      
        console.log("it is inactive");

      const user = getUserID();
      console.log("userIDin down:" + userId);
      e.preventDefault();
      let form = newPropertyForm.current;
      const data = {
        location: form["location"].value,
        room_no: form["roomNo"].value,
        property_type: form["propertyType"].value,
        price: form["price"].value,
        listing_type: form["listingType"].value,
        file: form["image"].files[0],
        status: "AVAILABLE",
      };

      axios
        .put(
          `http://localhost:8080/users/${userId}/property`,
          data,
          contextData.config
        )
        .then((res) => {
          let sendData = {
            file: data.file,
          };
          axios.put(
            `http://localhost:8080/properties/${res.data.id}/upload`,
            sendData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        })
        .then((data) => {
          navigate("/homes");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else navigate("/login", { state: { previousUrl: location.pathname } });
  };

  return (
    <div className="NewProperty">
      <form ref={newPropertyForm} onSubmit={AddProperty}>
        <h1>Add a Property</h1>

        <label>Location</label>
        <input type="text" name="location" />

        <label>No Of Rooms</label>
        <input className="form-control" type="number" name="roomNo" />
        <label>Price</label>
        <input type="text" name="price" />
        <label>Property Type</label>
        <select name="propertyType">
          <option value="HOUSE">HOUSE</option>
          <option value="DUPLEX">DUPLEX</option>
          <option value="APARTMENT">APARTMENT</option>
        </select>
        <select name="listingType">
          <option value="rent">Rent</option>
          <option value="sale">Sale</option>
        </select>
        <label>Image</label>
        <input className="form-control" type="file" name="image" />
        <br />
        <br />

        <button onClick={AddProperty}> Add Property </button>
        <br />
        <button onClick={() => navigate("/homes")}>Cancel</button>
        <br />

        <button onClick={() => navigate("/add-account")}>
          Create New Account
        </button>
      </form>
    </div>
  );
}

export default AddProperty;
