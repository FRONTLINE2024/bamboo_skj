import { createConnection } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = await createConnection();

  try {
    if (req.method === 'POST') {
      const { userID, friendUserID, status } = req.body;

      // friendUserID가 실제 사용자 테이블에 존재하는지 확인
      const [userExist] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM user WHERE user_index = ?',
        [friendUserID]
      );

      if (userExist.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: 'Friend user does not exist' });
      }

      const [existRequest] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM friend WHERE userID = ? AND friendUserID = ?',
        [userID, friendUserID]
      );

      if (existRequest.length === 0) {
        const requestFriend = await connection.execute(
          'INSERT INTO friend (userID, friendUserID, status, createAt) VALUES (? ,? ,?, NOW() + INTERVAL 9 HOUR)',
          [userID, friendUserID, status]
        );

        if (requestFriend.length > 0) {
          res
            .status(200)
            .json({ success: true, message: 'Request successful' });
        } else {
          res
            .status(500)
            .json({ success: false, message: 'Failed to create request' });
        }
      } else {
        res
          .status(409)
          .json({ success: false, message: 'Request already exists' });
      }
    } else if (req.method === 'GET') {
      const { userID } = req.query;

      const [myRequest] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM friend WHERE friendUserID = ?',
        [userID]
      );

      const [userList] =
        await connection.execute<RowDataPacket[]>('SELECT * FROM user');

      const newData = myRequest.map((request) => {
        const user = userList.find(
          (user) => user.user_index === request.userID
        );
        return { ...request, userEmail: user ? user.user_nickname : null };
      });

      if (myRequest.length > 0) {
        res.status(200).json(newData);
      } else {
        res.status(404).json({ message: 'Not Exist Request' });
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
