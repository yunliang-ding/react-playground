import React, { useState, memo } from 'react';
import { Editor, encode, decode } from 'react-playcode';
import './index.less';

const defualtCode = `export default () => {
  return 'hello world';
}`;

export default () => {
  const params: any = new URLSearchParams(location.hash.split('?')[1]);
  const [code, setCode] = useState(
    params.get('code') ? decode(params.get('code')) : defualtCode,
  );
  return (
    <div className="playground">
      <div className="playground-left">
        <CacheEditor code={code} setCode={setCode} />
      </div>
      <div className="playground-right">
        <iframe
          key={code}
          src={`${location.pathname}#/~demos/docs-iframe?code=${encode(code)}`}
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
