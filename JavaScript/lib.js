// Station 1: Strings
function zeigeVollstaendigenNamen() {
    let name = "Max";
    let nachname = 'Mustermann';
    let vollständigerName = name + " " + nachname;
    console.log(vollständigerName);
}


// Station 2: Zahlen
function zeigeZahlenErgebnis() {
    let ganzzahl = 42;
    let kommazahl = 3.14;
    let ergebnis = ganzzahl + kommazahl;
    console.log(ergebnis);
}

// Station 3: Booleans
function zeigeWahrUndFalsch() {
    let istWahr = true;
    let istFalsch = false;
    let ergebnis = istWahr && istFalsch; // UND
    console.log(ergebnis);
}

// Station 4: Arrays
let farben = ["rot", "grün", "blau"];
console.log(farben[0]); // Erstes Element
farben.push("gelb"); // Neues Element hinzufügen

function farbeHinzufuegenUndAusgeben() {
    let input = document.getElementById("inputForColors");
    let neueFarbe = input.value.trim(); // Leerzeichen entfernen
    if (neueFarbe == "") {
        alert("Bitte geben Sie eine Farbe ein.");
        input.value = ""; // Eingabefeld leeren
        return;
    }
    else if (farben.includes(neueFarbe)) {
        alert("Diese Farbe ist bereits vorhanden.");
        input.value = ""; // Eingabefeld leeren
        return;
    }
    else if (farben) {
        farben.push(neueFarbe);
        input.value = ""; // Eingabefeld leeren
    }
    else {
        alert("Unbekannter Fehler.");
        input.value = ""; // Eingabefeld leeren
        return;
    }
    console.log(farben);
}