import ExcelJS from 'exceljs';

const generateBook = () => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Default year');

    workbook.xlsx
        .writeFile('Test.xlsx')
        .then(() => console.log('Workbook saved'));
};

export default generateBook;
