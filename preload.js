const { contextBridge, ipcRenderer } = require('electron');


contextBridge.exposeInMainWorld('electron', {
  loadPage: (page) => ipcRenderer.send('load-page', page),
  openBrowser: (url) => ipcRenderer.send('open-browser', url),
  ipcRenderer: ipcRenderer
});
contextBridge.exposeInMainWorld('electronAPI', {
  showPasswordDialog: () => ipcRenderer.invoke('show-password-dialog')
});