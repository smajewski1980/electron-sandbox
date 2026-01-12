const { Pool } = require("pg");
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
const path = require("node:path");
const { app } = require("electron/main");

// Determine the correct path for the .env file
const envPath = app.isPackaged
  ? path.join(process.resourcesPath, ".env")
  : path.join(__dirname, ".env");

// Load environment variables
const myEnv = dotenv.config({ path: envPath });
dotenvExpand.expand(myEnv);

// postgres credentials
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;
