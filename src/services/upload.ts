// import URL from 'urijs';
// import { message: Message } from 'antd';

// import path from 'path';
import request from '@/utils/request';
// import { blobToFile, resolveURL } from '@/utils/util';
import oss from 'ali-oss';
import { OSSError } from '@/utils/error';

/** 获取 Ali OSS 配置 */
async function uploadConfig() {
  return await request('/oss', {
    method: 'GET',
  });
}

/** 上传到 OSS */
async function uploadOSS(configure: any, name: any, file: any, options: any) {
  const client = new oss({ ...configure });
  return new Promise((resolve, reject) => {
    client
      .put(name, file, options)
      .then(resolve)
      .catch((error: any) => {
        reject(
          new OSSError(
            error.name === 'RequestError' ? `${configure.endpoint} 节点无法访问` : error.message,
          ),
        );
      });
  });
}

/** 文件上传 */
/** 文件类型 */
// type: UPLOAD_FILE_TYPE;
/** 文件描述 */
// description?: string;
/** 文件 */
// file: File;
export async function upload() {
  // const { type, description, file } = params;
  // const data = file instanceof Blob ? blobToFile(file, file.name) : file;
  // const filename = [configure.filename, extname].join('');
  // await uploadOSS(configure, resolveURL(dirname, filename), data, {
  //   mime: data.type,
  // });
  // console.log('file', data);
  const {
    accessId: OSSAccessKeyId,
    callback,
    dir,
    expire,
    host,
    policy,
    signature,
  } = await uploadConfig();
  const response = await request('/course/upload/callback', {
    method: 'POST',
    data: {
      key: `${dir}.`,
      OSSAccessKeyId,
      callback,
      dir,
      expire,
      host,
      policy,
      signature,
    },
  });
  console.log('response', response);
  return response.data;
}

const UploadService = {
  upload,
};

export default UploadService;
