import Home from "./Pages/Home/Home"
import Login from "./Pages/Login/Login"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App(){
  return(

    <Router>
      <Routes>
        <Route path ='/login' element={<Login/>} />
        <Route path ='/' element={<Home/>}/>
      </Routes>
    </Router>
  )
}


export default App;
