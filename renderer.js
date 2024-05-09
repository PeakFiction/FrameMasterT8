const button = document.getElementById('goToPageButton');
button.addEventListener('click', () => {
   createBrowserWindow();
});

function createBrowserWindow() {
   const remote = require('electron').remote;
   const BrowserWindow = remote.BrowserWindow;
   const win = new BrowserWindow({
     height: 600,
     width: 800
   });

   win.loadURL('<url>');
}