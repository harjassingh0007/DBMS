var mysql = require('mysql');
var fs = require('fs');
var catalog =  require('./lib_bookCatalog.js').catalog;

var main = function(args){
	var input = catalog.get_user_input(args);
	var result = catalog.get_result(input);
}

main(process.argv.slice(2,process.argv.length));