import ReactDOM from 'react-dom';
import { useEffect } from 'react';
import './index.less';
import { babelParse } from '.';

export default ({
  code = 'export default () => `Hello World`',
  mode = 'preview',
}) => {
  // 运行代码
  const runCode = async (esCode: string) => {
    try {
      const ComponentApp = await babelParse({
        code: esCode,
        prefix: '',
      });
      ReactDOM.render(
        <ComponentApp />,
        document.querySelector('#react-playground'),
      );
    } catch (error) {
      ReactDOM.render(
        <div className="playground-error-info">
          <pre>解析失败:</pre>
          <pre>{String(error)}</pre>
        </div>,
        document.querySelector('#react-playground'),
      );
    }
  };
  useEffect(() => {
    runCode(code);
  }, []);
  return <div id="react-playground" />;
};
