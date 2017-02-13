var path = require('path'),
    Router = require('../lib/router'),
    env_config;

var merge = function(src, dist){
    for (var i in src) {
        dist[i] = src[i];
    }
};
module.exports = function(bootstrapLocation, router){
  global.LEADERBOARD = {
    config : [],
    env : process.env.NODE_ENV || 'development'
  };
  //LEADERBOARD.config = require(path.join(bootstrapLocation, 'config', 'config.js'));
  if (LEADERBOARD.env) {
        env_config = require(path.join(bootstrapLocation, 'config', 'env', LEADERBOARD.env + '.js'));
    }
  merge(LEADERBOARD.config, env_config);
  Router.initialize(router, require('./../routes'));
}
