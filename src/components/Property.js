const Property = (props)=>{

    return <div class="row justify-content-left ">
    <div className="card mr-2" style={{width: 400}}>
        <img  className="card-img-top" src={props.image}  width = {200} alt="a"/>
        <span class="card-body">
            <h5 class="card-title">{props.price}$</h5>
            <p>No of Rooms : {props.roomNo}</p>
            <p>Location: {props.location}</p>
            <a href="#" class="btn btn-primary">Details</a>
        </span>
    </div>
    </div>
   
}

export default Property;