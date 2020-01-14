const LocalStrategy = require('passport-local').Strategy;
const connection = require('../config/db');
const passport = require('passport');
var flash = require('express-flash-messages');
// const mysql = require('mysql');
var env = require('../config/config').secret;
let jwt = require('jsonwebtoken');

//password crypt / decrypt
// password crypt
const bcrypt = require('bcrypt');
const saltRounds = 10;


module.exports = function(passport) {

    console.log('enter passport')

    passport.serializeUser(function(user, done) {
   
      done(null, user.id);
      
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
      connection.query("select * from users where id = "+id,function(err,rows){	
              done(err, rows[0]);
      });
    });


    //connexion
    passport.use('local-login', new LocalStrategy({

        username : 'email',
        password: 'password',
        passReqToCallback: true
        // session: false

    },
    function(req,email,password,done){
      
        connection.query('SELECT * FROM users WHERE email = ? ' , [email],function(err,rows){

          if(email === undefined || email === ""){
            return done(null,false,{
              // CUSTOM MESSAGE
              message: 'Certains champs sont vides'
            })
          }
          
          if(err){
            console.log('impossible 2');
            return done(err);
          } 

          if(!rows.length){
            console.log('------------------');
            console.log(email);
                return done(null,false,{
                  // CUSTOM MESSAGE
                  message: 'Username ou mot de passe incorrect'
                })
          }

            // hash mot de passe pour voir s'il correspond ou non 
          bcrypt.compare(password, rows[0].password, function(err, res) {
              
            if(res === true){
              return done(null,rows[0]);
            }else{
              return done(null,false,{
                // CUSTOM MESSAGE
                  message: 'Username ou mot de passe incorrect'
              });
            }

          });

    

        })
    }
    
    ))

    
}