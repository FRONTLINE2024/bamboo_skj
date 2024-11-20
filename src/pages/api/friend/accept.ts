import { createConnection } from '../../../lib/db';
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

      console.log('existRequest: ', existRequest);

      if (existRequest.length > 0) {
        if (status === false) {
          const requestFriend = await connection.execute(
            'UPDATE friend SET status = ? WHERE userID = ? AND friendUserID = ?',
            [status, userID, friendUserID]
          );

          console.log('requestFriend: ', requestFriend);

          const deleteFriend = await connection.execute(
            'DELETE FROM friend WHERE userID = ? AND friendUserID = ?',
            [userID, friendUserID]
          );

          console.log('deleteFriend: ', deleteFriend);

          if (requestFriend.length > 0) {
            res
              .status(200)
              .json({ success: true, message: 'Delete successful' });
          } else {
            res
              .status(500)
              .json({ success: false, message: 'Failed to create request' });
          }
        } else if (status === true) {
          const requestFriend = await connection.execute(
            'UPDATE friend SET status = ? WHERE userID = ? AND friendUserID = ?',
            [status, userID, friendUserID]
          );

          console.log('requestFriend: ', requestFriend);

          if (requestFriend.length > 0) {
            res
              .status(200)
              .json({ success: true, message: 'Accept successful' });
          } else {
            res
              .status(500)
              .json({ success: false, message: 'Failed to create request' });
          }
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
