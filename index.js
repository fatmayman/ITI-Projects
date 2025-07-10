// Q2
let myNum = 10;
console.log(myNum); 
myNum = "Ten";
console.log(myNum); 


// Q3

function addNumbers( a, b) {
  console.log(a + b);}
addNumbers( 7, 7); 


// Q4

let num = -3;

if (num > 0) {
  console.log("Positive");
} else if (num < 0) {
  console.log("Negative");
} else {
  console.log("Zero");
}


// Q7

let color = "violet";

switch (color) {
  case "red":
    console.log("red" );
    break;
  case "violet":
    console.log( "violet");
    break;
  case "blue":
    console.log( "blue ");
    break;
  default:
    console.log( "Other color" );}


// Q8 

let notANumber = "hello" * 2;
let emptyValue = null;
let noValue;

console.log(notANumber); 
console.log(emptyValue); 
console.log(noValue); 


// Q9

function convertToNumber(str) {
  let result = Number(str);
  console.log(result);
  if (isNaN(result)) {
    console.log("NaN");}
else {
    console.log("Valid number");
  }
}
convertToNumber("114"); 
convertToNumber("aaa"); 

// Q10

let person = { name: "Ahmed", age: 20 };
console.log(person.gender);


// Q11

function sayHello() {
  console.log("Hello!");}
sayHello();


// Q12

let number = 4;
if (number > 0) {
  if (number % 2 === 0) {
    console.log("Number is positive and even");
  } else {
    console.log("Number is positive but odd");
  }
} else {
  console.log("Number is not positive");
}

// 
var i = 1;

while (i <= 10) {
  if (i === 4) continue;
  i++;
  if (i === 9) break;
}
console.log(i);

// 
let u = 1;
while (u <= 10) {
  if (u === 5) break; 
  console.log(u);
  u++; }

var d = new Date();
console.log(d);
console.log(d.getUTCMonth());
console.log(d.getDay());