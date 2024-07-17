// import React from 'react';
// import useGetGroupConversation from '../../zustand/useGetGroupConversation';

// const Gconversation = ({ conversation, emoji }) => {
//   const { setSelectedGroupConversation } = useGetGroupConversation();

//   const handleSelectConversation = () => {
//     setSelectedGroupConversation(conversation);
//     console.log('Selected Group Conversation:', conversation);
//   };

//   return (
//     <div onClick={handleSelectConversation} className="cursor-pointer">
//       <div className="flex items-center gap-2 p-2 hover:bg-gray-200 rounded-lg">
//         <span>{emoji}</span>
//         <span>{conversation.groupName}</span>
//       </div>
//     </div>
//   );
// };

// export default Gconversation;

import React from "react";
import { useSocketContext } from "../../context/SocketContext";
import useGetGroupConversation from "../../zustand/useGetGroupConversation";
import useConversation from "../../zustand/useConversation";

const Gconversation = ({
  conversation,
  lastIdx,
  emoji,
  handleGroupChatSelection,
}) => {
  const { selectedGroupConversation, setSelectedGroupConversation } =
    useGetGroupConversation();

  // console.log(selectedGroupConversation);
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation._id);

  const isSelected = selectedGroupConversation?._id === conversation._id;

  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => {
          setSelectedGroupConversation(conversation);
          handleGroupChatSelection();
        }}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={conversation.groupImage} alt="avatar" />
          </div>
        </div>

        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <p className="font-bold lg:block md:block sm:block hidden text-gray-200">
              {conversation.groupName}
            </p>
            <span className="text-xl lg:block md:block sm:block hidden">
              {emoji}
            </span>
          </div>
        </div>
      </div>

      {!lastIdx && <div className="divider my-0 py-0 h-1" />}
    </>
  );
};

export default Gconversation;
