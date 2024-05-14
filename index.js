const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const {connectToMongoDB}= require('./connection');
const {restricttoLoggedInUserOnly,checkAuth}=require('./middlewares/auth');

const URL = require('./models/url');
const app =express();
const port=8001;


const urlRoute=require('./routes/url');
const staticRouter=require('./routes/staticRouter');
const userRoute=require('./routes/user');
//using through model veiw controllers .

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=>console.log("mongodb is connected"));

app.set('view engine','ejs');
app.set('views',path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.get('/', async (req,res)=>{
   const allurls= await URL.find();
    return res.render('home',{urls:allurls});
});




app.use('/url',restricttoLoggedInUserOnly,urlRoute);
app.use('/user',userRoute);
app.use('/',checkAuth,staticRouter);


app.get('/url/:shortid', async (req,res)=>{
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
    if (!entry) {
      return res.status(404).send('URL not found'); // Send a 404 response if entry is not found
   }
    res.redirect(entry.redirectURL);
    

     
    }
     catch (error) {
        console.error('Error finding URL:', error);
        res.status(500).send('Internal Server Error'); // Handle internal server error
     }
});
app.listen(port, ()=> console.log(`server started at port ${port}`));