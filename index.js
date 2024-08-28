import getData from './getData.js';

let wikiData = [];

for (let i = 1974; i <= 2025; i++) {
    let object = {};
    let data = await getData(i);
    object[i] = data;

    wikiData.push(object);
}

console.log(wikiData);
