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

// DOM-Elemente für Fehlermeldungen
const titleError = document.getElementById('title-error');
const assigneeError = document.getElementById('assignee-error');
const deadlineError = document.getElementById('deadline-error');

// Array für die Todos
let todos = [];

// Initialisierung der App
function initApp() {
    // Event-Listener für die Navigation
    setupNavigation();
    
    // Event-Listener für das Todo-Formular
    setupTodoForm();
    
    // Todos aus dem LocalStorage laden
    loadTodosFromLocalStorage();
    
    // Todos anzeigen
    renderTodoList();
}

/**
 * Event-Listener für die Navigation einrichten
 */
function setupNavigation() {
    // Event-Listener für die Altersprüfung
    navAgeCheck.addEventListener('click', function(e) {
        e.preventDefault();
        showPage(ageCheckPage);
        setActiveNavItem(navAgeCheck);
    });
    
    // Event-Listener für die ToDo-App
    navTodo.addEventListener('click', function(e) {
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
    todoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Formular validieren und bei Erfolg ein neues Todo erstellen
        if (validateForm()) {
            addNewTodo();
        }
    });

    // Event-Listener für Input-Felder, um Fehlermeldungen bei Eingabe zu löschen
    todoTitleInput.addEventListener('input', () => clearError(todoTitleInput, titleError));
    todoAssigneeInput.addEventListener('input', () => clearError(todoAssigneeInput, assigneeError));
    todoDeadlineInput.addEventListener('input', () => clearError(todoDeadlineInput, deadlineError));
}

/**
 * Formulareingaben validieren
 * @returns {boolean} - true, wenn alle Eingaben gültig sind, sonst false
 */
function validateForm() {
    let valid = true;
    
    // Titel validieren
    const title = todoTitleInput.value.trim();
    if (!title) {
        showError(todoTitleInput, titleError, 'Bitte gib einen Aufgabentitel ein');
        valid = false;
    }
    
    // Verantwortlichen validieren
    const assignee = todoAssigneeInput.value.trim();
    if (!assignee) {
        showError(todoAssigneeInput, assigneeError, 'Bitte gib einen Verantwortlichen ein');
        valid = false;
    }
    
    // Fälligkeitsdatum validieren
    const deadline = todoDeadlineInput.value;
    if (!deadline) {
        showError(todoDeadlineInput, deadlineError, 'Bitte wähle ein Fälligkeitsdatum');
        valid = false;
    }
    
    return valid;
}

/**
 * Fehlermeldung anzeigen
 * @param {HTMLElement} inputElement - Das Eingabefeld
 * @param {HTMLElement} errorElement - Das Element für die Fehlermeldung
 * @param {string} message - Die anzuzeigende Fehlermeldung
 */
function showError(inputElement, errorElement, message) {
    // Klasse für Fehlerstil hinzufügen
    inputElement.classList.add('error');
    
    // Fehlermeldung setzen
    errorElement.textContent = message;
    
    // Animation für Feedback hinzufügen
    inputElement.classList.add('shake');
    
    // Animation nach einer kurzen Zeit entfernen
    setTimeout(() => {
        inputElement.classList.remove('shake');
    }, 500);
}

/**
 * Fehlermeldung löschen
 * @param {HTMLElement} inputElement - Das Eingabefeld
 * @param {HTMLElement} errorElement - Das Element für die Fehlermeldung
 */
function clearError(inputElement, errorElement) {
    // Klasse für Fehlerstil entfernen
    inputElement.classList.remove('error');
    
    // Fehlermeldung löschen
    errorElement.textContent = '';
}

/**
 * Neues Todo hinzufügen
 */
function addNewTodo() {
    // Werte aus dem Formular holen
    const title = todoTitleInput.value.trim();
    const assignee = todoAssigneeInput.value.trim();
    const deadline = todoDeadlineInput.value;
    
    // Neues Todo-Objekt erstellen
    const newTodo = {
        id: Date.now(), // Eindeutige ID anhand des aktuellen Zeitstempels
        title: title,
        assignee: assignee,
        deadline: deadline,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    // Todo zum Array hinzufügen
    todos.push(newTodo);
    
    // Todos im LocalStorage speichern
    saveTodosToLocalStorage();
    
    // Todo in der Liste anzeigen
    renderTodoList();
    
    // Formularfelder zurücksetzen
    todoForm.reset();
    
    // Optional: Das neue Todo in der Konsole ausgeben
    console.log('Neues Todo erstellt:', newTodo);
}

/**
 * Todos aus dem LocalStorage laden
 * 
 * Diese Funktion lädt die gespeicherten Todos aus dem LocalStorage
 * und fügt sie zum todos-Array hinzu.
 * 
 * Schritte zur Implementierung:
 * 1. Prüfe, ob es einen Eintrag mit dem Schlüssel 'todos' im LocalStorage gibt
 *    - Nutze localStorage.getItem('todos')
 * 
 * 2. Wenn ein Eintrag vorhanden ist:
 *    - Parse den JSON-String zu einem JavaScript-Array
 *    - Weise das Array der todos-Variable zu
 * 
 * 3. Wenn kein Eintrag vorhanden ist, bleibt todos ein leeres Array
 * 
 * Ressource: https://developer.mozilla.org/de/docs/Web/API/Window/localStorage
 */
function loadTodosFromLocalStorage() {
    // TODO: Implementiere das Laden der Todos aus dem LocalStorage
    const todosFromStorage = localStorage.getItem('todos');
    if (todosFromStorage) {
        todos = JSON.parse(todosFromStorage);
    }
    else {
        todos = [];
    }
}

/**
 * Todos im LocalStorage speichern
 * 
 * Diese Funktion speichert das todos-Array im LocalStorage,
 * damit die Todos auch nach einem Neuladen der Seite erhalten bleiben.
 * 
 * Schritte zur Implementierung:
 * 1. Konvertiere das todos-Array in einen JSON-String
 *    - Nutze JSON.stringify(todos)
 * 
 * 2. Speichere den JSON-String im LocalStorage unter dem Schlüssel 'todos'
 *    - Nutze localStorage.setItem('todos', jsonString)
 * 
 * Ressource: https://developer.mozilla.org/de/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
 */
function saveTodosToLocalStorage() {
    // TODO: Implementiere das Speichern der Todos im LocalStorage
    const jsonString = JSON.stringify(todos);
    localStorage.setItem('todos', jsonString);
}

/**
 * Todo-Liste rendern
 */
function renderTodoList() {
    // Todo-Liste leeren
    todoList.innerHTML = '';
    
    // Wenn keine Todos vorhanden sind, eine Meldung anzeigen
    if (todos.length === 0) {
        todoList.innerHTML = '<li class="empty-message">Keine Aufgaben vorhanden. Erstelle deine erste Aufgabe!</li>';
        return;
    }
    
    // Todos durchlaufen und anzeigen
    todos.forEach(todo => {
        const todoItem = createTodoElement(todo);
        todoList.appendChild(todoItem);
    });
}

/**
 * Todo-Element erstellen
 * @param {Object} todo - Das Todo-Objekt
 * @returns {HTMLElement} - Das erstellte Todo-Element
 */
function createTodoElement(todo) {
    // Neues Listenelement erstellen
    const li = document.createElement('li');
    li.className = 'todo-item';
    
    // Klassen basierend auf dem Status hinzufügen
    if (todo.completed) {
        li.classList.add('completed');
    } else if (isOverdue(todo.deadline)) {
        li.classList.add('overdue');
    }
    
    // HTML für das Todo-Element
    li.innerHTML = `
        <div class="todo-info">
            <div class="todo-title">${todo.title}</div>
            <div class="todo-details">
                <span class="todo-assignee">Verantwortlich: ${todo.assignee}</span>
                <span class="todo-deadline">Fällig: ${formatDate(todo.deadline)}</span>
            </div>
        </div>
        <div class="todo-actions">
            <button class="complete-btn">${todo.completed ? 'Wiederherstellen' : 'Erledigt'}</button>
            <button class="delete-btn">Löschen</button>
        </div>
    `;
    
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
 */
function toggleTodoComplete(todoId) {
    // Index des Todos im Array finden
    const todoIndex = todos.findIndex(todo => todo.id === todoId);
    
    // Status des Todos umkehren
    if (todoIndex !== -1) {
        todos[todoIndex].completed = !todos[todoIndex].completed;
        
        // Todos im LocalStorage speichern
        saveTodosToLocalStorage();
        
        // Todo-Liste aktualisieren
        renderTodoList();
    }
}

/**
 * Todo löschen
 * @param {number} todoId - Die ID des Todos
 */
function deleteTodo(todoId) {
    // Nachfragen, ob das Todo wirklich gelöscht werden soll
    if (confirm('Möchtest du diese Aufgabe wirklich löschen?')) {
        // Todo aus dem Array entfernen
        todos = todos.filter(todo => todo.id !== todoId);
        
        // Todos im LocalStorage speichern
        saveTodosToLocalStorage();
        
        // Todo-Liste aktualisieren
        renderTodoList();
    }
}

/**
 * Prüfen, ob ein Datum in der Vergangenheit liegt
 * @param {string} dateString - Das Datum als String im Format YYYY-MM-DD
 * @returns {boolean} - true, wenn das Datum in der Vergangenheit liegt
 */
function isOverdue(dateString) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Uhrzeit auf 00:00:00 setzen
    
    const deadline = new Date(dateString);
    
    return deadline < today;
}

/**
 * Datum formatieren
 * @param {string} dateString - Das Datum als String im Format YYYY-MM-DD
 * @returns {string} - Das formatierte Datum im Format DD.MM.YYYY
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE');
}

// App initialisieren, wenn das DOM geladen ist
document.addEventListener('DOMContentLoaded', initApp);
