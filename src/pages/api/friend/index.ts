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

      const [existRequest] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM friend WHERE userID = ? AND friendUserID = ?',
        [userID, friendUserID]
      );

      if (existRequest.length === 0) {
        const requestFriend = await connection.execute(
          'INSERT INTO friend (userID, friendUserID, status, createAt) VALUES (? ,? ,?, NOW())',
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
