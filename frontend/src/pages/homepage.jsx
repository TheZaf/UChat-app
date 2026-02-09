import Sidebar from '../components/sidebar.jsx';
import NoChatSelected from '../components/nochatselected.jsx';
import ChatContainer from '../components/chatcontainer.jsx';

import { useChatStore } from '../store/usechat.store.js'

const Homepage = () => {
  const{selectedUser} = useChatStore();

  // Calculate height of the chat area
    const navbarHeight = 64; // Change this to your navbar height if it's fixed, or dynamically calculate it
    const chatContainerHeight = `calc(100vh - ${navbarHeight}px)`; // This will make chat container take remaining space below navbar
  
  return (
    <div className='min-h-screen bg-base-300'>
      <div className='flex items-center justify-center pt-2 px-2'>
        <div className='bg-base-200 rounded-lg shadow-cl w-full h-[calc(100vh-2.75rem)]'>
            <div className='flex h-full rounded-lg overflow-hidden'>
             <Sidebar/>
             {!selectedUser ? <NoChatSelected/> : <ChatContainer/>}
              
            </div>
        </div>
      </div>
    </div>
  )
} 

export default Homepage;