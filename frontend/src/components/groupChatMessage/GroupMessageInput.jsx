  import React, { useState } from "react";
  import useGetGroupConversation from "../../zustand/useGetGroupConversation";
  import { useAuthContext } from "../../context/AuthContext";
  import { useSocketContext } from "../../context/SocketContext";
  import { BsSend } from "react-icons/bs";
  import useGroupSendMessage from "../../hooks/useGroupSendMessage";

  const GroupMessageInput = () => {
    const [message, setMessage] = useState("");
    const { selectedGroupConversation, groupMessages } = useGetGroupConversation();
    const { loading, sendGroupMessage } = useGroupSendMessage()
    const { authUser } = useAuthContext();
    const { socket } = useSocketContext();

    const handleSendMessage = async (e) => {
      
      e.preventDefault();

      if (!message.trim()) return;

      await sendGroupMessage(message);
      setMessage("");

      const newMessage = {
        senderId: authUser._id,
        message,
        conversationId: selectedGroupConversation._id,
      };
      
    

      socket.emit("sendGroupMessage", newMessage);
      setMessage("");
    };

    return (
      <div className="p-4 border-t border-gray-300">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
          </button>
        </form>
      </div>
    );
  };

  export default GroupMessageInput;




//   import React, { useState } from "react";
// import useGetGroupConversation from "../../zustand/useGetGroupConversation";
// import { useAuthContext } from "../../context/AuthContext";
// import { useSocketContext } from "../../context/SocketContext";
// import { BsSend } from "react-icons/bs";
// import useGroupSendMessage from "../../hooks/useGroupSendMessage";

// const GroupMessageInput = () => {
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const { selectedGroupConversation } = useGetGroupConversation();
//   const { sendGroupMessage } = useGroupSendMessage();
//   const { authUser } = useAuthContext();
//   const { socket } = useSocketContext();

//   const handleSendMessage = async (e) => {
//     e.preventDefault();

//     if (!message.trim()) return;

//     setLoading(true);

//     await sendGroupMessage(message);
//     setMessage("");

//     const newMessage = {
//       senderId: authUser._id,
//       message,
//       conversationId: selectedGroupConversation._id,
//     };

//     socket.emit("sendGroupMessage", newMessage);

//     setLoading(false);
//   };

//   return (
//     <div className="p-4 border-t border-gray-300">
//       <form onSubmit={handleSendMessage} className="flex items-center gap-2">
//         <input
//           type="text"
//           className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
//           placeholder="Type a message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
//           {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default GroupMessageInput;



