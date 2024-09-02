const { app, BrowserWindow } = require('electron/main')
const path = require('node:path')
const fs = require('fs');
const Store = require('electron-store');

const DEBUG = true;

/*----------------------------------------------------------------------------*/

try {
  require('electron-reloader')(module, {
    ignore: [
      "./minecraft/*"
    ]
  })
} catch {}

/*----------------------------------------------------------------------------*/

function createWindow () {
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    minWidth:(DEBUG)? 1250: 1000,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'logo.ico'),
    resizable: true
  })

  win.loadFile('index.html');
  win.removeMenu();
  if (DEBUG) {
    win.on("ready-to-show", () => {
      win.webContents.openDevTools();
    });
  }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
