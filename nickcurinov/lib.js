// Station 1: Strings
let name = "Nick";
let nachname = 'Curinov';
let vollständigerName = name + " " + nachname;
function nameAnzeigen(name, nachname) {
    console.log(vollständigerName);
}
// Station 2: Zahlen
let ganzzahl = 42;
let kommazahl = 3.14;
let ergebnis = ganzzahl + kommazahl;
function zahlAnzeigen(ergebnis){
    console.log(ergebnis);
}



// Station 3: Booleans
let istWahr = true;
let istFalsch = false;
function zeigeBool(istWahr,istFalsch){
    console.log(istWahr && istFalsch); // UND
    console.log(istWahr || istFalsch); // ODER
}


// Station 4: Arrays
let farben = ["rot", "grün", "blau"];
let neueFarbe;
function neueFarbeHinzufügen() {
    laengeArray = farben.length;
    neueFarbe = document.getElementById("inputForColours");
    let nFarbe=neueFarbe.value
    farben.push(nFarbe); // Neues Element hinzufügen
    laengeArray = farben.length;
    farben.forEach((element) => console.log(element));
}
