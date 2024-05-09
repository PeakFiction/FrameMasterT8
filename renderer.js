const button = document.getElementById('goToPageButton');
button.addEventListener('click', () => {
   console.log("button 1 Event Listener in renderer called Current time is:", new Date())
  createBrowserWindow();
});

const button2 = document.getElementById('goToWindow2');
button2.addEventListener('click', () => {
   console.log("button 2 Event Listener in renderer called Current time is:", new Date())
    createSecondWindow();
});


const button3 = document.getElementById('goToExtraWindow');
button3.addEventListener('click', () => {
   console.log("button 3 Event Listener in renderer called Current time is:", new Date())
    createExtraWindow();
});

function createBrowserWindow() {
   console.log("createBrowserWindow() function in renderer.js called Current time is:", new Date())
  const remote = require('electron').remote;
  const BrowserWindow = remote.BrowserWindow;
  const win = new BrowserWindow({
    height: 600,
    width: 800,
  });
  win.loadFile('index.html');
}

function createSecondWindow() {
   console.log("createSecondWindow() function in renderer.js called Current time is:", new Date())
  const remote = require('electron').remote;
  const BrowserWindow = remote.BrowserWindow;
  const win = new BrowserWindow({
    height: 600,
    width: 800,
  });
  win.loadFile('window2.html');
}

function createExtraWindow() {
   console.log("createExtraWindow() function in renderer.js called Current time is:", new Date())
   const remote = require('electron').remote;
   const BrowserWindow = remote.BrowserWindow;
   const win = new BrowserWindow({
     height: 600,
     width: 800,
   });
   win.loadFile('extraWindow.html');
}