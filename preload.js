const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('network', {
  scan: () => ipcRenderer.invoke('scan-network')
});
