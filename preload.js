window.addEventListener('DOMContentLoaded', () => {
  const { ipcRenderer } = require('electron');

  function initializeEventListeners() {
    const b1 = document.getElementById('goToPageButton');
    if (b1) {
      b1.addEventListener('click', () => {
        console.log("goToPage IPCRenderer in preload.js called Current time is:", new Date());
        ipcRenderer.send('asynchronous-message', 'goToPage');
      });
    }

    const b2 = document.getElementById('goToWindow2');
    if (b2) {
      b2.addEventListener('click', () => {
        console.log("goToWindow2 IPCRenderer in preload.js called Current time is:", new Date());
        ipcRenderer.send('asynchronous-message', 'goToWindow2');
      });
    }

    const bExtraWindow2 = document.getElementById('goToExtraWindow');
    if (bExtraWindow2) {
      bExtraWindow2.addEventListener('click', () => {
        console.log("goToExtraWindow IPCRenderer in preload.js called. Current time is:", new Date());
        ipcRenderer.send('asynchronous-message', 'goToExtraWindow');
      });
    }
  }

  window.addEventListener('load', initializeEventListeners);
});