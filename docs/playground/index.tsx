import React, { useEffect, useState, memo } from 'react';
import { Editor, babelParse, encode, decode } from 'my-react-playground';
import { Spin } from 'antd';
import './index.less';

const defualtCode = `export default () => {
  return 'hello world';
}`;

export default () => {
  const params: any = new URLSearchParams(location.hash.split('?')[1]);
  const [iframeSpin, setIframeSpin] = useState(true);
  const [code, setCode] = useState(
    params.get('code') ? decode(params.get('code')) : defualtCode,
  );
  const [errorInfo, setErrorInfo]: any = useState(false);
  // 运行代码
  const runCode = async () => {
    try {
      setIframeSpin(true);
      setErrorInfo(false);
      babelParse({
        code,
        prefix: '',
      }); // 检查代码是否有报错
    } catch (error) {
      setIframeSpin(false);
      setErrorInfo(String(error));
    }
  };
  useEffect(() => {
    // 同步编辑器的指
    runCode();
  }, [code]);
  return (
    <div className="core-form-playground">
      <div className="playground-left">
        <CacheEditor code={code} setCode={setCode} />
      </div>
      <div className="playground-right">
        {iframeSpin && (
          <div className="playground-iframe-loading">
            <Spin spinning></Spin>
          </div>
        )}
        {errorInfo && (
          <div className="playground-error-info">
            <pre>解析失败:</pre>
            <pre>{String(errorInfo)}</pre>
          </div>
        )}
        {!errorInfo && (
          <iframe
            key={code}
            src={`${location.pathname}#/~demos/iframe-demo?code=${encode(
              code,
            )}`}
            onLoad={() => {
              setIframeSpin(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

const CacheEditor = memo(
  ({ code, setCode }: any) => {
    return (
      <Editor
        style={{
          width: '50vw',
          height: '100vh',
        }}
        value={code}
        onSave={setCode}
      />
    );
  },
  () => {
    return true;
  },
);
