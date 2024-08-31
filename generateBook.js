import ExcelJS from 'exceljs';

const generateBook = (wikiData) => {
    /* console.log(JSON.stringify(wikiData)); */

    let yearsArray = [];
    let headersObject = {};

    wikiData.forEach((yearObject) => {
        yearsArray.push(Object.keys(yearObject));
        Object.values(yearObject).forEach((modelObjects) => {
            let objectArray = [];

            modelObjects.forEach((modelObject) => {
                objectArray.push(Object.keys(modelObject));
            });

            objectArray = objectArray.flat();
            objectArray = Array.from(new Set(objectArray));
            headersObject[Object.keys(yearObject)[0]] = objectArray;
        });
    });

    yearsArray = yearsArray.flat();
    console.log('After flat:', yearsArray);

    console.log('Model keys: ', headersObject);

    const workbook = new ExcelJS.Workbook();

    yearsArray.forEach((year, index) => {
        const worksheet = workbook.addWorksheet(year);
        const headerArray = headersObject[year];

        let columnArray = [];
        headerArray.forEach((header) => {
            columnArray.push({
                header: header,
                key: header,
                /* style: {
                    fill: {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: {
                            argb: 'FFFF0000',
                        },
                    },
                }, */
            });
        });

        worksheet.columns = columnArray;

        const yearData = wikiData[index][year];
        console.log('yearData: ', yearData);
    });

    /* workbook.xlsx
        .writeFile('Test.xlsx')
        .then(() => console.log('Workbook saved')); */
};

export default generateBook;

//Next - write all rows to worksheets, make sure each value matches to key/correct column
//Column header styling (background colour)
