const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();


let mainWindow; // Declare a variable to store the current window instance
let currentCharacterID = "";

ipcMain.on('request-data', (event) => {
    console.log(currentCharacterID);
    fetchData(event);
});

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
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
    });
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

//////////////////////////////// CHARACTER WINDOW LOGIC BELOW ////////////////////////////////

const createCharacterWindow = (character) => {
    console.log(`create${character}Window() function in index.js called Current time is:`, new Date());
    currentCharacterID = character.toLowerCase();
    console.log(currentCharacterID);
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

//////////////////////////////////////////// DATABASE CONNECTION ////////////////////////////////////////////

// Open database connection
let db = new sqlite3.Database('./mydatabase.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the mydatabase.db.');

    // Creating the 'moves' table
    db.run(`CREATE TABLE IF NOT EXISTS moves(
        moveID TEXT,
        characterID TEXT,
        moveName TEXT,
        notation TEXT,
        startupFrames TEXT,
        framesOnHit TEXT,
        framesOnBlock TEXT,
        framesOnCounter TEXT,
        stringProperties TEXT,
        damage TEXT,
        notes TEXT,
        isFavorite BOOLEAN NOT NULL DEFAULT 0
    )`, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Table created or already exists.');
        // Insert dummy data (!) ONLY USE THIS WHEN INSERTING NEW DATA OR DB IS EMPTY (!)
        // const moves = [];
        // const stmt = db.prepare('INSERT INTO moves (moveID, characterID, moveName, notation, stringProperties, damage, startupFrames, framesOnBlock, framesOnHit, framesOnCounter, notes) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        // for (const move of moves) {
        //     stmt.run(move);
        // }
        // stmt.finalize();
        // console.log('Dummy data inserted into the moves table.');
        }});
});

// Inside the code where you create the BrowserWindow for Kazuya.html

// Assuming you have an instance of the Database object named 'db'
db.all('SELECT * FROM moves', (err, moves) => {
    if (err) {
        // Handle error
        console.error('Error fetching moves from database:', err.message);
    } else {
        // Send moves data to the renderer process
        mainWindow.webContents.send('moves-data', moves);
    }
});


// Handle data request from renderer
function fetchData(event) {
    const query = 'SELECT * FROM moves WHERE characterID = ? ORDER BY isFavorite DESC, moveID ASC';  // Adjust ordering as necessary
    db.all(query, [currentCharacterID], (err, rows) => {
        if (err) {
            console.error('Database read error:', err);
            event.reply('data-response', []);
        } else {
            event.reply('data-response', rows);
        }
    });
}

//////////////////////////////////////////// FAVORITE FUNCTION ////////////////////////////////////////////

ipcMain.on('toggle-favorite', (event, moveId) => {
    const query = `UPDATE moves SET isFavorite = NOT isFavorite WHERE moveID = ?`;
    db.run(query, [moveId], function(err) {
        if (err) {
            console.error('Error updating favorite status:', err);
            return;
        }
        console.log(`Rows affected: ${this.changes}`);
        fetchData(event);  // Refetch and send updated data
    });
});

ipcMain.on('update-note', (event, moveId, newNote) => {
    const query = `UPDATE moves SET notes = ? WHERE moveID = ?`;
    db.run(query, [newNote, moveId], function(err) {
        if (err) {
            console.error('Error updating note:', err);
            return;
        }
        console.log(`Note updated for moveID: ${moveId}`);
        fetchData(event);  // Refetch and send updated data
    });
});