import { IoIosAddCircle } from 'react-icons/io';
import { useState } from 'react';
import Conversations from "./Conversations";
import GroupConversations from './GroupConversations';
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
import GroupChatModal from './GroupChatModal';

const Sidebar = ({ onConversationClick, onGroupConversationClick, isSCardOpen, handleGroupChatSelection, handleConversationSelection }) => {
  const [isCardOpen, setIsCardOpen] = useState(false);

  const handleOpenCard = () => {
    setIsCardOpen(true);
  };

  const handleCloseCard = () => {
    setIsCardOpen(false);
  };
  

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col h-full lg:w-[40%] md:w-[50%] sm:w-[50%] w-[40%] relative">
      <SearchInput />
      <div className="my-4 flex justify-between items-center">
        <div className="border-t border-slate-300 flex-1"></div>
        <IoIosAddCircle onClick={handleOpenCard} className="text-2xl text-blue-500 cursor-pointer" />
      </div>
      <div>
        <h1 className='text-white'>Group Chat</h1>
        <GroupConversations  className="flex-1 overflow-auto" onClick={onGroupConversationClick} handleGroupChatSelection={handleGroupChatSelection} />
      </div>
      <div>
        <h1 className='text-white'>Friends</h1>
        <Conversations className="flex-1 overflow-auto" onClick={onConversationClick} handleConversationSelection={handleConversationSelection} />
      </div>
      <LogoutButton className="mt-4" />
      {isCardOpen && <GroupChatModal onClose={handleCloseCard} />}
    </div>
  );
};

export default Sidebar;




// import { IoIosAddCircle } from 'react-icons/io';
// import { useState } from 'react';
// import Conversations from "./Conversations";
// import GroupConversations from './GroupConversations';
// import LogoutButton from "./LogoutButton";
// import SearchInput from "./SearchInput";
// import GroupChatModal from './GroupChatModal';

// const Sidebar = ({ onConversationClick, onGroupConversationClick }) => {
//   const [isCardOpen, setIsCardOpen] = useState(false);

//   const handleOpenCard = () => {
//     setIsCardOpen(true);
//   };

//   const handleCloseCard = () => {
//     setIsCardOpen(false);
//   };

//   return (
//     <div className="border-r border-slate-500 p-4 flex flex-col h-full lg:w-[40%] md:w-[50%] sm:w-[50%] w-[40%] relative">
//       <SearchInput />
//       <div className="my-4 flex justify-between items-center">
//         <div className="border-t border-slate-300 flex-1"></div>
//         <IoIosAddCircle onClick={handleOpenCard} className="text-2xl text-blue-500 cursor-pointer" />
//       </div>
//       <div>
//         <h1>Group Chat</h1>
//         <GroupConversations className="flex-1 overflow-auto" onClick={onGroupConversationClick} />
//       </div>
//       <div>
//         <h1>Friends</h1>
//         <Conversations className="flex-1 overflow-auto" onClick={onConversationClick} />
//       </div>
//       <LogoutButton className="mt-4" />
//       {isCardOpen && <GroupChatModal onClose={handleCloseCard} />}
//     </div>
//   );
// };

// export default Sidebar;




// import { IoIosAddCircle } from 'react-icons/io';
// import { useState } from 'react';
// import Conversations from "./Conversations";
// import GroupConversations from './GroupConversations';
// import LogoutButton from "./LogoutButton";
// import SearchInput from "./SearchInput";
// import GroupChatModal from './GroupChatModal';

// const Sidebar = () => {
//   const [isCardOpen, setIsCardOpen] = useState(false);

//   const handleOpenCard = () => {
//     setIsCardOpen(true);
//   };

//   const handleCloseCard = () => {
//     setIsCardOpen(false);
//   };

//   return (
//     <div className="border-r border-slate-500 p-4 flex flex-col h-full lg:w-[40%] md:w-[50%] sm:w-[50%] w-[40%] relative">
//       <SearchInput />
//       <div className="my-4 flex justify-between items-center">
//         <div className="border-t border-slate-300 flex-1"></div>
//         <IoIosAddCircle onClick={handleOpenCard} className="text-2xl text-blue-500 cursor-pointer" />
//       </div>
//       <div>
//         <h1>Group Chat</h1>
//         <GroupConversations className="flex-1 overflow-auto" />
//       </div>
//       <div>
//         <h1>Friends</h1>
//         <Conversations className="flex-1 overflow-auto" />
//       </div>
//       <LogoutButton className="mt-4" />
//       {isCardOpen && <GroupChatModal onClose={handleCloseCard} />}
//     </div>
//   );
// };

// export default Sidebar;


// import React, { useState } from 'react';
// import { IoIosAddCircle } from 'react-icons/io';
// import Conversations from "./Conversations";
// import LogoutButton from "./LogoutButton";
// import SearchInput from "./SearchInput";
// import GroupChatModal from './GroupChatModal';

// const Sidebar = () => {
//   const [isCardOpen, setIsCardOpen] = useState(false);

//   const handleOpenCard = () => {
//     setIsCardOpen(true);
//   };

//   const handleCloseCard = () => {
//     setIsCardOpen(false);
//   };

//   return (
//     <div className="border-r border-slate-500 p-4 flex flex-col h-full lg:w-[40%] md:w-[50%] sm:w-[50%] w-[40%] relative">
//       <SearchInput />
//       <div className="my-4 flex justify-between items-center">
//         <div className="border-t border-slate-300 flex-1"></div>
//         <IoIosAddCircle onClick={handleOpenCard} className="text-2xl text-blue-500 cursor-pointer" />
//       </div>
//       <div><hi1>GroupChat</hi1></div>
       
//       <div><hi1>Friends</hi1></div>
//       <Conversations className="flex-1 overflow-auto" />
//       <LogoutButton className="mt-4" />
//       {isCardOpen && <GroupChatModal onClose={handleCloseCard} />}
//     </div>
//   );
// };

// export default Sidebar;



// import Conversations from "./Conversations";
// import LogoutButton from "./LogoutButton";
// import SearchInput from "./SearchInput";
// import GroupChatButton from "./GroupChatButton";

// const Sidebar = () => {
//   return (
//     <div className="border-r border-slate-500 p-4 flex flex-col h-full lg:w-[40%] md:w-[50%] sm:w-[50%] w-[40%]">
//       <SearchInput />
//       <div className="my-4">
//         <div className="border-t border-slate-300"></div>
//       </div>
//       <Conversations className="flex-1 overflow-auto" />
//       <LogoutButton className="mt-4" />
//       <GroupChatButton />
//     </div>
//   );
// };

// export default Sidebar;



// import Conversations from "./Conversations"
// import LogoutButton from "./LogoutButton"
// import SearchInput from "./SearchInput"

// const Sidebar = () => {
//   return (
//     <div className='border-r border-slate-500 p-4 flex flex-col'>
      
//       <SearchInput />
//       <div className='divider px-3'></div>
//       <Conversations />
//       <LogoutButton />
//     </div>
//   )
// }

// export default Sidebar
