const PDFDocument = require('pdfkit');
const fs = require('fs');
const https = require('https');
const url = 'https://pastebin.com/raw/0u4XdeAE';

const patientData = ()=> (
    new Promise( (resolve, reject)=> {
    fetch('https://pastebin.com/raw/0u4XdeAE')
  .then(response => response.json())
  .then(data => {
    resolve(data);
    // Do something with the data
  })
  .catch(error => {
    console.error('Error:', error);
  })
})
)
    

const pdfFile = async ()=>{
    const parsedData = await patientData();
  
  // Example usage
  const profile = parsedData.results[0];

const doc = new PDFDocument();

const outputPath = 'Medical_Report.pdf';
doc.pipe(fs.createWriteStream(outputPath));
doc.info.Title = 'Medical Report';

// Generate a card for each test in the profile
profile.investigation.forEach((investigation) => {

  const testValue = investigation.observations;

  testValue.forEach((data) => {
    doc
      .font('Helvetica-Bold')
      .fontSize(16)
      .text(data.name)  
    doc
      .font('Helvetica')
      .fontSize(12)
      .text(`Observation Time: ${data.observation_time}`)
      .text(`Value: ${data.value} ${data.unit}`)
      .text(`Min Value: ${data.MinValue}`)
      .text(`Max Value: ${data.MaxValue}`)
      .text(`Method: ${data.method}`)
      .text(`Impression: ${data.impression}`);  
    doc.moveDown(1);
  });

doc.end();
const axios = require('axios');
const fs = require('fs');
 
const apiUrl = 'https://pastebin.com/0u4XdeAE'; // Replace with your API endpoint URL
const filePath = './pdf/Medical_Report.pdf'; // Replace with the path to your PDF file
 
async function uploadPDFFile() {
  try {
    // Read the file data
    const fileData = fs.readFileSync(filePath);
 
    // Create a form data object
    const formData = new FormData();
    formData.append('file', fileData, 'Medical_Report.pdf');
 
    // Make the API request
    const response = await axios.post(apiUrl, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
 
    console.log('File uploaded successfully:', response.data);
  } catch (error) {
    console.error('Error uploading file:', error.response.data);
  }
} 
uploadPDFFile();
})
}
// pdfFile();
