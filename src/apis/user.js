import {post, get} from './common';

const profile = async () => {
  return await get('user/profile', true);
};

const login = async (provider, token) => {
  return await post(
    'user/login',
    {
      provider,
      token
    },
    false,
  );
};

export {profile, login};
