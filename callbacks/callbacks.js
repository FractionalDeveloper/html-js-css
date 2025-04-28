export const STORAGE_KEY = "TODOS"

const meineTolleFunktion = function() {
    console.log("tolle Funktion!");
}

export const arrowFunktion = () => {
    console.log('hier eine arrow function.')
}

const meineSuperTolleFunktion = function() {
    console.log("super tolle Funktion!");
}

const meineSuperDuperTolleFunktion = function() {
    console.log("super duper tolle Funktion!");
}

function begrüßung(name, callback) {
    console.log(name);
    callback();
}

//begrüßung("Rebar", meineTolleFunktion);
//begrüßung("Rebar", meineSuperTolleFunktion);
//begrüßung("Rebar", meineSuperDuperTolleFunktion);

//begrüßung("Rebar", arrowFunktion);
//begrüßung("Rebar", () => {
//    console.log('eine inline arrow function')
//});

//setTimeout(meineSuperDuperTolleFunktion, 5000)
//
//setTimeout(function() {
//    console.log("Erste Operation abgeschlossen");
//
//    setTimeout(function() {
//        console.log("Zweite Operation abgeschlossen");
//
//        setTimeout(function() {
//            console.log("Dritte Operation abgeschlossen");
//
//            setTimeout(function() {
//                console.log("Vierte Operation abgeschlossen");
//            }, 1000);
//        }, 1000);
//    }, 1000);
//}, 1000);