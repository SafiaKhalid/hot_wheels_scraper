import puppeteer from 'puppeteer';

const getData = async (year) => {
    const loadData = () => {
        let yearArray = [];

        const tables = document.querySelectorAll('table:not(.mw-collapisble)');

        tables.forEach((table) => {
            //Check if table has headers
            const tableHead =
                table.firstElementChild.firstElementChild.firstElementChild
                    .nodeName;
            let headings;
            let rows;
            if (tableHead === 'TH') {
                headings = table.querySelectorAll('tr > th');
                rows = table.querySelectorAll('tr:not(:first-child)');
            } else {
                const headingsRow = table.querySelector('tr');
                headings = headingsRow.querySelectorAll('td');
                rows = table.querySelectorAll('tbody > tr:not(:first-child)');
            }

            rows.forEach((row) => {
                let object = {};

                headings.forEach((heading, index) => {
                    const rowContent = row.querySelectorAll('td');
                    let headingTitle = heading.innerText;
                    headingTitle = headingTitle.replace(/(^\w|\s\w)/g, (m) =>
                        m.toUpperCase()
                    );
                    //Check if any items in row are undefined
                    if (rowContent[index]) {
                        object[headingTitle.replace(/\s/g, '')] =
                            rowContent[index].innerText;
                    } else {
                        object[headingTitle] = '';
                    }
                });

                yearArray.push(object);
            });
        });

        return yearArray;
    };

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto(
        `https://hotwheels.fandom.com/wiki/List_of_${year}_Hot_Wheels`,
        {
            waitUntil: 'domcontentloaded',
        }
    );

    await new Promise((resolve) => setTimeout(resolve, 500));

    const tables = await page.evaluate(loadData);

    await browser.close();
    return tables;
};

export default getData;

//Ensure 1st row of model data is included
//Ensure duplicate col# included
