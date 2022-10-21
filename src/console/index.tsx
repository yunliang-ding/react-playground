/* eslint-disable @iceworks/best-practices/recommend-polyfill */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-wrap-multilines */
import ReactDom from 'react-dom';

const SimpleConsole = (props) => {
  return <div>{props.toString()}</div>;
};

export default {
  print: (value, target = '.app-simple-console') => {
    const el = document.querySelector(target);
    if (el) {
      ReactDom.render(<SimpleConsole value={value} />, el);
    }
  },
};
