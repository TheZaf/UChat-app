import cloudinary from '../lib/cloudinary.js';
import { getReceiverSocketId, io } from '../lib/socket.js';

import Message from '../models/message.model.js';
import User from '../models/user.model.js';

export const getUsersForSidebar =async  (req,res)=>{
   try {
     const loggedInUserId = req.user.id;// Fetch users from the database, excluding the logged-in user
     const filtterUsers = await User.find({_id:{ $ne: loggedInUserId }}).select('-password');
     // filterUsers will contain all users except the logged-in user and without their passwords
     res.status(200).json(filtterUsers);
   } catch (error) {
    res.status(500).json({message:"Internal Server Error"});
    console.error("Error in getUsersForSidebar:", error);
   }
}

export const getMessages = async (req,res)=>{
    try{
      const {id:thereId} = req.params;
      const myId = req.user._id;

      const messages = await Message.find({
        $or:[
          {senderId:myId,receiverId:thereId},
          {senderId:thereId,receiverId:myId}
        ],
      });
      res.status(200).json(messages)
    }catch(error){
      res.status(500),json({message:"internal server error"});
      console.log("error in get messages",error.message);
    }
}

export const sendMessages = async (req,res)=>{
  try {
    const {text,image} = req.body;
    const {id:receiverId} = req.params;
    const senderId = req.user._id;

    let imageUrl;
    if(image){
      const uploaderResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploaderResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image:imageUrl
    });

    await newMessage.save()
    const receiverSocketId = getReceiverSocketId(receiverId)
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessages",newMessage);
    }
    res.status(200).json(newMessage)

  } catch (error) {
    console.log("error in send messages",error.message);
    res.status(500).json({message:"Internal Server Error"})
  }
}