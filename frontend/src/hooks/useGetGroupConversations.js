import { useState, useEffect } from 'react';
import useGetGroupConversation from '../zustand/useGetGroupConversation';

const useGetGroupConversations = () => {
  const { setGroupConversations } = useGetGroupConversation();
  const [loading, setLoading] = useState(true);

  const fetchConversations = async () => {
    try {
      const response = await fetch('/api/groupChat/conversations', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setGroupConversations(data.conversations);
    } catch (error) {
      console.error('Error fetching group conversations:', error);
      setGroupConversations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [setGroupConversations]);

  return { loading };
};

export default useGetGroupConversations;
