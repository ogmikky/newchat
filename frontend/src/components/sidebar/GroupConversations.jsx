// import React, { useEffect } from 'react';
// import useGetGroupConversation from '../../zustand/useGetGroupConversation';
// import useGetGroupConversations from '../../hooks/useGetGroupConversations';
// import Gconversation from '../groupChatConversion/Gconversation';
// import { getRandomEmoji } from '../../utils/emojis';

// const GroupConversations = ({ onClick }) => {
//   const { loading } = useGetGroupConversations();
//   const { groupConversations, setSelectedConversation } = useGetGroupConversation();

//   useEffect(() => {
//     console.log('GroupConversations:', groupConversations);
//     console.log('Loading:', loading);
//   }, [groupConversations, loading]);

//   const handleGroupConversationClick = (groupConversation) => {
//     setSelectedConversation(groupConversation);
//     onClick();
//   };

//   return (
//     <div className="py-2 flex flex-col overflow-auto">
//       {groupConversations && groupConversations.length > 0 ? (
//         groupConversations.map((conversation, idx) => (
//           <Gconversation
//             key={conversation._id}
//             conversation={conversation}
//             emoji={getRandomEmoji()}
//             lastIdx={idx === groupConversations.length - 1}
//             onClick={() => handleGroupConversationClick(conversation)}
//           />
//         ))
//       ) : (
//         !loading && <p>No group conversations available</p>
//       )}
//       {loading && <span className="loading loading-spinner mx-auto"></span>}
//     </div>
//   );
// };

// export default GroupConversations;


// import React, { useEffect } from 'react';
// import useGetGroupConversation from '../../zustand/useGetGroupConversation';
// import useGetGroupConversations from '../../hooks/useGetGroupConversations';
// import Gconversation from '../groupChatConversion/Gconversation';
// import { getRandomEmoji } from '../../utils/emojis';

// const GroupConversations = () => {
//   const { loading } = useGetGroupConversations();
//   const { groupConversations } = useGetGroupConversation();

//   useEffect(() => {
//     console.log('GroupConversations:', groupConversations);
//     console.log('Loading:', loading);
//   }, [groupConversations, loading]);

//   return (
//     <div className="py-2 flex flex-col overflow-auto">
//       {groupConversations && groupConversations.length > 0 ? (
//         groupConversations.map((conversation, idx) => (
//           <Gconversation
//             key={conversation._id}
//             conversation={conversation}
//             emoji={getRandomEmoji()}
//             lastIdx={idx === groupConversations.length - 1}
//           />
//         ))
//       ) : (
//         !loading && <p>No group conversations available</p>
//       )}
//       {loading && <span className="loading loading-spinner mx-auto"></span>}
//     </div>
//   );
// };

// export default GroupConversations;



import React, { useEffect } from 'react';
import useGetGroupConversation from '../../zustand/useGetGroupConversation';
import useGetGroupConversations from '../../hooks/useGetGroupConversations';
import Gconversation from '../groupChatConversion/Gconversation';
import { getRandomEmoji } from '../../utils/emojis';

const GroupConversations = ({handleGroupChatSelection}) => {
  const { loading } = useGetGroupConversations();
  const { groupConversations } = useGetGroupConversation();

  useEffect(() => {
    console.log('Loading:', loading);
  }, [groupConversations, loading]);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {groupConversations && groupConversations.length > 0 ? (
        groupConversations.map((conversation, idx) => (
          <Gconversation
            key={conversation._id}
            conversation={conversation}
            emoji={getRandomEmoji()}
            lastIdx={idx === groupConversations.length - 1}
            handleGroupChatSelection={handleGroupChatSelection}
          />
        ))
      ) : (
        !loading && <p>No group conversations available</p>
      )}
      {loading && <span className="loading loading-spinner mx-auto"></span>}
    </div>
  );
};

export default GroupConversations;
