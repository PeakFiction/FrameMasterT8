const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld(
  'electronAPI', {
      requestData: () => ipcRenderer.send('request-data'),
      receiveData: (callback) => ipcRenderer.on('data-response', (event, ...args) => callback(...args)),
      toggleFavorite: (moveID) => ipcRenderer.send('toggle-favorite', moveID),
      onFavoriteUpdated: (callback) => ipcRenderer.on('favorite-updated', callback),
      updateNote: (moveId, newNote) => ipcRenderer.send('update-note', moveId, newNote)
  }
);

window.addEventListener('DOMContentLoaded', () => {
  

  function initializeEventListeners() {
    const b1 = document.getElementById('goToHomePage');
    if (b1) {
      b1.addEventListener('click', () => {
        console.log("goToPage IPCRenderer in preload.js called Current time is:", new Date());
        ipcRenderer.send('asynchronous-message', 'goToHomePage');
      });
    }

    const calculatorWindow = document.getElementById('goToCalculatorWindow');
      if (calculatorWindow) {
        calculatorWindow.addEventListener('click', () => {
          console.log("calculatorWindow IPCRenderer in preload.js called. Current time is:", new Date());
          ipcRenderer.send('asynchronous-message', 'goToCalculatorWindow');
        });
      }

      const comboMakerWindow = document.getElementById('goToComboMakerWindow');
      if (comboMakerWindow) {
        comboMakerWindow.addEventListener('click', () => {
          console.log("comboMakerWindow IPCRenderer in preload.js called. Current time is:", new Date());
          ipcRenderer.send('asynchronous-message', 'goToComboMakerWindow');
        });
      }

      const creditWindow = document.getElementById('goToCreditWindow');
      if (creditWindow) {
        creditWindow.addEventListener('click', () => {
          console.log("creditWindow IPCRenderer in preload.js called. Current time is:", new Date());
          ipcRenderer.send('asynchronous-message', 'goToCreditWindow');
        });
      }
      
      
    const floatingButtons = document.querySelectorAll('.floating-btn .button-container button');
    floatingButtons.forEach(button => {
      button.addEventListener('click', () => {
        const buttonId = button.id;
        console.log(`${buttonId} button clicked in preload.js`);
        ipcRenderer.send('asynchronous-message', buttonId);
      });
    });


    function createCharacterButtonListener(characterName) {
        const button = document.getElementById(`goTo${characterName}`);
        if (button) {
          button.addEventListener('click', () => {
            console.log(`goTo${characterName} IPCRenderer in preload.js called Current time is:`, new Date());
            ipcRenderer.send('asynchronous-message', `goTo${characterName}`);
          });
        }
      }
      

    const characterList = [
      'Alisa', 'Asuka', 'Azucena', 'Bryan', 'Claudio', 'DevilJin', 'Dragunov', 'Eddy',
      'Feng', 'Hwoarang', 'Jack8', 'Jin', 'Jun', 'Kazuya', 'King', 'Kuma', 'Lars', 'Law',
      'Lee', 'Leo', 'Leroy', 'Lili', 'Nina', 'Panda', 'Paul', 'Raven', 'Reina', 'Shaheen',
      'Steve', 'Victor', 'Xiaoyu', 'Yoshimitsu', 'Zafina'
    ];

    characterList.forEach(character => {
      createCharacterButtonListener(character);
    });
  }

  window.addEventListener('load', initializeEventListeners);
});