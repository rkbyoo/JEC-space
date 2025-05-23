import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home.jsx"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Notfoundpage from './pages/Notfoundpage';
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Profile from "./pages/profile/Profile";
import Loader from "./components/Loader";
import { useSelector } from "react-redux";
import Admin from "./pages/admin/Admin"
import ProductInfo from "./pages/ProductInfo.jsx";
import OtpVerification from "./pages/OtpVerification";

function App() {
  const { loading } = useSelector(state => state.loaders)
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <div className="pt-24 px-6"> {/* Add padding top to match the top navbar */}
          {loading && <Loader></Loader>}
          <Routes>
            <Route path='/' element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/profile' element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />
            <Route path='/admin' element={<ProtectedRoute> <Admin /> </ProtectedRoute>} />
            <Route path='/product/:id' element={<ProtectedRoute> <ProductInfo /> </ProtectedRoute>} />
            <Route path='/otpverification' element={<OtpVerification />} />
            <Route path='*' element={<Notfoundpage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
