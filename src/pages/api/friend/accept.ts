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

      // const [userExist] = await connection.execute<RowDataPacket[]>(
      //   'SELECT * FROM user WHERE user_index = ?',
      //   [friendUserID]
      // );

      // if (userExist.length === 0) {
      //   return res
      //     .status(404)
      //     .json({ success: false, message: 'Friend user does not exist' });
      // }

      const [existRequest] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM friend WHERE userID = ? AND friendUserID = ?',
        [userID, friendUserID]
      );

      if (existRequest.length > 0) {
        const requestFriend = await connection.execute(
          'UPDATE friend SET status = ? WHERE userID = ? AND friendUserID = ?',
          [status, userID, friendUserID]
        );

        if (requestFriend.length > 0) {
          res.status(200).json({ success: true, message: 'Accept successful' });
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
