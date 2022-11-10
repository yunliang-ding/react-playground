function ObjectRender({ value, log }) {
  log('is Object Type', value);
  return <div style={{ marginRight: 10 }}>{JSON.stringify(value)}</div>;
}

export default ObjectRender;
