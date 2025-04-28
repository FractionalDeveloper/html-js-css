// DOM-Elemente für die Navigation
const navAgeCheck = document.getElementById('nav-age-check');
const navTodo = document.getElementById('nav-todo');
const ageCheckPage = document.getElementById('age-check-page');
const todoPage = document.getElementById('todo-page');

// DOM-Elemente für die ToDo-App
const todoForm = document.getElementById('new-todo-form');
const todoTitleInput = document.getElementById('todo-title');
const todoAssigneeInput = document.getElementById('todo-assignee');
const todoDeadlineInput = document.getElementById('todo-deadline');
const todoList = document.getElementById('todo-list');

const titleError = document.getElementById('title-error');
const assigneeError = document.getElementById('assignee-error');
const deadlineError = document.getElementById('deadline-error');

let todos = [];

// Initialisierung der App
function initApp() {
    // Event-Listener für die Navigation
    setupNavigation();

    // Event-Listener für das Todo-Formular
    setupTodoForm();

    renderTodoList();
}

/**
 * Event-Listener für die Navigation einrichten
 * 
 * Diese Funktion richtet die Klick-Events für die Menüpunkte der Navbar ein,
 * damit die Benutzer zwischen den verschiedenen Seiten wechseln können.
 * 
 * Schritte zur Implementierung:
 * 1. Füge einen Event-Listener für den Klick auf den "Altersprüfung"-Link hinzu
 *    - Verhindere das Standardverhalten des Links (preventDefault)
 *    - Rufe showPage() mit ageCheckPage als Parameter auf
 *    - Rufe setActiveNavItem() mit navAgeCheck als Parameter auf
 * 
 * 2. Füge einen Event-Listener für den Klick auf den "ToDo App"-Link hinzu
 *    - Verhindere das Standardverhalten des Links (preventDefault)
 *    - Rufe showPage() mit todoPage als Parameter auf
 *    - Rufe setActiveNavItem() mit navTodo als Parameter auf
 * 
 * Ressource: https://developer.mozilla.org/de/docs/Web/API/Element/classList
 */
function setupNavigation() {
    // Event-Listener für die Altersprüfung
    navAgeCheck.addEventListener('click', function (event) {
        event.preventDefault();
        showPage(ageCheckPage);
        setActiveNavItem(navAgeCheck);
    });

    // Event-Listener für die ToDo-App
    navTodo.addEventListener('click', function (event) {
        event.preventDefault();
        showPage(todoPage);
        setActiveNavItem(navTodo);
    });
}

/**
 * Eine Seite anzeigen und alle anderen ausblenden
 * @param {HTMLElement} pageToShow - Die anzuzeigende Seite
 * 
 * Diese Funktion zeigt die ausgewählte Seite an und blendet alle anderen Seiten aus.
 * 
 * Schritte zur Implementierung:
 * 1. Finde alle Elemente mit der Klasse "page" und speichere sie in einer Variablen
 *    (Nutze document.querySelectorAll('.page'))
 * 
 * 2. Durchlaufe alle gefundenen Seiten mit einer Schleife (forEach)
 *    - Füge die Klasse "hidden" zu jeder Seite hinzu, um sie auszublenden
 * 
 * 3. Entferne die Klasse "hidden" von der übergebenen Seite (pageToShow),
 *    um sie anzuzeigen
 * 
 * Ressource: https://developer.mozilla.org/de/docs/Web/API/Document/querySelectorAll
 */
function showPage(pageToShow) {
    // Alle Seiten ausblenden
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.add('hidden'));

    // Die ausgewählte Seite einblenden
    pageToShow.classList.remove('hidden');
}

/**
 * Den aktiven Navigationspunkt hervorheben
 * @param {HTMLElement} activeNavItem - Der aktive Navigationspunkt
 * 
 * Diese Funktion hebt den angeklickten Menüpunkt visuell hervor.
 * 
 * Schritte zur Implementierung:
 * 1. Finde alle Elemente mit der Klasse "navbar-link" und speichere sie in einer Variablen
 *    (Nutze document.querySelectorAll('.navbar-link'))
 * 
 * 2. Durchlaufe alle gefundenen Navigationspunkte mit einer Schleife (forEach)
 *    - Entferne die Klasse "active" von jedem Navigationspunkt
 * 
 * 3. Füge die Klasse "active" zum übergebenen Navigationspunkt (activeNavItem) hinzu,
 *    um ihn hervorzuheben
 */
function setActiveNavItem(activeNavItem) {
    // Aktiven Status von allen Navigationspunkten entfernen
    const navItems = document.querySelectorAll('.navbar-link');
    navItems.forEach(item => item.classList.remove('active'));

    // Aktiven Status zum ausgewählten Navigationspunkt hinzufügen
    activeNavItem.classList.add('active');
}

/**
 * Event-Listener für das Todo-Formular einrichten
 * 
 * Diese Funktion richtet den Event-Listener für das Absenden des Todo-Formulars ein.
 * Es soll ein neues Todo-Objekt erstellt und zunächst nur in die Konsole geloggt werden.
 * 
 * Schritte zur Implementierung:
 * 1. Füge einen Event-Listener für das "submit"-Event des Formulars hinzu
 *    - Verhindere das Standardverhalten des Formulars (preventDefault)
 *    - Rufe die Funktion logNewTodo() auf, um das neue Todo in die Konsole zu loggen
 *    - Setze das Formular zurück (reset)
 * 
 * Ressource: https://developer.mozilla.org/de/docs/Web/API/HTMLFormElement/submit_event
 */
function setupTodoForm() {
    // TODO: Implementiere den Event-Listener für das Formular
    // Der Listener soll das Standardverhalten verhindern und logNewTodo() aufrufen

    todoForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (validateForm()) {
            addNewTodo();
        }
    });

    todoTitleInput.addEventListener('input', () => clearError(todoTitleInput, titleError));
    todoAssigneeInput.addEventListener('input', () => clearError(todoAssigneeInput, assigneeError));
    todoDeadlineInput.addEventListener('input', () => clearError(todoDeadlineInput, deadlineError));

}

/**
 * Formulareingaben validieren
 * @returns {boolean} - true, wenn alle Eingaben gültig sind, sonst false
 * 
 * Diese Funktion prüft, ob alle erforderlichen Felder ausgefüllt sind
 * und zeigt entsprechende Fehlermeldungen an.
 * 
 * Schritte zur Implementierung:
 * 1. Setze eine Variable valid auf true
 * 
 * 2. Prüfe jedes Eingabefeld:
 *    - Hole den Wert und bereinige ihn (trim)
 *    - Wenn der Wert leer ist:
 *      - Zeige eine Fehlermeldung an
 *      - Markiere das Feld als fehlerhaft
 *      - Setze valid auf false
 * 
 * 3. Für das Datumsfeld zusätzlich prüfen:
 *    - Ob das Datum im korrekten Format ist
 *    - Optional: Ob das Datum nicht in der Vergangenheit liegt
 * 
 * 4. Gib den Wert von valid zurück
 * 
 * Ressource: https://developer.mozilla.org/de/docs/Learn/Forms/Form_validation
 */
function validateForm() {
    // TODO: Implementiere die Formularvalidierung
    let valid = true;
    // Titel validieren
    const titleValue = todoTitleInput.value.trim();
    if (!titleValue) {
        showError(todoTitleInput, titleError, 'Bitte gib einen Aufgabentitel ein.');
        valid = false;
    }

    // Verantwortlichen validieren
    const assigneeValue = todoAssigneeInput.value.trim();
    if (!assigneeValue) {
        showError(todoAssigneeInput, assigneeError, 'Bitte gib den Verantwortlichen für die Aufgabe an.');
        valid = false;
    }

    // Fälligkeitsdatum validieren
    const deadlineValue = todoDeadlineInput.value;
    if (!deadlineValue) {
        showError(todoDeadlineInput, deadlineError, 'Bitte wähle ein Fälligkeitsdatum.');
        valid = false;
    }
    return valid;
}

/**
 * Fehlermeldung anzeigen
 * @param {HTMLElement} inputElement - Das Eingabefeld
 * @param {HTMLElement} errorElement - Das Element für die Fehlermeldung
 * @param {string} message - Die anzuzeigende Fehlermeldung
 * 
 * Diese Funktion zeigt eine Fehlermeldung für ein Eingabefeld an
 * und markiert das Feld als fehlerhaft.
 * 
 * Schritte zur Implementierung:
 * 1. Füge die Klasse "error" zum Eingabefeld hinzu
 * 
 * 2. Setze den Text der Fehlermeldung
 * 
 * 3. Füge eine Klasse für die Animation hinzu, um Aufmerksamkeit zu erregen
 *    - Entferne die Klasse nach einer kurzen Verzögerung wieder
 * 
 * Ressource: https://developer.mozilla.org/de/docs/Web/API/Element/classList
 */
function showError(inputElement, errorElement, message) {
    // TODO: Implementiere die Anzeige von Fehlermeldungen
    inputElement.classList.add('error');
    errorElement.textContent = message;
    inputElement.classList.add('shake');
    setTimeout(() => {
        inputElement.classList.remove('shake');
    }, 500); // Die "shake"-Animation für 0.5 Sekunden anzeigen
}

/**
 * Fehlermeldung löschen
 * @param {HTMLElement} inputElement - Das Eingabefeld
 * @param {HTMLElement} errorElement - Das Element für die Fehlermeldung
 * 
 * Diese Funktion entfernt die Fehlermeldung und die Fehlermarkierung
 * von einem Eingabefeld.
 * 
 * Schritte zur Implementierung:
 * 1. Entferne die Klasse "error" vom Eingabefeld
 * 
 * 2. Leere den Text der Fehlermeldung
 * 
 * Ressource: https://developer.mozilla.org/de/docs/Web/API/Element/classList
 */
function clearError(inputElement, errorElement) {
    // TODO: Implementiere das Löschen von Fehlermeldungen
    inputElement.classList.remove('error');
    errorElement.textContent = ' ';
}

/**
 * Neues Todo hinzufügen
 */
function addNewTodo() {
    // TODO: Implementiere die Funktion zum Hinzufügen eines neuen Todos
    const title = todoTitleInput.value.trim();
    const assignee = todoAssigneeInput.value.trim();
    const deadline = todoDeadlineInput.value;

    const newTodo = {
        id: Date.now(),
        title: title,
        assignee: assignee,
        deadline: deadline,
        completed: false,
        createdAt: new Date().toISOString()
    };
    // Todo zum Array hinzufügen
    todos.push(newTodo);

    // Todo in der Liste anzeigen
    renderTodoList();

    // Formularfelder zurücksetzen
    todoForm.reset();

    // Optional: Das neue Todo in der Konsole ausgeben
    console.log('Neues Todo erstellt:', newTodo);
}

function renderTodoList() {
    // TODO: Implementiere die Funktion zum Anzeigen der Todo-Liste
    todoList.innerHTML = '';

    // Wenn keine Todos vorhanden sind, eine Meldung anzeigen
    if (todos.length === 0) {
        todoList.innerHTML = '<li class="empty-message">Keine Aufgaben vorhanden. Erstelle deine erste Aufgabe!</li>';
        return;
    }

    todos.forEach(todo => {
        const todoItem = createTodoElement(todo);
        todoList.appendChild(todoItem);
    });
}

/**
 * Todo-Element erstellen
 * @param {Object} todo - Das Todo-Objekt
 * @returns {HTMLElement} - Das erstellte Todo-Element
 * 
 * Diese Funktion erstellt ein HTML-Element für ein Todo-Objekt.
 * 
 * Schritte zur Implementierung:
 * 1. Erstelle ein neues li-Element
 *    - Setze die Klasse auf "todo-item"
 *    - Füge weitere Klassen je nach Status hinzu (completed, overdue)
 * 
 * 2. Erstelle den HTML-Inhalt des Elements
 *    - Todo-Titel
 *    - Verantwortlicher
 *    - Fälligkeitsdatum (formatiert)
 *    - Buttons für "Erledigt" und "Löschen"
 * 
 * 3. Füge Event-Listener für die Buttons hinzu
 *    - "Erledigt"-Button: toggleTodoComplete(todo.id)
 *    - "Löschen"-Button: deleteTodo(todo.id)
 * 
 * 4. Gib das erstellte Element zurück
 * 
 * Ressource: https://developer.mozilla.org/de/docs/Web/API/Node/appendChild
 */
function createTodoElement(todo) {
    // TODO: Implementiere die Funktion zum Erstellen eines Todo-Elements

    const li = document.createElement('li');
    li.className = 'todo-item';

    if (todo.completed) {
        li.classList.add('completed');
    } else if (isOverdue(todo.deadline)) {
        li.classList.add('overdue');
    }

    // HTML für das Todo-Element
    li.innerHTML =
        `<div class="todo-info">
            <div class="todo-title">${todo.title}</div>
            <div class="todo-details">
                <span class="todo-assignee">Verantwortlich: ${todo.assignee}</span>
                <span class="todo-deadline">Fällig: ${formatDate(todo.deadline)}</span>
            </div>
        </div>
        <div class="todo-actions">
            <button class="complete-btn">${todo.completed ? 'Wiederherstellen' : 'Erledigt'}</button>
            <button class="delete-btn">Löschen</button>
        </div>`;

    // Event-Listener für den "Erledigt"-Button
    const completeBtn = li.querySelector('.complete-btn');
    completeBtn.addEventListener('click', () => toggleTodoComplete(todo.id));

    // Event-Listener für den "Löschen"-Button
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    return li;
}

/**
 * Todo als erledigt markieren oder wiederherstellen
 * @param {number} todoId - Die ID des Todos
 * 
 * Diese Funktion ändert den Status eines Todos zwischen erledigt und nicht erledigt.
 * 
 * Schritte zur Implementierung:
 * 1. Finde den Index des Todos im Array
 * 
 * 2. Kehre den completed-Status um (true -> false oder false -> true)
 * 
 * 3. Aktualisiere die Todo-Liste mit renderTodoList()
 * 
 * Ressource: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
 */
function toggleTodoComplete(todoId) {
    // TODO: Implementiere die Funktion zum Markieren eines Todos als erledigt
    const todoIndex = todos.findIndex(todo => todo.id === todoId);

    // Status des Todos umkehren
    if (todoIndex !== -1) {
        todos[todoIndex].completed = !todos[todoIndex].completed;

        // Todo-Liste aktualisieren
        renderTodoList();
    }
}

/**
 * Todo löschen
 * @param {number} todoId - Die ID des Todos
 * 
 * Diese Funktion entfernt ein Todo aus dem Array.
 * 
 * Schritte zur Implementierung:
 * 1. Frage den Benutzer, ob er das Todo wirklich löschen möchte
 * 
 * 2. Wenn ja, entferne das Todo aus dem Array
 *    - Nutze Array.filter() um ein neues Array ohne das zu löschende Todo zu erstellen
 * 
 * 3. Aktualisiere die Todo-Liste mit renderTodoList()
 * 
 * Ressource: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
 */
function deleteTodo(todoId) {
    // TODO: Implementiere die Funktion zum Löschen eines Todos
    if (confirm('Möchtest du diese Aufgabe wirklich löschen?')) {
        // Todo aus dem Array entfernen
        todos = todos.filter(todo => todo.id !== todoId);

        // Todo-Liste aktualisieren
        renderTodoList();
    }
}

/**
 * Prüfen, ob ein Datum in der Vergangenheit liegt
 * @param {string} dateString - Das Datum als String im Format YYYY-MM-DD
 * @returns {boolean} - true, wenn das Datum in der Vergangenheit liegt
 * 
 * Diese Funktion prüft, ob ein Datum in der Vergangenheit liegt.
 * 
 * Schritte zur Implementierung:
 * 1. Erstelle ein Date-Objekt für heute und setze die Uhrzeit auf 00:00:00
 * 
 * 2. Erstelle ein Date-Objekt für das übergebene Datum
 * 
 * 3. Vergleiche die beiden Daten und gib true zurück, wenn das Datum in der Vergangenheit liegt
 * 
 * Ressource: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date/parse
 */
function isOverdue(dateString) {
    // TODO: Implementiere die Funktion zum Prüfen, ob ein Datum in der Vergangenheit liegt
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Uhrzeit auf 00:00:00 setzen

    const deadline = new Date(dateString);

    return deadline < today;
}

/**
 * Datum formatieren
 * @param {string} dateString - Das Datum als String im Format YYYY-MM-DD
 * @returns {string} - Das formatierte Datum im Format DD.MM.YYYY
 * 
 * Diese Funktion formatiert ein Datum im Format YYYY-MM-DD in das Format DD.MM.YYYY.
 * 
 * Schritte zur Implementierung:
 * 1. Erstelle ein Date-Objekt aus dem übergebenen Datum
 * 
 * 2. Nutze toLocaleDateString() mit der Option 'de-DE', um das Datum im deutschen Format auszugeben
 * 
 * Ressource: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
 */
function formatDate(dateString) {
    // TODO: Implementiere die Funktion zum Formatieren eines Datums
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE');
}

/**
 * Neues Todo in die Konsole loggen
 * 
 * Diese Funktion erstellt ein Todo-Objekt aus den Formulardaten
 * und gibt es in der Konsole aus.
 * 
 * Schritte zur Implementierung:
 * 1. Hole die Werte aus den Eingabefeldern und bereinige sie (trim)
 * 
 * 2. Erstelle ein neues Objekt mit folgenden Eigenschaften:
 *    - id: Aktueller Zeitstempel (Date.now())
 *    - title: Der Titel der Aufgabe
 *    - assignee: Der Verantwortliche
 *    - deadline: Das Fälligkeitsdatum
 *    - completed: false (initial ist die Aufgabe nicht erledigt)
 *    - createdAt: Aktuelles Datum als ISO-String
 * 
 * 3. Gib das Objekt mit console.log aus
 * 
 * Ressource: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date
 */

/*
function logNewTodo() {
    // TODO: Implementiere die Funktion zum Erstellen und Loggen eines neuen Todos
    const titleInput = document.getElementById('todo-title').value;
    const assigneeInput = document.getElementById('todo-assignee').value;
    const deadlineInput = document.getElementById('todo-deadline').value;

    document.getElementById('todo-title').value.trim();
    document.getElementById('todo-assignee').value.trim();
    document.getElementById('todo-deadline').value.trim();

    const newTodo = {
        id: Date.now(),
        title: titleInput,
        assignee: assigneeInput,
        deadline: deadlineInput,
        completed: false,
        createdAt: new Date().toISOString()
    };

    console.log(newTodo);

}
*/

// App initialisieren, wenn das DOM geladen ist
document.addEventListener('DOMContentLoaded', initApp);