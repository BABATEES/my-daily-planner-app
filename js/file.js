alert("Wow")
var currentDay = $('#currentDay');

var colorcode = $('.colorstyle');

console .log(colorcode)

function displayDate(){
var current = moment().format('dddd, MMMM Do');
currentDay.text(current);
console.log(current)

}

displayDate();

