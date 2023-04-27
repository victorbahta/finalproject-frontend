import { useLocation, useParams } from "react-router-dom";
import { propertiesArray } from "./Properties";
import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { propertyContext } from "../context/PropertyContext";
import jwt_decode from 'jwt-decode';

import img2 from '../images/img2.jpg'

function PropertyDetails(props){

    const contextData = useContext(propertyContext);
    const location = useLocation();
    const params = useParams();
    const [propertyDetail, setpropertyDetail] = useState({});
    const [favList, setFavList] = useState([]);

    const favListHandle = ()=>{
        setFavList([...favList, propertyDetail]);
       
        localStorage.setItem("favList", favList);
    }

    console.log("using it right now");
    console.log(contextData.user);
    let custId;
    if(contextData.user){
        custId = contextData.user.accountId;
        console.log("custId"+custId);
    }
    const navigate = useNavigate();

   

    // const space = <Fragment>&nbsp;&nbsp;</Fragment>;

    const handleOffer = ()=>{

        if(contextData.isLoggedIn) {
            axios.put(`http://localhost:8080/users/${custId}/property/${params.id}/offer`, contextData.config)
            .then(response => {
                console.log("offered saved successfully");
                navigate('/offers')
            })
            .catch(err => {
                console.error(err);
            })
        }
        
        else navigate("/login", {state:{ previousUrl: location.pathname} });
    }
    const deleteButtonClicked = (id) => {
        axios.delete('http://localhost:8080/properties/' + id)
            .then(response => {

                navigate('/propertys')
            })
            .catch(err => {
                console.error(err);
            })
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
        }, [params.id])




   
    return (<div class="container"> 
    <br/> 
<div class="row justify"> 
<article class="row justify"> 
<div class="property-cards"> 
<img class="card__image" src={img2} alt="Property image" /> 
<h5 class="card__price">Price: {propertyDetail.price}$</h5> 
<p class="card__type">For {propertyDetail.property_type}</p> 
<p class="card__details">No of Rooms: {propertyDetail.room_no}</p> 
<p class="card__details">Location: {propertyDetail.location}</p> 
<p class="card__details">Status: {propertyDetail.status}</p> 
<p class="card__details">Views: {propertyDetail.views}</p> 


<button onClick={handleOffer} class="card__button">Make an Offer</button> 
<br /> 
<button onClick={favListHandle} class="card__button">Add to Favorite List</button> 
<br /> 
{/* <a href="/homes" class="card__back">Back</a>  */}
<Link to = {-1} class="card__back"> Back</Link>
</div> 
</article> 
</div> 
</div>)
    
}

export default PropertyDetails;