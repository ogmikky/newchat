import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const socketInstance = io("http://localhost:5000", {
        query: {
          userId: authUser._id,
        },
        withCredentials: true,
        transports: ['websocket', 'polling'],
      });

      setSocket(socketInstance);

      socketInstance.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      socketInstance.on("receiveMessage", (message) => {
        // Handle receiving normal conversation messages
        // Add the message to the appropriate conversation state
      });

      socketInstance.on("receiveGroupMessage", (message) => {
        // Handle receiving group conversation messages
        // Add the message to the appropriate group conversation state
      });

      return () => socketInstance.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

// import { createContext, useContext, useEffect, useState } from "react";
// import { useAuthContext } from "./AuthContext";
// import io from "socket.io-client";

// const SocketContext = createContext();

// export const useSocketContext = () => {
//   return useContext(SocketContext);
// };

// export const SocketContextProvider = ({ children }) => {

//   const [socket, setSocket ] = useState(null);
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const {authUser} = useAuthContext();


//   useEffect(() => {
//     if(authUser) {
//       const socket = io("http://localhost:5000", {
//         query: {
//           userId: authUser._id,
//         },
//       });

//       setSocket(socket);

//       socket.on("getOnlineUsers", (users) =>{
//         setOnlineUsers(users);
//       });

//       return () => socket.close();
//     }else {
//       if (socket) {
//         socket.close();
//         setSocket(null);
//       }
//     }
//   }, [authUser]);
//   return <SocketContext.Provider value={{socket,onlineUsers}}>{children}</SocketContext.Provider>
// }