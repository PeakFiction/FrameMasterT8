const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();


let mainWindow; // Declare a variable to store the current window instance

ipcMain.on('request-data', (event) => {
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
        stringProperties TEXT,
        damage TEXT,
        throwBreak TEXT,
        notes TEXT,
        userNotes TEXT,
        isFavorite BOOLEAN NOT NULL DEFAULT 0
    )`, (err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Table created or already exists.');
        // Insert dummy data (!) ONLY USE THIS WHEN INSERTING NEW DATA OR DB IS EMPTY (!)
            // const moves = [
            //     ['1', '2', 'Flash Punch Combo', '1, 1, 2', 'i10F', '20F KND', '-17F', 'h, h, m', '23', 'n/a', '', '0'],
            //     ['2', '2', 'Back Fist Combo', '1, 2, 2', 'i10F', '+4F', '-12F', 'h, h, h', '25', 'n/a', '', '0'],
            //     ['3', '2', 'Twin Fang Shattered Spine', '1, 2, 2~3', 'i10F', '+6F', '-9F', 'h, h, m', '36', 'n/a', '', '0'],
            //     ['4', '2', 'Twin Fang Double Kick', '1, 2, 4, 3', 'i10F', 'KND', '-2F', 'h, h, l, m', '56', 'n/a', '', '0'],
            //     ['5', '2', 'Double Back Fist', '2, 2', 'i12F', '+7F', '-8F', 'h, m', '36', 'n/a', '', '0'],
            //     ['6', '2', 'Agony Spear', '3, 1, 4', 'i14F', '+8F', '-6F', 'h, h, m', '39', 'n/a', '', '0'],
            //     ['7', '2', 'Agony Spear to Wind God Step', '3, 1, D/F', 'i14F', '+10F', '+2F', 'h, h', '22', 'n/a', '', '0'],
            //     ['8', '2', 'Roundhouse', '4', 'i12F', '+2F', '-9F', 'h', '18', 'n/a', '', '0'],
            //     ['9', '2', 'Demon Scissors', '(4, 3)', 'i31F', '-1F', '-10F', 'm, m', '35', 'n/a', '', '0'],
            //     ['10', '2', 'Acute Pain', '1+2', 'i12F', '+13F KND', '-13F', 'm, m', '25', 'n/a', '', '0'],
            //     ['11', '2', 'Soul Thrust', 'f+2', 'i20F', '+13F KND', '-12F', 'm', '23', 'n/a', 'Power Crush', '0'],
            //     ['12', '2', 'Oni Front Kick', 'f+3', 'i17F', '+5F', '-13F', 'm', '22', 'n/a', '', '0'],
            //     ['13', '2', 'Right Splits Kick', 'f+4', 'i19F', '+7F', '+4F', 'm', '20', 'n/a', 'Forces Crouch', '0'],
            //     ['14', '2', 'Glorious Demon Fist', 'f+1+2', 'i20F', '+11F', '-9F', 'm', '20', 'n/a', 'Punch Parry Effect', '0'],
            //     ['15', '2', 'Slaughter Hook', 'd/f+1, 2', 'i15F', '+17F', '0F', 'm, h', '31', 'n/a', 'Heat Engager', '0'],
            //     ['16', '2', 'Slaughter Uppercut', 'd/f+1, D/F+2', 'i15F', '+18F KND', '-8F', 'm, m', '31', 'n/a', 'Tornado Move', '0'],
            //     ['17', '2', 'Slaughter High Kick', 'd/f+1, 4', 'i15F', '+18F', '-3F', 'm, h', '31', 'n/a', '', '0'],
            //     ['18', '2', 'Abolishing Fist', 'd/f+2', 'i14F', '+5F', '-12F', 'm', '22', 'n/a', 'Tracking Move, CH Launcher', '0'],
            //     ['19', '2', 'Impaling Knee Twin Thrust', 'd/f+3, 2, 1', 'i18F', '+8F', '-14F', 'm, m, m', '47', 'n/a', 'Tornado Move', '0'],
            //     ['20', '2', 'Impaling Knee Twin Skewer', 'd/f+3, 2, 1 hold', 'i18F', '+10F KND', '+11F', 'm, m, m', '47', 'n/a', 'Tornado Move', '0'],
            //     ['21', '2', 'Tsunami Kick', 'd/f+4, 4', 'i13F', '-4F', '-15F', 'm, m', '26', 'n/a', '', '0'],
            //     ['22', '2', 'Kyogeki Goutsuiken', 'd/f+3+4, 1, 2', 'i18F', '+7F KND', '-19F', 'm, h, m, m', '54', 'n/a', 'Chip Damage On Block', '0'],
            //     ['23', '2', 'Nejiri Uraken', 'd+1+2', 'i23F', '+3F', '-14F', 'l', '20', 'n/a', 'Forces Crouch on Hit', '0'],
            //     ['24', '2', 'Goutsuiken', 'd/b+1, 2', 'i13F', '+17F', '-19F', 'm, m, m', '30', 'n/a', 'Heat Engager', '0'],
            //     ['25', '2', 'Lion Slayer', 'd/b+2', 'i20F', '+7F', '-9F', 'm', '23', 'n/a', 'Forces Crouch ', '0'],
            //     ['26', '2', 'Sliding Low Kick', 'd/b+3', 'i19F', '-1F', '-12F', 'l', '14', 'n/a', '', '0'],
            //     ['27', '2', 'Stature Smash', 'd/b+4', 'i20F', '+4F', '-12F', 'l', '18', 'n/a', '', '0'],
            //     ['28', '2', 'Sokushitu Goda', 'b+1, 2', 'i11F', '+9F KND', '-14F', 'h, m', '30', 'n/a', '', '0'],
            //     ['29', '2', 'Danzui Raizanba', 'b+2, 2, 1+2', 'i14F', '+38F KND', '-8F', 'm, m, h', '46', 'n/a', 'Chip Damage On Block', '0'],
            //     ['30', '2', 'Rampaging Demon', 'b+2, 4, 1', 'i14F', '+11 KND', '-14F', 'm, h, m', '46', 'n/a', '', '0'],
            //     ['31', '2', "Demon's Wrath", 'b+3, 1, 4, 1', 'i18F', '+15F KND', '-14F', 'h, h, l, m', '50', 'n/a', '', '0'],
            //     ['32', '2', 'Reign of Terror', 'b+3, 1, 4, 3', 'i18F', '+1F', '-13F', 'h, h, l, l', '47', 'n/a', '', '0'],
            //     ['33', '2', 'Flash Tornado', 'b+4', 'i17F', '+17F', '-5F', 'h', '20', 'n/a', 'Heat Engager', '0'],
            //     ['34', '2', 'Kumo Kiri', 'b+1+2', 'i22F', '+17F', '-8F', 'm', '21', 'n/a', 'Heat Engager', '0'],
            //     ['35', '2', 'Lightning Screw Uppercut', 'b+1+4', 'i63F', '+20 KND', 'n/a', '!m', '60', 'n/a', 'Unblockable Mid', '0'],
            //     ['36', '2', 'Inferno', 'u/b+1+2', 'i41F', '+19F KND', 'n/a', '!h', '32', 'n/a', 'Unblockable High', '0'],
            //     ['37', '2', 'Searing Edge', 'u/f+3', 'i19F', '+17F KND', '-9F', 'm', '25', 'n/a', '', '0'],
            //     ['38', '2', 'Roundhouse Triple Spin Kick', 'u/f+4, 4, 4, 4', 'i25F', '+19F KND', '-23F', 'm, l, l, m', '57', 'n/a', '', '0'],
            //     ['39', '2', 'Delayed Rising Toe Kick', 'u/f, n, 4', 'i23F', '+32F', '-13F', 'm', '20', 'n/a', 'Mid Launcher', '0'],
            //     ['40', '2', 'Mist Step', 'f, n', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'Stance', '0'],
            //     ['41', '2', 'Mist Step to Wind God Step', 'f, n, D/F', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'Stance', '0'],
            //     ['42', '2', 'Devil Fist', 'f, F+2', 'i16F', '+17F', '-9F', 'm', '20', '', 'Heat Engager', '0'],
            //     ['43', '2', 'Left Splits Kick', 'f, F+3', 'i20F', '+46F', '-3F', 'm', '21', 'n/a', 'Mid Launcher', '0'],
            //     ['44', '2', "Devil's Steel Pedal", 'f, F+4', 'i17F', '+5F', '-9F', 'm', '22', 'n/a', '', '0'],
            //     ['45', '2', 'Leaping Side Kick', 'WR+3', 'i22F', '+13F KND', '+6F', 'm', '30', 'n/a', 'Chip Damage On Block', '0'],
            //     ['46', '2', '10 Hit Combo 1', 'f, f, n, 2, 1, 2, 2, 3, 4, 4, 3, 2, 1', 'i12F', '-4F KND', 'n/a', 'h, h, h, h, h, m, l, l, m, !m', '66', 'n/a', '', '0'],
            //     ['47', '2', '10 Hit Combo 2', 'f, f, n, 2, 1, 2, 2, 3, 4, 4, 3, 2, 1', 'i12F', '-4F KND', 'n/a', 'h, h, m , m, l, m, l, m, !m', '66', 'n/a', '', '0'],
            //     ['48', '2', 'Wind God Step', 'f, n, d, d/f', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'n/a', 'Stance', '0'],
            //     ['49', '2', 'Thunder God Fist', 'f, n, d, d/f+1', 'i20F', '+29 KND', '-16F', 'm', '21', 'n/a', 'Tornado Move', '0'],
            //     ['50', '2', 'Wind God Fist', 'f, n, d, d/f+2', 'i11F', '+39F', '-10F', 'h', '20', 'n/a', 'High Launcher, Becomes Electric Wind God Fist during Heat', '0'],
            //     ['51', '2', 'Electric Wind God Fist', 'f, n, d, d/f:2', 'i11F', '+39F', '+5F', 'h', '23', 'n/a', 'Just frame move, adds pushback on block', '0'],
            //     ['52', '2', 'Hell Lancer', 'f, n, d, d/f+3', 'i18F', '+12F KND', '-9F', 'h', '30', 'n/a', '', '0'],
            //     ['53', '2', 'Spinning Demon > Left Hook', 'f, n, d, d/f+4,1', 'i16F', '+17F KND', '-23F', 'l, m', '31', 'n/a', '', '0'],
            //     ['54', '2', 'Illusive Demon', 'f, n, d, d/f+4,4', 'i16F', '+5 KND', '-23F', 'l, m', '33', 'n/a', '', '0'],
            //     ['55', '2', 'Parricide Fist', 'f, n, d, d/f+1+2', 'i24F', '+25F KND', '-6F', 'm', '25', 'n/a', 'Tornado Move, Chip Damage On Block', '0'],
            //     ['56', '2', 'Twin Pistons', 'WS+1, 2', 'i13F', '+73F', '-12F', 'm, m', '22', 'n/a', 'Tornado Move, Tornado Launcher', '0'],
            //     ['57', '2', 'Demon God Fist', 'WS+2', 'i16F', '+57F', '-18F', 'm', '25', 'n/a', 'Tracking Move, Mid Launcher', '0'],
            //     ['58', '2', 'Engetsusen', 'WS+3', 'i21F', '+20F KND', '-5F', 'm', '24', 'n/a', 'Tracking Move', '0'],
            //     ['59', '2', 'Tsunami Kick', 'WS+4, 4', 'i13F', '-4F', '-15F', 'm, m', '29', 'n/a', '', '0'],
            //     ['60', '2', 'Fujin Uraken', 'WS+1+2', 'i13F', '+8F', '-9F', 'm', '25', 'n/a', '', '0'],
            //     ['61', '2', 'Tombstone Crusher', 'FC, d/f+3+4', 'i23F', '+11F KND', '-11F', 'm', '24', 'n/a', 'Forces Crouch On Block', '0'],
            //     ['62', '2', 'Shattered Spine', 'SS+3', 'i23F', '+16F KND', '-7F', 'm', '23', 'n/a', '', '0'],
            //     ['63', '2', 'Elkeid', 'SS+1+2', 'i19F', '+11F KND', '+5F', 'h', '25', 'n/a', '', '0'],
            //     ['64', '2', 'Devil Break', '1, 1, 2, F', 'i10F', '+5F KND', '-17F', 'h, h, m', '23', 'n/a', 'During Devil Form, Side Switches', '0'],
            //     ['65', '2', 'Devil Blaster', '3+4', 'i64F', '-19F KND', 'n/a', '!m', '30', 'n/a', 'During Devil Form', '0'],
            //     ['66', '2', 'Roar of the Devil ', '1+4', 'i21F', '+3F KND', '-9F', 'm', '27', 'n/a', 'During Devil Form, Power Crush, Tornado Move', '0'],
            //     ['67', '2', 'Devil Impact', 'd/b+3+4', 'i24F', '+2F', '-19F', 'l', '0', 'n/a', 'During Devil Form, Forces Crouch On Hit', '0'],
            //     ['68', '2', 'Inferno', 'u/b+1+2', 'i41F', '+14F KND', 'n/a', '!h', '32', 'n/a', 'During Devil Form, Unblockable High', '0'],
            //     ['69', '2', 'Air Inferno', 'u+1+2', 'i22F', '+53F', 'n/a', 'h', '18', 'n/a', 'During Devil Form, only hits airborne', '0'],
            //     ['70', '2', 'Chaos Inferno', 'f, F+2', 'i16F', '0F', '-9F', 'm', '40', 'n/a', 'During Devil Form', '0'],
            //     ['71', '2', 'Damnation', 'f, n, d, d/f+1', 'i20F', '0', '-16F', 'm', '38', 'n/a', 'During Devil Form', '0'],
            //     ['72', '2', 'Tempest Blaster', 'f, n, d, d/f+3', 'i18F', '0', '+4F', 'h', '45', 'n/a', 'During Devil Form', '0'],
            //     ['73', '2', 'Abyss Damnation', 'f, n, d, d/f+4, 1, 1', 'i16F', '0', '-23F', 'l, m, m', '46', 'n/a', 'During Devil Form', '0'],
            //     ['74', '2', 'Devil Twister', 'SS+1', 'i17F', '+76F', '-15F', 'm', '25', 'n/a', 'During Devil Form, Launcher, Tornado Move', '0'],
            //     ['75', '2', 'Double High Sweep', '1+3', 'i12F', '+2F KND', 'n/a', 'h', '35', '1', 'Throw', '0'],
            //     ['76', '2', 'Lightning Crash', '2+4', 'i12F', '0 KND', 'n/a', 'h', '35', '2', 'Throw', '0'],
            //     ['77', '2', 'Steel Pedal Drop', '1+3 or 2+4', 'i12F', '0 KND', 'n/a', 'h', '40', '1', 'Throw, Approach opponent from left side', '0'],
            //     ['78', '2', 'Skull Smash', '1+3 or 2+4', 'i12F', '-4F KND', 'n/a', 'h', '40', '2', 'Throw, Approach opponent from right side', '0'],
            //     ['79', '2', 'Reverse Neck Throw', '1+3 or 2+4', 'i12F', '-4F KND', 'n/a', 'h', '50', 'n/a', 'Unbreakable Throw, Approach opponent from behind', '0'],
            //     ['80', '2', 'Stonehead', 'u/f+1+2', 'i12F', '+25F KND', 'n/a', 'h', '35', '1+2', '', '0'],
            //     ['81', '2', 'Gates of Hell', 'FC, d/b+1+2', 'i12F', '-3F KND', 'n/a', 'h', '40', '1+2', '', '0'],
            //     ['82', '2', 'Oni Stomp', 'd+3+4', 'i23F', '-1F', 'n/a', 'l', '20', 'n/a', 'While opponent is down', '0'],
            //     ['83', '2', 'Grand Inferno', 'd/b+1+2', 'i24F', '+13F', 'n/a', 'l', '16', 'n/a', 'During Devil Form, While opponent is down', '0']
            // ];
            
            // const stmt = db.prepare('INSERT INTO moves (moveID, characterID, moveName, notation, startupFrames, framesOnHit, framesOnBlock, stringProperties, damage, throwBreak, notes, isFavorite) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
            // for (const move of moves) {
            //     stmt.run(move);
            // }
            // stmt.finalize();
            // console.log('Dummy data inserted into the moves table.');
        }});
});

// Handle data request from renderer
function fetchData(event) {
    const query = 'SELECT * FROM moves ORDER BY isFavorite DESC, moveID ASC';  // Adjust ordering as necessary
    db.all(query, [], (err, rows) => {
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