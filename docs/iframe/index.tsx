import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import { babelParse, decode } from 'react-playcode';
import './index.less';

export default () => {
  const params: any = new URLSearchParams(location.hash.split('?')[1]);
  // 解析
  const parseStringToModule = async () => {
    try {
      const ComponentApp = await babelParse({
        // base64 转一下
        code: decode(params.get('code')),
        prefix: '',
      });
      ReactDom.render(<ComponentApp />, document.querySelector('#app'));
    } catch (error) {
      ReactDom.render(
        <div className="playground-error-info">
          <div>解析失败:</div>
          <pre>{String(error)}</pre>
        </div>,
        document.querySelector('#app'),
      );
    }
  };
  useEffect(() => {
    if (params.get('code')) {
      parseStringToModule();
    }
  }, []);
  return <div id="app" className="playground-iframe" />;
};
