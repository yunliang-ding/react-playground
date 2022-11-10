import ReactDom from 'react-dom';
import ConsoleRender from './component/render';

const target = '.playground-iframe-console-body';

const HistoryLog = [];

export default {
  print: (value, log) => {
    HistoryLog.push(value); // 添加到队列
    const el = document.querySelector(target);
    if (el) {
      ReactDom.render(<ConsoleRender values={HistoryLog} log={log} />, el);
    }
  },
};
