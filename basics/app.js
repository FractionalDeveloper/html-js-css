// DOM-Elemente auswählen
const inputSection = document.getElementById('inputSection');
const resultSection = document.getElementById('resultSection');
const ageInput = document.getElementById('ageInput');
const checkButton = document.getElementById('checkButton');

// Event-Listener für den Button
checkButton.addEventListener('click', function () {
    console.log(ageInput.value);
    inputSection.classList.add("hidden");
    const age = ageInput.value;
    const isAllowed = checkEntryTime(age);
    console.log(isAllowed);
    showResult(age, isAllowed);
    ageInput.value = "";

});

ageInput.addEventListener('change', function () {
    const age = ageInput.value;
    const isAllowed = checkEntryTime(age);
    console.log(isAllowed);
    showResult(age, isAllowed);
});

// Funktion zur Überprüfung der Eintrittszeit
function checkEntryTime(age) {
    const currentTime = new Date().getHours;
    if (age < 12) {
        if (currentTime >= 8 && currentTime < 12) {
            return true;
        }
        else {
            return false;
        }
    } else if (age >= 12 && age <= 17) {
        if (currentTime >= 12 && currentTime < 16) {
            return true;
        } else {
            return false;
        }
    } else {
        return true;
    }
}

// Funktion zum Anzeigen des Ergebnisses
function showResult(age, isAllowed) {
    let ageGroup;
    let resultHtml;
    if (!age) {
        resultHtml = "ungültig";
        foramtResultHtml(resultHtml, altersgruppe);
        return;
    }
    
    if (age < 12) {
        ageGroup = 'child';
    } else if (age >= 12 && age <= 17) {
        ageGroup = 'teen';
    } else {
        ageGroup = 'adult';
    }

    if (isAllowed) {
        resultHtml = "yeeey du darfst rein";
    }
    else
    {
        resultHtml = "nöööööööö";
    }

    foramtResultHtml(resultHtml, altersgruppe);

    resultHtml = `<div class="${altersgruppe}">${resultHtml}</div>`;
    console.log("ich bin im showresulte " + resultHtml);
    resultSection.innerHTML = resultHtml;
    resultSection.classList.remove("hidden");

}