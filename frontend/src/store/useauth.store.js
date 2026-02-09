import {create} from "zustand"
import { api } from "../lib/axios.js";
import toast from "react-hot-toast";
import {io, Socket} from "socket.io-client";

const BASE_URL=import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/";


export const useAuthStore = create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingProfile:false,
    onlineUsers: [],
    socket:null,

    isCheckingAuth:true,

    checkAuth: async () =>{
        try {
            const res = await api.get("/auth/check");
            set({authUser:res.data})

            get().connectSocket()
        } catch (error) {
            console.log("error in authcheck",error)
            set({authUser:null})       
        }finally{
              set({isCheckingAuth:false});
        }

    },

    signup: async (data) =>{
        set({isSigningUp:true})
        try {
            const res = await api.post("/auth/signup",data);
            set({authUser:res.data});
            toast.success("account created successfully");

            get().connectSocket();
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isSigningUp:false})
        }
    },

    login: async (data) => {
        set({isLoggingIn:true})
        try {
            const res = await api.post("/auth/login",data);
            set({authUser:res.data})
            toast.success("Logged in successfully!")

            get().connectSocket()
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        }finally{
            set({isLoggingIn:false})
        }
        
    },

    logout: async () => {
    try {
      await api.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error("error in logout");
    }
    },
    updateProfile: async (data) => {
        set({isUpdatingProfile:true})
        try {
            const res = await api.put("/auth/update-profile",data);
            set({authUser:res.data})
            toast.success("profile updated!")
        } catch (error) {
            console.log("error in update profile",error);
            toast.error("error in updating!")
        }finally{
            set({isUpdatingProfile:false})
        }
    },

    connectSocket:() =>{
        const { authUser } = get();
        if(!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL,{
            query:{
                userId: authUser._id,
            },
        })
        socket.connect()
        set({socket:socket});

        socket.on("getOnlineUsers",(userIds)=>{
            set({onlineUsers: userIds})
        })
    },

    disconnectSocket:() =>{
        if(get().socket?.connected) get().socket.disconnect();

    },
}));