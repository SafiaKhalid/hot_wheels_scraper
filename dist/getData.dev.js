"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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
          return regeneratorRuntime.awrap(page["goto"]('https://hotwheels.fandom.com/wiki/List_of_1978_Hot_Wheels', {
            waitUntil: 'domcontentloaded'
          }));

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(page.evaluate(function () {
            var tables = document.querySelectorAll('table.wikitable');
            var headingRows = [];
            var rows = [];
            tables.forEach(function (table) {
              headingRows.push(table.querySelectorAll('tr > th').innerText);
              rows.push(table.querySelectorAll('tbody > tr:not(:first-child)'));
            });
            var year_models = []; //each table

            /* headingRows.forEach((headingRow, arrayIndex) => {
                headingRow.forEach((heading, index) => {
                    let object = {};
                    object[heading] =
                        rows[arrayIndex].querySelectorAll('td')[index].innerText;
                });
            }); */

            /* rows.forEach((row) => {
                let object = {
                    [headingsArray[0]]: row.querySelectorAll('td')[0].innerText,
            [headingsArray[1]]: row.querySelectorAll('td')[1].innerText,
            [headingsArray[2]]: row.querySelectorAll('td')[2].innerText,
            [headingsArray[3]]: row.querySelectorAll('td')[3].innerText,
            [headingsArray[4]]: row.querySelectorAll('td')[4].innerText,
                };
                  headingsArray.forEach((heading, index) => {
                    object[heading] = row.querySelectorAll('td')[index].innerText;
                });
                  year_models.push(object);
            }); */

            return {
              headingRows: headingRows,
              year_models: year_models
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

var _default = getData;
exports["default"] = _default;