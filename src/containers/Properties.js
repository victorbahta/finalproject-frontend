import Property from "../components/Property";
import img1 from "../images/img1.jpg";
import img2 from "../images/img2.jpg";
import img3 from "../images/img3.jpg";
import PropertyDetails from "./PropertyDetails";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { propertyContext } from "../context/PropertyContext";
import { useContext } from "react";
import "./properties.css";



function Properties() {
  const contextData = useContext(propertyContext);

  const listing_typeRef = useRef();
  const locationRef = useRef();
  const minPriceRef = useRef();
  const maxPriceRef = useRef();
  const roomNoRef = useRef();


  const formRef = useRef();
  const [flag, setFlag] = useState(false);

  const [propertiesState, setpropertiesState] = useState([]);

  const filterHandler = () => {
    console.log("List_Type"+listing_typeRef.current.value);
    setFlag(!flag);
  };

  const setFlagHelper = ()=>{
    setFlag(!flag);
  }

  const fetchproperties = () => { 
   axios
      .get("http://localhost:8080/properties", 
      {
        params: {
          listingType : listing_typeRef.current.value,
          roomNo: roomNoRef.current.value,
          minPrice: minPriceRef.current.value,
          maxPrice: maxPriceRef.current.value,
        }
      }
      )
      .then((response) => {
        setpropertiesState(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchproperties();
  }, [flag]);

  const getProperties = () => {
    const properties = propertiesState.map((p) => {
      return (
        <Link to={"/homes/" + p.id} key={p.isbn}>
          <Property property={p}/>
        </Link>
      );
    });

    return properties;
  };

  return (
    <div class="product-container">
      <br />
      <div class="user-info">
      </div>
      <div class="filters">
        <label class="filter-label">Filter: </label>
        <select class="filter-select" ref={listing_typeRef}>
          <option value="">Sale/Rent</option>
          <option value="sell">For Sell</option>
          <option value="rent">For Rent</option>
          <option value="sold">Sold </option>
        </select>

        <label class="price-label">Min Price: </label>
        <input
          ref={minPriceRef}
          class="price-input"
          type="text"
          width={10}
          name="minPrice"
        ></input>
        <label class="price-label">Max Price: </label>
        <input
          ref={maxPriceRef}
          class="price-input"
          type="text"
          name="maxPrice"
        ></input>

        <label class="beds-label">Beds: </label>
        <select class="beds-select" ref={roomNoRef} name="roomNo">
          <option value="">Beds</option>
          <option value="1">1+</option>
          <option value="2">2+</option>
          <option value="3">3+ </option>
        </select>

        <label class="location-label">Location: </label>
        <input
          ref={locationRef}
          class="location-input"
          type="text"
          name="location"
        ></input>

        <button class="apply-button" onClick={filterHandler}>
          Apply Filter
        </button>
      </div>
      <br />
      <div class="property-list">{getProperties()}</div>
    </div>
  );
}

export default Properties;
