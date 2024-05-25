let currentFullScreenApp = null;
let isDragging = false;
let dragOffsetX, dragOffsetY;

function closeApp(appId) {
    document.getElementById(appId).style.display = 'none';
    if (currentFullScreenApp && currentFullScreenApp.id === appId) {
        document.body.classList.remove('full-screen');
        currentFullScreenApp = null;
    }
}

function openApp(appId) {
    document.getElementById(appId).style.display = 'flex';
    if (currentFullScreenApp) {
        document.getElementById(appId).classList.add('full-screen');
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
        currentFullScreenApp = null;

        app.style.left = app.dataset.prevLeft;
        app.style.top = app.dataset.prevTop;
        app.style.width = app.dataset.prevWidth;
        app.style.height = app.dataset.prevHeight;
    }
}

function startDrag(event, appId) {
    
    isDragging = true;
    const appWindow = document.getElementById(appId);
    const rect = appWindow.getBoundingClientRect();
    dragOffsetX = event.clientX - rect.left;
    dragOffsetY = event.clientY - rect.top;

    function onMouseMove(event) {
        if (isDragging) {
            appWindow.style.left = `${event.clientX - dragOffsetX}px`;
            appWindow.style.top = `${event.clientY - dragOffsetY}px`;
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

window.closeApp = closeApp;
window.openApp = openApp;
window.toggleFullScreen = toggleFullScreen;
window.startDrag = startDrag;