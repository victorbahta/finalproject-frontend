import { useParams } from "react-router-dom";
import { propertiesArray } from "./Properties";
import { Link } from "react-router-dom";

function PropertyDetails(props){

    const params = useParams();
    // console.log(propertiesArray);
    const PropertyDetail = propertiesArray.filter(p=>p.id==params.id)[0];
    console.log(params.id);
    console.log(PropertyDetail);

    return (
        <div className="container mt-5" > <div className="row justify-content-center ">
        <article class="row justify-content-center ">
            <div className="card mr-2" style={{width: 500}}>
           <img className="card-img-top" src={PropertyDetail.image} width={500} alt="a"/>
       
            <h5>Price: {PropertyDetail.price}$</h5>
            <p>For {PropertyDetail.propertyType}</p>
            <p>No of Rooms : {PropertyDetail.roomNo}</p>
            <p>Location: {PropertyDetail.location}</p>
            <p>Home Type:  {PropertyDetail.homeType}</p>
            <p>Status:  {PropertyDetail.status}</p>
            <p>views:  {PropertyDetail.views}</p>
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