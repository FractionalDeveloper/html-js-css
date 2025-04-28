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

// Array für die Todos
let todos = [];

// Initialisierung der App
function initApp() {
    // Event-Listener für die Navigation
    setupNavigation();

    // Event-Listener für das Todo-Formular
    setupTodoForm();

    // Todos anzeigen
    renderTodoList();
}

/**
 * Event-Listener für die Navigation einrichten
 */
function setupNavigation() {
    // Event-Listener für die Altersprüfung
    navAgeCheck.addEventListener('click', function (e) {
        e.preventDefault();
        showPage(ageCheckPage);
        setActiveNavItem(navAgeCheck);
    });

    // Event-Listener für die ToDo-App
    navTodo.addEventListener('click', function (e) {
        e.preventDefault();
        showPage(todoPage);
        setActiveNavItem(navTodo);
    });
}

/**
 * Eine Seite anzeigen und alle anderen ausblenden
 * @param {HTMLElement} pageToShow - Die anzuzeigende Seite
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
 */
function setupTodoForm() {
    todoForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Todo-Objekt erstellen
        addNewTodo();
    });
}

/**
 * Neues Todo hinzufügen
 * 
 * Diese Funktion erfasst die Eingaben aus dem Formular,
 * erstellt ein neues Todo-Objekt, fügt es zum Array hinzu
 * und aktualisiert die Anzeige.
 * 
 * Schritte zur Implementierung:
 * 1. Hole die Werte aus den Eingabefeldern und bereinige sie (trim)
 * 
 * 2. Prüfe, ob alle Felder ausgefüllt sind
 *    - Falls nicht, zeige eine Warnung und beende die Funktion
 * 
 * 3. Erstelle ein neues Todo-Objekt mit:
 *    - id: Eindeutige ID (z.B. mit Date.now())
 *    - title: Aufgabenname
 *    - assignee: Verantwortlicher
 *    - deadline: Fälligkeitsdatum
 *    - completed: false (initial nicht erledigt)
 *    - createdAt: Aktuelles Datum
 * 
 * 4. Füge das Todo zum todos-Array hinzu
 * 
 * 5. Aktualisiere die Todo-Liste mit renderTodoList()
 * 
 * 6. Setze das Formular zurück
 * 
 * 7. Gib das neue Todo in der Konsole aus (für Debugging-Zwecke)
 * 
 * Ressource: https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Date
 */
function addNewTodo() {
    // TODO: Implementiere die Funktion zum Hinzufügen eines neuen Todos
    const newTodo = {
        id: Date.now(),
        title: todoTitleInput.value.trim(),
        assignee: todoAssigneeInput.value.trim(),
        deadline: todoDeadlineInput.value.trim(),
        completed: false,
        createdAt: new Date().toISOString()
    };

    todos.push(newTodo);
    renderTodoList();
    todoForm.reset();
    console.log(newTodo);
}

/**
 * Todo-Liste rendern
 * 
 * Diese Funktion zeigt alle Todos aus dem todos-Array in der Liste an.
 * 
 * Schritte zur Implementierung:
 * 1. Leere die Todo-Liste (todoList.innerHTML = '')
 * 
 * 2. Prüfe, ob Todos vorhanden sind
 *    - Falls nicht, zeige eine Meldung an und beende die Funktion
 * 
 * 3. Durchlaufe alle Todos im Array mit einer Schleife (forEach)
 *    - Erstelle für jedes Todo ein HTML-Element mit createTodoElement()
 *    - Füge das Element zur Todo-Liste hinzu
 * 
 * Ressource: https://developer.mozilla.org/de/docs/Web/API/Document/createElement
 */
function renderTodoList() {
    // TODO: Implementiere die Funktion zum Anzeigen der Todo-Liste
    todoList.innerHTML = '';
    if (todos?.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'Keine ToDo´s vorhanden';
        todoList.appendChild(message);
        return;
    }

    todos.forEach(todo => {
        const todoElement = createTodoElement(todo);
        todoList.appendChild(todoElement);
    })
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
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    if (todo.completed) {
        todoItem.classList.add('completed');
    }
    else if (isOverdue(todo.deadline)) {
        todoItem.classList.add('overdue');
    }

    const titleSpan = document.createElement('span');
    titleSpan.classList.add('todo-title');
    titleSpan.textContent = todo.title;

    const assigneeSpan = document.createElement('span');
    assigneeSpan.classList.add('todo-assignee');
    assigneeSpan.textContent = todo.assignee;

    const deadlineSpan = document.createElement('span');
    deadlineSpan.classList.add('todo-deadline');
    deadlineSpan.textContent = formatDate(todo.deadline);

    const deletebtn = document.createElement('button');
    deletebtn.classList.add('delete-btn');
    deletebtn.textContent = 'Löschen';

    const completebtn = document.createElement('button');
    completebtn.classList.add('complete-btn');
    completebtn.textContent = 'Erledigt';

    completebtn.addEventListener('click', () => toggleTodoComplete(todo.id));
    deletebtn.addEventListener('click', () => deleteTodo(todo.id));

    todoItem.appendChild(titleSpan);
    todoItem.appendChild(assigneeSpan);
    todoItem.appendChild(deadlineSpan);
    todoItem.appendChild(deletebtn);
    todoItem.appendChild(completebtn);

    return todoItem;
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
    if (todoIndex !== -1){
        todos[todoIndex].completed = !todos[todoIndex].completed;
    }
    else {
        console.error('Error - Keine ToDo´s gefunden');
    }
    renderTodoList();
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
    const confirmdelete = confirm('Möchten Sie dieses ToDo wirklich löschen?')
    if(confirmdelete)
    {
        todos = todos.filter(todo => todo.id !== todoId)
    }
    renderTodoList();
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
    today.setHours(0,0,0,0);
    const date = new Date(dateString);
    return date < today;
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
    const dateformat = new Date(dateString);
    return dateformat.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// App initialisieren, wenn das DOM geladen ist
document.addEventListener('DOMContentLoaded', initApp);
