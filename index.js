const { app, BrowserWindow } = require('electron');
const path = require('path');
const { ipcMain } = require('electron');

let mainWindow; // Declare a variable to store the current window instance

ipcMain.on('asynchronous-message', (event, arg) => {
  if (arg === 'goToHomePage') {
    createWindow();
  } else if (arg === 'goToWindow2') {
    createSecondWindow();
  } else if (arg === 'goToExtraWindow') {
    createExtraWindow();
  }
});

const createWindow = () => {
  console.log("createWindow() function in index.js called Current time is:", new Date());
  if (mainWindow) {
    mainWindow.close(); // Close the current window
  }
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.loadFile('index.html');
  mainWindow = win; // Update the current window instance
};

const createSecondWindow = () => {
  console.log("createSecondWindow() function in index.js called Current time is:", new Date());
  if (mainWindow) {
    mainWindow.close(); // Close the current window
  }
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.loadFile('characterHTMLs/window2.html');
  mainWindow = win; // Update the current window instance
};

const createExtraWindow = () => {
  console.log("createExtraWindow() function in index.js called Current time is:", new Date());
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  win.loadFile('extraWindow.html');
};

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});