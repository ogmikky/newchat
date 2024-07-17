import models from '../models/index.js';
import cloudinary from '../utils/cloudinarys.js';
import { getReceiverSocketId, io } from '../socket/socket.js';



const { User, GroupConversation, GroupMessage } = models;

// Fetch friends
export const fetchFriends = async (req, res) => {
  try {
    // Fetch all users from the database
    const users = await User.find({}, 'fullName username gender image');

    // If no users found, return an empty array
    if (!users || users.length === 0) {
      return res.status(200).json({ friends: [] });
    }

    // Return all users as friends
    res.status(200).json({ friends: users });
  } catch (error) {
    console.error('Error fetching friends:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Create group conversation

// export const createGroupConversation = async (req, res) => {
//   try {
//     const { groupName } = req.body;
//     let { members } = req.body;

//     if (!groupName || !members || members.length === 0) {
//       return res.status(400).json({ error: 'Group name and members are required' });
//     }

//     // Parse the members string back to an array
//     members = JSON.parse(members);

//     const memberDocs = await User.find({ _id: { $in: members } });
//     if (memberDocs.length !== members.length) {
//       return res.status(400).json({ error: 'One or more members not found' });
//     }

//     let groupImageUrl = '';
//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         folder: 'GroupImages'
//       });
//       groupImageUrl = result.secure_url;
//     }

//     // Assuming the first member in the list is the admin
//     const adminId = members[0];

//     const groupConversation = new GroupConversation({
//       groupName,
//       participants: members,
//       groupImage: groupImageUrl,
//       admin: adminId
//     });

//     await groupConversation.save();

//     res.status(201).json({ message: 'Group conversation created successfully', groupConversation });
//   } catch (error) {
//     console.error('Error creating group conversation:', error.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

export const createGroupConversation = async (req, res) => {
  try {
    const { groupName } = req.body;
    let { members } = req.body;

    if (!groupName || !members || members.length === 0) {
      return res.status(400).json({ error: 'Group name and members are required' });
    }

    // Parse the members string back to an array if needed
    if (typeof members === 'string') {
      members = JSON.parse(members);
    }

    const memberDocs = await User.find({ _id: { $in: members } });
    if (memberDocs.length !== members.length) {
      return res.status(400).json({ error: 'One or more members not found' });
    }

    let groupImageUrl = '';
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'GroupImages'
      });
      groupImageUrl = result.secure_url;
    }

    // Assuming the first member in the list is the admin
    const creatorId = members[0];

    const groupConversation = new GroupConversation({
      groupName,
      participants: members,
      groupImage: groupImageUrl,
      creatorId
    });

    await groupConversation.save();

    res.status(201).json({ message: 'Group conversation created successfully', groupConversation });
  } catch (error) {
    console.error('Error creating group conversation:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};



// Other controller functions...

// Send group message

// export const sendGroupMessage = async (req, res) => {
//   try {
//     console.log(req.body);
//     const { groupId } = req.params;
//     const { message } = req.body;
//     const senderId = req.user._id;

//     let imageUrl = '';

//     if (req.file) {
//       const result = await cloudinary.uploader.upload(req.file.path, {
//         folder: 'groupMessageImage',
//         transformation: [{ width: 200, height: 300, crop: 'limit' }],
//       });
//       imageUrl = result.secure_url;
//     }

//     const groupConversation = await GroupConversation.findById(groupId);
//     if (!groupConversation) {
//       return res.status(404).json({ error: 'Group conversation not found' });
//     }

//     if (!message) {
//       return res.status(400).json({ error: 'Message is required' });
//     }

//     const newGroupMessage = new GroupMessage({
//       senderId,
//       message,
//       imageUrl,
//     });

//     groupConversation.messages.push(newGroupMessage._id);

//     await Promise.all([groupConversation.save(), newGroupMessage.save()]);

//     groupConversation.participants.forEach(member => {
//       const receiverSocketId = getReceiverSocketId(member);
//       if (receiverSocketId) {
//         io.to(receiverSocketId).emit('newGroupMessage', newGroupMessage);
//       }
//     });

//     res.status(201).json(newGroupMessage);
//   } catch (error) {
//     console.log('Error in sendGroupMessage Controller:', error.message);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };



export const sendGroupMessage = async (req, res) => {
  try {
    console.log(req.body);
    const { groupId } = req.params;
    const { message } = req.body;
    const senderId = req.user._id;

    let imageUrl = '';

    // Handle file upload if a file is present
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'groupMessageImage',
        transformation: [{ width: 200, height: 300, crop: 'limit' }],
      });
      imageUrl = result.secure_url;
    }

    // Find the group conversation by ID
    const groupConversation = await GroupConversation.findById(groupId);
    if (!groupConversation) {
      return res.status(404).json({ error: 'Group conversation not found' });
    }

    // Ensure message content is present
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Create a new group message
    const newGroupMessage = new GroupMessage({
      senderId,
      message,
      imageUrl,
    });

    // Add the new message to the group's messages array
    groupConversation.messages.push(newGroupMessage._id);

    // Save the group conversation and the new message
    await Promise.all([groupConversation.save(), newGroupMessage.save()]);

    // Emit the new message to all participants
    groupConversation.participants.forEach(member => {
      const receiverSocketId = getReceiverSocketId(member);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('newGroupMessage', newGroupMessage);
      }
    });
   console.log(newGroupMessage);
    // Respond with the newly created message
    res.status(201).json(newGroupMessage);
  } catch (error) {
    console.log('Error in sendGroupMessage Controller:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};







// Get group messages
export const getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params;

    const groupConversation = await GroupConversation.findById(groupId).populate('messages');
    if (!groupConversation) {
      return res.status(404).json({ error: 'Group conversation not found' });
    }

    const messages = groupConversation.messages;
    res.status(200).json(messages);
  } catch (error) {
    console.log('Error in getGroupMessages Controller:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Fetch group members
export const fetchGroupMembers = async (req, res) => {
  try {
    const { groupId } = req.params;

    const groupConversation = await GroupConversation.findById(groupId).populate('participants', '-password');
    if (!groupConversation) {
      return res.status(404).json({ error: 'Group conversation not found' });
    }

    const members = groupConversation.participants;
    res.status(200).json({ members });
  } catch (error) {
    console.error('Error fetching group members:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get group conversations
export const getGroupConversations = async (req, res) => {
  try {
    const userId = req.user._id;

    const groupConversations = await GroupConversation.find({ participants: userId })
      .populate('participants', '-password')
      .populate('messages');

    const conversations = groupConversations.map(group => ({
      _id: group._id,
      groupName: group.groupName,
      groupImage: group.groupImage, // Include groupImage
      members: group.participants,
      messages: group.messages,
      creatorId: group.creatorId,
    }));

    res.status(200).json({ conversations });
  } catch (error) {
    console.error('Error fetching group conversations:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const addMemberToGroup = async (req, res) => {
  const { groupId } = req.params;
  const { memberId } = req.body;
  const { userId } = req.user; // Assuming you have a middleware to attach user ID to req.user

  try {
    const group = await GroupConversation.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // if (group.creatorId.toString() !== userId) {
    //   return res.status(403).json({ error: 'Only the group creator can add members' });
    // }

    const newMember = await User.findById(memberId);
    if (!newMember) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (group.participants.includes(newMember._id)) {
      return res.status(400).json({ error: 'Member already in the group' });
    }

    group.participants.push(newMember._id);
    await group.save();
    res.json({ newMember });
  } catch (error) {
    console.error('Error adding member:', error.message);
    res.status(500).json({ error: 'Failed to add member' });
  }
};



// export const addMemberToGroup = async (req, res) => {
//   const { groupId } = req.params;
//   const { memberId } = req.body;
//   const { userId } = req.user; // Assuming you have a middleware to attach user ID to req.user

//   try {
//     const group = await GroupConversation.findById(groupId);
//     if (!group) {
//       return res.status(404).json({ error: 'Group not found' });
//     }

//     if (group.creatorId.toString() !== userId) {
//       return res.status(403).json({ error: 'Only the group creator can add members' });
//     }

//     const newMember = await User.findById(memberId);
//     if (!newMember) {
//       return res.status(404).json({ error: 'User not found' });
//     }

//     if (group.participants.includes(newMember._id)) {
//       return res.status(400).json({ error: 'Member already in the group' });
//     }

//     group.participants.push(newMember._id);
//     await group.save();
//     res.json({ newMember });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to add member' });
//   }
// };



// export const removeMemberFromGroup = async (req, res) => {
//   const { groupId } = req.params;
//   const { memberId } = req.body;
//   const { userId } = req.user; // Assuming you have a middleware to attach user ID to req.user

//   try {
//     const group = await GroupConversation.findById(groupId);
//     if (!group) {
//       return res.status(404).json({ error: 'Group not found' });
//     }

//     if (group.creatorId.toString() !== userId) {
//       return res.status(403).json({ error: 'Only the group creator can remove members' });
//     }

//     group.participants = group.participants.filter(member => member.toString() !== memberId);
//     await group.save();
//     res.json({ message: 'Member removed' });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to remove member' });
//   }
// };

export const removeMemberFromGroup = async (req, res) => {
  const { groupId } = req.params;
  const { memberId } = req.body;
  const { userId } = req.user; // Assuming you have a middleware to attach user ID to req.user

  try {
    const group = await GroupConversation.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // if (group.creatorId.toString() !== userId) {
    //   return res.status(403).json({ error: 'Only the group creator can remove members' });
    // }

    group.participants = group.participants.filter(member => member.toString() !== memberId);
    await group.save();
    res.json({ message: 'Member removed' });
  } catch (error) {
    console.error('Error removing member:', error.message);
    res.status(500).json({ error: 'Failed to remove member' });
  }
};



export const deleteGroupConversation = async (req, res) => {
  const { groupId } = req.params;
  // const { userId } = req.user; // Assuming you have a middleware to attach user ID to req.user

  try {
    const group = await GroupConversation.findById(groupId);
    if (!group) {
      return res.status(404).json({ error: 'Group not found' });
    }

    // if (group.creatorId.toString() !== userId) {
    //   return res.status(403).json({ error: 'Only the group creator can delete the group' });
    // }

    await group.remove();
    res.json({ message: 'Group deleted' });
  } catch (error) {
    console.error('Error deleting group:', error.message);
    res.status(500).json({ error: 'Failed to delete group' });
  }
};




