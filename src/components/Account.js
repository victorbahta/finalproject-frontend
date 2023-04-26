import Property from "./Property";


function Account({account}){  
    
 
    //  const accounts = account.properties.map(a=>
    //  <Account price={a.price} roomNo={a.roomNo}/>)
 
    return (
        <article className="Content">
            <div className="Info">
       
            <p> Name: {account.name}</p>
            <p> Email : {account.email}</p>
            <p> role: {account.role}</p>
            <p> password: {account.password}</p>
            {account.role==="owner"? <button>Aprove Owner</button>: ""}

            {/* <button class="btn btn-primary"> Details </button> */}
            <a href="#" class="btn btn-primary">Details</a>

            {/* {properties} */}
            </div>
            <br/>
            </article>
    );
}



export default Account;