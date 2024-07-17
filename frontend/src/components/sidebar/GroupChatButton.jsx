import React, { useState } from 'react';
import axios from 'axios';

const GroupChatButton = ({ onClose }) => {
  const [groupName, setGroupName] = useState('');
  const [friends, setFriends] = useState([]);
  const [friendName, setFriendName] = useState('');

  const handleAddFriend = () => {
    if (friendName.trim() && !friends.includes(friendName.trim())) {
      setFriends([...friends, friendName.trim()]);
      setFriendName('');
    }
  };

  const handleRemoveFriend = (name) => {
    setFriends(friends.filter(friend => friend !== name));
  };

  const handleCreateGroup = async () => {
    try {
      const response = await axios.post('/api/groupChat/createGroup', {
        groupName,
        members: friends
      });

      if (response.status === 201) {
        alert('Group created successfully!');
        setGroupName('');
        setFriends([]);
        onClose();
      }
    } catch (error) {
      console.error('Error creating group:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h2 className="mb-4">Create Group Chat</h2>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="mb-2 p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="text"
        placeholder="Add Friend Name"
        value={friendName}
        onChange={(e) => setFriendName(e.target.value)}
        className="mb-2 p-2 border border-gray-300 rounded w-full"
      />
      <button onClick={handleAddFriend} className="mb-2 p-2 bg-blue-500 text-white rounded w-full">
        Add Friend
      </button>
      <div>
        {friends.map((friend) => (
          <div key={friend} className="mb-1 p-1 flex justify-between border border-gray-300 rounded">
            {friend}
            <button onClick={() => handleRemoveFriend(friend)} className="text-red-500">
              Remove
            </button>
          </div>
        ))}
      </div>
      <button onClick={handleCreateGroup} className="mt-4 p-2 bg-green-500 text-white rounded w-full">
        Create Group
      </button>
      <button onClick={onClose} className="mt-2 p-2 bg-gray-500 text-white rounded w-full">
        Cancel
      </button>
    </div>
  );
};

export default GroupChatButton;
