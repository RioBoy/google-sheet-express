const configGoogleSheetEnv = {
  dev: {
    googleClientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL_DEV,
    googleServicePrivateKey: process.env.GOOGLE_PRIVATE_KEY_DEV,
  },
  prod: {
    googleClientEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL_DEV_PROD,
    googleServicePrivateKey: process.env.GOOGLE_PRIVATE_KEY_PROD,
  },
};

const configGoogleSheetPlatform = {
  dev: {
    webGX: {
      spreadSheetId: process.env.WEB_GX_SPREAD_SHEET_ID_DEV,
      sheetId: process.env.WEB_GX_SHEET_ID_DEV,
    },
    meta: {
      spreadSheetId: process.env.META_SPREAD_SHEET_ID_DEV,
      sheetId: process.env.META_SHEET_ID_DEV,
    },
    googleAds: {
      spreadSheetId: process.env.GOOGLE_ADS_SPREAD_SHEET_ID_DEV,
      sheetId: process.env.GOOGLE_ADS_SHEET_ID_DEV,
    },
    googleVideo: {
      spreadSheetId: process.env.GOOGLE_VIDEO_SPREAD_SHEET_ID_DEV,
      sheetId: process.env.GOOGLE_VIDEO_SHEET_ID_DEV,
    },
    other: {
      spreadSheetId: process.env.OTHER_SPREAD_SHEET_ID_DEV,
      sheetId: process.env.OTHER_SHEET_ID_DEV,
    },
  },
  prod: {
    webGX: {
      spreadSheetId: process.env.WEB_GX_SPREAD_SHEET_ID_PROD,
      sheetId: process.env.WEB_GX_SHEET_ID_PROD,
    },
    meta: {
      spreadSheetId: process.env.META_SPREAD_SHEET_ID_PROD,
      sheetId: process.env.META_SHEET_ID_PROD,
    },
    googleAds: {
      spreadSheetId: process.env.GOOGLE_ADS_SPREAD_SHEET_ID_PROD,
      sheetId: process.env.GOOGLE_ADS_SHEET_ID_PROD,
    },
    googleVideo: {
      spreadSheetId: process.env.GOOGLE_VIDEO_SPREAD_SHEET_ID_PROD,
      sheetId: process.env.GOOGLE_VIDEO_SHEET_ID_PROD,
    },
    other: {
      spreadSheetId: process.env.OTHER_SPREAD_SHEET_ID_PROD,
      sheetId: process.env.OTHER_SHEET_ID_PROD,
    },
  },
};

module.exports = {
  configGoogleSheetEnv,
  configGoogleSheetPlatform,
};
