import { useState } from "react";
import GroupMessageContainer from "../../components/groupChatMessage/GroupMessageContainer";
import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  const [isGroupChatSelected, setIsGroupChatSelected] = useState(false);

  const handleGroupChatSelection = () => {
    console.log(isGroupChatSelected);
    setIsGroupChatSelected(true);
  };

  const handleConversationSelection = () => {
    setIsGroupChatSelected(false);
  };

  return (
    <div className="flex  lg:h-[100%] md:h-[100%] sm:h-full-screen h-[100%] overflow-hidden shadow-md shadow-white ">
      <Sidebar 
        className="flex-shrink-0 w-full sm:w-1/4 bg-gray-400 bg-opacity-25 backdrop-filter backdrop-blur-lg p-4"
        onGroupChatSelect={handleGroupChatSelection}
        onConversationSelect={handleConversationSelection}
        handleGroupChatSelection={handleGroupChatSelection}
        handleConversationSelection={handleConversationSelection}
      />
      <div className="flex-1 overflow-hidden bg-gray-400 bg-opacity-25 backdrop-filter backdrop-blur-lg p-4 ">
      {/* <GroupMessageContainer /> */}
        {isGroupChatSelected ? <GroupMessageContainer /> : <MessageContainer />}
      </div>
    </div>
  );
};

export default Home;




// import { useState } from "react";
// import GroupMessageContainer from "../../components/groupChatMessage/GroupMessageContainer";
// import MessageContainer from "../../components/messages/MessageContainer";
// import Sidebar from "../../components/sidebar/Sidebar";

// const Home = () => {
//   const [showGroupMessage, setShowGroupMessage] = useState(false);

//   const handleConversationClick = () => {
//     setShowGroupMessage(false);
//   };

//   const handleGroupConversationClick = () => {
//     setShowGroupMessage(true);
//   };

//   return (
//     <div className="flex lg:h-[100%] md:h-[100%] sm:h-full-screen h-[100%]">
//       <Sidebar 
//         className="flex-shrink-0 w-full sm:w-1/4 bg-gray-400 bg-opacity-25 backdrop-filter backdrop-blur-lg p-4"
//         onConversationClick={handleConversationClick}
//         onGroupConversationClick={handleGroupConversationClick}
//       />
//       <div className="flex-1 overflow-hidden bg-gray-400 bg-opacity-25 backdrop-filter backdrop-blur-lg p-4">
//         {showGroupMessage ? <GroupMessageContainer /> : <MessageContainer />}
//       </div>
//     </div>
//   );
// };

// export default Home;



// import GroupMessageContainer from "../../components/groupChatMessage/GroupMessageContainer";
// import MessageContainer from "../../components/messages/MessageContainer";
// import Sidebar from "../../components/sidebar/Sidebar";

// const Home = () => {
//   return (
//     <div className="flex  lg:h-[100%] md:h-[100%] sm:h-full-screen h-[100%]">
//       <Sidebar className="flex-shrink-0 w-full sm:w-1/4 bg-gray-400 bg-opacity-25 backdrop-filter backdrop-blur-lg p-4">
//       </Sidebar>
//       <div className="flex-1 overflow-hidden bg-gray-400 bg-opacity-25 backdrop-filter backdrop-blur-lg p-4 ">
//         <GroupMessageContainer />
//         <MessageContainer />
//       </div>
//     </div>
//   );
// };

// export default Home;



// import MessageContainer from "../../components/messages/MessageContainer"
// import Sidebar from "../../components/sidebar/Sidebar"

// const Home = () => {
//   return <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding
//   backdrop-filter backdrop-blur-lg bg-opacity-0'>
//           <Sidebar />
//           <MessageContainer />
//         </div>
// }

// export default Home
