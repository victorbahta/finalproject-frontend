import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { propertyContext } from "../context/PropertyContext";
import { useContext } from "react";
import OwnerProperty from "../components/OwnerProperty";
import "./properties.css";
import React from "react";
import img2 from "../images/img2.jpg";

function OwnerProperties() {
  const contextData = useContext(propertyContext);
  const propertyTypeRef = useRef();
  const locationRef = useRef();
  const minPriceRef = useRef();
  const maxPriceRef = useRef();
  const roomNoRef = useRef();

  const navigate = useNavigate();
  const formRef = useRef();
  const [flag, setFlag] = useState(false);

  const [propertiesState, setpropertiesState] = useState([]);
  const [offerList, setOfferList] = useState([]);

  const filterHandler = () => {
  
    setFlag(!flag);
  };

  
  const deleteHandler = (id) => {
    let check = window.confirm("Delete Property?");
    if (check) {
      axios
        .delete("http://localhost:8080/properties/" + id)
        .then((response) => {
          setFlag(!flag);
        });
    }
  };
  const fetchproperties = (id) => {
    const p = {
      propertyType: propertyTypeRef.current.value,
      location: locationRef.current.value,
      roomNo: roomNoRef.current.value,
      minPrice: minPriceRef.current.value,
      maxPrice: maxPriceRef.current.value,
    };

    axios
      .get(
        "http://localhost:8080/users/" + id
        // {
        // params: {
        //   propertyType: propertyTypeRef.current.value,
        //   location: locationRef.current.value,
        //   roomNo: roomNoRef.current.value,
        //   minPrice: minPriceRef.current.value,
        //   maxPrice: maxPriceRef.current.value,
        // },
        // }
      )
      .then((response) => {
        setpropertiesState(response.data.propertyList);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    fetchproperties(contextData.user.accountId);
  }, [flag]);

  const getProperties = () => {
    // if(propertyType==="sell")
    //   propertiesArray = propertiesArray.filter(p=>p.propertyType==="sell");
    // else if(propertyType==="rent")
    // propertiesArray = propertiesArray.filter(p=>p.propertyType==="rent");

    const properties = propertiesState.map((p) => {
      return (
        <React.Fragment>
          <div class="row justify-content-left ">
            <div className="card mr-2" style={{ width: 400 }}>
              <img className="card-img-top" src={img2} width={200} alt="a" />
              <span class="card-body">
                <Link to={"/homes/" + p.id} key={p.isbn}>
                  <OwnerProperty property={p} />
                </Link>

                <button
                  onClick={() => deleteHandler(p.id)}
                  class="btn btn-danger"
                >
                  Delete
                </button>

                <button
                  onClick={() => deleteHandler(p.id)}
                  class="btn btn-danger"
                >
                  Edit
                </button>
                <button
                  onClick={() => navigate("/owner-offers")}
                  class="btn btn-danger"
                >
                  See Offers
                </button>
              </span>
            </div>
          </div>
        </React.Fragment>
      );
    });

    return properties;
  };

  return (
    <div class="product-container">
      <br />
      <div class="user-info">
        {/* {contextData.isLoggedIn ?  
    location.state.email : ""  
  }  */}
      </div>
      <div class="filters">
        <label class="filter-label">Filter: </label>
        <select class="filter-select" ref={propertyTypeRef}>
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
          {" "}
          Apply Filter
        </button>
      </div>
      <br />
      <div class="property-list">{getProperties()}</div>
    </div>
  );

  //     return <div className="Product">
  //     <br />

  //     <div className="Product">
  //       {/* {contextData.isLoggedIn?
  //       location.state.email: ""
  //     } */}
  //             <label>Filter: </label>
  //             <select ref={propertyTypeRef}>
  //             <option value="">Sale/Rent</option>
  //                 <option value="sell">For Sell</option>
  //                 <option value="rent">For Rent</option>
  //                 <option value="sold">Sold </option>

  //             </select>

  //             <label>minPrice: </label>
  //             <input ref = {minPriceRef}type="text" width={10} name="minPrice"></input>
  //             <label>maxPrice: </label>
  //             <input ref={maxPriceRef} type="text" name = "maxPrice"></input>

  //             <label>Beds: </label>
  //             <select ref = {roomNoRef} name="roomNo">
  //             <option value="">Beds</option>
  //                 <option value="1">1+</option>
  //                 <option value="2">2+</option>
  //                 <option value="3">3+ </option>

  //             </select>

  //             <label>Location: </label>
  //             <input ref={locationRef}type="text" name="location"></input>

  //             <button onClick={filterHandler}> Apply Filter</button>
  //         </div>

  //         {/* {getProperties()} */}
  //     <div className="container mt-5" > <div className="row justify-content-center ">{getProperties()}</div></div>

  // </div>;
}

export default OwnerProperties;
