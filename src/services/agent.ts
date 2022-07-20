import request from '@/utils/request';
const agent_url = 'operation/agent/all';
// /?status=ENABLED

export async function getAgent(options?: { [key: string]: any }) {
  return request(agent_url, {
    method: 'GET',
    params: {
      ...options,
    },
    ...(options || {}),
  });
}
