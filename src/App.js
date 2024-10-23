
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


function SignUp(){
  const [email, setEmail] = useState('');
  const [password, setPassword] =useState('');
  const [error, setError] =useState(null);
  const auth = getAuth(app);
  const handleSignUp = async(e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth,email, password);
      alert("account created Successfully");
    }
    catch(error){
      setError(error.message);
    }

  };

  return(
    <div>
      <h2>
      <form onSubmit={handleSignUp}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Sign Up</button>
      </form>
      {error && <p>{error}</p>}
      </h2>
    </div>
  );

}

export default SignUp;
