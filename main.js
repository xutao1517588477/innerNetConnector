const { app, BrowserWindow, ipcMain } = require('electron/main')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // win.webContents.openDevTools()

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => {
    console.log(`ping received at ${new Date().toLocaleTimeString()}`)

    // 向渲染进程发送异步消息
    setTimeout(() => {
      BrowserWindow.getAllWindows()[0].webContents.send('reply-ping', `${new Date().toLocaleTimeString()}: 5s前收到过一次ping`)
    }, 5000);

    // 返回响应给渲染进程
    return `received ping at ${new Date().toLocaleTimeString()}`
  })

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