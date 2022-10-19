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
import { babelParse } from 'react-playground';

export default () => {
  const params: any = new URLSearchParams(location.search);
  // 解析
  const parseStringToModule = async () => {
    const ComponentApp = await babelParse({
      code: decodeURIComponent(params.get('code')),
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
