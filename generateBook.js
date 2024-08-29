import ExcelJS from 'exceljs';

const generateBook = (wikiData) => {
    console.log(JSON.stringify(wikiData));

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

    yearsArray.forEach((year) => {
        const worksheet = workbook.addWorksheet(year);
        const headerArray = headersObject[year];

        let columnArray = [];
        headerArray.forEach((header) => {
            columnArray.push({ header: header, key: header });
        });

        worksheet.columns = columnArray;
    });

    /* worksheet.columns = [
        { header: 'Id', key: 'id', width: 10 },
        { header: 'Name', key: 'name', width: 32 },
        { header: 'D.O.B.', key: 'DOB', width: 10, outlineLevel: 1 },
    ]; */

    workbook.xlsx
        .writeFile('Test.xlsx')
        .then(() => console.log('Workbook saved'));
};

export default generateBook;
