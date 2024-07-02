const { contextBridge, ipcRenderer } = require('electron');
const puppeteer = require('puppeteer');

contextBridge.exposeInMainWorld('electron', {
  loadPage: (page) => ipcRenderer.send('load-page', page),
  openBrowser: async (url) => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto(url);
},
closeBrowser: async () => {
    const browser = await puppeteer.launch({ headless: false });
    await browser.close();
},
ipcRenderer: ipcRenderer
});