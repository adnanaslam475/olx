const { createProxyMiddleware, } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/g', createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    )
    app.use(
        '/api/logout', createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    )
    app.use(
        '/f', createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
        })
    )
    app.use(
        "/api/*", createProxyMiddleware({
            target: 'http://localhost:5000',
            changeOrigin: true,
            "secure": false
        })
    )
}