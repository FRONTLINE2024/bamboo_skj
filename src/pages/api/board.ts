import { createConnection } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

type NextApiRequestWithFile = NextApiRequest & {
  file?: Express.Multer.File;
};

export default async function handler(
  req: NextApiRequestWithFile,
  res: NextApiResponse
) {
  const connection = await createConnection();

  try {
    if (req.method === 'GET') {
      const [board] = await connection.execute('SELECT * FROM board');
      res.status(200).json(board); // 200: OK
    } else if (req.method === 'DELETE') {
      const { id, board_user_id } = req.body;

      const [rows] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM board WHERE id = ?',
        [id]
      );

      if (rows.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: 'Item not found' });
      }

      const [result] = await connection.execute<ResultSetHeader>(
        'DELETE FROM board WHERE id = ? AND board_user_id = ?',
        [id, board_user_id]
      );

      if (result.affectedRows > 0) {
        res.status(200).json({ success: true, message: 'Delete successful' });
      } else {
        res.status(401).json({ success: false, message: 'User ID mismatch ' });
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
