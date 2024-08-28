import puppeteer from 'puppeteer';

const getData = async () => {
    const loadData = () => {
        const tables = document.querySelectorAll('table:not(:last-child)');

        let headingRows = [];
        let rowsArrays = [];
        let tableOption;

        tables.forEach((table) => {
            let headings;
            let rows;

            if (table.firstElementChild.nodeName == 'thead') {
                headings = table.querySelectorAll('tr > th');
                rows = table.querySelectorAll('tbody > tr');
                tableOption = 'heading and body';
            } else {
                headings = table.querySelectorAll('tr:first-child > td');
                rows = table.querySelectorAll('tbody > tr');
                tableOption = 'body';
            }

            let headingNested = [];
            headings.forEach((heading) => {
                headingNested.push(heading.textContent);
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
                        row.querySelectorAll('td')[headingIndex].textContent;
                });

                year_models.push(modelObject);
            });
        });

        return { year_models, tableOption };
    };

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto(
        'https://hotwheels.fandom.com/wiki/List_of_1998_Hot_Wheels',
        {
            waitUntil: 'domcontentloaded',
        }
    );

    const tables = await page.evaluate(loadData);

    console.log(tables);

    await browser.close();
};

export default getData;

//Check rest of dates
