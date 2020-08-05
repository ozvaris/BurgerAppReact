const  proxy  = require('http-proxy-middleware');
 
module.exports = (app) => {
    app.use(
        proxy.createProxyMiddleware ("/ingredients", {
            target: "https://myreact-burgerbuilder-bc718.firebaseio.com",
            cangeOrigin: true
        })
    );
};