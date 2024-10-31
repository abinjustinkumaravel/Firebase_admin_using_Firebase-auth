import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {auth, storage} from "../../Services/firebaseConfig";
import Rowdata from "../../Components/datarow"
// import Img from "../../image.jpg"
import {ref, getDownloadURL} from 'firebase/storage'


const imageRef = ref(storage, 'image.jpg');

getDownloadURL(imageRef).then((url)=>{console.log("file avaliable at",url);}).catch((error) => {console.log("Error Fetching Image URL:", error);});

function Home(){

const[user] =useAuthState(auth);
const[imageURL, setImageURL] =useState("");


useEffect(()=>{
  const fetchImageURL = async ()=>{
    try {
      const imageRef = ref(storage, 'image.jpg');
      const url = await getDownloadURL(imageRef);
      setImageURL(url);
      console.log("Image URL fetched:", url);
    } 
    catch(error){
      console.error("Error Fetching Image URL:", error);
    }
  };
  fetchImageURL();
},[]);

const data =[
  {
  img_url:imageURL,
  title:"Nature",
  description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  rating:4.5,
  price:"15/per"
},  
  {
  img_url:imageURL,
  title:"Nature",
  description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  rating:4.5,
  price:"15/per"
},  
  {
  img_url:imageURL,
  title:"Nature",
  description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  rating:4.5,
  price:"15/per"
},  
  {
  img_url:imageURL,
  title:"Nature",
  description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  rating:4.5,
  price:"15/per"
},  
  {
  img_url:imageURL,
  title:"Nature",
  description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  rating:4.5,
  price:"15/per"
},  
  {
  img_url:imageURL,
  title:"Nature",
  description:"Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  rating:4.5,
  price:"15/per"
}
]

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
};

export default Home
