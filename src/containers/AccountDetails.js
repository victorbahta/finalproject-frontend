import { useParams } from "react-router-dom";
import { propertiesArray } from "./Properties";
import { Link } from "react-router-dom";
import Property from "../components/Property";
import { accountsArray } from "./Accounts";
import { useContext } from "react";
import { propertyContext } from "../context/PropertyContext";

function AccountDetails(props){
    
    const config = useContext(propertyContext)
    const params = useParams();
    const AccountDetail = accountsArray.filter(p=>p.id==params.id)[0];
   let properties;
   console.log(AccountDetail);

    // if(AccountDetail!=null){
    console.log("inside");
    if(AccountDetail.properties!=null){
     properties = AccountDetail.properties.map(p => {
        return (
            <Link to={`${p.id}`} key={p.isbn} >
        <Property
                    image= {p.image}
                    price={p.price}
                    roomNo={p.roomNo}
                    location = {p.location}
                /></Link>
                )
    
    });
    }

    return (
        <article>
            <div className="Info">       
           <p> Name: {AccountDetail.name}</p>
            <p> Email : {AccountDetail.email}</p>
            <p> role: {AccountDetail.role}</p>
            <p> password: {AccountDetail.password}</p>
            {AccountDetail.role==="owner"? properties : ""}
            {/* <p>Price: {AccountDetail.price}</p>
            <p>No of Rooms : {AccountDetail.roomNo}</p>
            <p>Location: {AccountDetail.location}</p>
            <p>For {AccountDetail.AccountType}</p>
            <p>Home Type:  {AccountDetail.homeType}</p>
            <p>Status:  {AccountDetail.status}</p>
            <p>views:  {AccountDetail.views}</p> */}
            <button>Make an Offer</button><br></br>
            <button>Add to favorite List</button><br></br>
            <Link to = {-1}>Back</Link>
            </div>
            <br/>
            
            {/* add this to blog context */}
        </article>
    );
    
}

export default AccountDetails;