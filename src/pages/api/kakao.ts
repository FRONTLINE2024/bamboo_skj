import { createConnection } from '@/lib/db';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = await createConnection();
  try {
    if (req.method === 'POST') {
      const { user_id, user_nickname, profile_image, accessToken } = req.body;

      const [rows] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM user WHERE user_id = ?',
        [user_id]
      );

      console.log('kakao login?: ', rows);

      if (rows.length === 0) {
        const [row] = await connection.execute<ResultSetHeader>(
          'INSERT INTO user (user_id, user_nickname, profile_image, accessToken) VALUES (?, ?, ?, ?)',
          [user_id, user_nickname, profile_image, accessToken]
        );

        const data = {
          user_index: row.insertId,
          user_nickname,
          profile_image,
          accessToken,
        };

        res.status(201).json(data);
      } else {
        const existingUser = rows[0];
        const data = {
          user_index: existingUser.user_index,
          user_nickname: existingUser.user_nickname,
          profile_image: existingUser.profile_image,
          accessToken: existingUser.accessToken,
        };
        res.status(200).json(data);
      }
    }
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: 'Database error', error: e });
  } finally {
    connection.end();
  }
}
