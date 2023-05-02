import { useContext, useState } from 'react';
import { propertyContext } from '../context/PropertyContext';
import Offer from '../components/Offer';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';


function Offers(){

    const contextData = useContext(propertyContext);
    let email;
    console.log(contextData);
    if(contextData.user){
        email = contextData.user.email;
    }

    const [flag, setFlag] = useState(false);


    const [offerList,setOfferList] = useState([]);

    const setFlagHelper = ()=>{
        setFlag(!flag);
      }

    const deleteHandler = () => {
        setFlag(!flag)
    }
   

    const fetchUser = () => {
        axios.get('http://localhost:8080/users/email/' + contextData.user.email).
            then(response => {
                console.log("the list");
                console.log(response.data);

                setOfferList(response.data.offerList);
            })
            .catch(error => {
                console.log(error.message)
            })
    }

 
    useEffect(() => {
        fetchUser();
    },
        [flag])

    const offers = offerList.map(p => {
        return (
        <Offer deleteHandler={deleteHandler} setFlagHelper={setFlagHelper} offer = {p}/>)
    });

   return (
    <div>{offers}

    <Link to={"/homes"}>Offer your Deal</Link>
    </div>)
    
}
export default Offers;