// src/setupProxy.js
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/bcexternal', {
      target: 'https://bcexternal.cbnuh.or.kr/MC/Pre_InterView_STG/api/Interface',
      changeOrigin: true,
    }),
  );
};
