import { Link, Navigate } from 'react-router-dom';
import { propertyContext } from '../context/PropertyContext';
import { useContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import './Header.css'
import axios from 'axios';
import React from 'react';

function Header(){
  const token = localStorage.getItem("token");
  const [role, setRole] = useState();
  const contextData = useContext(propertyContext)
 
 if(!localStorage.getItem("token"))
 {
  contextData.setLogInStatus(false);
 }
  const handleLogOut = ()=>{
    contextData.setLogInStatus(false);

       localStorage.removeItem('token');
  }

 
  const getUserEmail = ()=>{
    if(!token) return null;
    const decodedToken = jwt_decode(token);
    const email = decodedToken.sub;
    return email;
}

const customerHeader = ()=>{

  return (<div>
      <ul>
          <li>Offers</li>
          <li>Favorite List</li>
      </ul>
  </div>)
}

    return  (
      <React.Fragment>
            <nav>
              <header className="header">

                  <ul>
                     <li>
                      {/* <Link to={{pathname:"/homes", state:{propertyType: 'sell'}}}>All Homes</Link> */}
                      <Link to="/homes" className=' text-orange-700'>All Homes</Link>

                    </li>
                    <li>
                      <Link to="/buy-home" state={{ propertyType: 'sell' } } >Buy/Rent</Link>
                    </li>
                    <li>
                      <Link to="/sell-home"   state={{ propertyType: 'sell' } }>Sell/Mange-Rental</Link>

                      </li>

                    {/* <li>
                      <Link to="/rent-home"   state={{ propertyType: 'rent' } }> Rent </Link>

                    </li> */}

{/* 
                    <li>
                      <Link to="/manage-rental"> Manage Rental </Link>
                    </li>
                    */}
                      <li className='user'>
                     {localStorage.getItem("token")?getUserEmail():""}
                     </li>
                     
                    {
                      contextData.isLoggedIn || localStorage.getItem("token")? (<Link to="/login" onClick={handleLogOut}> Sign Out</Link>)
                      :(
                      <li>
                        <Link to="/login"> Sign In</Link> <span>     </span>
                      <Link to={"/add-account"}>Sign Up</Link> </li>
                      )
                    }
                  
                    {/* <Link to="/login" onClick={handleLogOut()}> Sign Out</Link> */}
                  </ul>
            
        
        
              </header >
              
            </nav>
        
            {localStorage.getItem("token") && localStorage.getItem("role")==="customer" ? customerHeader():""}
            </React.Fragment>

          )
}
export default Header;