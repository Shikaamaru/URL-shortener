const express =require('express');
const {HandleGenerateNewShortURL,HandleGetAnalytics } = require('../controllers/url')
const router =express.Router();

router.post('/',HandleGenerateNewShortURL);

router.get('/analytics/:shortid',HandleGetAnalytics);
    




module.exports=router;