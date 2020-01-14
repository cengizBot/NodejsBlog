const connection = require('../config/db');
var format = require('../node_modules/date-format');

class Message {

    constructor(msg){
        this.msg = msg
    }

    static checkExistEmail(email,cb){
        console.log('---------------------------')
        connection.query('SELECT * FROM users WHERE email = ?  LIMIT 0,1', [email] , function (error, results, fields) {
            if (error) throw error;
            
            cb(results[0]);
        });
    }

    //post Article
    static postArticle(id_user,title,content,cb){

        var random = Math.floor(Math.random() * 100); 
        var pictures = "https://picsum.photos/200/300?random="+random;

        connection.query('INSERT INTO articles set id_user = ? , title = ? , date = ? , content = ? ,  picture = ?', [id_user,title,new Date(),content,pictures] , function (error, results) {
            if (error) throw error;
        
            return cb(results);
        });
    }

    // post commentaire pour article
    static post(user_id,id_articles,content,cb){
       
        id_articles = parseInt(id_articles, 10);

        
        connection.query('INSERT INTO messages set user_id = ? , id_articles = ? , content = ? , date = ?', [user_id, id_articles , content , new Date()] , function (error, results, fields) {
            if (error) throw error;
            console.log('success posted data');
            cb(results[0]);
        });
    }

    static getByID(id,cb){
        connection.query('SELECT * FROM messages WHERE id = ? LIMIT 0,1', [id] , function (error, results, fields) {
            if (error) throw error;
        
            console.log(results[0]);
            return cb(results[0]);
        });
    }

    static getUserByID(id,cb){
        connection.query('SELECT * FROM users WHERE id = ? LIMIT 0,1', [id] , function (error, results) {
            if (error) throw error;
        
            return cb(results[0]);
        });
    }

    static articleByID(id,cb){

        connection.query('SELECT * FROM articles WHERE id = ? LIMIT 0,1', [id] , function (error, results) {
            if (error) throw error;

            var results_L = results.length
            for(var i = 0; i < results_L; i ++){
                results[i].date = format.asString('dd/MM/yyyy à hhh mm', new Date(results[i].date ));
            };
            
            return cb(results[0]);
          
        });
    }

    static allArticles(cb){
        connection.query('SELECT * FROM articles ', function (error, row) {
            if (error) throw error;

            var row_L = row.length;

            for(var i = 0; i < row_L; i ++){
                row[i].date = format.asString('dd/MM/yyyy à hhh mm', new Date(row[i].date ));
            };

            for(var i = 0; i < row_L; i ++){
                var content_L =  row[i].content.length;
                var tab = "";
                for(var j = 0; j < 300; j ++){
                
                    if(j === 60){
                        tab += "\n";
                    }
                    if(row[i].content[j] === "" || row[i].content[j] === " " ){
                        
                        tab += " ";
                    }else{
                        tab += row[i].content[j];
                    }
                   

                }

                tab += " . . . . . .";
                
                row[i].content = tab;
     
            };

            cb(row)
        
        })


    }

    static messageByArticleID(id_article,cb){
        connection.query('SELECT * FROM users,messages WHERE messages.user_id = users.id AND messages.id_articles = ?  ',[id_article], function (error, row) {
            if (error) throw error;
            
            var row_L = row.length;

            for(var i = 0; i < row_L; i ++){
                row[i].date = format.asString('dd/MM/yyyy à hh:mm min', new Date(row[i].date ));
            }
            ;

            return cb(row);
            
        });
    }

    static DeletebiID(id,cb){
        connection.query('DELETE FROM messages WHERE id = ? ', [id] , function (error, results, fields) {
            if (error) throw error;
            console.log('delete success');

            return cb(results);
          
        });
    }

    static updateArticlebyID(title,content,id,cb){
        connection.query('UPDATE articles set title = ? , content = ? WHERE id = ? ', [title,content,id] , function (error, results, fields) {
            if (error) throw error;
            console.log('update success');

            return cb();
          
        });
    }

    static DeletebyIDArticles(id,cb){
        
        //on vérifie d'abbord si l'id de l'article existe
        connection.query('SELECT * FROM articles WHERE id = ? ', [id] , function (error, results) {
            
            var find = results.length


            if(find != 0){

                console.log('-------------------------------------')     
                // on supprime les commentaires de l'article
                connection.query('DELETE FROM messages WHERE id_articles = ? ', [id] , function (error, results) {
                    if (error) throw error;
                    console.log('delete comm success');

                    // return cb(results);
                
                });

                // on supprime l'article
                connection.query('DELETE FROM articles WHERE id = ? ', [id] , function (error, results) {
                    if (error) throw error;
                    console.log('delete article success');

                    return cb();
                
                });

            }else{
                
                return cb('false');
            }

           
          
        });

    }

    static Register(email,password,firstname,lastname) {

        connection.query("INSERT INTO users (email,password,firstname,lastname,role) VALUES (?,?,?,?,?)" , [email,password,firstname,lastname,'user'], function(err, results) {

            if(err) throw err;

            return true;

        });

    }

}


module.exports = Message;