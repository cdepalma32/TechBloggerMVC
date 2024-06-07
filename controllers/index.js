const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashBoardRoutes');



router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashBoard', dashboardRoutes);


module.exports = router;
