import { NextResponse } from 'next/server';

export function middleware(req) {
  const res = NextResponse.next();

  // CORS 헤더 추가
  res.headers.set(
    'Access-Control-Allow-Origin',
    'https://bamboo-skj.vercel.app'
  ); // 배포된 클라이언트의 출처
  res.headers.set(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PATCH, DELETE'
  ); // 허용할 HTTP 메서드
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type'); // 허용할 헤더

  // OPTIONS 메서드에 대한 응답
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': 'https://bamboo-skj.vercel.app',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  return res;
}
