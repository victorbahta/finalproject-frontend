import { useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Login.css"

import { propertyContext } from "../context/PropertyContext";


function Login(){

    const contextData = useContext(propertyContext);
    const location = useLocation();
    console.log(location.pathname);
 
    const uRef = useRef();
    const pRef = useRef();
    const navigate = useNavigate();

    const getUserEmail = (token)=>{
        const decodedToken = jwt_decode(token);
        const email = decodedToken.sub;
        return email;
    }

  
    const redirectUser = (role,email)=>{
       
        if (location.state && location.state.previousUrl) {
            if(role!=="owner" && location.state.previousUrl==="/sell-home"){
                navigate("/login");
            }
            else navigate(location.state.previousUrl);
          }
          else
        {
            if(role==="admin") {navigate("/admin")}
        else if(role ==="owner"){navigate("/owners" )}
        else {navigate("/customers" ,{state:{ email: email }})}
            }
    }

    const logInHandler = async ()=>{

        const loginRequest = {email:uRef.current.value, password: pRef.current.value};
        let response = await axios.post("http://localhost:8080/login", loginRequest);

        const token = response.data;
        localStorage.setItem("token", response.data);
      
        const email = getUserEmail(token);

        let res = await axios.get('http://localhost:8080/users/email/' + email); 
        const user = res.data; 
        contextData.setUserHelper(user);
       
        const role = res.data.roles[0].role;
        localStorage.setItem("role",role);
        
        contextData.setLogInStatus(true);
        redirectUser(role,email);
       
    }
    return <div className="loginform">
    <label className="userlable" for="uname"><b>Username</b></label>
      <input className="userinput" ref={uRef}type="text" placeholder="Enter Email" name="uname" required></input>

      <label className="passwordlable" for="psw"><b>Password</b></label>
      <input className="passinput" ref = { pRef} type="password" placeholder="Enter Password" name="psw" required></input>
      <button className="loginButton" onClick={logInHandler}>Login</button>
      <button className="loginButton" onClick={()=>navigate("/add-account")}>Create New Account</button>
    </div>
}

export default Login;