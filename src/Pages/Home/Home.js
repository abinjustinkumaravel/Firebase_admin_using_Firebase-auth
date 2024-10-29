import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from "../../Services/firebaseConfig";

function Home(){

  const[user] =useAuthState(auth);

const handleLogout =() => {
  auth.signOut()
  .then(()=>{
    console.log("user signed out");
  }).catch(error => {
    console.error("Error",error)
  });
}

  return (
    <div className='App'>
      {
        user ?(
          <div>
            <h2>
              welcome, to ButterBytes Admin
            </h2>
            <button onClick={handleLogout}> Logout</button>
          </div>
        ) :(
          <h2> you are not logged in.</h2>
        )}

    </div>
  );
}

export default Home
