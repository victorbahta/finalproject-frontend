import img2 from '../images/img2.jpg'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { useContext } from 'react';
import { propertyContext } from '../context/PropertyContext';
import "./Offer.css"


const Offer = ({offer,deleteHandler, setFlagHelper})=>{

    const contextData= useContext(propertyContext)
    const property = offer.property;
const [showOfferForm, setShowOfferForm] = useState(false);
  const [offerAmount, setOfferAmount] = useState("");
  const [messageOwner, setMessageOwner] = useState("");
const navigate = useNavigate();

const handleEditOfferClick = () => {
    setShowOfferForm(true);
  };

    const handleCancel = (id) => {
      if(offer.property.status == "CONTINGENT"){
        alert("this offer cant be canceled. contact the owner");
        return;
      }
        axios.delete('http://localhost:8080/offers/' + offer.id)
            .then(response => {
                deleteHandler(offer.id);
                console.log("deleted");
            })
            .catch(err => {
                console.error(err);
            })
    }
    
    const handleOffer = (event)=>{
      console.log("submit offer called");
        event.preventDefault();
        const data = {
            amount:offerAmount,
            message:messageOwner
        }
            axios.put(`http://localhost:8080/offers/${offer.id}`, data)
            .then(response => {
                  setShowOfferForm(false);
                  setFlagHelper();
                  navigate("/offers");          

            })
            .catch(err => {
                console.error(err);
            })

        }
        

    return <div class="row justify-content-left ">
    <div className="card mr-2" style={{width: 400}}>
        
        <img  className="card-img-top" src=  {`http://localhost:8080/properties/${property.id}/image`} width = {200} alt="a"/>
        <span class="card-body">
            <h5 class="card-title">{property.price}$</h5>
            <p className='parag'>No of Rooms : {property.room_no}</p>
            <p>Location: {property.location}</p>
            <p>Status: {property.status}</p>
            <h5>Offered Amount: {offer.amount}$</h5>
            {/* <a href="#" class="btn btn-primary">Details</a> */}
            {/* <button>Details</button> */}
        </span>

    
<div>
      {!showOfferForm ? (
        <button className="mybutton" onClick={handleEditOfferClick}>Edit Offer</button>) : (
        <form className="myform" onSubmit={handleOffer}>
          <label htmlFor="offerAmount">Offer Amount:</label>
          <input className='myinput'
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
      <br/>
        <div><button onClick={handleCancel} type="submit">Cancel Offer</button></div>


    </div>
    </div>
    </div>
   
}

export default Offer;