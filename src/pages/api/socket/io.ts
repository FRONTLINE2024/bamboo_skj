import { NextApiRequest, NextApiResponse } from 'next';
import { Server as NetServer } from 'http';
import { Socket } from 'net';
import { Server as ServerIO } from 'socket.io';
import { ServerToClientEvents } from '@/types/socket';

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: ServerIO<ServerToClientEvents>;
    };
  };
};

const ioHandler = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const httpServer = res.socket.server as NetServer;
    const io = new ServerIO(httpServer, {
      path: '/api/socket/io',
      addTrailingSlash: false,
    });

    io.on('connection', (socket) => {
      console.log('New socket connected:', socket.id);

      // 클라이언트에서 메시지를 보낼 때
      socket.on('sendMessage', (message) => {
        // 모든 클라이언트에 메시지 브로드캐스트
        socket.broadcast.emit('message', message);
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected:', socket.id);
      });
    });

    res.socket.server.io = io;
  }

  res.end();
};

export default ioHandler;
