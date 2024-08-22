import puppeteer from 'puppeteer';

const getData = async () => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto(
        'https://hotwheels.fandom.com/wiki/List_of_1978_Hot_Wheels',
        {
            waitUntil: 'domcontentloaded',
        }
    );

    const tables = await page.evaluate(() => {
        const tables = document.querySelectorAll('table.jquery-tablesorter');

        let headingRows = [];
        let rowsArrays = [];

        tables.forEach((table) => {
            headings = table.querySelectorAll('tr > th');
            rows = table.querySelectorAll('tbody > tr');

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

        return { year_models };
    });

    console.log(tables);

    await browser.close();
};

export default getData;
