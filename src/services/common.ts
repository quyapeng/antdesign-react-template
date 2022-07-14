// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

const oss = '/oss';

export async function uploadConfig() {
  return request(oss, {
    method: 'GET',
  });
}
