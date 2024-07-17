import React, { useEffect, useRef } from "react";
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import { useSocketContext } from "../../context/SocketContext";
import useGetGroupConversation from "../../zustand/useGetGroupConversation";

const GroupMessages = () => {
  const { authUser } = useAuthContext();
  const { selectedGroupConversation, groupMessages, setGroupMessages, addGroupMessage } = useGetGroupConversation();
  const { socket } = useSocketContext();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (selectedGroupConversation) {
      setGroupMessages(selectedGroupConversation.messages);
    }
  }, [selectedGroupConversation, setGroupMessages]);

  useEffect(() => {
    const handleReceiveGroupMessage = (newMessage) => {
      addGroupMessage(newMessage);
    };

    socket.on("receiveGroupMessage", handleReceiveGroupMessage);

    return () => {
      socket.off("receiveGroupMessage", handleReceiveGroupMessage);
    };
  }, [socket, addGroupMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [groupMessages]);

  // console.log(groupMessages, 'jfhfjgh');

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {groupMessages.map((message, index) => {
        const fromMe = message.senderId === authUser._id;
        const sender = selectedGroupConversation && selectedGroupConversation.members 
          ? selectedGroupConversation.members.find(member => member._id === message.senderId)
          : null;
        const profilePic = fromMe ? authUser.profilePic : sender?.image || "default_profile_picture_url";
        const senderName = fromMe ? "You" : sender?.fullName || "Unknown";
        const formattedTime = extractTime(message?.createdAt || new Date());
        const chatClassName = fromMe ? 'chat-end' : 'chat-start';
        const bubbleBgColor = fromMe ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black';
        const shakeClass = message.shouldShake ? "shake" : "";
        // console.log(message, 'hch' );

        return (
          <div key={index} className={`chat ${chatClassName} mb-4`}>
            <div className='chat-image avatar'>
              <div className='w-10 rounded-full'>
                <img alt='Profile' src={profilePic} />
              </div>
            </div>
            <div className='chat-header'>
              <span className='text-sm font-semibold text-white'>{senderName}</span>
            </div>
            <div className={`chat-bubble ${bubbleBgColor} ${shakeClass}`}>
              {message.imageUrl ? (
                <img 
                  src={message.imageUrl} 
                  alt='Message' 
                  className='max-w-full h-auto'
                />
              ) : (
                message.message
              )}
            </div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center text-white'>{formattedTime}</div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default GroupMessages;



// import React, { useEffect, useRef } from "react";
// import { useAuthContext } from "../../context/AuthContext";
// import { extractTime } from "../../utils/extractTime";
// import { useSocketContext } from "../../context/SocketContext";
// import useGetGroupConversation from "../../zustand/useGetGroupConversation";

// const GroupMessages = () => {
//   const { authUser } = useAuthContext();
//   const { selectedGroupConversation, groupMessages, setGroupMessages, addGroupMessage } = useGetGroupConversation();
//   const { socket } = useSocketContext();
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     if (selectedGroupConversation) {
//       setGroupMessages(selectedGroupConversation.messages);
//     }
//   }, [selectedGroupConversation, setGroupMessages]);

//   useEffect(() => {
//     const handleReceiveGroupMessage = (newMessage) => {
//       addGroupMessage(newMessage);
//     };

//     socket.on("receiveGroupMessage", handleReceiveGroupMessage);

//     return () => {
//       socket.off("receiveGroupMessage", handleReceiveGroupMessage);
//     };
//   }, [socket, addGroupMessage]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [groupMessages]);

//   return (
//     <div className="flex-1 overflow-y-auto p-4">
//       {groupMessages.map((message, index) => {
//         const fromMe = message.senderId === authUser._id;
//         const sender = selectedGroupConversation?.members.find(member => member._id === message.senderId);
//         const profilePic = fromMe ? authUser.image : sender?.image;
//         const formattedTime = extractTime(message.createdAt);
//         const chatClassName = fromMe ? 'chat-end' : 'chat-start';
//         const bubbleBgColor = fromMe ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black';
//         const shakeClass = message.shouldShake ? "shake" : "";

//         return (
//           <div key={index} className={`chat ${chatClassName} mb-4`}>
//             <div className='chat-image avatar'>
//               <div className='w-10 rounded-full'>
//                 <img alt='Profile' src={profilePic} />
//               </div>
//             </div>
//             <div className={`chat-bubble ${bubbleBgColor} ${shakeClass}`}>
//               {message.imageUrl ? (
//                 <img 
//                   src={message.imageUrl} 
//                   alt='Message' 
//                   className='max-w-full h-auto'
//                 />
//               ) : (
//                 message.message
//               )}
//             </div>
//             <div className='chat-footer opacity-50 text-xs flex gap-1 items-center text-white'>{formattedTime}</div>
//           </div>
//         );
//       })}
//       <div ref={messagesEndRef} />
//     </div>
//   );
// };

// export default GroupMessages;




// import React, { useEffect, useRef } from "react";
// import { useAuthContext } from "../../context/AuthContext";
// import { extractTime } from "../../utils/extractTime";
// import { useSocketContext } from "../../context/SocketContext";
// import useGetGroupConversation from "../../zustand/useGetGroupConversation";

// const GroupMessages = () => {
//   const { authUser } = useAuthContext();
//   const { selectedGroupConversation, groupMessages, setGroupMessages, addGroupMessage } = useGetGroupConversation();
//   const { socket } = useSocketContext();
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     if (selectedGroupConversation) {
//       setGroupMessages(selectedGroupConversation.messages);
//     }
//   }, [selectedGroupConversation, setGroupMessages]);

//   useEffect(() => {
//     const handleReceiveGroupMessage = (newMessage) => {
//       addGroupMessage(newMessage);
//     };

//     socket.on("receiveGroupMessage", handleReceiveGroupMessage);

//     return () => socket.off("receiveGroupMessage", handleReceiveGroupMessage);
//   }, [socket, addGroupMessage]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [groupMessages]);

//   return (
//     <div className="flex-1 overflow-y-auto p-4">
//       {groupMessages.map((message, index) => {
//         const fromMe = message.senderId === authUser._id;
//         const sender = selectedGroupConversation.members.find(member => member._id === message.senderId);
//         const profilePic = fromMe ? authUser.image : sender?.image;
//         const formattedTime = extractTime(message.createdAt);
//         const chatClassName = fromMe ? 'chat-end' : 'chat-start';
//         const bubbleBgColor = fromMe ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black';
//         const shakeClass = message.shouldShake ? "shake" : "";

//         return (
//           <div key={index} className={`chat ${chatClassName} mb-4`}>
//             <div className='chat-image avatar'>
//               <div className='w-10 rounded-full'>
//                 <img alt='Profile' src={profilePic} />
//               </div>
//             </div>
//             <div className={`chat-bubble ${bubbleBgColor} ${shakeClass}`}>
//               {message.imageUrl ? (
//                 <img 
//                   src={message.imageUrl} 
//                   alt='Message' 
//                   className='max-w-full h-auto'
//                 />
//               ) : (
//                 message.message
//               )}
//             </div>
//             <div className='chat-footer opacity-50 text-xs flex gap-1 items-center text-white'>{formattedTime}</div>
//           </div>
//         );
//       })}
//       <div ref={messagesEndRef} />
//     </div>
//   );
// };

// export default GroupMessages;






// import React, { useEffect, useRef } from "react";
// import { useAuthContext } from "../../context/AuthContext";
// import { extractTime } from "../../utils/extractTime";
// import { useSocketContext } from "../../context/SocketContext";
// import useGetGroupConversation from "../../zustand/useGetGroupConversation";

// const GroupMessages = () => {
//   const { authUser } = useAuthContext();
//   const { selectedGroupConversation, groupMessages, setGroupMessages, addGroupMessage } = useGetGroupConversation();
//   const { socket } = useSocketContext();
//   const messagesEndRef = useRef(null);
//   const fromMe = groupMessages.senderId === authUser._id;
//   // const profilePic = fromMe ? authUser.image : selectedGroupConversation?.image;
//   const profilePic = senderId.image

 



//   useEffect(() => {
//     if (selectedGroupConversation) {
//       setGroupMessages(selectedGroupConversation.messages);
//     }
//   }, [selectedGroupConversation, setGroupMessages]);

//   useEffect(() => {
//     const handleReceiveGroupMessage = (newMessage) => {
//       addGroupMessage(newMessage);
//     };

//     socket.on("receiveGroupMessage", handleReceiveGroupMessage);

//     return () => socket.off("receiveGroupMessage", handleReceiveGroupMessage);
//   }, [socket, addGroupMessage]);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [groupMessages]);

//   return (
//     <div className="flex-1 overflow-y-auto p-4">
      
//       {groupMessages.map((message, index) => (
        
//         <div
        
//           key={index}
//           className={`mb-4 ${message.senderId === authUser._id ? "text-right" : ""}`}
//         >
//           <div className={`inline-block p-2 rounded ${message.senderId === authUser._id ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}>
//             {message.message}
//             <div className='w-10 rounded-full'>
//               <img 
//                 alt='Profile' 
//                 src={profilePic} 
//               />
//         </div>
//           </div>
//         </div>
//       ))}
//       <div ref={messagesEndRef} />
//     </div>
//   );
// };

// export default GroupMessages;



