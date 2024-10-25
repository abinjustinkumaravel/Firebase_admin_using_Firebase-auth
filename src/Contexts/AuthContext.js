import React, {createContext, useContext, useEffect, useState } from 'react';
import {auth} from '../Services/firebaseConfig';
import {onAuthStateChanged, signOut } from "firebase/auth"


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({children}) => {
    const [user, setUser] =useState(null);
    const [loading, setLoding] =useState(true);

    useEffect(()=> {
        const unsubscribe =onAuthStateChanged(auth,(user)=>{
            setUser(user);
            setLoding(flase);
        });
        return()=>unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await signOut(auth);
        }catch(error){
            console.error("Falied to signout", error);
        }
    };

    const contextValue ={
        user,
        loading,
        logout,
    };

    return(
        <AuthContext.Provider value={contextValue}>
            {!loading && childern}
        </AuthContext.Provider>
    )
}

