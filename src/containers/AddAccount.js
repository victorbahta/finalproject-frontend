import { useRef } from "react"; 
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 
import './AddAccount.css' 
import { useState } from "react"; 
 
 
 
function AddAccount(props) { 
    const navigate = useNavigate(); 
 
  const newAccountForm = useRef(); 
  const [newAccount, setNewAccount] = useState([]); 
 
  const AccountHandler = (e) => { 
    e.preventDefault(); 
    const form = newAccountForm.current; 
    const data = { 
      name: form["name"].value, 
      email: form["email"].value, 
      password: form["password"].value, 
      role: form["role"].value, 
       
    }; 
 
    newAccount.push(data); 
    setNewAccount(newAccount); 
     
    console.log(data) 
 
 
    axios.post('http://localhost:8080/users', data, { 
  params: { 
    role: form["role"].value, 
  } 
}) 
    .then(data => { 
        navigate('/homes'); 
    }) 
    .catch(error => { 
        console.error('Error:', error.response); 
      }) 
    }; 
 
 
 
  return ( 
    <div className="NewProperty"> 
      <form ref={newAccountForm} onSubmit={AccountHandler}> 
        <h1>Create Account</h1> 
 
        <label className="nameLable">name</label> 
        <input type="text" label={"name"} name={"name"} /> 
 
        <label className="emailLable">email</label> 
        <input type="text" label={"email"} name={"email"} /> 
        <label className="passwordLable">password</label> 
        <input type="password" label={"password"} name={"password"} /> 
        <label className="roleLable">role</label> 
        <select name="role" id="role"> 
            <option value="owner">owner</option> 
            <option value="customer">customer</option> 
        </select> 
 
        <button>Add Account </button> 
      </form> 
    </div> 
  ); 
} 
 
export default AddAccount;