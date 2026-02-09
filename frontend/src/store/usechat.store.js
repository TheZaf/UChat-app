import { create } from "zustand";
import toast from "react-hot-toast";
import { api } from "../lib/axios.js";
import {useAuthStore} from "./useauth.store.js"

export const useChatStore = create((set,get)=>({
    messages:[],
    users:[],
    selectedUser:null,
    isUserLoading:false,
    isMessagesLoading:false,
    onlineUsers:[],

    getUsers:async()=>{
        set({isUserLoading:true})
        try {
            const res = await api.get("/messages/users");
            set({users:res.data})
        } catch (error) {
            toast.error(error.response.data.message) 
        }finally{
            set({isUserLoading:false})
        }

    },

    getMessages:async(userId)=>{
        set({isMessagesLoading:true})
        try {
            const res = await api.get(`/messages/${userId}`)
            set({messages:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isMessagesLoading:false})
        }
        
    },

    sendMessages:async(messageData)=>{
        const{selectedUser,messages} = get()
        try {
            const res = await api.post(`/messages/send/${selectedUser._id}`,messageData);
            set({messages:[...messages,res.data]})
        } catch (error) {
            toast.error(error.response.data.message)
            
        }

    },
    
    subscribeToMessages:()=>{
        const {selectedUser} = get();
        if(!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessages",(newMessage)=>{
            if(newMessage.senderId !== selectedUser._id) return;
            set({
                messages:[...get().messages,newMessage],
            });
        });

    },
    unsubscribeToMessage:()=>{
        const socket = useAuthStore.getState().socket;
        socket.off("newMessages")
    },
    setSelectedUser:(selectedUser) => set({selectedUser}),

}));