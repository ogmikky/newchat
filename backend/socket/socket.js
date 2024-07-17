import { Server } from "socket.io";
import http from "http";
import express from 'express';
import cors from 'cors';

const app = express();

// Configure CORS
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"], // Add all the frontend URLs you need
  methods: ["GET", "POST"],
  credentials: true,
}));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"], // Add all the frontend URLs you need
    methods: ["GET", "POST"],
    credentials: true,
  },
  transports: ['websocket', 'polling'],
});

const userSocketMap = {};

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on('connection', (socket) => {
  console.log("user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId !== "undefined") userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });

  socket.on('sendMessage', (message) => {
    const receiverSocketId = getReceiverSocketId(message.receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receiveMessage', message);
    }
  });

  socket.on('sendGroupMessage', (message) => {
    io.emit('receiveGroupMessage', message);
  });
});

export { app, io, server };



// import { Server } from "socket.io";
// import http from "http";
// import express from 'express';


// const app = express();


// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST"],
//   },
// });

// export const getReceiverSocketId = (receiverId) => {
//   return userSocketMap[receiverId];
// }

// const userSocketMap = {}

// io.on('connection', (socket) => {
//   console.log("user connected", socket.id);


//   const userId = socket.handshake.query.userId;
//   if(userId != "undefined") userSocketMap[userId] = socket.id;


//   //io.emit() is used to send events to all the connected clients 
//   io.emit("getOnlineUsers", Object.keys(userSocketMap));


//    // socket.on is used to listen to the events. can be used both on client and server side 
//   socket.on("disconnect", ()=> {
//     console.log("user disconnected", socket.id);
//     delete userSocketMap[userId];
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// });

// export {app,io,server};