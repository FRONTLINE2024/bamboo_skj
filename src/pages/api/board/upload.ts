import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { createConnection } from '@/lib/db';
import { ResultSetHeader } from 'mysql2/promise';
import type { NextFunction, Request, Response } from 'express';

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
  fn: (req: Request, res: Response, next: NextFunction) => void
) =>
  new Promise<void>((resolve, reject) => {
    fn(
      req as unknown as Request,
      res as unknown as Response,
      (error?: Error | string | undefined) => {
        if (error && typeof error !== 'undefined') {
          return reject(error);
        }
        resolve();
      }
    );
  });

// 게시글 업로드
export default async function handler(
  req: NextApiRequestWithFile,
  res: NextApiResponse
) {
  await runMiddleware(req, res, upload.single('board_img'));

  const connection = await createConnection();

  try {
    const { board_title, board_content, board_user_id, createdAt } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: 'No file uploaded' });
    }

    if (!board_title || !board_content || !board_user_id || !createdAt) {
      return res.status(404).json({ message: 'Missing post data!' });
    }

    const board_img = `/uploads/${req.file.filename}`;

    const [rows] = await connection.execute<ResultSetHeader>(
      `INSERT INTO board (board_title, board_content, board_user_id, board_img, createdAt) VALUES (?, ?, ?, ?, ?)`,
      [board_title, board_content, board_user_id, board_img, createdAt]
    );
    console.log(rows);

    if (rows.affectedRows > 0) {
      res.status(201).json({
        success: true,
        data: {
          id: rows.insertId,
          board_title,
          board_content,
          board_user_id,
          board_img,
          createdAt,
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
