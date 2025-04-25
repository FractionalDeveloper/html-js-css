// DOM-Elemente auswählen
const inputSection = document.getElementById('inputSection');
const resultSection = document.getElementById('resultSection');
const ageInput = document.getElementById('ageInput');
const checkButton = document.getElementById('checkButton');

// Event-Listener für den Button
checkButton.addEventListener('click', function () {
    const age = parseInt(ageInput.value);

    if (isNaN(age) || age <= 0 || age > 120) {
        alert(`Bitte gibt ein gültiges Alter ein. Von 1 bis 120.`)
        return;
    }

    const isAllowed = checkEntryTime(age);

    showResult(age, isAllowed)

    resultSection.classList.remove('hidden');
});

// Funktion zur Überprüfung der Eintrittszeit
function checkEntryTime(age) {
    const now = new Date();
    const hours = now.getHours();

    // Regeln basierend auf dem Alter
    if (age < 12) {
        // Kinder: Eintritt zwischen 8:00 und 12:00 Uhr
        return hours >= 8 && hours < 12;
    } else if (age < 18) {
        // Jugendliche: Eintritt zwischen 12:00 und 16:00 Uhr
        return hours >= 12 && hours < 16;
    } else {
        // Erwachsene: Eintritt jederzeit
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
            <h2>Ergebnis der Prüfung</h2>
            <p>Du bist ${age} Jahre alt.</p>
            <p>Für deine Altersgruppe ist der Eintritt ${timeRange} erlaubt.</p>
            <p class="${isAllowed ? 'allowed' : 'denied'}">
                ${isAllowed ? 'Eintritt gestattet! ✅' : 'Eintritt verweigert! ❌'}
            </p>
        </div>
    `;
    resultSection.innerHTML = resultHTML;
}