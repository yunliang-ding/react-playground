import { defineConfig } from 'dumi';
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

export default defineConfig({
  mode: 'site',
  title: 'react-playground',
  outputPath: 'docs-dist',
  locales: [['zh-CN', '中文']],
  theme: {
    '@primary-background-color': '#4e60d4',
    '@text-color': '#6a6a6a',
    '@font-size-base': '13px',
    '@font-size-small': '12px',
    '@primary-color': '#4e60d4',
  },
  extraBabelPlugins: [
    [
      'import',
      {
        libraryName: 'antd',
        libraryDirectory: 'lib',
        style: true,
      },
      'antd',
    ],
  ],
  navs: [
    null, // null 值代表保留约定式生成的导航，只做增量配置
  ],
  chainWebpack: (config) => {
    config.plugin('monaco-editor').use(MonacoWebpackPlugin, [
      {
        languages: ['javascript', 'typescript'],
      },
    ]);
  },
  // more config: https://d.umijs.org/config
});
