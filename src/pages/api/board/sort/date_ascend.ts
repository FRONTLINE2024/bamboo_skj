import { createConnection } from '@/lib/db';
import type { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';

type NextApiRequestWithFile = NextApiRequest & {
  file?: Express.Multer.File;
};

const upload = multer({
  dest: './public/uploads',
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB로 파일 사이즈 제한
});

const runMiddleware = (
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) =>
  new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });

export default async function handler(
  req: NextApiRequestWithFile,
  res: NextApiResponse
) {
  const connection = await createConnection();

  try {
    if (req.method === 'GET') {
      const [rows] = await connection.execute(
        'SELECT * FROM board ORDER BY createdAt'
      );

      res.status(200).json({ status: 'date_ascend', data: rows });
    }
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ success: false, message: 'Database error' }); // 500: Internal Server Error
  } finally {
    connection.end();
  }
}
