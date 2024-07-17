import mongoose from 'mongoose';

const groupMessageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  message: String,
  imageUrl: String,
  
}, { timestamps: true }
);

const GroupMessage = mongoose.models.GroupMessage || mongoose.model('GroupMessage', groupMessageSchema);

export default GroupMessage;
