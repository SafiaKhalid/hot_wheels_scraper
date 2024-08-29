import getData from './getData.js';

let wikiData = [];

/* for (let i = 1974; i <= 2025; i++) {
    let object = {};
    let data = await getData(i);
    object[i] = data;

    wikiData.push(object);
} */

for (let i = 1974; i <= 1976; i++) {
    let object = {};
    let data = await getData(i);
    object[i] = data;

    wikiData.push(object);
}

console.log(JSON.stringify(wikiData));

//Save data to spreadsheet (excel?) with each year in different worksheet
