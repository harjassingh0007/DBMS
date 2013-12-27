var mysql = require('mysql');

var connection = mysql.createConnection({
    host     :  'localhost',    
    port     :  3306,           
    user     :  'harjas',         
    password :  'H@rjas07', 
    database :  'test'
});

connection.connect();

connection.query('select * from BookCatalog',function(err,row){
	if(err) throw err;
	console.log(row);
})
connection.end();