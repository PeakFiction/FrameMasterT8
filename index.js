const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const nativeImage = require('electron').nativeImage
const image = nativeImage.createFromPath('T8FMIcon.ico')
app.dock.setIcon(image);


let mainWindow; // Declare a variable to store the current window instance
let currentCharacterID = "";

ipcMain.on('request-data', (event) => {
    console.log(currentCharacterID);
    fetchData(event);
});

ipcMain.on('asynchronous-message', (event, arg) => {
    switch (arg) {
        case 'goToHomePage':
            mainWindow.loadFile('index.html');
            fetchData(event);
            break;
        case 'goToCalculatorWindow':
            createCalculatorWindow();
            break;
        case 'goToComboMakerWindow':
            createComboMakerWindow();
            break;
        default:
            const character = arg.replace('goTo', '');
            currentCharacterID = character.toLowerCase()
            mainWindow.loadFile(`characterHTMLs/${character.toLowerCase()}MoveList.html`);
            break;
    }
});

const createWindow = () => {
    console.log("createWindow() function in index.js called Current time is:", new Date());
    if (mainWindow) {
        mainWindow.close(); // Close the current window
    }
    win = new BrowserWindow({
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        maximizable: true,
        icon: path.join(__dirname, 'T8FMIcon.ico'),
    });
    win.loadFile('index.html');
    win.maximize();
    mainWindow = win; // Update the current window instance
};

const createCalculatorWindow = () => {
    console.log("createCalculatorWindow() function in index.js called Current time is:", new Date());
    const win = new BrowserWindow({
        width: 377,
        height: 670,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });
    win.loadFile('calculatorWindow.html');
};

const createComboMakerWindow = () => {
    console.log("createComboMakerWindow() function in index.js called Current time is:", new Date());
    const win = new BrowserWindow({
        width: 1920,
        height: 1080,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    win.maximize();
    win.loadFile('comboMakerWindow.html');
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
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
        maximizable: true,
    });
    win.loadFile(`characterHTMLs/${character.toLowerCase()}MoveList.html`);
    win.maximize();
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