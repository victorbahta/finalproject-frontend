
import { Routes, Route } from "react-router";
import Properties from "../containers/Properties";
import AddProperty from "../containers/AddProperty";
import Login from "../components/Login";
import PropertyDetails from "../containers/PropertyDetails";
import Accounts from "../containers/Accounts";
import AccountDetails from "../containers/AccountDetails";

function PageRoutes(){
    return (
        <Routes>
         
            <Route path="/homes" element={<Properties />} />
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

        </Routes>
    )


}
export default PageRoutes;