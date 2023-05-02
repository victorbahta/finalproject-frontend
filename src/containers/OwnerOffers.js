import { useContext, useState } from 'react';
import { propertyContext } from '../context/PropertyContext';
import Offer from '../components/Offer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import OwnerOffer from '../components/OwnerOffer';


function OwnerOffers(){

    const contextData = useContext(propertyContext);
    const [offerList,setOfferList] = useState([]);
    let email;
    if(contextData.user){
        email = contextData.user.email;
    }

    const getOffers = ()=>{
        axios
        .get("http://localhost:8080/offers")
        .then((response) => {
            console.log("all offers");
            console.log(response.data);
          setOfferList(response.data);
        });
      }
    
      useEffect(
        ()=>{
            getOffers();
            console.log("offerList");
            console.log(offerList);
            offerList.filter(offer=>offer.property.id == contextData.user.accountId);
          
        },[]
      )
       



    const offers = offerList.map(p => {
        return (
        <OwnerOffer offer = {p}/>
        )
    });

   return (
    <div>
        {offers}
    </div>)
    
}
export default OwnerOffers;