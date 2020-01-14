const express = require('express');
const app = express();
var path = require('path');
var bodyParser = require('body-parser');
const Message = require('./modele/message');
var flash = require('express-flash-messages')
var session = require('express-session')
var format = require('date-format');
let jwt = require('jsonwebtoken');
let config = require('./config/config');
let middleware = require('./middleware/checktoken');

const cookie_token = require('./middleware/cookie_token_check')
var serialize = require('node-serialize');
const multer = require('multer');
const helpers = require('./middleware/filters_pictures');

// password crypt
const bcrypt = require('bcrypt');
const saltRounds = 10;

//JQUERY
const jsdom = require("jsdom");
const { JSDOM } = jsdom;


// passport
const passport = require('passport');
const passportConfig = require('./middleware/passport')(passport);

// passport
app.use(passport.initialize());
app.use(passport.session());

// cookie
var cookieParser = require('cookie-parser')
app.use(cookieParser())


//validator form
const {body, check, validationResult} = require('express-validator');

//session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'HSDouhoudhouefhbez',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

//flash msg
app.use(flash())

// moteur de rendu
app.set('view engine', 'ejs');

// static css
app.use(express.static(__dirname + '/public/css'));
app.use(express.static(__dirname + '/public/img'));
app.use(express.static(__dirname + '/uploads'));

// get data form
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


const cookieConfig = {
    httpOnly: true, // to disable accessing cookie via client side js
    //secure: true, // to force https (if you use it)
    maxAge: 1000000000, // ttl in ms (remove this option and cookie will die when browser is closed)
    signed: false // if you use the secret with cookieParser
};




//multer dowload file pictures 
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, __dirname + '/uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});



//*************** EXEMPLE DE VERIF TOKEN qui marche********************** */
// if(req.cookies.jwt != undefined || req.cookies.jwt != "" ){
//     try {
//         var test = req.cookies.jwt;
//         var decoded =  jwt.verify(test, config.secret);
//         console.log("---***DECODED***-----") // bar
//         console.log(decoded) // bar
//       }
//       catch(error) { 
//          return false;
//       }
// }

app.get('/', async (req,res) => {
    
    // pour update article 
    req.session.update_article = undefined;
    
    // on regarde si passport session existe
    if(req.session.passport != undefined){
        // si l'existe ces que l'utilisateur ces identifié
        if(req.session.passport.user != undefined){

            console.log('ENTER IN HOUSE')
            res.clearCookie('jwt');
            
            var id_user = req.session.passport.user;

             // créée token 
            Message.getUserByID(id_user, async function(msg){
                var data = msg;
                console.log('----------DATA------------------');

                var object = new Object();
                object.decoded = "GG-----------"
                object.id = data.id;
                object.username = data.email;
                object.firstname = data.firstname;
                object.lastname = data.lastname;
                object.role = data.role;

                req.session.data_users = object;
                                
                var token = jwt.sign({object: object}, config.secret,{ expiresIn: 60 * 60 });
                res.cookie('jwt',token,cookieConfig);
                res.locals.decoded = object.username;

           
       
            })           
        }

    }


    
            
    // example promise await cookie jwt
    // var test = new Promise((resolve, reject) => {
    //     setTimeout(() => resolve(req.cookies.jwt), 1000)
    // });

    // let result = await test;
    // console.log(result);
    


    Message.allArticles( (msg)=>{

       let articles = msg;

       res.render(__dirname + '/pages/articles.ejs',{articles : articles });
    })


})

app.get('/article/:id', function(req,res){

    req.session.update_article = undefined;

    if(req.session.data_users != undefined){

        if(req.session.data_users.username != undefined){

            res.locals.decoded = req.session.data_users.username;

        }
    }

    var id_article = req.params.id;

    if(req.session.flash){
        res.locals.flash = req.session.flash
        req.session.flash = undefined;
    }

    // si une req session token exist ces que l'utilisateur ces connecter avec de bons identifiants
  
    Message.messageByArticleID(id_article,function(msg){

 
        Message.articleByID(id_article,function(article){

                if(article != undefined){
                    res.render(__dirname + '/pages/form.ejs',{messages: msg , article: article });
                }else{

                    res.render(__dirname + '/pages/404.ejs');
                    
                }      
 
        })

        // console.log(msg)
       
    })

  
})



app.post('/article/:id', function(req,res){

    
   
    const message = req.body.message;

    req.session.flash = {};

    var id_article = req.params.id;
    
    if(message === ""){
       
        req.flash('error', 'Le champ est vide.')
        res.redirect('back');
 
    }else{

        
        if(req.session.data_users != undefined){

            if(req.session.data_users.username != undefined){


                Message.post(req.session.data_users.id,id_article,message, function(err){  
                    if(err) throw err;

                    req.flash('success', 'Success.')
                    res.redirect('back');
                });

            }else{
                req.flash('error', 'Vous devez être connectés pour commenter.')
                res.redirect('back');
            }
        }else{
            req.flash('error', 'Vous devez être connectés pour commenter.')
            res.redirect('back');
        }      

       
    }

})

app.get('/content/:id', function(req,res){

    req.session.update_article = undefined;
    
    if(req.session.data_users != undefined){

        if(req.session.data_users.username != undefined){

            res.locals.decoded = req.session.data_users.username;

        }
    }

    if(req.session.data_users != undefined){
        if(req.session.data_users.role === 'admin'){
        
            res.locals.autoriser = true;

        }
    }

    var get_id = req.params.id;

    Message.getByID(get_id, function(message){     
        message.date = format.asString('dd/mm/yyyy à hh:mm:ss', new Date(message.date));
        res.render(__dirname + '/pages/content_id.ejs',{message: message});
    })

})


app.get('/content/delete/:id', function(req,res){
    
    
    var get_id = req.params.id;

    if(req.session.data_users != undefined){
        if(req.session.data_users.role === 'admin'){
            Message.DeletebiID(get_id,function(){
                res.redirect('/');     
                 
            })
        }
    }else{
        res.redirect('back');
    }


})

////// Login /////////////////////////
app.get('/login', function(req,res){

    req.session.update_article = undefined;

    if(req.session.data_users != undefined){

        if(req.session.data_users.username != undefined){

            res.locals.decoded = req.session.data_users.username;

        }
    }

    if(req.session.flash){
        res.locals.flash = req.session.flash
        req.session.flash = undefined;
    }
    
    res.render(__dirname + '/pages/login.ejs');
})

app.post('/login', function(req,res,next){

    

    if(req.body.username === "" || req.body.password === ""){
        
        req.flash('error','Certains champs sont vides');
        res.locals.flash = req.session.flash;  
        res.redirect('/login');
              
    }else{
        next();
    }
   
    
    },passport.authenticate('local-login', {
            successRedirect : '/',
            failureRedirect : '/login',
            failureFlash: true
            })
            ,function(req,res){
                    
                console.log('jdpijiazdi')
    }

)


//////////////////////////////////

app.get('/admin', function(req,res){

    if(req.session.data_users != undefined){

        if(req.session.data_users.username != undefined){

            res.locals.decoded = req.session.data_users.username;

        }
    }

    if(req.session.data_users != undefined){
        if(req.session.data_users.username != undefined){
            if(req.session.data_users.role === 'admin'){
                res.render(__dirname + '/pages/admin.ejs');
                return true;
            }
        }
    }

    res.redirect('back');
    
})


app.post('/admin/update_article', function(req,res){

    const id_article = req.session.update_article[1];
    console.log("/////////////////////////////////");
    console.log(id_article);
    const title = req.body.title;
    const content = req.body.message;

    Message.updateArticlebyID(title,content,id_article, function(msg) {

        console.log()
        res.redirect('/');        
    })


})

app.get('/admin/create_article/', function(req,res){

    if(req.session.data_users != undefined){

        if(req.session.data_users.username != undefined){

            res.locals.decoded = req.session.data_users.username;

        }
    }

    if(req.session.error_form){
        console.log(req.session.error_form)
        res.locals.error_tab = req.session.error_form;
    }

    req.session.error_form = undefined;


    if(req.session.flash){
        if(req.session.flash.error != undefined || "")
        res.locals.error  = req.session.flash.error
        console.log();
    }

    // ici update de l'article
    if(req.session.update_article){
      
        if(req.session.update_article[0] === true){
           
            const id_article = req.session.update_article[1];

            Message.articleByID(id_article, (msg) => {

                res.locals.update_article = true

                res.render(__dirname + '/pages/admin/create_article.ejs',{msg: msg});
            })
            
        }
      
    }else{

        req.session.flash = {};
        res.render(__dirname + '/pages/admin/create_article.ejs');

    }



});

//update article

app.get('/admin/panel_ad/update/:id', function(req,res){

    var id = req.params.id;
    var data_array = [];
    data_array.push(true,id)
    req.session.update_article = data_array;
    console.log(req.session);
    
    res.redirect('/admin/create_article');

    
});

app.post('/admin/create_article',[
    check('message').not().isEmpty().withMessage('Champ vide').isLength({ min: 300 }).withMessage('Le champ doit contenir au minimum 300 caractères'),
    check('title').not().isEmpty().withMessage('Champ vide').isLength({ min: 3 }).withMessage('Le champ doit contenir au minimum 3 caractères').isLength({ max: 30 }).withMessage('Le champ doit contenir moins de 30 caractères')
                                ],
    function(req,res){

    console.log('post');

    req.session.flash = {};

    const message = req.body.message;
    const title = req.body.title;
  
  
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
       
        // console.log(errors.mapped());

            var tab = [];

            if(errors.mapped().title){
                if(errors.mapped().title.msg){
                tab.push(["Title",errors.mapped().title.msg]);
                }
            }
            if(errors.mapped().message){
                if(errors.mapped().message.msg){
                    tab.push(["Content",errors.mapped().message.msg]);
                }
            }
           

            req.session.error_form = tab;

            res.redirect('/admin/create_article');
        
        
    } else {
      
        const id_user = req.session.data_users['id']

        Message.postArticle(id_user,title,message,function(msg){

            res.redirect(`/`);
        })

        

    }

         

});

app.get('/admin/panel_ad', function(req,res){

    if(req.session.data_users != undefined){

        if(req.session.data_users.username != undefined){

            res.locals.decoded = req.session.data_users.username;

        }
    }
    
    req.session.update_article = undefined;

    if(req.session.flash && req.session.flash.success){
        res.locals.success = req.session.flash.success;
        req.session.flash = undefined
    }

    if(req.session.flash && req.session.flash.error){
        res.locals.error = req.session.flash.error;
        req.session.flash = undefined
    }

    Message.allArticles( (msg)=>{

        let articles = msg;
 
        res.render(__dirname + '/pages/admin/panel_ad.ejs',{articles : articles });
     })


});

app.get('/admin/panel_ad/delete/:id', function(req,res){

    console.log('delete item');
    const id = req.params.id;
    console.log(id);

    Message.DeletebyIDArticles(id,(err,results) => {

        if(err){
            req.flash('error','Article non supprimé ');
            res.redirect('/admin/panel_ad');
        } else{

            console.log('//////////////////////////')
            console.log(results);
    
            req.flash('success','Article supprimé ');
    
            res.redirect('/admin/panel_ad');
        }


    })
   

});




app.get('/inscription',function(req,res){

   
    if(req.session.data_users != undefined){

        if(req.session.data_users.username != undefined){

            res.locals.decoded = req.session.data_users.username;

        }
    }


    console.log(req.session);

    if(req.session.error_form){
        res.locals.error_tab  = req.session.error_form
        req.session.error_form= undefined;
    }

    if(req.session.flash){
        res.locals.flash = req.session.flash;
        req.session.flash = undefined;
    }

    
    res.render(__dirname + '/pages/inscription.ejs');
});



app.post('/inscription',function(req,res){
    console.log('POSTTTTTTTTTTTTTTTTTTTTT')
    // if(req.session.error_form){
    //     req.session.error_form = undefined;
    // }

    let email_regex = /^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,4}$/;
    let string_regex = /^[A-Za-z]+$/;


    let error = [];
    let all = [];
    let email = req.body.username;
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;
    let password = req.body.password;
    let verifpassword = req.body.verifpassword;

    all.push(email);
    all.push(firstname);
    all.push(lastname);
    all.push(password);
    all.push(verifpassword);

    for(var i = 0; i < all.length ; i ++){

        var error_tab = [];

        
        switch (i) {
            case 0:
                //email

                if(all[0] === ""){
                
                    error_tab.push("email","Champ vide.");
                
                }else{

                    if(email.length < 5 ){
                        error_tab.push("email","Email trop court.");
                    }

                    if(!email_regex.test(email) ){
                        error_tab.push("email","Email non valide.");
                    }
                }
                
                break;
            case 1:
                //firstname
                if(all[1] === ""){
                    console.log('firstname vide')
                    error_tab.push("firstname","Champ vide.");

                }else{

                    console.log('entrer firstame')
                    if(firstname.length < 2 ){
                        error_tab.push("firstname","Prénom trop court.");
                    }

                    if( !string_regex.test(firstname) ){
                        error_tab.push("firstname","Prénom non valide.");
                    }
                }
                
                break;
            case 2:
                //lastname
                if(all[2] === ""){
                
                    error_tab.push("lastname","Champ vide.");

                }else{

                    if(email.length < 2 ){
                        error_tab.push("lastname","Nom trop court.");
                    }

                    if( !string_regex.test(lastname) ){
                        error_tab.push("lastname","Nom non valide.");
                    }
                }
                
                break;
            case 3:
                //password
                if(all[3] === ""){
                
                    error_tab.push("password","Champ vide.");

                }else{
                    if(password.length < 5 ){
                        error_tab.push("password","Password trop court.");
                    }

                    if(password != verifpassword ){
                        error_tab.push("password","Les mots de passe ne correspondent pas.");
                    }
                }
                
                break;
            case 4:
                //password 2
                if(all[4] === ""){
                
                    error_tab.push("verifpassword","Champ vide.");

                }else{

                    if(verifpassword != password ){
                        error_tab.push("verifpassword","Les mots de passe ne correspondent pas.");
                    }
                }
                
                break;
        }

        // erreur commise enregistrer dans le tab
        if(error_tab.length != 0){
            error.push(error_tab);
        }


      
        
    }

    // ERREUR inscription
    console.log("++++++++++++++++++++++++" + error.length);
    if(error.length != 0){
        
      
        req.flash('error','Erreur Inscription');
        req.session.error_form = error; 
        console.log("------------------------------------");
        console.log(req.session.error_form);

        res.locals.error_tab = req.session.error_form;
        res.redirect('/inscription');

    }else{

        Message.checkExistEmail(email,function(msg){

            if(msg === undefined || msg === ""){

                bcrypt.genSalt(saltRounds, function(err, salt) {
                    bcrypt.hash(password, salt, function(err, hash) {
                        
                        if(err) throw err;

                        let hash_pass = hash;

                        Message.Register(email,hash_pass,firstname,lastname);
                        req.flash('success','Inscription réussie');
                        res.redirect('/inscription');

                       

                    });
                });


            }  else{
                req.flash('error','Email dejà inscrit.');
                res.redirect('/inscription');
            } 
             
        })

    }

    
})


app.get('/logout', function(req, res){
    req.logout();
    req.session.destroy(function (err) {
        res.clearCookie('jwt');
        res.redirect('/'); //Inside a callback… bulletproof!
      });

});


app.get('*', function(req, res){
    res.render(__dirname + '/pages/404.ejs');
});
  

app.listen(7500);
console.log("port 7500");