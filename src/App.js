import React, { useState, useEffect, createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword'; 
import SignUp from './pages/SignUp/Signup';
import Footer from './pages/Footer/Footer';
import CargoPage from './pages/Cargos/CargoPage';
import AddCargo from './pages/Cargos/AddCargo';
import ProfilePage from './pages/Profile/ProfilePage/ProfilePage';
import EditProfilePage from './pages/Profile/EditProfile/EditProfilePage';
import ChangePasswordPage from './pages/Profile/ChangePasswordPage/ChangePasswordPage';
import OrderList from './pages/Orders/OrderList';
import TrucksPage from './pages/Trucks/TrucksPage';
import AddTruck from './pages/Trucks/AddTruck';
import ProtectedRoute from './components/ProtectedRoute';
import Maps from './pages/Trucks/MapPage';
import UserCargos from './pages/Cargos/UserCargos';

export const UserContext = createContext(null);




const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      
    }
  }, []);

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const isAuthenticated = !!user; 

  useEffect(()=>{
    //console.log(isAuthenticated);
    
  },[user]);



  return (
    <div>
      <UserContext.Provider value={{user,setUser}}>

      
      <Header />
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/trucks" element={<TrucksPage />} />
        <Route path="/cargopage" element={<CargoPage userId={user?.id} latitude={0} longitude={0} />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/map/:id" element={<Maps/>} />
        <Route path="/add-truck" element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AddTruck} />} />
        <Route
        path="/add-cargo"
        element={<ProtectedRoute isAuthenticated={isAuthenticated} element={AddCargo} />}
        />

      <Route
        path="/user-cargos"
        element={<ProtectedRoute isAuthenticated={isAuthenticated} element={UserCargos} />}
        />

      <Route
        path="/user-cargos/:id"
        element={<ProtectedRoute isAuthenticated={isAuthenticated} element={UserCargos} />}
        />


        <Route
         path="/profile"
         element={<ProtectedRoute  isAuthenticated={isAuthenticated} element={ProfilePage} />}
       />
       <Route
          path="/edit-profile"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={EditProfilePage} />}
        />
        <Route
          path="/change-password"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={ChangePasswordPage} />}
        />
        <Route
          path="/orders"
          element={<ProtectedRoute isAuthenticated={isAuthenticated} element={OrderList} />}
        />
      </Routes>
      <Footer />
      </UserContext.Provider>
    </div>
  );
};

export default App;