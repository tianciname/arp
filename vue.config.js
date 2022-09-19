const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies  : true,

    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8888/',
                // 允许跨域
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }

})
