import puppeteer from 'puppeteer';

const getDataNodeList = async () => {
    const loadData = () => {
        let yearModels = [];

        const table = document.querySelector('table');
        const headings = table.querySelectorAll('tr > th');
        const rows = table.querySelectorAll('tr:not(:first-child)');

        rows.forEach((row) => {
            let object = {};

            headings.forEach((heading, index) => {
                object[heading.innerText] =
                    row.querySelectorAll('td')[index].innerText;
            });
            yearModels.push(object);
        });

        return { yearModels };
    };

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto(
        'https://hotwheels.fandom.com/wiki/List_of_2012_Hot_Wheels',
        {
            waitUntil: 'domcontentloaded',
        }
    );

    const tables = await page.evaluate(loadData);

    console.log(tables);

    await browser.close();
};

export default getDataNodeList;
