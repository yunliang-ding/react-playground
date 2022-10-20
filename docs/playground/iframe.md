---
order: 1
nav:
  order: 3
  title: ''
sidemenu: false
gapless: true
---

```tsx
/**
 * iframe: true
 */
import ReactDom from 'react-dom';
import React, { useState, useEffect } from 'react';
import { babelParse, decode } from 'react-playground';

export default () => {
  const params: any = new URLSearchParams(location.hash.split('?')[1]);
  // 解析
  const parseStringToModule = async () => {
    const ComponentApp = await babelParse({
      // base64 转一下
      code: decode(params.get('code')),
      prefix: '',
    });
    ReactDom.render(<ComponentApp />, document.querySelector('#app'));
  };
  useEffect(() => {
    if (params.get('code')) {
      parseStringToModule();
    }
  }, []);
  return <div id="app" />;
};
```
