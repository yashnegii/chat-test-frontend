import { io } from 'socket.io-client';

let socket = null;

export const connectSocket = (token) => {
  if (!socket) {
   
    socket = io('http://localhost:3000', {
      withCredentials: true,
      transports: ['websocket'],
      auth: {
        token, // Pass the token for authentication
      },
    });

    socket.on('connect', () => {
      console.log('🔗 Socket connected:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('❌ Socket disconnected');
    });
  }
};

export const getSocket = () => socket;
export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};