window.addEventListener('DOMContentLoaded', () => {
    const { ipcRenderer } = require('electron')
    ipcRenderer.on('asynchronous-reply', (event, arg) => {
        console.log(arg) 
      })
    const b1 = document.getElementById('goToPageButton');
    b1.addEventListener('click', () => {
        ipcRenderer.send('asynchronous-message', 'ping')
    })
  })