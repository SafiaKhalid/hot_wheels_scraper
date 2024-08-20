import puppeteer from 'puppeteer';

const getData = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  const page = await browser.newPage();

  await page.goto('https://hotwheels.fandom.com/wiki/List_of_2022_Hot_Wheels', {
    waitUntil: 'domcontentloaded',
  });

  const tables = await page.evaluate(() => {
    const table = document.querySelector('table.wikitable');
    const headingsRow = table.querySelectorAll('tbody > tr > th');
    let headingsArray = [];

    headingsRow.forEach((heading) => {
      headingsArray.push(heading.innerText);
    });

    /* headings.forEach((heading) => {
      headingsArray.push(heading.innerText);
    }); */
    /* const rows = table.querySelectorAll('tbody > tr:not(:first-child)');
    let toys = [];

    for (let i = 0; i < rows.length; i++) {
      toys.push(rows[i].querySelector('td').innerText);
    } */

    return { headingsRow, headingsArray };
  });

  console.log(tables);

  await browser.close();
};

getData();
