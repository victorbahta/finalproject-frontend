import { Link } from 'react-router-dom';


import './Header.css'

function Header(){

    return  (
            <nav>
              <header className="header">

                  <ul>
                     <li>
                      <Link to="/homes">All Homes</Link>
                    </li>
                    <li>
                      <Link to="/buy-home" >Buy</Link>
                    </li>
        
                    <li>
                      <Link to="/sell-home"> Sell </Link>
                    </li>
                    <li>
                      <Link to="/rent-home"> Rent </Link>
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