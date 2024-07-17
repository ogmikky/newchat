import { create } from "zustand";
import axios from "axios";

const useGetGroupConversation = create((set) => ({
  selectedGroupConversation: null,
  setSelectedGroupConversation: (selectedGroupConversation) =>
    set({ selectedGroupConversation }),

  groupMessages: [],
  setGroupMessages: (groupMessages) => set({ groupMessages }),
  addGroupMessage: (message) =>
    set((state) => ({
      groupMessages: [...state.groupMessages, message],
    })),
  groupConversations: [],
  setGroupConversations: (groupConversations) =>
    set({ groupConversations }),
  addGroupConversation: (newGroupConversation) =>
    set((state) => ({
      groupConversations: [...state.groupConversations, newGroupConversation],
    })),

  fetchFriends: async () => {
    try {
      const response = await axios.get("/api/groupChat/friends");
      return response.data.friends;
    } catch (error) {
      console.error("Failed to fetch friends", error);
      return [];
    }
  },

  createGroupConversation: async (groupName, members, groupImageFile) => {
    try {
      const formData = new FormData();
      formData.append("groupName", groupName);
      formData.append("members", JSON.stringify(members));
      if (groupImageFile) {
        formData.append("groupImage", groupImageFile);
      }

      const response = await axios.post("/api/groupChat/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data.groupConversation;
    } catch (error) {
      console.error("Failed to create group conversation", error);
      return null;
    }
  },

  sendGroupMessage: async (groupId, message, file) => {
    try {
      const formData = new FormData();
      formData.append("message", message);
      if (file) {
        formData.append("file", file);
      }

      const response = await axios.post(
        `/api/groupChat/${groupId}/sendMessage`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data, 'response');
      setGroupMessages(response.data)

      return response.data;
     
    } catch (error) {
      console.error("Failed to send group message", error);
      return null;
    }
  },

  addMember: async (groupId, memberId) => {
    try {
      const response = await axios.post(
        `/api/groupChat/${groupId}/addMember`,
        { memberId }
      );
      alert('added user successfully')
      window.location.reload()
      return response.data.newMember;
    } catch (error) {
      console.error("Failed to add member", error);
      return null;
    }
  },

  removeMember: async (groupId, memberId) => {
    try {
      await axios.post(`/api/groupChat/${groupId}/removeMember`, { memberId });
      alert('remove user successfully')
      window.location.reload()
      return memberId; // Return memberId if successful for local state update
    } catch (error) {
      console.error("Failed to remove member", error);
      return null;
    }
  },

  deleteGroup: async (groupId) => {
    try {
      await axios.delete(`/api/groupChat/${groupId}/delete`);
      alert('Group deleted successfully')
      window.location.reload()
      return groupId; // Return groupId if successful for local state update
    } catch (error) {
      console.error("Failed to delete group", error);
      return null;
    }
  },

  fetchGroupConversation: async (groupId) => {
    try {
      const response = await axios.get(`/api/groupMembers/${groupId}`);
      return response.data.groupConversation;
    } catch (error) {
      console.error("Failed to fetch group conversation", error);
      return null;
    }
  }
}));

export default useGetGroupConversation;
