const { contextBridge, ipcRenderer } = require('electron');
const puppeteer = require('puppeteer-core');

const PCR = require('puppeteer-chromium-resolver');

const stats = PCR();

contextBridge.exposeInMainWorld('electron', {
  loadPage: (page) => ipcRenderer.send('load-page', page),
  openBrowser: async (url) => {
    const browser = await puppeteer.launch({
       headless: false,
       executablePath: executablePath(),
    });
    const page = await browser.newPage();
    await page.goto(url);
},
closeBrowser: async () => {
    const browser = await puppeteer.launch({
       headless: false,
       executablePath: stats.executablePath,
       });
    await browser.close();
},
ipcRenderer: ipcRenderer
});