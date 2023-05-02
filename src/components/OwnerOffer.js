import { useState } from "react";
import img2 from "../images/img2.jpg";
import axios from "axios";

// replace the image
const OwnerOffer = ({ offer }) => {

    const pId = offer.property.id;

    const approveOfferHandler = ()=>{
        axios.put(`http://localhost:8080/properties/${pId}/updateStatus` , {status: "CONTINGENT"}).
        then(response => {

            console.log(response.data);

        })
    }

  return (
    <div class="row justify-content-left ">
      <div className="card mr-2" style={{ width: 400 }}>
        <span class="card-body">
            <h5 class="card-title">Offererd Amount : {offer.amount}$</h5>
            <p>Customer Message :  {offer.message}</p>
            <button onClick={approveOfferHandler} >Approve Offer</button>
            
            <a href="#" class="btn btn-primary">Reject Offer</a>
        </span>
      </div>
    </div>
  );
};

export default OwnerOffer;
