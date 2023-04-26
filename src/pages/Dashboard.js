import { Fragment } from "react";
import Header from "./Header";
// import PageRoutes from "../routes/PageRoutes";
// import PageRoutes from "../routes/PageRoutes";
import { useEffect } from "react";
import { useState } from "react";

import { propertyContext } from "../context/PropertyContext";
import PageRoutes from "../routes/PageRoutes"
import Login from "../components/Login";


const token = localStorage.getItem("token");
// console.log("retrieved token::" + token)
const config = {
headers: {
    Authorization: `Bearer ${token}` 
}
};
// const role = "owner";



function Dashboard(){
    // let isLoggedIn=false;

    const [role,setRole] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const setLogInStatus = (status)=>{
        // console.log("inside setLogInstatus" + status);
            setIsLoggedIn(status);
    }
   
    const setRoleHelper = (role)=>{
        setRole(role);
    }

    return <div>
        <propertyContext.Provider value = {{config: config, role:role, setRoleHelper : setRoleHelper, setLogInStatus:setLogInStatus, isLoggedIn:isLoggedIn}} >
        {/* <Fragment> */}
            {/* <Login setRole = {setRoleHelper}/> */}
           
            <Header />
            

            <PageRoutes/>
        {/* </Fragment> */}
        </propertyContext.Provider>
    </div>
}
export default Dashboard;