import { Fragment } from "react";
import Header from "./Header";
// import PageRoutes from "../routes/PageRoutes";
// import PageRoutes from "../routes/PageRoutes";
import PageRoutes from "../routes/PageRoutes"
function Dashboard(){
    return <div>
        <Fragment>
            <Header />
            <PageRoutes/>
        </Fragment>
    </div>
}
export default Dashboard;