# Hot Wheels Scraper

Scraper that uses data from the [Hot Wheels Wiki](https://hotwheels.fandom.com/wiki/Hot_Wheels) to return an array of objects of each Hot Wheels model sorted by year.

## Packages used
- [Puppeteer](https://pptr.dev/)
- [ExcelJS](https://www.npmjs.com/package/exceljs?activeTab=readme)

### Edit year range

Edit year range in index.js file to change which years are added to the workbook. Both the minimum and maximum years are inclusive, with the largest range being 1974 - 2025.
```
for (let i = 2010; i <= 2015; i++) {
    let object = {};
    let data = await getData(i);
    object[i] = data;

    wikiData.push(object);
}
```

### Edit workbook name/location

Default workbook name is 'HW-Workbook.xlsx'. Edit workbook name in generateBook.js file or change location of saved workbook.
```
workbook.xlsx
        .writeFile('HW-Workbook.xlsx')
        .then(() => console.log('Workbook saved'));
```

### Running scrapper

Run in terminal:


```
node index.js
```
