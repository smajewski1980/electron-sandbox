const { app, BrowserWindow, ipcMain, Tray, Menu } = require("electron/main");
const path = require("node:path");
const { getDataHandler } = require("./ipc-handlers/getDataHandler");
const { sendQueryDataHandler } = require("./ipc-handlers/sendQueryDataHandler");

// for the tray icon which gets set below
let tray = null;

const createWindow = () => {
  const win = new BrowserWindow({
    // width: 800,
    // height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    accentColor: "darkorchid",
    icon: `${path.join(__dirname, "/assets/test_icon.png")}`,
    // using the below line loses the os controls
    // fullscreen: true,
  });

  Menu.setApplicationMenu(null);
  // i like it to open on top of everything
  win.setAlwaysOnTop(true);
  // this releases it so other windows can be on top again, the time is a magic number
  setTimeout(() => {
    win.setAlwaysOnTop(false);
  }, 500);
  // win.setAccentColor("firebrick"); <--this is just the part above the menu bar
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
  ipcMain.handle("sendQueryData", sendQueryDataHandler);

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
