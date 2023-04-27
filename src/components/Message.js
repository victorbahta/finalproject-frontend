import { useRef } from "react";
import { useState } from "react";

function Message(){

    const [message, setMessage] = useState('');
    const handleSubmit = (event)=>{
        event.preventDefault();
    // window.location.href = `mailto:${ownerEmail}?subject=New Message&body=${message}`;
    }
    const messageRef = useRef();
    return (
        <form onSubmit={handleSubmit}>
            <span></span>
          <label>
            Message:
            <input value={message} onChange={(event) => setMessage(event.target.value)} />
          </label>
          <button type="submit">Send Message</button>
        </form>
      );
}
export default Message;