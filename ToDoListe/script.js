// DOM-Elemente für die Altersprüfung auswählen
const inputSection = document.getElementById('inputSection');
const resultSection = document.getElementById('resultSection');
const ageInput = document.getElementById('ageInput');
const checkButton = document.getElementById('checkButton');

// Event-Listener für den Button
checkButton.addEventListener('click', function() {
    // Wert aus dem Eingabefeld holen
    const age = parseInt(ageInput.value);
    
    // Überprüfen, ob ein gültiges Alter eingegeben wurde
    if (isNaN(age) || age <= 0 || age > 120) {
        alert('Bitte gib ein gültiges Alter ein (1-120).');
        return;
    }
    
    // Eingabebereich ausblenden
    inputSection.classList.add('hidden');
    
    // Ergebnis anzeigen
    const isAllowed = checkEntryTime(age);
    showResult(age, isAllowed);
    
    // Ergebnisbereich einblenden
    resultSection.classList.remove('hidden');
});

// Funktion zur Überprüfung der Eintrittszeit
function checkEntryTime(age) {
    // Aktuelle Uhrzeit ermitteln
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
    // Altersgruppe bestimmen
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
    
    // Aktuelle Uhrzeit formatieren
    const now = new Date();
    const currentTime = now.getHours() + ':' + (now.getMinutes() < 10 ? '0' : '') + now.getMinutes();
    
    // HTML für das Ergebnis erstellen
    let resultHTML = `
        <div class="${ageGroup}">
            <h2>Ergebnis der Prüfung</h2>
            <p>Du bist ${age} Jahre alt.</p>
            <p>Für deine Altersgruppe ist der Eintritt ${timeRange} erlaubt.</p>
            <p>Aktuelle Uhrzeit: ${currentTime} Uhr</p>
            <p class="${isAllowed ? 'allowed' : 'denied'}">
                ${isAllowed ? 'Eintritt gestattet! ✅' : 'Eintritt verweigert! ❌'}
            </p>
        </div>
    `;
    
    // HTML dem Ergebnisbereich hinzufügen
    resultSection.innerHTML = resultHTML;
}