import { NextApiRequest, NextApiResponse } from 'next';
import { createConnection } from '../../lib/db';
import { userType } from '@/types/login';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = await createConnection();

  try {
    if (req.method === 'GET') {
      const [users] =
        await connection.execute<RowDataPacket[]>('SELECT * FROM user');

      if (users.length > 0) {
        res.status(200).json(users);
      }
    } else if (req.method === 'POST') {
      const { user_id, user_password, user_nickname, university }: userType =
        req.body;

      const [rows] = await connection.execute<RowDataPacket[]>(
        `SELECT * FROM user WHERE user_id = ?`,
        [user_id]
      );

      if (rows.length === 0) {
        await connection.execute<ResultSetHeader>(
          'INSERT INTO user (user_id, user_password, user_nickname, university) VALUES (?, ?, ?, ?)',
          [user_id, user_password, user_nickname, university]
        );
        res.status(201).json({ success: true, data: user_id }); // 201: Created
      } else {
        res
          .status(409)
          .json({ success: false, message: 'User already exists' }); // 409: Conflict
      }
    } else if (req.method === 'PATCH') {
      const { user_id, user_password } = req.body;
      const [rows] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM user WHERE user_id = ?',
        [user_id]
      );

      if (rows.length > 0) {
        const { user_index } = rows[0];

        const [result] = await connection.execute<ResultSetHeader>(
          'UPDATE user SET user_id = ?, user_password = ? WHERE user_index = ?',
          [user_id, user_password, user_index]
        );

        if (result.affectedRows > 0) {
          res.status(200).json({ success: true, message: 'Update successful' });
        } else {
          res.status(204).end(); // 변경된 내용이 없을 때
        }
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    } else if (req.method === 'DELETE') {
      const { user_id } = req.body;

      const [rows] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM user WHERE user_id = ?',
        [user_id]
      );

      if (rows.length > 0) {
        const [result] = await connection.execute<ResultSetHeader>(
          'DELETE FROM user WHERE user_id = ?',
          [user_id]
        );

        if (result.affectedRows > 0) {
          res.status(200).json({ success: true, message: 'User deleted' });
        } else {
          res.status(204).end();
        }
      } else {
        res.status(404).json({ success: false, message: 'User not found' });
      }
    } else {
      res.status(405).json({
        success: false,
        message: 'Method not allowed',
      });
    }
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ success: false, message: 'Database error' });
  } finally {
    connection.end();
  }
}
