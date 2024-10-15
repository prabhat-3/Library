document.getElementById('file-input').addEventListener('change', handleFile);

function handleFile(event) {
    const file = event.target.files[0];
    const fileExtension = file.name.split('.').pop();

    if (fileExtension === 'xlsx') {
        handleExcelFile(file);
    } else if (fileExtension === 'pdf') {
        handlePdfFile(file);
    } else {
        alert('Unsupported file type!');
    }
}

function handleExcelFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        analyzeData(jsonData);
    };
    reader.readAsArrayBuffer(file);
}

function handlePdfFile(file) {
    const reader = new FileReader();
    reader.onload = async function(e) {
        const arrayBuffer = e.target.result;
        const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
        const page = pdfDoc.getPage(0);
        const textContent = await page.getTextContent();
        analyzePdfData(textContent);
    };
    reader.readAsArrayBuffer(file);
}

function analyzeData(data) {
    document.getElementById("analysis-output").textContent = JSON.stringify(data, null, 2);
}

function analyzePdfData(textContent) {
    const textItems = textContent.items.map(item => item.str).join(' ');
    document.getElementById("analysis-output").textContent = textItems;
}
