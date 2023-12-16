import {post, get} from './common';

const search = async (query) => {
  return await get(
    'corporate/search?query=' + query,
    true,
  );
};

const request = async (regId, name, type) => {
  return await post(
    'corporate/request',
    {
      regId,
      name,
      type
    },
    true
  );
};

const status = async (idx) => {
  return await get(
    'corporate/status?idx=' + idx,
    true,
  );
};

const list = async () => {
  return await get(
    'corporate/list',
    true,
  );
};

export {search, request, status, list};
