import { useEffect, useState } from 'react';

const useGetFriends = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await fetch('/api/groupChat/friends');
        const data = await response.json();
        // Check if the response has a friends property
        if (data && Array.isArray(data.friends)) {
          setFriends(data.friends);
        } else {
          setFriends([]);
          console.error('Unexpected response format:', data);
        }
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };

    fetchFriends();
  }, []);

  return { friends };
};

export default useGetFriends;



// import { useEffect, useState } from 'react';

// const useGetFriends = () => {
//   const [friends, setFriends] = useState([]);

//   useEffect(() => {
//     const fetchFriends = async () => {
//       try {
//         const response = await fetch('/api/groupChat/friends');
//         const data = await response.json();
//         // Ensure the response is an array
//         if (Array.isArray(data)) {
//           setFriends(data);
//         } else {
//           setFriends([]);
//           console.error('Unexpected response format:', data);
//         }
//       } catch (error) {
//         console.error('Error fetching friends:', error);
//       }
//     };

//     fetchFriends();
//   }, []);

//   return { friends };
// };

// export default useGetFriends;
