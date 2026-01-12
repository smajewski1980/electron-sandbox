const { contextBridge, ipcRenderer } = require("electron/renderer");

// "testFuncs" the name of the obj that is getting exposed in renderer window.testFuncs
contextBridge.exposeInMainWorld("testFuncs", {
  // these are the funcs accessible from renderer via window.<func>
  testEvent: (channel, data) => ipcRenderer.invoke(channel, data),
  getData: (channel, data) => ipcRenderer.invoke(channel, data),
});

contextBridge.exposeInMainWorld("sendQueryData", {
  sendQueryData: (channel, data) => ipcRenderer.invoke(channel, data),
});

// if we have a bunch of static data to use this would be the place to store it
contextBridge.exposeInMainWorld("sillyness", {
  silly1: () => "Silly message one.",
  silly2: () => "Silly message two.",
  silly3: () => "Silly message three.",
  silly4: () => "Silly message four.",
});

// i.e. error msgs

contextBridge.exposeInMainWorld("errors", {
  errorType1: "error type one, please try again",
  errorType2: "error type two, please try again",
  errorType3: "error type three, please try again",
  errorType4: "error type four, please try again",
  errorType5: "error type five, please try again",
});

contextBridge.exposeInMainWorld("password", {
  password: (pw) => ipcRenderer.invoke("password", pw),
});
