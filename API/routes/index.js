var controllers = require('./../controllers');
module.exports = {
    '/' : {
        method : 'get',
        controller : controllers.TwitterController.getData
    },
    '/user' : {
        method : 'get',
        controller : controllers.TwitterController.getApi
    },
    '/user' : {
      method : 'post',
      controller : controllers.TwitterController.getData
    }
}
