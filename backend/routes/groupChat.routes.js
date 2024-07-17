// import express from 'express';
// import {
//   createGroupConversation,
//   sendGroupMessage,
//   getGroupMessages,
//   fetchGroupMembers,
//   getGroupConversations,
//   fetchFriends,
//   addMemberToGroup,
//   removeMemberFromGroup
// } from '../controllers/groupChat.controller.js';
// import protectRoute from '../middleware/protectRoute.js';
// import multerUploads from '../utils/multerUpload.js';

// const router = express.Router();

// router.post('/createGroup', protectRoute, multerUploads.single('groupImage'), createGroupConversation);
// router.post('/sendGroupMessage/:groupId', protectRoute, sendGroupMessage);
// router.get('/getGroupMessages/:groupId', protectRoute, getGroupMessages);
// router.get('/groupMembers/:groupId', protectRoute, fetchGroupMembers);
// router.get('/conversations', protectRoute, getGroupConversations);
// router.get('/friends', protectRoute, fetchFriends);



// router.post('/:groupId/addMember', protectRoute, addMemberToGroup);
// router.post('/:groupId/removeMember', protectRoute, removeMemberFromGroup);

// export default router;


import express from 'express';
import {
  createGroupConversation,
  sendGroupMessage,
  getGroupMessages,
  fetchGroupMembers,
  getGroupConversations,
  fetchFriends,
  addMemberToGroup,
  removeMemberFromGroup,
  deleteGroupConversation
} from '../controllers/groupChat.controller.js';
import protectRoute from '../middleware/protectRoute.js';
import multerUploads from '../utils/multerUpload.js';

const router = express.Router();

router.post('/createGroup', protectRoute, multerUploads.single('groupImage'), createGroupConversation);
router.post('/sendGroupMessage/:groupId', protectRoute, sendGroupMessage);
router.get('/getGroupMessages/:groupId', protectRoute, getGroupMessages);
router.get('/groupMembers/:groupId', protectRoute, fetchGroupMembers);
router.get('/conversations', protectRoute, getGroupConversations);
router.get('/friends', protectRoute, fetchFriends);

router.post('/:groupId/addMember', protectRoute, addMemberToGroup);
router.post('/:groupId/removeMember', protectRoute, removeMemberFromGroup);
router.delete('/:groupId', protectRoute, deleteGroupConversation);

export default router;
