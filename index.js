import getData from './getData.js';
import generateBook from './generateBook.js';

let wikiData = [];

/* for (let i = 1974; i <= 2025; i++) {
    let object = {};
    let data = await getData(i);
    object[i] = data;

    wikiData.push(object);
} */

for (let i = 1994; i <= 1994; i++) {
    let object = {};
    let data = await getData(i);
    object[i] = data;

    wikiData.push(object);
}

generateBook(wikiData);
