module.exports = {
    pages: {
        index: {
            //入口
            entry: "src/main.js",
        },
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://127.0.0.1:7001/',
                pathRewrite: { '^/api': '' },
                ws: true,
                changeOrigin: true,
                secure: true,                   //是否https接口
            }
        }
    }
}