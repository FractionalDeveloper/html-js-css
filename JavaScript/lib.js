// Station 1: Strings
let name = "Max";
let nachname = 'Mustermann';
let vollständigerName = name + " " + nachname;
console.log(vollständigerName);


// Station 2: Zahlen
let ganzzahl = 42;
let kommazahl = 3.14;
let ergebnis = ganzzahl + kommazahl;
console.log(ergebnis);


// Station 3: Booleans
let istWahr = true;
let istFalsch = false;
console.log(istWahr && istFalsch); // UND
console.log(istWahr || istFalsch); // ODER

// Station 4: Arrays
let farben = ["rot", "grün", "blau"];
console.log(farben[0]); // Erstes Element
farben.push("gelb"); // Neues Element hinzufügen

function zeigeVollständigenNamen(){
    console.log(vollständigerName);
}

function zeigeZahlenErgebnis(){
    console.log(ergebnis);
}

function zeigeWahrheitswerte(){
    console.log(istWahr && istFalsch);       // Semikolen ist optional
    console.log(istWahr || istFalsch)
}

function fügeFarbeHinzu(){
    let inputFeld = document.getElementById("inputForColours")
    farben.push(inputFeld.value)
    console.log(farben)
    
}