var WebpackDevServer = require("webpack-dev-server");
var gulp = require('gulp');
var KarmaServer = require('karma').Server;

var cfg = {
  _dir : './config',
  karma : __dirname + '/config/karma.conf.js',
  webpack : require('./config/webpack.dev')
};

var webpack = require('webpack');
var compiler = webpack(cfg.webpack);

var port_server = 8085;
var port_db = 8086;

//dev task:
gulp.task('server', function(){
    //Webpackdev server builds so there's no need
    new WebpackDevServer(compiler, {

      noInfo: true

    }).listen(port_server, "localhost", function(err) {
        if(err) throw new gutil.PluginError("webpack-dev-server", err);
        // Server listening
        console.log("Listening at http://localhost:" + port_server);
      });
});


gulp.task('test', function(done){
  new KarmaServer({
    configFile: cfg.karma,
    singleRun: true
  }, done).start();
});
