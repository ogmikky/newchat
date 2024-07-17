import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useGetGroupConversation from "../../zustand/useGetGroupConversation";

const GroupMessage = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedGroupConversation } = useGetGroupConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? 'chat-end' : 'chat-start';
  const profilePic = fromMe ? authUser?.profilePic : selectedGroupConversation?.image;
  const bubbleBgColor = fromMe ? 'bg-blue-500' : "";
  const shakeClass = message.shouldShake ? "shake" : "";

  console.log(message);

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img 
            alt='Profile' 
            src={profilePic} 
          />
        </div>
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
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
    </div>
  );
};

export default GroupMessage;


// import { useAuthContext } from "../../context/AuthContext";
// import { extractTime } from "../../utils/extractTime";
// import useGetGroupConversation from "../../zustand/useGetGroupConversation";

// const GroupMessage = ({ message }) => {
//   const { authUser } = useAuthContext();
//   const { selectedConversation } = useGetGroupConversation();
//   const fromMe = message.senderId === authUser._id;
//   const formattedTime = extractTime(message.createdAt);
//   const chatClassName = fromMe ? 'chat-end' : 'chat-start';
//   const profilePic = fromMe ? authUser.image : selectedConversation?.image;
//   const bubbleBgColor = fromMe ? 'bg-blue-500' : "";
//   const shakeClass = message.shouldShake ? "shake" : "";

//   return (
//     <div className={`chat ${chatClassName}`}>
//       <div className='chat-image avatar'>
//         <div className='w-10 rounded-full'>
//           <img 
//             alt='Profile' 
//             src={profilePic} 
//           />
//         </div>
//       </div>
//       <div className={`chat-bubble ${bubbleBgColor} ${shakeClass}`}>
//         {message.imageUrl ? (
//           <img 
//             src={message.imageUrl} 
//             alt='Message' 
//             className='max-w-full h-auto'
//           />
//         ) : (
//           message.message
//         )}
//       </div>
//       <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
//     </div>
//   );
// };

// export default GroupMessage;

