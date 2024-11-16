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
      console.log(chat_user_id);

      if (!chat_user_id) {
        return res
          .status(400)
          .json({ success: false, message: 'Missing chat_user_id' });
      }

      const chatUserId = parseInt(chat_user_id as string, 10);

      const [myChat] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM chat WHERE chat_user_id = ?',
        [chatUserId]
      );
      console.log(myChat[0]);

      res.status(200).json(myChat);
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
