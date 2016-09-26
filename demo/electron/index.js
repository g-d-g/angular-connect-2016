'use strict';

let isBrowserSync = process.argv[2] === '--browsersync';

const electron = require('electron');
const { app, globalShortcut, BrowserWindow, Menu, shell } = electron;
const path = require('path');

let mainWindow;
let trayApp;

app.on('window-all-closed', () => {
    //https://github.com/atom/electron/issues/2312
    app.quit();
});

app.on('will-quit', () => {
    globalShortcut.unregisterAll();
});

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        title: 'BoardZ2',
        width: 1024,
        minWidth: 768,
        height: 700,
        titleBarStyle: 'hidden',
        webPreferences: {
            nodeIntegration: true
        }
    });

    //ngconnect demo // opendevtools


    buildTrayIcon();

    if (isBrowserSync) {
        mainWindow.loadURL('http://localhost:8000/index.html');
    } else {
        //ngconnect demo // -> link to build/web for initial demo
        mainWindow.loadURL('file://' + __dirname + '/index.html');
        //ngconnect demo // -> change back
    }

    mainWindow.setTitle(app.getName());

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    if (process.platform == 'darwin') {
        buildNativeAppMenu();
    }
});

let buildTrayIcon = () => {
    //ngconnect demo // buildtray

};

let buildNativeAppMenu = () => {
    var template = [{
        label: "Application",
        submenu: [
            {
                label: "About Application", selector: "orderFrontStandardAboutPanel:"
            },
            {
                type: "separator"
            },
            {
                label: 'Browse Repository', accelerator: 'CmdOrCtrl+G',
                click: () => {
                    shell.openExternal('https://github.com/thinktecture/boardz-cross-platform-sample/')
                }
            },
            {
                type: "separator"
            },
            {
                label: "Reload", accelerator: "CmdOrCtrl+R",
                click: () => {
                    mainWindow.loadURL('file://' + __dirname + '/index.html');
                }
            },
            {
                label: "Quit", accelerator: "Command+Q",
                click: () => {
                    app.quit();
                }
            }
        ]
    }, {
        label: "Edit",
        submenu: [
            {
                label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:"
            },
            {
                label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:"
            },
            {
                type: "separator"
            },
            {
                label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:"
            },
            {
                label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:"
            },
            {
                label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:"
            },
            {
                label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:"
            }
        ]
    }
    ];

    Menu.setApplicationMenu(Menu.buildFromTemplate(template));
};
