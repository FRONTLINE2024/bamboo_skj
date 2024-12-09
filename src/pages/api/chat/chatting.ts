import { createConnection } from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = await createConnection();
  try {
    if (req.method === 'GET') {
      const { chat_user_id } = req.query;

      const userID = chat_user_id;
      const chatUserId = parseInt(chat_user_id as string, 10);

      if (!chat_user_id) {
        return res
          .status(400)
          .json({ success: false, message: 'Missing chat_user_id' });
      }

      const [myChat] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM chat WHERE senderID = ? OR receiverID = ? ',
        [userID, userID]
      );

      const [userRow] =
        await connection.execute<RowDataPacket[]>('SELECT * FROM user');

      const inputUserId = myChat.map((d) => {
        const compare = [d.senderID, d.receiverID];

        // 상대방 ID 찾기
        const friendUserId = compare.find((v) => chatUserId !== v);

        const userId = compare.find((v) => chatUserId === v);

        // 상대방 ID와 매칭되는 사용자 찾기
        const matchingUser = userRow.find((u) => u.user_index === friendUserId);

        // 내 아이디 찾기
        const matchMyId = userRow.find((u) => u.user_index === userId);

        return {
          ...d,
          user_id: matchMyId?.user_id,
          chat_user_nickname: matchingUser ? matchingUser.user_nickname : null,
          university: matchingUser?.university,
        };
      });

      if (myChat.length > 0) {
        res.status(200).json(inputUserId);
      } else {
        res.status(404).json({ success: false, message: 'Chat not found' });
      }
    } else {
      res.status(405).json({ success: false, message: 'Method not allowed' });
    }
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ success: false, message: 'Database error' });
  } finally {
    connection.end();
  }
}
