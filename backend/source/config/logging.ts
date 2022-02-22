const getTimeStamp = (): string => {
  return new Date().toISOString();
};

const info = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.log(`[${getTimeStamp()}] [INFO] [${namespace} ${message}]`, object);
  } else {
    console.log(`[${getTimeStamp()}] [INFO] [${namespace} ${message}]`);
  }
};

const warn = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.warn(
      `[${getTimeStamp()}] [INFO] [${namespace} ${message}]`,
      object
    );
  } else {
    console.warn(`[${getTimeStamp()}] [INFO] [${namespace} ${message}]`);
  }
};

const error = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.error(
      `[${getTimeStamp()}] [INFO] [${namespace} ${message}]`,
      object
    );
  } else {
    console.error(`[${getTimeStamp()}] [INFO] [${namespace} ${message}]`);
  }
};

const debug = (namespace: string, message: string, object?: any) => {
  if (object) {
    console.debug(
      `[${getTimeStamp()}] [INFO] [${namespace} ${message}]`,
      object
    );
  } else {
    console.debug(`[${getTimeStamp()}] [INFO] [${namespace} ${message}]`);
  }
};

export default {
  info,
  warn,
  error,
  debug,
};
