import React, {useState} from "react";
import {signInWithEmailAndPassword, setPersistence, browserLocalPersistence} from "firebase/auth"
import { useNavigate } from "react-router-dom";
import {auth} from "../../Services/firebaseConfig"


const loginWithSessionPresistence = async(email, password) =>{
  try {
    await setPersistence(auth, browserLocalPersistence);
    const userCredential = await signInWithEmailAndPassword(auth,email,password);
    console.log("user logged in: ", userCredential.user);
  } 
  catch (error){
    console.error("error logging in :", error.message);
  }
};



function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] =useState('');
    const [error, setError] =useState(null);
    const navigate = useNavigate();
    const handleLogin = async(event) => {
      event.preventDefault();

      try {
        await loginWithSessionPresistence(email,password)
        navigate('/')
      }catch (error){
        setError("Failed to sign in. Please check your credentials.")
        console.error(error)
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
