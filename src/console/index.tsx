import ReactDom from 'react-dom';
import ConsoleRender from './component/render';

export default {
  print: (value, logprefix, target = '.playground-iframe-console-body') => {
    const el = document.querySelector(target);
    if (el) {
      ReactDom.render(
        <ConsoleRender value={value} logprefix={logprefix} />,
        el,
      );
    }
  },
};
