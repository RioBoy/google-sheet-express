const express = require('express');

require('dotenv').config();

const {
  configDataGoogleSheet,
  sendToGoogleSheet,
} = require('./helper/googleSheet.helper');

const app = express();
const port = 9000;

app.get('/', (req, res) => {
  const newGoogleSheetRow = configDataGoogleSheet({
    fullname: 'Test',
    email: 'test@gmail.com',
    address: '',
    phoneNumber: '',
    name: '',
    speed: '',
    location: '',
    latitude: '',
    longitude: '',
    isCovered: 'Covered',
    closestPole: 'GX-25-6006 (324.51 Meters)',
    closestFDB: 'GX-DPS-86760 (174.28 Meters)',
    companyName: '',
    companyPhoneNumber: '',
    companyAddress: '',
  });

  sendToGoogleSheet('webGX', newGoogleSheetRow);

  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
