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
const todoFileInput = document.getElementById('todo-file');
const fileInfo = document.getElementById('file-info');
const todoList = document.getElementById('todo-list');

// DOM-Elemente für Fehlermeldungen
const titleError = document.getElementById('title-error');
const assigneeError = document.getElementById('assignee-error');
const deadlineError = document.getElementById('deadline-error');
const fileError = document.getElementById('file-error');

// Array für die Todos
let todos = [];

// Schlüssel für den LocalStorage
const STORAGE_KEY = 'todos';

// Initialisierung der App
function initApp() {
    // Event-Listener für die Navigation
    setupNavigation();

    // Event-Listener für das Todo-Formular
    setupTodoForm();

    // Event-Listener für Datei-Upload
    setupFileUpload();

    // Todos aus dem LocalStorage laden
    loadTodosFromLocalStorage();

    // Todos anzeigen
    renderTodoList();

    // Standardmäßig die Todo-App anzeigen
    showPage(todoPage);
    setActiveNavItem(navTodo);
}

// Event-Listener für die Navigation einrichten
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

// Eine Seite anzeigen und alle anderen ausblenden
function showPage(pageToShow) {
    // Alle Seiten ausblenden
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.add('hidden'));

    // Die ausgewählte Seite einblenden
    pageToShow.classList.remove('hidden');
}

// Den aktiven Navigationspunkt hervorheben
function setActiveNavItem(activeNavItem) {
    // Aktiven Status von allen Navigationspunkten entfernen
    const navItems = document.querySelectorAll('.navbar-link');
    navItems.forEach(item => item.classList.remove('active'));

    // Aktiven Status zum ausgewählten Navigationspunkt hinzufügen
    activeNavItem.classList.add('active');
}

// Event-Listener für das Todo-Formular einrichten
function setupTodoForm() {
    todoForm.addEventListener('submit',async function (e) {
        e.preventDefault();

        // Formular validieren und bei Erfolg ein neues Todo erstellen
        if (validateForm()) {
           await addNewTodo();
        }
    });

    // Event-Listener für Input-Felder, um Fehlermeldungen bei Eingabe zu löschen
    todoTitleInput.addEventListener('input', () => clearError(todoTitleInput, titleError));
    todoAssigneeInput.addEventListener('input', () => clearError(todoAssigneeInput, assigneeError));
    todoDeadlineInput.addEventListener('input', () => clearError(todoDeadlineInput, deadlineError));

    // Aktuelles Datum als Standardwert für das Datumsfeld setzen
    const today = new Date().toISOString().split('T')[0];
    todoDeadlineInput.min = today;
    todoDeadlineInput.value = today;
}

/**
 * Event-Listener für Datei-Upload einrichten
 * 
 * Diese Funktion richtet einen Event-Listener für das Datei-Upload-Feld ein,
 * um den Namen der ausgewählten Datei anzuzeigen.
 * 
 * Ressource: https://developer.mozilla.org/de/docs/Web/API/File_API/Using_files_from_web_applications
 */
function setupFileUpload() {
    // TODO: Implementiere den Event-Listener für das Datei-Upload-Feld
    todoFileInput.addEventListener('change', function () {
        const file = todoFileInput.files[0];
        if (file) {
            fileInfo.textContent = `Ausgewählte Datei: ${file.name}`;
            fileInfo.classList.remove('hidden');
        }
        else {
            fileInfo.textContent = '';
            fileInfo.classList.add('hidden')
        }
    });
}

/**
 * Datei zu Base64 konvertieren
 * @param {File} file - Die zu konvertierende Datei
 * @returns {Promise<string>} - Promise mit dem Base64-String
 * 
 * Diese Funktion konvertiert eine Datei in einen Base64-String,
 * der dann im LocalStorage gespeichert werden kann.
 * 
 * Ressource: https://developer.mozilla.org/de/docs/Web/API/FileReader
 */
function fileToBase64(file) {
    // TODO: Implementiere die Konvertierung einer Datei zu Base64
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };
        reader.onerror = (error) => {
            console.error('Fehler beim Konvertieren der Datei zu Base64: ', error);
            reject(error);
        };
        reader.readAsDataURL(file);
    });
}

// Formular validieren
function validateForm() {
    let valid = true;

    // Titel validieren
    const title = todoTitleInput.value.trim();
    if (!title) {
        showError(todoTitleInput, titleError, 'Bitte gib einen Aufgabentitel ein');
        valid = false;
    } else if (title.length < 3) {
        showError(todoTitleInput, titleError, 'Der Titel muss mindestens 3 Zeichen lang sein');
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
    } else {
        // Prüfen, ob das Datum im korrekten Format ist
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(deadline)) {
            showError(todoDeadlineInput, deadlineError, 'Bitte gib ein gültiges Datum im Format YYYY-MM-DD ein');
            valid = false;
        }
    }

    // Datei validieren (optional)
    const file = todoFileInput.files[0];
    if (file) {
        // Prüfen, ob es eine Textdatei ist
        if (file.type !== 'text/plain' && !file.name.endsWith('.txt')) {
            showError(todoFileInput, fileError, 'Bitte wähle eine .txt-Datei aus');
            valid = false;
        } else if (file.size > 1024 * 1024) { // 1MB
            showError(todoFileInput, fileError, 'Die Datei darf nicht größer als 1MB sein');
            valid = false;
        }
    }

    return valid;
}

// Fehlermeldung anzeigen
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

    // Fokus auf das Eingabefeld setzen
    inputElement.focus();
}

// Fehlermeldung löschen
function clearError(inputElement, errorElement) {
    // Klasse für Fehlerstil entfernen
    inputElement.classList.remove('error');

    // Fehlermeldung löschen
    errorElement.textContent = '';
}

/**
 * Neues Todo hinzufügen
 * 
 * Diese Funktion wurde erweitert, um Dateianhänge zu unterstützen.
 * Wenn eine Datei ausgewählt wurde, wird sie zu Base64 konvertiert
 * und dem Todo-Objekt hinzugefügt.
 */
async function addNewTodo() {
    // TODO: Implementiere das Hinzufügen eines neuen Todos mit Dateianhang
    const title = todoTitleInput.value.trim();
    const assignee = todoAssigneeInput.value.trim();
    const deadline = todoDeadlineInput.value;
    const file = todoFileInput.files[0];
    let fileBase64 = null;

    if(file)
    {
        try{
            fileBase64 = await fileToBase64(file);
        }
        catch(error){
            showError(todoFileInput, fileError, 'Fehler beim verarbeiten der Datei.')
            return;
        }
    }
    const newToDo = {
        id: Date.now(),
        title,
        assignee,
        deadline,
        completed: false,
        createAt: Date.now().toISOString,
        file: fileBase64
    };
    todos.push(newToDo);
    saveTodosToLocalStorage();
    renderTodoList();
    todoForm.reset();
    fileInfo.textContent = '';
    fileInfo.classList.add('hidden');
    showSuccessMessage('Aufgabe erfolgreich hinzugefügt.');
}

// Todos aus dem LocalStorage laden
function loadTodosFromLocalStorage() {
    try {
        // Todos aus dem LocalStorage holen
        const storedTodos = localStorage.getItem(STORAGE_KEY);

        // Wenn Todos vorhanden sind, in das Array laden
        if (storedTodos) {
            todos = JSON.parse(storedTodos);
            console.log('Todos aus dem LocalStorage geladen:', todos.length);
        } else {
            console.log('Keine Todos im LocalStorage gefunden');
            todos = [];
        }
    } catch (error) {
        console.error('Fehler beim Laden der Todos aus dem LocalStorage:', error);
        todos = [];
    }
}

// Todos im LocalStorage speichern
function saveTodosToLocalStorage() {
    try {
        // Todos als JSON-String im LocalStorage speichern
        localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        console.log('Todos im LocalStorage gespeichert:', todos.length);
    } catch (error) {
        console.error('Fehler beim Speichern der Todos im LocalStorage:', error);

        // Fehlerbehandlung: Versuchen, den LocalStorage zu leeren
        if (error instanceof DOMException && error.name === 'QuotaExceededError') {
            alert('Der LocalStorage ist voll. Bitte lösche einige Todos, um Platz zu schaffen.');
        }
    }
}

// Todo-Liste rendern
function renderTodoList() {
    // Todo-Liste leeren
    todoList.innerHTML = '';

    // Wenn keine Todos vorhanden sind, eine Meldung anzeigen
    if (todos.length === 0) {
        todoList.innerHTML = '<li class="empty-message">Keine Aufgaben vorhanden. Erstelle deine erste Aufgabe!</li>';
        return;
    }

    // Todos nach Fälligkeit und Status sortieren
    const sortedTodos = [...todos].sort((a, b) => {
        // Erledigte Todos ans Ende
        if (a.completed !== b.completed) {
            return a.completed ? 1 : -1;
        }
        // Überfällige Todos an den Anfang
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const aOverdue = new Date(a.deadline) < today && !a.completed;
        const bOverdue = new Date(b.deadline) < today && !b.completed;
        if (aOverdue !== bOverdue) {
            return aOverdue ? -1 : 1;
        }
        // Nach Fälligkeitsdatum sortieren
        return new Date(a.deadline) - new Date(b.deadline);
    });

    // Todos durchlaufen und anzeigen
    sortedTodos.forEach(todo => {
        const todoItem = createTodoElement(todo);
        todoList.appendChild(todoItem);
    });
}

/**
 * Todo-Element erstellen
 * @param {Object} todo - Das Todo-Objekt
 * @returns {HTMLElement} - Das erstellte Todo-Element
 * 
 * Diese Funktion wurde erweitert, um Dateianhänge anzuzeigen und
 * einen Download-Button für den Dateianhang hinzuzufügen.
 */
function createTodoElement(todo) {
    // TODO: Implementiere das Erstellen eines Todo-Elements mit Dateianhang
    const todoItem = document.createElement('li');
    todoItem.className = 'todo-item';
    todoItem.dataset.id = todo.id;
    if(todo.completed)
    {
        todoItem.classList.add('completed');
    }
    else if (isOverdue(todo.deadline))
    {
        todoItem.classList.add('overdue');
    }
    todoItem.innerHTML = `
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
        ${todo.file ? `<button class="download-btn">Download</button>` : ''}
    </div>
    `;

    const completeBtn = todoItem.querySelector('.complete-btn');
    completeBtn.addEventListener('click', () => toggleTodoComplete(todo.id));

    const deleteBtn = todoItem.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));

    const downloadBtn = todoItem.querySelector('.download-btn');
    if(downloadBtn)
    {
        downloadBtn.addEventListener('click', () => {
            if(todo.file)
            {
                const dataUrl = `data: text/plain; base64,${todo.file}`;
                downloadFile(dataUrl, todo.title);
            }
        });
    }
    return todoItem;
}

/**
 * Datei herunterladen
 * @param {string} dataUrl - Die Base64-URL der Datei
 * @param {string} fileName - Der Name der Datei
 * 
 * Diese Funktion erstellt einen temporären Link und klickt ihn an,
 * um den Download einer Datei zu initiieren.
 * 
 * Ressource: https://developer.mozilla.org/de/docs/Web/API/HTMLAnchorElement/download
 */
function downloadFile(dataUrl, fileName) {
    // TODO: Implementiere den Download der Datei
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = fileName + '.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Todo als erledigt markieren oder wiederherstellen
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

        // Erfolgsmeldung anzeigen
        const status = todos[todoIndex].completed ? 'erledigt' : 'wiederhergestellt';
        showSuccessMessage(`Aufgabe als ${status} markiert!`);
    }
}

// Todo löschen
function deleteTodo(todoId) {
    // Todo-Objekt finden
    const todo = todos.find(todo => todo.id === todoId);

    if (!todo) return;

    // Nachfragen, ob das Todo wirklich gelöscht werden soll
    if (confirm(`Möchtest du die Aufgabe "${todo.title}" wirklich löschen?`)) {
        // Todo aus dem Array entfernen
        todos = todos.filter(todo => todo.id !== todoId);

        // Todos im LocalStorage speichern
        saveTodosToLocalStorage();

        // Todo-Liste aktualisieren
        renderTodoList();

        // Erfolgsmeldung anzeigen
        showSuccessMessage('Aufgabe erfolgreich gelöscht!');
    }
}

// Erfolgsmeldung anzeigen
function showSuccessMessage(message) {
    // Bestehende Meldung entfernen, falls vorhanden
    const existingMessage = document.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Neue Meldung erstellen
    const messageElement = document.createElement('div');
    messageElement.className = 'success-message';
    messageElement.textContent = message;
    messageElement.style.position = 'fixed';
    messageElement.style.bottom = '20px';
    messageElement.style.right = '20px';
    messageElement.style.padding = '10px 20px';
    messageElement.style.backgroundColor = '#4CAF50';
    messageElement.style.color = 'white';
    messageElement.style.borderRadius = '5px';
    messageElement.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    messageElement.style.zIndex = '1000';
    messageElement.style.transition = 'opacity 0.5s';

    // Meldung zum Dokument hinzufügen
    document.body.appendChild(messageElement);

    // Meldung nach 3 Sekunden ausblenden
    setTimeout(() => {
        messageElement.style.opacity = '0';

        // Meldung nach dem Ausblenden entfernen
        setTimeout(() => {
            messageElement.remove();
        }, 500);
    }, 3000);
}

// Prüfen, ob ein Datum in der Vergangenheit liegt
function isOverdue(dateString) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Uhrzeit auf 00:00:00 setzen

    const deadline = new Date(dateString);

    return deadline < today;
}

// Datum formatieren
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// App initialisieren, wenn das DOM geladen ist
document.addEventListener('DOMContentLoaded', initApp);
