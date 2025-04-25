// Station 1: Strings
let name = "Max";
let nachname = 'Mustermann';
let vollständigerName = name + " " + nachname;
console.log(vollständigerName);

function zeigeVollständigerName() {
    console.log(vollständigerName);
}

// Station 2: Zahlen
let ganzzahl = 42;
let kommazahl = 3.14;
let ergebnis = ganzzahl + kommazahl;
console.log(ergebnis);

function zeigeErgebnisse() {
    console.log(ergebnis);
}

// Station 3: Booleans
let istWahr = true;
let istFalsch = false;
console.log(istWahr && istFalsch); // UND
console.log(istWahr || istFalsch); // ODER

function wahl() {
    console.log("UND: " + (istWahr && istFalsch) + "\nODER: " + (istWahr || istFalsch));
}

// Station 4: Arrays
let farben = ["rot", "grün", "blau"];
console.log(farben[0]); // Erstes Element
farben.push("gelb"); // Neues Element hinzufügen

function fügeFarbenHinzu() {
    let inputFeld = document.getElementById("inputForColours")
    let neueFarbe = inputFeld.value;

    farben.push(neueFarbe);
    console.log(farben);
    inputFeld.value = "";
}