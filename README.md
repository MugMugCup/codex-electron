# Network Scanner Electron App

This simple Electron application scans for devices on the current network
using the `arp` command. Only the first 10 results are shown. Results are
displayed in a Bootstrap styled table for readability.

## Setup

Install dependencies and run the application. The app uses `iconv-lite` to
handle output encoding from the `arp` command and loads Bootstrap from a CDN:

```bash
npm install
npm start
```

Press the **Scan** button to list discovered devices.
