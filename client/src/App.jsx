import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Notfoundpage from './pages/Notfoundpage';
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<ProtectedRoute> <Home/> </ProtectedRoute>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/about' element={<Signup/>}/>
        <Route path='/contact' element={<Signup/>}/>
        <Route path='*' element={<Notfoundpage/>}/> 
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
