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
    const table = document.querySelector('table');
    const toy_num = table.querySelector('tbody > tr > td').innerText;

    return { toy_num };
  });

  console.log(tables);

  await browser.close();
};

getData();
