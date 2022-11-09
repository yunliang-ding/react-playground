/* eslint-disable @iceworks/best-practices/recommend-polyfill */
/* eslint-disable react-hooks/rules-of-hooks */

/** 判断空 */
export const isEmpty = (param: any) => {
  if (param === null || param === undefined) {
    return true;
  }
  if (Array.isArray(param)) {
    return param.length === 0;
  }
  if (typeof param === 'string') {
    return param.trim() === '';
  }
  if (typeof param === 'object') {
    return Object.keys(param).length === 0;
  }
  return false;
};

export const getJSType = (obj: unknown): string => {
  const type = Object.prototype.toString.call(obj).slice(8, -1);
  return type.toLocaleLowerCase();
};
