export const NETWORK_ERROR_TEXT = {
  DEFAULT: '请检查网络是否连接',
  AUTHORITY: '用户需要授权',
  TIMEOUT: '请求超时，请稍后重试',
  UPLOADTIMEOUT: '请求超时，请稍后重试',
  ACTIVATED: '用户未激活',
  NOTFOUND: '服务不存在',
  SERVICE: '请求服务发生错误',
  SERVER: '服务器发生错误，请检查服务器',
  SYSTEM: '服务不可用，服务器暂时过载或维护',
};

class CustomError extends Error {
  static(error) {
    return error instanceof this;
  }
}

export class ServiceError extends CustomError {
  name = 'ServiceError';
  data;
  constructor(message, data) {
    super(message);

    this.message = message || this.name;
    this.data = data;
  }
}

export class ServerError extends CustomError {
  name = 'ServiceError';
  status;
  requestConfig;
  constructor(message, status, requestConfig) {
    super(message);
    this.message = message || this.name;
    this.status = status;
    this.requestConfig = requestConfig;
  }
}

export class NetworkError extends CustomError {
  name = 'NetworkError';
  constructor(message) {
    super(message);
    this.message = message || this.name;
  }
}

export class AuthorizeError extends CustomError {
  name = 'AuthorizeError';
  status;
  constructor(message, status) {
    super(message);
    this.message = message || this.name;
    this.status = status;
  }
}

export class OSSError extends CustomError {
  name = 'OSSError';
  constructor(message) {
    super(message);
    this.message = message || this.name;
  }
}

function handleError(error) {
  const { message } = error;

  if (ServerError.is < ServerError > error) {
    Notification.error({
      message: NETWORK_ERROR_TEXT.SERVER,
      description: message,
    });
    return;
  }

  if (AuthorizeError.is < AuthorizeError > error) {
    message.info(error.message);
    const { pathname, search } = window.location;
    const redirect = [pathname, search].filter(Boolean).join('');
    history.replace(`/user/login?redirect=${redirect}`);
    return;
  }

  if (NetworkError.is(error)) {
    Notification.error({
      message: NETWORK_ERROR_TEXT.DEFAULT,
      description: message,
    });
    return;
  }

  if (ServiceError.is(error)) {
    message.error(message);

    return;
  }

  if (OSSError.is(error)) {
    Notification.error({
      message: '上传服务异常',
      description: message,
    });
    return;
  }

  console.error(`${message}`);
  throw error;
}

export default handleError;
