import { createConnection } from '@/lib/db';
import { RowDataPacket } from 'mysql2';
import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = await createConnection();
  try {
    if (req.method === 'POST') {
      const { user_id, user_password } = req.body;

      const [userIdRows] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM user WHERE user_id = ?',
        [user_id]
      );

      if (userIdRows.length === 0) {
        return res
          .status(404)
          .json({ message: '유저 아이디가 존재하지 않습니다!' });
      }

      const [passwordRows] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM user WHERE user_id = ? AND user_password = ?',
        [user_id, user_password]
      );

      if (passwordRows.length === 0) {
        return res.status(401).json({ message: '비밀번호가 틀립니다!' });
      }

      const user = passwordRows[0];

      if (!process.env.NEXT_PUBLIC_JWT_SECRET_KEY) {
        throw new Error(
          'JWT_SECRET_KEY is not defined in environment variables'
        );
      }

      const token = jwt.sign(
        { id: user.id, user_id: user.user_id },
        process.env.NEXT_PUBLIC_JWT_SECRET_KEY,
        { expiresIn: '1h' }
      );

      await connection.execute(
        'UPDATE user SET accessToken = ? WHERE user_id = ?',
        [token, user.user_id]
      );

      return res.status(200).json({
        message: 'Login successful!',
        token,
        data: { user_index: user.user_index },
      });
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (err) {
    console.error('Database error:', err);
    return res.status(500).json({ success: false, message: 'Database error' });
  } finally {
    connection.end();
  }
}
