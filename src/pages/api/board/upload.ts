import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { createConnection } from '@/lib/db';
import { ResultSetHeader } from 'mysql2/promise';

export const config = {
  api: {
    bodyParser: false,
  },
};

type NextApiRequestWithFile = NextApiRequest & {
  file?: Express.Multer.File;
};

const upload = multer({
  dest: './public/uploads',
  limits: { fileSize: 10 * 1024 * 1024 },
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

// 게시글 업로드

export default async function handler(
  req: NextApiRequestWithFile,
  res: NextApiResponse
) {
  await runMiddleware(req, res, upload.single('board_img'));

  const connection = await createConnection();

  try {
    const { board_content, board_user_id, createAt } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: 'No file uploaded' });
    }

    const board_img = `/uploads/${req.file.filename}`;

    const [rows] = await connection.execute<ResultSetHeader>(
      `INSERT INTO board (board_content, board_user_id, board_img, createAt) VALUES (?, ?, ?, ?)`,
      [board_content, board_user_id, board_img, createAt]
    );

    if (rows.affectedRows > 0) {
      res.status(201).json({
        success: true,
        data: {
          id: rows.insertId,
          board_content,
          board_user_id,
          board_img,
          createAt,
        },
      });
    } else {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  } catch (err) {
    console.error('Database error:', err);
    res.status(500).json({ success: false, message: 'Database error' });
  } finally {
    connection.end();
  }
}
