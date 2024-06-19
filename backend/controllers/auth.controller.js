import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import generateTokenAndSetCookie from '../utils/generatetoken.js';
import cloudinary from '../utils/cloudinarys.js';


export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmedPassword, gender } = req.body;
    console.log(req.body);
    
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "SQIImage",
    });
 console.log(result);
    // if (result) {
    //    console.log(result);;
    // }else{
    //       console.log('result not found');
    // }
   
    if(password !== confirmedPassword) {
      return res.status(400).json({error: "Password don't match"})
    }
      const user = await User.findOne({username});

      if(user) {
        return res.status(400).json({error: "User already exists"})
      }
  // console.log(result);

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new User ({
       fullName,
       username,
       password: hashedPassword,
       gender,
       image: result.secure_url,
       
      })
      
     
      
  if(newUser) {
    generateTokenAndSetCookie(newUser._id, res);
    await newUser.save();

    res.status(201).json({
     _id: newUser._id,
     fullName: newUser.fullName,
     username: newUser.username,
     profilePic: newUser.image,
   
    });
  }else {
    res.status(400).json({error: "Invalid user data"});
  }



  } catch (error) {
    console.log("Error in SignUp controller", error.message);
    res.status(500).json({error: "Internal Server Error"})
  }
 
};


export const login = async (req, res) => {
  try {
    const {username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
   
    if(!user || !isPasswordCorrect){
      return res.status(400).json({error: "Invalid username or password."});
    }


    generateTokenAndSetCookie(user._id, res)

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      image: user.image,
    
     })




  } catch (error) {
    console.log("Error in Login controller", error.message);
    res.status(500).json({error: "Internal Server Error"})
  }
}
export const logout = (req, res) => {
  try {
    res.cookie("jwt","", {maxAge: 0});
    res.status(200).json({message: "Logged out successfully."});
    
  } catch (error) {
    console.log("Error in Logout controller", error.message);
    res.status(500).json({error: "Internal Server Error"})
  }
}