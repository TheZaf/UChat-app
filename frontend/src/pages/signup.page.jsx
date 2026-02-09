import { useState } from "react"
import {useAuthStore} from "../store/useauth.store.js"
import { Backpack, Eye, EyeOff, Loader2,} from "lucide-react";
import { Link } from "react-router-dom";

const signuppage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullname.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) signup(formData);  
  }


  return (
    <div className=" flex fle-col items-center justify-center min-w-full">{/*min-h-screen*/}
      <div className="py-6 px-4">
        <div className="grid lg:grid-cols-2 items-center gap-6 max-w-6xl w-full">
          <div className=" p-6 max-w-md  max-lg:mx-auto">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="mb-12">
                <h1 className=" text-3xl font-semibold">Sign up</h1>
              </div>

              <div>
                <label className=" text-sm font-medium mb-2 block">User name</label>
                <div className="relative flex items-center text-white">
                  <input 
                  name="fullname"
                  value={formData.fullname} 
                  onChange={(e)=>setFormData({...formData,fullname: e.target.value})}
                  type="text" 
                  required className="w-full text-sm  border bg-transparent pl-4 pr-10 py-3 rounded-lg outline-blue-600" 
                  placeholder="Your name" />
                </div>
              </div>
              <div>
                <label className=" text-sm font-medium mb-2 block">Email</label>
                <div className="relative flex items-center">
                 <input 
                 name="email"
                 value={formData.email}
                 onChange={(e)=>setFormData({...formData,email: e.target.value})}
                 type="email" 
                 required className="w-full text-sm border bg-transparent pl-4 pr-10 py-3 rounded-lg outline-blue-600" 
                 placeholder="youremail@gmail.com" /> 
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Password</label>
                <div className="relative flex items-center">
                    <input 
                    name="password"
                    type= {showPassword ? "text" : "password"} 
                    required className="w-full text-sm border bg-transparent pl-4 pr-10 py-3 rounded-lg outline-blue-600" 
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e)=>setFormData({...formData,password:e.target.value})}
                     /> 
                
                  <button
                  type="button"
                  className="w-4 h-4 absolute right-4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
                </div>
              </div>

              <div className="!mt-12">

               <button type="submit" className="btn bg-blue-600 w-full text-white" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
               
                <p className="text-sm !mt-6 text-center text-blue-100">Already have an Account?{""}
                <Link to="/login" className="text-blue-600 font-medium hover:underline ml-1 whitespace-nowrap"> Log in</Link></p>
              </div>
            </form>
          </div>

          <div className="max-lg:mt-8 text-center lg:text-start text-3xl sm:text-4xl lg:text-6xl font-bold w-full px-4 lg:px-0">
            <div className="leading-tight">
              Welcome to <br className="hidden sm:block"/>
              <span className='text-green-600 font-bold'>U</span>
              <span className="text-white">Chat</span>
              {/* <br className="sm:hidden"/> */}
             <span className="block mt-2 text-2xl sm:text-3xl lg:text-6xl">
  Glad to have you on board ✨
</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default signuppage

