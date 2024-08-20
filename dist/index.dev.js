"use strict";

var _puppeteer = _interopRequireDefault(require("puppeteer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getData = function getData() {
  var browser, page, tables;
  return regeneratorRuntime.async(function getData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(_puppeteer["default"].launch({
            headless: false,
            defaultViewport: null
          }));

        case 2:
          browser = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(browser.newPage());

        case 5:
          page = _context.sent;
          _context.next = 8;
          return regeneratorRuntime.awrap(page["goto"]('https://hotwheels.fandom.com/wiki/List_of_2022_Hot_Wheels', {
            waitUntil: 'domcontentloaded'
          }));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(page.evaluate(function () {
            var table = document.querySelector('table');
            var headings = table.querySelector('tbody > tr').innerText;
            var headingsArray = headings.length;
            /* headings.forEach((heading) => {
              headingsArray.push(heading.innerText);
            }); */

            /* const rows = table.querySelectorAll('tbody > tr:not(:first-child)');
            let toys = [];
              for (let i = 0; i < rows.length; i++) {
              toys.push(rows[i].querySelector('td').innerText);
            } */

            return {
              headings: headings,
              headingsArray: headingsArray
            };
          }));

        case 10:
          tables = _context.sent;
          console.log(tables);
          _context.next = 14;
          return regeneratorRuntime.awrap(browser.close());

        case 14:
        case "end":
          return _context.stop();
      }
    }
  });
};

getData();