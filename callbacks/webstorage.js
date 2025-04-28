const isDarkMode1 = sessionStorage.getItem('userDarkMode');
console.log(isDarkMode1);

localStorage.setItem("Name", "Rebar");
localStorage.setItem("isDarkMode", 'true');
//localStorage.setItem("lastVisit", new Date().toISOString());

const lastVisit = window.localStorage.getItem('lastVisit');
console.log(lastVisit);

//localStorage.removeItem('lastVisit');
//localStorage.clear();

const myObject = {
    name: "Rebar",
    alter: "34"
}

localStorage.setItem('user', JSON.stringify(myObject));

const userObject = JSON.parse(localStorage.getItem('user'));

console.log(userObject);

sessionStorage.setItem('userDarkMode', 'true');

const isDarkMode = sessionStorage.getItem('userDarkMode');

console.log(isDarkMode);