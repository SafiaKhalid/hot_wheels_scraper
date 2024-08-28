import getData from './getData.js';

let wikiData = [];

for (let i = 1998; i < 2000; i++) {
    let object = {};
    let data = await getData(1998);
    object[i] = data;

    wikiData.push(object);
}

console.log(wikiData);
