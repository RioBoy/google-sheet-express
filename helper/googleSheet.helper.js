const _ = require('lodash');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const { getGoogleSheetEnvirontment } = require('../config/googleSheet.config');

const configGoogleSheet = async (config = {}) => {
  const {
    SPREADSHEET_ID = '',
    SHEET_ID = '',
    GOOGLE_SERVICE_ACCOUNT_EMAIL = '',
    GOOGLE_PRIVATE_KEY = '',
  } = config;

  const serviceAccountAuth = new JWT({
    email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);

  await doc.loadInfo();

  return doc.sheetsById[SHEET_ID];
};

const sendToGoogleSheet = async (platform = '', data = {}) => {
  try {
    const {
      env: {
        googleClientEmail: GOOGLE_SERVICE_ACCOUNT_EMAIL,
        googleServicePrivateKey: GOOGLE_PRIVATE_KEY,
      },
      platform: { spreadSheetId: SPREADSHEET_ID, sheetId: SHEET_ID },
    } = await getGoogleSheetEnvirontment(platform);

    const sheet = await configGoogleSheet({
      SPREADSHEET_ID,
      SHEET_ID,
      GOOGLE_SERVICE_ACCOUNT_EMAIL,
      GOOGLE_PRIVATE_KEY,
    });

    const response = await sheet.addRow(data);

    return response.toObject();
  } catch (error) {
    console.log('error: ', error);
  }
};

module.exports = {
  configGoogleSheet,
  sendToGoogleSheet,
};
