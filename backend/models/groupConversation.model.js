import mongoose from 'mongoose';

const groupConversationSchema = new mongoose.Schema({
  groupName: { type: String, required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GroupMessage' }],
  groupImage: { type: String },
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const GroupConversation = mongoose.models.GroupConversation || mongoose.model('GroupConversation', groupConversationSchema);

export default GroupConversation;



