import getData from './getData.js';
import generateBook from './generateBook.js';

let wikiData = [];

// Year range (inclusive)
// Min year - 1974
// Max year - 2025
for (let i = 2010; i <= 2015; i++) {
    let object = {};
    let data = await getData(i);
    object[i] = data;

    wikiData.push(object);
}

// Log data to console
/* console.log(JSON.stringify(wikiData)); */

generateBook(wikiData);
