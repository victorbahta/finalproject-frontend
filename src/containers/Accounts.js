import Account from '../components/Account'
import img1 from '../images/img1.jpg'
import { Link } from 'react-router-dom';


export const accountsArray = [
    {id:1, role: 'admin', name:'John Doe', email:'johndoe@example.com', password:'password1', 
    
    properties : [ {id:1, status: "PENDING", views: 35, location: "Fairfield", propertyType: "sell", roomNo: 4, homeType: "Family", price: 200000, image: img1},
    {id:1, status: "PENDING", views: 35, location: "Fairfield", propertyType: "sell", roomNo: 4, homeType: "Family", price: 200000, image: img1}
]},


    {id:2, role:'owner', name : 'Jane Doe', email:'janedoe@example.com',password: 'password2'},
    {id:3, role: 'customer', name:'Bob Smith', email:'bobsmith@example.com', password:'password3'}
]
function Accounts (){

    

    const accounts = accountsArray.map(a => {
        return (
            <Link to={`${a.id}`} key={a.id} >
        <Account account = {a} />  </Link>                 
             );
});

  return <div>
    {accounts}
  </div>
}

export default Accounts;