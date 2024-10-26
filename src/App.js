import React, {useEffect, useState} from "react";
import Home from "./Pages/Home/Home"
import Login from "./Pages/Login/Login"
import PrivateRoute from './Components/PrivateRoute';
import {auth} from "./Services/firebaseConfig"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

function App(){
  const [user, setUser] =useState(null);
  const [loading, setLoading] =useState(true);

  useEffect(()=> {
    const unsubscribe = onAuthStateChanged(auth,(currentUser)=>{
      setUser(currentUser);
      setLoading(false);
    });
    return ()=> unsubscribe();
  }, []);

  if (loading) return <div>Loading....</div>

  return(
    <Router>
      <Routes>
        <Route path ='/login' element={!user ? <Login/>:<Navigate to = '/'/> } /> 
        <Route path ='/' element={user ? (<PrivateRoute> <Home/></PrivateRoute>):(<Navigate to ="/login"/>)} />
      </Routes>
    </Router>
  )
}
export default App;
