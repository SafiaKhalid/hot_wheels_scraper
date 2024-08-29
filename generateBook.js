import ExcelJS from 'exceljs';

const generateBook = (wikiData) => {
    console.log(wikiData);

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Default year');

    worksheet.columns = [
        { header: 'Id', key: 'id', width: 10 },
        { header: 'Name', key: 'name', width: 32 },
        { header: 'D.O.B.', key: 'DOB', width: 10, outlineLevel: 1 },
    ];

    /* workbook.xlsx
        .writeFile('Test.xlsx')
        .then(() => console.log('Workbook saved')); */
};

export default generateBook;
