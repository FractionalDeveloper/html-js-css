// DOM-Elemente für die Navigation
const navAgeCheck = document.getElementById('nav-age-check');
const navTodo = document.getElementById('nav-todo');
const ageCheckPage = document.getElementById('age-check-page');
const todoPage = document.getElementById('todo-page');

// Initialisierung der App
function initApp() {
    // Event-Listener für die Navigation
    setupNavigation();
}

/**
 * Event-Listener für die Navigation einrichten
 * 
 * Diese Funktion soll die Klick-Events für die Menüpunkte der Navbar einrichten,
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
    // TODO: Implementiere die Navigation zwischen den Seiten
    // Hinweis: Du brauchst Event-Listener für die Navbar-Links

    navAgeCheck.addEventListener('click', function (event) {
        event.preventDefault();
        showPage(ageCheckPage);
        setActiveNavItem(navAgeCheck);
    });
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
 * Diese Funktion soll die ausgewählte Seite anzeigen und alle anderen Seiten ausblenden.
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
    // TODO: Implementiere das Ein- und Ausblenden der Seiten
    const allpages = document.querySelectorAll('.page');
    allpages.forEach(page => page.classList.add('hidden'));
    pageToShow.classList.remove('hidden');
}

/**
 * Den aktiven Navigationspunkt hervorheben
 * @param {HTMLElement} activeNavItem - Der aktive Navigationspunkt
 * 
 * Diese Funktion soll den angeklickten Menüpunkt visuell hervorheben.
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
    // TODO: Implementiere die Hervorhebung des aktiven Menüpunkts
    const navItems = document.querySelectorAll('.navbar-link');
    navItems.forEach(item => item.classList.remove('active'));
    activeNavItem.classList.add('active');
}

// App initialisieren, wenn das DOM geladen ist
document.addEventListener('DOMContentLoaded', initApp);
