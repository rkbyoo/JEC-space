import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Notfoundpage from './pages/Notfoundpage';
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Loader from "./components/Loader";
import {useSelector} from "react-redux";

function App() {
  const {loading}=useSelector(state=>state.loaders)
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <div className="ml-20 md:ml-60 p-4"> {/* Add margin-left to match sidebar width */}
        {loading && <Loader></Loader>}
        <Routes>
          <Route path='/' element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/profile' element={<Profile/>} />
          <Route path='*' element={<Notfoundpage />} />
        </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
