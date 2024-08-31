import ExcelJS from 'exceljs';

const generateBook = (wikiData) => {
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

    const workbook = new ExcelJS.Workbook();

    yearsArray.forEach((year, index) => {
        const worksheet = workbook.addWorksheet(year);
        const headerArray = headersObject[year];

        let columnArray = [];
        headerArray.forEach((header) => {
            columnArray.push({
                header: header,
                key: header,
            });
        });

        worksheet.columns = columnArray;

        const models = wikiData[index][year];

        models.forEach((model) => {
            worksheet.addRow(model);
        });
    });

    workbook.xlsx
        .writeFile('Test.xlsx')
        .then(() => console.log('Workbook saved'));
};

export default generateBook;
