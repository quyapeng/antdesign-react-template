// @ts-ignore
/* eslint-disable */
import request from '@/utils/request';

const oss = 'oss';
const area = 'area';
const sales = 'operation/account/role/ROLE_SALES';

export async function uploadConfig() {
  return request(oss, {
    method: 'GET',
  });
}

export async function areaList(parentId?: string | number | undefined) {
  return request(area, {
    method: 'GET',
    params: { parentId },
  });
}

// 业务员

export async function salesList(params?: { [key: string]: any }) {
  return request(sales, {
    method: 'GET',
    params,
  });
}
