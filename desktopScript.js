let currentFullScreenApp = null;
let isDragging = false;
let dragOffsetX, dragOffsetY;
let zIndexCounter = 1;
let displayHome = false;

let systemFiles = ['reinstaller.rosa', 'oskiller.rosa'];
let systemProcessFiles = ['desktop.sp', "users.sp", "wifi.sp", "passwords.sp"];
let languageFiles = ["UA.lp", "EN.lp"]
let programFiles = ["Dock.rosa", "PCMenu.rosa", "Settings.rosa", "Files.rosa",
    "Caluculator.rosa", "www.rosa", "News.rosa", "Notes.rosa",
    "VSCode(import).roa", "allPrograms.rosa"]
let bootFiles = ["initialize.efi", "baseSettings.json", "configuration.efi"]
let drivers = ["sound.rod", "display.rod", "wifi.rod", "date.rod"]
let desktopFiles = []
let systemFolders = ["System processes", "Programs", "Boot", "Drivers", "LanguagePacks"];

function updateDateTime() {
    const currentDate = new Date();
    document.getElementById("date").textContent = currentDate.toLocaleDateString();
    document.getElementById("time-date").textContent = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`
}

updateDateTime();

setInterval(updateDateTime, 1000);

function closeApp(appId) {
    document.getElementById(appId).style.display = 'none';
    if (currentFullScreenApp && currentFullScreenApp.id === appId) {
        document.body.classList.remove('full-screen');
        document.body.classList.remove('touch');
        currentFullScreenApp = null;
    }
}

function openApp(appId) {
    const appWindow = document.getElementById(appId);
    appWindow.style.display = 'flex';
    appWindow.style.zIndex = ++zIndexCounter;
    if (currentFullScreenApp) {
        appWindow.classList.add('full-screen');
        document.body.classList.add('full-screen');
    }
    if (appId == "notes") {
        const notesInput = document.getElementById('notes-input');

        const savedNotes = localStorage.getItem('notes');
        if (savedNotes) {
            notesInput.value = savedNotes;
        }

        notesInput.addEventListener('input', () => {
            localStorage.setItem('notes', notesInput.value);
        });
    }
}

function toggleFullScreen(appId) {
    let app = document.getElementById(appId);
    let isFullScreen = app.classList.contains('full-screen');

    document.querySelectorAll('.app-window').forEach(function (window) {
        window.classList.remove('full-screen');
    });

    if (!isFullScreen) {
        app.dataset.prevLeft = app.style.left;
        app.dataset.prevTop = app.style.top;
        app.dataset.prevWidth = app.style.width;
        app.dataset.prevHeight = app.style.height;

        app.classList.remove('touch');
        document.body.classList.remove('touch');
        app.classList.add('full-screen');
        document.body.classList.add('full-screen');
        currentFullScreenApp = app;

        app.style.left = '0';
        app.style.top = '0';
        app.style.width = '100vw';
        app.style.height = '100vh';
    } else {
        app.classList.remove('full-screen');
        document.body.classList.remove('full-screen');
        app.classList.remove('touch');
        document.body.classList.remove('touch');
        currentFullScreenApp = null;

        app.style.left = app.dataset.prevLeft;
        app.style.top = app.dataset.prevTop;
        app.style.width = app.dataset.prevWidth;
        app.style.height = app.dataset.prevHeight;
    }

    const dock = document.querySelector('.dock');
    const dockRect = dock.getBoundingClientRect();
    const appRect = app.getBoundingClientRect();

    if (appRect.bottom >= dockRect.top && appRect.top <= dockRect.bottom &&
        appRect.right >= dockRect.left && appRect.left <= dockRect.right) {
        document.body.classList.add('touch');
    } else {
        document.body.classList.remove('touch');
    }
}

function startDrag(event, appId) {
    isDragging = true;
    const appWindow = document.getElementById(appId);
    const rect = appWindow.getBoundingClientRect();
    dragOffsetX = event.clientX - rect.left;
    dragOffsetY = event.clientY - rect.top;

    appWindow.style.zIndex = ++zIndexCounter;

    function onMouseMove(event) {
        if (isDragging) {
            appWindow.style.left = `${event.clientX - dragOffsetX}px`;
            appWindow.style.top = `${event.clientY - dragOffsetY}px`;

            const dock = document.querySelector('.dock');
            const dockRect = dock.getBoundingClientRect();
            const appRect = appWindow.getBoundingClientRect();

            if (appRect.bottom >= dockRect.top && appRect.top <= dockRect.bottom &&
                appRect.right >= dockRect.left && appRect.left <= dockRect.right) {
                document.body.classList.add('touch');
            } else {
                document.body.classList.remove('touch');
            }
        }
    }

    function onMouseUp() {
        isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
}

const adminName = localStorage.getItem('adminName');
if (adminName) {
    document.querySelector('.admin-name').textContent = adminName;
} else {
    document.querySelector('.admin-name').textContent = "користувач";
}

function clearDisplay() {
    document.getElementById('calc-display').textContent = '0';
}

function appendToDisplay(value) {
    const display = document.getElementById('calc-display');
    if (display.textContent === '0') {
        display.textContent = value;
    } else {
        display.textContent += value;
    }
}

function calculateResult() {
    const display = document.getElementById('calc-display');
    try {
        display.textContent = eval(display.textContent);
    } catch (e) {
        display.textContent = 'Error';
    }
}

function loadURL() {
    const url = document.querySelector('#browser-url').value;
    const completeUrl = url.startsWith('http://') || url.startsWith('https://') ? url : `https://${url}`;
    window.open(completeUrl, '_blank', 'width=1200,height=800');
}

function openFile(file){
    if(file == "reinstaller.rosa") {
        deleteSystem("reinstall");
    } else if(file == "oskiller.rosa") {
        let step = 0;
        const content = document.querySelector('.desktop');
        const interval = setInterval(() => {
            if (step > 250) {
                clearInterval(interval);
                setTimeout(() => {
                    deleteSystem('virus');
                }, 2000);
            } else {
                content.style.transform = `rotate(${step * 1.8}deg)`;
                content.style.filter = `grayscale(${step}%)`;
                content.style.filter += ` sepia(${step}%)`;
                step++;
            }
        }, 15)
    }
}

function openFolder(path) {
    const fileList = document.querySelector('.file-list');
    fileList.innerHTML = '';
    let currentPath;

    if (path === 'System') {
        currentPath = 'System';
        systemFiles.forEach(file => {
            const fileElement = document.createElement('div');
            fileElement.textContent = `📄 ${file}`;
            fileList.appendChild(fileElement);
            fileElement.style.cursor = 'pointer';
            fileElement.onclick = () => {
                openFile(file);
            }
        });

        systemFolders.forEach(folder => {
            const folderElement = document.createElement('div');
            folderElement.textContent = `🗂️ ${folder}`;
            folderElement.style.cursor = 'pointer';
            folderElement.onclick = () => {
                openFolder(folder);
            };
            fileList.appendChild(folderElement);
        });
    } else if (path === 'System processes') {
        currentPath = 'System/System processes';
        systemProcessFiles.forEach(file => {
            const fileElement = document.createElement('div');
            fileElement.textContent = `📄 ${file}`;
            fileList.appendChild(fileElement);
            fileElement.style.cursor = 'pointer';
        });
    } else if (path === 'Programs') {
        currentPath = 'System/Programs';
        programFiles.forEach(file => {
            const fileElement = document.createElement('div');
            fileElement.textContent = `📄 ${file}`;
            fileList.appendChild(fileElement);
            fileElement.style.cursor = 'pointer';
        });
    } else if (path === 'Boot') {
        currentPath = 'System/Boot';
        bootFiles.forEach(file => {
            const fileElement = document.createElement('div');
            fileElement.textContent = `📄 ${file}`;
            fileList.appendChild(fileElement);
            fileElement.style.cursor = 'pointer';
        });
    } else if (path === 'Drivers') {
        currentPath = 'System/Drivers';
        drivers.forEach(file => {
            const fileElement = document.createElement('div');
            fileElement.textContent = `📄 ${file}`;
            fileList.appendChild(fileElement);
            fileElement.style.cursor = 'pointer';
        });
    } else if (path === 'LanguagePacks') {
        currentPath = 'System/LanguagePacks';
        languageFiles.forEach(file => {
            const fileElement = document.createElement('div');
            fileElement.textContent = `📄 ${file}`;
            fileList.appendChild(fileElement);
            fileElement.style.cursor = 'pointer';
        });
    } else if (path === 'Desktop') {
        currentPath = 'System/System processes/dekstop.sp/Folder';
        desktopFiles.forEach(file => {
            const fileElement = document.createElement('div');
            fileElement.textContent = `📄 ${file}`;
            fileList.appendChild(fileElement);
            fileElement.style.cursor = 'pointer';
        });
    }
    document.getElementById('current-path').value = `C:/${currentPath}`;
}

function goBack() {
    let currentPath = document.getElementById('current-path').value;
    let pathArray = currentPath.split('/');

    pathArray.pop();

    openFolder(pathArray[pathArray.length - 1]);
}

function toggleHome() {
    if (displayHome) {
        document.querySelector(".home").style.display = "none";
    } else {
        document.querySelector(".home").style.display = "flex";
    }
    displayHome = !displayHome
}

function adjustVolume(value) {
    let audioElements = document.querySelectorAll('audio, video');
    audioElements.forEach((element) => {
        element.volume = value / 100;
    });
}

async function selectWiFi() {
    let WiFiChoise = document.getElementById("wi-fi-select").value;
    if (WiFiChoise == "wi-fi-premium") {
        alert("WiFi Error: ця мережа не може бути застосована на вашому комп'ютері, відсутній Premium Chip X. Будь ласка, підключіться до іншої мережі");
        return;
    } else if (WiFiChoise == "wi-fi-virus") {
        document.body.style.display = "none"
        document.querySelector(`.wi-fi-error-screen`).style.display = "block";
        const keysToRemove = ['password', 'reason', 'notes', "adminName", "timezone", "wifi"];

        keysToRemove.forEach(key => {
            localStorage.removeItem(key);
        });

        reboot()
        return;
    } else if (WiFiChoise == "wi-fi-free") {
        localStorage.setItem("wifi", "connected")
    } else {
        alert("WiFi Error: Ваш комп'ютер не підтримує серверні мережи. Будь ласка, підключіться до іншого WiFi");
        return;
    }
}

function disconnect() {
    localStorage.removeItem("wifi")
}

async function resetSystem() {
    const confirmed = confirm('Ви дійсно бажаєте скинути систему до заводських налаштувань?');
    if (confirmed) {
        const password = await window.electronAPI.showPasswordDialog();
        if (password === localStorage.getItem("password")) {
            const keysToRemove = ['password', 'reason', 'notes', 'adminName', 'timezone', 'wifi'];
            keysToRemove.forEach(key => {
                localStorage.removeItem(key);
            });
            localStorage.setItem("reason", "oobe")
            reboot();
        } else {
            alert('Невірний пароль!');
        }
    }
}

async function deleteSystem() {
    const confirmed = confirm('Ви дійсно бажаєте видалити систему? Це призведе до видалення усіх даних і вам прийдеться перевстановити систему у разі повторного використання!');
    if (confirmed) {
        const password = await window.electronAPI.showPasswordDialog();
        if (password === localStorage.getItem('password')) {
            const keysToRemove = ['password', 'reason', 'notes', 'adminName', 'timezone', 'wifi'];
            keysToRemove.forEach(key => {
                localStorage.removeItem(key);
            });
            reboot();
        } else {
            alert('Невірний пароль!');
        }
    }
}

function reboot() {
    window.electron.loadPage('index.html');
}

window.closeApp = closeApp;
window.openApp = openApp;
window.toggleFullScreen = toggleFullScreen;
window.startDrag = startDrag;
window.clearDisplay = clearDisplay;
window.appendToDisplay = appendToDisplay;
window.calculateResult = calculateResult;