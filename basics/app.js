// DOM-Elemente auswählen
const inputSection = document.getElementById('inputSection');
const resultSection = document.getElementById('resultSection');
const ageInput = document.getElementById('ageInput');
const checkButton = document.getElementById('checkButton');

// Event-Listener für den Button
<<<<<<< HEAD
checkButton.addEventListener('click', function() {
    const age = parseInt(ageInput.value); // String in Zahl umwandeln

    if (!age || age <1 || age > 120) {
        alert("Bitte gib ein gültiges Alter ein!");
        return;
    }

    const result = checkEntryTime(age);
    showResult(age, result.message, result.justification); // 3 Parameter übergeben

    inputSection.style.display = "none";
=======
checkButton.addEventListener('click', function () {
    const age = parseInt(ageInput.value);

    if (isNaN(age) || age <= 0 || age > 120) {
        alert(`Bitte gibt ein gültiges Alter ein. Von 1 bis 120.`)
        return;
    }

    const isAllowed = checkEntryTime(age);

    showResult(age, isAllowed)

    resultSection.classList.remove('hidden');
>>>>>>> main
});

// Funktion zur Überprüfung der Eintrittszeit
function checkEntryTime(age) {
<<<<<<< HEAD
    const currentHour = new Date().getHours();

    if (age < 12) {
        if (currentHour >= 8 && currentHour < 12) {
            return { message: "✅ Du darfst eintreten!", justification: "" };
        } else {
            return {
                message: "❌ Du darfst nicht eintreten!",
                justification: "Kinder unter 12 dürfen nur von 8-12 Uhr eintreten."
            };
        }
    } else if (age >= 12 && age <= 17) {
        if (currentHour >= 12 && currentHour < 16) {
            return { message: "✅ Du darfst eintreten!", justification: "" };
        } else {
            return {
                message: "❌ Du darfst nicht eintreten!",
                justification: "Jugendliche (12-17) dürfen nur von 12-16 Uhr eintreten."
            };
        }
    } else if (age >= 18) {
        return { message: "🎉 Du darfst jederzeit eintreten und Boobis sehen 🍑", justification: "" };
    } else {
        return { message: "⚠️ Ungültiges Alter!", justification: "Bitte gib ein gültiges Alter ein." };
    }
}

// Angepasste showResult-Funktion
function showResult(age, message, justification) { // 3 Parameter
    resultSection.className = "";
    
    // Altersgruppe setzen
    if (age < 12) {
        resultSection.classList.add("child");
    } else if (age >= 12 && age <= 17) {
        resultSection.classList.add("teen");
    } else if (age >= 18) {
        resultSection.classList.add("adult");
    }

    // Status setzen
    if (message.includes("❌")) {
        resultSection.classList.add("denied");
    } else {
        resultSection.classList.add("allowed");
    }

    // HTML generieren
    resultSection.innerHTML = `
        <strong>Alter: ${age}</strong>
        <p>${message}</p>
        ${justification ? `<small>${justification}</small>` : ''}
    `;
    
    resultSection.classList.remove("hidden");
=======
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
>>>>>>> main
}