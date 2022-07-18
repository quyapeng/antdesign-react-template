// import URL from 'urijs';
// import { message: Message } from 'antd';

import path from 'path';
import { xsrfHeaderName } from '@/constant/index';
import { extend } from 'umi-request';
import { blobToFile, resolveURL } from '@/utils/index';
import oss from 'ali-oss';
import { OSSError } from '@/utils/error';
import { useRequest } from 'umi';
import request from '@/utils/request';

/** 获取 Ali OSS 配置 */
async function uploadConfig() {
  return await request('oss', {
    method: 'GET',
  });
}

/** 上传到 OSS */
async function uploadOSS(configure: any, name: any, file: any, options: any) {
  const data = useRequest({
    url: configure.host,
    method: 'POST',
    data: configure,
  });
  console.log('uploadOSS', data);
  return data;

  // const client = new oss({ ...configure });
  // return new Promise((resolve, reject) => {
  //   client
  //     .put(name, file, options)
  //     .then(resolve)
  //     .catch((error: any) => {
  //       reject(
  //         new OSSError(
  //           error.name === 'RequestError' ? `${configure.endpoint} 节点无法访问` : error.message,
  //         ),
  //       );
  //     });
  // });
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
  const tem: any = {
    OSSAccessKeyId: 'LTAI4Fym6zbF7NUdJbKGuaym',
    callback:
      'eyJjYWxsYmFja1VybCI6Imh0dHBzOi8vZGV2LWFwaS5xbGlvbi5jb20vc3RydWdnbGUvb3NzL2NhbGxiYWNrIiwiY2FsbGJhY2tCb2R5Ijoie1wib2JqZWN0XCI6JHtvYmplY3R9LFwic2l6ZVwiOiR7c2l6ZX0sXCJtaW1lVHlwZVwiOiR7bWltZVR5cGV9fSIsImNhbGxiYWNrQm9keVR5cGUiOiJhcHBsaWNhdGlvbi9qc29uIn0=',
    dir: 'tmp/',
    expire: '1657863614',
    host: 'https://i.qlion.com',
    key: 'tmp/manager.test.pdf',
    policy:
      'eyJleHBpcmF0aW9uIjoiMjAyMi0wNy0xNVQwNTo0MDoxNC4yMDlaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJ0bXAvIl1dfQ==',
    signature: 'dQZVgvy2QdUhKJAeFJ9cL+9sLDw=',
  };
  const file = option instanceof Blob ? blobToFile(option, name) : option;
  tem.file = file;

  // const filename = [name, path.extname(data.name)].join('');
  // resolveURL(name, filename)
  const data = await uploadOSS(tem, name, file, {
    mime: file.type,
  });
  console.log('file', data);

  //   OSSAccessKeyId: "LTAI4Fym6zbF7NUdJbKGuaym"
  // callback: "eyJjYWxsYmFja1VybCI6Imh0dHBzOi8vZGV2LWFwaS5xbGlvbi5jb20vc3RydWdnbGUvb3NzL2NhbGxiYWNrIiwiY2FsbGJhY2tCb2R5Ijoie1wib2JqZWN0XCI6JHtvYmplY3R9LFwic2l6ZVwiOiR7c2l6ZX0sXCJtaW1lVHlwZVwiOiR7bWltZVR5cGV9fSIsImNhbGxiYWNrQm9keVR5cGUiOiJhcHBsaWNhdGlvbi9qc29uIn0="
  // dir: "tmp/"
  // expire: "1657863614"
  // host: "https://i.qlion.com"
  // key: "tmp/manager.test.pdf"
  // policy: "eyJleHBpcmF0aW9uIjoiMjAyMi0wNy0xNVQwNTo0MDoxNC4yMDlaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJ0bXAvIl1dfQ=="
  // signature: "dQZVgvy2QdUhKJAeFJ9cL+9sLDw="

  // const response = await request('oss/callback', {
  //   method: 'POST',
  //   data: params,
  //   // requestType: 'form',
  // });
  // console.log('response', response);
  // return response;
}

const UploadService = {
  upload,
};

export default UploadService;
