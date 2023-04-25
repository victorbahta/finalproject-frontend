import { Link } from 'react-router-dom';


import './Header.css'

function Header(){

    return  (
            <nav>
              <header className="header">

                  <ul>
                     <li>
                      {/* <Link to={{pathname:"/homes", state:{propertyType: 'sell'}}}>All Homes</Link> */}
                      <Link to="/homes"   state={{ propertyType: '' } } className=' text-orange-700'>All Homes</Link>

                    </li>
                    <li>
                      <Link to="/buy-home" state={{ propertyType: 'sell' } } >Buy</Link>
                    </li>
                    <li>
                      <Link to="/sell-home"   state={{ propertyType: 'sell' } }>Sell</Link>

                      </li>

                    <li>
                      <Link to="/rent-home"   state={{ propertyType: 'rent' } }> Rent </Link>

                    </li>


                    <li>
                      <Link to="/manage-rental"> Manage Rental </Link>
                    </li>
                    <li>
                      <Link to="/login"> Sign in</Link>
                    </li>
        
        
                    <li>
                      <button>Logout</button>
                    </li>
                  </ul>
            
        
        
              </header >
            </nav>
          )
}
export default Header;