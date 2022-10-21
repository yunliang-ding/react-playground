/* eslint-disable */
import { isEmpty } from '@/util';
import BabelCompile from './babel-compile';
import Editor from './editor';
import Console from './console';

/**
 * 解析
 */
const babelParse = ({
  code = '',
  prefix = 'export default ',
  // 默认依赖 react、antd
  dependencies = {
    React: 'react',
    antd: 'antd',
  },
  // 默认 default 导出
  exportDefault = true,
  require = {},
}) => {
  const babel = new BabelCompile(require);
  try {
    let dependenciesString = '';
    if (!isEmpty(dependencies)) {
      dependenciesString =
        Object.keys(dependencies)
          .map((key) => {
            return `import ${key} from '${dependencies[key]}';`;
          })
          .join('\n') + '\n';
    }
    const res = babel.excuteCode(
      `${dependenciesString}${prefix}${code.replaceAll('↵', '')}`,
    );
    if (!res?.isError) {
      if (exportDefault) {
        return res?.exports.default;
      } else {
        return res?.exports;
      }
    } else {
      throw res?.error;
    }
  } catch (error) {
    console.log('catch parse error:', error);
    throw error;
  }
};

const encode = (str): string => {
  try {
    return btoa(encodeURIComponent(str));
  } catch (error) {
    console.log(error);
    return '';
  }
};

const decode = (str): string => {
  try {
    return decodeURIComponent(atob(str));
  } catch (error) {
    console.log(error);
    return '';
  }
};

export { babelParse, BabelCompile, Editor, Console, encode, decode };
