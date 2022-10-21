import ReactDom from 'react-dom';

const SimpleConsole = ({ value }) => {
  return <div>{value.toString()}</div>;
};

export default {
  print: (value, target = '.playground-iframe-console-body') => {
    const el = document.querySelector(target);
    if (el) {
      ReactDom.render(<SimpleConsole value={value} />, el);
    }
  },
};
