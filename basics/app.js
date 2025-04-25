// DOM-Elemente auswählen
const inputSection = document.getElementById('inputSection');
const resultSection = document.getElementById('resultSection');
const ageInput = document.getElementById('ageInput');
const checkButton = document.getElementById('checkButton');


// Event-Listener für den Button
checkButton.addEventListener('click', function () {
    const age = parseInt(ageInput.value);

    if (isNaN(age)) {
        alert('Bitte gib dein gültiges Alter ein.')
        return;
    }
    checkEntryTime(age);

});

// Funktion zur Überprüfung der Eintrittszeit
function checkEntryTime(age) {
    const now = new Date();
    const hour = now.getHours();

    if (age < 12) {
        return hours >= 8 && hours < 12;
    }
    else if (age < 18) {
        return hours >= 12 && hours < 16;
    }
    else {
        return true;
    }

}

// Funktion zum Anzeigen des Ergebnisses
function showResult(age, isAllowed) {
    let ageGroup;
    let timeRange;

    if (age < 12) {
        ageGroup = 'child';
        timeRange = '8:00 Uhr bis 12:00 Uhr';
    } else if (age < 18) {
        ageGroup = 'teen';
        timeRange = '12:00 Uhr bis 16:00 Uhr';
    } else {
        ageGroup = 'adult';
        timeRange = 'jederzeit';
    }

    let resultHTML = `
    <div class="${ageGroup}">
    <h2>Ergebis der Prüdung</h2>
    <p>Du bist ${age} Jahre alt.</p>
    <p>Für deine Altersgruppe
    `
}
