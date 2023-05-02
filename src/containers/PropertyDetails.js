import { useLocation, useParams } from "react-router-dom";
import { propertiesArray } from "./Properties";
import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { propertyContext } from "../context/PropertyContext";
import jwt_decode from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./PropertyDetails.css"

import img2 from '../images/img2.jpg'

function PropertyDetails(props){

    const contextData = useContext(propertyContext);
    let custId;
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState('');

    const [showOfferForm, setShowOfferForm] = useState(false);
    const [offerAmount, setOfferAmount] = useState("");
    const [showEditOffer, setshowEditOffer] = useState(false);
    const [messageOwner, setMessageOwner] = useState("");


  const handleOfferClick = () => {
    setShowOfferForm(true);
    setshowEditOffer(true);
  };
  useEffect(()=>{
    console.log(contextData);
    if(contextData.user){

    axios.get('http://localhost:8080/users/' + contextData.user.accountId)
    .then((res)=>{
        const user = res.data;
        let containsObj = user.offerList.some(offer =>
            offer.property.id == params.id);
            if(containsObj) setshowEditOffer(true);
    }).catch(err=>console.log(err))
    }   
  },[contextData.isLoggedIn]);
  

    const [propertyDetail, setpropertyDetail] = useState({});

    if(contextData.user){
        custId = contextData.user.accountId;
        console.log("custId"+custId);
    }


    const handleOffer = (event)=>{
        event.preventDefault();
        // const data = {

        console.log("custit" + custId);
  
        const url = "http://localhost:8080/users/" +  custId + "/property/" + params.id+ "/offer";
        if(contextData.isLoggedIn) {
            axios.put(url, {
              amount:offerAmount,
              message:messageOwner
            })
            .then(response => {   
              console.log("the url used" + url);    
                  setShowOfferForm(false);
                  alert("Offer added successfully");
                  navigate("/offers");  
            })
            .catch(err => {
                console.error(err);
            })
        }
        
        else navigate("/login", {state:{ previousUrl: location.pathname} });
    }

    useEffect(
        () => {
            if (params.id) {
                axios.get('http://localhost:8080/properties/' + params.id)
                    .then(response => {
                        console.log(response.data)
                        setpropertyDetail(response.data)
                    })
                    .catch(err => console.log(err.message))
            }
        }, [params.id]);



        useEffect(()=>{

            if(Object.keys(propertyDetail).length !== 0)  
            {
              propertyDetail.views = propertyDetail.views + 1;
            axios.put('http://localhost:8080/properties/' + params.id, propertyDetail);
            }
          },[propertyDetail]);

    return (<div class="container"> 
    <br/> 
<div className="row justify"> 
<article className="row justify"> 
<div className="property-cards"> 
<img className="card__image" src=  {`http://localhost:8080/properties/${propertyDetail.id}/image`} alt="Property image" /> 
<h5 className="card__price">Price: {propertyDetail.price}$</h5> 
<p className="card__type">For {propertyDetail.listing_type}</p> 
<p className="card__details">No of Rooms: {propertyDetail.room_no}</p> 
<p className="card__details">Location: {propertyDetail.location}</p> 
<p className="card__details">Status: {propertyDetail.status}</p> 
<p className="card__details">Views: {propertyDetail.views}</p> 

{localStorage.getItem("role")==="customer"? 
<span>
<div>
      {!showOfferForm ? (
        <span>
{!showEditOffer? <button onClick={handleOfferClick}>Make Offer</button> : 
        <button onClick={handleOfferClick}>Edit Offer</button>
      }
        </span>
        )        
        : (
        <form>
          <label htmlFor="offerAmount">Offer Amount:</label>
          <input
            id="offerAmount"
            type="number"
            value={offerAmount}
            onChange={(event) => setOfferAmount(event.target.value)}
          />
          <label htmlFor="messageOwner">Message Owner:</label>
          <input
            id="messageOwner"
            type="text"
           value={messageOwner}
           onChange={(event) => setMessageOwner(event.target.value)}
          />
          <button onClick={handleOffer} type="submit">Submit Offer</button>
        </form>
      )}

    </div>
{/* <button onClick={handleOffer} class="card__button">Make an Offer</button>  */}
<br /> 
<button class="card__button">Add to Favorite List</button> 
<br/>
</span>

:""}

<br /> 
{/* <a href="/homes" class="card__back">Back</a>  */}
<Link to = {-1} class="card__back"> Back</Link>
</div> 
</article> 
</div> 
</div>)
}

export default PropertyDetails;