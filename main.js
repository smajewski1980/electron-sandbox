const { app, BrowserWindow, ipcMain } = require("electron/main");
const path = require("node:path");
const testData = require("./data");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.loadFile("index.html");
};

app.whenReady().then(() => {
  ipcMain.handle("testEvent", async (e, message) => {
    console.log(message);
    console.log(`heres a message from the "frontend": ${message.message}`);
    return "thanks for the message!";
  });

  ipcMain.handle("getData", async (e, idToGet) => {
    const result = await pool.query(
      "select * from records order by id desc limit 5",
    );
    return result.rows;
    // const target = testData.filter((obj) => obj.id === parseInt(idToGet.id));
    // return target;
  });

  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
