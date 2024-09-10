import getData from './getData.js';
import generateBook from './generateBook.js';

let wikiData = [];

for (let i = 2010; i <= 2015; i++) {
    let object = {};
    let data = await getData(i);
    object[i] = data;

    wikiData.push(object);
}

/* console.log(JSON.stringify(wikiData)); */

generateBook(wikiData);
