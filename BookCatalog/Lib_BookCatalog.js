var mysql = require('mysql');
var connection = mysql.createConnection({
    host     :  'localhost',    
    port     :  3306,           
    user     :  'harjas',         
    password :  'H@rjas07', 
    database :  'test'
});

var catalog = {};


catalog.convert_string_to_object=function(input){
  var array_of_record = input.split(';');
  var object = {};
  array_of_record.forEach(function(text){
	single_record = text.split(':');
	if(single_record[0].replace(/ /g,"") == 'isbn') object.isbn = single_record[1].trim();
	if(single_record[0].replace(/ /g,"") == 'price') object.price = single_record[1].trim();;
	if(single_record[0].replace(/ /g,"") == 'author') object.author = single_record[1].trim();;
	if(single_record[0].replace(/ /g,"") == 'title') object.title = single_record[1].trim();;
	if(single_record[0].replace(/ /g,"") == 'publisher') object.publisher = single_record[1].trim();;
  });
  return object;
};

var is_list_option = function(text){
	return text == "list";
};

var is_add_option = function(text){
	return text == "add";
};
var is_remove_option = function(text){
	return text == "remove";
};

var is_search_option = function(text){
	return text == "search";
};
var is_help_option = function(text){
	return text == "--h" || text == "-help";
};

catalog.get_user_input = function(args){
	var result = {
		list:false,
		add:false,
		remove:false,
		search:false,
		help:false};
	result.list = args.some(is_list_option);
	result.add = args.some(is_add_option);
	result.remove = args.some(is_remove_option);
	result.search = args.some(is_search_option);
	result.help = args.some(is_help_option);
	args.some(function(text){
		if(text == 'update')
			return result.update = true;
	});
	if(result.update){
		if(args.length==2)
			result.update_record = args[1];
	}
	if(result.add){
		if(args[1]){
			result.add_record = args[1]
		};
	};
	if(result.remove){
		if(args[1]){
			if(args[1].slice(0,5)=="-isbn")
				result.isbn_number = args[1].slice(5,args[1].length)
		};
	};
	if(result.search){
		if(args.length==2)
			result.find_record = args[1];
		if(args.length>2){
			if(args[1] == '-isbn')
				result.find_isbn = args[2];
			if(args[1] == '-author')
				result.find_author = args[2];
			if(args[1] == '-title')
				result.find_title = args[2];
			if(args[1] == '-publisher')
				result.find_publisher = args[2];
		};
	};
	return result;
};

ConvertToString = function(data){
	var temp = [];
	temp.push(data.ISBN,data.PRICE,data.TITLE,data.AUTHOR,data.PUBLISHER);
	console.log(temp.join("\t"));
}

catalog.print_record = function(){
	connection.connect();
	var result;
	connection.query('select * from BookCatalog',function(err,row){
		if(err) throw err;
		row.forEach(function(elements){
			ConvertToString(elements);
		})
	});
	connection.end();
}

catalog.addNewBook = function(bookDetails){
	connection.connect();

	var BookObject = catalog.convert_string_to_object(bookDetails);

	connection.query("INSERT INTO BookCatalog \n VALUES('"+BookObject.isbn+"',"+(+BookObject.price)
		+",'"+BookObject.title+"','"+BookObject.author+"','"+BookObject.publisher+"')");
	connection.query('commit;');
	console.log("ADDED SUCCESSFULLY");
	connection.end();
	return;
}

catalog.removeRecord = function(isbn){
	connection.connect();
	connection.query("DELETE FROM BookCatalog WHERE ISBN = '"+isbn+"'");
	console.log("DELETED SUCCESSFULLY")
	connection.commit();
	connection.end();
	return;
}

catalog.search_record = function(record){
	connection.connect();
	connection.query("SELECT * FROM BookCatalog WHERE ISBN = '"+record+"' or PRICE = "+record+" "
		+"or TITLE = '"+record+"' or AUTHOR = '"+record+"' or PUBLISHER = '"+record+"';",function(err,row){
			if(err) throw err;
			if(row.length == 0){
				console.log("NO SUCH RECORD");
				return;
			}
			console.log(row);
		});
	connection.end();
}

catalog.get_result = function(input){
	if(input.list){
		var head = "ISBN\tPRICE\tTITLE\tAUTHOR\tPUBLISHER";
		console.log(head);		
		catalog.print_record();
	}
	if(input.add){
		if(input.add_record){
			catalog.addNewBook(input.add_record);
			return;
		}
		console.log("PLEASE ADD NEW RECORD");
	}
	if(input.remove){
		if(input.isbn_number){
			catalog.removeRecord(input.isbn_number);
		}
		console.log("ENTER RECORD TO DELETE");
	}
	if(input.search){
		if(input.find_record){
			catalog.search_record(input.find_record);
		}
		console.log("ENTER RECORD TO SEARCH");

	}
}

exports.catalog = catalog
