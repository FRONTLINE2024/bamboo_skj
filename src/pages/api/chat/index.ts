import { NextApiRequest } from 'next';
import { IMessage } from '@/types/chat';
import { NextApiResponseServerIO } from '@/pages/api/socket/io';
import { createConnection } from '@/lib/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

function checkKorean(str: string) {
  const regex = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  return regex.test(str);
}

interface IUser {
  user_index: number;
  user_id: string;
  user_nickname: string;
  profile_image: string | null;
  accessToken: string | null;
  chat_content: string;
  user_password?: string;
  senderID: number;
  receiverID: number;
  createAt: string;
}

const chatHandler = async (
  req: NextApiRequest,
  res: NextApiResponseServerIO
) => {
  const connection = await createConnection();

  try {
    if (req.method === 'POST') {
      const { chat_content, chat_user_id, receiverID } = req.body;
      const message = req.body as IMessage;
      const senderID = chat_user_id;
      // const receiverID = 38;

      console.log('message: ', message);

      const [rows] = await connection.execute<RowDataPacket[]>(
        `SELECT * FROM user WHERE user_index = ? `,
        [chat_user_id]
      );

      // 친구인지 판별하는 쿼리
      const [areWeFriends] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM friend WHERE (userID = ? AND friendUserID = ?) OR (userID = ? AND friendUserID = ?)',
        [chat_user_id, receiverID, receiverID, chat_user_id]
      );

      console.log('친구 판별', areWeFriends);

      if (areWeFriends.length > 0) {
        const [createChat] = await connection.execute<ResultSetHeader>(
          `INSERT INTO chat (chat_user_id, chat_content, senderID, receiverID, createAt) VALUES (?, ?, ?, ?, NOW() + INTERVAL 9 HOUR)`,
          [chat_user_id, chat_content, senderID, receiverID]
        );

        // let isKoreanEmitted = false;
        // if (checkKorean(chat_content) === true && !isKoreanEmitted) {
        //   res.socket.server.emit('message', message);
        //   isKoreanEmitted = true;
        // }

        console.log('채팅 생성 성공!', createChat);

        const { user_password, ...data } = rows[0] as IUser;
        // console.log('user: ', user_password);
        if (createChat.affectedRows > 0) {
          const Data = {
            ...data,
            chat_content,
          };
          res.status(201).json(Data);
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
        return { ...d, chat_user_nickname: addUserId[0].user_nickname };
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
