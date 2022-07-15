// import URL from 'urijs';
// import { message: Message } from 'antd';

// import path from 'path';
import request from '@/utils/request';
import { blobToFile } from '@/utils/index';
import oss from 'ali-oss';
import { OSSError } from '@/utils/error';
// import URL from 'urijs';

/** 获取 Ali OSS 配置 */
async function uploadConfig() {
  return await request('oss', {
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
export async function upload(option: any) {
  const { name, size, type }: any = option;
  // const data = file instanceof Blob ? blobToFile(file, file.name) : file;
  // const filename = [configure.filename, extname].join('');
  // await uploadOSS(configure, resolveURL(dirname, filename), data, {
  //   mime: data.type,
  // });
  // console.log('file', data);
  // const {
  //   accessId: OSSAccessKeyId,
  //   callback,
  //   dir,
  //   expire,
  //   host,
  //   policy,
  //   signature,
  // } = await request('oss', {
  //   method: 'GET',
  // });
  const {
    data: { accessId: OSSAccessKeyId, callback, dir, expire, host, policy, signature },
  } = await uploadConfig();
  const params: any = {
    key: `${dir}manager.${name}`,
    OSSAccessKeyId,
    callback,
    dir,
    expire,
    host,
    policy,
    signature,
  };

  params.size = size;
  params.mimeType = type;
  const data = option instanceof Blob ? blobToFile(option, name) : option;
  console.log('params', data);
  //   OSSAccessKeyId: "LTAI4Fym6zbF7NUdJbKGuaym"
  // callback: "eyJjYWxsYmFja1VybCI6Imh0dHBzOi8vZGV2LWFwaS5xbGlvbi5jb20vc3RydWdnbGUvb3NzL2NhbGxiYWNrIiwiY2FsbGJhY2tCb2R5Ijoie1wib2JqZWN0XCI6JHtvYmplY3R9LFwic2l6ZVwiOiR7c2l6ZX0sXCJtaW1lVHlwZVwiOiR7bWltZVR5cGV9fSIsImNhbGxiYWNrQm9keVR5cGUiOiJhcHBsaWNhdGlvbi9qc29uIn0="
  // dir: "tmp/"
  // expire: "1657863614"
  // host: "https://i.qlion.com"
  // key: "tmp/manager.test.pdf"
  // policy: "eyJleHBpcmF0aW9uIjoiMjAyMi0wNy0xNVQwNTo0MDoxNC4yMDlaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJ0bXAvIl1dfQ=="
  // signature: "dQZVgvy2QdUhKJAeFJ9cL+9sLDw="
  const response = await request('oss/callback', {
    method: 'POST',
    data: params,
    // requestType: 'form',
  });
  console.log('response', response);
  return response;
}

const UploadService = {
  upload,
};

export default UploadService;
