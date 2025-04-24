// Station 1: Strings
let name = "Max";
let nachname = 'Mustermann';
let vollständigerName = name + " " + nachname;
console.log(vollständigerName);
function zeigeVollständigerName() {
    alert(vollständigerName);
}

// Station 2: Zahlen
let ganzzahl = 42;
let kommazahl = 3.14;
let ergebnis = ganzzahl + kommazahl;
console.log(ergebnis);
function zeigeErgebnisse() {
    alert(ergebnis);
}


function wahl() {
    console.log("UND Verknüpfung" + (istWahr && istFalsch) + " links müsste falsch rauskommen")
    console.log("ODER Verknüpfung" + (istWahr || istFalsch) + " links müsste richtig rauskommen")
}

// Station 3: Booleans
let istWahr = true;
let istFalsch = false;
console.log(istWahr && istFalsch); // UND
console.log(istWahr || istFalsch); // ODER

// Station 4: Arrays

let farben = ["rot", "grün", "blau"];
console.log(farben[0]); // Erstes Element
farben.push("gelb"); // Neues Element hinzufügen