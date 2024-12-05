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
      // const receiverID = 38;

      // console.log('message: ', message);

      await connection.execute<RowDataPacket[]>(
        `SELECT * FROM user WHERE user_index = ? `,
        [chat_user_id]
      );

      // 친구인지 판별하는 쿼리
      const [areWeFriends] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM friend WHERE (userID = ? AND friendUserID = ? AND status = 1) OR (userID = ? AND friendUserID = ? AND status = 1)',
        [chat_user_id, receiverID, receiverID, chat_user_id]
      );

      // console.log('친구 판별', areWeFriends);

      if (areWeFriends.length > 0) {
        const [createChat] = await connection.execute<ResultSetHeader>(
          `INSERT INTO chat (chat_user_id, chat_content, senderID, receiverID, createAt) VALUES (?, ?, ?, ?, NOW() + INTERVAL 9 HOUR)`,
          [chat_user_id, chat_content, senderID, receiverID]
        );

        // console.log('채팅 생성 성공', createChat);

        const [getChat] = await connection.execute(
          'SELECT * FROM chat WHERE chat_id = ?',
          [createChat.insertId]
        );

        // console.log('채팅 생성 후 데이터 가져오기: ', getChat);

        const changeType = getChat as ChatDataType[];

        // const { user_password, ...data } = rows[0] as IUser;
        // console.log('user: ', user_password);
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

      // console.log('userRow:', userRow);
      // console.log('row: ', row);

      const inputUserId = row.map((d) => {
        const addUserId = userRow.filter((u) => {
          if (u.user_index === d.chat_user_id) {
            return u.user_id;
          }
        });

        return {
          ...d,
          chat_user_nickname: addUserId[0].user_nickname,
          // university: addUserId[0].university,
        };
      });

      // console.log('inputUserId:', inputUserId);

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
