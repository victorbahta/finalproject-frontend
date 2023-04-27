import Properties from "../containers/Properties";
import { Navigate } from "react-router-dom";
import Offers from "../containers/Offers";
import { Link } from "react-router-dom";
function Customer(){

    return <div>
    <p>Customer Page</p>
    <Link to = {"/offers"}>Offers</Link>
    <button>FavoriteLists</button>
    <Properties/>
    </div>

}

export default Customer;