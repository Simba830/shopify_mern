/*
  The setup check is put in place for 3 reasons:
  - Experienced developers sometimes completely forgetting to set things up.
  - Ensure when deploying on server everything is working as expected.
  - Easier debugging for unexperienced developers / just starting out.
*/

const setupCheck = () => {
  const {
    SHOPIFY_API_KEY: apiKey,
    SHOPIFY_API_SECRET: apiSecret,
    SHOPIFY_API_SCOPES: apiScopes,
    SHOPIFY_APP_URL: appUrl,
    SHOPIFY_API_VERSION: apiVersion,
    MONGO_URL: dbCon,
    ENCRYPTION_STRING: encString,
    PORT: port,
  } = process.env;
  let errorCount = 0;

  if (typeof apiKey === "undefined") {
    console.error("--> API Key is undefined.");
    errorCount++;
  }
  if (typeof apiSecret === "undefined") {
    console.error("--> API Secret is undefined.");
    errorCount++;
  }
  if (typeof apiScopes === "undefined") {
    console.error("--> API Scopes are undefined.");
    errorCount++;
  }
  if (typeof appUrl === "undefined") {
    console.error("--> App URL is undefined.");
    errorCount++;
  } else if (!appUrl.includes("https://")) {
    console.error("--> Please use HTTPS for SHOPIFY_APP_URL.");
  }
  if (typeof apiVersion === "undefined") {
    console.error("--> API Version is undefined.");
    errorCount++;
  }
  if (typeof encString === "undefined") {
    console.error("--> Encryption String is undefined.");
    errorCount++;
  }
  if (typeof dbCon === "undefined") {
    console.warn(
      "--> Mongo Connection URL is undefined. Using 'mongodb://127.0.0.1:27017/shopify-express-app' instead."
    );
  }
  if (typeof port === "undefined") {
    console.warn(
      "--> Port is undefined. Using 8081. If you're hosting on Northflank / Heroku, you can safely ignore this error."
    );
  }

  if (errorCount > 5) {
    console.error(
      "\n\n\n\n--> .env file is either not reachable or not setup properly. Please refer to .env.example file for the setup.\n\n\n\n"
    );
  }
};

module.exports = setupCheck;
