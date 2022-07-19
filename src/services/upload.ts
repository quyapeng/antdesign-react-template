import request from '@/utils/request';

/** 获取 Ali OSS 配置 */
async function uploadConfig() {
  return await request('oss', {
    method: 'GET',
  });
}

const UploadService = {
  uploadConfig,
};

export default UploadService;
