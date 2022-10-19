```tsx
import React from 'react';
import './index.less';

export default () => {
  window.location.href = `${location.pathname}#/~demos/docs-playground${location.search}`;
  return <span />;
};
```
