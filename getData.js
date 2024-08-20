import puppeteer from 'puppeteer';

const getData = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto('https://hotwheels.fandom.com/wiki/List_of_1978_Hot_Wheels', {
    waitUntil: 'domcontentloaded',
  });

  const tables = await page.evaluate(() => {
    const table = document.querySelector('table.wikitable');
    const headingsRow = table.querySelectorAll('tr > th');
    let headingsArray = [];

    headingsRow.forEach((heading) => {
      headingsArray.push(heading.innerText);
    });

    const rows = table.querySelectorAll('tbody > tr:not(:first-child)');

    let year_models = [];

    rows.forEach((row) => {
      let object = {
        /* [headingsArray[0]]: row.querySelectorAll('td')[0].innerText,
        [headingsArray[1]]: row.querySelectorAll('td')[1].innerText,
        [headingsArray[2]]: row.querySelectorAll('td')[2].innerText,
        [headingsArray[3]]: row.querySelectorAll('td')[3].innerText,
        [headingsArray[4]]: row.querySelectorAll('td')[4].innerText, */
      };
      headingsArray.forEach((heading, index) => {
        object[heading] = row.querySelectorAll('td')[index].innerText;
      });

      year_models.push(object);
    });

    return { headingsArray, year_models };
  });

  console.log(tables);

  await browser.close();
};

export default getData;
