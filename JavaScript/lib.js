// Station 1: Strings
let name = "Max";
let nachname = 'Mustermann';
let vollständigerName = name + " " + nachname;
console.log(zeigeVollständigerName);
function zeigeVollständigerName(){
    alert(vollständigerName)
}

// Station 2: Zahlen
let ganzzahl = 42;
let kommazahl = 3.14;
let ergebnis = ganzzahl + kommazahl;
console.log(ergebnis);
function zeigeErgebnis(){
    console.log(ergebnis)
}


// Station 3: Booleans
let istWahr = true;
let istFalsch = false;
console.log(istWahr && istFalsch); // UND
console.log(istWahr || istFalsch); // ODER
function zeigeWahrOderFalsch()
{
console.log("UND Verknuepfung " + (istWahr && istFalsch) + " links muesste false rauskommen")
console.log("ODER Verknuepfung " + (istFalsch || istFalsch) + " links muesste true rauskommen")
}

// Station 4: Arrays
function alleFarben(){
    let ifarben = document.getElementById("inputForColours")


console.log(farben[0]); // Erstes Element
farben.push("gelb"); // Neues Element hinzufügen
console.log(farben);
}
let farben = ["rot", "grün", "blau"];