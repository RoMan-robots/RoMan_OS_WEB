document.addEventListener('DOMContentLoaded', () => {
  const reason = localStorage.getItem("reason");
  const password = localStorage.getItem("password");
    setTimeout(function () {
      if (reason == "oobe") {
        window.electron.loadPage('oobe.html');
      } else if (reason == "reboot") {
        if (password) {
          window.electron.loadPage('lock.html');
        } else {
          window.electron.loadPage('desktop.html');
        }
      } else {
        window.electron.loadPage('uefi.html');
      }
    }, 4000);
  })