import { NextApiRequest } from 'next';
import { ChatDataType } from '@/types/chat';
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
      const { chat_content, chat_user_id, receiverID } = req.body;
      const message = {
        currentMessage: chat_content,
        receiverID: receiverID,
      };
      const senderID = chat_user_id;

      await connection.execute<RowDataPacket[]>(
        `SELECT * FROM user WHERE user_index = ? `,
        [chat_user_id]
      );

      const [areWeFriends] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM friend WHERE (userID = ? AND friendUserID = ? AND status = 1) OR (userID = ? AND friendUserID = ? AND status = 1)',
        [chat_user_id, receiverID, receiverID, chat_user_id]
      );

      if (areWeFriends.length > 0) {
        const [createChat] = await connection.execute<ResultSetHeader>(
          `INSERT INTO chat (chat_user_id, chat_content, senderID, receiverID, createAt) VALUES (?, ?, ?, ?, NOW() + INTERVAL 9 HOUR)`,
          [chat_user_id, chat_content, senderID, receiverID]
        );

        const [getChat] = await connection.execute(
          'SELECT * FROM chat WHERE chat_id = ?',
          [createChat.insertId]
        );

        const changeType = getChat as ChatDataType[];

        if (createChat.affectedRows > 0) {
          res.socket.server.io.emit('message', changeType);

          res.status(201).json(getChat);
        } else {
          res.status(404).json({ message: 'Invalid Chat Data!' });
        }
      } else {
        res.status(404).json({ message: 'Not Found Friend Info!' });
      }
    } else if (req.method === 'GET') {
      const [row] =
        await connection.execute<RowDataPacket[]>('SELECT * FROM chat');

      const [userRow] =
        await connection.execute<RowDataPacket[]>('SELECT * FROM user');

      const inputUserId = row.map((d) => {
        const addUserId = userRow.filter((u) => {
          if (u.user_index === d.chat_user_id) {
            return u.user_id;
          }
        });

        return {
          ...d,
          chat_user_nickname: addUserId[0].user_nickname,
        };
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
