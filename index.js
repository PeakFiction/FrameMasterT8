const { app, BrowserWindow } = require('electron');
const path = require('path');
const { ipcMain } = require('electron');

let mainWindow; // Declare a variable to store the current window instance

ipcMain.on('asynchronous-message', (event, arg) => {
    switch (arg) {
        case 'goToHomePage':
            createWindow();
            break;
        case 'goToCalculatorWindow':
            createCalculatorWindow();
            break;
        case 'goToAlisa':
            createCharacterWindow('Alisa');
            break;
        case 'goToAsuka':
            createCharacterWindow('Asuka');
            break;
        case 'goToAzucena':
            createCharacterWindow('Azucena');
            break;
        case 'goToBryan':
            createCharacterWindow('Bryan');
            break;
        case 'goToClaudio':
            createCharacterWindow('Claudio');
            break;
        case 'goToDevilJin':
            createCharacterWindow('DevilJin');
            break;
        case 'goToDragunov':
            createCharacterWindow('Dragunov');
            break;
        case 'goToEddy':
            createCharacterWindow('Eddy');
            break;
        case 'goToFeng':
            createCharacterWindow('Feng');
            break;
        case 'goToHwoarang':
            createCharacterWindow('Hwoarang');
            break;
        case 'goToJack8':
            createCharacterWindow('Jack8');
            break;
        case 'goToJin':
            createCharacterWindow('Jin');
            break;
        case 'goToJun':
            createCharacterWindow('Jun');
            break;
        case 'goToKazuya':
            createCharacterWindow('Kazuya');
            break;
        case 'goToKing':
            createCharacterWindow('King');
            break;
        case 'goToKuma':
            createCharacterWindow('Kuma');
            break;
        case 'goToLars':
            createCharacterWindow('Lars');
            break;
        case 'goToLaw':
            createCharacterWindow('Law');
            break;
        case 'goToLee':
            createCharacterWindow('Lee');
            break;
        case 'goToLeo':
            createCharacterWindow('Leo');
            break;
        case 'goToLeroy':
            createCharacterWindow('Leroy');
            break;
        case 'goToLili':
            createCharacterWindow('Lili');
            break;
        case 'goToNina':
            createCharacterWindow('Nina');
            break;
        case 'goToPanda':
            createCharacterWindow('Panda');
            break;
        case 'goToPaul':
            createCharacterWindow('Paul');
            break;
        case 'goToRaven':
            createCharacterWindow('Raven');
            break;
        case 'goToReina':
            createCharacterWindow('Reina');
            break;
        case 'goToShaheen':
            createCharacterWindow('Shaheen');
            break;
        case 'goToSteve':
            createCharacterWindow('Steve');
            break;
        case 'goToVictor':
            createCharacterWindow('Victor');
            break;
        case 'goToXiaoyu':
            createCharacterWindow('Xiaoyu');
            break;
        case 'goToYoshimitsu':
            createCharacterWindow('Yoshimitsu');
            break;
        case 'goToZafina':
            createCharacterWindow('Zafina');
            break;
        default:
            // Handle unexpected cases here
            break;
    }
});

const createWindow = () => {
    console.log("createWindow() function in index.js called Current time is:", new Date());
    if (mainWindow) {
        mainWindow.close(); // Close the current window
    }
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    win.loadFile('index.html');
    mainWindow = win; // Update the current window instance
};

const createCalculatorWindow = () => {
    console.log("createCalculatorWindow() function in index.js called Current time is:", new Date());
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    win.loadFile('calculatorWindow.html');
};

app.whenReady().then(() => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

//////////////////////////////// CHARACTER WINDOW LOGIC BELOW ////////////////////////////////

const createCharacterWindow = (character) => {
    console.log(`create${character}Window() function in index.js called Current time is:`, new Date());
    if (mainWindow) {
        mainWindow.close(); // Close the current window
    }
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    win.loadFile(`characterHTMLs/${character.toLowerCase()}MoveList.html`);
    mainWindow = win; // Update the current window instance
};

const characterList = [
    'Alisa', 'Asuka', 'Azucena', 'Bryan', 'Claudio', 'DevilJin', 'Dragunov', 'Eddy',
    'Feng', 'Hwoarang', 'Jack8', 'Jin', 'Jun', 'Kazuya', 'King', 'Kuma', 'Lars', 'Law',
    'Lee', 'Leo', 'Leroy', 'Lili', 'Nina', 'Panda', 'Paul', 'Raven', 'Reina', 'Shaheen',
    'Steve', 'Victor', 'Xiaoyu', 'Yoshimitsu', 'Zafina'
];

characterList.forEach(character => {
    ipcMain.on(`asynchronous-message-goTo${character}`, () => {
        createCharacterWindow(character);
    });
});
