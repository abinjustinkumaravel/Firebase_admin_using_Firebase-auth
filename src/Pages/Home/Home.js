import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth} from "../../Services/firebaseConfig";
import Rowdata from "../../Components/datarow"
import Img from "../../image.jpg"


const data =[
    {
    img_url:Img,
    title:"Nature",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    rating:4.5,
    price:"15/per"
  },  
    {
    img_url:Img,
    title:"Nature",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    rating:4.5,
    price:"15/per"
  },  
    {
    img_url:Img,
    title:"Nature",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    rating:4.5,
    price:"15/per"
  },  
    {
    img_url:Img,
    title:"Nature",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    rating:4.5,
    price:"15/per"
  },  
    {
    img_url:Img,
    title:"Nature",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    rating:4.5,
    price:"15/per"
  },  
    {
    img_url:Img,
    title:"Nature",
    description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    rating:4.5,
    price:"15/per"
  }
]


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

            <nav>
              <h2>
                welcome, to ButterBytes Admin
              </h2>
              <button onClick={handleLogout}> Logout</button>
            </nav>
            {data.map(data =>(
              <div>
              <Rowdata
              img_url={data.img_url}
              title={data.title}
              description={data.description}
              ratings={data.rating}
              price={data.price}
              />
              </div>

            ))}

          </div>
        ) :(
          <h2> you are not logged in.</h2>
        )}

    </div>
  );
}

export default Home
