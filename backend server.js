//used express mysql
//this is the code i run with node server.js
const express = require('express');
const app=express();
const mysql = require('mysql');
app.use(express.json());
// const cors=require('cors');
// app.use(cors()); heroku doesn't have that, so instead i added a config middleware
//Cors Configuration - Start
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  next()
})
//Cors Configuration - End

//changeable objects to make it run on different machine
const PORT = 8084;//hardcoded port, also hardcoded as backend link in top level frontend page
let connectionObject={
    host     : 'localhost',
    user     : 'root',
    password : 'pass',
    database:   'Miki_Feedback'
}
// function createTablesIfNotExist(){
//     let connection = mysql.createConnection(connectionObject);
//     connection.connect(function(err) {
//         if (err) return err;
//       });
//     connection.query(`CREATE DATABASE IF NOT EXISTS Miki_Feedback;`);
//     connection.query('USE Miki_Feedback');
//     var sql = "CREATE TABLE IF NOT EXISTS messages (id INT(11) NOT NULL primary key AUTO_INCREMENT, iat TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, name VARCHAR(32), email VARCHAR(32), message VARCHAR(255))";  
//         connection.query(sql, function (err, result) {  
//         if (err) return err;  
//     });   
    
//     //this function should maybe run once on the server so is left here for testing purposes on different computers
//     //remember to add a database line in connection object if you remove this
//     //either end connection here and reopen it every request or just enable it for the whole lifecycle of server and db;

//     connection.end();
//     // return connection;
    
// }
// createTablesIfNotExist(); //should be commented out after first connection and until changed database settings


app.listen(process.env.PORT || PORT, () => {
    // console.log(`app running on port: ${port}`)
})

//list of all feedbacks
app.get("/feedbacks",(req,res)=>{
    let sqlconnection = mysql.createConnection(connectionObject);
    sqlconnection.connect(function(err) {
        if (err) {
          // console.log(err); 
          return res.status(500).send({err:"Database is currently down"});}
      });
    sqlconnection.query('select * from messages', function (err, result, fields) {
        if (err) throw err;
        // console.log(result,fields);
        res.status(200).send(result);
        return sqlconnection.end();
      });
   
})
//input one feedback
app.post("/feedback",(req,res)=>{
    let values=[req.body.name,req.body.email,req.body.message]; 
    if(!(values && values[0] && values[1] && values[2])) return res.status(400).send({"err":"empty fields","values":values});
    

    let sqlconnection = mysql.createConnection(connectionObject);
    sqlconnection.connect(function(err) {
        if (err) {
          // console.log(err);
           return res.status(500).send({err:"Database is currently down"});}
      });
    

    let query = "INSERT INTO messages (name, email, message ) VALUES ?";
    sqlconnection.query(query, [[values]], function (err, result) {
        if (err) {
          // console.log(err); 
          return res.status(500).send({err:"Error while submitting your request"});}
        res.status(200).send({ok:"success posting"});
        // console.log("Insert success: " + result);
      });
    return sqlconnection.end();
})

