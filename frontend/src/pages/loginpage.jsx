import { useAuthStore } from "../store/useauth.store.js"
import { useState } from "react"
import { Eye, EyeOff, Loader2,} from "lucide-react";
import { Link } from "react-router-dom";

const loginpage = () => {
  const {login,isLoggingin} = useAuthStore()
  const [showPassword,setShowPassword] = useState(false);
  const [formData,setfromData] = useState({
    email:"",
    password:""
  })
  const handleSubmit = async (e)=>{
    e.preventDefault();
    login(formData)
  }
 
  return (
    <div className=" flex fle-col items-center justify-center min-w-full h-full">{/*min-h-screen*/}
      <div className="py-6 px-4">
        <div className="grid lg:grid-cols-2 items-center gap-6 max-w-6xl w-full">
          <div className=" p-6 max-w-md  max-lg:mx-auto">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="mb-12">
                <h1 className=" text-3xl font-semibold">Log in</h1>
              </div>

              <div>
                <label className=" text-sm font-medium mb-2 block">Email</label>
                <div className="relative flex items-center">
                 <input 
                 name="email"
                 value={formData.email}
                 onChange={(e)=>setfromData({...formData,email: e.target.value})}
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
                    onChange={(e)=>setfromData({...formData,password:e.target.value})}
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
            <button type="submit" className="btn bg-blue-600 w-full text-white" disabled={isLoggingin} >
              {isLoggingin ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Log in"
              )}
            </button> 
                <p className="text-sm !mt-6 text-center text-blue-100">Don't have an Account?{""}
                <Link to="/signup" className="text-blue-600 font-medium hover:underline ml-1 whitespace-nowrap"> Sign up</Link></p>
              </div>
            </form>
          </div>

          <div className="max-lg:mt-8 text-center lg:text-start text-3xl sm:text-4xl lg:text-6xl font-bold w-full px-4 lg:px-0">
            <div className="leading-tight">
              Welcome back to <br className="hidden sm:block"/>
              <span className='text-green-600 font-bold'>U</span>
              <span className="text-white">Chat</span>
              {/* <br className="sm:hidden"/> */}
              <span className="block mt-2 text-2xl sm:text-3xl lg:text-6xl">
                Great to see you again! 👻
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>



  ) 
}

export default loginpage
