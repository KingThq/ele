module.exports = {
    publicPath: "./",
    devServer: {
        host: '127.0.0.1',
        port: 8090,
        open: true,
        proxy: {//代理
            '/ele': {
                target: "http://127.0.0.1",
                changeOrigin: true,
                pathRewrite: {
                    "^/ele": ""
                }
            }
        }
    }
}