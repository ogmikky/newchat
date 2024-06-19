import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
   
  const [loading,setLoading] = useState(false);
  const { setAuthUser} = useAuthContext()


  const signup = async ({fullName, username, password, confirmedPassword, gender, image}) => {
    console.log( fullName, username, password, confirmedPassword, gender, 'image');
   const success = handleInputErrors({fullName, username, password, confirmedPassword, gender})
   if(!success) return;


  
    try {
      setLoading(true);
      const formData = new FormData()
      formData.append('fullName', fullName)
      formData.append('username', username)
      formData.append('password',  password)
      formData.append('confirmedPassword',  confirmedPassword)
      formData.append('gender', gender)
      formData.append('image', image)
      
      const res = await fetch('/api/auth/signup', {
        // headers: { "Content-Type": "application/json" },
          method: 'POST',
          body: formData
      });
      

      const data = await res.json();
    if(data.error){
      throw new Error(data.error)
    }
   localStorage.setItem("chat-user",JSON.stringify(data))

   setAuthUser(data)
    
   } catch (error) {
    toast.error(error.message)
   }finally {
    setLoading(false);
   }

  }

  return {loading, signup}
}

export default useSignup


function handleInputErrors({fullName,username,password,confirmedPassword,gender}) {
  if(!fullName || !username || !password || !confirmedPassword || !gender){
    toast.error('Please fill all the fields')
    return false;
  }

  if (password !== confirmedPassword) {
    toast.error('passwords do not match')
    return false;
  }
  if(password.length < 6){
    toast.error('password must be at least 6 characters')
    return false;
  }
  return true;
}