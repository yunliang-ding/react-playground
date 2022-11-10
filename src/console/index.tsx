import ReactDom from 'react-dom';
import ConsoleRender from './component/render';

const target = '.playground-iframe-console-body';

export default {
  print: (value, log) => {
    const el = document.querySelector(target);
    if (el) {
      ReactDom.render(<ConsoleRender value={value} log={log} />, el);
    }
  },
};
