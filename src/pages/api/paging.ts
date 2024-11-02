import { createConnection } from '@/lib/db';
import { RowDataPacket } from 'mysql2/promise';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const connection = await createConnection();

  try {
    if (req.method === 'GET') {
      const { offset, limit } = req.query; // 기본값 설정s

      const [rows] = await connection.execute<RowDataPacket[]>(
        'SELECT * FROM board LIMIT ? OFFSET ?',
        [limit, offset]
      );
      console.log(rows);

      res.status(200).json(rows); // 200: OK
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
