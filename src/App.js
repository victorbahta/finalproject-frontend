// import './App.css';
// import "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" ;
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom';

import Dashboard from './pages/Dashboard';


function App() {
  return (
    <BrowserRouter>
      <Dashboard/>
    </BrowserRouter>
  );   
}

export default App;
