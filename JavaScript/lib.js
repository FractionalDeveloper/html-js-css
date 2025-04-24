// Station 1: Strings
function vollstaendigername(){
let name = "Max";
let nachname = "Mustermann";
let vollständigerName = name + " " + nachname;
console.log(vollständigerName);
}


// Station 2: Zahlen
function ergebnis(){
let ganzzahl = 42;
let kommazahl = 3.14;
let ergebnis = ganzzahl + kommazahl;
console.log(ergebnis);
}

// Station 3: Booleans
function wahroderfalsch(){
let istWahr = true;
let istFalsch = false;
console.log(istWahr && istFalsch); // UND
console.log(istWahr || istFalsch); // ODER
}

// Station 4: Arrays
function allefarben(){
let ifarben = document.getElementById("inputForColours").value;

console.log(farben[0]); // Erstes Element
farben.push(ifarben); // Neues Element hinzufügen 
console.log(farben);
}
let farben = ["rot", "grün", "blau"];
