import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../hooks/useSignup";

const SignUp = () => {
  const [inputs, setInputs] = useState({
    fullName: '',
    username: '',
    password: '',
    confirmedPassword: '',
    gender: '',
    image: null,
  });

  const { loading, signup } = useSignup();

  const handleCheckboxChange = (gender) => {
    setInputs({ ...inputs, gender });
  }

  const handleFileChange = (e) => {
    setInputs({ ...inputs, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
    // console.log(inputs, 'image');
  };

  return (
    <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up <span className='text-gray-600'>OWNChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input
              className='w-full input input-bordered h-10'
              type='text'
              placeholder='Enter your full name'
              value={inputs.fullName}
              onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
            />
          </div>

          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              className='w-full input input-bordered h-10'
              type='text'
              placeholder='Enter your username'
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              className="w-full input input-bordered h-10"
              type='password'
              placeholder='Enter Password'
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              type='password'
              placeholder='Confirm Password'
              className='w-full input input-bordered h-10'
              value={inputs.confirmedPassword}
              onChange={(e) => setInputs({ ...inputs, confirmedPassword: e.target.value })}
            />
          </div>

          <div>
            <label className='label'>
              <span className='text-base label-text'></span>
            </label>
            <input 
              type="file" 
              placeholder='image' 
              className='file-input file-input-bordered w-full max-full'
              onChange={handleFileChange}
            />
          </div>

          <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

          <Link to={'/login'} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
            Already have an account?
          </Link>

          <div>
            <button className='btn btn-block btn-sm mt-2 border border-slate-700' 
              disabled={loading}
            >
              {loading ? <span className='loading loading-spinner'></span> : 'Sign Up'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;



// import { Link } from "react-router-dom";
// import GenderCheckbox from "./GenderCheckbox";
// import { useState } from "react";
// import useSignup from "../../hooks/useSignup";


// const SignUp = () => {
//   const [inputs, setInputs] = useState({
//     fullName: '',
//     username: '',
//     password: '',
//     confirmedPassword: '',
//     gender: '',
//     image: '',
//   });

//   const { loading, signup } = useSignup();

//   const handleCheckboxChange = (gender) => {
//     setInputs({ ...inputs, gender });
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     await signup(inputs);
//     // console.log(inputs, 'image');
//   };

//   return (
//     <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
//       <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
//         <h1 className='text-3xl font-semibold text-center text-gray-300'>
//           Sign Up <span className='text-gray-600'>SQIChatApp</span>
//         </h1>

//         <form onSubmit={handleSubmit}>
//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text'>Full Name</span>
//             </label>
//             <input
//               className='w-full input input-bordered h-10'
//               type='text'
//               placeholder='Enter your full name'
//               value={inputs.fullName}
//               onChange={(e) => setInputs({...inputs, fullName: e.target.value })}
            
//             />
//           </div>

//           <div>
//             <label className='label p-2'>
//               <span className='text-base label-text'>Username</span>
//             </label>
//             <input
//               className='w-full input input-bordered h-10'
//               type='text'
//               placeholder='Enter your username'
//               value={inputs.username}
//               onChange={(e) => setInputs({...inputs, username: e.target.value })}
          
//             />
//           </div>

//           <div>
//             <label className='label'>
//               <span className='text-base label-text'>Password</span>
//             </label>
//             <input
//               className="w-full input input-bordered h-10"
//               type='password'
//               placeholder='Enter Password'
//               value={inputs.password}
//               onChange={(e) => setInputs({...inputs, password: e.target.value })}
//             />
//           </div>

//           <div>
//             <label className='label'>
//               <span className='text-base label-text'>Confirm Password</span>
//             </label>
//             <input
//               type='password'
//               placeholder='Confirm Password'
//               className='w-full input input-bordered h-10'
//               value={inputs.confirmedPassword}
//               onChange={(e) => setInputs({...inputs, confirmedPassword: e.target.value })}
              
//             />
//           </div>
//           <div>
            
//               <label className='label'>
//                     <span className='text-base label-text'></span>
//               </label>
//               <input type="file" 
//               placeholder='image' 
//               className='file-input file-input-bordered w-full max-full'
//               value={inputs.image}
//               onChange={(e) => setInputs({...inputs, image: e.target.files[0]})}
//               />
//           </div>
          

//           <GenderCheckbox onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender} />

//           <Link to={'/login'} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
//             Already have an account?
//           </Link>

//           <div>
            
//             <button className='btn btn-block btn-sm mt-2 border border-slate-700' 
//             disabled={loading}
//             >
//               {loading ? <span className='loading loading-spinner'></span> : 'Sign Up'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default SignUp;


