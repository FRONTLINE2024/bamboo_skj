import { NextApiRequest } from 'next';
import { IMessage } from '@/types/chat';
import { NextApiResponseServerIO } from '@/pages/api/socket/io';

const chatHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === 'POST') {
    const { content } = req.body;
    console.log('content: ', content);
    const message = req.body as IMessage;

    res.socket.server.io.emit('message', message);

    res.status(201).json(message);
  }
};

export default chatHandler;
