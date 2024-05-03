console.log("Render Process Window 1")

const { ipcRenderer } = require('electron');

console.log("Render Process Window 1")

const newWindowButton = document.getElementById('newWindowButton');
newWindowButton.addEventListener('click', function(event) {
  ipcRenderer.send('openWindow2');
});