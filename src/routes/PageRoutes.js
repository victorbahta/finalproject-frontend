
import { Routes, Route } from "react-router";
import Properties from "../containers/Properties";
import AddProperty from "../containers/AddProperty";
import Login from "../components/Login";

function PageRoutes(){
    return (
        <Routes>
         
            <Route path='/homes' element={<Properties />} />

            <Route path = "/buy-home" element={<Properties/>}>
            <Route path='/rent-home' element={<Properties />} />

            <Route path='/manage-rental' element={<AddProperty />} />
            <Route path='/sell-home' element={<AddProperty />} />
               
            <Route path='/login' element={<Login />} />
            </Route>
        </Routes>
    )
}
export default PageRoutes;