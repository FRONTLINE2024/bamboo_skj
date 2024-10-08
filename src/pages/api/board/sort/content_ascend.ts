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
      const [rows] = await connection.execute(
        'SELECT * FROM board ORDER BY board_content'
      );

      res.status(200).json({ status: 'content_ascend', data: rows });
    }
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ success: false, message: 'Database error' }); // 500: Internal Server Error
  } finally {
    connection.end();
  }
}
