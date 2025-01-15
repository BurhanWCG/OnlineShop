import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import CategoryPage from './pages/CategoryPage'
import CreateAccount from './pages/CreateAccount';
import Profile from './pages/ProfilePage';
import NavBar from './components/Navbar';
import CheckoutPage from './pages/CheckoutPage';
import CheckoutForm from './pages/CheckoutForm';




function App() {
 

  return (
    <Router>
    <Routes>
      <Route path="/" element = {<HomePage/>}/>
      <Route path="/profile" element ={<NavBar> <Profile/></NavBar>}/>
      <Route path="/createaccount" element = {<CreateAccount/>}/>
      <Route path="/category" element = {<CategoryPage/>}/>
      <Route path="/checkout" element = {<CheckoutPage/>}/>
      <Route path="/confirm" element = {<CheckoutForm/>}/>

       

      
    </Routes>
   </Router>
  )
}

export default App
