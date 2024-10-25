import Home from "./Pages/Home/Home"
import Login from "./Pages/Login/Login"
import PrivateRoute from './Components/PrivateRoute';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App(){
  return(
    <Router>
      <Routes>
        <Route path ='/login' element={<Login/>} />
        <Route path ='/' element={<PrivateRoute> <Home/></PrivateRoute>}/>
      </Routes>
    </Router>
  )
}
export default App;
