import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female']
  },
  image: {
    type: String,
    // Optional: Add more fields as needed
  },
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] // Reference to other User documents
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;


// import mongoose from 'mongoose';


// const userSchema = new mongoose.Schema({
//   fullName: {
//     type: String,
//     required: true
//   },
//   username: {
//     type: String,
//     required: true,
//     unique: true
//   }, 
//   password: {
//     type: String,
//     required: true,
//     minlength: 6
//   }, 
//   gender:{
//     type: String,
//     required: true,
//     enum: ['male', 'female']
//   },
//   image:{
//     type: String,
//     // required: true,
//   }
 
// }, { timestamps: true})


// const User = mongoose.model('User', userSchema);


// export default User;