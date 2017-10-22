const electron = require('electron')
const {globalShortcut} = require('electron')
const app = electron.app
const BrowserWindow = electron.BrowserWindow
const robot = require("robotjs");
const {Menu} = require('electron')


const path = require('path')
const url = require('url')

let mainWindow

function createWindow () {
  mainWindow = new BrowserWindow({width: 600, height: 600})

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }))

  const clipboard = require('electron').clipboard;
  clipboardWatch()

  function clipboardWatch() {
    setInterval(() => {
      clipboard.readText();
    }, 500);
  }
  mainWindow.webContents.openDevTools()

  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)
app.on('ready', () => {
  globalShortcut.register('Shift+CmdOrCtrl+1', () => {
    let mouse = robot.getMousePos();
    mainWindow.setPosition(mouse.x, mouse.y);
    mainWindow.show()
  })
  mainWindow.hide();
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})

let ipcMain = require('electron').ipcMain;

ipcMain.on('asynchronous-message', (event, arg) => {
  console.log('received async')
  Menu.sendActionToFirstResponder('hide:');
  console.log('message should be copied, attempting to paste...')
  setTimeout(function()
  {
    robot.keyToggle('v', 'down', ['command']);
    setTimeout(function()
    {
      robot.keyToggle('v', 'up', ['command']);
    }, 100);
  }, 100);
  
  console.log('finished paste attempt...')

  event.sender.send('asynchronous-reply', 'pong')
  mainWindow.hide();
})

