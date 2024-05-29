let currentFullScreenApp = null;
let isDragging = false;
let dragOffsetX, dragOffsetY;
let zIndexCounter = 1;

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
    let url = document.getElementById('browser-url').value;
    let iframe = document.getElementById('browser-frame');
    if (!url.startsWith('http')) {
        url = 'http://' + url;
    }
    iframe.src = url;
}

function getTimezoneOffset(timezone) {
    const match = timezone.match(/UTC([+-]\d{1,2})(?::(\d{2}))?/);
    if (!match) return 0;
    const hours = parseInt(match[1], 10);
    const minutes = match[2] ? parseInt(match[2], 10) : 0;
    return (hours * 60) + (hours < 0 ? -minutes : minutes);
}

function adjustDateToTimezone(date, timezone) {
    const offset = getTimezoneOffset(timezone);
    return new Date(date.getTime() + offset * 60 * 1000);
}

const savedTimezone = localStorage.getItem('timezone');
if (savedTimezone) {
    const currentDate = new Date();
    const adjustedCurrentDate = adjustDateToTimezone(currentDate, savedTimezone);
    document.getElementById("current-date-time").textContent = adjustedCurrentDate.toLocaleDateString();
}

function openFolder(path) {
    const fileList = document.querySelector('.file-list');
    fileList.innerHTML = '';

    if (path === 'System') {
        const systemFiles = ['reinstaller.rosa', 'desktop.sp', 'file3.sys'];
        systemFiles.forEach(file => {
            const fileElement = document.createElement('div');
            fileElement.textContent = `📄 ${file}`;
            fileList.appendChild(fileElement);
        });
    } else if (path === 'Desktop') {
        const desktopFiles = [];
        desktopFiles.forEach(file => {
            const fileElement = document.createElement('div');
            fileElement.textContent = `📄 ${file}`;
            fileList.appendChild(fileElement);
        });
    }

    document.getElementById('current-path').value = path;
}

window.closeApp = closeApp;
window.openApp = openApp;
window.toggleFullScreen = toggleFullScreen;
window.startDrag = startDrag;
window.clearDisplay = clearDisplay;
window.appendToDisplay = appendToDisplay;
window.calculateResult = calculateResult;