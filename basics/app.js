// DOM-Elemente auswählen
const inputSection = document.getElementById('inputSection');
const resultSection = document.getElementById('resultSection');
const ageInput = document.getElementById('ageInput');
const checkButton = document.getElementById('checkButton');



// Event-Listener für den Button
checkButton.addEventListener('click', function() {
    const age = ageInput.value;
    const message = checkEntryTime(age);
    showResult(age, message);

    inputSection.style.display = "none";
});


// Funktion zur Überprüfung der Eintrittszeit
function checkEntryTime(age) {
    const currentHour = new Date().getHours();

    if (age < 12) {
        if (currentHour >= 8 && currentHour < 12) {
            return "Du darfst eintreten!";
        } else {
            return "Du darfst nicht eintreten!";
        }
    } else if (age >= 12 && age <= 17) {
        if (currentHour >= 12 && currentHour < 16) {
            return "Du darfst eintreten!";
        } else {
            return "Du darfst nicht eintreten!";
        }
    } else if (age >= 18) {
        return "Du darfst Boobis sehen 🍑";
    } else {
        return "Ungültiges Alter!";
    }
}

function showResult(age, message) {
    resultSection.classList.remove("hidden");
    resultSection.innerHTML = `<strong>Alter: ${age}</strong><br><p>${message}</p>`;
}
