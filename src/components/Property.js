import { useState } from "react";
import img2 from "../images/img2.jpg";

// replace the image
const Property = ({ property }) => {



  return (
    <div class="row justify-content-left ">
      <div className="card mr-2" style={{ width: 400 }}>
        <img className="card-img-top" src=  {`http://localhost:8080/properties/${property.id}/image`} width={200} alt="a" />
        <span class="card-body">
            <h5 class="card-title">{property.price}$</h5>
            <p>For {property.listing_type}</p>
            <p>No of Rooms : {property.room_no}</p>
            <p>Location: {property.location}</p>
            <p>Status: {property.status}</p>
            <p>views: {property.views}</p>
            <a href="#" class="btn btn-primary">Details</a>
        </span>
      </div>
    </div>
  );
};

export default Property;
