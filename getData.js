import puppeteer from 'puppeteer';

const getData = async () => {
    const loadData = () => {
        const tables = document.querySelectorAll('table:not(:last-child)');

        let headingRows = [];
        let rowsArrays = [];
        let tableArray = [];

        tables.forEach((table) => {
            /* let headings;
                let rows; */

            /* try {
                    if (table.firstElementChild.nodeName == 'THEAD') {
                        headings = table.querySelectorAll('tr > th');
                        rows = table.querySelectorAll('tbody > tr');
                        tableArray.push('true');
                    } else {
                        const headings = table.querySelector('tbody > tr:first-child');
                    const rows = table.querySelectorAll(
                        'tbody > tr:not(:first-child)'
                    );
                        tableArray.push('false');
                    }
                } catch (error) {
                    console.log(error);
                } */

            tableArray.push(table.firstElementChild.nodeName);
            const headings = table.querySelectorAll('tr > th');
            const rows = table.querySelectorAll('tbody > tr');

            let headingNested = [];
            headings.forEach((heading) => {
                headingNested.push(heading.innerText);
            });
            headingRows.push(headingNested);

            let rowsNested = [];
            rows.forEach((row) => {
                rowsNested.push(row);
            });
            rowsArrays.push(rowsNested);
        });

        let year_models = [];

        headingRows.forEach((headingRow, headingRowIndex) => {
            rowsArrays[headingRowIndex].forEach((row) => {
                let modelObject = {};

                headingRow.forEach((heading, headingIndex) => {
                    modelObject[heading] =
                        row.querySelectorAll('td')[headingIndex].innerText;
                });

                year_models.push(modelObject);
            });
        });

        return { year_models, headingRows, tableArray };
    };

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto(
        'https://hotwheels.fandom.com/wiki/List_of_1988_Hot_Wheels',
        {
            waitUntil: 'domcontentloaded',
        }
    );

    const tables = await page.evaluate(
        /* document.addEventListener('DOMContentLoaded', () => {}); */

        loadData
    );

    console.log(tables);

    await browser.close();
};

export default getData;

// check if first child of table is header
// if is header, continue with element selection
// if not (is part of body), save first row into header array, save rest of table in table content array
