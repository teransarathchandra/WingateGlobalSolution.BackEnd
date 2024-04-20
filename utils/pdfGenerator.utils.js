const puppeteer = require('puppeteer');

const generatePDF = async (html) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(html);
    const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
            top: '2px',
            right: '2px',
            bottom: '2px',
            left: '2px'
        },
    });
    await browser.close();
    return pdfBuffer;
};

module.exports = generatePDF;