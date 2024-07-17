import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  groupName: String,
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'GroupMessage' }],
  groupImage: { type: String,},
}, { timestamps: true }
);

const Group = mongoose.models.Group || mongoose.model('Group', groupSchema);

export default Group;
