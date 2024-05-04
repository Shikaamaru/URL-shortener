const express = require('express');
const {connectToMongoDB}= require('./connection');
const urlRoute=require('./routes/url');
const URL = require('./models/url');
const app =express();
const port=8001;
//using through model veiw controllers .
app.use(express.json());
connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=>console.log("mongodb is connected"));
app.use('/url',urlRoute);
app.get('/:shortid', async (req,res)=>{
   const shortId =req.params.shortid;
   
   try {
    const entry = await URL.findOneAndUpdate(
       { shortid : shortId },
       {
          $push: {
             visitHistory: {
                timestamp: Date.now(), // Corrected 'timestamps' to 'timestamp'
             }, 
          },
       }
    );
    res.redirect(entry.redirectURL);
    if (!entry) {
        return res.status(404).send('URL not found'); // Send a 404 response if entry is not found
     }

     
    }
     catch (error) {
        console.error('Error finding URL:', error);
        res.status(500).send('Internal Server Error'); // Handle internal server error
     }
});
app.listen(port, ()=> console.log(`server started at port ${port}`));