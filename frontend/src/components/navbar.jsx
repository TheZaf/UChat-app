
import { useAuthStore } from "../store/useauth.store.js";
import { Link } from 'react-router-dom';
import { LogOut, MessageSquare, Settings, User } from "lucide-react";


const Navbar = () => {
   const { logout, authUser } = useAuthStore();
 
return (
    <header className="flex">
      <div className="w-full h-11 bg-zinc-700 flex items-center justify-between px-5">
        
        <Link to="/" className="font-bold text-2xl text-blue-50">
          <span className="text-green-600 font-bold">U</span>Chat
        </Link>

        {authUser && (
          <div className="flex items-center gap-4">
            <Link to="/profile" className="btn btn-sm gap-2">
              <User className="size-5" />
              <span className="hidden sm:inline">Profile</span>
            </Link>

            <button className="flex gap-2 items-center" onClick={logout}>
              <LogOut className="size-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar
