const { contextBridge, ipcRenderer } = require("electron/renderer");

// contextBridge.exposeInMainWorld("versions", {
//   node: () => process.versions.node,
//   chrome: () => process.versions.chrome,
//   electron: () => process.versions.electron,
//   ping: () => ipcRenderer.invoke("ping"),
// });

contextBridge.exposeInMainWorld("testFuncs", {
  testEvent: (channel, data) => ipcRenderer.invoke(channel, data),
  getData: (channel, data) => ipcRenderer.invoke(channel, data),
});
