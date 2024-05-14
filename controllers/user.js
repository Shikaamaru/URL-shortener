const { v4 :uuidv4} = require('uuid');
const User = require('../models/user');
const {setUser} = require('../service/auth');


async function handleUserSignup(req,res){
    const {username,password} =req.body;
    await User.create({
        username,
        password,
    });
    
    return res.redirect('/');
}
async function handleUserlogin(req,res){
    const {username,password} =req.body;
    const user = await User.findOne({username,password});
    if(!user) return res.render('login',{error:"Invalid username or password"});
    

    const sessionId =uuidv4();
     setUser(sessionId,user); 
    res.cookie('session',sessionId);
        return res.redirect('/');
    
    
}
module.exports={
    handleUserSignup,handleUserlogin
};