import { useEffect, useState } from "react";
import useGetGroupConversation from "../zustand/useGetGroupConversations";
import toast from "react-hot-toast";

const useGetGroupMessages = () => {
  const [loading, setLoading] = useState(false);
  const { groupConversations, setGroupConversations, selectedConversation } = useGetGroupConversation();

  useEffect(() => {
    const getGroupMessages = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/getGroupMessages/${selectedConversation._id}`);
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setGroupConversations(groupConversations.map(conversation => 
          conversation._id === selectedConversation._id
            ? { ...conversation, messages: data }
            : conversation
        ));
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) getGroupMessages();
  }, [selectedConversation?._id, setGroupConversations]);

  const messages = selectedConversation?.messages || [];

  return { messages, loading };
};

export default useGetGroupMessages;
