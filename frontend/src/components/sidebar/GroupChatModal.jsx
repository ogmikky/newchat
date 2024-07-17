import React, { useState, useEffect } from 'react';
import useGetFriends from '../../hooks/useGetFriends';
import useGetGroupConversation from '../../zustand/useGetGroupConversation';
import { useAuthContext } from '../../context/AuthContext';

const GroupChatModal = ({ onClose }) => {
  const { friends } = useGetFriends();
  const { addGroupConversation } = useGetGroupConversation();
  const { authUser } = useAuthContext();
  const [selectedFriends, setSelectedFriends] = useState([authUser._id]);
  const [groupName, setGroupName] = useState('');
  const [groupImage, setGroupImage] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    // Ensure the authUser is selected by default
    setSelectedFriends([authUser._id]);
  }, [authUser]);

  const handleSelectFriend = (friendId) => {
    setSelectedFriends((prev) =>
      prev.includes(friendId) ? prev.filter((id) => id !== friendId) : [...prev, friendId]
    );
  };

  const handleCreateGroup = async () => {
    if (!groupName || selectedFriends.length === 0) {
      console.error('Group name and members are required');
      return;
    }

    const formData = new FormData();
    formData.append('groupName', groupName);
    formData.append('members', JSON.stringify(selectedFriends));
    if (groupImage) formData.append('groupImage', groupImage);

    setLoading(true); // Set loading to true

    try {
      const response = await fetch('/api/groupChat/createGroup', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      if (data.groupConversation) {
        addGroupConversation(data.groupConversation);
      }

      onClose();
    } catch (error) {
      console.error('Error creating group:', error);
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Register New Group</h2>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full mb-2 p-2 border rounded"
        />
        <input
          type="file"
          onChange={(e) => setGroupImage(e.target.files[0])}
          className="w-full mb-2 p-2 border rounded"
        />
        <div className="mb-4">
          <h3 className="font-bold mb-2">Friends</h3>
          {friends.length > 0 ? (
            friends
              .filter(friend => friend._id !== authUser._id)
              .map((friend) => (
                <div
                  key={friend._id}
                  className={`p-2 border rounded mb-2 cursor-pointer ${
                    selectedFriends.includes(friend._id) ? 'bg-blue-200' : ''
                  }`}
                  onClick={() => handleSelectFriend(friend._id)}
                >
                  {friend.fullName}
                </div>
              ))
          ) : (
            <p>No friends available</p>
          )}
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleCreateGroup}
            className={`bg-blue-500 text-white px-4 py-2 rounded mr-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Create'}
          </button>
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupChatModal;
  