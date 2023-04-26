
// import { Routes} from "react-router";
import { BrowserRouter as Router,Routes, Route, Redirect } from 'react-router-dom';
import Properties from "../containers/Properties";
import AddProperty from "../containers/AddProperty";
import Login from "../components/Login";
import PropertyDetails from "../containers/PropertyDetails";
import Accounts from "../containers/Accounts";
import AccountDetails from "../containers/AccountDetails";
import { useContext } from "react";
import { propertyContext } from "../context/PropertyContext";
import Admin from "../pages/Admin";
import { Navigate } from 'react-router-dom';

function PageRoutes(){
            // element={<Properties />} 

    const contextData = useContext(propertyContext);
    console.log("in pageroutes");
    console.log(contextData);
    return (
        <Routes>
          
          <Route path="/homes" element={<Properties/>}/>
          {console.log(contextData.isLoggedIn)}
          <Route path="/homes"
          element={<Navigate to={contextData.isLoggedIn ? "/admin" : "/homes"} />} />

            <Route path="/homes/:id" element={<PropertyDetails />} />

            <Route path = "buy-home" element={<Properties/>} />
            <Route path="rent-home" element={<Properties />} />

            <Route path = "buy-home/:id" element={<PropertyDetails/>} />
            <Route path="rent-home/:id" element={<PropertyDetails />} />

            <Route path="manage-rental" element={<AddProperty />} />
            <Route path="login" element={<Login />} />
            <Route path="sell-home" element={<AddProperty />} />   

            <Route path="accounts" element={<Accounts />} />  
            <Route path="accounts/:id" element={<AccountDetails />} />  

            <Route path="login" element={<Login />} /> 
            <Route path="admin" element={<Admin/>} />  
 

        </Routes>
    )


}
export default PageRoutes;