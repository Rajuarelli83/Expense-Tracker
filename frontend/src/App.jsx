import React from 'react';
import {BrowserRouter as Router ,Routes,Route ,Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import SignUp from './pages/Auth/SignUp';
import Income from './pages/Dashboard/Income';
import Expense from './pages/Dashboard/Expense';  
import Home from './pages/Dashboard/Home';
import UserProvider from './context/UserContext';
import {Toaster} from 'react-hot-toast';

const App =()=>{
  return(
<UserProvider>
 <div>
    <Router> 
      <Routes>
        <Route path="/" element={<Root/>} />
        <Route path="/login" exact element = {<Login />} />
        <Route path="/signup" exact element = {<SignUp />} />
        <Route path="/dashboard" exact element = {<Home />} />
        <Route path="/income" exact element = {<Income />} />
        <Route path="/expense" exact element = {<Expense />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
 </div>
 <Toaster toastOptions={{className :"",style:{zIndex: 9999}}} />
</UserProvider>  
  )
}
export default App;

const Root =()=>{
  const isAuthenticated = !!localStorage.getItem("accessToken");
  console.log(localStorage.getItem("accessToken"));
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />;
}