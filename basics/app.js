// DOM-Elemente auswählen
const inputSection = document.getElementById('inputSection');
const resultSection = document.getElementById('resultSection');
const ageInput = document.getElementById('ageInput');
const checkButton = document.getElementById('checkButton');

// Event-Listener für den Button
checkButton.addEventListener('click', function() {
    const age = parseInt(ageInput.value); // String in Zahl umwandeln

    if (!age || age <1 || age > 120) {
        alert("Bitte gib ein gültiges Alter ein!");
        return;
    }

    const result = checkEntryTime(age);
    showResult(age, result.message, result.justification); // 3 Parameter übergeben

    inputSection.style.display = "none";
});

// Funktion zur Überprüfung der Eintrittszeit
function checkEntryTime(age) {
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
}