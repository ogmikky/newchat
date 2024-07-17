import { useEffect, useState } from "react";
import useGetGroupConversation from "../../zustand/useGetGroupConversation";
import GroupMessageInput from "./GroupMessageInput";
import GroupMessages from "./GroupMessages";
import GroupSettings from "./GroupSettings";
import { TiMessages } from "react-icons/ti";
import { FiSettings } from "react-icons/fi";
import { useAuthContext } from "../../context/AuthContext";

const GroupMessageContainer = () => {
  const { selectedGroupConversation, setSelectedGroupConversation } = useGetGroupConversation();
  const { authUser } = useAuthContext();
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    return () => setSelectedGroupConversation(null);
  }, [setSelectedGroupConversation]);

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const closeSettings = () => {
    setShowSettings(false);
  };
  // console.log(selectedGroupConversation);

  return (
    <div className="md:min-w-[450px] h-full flex flex-col">
      {!selectedGroupConversation ? (
        <NoChatSelectedComponent />
      ) : (
        <>
          <div className="bg-slate-500 px-4 py-2 mb-2 flex justify-between items-center">
            <span>
              <span className="label-text">Group Name: </span> {" "}
              <span className="text-gray-900 font-bold">{selectedGroupConversation.groupName}</span>
            </span>
            {selectedGroupConversation?.creatorId === authUser?._id && (
              <FiSettings className="text-xl cursor-pointer" onClick={handleSettingsClick} />
            )}
          </div>
          <GroupMessages />
          <GroupMessageInput />
          {showSettings && (
            <GroupSettings 
              groupId={selectedGroupConversation?._id} 
              closeSettings={closeSettings} 
              participants={selectedGroupConversation?.members}
              creatorId={selectedGroupConversation?.creatorId} 
            />
          )}
        </>
      )}
    </div>
  );
};

export default GroupMessageContainer;

const NoChatSelectedComponent = () => { 
  const { authUser } = useAuthContext();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 {authUser.fullName}</p>
        <p>Select a group chat to start Messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};
