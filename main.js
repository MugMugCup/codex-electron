const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.handle('scan-network', async () => {
  return new Promise((resolve) => {
    exec('arp -a', (err, stdout) => {
      if (err) {
        resolve([]);
        return;
      }
      const lines = stdout.split('\n').filter(Boolean);
      resolve(lines.slice(0, 10));
    });
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
