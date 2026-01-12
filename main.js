const { app, BrowserWindow, ipcMain, Tray } = require("electron/main");
const path = require("node:path");
const { getDataHandler } = require("./ipc-handlers/getDataHandler");

// for the tray icon which gets set below
let tray = null;

const createWindow = () => {
  const win = new BrowserWindow({
    // width: 800,
    // height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    icon: `${path.join(__dirname, "/assets/test_icon.png")}`,
    // using the below line loses the os controls
    // fullscreen: true,
  });
  win.loadFile("index.html");
  // the below line preserves the os controls
  win.maximize();

  // open the dev tools in development
  if (!app.isPackaged) {
    win.webContents.openDevTools();
  }
};

app.whenReady().then(() => {
  const tray = new Tray(path.join(__dirname, "/assets/test_icon.png"));

  // "testEvent" is the "channel name"(custom event) that is called from renderer through the preload script
  ipcMain.handle("testEvent", async (e, message) => {
    console.log(`heres a message from the "frontend": ${message.message}`);
    return "thanks for the message!";
  });

  ipcMain.handle("getData", getDataHandler);

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
