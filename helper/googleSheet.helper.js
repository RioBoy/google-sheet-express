const moment = require('moment');
const _ = require('lodash');
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const {
  configGoogleSheetEnv,
  configGoogleSheetPlatform,
} = require('../config/googleSheet.config');
const { inDevEnvironment } = require('./checkEnv.helper');

const getGoogleSheetEnvirontment = (platform = '') => {
  const env = inDevEnvironment ? 'dev' : 'prod';

  return {
    env: configGoogleSheetEnv[env],
    platform: configGoogleSheetPlatform[env][platform],
  };
};

const configDataGoogleSheet = (data = {}) => {
  const today = moment();

  const newRow = {
    Fullname: data.fullname,
    Email: data.email,
    Address: data.address,
    Phone: data.phoneNumber,

    Packet: data.name,
    Speed: data.speed,
    Location: data.location,

    Latitude: data.latitude,
    Longitude: data.longitude,
    Datetime: today.format('DD MMMM YYYY HH:mm a'),
    IsCovered: data.isCovered ? 'Covered' : 'Not Covered',
    ClosestPole: data.closestPole,
    ClosestFDB: data.closestFDB,
    CompanyName: data.companyName,
    CompanyPhone: data.companyPhoneNumber,
    CompanyAddress: data.companyAddress,
  };

  return newRow;
};

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

const sendToGoogleSheet = async (
  platform = '',
  data = {},
  callback = () => {},
) => {
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

    await sheet
      .addRow(data)
      .then((res) => {
        if (_.isFunction(callback)) {
          callback();
        }
      })
      .catch((error) => {
        console.log('error: ', error);
      });
  } catch (error) {
    console.log('error: ', error);
  }
};

module.exports = {
  getGoogleSheetEnvirontment,
  configDataGoogleSheet,
  sendToGoogleSheet,
};
