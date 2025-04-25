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

// Initialisierung der App
function initApp() {
    // Event-Listener für die Navigation
    setupNavigation();
    
    // Event-Listener für das Todo-Formular
    setupTodoForm();
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

    todoForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Standardverhalten verhindern
        logNewTodo(); // Neues Todo in die Konsole loggen
        todoForm.reset(); // Formular zurücksetzen
    });

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
function logNewTodo() {
    // TODO: Implementiere die Funktion zum Erstellen und Loggen eines neuen Todos

    const title = document.getElementById('todo-title').value.trim();
    const assignee = document.getElementById('todo-assignee').value.trim();
    const deadline = document.getElementById('todo-deadline').value.trim();

    const newTodo = {
        id: Date.now(),
        titel: todoTitleInput,
        verantwortlicher: todoAssigneeInput,
        faelligkeit: todoDeadlineInput,
        erledigt: false,
        erstelltAm: new Date().toISOString()
    };

    console.log(newTodo);
}

// App initialisieren, wenn das DOM geladen ist
document.addEventListener('DOMContentLoaded', initApp);
