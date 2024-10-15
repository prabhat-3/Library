const XLSX = require('xlsx'); // This helps us read Excel files

exports.handler = async function(event, context) {
  try {
    // Here, we'll read and process the uploaded file.
    const file = Buffer.from(event.body, 'base64'); // Convert the uploaded file from base64 format
    const workbook = XLSX.read(file, { type: 'buffer' }); // Read the Excel file
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]]; // Get the first sheet
    const jsonData = XLSX.utils.sheet_to_json(firstSheet); // Convert sheet to JSON data

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        data: jsonData, // This is the analysis result
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, message: error.message }),
    };
  }
};
