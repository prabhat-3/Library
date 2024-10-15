document.getElementById('file-input').addEventListener('change', async function(event) {
    const file = event.target.files[0];
    if (file) {
        await uploadAndAnalyzeFile(file); // Send the file to the Netlify function
    }
});

async function uploadAndAnalyzeFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/.netlify/functions/analyze-data', {
        method: 'POST',
        body: formData, // Send the file to the backend
    });

    const result = await response.json();
    console.log(result);
    displayAnalysis(result.data); // Display the analysis result
}

function displayAnalysis(data) {
    document.getElementById('analysis-output').textContent = JSON.stringify(data, null, 2);
}
