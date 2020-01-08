var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pengampu"
});

con.connect(function (err){
    if(err) throw err;
    console.log("Database Connect")
});

module.exports = con;