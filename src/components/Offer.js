import img2 from '../images/img2.jpg'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// replace the image
const Offer = ({offer,deleteHandler})=>{
    const property = offer.property;
    const navigate = useNavigate();

    const handleCancel = (id) => {
        axios.delete('http://localhost:8080/offers/' + offer.id)
            .then(response => {
                deleteHandler(offer.id);
            //    navigate('/customers')
                console.log("deleted");
            })
            .catch(err => {
                console.error(err);
            })
    }
    return <div class="row justify-content-left ">
    <div className="card mr-2" style={{width: 400}}>
        
        <img  className="card-img-top" src={img2}  width = {200} alt="a"/>
        <span class="card-body">
            <h5 class="card-title">{property.price}$</h5>
            <p>No of Rooms : {property.room_no}</p>
            <p>Location: {property.location}</p>
            <p>Status: {property.property_type}</p>
            {/* <a href="#" class="btn btn-primary">Details</a> */}
            <button>Details</button>
            <button onClick={handleCancel}>Cancel Offer</button>
        </span>
    </div>
    </div>
   
}

export default Offer;