console.log("Hello World")

const electron = require("electron")
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const url = require("url");


let win; //Creates a variable 'win', which is currently undefined (will be defined more below)

//Basic function that opens a Window
function createWindow() {
    win = new BrowserWindow(); //Create new instance of BrowserWindow, name it win

    win.loadURL(url.format({ //Basically tells us what win is going to be doing, it will loadURL
        pathname: path.join(__dirname, 'index.html'), //Tells them where is it, __dirname is for when the .html file is in the same place as the .js file
        protocol: 'file', //Protocol for local files
        slashes: true //Whether slashes should be used in the file URL
    }));


    win.webContents.openDevTools(); // Opens DevTools in the BrowserWindow (optional)
    win.on('closed', () => { //When all the windows are closed
        win = null; //nullify it
    });
}

//Once app is "ready", use the createWindow function to open the main UI window
app.on('ready', createWindow);

//For Macintosh, if all the windows are closed, force quit the application
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

//For Macintosh, if there aren't any windows open, and the icon is still on the dock, it will recreate the window.
app.on('activate', () => {
    if (win === null) {
        createWindow()
    }
});