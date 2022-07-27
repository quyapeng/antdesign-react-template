import request from '@/utils/request';
const product_url = 'product';

export async function productAll() {
  return request(`${product_url}/all`, {
    method: 'GET',
  });
}
