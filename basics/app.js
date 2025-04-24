// DOM-Elemente auswählen
const inputSection = document.getElementById('inputSection');
const resultSection = document.getElementById('resultSection');
const ageInput = document.getElementById('ageInput');
const checkButton = document.getElementById('checkButton');

// Event-Listener für den Button
checkButton.addEventListener('click', function() {
    console.log(ageInput.value);
    const age = ageInput.value;
    const isAllowed = checkEntryTime(age)
    showResult(age, isAllowed);
    ageInput.value = "";
});

// Funktion zur Überprüfung der Eintrittszeit
function checkEntryTime(age) {
const currentHour = newDate().getHours();
if(age >= 1 && age < 12)
{
    if(currentHour >= 8 || currentHour <= 12)
    {
        return true;
    }
    else
    {
        return false;
    }
}
else if (age >=12 && age <= 17) 
{
    if(currentHour >= 12 || currentHour <= 16)
    {
        return true;
    }
    else
    {

        return false;
    }
} 
else 
{      
    return false;
}
}

// Funktion zum Anzeigen des Ergebnisses
function showResult(age, isAllowed) 
{
    let resultHtml = `<h2>${age}</h2>`
}

resultSection.innerHTML= resultHtml;
resultSection.classList.remove("hidden");