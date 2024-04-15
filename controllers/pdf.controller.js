const { generatePDF } = require('../utils');

exports.createPDF = async (req, res) => {
    try {
        const html = req.body.html; // Assuming you send the HTML content in the body under a property named 'html'
        const pdfBuffer = await generatePDF(html);
        res.writeHead(200, {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'attachment; filename="download.pdf"',
        });
        res.end(pdfBuffer);
    } catch (error) {
        res.status(500).send('Server Error: Unable to generate PDF');
    }
};