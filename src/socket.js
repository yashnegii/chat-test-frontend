import { io } from 'socket.io-client';

// ✅ Set this to your backend server
const URL = 'http://localhost:3000';

export const socket = io(URL, {
  withCredentials: true,
  transports: ['websocket'], // optional: avoid polling
});
