import {post, get} from './common';

const search = async (query) => {
  return await get(
    'realEstate/search?query=' + query,
    true,
  );
};

const request = async (regId, address, type) => {
  return await post(
    'realEstate/request',
    {
      regId,
      address,
      type
    },
    true
  );
};

const status = async (idx) => {
  return await get(
    'realEstate/status?idx=' + idx,
    true,
  );
};

const list = async () => {
  return await get(
    'realEstate/list',
    true,
  );
};

export {search, request, status, list};
