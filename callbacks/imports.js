import {arrowFunktion, STORAGE_KEY} from './callbacks.js';

arrowFunktion();
console.log(STORAGE_KEY);

fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
.then(response => response)
.then(data => data.json())
.then(result => console.log(result))