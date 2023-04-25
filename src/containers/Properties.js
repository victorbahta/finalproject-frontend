import Property from '../components/Property';
import img1 from '../images/img1.jpg'
import img2 from '../images/img2.jpg'
import img3 from '../images/img3.jpg'
import PropertyDetails from './PropertyDetails'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


export let propertiesArray = [
  {id:1, status: "PENDING", views: 35, location: "Fairfield", propertyType: "sell", roomNo: 4, homeType: "Family", price: 200000, image: img1},
  {id:2,status: "AVAILABLE", views: 55, location: "DesMoin", propertyType: "rent", roomNo: 7, homeType: "home-town", price: 50000, image:img2},
  {id:3,status: "CONTINGENT", views: 65, location: "Chicago", propertyType: "sell", roomNo: 2, homeType: "Manufactured", price: 300000, image: img3},
]

function Properties(){

  const location = useLocation();
  const propertyType = location.state.propertyType;


  const getProperties = ()=>{

    if(propertyType==="sell")
      propertiesArray = propertiesArray.filter(p=>p.propertyType==="sell");
    else if(propertyType==="rent") 
    propertiesArray = propertiesArray.filter(p=>p.propertyType==="rent");


    const properties = propertiesArray.map(p => {
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
 
  return properties;
  }
  console.log(propertiesArray);
 

    return <div className="Product">
    <br />


    <div className="Product">
      <p>properties page</p>
            <label>Filter: </label>
            <select>
            {/* <select id="minPrice" name="minPrice"><select> */}
                <option value="forSale">For Sell</option>
                <option value="forRent">For Rent</option>
                <option value="forRent">Sold </option>

            </select>



          

            <label>minPrice: </label>
            <input type="text" width={10}></input>
            <label>maxPrice: </label>
            <input type="text"></input>
            
            <label>Beds: </label>
            <select name="price">
                <option value="forSale">1+</option>
                <option value="forRent">2+</option>
                <option value="forRent">3+ </option>

            </select>

            <label>Home Types: </label>
            <select name="price">
                <option value="Houses">Houses</option>
                <option value="TownHomes">TownHomes</option>
                <option value="Multi-Family">Multi-Family</option>
                <option value="Apartments">Apartments</option>


            </select>

            <button > Apply Filter</button>
        </div>

        {/* {getProperties()} */}
    <div className="container mt-5" > <div className="row justify-content-center ">{getProperties()}</div></div>
    
</div>;
}

export default Properties;