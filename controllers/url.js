const shortid=require("shortid");
const URL = require('../models/url');
async function HandleGenerateNewShortURL(req,res){
    const body =req.body;
    if(!body.url) return res.status(400).json({error : "url is required"});
    const shortID =shortid.generate();
    await URL.create({
        shortid :shortID,
        redirectURL :body.url,
        visitHistory:[],
    });
    
    return res.json({id :shortID});
}

async function HandleGetAnalytics(req,res){
    const shortID =req.params.shortid;
    const entry =await URL.findOne({shortid:shortID});
    if(!entry) return res.status(404).json({error : "URL not found"});
    return res.json({
        totalclicks:entry.visitHistory.length,
        analytics:entry.visitHistory});
}

module.exports={
    HandleGenerateNewShortURL,
    HandleGetAnalytics,
};