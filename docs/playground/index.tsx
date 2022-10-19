import React, { useEffect, useState, useRef, memo } from 'react';
import { Editor, babelParse } from 'react-playground';
import { Spin } from 'antd';
import './index.less';

const defualtCode = `export default () => {
  return 'hello world';
}`;

export default () => {
  const params: any = new URLSearchParams(location.search);
  const [iframeSpin, setIframeSpin] = useState(true);
  const [code, setCode] = useState(
    params.get('code') ? decodeURIComponent(params.get('code')) : defualtCode,
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
      setErrorInfo(String(error));
    }
  };
  useEffect(() => {
    // 同步编辑器的指
    runCode();
  }, [code]);
  return (
    <div className="core-form-playground">
      <div
        className="playground-left"
        style={{
          display: params.get('mode') === 'preview' ? 'none' : 'block',
        }}
      >
        <CacheEditor code={code} setCode={setCode} />
      </div>
      <div
        className="playground-right"
        style={{
          width: params.get('mode') === 'preview' ? '100%' : '50%',
        }}
      >
        {iframeSpin && (
          <div className="playground-iframe-loading">
            <Spin spinning></Spin>
          </div>
        )}
        {errorInfo && <span>has error</span>}
        <iframe
          key={code}
          src={`/~demos/iframe-demo?code=${code}`}
          onLoad={() => {
            setIframeSpin(false);
          }}
        />
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
