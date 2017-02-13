var Router = function(router){
  this.router = router;
}

Router.prototype.add = function(route,controller, method, middlewares) {
    var routeChain = [];
    for (var i = 0; i < middlewares.length; i++){

        routeChain.push(this.getMiddlewareCallback(middlewares[i]));
    }
    routeChain.push(this.getControllerCallback(controller));
    this.router[method](route, routeChain);
}

Router.prototype.getControllerCallback = function (service) {
    return function (req, res, next) {
        Promise.all([service(req, res)]).catch(function (err) {
            next(err);
        });
    }
};

Router.prototype.getMiddlewareCallback = function (middleware) {
    return function (req, res, next) {
        Promise.all([middleware(req, res)]).then(function (response) {
            next();
        }).catch(function (err) {
            next(err);
        });
    }
};

module.exports = {
  initialize : function(route, routeConfig){
    var router = new Router(route);
    for(var i in routeConfig) {
        var route = i;
        if (i.toLowerCase().indexOf('post ') > -1) {
            route = i.substr(5, i.length);
        }
        router.add(route, routeConfig[i]['controller'], routeConfig[i]['method'] || 'get', routeConfig[i]['middlewares'] || []);
      }
  }
};
