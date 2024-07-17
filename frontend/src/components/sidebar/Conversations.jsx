import useGetConversations from "../../hooks/useGetConversations";
import { getRandomEmoji } from '../../utils/emojis';
import Conversation from "./Conversation";
import useConversation from "../../zustand/useConversation";

const Conversations = ({ onClick,handleConversationSelection }) => {
  const { loading, conversations } = useGetConversations();
  const { setSelectedConversation } = useConversation();

  const handleConversationClick = (conversation) => {
    setSelectedConversation(conversation);
    console.log('hy')
    onClick();
  };

  return (
    
    <div className='py-2 flex flex-col overflow-auto'>
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
          onClick={() => handleConversationClick(conversation)}
          handleConversationSelection={handleConversationSelection}
        />
      ))}

      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  );
};

export default Conversations;



// import useGetConversations from "../../hooks/useGetConversations";
// import { getRandomEmoji } from '../../utils/emojis';
// import Conversation from "./Conversation";

// const Conversations = () => {
//   const {loading, conversations } = useGetConversations();
//   // console.log("CONVERSATIONS:", conversations);

 

//   return (
//     <div className='py-2 flex flex-col overflow-auto'>
//       {conversations.map((conversation, idx) => (
//         <Conversation
//           key={conversation._id}
//           conversation={conversation}
//           emoji={getRandomEmoji()}
//           lastIdx={idx === conversations.length - 1}
//         />
//       ))}

//       {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
//     </div>
//   );
// };

// export default Conversations;




// import useGetConversations from "../../hooks/useGetConversations";
// import  { getRandomEmoji } from '../../utils/emojis';
// import Conversation from "./Conversation";

// const Conversations = () => {
//   const {loading, conversations} = useGetConversations();
//   console.log("CONVERSATIONS:", conversations);

//   return (
//     <div className='py-2 flex flex-col overflow-auto'>

//     {conversations.map((conversation, idx) =>(
//       <Conversation
//       key={conversation._id}
//       conversation={conversation}
//       emoji={getRandomEmoji()}
//       lastIdx={idx === conversations.length - 1}
//       />
//     ))}  

//     {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
      
//     </div>
//   );
// };

// export default Conversations
