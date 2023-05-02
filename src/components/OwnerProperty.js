import { useNavigate } from "react-router-dom";
import img2 from "../images/img2.jpg";
import axios from "axios";
import React from "react";

// replace the image
const OwnerProperty = ({ property }) => {
  return (
    <React.Fragment>
      <h5 class="card-title">{property.price}$</h5>
      <p>No of Rooms : {property.room_no}</p>
      <p>Location: {property.location}</p>
      <p>Status: {property.property_type}</p>
    </React.Fragment>
  );
};

export default OwnerProperty;
