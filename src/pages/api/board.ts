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

      const [rows] = await connection.execute(
        'SELECT * FROM board ORDER BY createAt'
      );

      // console.log(rows);
    } else if (req.method === 'PATCH') {
      const { id, board_content, board_user_id, board_img } = req.body;

      const [rows] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM board WHERE id = ?',
        [id]
      );

      if (rows.length > 0) {
        const [result] = await connection.execute<ResultSetHeader>(
          'UPDATE board SET board_content = ?, board_user_id = ?, board_img = ? WHERE id = ?',
          [board_content, board_user_id, board_img, id]
        );

        if (result.affectedRows > 0) {
          res.status(200).json({ success: true, message: 'Update successful' });
        } else {
          res.status(500).json({ success: false, message: 'Server error' });
        }
      } else {
        res.status(404).json({ success: false, message: 'Board not found' });
      }
    } else if (req.method === 'DELETE') {
      const { id } = req.body;

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
        'DELETE FROM board WHERE id = ?',
        [id]
      );

      if (result.affectedRows > 0) {
        res.status(200).json({ success: true, message: 'Delete successful' });
      } else {
        res.status(500).json({ success: false, message: 'Server error' });
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
