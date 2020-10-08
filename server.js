const express= require("express");
const mysql = require("mysql");

const app = express();

const PORT = process.env.PORT || 8080; 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "RamblingFun2020!",
    database: "employeeTracker_db"
});
  
  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });


  app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
  