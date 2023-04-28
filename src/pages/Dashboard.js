import { Fragment } from "react";
import Header from "./Header";
// import PageRoutes from "../routes/PageRoutes";
// import PageRoutes from "../routes/PageRoutes";
import { useEffect } from "react";
import { useState } from "react";

import { propertyContext } from "../context/PropertyContext";
import PageRoutes from "../routes/PageRoutes"
import Login from "../components/Login";
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import Owner from "./Owner";
import Admin from "./Admin";






function Dashboard(){
    // let isLoggedIn=false;

    const [role,setRole] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email,setEmail] = useState("");
    const [user, setUser] = useState(null);
    const [offerList,setOfferList] = useState([]);

    const token = localStorage.getItem("token");
    const config = {
    headers: {
        Authorization: `Bearer ${token}` 
    }
    };
   
    const setOfferListHelper = (list)=>{
        setOfferList(list);
    }


    const getUserEmail = ()=>{
        if(!token) return null;
        const decodedToken = jwt_decode(token);
        const email = decodedToken.sub;
        return email;
    }
    const setUserHelper = async(user)=>{
    //   const email = getUserEmail();
    //   if(!email) return null;
      console.log("setting up the user to:");
      console.log(user);
      setUser(user);  
    }


    const setLogInStatus = (status)=>{
            setIsLoggedIn(status);
    }

    return <div>
        <propertyContext.Provider value = {{config: config, role:role,setLogInStatus:setLogInStatus, isLoggedIn:isLoggedIn,  setUserHelper:setUserHelper, user:user, offerList:offerList, setOfferListHelper:setOfferListHelper}} >
        {/* <Fragment> */}
            <Header />
            <PageRoutes/>
        {/* </Fragment> */}
        </propertyContext.Provider>
    </div>
}
export default Dashboard;