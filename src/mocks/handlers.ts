import { http, HttpResponse } from 'msw';
import { loginSuccessData } from './api/loginResultData';
import { user } from './api/userData';
import { userType } from '@/types/login';

export const handlers = [
  http.post('/api/login', async ({ request }) => {
    const data = (await request.json()) as userType;
    console.log(data);

    const { user_id, user_password } = data;

    const findUser = user.filter((user) => {
      if (user.user_id === user_id && user.user_password === user_password)
        return user;
    });

    // console.log(findUser);

    if (findUser.length > 0) {
      return HttpResponse.json(loginSuccessData);
    } else {
      return HttpResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  }),
];
