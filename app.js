const express = require('express');

require('dotenv').config();

const { sendToGoogleSheet } = require('./helper/googleSheet.helper');
const { configDataGoogleSheet } = require('./config/googleSheet.config');

const app = express();
const port = 9000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/send', async (req, res) => {
  try {
    const newGoogleSheetRow = await configDataGoogleSheet({
      fullname: 'Test',
      email: 'test@gmail.com',
      address: 'Jl. Test',
      phoneNumber: '081234567890',
      name: 'Lite 100',
      speed: '100',
      location: 'Lite 100',
      latitude: -8.1531,
      longitude: 115.1531,
      isCovered: 'Covered',
      closestPole: 'GX-25-6006 (324.51 Meters)',
      closestFDB: 'GX-DPS-86760 (174.28 Meters)',
      companyName: '',
      companyPhoneNumber: '',
      companyAddress: '',
    });

    const response = await sendToGoogleSheet('webGX', newGoogleSheetRow);

    return res.json({
      success: true,
      message: 'Data successfully added to Google Sheet',
      result: response,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to add data to Google Sheet',
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
