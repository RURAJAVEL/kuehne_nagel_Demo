const Router = require('express-promise-router');
const router = Router({ mergeParams : true});
const controller = require('../controller/controller');

module.exports = () => {
    
    router.post('/createObject', controller.createObject)
    router.post('/findObject', controller.findObject);
    router.get('/findObjectFromDb', controller.findObjectFromDb);
    return router;
}