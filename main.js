const { app, BrowserWindow,  ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: true,
      icon: "./programIcon.png",
      devTools: false
    },
  });

  mainWindow.loadFile('index.html');
}

app.on('ready', createWindow);

ipcMain.on('load-page', (event, page) => {
  const pagePath = path.join(__dirname, page);
  mainWindow.loadFile(pagePath);
});

ipcMain.on('open-browser', (event, url) => {
  createBrowserWindow(url);
});

app.on("window-all-closed", () => {
  app.quit()
})