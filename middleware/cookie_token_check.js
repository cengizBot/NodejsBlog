let jwt = require('jsonwebtoken');
const config = require('../config/config.js');
var cookieParser = require('cookie-parser');   

let cookie_token = (req,res,next) => {
  

    //token cookie
    let token = req.cookies.jwt;

    if(token){

        jwt.verify(token, config.secret, (err,decoded) => {
        
            if(err){
                // return res.json({
                //     success: false,
                //     message: 'Token is not valid'
                // });
                console.log(req.session)
                // req.session.passport.user = undefined
            
            }
            else{
                
                req.decoded = decoded;
                var decoded_tab =  req.decoded.object;
                // première lettre en majuscule ;
                decoded_tab = decoded_tab.username[0].toUpperCase() + decoded_tab.username.slice(1); 
                res.locals.decoded =  decoded_tab
              

            }
        });
    }
    else {
        // return res.json({
        //   success: false,
        //   message: 'Auth token is not supplied'
        // });
        req.session.passport.user = undefined
    }

    next();
}





module.exports = {
    cookie_token : cookie_token
}