import { useState } from "react";
import useGetGroupConversation from "../zustand/useGetGroupConversation";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import axios from "axios";

const useGroupSendMessage = () => {
  const [loading, setLoading] = useState(false);
  
  const { groupConversations, setGroupConversations, selectedGroupConversation } = useGetGroupConversation();
  
  console.log(groupConversations, 'fghjkl;')
  const sendGroupMessage = async (message, file = null) => {
    setLoading(true);
    // alert()
    try {
      const formData = new FormData();
      formData.append("message", message);
      if (file) {
        formData.append("image", file);
      }

      


      const res = await axios.post(`/api/groupChat/sendGroupMessage/${selectedGroupConversation._id}`, {message, file});
      
      const data = await res.data;
      console.log(data, ',eee')
      if (data.error) throw new Error(data.error);

      setGroupConversations(groupConversations.map(conversation => 
        conversation._id === selectedGroupConversation._id
          ? { ...conversation, messages: [...conversation.messages, data] }
          : conversation
      ));
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendGroupMessage, loading };
};

export default useGroupSendMessage;
