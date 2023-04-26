import { useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import { useContext } from "react";
import { Link } from "react-router-dom";

import { propertyContext } from "../context/PropertyContext";


function Login(){

    const contextData = useContext(propertyContext)
 
    const uRef = useRef();
    const pRef = useRef();
    const navigate = useNavigate();

    const [token,setToken] = useState("");

    const getUserEmail = (token)=>{
        const decodedToken = jwt_decode(token);
        const email = decodedToken.sub;
        return email;
    }

    const getRole =(email)=>{
      
       
                    axios.get('http://localhost:8080/users/' + email)
                        .then(response => {
                            console.log("in geeting role")
                           const role = response.data.roles[0];
                            contextData.setRoleHelper(role);
                        })
                        .catch(err => console.log(err.message))
           
    }

    const logInHandler = ()=>{

        const loginRequest = {email:uRef.current.value, password: pRef.current.value};

        axios.post("http://localhost:8080/login", loginRequest).then(response=>
        {
            localStorage.setItem("token", response.data);
            setToken(response.data);
           const email =  getUserEmail(response.data);
           getRole(email);
           console.log(contextData);
           console.log("role" + contextData.role);
        //    if(contextData.role==="admin") {navigate("/admin" ,{state:{ email: email }})}
       
        //    else {navigate("/homes" ,{state:{ email: email }})}
           
            // /contextData.setLogInStatus(true);
            // navigate("/homes", { state: { email: loginRequest.email } });

        }
        ).catch(err=>console.error(err))
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