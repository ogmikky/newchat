import { useState } from "react";
import { BsSend, BsPaperclip } from "react-icons/bs";
import useSendMessage from "../../hooks/useSendMessage";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const { loading, sendMessage } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message && !file) return;

    await sendMessage(message, file);
    setMessage("");
    setFile(null);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <form className="flex items-center p-2 border-t border-gray-300" onSubmit={handleSubmit}>
      <div className="w-full relative flex items-center">
        <div className="p-5"></div>
        <input
          type="text"
          className="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 text-white"
          placeholder="      Send a message"
          value={message || ""}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="file"
          className="hidden"
          id="fileInput"
          onChange={handleFileChange}
        />
        <label htmlFor="fileInput" className="absolute inset-y-0 start-0 flex items-center ps-3 cursor-pointer">
          <BsPaperclip className="text-white" />
        </label>
        <button type="submit" className="absolute inset-y-0 end-0 flex items-center pe-3">
          {loading ? <div className="loading loading-spinner"></div> : <BsSend />}
        </button>
      </div>
    </form>
  );
};

export default MessageInput;




// import React, { useState } from "react";
// import useConversation from "../../zustand/useConversation";
// import { useAuthContext } from "../../context/AuthContext";
// import { useSocketContext } from "../../context/SocketContext";
// import { BsSend } from "react-icons/bs";

// const MessageInput = () => {
//   const [message, setMessage] = useState("");
//   const { selectedConversation } = useConversation();
//   const { authUser } = useAuthContext();
//   const { socket } = useSocketContext();

//   const handleSendMessage = async (e) => {
//     e.preventDefault();

//     if (!message.trim()) return;

//     const newMessage = {
//       senderId: authUser._id,
//       message,
//       conversationId: selectedConversation._id,
//     };

//     socket.emit("sendMessage", newMessage);
//     setMessage("");
//   };

//   return (
//     <div className="p-4 border-t border-gray-300">
//       <form onSubmit={handleSendMessage} className="flex items-center gap-2">
//         <input
//           type="text"
//           className="flex-1 px-4 py-2 border rounded"
//           placeholder="Type a message"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//         />
//         <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
//           <BsSend />
//         </button>
//       </form>
//     </div>
//   );
// };

// export default MessageInput;

