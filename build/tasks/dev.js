require('gulp')
    .task("dev", () => {
        var compiler = require('webpack')(require('./../webpack.config.js')),
            server = new (require('webpack-dev-server'))(compiler, {
                contentBase: require('./../pathmap.js').root,
                proxy: {
                    '/api/*': {
                        target: 'http://apihost.com'
                    }
                }
            });
        server.listen(8123, "localhost", (err) => {
            if (err) throw err;
        });
    });