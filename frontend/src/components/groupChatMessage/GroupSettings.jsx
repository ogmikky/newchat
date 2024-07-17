import { useState, useEffect } from "react";
import useGetGroupConversation from "../../zustand/useGetGroupConversation";
import useGetFriends from "../../hooks/useGetFriends";

const GroupSettings = ({ groupId, participants, creatorId, closeSettings }) => {
  const { addMember, removeMember, deleteGroup, fetchGroupConversation } = useGetGroupConversation();
  const [localParticipants, setLocalParticipants] = useState(participants);
  const [action, setAction] = useState(null); // 'add' or 'remove'
  const [loading, setLoading] = useState(false);
  const { friends } = useGetFriends();

  useEffect(() => {
    // Fetch latest group details after each action
    const updateGroupDetails = async () => {
      const updatedGroup = await fetchGroupConversation(groupId);
      setLocalParticipants(updatedGroup.participants);
    };

    if (!loading && action) {
      updateGroupDetails();
    }
  }, [loading, action, groupId, fetchGroupConversation]);

  const handleAddMember = async (memberId) => {
    setLoading(true);
    await addMember(groupId, memberId);
    setLoading(false);
  };

  const handleRemoveMember = async (memberId) => {
    setLoading(true);
    await removeMember(groupId, memberId);
    setLoading(false);
  };

  const handleDeleteGroup = async () => {
    setLoading(true);
    await deleteGroup(groupId);
    setLoading(false);
    closeSettings();
  };

  const renderMembers = () => (
    action === 'add' ? (
      friends
        ?.filter(friend => friend._id !== creatorId && !localParticipants.some(participant => participant._id === friend._id))
        .map(friend => (
          <button
            key={friend._id}
            onClick={() => handleAddMember(friend._id)}
            className="btn btn-sm btn-secondary text-white bg-green-500 hover:bg-green-700 w-full mb-2"
            disabled={loading}
          >
            {loading ? "Processing..." : `Select ${friend.fullName}`}
          </button>
        ))
    ) : (
      localParticipants
        ?.filter(member => member._id !== creatorId)
        .map(member => (
          <button
            key={member._id}
            onClick={() => handleRemoveMember(member._id)}
            className="btn btn-sm btn-secondary text-white bg-red-500 hover:bg-red-700 w-full mb-2"
            disabled={loading}
          >
            {loading ? "Processing..." : `Select ${member.fullName}`}
          </button>
        ))
    )
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-md w-80">
        <h2 className="text-lg font-bold mb-4">Group Settings</h2>
        {action ? (
          <div>
            {renderMembers()}
            <button onClick={() => setAction(null)} className="btn btn-sm btn-secondary mt-2 w-full">
              Back
            </button>
          </div>
        ) : (
          <>
            <button onClick={() => setAction('add')} className="btn btn-sm btn-secondary text-white bg-green-500 hover:bg-green-700 w-full mb-2">
              Add Member
            </button>
            <button onClick={() => setAction('remove')} className="btn btn-sm btn-danger text-white bg-red-500 hover:bg-red-700 w-full mb-2">
              Remove Member
            </button>
            <button onClick={handleDeleteGroup} className="btn btn-sm btn-danger text-white bg-black hover:bg-red-700 w-full mb-2" disabled={loading}>
              {loading ? "Processing..." : "Delete Group"}
            </button>
            <button onClick={closeSettings} className="btn btn-sm btn-secondary mt-2 w-full">
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default GroupSettings;
