/* eslint-disable */
import Console from './console';

const { transform } = require('babel-standalone');
const antd = require('antd');
const react = require('react');
const axios = require('axios');
const moment = require('moment');
const reactCoreForm = require('react-core-form');
const reactCoreFormDesigner = require('react-core-form-designer');
const presets = ['es2015', 'stage-0', 'react'];

const safeEval = (code: string) => {
  try {
    return Function(code)();
  } catch (error) {
    console.log('safeEval error info', error);
  }
};

class BabelCompile {
  scope: any = {};
  exports = {};
  constructor(scope = {}) {
    this.scope = {
      ...scope,
      react,
      moment,
      axios,
      antd,
      Console,
      'react-core-form': reactCoreForm,
      'react-core-form-designer': reactCoreFormDesigner,
    };
  }
  require = (key: string) => {
    if (this.scope[key] === undefined) throw new Error(`${key} is not define`);
    return this.scope[key];
  };
  excuteCode = (code: string): any => {
    const res: any = {
      isError: false,
      error: '',
      exports: {},
    };
    try {
      const es5 = transform(code, {
        presets,
      }).code;
      const transfromCode = transform(
        `(require, exports) => {
          /** 修饰打印 */
          const console_log_bind_001 = console.log.bind(console);
          console.log = function(...p){
            console_log_bind_001(...p);
            try {
              require('Console').print(p, console_log_bind_001);
            } catch(e) {
              console_log_bind_001('err',e)
            }
          }
          ${es5};
        }`,
        {
          presets,
        },
      ).code;
      // 在解析的es5中 注入 return 用 safeEval 执行
      const parseCode = transfromCode
        .replace('"use strict";\n\n(', '"use strict";\n\n return (')
        .replace("'use strict';\n\n(", "'use strict';\n\n return (");
      safeEval(parseCode).call(null, this.require, this.exports);
      res.exports = this.exports;
    } catch (error) {
      console.log('catch transform error:', error);
      throw error;
    }
    return res;
  };
}
export default BabelCompile;
