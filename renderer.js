const button = document.getElementById('goToHomePage');
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