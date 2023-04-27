import { useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { useContext } from "react";
import { Link } from "react-router-dom";

import { propertyContext } from "../context/PropertyContext";


function Login(){

    const contextData = useContext(propertyContext);
    const location = useLocation();
    console.log(location.pathname);
 
    const uRef = useRef();
    const pRef = useRef();
    const navigate = useNavigate();

    // const [token,setToken] = useState("");

    const getUserEmail = (token)=>{
        const decodedToken = jwt_decode(token);
        const email = decodedToken.sub;
        return email;
    }

  
    const redirectUser = (role,email)=>{
       
        if (location.state && location.state.previousUrl) {
            // console.log("shld be her" + location.state.previousUrl);
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
        // console.log(loginRequest);

        let response = await axios.post("http://localhost:8080/login", loginRequest);
        // console.log(response.data);

        const token = response.data;
        localStorage.setItem("token", response.data);
      
        const email = getUserEmail(token);
        // console.log("email" + email);

        let res = await axios.get('http://localhost:8080/users/email/' + email); 
        const user = res.data; 
       
        const role = res.data.roles[0].role;
        localStorage.setItem("role",role);
        
        contextData.setLogInStatus(true);
        // console.log(contextData);
        contextData.setUserHelper(user);

        // console.log("user in loggein");
        // console.log(user);

        // console.log("user in context");
        // console.log(contextData.user);
        // console.log("state of login: " + location.state);
        redirectUser(role,email);
       
    }
    return <div>
    <label for="uname"><b>Username</b></label>
      <input ref={uRef}type="text" placeholder="Enter Email" name="uname" required></input>

      <label for="psw"><b>Password</b></label>
      <input ref = { pRef} type="password" placeholder="Enter Password" name="psw" required></input>
      <button onClick={logInHandler}>Login</button>
    </div>
}

export default Login;