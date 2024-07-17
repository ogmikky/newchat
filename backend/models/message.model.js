import mongoose from "mongoose";

const { Schema } = mongoose;

const messageSchema = new Schema({
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  message: {
    type: String,
   //  required: true
  },
  imageUrl: {
    type: String  // Store the URL of the uploaded image
  }
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema);

export default Message;


// import mongoose from "mongoose";


// const messageSchema = new mongoose.Schema({
//    senderId:{
//     type: mongoose.Schema.Types.ObjectId,
//     ref:"User",
//     required: true
//    },
//    receiverId:{
//     type: mongoose.Schema.Types.ObjectId,
//     ref:"User",
//     required: true
//    },
//    message:{
//     type: String,
//     required: true
//    }
// }, {timestamps: true});


// const Message = mongoose.model("Message", messageSchema);


// export default Message;