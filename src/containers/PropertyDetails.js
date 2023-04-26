import { useParams } from "react-router-dom";
import { propertiesArray } from "./Properties";
import { Link } from "react-router-dom";
import { useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { propertyContext } from "../context/PropertyContext";

function PropertyDetails(props){
    const contextData = useContext(propertyContext);
    console.log(contextData);

    const params = useParams();
    console.log(params.id);

    const navigate = useNavigate();

    const [propertyDetail, setpropertyDetail] = useState({});

    // const space = <Fragment>&nbsp;&nbsp;</Fragment>;

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




    return (
        <div className="container mt-5" > <div className="row justify-content-center ">
        <article class="row justify-content-center ">
            <div className="card mr-2" style={{width: 500}}>
           {/* <img className="card-img-top" src={PropertyDetail.image} width={500} alt="a"/> */}
       
            <h5>Price: {propertyDetail.price}$</h5>
            <p>For {propertyDetail.property_type}</p>
            <p>No of Rooms : {propertyDetail.room_no}</p>
            <p>Location: {propertyDetail.location}</p>
            {/* <p>Home Type:  propertyDetail.homeType}</p> */}
            <p>Status:  {propertyDetail.status}</p>
            <p>views:  {propertyDetail.views}</p>
            <button class="btn btn-primary">Make an Offer</button><br></br>
            <button class="btn btn-primary">Add to favorite List</button><br></br>
            <Link to = {-1}>Back</Link>
            </div>
            <br/>
            
            {/* add this to blog context */}
        </article>
        </div></div>
    );
    
}

export default PropertyDetails;