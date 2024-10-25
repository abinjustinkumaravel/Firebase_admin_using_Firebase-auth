import React, {useState} from "react";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth"
import { useNavigate } from "react-router-dom";
import firebase from "../../Services/firebaseConfig"

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] =useState('');
    const [error, setError] =useState(null);
    const auth = getAuth(firebase);
    const navigate = useNavigate();
    const handleLogin = async(e) => {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(auth,email, password);
        navigate('/')
      }
      catch(error){
        setError(error.message);
        alert("Login failed");
      }
    };
    return(
      <div>
        <h2>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
        </h2>
      </div>
    );
  
  }

  export default Login;
