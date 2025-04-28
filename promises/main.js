let aPromise = new Promise((resolve, reject) => {
    // hier können wir z. B. eine Aktion ausführen die eine gewisse Zeit in Anspruch nimmt.
    let success = false;

    if (success) {
        const response = {status: 'gut gegangen', message: 'Passt'}
        resolve(response);
    } else {
        reject("Fehler - ne, konnte nicht verarbeiten");
    }
});

aPromise
.then(value => {
    console.log(value);
    return value;
})
.then(value => {
    console.log(value);
    return {message: value, ownMessage: "Hey, ich habe hier noch was hinzugefügt"}
})
.then(value => {
    console.log(value);
    // {message: {staus: 'gut gegangen', message: 'Passt'}, ownMessage: 'Hey, ich ...'}
    console.log(value.message)
    // {staus: 'gut gegangen', message: 'Passt'}
    console.log(value.ownMessage)
    // "Hey, ich ...."
})
.catch(value => {
    console.log(value);
    return "wieso? " + value;
})
.then(value => {
console.log(value);
})
.finally(() => {
console.log('fertig');
})


fetch('https://hook.eu2.make.com/cptpabxdydp3zalk1fnaqze6robx8qij')
.then(response => console.log(response.json()));