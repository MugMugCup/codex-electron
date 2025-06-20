const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');
const iconv = require('iconv-lite');

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
    exec('arp -a', { encoding: 'buffer' }, (err, stdout) => {
      if (err) {
        resolve([]);
        return;
      }
      const decoded = iconv.decode(stdout, 'cp932');
      const lines = decoded.split('\n').filter(Boolean);
      const devices = [];
      for (const line of lines) {
        const m = line.match(/(\d+\.\d+\.\d+\.\d+).*?((?:[0-9a-fA-F]{2}[:-]){5}[0-9a-fA-F]{2})/);
        if (m) {
          devices.push({ ip: m[1], mac: m[2] });
          if (devices.length === 10) break;
        }
      }
      resolve(devices);
    });
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
