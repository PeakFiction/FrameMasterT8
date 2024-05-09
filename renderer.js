document.addEventListener('DOMContentLoaded', () => {
  window.electronAPI.requestData();

  window.electronAPI.receiveData((rows) => {
      const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
      tableBody.innerHTML = '';  // Clear existing rows

      rows.forEach(row => {
          const tr = document.createElement('tr');
          tr.innerHTML = `
              <td>${row.moveName}</td>
              <td>${row.notation}</td>
              <td>${row.startupFrames}</td>
              <td>${row.framesOnHit}</td>
              <td>${row.framesOnBlock}</td>
              <td>${row.stringProperties}</td>
              <td>${row.damage}</td>
              <td>${row.throwBreak}</td>
              <td>${row.notes}</td>
          `;

          tableBody.appendChild(tr);
      });
  });
});


function addButtonEventListener(buttonId, characterName) {
   const button = document.getElementById(buttonId);
   if (button) {
     button.addEventListener('click', () => {
       console.log(`${buttonId} Event Listener in renderer called Current time is:`, new Date());
       createWindowForCharacter(characterName);
     });
   }
 }
 
 const button1 = document.getElementById('goToHomePage');
 button1.addEventListener('click', () => {
   console.log("button 1 Event Listener in renderer called Current time is:", new Date());
   createBrowserWindow();
 });
 
 const button3 = document.getElementById('goToCalculatorWindow');
 button3.addEventListener('click', () => {
   console.log("button 3 Event Listener in renderer called Current time is:", new Date());
   createCalculatorWindow();
 });
 
 addButtonEventListener('goToAlisa', 'Alisa');
 addButtonEventListener('goToAsuka', 'Asuka');
 addButtonEventListener('goToAzucena', 'Azucena');
 addButtonEventListener('goToBryan', 'Bryan');
 addButtonEventListener('goToClaudio', 'Claudio');
 addButtonEventListener('goToDevilJin', 'DevilJin');
 addButtonEventListener('goToDragunov', 'Dragunov');
 addButtonEventListener('goToEddy', 'Eddy');
 addButtonEventListener('goToFeng', 'Feng');
 addButtonEventListener('goToHwoarang', 'Hwoarang');
 addButtonEventListener('goToJack8', 'Jack8');
 addButtonEventListener('goToJin', 'Jin');
 addButtonEventListener('goToJun', 'Jun');
 addButtonEventListener('goToKazuya', 'Kazuya');
 addButtonEventListener('goToKing', 'King');
 addButtonEventListener('goToKuma', 'Kuma');
 addButtonEventListener('goToLars', 'Lars');
 addButtonEventListener('goToLaw', 'Law');
 addButtonEventListener('goToLee', 'Lee');
 addButtonEventListener('goToLeo', 'Leo');
 addButtonEventListener('goToLeroy', 'Leroy');
 addButtonEventListener('goToLili', 'Lili');
 addButtonEventListener('goToNina', 'Nina');
 addButtonEventListener('goToPanda', 'Panda');
 addButtonEventListener('goToPaul', 'Paul');
 addButtonEventListener('goToRaven', 'Raven');
 addButtonEventListener('goToReina', 'Reina');
 addButtonEventListener('goToShaheen', 'Shaheen');
 addButtonEventListener('goToSteve', 'Steve');
 addButtonEventListener('goToVictor', 'Victor');
 addButtonEventListener('goToXiaoyu', 'Xiaoyu');
 addButtonEventListener('goToYoshimitsu', 'Yoshimitsu');
 addButtonEventListener('goToZafina', 'Zafina');

