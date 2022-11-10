/* eslint-disable @iceworks/best-practices/recommend-polyfill */
import ObjectRender from './object';
import { getJSType } from '@/util';
import '../../index.less';

const map = {
  object: ObjectRender,
  // array: ArrayRender,
};

export default ({ values, log }) => {
  return (
    <div className="console-wrap">
      {values.map((value) => {
        return (
          <div className="console-wrap-row">
            {value.map((itme) => {
              const VM =
                map[getJSType(itme)] ||
                (({ value }) => (
                  <div style={{ marginRight: 10 }}>{value.toString()}</div>
                ));
              return <VM value={itme} log={log} />;
            })}
          </div>
        );
      })}
    </div>
  );
};
