const proxy = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    proxy.createProxyMiddleware("/ingredients", {
      target: process.env.REACT_APP_DATABASE,
      cangeOrigin: true,
    })
  );
};
