const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const robot = require('robotjs');
const {Menu, globalShortcut} = require('electron');
const Store = require('electron-store');
let store = new Store();
const MultiClipboard = require('./scripts/multi-clipboard.js').MultiClipboard;
let multiClipboard = new MultiClipboard();

const path = require('path');
const url = require('url');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({width: 220,
    height: 240,
    show: false,
    frame: false});

  mainWindow.webContents.on('dom-ready', function() {
    console.log('dom-ready');
    refreshClipBoard();
  });
  
  mainWindow.on('hide', function() {
    refreshClipBoard();
  });

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true,
  }));
  
  multiClipboard.watchClipboard(store, require('electron').clipboard);

  mainWindow.on('closed', function() {
    mainWindow = null;
  });

  mainWindow.on('blur', function() {
    mainWindow.hide();
  });
}

function refreshClipBoard() {
  mainWindow.send('grab-pastes', store.get('clipHistory'));
}

app.on('ready', createWindow);
app.on('ready', () => {
  globalShortcut.register('Shift+CmdOrCtrl+v', () => {
    console.log('paste triggered');
    mainWindow.send('grab-pastes', store.get('clipHistory'));
    let mouse = robot.getMousePos();
    mainWindow.setPosition(mouse.x, mouse.y);
    mainWindow.show();
  });

  globalShortcut.register('Esc', () => {
    mainWindow.hide();
  });
});

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (mainWindow === null) {
    createWindow();
  }
});

let ipcMain = require('electron').ipcMain;

ipcMain.on('paste', (event, arg) => {
  if (process.platform === 'darwin') {
    Menu.sendActionToFirstResponder('hide:');
  }

  setTimeout(function() {
    robot.keyToggle('v', 'down', ['command']);
    setTimeout(function() {
      robot.keyToggle('v', 'up', ['command']);
    }, 100);
  }, 100);
  mainWindow.hide();
});


