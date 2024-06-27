const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require("url")

let mainWindow;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false,
    }
  });
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, "index.html"),
    protocol: "file",
    slashes: true
  }));

  mainWindow.webContents.openDevTools()

  ses.on('will-redirect', (event, oldUrl, newUrl, isMainFrame, httpResponseCode, httpStatusText) => {
    console.log(`Redirecting from ${oldUrl} to ${newUrl}`);
    if (newUrl === '/uefi.html') {
      mainWindow.loadFile(path.join(__dirname, 'uefi.html'));
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  })
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
  app.quit()
})