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

 
  
//   const addViewCount = async ()=>{
//     let a = axios.get('http://localhost:8080/users/' + contextData.user.accountId)
//     .then((res)=>{
//         const user = res.data;
//         let containsObj = user.offerList.some(offer =>
//             offer.property.id == params.id);
//             if(containsObj) setshowEditOffer(true);
//     }).catch(err=>console.log(err))
//   }
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

    const [favList, setFavList] = useState([]);

    useEffect(() => {
      // Load favList state from localStorage when component mounts
      const storedFavList = localStorage.getItem("favList");
      if (storedFavList) {
        setFavList(storedFavList);
      }
    }, []);
  
    useEffect(() => {
      // Save favList state to localStorage whenever it changes
      localStorage.setItem("favList", favList);
    }, [favList]);
  
    const handleAddToFavList = (item) => {
      setFavList([...favList, item]);
    };
  
    const handleOffer = (event)=>{
        event.preventDefault();
        const data = {
            amount:offerAmount,
            message:messageOwner
        }

        if(contextData.isLoggedIn) {
            axios.put(`http://localhost:8080/users/${custId}/property/${params.id}/offer`, data)
            .then(response => {   
                  setShowOfferForm(false);
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

        const dataupda = {
            "id":6,
            "status" : "PENDING",
            "location" : "Denver",
            "room_no" : 2,
            "price": 2000000,
            "views" : 100,
            "property_type": "HOUSE",
             "listing_type": "sell"
            
        };

        useEffect(()=>{

            console.log("manual dataupdated views");
            console.log(dataupda);
            if(Object.keys(propertyDetail).length !== 0)  
            {
              propertyDetail.views = propertyDetail.views + 1;
              axios.put('http://localhost:8080/properties/' + params.id, propertyDetail);
            }
            console.log("updated propertyDetial views");
            console.log(propertyDetail);
           
          },[propertyDetail]);

    return (<div class="container"> 
    <br/> 
<div class="row justify"> 
<article class="row justify"> 
<div class="property-cards"> 
<img class="card__image" src={img2} alt="Property image" /> 
<h5 class="card__price">Price: {propertyDetail.price}$</h5> 
<p class="card__type">For {propertyDetail.listing_type}</p> 
<p class="card__details">No of Rooms: {propertyDetail.room_no}</p> 
<p class="card__details">Location: {propertyDetail.location}</p> 
<p class="card__details">Status: {propertyDetail.status}</p> 
<p class="card__details">Views: {propertyDetail.views}</p> 

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
        <form onSubmit={handleOffer}>
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
<button onClick={handleAddToFavList} class="card__button">Add to Favorite List</button> 
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