var fs = require('fs');
var content = fs.readFileSync('bank.csv','utf-8');
var lines = content.split('\r\n');

var structure = {SNo:'',PName:'',Ammount:''};
var names = [];
var serials = [];
var Balance = [];
var totalBalance = 0;
lines.forEach(function(line){
	names.push((line.split(',')[1]));
})
lines.forEach(function(line){
	serials.push((line.split(',')[0]));
})
lines.forEach(function(line){
	var current = +(line.split(',')[2]);
	Balance.push(current);
	totalBalance += current;
});
structure.SNo = serials.join(',');
structure.PName = names.join(',');
structure.Ammount = Balance.join(',');
console.log(structure);

console.log('\nTotal Balance is:--',totalBalance);