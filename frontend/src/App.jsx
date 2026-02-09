import { Routes,Route, Navigate } from "react-router-dom"
import { useAuthStore } from "./store/useauth.store.js"
import { useEffect } from "react"
import {Loader} from "lucide-react"
import {Toaster} from "react-hot-toast"

import Navbar from "./components/navbar"
import HomePage from "./pages/homepage.jsx"
import SignupPage from "./pages/signup.page.jsx"
import LoginPage from "./pages/loginpage.jsx"
import ProfilePage from "./pages/profilepage.jsx"
import SettingPage from "./pages/settingpage.jsx"


const App = () => {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore()

  console.log({onlineUsers})

  useEffect(()=>{
    checkAuth()
  },[checkAuth])
  console.log(authUser);
  if(isCheckingAuth && !authUser) return(
    <div className=" flex items-center justify-center h-screen">
      <Loader className=" size-10 animate-spin"/>
    </div>
  )

  return (
  <div className="h-screen flex flex-col overflow-hidden">
    <Navbar />
    <div className="flex-1 overflow-hidden">
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />}/>
        <Route path="/signup" element={!authUser ? <SignupPage /> : <Navigate to="/" />}/>
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />}/>
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />}/>
        <Route path="/settings" element={<SettingPage />} />
      </Routes>
    </div>
    <Toaster />
  </div>
);

}

export default App
