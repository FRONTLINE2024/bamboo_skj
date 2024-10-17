import { NextApiRequest } from 'next';
import { IMessage } from '@/types/chat';
import { NextApiResponseServerIO } from '@/pages/api/socket/io';
import { createConnection } from '@/lib/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

const chatHandler = async (
  req: NextApiRequest,
  res: NextApiResponseServerIO
) => {
  const connection = await createConnection();

  try {
    if (req.method === 'POST') {
      const { chat_content, chat_user_id } = req.body;
      const message = req.body as IMessage;

      // console.log('content: ', chat_content);
      // console.log('message: ', message);

      const [rows, fields] = await connection.execute<RowDataPacket[]>(
        `SELECT * FROM user WHERE user_index = ? `,
        [chat_user_id]
      );

      // console.log('rows: ', rows);

      const chat = await connection.execute<ResultSetHeader>(
        `INSERT INTO chat (chat_user_id, chat_content) VALUES (?, ?)`,
        [chat_user_id, chat_content]
      );

      res.socket.server.io.emit('message', message);

      // console.log('attempt chat: ', chat);

      if (chat[0].affectedRows > 0) {
        const Data = {
          ...rows[0],
          chat_content,
        };
        res.status(201).json(Data);
      } else {
        res.status(404).json({ message: 'Invaild Chat Data!' });
      }
    } else if (req.method === 'GET') {
      const [row, field] =
        await connection.execute<RowDataPacket[]>('SELECT * FROM chat');

      const [userRow, userField] =
        await connection.execute<RowDataPacket[]>('SELECT * FROM user');

      // console.log('userRow:', userRow);
      // console.log('row: ', row);

      const inputUserId = row.map((d) => {
        const addUserId = userRow.filter((u) => {
          if (u.user_index === d.chat_user_id) {
            return u.user_id;
          }
        });
        return { ...d, chat_user_nickname: addUserId[0].user_id };
      });

      if (row.length > 0) {
        res.status(200).json(inputUserId);
      } else {
        res.status(404).json({ message: 'Not Found Chat Data!' });
      }
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error', err });
  } finally {
    connection.end();
  }
};

export default chatHandler;
